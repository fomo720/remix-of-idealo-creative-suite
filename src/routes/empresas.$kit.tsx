import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import kitOficinasImg from "@/assets/kit-oficinas-clinicas.jpg.asset.json";
import kitRestaurantesImg from "@/assets/kit-restaurantes.jpg.asset.json";
import kitEmprendedoresImg from "@/assets/kit-emprendedores.jpg.asset.json";
import kitEmprendimientoCompletoImg from "@/assets/kit-emprendimiento-completo.jpg.asset.json";
import kitFlotaImg from "@/assets/kit-flota-avion.jpg.asset.json";
import serviciosClinicaImg from "@/assets/servicios-clinica.jpg.asset.json";
import serviciosRestauranteImg from "@/assets/servicios-restaurante.jpg.asset.json";
import restMenusImg from "@/assets/kit-rest-menus.jpg.asset.json";
import restStickersImg from "@/assets/kit-rest-stickers.jpg.asset.json";
import restBrandingImg from "@/assets/kit-rest-branding.jpg.asset.json";
import restBannerAranaImg from "@/assets/kit-rest-banner-arana.jpg.asset.json";

type KitDetail = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  includes: { title: string; desc: string; image?: string }[];
  ideal: string[];
  image: string;
  showcaseImage?: string;
  showcaseCaption?: string;
};

const KITS: Record<string, KitDetail> = {
  "restaurantes-cafes": {
    slug: "restaurantes-cafes",
    title: "Kit Restaurantes y Cafés",
    tagline: "Cada detalle habla de tu marca — desde la mesa hasta la entrada.",
    description:
      "Producción completa para que tu restaurante o café luzca profesional en cada punto de contacto con el cliente: la carta, el empaque de delivery, la fachada y las redes.",
    includes: [
      { title: "Menús impresos", desc: "Diseño editorial, materiales resistentes, opciones plastificadas o con laca UV.", image: restMenusImg.url },
      { title: "Stickers para empaques", desc: "Sellos de marca, etiquetas para bolsas, cajas y vasos take-away.", image: restStickersImg.url },
      { title: "Branding y arte", desc: "Identidad visual coherente para local, delivery y redes sociales.", image: restBrandingImg.url },
      { title: "Banners y rótulos", desc: "Impresión gran formato para fachada, terraza o eventos temporales.", image: restBannerAranaImg.url },
    ],
    ideal: ["Cafeterías", "Restaurantes casuales y fine dining", "Food trucks", "Dark kitchens y delivery"],
    image: kitRestaurantesImg.url,
    showcaseImage: serviciosRestauranteImg.url,
    showcaseCaption: "Todos los servicios que ofrecemos para restaurantes y cafés",
  },
  "oficinas-clinicas": {
    slug: "oficinas-clinicas",
    title: "Kit Oficinas y Clínicas",
    tagline: "Espacios profesionales con señalética clara y papelería impecable.",
    description:
      "Todo lo que un espacio corporativo o médico necesita para transmitir orden, confianza y una imagen profesional consistente.",
    includes: [
      { title: "Señalética y wayfinding", desc: "Placas de puertas, direccionales, letreros de recepción." },
      { title: "Papelería corporativa", desc: "Hojas membretadas, sobres, carpetas, facturación y tarjetas." },
      { title: "Vinilos para ventanales", desc: "Esmerilados con logo, privacidad y branding en cristales." },
      { title: "Cuadros y decoración", desc: "Impresión decorativa con misión, visión o arte institucional." },
    ],
    ideal: ["Clínicas médicas y dentales", "Bufetes y consultorías", "Coworkings", "Oficinas administrativas"],
    image: kitOficinasImg.url,
    showcaseImage: serviciosClinicaImg.url,
    showcaseCaption: "Todos los servicios que ofrecemos para clínicas y oficinas",
  },
  "emprendedores-startups": {
    slug: "emprendedores-startups",
    title: "Kit Emprendedores / Startups",
    tagline: "Todo lo que necesitás para arrancar con una marca sólida.",
    description:
      "Un paquete inicial pensado para quien está lanzando su negocio: identidad, papelería mínima viable y piezas físicas para empezar a vender.",
    includes: [
      { title: "Logo e identidad", desc: "Concepto visual, paleta, tipografía y manual básico." },
      { title: "Tarjetas de presentación", desc: "Impresión premium con acabados opcionales (relieve, laca, dorado)." },
      { title: "Stickers de marca", desc: "Troquelados con tu logo para empaques, producto o merch." },
      { title: "Kit de redes sociales", desc: "Plantillas y arte inicial para tu presencia digital." },
    ],
    ideal: ["Marcas nuevas", "Freelancers y consultores", "Tiendas online", "Pequeños productores"],
    image: kitEmprendedoresImg.url,
    showcaseImage: kitEmprendimientoCompletoImg.url,
    showcaseCaption: "Todo para tu emprendimiento: banners, menús, stickers, rótulos, uniformes y más",
  },
  "flota-logistica": {
    slug: "flota-logistica",
    title: "Kit Flota y Logística",
    tagline: "Convertí cada vehículo en una unidad de publicidad rodante.",
    description:
      "Rotulación vehicular profesional para empresas con flotas: reparto, transporte, servicios técnicos, ambulancias o vehículos ejecutivos.",
    includes: [
      { title: "Vinilo de corte", desc: "Logo y datos de contacto en autos, camionetas y motos." },
      { title: "Rotulación integral", desc: "Full wrap o wrap parcial para camiones y unidades grandes." },
      { title: "Microperforado", desc: "Rotulación en vidrios sin comprometer la visibilidad interior." },
      { title: "Uniformes e identidad", desc: "Identidad coherente entre vehículos, uniformes y papelería." },
    ],
    ideal: ["Empresas de reparto", "Servicios técnicos y mantenimiento", "Transporte ejecutivo", "Ambulancias y emergencias"],
    image: kitFlotaImg.url,
  },
};

