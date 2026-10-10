"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

const TOPICS = [
  "Sales question — before buying",
  "Order support — updates, cancellations, delivery",
  "Technical support",
  "Replacement or warranty",
  "Bulk / corporate enquiry",
  "Something else",
];

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: TOPICS[0], message: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not send your message.");
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
        <p className="mt-4 font-display text-2xl text-ink">Message received.</p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-mute">
          Thank you, {form.name.split(" ")[0]}. The right team ({form.topic.split("—")[0].trim()})
          will get back to you within one working day.
        </p>
      </div>
    );
  }

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="cf-name">Name</label>
          <input id="cf-name" className="field" required value={form.name} onChange={set("name")} placeholder="Your full name" />
        </div>
        <div>
          <label className="field-label" htmlFor="cf-phone">Mobile (optional)</label>
          <input id="cf-phone" className="field" value={form.phone} onChange={set("phone")} placeholder="10-digit number" inputMode="numeric" />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="cf-email">Email</label>
        <input id="cf-email" type="email" className="field" required value={form.email} onChange={set("email")} placeholder="you@email.in" />
      </div>
      <div>
        <label className="field-label" htmlFor="cf-topic">Topic</label>
        <select id="cf-topic" className="field" value={form.topic} onChange={set("topic")}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="field-label" htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          className="field min-h-32 resize-y"
          required
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us what you need — order number if you have one."
        />
      </div>
      {error && <p className="border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger">{error}</p>}
      <button type="submit" disabled={state === "loading"} className="btn btn-primary">
        {state === "loading" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message <ArrowRight className="size-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
