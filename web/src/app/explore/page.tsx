import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import ExploreGrid from '@/components/ExploreGrid';
import { CARDS, getCard } from '@/lib/cards';
import styles from './explore.module.css';

export const metadata = { title: 'Explore — CollectorHQ' };

export default async function ExplorePage() {
  const ids = Object.keys(CARDS);
  const cards = (await Promise.all(ids.map((id) => getCard(id)))).filter((c) => c !== null);

  return (
    <div className={styles.page}>
      <SiteNav active="Explore" />

      <ExploreGrid cards={cards} />

      <div className={styles.ctaStrip}>
        <div className={styles.ctaBolt}>⚡</div>
        <div className={styles.ctaBody}>
          <div className={styles.ctaTitle}>Got one of these in a binder?</div>
          <div className={styles.ctaDesc}>
            Scan it and it lands in your vault with a live price — 15 free scans a day.
          </div>
        </div>
        <Link href="/scan" className={styles.ctaBtn}>
          SCAN NOW →
        </Link>
      </div>

      <SiteFooter />
    </div>
  );
}
