'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteNav from './SiteNav';
import styles from '@/app/leader/leader.module.css';

const ART = {
  charizard: 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400549/card-charizard.png',
  crystal: 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400545/card-crystal.png',
  umbreon: 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400531/card-umbreon.png',
  kakashi: 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400554/card-kakashi.png',
  shanks: 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400560/card-shanks.png',
  zoro: 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400565/card-zoro.png',
  itachi: 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400574/card-itachi.png',
  narutosp: 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400571/card-narutosp.png',
  onering: 'https://res.cloudinary.com/du3f8jjrp/image/upload/v1783400577/card-onering.png',
} as const;

const SERIES = [
  {
    game: 'POKÉMON',
    chipBg: '#ffd23f',
    chipFg: '#17130f',
    name: 'Base Set 1999',
    count: 88,
    value: '$21,400',
    cards: [
      { art: ART.charizard, name: 'Charizard 4/102 Holo', sub: 'PSA 9', price: '$1,890' },
      { art: ART.crystal, name: 'Blastoise 2/102 Holo', sub: 'PSA 8', price: '$640' },
    ],
  },
  {
    game: 'POKÉMON',
    chipBg: '#ffd23f',
    chipFg: '#17130f',
    name: 'Evolving Skies',
    count: 130,
    value: '$9,850',
    cards: [
      { art: ART.umbreon, name: 'Umbreon VMAX Alt Art', sub: '#215 · PSA 10', price: '$612' },
      { art: ART.kakashi, name: 'Sylveon VMAX Alt', sub: '#212 · PSA 9', price: '$310' },
    ],
  },
  {
    game: 'ONE PIECE',
    chipBg: '#e6392f',
    chipFg: '#fff',
    name: 'OP-01 Romance Dawn',
    count: 64,
    value: '$3,120',
    cards: [
      { art: ART.shanks, name: 'Shanks OP01-120', sub: 'SEC · RAW NM', price: '$389' },
      { art: ART.zoro, name: 'Zoro OP01-025 Alt', sub: 'SR · PSA 10', price: '$178' },
    ],
  },
  {
    game: 'NARUTO',
    chipBg: '#3a7bd5',
    chipFg: '#fff',
    name: 'Kayou · all tiers',
    count: 210,
    value: '$2,480',
    cards: [
      { art: ART.itachi, name: 'Itachi SSR Gold', sub: 'SSR · SEALED', price: '$118' },
      { art: ART.narutosp, name: 'Naruto Uzumaki SP', sub: 'SP · RAW NM', price: '$96' },
    ],
  },
  {
    game: 'MAGIC',
    chipBg: '#17130f',
    chipFg: '#ffd23f',
    name: 'Tales of Middle-earth',
    count: 22,
    value: '$980',
    cards: [{ art: ART.onering, name: 'The One Ring (Foil)', sub: '#246 · RAW NM', price: '$148' }],
  },
];

const GRAILS = [
  { art: ART.charizard, set: 'POKÉMON · BASE SET 1999', name: 'Charizard 4/102 Holo', grade: 'PSA 9', price: '$1,890', delta: '▲4.2%', deltaColor: '#1c9e4f', tilt: -0.6 },
  { art: ART.umbreon, set: 'POKÉMON · EVOLVING SKIES', name: 'Umbreon VMAX Alt Art', grade: 'PSA 10', price: '$612', delta: '▲8.4%', deltaColor: '#1c9e4f', tilt: 0.5 },
  { art: ART.shanks, set: 'ONE PIECE · OP-01', name: 'Shanks OP01-120', grade: 'RAW NM', price: '$389', delta: '▼3.6%', deltaColor: '#c0362c', tilt: -0.4 },
  { art: ART.crystal, set: 'POKÉMON · SKYRIDGE', name: 'Crystal Charizard', grade: 'CGC 8.5', price: '$2,340', delta: '▲1.9%', deltaColor: '#1c9e4f', tilt: 0.6 },
  { art: ART.onering, set: 'MAGIC · LTR', name: 'The One Ring (Foil)', grade: 'RAW NM', price: '$148', delta: '▲5.1%', deltaColor: '#1c9e4f', tilt: -0.5 },
  { art: ART.itachi, set: 'NARUTO · KAYOU', name: 'Itachi SSR Gold', grade: 'SEALED', price: '$118', delta: '▲3.1%', deltaColor: '#1c9e4f', tilt: 0.4 },
];

