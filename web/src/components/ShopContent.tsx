'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ShopSeriesGroup } from '@/lib/shopData';
import styles from '@/app/shop/shop.module.css';

type Tab = 'stock' | 'binder' | 'preorders' | 'orders' | 'claims';

const NAV_ITEMS: Array<{ tab: Tab; label: string }> = [
  { tab: 'stock', label: '📦 Stock showcase' },
  { tab: 'binder', label: '🗂 Card binder' },
  { tab: 'preorders', label: '📅 Preorders' },
  { tab: 'orders', label: '🧾 Incoming orders' },
  { tab: 'claims', label: '🎰 Lucky draw claims' },
];

const TITLES: Record<Tab, string> = {
  stock: 'Stock showcase',
  binder: 'Card binder — singles',
  preorders: 'Preorder schedule',
  orders: 'Incoming orders',
  claims: 'Lucky draw claims',
};

const STOCK = [
  { art: '/art/box-pokemon.png', game: 'POKÉMON', name: 'SV 151 Booster Bundle', price: '$34', qty: 18, badge: 'IN STOCK', badgeBg: '#1c9e4f', badgeFg: '#fff' },
  { art: '/art/box-onepiece.png', game: 'ONE PIECE', name: 'OP-10 Booster Box (EN)', price: '$96', qty: 3, badge: 'LOW STOCK', badgeBg: '#ffd23f', badgeFg: '#17130f' },
  { art: '/art/box-magic.png', game: 'MAGIC', name: 'Bloomburrow Play Booster', price: '$5.50', qty: 140, badge: 'IN STOCK', badgeBg: '#1c9e4f', badgeFg: '#fff' },
  { art: '/art/box-naruto.png', game: 'NARUTO', name: 'Kayou Tier 3 Box', price: '$42', qty: 0, badge: 'SOLD OUT', badgeBg: '#e6392f', badgeFg: '#fff' },
  { art: '/art/box-ygo.png', game: 'YU-GI-OH!', name: 'Rarity Collection II', price: '$58', qty: 9, badge: 'IN STOCK', badgeBg: '#1c9e4f', badgeFg: '#fff' },
  { art: '/art/box-lorcana.png', game: 'LORCANA', name: 'Shimmering Skies ETB', price: '$49', qty: 5, badge: 'LOW STOCK', badgeBg: '#ffd23f', badgeFg: '#17130f' },
];

const PREORDERS_RAW = [
  { id: 'pr1', name: 'Prismatic Evolutions ETB', game: 'POKÉMON', release: 'Aug 14', taken: '37 / 60', pct: 62, deposit: '$20', barColor: '#1c9e4f' },
  { id: 'pr2', name: 'OP-11 Booster Box (JP)', game: 'ONE PIECE', release: 'Aug 29', taken: '34 / 40', pct: 85, deposit: '$15', barColor: '#e6392f' },
  { id: 'pr3', name: 'Kayou Tier 4 Wave 6', game: 'NARUTO', release: 'Sep 12', taken: '12 / 80', pct: 15, deposit: '$10', barColor: '#1c9e4f' },
  { id: 'pr4', name: 'Fabled — Illumineer’s Trove', game: 'LORCANA', release: 'Sep 5', taken: '19 / 50', pct: 38, deposit: '$10', barColor: '#1c9e4f' },
];

const ORDERS = [
  { initial: 'G', avColor: '#e6392f', user: '@grail_goblin', time: '18 min ago', item: 'Prismatic Evolutions ETB × 2', deposit: '$40', badge: 'PAID', badgeBg: '#1c9e4f', badgeFg: '#fff' },
  { initial: 'H', avColor: '#3a7bd5', user: '@hokage_hoarder', time: '1 h ago', item: 'OP-11 Booster Box (JP) × 1', deposit: '$15', badge: 'PAID', badgeBg: '#1c9e4f', badgeFg: '#fff' },
  { initial: 'M', avColor: '#9b59b6', user: '@mint_mika', time: '3 h ago', item: 'Kayou Tier 4 Wave 6 × 4', deposit: '$40', badge: 'AWAITING DEPOSIT', badgeBg: '#ffd23f', badgeFg: '#17130f' },
  { initial: 'B', avColor: '#1c9e4f', user: '@binder_baron', time: 'Yesterday', item: 'Fabled — Illumineer’s Trove × 1', deposit: '$10', badge: 'PAID', badgeBg: '#1c9e4f', badgeFg: '#fff' },
];

