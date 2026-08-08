import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Briefcase, Utensils, Truck, CheckCircle2, MessageCircle } from "lucide-react";
import kitOficinasImg from "@/assets/kit-oficinas-clinicas.jpg.asset.json";
import kitRestaurantesImg from "@/assets/kit-restaurantes.jpg.asset.json";
import kitEmprendedoresImg from "@/assets/kit-emprendedores.jpg.asset.json";
import kitFlotaImg from "@/assets/kit-flota-avion.jpg.asset.json";
import combo1Img from "@/assets/combo-1-emprendedores.jpg.asset.json";
import combo2Img from "@/assets/combo-2-emprendedores.jpg.asset.json";

export const Route = createFileRoute("/empresas/")({
  head: () => ({
    meta: [
      { title: "Soluciones para Empresas — Idealo" },
      { name: "description", content: "Kits llave en mano por perfil de negocio: restaurantes, oficinas, emprendedores y flotas." },
    ],
  }),
  component: EmpresasIndex,
});

type Kit = {
  slug: string;
  title: string;
  tagline: string;
  icon: typeof Utensils;
  includes: string[];
  accent: string;
  image: string;
};

const KITS: Kit[] = [
  {
    slug: "restaurantes-cafes",
    title: "Restaurantes y Cafés",
    tagline: "Cada detalle habla de tu marca — desde la mesa hasta la entrada.",
    icon: Utensils,
    includes: ["Diseño e impresión de menús", "Stickers para empaques y bolsas", "Branding e identidad visual", "Banners y rótulos exteriores"],
    accent: "from-amber-500/15 to-orange-500/10 border-amber-500/30",
    image: kitRestaurantesImg.url,
  },
  {
    slug: "oficinas-clinicas",
    title: "Oficinas y Clínicas",
    tagline: "Espacios profesionales con señalética clara y papelería impecable.",
    icon: Briefcase,
    includes: ["Señalética y wayfinding", "Papelería corporativa completa", "Vinilos para ventanales", "Cuadros y decoración de marca"],
    accent: "from-sky-500/15 to-blue-500/10 border-sky-500/30",
    image: kitOficinasImg.url,
  },
  {
    slug: "emprendedores-startups",
    title: "Emprendedores / Startups",
    tagline: "Todo lo que necesitás para arrancar con una marca sólida.",
    icon: Building2,
    includes: ["Logo e identidad de marca", "Tarjetas de presentación", "Stickers de marca", "Kit de redes sociales"],
    accent: "from-fuchsia-500/15 to-pink-500/10 border-fuchsia-500/30",
    image: kitEmprendedoresImg.url,
  },
  {
    slug: "flota-logistica",
    title: "Flota y Logística",
    tagline: "Convertí cada vehículo en una unidad de publicidad rodante.",
    icon: Truck,
    includes: ["Vinilo de corte para autos", "Rotulación de camiones y motos", "Microperforado para vidrios", "Identidad para uniformes"],
    accent: "from-emerald-500/15 to-teal-500/10 border-emerald-500/30",
    image: kitFlotaImg.url,
  },
];

