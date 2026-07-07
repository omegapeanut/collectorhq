import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import AdUnit from '@/components/AdUnit';
import CommunityFeed, { type Post } from '@/components/CommunityFeed';
import { getCard } from '@/lib/cards';
import styles from './community.module.css';

export const metadata = { title: 'Community — CollectorHQ' };

const AV_G = '/art/av-g.png';
const AV_H = 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400585/av-h.png';
const AV_S = '/art/av-s.png';
const AV_B = '/art/av-b.png';

const SIDEBAR_PREORDERS = [
  { name: 'Prismatic Evolutions ETB', shop: 'Dragon’s Den TCG', release: 'Aug 14', deposit: '$20 dep.' },
  { name: 'OP-11 Booster Box (JP)', shop: 'Mint Condition', release: 'Aug 29', deposit: '$15 dep.' },
  { name: 'Fabled — Illumineer’s Trove', shop: 'Top Deck Games', release: 'Sep 5', deposit: '$10 dep.' },
];

const LEADERS = [
  { rank: '1', avatar: AV_G, user: '@grail_goblin', stat: 'Vault $112,480', gain: '+9.2%' },
  { rank: '2', avatar: AV_S, user: '@sleeved_up', stat: 'Vault $64,900', gain: '+7.7%' },
  { rank: '3', avatar: AV_H, user: '@hokage_hoarder', stat: 'Vault $31,240', gain: '+6.1%' },
  { rank: '4', avatar: AV_B, user: '@binder_baron', stat: 'Vault $28,050', gain: '+4.9%' },
];

const TAGS = ['#OP05', '#KayouNaruto', '#PSAreturns', '#tradecheck', '#grailwatch', '#pokemon151'];

export default async function CommunityPage() {
  const [luffy, charizard, umbreon] = await Promise.all([
    getCard('luffy05'),
    getCard('charizard'),
    getCard('umbreon'),
  ]);

  const posts: Post[] = [
    {
      key: 'p1',
      avatar: AV_G,
      art: luffy!.art,
      user: '@grail_goblin',
      leader: true,
      time: '12 min ago · Tokyo',
      tag: 'GRAIL PULL',
      tagBg: '#e6392f',
      tagFg: '#fff',
      text: 'IT FINALLY HAPPENED. Pulled the Luffy manga rare from my third box of OP-05. Hands were SHAKING. Straight into a sleeve, straight to grading.',
      cardLabel: 'OP05-119 · MANGA RARE',
      price: luffy!.priceLabel,
      delta: '▲12.2%',
      deltaColor: '#1c9e4f',
      likes: 482,
      comments: 96,
      tilt: -0.4,
    },
    {
      key: 'p2',
      avatar: AV_H,
      art: charizard!.art,
      user: '@hokage_hoarder',
      leader: false,
      time: '1 h ago · Manila',
      tag: 'GRADE BACK',
      tagBg: '#ffd23f',
      tagFg: '#17130f',
      text: 'PSA 9 on my Naruto Kayou SP! Was praying for a 10 but the corner ding said otherwise. Still up 6.8% this week so no complaints.',
      cardLabel: 'KAYOU TIER 4 · SP',
      price: '$96',
      delta: '▲6.8%',
      deltaColor: '#1c9e4f',
      likes: 217,
      comments: 41,
      tilt: 0.4,
    },
    {
      key: 'p3',
      avatar: AV_S,
      art: umbreon!.art,
      user: '@sleeved_up',
      leader: true,
      time: '3 h ago · Berlin',
      tag: 'TRADE WIN',
      tagBg: '#fff',
      tagFg: '#17130f',
      text: 'Trade check saved me AGAIN. Almost swapped my Umbreon alt for a stack that priced out $180 lighter. Ran the numbers, countered, walked away with the win.',
      cardLabel: 'EVS 215 · PSA 10',
      price: umbreon!.priceLabel,
      delta: '▲8.4%',
      deltaColor: '#1c9e4f',
      likes: 158,
      comments: 27,
      tilt: -0.3,
    },
  ];

  return (
    <div className={styles.page}>
      <SiteNav active="Community" />

      <div className={styles.header}>
        <div>
          <div className={styles.kicker}>THE FEED</div>
          <h1 className={styles.title}>Community</h1>
          <p className={styles.subtitle}>
            Pulls, grails, grades and trades — 12,400 collectors flexing in real time.
          </p>
        </div>
        <span className={styles.shareBtn}>+ SHARE A PULL</span>
      </div>

      <div className={styles.layout}>
        <CommunityFeed posts={posts} />

        <div className={styles.sidebar}>
          <div className={`${styles.sideCard} ${styles.drawCard}`}>
            <div className={styles.drawHead}>
              <span className={styles.drawEmoji}>🎰</span>
              <div className={styles.drawTitle}>July lucky draw</div>
            </div>
            <p className={styles.drawDesc}>
              Win a sealed OP-11 booster box. Every scan this month = 1 entry. Draw closes <b>Jul 31</b>.
            </p>
            <div className={styles.drawEntries}>
              <span className={styles.drawEntriesLabel}>YOUR ENTRIES</span>
              <span className={styles.drawEntriesValue}>42</span>
            </div>
            <Link href="/scan" className={styles.drawBtn}>
              ⚡ SCAN TO EARN ENTRIES
            </Link>
            <div className={styles.drawFootnote}>winners claim prizes at a partner shop</div>
          </div>

          <div className={styles.sideCard}>
            <div className={styles.sideHeadRow}>
              <div className={styles.sideTitle}>Open preorders</div>
              <Link href="/shop" className={styles.sideAllLink}>
                All →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SIDEBAR_PREORDERS.map((sp, i) => (
                <div key={i} className={styles.preorderRow}>
                  <div style={{ flex: 1 }}>
                    <div className={styles.preorderName}>{sp.name}</div>
                    <div className={styles.preorderMeta}>
                      {sp.shop} · rel. {sp.release}
                    </div>
                  </div>
                  <span className={styles.preorderDeposit}>{sp.deposit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.sideCard} ${styles.leadersCard}`}>
            <div className={styles.leadersTitle}>Top collectors this week</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {LEADERS.map((l) => (
                <div key={l.rank} className={styles.leaderRow}>
                  <span className={styles.leaderRank}>{l.rank}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.avatar} alt="" className={styles.leaderAvatar} />
                  <div style={{ flex: 1 }}>
                    <div className={styles.leaderUser}>{l.user}</div>
                    <div className={styles.leaderStat}>{l.stat}</div>
                  </div>
                  <span className={styles.leaderGain}>{l.gain}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.sideCard} ${styles.tradeCard}`}>
            <div className={styles.tradeTitle}>Trade check</div>
            <p className={styles.tradeDesc}>
              Post both sides of a trade and the HQ prices it — no deal ever robs you.
            </p>
            <span className={styles.tradeBtn}>RUN A TRADE CHECK</span>
          </div>

          <AdUnit
            headline="Local Card Shop Finder — Tournaments Near You"
            domain="www.lgslocator.com/events"
            desc="Find weekly One Piece & Pokémon locals, trade nights and prerelease events."
            cta="Find Shops"
          />

          <div className={`${styles.sideCard} ${styles.tagsCard}`}>
            <div className={styles.tagsTitle}>Trending tags</div>
            <div className={styles.tagsWrap}>
              {TAGS.map((t) => (
                <span key={t} className={styles.tagPill}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
