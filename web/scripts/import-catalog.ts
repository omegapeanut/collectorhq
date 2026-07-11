// Bulk card-catalog importer.
//
// Reads a spreadsheet (xlsx) of cards, resolves an image for each one, uploads
// it to Cloudinary, and upserts a doc per card into Firestore's `catalog`
// collection. Safe to re-run any time — every doc id is derived deterministically
// from set + number + finish, so re-running the same file just re-syncs it, and
// pointing it at a new file (e.g. just the new set's rows) adds only what's new.
//
// Usage:
//   npm run import:catalog -- --file scripts/import/data/one-piece-cards.xlsx
//   npm run import:catalog -- --file scripts/import/data/op08.xlsx --dry-run
//
// Flags:
//   --file <path>     spreadsheet to import (default: scripts/import/data/one-piece-cards.xlsx)
//   --sheet <name>    worksheet name to read (default: "All Cards")
//   --game <slug>     game identifier stored on each doc (default: "onepiece")
//   --images <dir>    local folder to look for <cardId>.(jpg|jpeg|png|webp) images (default: scripts/import/images)
//   --limit <n>       only process the first n rows (handy for a test run)
//   --dry-run         parse + resolve everything, print a summary, write nothing
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import * as XLSX from 'xlsx';
import { getAdminDb } from './lib/firebaseAdmin';
import { getCloudinary } from './lib/cloudinaryAdmin';
import { FieldValue } from 'firebase-admin/firestore';

interface Args {
  file: string;
  sheet: string;
  game: string;
  images: string;
  limit?: number;
  dryRun: boolean;
}

function parseArgs(): Args {
  const argv = process.argv.slice(2);
  const get = (flag: string) => {
    const i = argv.indexOf(flag);
    return i === -1 ? undefined : argv[i + 1];
  };
  return {
    file: get('--file') ?? 'scripts/import/data/one-piece-cards.xlsx',
    sheet: get('--sheet') ?? 'All Cards',
    game: get('--game') ?? 'onepiece',
    images: get('--images') ?? 'scripts/import/images',
    limit: get('--limit') ? Number(get('--limit')) : undefined,
    dryRun: argv.includes('--dry-run'),
  };
}

interface CardRow {
  name: string;
  set: string;
  rarity: string | null;
  number: string | null;
  finish: string;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cardId(row: CardRow): string {
  // Include the name, not just number + finish: the source data reuses the
  // same card number across distinct named print variants (base / alt art /
  // SPR of the same character), so number+finish alone isn't unique.
  const finish = slugify(row.finish || 'normal');
  const name = slugify(row.name);
  if (row.number) return `${slugify(row.number)}-${name}-${finish}`;
  return `${slugify(row.set)}-${name}-${finish}`;
}

function setCodeOf(row: CardRow): string | null {
  const m = row.number?.match(/^([A-Za-z]+\d+)-/);
  return m ? m[1].toUpperCase() : null;
}

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

function findLocalImage(imagesDir: string, id: string): string | null {
  for (const ext of IMAGE_EXTS) {
    const p = path.join(imagesDir, `${id}${ext}`);
    if (existsSync(p)) return p;
  }
  return null;
}

// Best-effort remote image lookup. Off by default — only runs if OPTCG_API_KEY
// is set in .env.local, since the public API requires a granted key. Cloudinary
// fetches the URL server-side on its own network, so this doesn't depend on
// this machine's outbound access.
async function resolveRemoteImageUrl(number: string): Promise<string | null> {
  const apiKey = process.env.OPTCG_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch(`https://optcg-api.arjunbansal-ai.workers.dev/cards/${number}`, {
      headers: { 'X-API-Key': apiKey },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { image_url?: string };
    return data.image_url ?? null;
  } catch {
    return null;
  }
}

async function main() {
  const args = parseArgs();
  console.log(`Reading ${args.file} (sheet "${args.sheet}")...`);

  const wb = XLSX.readFile(args.file);
  const ws = wb.Sheets[args.sheet];
  if (!ws) {
    console.error(`Sheet "${args.sheet}" not found. Sheets in file: ${wb.SheetNames.join(', ')}`);
    process.exit(1);
  }

  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: null });
  let rows: CardRow[] = raw.map((r) => ({
    name: String(r['Name'] ?? '').trim(),
    set: String(r['Set'] ?? '').trim(),
    rarity: r['Rarity'] ? String(r['Rarity']).trim() : null,
    number: r['Number'] ? String(r['Number']).trim() : null,
    finish: String(r['Holo/Foil'] ?? 'Normal').trim(),
  }));
  rows = rows.filter((r) => r.name && r.set);
  if (args.limit) rows = rows.slice(0, args.limit);

