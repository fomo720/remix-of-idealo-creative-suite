import menus from "@/assets/portfolio-menus.jpg.asset.json";
import stickersMarca from "@/assets/portfolio-stickers-marca.jpg.asset.json";
import carpetas from "@/assets/portfolio-carpetas.jpg.asset.json";
import troquelados from "@/assets/portfolio-troquelados.jpg.asset.json";
import banner from "@/assets/portfolio-banner.jpg.asset.json";
import microperforado from "@/assets/portfolio-microperforado.jpg.asset.json";
import rotulacion from "@/assets/portfolio-rotulacion.jpg.asset.json";
import tarjetas from "@/assets/portfolio-tarjetas.jpg.asset.json";

type Project = {
  title: string;
  tag: string;
  subtitle: string;
  image?: string;
  gradient?: string;
  bg?: string;
  action?: "die-cut";
};

const projects: Project[] = [
  {
    title: "Menús para restaurantes",
    tag: "Restaurantes",
    subtitle: "Impresión doble lado · espiral de metal · laminado",
    image: menus.url,
    bg: "#d9d9d9",
  },
  {
    title: "Stickers de marca",
    tag: "Emprendedores",
    subtitle: "Impresión de alta calidad · material impermeable",
    image: stickersMarca.url,
    bg: "#1a1410",
  },
  {
    title: "Carpetas corporativas",
    tag: "Corporativo",
    subtitle: "Cartón laminado · doble compartimiento",
    image: carpetas.url,
    bg: "#ffffff",
  },
  {
    title: "Stickers troquelados",
    tag: "Personalizados",
    subtitle: "Cualquier forma, diseño y tamaño",
    image: troquelados.url,
    bg: "#fafafa",
    action: "die-cut" as const,
  },
  {
    title: "Banners Roll Up",
    tag: "Publicidad",
    subtitle: "33.5 × 78.7 pulgadas · incluye araña y estuche",
    image: banner.url,
    bg: "#ffffff",
  },
  {
    title: "Microperforado",
    tag: "Fachadas",
    subtitle: "Vinil para vidrieras y locales comerciales",
    image: microperforado.url,
    bg: "#5b6672",
  },
  {
    title: "Rotulación industrial",
    tag: "Señalética",
    subtitle: "Señales de seguridad y rotulación empresarial",
    image: rotulacion.url,
    bg: "#1f4a7a",
  },
  {
    title: "Tarjetas de presentación profesionales",
    tag: "Branding",
    subtitle: "Papel premium · acabados brillantes o mate",
    image: tarjetas.url,
    bg: "#eaf4fb",
  },
];

export function Portfolio() {
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const clickable = p.action === "die-cut";
            const handleClick = () => {
              if (!clickable) return;
              window.dispatchEvent(
                new CustomEvent("idealo:configure", {
                  detail: { category: "stickers", cut: "die-cut", step: 3 },
                }),
              );
              document.getElementById("personalizar")?.scrollIntoView({ behavior: "smooth", block: "start" });
            };
            return (
            <div
              key={p.title}
              onClick={clickable ? handleClick : undefined}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onKeyDown={clickable ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } } : undefined}
              className={`group relative overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant ${clickable ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground" : ""}`}
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
                {clickable && (
                  <div className="absolute right-3 top-3">
                    <div className="rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold text-background shadow-sm">
                      Personalizar →
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.subtitle}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
