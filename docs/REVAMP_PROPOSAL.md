# Dumbphones India: website revamp proposal (draft)

**Status:** working draft, not a binding quote. Prepared by an AI agent from the project brief and the current prototype in this repository. Costs and timelines are order-of-magnitude estimates for planning. They need validation by a team that will sign the work, and by your CA for GST points.

**References:** the author has not built live client stores, so none are listed. Section 10 explains how to verify references from any vendor you shortlist.

---

## 1. Summary

- **Recommended platform:** a Next.js storefront (mobile-first, static catalogue pages on a CDN) with **Medusa v2** as the commerce backend (orders, payments, shipping, inventory, admin). The repository already contains a Next.js storefront prototype, so most of the frontend work continues rather than restarts.
- **Inventory:** every phone is tracked as one unit with its IMEI, assigned to a stock location (Head Office or Branch 1). Online and counter sales draw from the same units, and a unit can be reserved only once. This is what prevents overselling and gives warranty lookup by IMEI.
- **Logistics and RTO:** Shiprocket and Delhivery integrations with webhooks, NDR handling, pincode-level data, and COD confirmation before dispatch.
- **Timeline:** about 16 weeks to launch for a team of 3–4, plus 4 weeks of hypercare.
- **Ownership:** all code in your repository, all accounts (hosting, database, couriers, WhatsApp, domain, Google) in your company name, and documented runbooks with staff training.

---

## 2. Starting point

**Business brief:** WooCommerce site on custom inventory software, IMEI-tracked stock, two stock sections (Head Office and Branch 1), Shiprocket and Delhivery shipping, and a large share of COD orders.

**What the repository already has** (`src/`, `drizzle/`):

| Area | Present | Missing |
| --- | --- | --- |
| Storefront | Home, shop, category, product, cart, checkout, order success, track order, policy pages, Next.js App Router | Live catalogue, stock per unit, price changes without a deploy |
| Orders | `POST /api/orders` with server-side price checks, Postgres `orders` table | Payment capture, stock reservation, courier booking, invoices |
| Forms | Contact, returns, newsletter, order tracking API | Customer records (CRM), support tickets, reviews |
| Catalogue | Static snapshot in `src/lib/data.ts` | Admin, IMEI, locations, two-section stock |
| Admin | None | Staff admin, roles, dashboards |

The repository is a useful front-end head start, but the commerce core (inventory, payments, shipping, invoicing, admin) must be built or adopted.

---

## 3. Platform options

| Option | What it is | Pros | Cons for this brief | Verdict |
| --- | --- | --- | --- | --- |
| A. Harden WooCommerce | Keep WooCommerce, add caching, IMEI and GST plugins, a Shiprocket plugin | Fastest and cheapest to start | Plugin sprawl; IMEI-level two-location stock is awkward in WooCommerce; peak traffic still depends on hosting and plugins; the 2–3 day change cycle comes from the same custom code | Short-term fallback only |
| B. Shopify + apps | Hosted storefront and admin, IMEI and GST apps, courier apps | Low ops burden; reliable traffic handling; fast theme work | Recurring app fees; IMEI, two-location and counter logic depend on third-party apps; less control over checkout and data | Good if build budget is very tight |
| C. Fully custom | Own storefront, backend, admin from scratch | Full control | Highest build and maintenance cost; slowest to change for a small team | Not recommended |
| **D. Next.js + Medusa v2 (recommended)** | Next.js storefront; Medusa for commerce, inventory, orders, payments, shipping and admin | Builds on the existing prototype; Medusa ships inventory across locations, reservations, orders and an admin, so custom work focuses on IMEI, RTO and GST; code is standard and owned by you | Requires a Node.js developer team; a short technical spike is needed to confirm the IMEI design | **Recommended** |

**Medusa notes:** Medusa's inventory module manages stock across locations and supports reservations for orders and manual reservations, such as offline sales ([Medusa inventory docs](https://docs.medusajs.com/resources/commerce-modules/inventory); [reservations guide](https://docs.medusajs.com/user-guide/inventory/reservations)). A community write-up reports that, in one version, a cart line reserves from a single location and does not split across locations ([write-up](https://mith.tech/blog/medusa-multi-location-inventory-reservation)). With one IMEI per unit, each reservation is a single unit, so that limitation should not apply. The spike in Phase 0 must confirm this with real data.

