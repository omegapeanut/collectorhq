import ShopContent from '@/components/ShopContent';
import { getShopSeries } from '@/lib/shopData';

export const metadata = { title: 'Shop Dashboard — CollectorHQ' };

export default async function ShopPage() {
  const series = await getShopSeries();
  return <ShopContent series={series} />;
}
