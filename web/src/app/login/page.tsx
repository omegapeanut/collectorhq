'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'join'>('login');
  const [taps, setTaps] = useState(0);

  const isJoin = mode === 'join';

  const onSecretTap = () => {
    const n = taps + 1;
    if (n >= 10) {
      router.push('/admin');
      return;
    }
    setTaps(n);
  };

  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              background: '#e6392f',
              border: '3px solid #17130f',
              borderRadius: 8,
              display: 'grid',
              placeItems: 'center',
              font: '26px var(--font-display)',
              color: '#ffd23f',
              transform: 'rotate(-6deg)',
              boxShadow: '3px 3px 0 #17130f',
            }}
          >
            C
          </div>
          <span style={{ font: '21px var(--font-display)', letterSpacing: '-.01em' }}>
            COLLECTOR<span style={{ color: '#e6392f' }}>HQ</span>
          </span>
        </Link>
        <div style={{ display: 'flex', gap: 26, font: '700 14.5px var(--font-sans)', alignItems: 'center' }}>
          <Link href="/explore" style={{ color: 'inherit', textDecoration: 'none' }}>
            Explore
          </Link>
          <Link href="/community" style={{ color: 'inherit', textDecoration: 'none' }}>
            Community
          </Link>
          <Link href="/leader" style={{ color: 'inherit', textDecoration: 'none' }}>
            Leaders
          </Link>
          <Link href="/pricing" style={{ color: 'inherit', textDecoration: 'none' }}>
            Pricing
          </Link>
          <Link href="/support-us" style={{ color: 'inherit', textDecoration: 'none' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#ffd23f',
                border: '2px solid #17130f',
                borderRadius: 999,
                padding: '3px 13px',
                transform: 'rotate(-2deg)',
              }}
            >
              Support Us ♥
            </span>
          </Link>
        </div>
        <div style={{ width: 120 }} />
      </div>

      <div className={styles.cardWrap}>
        <div className={styles.card}>
          <div className={styles.tabs}>
            <span
              onClick={() => setMode('login')}
              className={styles.tab}
              style={{ background: isJoin ? '#fff' : '#17130f', color: isJoin ? '#17130f' : '#ffd23f' }}
            >
              LOG IN
            </span>
            <span
              onClick={() => setMode('join')}
              className={styles.tabJoin}
              style={{ background: isJoin ? '#e6392f' : '#fff', color: isJoin ? '#fff' : '#17130f' }}
            >
              CREATE ACCOUNT
            </span>
          </div>
          <div className={styles.body}>
            <h1 className={styles.heading}>{isJoin ? 'Create your account' : 'Welcome back'}</h1>
            <p className={styles.sub}>
              {isJoin
                ? 'Claim your handle and start scanning — free forever.'
                : 'Log in to your vault. Your cards missed you.'}
            </p>
            <div className={styles.form}>
              {isJoin && (
                <div className={styles.field}>
                  <label className={styles.label}>COLLECTOR HANDLE</label>
                  <input placeholder="@your_handle" className={styles.input} />
                </div>
              )}
              <div className={styles.field}>
                <label className={styles.label}>EMAIL</label>
                <input placeholder="you@example.com" className={styles.input} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>PASSWORD</label>
                <input type="password" placeholder="••••••••" className={styles.input} />
              </div>
              <Link href="/vault" className={styles.cta}>
                {isJoin ? 'CREATE MY VAULT →' : 'LOG IN →'}
              </Link>
              {!isJoin && <span className={styles.forgot}>Forgot password?</span>}
              {isJoin && (
                <span className={styles.joinNote}>Free forever · 15 scans a day · no card required</span>
              )}
            </div>
          </div>
          <div className={styles.trustBar}>★ 12,400+ collectors already tracking their vaults</div>
        </div>
      </div>

      <div className={styles.footer}>
        <button onClick={onSecretTap} className={styles.footerLogo}>
          COLLECTORHQ{taps >= 5 ? ` · ${10 - taps}` : ''}
        </button>
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>
            Home
          </Link>
          <Link href="/pricing" className={styles.footerLink}>
            Pricing
          </Link>
          <Link href="/support-us" className={styles.footerLink}>
            Support Us
          </Link>
        </div>
      </div>
    </div>
  );
}
