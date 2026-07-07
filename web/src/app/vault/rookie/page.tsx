import VaultContent from '@/components/VaultContent';
import { getRookieVaultData } from '@/lib/vaultData';

export const metadata = { title: 'My Vault (Rookie) — CollectorHQ' };

export default async function RookieVaultPage() {
  const data = await getRookieVaultData();
  return <VaultContent tier="rookie" data={data} />;
}
