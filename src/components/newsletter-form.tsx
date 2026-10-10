"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-3 border border-gold/40 bg-gold/10 px-5 py-4 text-sm text-gold">
        <Check className="size-4" /> You&apos;re on the list. Watch your inbox for the 10% code.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row md:ml-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.in"
        aria-label="Email address"
        className="h-13 flex-1 border border-cream/20 bg-transparent px-4 py-3.5 text-sm text-cream outline-none transition-colors placeholder:text-cream/35 focus:border-gold"
      />
      <button type="submit" disabled={state === "loading"} className="btn btn-gold">
        {state === "loading" ? "Joining…" : "Subscribe"} <ArrowRight className="size-3.5" />
      </button>
      {state === "error" && (
        <p className="text-xs text-gold">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
