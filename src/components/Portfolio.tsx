import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { projects, type ProjectType } from "@/lib/portfolio-data";

const FILTERS: Array<"Todos" | ProjectType> = ["Todos", "Stickers", "Banderines", "Iron-ons", "PVC", "Impresos", "Rotulación", "Regalos", "Servicios"];

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");
  const [sort, setSort] = useState<"recientes" | "antiguos">("recientes");

  const visible = useMemo(() => {
    const filtered = filter === "Todos" ? projects : projects.filter((p) => p.type === filter);
    return sort === "recientes" ? [...filtered].reverse() : filtered;
  }, [filter, sort]);

  return (
    <section id="portafolio" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--brand-magenta)" }}>Portafolio</div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Nuestros productos <span style={{ color: "var(--brand-cyan)" }}>destacados</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Desde emprendimientos locales hasta cadenas: producción impecable, plazos cumplidos.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f;
              const count = f === "Todos" ? projects.length : projects.filter((p) => p.type === f).length;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="rounded-full border px-4 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5"
                  style={
                    active
                      ? { background: "var(--brand-magenta)", borderColor: "var(--brand-magenta)", color: "white", boxShadow: "0 8px 20px -8px rgba(233,67,126,0.5)" }
                      : { background: "white", borderColor: "rgba(0,0,0,0.1)", color: "var(--foreground)" }
                  }
                >
                  {f} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Ordenar:</span>
            <div className="flex rounded-full border border-border p-0.5">
              {(["recientes", "antiguos"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`rounded-full px-3 py-1 font-semibold capitalize transition ${
                    sort === s ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s === "recientes" ? "Más recientes" : "Más antiguos"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Aún no hay proyectos en esta categoría.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <Link
                key={p.slug}
                to="/portafolio/$slug"
                params={{ slug: p.slug }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <div
                  className="relative aspect-[4/5] w-full overflow-hidden"
                  style={{ background: p.image ? p.bg : p.gradient }}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute left-3 top-3">
                    <div className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur shadow-sm">
                      #{String(i + 1).padStart(2, "0")} · {p.tag}
                    </div>
                  </div>
                  <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold text-background shadow-sm">
                      Ver detalle →
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