export default function LeaderContent() {
  const [tab, setTab] = useState<'showcase' | 'all'>('showcase');
  const [following, setFollowing] = useState(false);
  const baseFollowers = 8213;
  const followerCount = following ? baseFollowers + 1 : baseFollowers;

  return (
    <div className={styles.page}>
      <SiteNav active="Leaders" />

      <div className={styles.profileHeader}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/art/banner-leader.png" alt="" className={styles.banner} />
        <div className={styles.profileRow}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/art/av-g.png" alt="" className={styles.avatar} />
          <div style={{ flex: 1, paddingBottom: 4 }}>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>@grail_goblin</h1>
              <span className={styles.leaderBadge}>★ LEADER</span>
              <span className={styles.sinceBadge}>MEMBER SINCE 2024</span>
            </div>
            <div className={styles.bio}>
              Vintage Pokémon degenerate. If it&apos;s holo and from 1999, it&apos;s already in my
              vault. Weekly binder tours &amp; pull-rate math.
            </div>
          </div>
          <div className={styles.actions}>
            <button
              onClick={() => setFollowing((f) => !f)}
              className={styles.followBtn}
              style={{
                background: following ? '#fff' : '#e6392f',
                color: following ? '#17130f' : '#fff',
              }}
            >
              {following ? '✔ FOLLOWING' : '+ FOLLOW'}
            </button>
            <button className={styles.shareBtn}>Share ↗</button>
          </div>
        </div>
        <div className={styles.statsStrip}>
          <div className={styles.statCell}>
            <div className={styles.statValueRed}>{followerCount.toLocaleString('en-US')}</div>
            <div className={styles.statLabel}>FOLLOWERS</div>
          </div>
          <div className={styles.statCell}>
            <div className={styles.statValue}>1,204</div>
            <div className={styles.statLabel}>CARDS SHOWCASED</div>
          </div>
          <div className={styles.statCell}>
            <div className={styles.statValue}>$112,480</div>
            <div className={styles.statLabel}>PUBLIC VAULT VALUE</div>
          </div>
          <div className={styles.statCellLast}>
            <div className={styles.statValueGreen}>▲ 6.2%</div>
            <div className={styles.statLabel}>30-DAY CHANGE</div>
          </div>
        </div>
      </div>

      <div className={styles.tabsRow}>
        <span
          onClick={() => setTab('showcase')}
          className={styles.tab}
          style={{ background: tab === 'showcase' ? '#17130f' : '#fff', color: tab === 'showcase' ? '#ffd23f' : '#17130f' }}
        >
          🏆 GRAIL SHOWCASE
        </span>
        <span
          onClick={() => setTab('all')}
          className={styles.tab}
          style={{ background: tab === 'all' ? '#17130f' : '#fff', color: tab === 'all' ? '#ffd23f' : '#17130f' }}
        >
          🗂 ALL CARDS · 1,204
        </span>
      </div>

      {tab === 'all' && (
        <div className={styles.binderWrap}>
          <div className={styles.seriesList}>
            {SERIES.map((sg) => (
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
                  {sg.cards.map((bc, i) => (
                    <div key={i} className={styles.binderRow}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={bc.art} alt="" className={styles.binderImg} />
                      <div style={{ minWidth: 0 }}>
                        <div className={styles.binderName}>{bc.name}</div>
                        <div className={styles.binderSub}>{bc.sub}</div>
                        <div className={styles.binderPrice}>{bc.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'showcase' && (
        <div className={styles.showcaseWrap}>
          <div className={styles.showcaseHead}>
            <h2 className={styles.showcaseTitle}>Grail showcase</h2>
            <span className={styles.top6Badge}>TOP 6</span>
          </div>
          <div className={styles.showcaseGrid}>
            {GRAILS.map((g, i) => (
              <div key={i} className={styles.grailCard} style={{ transform: `rotate(${g.tilt}deg)` }}>
                <div className={styles.grailImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.art} alt="" className={styles.grailImg} />
                  <div className={styles.gradeBadge}>{g.grade}</div>
                </div>
                <div className={styles.grailBody}>
                  <div className={styles.grailSet}>{g.set}</div>
                  <div className={styles.grailName}>{g.name}</div>
                  <div className={styles.grailPriceRow}>
                    <span className={styles.grailPrice}>{g.price}</span>
                    <span className={styles.grailDelta} style={{ color: g.deltaColor }}>
                      {g.delta}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.ctaStrip}>
        <div className={styles.ctaStar}>★</div>
        <div className={styles.ctaBody}>
          <div className={styles.ctaTitle}>Want a page like this?</div>
          <div className={styles.ctaDesc}>
            Members can apply for Leader status — public showcase at your own URL, follower count,
            and the leader badge.
          </div>
        </div>
        <Link href="/pricing" className={styles.ctaBtn}>
          APPLY NOW →
        </Link>
      </div>

      <div className={styles.footerStrip}>Built with passion, for real collectors. © 2026 CollectorHQ</div>
    </div>
  );
}
