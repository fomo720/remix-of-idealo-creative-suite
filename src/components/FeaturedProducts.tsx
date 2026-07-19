import { Link } from "@tanstack/react-router";
import troquelados from "@/assets/portfolio-troquelados.jpg.asset.json";
import etiquetasFoil from "@/assets/portfolio-etiquetas-foil.png.asset.json";
import stickersMarca from "@/assets/portfolio-stickers-marca.jpg.asset.json";
import banner from "@/assets/portfolio-banner.jpg.asset.json";
import camisetasEstampadas from "@/assets/portfolio-camisetas-estampadas.png.asset.json";
import figuraPvc from "@/assets/portfolio-figura-pvc.jpg.asset.json";
import tarjetas from "@/assets/portfolio-tarjetas.jpg.asset.json";
import menus from "@/assets/portfolio-menus.jpg.asset.json";
import microperforado from "@/assets/portfolio-microperforado.jpg.asset.json";

const WA = "50433635666";

const products = [
  { title: "Stickers troquelados", subtitle: "Cualquier forma y tamaño", image: troquelados.url },
  { title: "Etiquetas con foil metálico", subtitle: "Dorado, plateado u holográfico", image: etiquetasFoil.url },
  { title: "Etiquetas para tus productos", subtitle: "Vinil impermeable full color", image: stickersMarca.url },
  { title: "Banner publicitario", subtitle: "Roll up profesional con estuche", image: banner.url },
  { title: "Camisetas estampadas", subtitle: "Personalizadas full color", image: camisetasEstampadas.url },
  { title: "Figuras troqueladas PVC", subtitle: "Corte a medida en PVC rígido", image: figuraPvc.url },
  { title: "Tarjetas de presentación", subtitle: "Papel premium · acabado profesional", image: tarjetas.url },
  { title: "Menús para restaurantes", subtitle: "Laminados con espiral metálica", image: menus.url },
  { title: "Microperforado", subtitle: "Vinil para vidrieras y locales", image: microperforado.url },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.02 0C5.42 0 .06 5.36.06 11.96c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.62a11.95 11.95 0 0 0 5.82 1.48h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.19-1.24-6.19-3.47-8.42ZM12.03 21.8h-.01a9.85 9.85 0 0 1-5.02-1.38l-.36-.21-3.68.96.98-3.59-.23-.37a9.86 9.86 0 1 1 18.29-5.25c0 5.44-4.43 9.84-9.97 9.84Zm5.4-7.37c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5h-.57c-.2 0-.51.07-.78.37s-1.03 1-1.03 2.45c0 1.45 1.06 2.85 1.2 3.05.15.2 2.08 3.17 5.04 4.45.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.12.57-.09 1.75-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function FeaturedProducts() {
  return (
    <section id="productos" className="bg-[#f8f9fa] py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--brand-magenta)" }}>
            Productos destacados
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Lo más pedido de <span style={{ color: "var(--brand-cyan)" }}>nuestro catálogo</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Cotiza directo por WhatsApp. Te guiamos con materiales, tamaños y tiempos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const msg = encodeURIComponent(`Hola Idealo, quiero personalizar: ${p.title}. ¿Me pueden asesorar?`);
            return (
              <div
                key={p.title}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.15)]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f5f5f5]">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex-1 min-h-[3.5rem]">
                    <h3 className="text-base font-bold leading-tight line-clamp-1">{p.title}</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{p.subtitle}</p>
                  </div>
                  <a
                    href={`https://wa.me/${WA}?text=${msg}`}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe57] hover:shadow-lg"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Personalizar ahora
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to="/portafolio"
            className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl sm:text-lg"
            style={{ background: "linear-gradient(135deg, var(--brand-magenta), var(--brand-cyan))" }}
          >
            Explorar portafolio completo
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
