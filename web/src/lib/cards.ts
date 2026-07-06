// CollectorHQ card catalog: price history + recent sales, generated
// deterministically from a seed so each card's chart/table stay stable
// across renders. Ported from the Claude Design prototype's cards-data.js.

export type Game = 'POKÉMON' | 'ONE PIECE' | 'NARUTO' | 'MAGIC';

export interface CardRaw {
  seed: number;
  art: string | null;
  game: Game;
  name: string;
  set: string;
  number: string;
  rarity: string;
  finish: string;
  cond: string;
  pop: string;
  /** Current market price. */
  price: number;
  /** Price 52 weeks ago (history start). */
  start: number;
  /** 7-day price movement, percent. */
  deltaPct: number;
}

export interface Sale {
  date: string;
  platform: string;
  cond: string;
  price: string;
}

export interface Card extends CardRaw {
  id: string;
  chipBg: string;
  chipFg: string;
  /** 52 weekly price points, oldest to newest. */
  history: number[];
  sales: Sale[];
  priceLabel: string;
  high: string;
  low: string;
}

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function fmtMoney(v: number): string {
  const cents = v < 100;
  return (
    '$' +
    v.toLocaleString('en-US', {
      minimumFractionDigits: cents ? 2 : 0,
      maximumFractionDigits: cents ? 2 : 0,
    })
  );
}

function genHistory(seed: number, start: number, end: number, deltaPct: number, n = 52): number[] {
  const r = rng(seed);
  const pts: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const base = start * Math.pow(end / start, t);
    const noise = 1 + (r() - 0.5) * 0.1 * (1 - t * 0.45);
    pts.push(base * noise);
  }
  pts[n - 1] = end;
  // Anchor the last-week point so the 7-day delta matches the quoted movement.
  pts[n - 2] = end / (1 + deltaPct / 100);
  return pts.map((v) => Math.round(v * 100) / 100);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function genSales(card: CardRaw, history: number[]): Sale[] {
  const r = rng(card.seed + 77);
  const plats = ['eBay', 'TCGplayer', 'CollectorHQ Trade', 'Whatnot', 'eBay', 'Card Show'];
  const conds =
    card.cond.indexOf('PSA') === 0
      ? [card.cond, card.cond, 'PSA 9', 'RAW NM']
      : ['RAW NM', 'RAW NM', 'RAW LP', 'PSA 9'];
  let day = new Date(2026, 6, 5);
  const out: Sale[] = [];
  for (let i = 0; i < 6; i++) {
    const base = history[history.length - 1 - Math.min(3, Math.floor(i / 2))];
    const price = base * (0.955 + r() * 0.09);
    out.push({
      date: MONTHS[day.getMonth()] + ' ' + day.getDate(),
      platform: plats[i % plats.length],
      cond: conds[Math.floor(r() * conds.length)],
      price: fmtMoney(Math.round(price * 100) / 100),
    });
    day = new Date(day.getTime() - (2 + Math.floor(r() * 5)) * 86400000);
  }
  return out;
}

const GAME_CHIPS: Record<Game, { chipBg: string; chipFg: string }> = {
  'POKÉMON': { chipBg: '#ffd23f', chipFg: '#17130f' },
  'ONE PIECE': { chipBg: '#e6392f', chipFg: '#fff' },
  'NARUTO': { chipBg: '#3a7bd5', chipFg: '#fff' },
  'MAGIC': { chipBg: '#17130f', chipFg: '#ffd23f' },
};

