import { ArrowRight, Sparkles, MessageCircle, Star } from "lucide-react";

import stickersMarca from "@/assets/portfolio-stickers-marca.jpg.asset.json";
import tazas from "@/assets/portfolio-tazas-sublimadas.png.asset.json";
import banner from "@/assets/portfolio-banner.jpg.asset.json";
import tarjetas from "@/assets/portfolio-tarjetas.jpg.asset.json";
import { Mascot } from "@/components/Mascot";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* dot grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.09) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* soft brand glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl" style={{ background: "var(--brand-magenta)" }} />
        <div className="absolute -right-32 top-32 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl" style={{ background: "var(--brand-cyan)" }} />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:py-28 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        {/* LEFT — copy */}
        <div className="animate-fade-up text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--brand-magenta)" }} />
            Imprenta profesional · La Ceiba, Honduras
          </div>

          <h1 className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-[4.2rem]">
            Producción gráfica{" "}
            <span style={{ color: "var(--brand-magenta)" }}>profesional</span>{" "}
            para marcas <span style={{ color: "var(--brand-cyan)" }}>imparables</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Stickers, banners, papelería y regalos personalizados.
            Tu idea hecha realidad, directo desde Honduras.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#personalizar"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_-8px_rgba(233,67,126,0.6)] transition hover:scale-105"
              style={{ background: "var(--brand-magenta)" }}
            >
              Comenzar a Crear <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/50433635666"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition hover:bg-[color-mix(in_oklab,var(--brand-cyan)_10%,white)]"
              style={{ borderColor: "var(--brand-cyan)", color: "var(--brand-cyan-deep)" }}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>

        </div>

        {/* RIGHT — collage */}
        <div className="relative mx-auto h-[440px] w-full max-w-lg sm:h-[520px]">
          <div
            className="absolute left-2 top-4 h-56 w-56 rotate-[-6deg] overflow-hidden rounded-3xl border-4 border-white shadow-2xl sm:h-64 sm:w-64"
          >
            <img src={stickersMarca.url} alt="Stickers de marca" className="h-full w-full object-cover" />
          </div>
          <div
            className="absolute right-0 top-0 h-44 w-44 rotate-[8deg] overflow-hidden rounded-3xl border-4 border-white shadow-2xl sm:h-52 sm:w-52"
          >
            <img src={tazas.url} alt="Tazas sublimadas" className="h-full w-full object-cover" />
          </div>
          <div
            className="absolute bottom-2 right-6 h-48 w-56 rotate-[-4deg] overflow-hidden rounded-3xl border-4 border-white shadow-2xl sm:h-56 sm:w-64"
          >
            <img src={banner.url} alt="Banner personalizado" className="h-full w-full object-cover" />
          </div>
          <div
            className="absolute bottom-10 left-0 h-36 w-40 rotate-[6deg] overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:h-40 sm:w-48"
          >
            <img src={tarjetas.url} alt="Tarjetas de presentación" className="h-full w-full object-cover" />
          </div>
          {/* floating badges */}
          <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-2xl border border-black/5 bg-white/95 px-3 py-2 text-xs font-semibold shadow-xl backdrop-blur">
            <span style={{ color: "var(--brand-magenta)" }}>●</span> Entrega nacional
          </div>
          <div className="absolute -bottom-2 left-6 rounded-2xl border border-black/5 bg-white/95 px-3 py-2 text-xs font-semibold shadow-xl backdrop-blur">
            <span style={{ color: "var(--brand-cyan)" }}>●</span> Asesoría personalizada
          </div>
        </div>
      </div>
    </section>
  );
}

