'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Card } from '@/lib/cards';
import { RANGES, Range, computePriceChart } from '@/lib/priceChart';
import styles from './CardDetail.module.css';

export default function CardDetail({ card }: { card: Card }) {
  const router = useRouter();
  const [range, setRange] = useState<Range>('1Y');
  const chart = useMemo(() => computePriceChart(card, range), [card, range]);
  const lastSale = card.sales[0].price;

  const goBack = () => {
    if (typeof document !== 'undefined' && document.referrer) router.back();
    else router.push('/explore');
  };

  return (
    <div className={styles.page}>
      {/* logged-in nav */}
      <div className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          <div className={styles.logoMark}>C</div>
          <span className={styles.logoText}>
            COLLECTOR<span className={styles.logoTextHq}>HQ</span>
          </span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/explore" className={styles.navLink}>
            <span className={styles.navLinkActive}>Explore</span>
          </Link>
          <Link href="/scan" className={styles.navLink}>
            <span>Scan</span>
          </Link>
          <Link href="/vault" className={styles.navLink}>
            <span>My Vault</span>
          </Link>
          <Link href="/community" className={styles.navLink}>
            <span>Community</span>
          </Link>
        </div>
        <div className={styles.navRight}>
          <span className={styles.badge}>★ MEMBER</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400585/av-h.png"
            alt=""
            className={styles.avatar}
          />
          <div>
            <div className={styles.username}>@hokage_hoarder</div>
            <Link href="/login" className={styles.logout}>
              log out
            </Link>
          </div>
        </div>
      </div>

      {/* back bar */}
      <div className={styles.backBar}>
        <span onClick={goBack} className={styles.backBtn}>
          ← BACK TO COLLECTION
        </span>
      </div>

      <div className={styles.layout}>
        {/* left: card image */}
        <div className={styles.left}>
          <div className={styles.cardFrame}>
            {card.art ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.art} alt={card.name} className={styles.cardImg} />
            ) : (
              <div className={styles.cardPlaceholder}>
                <div className={styles.cardPlaceholderMark}>C</div>
                <div className={styles.cardPlaceholderText}>no image available</div>
              </div>
            )}
          </div>
          <div className={styles.chips}>
            <span className={styles.chipCond}>{card.cond}</span>
            <span className={styles.chipFinish}>{card.finish}</span>
            <span className={styles.chipPop}>{card.pop}</span>
          </div>
        </div>

        {/* right: details */}
        <div className={styles.right}>
          <div>
            <div className={styles.headTop}>
              <span
                className={styles.gameChip}
                style={{ background: card.chipBg, color: card.chipFg }}
              >
                {card.game}
              </span>
              <span className={styles.metaLine}>
                {card.set} · {card.number} · {card.rarity}
              </span>
            </div>
            <h1 className={styles.title}>{card.name}</h1>
            <div className={styles.priceRow}>
              <span className={styles.price}>{card.priceLabel}</span>
              <span className={styles.delta} style={{ color: chart.deltaColor }}>
                {chart.deltaLabel}
              </span>
            </div>
          </div>

          {/* price history */}
          <div className={styles.panel}>
            <div className={styles.historyHeader}>
              <h2 className={styles.historyTitle}>Price history</h2>
              <div className={styles.ranges}>
                {RANGES.map((r) => (
                  <span
                    key={r}
                    onClick={() => setRange(r)}
                    className={`${styles.rangeBtn} ${r === range ? styles.rangeBtnActive : ''}`}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.chartWrap}>
              <svg viewBox="0 0 680 240" className={styles.chartSvg}>
                <line x1="0" y1="18" x2="680" y2="18" style={{ stroke: '#e8e0cf', strokeWidth: 1.5, strokeDasharray: '4 5' }} />
                <line x1="0" y1="120" x2="680" y2="120" style={{ stroke: '#e8e0cf', strokeWidth: 1.5, strokeDasharray: '4 5' }} />
                <line x1="0" y1="222" x2="680" y2="222" style={{ stroke: '#e8e0cf', strokeWidth: 1.5, strokeDasharray: '4 5' }} />
                <polygon points={chart.areaPoints} style={{ fill: 'rgba(230,57,47,.10)' }} />
                <polyline
                  points={chart.linePoints}
                  style={{ fill: 'none', stroke: '#e6392f', strokeWidth: 3.5, strokeLinejoin: 'round', strokeLinecap: 'round' }}
                />
                <circle cx={chart.dotX} cy={chart.dotY} r="6" style={{ fill: '#e6392f', stroke: '#17130f', strokeWidth: 2.5 }} />
              </svg>
              <span className={`${styles.axisLabel} ${styles.axisLabelTop}`}>{chart.yMax}</span>
              <span className={`${styles.axisLabel} ${styles.axisLabelBottom}`}>{chart.yMin}</span>
            </div>
            <div className={styles.xLabels}>
              {chart.xLabels.map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>
          </div>

          {/* stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>52-WEEK HIGH</div>
              <div className={styles.statValue}>{card.high}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>52-WEEK LOW</div>
              <div className={styles.statValue}>{card.low}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>LAST SALE</div>
              <div className={`${styles.statValue} ${styles.statValueRed}`}>{lastSale}</div>
            </div>
          </div>

          {/* recent sales */}
          <div className={styles.salesCard}>
            <div className={styles.salesHead}>
              <span>Date</span>
              <span>Marketplace</span>
              <span>Condition</span>
              <span style={{ textAlign: 'right' }}>Sold for</span>
            </div>
            {card.sales.map((s, i) => (
              <div key={i} className={styles.saleRow}>
                <span className={styles.saleDate}>{s.date}</span>
                <span className={styles.salePlatform}>{s.platform}</span>
                <span className={styles.saleCond}>{s.cond}</span>
                <span className={styles.salePrice}>{s.price}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <div className={styles.ctaBolt}>⚡</div>
            <div className={styles.ctaText}>
              <div className={styles.ctaTitle}>Got this card?</div>
              <div className={styles.ctaSub}>Scan it and it lands in your vault at today&apos;s price.</div>
            </div>
            <Link href="/scan" className={styles.ctaBtn}>
              SCAN NOW →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
