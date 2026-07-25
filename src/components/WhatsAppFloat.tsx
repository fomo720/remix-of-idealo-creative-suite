import { MessageCircle } from "lucide-react";
import { Mascot } from "@/components/Mascot";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/50433635666?text=%C2%A1Hola%20Idealo!%20Quiero%20cotizar%20un%20proyecto%20%F0%9F%92%AB"
      target="_blank"
      rel="noreferrer"
      aria-label="Cotizar por WhatsApp con Idealo"
      className="group fixed bottom-6 right-6 z-40 flex items-end gap-2"
    >
      {/* Mascota asomándose */}
      <div className="pointer-events-none relative hidden sm:block">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-800 shadow-lg whitespace-nowrap">
          ¡Cotiza YA! <span aria-hidden>👇</span>
        </div>
        <Mascot pose="point" size={110} animation="float" className="drop-shadow-2xl" />
      </div>
      {/* Botón WhatsApp */}
      <span
        className="relative inline-flex items-center gap-2 rounded-full px-4 py-3 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition group-hover:scale-105"
        style={{ background: "#25D366" }}
      >
        <span className="absolute inset-0 -z-10 rounded-full opacity-70 blur-md" style={{ background: "#25D366" }} />
        <MessageCircle className="h-6 w-6" />
        <span className="hidden text-sm sm:inline">Chatea con nosotros</span>
      </span>
    </a>
  );
}
