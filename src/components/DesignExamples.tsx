import { Link } from "@tanstack/react-router";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { projects, type ProjectType } from "@/lib/portfolio-data";
import { SkeletonImage } from "@/components/SkeletonImage";

const WA = "50433635666";

const TYPE_LABELS: Record<ProjectType, string> = {
  Stickers: "stickers",
  Banderines: "banderines",
  "Iron-ons": "textiles",
  PVC: "figuras PVC",
  Impresos: "impresos y papelería",
  Libretas: "libretas",
  Rotulación: "rotulación",
  Regalos: "regalos personalizados",
  Servicios: "servicios",
};

export function DesignExamples({ type }: { type: ProjectType }) {
  const label = TYPE_LABELS[type] ?? type.toLowerCase();
  const items = projects.filter((p) => p.type === type).slice(0, 6);
  if (items.length === 0) return null;

  return (
    <div className="mt-16 rounded-3xl border-2 border-dashed border-border bg-gradient-to-br from-[color:var(--brand-magenta)]/5 to-[color:var(--brand-cyan)]/5 p-6 sm:p-10">
      <div className="mx-auto max-w-3xl text-center">
        <div
          className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
          style={{
            color: "var(--brand-magenta)",
            background: "color-mix(in oklab, var(--brand-magenta) 10%, white)",
            border: "1px solid color-mix(in oklab, var(--brand-magenta) 25%, transparent)",
          }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Lo adaptamos a TU MARCA
        </div>
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Elegí un estilo y{" "}
          <span style={{ color: "var(--brand-magenta)" }}>nosotros lo adaptamos</span>
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Estos son {label} que ya hemos producido. Escogé el estilo que más te
          guste y lo adaptamos con tu logo, colores y contenido — vos decís
          "quiero algo así, pero con mi marca" y nosotros nos encargamos.
        </p>

      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => {
          const msg = encodeURIComponent(
            `Hola Idealo 👋 Quiero cotizar YA algo parecido a: *${p.title}* (${p.tag}). ¿Me pueden ayudar?`,
          );
          const waHref = `https://wa.me/${WA}?text=${msg}`;
          return (
            <div
              key={p.slug}
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.15)]"
            >
              <Link
                to="/portafolio/$slug"
                params={{ slug: p.slug }}
                className="relative block aspect-[4/5] w-full overflow-hidden bg-[#f5f5f5]"
              >
                {p.image ? (
                  <SkeletonImage
                    src={p.image}
                    alt={p.title}
                    aspect="aspect-[4/5]"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--brand-magenta)" }}
                >
                  {p.tag}
                </div>
                <h4 className="text-sm font-bold leading-tight line-clamp-1">{p.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{p.subtitle}</p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe57] hover:shadow-lg"
                >
                  <MessageCircle className="h-4 w-4" />
                  Cotizar YA por WhatsApp
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={`/portafolio?tipo=${encodeURIComponent(type)}`}
          className="group inline-flex items-center gap-3 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl sm:text-base"
          style={{ background: "linear-gradient(135deg, var(--brand-magenta), var(--brand-cyan))" }}
        >
          Ver todo lo que hemos hecho en {label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
