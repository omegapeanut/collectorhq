import { getCard } from './cards';

export interface BinderCard {
  id: string;
  art: string | null;
  name: string;
  sub: string;
  price: string;
}

export interface SeriesGroup {
  game: string;
  chipBg: string;
  chipFg: string;
  name: string;
  count: number;
  value: string;
  cards: BinderCard[];
}

export interface TopCard {
  id: string;
  cid: string;
  art: string | null;
  game: string;
  condition: string;
  name: string;
  price: string;
  delta: string;
  deltaColor: string;
  tilt: number;
}

async function binderCard(id: string, subOverride?: string): Promise<BinderCard> {
  const c = (await getCard(id))!;
  return {
    id: c.id,
    art: c.art,
    name: c.name,
    sub: subOverride ?? `${c.number} · ${c.cond}`,
    price: c.priceLabel,
  };
}

async function topCard(
  id: string,
  rowId: string,
  condition: string,
  delta: string,
  deltaColor: string,
  tilt: number,
): Promise<TopCard> {
  const c = (await getCard(id))!;
  return {
    id: rowId,
    cid: c.id,
    art: c.art,
    game: c.game,
    condition,
    name: c.name,
    price: c.priceLabel,
    delta,
    deltaColor,
    tilt,
  };
}

export interface VaultData {
  vaultCount: number;
  totalValue: string;
  weeklyChange: string;
  graded: number;
  series: SeriesGroup[];
  topCards: TopCard[];
}

export async function getMemberVaultData(): Promise<VaultData> {
  const series: SeriesGroup[] = [
    {
      game: 'POKÉMON',
      chipBg: '#ffd23f',
      chipFg: '#17130f',
      name: 'Evolving Skies',
      count: 42,
      value: '$4,180',
      cards: await Promise.all([
        binderCard('umbreon'),
        binderCard('glaceon'),
        binderCard('rayquaza'),
        binderCard('sylveon'),
      ]),
    },
    {
      game: 'ONE PIECE',
      chipBg: '#e6392f',
      chipFg: '#fff',
      name: 'OP-01 Romance Dawn',
      count: 31,
      value: '$1,290',
      cards: await Promise.all([binderCard('shanks'), binderCard('zoro'), binderCard('luffy01')]),
    },
    {
      game: 'NARUTO',
      chipBg: '#3a7bd5',
      chipFg: '#fff',
      name: 'Kayou Tier 4 · Wave 5',
      count: 58,
      value: '$820',
      cards: await Promise.all([binderCard('narutosp'), binderCard('itachi')]),
    },
    {
      game: 'MAGIC',
      chipBg: '#17130f',
      chipFg: '#ffd23f',
      name: 'Tales of Middle-earth',
      count: 12,
      value: '$410',
      cards: await Promise.all([binderCard('onering')]),
    },
  ];

  const topCards = await Promise.all([
    topCard('narutosp', 'v1', 'RAW · NM', '▲6.8%', '#1c9e4f', -0.3),
    topCard('zoro', 'v2', 'RAW · LP (edgewear)', '▲4.4%', '#1c9e4f', 0.3),
    topCard('umbreon', 'v3', 'PSA 10', '▲8.4%', '#1c9e4f', -0.25),
    topCard('shanks', 'v4', 'RAW · NM', '▼3.6%', '#c0362c', 0.25),
  ]);

  return {
    vaultCount: 214,
    totalValue: '$31,240',
    weeklyChange: '▲ $1,804 (6.1%) this week',
    graded: 38,
    series,
    topCards,
  };
}

export async function getRookieVaultData(): Promise<VaultData> {
  const series: SeriesGroup[] = [
    {
      game: 'POKÉMON',
      chipBg: '#ffd23f',
      chipFg: '#17130f',
      name: 'Obsidian Flames',
      count: 28,
      value: '$2,340',
      cards: await Promise.all([binderCard('charizard'), binderCard('tyranitar')]),
    },
    {
      game: 'NARUTO',
      chipBg: '#3a7bd5',
      chipFg: '#fff',
      name: 'Kayou Tier 3',
      count: 24,
      value: '$610',
      cards: await Promise.all([binderCard('kakashi'), binderCard('narutomr')]),
    },
    {
      game: 'ONE PIECE',
      chipBg: '#e6392f',
      chipFg: '#fff',
      name: 'OP-05 Awakening',
      count: 11,
      value: '$1,310',
      cards: await Promise.all([binderCard('luffy05', 'MANGA RARE · proxy slot')]),
    },
    {
      game: 'MAGIC',
      chipBg: '#17130f',
      chipFg: '#ffd23f',
      name: 'Tales of Middle-earth',
      count: 4,
      value: '$180',
      cards: await Promise.all([binderCard('onering', '#246 · RAW LP')]),
    },
  ];

  const topCards = await Promise.all([
    topCard('charizard', 'r1', 'RAW · NM', '▼1.2%', '#c0362c', -0.3),
    topCard('kakashi', 'r2', 'RAW · MP (scratches)', '▲2.1%', '#1c9e4f', 0.3),
    topCard('luffy05', 'r3', 'RAW · NM', '▲12.2%', '#1c9e4f', -0.25),
    topCard('onering', 'r4', 'RAW · LP', '▲5.1%', '#1c9e4f', 0.25),
  ]);

  return {
    vaultCount: 67,
    totalValue: '$4,380',
    weeklyChange: '▲ $212 (5.1%) this week',
    graded: 4,
    series,
    topCards,
  };
}
