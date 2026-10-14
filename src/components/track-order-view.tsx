"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  PackageSearch,
  LoaderCircle,
  Check,
  ClipboardList,
  PackageCheck,
  Truck,
  Navigation,
  Home,
  AlertCircle,
} from "lucide-react";
import { inr } from "@/lib/format";
import type { CartItem } from "@/lib/types";
import clsx from "clsx";

type OrderResult = {
  orderNumber: string;
  status: string;
  paymentMethod: "prepaid" | "cod";
  customerName: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
};

const STAGES = [
  { id: "placed", label: "Order placed", icon: ClipboardList },
  { id: "confirmed", label: "Payment confirmed", icon: Check },
  { id: "packed", label: "Packed & quality-checked", icon: PackageCheck },
  { id: "dispatched", label: "Dispatched — tracking on WhatsApp", icon: Truck },
  { id: "out", label: "Out for delivery", icon: Navigation },
  { id: "delivered", label: "Delivered", icon: Home },
];

function stageIndex(status: string): number {
  switch (status) {
    case "awaiting_payment":
      return 0;
    case "confirmed":
      return 2;
    case "dispatched":
      return 3;
    case "out_for_delivery":
      return 4;
    case "delivered":
      return 5;
    default:
      return 2;
  }
}

export function TrackOrderView() {
  const params = useSearchParams();
  const [order, setOrder] = useState(params.get("order") ?? "");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);

  async function lookup(e?: React.FormEvent) {
    e?.preventDefault();
    if (!order.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Enter your order number and 10-digit registered mobile number.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(
        `/api/orders?order=${encodeURIComponent(order.trim())}&phone=${encodeURIComponent(phone)}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Lookup failed.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  const current = result ? stageIndex(result.status) : -1;

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={lookup} className="grid gap-4 border border-line bg-cream p-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div>
          <label className="field-label" htmlFor="order">Order number</label>
          <input
            id="order"
            className="field font-mono"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="DP-XXXXXX"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="phone">Registered mobile</label>
          <input
            id="phone"
            className="field font-mono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit number"
            inputMode="numeric"
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? <LoaderCircle className="size-4 animate-spin" /> : <PackageSearch className="size-4" />}
          Track
        </button>
      </form>

      {error && (
        <p className="mt-4 flex items-center gap-2 border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </p>
      )}

      {result && (
        <div className="mt-8 space-y-6">
          {/* Status timeline */}
          <div className="border border-line bg-cream p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl text-ink">
                Order <span className="font-mono text-xl text-royal">{result.orderNumber}</span>
              </h2>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-mute">
                Placed{" "}
                {new Date(result.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · {result.paymentMethod === "cod" ? "Cash on Delivery" : "Prepaid"}
              </p>
            </div>
            {result.status === "awaiting_payment" && (
              <p className="mt-3 border border-gold/50 bg-gold-soft/25 px-4 py-3 text-[0.82rem] text-[#6b5817]">
                Awaiting payment — our team confirms stock and shares the secure payment link on your
                registered WhatsApp number. Your order ships once payment is received.
              </p>
            )}
            <ol className="mt-6 space-y-0">
              {STAGES.map((stage, i) => {
                const done = i < current;
                const active = i === current;
                return (
                  <li key={stage.id} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < STAGES.length - 1 && (
                      <span
                        className={clsx(
                          "absolute left-[0.95rem] top-8 h-full w-px",
                          done ? "bg-success" : "bg-line",
                        )}
                      />
                    )}
                    <span
                      className={clsx(
                        "z-10 grid size-8 shrink-0 place-items-center rounded-full border",
                        done || active
                          ? "border-success bg-success text-cream"
                          : "border-line bg-paper text-faint",
                      )}
                    >
                      <stage.icon className="size-3.5" />
                    </span>
                    <div className="pt-1">
                      <p className={clsx("text-[0.9rem]", done || active ? "font-medium text-ink" : "text-faint")}>
                        {stage.label}
                      </p>
                      {active && (
                        <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-success">
                          Current status
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Items */}
          <div className="border border-line bg-cream p-6 md:p-8">
            <h3 className="font-display text-xl text-ink">Items &amp; delivery</h3>
            <ul className="mt-4 space-y-3">
              {result.items.map((item) => (
                <li key={`${item.slug}-${item.variant}`} className="flex items-center gap-3.5 border-b border-line/70 pb-3 last:border-0 last:pb-0">
                  <span className="relative grid size-12 shrink-0 place-items-center border border-line bg-white">
                    <Image src={item.image} alt="" fill sizes="3rem" className="object-contain p-1" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.85rem] font-medium text-ink">{item.name}</span>
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-faint">
                      {item.variant} × {item.qty}
                    </span>
                  </span>
                  <span className="font-mono text-[0.8rem] text-ink">{inr(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
              <p className="text-[0.85rem] text-mute">
                Delivering to {result.city}, {result.state} — {result.pincode}
              </p>
              <p className="font-mono text-lg font-medium text-ink">{inr(result.total)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
