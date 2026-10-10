import { MessageCircle } from "lucide-react";

/**
 * Floating WhatsApp contact — mirrors the "Message us" widget on the
 * original site (routes to the sales line).
 */
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919136112273?text=Hi%20Dumbphones%20India%2C%20I%20have%20a%20question."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full bg-ink p-3.5 text-cream shadow-[0_10px_30px_rgba(20,28,51,0.35)] transition-all duration-300 hover:bg-success hover:pr-5"
    >
      <MessageCircle className="size-5" strokeWidth={1.8} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-32">
        Message us
      </span>
    </a>
  );
}