  console.log(`Parsed ${rows.length} rows.`);

  const imagesDir = path.resolve(args.images);
  const localCount = existsSync(imagesDir) ? readdirSync(imagesDir).length : 0;
  console.log(`Local image folder: ${imagesDir} (${localCount} files)`);

  const db = args.dryRun ? null : getAdminDb();
  const cloudinary = args.dryRun ? null : getCloudinary();

  let uploadedLocal = 0;
  let uploadedRemote = 0;
  const missing: CardRow[] = [];
  let written = 0;

  const BATCH_SIZE = 400;
  let batch = db?.batch();
  let batchCount = 0;

  for (const row of rows) {
    const id = cardId(row);
    const localPath = findLocalImage(imagesDir, id);
    let imageUrl: string | null = null;

    if (localPath) {
      uploadedLocal++;
      if (!args.dryRun) {
        const uploaded = await cloudinary!.uploader.upload(localPath, {
          public_id: `catalog/${args.game}/${id}`,
          overwrite: true,
        });
        imageUrl = uploaded.secure_url;
      }
    } else if (row.number) {
      const remoteUrl = await resolveRemoteImageUrl(row.number);
      if (remoteUrl) {
        uploadedRemote++;
        if (!args.dryRun) {
          const uploaded = await cloudinary!.uploader.upload(remoteUrl, {
            public_id: `catalog/${args.game}/${id}`,
            overwrite: true,
          });
          imageUrl = uploaded.secure_url;
        }
      } else {
        missing.push(row);
      }
    } else {
      missing.push(row);
    }

    if (!args.dryRun) {
      batch!.set(
        db!.collection('catalog').doc(id),
        {
          id,
          game: args.game,
          set: row.set,
          setCode: setCodeOf(row),
          number: row.number,
          name: row.name,
          rarity: row.rarity,
          finish: row.finish,
          imageUrl,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      batchCount++;
      written++;
      if (batchCount >= BATCH_SIZE) {
        await batch!.commit();
        console.log(`  ...committed ${written}/${rows.length}`);
        batch = db!.batch();
        batchCount = 0;
      }
    }
  }
  if (!args.dryRun && batchCount > 0) {
    await batch!.commit();
  }

  // Summary docs per set, so the browsing page can list sets + counts
  // without an expensive full-collection scan.
  if (!args.dryRun) {
    const order: string[] = [];
    const counts = new Map<string, number>();
    for (const row of rows) {
      if (!counts.has(row.set)) order.push(row.set);
      counts.set(row.set, (counts.get(row.set) ?? 0) + 1);
    }
    const setsBatch = db!.batch();
    order.forEach((set, i) => {
      const id = `${args.game}-${slugify(set)}`;
      setsBatch.set(
        db!.collection('catalogSets').doc(id),
        { id, game: args.game, set, order: i, count: counts.get(set) ?? 0, updatedAt: FieldValue.serverTimestamp() },
        { merge: true }
      );
    });
    await setsBatch.commit();
    console.log(`Wrote ${order.length} set summaries to catalogSets.`);
  }

  if (missing.length > 0) {
    const reportPath = path.resolve('scripts/import/missing-images.csv');
    const csv = [
      'id,name,set,number,finish',
      ...missing.map((r) => `${cardId(r)},"${r.name.replace(/"/g, '""')}",${r.set},${r.number ?? ''},${r.finish}`),
    ].join('\n');
    writeFileSync(reportPath, csv);
    console.log(`\nWrote ${reportPath} (${missing.length} cards with no image found).`);
  }

  console.log(`\n${args.dryRun ? '[DRY RUN] ' : ''}Summary:`);
  console.log(`  rows parsed:        ${rows.length}`);
  console.log(`  images from local:  ${uploadedLocal}`);
  console.log(`  images from API:    ${uploadedRemote}`);
  console.log(`  missing images:     ${missing.length}`);
  if (!args.dryRun) console.log(`  Firestore docs written: ${written}`);

  process.exit(0);
}

main().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
