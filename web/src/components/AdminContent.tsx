'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/admin/admin.module.css';

type Tab =
  | 'overview'
  | 'users'
  | 'cards'
  | 'flags'
  | 'members'
  | 'donations'
  | 'ads'
  | 'leaders'
  | 'shops'
  | 'draw'
  | 'themes'
  | 'settings';

const TITLES: Record<Tab, string> = {
  overview: 'Overview',
  users: 'Users',
  cards: 'Card database',
  flags: 'Reports & flags',
  members: 'Memberships',
  donations: 'Donations',
  ads: 'Ad slots',
  leaders: 'Leader applications',
  themes: 'Festive themes',
  settings: 'Settings',
  shops: 'Partner shops',
  draw: 'Lucky draw',
};

const NAV_OPS: Array<[Tab, string]> = [
  ['overview', '📊 Overview'],
  ['users', '👥 Users'],
  ['cards', '🗃 Card database'],
  ['flags', '🚩 Reports & flags'],
];
const NAV_REV: Array<[Tab, string]> = [
  ['members', '💳 Memberships'],
  ['donations', '♥ Donations'],
  ['ads', '📢 Ad slots'],
];
const NAV_PLAT: Array<[Tab, string]> = [
  ['leaders', '★ Leader applications'],
  ['shops', '🏪 Partner shops'],
  ['draw', '🎰 Lucky draw'],
  ['themes', '🎨 Festive themes'],
  ['settings', '⚙ Settings'],
];

const APPS = [
  { id: 'a1', handle: '@binder_baron', meta: '2,140 cards · member 14 mo · vault $38k', initial: 'B', color: '#3a7bd5' },
  { id: 'a2', handle: '@psa10dreams', meta: '860 cards · member 9 mo · vault $21k', initial: 'P', color: '#e6392f' },
  { id: 'a3', handle: '@topdeck_tess', meta: '1,420 cards · member 22 mo · vault $52k', initial: 'T', color: '#1c9e4f' },
];

const FLAG_DEFS = [
  { id: 'f1', type: 'PRICE ERROR', chipBg: '#e6392f', title: 'Charizard 4/102 — price feed spike ($48k?)', meta: 'auto-detected · 2 h ago · price feed' },
  { id: 'f2', type: 'DUPLICATE', chipBg: '#f7931a', title: 'OP01-120 listed twice in OP-01 set', meta: 'reported by @sleeved_up · 5 h ago' },
  { id: 'f3', type: 'USER REPORT', chipBg: '#e6392f', title: '@shady_pulls — fake grading claims', meta: '3 reports · 1 d ago · community' },
  { id: 'f4', type: 'SCAN MISS', chipBg: '#3a7bd5', title: 'Kayou Naruto T4 — 12 failed recognitions', meta: 'auto-detected · 1 d ago · scanner' },
];

const AD_DEFS = [
  { id: 'ad1', slot: 'Explore — leaderboard', ad: 'TCG Release Calendar', rev: '$186', ctr: '2.1%' },
  { id: 'ad2', slot: 'Community — sidebar', ad: 'Local Card Shop Finder', rev: '$142', ctr: '1.7%' },
  { id: 'ad3', slot: 'Rookie vault — top banner', ad: 'CardHaven Preorders', rev: '$124', ctr: '1.9%' },
  { id: 'ad4', slot: 'Rookie vault — footer', ad: 'MintCondition Supplies', rev: '$88', ctr: '1.4%' },
];

const USERS_BASE = [
  { id: 'u1', handle: '@grail_goblin', status: 'leader · active', initial: 'G', color: '#e6392f', tier: 'MEMBER', tierBg: '#ffd23f', tierFg: '#17130f', cards: '3,904', vault: '$112,480', joined: 'Jan 2024' },
  { id: 'u2', handle: '@hokage_hoarder', status: 'active', initial: 'H', color: '#3a7bd5', tier: 'MEMBER', tierBg: '#ffd23f', tierFg: '#17130f', cards: '214', vault: '$31,240', joined: 'Mar 2025' },
  { id: 'u3', handle: '@binder_baron', status: 'active', initial: 'B', color: '#1c9e4f', tier: 'ROOKIE', tierBg: '#fff', tierFg: '#8a7f70', cards: '67', vault: '$4,380', joined: 'Nov 2025' },
  { id: 'u4', handle: '@sleeved_up', status: 'leader · active', initial: 'S', color: '#f7931a', tier: 'MEMBER', tierBg: '#ffd23f', tierFg: '#17130f', cards: '2,118', vault: '$64,900', joined: 'Jun 2024' },
  { id: 'u5', handle: '@shady_pulls', status: '3 reports open', initial: 'S', color: '#8a7f70', tier: 'ROOKIE', tierBg: '#fff', tierFg: '#8a7f70', cards: '31', vault: '$890', joined: 'May 2026' },
  { id: 'u6', handle: '@mint_mika', status: 'leader · active', initial: 'M', color: '#9b59b6', tier: 'MEMBER', tierBg: '#ffd23f', tierFg: '#17130f', cards: '1,240', vault: '$27,300', joined: 'Feb 2025' },
];

