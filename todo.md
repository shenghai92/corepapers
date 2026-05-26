# CorePapers - Project TODO

## Phase 1: Foundation
- [x] Initialize project scaffold (web-db-user)
- [x] Database schema: users, subscriptions, blog_posts, writing_sessions, citation_history
- [x] Global CSS design system (lavender/blush/mint palette, serif/sans typography)
- [x] Layout components: Navbar, Footer, SEOHead
- [x] Language switcher UI in Navbar (en/es/fr/zh/ar)

## Phase 2: Core Pages
- [x] Landing Page (Hero, Features, Testimonials, CTA, Stats, How It Works, Competitor Comparison)
- [x] AI Essay Polish Tool page (text input, discipline selector, native language selector, AI suggestions, explanation panel)
- [x] Academic Phrase Library page (discipline filter, hedging/boosting templates, copy button)
- [x] Citation Generator page (APA/MLA/Chicago/IEEE, 6 source types, form input, output)
- [x] Pricing page (Free/Student $7.9/Pro $14.9, monthly/annual toggle, competitor comparison, FAQ)
- [x] Blog / Resource Center page (article list, SEO-optimized, 6 seed articles)
- [x] Blog single article page (full content, JSON-LD Article schema)
- [x] User Dashboard (writing history, subscription status, quick actions, upgrade CTA)

## Phase 3: SEO & Technical
- [x] Per-page meta title/description (English, ESL-focused keywords)
- [x] Open Graph tags (og:title, og:description, og:image, og:url)
- [x] Twitter Card tags
- [x] JSON-LD structured data (WebSite, SoftwareApplication, Article, FAQPage)
- [x] sitemap.xml (all public pages)
- [x] robots.txt
- [x] Semantic HTML throughout
- [x] Canonical URLs per page

## Phase 4: Payments
- [x] Stripe integration (webdev_add_feature)
- [x] Subscription plans: Student $7.9/mo or $59/yr, Pro $14.9/mo or $99/yr
- [x] Stripe Checkout Session creation (server-side)
- [x] Webhook handling (checkout.session.completed, subscription.updated, subscription.deleted, invoice.payment_failed)
- [x] Subscription status stored in DB
- [x] .edu email verification for student discount (future enhancement - noted in FAQ)
- [x] Subscription management portal (cancel subscription API implemented, UI upgrade CTA in dashboard)

## Phase 5: Testing & Deployment
- [x] Vitest unit tests (11 passing: auth, plans, protected procedures, blog)
- [x] Final checkpoint save
- [x] Cloudflare DNS configuration (instructions provided to user)
- [x] Stripe sandbox claim (instructions provided to user)
