'use client';

import { useRef, useState } from 'react';
import SiteNav from './SiteNav';
import { DEMO_MEMBER_SESSION } from '@/lib/session';
import styles from '@/app/scan/scan.module.css';

const RECENT_SCANS = [
  { name: 'Umbreon VMAX Alt Art', sub: 'POKÉMON · EVOLVING SKIES', price: '$612', status: 'IN VAULT' },
  { name: 'Kayou Tier 4 Naruto SSR', sub: 'NARUTO · KAYOU', price: '$118', status: 'IN VAULT' },
  { name: 'The One Ring (Foil)', sub: 'MAGIC · LTR', price: '$148', status: 'IN VAULT' },
];

export default function ScanContent({
  uploadArt,
  matchArt,
}: {
  uploadArt: string;
  matchArt: string;
}) {
  const [scanning, setScanning] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [scansUsed, setScansUsed] = useState(3);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const limit = 15;

  const startScan = () => {
    if (scanning) return;
    setScanning(true);
    setShowResult(false);
    setAdded(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setScanning(false);
      setShowResult(true);
      setScansUsed((n) => n + 1);
    }, 2400);
  };

  return (
    <div className={styles.page}>
      <SiteNav
        active="Scan"
        session={{ ...DEMO_MEMBER_SESSION, badge: `${limit - scansUsed} / ${limit} SCANS LEFT` }}
      />

      <div className={styles.header}>
        <div className={styles.kicker}>CARD RECOGNITION</div>
        <h1 className={styles.title}>Scan your card</h1>
        <p className={styles.subtitle}>
          Snap it or drop it. The recognition AI identifies the card and prefills everything — you
          just confirm and it lands in your vault.
        </p>
      </div>

      <div className={styles.layout}>
        {/* scanner panel */}
        <div className={styles.scannerPanel}>
          <div className={styles.panelHeadYellow}>
            <span className={styles.panelHeadTitle}>📸 Scanner</span>
            <span className={styles.panelHeadStep}>STEP 1 / 2</span>
          </div>
          <div className={styles.scanBox}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={uploadArt} alt="" className={styles.scanImg} />
            {scanning && <div className={styles.scanline} />}
          </div>
          <div className={styles.scannerActions}>
            <button onClick={startScan} className={styles.scanBtn}>
              {scanning ? 'SCANNING…' : '⚡ SCAN IT'}
            </button>
            <button className={styles.manualBtn}>Manual entry</button>
          </div>
        </div>

        {/* result column */}
        <div className={styles.resultCol}>
          {showResult && (
            <div className={styles.resultPanel}>
              <div className={styles.panelHeadRed}>
                <span className={styles.panelHeadTitle}>⚡ Match found!</span>
                <span className={styles.confidence}>98% CONFIDENT</span>
              </div>
              <div className={styles.matchBody}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={matchArt} alt="" className={styles.matchImg} />
                <div style={{ flex: 1 }}>
                  <div className={styles.matchMeta}>ONE PIECE · OP-01 ROMANCE DAWN</div>
                  <div className={styles.matchName}>Shanks</div>
                  <div className={styles.matchSub}>OP01-120 · SECRET RARE · ALT ART</div>
                  <div className={styles.priceChips}>
                    <div className={styles.priceChip}>
                      <div className={styles.priceChipLabel}>RAW NM</div>
                      <div className={styles.priceChipValue}>$389</div>
                    </div>
                    <div className={styles.priceChip}>
                      <div className={styles.priceChipLabel}>PSA 9</div>
                      <div className={styles.priceChipValue}>$710</div>
                    </div>
                    <div className={styles.priceChip}>
                      <div className={styles.priceChipLabel}>PSA 10</div>
                      <div className={styles.priceChipValue}>$1,240</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.confirmForm}>
                <div>
                  <div className={styles.fieldLabel}>CONDITION</div>
                  <select className={styles.select}>
                    <option>Raw · Near Mint</option>
                    <option>Raw · Lightly Played</option>
                    <option>Graded · PSA 10</option>
                    <option>Graded · PSA 9</option>
                    <option>Sealed</option>
                  </select>
                </div>
                <div>
                  <div className={styles.fieldLabel}>QUANTITY</div>
                  <input type="number" defaultValue={1} min={1} className={styles.numInput} />
                </div>
                <div>
                  <div className={styles.fieldLabel}>COLLECTION</div>
                  <select className={styles.select}>
                    <option>Main Vault</option>
                    <option>Trade Binder</option>
                    <option>Sealed Vault</option>
                    <option>+ New collection…</option>
                  </select>
                </div>
              </div>
              <div className={styles.confirmActions}>
                <button onClick={() => setAdded(true)} className={styles.addBtn}>
                  {added ? '✔ ADDED TO VAULT!' : 'ADD TO VAULT →'}
                </button>
                <button className={styles.wrongBtn}>Wrong card?</button>
              </div>
            </div>
          )}

          <div className={styles.recentPanel}>
            <div className={styles.recentHead}>
              <span className={styles.recentTitle}>Recent scans</span>
              <span className={styles.recentWhen}>TODAY</span>
            </div>
            <div>
              {RECENT_SCANS.map((r, i) => (
                <div key={i} className={styles.recentRow}>
                  <div className={styles.recentThumb} />
                  <div style={{ flex: 1 }}>
                    <div className={styles.recentName}>{r.name}</div>
                    <div className={styles.recentSub}>{r.sub}</div>
                  </div>
                  <div>
                    <div className={styles.recentPrice}>{r.price}</div>
                    <div className={styles.recentStatus}>{r.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
