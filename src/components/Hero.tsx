import { MessageCircle, ArrowRight, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import hondurasFlag from "@/assets/honduras-flag.png.asset.json";
import stickersMarca from "@/assets/portfolio-stickers-marca.jpg.asset.json";
import tazas from "@/assets/portfolio-tazas-sublimadas.png.asset.json";
import banner from "@/assets/portfolio-banner.jpg.asset.json";
import tarjetas from "@/assets/portfolio-tarjetas.jpg.asset.json";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fdf2f7]">
      {/* Doodle pattern layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23e9437e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 20 q6 -8 12 0 t12 0'/%3E%3Ccircle cx='90' cy='18' r='4'/%3E%3Cpath d='M85 60 l6 6 M91 60 l-6 6'/%3E%3Cpath d='M20 90 l4 -8 4 8 -4 -3z'/%3E%3Cpath d='M60 50 l3 8 8 1 -6 6 2 8 -7 -4 -7 4 2 -8 -6 -6 8 -1z' stroke='%2348c9c8'/%3E%3Cpath d='M100 100 q-8 -8 -16 0' stroke='%2348c9c8'/%3E%3Ccircle cx='45' cy='22' r='3' stroke='%2348c9c8'/%3E%3Cpath d='M15 55 h10 M20 50 v10' stroke='%2348c9c8'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "220px 220px",
        }}
      />
      {/* soft glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl" style={{ background: "var(--brand-magenta)" }} />
        <div className="absolute -right-32 top-32 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl" style={{ background: "var(--brand-cyan)" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* LEFT — copy with sticker decorations */}
          <div className="relative animate-fade-up text-left">
            {/* floating stickers */}
            <div className="absolute -left-4 -top-6 hidden h-20 w-20 rotate-12 items-center justify-center rounded-2xl text-center text-xs font-black uppercase text-white shadow-xl ring-4 ring-white/50 sm:flex" style={{ background: "var(--brand-cyan)" }}>
              Stickers!
            </div>
            <div className="absolute -right-2 top-24 hidden h-24 w-24 -rotate-12 items-center justify-center rounded-full text-center text-xs font-black uppercase text-white shadow-xl ring-4 ring-white/50 lg:flex" style={{ background: "var(--brand-magenta)" }}>
              Calidad
            </div>

            <span
              className="mb-5 inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-sm"
              style={{ background: "var(--brand-cyan)" }}
            >
              Imprenta profesional · La Ceiba
            </span>

            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-[4.4rem]" style={{ color: "var(--brand-magenta)" }}>
              ¡Lo imaginamos,<br />lo <span style={{ color: "var(--brand-cyan-deep)" }}>imprimimos</span>!
            </h1>

            <p className="mt-6 max-w-xl text-lg font-medium text-gray-600">
              Tu aliado creativo en Honduras para stickers, banners, tazas, camisas, papelería y promocionales.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/50433635666"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-base font-black uppercase text-white transition-all active:translate-y-[2px]"
                style={{
                  background: "var(--brand-magenta)",
                  boxShadow: "0 6px 0 0 #b52a5a",
                }}
              >
                <MessageCircle className="h-5 w-5" /> Cotizar ahora
              </a>
              <a
                href="#personalizar"
                className="inline-flex items-center gap-2 rounded-2xl border-4 px-6 py-3 text-sm font-black uppercase transition hover:bg-[color-mix(in_oklab,var(--brand-cyan)_10%,white)]"
                style={{ borderColor: "var(--brand-cyan)", color: "var(--brand-cyan-deep)" }}
              >
                Comenzar a crear <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <img src={hondurasFlag.url} alt="Bandera de Honduras" className="h-5 w-auto shrink-0" />
                +200 marcas hondureñas
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" style={{ color: "var(--brand-magenta)" }} />
                ))}
                <span className="ml-1">5.0 · Reseñas reales</span>
              </div>
            </div>
          </div>

          {/* RIGHT — collage */}
          <div className="relative mx-auto h-[440px] w-full max-w-lg sm:h-[520px]">
            <div className="absolute left-2 top-4 h-56 w-56 rotate-[-6deg] overflow-hidden rounded-3xl border-4 border-white shadow-2xl sm:h-64 sm:w-64">
              <img src={stickersMarca.url} alt="Stickers de marca" className="h-full w-full object-cover" />
            </div>
            <div className="absolute right-0 top-0 h-44 w-44 rotate-[8deg] overflow-hidden rounded-3xl border-4 border-white shadow-2xl sm:h-52 sm:w-52">
              <img src={tazas.url} alt="Tazas sublimadas" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-2 right-6 h-48 w-56 rotate-[-4deg] overflow-hidden rounded-3xl border-4 border-white shadow-2xl sm:h-56 sm:w-64">
              <img src={banner.url} alt="Banner personalizado" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-10 left-0 h-36 w-40 rotate-[6deg] overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:h-40 sm:w-48">
              <img src={tarjetas.url} alt="Tarjetas de presentación" className="h-full w-full object-cover" />
            </div>
            <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-2xl border border-black/5 bg-white/95 px-3 py-2 text-xs font-semibold shadow-xl backdrop-blur">
              <span style={{ color: "var(--brand-magenta)" }}>●</span> Entrega nacional
            </div>
            <div className="absolute -bottom-2 left-6 rounded-2xl border border-black/5 bg-white/95 px-3 py-2 text-xs font-semibold shadow-xl backdrop-blur">
              <span style={{ color: "var(--brand-cyan)" }}>●</span> Asesoría personalizada
            </div>
          </div>
        </div>
      </div>

      {/* Rainbow accent stripe */}
      <div aria-hidden className="relative z-10 flex h-2 w-full">
        <div className="flex-1" style={{ background: "var(--brand-magenta)" }} />
        <div className="flex-1" style={{ background: "var(--brand-cyan)" }} />
        <div className="flex-1" style={{ background: "var(--brand-magenta)" }} />
        <div className="flex-1" style={{ background: "var(--brand-cyan)" }} />
      </div>
    </section>
  );
}
