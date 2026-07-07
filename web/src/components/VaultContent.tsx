'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import SiteNav from './SiteNav';
import AdUnit from './AdUnit';
import type { VaultData } from '@/lib/vaultData';
import styles from '@/app/vault/vault.module.css';

const AV_H = 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400585/av-h.png';
const AV_B = '/art/av-b.png';

const FULL_GRADE_FEE = 24;
const FULL_REPAIR_FEE = 12;
const MEMBER_GRADE_FEE = 18;
const MEMBER_REPAIR_FEE = 9;

export default function VaultContent({
  tier,
  data,
}: {
  tier: 'member' | 'rookie';
  data: VaultData;
}) {
  const isMember = tier === 'member';
  const [tab, setTab] = useState<'dash' | 'all'>('dash');
  const [query, setQuery] = useState('');
  const [picks, setPicks] = useState<Record<string, 'grade' | 'repair' | undefined>>({});

  const setPick = (id: string, kind: 'grade' | 'repair') => {
    setPicks((s) => ({ ...s, [id]: s[id] === kind ? undefined : kind }));
  };

  const filteredSeries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.series;
    return data.series
      .map((sg) => ({
        ...sg,
        cards: sg.cards.filter((c) =>
          `${sg.game} ${sg.name} ${c.name} ${c.sub}`.toLowerCase().includes(q),
        ),
      }))
      .filter((sg) => sg.cards.length > 0);
  }, [data.series, query]);
  const noResults = query.trim() !== '' && filteredSeries.length === 0;

  const gradeFee = isMember ? MEMBER_GRADE_FEE : FULL_GRADE_FEE;
  const repairFee = isMember ? MEMBER_REPAIR_FEE : FULL_REPAIR_FEE;

  const trayItems = data.topCards
    .filter((c) => picks[c.id])
    .map((c) => {
      const kind = picks[c.id]!;
      return {
        id: c.id,
        icon: kind === 'grade' ? '🏆' : '🔧',
        name: c.name,
        service: kind === 'grade' ? 'PSA GRADING SUBMISSION' : 'REPAIR + PRESSING',
        fee: kind === 'grade' ? gradeFee : repairFee,
        fullFee: kind === 'grade' ? FULL_GRADE_FEE : FULL_REPAIR_FEE,
        memberFee: kind === 'grade' ? MEMBER_GRADE_FEE : MEMBER_REPAIR_FEE,
      };
    });
  const chargedSum = trayItems.reduce((a, t) => a + t.fee, 0);
  const fullSum = trayItems.reduce((a, t) => a + t.fullFee, 0);
  const memberSum = trayItems.reduce((a, t) => a + t.memberFee, 0);

  const session = {
    badge: isMember ? '★ MEMBER' : 'ROOKIE',
    username: isMember ? '@hokage_hoarder' : '@binder_baron',
    avatar: isMember ? AV_H : AV_B,
  };

  return (
    <div className={styles.page}>
      <div className={styles.demoBar}>
        DEMO — logged-in view:{' '}
        {isMember ? (
          <span className={styles.demoActive}>★ MEMBER</span>
        ) : (
          <Link href="/vault" className={styles.demoLink}>
            ★ MEMBER
          </Link>
        )}
        {' · '}
        {isMember ? (
          <Link href="/vault/rookie" className={styles.demoLink}>
            ROOKIE (FREE)
          </Link>
        ) : (
          <span className={styles.demoActive} style={{ color: '#fff' }}>
            ROOKIE (FREE)
          </span>
        )}
      </div>

      <SiteNav active="My Vault" session={session} />

      <div className={styles.header}>
        <div style={{ flex: 1 }}>
          <div className={styles.vaultLabel}>
            YOUR VAULT · {data.vaultCount} CARDS
          </div>
          <div className={styles.valueRow}>
            <span className={styles.value}>{data.totalValue}</span>
            <span className={styles.change}>{data.weeklyChange}</span>
          </div>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ transform: 'rotate(-1deg)' }}>
            <div className={styles.statLabel}>GRADED</div>
            <div className={styles.statValue}>{data.graded}</div>
          </div>
          <div className={styles.statCard} style={{ transform: 'rotate(1deg)' }}>
            <div className={styles.statLabel}>{isMember ? 'SCANS TODAY' : 'SCANS LEFT TODAY'}</div>
            <div className={styles.statValueRed}>
              {isMember ? (
                '∞'
              ) : (
                <>
                  6<span style={{ font: '700 14px var(--font-sans)', color: '#8a7f70' }}>/15</span>
                </>
              )}
            </div>
          </div>
          <Link href="/scan" className={styles.scanBtn}>
            ⚡ SCAN A CARD
          </Link>
        </div>
      </div>

      {!isMember && (
        <div className={styles.adBanner}>
          <div className={styles.adInner}>
            <span style={{ font: '400 11px Arial,sans-serif', color: '#006621', border: '1px solid #006621', borderRadius: 3, padding: '1px 5px', flex: 'none' }}>
              Ad
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ font: '400 16px Arial,sans-serif', color: '#1a0dab' }}>
                One Piece OP-09 &amp; Prismatic Evolutions — Preorder Now
              </div>
              <div style={{ font: '400 12px Arial,sans-serif', color: '#006621' }}>
                www.cardhavenshop.com/preorders
              </div>
              <div style={{ font: '400 12.5px Arial,sans-serif', color: '#545454' }}>
                Guaranteed release-day shipping on sealed boxes. Singles, sleeves &amp; toploaders in
                stock.
              </div>
            </div>
            <span style={{ font: '700 13px Arial,sans-serif', color: '#fff', background: '#1a73e8', borderRadius: 4, padding: '8px 16px', flex: 'none', cursor: 'pointer' }}>
              Shop Now
            </span>
          </div>
          <Link href="/pricing" className={styles.removeAdsLink}>
            Remove ads →
          </Link>
        </div>
      )}

      <div className={styles.tabsRow}>
        <span
          onClick={() => setTab('dash')}
          className={styles.tab}
          style={{ background: tab === 'dash' ? '#17130f' : '#fff', color: tab === 'dash' ? '#ffd23f' : '#17130f' }}
        >
          🏠 DASHBOARD
        </span>
        <span
          onClick={() => setTab('all')}
          className={styles.tab}
          style={{ background: tab === 'all' ? '#17130f' : '#fff', color: tab === 'all' ? '#ffd23f' : '#17130f' }}
        >
          🗂 ALL CARDS · {data.vaultCount}
        </span>
      </div>

      {tab === 'all' && (
        <div className={styles.binderWrap}>
          <div className={styles.searchBar}>
            <span style={{ font: '16px var(--font-sans)' }}>🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your cards — name, set, game…"
              className={styles.searchInput}
            />
          </div>
          {noResults && (
            <div className={styles.noResults}>No cards match your search — try another name or set.</div>
          )}
          <div className={styles.seriesList}>
            {filteredSeries.map((sg) => (
              <div key={sg.name}>
                <div className={styles.seriesHead}>
                  <span className={styles.seriesChip} style={{ background: sg.chipBg, color: sg.chipFg }}>
                    {sg.game}
                  </span>
                  <h2 className={styles.seriesName}>{sg.name}</h2>
                  <span className={styles.seriesMeta}>
                    {sg.count} cards · {sg.value}
                  </span>
                </div>
                <div className={styles.binderGrid}>
                  {sg.cards.map((bc) => (
                    <Link key={bc.id} href={`/card?card=${bc.id}`} className={styles.binderCard}>
                      {bc.art ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={bc.art} alt={bc.name} className={styles.binderImg} />
                      ) : (
                        <div className={styles.binderImgPlaceholder}>no image</div>
                      )}
                      <div className={styles.binderBody}>
                        <div className={styles.binderName}>{bc.name}</div>
                        <div className={styles.binderSub}>{bc.sub}</div>
                        <div className={styles.binderPrice}>{bc.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'dash' && (
        <div>
          <div className={styles.servicesSection}>
            <div className={styles.servicesHeadRow}>
              <h2 className={styles.servicesTitle}>{isMember ? 'Member services' : 'Card services'}</h2>
              {isMember ? (
                <span className={styles.memberDiscountBadge}>★ MEMBER DISCOUNT ACTIVE</span>
              ) : (
                <Link href="/pricing" className={styles.rookiePriceBadge}>
                  ★ Members pay 25% less →
                </Link>
              )}
            </div>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon} style={{ background: '#e6392f', transform: 'rotate(-4deg)' }}>
                  🏆
                </div>
                <div style={{ flex: 1 }}>
                  <div className={styles.serviceTitle}>Send for grading</div>
                  <p className={styles.serviceDesc}>
                    Pick cards below, we handle the PSA/BGS submission, insured shipping both ways,
                    and the grade lands straight in your vault.
                  </p>
                  <div className={styles.servicePrice}>
                    {isMember ? (
                      <>
                        from ${MEMBER_GRADE_FEE}/card{' '}
                        <span className={styles.strikePrice}>${FULL_GRADE_FEE}</span> · member −25%
                      </>
                    ) : (
                      <>
                        ${FULL_GRADE_FEE}/card{' '}
                        <span className={styles.mutedPrice}>· members pay ${MEMBER_GRADE_FEE}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon} style={{ background: '#ffd23f', transform: 'rotate(4deg)' }}>
                  🔧
                </div>
                <div style={{ flex: 1 }}>
                  <div className={styles.serviceTitle}>Card repair &amp; cleaning</div>
                  <p className={styles.serviceDesc}>
                    Surface cleaning, whitening removal and pro pressing before grading — small fixes
                    that turn a 8 into a 9.
                  </p>
                  <div className={styles.servicePrice}>
                    {isMember ? (
                      <>
                        from ${MEMBER_REPAIR_FEE}/card{' '}
                        <span className={styles.strikePrice}>${FULL_REPAIR_FEE}</span> · member −25%
                      </>
                    ) : (
                      <>
                        ${FULL_REPAIR_FEE}/card{' '}
                        <span className={styles.mutedPrice}>· members pay ${MEMBER_REPAIR_FEE}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mainGrid}>
            <div>
              <h2 className={styles.topCardsTitle}>Your top cards</h2>
              <div className={styles.topCardsList}>
                {data.topCards.map((c) => {
                  const pick = picks[c.id];
                  return (
                    <div key={c.id} className={styles.topCardRow} style={{ transform: `rotate(${c.tilt}deg)` }}>
                      <Link href={`/card?card=${c.cid}`} className={styles.topCardLink}>
                        {c.art ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={c.art} alt="" className={styles.topCardImg} />
                        ) : (
                          <div className={styles.topCardImg} style={{ background: '#efe7d3' }} />
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className={styles.topCardMeta}>
                            {c.game} · {c.condition}
                          </div>
                          <div className={styles.topCardName}>{c.name}</div>
                          <div className={styles.topCardPrice}>
                            {c.price}{' '}
                            <span className={styles.topCardDelta} style={{ color: c.deltaColor }}>
                              {c.delta}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className={styles.topCardActions}>
                        <button
                          onClick={() => setPick(c.id, 'grade')}
                          className={styles.pickBtn}
                          style={{
                            background: pick === 'grade' ? '#17130f' : '#fff',
                            color: pick === 'grade' ? '#ffd23f' : '#17130f',
                          }}
                        >
                          🏆 {pick === 'grade' ? 'ADDED ✓' : 'GRADE'}
                        </button>
                        <button
                          onClick={() => setPick(c.id, 'repair')}
                          className={styles.pickBtn}
                          style={{
                            background: pick === 'repair' ? '#17130f' : '#fff',
                            color: pick === 'repair' ? '#ffd23f' : '#17130f',
                          }}
                        >
                          🔧 {pick === 'repair' ? 'ADDED ✓' : 'REPAIR'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.tray}>
              <div className={styles.trayTitle}>Service box</div>
              <p className={styles.trayDesc}>
                Tap 🏆 Grade or 🔧 Repair on any card to add it. One insured shipment, one label.
              </p>
              {trayItems.length === 0 ? (
                <div className={styles.trayEmpty}>no cards selected yet</div>
              ) : (
                <>
                  <div className={styles.trayItems}>
                    {trayItems.map((t) => (
                      <div key={t.id} className={styles.trayItem}>
                        <span className={styles.trayItemIcon}>{t.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div className={styles.trayItemName}>{t.name}</div>
                          <div className={styles.trayItemService}>{t.service}</div>
                        </div>
                        <span className={styles.trayItemFee}>${t.fee}</span>
                        <button
                          onClick={() => setPicks((s) => ({ ...s, [t.id]: undefined }))}
                          className={styles.trayItemRemove}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  {isMember ? (
                    <>
                      <div className={styles.trayDiscountRow}>
                        <span>Member discount −25%</span>
                        <span style={{ color: '#7fe08a' }}>−${fullSum - memberSum}</span>
                      </div>
                      <div className={styles.trayTotalRow}>
                        <span className={styles.trayTotalLabel}>Total</span>
                        <span className={styles.trayTotalValue}>${chargedSum}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.trayTotalRowUpsell}>
                        <span className={styles.trayTotalLabel}>Total</span>
                        <span className={styles.trayTotalValue}>${fullSum}</span>
                      </div>
                      <Link href="/pricing" className={styles.upsellLink}>
                        members would pay ${memberSum} — save ${fullSum - memberSum} →
                      </Link>
                    </>
                  )}
                  <span className={styles.shippingBtn}>REQUEST SHIPPING LABEL →</span>
                </>
              )}
            </div>
          </div>

          {!isMember && (
            <div className={styles.footerAd}>
              <AdUnit
                headline="Grading Supplies Sale — Toploaders, Sleeves &amp; Card Savers"
                domain="www.mintcondition.store/supplies"
                desc="Protect your grails before shipping. Bulk discounts + free shipping over $35."
                cta="Shop Sale"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
