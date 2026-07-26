import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Plus, Check } from "lucide-react";
import { projects, type ProjectType } from "@/lib/portfolio-data";
import { SkeletonImage } from "@/components/SkeletonImage";
import { useQuote } from "@/context/QuoteContext";


type Filter = "Todos" | ProjectType;
const FILTERS: Filter[] = [
  "Todos",
  "Stickers",
  "Banderines",
  "Iron-ons",
  "PVC",
  "Impresos",
  "Libretas",
  "Rotulación",
  "Regalos",
  "Servicios",
];

function matchFilter(raw: string | undefined | null): Filter {
  const val = (raw ?? "").toLowerCase();
  const found = FILTERS.find((f) => f.toLowerCase() === val);
  return (found as Filter) ?? "Todos";
}

export function Portfolio() {
  const location = useLocation();
  const searchTipo = (location.search as { tipo?: string } | undefined)?.tipo;

  const [filter, setFilter] = useState<Filter>(() => matchFilter(searchTipo));
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const { addItem, hasItem } = useQuote();

  useEffect(() => {
    setFilter(matchFilter(searchTipo));
  }, [searchTipo]);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(null), 1500);
    return () => clearTimeout(t);
  }, [justAdded]);

  const visible = useMemo(
    () => (filter === "Todos" ? projects : projects.filter((p) => p.type === filter)),
    [filter],
  );


  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      Todos: projects.length,
      Stickers: 0,
      Banderines: 0,
      "Iron-ons": 0,
      PVC: 0,
      Impresos: 0,
      Libretas: 0,
      Rotulación: 0,
      Regalos: 0,
      Servicios: 0,
    };
    projects.forEach((p) => {
      c[p.type]++;
    });
    return c;
  }, []);

  const handleAdd = (e: React.MouseEvent, p: (typeof projects)[number]) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ slug: p.slug, title: p.title, image: p.image });
    setJustAdded(p.slug);
  };

  return (
    <section id="portafolio" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--brand-magenta)" }}>
            Portafolio
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Proyectos que hemos <span style={{ color: "var(--brand-cyan)" }}>producido</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Trabajos reales para marcas, restaurantes y eventos en Honduras.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="rounded-full border px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
                style={
                  active
                    ? {
                        background: "var(--brand-magenta)",
                        borderColor: "var(--brand-magenta)",
                        color: "white",
                        boxShadow: "0 10px 24px -10px rgba(233,67,126,0.55)",
                      }
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => {
              const added = hasItem(p.slug);
              const showJustAdded = justAdded === p.slug;
              return (
                <div
                  key={p.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.15)]"
                >
                  <Link
                    to="/portafolio/$slug"
                    params={{ slug: p.slug }}
                    className="flex flex-1 flex-col"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f5f5f5]">
                      {p.image ? (
                        <SkeletonImage
                          src={p.image}
                          alt={p.title}
                          aspect="aspect-[4/5]"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div aria-hidden className="absolute inset-0 skeleton-shimmer" />
                      )}
                      {p.watermark ? (
                        <div className="absolute left-3 top-3 z-20 rounded-lg bg-white/85 px-2 py-1 shadow-md backdrop-blur-sm">
                          <img src={p.watermark} alt="Idealo" className="h-5 w-auto sm:h-6" />
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <div className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--brand-magenta)" }}>
                        {p.tag}
                      </div>
                      <h3 className="text-base font-bold leading-tight line-clamp-1">{p.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{p.subtitle}</p>
                    </div>
                  </Link>

                  <div className="px-6 pb-6">
                    <button
                      type="button"
                      onClick={(e) => handleAdd(e, p)}
                      disabled={added}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                      style={
                        added || showJustAdded
                          ? {
                              background: "#22c55e",
                              borderColor: "#22c55e",
                              color: "white",
                            }
                          : {
                              background: "white",
                              borderColor: "rgba(0,0,0,0.1)",
                              color: "var(--foreground)",
                            }
                      }
                    >
                      {showJustAdded ? (
                        <>
                          <Check className="h-4 w-4" /> ¡Agregado!
                        </>
                      ) : added ? (
                        <>
                          <Check className="h-4 w-4" /> Agregado
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" /> Agregar a cotización
                        </>
                      )}
                    </button>
                  </div>
                </div>
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
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.39C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.39-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z" />
            </svg>
            Ver más proyectos en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
