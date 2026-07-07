import VaultContent from '@/components/VaultContent';
import { getMemberVaultData } from '@/lib/vaultData';

export const metadata = { title: 'My Vault — CollectorHQ' };

export default async function VaultPage() {
  const data = await getMemberVaultData();
  return <VaultContent tier="member" data={data} />;
}
