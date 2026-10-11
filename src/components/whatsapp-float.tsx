import { MessageCircle, Phone } from "lucide-react";

/** Persistent WhatsApp link to the sales number shown on the original store. */
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919136112273?text=Hi%20Dumbphones%20India%2C%20I%20have%20a%20question."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Dumbphones India sales on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#25D366] px-4 text-white shadow-[0_12px_32px_rgba(17,135,72,0.28)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#1fbd5b] hover:shadow-[0_16px_36px_rgba(17,135,72,0.36)] active:scale-[0.98] focus-visible:outline-white"
    >
      <span className="relative grid size-7 place-items-center">
        <MessageCircle className="size-7" strokeWidth={2.1} />
        <Phone className="absolute left-[0.52rem] top-[0.52rem] size-3 fill-current" strokeWidth={2.6} />
      </span>
      <span className="hidden font-sans text-sm font-semibold sm:inline">WhatsApp sales</span>
    </a>
  );
}
