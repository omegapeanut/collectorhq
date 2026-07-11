import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDb } from './firebaseClient';

export interface CatalogCard {
  id: string;
  game: string;
  set: string;
  setCode: string | null;
  number: string | null;
  name: string;
  rarity: string | null;
  finish: string;
  imageUrl: string | null;
}

export interface CatalogSetSummary {
  id: string;
  game: string;
  set: string;
  order: number;
  count: number;
}

export async function getCatalogSets(game: string): Promise<CatalogSetSummary[]> {
  const db = getDb();
  if (!db) return [];
  try {
    const snap = await getDocs(query(collection(db, 'catalogSets'), where('game', '==', game)));
    const sets = snap.docs.map((d) => d.data() as CatalogSetSummary);
    return sets.sort((a, b) => a.order - b.order);
  } catch {
    // Firestore rules for `catalogSets` not published yet, or no data
    // imported yet — treat as empty rather than failing the page.
    return [];
  }
}

export async function getCatalogCards(game: string, set: string): Promise<CatalogCard[]> {
  const db = getDb();
  if (!db) return [];
  try {
    const snap = await getDocs(
      query(collection(db, 'catalog'), where('game', '==', game), where('set', '==', set))
    );
    const cards = snap.docs.map((d) => d.data() as CatalogCard);
    return cards.sort((a, b) => (a.number ?? '').localeCompare(b.number ?? '', undefined, { numeric: true }));
  } catch {
    return [];
  }
}
