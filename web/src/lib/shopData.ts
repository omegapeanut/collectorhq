import { binderCard, type BinderCard } from './vaultData';

export interface ShopBinderCard extends BinderCard {
  status: string;
  stBg: string;
  stFg: string;
}

export interface ShopSeriesGroup {
  game: string;
  chipBg: string;
  chipFg: string;
  name: string;
  count: number;
  cards: ShopBinderCard[];
}

async function shopBinderCard(
  id: string,
  status: string,
  stBg: string,
  stFg: string,
  subOverride?: string,
): Promise<ShopBinderCard> {
  const c = await binderCard(id, subOverride);
  return { ...c, status, stBg, stFg };
}

export async function getShopSeries(): Promise<ShopSeriesGroup[]> {
  return [
    {
      game: 'ONE PIECE',
      chipBg: '#e6392f',
      chipFg: '#fff',
      name: 'OP-01 Romance Dawn',
      count: 34,
      cards: await Promise.all([
        shopBinderCard('shanks', 'FOR SALE', '#1c9e4f', '#fff', 'SEC · NM'),
        shopBinderCard('zoro', 'FOR SALE', '#1c9e4f', '#fff', 'SR · NM'),
        shopBinderCard('luffy01', 'ON HOLD', '#ffd23f', '#17130f', 'L · NM'),
      ]),
    },
    {
      game: 'POKÉMON',
      chipBg: '#ffd23f',
      chipFg: '#17130f',
      name: 'Evolving Skies',
      count: 21,
      cards: await Promise.all([
        shopBinderCard('umbreon', 'FOR SALE', '#1c9e4f', '#fff'),
        shopBinderCard('glaceon', 'SOLD', '#fff', '#8a7f70', '209/203 · NM'),
      ]),
    },
    {
      game: 'NARUTO',
      chipBg: '#3a7bd5',
      chipFg: '#fff',
      name: 'Kayou Tier 4 · Wave 5',
      count: 40,
      cards: await Promise.all([
        shopBinderCard('narutosp', 'FOR SALE', '#1c9e4f', '#fff', 'SP · NM'),
        shopBinderCard('itachi', 'FOR SALE', '#1c9e4f', '#fff', 'SSR · SEALED'),
      ]),
    },
    {
      game: 'MAGIC',
      chipBg: '#17130f',
      chipFg: '#ffd23f',
      name: 'Tales of Middle-earth',
      count: 9,
      cards: await Promise.all([shopBinderCard('onering', 'FOR SALE', '#1c9e4f', '#fff', '#246 · NM')]),
    },
  ];
}
