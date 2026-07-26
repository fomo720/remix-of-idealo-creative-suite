import { Building2 } from "lucide-react";

const clientLogos: { name: string; imageUrl?: string }[] = Array.from({ length: 15 }, (_, i) => ({
  name: `Cliente ${i + 1}`,
}));

const stats = [
  { value: "50+", label: "clientes activos" },
  { value: "5+", label: "años de experiencia" },
  { value: "8", label: "técnicas de impresión" },
];

export function ClientsSection() {
  return (
    <section id="clientes" className="bg-background">
      {/* Banner en gradiente Idealo */}
      <div
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-magenta) 0%, var(--brand-cyan) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Empresas que confían en Idealo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
            Desde pequeños negocios hasta grandes marcas, cientos de empresas
            nos eligen para llevar su imagen al siguiente nivel.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-full border border-white/25 bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur"
              >
                <span className="font-bold">{s.value}</span>{" "}
                <span className="font-normal text-white/90">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grilla de logos */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Nuestros clientes
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Marcas que ya trabajan con nosotros
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {clientLogos.map((c) => (
            <div
              key={c.name}
              className="flex h-24 items-center justify-center rounded-xl border border-border bg-white p-4 transition hover:shadow-card-soft"
              title={c.name}
            >
              {c.imageUrl ? (
                <img
                  src={c.imageUrl}
                  alt={c.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <Building2 className="h-6 w-6" />
                  <span className="text-xs font-medium">Logo</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
