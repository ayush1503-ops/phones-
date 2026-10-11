# Dumbphones India storefront — Vite frontend

The storefront UI now runs on **Vite, React, and React Router**. The existing Next.js App Router is kept as a separate API service for orders, tracking, contact, newsletter and returns; Vite proxies browser requests under `/api` to that service. This keeps checkout/contact handlers intact while making the storefront itself a Vite app.

## Local development

```sh
cp .env.example .env.local # replace the example URL
npm ci
npm run dev
```

`npm run dev` starts the Vite storefront at `http://localhost:3000` and the Next API service at `http://localhost:3001`. The browser calls relative `/api/...` URLs; Vite forwards them to the API server. The frontend can load without a database, but form submissions, order requests and tracking require PostgreSQL.

## Database and API

1. Create a PostgreSQL database and set `DATABASE_URL` in `.env.local`. Never commit credentials. Use separate databases for development, preview and production.
2. Run `npm run db:migrate` against the intended database before testing forms or accepting orders. Migrations are not run automatically during builds.
3. `GET /api/health` returns 200 only when the database and `orders` table are available. Test the contact, subscription and order flows against a non-production database first.

The API server can be run on its own with `npm run dev:api`; `npm run build:api` and `npm run start:api` are the production build/start pair. The Vite app uses `npm run build` and `npm run start` (`vite preview`). For deployment, serve the Vite `dist/` output as the frontend and deploy the Next API service separately; rewrite frontend routes to `index.html` and configure the hosting/reverse proxy to forward `/api/*` to the API service. Vite’s development and preview proxies target port 3001.

## Build and checks

```sh
npm run lint
npm run typecheck
npm run build       # Vite frontend → dist/
npm run build:api   # Next API service, when preparing a backend deployment
```

The Next API project also contains the former App Router page modules. Vite renders those React page components through a small React Router shell and compatibility adapters for `next/link`, `next/image` and `next/navigation`. The page content is shared; the Vite app is the browser-facing storefront.

## Product media — required before a domain cutover

Product photos, the original Dumbphones India logo and creator-video posters currently reference the WordPress media library at `https://dumbphones.co.in/wp-content/uploads/`. **A preview can load those URLs, but moving the domain away from WordPress without importing the media will break them.** YouTube and Instagram embeds also depend on those services being reachable in the visitor’s browser.

While the WordPress site is still accessible, run `npm run assets:vendor` on a machine with network access to it. The script downloads referenced WordPress images into `public/media/` and rewrites the sources to local URLs. Review the media, commit the resulting files and sources, then redeploy before switching DNS. If prices, stock or images change, update `src/lib/data.ts` and the referenced homepage assets; this is a catalogue snapshot, not a live WooCommerce feed.

## Commerce limitations / go-live checklist

- Checkout stores an **order request** in PostgreSQL. It does **not** take card/UPI payments, collect the COD fee, reserve stock in WooCommerce, email customers, send WhatsApp/SMS, generate invoices or issue courier tracking links. Staff must confirm stock and arrange payment/fulfilment manually.
- `GET /api/orders` requires an order number and registered mobile number. The production WooCommerce orders do not appear in this database.
- Review prices and stock in `src/lib/data.ts` against the live store before accepting orders. Image links and metadata do not imply live inventory.
- Forms write to PostgreSQL; there is no admin inbox, outbound mail, spam/rate protection or marketing consent management. Arrange an operations workflow and legal review before public launch. Keep preview databases separate and never use real customer data for testing.
- For production, check the frontend, `/api/health`, products, media, forms, mobile checkout and order lookup. Old WordPress order history needs its own migration if required.

## UI components

Shared UI primitives live in `src/components/ui/`, with design tokens in `src/app/globals.css`. `components.json` maps shadcn/ui to the `@/components/ui` and `@/lib/utils` aliases. The storefront is styled with Tailwind CSS 4 and uses Framer Motion for the scroll-driven hero, page reveals and small interaction feedback.
