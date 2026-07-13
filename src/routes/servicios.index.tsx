import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/catalog";
import { colorVar, colorSoftBg } from "@/lib/category-colors";

export const Route = createFileRoute("/servicios/")({
  head: () => ({
    meta: [
      { title: "Servicios y catálogo completo — Idealo Honduras" },
      {
        name: "description",
        content:
          "Impresión, stickers, banners, grabado láser, sublimación, textiles, eventos y branding corporativo. Todo personalizable con Idealo en La Ceiba.",
      },
      { property: "og:title", content: "Servicios Idealo — Catálogo completo" },
      { property: "og:description", content: "Más de 60 productos personalizables para tu marca o evento." },
      { property: "og:url", content: "/servicios" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: ServiciosIndex,
});

function ServiciosIndex() {
  return (
    <>
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Catálogo completo
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Todo lo que Idealo <span className="text-gradient-rainbow">hace realidad</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {categories.length} categorías · {categories.reduce((n, c) => n + c.products.length, 0)}{" "}
            productos totalmente personalizables. Elegí una categoría para ver todo lo que podemos crear para vos.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/servicios/$categoria"
                params={{ categoria: c.slug }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border-2 p-7 transition hover:-translate-y-1"
                style={{
                  borderColor: colorVar[c.color],
                  background: colorSoftBg[c.color],
                  boxShadow: `0 14px 30px -18px ${colorVar[c.color]}`,
                }}
              >
                <div className="text-4xl">{c.emoji}</div>
                <h2 className="mt-4 text-2xl font-bold text-foreground">{c.name}</h2>
                <p className="mt-2 flex-1 text-sm text-foreground/75">{c.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.products.slice(0, 4).map((p) => (
                    <li
                      key={p.slug}
                      className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium text-foreground/80"
                    >
                      {p.name}
                    </li>
                  ))}
                  {c.products.length > 4 && (
                    <li className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium text-foreground/60">
                      +{c.products.length - 4} más
                    </li>
                  )}
                </ul>
                <div
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: colorVar[c.color] }}
                >
                  Ver categoría <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
