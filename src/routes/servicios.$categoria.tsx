import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { findCategory, whatsappLink } from "@/data/catalog";
import { colorVar, colorSoftBg } from "@/lib/category-colors";

export const Route = createFileRoute("/servicios/$categoria")({
  loader: ({ params }) => {
    const category = findCategory(params.categoria);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Categoría no encontrada — Idealo" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const title = `${category.name} — Idealo Honduras`;
    return {
      meta: [
        { title },
        { name: "description", content: category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: category.description },
        { property: "og:url", content: `/servicios/${category.slug}` },
      ],
      links: [{ rel: "canonical", href: `/servicios/${category.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Categoría no encontrada</h1>
      <p className="mt-3 text-muted-foreground">
        Regresá al{" "}
        <Link to="/servicios" className="underline">catálogo</Link>{" "}
        para ver todo lo que ofrecemos.
      </p>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Algo salió mal</h1>
      <button onClick={reset} className="mt-4 rounded-full bg-gradient-cta px-5 py-2 text-sm font-semibold text-white">
        Reintentar
      </button>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const c = category;

  return (
    <>
      <section
        className="border-b border-border py-16"
        style={{ background: colorSoftBg[c.color] }}
      >
        <div className="mx-auto max-w-6xl px-4">
          <Link
            to="/servicios"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Todos los servicios
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <div
              className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl"
              style={{ background: "white", border: `2px solid ${colorVar[c.color]}` }}
            >
              {c.emoji}
            </div>
            <div>
              <div
                className="mb-2 text-xs font-semibold uppercase tracking-widest"
                style={{ color: colorVar[c.color] }}
              >
                {c.short}
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{c.name}</h1>
              <p className="mt-4 max-w-2xl text-lg text-foreground/70">{c.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold">Productos disponibles</h2>
            <span className="text-sm text-muted-foreground">{c.products.length} productos</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.products.map((p) => (
              <div
                key={p.slug}
                className="group flex flex-col rounded-2xl border-2 border-border bg-card p-6 transition hover:-translate-y-1"
                style={{ borderTopColor: colorVar[c.color], borderTopWidth: 4 }}
              >
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                {p.options && p.options.length > 0 && (
                  <ul className="mt-4 space-y-1">
                    {p.options.slice(0, 3).map((o) => (
                      <li key={o.label} className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground/80">{o.label}:</span>{" "}
                        {o.values.join(" · ")}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-5 flex gap-2">
                  <a
                    href={whatsappLink(
                      `Hola Idealo, quiero cotizar: ${p.name} (${c.name}).`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-full bg-gradient-cta px-4 py-2 text-xs font-semibold text-white transition hover:scale-105"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Cotizar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
