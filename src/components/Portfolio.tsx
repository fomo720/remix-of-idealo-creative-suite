import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { projects, type Project } from "@/lib/portfolio-data";

type Category = "Todos" | "Corporativos" | "Gastronomía" | "Eventos";
const FILTERS: Category[] = ["Todos", "Corporativos", "Gastronomía", "Eventos"];

function categoryOf(p: Project): Category[] {
  const cats: Category[] = [];
  const text = `${p.title} ${p.tag} ${p.subtitle}`.toLowerCase();
  const isGastro = /(restaurante|menú|menu|café|cafe|bebida|botella|guifiti|licor|jarra|bar\b)/.test(text);
  const isEvent = /(evento|cumple|boda|xv|navidad|mamá|mama|papá|papa|patri|invitad|festej|recuerdo|baby)/.test(text) ||
    ["Regalos"].includes(p.type);
  const isCorp = ["Impresos", "Rotulación"].includes(p.type) ||
    /(corporativ|empresa|oficina|emprendedor|marca|branding|tarjeta|carpeta|calendario)/.test(text);
  if (isGastro) cats.push("Gastronomía");
  if (isEvent) cats.push("Eventos");
  if (isCorp) cats.push("Corporativos");
  if (cats.length === 0) cats.push("Corporativos");
  return cats;
}

export function Portfolio() {
  const [filter, setFilter] = useState<Category>("Todos");

  const tagged = useMemo(
    () => projects.map((p) => ({ p, cats: categoryOf(p) })),
    []
  );

  const visible = useMemo(() => {
    const list = filter === "Todos" ? tagged : tagged.filter((x) => x.cats.includes(filter));
    return [...list].reverse().map((x) => x.p);
  }, [filter, tagged]);

  const counts = useMemo(() => {
    const c: Record<Category, number> = { Todos: projects.length, Corporativos: 0, Gastronomía: 0, Eventos: 0 };
    tagged.forEach((x) => x.cats.forEach((k) => { c[k]++; }));
    return c;
  }, [tagged]);

  return (
    <section id="portafolio" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--brand-magenta)" }}>Portafolio</div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Proyectos que hemos <span style={{ color: "var(--brand-cyan)" }}>producido</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Trabajos reales para marcas, restaurantes y eventos en Honduras.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="rounded-full border px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
                style={
                  active
                    ? { background: "var(--brand-magenta)", borderColor: "var(--brand-magenta)", color: "white", boxShadow: "0 10px 24px -10px rgba(233,67,126,0.55)" }
                    : { background: "white", borderColor: "rgba(0,0,0,0.1)", color: "var(--foreground)" }
                }
              >
                {f} <span className="opacity-60">({counts[f]})</span>
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Aún no hay proyectos en esta categoría.
          </div>
        ) : (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
            {visible.map((p, i) => {
              const aspect = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]"][i % 4];
              return (
                <Link
                  key={p.slug}
                  to="/portafolio/$slug"
                  params={{ slug: p.slug }}
                  className="group relative mb-5 block break-inside-avoid overflow-hidden rounded-2xl bg-card shadow-md ring-1 ring-black/5 transition hover:shadow-2xl"
                >
                  <div className={`relative ${aspect} w-full overflow-hidden`} style={{ background: p.bg ?? "#fafafa" }}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className={`absolute inset-0 h-full w-full ${p.fit === "contain" ? "object-contain p-3" : "object-cover"} transition-transform duration-500 group-hover:scale-105`}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--brand-cyan)" }}>{p.tag}</div>
                      <h3 className="mt-1 text-base font-bold leading-tight">{p.title}</h3>
                      <p className="mt-1 text-xs text-white/85 line-clamp-2">{p.subtitle}</p>
                      <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-foreground">Ver detalle →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <a
            href="https://instagram.com/idealo.hn"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg, var(--brand-magenta), var(--brand-cyan))" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.39C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.39-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z"/></svg>
            Ver más proyectos en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
