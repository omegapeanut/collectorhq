'use client';

import { useRef, useState } from 'react';
import styles from '@/app/support-us/support-us.module.css';

const BANK_TEXT = 'DBS Bank · CollectorHQ Pte Ltd · 012-345678-9';
const BTC_ADDRESS = 'bc1qhq7c0llect0rhq4xk9v3m2plzt8w6yfd5a2r9e';

const SUPPORTERS = [
  { badge: '💛', name: '@grail_goblin', note: 'x12', tilt: -1.5 },
  { badge: '♥', name: '@sleeved_up', note: 'x8', tilt: 1 },
  { badge: '💛', name: '@binder_baron', note: 'x7', tilt: -0.5 },
  { badge: '♥', name: '@mint_or_bust', note: 'x5', tilt: 1.5 },
  { badge: '♥', name: 'Anonymous', note: 'x5', tilt: -1 },
  { badge: '♥', name: '@psa10dreams', note: 'x4', tilt: 0.5 },
  { badge: '♥', name: '@topdeck_tess', note: 'x3', tilt: -1.5 },
  { badge: '♥', name: '@vault_kid', note: 'x2', tilt: 1 },
];

export default function SupportUsContent() {
  const [bankCopied, setBankCopied] = useState(false);
  const [btcCopied, setBtcCopied] = useState(false);
  const bankTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const btcTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copyBank = () => {
    navigator.clipboard?.writeText(BANK_TEXT);
    setBankCopied(true);
    clearTimeout(bankTimer.current);
    bankTimer.current = setTimeout(() => setBankCopied(false), 2000);
  };
  const copyBtc = () => {
    navigator.clipboard?.writeText(BTC_ADDRESS);
    setBtcCopied(true);
    clearTimeout(btcTimer.current);
    btcTimer.current = setTimeout(() => setBtcCopied(false), 2000);
  };

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroHeart}>♥</div>
        <h1 className={styles.heroTitle}>Keep the HQ running</h1>
        <p className={styles.heroDesc}>
          CollectorHQ is built with passion, for real collectors — no investors, no data selling.
          One-off donations cover servers, pricing data and late-night coding fuel.
        </p>
      </div>

      <div className={styles.donationGrid}>
        <div className={`${styles.card} ${styles.cardBank}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBank}>🏦</div>
            <div className={styles.cardTitle}>Bank transfer</div>
          </div>
          <p className={styles.cardDesc} style={{ color: '#4a4238' }}>
            Direct transfer, no middleman fees — every dollar reaches the HQ.
          </p>
          <div className={styles.bankDetails}>
            <div className={styles.bankRow}>
              <span className={styles.bankLabel}>BANK</span>
              <span>DBS Bank</span>
            </div>
            <div className={styles.bankRow}>
              <span className={styles.bankLabel}>NAME</span>
              <span>CollectorHQ Pte Ltd</span>
            </div>
            <div className={styles.bankRow}>
              <span className={styles.bankLabel}>ACCOUNT</span>
              <span>012-345678-9</span>
            </div>
            <div className={styles.bankRow}>
              <span className={styles.bankLabel}>REFERENCE</span>
              <span>Your username</span>
            </div>
          </div>
          <button onClick={copyBank} className={styles.copyBtn}>
            {bankCopied ? '✔ COPIED!' : 'COPY BANK DETAILS'}
          </button>
        </div>

        <div className={`${styles.card} ${styles.cardBtc}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBtc}>₿</div>
            <div className={styles.cardTitle} style={{ color: '#ffd23f' }}>
              Bitcoin
            </div>
          </div>
          <p className={styles.cardDesc} style={{ color: '#b5aa9c' }}>
            Borderless and anonymous-friendly. Send any amount to the HQ wallet.
          </p>
          <div className={styles.btcRow}>
            <div className={styles.qr}>
              <svg width="94" height="94" viewBox="0 0 21 21" style={{ display: 'block' }}>
                <rect width="21" height="21" fill="#fff" />
                <path
                  d="M1 1h7v7H1zM3 3h3v3H3zM13 1h7v7h-7zM15 3h3v3h-3zM1 13h7v7H1zM3 15h3v3H3zM10 1h1v2h-1zM10 4h2v1h-2zM9 6h1v3h-1zM11 6h1v1h-1zM13 9h2v1h-2zM16 9h1v2h-1zM18 10h2v1h-2zM9 10h3v1H9zM1 10h2v1H1zM4 9h1v2H4zM6 10h2v1H6zM10 12h1v2h-1zM12 12h1v1h-1zM9 15h1v2H9zM10 14h2v1h-2zM13 13h1v3h-1zM15 14h2v1h-2zM18 13h2v2h-2zM14 17h1v2h-1zM16 17h2v1h-2zM19 16h1v2h-1zM10 18h2v2h-2zM17 19h3v1h-3z"
                  fill="#17130f"
                />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className={styles.walletLabel}>HQ WALLET (BTC)</div>
              <div className={styles.walletAddress}>{BTC_ADDRESS}</div>
            </div>
          </div>
          <button onClick={copyBtc} className={styles.copyBtnBtc}>
            {btcCopied ? '✔ ADDRESS COPIED!' : 'COPY WALLET ADDRESS'}
          </button>
        </div>
      </div>

      <div className={styles.wallSection}>
        <div className={styles.wallKickerWrap}>
          <span className={styles.wallKicker}>WALL OF FAME</span>
        </div>
        <h2 className={styles.wallTitle}>Legendary supporters</h2>
        <div className={styles.supporterGrid}>
          {SUPPORTERS.map((s, i) => (
            <div key={i} className={styles.supporterPill} style={{ transform: `rotate(${s.tilt}deg)` }}>
              <span style={{ fontSize: 15 }}>{s.badge}</span>
              <span className={styles.supporterName}>{s.name}</span>
              <span className={styles.supporterNote}>{s.note}</span>
            </div>
          ))}
        </div>
        <p className={styles.wallFootnote}>
          Every donation lands you here (or stay anonymous — your call). Big-hearted supporters get
          the gold heart.
        </p>
      </div>
    </>
  );
}
