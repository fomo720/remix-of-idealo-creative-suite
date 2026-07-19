import { MousePointerClick, Upload, FileCheck2, Printer, ArrowRight } from "lucide-react";

const STEPS = [
  { n: 1, Icon: MousePointerClick, title: "Elige tu producto", text: "Explora el catálogo y selecciona lo que quieres personalizar." },
  { n: 2, Icon: Upload, title: "Envía tu diseño", text: "Comparte tu arte o pídenos que lo diseñemos para ti." },
  { n: 3, Icon: FileCheck2, title: "Recibe tu maqueta", text: "Te enviamos una prueba digital en 1 a 3 días." },
  { n: 4, Icon: Printer, title: "Aprueba y produce", text: "Aprobás y producimos con calidad profesional." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-[#f8f9fa] py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--brand-magenta)" }}>
            Cómo funciona
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            De la idea al producto en <span style={{ color: "var(--brand-cyan)" }}>4 pasos</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Un proceso claro y simple, diseñado para que recibas tu producto sin complicaciones.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-4">
          {/* connector line */}
          <div aria-hidden className="pointer-events-none absolute left-[12%] right-[12%] top-[68px] hidden h-px md:block">
            <div className="h-full w-full bg-[repeating-linear-gradient(to_right,var(--brand-magenta)_0_8px,transparent_8px_16px)] opacity-40" />
          </div>

          {STEPS.map(({ n, Icon, title, text }, i) => (
            <div
              key={n}
              className="group relative rounded-3xl border border-black/5 bg-white p-6 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(233,67,126,0.25)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl"
                  style={{ background: i % 2 === 0 ? "color-mix(in oklab, var(--brand-magenta) 12%, white)" : "color-mix(in oklab, var(--brand-cyan) 15%, white)" }}
                >
                  <Icon
                    className="h-7 w-7"
                    strokeWidth={1.6}
                    style={{ color: i % 2 === 0 ? "var(--brand-magenta)" : "var(--brand-cyan)" }}
                  />
                </div>
                <span
                  className="text-4xl font-black leading-none"
                  style={{ color: "color-mix(in oklab, var(--brand-magenta) 18%, transparent)" }}
                >
                  0{n}
                </span>
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
              {i < STEPS.length - 1 && (
                <ArrowRight
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-white p-1 shadow md:block"
                  style={{ color: "var(--brand-magenta)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
