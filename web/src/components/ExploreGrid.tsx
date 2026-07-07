'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Card, Game } from '@/lib/cards';
import { cardBadge, cardSub, cardTilt } from '@/lib/cardDisplay';
import AdUnit from './AdUnit';
import styles from './ExploreGrid.module.css';
import pageStyles from '@/app/explore/explore.module.css';

const FILTERS: Array<Game | 'ALL'> = ['ALL', 'ONE PIECE', 'NARUTO', 'POKÉMON', 'MAGIC'];

export default function ExploreGrid({ cards }: { cards: Card[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Game | 'ALL'>('ALL');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter((c) => {
      if (filter !== 'ALL' && c.game !== filter) return false;
      if (!q) return true;
      const haystack = `${c.name} ${c.game} ${cardSub(c)}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [cards, query, filter]);

  const resultsLabel = filter === 'ALL' ? "This week's movers" : `${filter} movers`;

  return (
    <>
      <div className={pageStyles.header}>
        <div className={pageStyles.kicker}>THE CATALOG</div>
        <h1 className={pageStyles.title}>Explore 200,000+ cards</h1>
        <p className={pageStyles.subtitle}>
          Live prices across 14 TCGs. Search anything — a card, a set, a character.
        </p>
        <div className={styles.searchRow}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cards, sets, characters…"
            className={styles.searchInput}
          />
          <span className={styles.searchBtn}>SEARCH</span>
        </div>
        <div className={styles.filterRow}>
          {FILTERS.map((f) => (
            <span
              key={f}
              onClick={() => setFilter(f)}
              className={styles.filterPill}
              style={{
                background: f === filter ? '#17130f' : '#fff',
                color: f === filter ? '#ffd23f' : '#17130f',
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className={pageStyles.adSlot}>
        <AdUnit
          headline="2026 TCG Release Calendar — Every Set Date, One Page"
          domain="www.tcgreleasedates.com"
          desc="Pokémon, One Piece, Naruto Kayou & MTG release dates with preorder alerts."
        />
      </div>

      <div className={pageStyles.resultsSection}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>{resultsLabel}</h2>
          <span className={styles.resultsCount}>{filtered.length} results · sorted by 7-day movement</span>
        </div>
        <div className={styles.grid}>
          {filtered.map((c) => {
            const badge = cardBadge(c);
            const up = c.deltaPct >= 0;
            return (
              <Link
                key={c.id}
                href={`/card?card=${c.id}`}
                className={styles.card}
                style={{ transform: `rotate(${cardTilt(c.id)}deg)` }}
              >
                <div className={styles.imgWrap}>
                  {c.art ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.art} alt={c.name} className={styles.img} />
                  ) : (
                    <div className={styles.imgPlaceholder}>no image</div>
                  )}
                  <div className={styles.badge} style={{ background: badge.bg, color: badge.fg }}>
                    {badge.label}
                  </div>
                </div>
                <div className={styles.body}>
                  <div className={styles.game}>{c.game}</div>
                  <div className={styles.name}>{c.name}</div>
                  <div className={styles.sub}>{cardSub(c)}</div>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>{c.priceLabel}</span>
                    <span className={styles.delta} style={{ color: up ? '#1c9e4f' : '#c0362c' }}>
                      {up ? '▲' : '▼'}
                      {Math.abs(c.deltaPct).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
