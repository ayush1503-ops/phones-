# Deploying to Vercel

The whole site (storefront pages **and** the `/api/*` handlers) is a single
Next.js app, so it deploys as **one Vercel project with one build**. There is no
second service to host, no proxy and no localhost URL to configure.

---

## 1. Import the project

1. Go to <https://vercel.com/new> and select this GitHub repository.
2. Framework Preset: **Next.js** (already pinned in `vercel.json`, so it should
   be selected for you — just confirm it).
3. Root Directory: leave as-is (`./`).
4. Build Command / Output Directory / Install Command: **leave the defaults**.
   `vercel.json` sets the build command to `npm run build`, which runs
   `next build`.

> ⚠️ Do not switch the Framework Preset to **Vite**. The repository also contains
> an optional Vite playground for local UI work, and that build is a static
> single-page app that cannot serve the `/api/*` routes — order, contact,
> newsletter and return forms would fail with 404 errors.

## 2. Add environment variables

Project → **Settings → Environment Variables**. Add them for **Production,
Preview and Development**.

| Variable | Required | What it does |
| --- | --- | --- |
| `DATABASE_URL` | For forms/orders | PostgreSQL connection string. Without it the site renders perfectly but forms cannot save anything. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Public canonical URL (e.g. `https://dumbphones.co.in`) used for metadata. Vercel's deployment URL is used automatically when omitted. |

See `.env.example` for the exact shape of the values.

## 3. Add a PostgreSQL database (for orders and forms)

Any Postgres works — [Neon](https://neon.tech), [Supabase](https://supabase.com)
or Vercel's own Postgres integration all have free tiers.

1. Create the database and copy its connection string.
2. Make sure SSL is enabled (for Neon/Supabase the string ends with
   `?sslmode=require`) and that it is the **pooled/serverless** connection string
   where the provider offers one — serverless functions open short-lived
   connections.
3. Paste it as `DATABASE_URL` in Vercel (step 2) and also into a local
   `.env.local` file.
4. Create the tables (run once, from your machine, against that database):

   ```sh
   cp .env.example .env.local   # paste the same DATABASE_URL, save
   npm ci
   npm run db:migrate
   ```

   This creates `orders`, `contact_messages`, `return_requests` and
   `subscribers`. Re-run it whenever `drizzle/` gains a new migration.

## 4. Deploy and verify

1. Deploy (Vercel builds automatically on every push to the connected branch).
   The build needs **no** database, so it succeeds even before step 3 is done.
2. Check the deployment:
   - `/` — homepage renders with product photos.
   - `/shop`, a product page, `/cart`, `/checkout`, `/contact`, `/track-order`.
   - `/api/health` — returns `{"ok":true}` once the database is connected and
     migrated. If it does not, the response names the exact fix.
3. Test a full flow on the deployment: submit the contact form, place a test
   order, and look up that order number in `/track-order`. Use test data only.

## 5. Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Build fails with `No Output Directory named "dist"` | The project's Framework Preset was changed to Vite. Set it back to **Next.js** (Project → Settings → Build & Deployment) and redeploy. |
| `/api/health` returns 503 `database_not_configured` | `DATABASE_URL` is missing from the Vercel environment variables, or was added after the last deploy. Add it and **redeploy** (env changes need a new build). |
| `/api/health` returns 503 `database_unavailable` | The URL is wrong, the database is unreachable from Vercel, or migrations were never applied. Confirm `?sslmode=require`, then run `npm run db:migrate` against that database. |
| Forms show "We couldn't … right now" | Same as above: the write could not be stored. The message intentionally points customers to email/WhatsApp so nothing is lost. |
| Product images are broken | Photos are loaded from the WordPress media library at `dumbphones.co.in`. If that host is down or the domain is moved, run `npm run assets:vendor` while it is still reachable and commit `public/media/` (see README). |
| Order lookup finds nothing | Tracking only reads orders created by this app's `/api/orders`. Historical WooCommerce orders are not in this database. |

## 6. Going live on a custom domain

1. Add the domain in Vercel → Settings → Domains and follow the DNS
   instructions.
2. Set `NEXT_PUBLIC_SITE_URL` to the final `https://…` URL and redeploy so
   metadata points at the right host.
3. Vendor the WordPress media first (see the README section *Product media*), or
   the photos break the moment the WordPress site goes away.
