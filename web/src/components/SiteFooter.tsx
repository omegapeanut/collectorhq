import Link from 'next/link';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return (
    <div className={styles.footer}>
      <div className={styles.brand}>
        <div className={styles.logoMark}>C</div>
        <span className={styles.logoText}>COLLECTORHQ</span>
      </div>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/catalog" className={styles.link}>
          Catalog
        </Link>
        <Link href="/community" className={styles.link}>
          Community
        </Link>
        <Link href="/leader" className={styles.link}>
          Leaders
        </Link>
        <Link href="/support-us" className={styles.link}>
          Support Us
        </Link>
      </div>
    </div>
  );
}
