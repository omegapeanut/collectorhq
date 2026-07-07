'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/pricing/pricing.module.css';

export default function PricingPlans() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.kicker}>PRICING</div>
        <h1 className={styles.title}>Pick your rank</h1>
        <p className={styles.subtitle}>
          Start free forever. Go Member when you want unlimited scans and zero ads.
        </p>
        <div className={styles.toggle}>
          <span
            onClick={() => setYearly(false)}
            className={styles.toggleBtn}
            style={{ background: yearly ? '#fff' : '#17130f', color: yearly ? '#17130f' : '#ffd23f' }}
          >
            MONTHLY
          </span>
          <span
            onClick={() => setYearly(true)}
            className={styles.toggleBtnYearly}
            style={{ background: yearly ? '#17130f' : '#fff', color: yearly ? '#ffd23f' : '#17130f' }}
          >
            YEARLY −35%
          </span>
        </div>
      </div>

      <div className={styles.plansGrid}>
        {/* Rookie */}
        <div className={`${styles.plan} ${styles.planRookie}`}>
          <div className={styles.tierName}>Rookie</div>
          <div className={styles.priceRed}>FREE</div>
          <div className={styles.features} style={{ color: '#4a4238' }}>
            <span>✔ 15 scans a day</span>
            <span>✔ Track unlimited cards</span>
            <span>✔ Live pricing &amp; basic filters</span>
            <span>✔ Community feed</span>
            <span style={{ color: '#8a7f70' }}>— Supported by ads</span>
          </div>
          <Link href="/login" className={styles.ctaOutline}>
            START FREE
          </Link>
        </div>

        {/* Member */}
        <div className={`${styles.plan} ${styles.planMember}`}>
          <div className={styles.badgePopular}>MOST POPULAR</div>
          <div className={styles.tierName} style={{ color: '#ffd23f' }}>
            Member
          </div>
          <div className={styles.price}>
            {yearly ? '$39' : '$4.99'}
            <span style={{ font: '700 15px var(--font-sans)', color: '#b5aa9c' }}>
              {yearly ? '/yr' : '/mo'}
            </span>
          </div>
          <div className={styles.priceNote} style={{ color: '#b5aa9c' }}>
            {yearly ? 'That’s $3.25/mo — save 35%' : 'or $39/yr — save 35%'}
          </div>
          <div className={styles.features}>
            <span style={{ color: '#ffd23f' }}>★ Unlimited scans, zero ads</span>
            <span>✔ All filters + CSV export</span>
            <span>✔ Grading &amp; repair discounts</span>
            <span>✔ Custom profile backgrounds</span>
            <span>✔ Can apply for Leader status</span>
          </div>
          <Link href="/login" className={styles.ctaFilled}>
            GO MEMBER →
          </Link>
        </div>

        {/* Shop */}
        <div className={`${styles.plan} ${styles.planShop}`}>
          <div className={styles.badgeInvite}>INVITE ONLY</div>
          <div className={styles.tierName} style={{ color: '#1c9e4f' }}>
            Shop
          </div>
          <div className={styles.price}>🏪</div>
          <div className={styles.priceNote} style={{ color: '#8a7f70' }}>
            For physical TCG shops — by invitation
          </div>
          <div className={styles.features} style={{ color: '#4a4238' }}>
            <span style={{ color: '#1c9e4f', fontWeight: 700 }}>★ Everything in Member</span>
            <span>✔ Stock showcase page</span>
            <span>✔ Open preorders to all collectors</span>
            <span>✔ Featured on the home page</span>
            <span>✔ Lucky draw claim point</span>
          </div>
          <Link href="/support-us" className={styles.ctaOutlineGreen}>
            REQUEST AN INVITE
          </Link>
        </div>
      </div>
    </>
  );
}
