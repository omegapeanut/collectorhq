import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCard, DEFAULT_CARD_ID } from '@/lib/cards';
import CardDetail from '@/components/CardDetail';

type SearchParams = Promise<{ card?: string }>;

function resolveCard(id?: string) {
  return getCard(id || DEFAULT_CARD_ID) ?? getCard(DEFAULT_CARD_ID);
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { card: id } = await searchParams;
  const card = resolveCard(id);
  if (!card) return { title: 'Card not found — CollectorHQ' };
  return { title: `${card.name} — ${card.priceLabel} — CollectorHQ` };
}

export default async function CardPage({ searchParams }: { searchParams: SearchParams }) {
  const { card: id } = await searchParams;
  const card = resolveCard(id);
  if (!card) notFound();
  return <CardDetail card={card} />;
}
