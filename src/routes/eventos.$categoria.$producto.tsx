import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Upload, MessageCircle, Check } from "lucide-react";
import pvcHero from "@/assets/evt-pvc-jessie.jpg.asset.json";
import etiquetaHero from "@/assets/evt-etiqueta-botella.jpg.asset.json";
import menuHero from "@/assets/evt-menu.jpg.asset.json";
import mesaHero from "@/assets/evt-mesa.jpg.asset.json";
import cajitaHero from "@/assets/evt-cajita.jpg.asset.json";
import bannerHero from "@/assets/evt-banner.jpg.asset.json";


export const Route = createFileRoute("/eventos/$categoria/$producto")({
  loader: ({ params }) => {
    const prod = PRODUCT_CONFIG[params.producto];
    if (!prod) throw notFound();
    return { prod, categoria: params.categoria, producto: params.producto };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Producto no encontrado" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${loaderData.prod.title} — Diseñar | Idealo` },
        { name: "description", content: loaderData.prod.desc },
      ],
    };
  },
  component: ProductoDesigner,
  notFoundComponent: () => (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <p className="text-muted-foreground">Producto no disponible.</p>
      <Link to="/eventos" className="mt-4 inline-block underline">Volver a Eventos</Link>
    </div>
  ),
});

type SizeOpt = { label: string; dim: string; note?: string };
type Producto = {
  title: string;
  desc: string;
  emoji: string;
  hero?: string;
  sizes: SizeOpt[];
  styles: string[];
  askText?: { label: string; placeholder: string }[];
};


const PRODUCT_CONFIG: Record<string, Producto> = {
  "pvc-bienvenida": {
    title: "PVC de Bienvenida",
    desc: "Letrero rígido con el nombre del cumpleañero y frase de bienvenida.",
    emoji: "🎉",
    hero: pvcHero.url,

    sizes: [
      { label: "Pequeño", dim: "40 × 60 cm", note: "Para mesa de entrada" },
      { label: "Mediano", dim: "60 × 90 cm", note: "El más popular" },
      { label: "Grande", dim: "90 × 120 cm", note: "Piso, con caballete" },
      { label: "Personalizado", dim: "A medida" },
    ],
    styles: ["Acuarela", "Minimalista", "Temático", "Elegante dorado"],
    askText: [
      { label: "Nombre del cumpleañero", placeholder: "Ej: Jessie" },
      { label: "Frase (opcional)", placeholder: "Ej: Welcome to Jessie's Birthday Party" },
    ],
  },
  "banner-parador": {
    title: "Banner Parador",
    desc: "Backdrop vertical de gran formato para foto y bienvenida.",
    emoji: "🚩",
    hero: bannerHero.url,

    sizes: [
      { label: "1.5 × 2 m", dim: "150 × 200 cm" },
      { label: "2 × 2.5 m", dim: "200 × 250 cm", note: "El más pedido" },
      { label: "2 × 3 m", dim: "200 × 300 cm" },
    ],
    styles: ["Foto de fondo", "Ilustrado", "Tipográfico", "Con marco temático"],
    askText: [{ label: "Título principal", placeholder: "Ej: Feliz Cumpleaños" }],
  },
  "cake-topper": {
    title: "Cake Topper",
    desc: "Decoración troquelada que se coloca sobre el pastel.",
    emoji: "🍰",
    sizes: [
      { label: "Chico", dim: "10 cm" },
      { label: "Mediano", dim: "15 cm" },
      { label: "Grande", dim: "20 cm" },
    ],
    styles: ["Nombre en cursiva", "Corona", "Número de edad", "Silueta temática"],
    askText: [
      { label: "Nombre / número", placeholder: "Ej: Sofía · 5" },
    ],
  },
  "menu": {
    title: "Menú",
    desc: "Menú impreso individual para cada invitado.",
    emoji: "📖",
    hero: menuHero.url,

    sizes: [
      { label: "A6", dim: "10.5 × 14.8 cm" },
      { label: "A5", dim: "14.8 × 21 cm", note: "El más común" },
      { label: "Rectangular largo", dim: "10 × 25 cm" },
    ],
    styles: ["Elegante", "Divertido", "Minimalista", "Ilustrado"],
    askText: [{ label: "Platos del menú", placeholder: "Entrada, plato fuerte, postre..." }],
  },
  "cajitas": {
    title: "Cajitas",
    desc: "Cajitas para dulces, sorpresas o regalos temáticos.",
    emoji: "🎁",
    hero: cajitaHero.url,

    sizes: [
      { label: "Chica", dim: "8 × 8 × 8 cm" },
      { label: "Mediana", dim: "12 × 12 × 12 cm" },
      { label: "Sorpresa alargada", dim: "20 × 8 × 8 cm" },
    ],
    styles: ["Kraft con sticker", "Full color", "Con lazo", "Troquelada temática"],
    askText: [{ label: "Cantidad estimada", placeholder: "Ej: 30 cajitas" }],
  },
  "etiquetas-botellas": {
    title: "Etiquetas para Botellas",
    desc: "Etiquetas adhesivas para agua, vino o licores.",
    emoji: "🍾",
    hero: etiquetaHero.url,

    sizes: [
      { label: "Agua 600ml", dim: "18 × 6 cm" },
      { label: "Vino", dim: "10 × 8 cm" },
      { label: "Champagne", dim: "12 × 9 cm" },
    ],
    styles: ["Foto del festejado", "Temático", "Elegante", "Divertido"],
    askText: [{ label: "Texto de la etiqueta", placeholder: "Ej: XV años de Camila" }],
  },
  "numero-mesa": {
    title: "Número de Mesa",
    desc: "Señalética numerada para identificar cada mesa.",
    emoji: "🔢",
    hero: mesaHero.url,

    sizes: [
      { label: "Tarjeta", dim: "10 × 15 cm", note: "Sobre la mesa" },
      { label: "PVC con base", dim: "15 × 20 cm" },
      { label: "Acrílico grabado", dim: "15 × 15 cm" },
    ],
    styles: ["Números grandes", "Con nombre del invitado", "Temático", "Elegante"],
    askText: [{ label: "Cantidad de mesas", placeholder: "Ej: 12" }],
  },
};