const DB_CARDS = [
  { name: 'Monkey D. Luffy OP05-119', game: 'ONE PIECE', set: 'OP-05 #119', price: '$1,240', delta: '▲12.2%', deltaColor: '#1c9e4f', scans: '4,182' },
  { name: 'Umbreon VMAX Alt Art', game: 'POKÉMON', set: 'EVS #215', price: '$612', delta: '▲8.4%', deltaColor: '#1c9e4f', scans: '3,940' },
  { name: 'Shanks OP01-120', game: 'ONE PIECE', set: 'OP-01 #120', price: '$389', delta: '▼3.6%', deltaColor: '#c0362c', scans: '2,871' },
  { name: 'Charizard ex SIR', game: 'POKÉMON', set: 'OBF #223', price: '$204', delta: '▼1.2%', deltaColor: '#c0362c', scans: '2,644' },
  { name: 'Zoro OP01-025 Alt', game: 'ONE PIECE', set: 'OP-01 #025', price: '$178', delta: '▲4.4%', deltaColor: '#1c9e4f', scans: '1,988' },
  { name: 'The One Ring (Foil)', game: 'MAGIC', set: 'LTR #246', price: '$148', delta: '▲5.1%', deltaColor: '#1c9e4f', scans: '1,412' },
  { name: 'Naruto Uzumaki Kayou SP', game: 'NARUTO', set: 'T4-W5 SP', price: '$96', delta: '▲6.8%', deltaColor: '#1c9e4f', scans: '1,206' },
];

const SUBS = [
  { handle: '@topdeck_tess', plan: 'YEARLY', planBg: '#17130f', planFg: '#ffd23f', amount: '$39.00', when: 'today 10:42' },
  { handle: '@pull_rate_pete', plan: 'MONTHLY', planBg: '#ffd23f', planFg: '#17130f', amount: '$4.99', when: 'today 08:15' },
  { handle: '@mint_mika', plan: 'YEARLY', planBg: '#17130f', planFg: '#ffd23f', amount: '$39.00', when: 'yesterday' },
  { handle: '@hokage_hoarder', plan: 'MONTHLY', planBg: '#ffd23f', planFg: '#17130f', amount: '$4.99', when: 'yesterday' },
  { handle: '@grail_goblin', plan: 'YEARLY', planBg: '#17130f', planFg: '#ffd23f', amount: '$39.00', when: '2 days ago' },
];

const DONATIONS = [
  { name: 'anon', method: 'BTC', methodBg: '#f7931a', amount: '$25.00', note: '"keep the servers alive"' },
  { name: '@binder_baron', method: 'BANK', methodBg: '#3a7bd5', amount: '$10.00', note: 'wall of fame: yes' },
  { name: 'anon', method: 'BTC', methodBg: '#f7931a', amount: '$120.00', note: '₿ 0.0011 · whale ♥' },
  { name: '@mint_mika', method: 'BANK', methodBg: '#3a7bd5', amount: '$5.00', note: 'monthly supporter' },
  { name: '@topdeck_tess', method: 'BANK', methodBg: '#3a7bd5', amount: '$50.00', note: 'wall of fame: yes' },
];

const SHOPS_BASE = [
  { id: 's1', name: 'Dragon’s Den TCG', city: 'SINGAPORE', initial: 'D', color: '#1c9e4f', open: 4, orders: 128, status: 'ACTIVE', stBg: '#1c9e4f', stFg: '#fff' },
  { id: 's2', name: 'Mint Condition', city: 'MANILA', initial: 'M', color: '#3a7bd5', open: 2, orders: 86, status: 'ACTIVE', stBg: '#1c9e4f', stFg: '#fff' },
  { id: 's3', name: 'Top Deck Games', city: 'KUALA LUMPUR', initial: 'T', color: '#f7931a', open: 3, orders: 64, status: 'ACTIVE', stBg: '#1c9e4f', stFg: '#fff' },
  { id: 's4', name: 'Cardboard Castle', city: 'BANGKOK', initial: 'C', color: '#9b59b6', open: 0, orders: 0, status: 'INVITED', stBg: '#ffd23f', stFg: '#17130f' },
];

const PAST_WINNERS = [
  { user: '@grail_goblin', prize: 'Prismatic Evolutions ETB', month: 'JUN 2026', status: 'CLAIMED', stBg: '#1c9e4f', stFg: '#fff' },
  { user: '@psa10dreams', prize: '$50 store credit', month: 'MAY 2026', status: 'CLAIMED', stBg: '#1c9e4f', stFg: '#fff' },
  { user: '@sleeved_up', prize: 'Kayou Tier 4 box', month: 'APR 2026', status: 'EXPIRED', stBg: '#fff', stFg: '#8a7f70' },
];

const THEME_DEFS = [
  { id: 'default', name: 'No theme', desc: 'standard HQ look, year-round', icon: '—', swatch: '#f6f0e1', swatchFg: '#17130f' },
  { id: 'christmas', name: 'Christmas', desc: 'snow + holiday event banner (Dec)', icon: '❄', swatch: '#0f4d2e', swatchFg: '#fff' },
  { id: 'cny', name: 'Lunar New Year', desc: 'lanterns + red-packet pulls (Jan/Feb)', icon: '🏮', swatch: '#b3121b', swatchFg: '#ffd23f' },
];
const THEME_NAMES: Record<string, string> = { default: 'None', christmas: 'Christmas', cny: 'Lunar New Year' };

