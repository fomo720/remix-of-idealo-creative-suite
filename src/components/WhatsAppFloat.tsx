import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/50432316100"
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="group fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition hover:scale-105"
      style={{ background: "#25D366" }}
    >
      <span className="absolute inset-0 -z-10 rounded-full opacity-70 blur-md" style={{ background: "#25D366" }} />
      <MessageCircle className="h-6 w-6" />
      <span className="hidden text-sm sm:inline">Chatea con nosotros</span>
    </a>
  );
}
