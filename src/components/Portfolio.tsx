import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import menus from "@/assets/portfolio-menus.jpg.asset.json";
import stickersMarca from "@/assets/portfolio-stickers-marca.jpg.asset.json";
import carpetas from "@/assets/portfolio-carpetas.jpg.asset.json";
import troquelados from "@/assets/portfolio-troquelados.jpg.asset.json";
import banner from "@/assets/portfolio-banner.jpg.asset.json";
import microperforado from "@/assets/portfolio-microperforado.jpg.asset.json";
import rotulacion from "@/assets/portfolio-rotulacion.jpg.asset.json";
import tarjetas from "@/assets/portfolio-tarjetas.jpg.asset.json";
import backToSchool from "@/assets/portfolio-back-to-school.jpg.asset.json";
import standFotos from "@/assets/portfolio-stand-fotos.jpg.asset.json";
import espejoStickers from "@/assets/portfolio-espejo-stickers.jpg.asset.json";
import menuPvc from "@/assets/portfolio-menu-pvc.jpg.asset.json";
import figuraPvc from "@/assets/portfolio-figura-pvc.jpg.asset.json";
import pvcGaby from "@/assets/portfolio-pvc-gaby.jpg.asset.json";
import figurasMundial from "@/assets/portfolio-figuras-mundial-hd.jpg.asset.json";
import banderines from "@/assets/portfolio-banderines-hd.jpg.asset.json";
import albumMama2 from "@/assets/portfolio-album-mama-2.jpg.asset.json";
import bannerCruzacalle from "@/assets/portfolio-banner-cruzacalle.jpg.asset.json";
import variedadBanners from "@/assets/portfolio-variedad-banners.jpg.asset.json";
import grabadoPapa from "@/assets/portfolio-grabado-papa.jpg.asset.json";
import camisetasPapa from "@/assets/portfolio-camisetas-papa.jpg.asset.json";
import botellasPersonalizadas from "@/assets/portfolio-botellas-personalizadas.jpg.asset.json";
import etiquetasBotellas from "@/assets/portfolio-etiquetas-botellas.jpg.asset.json";
import marcosFotos from "@/assets/portfolio-marcos-fotos.jpg.asset.json";
import cadenasGrabado from "@/assets/portfolio-cadenas-grabado.jpg.asset.json";
import boxersPersonalizados from "@/assets/portfolio-boxers.jpg.asset.json";
import calsetasPersonalizadas from "@/assets/portfolio-calsetas.jpg.asset.json";
import retrateras from "@/assets/portfolio-retrateras.jpg.asset.json";
import rompecabezas from "@/assets/portfolio-rompecabezas.jpg.asset.json";
import polaroid from "@/assets/portfolio-polaroid.jpg.asset.json";
import rollosFacturacion from "@/assets/portfolio-rollos-facturacion.jpg.asset.json";
import sublimacion from "@/assets/portfolio-sublimacion.jpg.asset.json";
import empaques from "@/assets/portfolio-empaques.jpg.asset.json";
import stickersEmpaques from "@/assets/portfolio-stickers-empaques.jpg.asset.json";
import etiquetasBebidas from "@/assets/portfolio-etiquetas-bebidas.jpg.asset.json";
import etiquetasGuifity from "@/assets/portfolio-etiquetas-guifity.jpg.asset.json";
import etiquetasCumple from "@/assets/portfolio-etiquetas-cumple.jpg.asset.json";
import servicio360 from "@/assets/portfolio-360.jpg.asset.json";

type ProjectType = "Stickers" | "Banderines" | "Iron-ons" | "PVC" | "Impresos" | "Rotulación" | "Regalos" | "Servicios";

type Project = {
  title: string;
  tag: string;
  subtitle: string;
  type: ProjectType;
  image?: string;
  gradient?: string;
  bg?: string;
  /** cover = fills card (may crop); contain = shows entire image with padding. Default cover. */
  fit?: "cover" | "contain";
};

