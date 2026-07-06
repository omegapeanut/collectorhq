# CARD COLLECTOR PLATFORM — FULL BUILD INSTRUCTIONS FOR CLAUDE FABLE 5

## 0. PROJECT BRIEF (read this first)

Build a web application that is a TCG (trading card game) collection portfolio tracker, modeled functionally on **Collectr** (getcollectr.com / Collectr TCG Collector App). The website is **Phase 1**. It must be architected so that **Phase 2** (native iOS + Android apps) can reuse the same backend and business logic with minimal rework.

This means: build the backend as a standalone API-first service (not tangled into server-rendered pages), keep business logic out of UI components, and use a database/auth layer that has first-party mobile SDKs (Firebase or Supabase both qualify). Do not hardcode anything that assumes "web only" — sessions, auth tokens, and image uploads should all work the same way from a future mobile client.

**Monetization model:** Freemium. Free tier sees ads. Paid tier ("Pro"/"Member") removes ads and unlocks limits + perks. Plus a donation channel (bank transfer + Bitcoin) for supporters who don't want a subscription.

---

## 1. CORE FEATURE LIST (extracted from Collectr's live app/website — build all of these)

### 1.1 Collection Management
- **Product catalog search** — search across 200,000+ card/product entries (name, set, card number, TCG). Filter by game, rarity, set, year.
- **Add to collection** — manually add a card/product to a personal collection ("portfolio").
- **Card scanning** — camera-based card recognition that auto-identifies a card and prefills it (web version: image upload + AI recognition; mobile version later: live camera).
- **Track raw, graded, and sealed items** — three distinct item types per product: raw (ungraded), graded (with grading company + grade, e.g. PSA 10), and sealed (booster box/pack/case).
- **Quantity per item** — user can hold multiple copies of the same card/condition.
- **Condition/grade tagging** — manual condition entry for raw cards (NM, LP, MP, HP, DMG) and grade entry for graded cards (company + numeric grade).
- **Multiple portfolios/collections** — users can create separate named collections (e.g. "Pokémon Vintage", "Trade Binder", "Vault").
- **Unstacked view toggle** — option to view duplicate cards separated by grade/condition rather than merged into one stack.

