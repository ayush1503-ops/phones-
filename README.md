# Dumbphones India storefront — Vercel deployment

This is a Next.js 16 App Router application. Vercel should detect **Next.js** automatically; do not configure a static export or rewrite `/api/*`. The frontend can build without a database, but contact, newsletter, returns, tracking and checkout requests require PostgreSQL at runtime.

## Set up

1. Create a PostgreSQL database (prefer a pooled/serverless connection endpoint reachable from Vercel). Copy `.env.example` to `.env.local` locally and put your real `DATABASE_URL` there. Never commit credentials. In Vercel **Project → Settings → Environment Variables**, set `DATABASE_URL` for Production, Preview and Development (separate databases for Preview and Production are strongly recommended). If your provider requires TLS, use its SSL-enabled URL.
2. Install dependencies with `npm ci`. Run `npm run db:migrate` **against each environment's database** before accepting form submissions. Run migrations from a trusted machine or CI with that environment's `DATABASE_URL`; they are not run in Vercel builds. The committed `drizzle/` SQL contains the initial schema. Do not use `db:generate` as a substitute for `db:migrate`.
3. Run `npm run lint && npm run typecheck && npm run build`. `GET /api/health` returns 200 only when the database and `orders` table are available; it returns 500 otherwise. After deployment, use this endpoint and submit a test contact/subscribe request and an order request, then check the database.
4. Import this repository into Vercel with the repository root as the project root, Framework Preset **Next.js**, install command `npm ci` (or leave auto-detection), build command `npm run build` (or leave auto-detection). No `vercel.json` is needed. Deploy a Preview first, then promote/merge when ready. Configure your domain in Vercel only after completing the media step below.

### Product media — required before a domain cutover

The initial checkout had no `public/images` assets. The current product and editorial photos point to the existing WordPress media library at `https://dumbphones.co.in/wp-content/uploads/`; the logo is included locally as an SVG. **A Vercel preview can use those URLs, but moving dumbphones.co.in to Vercel without importing the photos will break them** (the old WordPress media endpoints will disappear).

While the WordPress site is still accessible, run `npm run assets:vendor` on a machine with network access to it. This fetches all referenced photos into `public/media/` and rewrites the three source files to use local URLs. Review the resulting media (including licences/ownership), commit `public/media/` and the rewritten sources, and redeploy **before** switching DNS. Alternatively put photos on a permanent asset host and update the image URLs and `next.config.ts` remotePatterns. If stock, pricing or photos change, update `src/lib/data.ts` and redeploy: the catalogue is a snapshot, not a live WooCommerce feed.

### Commerce limitations / go-live checklist

- Checkout stores an **order request** in PostgreSQL. It does **not** take card/UPI payments, collect the COD fee, reserve stock in WooCommerce, email customers, send WhatsApp/SMS, generate invoices, or issue courier tracking links. Both payment methods start in an awaiting-confirmation state. Staff must review requests in the database and contact customers to confirm stock and arrange payment/fulfilment. Do not advertise this as an automated paid checkout until a payment gateway, webhook verification and stock/order sync have been implemented.
- `GET /api/orders` requires order number + registered mobile, and returns request status from this database. Staff must update the status manually (e.g. `confirmed`, `packed`, `dispatched`, `out_for_delivery`, `delivered`) if they want the timeline to advance. The production WooCommerce orders will not appear here.
- Review prices and stock in `src/lib/data.ts` against the live store immediately before accepting orders. The catalogue is static; image links and metadata do not imply live inventory.
- Forms write to PostgreSQL; there is no admin inbox, outbound mail, spam/rate protection, or marketing consent management. Arrange an operations workflow and legal review before public launch. Keep Preview databases separate and never use real customer data for testing.
- Set your domain in Vercel and check DNS/TLS, `/api/health`, products, media, forms, mobile checkout, and the order lookup after cutover. Old WordPress order history needs its own migration if required.

## Local development

```sh
cp .env.example .env.local # replace the example URL
npm ci
DATABASE_URL='postgresql://...' npm run db:migrate # or export DATABASE_URL
npm run dev
```

`drizzle.config.ts` uses a placeholder URL only so schema generation works without credentials; migration requires an actual `DATABASE_URL`. The application does not open a database connection during `next build`. `.env.local`, `.vercel/`, build output and dependencies are gitignored.
