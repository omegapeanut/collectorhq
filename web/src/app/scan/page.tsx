import ScanContent from '@/components/ScanContent';
import { getCard } from '@/lib/cards';

export const metadata = { title: 'Scan — CollectorHQ' };

export default async function ScanPage() {
  const [charizard, shanks] = await Promise.all([getCard('charizard'), getCard('shanks')]);
  return <ScanContent uploadArt={charizard!.art!} matchArt={shanks!.art!} />;
}
