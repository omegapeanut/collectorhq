'use client';

import { useEffect, useMemo, useState } from 'react';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import styles from './CatalogContent.module.css';
import { getCatalogCards, type CatalogCard, type CatalogSetSummary } from '@/lib/catalog';

export default function CatalogContent({
  sets,
  initialSet,
  initialCards,
}: {
  sets: CatalogSetSummary[];
  initialSet: string | null;
  initialCards: CatalogCard[];
}) {
  const [selectedSet, setSelectedSet] = useState(initialSet);
  const [loadedSet, setLoadedSet] = useState(initialSet);
  const [cards, setCards] = useState(initialCards);
  const [query, setQuery] = useState('');
  const loading = selectedSet !== loadedSet;

  useEffect(() => {
    if (selectedSet === null || selectedSet === loadedSet) return;
    let cancelled = false;
    getCatalogCards('onepiece', selectedSet).then((result) => {
      if (!cancelled) {
        setCards(result);
        setLoadedSet(selectedSet);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [selectedSet, loadedSet]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter((c) => `${c.name} ${c.number ?? ''}`.toLowerCase().includes(q));
  }, [cards, query]);

  return (
    <div className={styles.page}>
      <SiteNav />

      <div className={styles.header}>
        <div className={styles.kicker}>FULL CATALOG</div>
        <h1 className={styles.title}>Every card, one checklist.</h1>
        <p className={styles.subtitle}>
          {sets.reduce((sum, s) => sum + s.count, 0).toLocaleString()} cards across {sets.length} sets. No prices
          here — just the checklist. Live prices come from the market feed elsewhere on the site.
        </p>
      </div>

      {sets.length === 0 ? (
        <div className={styles.gridWrap}>
          <div className={styles.emptyNote}>
            No catalog data imported yet. Run <code>npm run import:catalog</code> to load a set.
          </div>
        </div>
      ) : (
        <>
          <div className={styles.setRow}>
            {sets.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSet(s.set)}
                className={styles.setPill}
                data-active={s.set === selectedSet}
              >
                {s.set} <span className={styles.setPillCount}>{s.count}</span>
              </button>
            ))}
          </div>

          <div className={styles.searchRow}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search this set by name or number…"
              className={styles.searchInput}
            />
          </div>

          <div className={styles.gridWrap}>
            {loading ? (
              <div className={styles.emptyNote}>Loading {selectedSet}…</div>
            ) : filtered.length === 0 ? (
              <div className={styles.emptyNote}>
                {query ? <>No cards match &ldquo;{query}&rdquo;.</> : 'This set has no cards yet.'}
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((c) => (
                  <div key={c.id} className={styles.card}>
                    <div className={styles.imgWrap}>
                      {c.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.imageUrl} alt={c.name} className={styles.img} />
                      ) : (
                        <div className={styles.imgPlaceholder}>NO IMAGE YET</div>
                      )}
                      {c.finish === 'Foil' && <span className={styles.foilBadge}>FOIL</span>}
                    </div>
                    <div className={styles.body}>
                      <div className={styles.cardMeta}>
                        {c.number ?? '—'} {c.rarity ? `· ${c.rarity}` : ''}
                      </div>
                      <div className={styles.cardName}>{c.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <SiteFooter />
    </div>
  );
}
