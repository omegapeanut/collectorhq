'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Landing.module.css';

export interface HeroSlideData {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  desc: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  bgVariant: 'yellow' | 'blue' | 'green';
  statALabel: string;
  statAValue: string;
  statADelta: string;
  ribbon: string;
  statBLabel: string;
  statBValue: string;
  statBDelta: string;
  socialText: string;
}

const AUTOPLAY_MS = 6500;

export default function HeroCarousel({ slides }: { slides: HeroSlideData[] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const go = useCallback(
    (i: number) => {
      setIndex(((i % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
  }, [slides.length]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  const onDotClick = (i: number) => {
    go(i);
    restartTimer();
  };
  const onPrev = () => {
    go(index - 1);
    restartTimer();
  };
  const onNext = () => {
    go(index + 1);
    restartTimer();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };
  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current < 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div
      className={styles.heroViewport}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.heroTrack} style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div className={styles.heroSlide} key={i} aria-hidden={i !== index}>
            <div className={styles.hero}>
              <div className={styles.heroLeft}>
                <div className={styles.heroBadge}>{s.badge}</div>
                <h1 className={styles.heroTitle}>{s.titleLine1}</h1>
                <h1 className={styles.heroTitleRed}>{s.titleLine2}</h1>
                <p className={styles.heroDesc}>{s.desc}</p>
                <div className={styles.heroCtas}>
                  <Link href={s.ctaPrimaryHref} className={styles.heroCtaPrimary}>
                    {s.ctaPrimaryLabel}
                  </Link>
                  <Link href={s.ctaSecondaryHref} className={styles.heroCtaSecondary}>
                    {s.ctaSecondaryLabel}
                  </Link>
                </div>
                <div className={styles.heroSocial}>
                  <div className={styles.avatarStack}>
                    <div className={styles.avatarStackItem} style={{ background: '#e6392f', color: '#fff' }}>
                      K
                    </div>
                    <div className={styles.avatarStackItem} style={{ background: '#ffd23f' }}>
                      R
                    </div>
                    <div className={styles.avatarStackItem} style={{ background: '#3a7bd5', color: '#fff' }}>
                      J
                    </div>
                  </div>
                  <span className={styles.heroSocialText}>{s.socialText}</span>
                </div>
              </div>
              <div className={styles.heroRight}>
                <div
                  className={`${styles.heroBg} ${
                    s.bgVariant === 'blue' ? styles.heroBgBlue : s.bgVariant === 'green' ? styles.heroBgGreen : ''
                  }`}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/art/hero-burst.png" alt="" className={styles.heroCharImg} />
                <div className={styles.heroPriceCard}>
                  <div className={styles.heroPriceLabel}>{s.statALabel}</div>
                  <div className={styles.heroPriceValue}>
                    {s.statAValue}{' '}
                    <span style={{ font: '800 13px var(--font-sans)', color: '#1c9e4f' }}>{s.statADelta}</span>
                  </div>
                </div>
                <div className={styles.heroPsaBadge}>{s.ribbon}</div>
                <div className={styles.heroVaultCard}>
                  <div className={styles.heroVaultLabel}>{s.statBLabel}</div>
                  <div className={styles.heroVaultValue}>
                    {s.statBValue}{' '}
                    <span style={{ font: '800 12px var(--font-sans)', color: '#1c9e4f' }}>{s.statBDelta}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className={`${styles.heroArrow} ${styles.heroArrowLeft}`} onClick={onPrev} aria-label="Previous banner">
        ‹
      </button>
      <button type="button" className={`${styles.heroArrow} ${styles.heroArrowRight}`} onClick={onNext} aria-label="Next banner">
        ›
      </button>

      <div className={styles.heroDots}>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.heroDot} ${i === index ? styles.heroDotActive : ''}`}
            onClick={() => onDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
