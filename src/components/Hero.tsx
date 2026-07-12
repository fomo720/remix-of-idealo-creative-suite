import { ArrowRight, Sparkles, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-rainbow opacity-20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:22px_22px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
        <div className="animate-fade-up mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--brand-violet)" }} />
            Imprenta profesional · Honduras
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Producción gráfica{" "}
            <span className="text-gradient-rainbow animate-rainbow-shimmer">profesional</span>{" "}
            para marcas imparables
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Stickers, banners sublimados y soluciones a gran escala para restaurantes y empresas en Honduras.
            Diseña tu producto ideal en <strong className="text-foreground">3 pasos</strong>.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#personalizar"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-cta animate-rainbow-shimmer px-7 py-3.5 text-base font-semibold text-white shadow-elegant transition hover:scale-105"
            >
              Comenzar a Crear <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#portafolio"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold transition hover:border-foreground/30"
            >
              Ver Portafolio
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 60 30"
                aria-label="Bandera de Honduras"
                className="h-4 w-8 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-border"
              >
                <rect x="0" y="0" width="60" height="10" fill="#0073CF" />
                <rect x="0" y="10" width="60" height="10" fill="#ffffff" />
                <rect x="0" y="20" width="60" height="10" fill="#0073CF" />
                {[
                  [24, 15],
                  [30, 12],
                  [36, 15],
                  [27, 18],
                  [33, 18],
                ].map(([cx, cy], i) => (
                  <polygon
                    key={i}
                    fill="#0073CF"
                    points={Array.from({ length: 10 })
                      .map((_, k) => {
                        const r = k % 2 === 0 ? 1.6 : 0.7;
                        const a = (Math.PI / 5) * k - Math.PI / 2;
                        return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
                      })
                      .join(" ")}
                  />
                ))}
              </svg>
              +200 marcas hondureñas
            </div>
            <div>Entrega nacional</div>
            <div>Precios en Lempiras</div>
          </div>
        </div>

        {/* Rainbow bar */}
        <div className="mt-16 h-1.5 w-full rounded-full bg-gradient-rainbow animate-rainbow-shimmer" />
      </div>
    </section>
  );
}
