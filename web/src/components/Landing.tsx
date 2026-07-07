import Link from 'next/link';
import SiteNav from './SiteNav';
import styles from './Landing.module.css';
import type { Card } from '@/lib/cards';
import { fmtMoney } from '@/lib/cards';

interface Mover {
  art: string;
  game: string;
  name: string;
  sub: string;
  price: string;
  deltaPct: number;
}

const GAMES = [
  'POKÉMON',
  'ONE PIECE',
  'NARUTO KAYOU',
  'MAGIC: THE GATHERING',
  'YU-GI-OH!',
  'LORCANA',
  'DRAGON BALL',
  'DIGIMON',
  'STAR WARS',
  'WEISS SCHWARZ',
];

const PREORDERS = [
  {
    art: '/art/box-pokemon.png',
    shop: 'Dragon’s Den TCG',
    city: 'SINGAPORE',
    game: 'POKÉMON',
    name: 'Prismatic Evolutions ETB',
    release: 'Aug 14',
    price: '$89 deposit $20',
    slots: '23 / 60 slots left',
    slotsColor: '#1c9e4f',
    tilt: -0.5,
  },
  {
    art: '/art/box-onepiece.png',
    shop: 'Mint Condition',
    city: 'MANILA',
    game: 'ONE PIECE',
    name: 'OP-11 Booster Box (JP)',
    release: 'Aug 29',
    price: '$74 deposit $15',
    slots: '6 / 40 slots left',
    slotsColor: '#e6392f',
    tilt: 0.6,
  },
  {
    art: '/art/box-lorcana.png',
    shop: 'Top Deck Games',
    city: 'KUALA LUMPUR',
    game: 'LORCANA',
    name: 'Fabled — Illumineer’s Trove',
    release: 'Sep 5',
    price: '$62 deposit $10',
    slots: '31 / 50 slots left',
    slotsColor: '#1c9e4f',
    tilt: -0.4,
  },
];

function formatCond(cond: string): string {
  return cond.startsWith('RAW ') ? cond.replace('RAW ', 'RAW · ') : cond;
}

function moverFromCard(card: Card): Mover {
  return {
    art: card.art ?? '',
    game: card.game,
    name: card.name,
    sub: formatCond(card.cond),
    price: card.priceLabel,
    deltaPct: card.deltaPct,
  };
}

