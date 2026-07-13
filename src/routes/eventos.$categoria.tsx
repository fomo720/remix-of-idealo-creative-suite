import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PartyPopper, Flag, Cookie, BookOpen, Package, Tags, Hash, ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import evtCumple from "@/assets/evt-cumple-ejemplo.jpg.asset.json";

export const Route = createFileRoute("/eventos/$categoria")({
  loader: ({ params }) => {
    const cat = CATEGORIAS[params.categoria];
    if (!cat) throw notFound();
    return { cat, slug: params.categoria };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Evento no encontrado" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${loaderData.cat.title} — Eventos Idealo` },
        { name: "description", content: loaderData.cat.intro },
      ],
    };
  },
  component: CategoriaPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <p className="text-muted-foreground">Categoría no encontrada.</p>
      <Link to="/eventos" className="mt-4 inline-block underline">Volver a Eventos</Link>
    </div>
  ),
});

type Producto = {
  slug: string;
  title: string;
  icon: LucideIcon;
  desc: string;
  color: string;
};

type Categoria = {
  title: string;
  emoji: string;
  intro: string;
  hero?: string;
  productos: Producto[];
};

const PRODUCTOS_CUMPLE: Producto[] = [
  { slug: "pvc-bienvenida", title: "PVC de Bienvenida", icon: PartyPopper, desc: "Letrero rígido con el nombre del cumpleañero.", color: "var(--brand-pink)" },
  { slug: "banner-parador", title: "Banner Parador", icon: Flag, desc: "Backdrop vertical de gran formato.", color: "var(--brand-violet)" },
  { slug: "cake-topper", title: "Cake Topper", icon: Cookie, desc: "Decoración troquelada para el pastel.", color: "var(--brand-orange)" },
  { slug: "menu", title: "Menú", icon: BookOpen, desc: "Menú impreso personalizado por invitado.", color: "var(--brand-indigo)" },
  { slug: "cajitas", title: "Cajitas", icon: Package, desc: "Cajas de regalo o dulces temáticas.", color: "var(--brand-blue)" },
  { slug: "etiquetas-botellas", title: "Etiquetas para Botellas", icon: Tags, desc: "Etiquetas adhesivas para agua o licores.", color: "var(--brand-pink)" },
  { slug: "numero-mesa", title: "Número de Mesa", icon: Hash, desc: "Señalética para cada mesa del evento.", color: "var(--brand-violet)" },
];

const CATEGORIAS: Record<string, Categoria> = {
  cumpleanos: {
    title: "Cumpleaños",
    emoji: "🎂",
    intro: "Todo lo que necesitás para un cumpleaños memorable: PVC de bienvenida, banner parador, cake topper, menú, cajitas, etiquetas para botellas y números de mesa.",
    hero: evtCumple.url,
    productos: PRODUCTOS_CUMPLE,
  },
};

function CategoriaPage() {
  const { cat, slug } = Route.useLoaderData();
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-pink-50 via-orange-50 to-rose-50" />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Link to="/eventos" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Volver a Eventos
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <div className="text-6xl">{cat.emoji}</div>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              {cat.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{cat.intro}</p>
          </div>
          {cat.hero && (
            <div className="overflow-hidden rounded-3xl border border-border shadow-elegant">
              <img
                src={cat.hero}
                alt={cat.title}
                className="h-full w-full object-cover"
                style={{ transform: "scale(2)", transformOrigin: "center" }}
              />
            </div>
          )}
        </div>

        <h2 className="mt-16 text-2xl font-bold">Productos disponibles</h2>
        <p className="mt-1 text-sm text-muted-foreground">Elegí uno para personalizar tamaño, estilo y diseño.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cat.productos.map((p: Producto) => (
            <Link
              key={p.slug}
              to="/eventos/$categoria/$producto"
              params={{ categoria: slug, producto: p.slug }}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-foreground/30 hover:shadow-elegant"
            >
              <div
                className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition group-hover:scale-110"
                style={{ background: `color-mix(in oklab, ${p.color} 15%, white)`, color: p.color }}
              >
                <p.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                Personalizar <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