function ProductoDesigner() {
  const { prod, categoria } = Route.useLoaderData();
  const [sizeIdx, setSizeIdx] = useState(1 < prod.sizes.length ? 1 : 0);
  const [styleIdx, setStyleIdx] = useState(0);
  const [text, setText] = useState<Record<number, string>>({});
  const [file, setFile] = useState<string | null>(null);

  const size = prod.sizes[sizeIdx];
  const style = prod.styles[styleIdx];

  const summary = [
    `Producto: ${prod.title}`,
    `Tamaño: ${size.label} (${size.dim})`,
    `Estilo: ${style}`,
    ...(prod.askText ?? []).map((f: {label:string;placeholder:string}, i: number) => `${f.label}: ${text[i] || "-"}`),
  ].join("\n");

  const waMsg = encodeURIComponent(`Hola Idealo, quiero cotizar:\n\n${summary}`);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-pink-50 via-orange-50 to-rose-50" />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Link
          to="/eventos/$categoria"
          params={{ categoria }}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a productos
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-5xl">{prod.emoji}</div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{prod.title}</h1>
            <p className="mt-1 text-muted-foreground">{prod.desc}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Preview */}
          <div className="sticky top-24 self-start rounded-3xl border border-border bg-card p-6 shadow-elegant">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Vista previa</p>
            <div className="relative mt-4 flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 via-white to-orange-100">
              {file ? (
                <img src={file} alt="Diseño" className="max-h-full max-w-full object-contain" />
              ) : prod.hero ? (
                <img
                  src={prod.hero}
                  alt={prod.title}
                  className="h-full w-full object-cover"
                  style={{ transform: "scale(2)", transformOrigin: "center" }}
                />
              ) : (
                <div className="text-center">
                  <div className="text-8xl">{prod.emoji}</div>
                  <p className="mt-4 text-xl font-bold">{text[0] || "Tu diseño aquí"}</p>
                  {text[1] && <p className="mt-2 text-sm text-muted-foreground">{text[1]}</p>}
                  <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                    {size.label} · {size.dim} · {style}
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Controls */}
          <div className="space-y-8">
            <Section title="1 · Elegí el tamaño">
              <div className="grid gap-3 sm:grid-cols-2">
                {prod.sizes.map((s: SizeOpt, i: number) => (
                  <button
                    key={s.label}
                    onClick={() => setSizeIdx(i)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      i === sizeIdx ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{s.label}</span>
                      {i === sizeIdx && <Check className="h-4 w-4" />}
                    </div>
                    <p className={`mt-1 text-sm ${i === sizeIdx ? "opacity-80" : "text-muted-foreground"}`}>{s.dim}</p>
                    {s.note && <p className={`mt-1 text-xs ${i === sizeIdx ? "opacity-70" : "text-muted-foreground"}`}>{s.note}</p>}
                  </button>
                ))}
              </div>
            </Section>

            <Section title="2 · Elegí el estilo">
              <div className="flex flex-wrap gap-2">
                {prod.styles.map((s: string, i: number) => (
                  <button
                    key={s}
                    onClick={() => setStyleIdx(i)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      i === styleIdx ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Section>

            {prod.askText && (
              <Section title="3 · Personalizá el texto">
                <div className="space-y-3">
                  {prod.askText.map((f: {label:string;placeholder:string}, i: number) => (
                    <div key={i}>
                      <label className="text-sm font-medium">{f.label}</label>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        value={text[i] || ""}
                        onChange={(e) => setText({ ...text, [i]: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-foreground"
                      />
                    </div>
                  ))}
                </div>
              </Section>
            )}

            <Section title="4 · Subí una imagen o logo (opcional)">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-6 text-sm font-medium text-muted-foreground transition hover:border-foreground/40 hover:text-foreground">
                <Upload className="h-4 w-4" />
                {file ? "Cambiar archivo" : "Seleccionar archivo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setFile(URL.createObjectURL(f));
                  }}
                />
              </label>
            </Section>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/50400000000?text=${waMsg}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-cta animate-rainbow-shimmer px-6 py-3.5 text-sm font-semibold text-white shadow-elegant transition hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> Enviar cotización por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
