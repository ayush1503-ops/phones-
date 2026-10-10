"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Banknote,
  CreditCard,
  Info,
  LoaderCircle,
  Lock,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/lib/store";
import { inr, COD_FEE } from "@/lib/format";
import clsx from "clsx";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: "prepaid" | "cod";
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  landmark: "",
  city: "",
  state: "Maharashtra",
  pincode: "",
  paymentMethod: "prepaid",
};

export function CheckoutForm() {
  const router = useRouter();
  const cart = useCart();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const total = cart.subtotal + (form.paymentMethod === "cod" ? COD_FEE : 0);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 3) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.address.trim().length < 10) next.address = "Please enter your complete street address.";
    if (form.city.trim().length < 2) next.city = "Enter your city.";
    if (!/^\d{6}$/.test(form.pincode)) next.pincode = "Enter a 6-digit PIN code.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: form.phone.replace(/\s/g, ""),
          items: cart.items,
          subtotal: cart.subtotal,
          shippingFee: form.paymentMethod === "cod" ? COD_FEE : 0,
          total,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not place the order.");
      cart.clear();
      router.push(`/checkout/success?order=${data.orderNumber}`);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  const summaryItems = useMemo(() => cart.items, [cart.items]);

  if (!cart.hydrated) {
    return <div className="aspect-[4/1] animate-pulse border border-line bg-cream" />;
  }

  if (cart.items.length === 0) {
    return (
      <div className="grid place-items-center border border-dashed border-line-dark bg-cream px-6 py-24 text-center">
        <div>
          <ShoppingBag className="mx-auto size-8 text-faint" strokeWidth={1.4} />
          <p className="mt-5 font-display text-3xl text-ink">Your cart is empty.</p>
          <Link href="/shop" className="btn btn-primary mt-7">
            Back to the shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={placeOrder} className="grid gap-10 lg:grid-cols-[1.55fr_1fr]">
      {/* Left: details */}
      <div className="space-y-10">
        {/* Contact */}
        <section>
          <h2 className="flex items-baseline gap-3 font-display text-2xl text-ink">
            <span className="font-mono text-xs text-gold-deep">01</span> Contact details
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="name">Full name</label>
              <input id="name" className="field" value={form.name} onChange={set("name")} placeholder="Abdullah Khan" autoComplete="name" />
              {errors.name && <p className="mt-1.5 text-xs text-danger">{errors.name}</p>}
            </div>
            <div>
              <label className="field-label" htmlFor="phone">Mobile (WhatsApp active)</label>
              <input id="phone" className="field" value={form.phone} onChange={set("phone")} placeholder="91361 12273" inputMode="numeric" autoComplete="tel" />
              {errors.phone && <p className="mt-1.5 text-xs text-danger">{errors.phone}</p>}
              <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-faint">
                Tracking link is sent to this WhatsApp number
              </p>
            </div>
            <div>
              <label className="field-label" htmlFor="email">Email</label>
              <input id="email" type="email" className="field" value={form.email} onChange={set("email")} placeholder="you@email.in" autoComplete="email" />
              {errors.email && <p className="mt-1.5 text-xs text-danger">{errors.email}</p>}
            </div>
          </div>
        </section>

        {/* Address */}
        <section>
          <h2 className="flex items-baseline gap-3 font-display text-2xl text-ink">
            <span className="font-mono text-xs text-gold-deep">02</span> Delivery address
          </h2>
          <p className="mt-2 flex items-center gap-2 text-[0.78rem] text-mute">
            <Info className="size-3.5 shrink-0 text-royal" /> We currently deliver within India only.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="address">Street address</label>
              <input id="address" className="field" value={form.address} onChange={set("address")} placeholder="Flat, building, street, area" autoComplete="street-address" />
              {errors.address && <p className="mt-1.5 text-xs text-danger">{errors.address}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="landmark">Landmark (optional)</label>
              <input id="landmark" className="field" value={form.landmark} onChange={set("landmark")} placeholder="Near…" />
            </div>
            <div>
              <label className="field-label" htmlFor="city">City</label>
              <input id="city" className="field" value={form.city} onChange={set("city")} placeholder="Mumbai" autoComplete="address-level2" />
              {errors.city && <p className="mt-1.5 text-xs text-danger">{errors.city}</p>}
            </div>
            <div>
              <label className="field-label" htmlFor="state">State</label>
              <select id="state" className="field" value={form.state} onChange={set("state")}>
                {INDIAN_STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="pincode">PIN code</label>
              <input id="pincode" className="field" value={form.pincode} onChange={set("pincode")} placeholder="400004" inputMode="numeric" autoComplete="postal-code" />
              {errors.pincode && <p className="mt-1.5 text-xs text-danger">{errors.pincode}</p>}
            </div>
          </div>
        </section>

        {/* Payment */}
        <section>
          <h2 className="flex items-baseline gap-3 font-display text-2xl text-ink">
            <span className="font-mono text-xs text-gold-deep">03</span> Payment method
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, paymentMethod: "prepaid" }))}
              className={clsx(
                "border p-5 text-left transition-all",
                form.paymentMethod === "prepaid"
                  ? "border-royal bg-royal/5 shadow-[0_0_0_1px_#2b3e97]"
                  : "border-line bg-cream hover:border-ink",
              )}
            >
              <div className="flex items-center justify-between">
                <CreditCard className="size-5 text-royal" strokeWidth={1.6} />
                <span className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-success">
                  Free shipping
                </span>
              </div>
              <p className="mt-3 font-medium text-ink">Prepaid — UPI, cards, net-banking</p>
              <p className="mt-1 text-[0.78rem] leading-relaxed text-mute">
                Pay now in full. No delivery charges anywhere in India.
              </p>
            </button>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, paymentMethod: "cod" }))}
              className={clsx(
                "border p-5 text-left transition-all",
                form.paymentMethod === "cod"
                  ? "border-royal bg-royal/5 shadow-[0_0_0_1px_#2b3e97]"
                  : "border-line bg-cream hover:border-ink",
              )}
            >
              <div className="flex items-center justify-between">
                <Banknote className="size-5 text-royal" strokeWidth={1.6} />
                <span className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-gold-deep">
                  + {inr(COD_FEE)} fee
                </span>
              </div>
              <p className="mt-3 font-medium text-ink">Cash on Delivery</p>
              <p className="mt-1 text-[0.78rem] leading-relaxed text-mute">
                Pay on arrival. A {inr(COD_FEE)} confirmation &amp; handling fee is payable in advance
                and is non-refundable, per our Shipping Policy.
              </p>
            </button>
          </div>

          {form.paymentMethod === "prepaid" && (
            <p className="mt-4 border border-line bg-cream px-4 py-3 text-[0.78rem] leading-relaxed text-mute">
              After you place the order, our team confirms stock on WhatsApp and shares the secure
              payment link for your order. In the live store this step charges directly through the
              site&apos;s payment gateway.
            </p>
          )}
        </section>
      </div>

      {/* Right: summary */}
      <aside className="h-fit border border-line bg-cream p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl text-ink">Your order</h2>
        <ul className="mt-5 space-y-4 border-b border-line pb-5">
          {summaryItems.map((item) => (
            <li key={`${item.slug}-${item.variant}`} className="flex items-center gap-3.5">
              <span className="relative grid size-14 shrink-0 place-items-center border border-line bg-white">
                <Image src={item.image} alt="" fill sizes="3.5rem" className="object-contain p-1.5" />
                <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-ink font-mono text-[0.55rem] text-cream">
                  {item.qty}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.82rem] font-medium text-ink">{item.name}</span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-faint">
                  {item.variant}
                </span>
              </span>
              <span className="font-mono text-[0.8rem] text-ink">{inr(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-2.5 border-b border-line py-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-mute">Subtotal</dt>
            <dd className="font-mono text-ink">{inr(cart.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-mute">
              {form.paymentMethod === "cod" ? "COD confirmation & handling" : "Shipping (prepaid)"}
            </dt>
            <dd className={clsx("font-mono", form.paymentMethod === "cod" ? "text-ink" : "text-success")}>
              {form.paymentMethod === "cod" ? inr(COD_FEE) : "Free"}
            </dd>
          </div>
        </dl>
        <div className="flex items-baseline justify-between py-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute">Total</p>
          <p className="font-mono text-2xl font-medium text-ink">{inr(total)}</p>
        </div>

        {serverError && (
          <p className="mb-4 border border-danger/40 bg-danger/5 px-4 py-3 text-[0.8rem] text-danger">
            {serverError}
          </p>
        )}

        <button type="submit" disabled={submitting} className="btn btn-primary w-full">
          {submitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" /> Placing order…
            </>
          ) : (
            <>
              <Lock className="size-3.5" /> Place order — {inr(total)}
            </>
          )}
        </button>
        <p className="mt-4 text-center text-[0.7rem] leading-relaxed text-mute">
          By placing this order you agree to our{" "}
          <Link href="/terms-and-conditions" className="text-royal underline underline-offset-2">
            Terms
          </Link>
          ,{" "}
          <Link href="/shipping-policy" className="text-royal underline underline-offset-2">
            Shipping Policy
          </Link>{" "}
          and{" "}
          <Link href="/returns-refund-warranty-policy" className="text-royal underline underline-offset-2">
            Returns Policy
          </Link>
          .
        </p>
        <Link
          href="/cart"
          className="mt-5 flex items-center justify-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3" /> Back to cart
        </Link>
      </aside>
    </form>
  );
}