### 1.2 Valuation & Market Data
- **Real-time portfolio value** — total dollar value of a user's whole collection, computed from live market pricing data.
- **Per-item value** — current market price shown against each card.
- **Price history charts** — historical price trend per card, with separate lines for raw vs graded value, ideally 1yr–5yr range toggle.
- **Gains/losses tracking** — day/week/month/all-time change in portfolio value, in both $ and %.
- **Biggest movers** — dashboard widget: top gaining and top losing items in the user's portfolio.
- **Market trend feed** — general trending cards/sets across the whole platform (not just the user's own items).
- **Population/pop reports** — for graded cards, show how many copies exist at each grade tier (requires a data partner or manually curated dataset — see section 6).
- **Multi-currency support** — display portfolio value in the user's chosen currency (USD, SGD, EUR, etc.), plus an optional "value in BTC" display since the app already supports crypto currency display.
- **Trade fairness meter** — input two sides of a proposed trade (cards from each party) and get an instant fair/unfair verdict based on summed market value.

### 1.3 Social / Community
- **Public profile / showcase** — user can make their collection (or parts of it) publicly viewable.
- **Follow system** — follow other collectors, see their showcases.
- **Community feed** — users post updates, photos of pulls/collections, and comment.
- **Content Creator accounts** — an elevated profile type (see section 4) with a public-facing portfolio page, follower count, and a "creator" badge.
- **Direct messaging** — basic user-to-user chat (optional for v1, flag as future phase if timeline is tight).

### 1.4 Account / Settings
- **Multi-TCG support** — Pokémon, Magic: The Gathering, Yu-Gi-Oh!, One Piece, Disney Lorcana, Dragon Ball Super/Fusion World, Digimon, Flesh and Blood, Star Wars Unlimited/Destiny, Weiss Schwarz, Vanguard, MetaZoo, Funko, Transformers, and others — build the schema generically so new TCGs are just a new "game" row, not new code.
- **Language support** — plan for i18n from day one (English first; Spanish/Chinese/Japanese/Malay later, matching Collectr).
- **Data export** — paid-tier feature: export full collection to CSV/Excel.
- **Notifications** — price alerts, social notifications (follows/comments), system announcements.

### 1.5 Monetization features already in Collectr (confirms your plan is aligned with a proven model)
- Free tier with capped scans/searches per day.
- Paid "Pro" tier removing limits and unlocking: unlimited scanning, exclusive filters, data export, custom social profile backgrounds.
- In-app purchase / subscription model (monthly + discounted annual).

---

## 2. FEATURES YOU'RE ADDING ON TOP (your differentiators)

These are not in Collectr — they're your additions, and they're what makes this your own product rather than a clone.

1. **Google Ads on free tier**, placed non-intrusively (see section 3).
2. **Donations** via bank transfer and Bitcoin (section 5).
3. **Secret super-admin login** with a performance dashboard (section 6).
4. **Festive theme toggle** — Christmas and Chinese New Year visual reskins (section 7).
5. **Member perks marketplace** — discounted card repair and grading submission services (section 8).
6. **Content Creator application flow** — members apply, get approved by admin, unlock a showcase profile (section 4, tied into 1.3).

---

## 3. FREE TIER, ADS & TIER STRUCTURE

### Tiers
| Tier | Price | Limits removed | Ads |
|---|---|---|---|
| **Free** | $0 | 10–20 scans/day, basic filters only, no export | Yes — Google AdSense |
| **Member (Pro)** | Monthly or annual subscription | Unlimited scans, all filters, CSV export, custom profile backgrounds, member perks (grading/repair discounts), can apply for Creator status | No ads |
| **Content Creator** | Free upgrade, application-gated (requires active Member) | Public showcase page, follower system, creator badge | No ads |

### Ad placement rules (for Fable 5 to implement)
- Ad slots only render when `user.tier === 'free'`. Check this server-side too, not just client-side, so it can't be bypassed by editing local state.
- Placements: (a) a leaderboard banner below the top nav on the dashboard and collection pages, (b) a native-feeling card inserted every ~12–15 items in the collection grid (labelled "Sponsored" for compliance), (c) an interstitial only between major navigation actions, capped to once per session — do not overuse interstitials, they tank retention.
- Never place ads inside modals that involve money (checkout, donation, grading submission) — keep those clean.
- Use AdSense's official React/JS embed; do not attempt to fake or reposition ad iframes, as this violates AdSense policy and risks account suspension.
- Store ad-consumption analytics (impressions per placement) in your own DB so the admin dashboard (section 6) can show ad revenue trend without needing a separate AdSense login every time.

---

## 4. MEMBERSHIP PERKS & CONTENT CREATOR PROGRAM

### Member perks: card repair & grading discounts
- Build a simple **Perks** page listing partner services (e.g. card repair specialists, grading companies like PSA/BGS/CGC equivalents you partner with).
- Each perk has: partner name, discount %, a redemption code or referral link, and terms/expiry.
- Redemption codes should be tracked per-user in the DB (`perk_redemptions` table) so you can see usage in the admin dashboard and cap abuse (e.g. one redemption per user per month).
- This is a partnerships feature, not something the website "processes" itself — the discount is fulfilled by the third-party grading/repair company. The site's job is to gate access (member-only), display the perk, and log redemption. Keep this distinction explicit in the code so Fable 5 doesn't try to build a payment flow for grading itself.

### Content Creator application
- Only Members can apply (gate the "Apply to become a Creator" button behind `tier === 'member'`).
- Application form: display name, bio, social links, sample of their collection/portfolio link, why they want creator status.
- Applications go into an admin queue (`creator_applications` table) with status `pending / approved / rejected`.
- On approval: flip `user.role` to include `creator`, unlock the public showcase page template, unlock a "Creator" badge shown across the platform (profile, comments, feed posts).
- Creators get a dedicated public URL like `/creators/<username>` showing their showcase, follower count, and a curated view of their collection (they choose what's public).

---

## 5. DONATIONS — BANK TRANSFER + BITCOIN (design recommendation)

Handling money, especially crypto, is the part most likely to go wrong if built naively. Here's the safest practical design.

### Bank transfer donations
- Do **not** try to auto-verify bank transfers programmatically (that requires a business banking API integration, which is heavy for a v1). Instead:
  1. Show your bank details (account name, number, PayNow/PayLah QR if you're in Singapore) on a "Support Us" page.
  2. User submits a simple form: amount, date, name/reference used, optional message.
  3. This creates a `pending` donation record in the DB.
  4. You (super-admin) manually mark it `confirmed` once you see it land in your account — the dashboard should have a one-click "confirm donation" action.
  5. Confirmed donations show (optionally, if the donor opts in) on a public "Supporters" wall.

### Bitcoin donations — do NOT handle raw private keys yourself
This is the important part. There are three tiers of sophistication; pick based on how hands-on you want to be:

1. **Simplest & safest for v1: static receive address + manual confirmation.**
   Generate one Bitcoin receive address (or a Lightning address like a fixed `you@walletofsatoshi.com`-style address) from a wallet you already control (e.g. a hardware wallet, or a reputable custodial wallet like Strike or Cash App). Display the address + QR on the donation page. User sends BTC, then submits the same "I donated" form as bank transfer (amount, tx hash if they have it, message). You confirm manually by checking a block explorer. This requires zero custom crypto code — you're not writing wallet logic, just displaying a static address.

2. **Semi-automated: a payment processor (recommended once you outgrow #1).**
   Use a non-custodial-friendly processor like **BTCPay Server** (self-hosted, open source, you keep full custody, generates a unique invoice address per donation and auto-detects payment) or a hosted option like **OpenNode** or **Coinbase Commerce** (they generate a unique address per donation and webhook you when it's paid, then forward funds to your own wallet). This gives you automatic confirmation without you ever holding customer funds in a third-party custodial balance longer than a settlement window.
   - BTCPay Server is the better long-term choice because it's free, open-source, and non-custodial — funds go straight to your own wallet, no middleman holding your BTC.
   - Fable 5 should integrate via BTCPay's REST API: create an invoice server-side, show the QR/address client-side, poll or webhook for the "settled" status, then mark the donation `confirmed` automatically.

3. **What to avoid entirely:** don't write your own code to generate/store private keys, don't hold customer crypto in a hot wallet embedded in your app's server, and don't build your own blockchain transaction broadcasting. This is unnecessary risk for a donation feature — always integrate with an established wallet/processor instead of reinventing wallet infrastructure.

### For a website that will become an app: keep the donation flow as simple deep-linkable web views (a hosted checkout page/invoice URL), so the future mobile app can just open the same URL in an in-app browser rather than needing separate native payment code.

---

## 6. SECRET SUPER-ADMIN LOGIN & DASHBOARD

- Do not add a visible "Admin Login" link anywhere in the UI. Instead, use an unlisted route, e.g. `/portal-x7q` (pick your own obscure slug — don't literally use "admin" or "secret" in the path, since that's the first thing anyone scanning routes will try).
- This route should still require full authentication (email/password or passkey) plus a role check (`role === 'super_admin'`) server-side on every request — "secret URL" is obscurity, not security, so the real protection is the auth + role check, not the hidden path. Add rate-limiting on login attempts to this route specifically.
- Strongly recommend 2FA (TOTP, e.g. Google Authenticator) for this account given it's your only admin login.
- **Dashboard contents:**
  - Total users, new signups (daily/weekly/monthly graph), tier breakdown (free vs member vs creator).
  - Revenue: subscription revenue, ad revenue (pulled from your own impression logs, cross-checked periodically against your real AdSense dashboard), donation totals (bank + BTC), all on a combined trend chart.
  - Pending items requiring action: unconfirmed bank donations, unconfirmed BTC donations (if using manual mode), pending creator applications, reported content/users.
  - Engagement metrics: DAU/MAU, average session length, most-searched cards, most-added TCGs.
  - System health: error logs, API response times, scan/recognition success rate (this one matters a lot — Collectr's own reviews complain about scan accuracy, so track it from day one).

---

## 7. FESTIVE THEME TOGGLE (Christmas / CNY)

- Implement as a **theming layer**, not separate page builds: define your color palette, accent icons, and a few decorative SVG assets (snow/holly for Christmas, red-gold lanterns/plum blossoms for CNY) as swappable CSS variable sets + a couple of optional decorative components (e.g. a corner ornament, a banner strip).
- Store the active theme as a global setting (`site_theme: 'default' | 'christmas' | 'cny'`) that you flip from the super-admin dashboard — not something individual users toggle themselves, since you said "toggle to change theme of the website" (implying a site-wide switch you control). If you also want users to have personal control, add a secondary per-user override, but default to admin-controlled.
- Keep the underlying layout, components, and functionality identical across themes — only swap CSS variables (colors), a header banner graphic, and optional festive icon accents. Don't rebuild components per theme; that becomes a maintenance nightmare.
- Auto-schedule is a nice-to-have: let the admin pick a date range (e.g. Dec 1–26 for Christmas, based on the lunar new year date for CNY) and have it auto-activate/deactivate, with manual override always available.

---

## 8. PAGE / ROUTE STRUCTURE (for Fable 5 to scaffold)

```
/                          → Landing/marketing page (like getcollectr.com)
/explore                   → Public product catalog search (no login required)
/product/:id               → Individual card/product detail + price history
/signup, /login            → Auth
/dashboard                 → User's portfolio overview (value, gains/losses, charts)
/collections               → List of user's collections/portfolios
/collections/:id           → Individual collection view (grid of items)
/scan                      → Card scan/upload + recognition flow
/social                    → Community feed
/creators/:username        → Public creator showcase page
/profile/:username         → Public user profile (if public)
/settings                  → Account, billing, notification, theme override
/perks                     → Member perks (grading/repair discounts)
/perks/apply-creator       → Content creator application form
/support-us                → Donations (bank transfer + Bitcoin)
/pricing                   → Free vs Member comparison + checkout
/portal-x7q                → Super admin login (unlisted, not linked anywhere)
/portal-x7q/dashboard      → Admin dashboard (protected)
```

---

## 9. SUGGESTED TECH STACK (optimized for "website now, app later")

- **Frontend:** React (Next.js) for the website. Component structure kept clean/reusable so a future React Native app can share design tokens and business logic (hooks, API client) even though UI components themselves won't be shared 1:1.
- **Backend/API:** A dedicated API layer (Node/Express, or Next.js API routes to start, but keep routes RESTful/versioned like `/api/v1/...` so a future mobile client just calls the same endpoints).
- **Auth + DB:** Firebase (Auth + Firestore) or Supabase (Auth + Postgres) — both have first-party iOS/Android SDKs, so Phase 2 app development plugs into the same backend without rebuilding auth.
- **Payments:** Stripe for subscriptions (Member tier) — has clean mobile SDKs too when you get to Phase 2.
- **Card/pricing data:** You'll need a data source for card catalog + pricing. Options: partner with an existing TCG pricing API (e.g. TCGplayer's API, PokemonTCG.io for Pokémon specifically, Scryfall for Magic), or start with a curated dataset for your top 3–4 TCGs and expand. Do not attempt to scrape marketplaces for pricing — build on licensed/public APIs.
- **Card scan recognition:** Start with a cloud vision API (e.g. Google Cloud Vision OCR + your own card-name matching logic) rather than training a custom model from scratch — much faster to ship, and Collectr's own reviews show even a mature product still struggles with scan accuracy, so don't over-invest in a custom ML pipeline for v1.
- **Ads:** Google AdSense (auto ads + manual placements per section 3).

---

## 10. BUILD ORDER (recommended phases for Fable 5)

1. Auth + user model (with tier/role fields) + basic responsive layout + theme system scaffolding.
2. Product catalog + search (static/seeded dataset to start) + product detail pages.
3. Collection CRUD (add/remove/edit items, raw/graded/sealed types, quantities, conditions).
4. Portfolio valuation + charts (gains/losses, biggest movers).
5. Free tier limits + ad placements + Stripe subscription for Member tier.
6. Card scan/upload recognition flow.
7. Social feed + public profiles + Creator application + showcase pages.
8. Perks page + redemption tracking.
9. Donations (bank transfer manual flow first, BTCPay integration second).
10. Super-admin dashboard (build this incrementally — start with user/revenue counts, add engagement + system health metrics after).
11. Festive theme content (assets + admin toggle) — can be done anytime after step 1's theming scaffold exists.

---

## 11. INSTRUCTIONS FOR FABLE 5 — HOW TO USE THIS DOCUMENT

Build in the phase order in section 10. For each phase, confirm the data model first (show me the schema/tables before writing UI), then build backend endpoints, then frontend. Keep the API versioned and framework-agnostic enough that a React Native app can call it later. Do not build any custom cryptocurrency wallet or key-management code — always integrate an established processor per section 5. Ask me for real card/pricing data source decisions before hardcoding any specific TCG API, since that may involve a paid contract on my end.