const CLAIMS_RAW = [
  { id: 'c1', code: 'HQ-7F3K', user: '@mint_mika', prize: 'Sealed OP-10 booster box', expires: 'Jul 31' },
  { id: 'c2', code: 'HQ-2B8N', user: '@binder_baron', prize: 'Prismatic Evolutions ETB', expires: 'Jul 31' },
  { id: 'c3', code: 'HQ-9Q4T', user: '@sleeved_up', prize: '$50 store credit', expires: 'Aug 15' },
];

export default function ShopContent({ series }: { series: ShopSeriesGroup[] }) {
  const [tab, setTab] = useState<Tab>('stock');
  const [pwDone, setPwDone] = useState(false);
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});

  const showPw = !pwDone;

  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>C</div>
          <span className={styles.logoText}>
            COLLECTOR<span style={{ color: '#e6392f' }}>HQ</span>
          </span>
          <span className={styles.partnerTag}>PARTNER SHOP</span>
        </Link>
        <div className={styles.navRight}>
          <div className={styles.shopChip}>
            <div className={styles.shopChipAvatar}>D</div>
            <span className={styles.shopChipName}>Dragon&rsquo;s Den TCG</span>
            <span className={styles.shopChipCity}>SINGAPORE</span>
          </div>
          <Link href="/login" className={styles.logoutLink}>
            Log out
          </Link>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.sidebar}>
          {NAV_ITEMS.map((n) => {
            const active = tab === n.tab;
            return (
              <span
                key={n.tab}
                onClick={() => setTab(n.tab)}
                className={styles.sidebarBtn}
                style={{
                  borderColor: active ? '#17130f' : '#d8cfbf',
                  background: active ? '#ffd23f' : '#fff',
                  color: '#17130f',
                  boxShadow: active ? '3px 3px 0 #17130f' : 'none',
                }}
              >
                {n.label}
              </span>
            );
          })}
          <div className={styles.sidebarNote}>
            Shop accounts are created by CollectorHQ admin. Contact support to update shop details.
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.pageHeadRow}>
            <h1 className={styles.pageTitle}>{TITLES[tab]}</h1>
            {tab === 'preorders' && (
              <>
                <span style={{ flex: 1 }} />
                <span className={styles.newPreorderBtn}>+ NEW PREORDER</span>
              </>
            )}
          </div>

          {tab === 'stock' && (
            <div className={styles.stockGrid}>
              {STOCK.map((s, i) => (
                <div key={i} className={styles.stockCard}>
                  <div className={styles.stockBody}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.art} alt="" className={styles.stockImg} />
                    <div style={{ flex: 1 }}>
                      <div className={styles.stockGame}>{s.game}</div>
                      <div className={styles.stockName}>{s.name}</div>
                      <div className={styles.stockPrice}>{s.price}</div>
                    </div>
                  </div>
                  <div className={styles.stockFooter}>
                    <span className={styles.stockBadge} style={{ background: s.badgeBg, color: s.badgeFg }}>
                      {s.badge}
                    </span>
                    <span className={styles.stockQty}>{s.qty} in stock</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'binder' && (
            <div className={styles.seriesList}>
              {series.map((sg) => (
                <div key={sg.name}>
                  <div className={styles.seriesHead}>
                    <span className={styles.seriesChip} style={{ background: sg.chipBg, color: sg.chipFg }}>
                      {sg.game}
                    </span>
                    <h2 className={styles.seriesName}>{sg.name}</h2>
                    <span className={styles.seriesMeta}>{sg.count} singles listed</span>
                  </div>
                  <div className={styles.binderGrid}>
                    {sg.cards.map((bc) => (
                      <Link key={bc.id} href={`/card?card=${bc.id}`} className={styles.binderCard}>
                        {bc.art ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={bc.art} alt={bc.name} className={styles.binderImg} />
                        ) : (
                          <div className={styles.binderImg} style={{ background: '#efe7d3' }} />
                        )}
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div className={styles.binderName}>{bc.name}</div>
                          <div className={styles.binderSub}>{bc.sub}</div>
                          <div className={styles.binderPrice}>{bc.price}</div>
                        </div>
                        <span className={styles.binderStatus} style={{ background: bc.stBg, color: bc.stFg }}>
                          {bc.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'preorders' && (
            <>
              <div className={styles.preorderTable}>
                <div className={styles.preorderHeadRow}>
                  <span>Product</span>
                  <span>Releases</span>
                  <span>Slots taken</span>
                  <span>Deposit</span>
                  <span>Status</span>
                </div>
                {PREORDERS_RAW.map((p) => {
                  const isClosed = !!closed[p.id];
                  return (
                    <div key={p.id} className={styles.preorderRow}>
                      <span style={{ fontWeight: 800 }}>
                        {p.name} <span className={styles.preorderProductGame}>{p.game}</span>
                      </span>
                      <span className={styles.preorderRelease}>{p.release}</span>
                      <span>
                        <span className={styles.progressBar}>
                          <span className={styles.progressFill} style={{ width: `${p.pct}%`, background: p.barColor }} />
                        </span>
                        <span className={styles.progressTaken}> {p.taken}</span>
                      </span>
                      <span className={styles.preorderDeposit}>{p.deposit}</span>
                      <span
                        onClick={() => setClosed((s) => ({ ...s, [p.id]: !s[p.id] }))}
                        className={styles.preorderStatusBtn}
                        style={{ background: isClosed ? '#fff' : '#1c9e4f', color: isClosed ? '#8a7f70' : '#fff' }}
                      >
                        {isClosed ? 'CLOSED' : 'OPEN'}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className={styles.preorderNote}>
                Open preorders are announced on the CollectorHQ home page automatically. Click a
                status pill to open / close it.
              </div>
            </>
          )}

          {tab === 'orders' && (
            <div className={styles.ordersList}>
              {ORDERS.map((o, i) => (
                <div key={i} className={styles.orderRow}>
                  <div className={styles.orderAvatar} style={{ background: o.avColor }}>
                    {o.initial}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className={styles.orderUser}>
                      {o.user} <span className={styles.orderTime}>{o.time}</span>
                    </div>
                    <div className={styles.orderItem}>{o.item}</div>
                  </div>
                  <span className={styles.orderDeposit}>deposit {o.deposit}</span>
                  <span className={styles.orderBadge} style={{ background: o.badgeBg, color: o.badgeFg }}>
                    {o.badge}
                  </span>
                </div>
              ))}
            </div>
          )}

          {tab === 'claims' && (
            <>
              <div className={styles.claimsBanner}>
                <span className={styles.claimsBannerEmoji}>🎰</span>
                <div style={{ flex: 1 }}>
                  <div className={styles.claimsBannerTitle}>July lucky draw — your shop is a claim point</div>
                  <div className={styles.claimsBannerDesc}>
                    Winners show their claim code in person. Verify the code, hand over the prize,
                    mark it claimed.
                  </div>
                </div>
              </div>
              <div className={styles.claimsList}>
                {CLAIMS_RAW.map((c) => {
                  const done = !!claimed[c.id];
                  return (
                    <div key={c.id} className={styles.claimRow}>
                      <span className={styles.claimCode}>{c.code}</span>
                      <div style={{ flex: 1 }}>
                        <div className={styles.claimUser}>{c.user}</div>
                        <div className={styles.claimPrize}>{c.prize}</div>
                      </div>
                      <span className={styles.claimExpires}>expires {c.expires}</span>
                      {done ? (
                        <span className={styles.claimDoneBadge}>✔ CLAIMED</span>
                      ) : (
                        <span
                          onClick={() => setClaimed((s) => ({ ...s, [c.id]: true }))}
                          className={styles.claimBtn}
                        >
                          MARK CLAIMED
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {showPw && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalKicker}>FIRST LOGIN</div>
            <h2 className={styles.modalTitle}>Set your own password</h2>
            <p className={styles.modalDesc}>
              Your account was created by the CollectorHQ team with a temporary password. Choose a
              new one to secure your shop.
            </p>
            <div className={styles.modalFields}>
              <input type="password" placeholder="Temporary password" className={styles.modalInput} />
              <input type="password" placeholder="New password" className={styles.modalInput} />
              <input type="password" placeholder="Confirm new password" className={styles.modalInput} />
            </div>
            <span onClick={() => setPwDone(true)} className={styles.modalSaveBtn}>
              SAVE &amp; ENTER MY SHOP →
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