export default function Landing({ movers }: { movers: readonly [Card, Card, Card] }) {
  const dynamicMovers = movers.map(moverFromCard);
  const boxMover: Mover = {
    art: '/art/box-naruto.png',
    game: 'NARUTO',
    name: 'Kayou Tier 4 Box',
    sub: 'SEALED',
    price: fmtMoney(118),
    deltaPct: 3.1,
  };
  const allMovers = [dynamicMovers[0], dynamicMovers[1], boxMover, dynamicMovers[2]];
  const moverTilts = [-0.6, 0.8, -0.4, 0.5];

  return (
    <div className={styles.page}>
      <SiteNav />

      {/* hero */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroBadge}>★ 200,000+ CARDS · 14 TCGs · LIVE PRICES</div>
          <h1 className={styles.heroTitle}>Your cards.</h1>
          <h1 className={styles.heroTitleRed}>Their true power.</h1>
          <p className={styles.heroDesc}>
            Scan any card, get its live market price, and watch your whole collection power up.
            Pokémon, One Piece, Naruto, MTG — all in one HQ.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/scan" className={styles.heroCtaPrimary}>
              ⚡ SCAN YOUR FIRST CARD
            </Link>
            <Link href="/explore" className={styles.heroCtaSecondary}>
              Browse the catalog →
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
            <span className={styles.heroSocialText}>12,400+ collectors already tracking</span>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroBg} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/art/hero-burst.png" alt="" className={styles.heroCharImg} />
          <div className={styles.heroPriceCard}>
            <div className={styles.heroPriceLabel}>OP-01 · SHANKS</div>
            <div className={styles.heroPriceValue}>
              $389 <span style={{ font: '800 13px var(--font-sans)', color: '#1c9e4f' }}>▲8.4%</span>
            </div>
          </div>
          <div className={styles.heroPsaBadge}>PSA 10 GRADED!</div>
          <div className={styles.heroVaultCard}>
            <div className={styles.heroVaultLabel}>YOUR VAULT</div>
            <div className={styles.heroVaultValue}>
              $48,215 <span style={{ font: '800 12px var(--font-sans)', color: '#1c9e4f' }}>▲2.6%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ticker */}
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {Array.from({ length: 2 }).map((_, rep) => (
            <span key={rep} style={{ display: 'contents' }}>
              <span>
                PKM INDEX <span style={{ color: '#7fe08a' }}>+1.8%</span>
              </span>
              <span>✦</span>
              <span>
                ONE PIECE <span style={{ color: '#ff8a7a' }}>−0.9%</span>
              </span>
              <span>✦</span>
              <span>
                NARUTO KAYOU <span style={{ color: '#7fe08a' }}>+3.1%</span>
              </span>
              <span>✦</span>
              <span>
                MTG <span style={{ color: '#7fe08a' }}>+0.6%</span>
              </span>
              <span>✦</span>
              <span>
                LORCANA <span style={{ color: '#7fe08a' }}>+2.3%</span>
              </span>
              <span>✦</span>
              <span>
                YGO <span style={{ color: '#7fe08a' }}>+0.2%</span>
              </span>
              <span>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* how it works */}
      <div className={styles.howSection}>
        <div className={styles.howKickerWrap}>
          <span className={styles.sectionKicker} style={{ transform: 'rotate(-1.5deg)' }}>
            HOW IT WORKS
          </span>
        </div>
        <h2 className={styles.sectionTitle}>Three moves to power up</h2>
        <div className={styles.howGrid}>
          <div className={styles.howCard} style={{ transform: 'rotate(-.7deg)' }}>
            <div
              className={styles.howCardTop}
              style={{
                background:
                  'repeating-conic-gradient(from 0deg at 50% 120%, #ffd23f 0deg 8deg, #f8b81e 8deg 16deg)',
              }}
            >
              <div className={styles.howCardEmoji} style={{ transform: 'rotate(-4deg)' }}>
                📸
              </div>
              <div className={styles.howCardNum}>1</div>
            </div>
            <div className={styles.howCardBody}>
              <div className={styles.howCardTitle}>Scan it</div>
              <p className={styles.howCardDesc}>
                Snap or upload any card. Our recognition AI identifies it and prefills set, number
                and rarity in seconds.
              </p>
            </div>
          </div>
          <div className={styles.howCard} style={{ transform: 'rotate(.6deg)' }}>
            <div
              className={styles.howCardTop}
              style={{
                background:
                  'radial-gradient(circle, rgba(230,57,47,.18) 1.6px, transparent 1.6px) 0 0/12px 12px, #ffe9e7',
              }}
            >
              <div className={styles.howCardEmoji} style={{ transform: 'rotate(3deg)' }}>
                📈
              </div>
              <div className={styles.howCardNum}>2</div>
            </div>
            <div className={styles.howCardBody}>
              <div className={styles.howCardTitle}>Track it</div>
              <p className={styles.howCardDesc}>
                Raw, graded or sealed — live market pricing, price history charts, gains and losses
                across your whole vault.
              </p>
            </div>
          </div>
          <div className={styles.howCard} style={{ transform: 'rotate(-.5deg)' }}>
            <div
              className={styles.howCardTop}
              style={{
                background:
                  'repeating-linear-gradient(-45deg,#e8f3ff,#e8f3ff 10px,#d8eaff 10px,#d8eaff 20px)',
              }}
            >
              <div className={styles.howCardEmoji} style={{ transform: 'rotate(-3deg)' }}>
                🏆
              </div>
              <div className={styles.howCardNum}>3</div>
            </div>
            <div className={styles.howCardBody}>
              <div className={styles.howCardTitle}>Flex it</div>
              <p className={styles.howCardDesc}>
                Showcase your grails, follow collectors and leaders, and run trade checks so no deal
                ever robs you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* movers */}
      <div className={styles.rowSection}>
        <div className={styles.rowHeader}>
          <h2 className={styles.rowTitle}>This week&apos;s movers</h2>
          <span className={styles.hotBadge}>HOT!</span>
          <span className={styles.spacer} />
          <Link href="/explore" className={styles.seeMoreLink}>
            See the full market →
          </Link>
        </div>
        <div className={styles.moversGrid}>
          {allMovers.map((m, i) => {
            const up = m.deltaPct >= 0;
            return (
              <div key={i} className={styles.moverCard} style={{ transform: `rotate(${moverTilts[i]}deg)` }}>
                <div className={styles.moverRow}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.art} alt="" className={styles.moverImg} />
                  <div>
                    <div className={styles.moverGame}>{m.game}</div>
                    <div className={styles.moverName}>{m.name}</div>
                    <div className={styles.moverSub}>{m.sub}</div>
                    <div className={styles.moverPrice}>
                      {m.price}{' '}
                      <span
                        className={styles.moverDelta}
                        style={{ color: up ? '#1c9e4f' : '#c0362c' }}
                      >
                        {up ? '▲' : '▼'}
                        {Math.abs(m.deltaPct).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* preorders */}
      <div className={styles.rowSectionTight}>
        <div className={styles.rowHeader}>
          <h2 className={styles.rowTitle}>New preorders</h2>
          <span className={styles.partnerBadge}>FROM PARTNER SHOPS</span>
          <span className={styles.spacer} />
          <Link href="/shop" className={styles.seeMoreLink}>
            All partner shops →
          </Link>
        </div>
        <div className={styles.preorderGrid}>
          {PREORDERS.map((po, i) => (
            <div key={i} className={styles.preorderCard} style={{ transform: `rotate(${po.tilt}deg)` }}>
              <div className={styles.preorderShopBar}>
                <span className={styles.preorderShopName}>🏪 {po.shop}</span>
                <span className={styles.preorderCity}>{po.city}</span>
              </div>
              <div className={styles.preorderBody}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={po.art} alt="" className={styles.preorderImg} />
                <div style={{ flex: 1 }}>
                  <div className={styles.preorderGame}>{po.game}</div>
                  <div className={styles.preorderName}>{po.name}</div>
                  <div className={styles.preorderRelease}>Releases {po.release}</div>
                  <div className={styles.preorderPrice}>{po.price}</div>
                </div>
              </div>
              <div className={styles.preorderFooter}>
                <span className={styles.preorderSlots} style={{ color: po.slotsColor }}>
                  {po.slots}
                </span>
                <Link href="/shop" className={styles.preorderBtn}>
                  PREORDER →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* lucky draw */}
      <div className={styles.luckyStrip}>
        <div className={styles.luckyEmoji}>🎰</div>
        <div className={styles.luckyBody}>
          <div className={styles.luckyTitle}>Monthly lucky draw — win a sealed booster box</div>
          <div className={styles.luckyDesc}>
            Every scan this month earns entries. Winners claim their prize in person at a partner
            shop near them.
          </div>
        </div>
        <Link href="/community" className={styles.luckyBtn}>
          SEE THIS MONTH&apos;S DRAW →
        </Link>
      </div>

      {/* tcg strip */}
      <div className={styles.tcgStrip}>
        {GAMES.map((g) => (
          <span key={g} className={styles.tcgPill}>
            {g}
          </span>
        ))}
      </div>

      {/* leaders */}
      <div className={styles.leadersSection}>
        <div className={styles.leadersBgDots} />
        <div className={styles.leadersGrid}>
          <div>
            <div className={styles.leadersKicker}>LEADER PROGRAM</div>
            <h2 className={styles.leadersTitle}>Become the main character</h2>
            <p className={styles.leadersDesc}>
              Members can apply for Leader status: a public showcase page, follower count, leader
              badge, and your collection on display at its own URL.
            </p>
            <Link href="/leader" className={styles.leadersCta}>
              APPLY FOR LEADER STATUS
            </Link>
          </div>
          <div className={styles.leadersCards}>
            <div className={styles.leaderMiniCard} style={{ transform: 'rotate(-3deg)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/art/av-g.png" alt="" className={styles.leaderMiniAvatar} />
              <div className={styles.leaderMiniName}>
                @grail_goblin <span className={styles.leaderMiniStar}>★</span>
              </div>
              <div className={styles.leaderMiniFollowers}>8.2k followers</div>
              <div className={styles.leaderMiniVault}>Vault: $112,480</div>
            </div>
            <div
              className={styles.leaderMiniCard}
              style={{ transform: 'rotate(2.5deg)', marginTop: 30 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/art/av-s.png" alt="" className={styles.leaderMiniAvatar} />
              <div className={styles.leaderMiniName}>
                @sleeved_up <span className={styles.leaderMiniStar}>★</span>
              </div>
              <div className={styles.leaderMiniFollowers}>5.6k followers</div>
              <div className={styles.leaderMiniVault}>Vault: $64,900</div>
            </div>
          </div>
        </div>
      </div>

      {/* pricing */}
      <div className={styles.pricingSection}>
        <div className={styles.howKickerWrap}>
          <span className={styles.sectionKicker} style={{ transform: 'rotate(1.5deg)' }}>
            PRICING
          </span>
        </div>
        <h2 className={styles.sectionTitle}>Pick your rank</h2>
        <div className={styles.pricingGrid}>
          <div className={`${styles.pricingCard} ${styles.pricingCardFree}`}>
            <div className={styles.pricingTierName}>Rookie</div>
            <div className={styles.pricingPrice}>FREE</div>
            <div className={styles.pricingFeatures}>
              <span>✔ 15 scans a day</span>
              <span>✔ Track unlimited cards</span>
              <span>✔ Live pricing & basic filters</span>
              <span>✔ Community feed</span>
              <span className={styles.pricingFeatureMuted}>— Supported by ads</span>
            </div>
            <Link href="/login" className={styles.pricingCtaOutline}>
              START FREE
            </Link>
          </div>
          <div className={`${styles.pricingCard} ${styles.pricingCardMember}`}>
            <div className={styles.pricingPopularBadge}>MOST POPULAR</div>
            <div className={styles.pricingTierNameYellow}>Member</div>
            <div className={styles.pricingPriceMember}>
              $4.99<span style={{ font: '700 15px var(--font-sans)', color: '#b5aa9c' }}>/mo</span>
            </div>
            <div className={styles.pricingPriceSub}>or $39/yr — save 35%</div>
            <div className={styles.pricingFeaturesMember}>
              <span className={styles.pricingFeatureHighlight}>★ Unlimited scans, zero ads</span>
              <span>✔ All filters + CSV export</span>
              <span>✔ Grading & repair discounts</span>
              <span>✔ Custom profile backgrounds</span>
              <span>✔ Can apply for Leader status</span>
            </div>
            <Link href="/login" className={styles.pricingCtaFilled}>
              GO MEMBER →
            </Link>
          </div>
        </div>
      </div>

      {/* support strip */}
      <div className={styles.supportStrip}>
        <div className={styles.supportEmoji}>♥</div>
        <div className={styles.supportBody}>
          <div className={styles.supportTitle}>Not into subscriptions? Support the HQ.</div>
          <div className={styles.supportDesc}>
            One-off donations by bank transfer or Bitcoin keep the servers running. Supporters get a
            spot on the wall of fame.
          </div>
        </div>
        <Link href="/support-us" className={styles.supportBtn}>
          DONATE →
        </Link>
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <div>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoMark}>C</div>
            <span className={styles.footerLogoText}>COLLECTORHQ</span>
          </div>
          <div className={styles.footerTagline}>
            The collector&apos;s headquarters. Track, trade and flex across 14 TCGs.
          </div>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Product</span>
            <span>Explore</span>
            <span>Scan</span>
            <span>Pricing</span>
            <span>Perks</span>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Community</span>
            <span>Feed</span>
            <span>Leaders</span>
            <span>Supporters wall</span>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Company</span>
            <span>Support Us</span>
            <span>Terms</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
