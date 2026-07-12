import { Factory, Gem, Utensils } from "lucide-react";

const items = [
  {
    icon: Factory,
    title: "Calidad de impresión pesada e industrial",
    desc: "Equipos de gran formato para tiradas altas sin comprometer nitidez ni color.",
    accent: "var(--brand-red)",
  },
  {
    icon: Gem,
    title: "Materiales premium y duraderos",
    desc: "Vinilos importados, laminados y acabados de nivel corporativo internacional.",
    accent: "var(--brand-violet)",
  },
  {
    icon: Utensils,
    title: "Atención a restaurantes y comercio",
    desc: "Menús, empaques, señalética y merch. Acompañamiento de arte incluido.",
    accent: "var(--brand-blue)",
  },
];

export function TrustSection() {
  return (
    <section id="empresas" className="border-y border-border bg-card/50 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 max-w-2xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Por qué Idealo</div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Profesional, <span className="text-gradient-rainbow">pesado</span> y a la medida de tu marca.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-30"
                style={{ background: it.accent }}
              />
              <div className="relative">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-elegant" style={{ background: it.accent }}>
                  <it.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold leading-tight">{it.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
