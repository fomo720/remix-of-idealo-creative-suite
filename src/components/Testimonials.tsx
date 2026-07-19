import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "¡La calidad de impresión es increíble y súper rápido! Nuestros stickers quedaron perfectos y el equipo siempre atento.",
    name: "María Fernanda López",
    role: "Fundadora · Dulces Marifer",
    initials: "MF",
  },
  {
    quote: "Pedimos banners y menús PVC para todos nuestros locales. Cumplen los plazos y el color es exactamente como lo aprobamos.",
    name: "Carlos Ramírez",
    role: "Gerente · Cadena Sabor Ceibeño",
    initials: "CR",
  },
  {
    quote: "Idealo entendió la esencia de nuestra marca desde el primer mensaje. Los combos corporativos fueron un éxito con clientes.",
    name: "Ana Sofía Mejía",
    role: "Marketing · Clínica Almina",
    initials: "AS",
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  const go = (d: number) => setIdx((i) => (i + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-24" style={{ background: "#e0f2f1" }}>
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--brand-cyan-deep)" }}>
          Testimonios
        </div>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Lo que dicen <span style={{ color: "var(--brand-magenta)" }}>nuestros clientes</span>
        </h2>

        <div className="relative mt-12">
          <div className="rounded-3xl border border-white bg-white p-8 shadow-[0_20px_60px_-30px_rgba(72,201,200,0.5)] sm:p-12">
            <Quote className="mx-auto h-10 w-10" style={{ color: "var(--brand-magenta)" }} />
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" style={{ color: "var(--brand-cyan)" }} />
              ))}
            </div>
            <blockquote key={idx} className="animate-fade-up mt-6 text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
              "{t.quote}"
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div
                className="grid h-12 w-12 place-items-center rounded-full font-bold text-white"
                style={{ background: "linear-gradient(135deg, var(--brand-magenta), var(--brand-cyan))" }}
              >
                {t.initials}
              </div>
              <div className="text-left">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white transition hover:scale-110 hover:border-[var(--brand-magenta)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Testimonio ${i + 1}`}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === idx ? 28 : 8,
                    background: i === idx ? "var(--brand-magenta)" : "rgba(0,0,0,0.15)",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white transition hover:scale-110 hover:border-[var(--brand-magenta)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
