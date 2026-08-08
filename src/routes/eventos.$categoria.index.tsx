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
import evtBtsCombo from "@/assets/evt-bts-combo-rotuladores.png.asset.json";
import evtCumplePvc from "@/assets/evt-cumple-pvc-bienvenida.png.asset.json";
import evtCumpleBanner from "@/assets/evt-cumple-banner.png.asset.json";
import evtCumpleCake from "@/assets/evt-cumple-cake-topper.png.asset.json";
import evtCumpleMenu from "@/assets/evt-cumple-menu.png.asset.json";
import evtCumpleCajitas from "@/assets/evt-cumple-cajitas.png.asset.json";
import evtCumpleBotellas from "@/assets/evt-cumple-botellas.png.asset.json";
import evtCumpleMesa from "@/assets/evt-cumple-numero-mesa.png.asset.json";


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

const WA = "50433635666";
const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const PRODUCTOS_CUMPLE: Producto[] = [
  { slug: "pvc-bienvenida", title: "PVC de Bienvenida", icon: PartyPopper, desc: "Letrero rígido tamaño real con el nombre y tema del cumpleañero. Recibí a tus invitados con estilo.", color: "var(--brand-pink)", image: evtCumplePvc.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar un *PVC de Bienvenida* para un cumpleaños. ¿Me pasan opciones, tamaños y precios?") },
  { slug: "banner-parador", title: "Banner Personalizado", icon: Flag, desc: "Backdrop de gran formato con el tema del cumpleaños. Perfecto para fotos y decoración.", color: "var(--brand-violet)", image: evtCumpleBanner.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar un *Banner personalizado* para un cumpleaños. ¿Me pasan tamaños y precios?") },
  { slug: "cake-topper", title: "Cake Topper", icon: Cookie, desc: "Decoración troquelada personalizada para el pastel con nombre, edad y personajes.", color: "var(--brand-orange)", image: evtCumpleCake.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar un *Cake Topper* personalizado. ¿Me pasan opciones y precios?") },
  { slug: "menu", title: "Menú Personalizado", icon: BookOpen, desc: "Menú impreso temático con entrada, plato fuerte y postre. Uno por invitado o de mesa.", color: "var(--brand-indigo)", image: evtCumpleMenu.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *Menús personalizados* para un cumpleaños. ¿Me pasan opciones y precios?") },
  { slug: "cajitas", title: "Cajitas Personalizadas", icon: Package, desc: "Cajitas temáticas para dulces, regalitos o snacks. Con el diseño del cumpleaños.", color: "var(--brand-blue)", image: evtCumpleCajitas.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *Cajitas personalizadas* para un cumpleaños. ¿Me pasan opciones y precios?") },
  { slug: "etiquetas-botellas", title: "Botellas Personalizadas", icon: Tags, desc: "Etiquetas adhesivas para botellas de agua o refresco con el nombre y tema del cumple.", color: "var(--brand-pink)", image: evtCumpleBotellas.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *Etiquetas para botellas* personalizadas. ¿Me pasan opciones y precios?") },
  { slug: "numero-mesa", title: "Número de Mesa", icon: Hash, desc: "Señalética temática troquelada con el número o edad. Ideal para mesa de dulces o principal.", color: "var(--brand-violet)", image: evtCumpleMesa.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *Números de Mesa* personalizados para un cumpleaños. ¿Me pasan opciones y precios?") },
];

const PRODUCTOS_FP: Producto[] = [
  { slug: "llaveros", title: "Llaveros", icon: KeyRound, desc: "Llaveros patrióticos con diseño personalizado. También con grabado láser en acero.", color: "var(--brand-blue)", image: evtFpLlaveros.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *llaveros patrióticos* para fiestas patrias. ¿Me pueden pasar opciones y precios?") },
  { slug: "tote-bags", title: "Tote Bags", icon: ShoppingBag, desc: "Bolsas de tela con diseños patrios: baleada, escudo, mapa y más. Personalizables.", color: "var(--brand-orange)", image: evtFpTotes.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *tote bags patrios* para fiestas patrias. ¿Me pueden pasar opciones y precios?") },
  { slug: "cuadros-canvas", title: "Cuadros en Canvas", icon: ImageIcon, desc: "Cuadros en canvas con arte hondureño: paisajes, guacamayas, mapa y retratos.", color: "var(--brand-violet)", image: evtFpCanvas.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *cuadros en canvas* patrios. ¿Me pueden pasar tamaños y precios?") },
  { slug: "tazas-sublimadas", title: "Tazas Sublimadas", icon: Mug, desc: "Tazas cerámicas con diseño Honduras full color. Sublimación duradera y apta lavavajillas.", color: "var(--brand-pink)", image: evtFpTazas.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *tazas sublimadas* patrias. ¿Me pueden pasar opciones y precios?") },
  { slug: "sombreros-sublimados", title: "Sombreros Sublimados", icon: Palette, desc: "Sombreros de playa sublimados con guacamaya, conchas y motivos hondureños.", color: "var(--brand-indigo)", image: evtFpSombreros.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *sombreros sublimados* patrios. ¿Me pueden pasar opciones y precios?") },
  { slug: "llaveros-grabado-laser", title: "Llaveros con Grabado Láser", icon: Flag, desc: "Llaveros de acero inoxidable con grabado láser 'Honduras' y abridor integrado.", color: "var(--brand-blue)", image: evtFpLlaveros.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *llaveros con grabado láser Honduras*. ¿Me pueden pasar opciones y precios?") },
  { slug: "camisetas-patrioticas", title: "Camisetas Patrióticas", icon: ShoppingBag, desc: "Camisetas blancas y negras premium. Diseños #VosSoloSosPaja y más.", color: "var(--brand-blue)", image: evtFpCamisetas.url, whatsapp: wa("Hola Idealo 👋 Quiero cotizar *camisetas patrióticas*. ¿Me pueden pasar opciones, tallas y presupuesto?") },
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

        {slug === "back-to-school" && (
          <a
            href={wa("Hola Idealo 👋 Me interesa la *OFERTA ESPECIAL COMBO Back to School* — Paquete de Rotuladores personalizados (15 viñetas 3x4, 30 viñetas 1x4, 20 stickers 2x2 redondo, 10 stickers 3x3 redondo). ¿Me pasan precio y tiempos?")}
            target="_blank"
            rel="noreferrer"
            className="mt-14 group relative block overflow-hidden rounded-3xl border-2 border-[color:var(--brand-blue)]/30 bg-white shadow-elegant transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute left-4 top-4 z-10 rounded-full bg-[color:var(--brand-pink)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
              ⭐ Oferta especial · Combo
            </div>
            <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
              <div className="bg-gradient-to-br from-sky-50 to-pink-50 p-4">
                <img src={evtBtsCombo.url} alt="Paquete de Rotuladores Back to School" className="mx-auto h-auto w-full max-w-md object-contain" />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <h3 className="text-2xl font-bold text-[color:var(--brand-blue)] md:text-3xl">Paquete de Rotuladores</h3>
                <p className="text-lg font-semibold text-sky-500">Back to School</p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  <li>• 15 viñetas de <strong>3x4 pulgadas</strong> (cuadernos/libros)</li>
                  <li>• 30 viñetas de <strong>1x4 pulgadas</strong> (plumas/lápices)</li>
                  <li>• 20 stickers de <strong>2x2 pulgadas</strong> redondos</li>
                  <li>• 10 stickers de <strong>3x3 pulgadas</strong> redondos</li>
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">Completamente personalizados con el personaje, tamaño y cantidad que desees.</p>
                <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--brand-blue)] px-5 py-2.5 text-sm font-bold text-white transition group-hover:bg-[color:var(--brand-pink)]">
                  Cotizar combo por WhatsApp →
                </span>
              </div>
            </div>
          </a>
        )}

        <h2 className="mt-16 text-2xl font-bold">Productos disponibles</h2>
        <p className="mt-1 text-sm text-muted-foreground">Elegí uno para personalizar tamaño, estilo y diseño.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cat.productos.map((p: Producto) => {
            const inner = (
              <>
                {p.image ? (
                  <div className="mb-4 overflow-hidden rounded-2xl border border-border bg-white">
                    <img src={p.image} alt={p.title} className="aspect-square w-full object-cover transition group-hover:scale-105" />
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