// Order matters: last = most recent
const projects: Project[] = [
  { title: "Menús para restaurantes", tag: "Restaurantes", type: "Impresos", subtitle: "Impresión doble lado · espiral de metal · laminado", image: menus.url, bg: "#d9d9d9" },
  { title: "Stickers de marca", tag: "Emprendedores", type: "Stickers", subtitle: "Impresión de alta calidad · material impermeable", image: stickersMarca.url, bg: "#1a1410" },
  { title: "Carpetas corporativas", tag: "Corporativo", type: "Impresos", subtitle: "Cartón laminado · doble compartimiento", image: carpetas.url, bg: "#ffffff" },
  { title: "Stickers troquelados", tag: "Personalizados", type: "Stickers", subtitle: "Cualquier forma, diseño y tamaño", image: troquelados.url, bg: "#fafafa" },
  { title: "Banners Roll Up", tag: "Publicidad", type: "Banderines", subtitle: "33.5 × 78.7 pulgadas · incluye araña y estuche", image: banner.url, bg: "#ffffff", fit: "contain" },
  { title: "Microperforado", tag: "Fachadas", type: "Rotulación", subtitle: "Vinil para vidrieras y locales comerciales", image: microperforado.url, bg: "#5b6672" },
  { title: "Rotulación industrial", tag: "Señalética", type: "Rotulación", subtitle: "Señales de seguridad y rotulación empresarial", image: rotulacion.url, bg: "#1f4a7a" },
  { title: "Tarjetas de presentación profesionales", tag: "Branding", type: "Impresos", subtitle: "Papel premium · acabados brillantes o mate", image: tarjetas.url, bg: "#eaf4fb" },
  { title: "Rótulos de bienvenida escolares", tag: "Escuelas", type: "PVC", subtitle: "Diseño personalizado · impresión de alta calidad · cualquier tamaño", image: backToSchool.url, bg: "#0ea5e9", fit: "contain" },
  { title: "Stand para fotos", tag: "Eventos", type: "PVC", subtitle: "Backdrop temático en PVC con troquelado y sticker de alta calidad", image: standFotos.url, bg: "#0f172a", fit: "contain" },
  { title: "Espejo con stickers en vinil", tag: "Restaurantes & Bares", type: "Stickers", subtitle: "Stickers en vinil aplicados sobre espejo para ambientar tu local", image: espejoStickers.url, bg: "#1a0b2e" },
  { title: "Menús en sticker + PVC", tag: "Restaurantes", type: "PVC", subtitle: "Menú rígido resistente al agua · diseño 100% personalizado", image: menuPvc.url, bg: "#111827" },
  { title: "Figuras de PVC + sticker", tag: "Publicidad", type: "PVC", subtitle: "Displays troquelados en PVC ideales para promoción y marca", image: figuraPvc.url, bg: "#1f2937", fit: "contain" },
  { title: "PVC de bienvenida para eventos", tag: "Eventos", type: "PVC", subtitle: "Cartel personalizado con nombre · diseño premium para cumpleaños y celebraciones", image: pvcGaby.url, bg: "#0a0a0a", fit: "contain" },
  { title: "Figuras troqueladas Sticker + PVC", tag: "Publicidad", type: "PVC", subtitle: "Disponibles en cualquier tamaño y personajes · ideal para promociones y eventos", image: figurasMundial.url, bg: "#e5e5e5", fit: "contain" },
  { title: "Banderines publicitarios", tag: "Publicidad", type: "Banderines", subtitle: "Disponibles de 3 y 5 metros · material impermeable · incluye base y contrapeso", image: banderines.url, bg: "#0a0a0a", fit: "contain" },
  { title: "Foto Álbum", tag: "Regalos", type: "Regalos", subtitle: "Álbum personalizado con el nombre y diseño que quieras · ideal para regalos, aniversarios y ocasiones especiales", image: albumMama2.url, bg: "#ec4899", fit: "contain" },
  { title: "Banner cruza calle", tag: "Publicidad", type: "Banderines", subtitle: "540 × 58 pulgadas · impresión de alta calidad · material resistente · incluye instalación", image: bannerCruzacalle.url, bg: "#0a0a0a", fit: "contain" },
  { title: "Variedad de banners", tag: "Publicidad", type: "Banderines", subtitle: "Banner cruza calle, mini banner de mesa, roll up y banner araña · cualquier tamaño", image: variedadBanners.url, bg: "#ffffff" },
  { title: "Grabado láser para Papá", tag: "Regalos", type: "Regalos", subtitle: "Billeteras, termos y tablas de cortar con grabado láser personalizado · regalo perfecto para Papá", image: grabadoPapa.url, bg: "#0a0a0a" },
  { title: "Camisetas personalizadas para Papá", tag: "Regalos", type: "Regalos", subtitle: "Camisetas con foto, nombre y diseño 100% personalizado · solo mándanos las fotos de Papá", image: camisetasPapa.url, bg: "#0a0a0a" },
  { title: "Botellas personalizadas", tag: "Regalos", type: "Regalos", subtitle: "Botellas con nombre o foto · etiquetas premium · ideal para regalos y ocasiones especiales", image: botellasPersonalizadas.url, bg: "#0a0a0a", fit: "contain" },
  { title: "Etiquetas para botellas en vinil", tag: "Regalos", type: "Stickers", subtitle: "Etiqueta completa en sticker vinil · personaliza cerveza o bebidas con nombre y diseño", image: etiquetasBotellas.url, bg: "#f5f5f5", fit: "contain" },
  { title: "Marcos con fotos impresas", tag: "Regalos", type: "Regalos", subtitle: "Set de marcos con tus fotos impresas · solo mándanos las fotos · regalo perfecto para toda ocasión", image: marcosFotos.url, bg: "#e5e5e5", fit: "contain" },
  { title: "Cadenas con grabado láser", tag: "Regalos", type: "Regalos", subtitle: "Dijes personalizados con foto o nombre · grabado láser en acero · solo mándanos tu foto", image: cadenasGrabado.url, bg: "#ffffff", fit: "contain" },
  { title: "Boxers personalizados para San Valentín", tag: "Regalos", type: "Regalos", subtitle: "Sublimación full color · diseños divertidos y románticos · solo mándanos tu foto o idea", image: boxersPersonalizados.url, bg: "#ffffff", fit: "contain" },
  { title: "Calsetas personalizadas con foto", tag: "Regalos", type: "Regalos", subtitle: "Sublimación full color · caras, nombres y corazones · solo mándanos tu foto", image: calsetasPersonalizadas.url, bg: "#ffffff", fit: "contain" },
  { title: "Retrateras con tu foto impresa", tag: "Regalos", type: "Regalos", subtitle: "Marcos de madera, metal y decorativos · impresión fotográfica de alta calidad · solo mándanos tu foto", image: retrateras.url, bg: "#ffffff", fit: "contain" },
  { title: "Rompecabezas personalizados", tag: "Regalos", type: "Regalos", subtitle: "Puzzle con tu foto favorita · varios tamaños y piezas · solo mándanos tu foto", image: rompecabezas.url, bg: "#ffffff", fit: "contain" },
  { title: "Impresión de fotos tipo Polaroid", tag: "Regalos", type: "Impresos", subtitle: "Fotos estilo Polaroid con acabado premium · ideal para regalos, decoración y recuerdos", image: polaroid.url, bg: "#f5f5f5", fit: "contain" },
  { title: "Rollos para facturación", tag: "Negocios", type: "Impresos", subtitle: "Rollos térmicos y químicos para impresoras de facturación · excelente precio y calidad", image: rollosFacturacion.url, bg: "#ffffff", fit: "contain" },
  { title: "Sublimación en tazas y termos", tag: "Regalos & Branding", type: "Regalos", subtitle: "Impresión duradera full color · tazas cerámicas, termos y botellas · personaliza con foto, logo o diseño", image: sublimacion.url, bg: "#f5efe7", fit: "contain" },
  { title: "Personaliza tus empaques", tag: "Empaques & Etiquetas", type: "Impresos", subtitle: "Tarjetas cliente frecuente · etiquetas para ropa y joyería · tarjetas de presentación con tu logo, foto y colores", image: empaques.url, bg: "#ffffff", fit: "contain" },
  { title: "Stickers para empaques", tag: "Empaques & Branding", type: "Stickers", subtitle: "Stickers troquelados para bolsas, vasos, cajas y contenedores kraft · cualquier forma, diseño y tamaño", image: stickersEmpaques.url, bg: "#ffffff", fit: "contain" },
  { title: "Etiquetas para bebidas", tag: "Etiquetas", type: "Stickers", subtitle: "Impresión de alta calidad · material impermeable · cualquier tamaño de botella · personalízalas con tu logo, foto y colores", image: etiquetasBebidas.url, bg: "#ffffff", fit: "contain" },
  { title: "Etiquetas para tus productos", tag: "Etiquetas", type: "Stickers", subtitle: "Troqueladas a la forma de tu preferencia · perfectas para salsas, bebidas y productos artesanales", image: etiquetasGuifity.url, bg: "#ffffff", fit: "contain" },
  { title: "Etiquetas para cumpleaños", tag: "Eventos", type: "Stickers", subtitle: "Etiquetas personalizadas para botellas de agua · monograma, nombre o versículo · perfectas para cumpleaños y celebraciones", image: etiquetasCumple.url, bg: "#ffffff", fit: "contain" },
];

