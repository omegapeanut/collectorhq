import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PricingPlans from '@/components/PricingPlans';
import styles from './pricing.module.css';

export const metadata = { title: 'Pricing — CollectorHQ' };

const FAQS = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel in one tap; you keep Member perks until the end of your billing period. Your vault and cards are never locked.',
    tilt: -0.4,
  },
  {
    q: 'What happens to my scans if I downgrade?',
    a: 'Nothing. Every card you’ve scanned stays in your vault with live pricing — you just drop back to 15 new scans a day.',
    tilt: 0.4,
  },
  {
    q: 'How accurate are the prices?',
    a: 'We aggregate recent sales across major marketplaces and update daily — raw, graded and sealed tracked separately.',
    tilt: 0.3,
  },
  {
    q: 'Do donations unlock Member perks?',
    a: 'Donations keep the HQ alive and put you on the supporters wall, but they’re separate from Member subscriptions.',
    tilt: -0.3,
  },
  {
    q: 'How do I get a Shop account?',
    a: 'Shop accounts are invite-only for physical TCG stores. Request an invite and our team will set up your account — you’ll get a temporary password to change on first login.',
    tilt: 0.4,
  },
  {
    q: 'How does the lucky draw work?',
    a: 'Every scan during the month earns entries. Winners get a claim code and pick up their prize in person at a partner shop.',
    tilt: -0.4,
  },
];

export default function PricingPage() {
  return (
    <div className={styles.page}>
      <SiteNav active="Pricing" />

      <PricingPlans />

      <div className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Straight answers</h2>
        <div className={styles.faqGrid}>
          {FAQS.map((f, i) => (
            <div key={i} className={styles.faqCard} style={{ transform: `rotate(${f.tilt}deg)` }}>
              <div className={styles.faqQ}>{f.q}</div>
              <p className={styles.faqA}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.supportStrip}>
        <div className={styles.supportEmoji}>♥</div>
        <div className={styles.supportBody}>
          <div className={styles.supportTitle}>Not into subscriptions? Support the HQ.</div>
          <div className={styles.supportDesc}>
            One-off donations keep the servers running. Supporters get a spot on the wall of fame.
          </div>
        </div>
        <Link href="/support-us" className={styles.supportBtn}>
          DONATE →
        </Link>
      </div>

      <SiteFooter />
    </div>
  );
}
