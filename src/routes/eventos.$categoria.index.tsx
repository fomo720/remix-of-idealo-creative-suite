import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PartyPopper, Flag, Cookie, BookOpen, Package, Tags, Hash, ArrowLeft, Notebook, Sticker, Pencil, Frame, Coffee, KeyRound, ShoppingBag, ImageIcon, Coffee as Mug, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import evtCumple from "@/assets/evt-cumple-ejemplo.jpg.asset.json";
import evtBackToSchool from "@/assets/evt-back-to-school.jpg.asset.json";
import evtFpHero from "@/assets/evt-fp-hero.jpg.asset.json";
import evtFpLlaveros from "@/assets/evt-fp-llaveros.jpg.asset.json";
import evtFpTotes from "@/assets/evt-fp-totes.jpg.asset.json";
import evtFpCanvas from "@/assets/evt-fp-canvas.jpg.asset.json";
import evtFpTazas from "@/assets/evt-fp-tazas.jpg.asset.json";
import evtFpSombreros from "@/assets/evt-fp-sombreros.jpg.asset.json";
import evtFpCamisetas from "@/assets/evt-fp-camisetas.png.asset.json";


export const Route = createFileRoute("/eventos/$categoria/")({
  loader: ({ params }) => {
    const cat = CATEGORIAS[params.categoria];
    if (!cat) throw notFound();
    return { slug: params.categoria };
  },
  head: ({ params }) => {
    const cat = params ? CATEGORIAS[params.categoria] : undefined;
    if (!cat) return { meta: [{ title: "Evento no encontrado" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${cat.title} — Eventos Idealo` },
        { name: "description", content: cat.intro },
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
  image?: string;
  whatsapp?: string;
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

const WA = "50432316100";
const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const PRODUCTOS_FP: Producto[] = [
  { slug: "llaveros", title: "Llaveros", icon: KeyRound, desc: "Llaveros patrióticos con diseño personalizado. También con grabado láser en acero.", color: "var(--brand-blue)", image: evtFpLlaveros.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *llaveros patrióticos* para fiestas patrias. ¿Me pueden pasar opciones y precios?") },
  { slug: "tote-bags", title: "Tote Bags", icon: ShoppingBag, desc: "Bolsas de tela con diseños patrios: baleada, escudo, mapa y más. Personalizables.", color: "var(--brand-orange)", image: evtFpTotes.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *tote bags patrios* para fiestas patrias. ¿Me pueden pasar opciones y precios?") },
  { slug: "cuadros-canvas", title: "Cuadros en Canvas", icon: ImageIcon, desc: "Cuadros en canvas con arte hondureño: paisajes, guacamayas, mapa y retratos.", color: "var(--brand-violet)", image: evtFpCanvas.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *cuadros en canvas* patrios. ¿Me pueden pasar tamaños y precios?") },
  { slug: "tazas-sublimadas", title: "Tazas Sublimadas", icon: Mug, desc: "Tazas cerámicas con diseño Honduras full color. Sublimación duradera y apta lavavajillas.", color: "var(--brand-pink)", image: evtFpTazas.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *tazas sublimadas* patrias. ¿Me pueden pasar opciones y precios?") },
  { slug: "sombreros-sublimados", title: "Sombreros Sublimados", icon: Palette, desc: "Sombreros de playa sublimados con guacamaya, conchas y motivos hondureños.", color: "var(--brand-indigo)", image: evtFpSombreros.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *sombreros sublimados* patrios. ¿Me pueden pasar opciones y precios?") },
  { slug: "llaveros-grabado-laser", title: "Llaveros con Grabado Láser", icon: Flag, desc: "Llaveros de acero inoxidable con grabado láser 'Honduras' y abridor integrado.", color: "var(--brand-blue)", image: evtFpLlaveros.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *llaveros con grabado láser Honduras*. ¿Me pueden pasar opciones y precios?") },
];

const PRODUCTOS_BTS: Producto[] = [
  { slug: "cuaderno-personalizado", title: "Cuaderno con Sticker", icon: Notebook, desc: "Cuaderno espiral con sticker temático y nombre del niño.", color: "var(--brand-violet)" },
  { slug: "sticker-panita", title: "Sticker para Panita", icon: Sticker, desc: "Sticker resistente para lonchera con nombre.", color: "var(--brand-pink)" },
  { slug: "libro-sticker", title: "Libro con Sticker", icon: BookOpen, desc: "Libro de aventuras personalizado con el nombre y personaje favorito.", color: "var(--brand-orange)" },
  { slug: "stickers-lapices", title: "Stickers para Lápices", icon: Pencil, desc: "Stickers para marcar lápices, colores y útiles.", color: "var(--brand-indigo)" },
  { slug: "marco-pvc-fotos", title: "Marco PVC para Fotos", icon: Frame, desc: "Marco 'First Day' de PVC con sticker temático para foto del primer día.", color: "var(--brand-blue)" },
  { slug: "termo-grabado", title: "Termo con Grabado Láser", icon: Coffee, desc: "Botella metálica con el nombre grabado a láser.", color: "var(--brand-pink)" },
];

const CATEGORIAS: Record<string, Categoria> = {
  cumpleanos: {
    title: "Cumpleaños",
    emoji: "🎂",
    intro: "Todo lo que necesitás para un cumpleaños memorable: PVC de bienvenida, banner parador, cake topper, menú, cajitas, etiquetas para botellas y números de mesa.",
    hero: evtCumple.url,
    productos: PRODUCTOS_CUMPLE,
  },
  "back-to-school": {
    title: "Back to School",
    emoji: "🎒",
    intro: "¡Todo lo que necesitas con el nombre de tu hijo! Cuaderno, libro de aventuras, stickers para panita y lápices, marco de PVC para fotos del primer día y termo con grabado láser. Ideal para colegio y regalo.",
    hero: evtBackToSchool.url,
    productos: PRODUCTOS_BTS,
  },
  "fiestas-patrias": {
    title: "Fiestas Patrias",
    emoji: "🇭🇳",
    intro: "¡Celebrá a lo grande las fiestas patrias! Llaveros, tote bags, cuadros canvas, tazas y sombreros sublimados, llaveros con grabado láser y mucho más. Personalizalos con nombre o logo.",
    hero: evtFpHero.url,
    productos: PRODUCTOS_FP,
  },
};

function CategoriaPage() {
  const { slug } = Route.useLoaderData();
  const cat = CATEGORIAS[slug]!;
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
            <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-elegant">
              <img
                src={cat.hero}
                alt={cat.title}
                className="h-full w-full object-contain"
              />
            </div>
          )}
        </div>

        <h2 className="mt-16 text-2xl font-bold">Productos disponibles</h2>
        <p className="mt-1 text-sm text-muted-foreground">Elegí uno para personalizar tamaño, estilo y diseño.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cat.productos.map((p: Producto) => {
            const inner = (
              <>
                {p.image ? (
                  <div className="mb-4 overflow-hidden rounded-2xl border border-border bg-white">
                    <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
                  </div>
                ) : (
                  <div
                    className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition group-hover:scale-110"
                    style={{ background: `color-mix(in oklab, ${p.color} 15%, white)`, color: p.color }}
                  >
                    <p.icon className="h-7 w-7" />
                  </div>
                )}
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                  {p.whatsapp ? "Cotizar por WhatsApp" : "Personalizar"} <span aria-hidden>→</span>
                </span>
              </>
            );
            const cls = "group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-foreground/30 hover:shadow-elegant";
            return p.whatsapp ? (
              <a key={p.slug} href={p.whatsapp} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
            ) : (
              <Link key={p.slug} to="/eventos/$categoria/$producto" params={{ categoria: slug, producto: p.slug }} className={cls}>{inner}</Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
