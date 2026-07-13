import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/catalog";
import { colorVar, colorSoftBg } from "@/lib/category-colors";

export function CategoriesGrid() {
  return (
    <section id="servicios" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Todo lo que ofrecemos
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Explorá <span className="text-gradient-rainbow">todos los servicios</span>.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            {categories.length} categorías con más de {categories.reduce((n, c) => n + c.products.length, 0)}{" "}
            productos totalmente personalizables. Elegí una para empezar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/servicios/$categoria"
              params={{ categoria: c.slug }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border-2 p-6 transition hover:-translate-y-1"
              style={{
                borderColor: colorVar[c.color],
                background: colorSoftBg[c.color],
                boxShadow: `0 12px 30px -18px ${colorVar[c.color]}`,
              }}
            >
              <div className="text-4xl">{c.emoji}</div>
              <h3 className="mt-4 text-xl font-bold text-foreground">{c.name}</h3>
              <p className="mt-2 flex-1 text-sm text-foreground/70">{c.description}</p>
              <div
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold"
                style={{ color: colorVar[c.color] }}
              >
                {c.products.length} productos
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
