import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { SkeletonImage } from "@/components/SkeletonImage";
import { useQuote } from "@/context/QuoteContext";
import { slugify } from "@/lib/portfolio-data";

import troquelados from "@/assets/portfolio-troquelados.jpg.asset.json";
import etiquetasFoil from "@/assets/portfolio-etiquetas-foil.png.asset.json";
import stickersMarca from "@/assets/portfolio-stickers-marca.jpg.asset.json";
import banner from "@/assets/portfolio-banner.jpg.asset.json";
import camisetasEstampadas from "@/assets/portfolio-camisetas-estampadas.png.asset.json";
import figuraPvc from "@/assets/portfolio-figura-pvc.jpg.asset.json";
import tarjetas from "@/assets/portfolio-tarjetas.jpg.asset.json";
import menus from "@/assets/portfolio-menus.jpg.asset.json";
import microperforado from "@/assets/portfolio-microperforado.jpg.asset.json";

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

export function FeaturedProducts() {
  const { addItem, removeItem, hasItem } = useQuote();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const handleToggle = (p: (typeof products)[number]) => {
    const slug = slugify(p.title);
    if (hasItem(slug)) {
      removeItem(slug);
      setJustAdded(null);
      return;
    }
    addItem({ slug, title: p.title, image: p.image });
    setJustAdded(slug);
    setTimeout(() => {
      setJustAdded((cur) => (cur === slug ? null : cur));
    }, 1500);
  };

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
            Agrega los productos que te interesen a tu cotización y envíalos todos juntos por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const slug = slugify(p.title);
            const added = hasItem(slug);
            const showJustAdded = justAdded === slug;
            return (
              <div
                key={p.title}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.15)]"
              >
                <SkeletonImage
                  src={p.image}
                  alt={p.title}
                  aspect="aspect-[4/5]"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex-1 min-h-[3.5rem]">
                    <h3 className="text-base font-bold leading-tight line-clamp-1">{p.title}</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{p.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle(p)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
                    style={
                      added || showJustAdded
                        ? {
                            background: "#22c55e",
                            borderColor: "#22c55e",
                            color: "white",
                          }
                        : {
                            background: "white",
                            borderColor: "rgba(0,0,0,0.1)",
                            color: "var(--foreground)",
                          }
                    }
                  >
                    {showJustAdded ? (
                      <>
                        <Check className="h-4 w-4" /> ¡Agregado!
                      </>
                    ) : added ? (
                      <>
                        <Check className="h-4 w-4" /> Agregado
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" /> Agregar a cotización
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>


        <div className="mt-16 flex justify-center">
          <a
            href="/portafolio"
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl sm:text-lg"
            style={{ background: "linear-gradient(135deg, var(--brand-magenta), var(--brand-cyan))" }}
          >
            Explorar portafolio completo
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
