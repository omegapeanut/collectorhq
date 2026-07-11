import CatalogContent from '@/components/CatalogContent';
import { getCatalogCards, getCatalogSets } from '@/lib/catalog';

export const metadata = { title: 'Card Catalog — CollectorHQ' };

export default async function CatalogPage() {
  const sets = await getCatalogSets('onepiece');
  const firstSet = sets[0]?.set ?? null;
  const initialCards = firstSet ? await getCatalogCards('onepiece', firstSet) : [];
  return <CatalogContent sets={sets} initialSet={firstSet} initialCards={initialCards} />;
}
