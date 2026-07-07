import Link from 'next/link';
import styles from './SiteNav.module.css';

export interface NavSession {
  badge: string;
  username: string;
  avatar: string;
  logoutHref?: string;
}

const LOGGED_OUT_LINKS = [
  { href: '/explore', label: 'Explore' },
  { href: '/community', label: 'Community' },
  { href: '/leader', label: 'Leaders' },
  { href: '/pricing', label: 'Pricing' },
];

const LOGGED_IN_LINKS = [
  { href: '/explore', label: 'Explore' },
  { href: '/scan', label: 'Scan' },
  { href: '/vault', label: 'My Vault' },
  { href: '/community', label: 'Community' },
];

export default function SiteNav({
  active,
  session = null,
}: {
  active?: string;
  session?: NavSession | null;
}) {
  const links = session ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;

  return (
    <div className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <div className={styles.logoMark}>C</div>
        <span className={styles.logoText}>
          COLLECTOR<span className={styles.logoTextHq}>HQ</span>
        </span>
      </Link>

      <div className={styles.links}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={styles.link}>
            <span className={active === l.label ? styles.linkActive : undefined}>{l.label}</span>
          </Link>
        ))}
        {!session && (
          <Link href="/support-us" className={styles.link}>
            <span className={`${styles.pill} ${active === 'Support Us' ? styles.pillActive : ''}`}>
              Support Us ♥
            </span>
          </Link>
        )}
      </div>

      {session ? (
        <div className={styles.rightLoggedIn}>
          <span className={styles.badge}>{session.badge}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={session.avatar} alt="" className={styles.avatar} />
          <div>
            <div className={styles.username}>{session.username}</div>
            <Link href={session.logoutHref ?? '/login'} className={styles.logout}>
              log out
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.right}>
          <Link href="/login" className={styles.loginLink}>
            Log in
          </Link>
          <Link href="/login" className={styles.createBtn}>
            CREATE ACCOUNT
          </Link>
        </div>
      )}
    </div>
  );
}
