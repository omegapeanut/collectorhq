import Landing from '@/components/Landing';
import { getCard } from '@/lib/cards';

export default async function RootPage() {
  const [umbreon, shanks, onering] = await Promise.all([
    getCard('umbreon'),
    getCard('shanks'),
    getCard('onering'),
  ]);
  const movers = [umbreon!, shanks!, onering!] as const;
  return <Landing movers={movers} />;
}