function EmpresasIndex() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-slate-50 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">SOLUCIONES CORPORATIVAS · B2B</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Kits llave en mano para{" "}
            <span className="text-gradient-rainbow animate-rainbow-shimmer">tu negocio</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Elegí tu perfil y armamos toda la producción gráfica que necesitás — sin ir producto por producto. Diseño, impresión y montaje coordinados.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/50433635666?text=${encodeURIComponent("Hola Idealo, quiero cotizar un proyecto corporativo. Les cuento un poco de mi negocio:")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-elegant transition hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" /> Cotizar proyecto corporativo
            </a>
            <a href="#kits" className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
              Ver kits disponibles →
            </a>
          </div>
        </div>
      </section>

      {/* KITS */}
      <section id="kits" className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground">KITS DE IDENTIDAD</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Elegí por perfil de negocio</h2>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {KITS.map((k) => (
            <KitCard key={k.slug} kit={k} />
          ))}
        </div>
      </section>

      {/* COMBOS / OFERTAS */}
      <section id="combos" className="border-t border-border/60 bg-gradient-to-b from-orange-50/60 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-orange-600">OFERTAS ESPECIALES</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Combos para emprendedores</h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Paquetes cerrados a precio fijo — todo lo esencial para arrancar tu marca en un solo pedido.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-elegant">
              <img src={combo1Img.url} alt="Combo #1 para emprendedores" loading="lazy" className="w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-500 to-red-500 p-8 text-white sm:p-10">
              <p className="text-xs font-bold tracking-widest text-white/80">COMBO #1</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Oferta para Emprendedores</h3>
              <div className="mt-6 space-y-3 text-base">
                {[
                  "1 camisa kiana con logo (talla S, M o L)",
                  "100 stickers de 1.5×1.5 pulgadas",
                  "100 tarjetas de presentación",
                  "100 hojas volantes",
                  "1 hablador tamaño carta",
                ].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white/90" />
                    <span>{i}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-sm text-white/80">presupuesto personalizado</span>
              </div>
              <p className="mt-3 text-xs text-white/70">*Aplican restricciones</p>
              <a
                href={`https://wa.me/50433635666?text=${encodeURIComponent("Hola Idealo, quiero cotizar el Combo #1 para Emprendedores (L 600).")}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-orange-600 transition hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> Pedir Combo #1
              </a>
            </div>

            <div className="flex flex-col justify-center rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white sm:p-10 md:order-2">
              <p className="text-xs font-bold tracking-widest text-white/80">COMBO #2</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Oferta para Emprendedores</h3>
              <div className="mt-6 space-y-3 text-base">
                {[
                  "1 camisa kiana con logo (talla S, M o L)",
                  "100 stickers de 1.5×1.5 pulgadas",
                  "1 banner con araña",
                  "100 tarjetas de presentación",
                  "100 hojas volantes",
                  "1 hablador tamaño carta",
                ].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white/90" />
                    <span>{i}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-sm text-white/80">presupuesto personalizado</span>
              </div>
              <p className="mt-3 text-xs text-white/70">*Aplican restricciones</p>
              <a
                href={`https://wa.me/50433635666?text=${encodeURIComponent("Hola Idealo, quiero cotizar el Combo #2 para Emprendedores (L 1,600).")}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> Pedir Combo #2
              </a>
            </div>
            <div className="overflow-hidden rounded-3xl border border-indigo-200 bg-white shadow-elegant md:order-1">
              <img src={combo2Img.url} alt="Combo #2 para emprendedores" loading="lazy" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="border-t border-border/60 bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">CÓMO TRABAJAMOS</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Un proceso claro, de principio a fin</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Contanos tu proyecto", d: "Perfil, volumen y tiempos." },
              { n: "02", t: "Cotización personalizada", d: "Propuesta con materiales y opciones." },
              { n: "03", t: "Diseño y producción", d: "Nuestro equipo se encarga." },
              { n: "04", t: "Entrega y montaje", d: "Coordinamos instalación si aplica." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-background p-6">
                <div className="text-xs font-bold tracking-widest text-muted-foreground">{s.n}</div>
                <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-foreground to-slate-800 p-10 text-background sm:p-14">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Listo para llevar tu marca al siguiente nivel?
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-background/70">
            Trabajamos con restaurantes, clínicas, oficinas y flotas en toda Honduras. Contanos tu proyecto y armamos una cotización a la medida.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/50433635666?text=${encodeURIComponent("Hola Idealo, quiero cotizar un proyecto corporativo.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" /> Cotizar por WhatsApp
            </a>
            <a href="tel:+50433635666" className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10">
              Llamar ahora
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function KitCard({ kit }: { kit: Kit }) {
  const Icon = kit.icon;
  const waMsg = `Hola Idealo, quiero cotizar el Kit ${kit.title}. Les cuento un poco de mi negocio:`;
  return (
    <Link
      to="/empresas/$kit"
      params={{ kit: kit.slug }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-gradient-to-br ${kit.accent} p-7 transition hover:-translate-y-1 hover:shadow-elegant`}
    >
      <div className="mb-5 -mx-7 -mt-7 aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={kit.image}
          alt={kit.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-background/80 backdrop-blur">
          <Icon className="h-7 w-7" />
        </div>
        <ArrowRight className="h-5 w-5 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
      </div>
      <h3 className="mt-6 text-2xl font-bold tracking-tight">{kit.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{kit.tagline}</p>
      <ul className="mt-5 space-y-2">
        {kit.includes.map((i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-5">
        <span className="text-sm font-semibold">Ver kit completo</span>
        <span className="ml-auto text-xs text-muted-foreground" onClick={(e) => e.preventDefault()}>
          <a
            href={`https://wa.me/50433635666?text=${encodeURIComponent(waMsg)}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border bg-background px-3 py-1.5 font-semibold hover:bg-foreground hover:text-background"
            onClick={(e) => e.stopPropagation()}
          >
            Cotizar
          </a>
        </span>
      </div>
    </Link>
  );
}
