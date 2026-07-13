import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import hondurasFlag from "@/assets/honduras-flag.png.asset.json";
import { whatsappLink } from "@/data/catalog";

/* Tiny decorative shapes floating around the hero — pure SVG, brand palette */
type ShapeKind = "cross" | "sparkle" | "dot" | "ring" | "dash" | "diamond";
type FloatingShape = {
  kind: ShapeKind;
  top: string;
  left: string;
  size: number;
  color: string;
  dur: string;
  delay: string;
  dx: string;
  dy: string;
  rot: string;
  anim: "drift" | "twinkle";
};

const FLOATING_SHAPES: FloatingShape[] = [
  { kind: "cross",   top: "12%", left: "6%",  size: 22, color: "var(--brand-pink)",   dur: "7s",  delay: "0s",   dx: "12px",  dy: "-16px", rot: "20deg",  anim: "drift" },
  { kind: "dot",     top: "18%", left: "22%", size: 14, color: "var(--brand-orange)", dur: "6s",  delay: "1.2s", dx: "-10px", dy: "12px",  rot: "0deg",   anim: "drift" },
  { kind: "sparkle", top: "8%",  left: "48%", size: 20, color: "var(--brand-violet)", dur: "5s",  delay: "0.6s", dx: "0px",   dy: "0px",   rot: "0deg",   anim: "twinkle" },
  { kind: "diamond", top: "22%", left: "58%", size: 14, color: "var(--brand-indigo)", dur: "6.5s",delay: "2s",   dx: "8px",   dy: "-10px", rot: "-15deg", anim: "drift" },
  { kind: "dash",    top: "14%", left: "82%", size: 34, color: "var(--brand-blue)",   dur: "8s",  delay: "0.4s", dx: "-14px", dy: "8px",   rot: "6deg",   anim: "drift" },
  { kind: "sparkle", top: "38%", left: "38%", size: 16, color: "var(--brand-pink)",   dur: "4.5s",delay: "1.8s", dx: "0px",   dy: "0px",   rot: "0deg",   anim: "twinkle" },
  { kind: "cross",   top: "44%", left: "70%", size: 18, color: "var(--brand-indigo)", dur: "6s",  delay: "0.9s", dx: "-8px",  dy: "-12px", rot: "-20deg", anim: "drift" },
  { kind: "ring",    top: "36%", left: "88%", size: 18, color: "var(--brand-blue)",   dur: "7s",  delay: "1.4s", dx: "10px",  dy: "10px",  rot: "0deg",   anim: "drift" },
  { kind: "dot",     top: "72%", left: "16%", size: 10, color: "var(--brand-pink)",   dur: "5.5s",delay: "0.2s", dx: "12px",  dy: "-10px", rot: "0deg",   anim: "drift" },
  { kind: "dash",    top: "82%", left: "5%",  size: 30, color: "var(--brand-pink)",   dur: "7.5s",delay: "1.6s", dx: "14px",  dy: "-8px",  rot: "-4deg",  anim: "drift" },
  { kind: "diamond", top: "84%", left: "42%", size: 18, color: "var(--brand-violet)", dur: "6s",  delay: "0.5s", dx: "-6px",  dy: "-14px", rot: "12deg",  anim: "drift" },
  { kind: "dash",    top: "80%", left: "62%", size: 32, color: "var(--brand-violet)", dur: "7s",  delay: "2.1s", dx: "-12px", dy: "6px",   rot: "4deg",   anim: "drift" },
  { kind: "sparkle", top: "84%", left: "84%", size: 18, color: "var(--brand-blue)",   dur: "5s",  delay: "1.1s", dx: "0px",   dy: "0px",   rot: "0deg",   anim: "twinkle" },
  { kind: "diamond", top: "70%", left: "94%", size: 10, color: "var(--brand-cyan, var(--brand-blue))", dur: "6s", delay: "0.8s", dx: "-8px", dy: "-10px", rot: "18deg", anim: "drift" },
];

function ShapeGlyph({ kind, size, color }: { kind: ShapeKind; size: number; color: string }) {
  const s = size;
  switch (kind) {
    case "cross":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <path d="M12 4v16M4 12h16" />
        </svg>
      );
    case "sparkle":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round">
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        </svg>
      );
    case "dot":
      return <span style={{ width: s, height: s, borderRadius: "9999px", background: color, display: "block" }} />;
    case "ring":
      return (
        <span
          style={{
            width: s, height: s, borderRadius: "9999px",
            border: `${Math.max(2, s * 0.18)}px solid ${color}`,
            display: "block",
          }}
        />
      );
    case "dash":
      return (
        <svg width={s} height={s * 0.42} viewBox="0 0 40 18" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round">
          <path d="M2 6h14M22 6h16M6 14h10M22 14h12" />
        </svg>
      );
    case "diamond":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2 L15 12 L12 22 L9 12 Z" />
          <path d="M2 12 L12 9 L22 12 L12 15 Z" />
        </svg>
      );
  }
}

function HeroFloatingShapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {FLOATING_SHAPES.map((sh, i) => (
        <span
          key={i}
          className={sh.anim === "twinkle" ? "animate-float-twinkle" : "animate-float-drift"}
          style={{
            position: "absolute",
            top: sh.top,
            left: sh.left,
            ["--dur" as string]: sh.dur,
            ["--delay" as string]: sh.delay,
            ["--dx" as string]: sh.dx,
            ["--dy" as string]: sh.dy,
            ["--rot" as string]: sh.rot,
            willChange: "transform, opacity",
            display: "inline-flex",
          }}
        >
          <ShapeGlyph kind={sh.kind} size={sh.size} color={sh.color} />
        </span>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-rainbow opacity-20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:22px_22px]" />
      </div>

      <HeroFloatingShapes />


      <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
        <div className="animate-fade-up mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--brand-violet)" }} />
            Imprenta profesional · Honduras
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Si podés{" "}
            <span className="text-gradient-rainbow animate-rainbow-shimmer">imaginarlo</span>,
            <br className="hidden sm:block" /> nosotros lo creamos.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Impresión, stickers, banners, grabado láser, sublimación, textiles, eventos y branding
            corporativo. Todo <strong className="text-foreground">100% personalizable</strong> en La Ceiba, Honduras.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-cta animate-rainbow-shimmer px-7 py-3.5 text-base font-semibold text-white shadow-elegant transition hover:scale-105"
            >
              Ver todos los servicios <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink("Hola Idealo, quiero cotizar un producto.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/10 bg-card px-6 py-3.5 text-sm font-semibold transition hover:border-foreground/30"
            >
              <MessageCircle className="h-4 w-4" /> Cotizar por WhatsApp
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <img
                src={hondurasFlag.url}
                alt="Bandera de Honduras"
                className="h-5 w-auto shrink-0"
              />
              +200 marcas hondureñas
            </div>
            <div>Entrega nacional</div>
            <div>Precios en Lempiras</div>
          </div>
        </div>

        {/* Rainbow bar */}
        <div className="mt-16 h-1.5 w-full rounded-full bg-gradient-rainbow animate-rainbow-shimmer" />
      </div>
    </section>
  );
}
