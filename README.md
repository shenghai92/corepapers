# CorePapers

Cloudflare-ready academic writing app for polishing essays, generating citations, and managing subscriptions.

## Stack

- Frontend: Vite + React + Tailwind
- Backend: tRPC
- Auth: email/password session cookies
- Payments: Creem
- Storage: Cloudflare R2
- Database: Cloudflare D1 (SQLite)

## Local dev

```bash
corepack pnpm install
corepack pnpm dev
```

## Build

```bash
corepack pnpm check
corepack pnpm test
corepack pnpm build
corepack pnpm dev
```

## Environment

Set these in Cloudflare and locally:

- `JWT_SECRET`
- `OWNER_EMAIL`
- `CREEM_API_KEY`
- `CREEM_WEBHOOK_SECRET`
- `CREEM_STUDENT_MONTHLY_PRODUCT_ID`
- `CREEM_STUDENT_ANNUAL_PRODUCT_ID`
- `CREEM_PRO_MONTHLY_PRODUCT_ID`
- `CREEM_PRO_ANNUAL_PRODUCT_ID`
- `CUSTOM_AI_BASE_URL`
- `CUSTOM_AI_API_KEY`
- `CUSTOM_AI_MODEL`
- `R2_PUBLIC_URL`
- `VITE_GOOGLE_MAPS_API_KEY`

Bind your Cloudflare D1 database as `DB`.
If you use R2, bind the bucket as `R2`.

## Deployment notes

- Deploy the static site with Cloudflare Pages and the API with Pages Functions.
- Run `corepack pnpm build` first, then deploy `dist/public`.
- Or run `corepack pnpm deploy:cf`.
- The login page is `/login`.
- Creem checkout and webhooks use Cloudflare Pages Functions.
- The D1 schema bootstraps itself on first request after the `DB` binding is attached.
- Uploaded files should be stored in R2 and served from the public URL you bind.
- The app now runs on Cloudflare-compatible infrastructure only.