// id -> catalog entry. price = current market. deltaPct = 7-day movement.
export const CARDS: Record<string, CardRaw> = {
  umbreon: { seed: 11, art: '/art/card-umbreon.png', game: 'POKÉMON', name: 'Umbreon VMAX (Alternate Art Secret)', set: 'Evolving Skies', number: '215/203', rarity: 'Secret Rare', finish: 'Holofoil', cond: 'PSA 10', pop: 'PSA 10 pop 3,842', price: 612, start: 396, deltaPct: 8.4 },
  glaceon: { seed: 12, art: '/art/card-crystal.png', game: 'POKÉMON', name: 'Glaceon VMAX (Alternate Art Secret)', set: 'Evolving Skies', number: '209/203', rarity: 'Secret Rare', finish: 'Holofoil', cond: 'RAW NM', pop: 'PSA 10 pop 2,105', price: 148, start: 118, deltaPct: 3.1 },
  rayquaza: { seed: 13, art: '/art/card-charizard.png', game: 'POKÉMON', name: 'Rayquaza VMAX (Alternate Art Secret)', set: 'Evolving Skies', number: '218/203', rarity: 'Secret Rare', finish: 'Holofoil', cond: 'RAW LP', pop: 'PSA 10 pop 5,616', price: 264, start: 205, deltaPct: 5.6 },
  sylveon: { seed: 14, art: '/art/card-kakashi.png', game: 'POKÉMON', name: 'Sylveon VMAX (Alternate Art Secret)', set: 'Evolving Skies', number: '212/203', rarity: 'Secret Rare', finish: 'Holofoil', cond: 'PSA 9', pop: 'PSA 10 pop 3,079', price: 310, start: 238, deltaPct: 4.2 },
  charizard: { seed: 15, art: '/art/card-charizard.png', game: 'POKÉMON', name: 'Charizard ex (Special Illustration Rare)', set: 'Obsidian Flames', number: '223/197', rarity: 'Special Illustration Rare', finish: 'Holofoil', cond: 'RAW NM', pop: 'PSA 10 pop 12,441', price: 204, start: 236, deltaPct: -1.2 },
  tyranitar: { seed: 16, art: '/art/card-crystal.png', game: 'POKÉMON', name: 'Tyranitar ex (Full Art)', set: 'Obsidian Flames', number: '211/197', rarity: 'Ultra Rare', finish: 'Holofoil', cond: 'RAW LP', pop: 'PSA 10 pop 1,207', price: 38, start: 44, deltaPct: -2.4 },
  charmander: { seed: 17, art: null, game: 'POKÉMON', name: 'Charmander', set: 'Mega Evolution Promos', number: 'Promo · 038', rarity: 'Promo', finish: 'Holofoil', cond: 'RAW NM', pop: 'PSA 10 pop 894', price: 40.4, start: 62, deltaPct: -10.6 },
  bulbasaur: { seed: 18, art: null, game: 'POKÉMON', name: 'Bulbasaur', set: 'Mega Evolution Promos', number: 'Promo · 037', rarity: 'Promo', finish: 'Holofoil', cond: 'RAW NM', pop: 'PSA 10 pop 811', price: 33.97, start: 48, deltaPct: -5.38 },
  squirtle: { seed: 19, art: null, game: 'POKÉMON', name: 'Squirtle', set: 'Mega Evolution Promos', number: 'Promo · 039', rarity: 'Promo', finish: 'Holofoil', cond: 'RAW NM', pop: 'PSA 10 pop 776', price: 28.98, start: 45, deltaPct: -12.37 },
  gengar: { seed: 20, art: null, game: 'POKÉMON', name: 'Gengar (Cosmos Holo) (EB Games Exclusive)', set: 'Miscellaneous Cards & Products', number: '050/088', rarity: 'Rare', finish: 'Holofoil', cond: 'RAW NM', pop: 'PSA 10 pop 402', price: 125.73, start: 88, deltaPct: 4.4 },
  shanks: { seed: 21, art: '/art/card-shanks.png', game: 'ONE PIECE', name: 'Shanks (Alternate Art)', set: 'OP-01 Romance Dawn', number: 'OP01-120', rarity: 'Secret Rare', finish: 'Alt Art Foil', cond: 'RAW NM', pop: 'PSA 10 pop 1,930', price: 389, start: 430, deltaPct: -3.6 },
  zoro: { seed: 22, art: '/art/card-zoro.png', game: 'ONE PIECE', name: 'Roronoa Zoro (Alternate Art)', set: 'OP-01 Romance Dawn', number: 'OP01-025', rarity: 'Super Rare', finish: 'Alt Art Foil', cond: 'RAW LP', pop: 'PSA 10 pop 4,517', price: 178, start: 141, deltaPct: 4.4 },
  luffy05: { seed: 23, art: '/art/card-luffy.png', game: 'ONE PIECE', name: 'Monkey D. Luffy (Manga Rare)', set: 'OP-05 Awakening of the New Era', number: 'OP05-119', rarity: 'SEC Manga Rare', finish: 'Manga Art Foil', cond: 'RAW NM', pop: 'PSA 10 pop 688', price: 1240, start: 815, deltaPct: 12.2 },
  luffy01: { seed: 24, art: '/art/card-luffy.png', game: 'ONE PIECE', name: 'Monkey D. Luffy (Leader)', set: 'OP-01 Romance Dawn', number: 'OP01-003', rarity: 'Leader', finish: 'Foil', cond: 'RAW NM', pop: 'PSA 10 pop 5,204', price: 24, start: 19, deltaPct: 1.8 },
  narutosp: { seed: 25, art: '/art/card-narutosp.png', game: 'NARUTO', name: 'Naruto Uzumaki SP (Sage Mode)', set: 'Kayou Tier 4 · Wave 5', number: 'NR-SP-010', rarity: 'SP', finish: 'Textured Foil', cond: 'RAW NM', pop: 'PSA 10 pop 214', price: 96, start: 61, deltaPct: 6.8 },
  narutomr: { seed: 26, art: '/art/card-narutosp.png', game: 'NARUTO', name: 'Naruto Uzumaki MR', set: 'Kayou Tier 3', number: 'NR-MR-004', rarity: 'MR', finish: 'Foil', cond: 'RAW NM', pop: 'PSA 10 pop 502', price: 29, start: 22, deltaPct: 2.9 },
  itachi: { seed: 27, art: '/art/card-itachi.png', game: 'NARUTO', name: 'Itachi Uchiha SSR (Gold Stamp)', set: 'Kayou Tier 4 · Wave 3', number: 'NR-SSR-021', rarity: 'SSR', finish: 'Gold Stamp Foil', cond: 'SEALED', pop: 'PSA 10 pop 388', price: 118, start: 84, deltaPct: 3.4 },
  kakashi: { seed: 28, art: '/art/card-kakashi.png', game: 'NARUTO', name: 'Kakashi Hatake UR', set: 'Kayou Tier 3', number: 'NR-UR-012', rarity: 'UR', finish: 'Foil', cond: 'RAW MP', pop: 'PSA 10 pop 640', price: 41, start: 33, deltaPct: 2.1 },
  onering: { seed: 29, art: '/art/card-onering.png', game: 'MAGIC', name: 'The One Ring (Foil)', set: 'Tales of Middle-earth', number: '#246', rarity: 'Mythic Rare', finish: 'Foil', cond: 'RAW NM', pop: 'PSA 10 pop 1,112', price: 148, start: 122, deltaPct: 5.1 },
};

export const DEFAULT_CARD_ID = 'umbreon';

export function getCard(id: string): Card | null {
  const c = CARDS[id];
  if (!c) return null;
  const history = genHistory(c.seed, c.start, c.price, c.deltaPct);
  const sales = genSales(c, history);
  const chips = GAME_CHIPS[c.game];
  return {
    id,
    ...c,
    ...chips,
    history,
    sales,
    priceLabel: fmtMoney(c.price),
    high: fmtMoney(Math.max(...history)),
    low: fmtMoney(Math.min(...history)),
  };
}