---

## 4. How each of the nine problems is addressed

| # | Problem | Approach | Phase |
| --- | --- | --- | --- |
| 1 | Traffic and peaks | Static or cached catalogue and product pages on a CDN; stock read live only at cart and checkout; database connection pooling; background queues for WhatsApp, invoices and courier calls; load test at 5–10× current peak before launch | 1, 4 |
| 2 | Low conversion | Guest checkout with phone number; pincode auto-fills city and state; one-screen checkout; COD fee and total shown before payment; prepaid price shown on product page and cart; "Help me order" WhatsApp button; large text and tap targets; testing with real senior and first-time buyers | 1 |
| 3 | Slow changes | Prices, stock messages, banners, shipping rules, COD fee and pincode rules are edited in the admin; no deploy needed; staff roles; small code changes go through a ticket process with a response time | 1–3 |
| 4 | Inventory | Unit-level IMEI records with states (in stock, reserved, sold, returned, under repair); two stock locations; reservation at checkout with a timeout; counter POS scans IMEI from the same pool; warranty lookup by IMEI; stock reconciliation against physical counts | 2 |
| 5 | High RTO | Pincode and courier RTO data from Shiprocket and Delhivery; WhatsApp COD confirmation before dispatch; address check; prepaid incentive; risk rules that flag, not block (human review); courier routing by pincode; NDR desk with courier updates; RTO dashboard by customer, pincode and courier | 3 |
| 6 | Customer tracking | Customer record built from orders, keyed by normalised phone and email; order history, repeat count, RTO count, notes; flags for repeat and RTO-prone customers, reviewed by staff; consent recorded | 3 |
| 7 | Invoicing and GST | Invoice numbering series; each invoice line shows the IMEI, HSN code and GST breakdown; CGST/SGST or IGST by place of supply; credit notes for returns; PDF sent by email and WhatsApp; e-invoice (IRN) through a GST Suvidha Provider if B2B or the threshold applies | 2 |
| 8 | Reviews and stock messages | Reviews import from WooCommerce (keeping dates and ratings), with moderation; verified-purchase badge for new reviews; "Only N left" messages from real unit counts; "Notify me" for back in stock | 3 |
| 9 | SEO risk | Crawl the live site; map every old URL to a new URL with 301 redirects; keep slugs where possible; keep titles, descriptions and headings; sitemap and canonical tags; product schema; move product images before domain switch (the README already flags this); monitor rankings for 90 days | 0, 4 |

**SEO note from the repository:** the storefront uses `/category/[slug]`, while WooCommerce usually uses `/product-category/`. Confirm against the live permalink settings; either way, redirects are needed.

---

## 5. Architecture and integrations

```
Customer (mobile web) ──► Next.js storefront (CDN, static pages)
                              │ REST / server actions
                              ▼
                    Medusa v2 backend (Node.js)
     ┌───────────┬────────────┼──────────────┬─────────────────┐
     ▼           ▼            ▼              ▼                 ▼
 Inventory   Payments     Fulfilment     Invoices/GST     Customers & RTO
 (IMEI units, (gateway:   (Shiprocket,   (invoice series,  (CRM, risk flags,
 2 locations, e.g. Razorpay  Delhivery    IRN via GSP)     dashboards)
 reservations) / Cashfree*)  webhooks)
     │                                         │
     ▼                                         ▼
 Admin (staff, POS for counter sales)   WhatsApp messages (COD confirm,
                                        tracking, NDR)
     │
     ▼
 Bridge to existing inventory software (phase 1 sync; replace later if needed)
```

*Payment gateway choice to be confirmed by you.

**Key inventory rules**

- Each phone is a unit row with its IMEI, model, colour, storage, location and state.
- Reserve at checkout inside one database transaction with a row lock, so two buyers cannot get the same unit.
- Prepaid reservations expire after a set time (for example 15 minutes) if payment is not completed. COD reservations are held until confirmation, then released if the order is cancelled.
- Counter sales reserve immediately by IMEI scan.
- Returns put the unit back into stock only after a staff inspection.
- Online orders draw from Head Office first; counter sales can draw from either location. This rule is configurable in the admin. Confirm the Branch 1 policy (see section 11).
- Weekly reconciliation: physical count and IMEI scan against the system.

