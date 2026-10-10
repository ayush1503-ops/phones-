"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

const REQUEST_TYPES = ["Refund", "Return", "Replacement", "Exchange"];

export function ReturnsForm() {
  const [form, setForm] = useState({
    requestType: REQUEST_TYPES[0],
    orderNumber: "",
    productName: "",
    name: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not submit your request.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="grid place-items-center border border-success/30 bg-success/5 px-6 py-14 text-center">
        <CheckCircle2 className="size-9 text-success" strokeWidth={1.5} />
        <p className="mt-4 font-display text-2xl text-ink">Request logged.</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-mute">
          Your {form.requestType.toLowerCase()} request for order {form.orderNumber} is with our
          support team. A representative will reach out on your registered email and mobile number.
          Keep your delivery photo and unboxing video ready — both are mandatory for verification.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="rr-type">Request type</label>
          <select id="rr-type" className="field" value={form.requestType} onChange={set("requestType")}>
            {REQUEST_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="rr-order">Order number</label>
          <input id="rr-order" className="field font-mono" required value={form.orderNumber} onChange={set("orderNumber")} placeholder="DP-XXXXXX" />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="rr-product">Product name</label>
        <input id="rr-product" className="field" required value={form.productName} onChange={set("productName")} placeholder="e.g. Duoqin F25 Pro — Black" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="rr-name">Full name</label>
          <input id="rr-name" className="field" required value={form.name} onChange={set("name")} placeholder="As on the order" />
        </div>
        <div>
          <label className="field-label" htmlFor="rr-phone">Mobile number</label>
          <input id="rr-phone" className="field" required inputMode="numeric" value={form.phone} onChange={set("phone")} placeholder="10-digit number" />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="rr-email">Email address</label>
        <input id="rr-email" type="email" className="field" required value={form.email} onChange={set("email")} placeholder="you@email.in" />
      </div>
      <div>
        <label className="field-label" htmlFor="rr-reason">Reason &amp; description of the issue</label>
        <textarea
          id="rr-reason"
          className="field min-h-32 resize-y"
          required
          value={form.reason}
          onChange={set("reason")}
          placeholder="Describe the defect or issue. Attachments can be shared when our team replies — keep your sealed-box photo and unboxing video ready."
        />
      </div>
      {error && <p className="border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger">{error}</p>}
      <button type="submit" disabled={state === "loading"} className="btn btn-primary">
        {state === "loading" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            Submit request <ArrowRight className="size-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