export const Route = createFileRoute("/empresas/$kit")({
  loader: ({ params }) => {
    const kit = KITS[params.kit];
    if (!kit) throw notFound();
    return { kit };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.kit.title} — Idealo` : "Kit — Idealo" },
      { name: "description", content: loaderData?.kit.tagline ?? "Kit corporativo Idealo." },
    ],
  }),
  component: KitPage,
  notFoundComponent: KitNotFound,
});

function KitNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Kit no encontrado</h1>
      <Link to="/empresas" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline">
        <ArrowLeft className="h-4 w-4" /> Volver a Empresas
      </Link>
    </section>
  );
}

function KitPage() {
  const { kit } = Route.useLoaderData() as { kit: KitDetail };
  const waMsg = `Hola Idealo, quiero cotizar el ${kit.title}. Les cuento sobre mi negocio:`;
  const waHref = `https://wa.me/50433635666?text=${encodeURIComponent(waMsg)}`;

  return (
    <>
      <section className="border-b border-border/60 bg-gradient-to-b from-slate-50 to-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
          <div>
            <Link to="/empresas" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Todos los kits
            </Link>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{kit.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{kit.tagline}</p>
            <p className="mt-3 text-sm text-muted-foreground">{kit.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-elegant transition hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> Cotizar este kit
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-elegant">
            <img src={kit.image} alt={kit.title} className="aspect-[4/3] h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground">QUÉ INCLUYE</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">Todo esto, coordinado</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {kit.includes.map((it) => (
            <div key={it.title} className="overflow-hidden rounded-2xl border border-border bg-card">
              {it.image && (
                <img
                  src={it.image}
                  alt={it.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full bg-muted object-cover"
                />
              )}
              <div className="flex items-start gap-3 p-6">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
                <div>
                  <h3 className="text-lg font-bold">{it.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {kit.showcaseImage && (
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card">
            <img src={kit.showcaseImage} alt={kit.showcaseCaption ?? "Servicios"} className="w-full" />
            {kit.showcaseCaption && (
              <p className="border-t border-border px-6 py-4 text-center text-sm text-muted-foreground">
                {kit.showcaseCaption}
              </p>
            )}
          </div>
        )}
      </section>

      <section className="border-t border-border/60 bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">IDEAL PARA</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">¿Este kit es para vos?</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {kit.ideal.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">
                <Sparkles className="h-3.5 w-3.5" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="idealo-cta-gradient relative overflow-hidden rounded-3xl p-10 text-white shadow-elegant sm:p-14">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/15" />
          <div className="relative">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight drop-shadow-sm sm:text-4xl">Solicitá tu cotización</h2>
            <p className="mt-3 max-w-2xl text-sm text-white/85">
              Contanos volumen aproximado, tiempos y referencias. Te respondemos con una propuesta a la medida.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" /> Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
