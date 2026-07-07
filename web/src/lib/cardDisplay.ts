// Small display helpers shared by any page that renders a grid of catalog
// cards (Explore, Vault "all cards" tabs, Shop singles, ...).
import type { Card } from './cards';

export interface Badge {
  label: string;
  bg: string;
  fg: string;
}

export function cardBadge(card: Card): Badge {
  if (card.id === 'luffy05') return { label: 'GRAIL', bg: '#e6392f', fg: '#fff' };
  if (card.deltaPct < 0) return { label: 'DIP', bg: '#fff', fg: '#17130f' };
  if (card.deltaPct >= 5) return { label: 'HOT', bg: '#ffd23f', fg: '#17130f' };
  return { label: 'RISING', bg: '#fff', fg: '#17130f' };
}

export function cardSub(card: Card): string {
  return `${card.set.toUpperCase()} · ${card.number} · ${card.cond}`;
}

/** Deterministic small rotation so grids don't look perfectly gridded. */
export function cardTilt(id: string): number {
  let h = 5381;
  for (let i = 0; i < id.length; i++) h = (h * 33 + id.charCodeAt(i)) | 0;
  return (((h >>> 0) % 100) / 100 - 0.5) * 1.2;
}