const FILTERS: Array<"Todos" | ProjectType> = ["Todos", "Stickers", "Banderines", "Iron-ons", "PVC", "Impresos", "Rotulación", "Regalos"];

export function Portfolio() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");
  const [sort, setSort] = useState<"recientes" | "antiguos">("recientes");

  const visible = useMemo(() => {
    const filtered = filter === "Todos" ? projects : projects.filter((p) => p.type === filter);
    return sort === "recientes" ? [...filtered].reverse() : filtered;
  }, [filter, sort]);

  return (
    <section id="portafolio" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Portafolio</div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Proyectos que <span className="text-gradient-rainbow">mueven marcas</span>.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Desde emprendimientos locales hasta cadenas de restaurantes: producción impecable, plazos cumplidos.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f;
              const count = f === "Todos" ? projects.length : projects.filter((p) => p.type === f).length;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-foreground hover:border-foreground/40"
                  }`}
                >
                  {f} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Ordenar:</span>
            <div className="flex rounded-full border border-border p-0.5">
              {(["recientes", "antiguos"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`rounded-full px-3 py-1 font-semibold capitalize transition ${
                    sort === s ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s === "recientes" ? "Más recientes" : "Más antiguos"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Aún no hay proyectos en esta categoría.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => {
              const handleClick = () => {
                navigate({ to: "/cotizar", search: { producto: p.title } as never });
              };
              return (
                <div
                  key={p.title}
                  onClick={handleClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleClick();
                    }
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <div
                    className="relative aspect-[4/5] w-full overflow-hidden"
                    style={{ background: p.image ? p.bg : p.gradient }}
                  >
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute left-3 top-3">
                      <div className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur shadow-sm">
                        #{String(i + 1).padStart(2, "0")} · {p.tag}
                      </div>
                    </div>
                    <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold text-background shadow-sm">
                        Cotizar →
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{p.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