**Courier integrations**

- **Shiprocket:** orders and AWB creation, tracking webhooks (POST to your URL on each tracking event), NDR list and actions (reattempt, address update) ([Shiprocket API docs](https://apidocs.shiprocket.in/); [NDR endpoints reference](https://github.com/seshac/laravel-shiprocket-api/blob/master/README.md)). Shiprocket also offers an RTO prediction API and an address verification API, which can be evaluated.
- **Delhivery:** pincode serviceability with separate flags for prepaid, COD and reverse pickup; shipment creation; tracking; NDR updates ([Delhivery developer portal](https://help.delhivery.com/docs/client-developer-portal-1); [pincode and tracking fields](https://www.taxilla.com/static/taxilla/connectors/delhivery.jsp)).
- Serviceability is checked at product page and checkout, so buyers are not shown an unserviceable COD option.

**GST points to confirm with your CA**

- E-invoicing (IRN) applies to B2B supplies for businesses whose aggregate turnover crossed ₹5 crore in any financial year since 2017-18; the threshold has been ₹5 crore since August 2023 ([xFlowPay](https://www.xflowpay.com/blog/e-invoice-limit); [Palians](https://palians.com/gst-invoice/blog/post.php?slug=e-invoicing-threshold-gst-india-2026)). Current B2C invoices do not need an IRN under these rules, but counter sales to businesses may.
- HSN code and GST rate for each product, and treatment of accessories.
- Invoice content requirements and retention.

**Data protection:** collect only what the order needs; record marketing consent separately; provide access and deletion handling under the Digital Personal Data Protection Act, 2023. Have counsel review the privacy policy.

---

## 6. Timeline

| Phase | Weeks | Scope | Exit criteria |
| --- | --- | --- | --- |
| 0. Discovery and spike | 1–2 | Data audit (catalogue, IMEI list, customers, orders, RTO by pincode and courier); analytics baseline; crawl and URL map; IMEI and reservation spike on Medusa; choose courier and payment setup; decide on existing inventory software | Signed scope; URL map; data import plan |
| 1. Storefront and commerce core | 3–5 | Catalogue and product pages; cart; one-screen checkout with COD and prepaid; pincode check; payments; admin for products, prices, orders, policies; staff roles | Test orders end to end; usability test with 6–8 buyers |
| 2. Inventory, counter and invoices | 3–4 | IMEI units; two locations; reservations; counter POS; warranty lookup; invoices with IMEI and GST; bridge to existing inventory software | Stock reconciled to physical count; invoices reviewed by CA |
| 3. Shipping, RTO and customers | 3–4 | Shiprocket and Delhivery; tracking webhooks; NDR desk; WhatsApp COD confirmation; RTO dashboard; customer records and flags; reviews import; back-in-stock | Test shipments and RTO reports; WhatsApp templates approved |
| 4. Launch | 2 | Load test; SEO redirects; image migration; staged cutover; DNS switch; monitoring | Load test passed; redirects verified; rankings monitored |
| Hypercare | 4 | Daily fixes; weekly review of conversion, RTO and stock accuracy | Handover complete |

**Total: about 16 weeks to launch, plus 4 weeks of hypercare.** Timelines depend on how fast your team can provide data, WhatsApp template approval, courier account setup, and decisions in section 11.

---

## 7. Cost (estimate)

**Assumptions:** a team of 3–4 (senior full-stack lead, one full-stack developer, part-time designer, part-time QA); blended rates in the Indian market; scope as in section 6.

| Item | Estimate (INR) | Notes |
| --- | --- | --- |
| Build, Phases 0–4 | ₹25–40 lakh | Largest driver is inventory and RTO scope |
| Design (if not in-house) | ₹2–4 lakh | Based on the existing visual style |
| Hosting and tools per month | ₹25,000–60,000 | Frontend hosting, managed Postgres, Redis, CDN, error monitoring, backups |
| Usage fees per month | Varies | WhatsApp messages (per-message, from your provider), GST e-invoicing service, SMS and email; payment and courier fees are separate |
| Support retainer (optional) | ₹1–2.5 lakh per month | Covers a few developer days per week and on-call for issues |

**Option B (Shopify + apps)** would have a lower build cost, but ongoing app subscriptions and less control over inventory and RTO logic. The right choice depends on the scope you need and your budget. Please get two or three quotes against this scope.

---

## 8. Scope

**Included:** Phases 0–4 as above; code in your repository; admin and staff training; runbooks; hypercare; URL redirects; data import; load test.

**Not included unless agreed:** new hardware (barcode scanners, label printers), marketplace listings (Amazon, Flipkart), native mobile apps, Hindi and regional-language content beyond the first release, ad campaigns, and content writing.

---

## 9. Support, training and handover

- **Admin training:** three recorded sessions (catalogue and pricing; orders, NDR and RTO; counter POS and IMEI). Written runbooks for each daily task.
- **Change process:** price, copy, banners, shipping rules, COD fee and pincode rules are changed in the admin by staff. Small code changes go through a ticket with an agreed response time. New modules are estimated before work starts.
- **No single-person dependency:** all accounts in the company's name; at least two people with admin access; a second developer shadows the lead from Phase 1; the architecture is written down and kept current.
- **Operations:** daily database backups, uptime monitoring, error tracking, and a monthly review of conversion, RTO and stock accuracy.

---

## 10. Checking references

I have not built live Indian ecommerce stores, so I cannot provide the two or three references you asked for. When you shortlist any vendor, ask for:

- two or three live Indian stores with IMEI tracking, two stock locations, or COD;
- a test order placed on each store, checked for invoice content, IMEI on the invoice, tracking updates and the cancellation flow;
- a reference call with a client who has been live for at least six months.

---

## 11. Decisions needed from you

1. **Existing inventory software:** keep it as the source of stock for the first release (sync through an API or database bridge), or replace it? Replacing it removes the 2–3 day change cycle, but adds work.
2. **Branch 1:** should Branch 1 stock be sold online, or only at the counter? Current assumption: online draws from Head Office only.
3. **Volumes:** number of active SKUs and units, orders per day, peak days, COD share, and current RTO rate by pincode or courier.
4. **Payment gateway:** Razorpay, Cashfree, or another provider, and whether you already have a merchant account.
5. **Courier accounts:** do you have Shiprocket and Delhivery accounts with API access? Who manages the contracts?
6. **WhatsApp:** do you have a WhatsApp Business account and a provider? Templates need approval before use.
7. **Budget and timing:** target launch date and budget range, so the scope can be set against them.
8. **Team:** who on your side owns products, prices and day-to-day decisions?
9. **Reviews:** confirm you can import the existing WooCommerce reviews for display.
10. **GST:** confirm with your CA the HSN codes, GST rates per product, and whether e-invoicing (IRN) applies to you now.

---

## 12. Sources

- [xFlowPay: e-invoice limit in India](https://www.xflowpay.com/blog/e-invoice-limit)
- [Palians: e-invoicing threshold, GST India 2026](https://palians.com/gst-invoice/blog/post.php?slug=e-invoicing-threshold-gst-india-2026)
- [Shiprocket API documentation](https://apidocs.shiprocket.in/)
- [Shiprocket NDR endpoints (community SDK)](https://github.com/seshac/laravel-shiprocket-api/blob/master/README.md)
- [Delhivery developer portal](https://help.delhivery.com/docs/client-developer-portal-1)
- [Delhivery integration fields (Taxilla connector)](https://www.taxilla.com/static/taxilla/connectors/delhivery.jsp)
- [Shipmozo: how to reduce RTO in eCommerce (2026)](https://www.shipmozo.com/blog/how-to-reduce-rto-in-ecommerce)
- [Marqet: how to reduce RTO on COD orders](https://marqet.in/resources/reduce-rto-cod-orders)
- [Medusa docs: inventory module](https://docs.medusajs.com/resources/commerce-modules/inventory)
- [Medusa docs: managing reservations](https://docs.medusajs.com/user-guide/inventory/reservations)
- [Medusa v2 multi-location reservation write-up](https://mith.tech/blog/medusa-multi-location-inventory-reservation)