const TOGGLE_DEFS: Array<{ id: 'signups' | 'ads' | 'feed' | 'maintenance'; label: string; desc: string }> = [
  { id: 'signups', label: 'New sign-ups', desc: 'allow new account creation' },
  { id: 'ads', label: 'Ad serving', desc: 'show ads to Rookie users' },
  { id: 'feed', label: 'Community feed', desc: 'posting & comments' },
  { id: 'maintenance', label: 'Maintenance mode', desc: 'locks the site for everyone' },
];

const DRAW_POOL = ['@mint_mika', '@binder_baron', '@topdeck_tess', '@hokage_hoarder', '@pull_rate_pete', '@sleeved_up'];

export default function AdminContent() {
  const [tab, setTab] = useState<Tab>('overview');
  const [decisions, setDecisions] = useState<Record<string, 'approved' | 'rejected'>>({});
  const [bans, setBans] = useState<Record<string, boolean>>({});
  const [flagStates, setFlagStates] = useState<Record<string, 'resolved' | 'dismissed'>>({});
  const [adPaused, setAdPaused] = useState<Record<string, boolean>>({});
  const [theme, setTheme] = useState('default');
  const [tempPw, setTempPw] = useState<string | null>(null);
  const [drawWinner, setDrawWinner] = useState<string | null>(null);
  const [shopResets, setShopResets] = useState<Record<string, boolean>>({});
  const [toggles, setToggles] = useState({ signups: true, ads: true, maintenance: false, feed: true });

  const pendingCount = APPS.filter((a) => !decisions[a.id]).length;
  const openFlagCount = FLAG_DEFS.filter((f) => !flagStates[f.id]).length;

  const navItem = (id: Tab, label: string) => {
    const active = tab === id;
    return (
      <span
        key={id}
        onClick={() => setTab(id)}
        className={styles.sidebarItem}
        style={{
          background: active ? '#e6392f' : 'transparent',
          color: active ? '#fff' : '#b5aa9c',
          borderLeftColor: active ? '#ffd23f' : 'transparent',
        }}
      >
        {label}
      </span>
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <Link href="/" className={styles.sidebarLogo}>
          <div className={styles.sidebarLogoMark}>C</div>
          <span className={styles.sidebarLogoText}>HQ ADMIN</span>
        </Link>
        <div className={styles.sidebarGroupLabel}>OPERATIONS</div>
        <div className={styles.sidebarGroup}>{NAV_OPS.map(([id, label]) => navItem(id, label))}</div>
        <div className={styles.sidebarGroupLabel}>REVENUE</div>
        <div className={styles.sidebarGroup}>{NAV_REV.map(([id, label]) => navItem(id, label))}</div>
        <div className={styles.sidebarGroupLabel}>PLATFORM</div>
        <div className={styles.sidebarGroup}>{NAV_PLAT.map(([id, label]) => navItem(id, label))}</div>
        <span style={{ flex: 1 }} />
        <div className={styles.sidebarVersion}>v2.4.1 · ALL SYSTEMS GO ●</div>
      </div>

      <div className={styles.main}>
        <div className={styles.topRow}>
          <div>
            <h1 className={styles.pageTitle}>{TITLES[tab]}</h1>
            <div className={styles.dateLine}>MONDAY, JUL 6 2026 · LIVE</div>
          </div>
          <div className={styles.topRight}>
            <span className={styles.rangePill}>LAST 30 DAYS ▾</span>
            <div className={styles.adminAvatar}>A</div>
          </div>
        </div>

        {tab === 'overview' && (
          <div>
            <div className={styles.kpiGrid}>
              {[
                { label: 'TOTAL USERS', value: '12,483', delta: '▲ 6.1% MoM', deltaColor: '#1c9e4f', tilt: -0.4 },
                { label: 'PAYING MEMBERS', value: '1,306', delta: '▲ 4.8% MoM', deltaColor: '#1c9e4f', tilt: 0.4 },
                { label: 'MRR', value: '$6,410', delta: '▲ 5.2% MoM', deltaColor: '#1c9e4f', tilt: -0.3 },
                { label: 'DONATIONS (30D)', value: '$980', delta: '▼ 2.1% MoM', deltaColor: '#c0362c', tilt: 0.3 },
              ].map((k) => (
                <div key={k.label} className={styles.kpiCard} style={{ transform: `rotate(${k.tilt}deg)` }}>
                  <div className={styles.kpiLabel}>{k.label}</div>
                  <div className={styles.kpiValue}>{k.value}</div>
                  <div className={styles.kpiDelta} style={{ color: k.deltaColor }}>
                    {k.delta}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.twoCol}>
              <div className={styles.panel}>
                <div className={styles.panelHeadRow}>
                  <span className={styles.panelTitle}>Revenue mix</span>
                  <span className={styles.panelSub}>MRR $6,410</span>
                </div>
                <svg width="100%" height="150" viewBox="0 0 520 150" preserveAspectRatio="none" style={{ display: 'block' }}>
                  <polyline points="0,120 40,116 80,110 120,112 160,102 200,96 240,99 280,88 320,84 360,78 400,72 440,66 480,60 520,52" fill="none" stroke="#e6392f" strokeWidth="3" />
                  <polyline points="0,138 40,136 80,134 120,132 160,131 200,128 240,126 280,122 320,121 360,117 400,114 440,110 480,108 520,104" fill="none" stroke="#f7931a" strokeWidth="3" strokeDasharray="7 5" />
                  <polyline points="0,144 40,143 80,143 120,141 160,141 200,139 240,138 280,138 320,136 360,135 400,134 440,133 480,131 520,130" fill="none" stroke="#3a7bd5" strokeWidth="3" strokeDasharray="2 5" />
                </svg>
                <div style={{ display: 'flex', gap: 20, marginTop: 12, font: '700 12px var(--font-sans)' }}>
                  <span>
                    <span style={{ display: 'inline-block', width: 14, height: 4, background: '#e6392f', borderRadius: 2, verticalAlign: 'middle', marginRight: 6 }} />
                    Memberships $4,890
                  </span>
                  <span>
                    <span style={{ display: 'inline-block', width: 14, height: 4, background: '#f7931a', borderRadius: 2, verticalAlign: 'middle', marginRight: 6 }} />
                    Donations $980
                  </span>
                  <span>
                    <span style={{ display: 'inline-block', width: 14, height: 4, background: '#3a7bd5', borderRadius: 2, verticalAlign: 'middle', marginRight: 6 }} />
                    Ads $540
                  </span>
                </div>
              </div>
              <div className={styles.panelDark}>
                <div className={styles.panelHeadRow}>
                  <span className={styles.panelTitle} style={{ color: '#ffd23f' }}>
                    Scans today
                  </span>
                  <span className={styles.panelSub}>API HEALTHY ●</span>
                </div>
                <div style={{ font: '38px var(--font-display)' }}>14,208</div>
                <div style={{ font: '800 12px var(--font-sans)', color: '#7fe08a', marginBottom: 14 }}>▲ 11% vs yesterday</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 70 }}>
                  {[32, 45, 38, 58, 52, 70, 88].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        background: i === 6 ? '#e6392f' : i === 5 ? '#ffd23f' : '#3d372f',
                        borderRadius: '3px 3px 0 0',
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', font: '600 9.5px var(--font-mono)', color: '#6f675c', marginTop: 6 }}>
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                  <span>NOW</span>
                </div>
              </div>
            </div>

            <div className={styles.actionsGrid}>
              <div className={styles.panel}>
                <span className={styles.panelTitle}>Quick actions</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
                  <span onClick={() => setTab('leaders')} className={styles.pillBtn} style={{ background: '#ffd23f' }}>
                    ★ Review {pendingCount} leader apps
                  </span>
                  <span onClick={() => setTab('flags')} className={styles.pillBtn} style={{ background: '#fff' }}>
                    🚩 {openFlagCount} open flags
                  </span>
                  <span onClick={() => setTab('themes')} className={styles.pillBtn} style={{ background: '#fff' }}>
                    🎨 Festive theme: {THEME_NAMES[theme]}
                  </span>
                </div>
              </div>
              <div className={styles.panel}>
                <span className={styles.panelTitle}>Latest activity</span>
                <div className={styles.activityList}>
                  <span>10:42 · @topdeck_tess upgraded to Member</span>
                  <span>10:31 · donation $25 (BTC) — anon</span>
                  <span>10:18 · grading batch #241 shipped (18 cards)</span>
                  <span>09:55 · @shady_pulls reported by 3 users</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'users' && (
          <div className={styles.tableWrap}>
            <div className={styles.tableHeadRow} style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 110px' }}>
              <span>USER</span>
              <span>TIER</span>
              <span>CARDS</span>
              <span>VAULT</span>
              <span>JOINED</span>
              <span>ACTION</span>
            </div>
            {USERS_BASE.map((u) => {
              const banned = !!bans[u.id];
              return (
                <div key={u.id} className={styles.tableRow} style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 110px', opacity: banned ? 0.5 : 1 }}>
                  <div className={styles.userCell}>
                    <div className={styles.avatarCircle} style={{ background: u.color }}>
                      {u.initial}
                    </div>
                    <div>
                      <div className={styles.userHandle}>{u.handle}</div>
                      <div className={styles.userMeta}>{banned ? 'BANNED' : u.status}</div>
                    </div>
                  </div>
                  <span>
                    <span className={styles.badgePill} style={{ background: u.tierBg, color: u.tierFg }}>
                      {u.tier}
                    </span>
                  </span>
                  <span style={{ font: '700 13px var(--font-mono)' }}>{u.cards}</span>
                  <span style={{ font: '700 13px var(--font-mono)', color: '#e6392f' }}>{u.vault}</span>
                  <span style={{ font: '600 12px var(--font-mono)', color: '#8a7f70' }}>{u.joined}</span>
                  <button
                    onClick={() => setBans((s) => ({ ...s, [u.id]: !s[u.id] }))}
                    className={styles.actionBtn}
                    style={{ background: banned ? '#fff' : '#17130f', color: banned ? '#17130f' : '#fff' }}
                  >
                    {banned ? 'UNBAN' : 'BAN'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'cards' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <span style={{ font: '800 13.5px var(--font-sans)', color: '#fff', background: '#e6392f', border: '3px solid #17130f', padding: '10px 20px', borderRadius: 10, boxShadow: '3px 3px 0 #17130f', cursor: 'pointer' }}>
                + ADD CARD
              </span>
            </div>
            <div className={styles.tableWrap}>
              <div className={styles.tableHeadRow} style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr' }}>
                <span>CARD</span>
                <span>GAME</span>
                <span>SET №</span>
                <span>PRICE</span>
                <span>7-DAY</span>
                <span>SCANS (30D)</span>
              </div>
              {DB_CARDS.map((d, i) => (
                <div key={i} className={styles.tableRow} style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr' }}>
                  <span style={{ font: '800 14px var(--font-sans)' }}>{d.name}</span>
                  <span style={{ font: '600 11px var(--font-mono)', color: '#8a7f70' }}>{d.game}</span>
                  <span style={{ font: '600 12px var(--font-mono)' }}>{d.set}</span>
                  <span style={{ font: '700 13.5px var(--font-mono)', color: '#e6392f' }}>{d.price}</span>
                  <span style={{ font: '800 12.5px var(--font-sans)', color: d.deltaColor }}>{d.delta}</span>
                  <span style={{ font: '700 13px var(--font-mono)' }}>{d.scans}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, font: '600 12px var(--font-mono)', color: '#8a7f70' }}>
              204,318 cards indexed · 14 TCGs · price feed updated 6 min ago
            </div>
          </div>
        )}

        {tab === 'flags' && (
          <div className={styles.flagList}>
            {FLAG_DEFS.map((f) => {
              const st = flagStates[f.id];
              return (
                <div key={f.id} className={styles.flagRow} style={{ opacity: st ? 0.55 : 1 }}>
                  <span className={styles.flagType} style={{ background: f.chipBg }}>
                    {f.type}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ font: '800 14.5px var(--font-sans)' }}>{f.title}</div>
                    <div style={{ font: '600 11.5px var(--font-mono)', color: '#8a7f70' }}>{f.meta}</div>
                  </div>
                  {!st ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => setFlagStates((s) => ({ ...s, [f.id]: 'resolved' }))}
                        className={styles.smallActionBtn}
                        style={{ color: '#fff', background: '#1c9e4f' }}
                      >
                        RESOLVE
                      </button>
                      <button
                        onClick={() => setFlagStates((s) => ({ ...s, [f.id]: 'dismissed' }))}
                        className={styles.smallActionBtn}
                        style={{ background: '#fff' }}
                      >
                        DISMISS
                      </button>
                    </div>
                  ) : (
                    <span style={{ font: '800 12px var(--font-mono)', color: st === 'resolved' ? '#1c9e4f' : '#8a7f70' }}>
                      {st === 'resolved' ? '✔ RESOLVED' : '— DISMISSED'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'members' && (
          <div>
            <div className={styles.kpiGrid}>
              {[
                { label: 'PAYING MEMBERS', value: '1,306', delta: '▲ 4.8% MoM' },
                { label: 'MRR', value: '$4,890', delta: '▲ 5.2% MoM' },
                { label: 'CHURN (30D)', value: '2.1%', delta: '▼ 0.4pt MoM' },
                { label: 'YEARLY PLANS', value: '41%', delta: '▲ 3pt MoM' },
              ].map((k, i) => (
                <div key={k.label} className={styles.kpiCard} style={{ transform: `rotate(${i % 2 ? 0.4 : -0.4}deg)` }}>
                  <div className={styles.kpiLabel}>{k.label}</div>
                  <div className={styles.kpiValue}>{k.value}</div>
                  <div className={styles.kpiDelta} style={{ color: '#1c9e4f' }}>
                    {k.delta}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.tableWrap}>
              <div className={styles.tableBanner}>Recent subscriptions</div>
              {SUBS.map((s, i) => (
                <div key={i} className={styles.tableRow} style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                  <span style={{ font: '800 14px var(--font-sans)' }}>{s.handle}</span>
                  <span>
                    <span className={styles.badgePill} style={{ background: s.planBg, color: s.planFg }}>
                      {s.plan}
                    </span>
                  </span>
                  <span style={{ font: '700 13px var(--font-mono)', color: '#e6392f' }}>{s.amount}</span>
                  <span style={{ font: '600 12px var(--font-mono)', color: '#8a7f70' }}>{s.when}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'donations' && (
          <div>
            <div className={styles.kpiGrid3}>
              <div className={styles.kpiCard} style={{ transform: 'rotate(-.4deg)' }}>
                <div className={styles.kpiLabel}>DONATIONS (30D)</div>
                <div className={styles.kpiValue}>$980</div>
                <div className={styles.kpiDelta} style={{ color: '#c0362c' }}>▼ 2.1% MoM</div>
              </div>
              <div className={styles.kpiCard} style={{ transform: 'rotate(.4deg)' }}>
                <div className={styles.kpiLabel}>ALL-TIME</div>
                <div className={styles.kpiValue}>$18,240</div>
                <div className={styles.kpiDelta} style={{ color: '#8a7f70' }}>since 2024</div>
              </div>
              <div className={styles.kpiCard} style={{ transform: 'rotate(-.3deg)' }}>
                <div className={styles.kpiLabel}>BTC SHARE</div>
                <div className={styles.kpiValue}>34%</div>
                <div className={styles.kpiDelta} style={{ color: '#f7931a' }}>₿ 0.0041 (30d)</div>
              </div>
            </div>
            <div className={styles.tableWrap}>
              <div className={styles.tableBanner}>♥ Recent donations</div>
              {DONATIONS.map((d, i) => (
                <div key={i} className={styles.tableRow} style={{ gridTemplateColumns: '2fr 1fr 1fr 1.4fr' }}>
                  <span style={{ font: '800 14px var(--font-sans)' }}>{d.name}</span>
                  <span>
                    <span style={{ font: '800 11px var(--font-mono)', background: d.methodBg, color: '#fff', borderRadius: 5, padding: '3px 9px' }}>
                      {d.method}
                    </span>
                  </span>
                  <span style={{ font: '700 13.5px var(--font-mono)', color: '#e6392f' }}>{d.amount}</span>
                  <span style={{ font: '600 12px var(--font-mono)', color: '#8a7f70' }}>{d.note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'ads' && (
          <div>
            <div className={styles.kpiGrid3}>
              <div className={styles.kpiCard} style={{ transform: 'rotate(-.4deg)' }}>
                <div className={styles.kpiLabel}>AD REVENUE (30D)</div>
                <div className={styles.kpiValue}>$540</div>
                <div className={styles.kpiDelta} style={{ color: '#1c9e4f' }}>▲ 9.3% MoM</div>
              </div>
              <div className={styles.kpiCard} style={{ transform: 'rotate(.4deg)' }}>
                <div className={styles.kpiLabel}>IMPRESSIONS (30D)</div>
                <div className={styles.kpiValue}>182k</div>
                <div className={styles.kpiDelta} style={{ color: '#8a7f70' }}>RPM $2.97</div>
              </div>
              <div className={styles.kpiCard} style={{ transform: 'rotate(-.3deg)' }}>
                <div className={styles.kpiLabel}>AVG CTR</div>
                <div className={styles.kpiValue}>1.8%</div>
                <div className={styles.kpiDelta} style={{ color: '#1c9e4f' }}>TCG niche ▲</div>
              </div>
            </div>
            <div className={styles.tableWrap}>
              <div className={styles.tableHeadRow} style={{ gridTemplateColumns: '2fr 1.4fr 1fr 1fr 120px' }}>
                <span>SLOT</span>
                <span>CURRENT AD</span>
                <span>REV (30D)</span>
                <span>CTR</span>
                <span>STATUS</span>
              </div>
              {AD_DEFS.map((a) => {
                const paused = !!adPaused[a.id];
                return (
                  <div key={a.id} className={styles.tableRow} style={{ gridTemplateColumns: '2fr 1.4fr 1fr 1fr 120px', opacity: paused ? 0.55 : 1 }}>
                    <span style={{ font: '800 14px var(--font-sans)' }}>{a.slot}</span>
                    <span style={{ font: '600 11.5px var(--font-mono)', color: '#8a7f70' }}>{a.ad}</span>
                    <span style={{ font: '700 13.5px var(--font-mono)', color: '#e6392f' }}>{a.rev}</span>
                    <span style={{ font: '700 13px var(--font-mono)' }}>{a.ctr}</span>
                    <button
                      onClick={() => setAdPaused((s) => ({ ...s, [a.id]: !s[a.id] }))}
                      className={styles.actionBtn}
                      style={{ background: paused ? '#fff' : '#1c9e4f', color: paused ? '#17130f' : '#fff' }}
                    >
                      {paused ? 'PAUSED ▶' : 'LIVE ⏸'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'leaders' && (
          <div className={styles.applicationsGrid}>
            <div className={styles.tableWrap}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '3px solid #17130f', background: '#ffd23f' }}>
                <span style={{ font: '800 14px var(--font-sans)', textTransform: 'uppercase' }}>★ Pending applications</span>
                <span style={{ font: '800 12px var(--font-sans)', background: '#e6392f', color: '#fff', border: '2px solid #17130f', borderRadius: 999, padding: '2px 10px' }}>
                  {pendingCount} PENDING
                </span>
              </div>
              {APPS.map((a) => {
                const d = decisions[a.id];
                return (
                  <div key={a.id} className={styles.appRow}>
                    <div className={styles.avatarCircle} style={{ background: a.color }}>
                      {a.initial}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ font: '800 14px var(--font-sans)' }}>{a.handle}</div>
                      <div style={{ font: '600 11px var(--font-mono)', color: '#8a7f70' }}>{a.meta}</div>
                    </div>
                    {!d ? (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => setDecisions((s) => ({ ...s, [a.id]: 'approved' }))}
                          className={styles.smallActionBtn}
                          style={{ color: '#fff', background: '#1c9e4f' }}
                        >
                          APPROVE
                        </button>
                        <button
                          onClick={() => setDecisions((s) => ({ ...s, [a.id]: 'rejected' }))}
                          className={styles.smallActionBtn}
                          style={{ background: '#fff' }}
                        >
                          REJECT
                        </button>
                      </div>
                    ) : (
                      <span style={{ font: '800 12px var(--font-mono)', color: d === 'approved' ? '#1c9e4f' : '#c0362c' }}>
                        {d === 'approved' ? '✔ APPROVED' : '✕ REJECTED'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={styles.panelDark}>
              <div style={{ padding: '14px 20px', borderBottom: '2px solid rgba(246,240,225,.2)', font: '800 14px var(--font-sans)', textTransform: 'uppercase', color: '#ffd23f', margin: -20, marginBottom: 0 }}>
                Active leaders (24)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', font: '600 13px var(--font-sans)' }}>
                {[
                  ['@grail_goblin', '8.2k followers'],
                  ['@sleeved_up', '5.6k followers'],
                  ['@pull_rate_pete', '3.1k followers'],
                  ['@mint_mika', '2.4k followers'],
                ].map(([u, f]) => (
                  <div key={u} className={styles.leaderListRow}>
                    <span style={{ color: '#fff', fontWeight: 800 }}>{u}</span>
                    <span style={{ color: '#b5aa9c' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'shops' && (
          <div className={styles.shopsGrid}>
            <div className={styles.tableWrap}>
              <div className={styles.tableBanner}>🏪 Partner shops</div>
              <div className={styles.tableHeadRow} style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 130px' }}>
                <span>SHOP</span>
                <span>PREORDERS</span>
                <span>ORDERS 30D</span>
                <span>STATUS</span>
                <span>ACTION</span>
              </div>
              {SHOPS_BASE.map((s) => {
                const reset = !!shopResets[s.id];
                return (
                  <div key={s.id} className={styles.tableRow} style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 130px' }}>
                    <div className={styles.userCell}>
                      <div className={styles.avatarCircle} style={{ background: s.color, borderRadius: 9 }}>
                        {s.initial}
                      </div>
                      <div>
                        <div style={{ font: '800 14px var(--font-sans)' }}>{s.name}</div>
                        <div style={{ font: '600 10.5px var(--font-mono)', color: '#8a7f70' }}>{s.city}</div>
                      </div>
                    </div>
                    <span style={{ font: '700 13px var(--font-mono)' }}>{s.open} open</span>
                    <span style={{ font: '700 13px var(--font-mono)', color: '#e6392f' }}>{s.orders}</span>
                    <span>
                      <span className={styles.badgePill} style={{ background: s.stBg, color: s.stFg }}>
                        {s.status}
                      </span>
                    </span>
                    <button
                      onClick={() => setShopResets((st) => ({ ...st, [s.id]: true }))}
                      className={styles.actionBtn}
                      style={{ background: '#fff' }}
                    >
                      {reset ? '✔ PW SENT' : 'RESET PW'}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className={styles.panelDark}>
              <div style={{ font: '800 15px var(--font-sans)', textTransform: 'uppercase', color: '#ffd23f', marginBottom: 6 }}>
                + Create shop account
              </div>
              <p style={{ margin: '0 0 16px', font: '500 12.5px/1.5 var(--font-sans)', color: '#b5aa9c' }}>
                Shop accounts are invite-only. The owner receives a temporary password and must change
                it on first login.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                <input placeholder="Shop name" className={styles.createShopInput} />
                <input placeholder="Owner email" className={styles.createShopInput} />
                <input placeholder="City / location" className={styles.createShopInput} />
              </div>
              <span
                onClick={() => setTempPw('HQ-' + Math.random().toString(36).slice(2, 8).toUpperCase())}
                className={styles.createShopBtn}
              >
                CREATE &amp; GENERATE TEMP PASSWORD
              </span>
              {tempPw && (
                <div className={styles.tempPwBox}>
                  <div style={{ font: '600 10px var(--font-mono)', color: '#8a7f70', marginBottom: 4 }}>
                    TEMP PASSWORD — SEND TO OWNER
                  </div>
                  <div style={{ font: '800 18px var(--font-mono)', color: '#ffd23f', letterSpacing: '.1em' }}>{tempPw}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'draw' && (
          <div className={styles.drawGrid}>
            <div className={styles.panelDark}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <span style={{ font: '40px var(--font-display)', transform: 'rotate(6deg)' }}>🎰</span>
                <div>
                  <div style={{ font: '800 16px var(--font-sans)', textTransform: 'uppercase', color: '#ffd23f' }}>
                    July draw — sealed OP-11 booster box
                  </div>
                  <div style={{ font: '600 11.5px var(--font-mono)', color: '#8a7f70' }}>
                    ends Jul 31 · prize claimed at any partner shop
                  </div>
                </div>
              </div>
              <div className={styles.drawStatsGrid}>
                <div className={styles.drawStatCell}>
                  <div style={{ font: '600 10px var(--font-mono)', color: '#8a7f70' }}>ENTRIES</div>
                  <div style={{ font: '24px var(--font-display)' }}>8,412</div>
                </div>
                <div className={styles.drawStatCell}>
                  <div style={{ font: '600 10px var(--font-mono)', color: '#8a7f70' }}>PLAYERS</div>
                  <div style={{ font: '24px var(--font-display)' }}>2,306</div>
                </div>
                <div className={styles.drawStatCell}>
                  <div style={{ font: '600 10px var(--font-mono)', color: '#8a7f70' }}>CLAIM WINDOW</div>
                  <div style={{ font: '24px var(--font-display)' }}>14 d</div>
                </div>
              </div>
              {!drawWinner ? (
                <span
                  onClick={() => setDrawWinner(DRAW_POOL[Math.floor(Math.random() * DRAW_POOL.length)])}
                  className={styles.runDrawBtn}
                >
                  🎲 RUN THE DRAW
                </span>
              ) : (
                <div className={styles.winnerBox}>
                  <span style={{ font: '30px var(--font-display)', transform: 'rotate(-6deg)' }}>🏆</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ font: '800 16px var(--font-sans)' }}>{drawWinner}</div>
                    <div style={{ font: '600 11.5px var(--font-mono)', color: '#8a7f70' }}>
                      claim code HQ-{drawWinner.replace('@', '').slice(0, 2).toUpperCase()}7K · notified by email + in-app
                    </div>
                  </div>
                  <span
                    onClick={() => setDrawWinner(DRAW_POOL[Math.floor(Math.random() * DRAW_POOL.length)])}
                    className={styles.smallActionBtn}
                    style={{ background: '#fff' }}
                  >
                    REDRAW
                  </span>
                </div>
              )}
            </div>
            <div className={styles.tableWrap}>
              <div className={styles.tableBanner}>Past winners</div>
              {PAST_WINNERS.map((w, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', borderTop: '2px dashed rgba(23,19,15,.12)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ font: '800 14px var(--font-sans)' }}>{w.user}</div>
                    <div style={{ font: '600 11px var(--font-mono)', color: '#8a7f70' }}>
                      {w.prize} · {w.month}
                    </div>
                  </div>
                  <span className={styles.badgePill} style={{ background: w.stBg, color: w.stFg, font: '800 10.5px var(--font-sans)' }}>
                    {w.status}
                  </span>
                </div>
              ))}
              <div style={{ padding: '13px 20px', borderTop: '2px dashed rgba(23,19,15,.12)', font: '600 11.5px/1.5 var(--font-mono)', color: '#8a7f70' }}>
                Prizes are handed over in person at partner shops. Shops verify the claim code from their
                dashboard.
              </div>
            </div>
          </div>
        )}

        {tab === 'themes' && (
          <div>
            <p style={{ margin: '0 0 20px', font: '500 14.5px var(--font-sans)', color: '#4a4238', maxWidth: 560 }}>
              The active theme adds a festive banner and decorations to the public landing page. Only
              one theme can be live at a time.
            </p>
            <div className={styles.themeGrid}>
              {THEME_DEFS.map((th) => {
                const active = theme === th.id;
                return (
                  <div key={th.id} className={styles.themeCard}>
                    <div className={styles.themeSwatch} style={{ background: th.swatch, color: th.swatchFg }}>
                      {th.icon}
                    </div>
                    <div className={styles.themeBody}>
                      <div className={styles.themeName}>{th.name}</div>
                      <div className={styles.themeDesc}>{th.desc}</div>
                      <button
                        onClick={() => setTheme(th.id)}
                        className={styles.themeBtn}
                        style={{ background: active ? '#17130f' : '#fff', color: active ? '#ffd23f' : '#17130f' }}
                      >
                        {active ? '✔ ACTIVE' : 'ACTIVATE'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className={styles.settingsGrid}>
            <div className={styles.panel}>
              <div style={{ font: '800 15px var(--font-sans)', textTransform: 'uppercase', marginBottom: 16 }}>
                Platform toggles
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {TOGGLE_DEFS.map((t) => {
                  const on = toggles[t.id];
                  return (
                    <div key={t.id} className={styles.toggleRow}>
                      <span
                        onClick={() => setToggles((s) => ({ ...s, [t.id]: !s[t.id] }))}
                        className={styles.toggleTrack}
                        style={{ background: on ? '#1c9e4f' : '#fff' }}
                      >
                        <span className={styles.toggleKnob} style={{ left: on ? 26 : 2 }} />
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ font: '800 14px var(--font-sans)' }}>{t.label}</div>
                        <div style={{ font: '600 11px var(--font-mono)', color: '#8a7f70' }}>{t.desc}</div>
                      </div>
                      <span style={{ font: '800 11px var(--font-mono)', color: on ? '#1c9e4f' : '#8a7f70' }}>
                        {on ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.panel}>
              <div style={{ font: '800 15px var(--font-sans)', textTransform: 'uppercase', marginBottom: 16 }}>
                Limits &amp; pricing
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, font: '600 13.5px var(--font-sans)' }}>
                <div className={styles.limitRow}>
                  <span>Rookie scans / day</span>
                  <span style={{ font: '800 15px var(--font-mono)' }}>15</span>
                </div>
                <div className={styles.limitRow}>
                  <span>Member price / mo</span>
                  <span style={{ font: '800 15px var(--font-mono)', color: '#e6392f' }}>$4.99</span>
                </div>
                <div className={styles.limitRow}>
                  <span>Member price / yr</span>
                  <span style={{ font: '800 15px var(--font-mono)', color: '#e6392f' }}>$39</span>
                </div>
                <div className={styles.limitRow}>
                  <span>Grading fee (member / rookie)</span>
                  <span style={{ font: '800 15px var(--font-mono)' }}>$18 / $24</span>
                </div>
                <div className={styles.limitRow}>
                  <span>Repair fee (member / rookie)</span>
                  <span style={{ font: '800 15px var(--font-mono)' }}>$9 / $12</span>
                </div>
                <span className={styles.saveBtn}>SAVE CHANGES</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
