import SiteNav from '@/components/SiteNav';
import SupportUsContent from '@/components/SupportUsContent';
import styles from './support-us.module.css';

export const metadata = { title: 'Support Us — CollectorHQ' };

export default function SupportUsPage() {
  return (
    <div className={styles.page}>
      <SiteNav active="Support Us" />
      <SupportUsContent />
      <div className={styles.footerStrip}>Built with passion, for real collectors. © 2026 CollectorHQ</div>
    </div>
  );
}
