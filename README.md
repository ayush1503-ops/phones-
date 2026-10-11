# Dumbphones India storefront

A Next.js (App Router) storefront for Dumbphones India: keypad phones and compact
Androids sold from Mumbai, with prepaid delivery, COD, and order/contact/returns
forms backed by PostgreSQL.

**Everything — pages and API — runs as a single Next.js app, so the whole site
deploys to Vercel as one project with one build.** See [DEPLOY.md](./DEPLOY.md)
for the step-by-step Vercel guide.

## Local development

```sh
cp .env.example .env.local   # then set DATABASE_URL (any Postgres)
npm ci
npm run dev                  # http://localhost:3000
```

`npm run dev` starts Next.js on port 3000, which serves both the storefront pages
and the `/api/*` route handlers. The site renders without a database; only form
submissions, order requests and order tracking need PostgreSQL.

### Optional: the Vite playground

The repository also contains a Vite + React Router build of the same storefront
(the same page components, rendered client-side) that talks to the Next API
service through a dev proxy. It is kept for local UI work and is **not** what
Vercel deploys.

```sh
npm run dev:web    # Vite storefront on :3000 + Next API service on :3001
npm run build:web  # Vite build → dist/ (static SPA; needs the API service for /api/*)
```

## Database and API

1. Create a PostgreSQL database and set `DATABASE_URL` in `.env.local` (locally)
   and in the Vercel project settings (deployed). Never commit credentials.
2. Run `npm run db:migrate` against the intended database before testing forms or
   accepting orders. Migrations are not run automatically during builds, so a
   deployment without a migrated database still builds and serves the site.
3. `GET /api/health` returns 200 only when the database and `orders` table are
   available; otherwise it returns 503 with the exact fix (missing
   `DATABASE_URL`, unreachable database, unapplied migrations).

Route handlers:

| Route | Purpose |
| --- | --- |
| `GET /api/health` | Deployment/database health check with actionable failures |
| `POST /api/orders` | Order request (server-side price verification) |
| `GET /api/orders?order=&phone=` | Order tracking by order number + mobile |
| `POST /api/contact` | Contact form |
| `POST /api/returns` | Return / refund / replacement requests |
| `POST /api/subscribe` | Newsletter subscription |

They run on the Node.js runtime and are excluded from prerendering. If the
database is not configured, they reply with a friendly 503 telling the customer
to email or WhatsApp instead of failing silently.

## Deploying to Vercel

1. Import this repository into Vercel. The framework preset is pinned to Next.js
   in `vercel.json`, so the build command is `npm run build` (`next build`).
2. Add the environment variables from `.env.example` (at minimum `DATABASE_URL`
   for a working backend; `NEXT_PUBLIC_SITE_URL` is optional).
3. Deploy. The build needs no database, so it succeeds before the database is
   wired up. Verify `https://<your-app>.vercel.app/api/health` afterwards and
   apply the fix it reports if it is not 200.

Full walkthrough: [DEPLOY.md](./DEPLOY.md).

## Build and checks

```sh
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run build      # next build → .next (what Vercel runs)
npm run build:web  # vite build → dist/ (the optional Vite playground)
```

`npm start` serves the production Next build on port 3000.

The Next project also contains the former App Router page modules; the Vite
playground renders those same React page components through a React Router shell
with compatibility adapters for `next/link`, `next/image` and `next/navigation`.
The page content is shared; Next.js is the browser-facing storefront.

## Product media — required before a domain cutover

Product photos, the original Dumbphones India logo and creator-video posters
currently reference the WordPress media library at
`https://dumbphones.co.in/wp-content/uploads/`. **The live site can load those
URLs, but moving the domain away from WordPress without importing the media will
break them.** YouTube and Instagram embeds also depend on those services being
reachable in the visitor’s browser.

While the WordPress site is still accessible, run `npm run assets:vendor` on a
machine with network access to it. The script downloads referenced WordPress
images into `public/media/` and rewrites the sources to local URLs. Review the
media, commit the resulting files and sources, then redeploy before switching
DNS. If prices, stock or images change, update `src/lib/data.ts` and the
referenced homepage assets; this is a catalogue snapshot, not a live WooCommerce
feed.

## Commerce limitations / go-live checklist

- Checkout stores an **order request** in PostgreSQL. It does **not** take
  card/UPI payments, collect the COD fee, reserve stock in WooCommerce, email
  customers, send WhatsApp/SMS, generate invoices or issue courier tracking
  links. Staff must confirm stock and arrange payment/fulfilment manually.
- `GET /api/orders` requires an order number and registered mobile number. The
  production WooCommerce orders do not appear in this database.
- Review prices and stock in `src/lib/data.ts` against the live store before
  accepting orders. Image links and metadata do not imply live inventory.
- Forms write to PostgreSQL; there is no admin inbox, outbound mail, spam/rate
  protection or marketing consent management. Arrange an operations workflow and
  legal review before public launch. Keep preview databases separate and never
  use real customer data for testing.
- For production, check the frontend, `/api/health`, products, media, forms,
  mobile checkout and order lookup. Old WordPress order history needs its own
  migration if required.

## UI components

Shared UI primitives live in `src/components/ui/`, with design tokens in
`src/app/globals.css`. `components.json` maps shadcn/ui to the `@/components/ui`
and `@/lib/utils` aliases. The storefront is styled with Tailwind CSS 4 and uses
Framer Motion for the scroll-driven hero, page reveals and small interaction
feedback.
