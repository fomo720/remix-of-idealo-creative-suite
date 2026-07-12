import { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload, Check, ArrowRight, Sparkles, Package, Layers, Scissors,
  FileImage, ImagePlus, Circle, Square, RectangleHorizontal, Squircle,
  Cloud, Heart, AlignVerticalJustifyCenter, AlignHorizontalJustifyCenter,
  Copy, Trash2, ZoomIn, Sun, Contrast, Info, ShieldCheck, Droplets, MousePointer2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type Category = "stickers" | "iron-ons";
type CutShape = "die-cut" | "kiss-cut" | "sheets" | "rolls";
type Material = "vinyl-white" | "vinyl-clear" | "semi-gloss" | "matte";
type StickerShape = "circle" | "square" | "rectangle" | "rounded" | "cloud" | "heart";

const cuts: { id: CutShape; name: string; desc: string; accent: string }[] = [
  { id: "die-cut", name: "Die-Cut", desc: "Corte individual exacto al contorno", accent: "var(--brand-red)" },
  { id: "kiss-cut", name: "Kiss-Cut", desc: "Corte sobre el papel base", accent: "var(--brand-orange)" },
  { id: "sheets", name: "Hojas de Stickers", desc: "Varios diseños por hoja", accent: "var(--brand-green)" },
  { id: "rolls", name: "Rollos", desc: "Ideal para producción a escala", accent: "var(--brand-blue)" },
];

const materials: {
  id: Material; name: string; desc: string; priceFactor: number; swatch: string;
  finish: string; advantages: string[]; useCase: string;
}[] = [
  {
    id: "vinyl-white", name: "Vinil Blanco Removible",
    desc: "Premium · Impermeable · Duradero", priceFactor: 1.15, swatch: "#ffffff",
    finish: "Semi-Gloss Premium",
    advantages: ["Resistente al agua y sol", "Removible sin residuos", "Colores vibrantes de alta fidelidad"],
    useCase: "Ideal para exteriores y etiquetado de productos de restaurantes.",
  },
  {
    id: "vinyl-clear", name: "Vinil Transparente",
    desc: "Efecto sin fondo, look profesional", priceFactor: 1.25, swatch: "linear-gradient(135deg,#e0f2fe,#fce7f3)",
    finish: "Cristal Transparente",
    advantages: ["Fondo invisible sobre cualquier superficie", "Resistente a la intemperie", "Acabado premium tipo cristal"],
    useCase: "Ideal para escaparates, botellas de vidrio y branding elegante.",
  },
  {
    id: "semi-gloss", name: "Papel Semi-Gloss",
    desc: "Económico, brillo sutil", priceFactor: 0.85, swatch: "#f5f5f4",
    finish: "Papel Semi-Brillante",
    advantages: ["Costo accesible para tirajes grandes", "Impresión de alta definición", "Brillo sutil elegante"],
    useCase: "Ideal para promociones, empaques y campañas de corto plazo (uso en interior).",
  },
  {
    id: "matte", name: "Acabado Mate Elegante",
    desc: "Textura mate premium, sin reflejos", priceFactor: 1.1, swatch: "#e7e5e4",
    finish: "Mate Ultra Suave",
    advantages: ["Sin reflejos ni brillos", "Textura sofisticada al tacto", "Fotografiable sin destellos"],
    useCase: "Ideal para marcas premium, packaging boutique y branding editorial.",
  },
];

type ShapeItem = {
  id: StickerShape; name: string; icon: React.ReactNode; aspect: number;
  clip?: string; radius?: string; path?: string; viewBox?: string;
};

const CLOUD_PATH = "M 60 90 C 20 90 10 55 40 45 C 30 15 80 5 95 30 C 120 5 175 20 170 55 C 210 55 210 100 170 100 C 155 130 100 130 90 105 C 75 125 40 120 60 90 Z";
const HEART_PATH = "M 100 180 L 30 110 C 5 85 5 45 35 25 C 60 8 90 20 100 45 C 110 20 140 8 165 25 C 195 45 195 85 170 110 Z";

const shapes: ShapeItem[] = [
  { id: "circle", name: "Círculo", icon: <Circle className="h-5 w-5" />, aspect: 1, radius: "9999px" },
  { id: "square", name: "Cuadrado", icon: <Square className="h-5 w-5" />, aspect: 1, radius: "0px" },
  { id: "rectangle", name: "Rectángulo", icon: <RectangleHorizontal className="h-5 w-5" />, aspect: 1.6, radius: "0px" },
  { id: "rounded", name: "Esq. Redondeada", icon: <Squircle className="h-5 w-5" />, aspect: 1, radius: "28px" },
  {
    id: "cloud", name: "Nube (Die-Cut)", icon: <Cloud className="h-5 w-5" />, aspect: 1.4,
    clip: `path('${CLOUD_PATH}')`, path: CLOUD_PATH, viewBox: "0 0 220 135",
  },
  {
    id: "heart", name: "Corazón", icon: <Heart className="h-5 w-5" />, aspect: 1,
    clip: `path('${HEART_PATH}')`, path: HEART_PATH, viewBox: "0 0 200 185",
  },
];

const sizePresets = [
  { w: 2, h: 2, label: '2" x 2"', hint: "Logos pequeños en empaques" },
  { w: 3, h: 3, label: '3" x 3"', hint: "Estándar laptops y termos" },
  { w: 4, h: 4, label: '4" x 4"', hint: "Branding visible y ventanas" },
  { w: 5, h: 5, label: '5" x 5"', hint: "Tamaño grande exteriores" },
];

const presetArts = ["🌈", "⚡", "🔥", "⭐", "🎨", "🚀", "🍕", "🌮"];

function currency(n: number) {
  return "L. " + n.toLocaleString("es-HN", { maximumFractionDigits: 0 });
}

export function Configurator() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [cut, setCut] = useState<CutShape | null>(null);
  const [material, setMaterial] = useState<Material | null>(null);
  const [shape, setShape] = useState<StickerShape>("circle");
  const [preset, setPreset] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<string | null>(null);

  // size
  const [width, setWidth] = useState("3");
  const [height, setHeight] = useState("3");
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [sizeMode, setSizeMode] = useState<"preset" | "custom">("preset");
  const [activePreset, setActivePreset] = useState<number>(1); // index into sizePresets

  const [qty, setQty] = useState(100);
  const [notes, setNotes] = useState("");

  // image toolbox
  const [scale, setScale] = useState(100);       // 30-250%
  const [offsetX, setOffsetX] = useState(0);     // % of container (-50..50)
  const [offsetY, setOffsetY] = useState(0);
  const [contrast, setContrast] = useState(100); // %
  const [brightness, setBrightness] = useState(100);
  const [duplicated, setDuplicated] = useState(false);
  const [selected, setSelected] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const materialData = materials.find((m) => m.id === material);
  const shapeData = shapes.find((s) => s.id === shape)!;

  const bulkFactor = useMemo(() => {
    if (qty >= 500) return 0.16; // 84% off
    if (qty >= 250) return 0.20; // 80% off
    if (qty >= 100) return 0.25; // 75% off
    if (qty >= 50)  return 0.30; // 70% off
    if (qty >= 25)  return 0.63; // 37% off
    return 1;
  }, [qty]);

  const price = useMemo(() => {
    const base = 8;
    const w = parseFloat(width || "1");
    const h = parseFloat(height || "1");
    const area = Math.max(1, (w * h) / 4);
    const factor = materialData?.priceFactor ?? 1;
    return Math.round(base * area * factor * bulkFactor * qty);
  }, [width, height, qty, materialData, bulkFactor]);

  const goTo = (s: number) => setStep(s);

  const handleFile = (f: File | null) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setUploaded(url);
    setPreset(null);
    resetImageTools();
  };

  const resetImageTools = () => {
    setScale(100); setOffsetX(0); setOffsetY(0);
    setContrast(100); setBrightness(100); setDuplicated(false);
  };

  const clearImage = () => {
    setUploaded(null); setPreset(null); resetImageTools();
    if (fileRef.current) fileRef.current.value = "";
  };

  const applyPreset = (i: number) => {
    setActivePreset(i);
    setSizeMode("preset");
    setWidth(String(sizePresets[i].w));
    setHeight(String(sizePresets[i].h));
    setUnit("in");
  };

  const hasArt = !!(uploaded || preset);

  return (
    <section id="personalizar" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--brand-violet)" }} />
            Configurador interactivo
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Diseña tu producto en{" "}
            <span className="text-gradient-rainbow">4 pasos</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Elige categoría, material y sube tu arte. Verás un mockup en vivo con precio en Lempiras.
          </p>
        </div>

        <Stepper step={step} onGo={goTo} />

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-card-soft sm:p-10">
          {step === 1 && (
            <div className="animate-step-in grid gap-6 sm:grid-cols-2">
              <CategoryCard
                title="Stickers Personalizados"
                desc="Vinil, papel y acabados premium. Individuales, en hojas o rollos."
                accent="var(--brand-pink)"
                icon={<Layers className="h-8 w-8" />}
                active={category === "stickers"}
                onClick={() => setCategory("stickers")}
              />
              <CategoryCard
                title="Iron-ons (Textiles)"
                desc="Estampados sublimados y transfer para uniformes y merch."
                accent="var(--brand-blue)"
                icon={<Package className="h-8 w-8" />}
                active={category === "iron-ons"}
                onClick={() => setCategory("iron-ons")}
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-step-in">
              <SectionTitle icon={<Scissors className="h-5 w-5" />} title="Elige la forma de corte" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cuts.map((c) => (
                  <SelectCard
                    key={c.id}
                    title={c.name}
                    desc={c.desc}
                    accent={c.accent}
                    active={cut === c.id}
                    onClick={() => setCut(c.id)}
                  />
                ))}
              </div>
              <NavRow onBack={() => goTo(1)} onNext={cut ? () => goTo(3) : undefined} />
            </div>
          )}

          {step === 3 && (
            <div className="animate-step-in">
              <SectionTitle icon={<FileImage className="h-5 w-5" />} title="Selecciona material y acabado" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {materials.map((m) => (
                  <SelectCard
                    key={m.id}
                    title={m.name}
                    desc={m.desc}
                    accent="var(--brand-violet)"
                    active={material === m.id}
                    onClick={() => setMaterial(m.id)}
                    swatch={m.swatch}
                  />
                ))}
              </div>
              <NavRow onBack={() => goTo(2)} onNext={material ? () => goTo(4) : undefined} />
            </div>
          )}

          {step === 4 && (
            <div className="animate-step-in grid gap-8 lg:grid-cols-2">
              {/* LEFT: Configurator */}
              <div className="space-y-6">
                {/* Material info panel */}
                {materialData && (
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-soft p-5">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-rainbow opacity-10 blur-2xl" />
                    <div className="relative">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-background" style={{ color: "var(--brand-violet)" }}>
                          <Info className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Material seleccionado</div>
                          <div className="font-bold leading-tight">{materialData.name}</div>
                        </div>
                      </div>
                      <div className="grid gap-2 text-xs">
                        <div className="flex items-start gap-2">
                          <Droplets className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--brand-blue)" }} />
                          <span><strong className="text-foreground">Acabado:</strong> <span className="text-muted-foreground">{materialData.finish}</span></span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--brand-green)" }} />
                          <span>
                            <strong className="text-foreground">Ventajas:</strong>{" "}
                            <span className="text-muted-foreground">{materialData.advantages.join(" · ")}.</span>
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--brand-pink)" }} />
                          <span className="text-muted-foreground">{materialData.useCase}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shape selector */}
                <div>
                  <Label className="mb-3 block text-sm font-semibold">Forma del sticker</Label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {shapes.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setShape(s.id)}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-xl border-2 p-2.5 text-[10px] font-medium transition",
                          shape === s.id ? "rainbow-border-active" : "border-border text-muted-foreground hover:text-foreground",
                        )}
                        title={s.name}
                      >
                        {s.icon}
                        <span className="truncate">{s.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload */}
                <div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  />
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-background px-4 py-6 text-sm font-medium transition hover:border-transparent hover:shadow-elegant"
                  >
                    <Upload className="h-5 w-5" style={{ color: "var(--brand-violet)" }} />
                    {uploaded ? "Cambiar arte / logo" : "Subir mi Arte / Logo"}
                  </button>
                </div>

                {/* Art presets */}
                <div>
                  <Label className="mb-2 block text-sm">O elige un arte prediseñado</Label>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                    {presetArts.map((a) => (
                      <button
                        key={a}
                        onClick={() => { setPreset(a); setUploaded(null); resetImageTools(); }}
                        className={cn(
                          "flex aspect-square items-center justify-center rounded-xl border-2 text-2xl transition",
                          preset === a ? "rainbow-border-active" : "border-border hover:border-foreground/20",
                        )}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Toolbox - only sliders */}
                {hasArt && (
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <Label className="text-sm font-semibold">Ajustes de imagen</Label>
                      <span className="hidden items-center gap-1 text-[10px] text-muted-foreground sm:inline-flex">
                        <MousePointer2 className="h-3 w-3" /> Toca la imagen en la vista previa para editarla
                      </span>
                    </div>

                    <div className="space-y-4">
                      <ToolSlider
                        icon={<ZoomIn className="h-3.5 w-3.5" />}
                        label="Escala (Zoom)"
                        value={scale}
                        min={30} max={250} step={1}
                        onChange={setScale}
                        suffix="%"
                      />
                      <ToolSlider
                        icon={<Sun className="h-3.5 w-3.5" />}
                        label="Brillo"
                        value={brightness} min={50} max={200} step={1}
                        onChange={setBrightness} suffix="%"
                      />
                      <ToolSlider
                        icon={<Contrast className="h-3.5 w-3.5" />}
                        label="Contraste"
                        value={contrast} min={50} max={200} step={1}
                        onChange={setContrast} suffix="%"
                      />
                    </div>
                  </div>
                )}

                {/* Size presets */}
                <div>
                  <Label className="mb-3 block text-sm font-semibold">Tamaño del sticker</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {sizePresets.map((p, i) => (
                      <button
                        key={p.label}
                        onClick={() => applyPreset(i)}
                        className={cn(
                          "rounded-xl border-2 p-3 text-left transition",
                          sizeMode === "preset" && activePreset === i
                            ? "rainbow-border-active"
                            : "border-border hover:border-foreground/20",
                        )}
                      >
                        <div className="text-sm font-bold">{p.label}</div>
                        <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground">{p.hint}</div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setSizeMode("custom")}
                    className={cn(
                      "mt-2 w-full rounded-xl border-2 p-3 text-left text-sm font-medium transition",
                      sizeMode === "custom" ? "rainbow-border-active" : "border-dashed border-border hover:border-foreground/20",
                    )}
                  >
                    Tamaño Personalizado
                  </button>

                  {sizeMode === "custom" && (
                    <div className="mt-3 grid grid-cols-[1fr_1fr_auto] gap-2">
                      <div>
                        <Label htmlFor="w" className="mb-1 block text-[11px] text-muted-foreground">Ancho</Label>
                        <Input id="w" value={width} onChange={(e) => setWidth(e.target.value)} inputMode="decimal" />
                      </div>
                      <div>
                        <Label htmlFor="h" className="mb-1 block text-[11px] text-muted-foreground">Alto</Label>
                        <Input id="h" value={height} onChange={(e) => setHeight(e.target.value)} inputMode="decimal" />
                      </div>
                      <div>
                        <Label className="mb-1 block text-[11px] text-muted-foreground">Unidad</Label>
                        <div className="flex h-9 rounded-md border border-border p-1 text-xs">
                          {(["in", "cm"] as const).map((u) => (
                            <button
                              key={u}
                              onClick={() => setUnit(u)}
                              className={cn(
                                "rounded px-2 font-medium transition",
                                unit === u ? "bg-foreground text-background" : "text-muted-foreground",
                              )}
                            >
                              {u}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label htmlFor="qty" className="text-sm font-semibold">Cantidad</Label>
                    {bulkFactor < 1 && (
                      <span className="rounded-full bg-gradient-cta px-2.5 py-0.5 text-[10px] font-bold text-white">
                        -{Math.round((1 - bulkFactor) * 100)}% aplicado
                      </span>
                    )}
                  </div>
                  <Input id="qty" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} />
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {[
                      { n: 25, off: 37 },
                      { n: 50, off: 70 },
                      { n: 100, off: 75 },
                      { n: 250, off: 80 },
                      { n: 500, off: 84 },
                    ].map(({ n, off }) => (
                      <button
                        key={n}
                        onClick={() => setQty(n)}
                        className={cn(
                          "group relative rounded-xl border-2 px-2 py-2 text-center transition",
                          qty === n ? "rainbow-border-active" : "border-border hover:border-foreground/20",
                        )}
                      >
                        <div className="text-sm font-bold leading-tight">{n}</div>
                        <div className="text-[9px] font-semibold leading-tight text-gradient-rainbow">-{off}%</div>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Escribe manualmente cualquier cantidad. El descuento se aplica automáticamente al superar cada tramo.
                  </p>
                </div>

                <div>
                  <Label htmlFor="notes" className="mb-2 block text-sm font-semibold">Instrucciones especiales</Label>
                  <Textarea
                    id="notes"
                    rows={3}
                    placeholder="Colores Pantone, tipo de laminado, entrega, empaque, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* RIGHT: Preview */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <div className="overflow-hidden rounded-3xl border border-border bg-gradient-soft p-6">
                  <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>Vista previa en vivo</span>
                    <span className="rounded-full bg-background px-2 py-0.5">{shapeData.name}</span>
                  </div>

                  <InteractiveCanvas
                    shapeData={shapeData}
                    materialSwatch={materialData?.swatch ?? "#fff"}
                    isDieCut={cut === "die-cut"}
                    hasArt={hasArt}
                    uploaded={uploaded}
                    preset={preset}
                    scale={scale}
                    setScale={setScale}
                    offsetX={offsetX}
                    setOffsetX={setOffsetX}
                    offsetY={offsetY}
                    setOffsetY={setOffsetY}
                    contrast={contrast}
                    brightness={brightness}
                    duplicated={duplicated}
                    setDuplicated={setDuplicated}
                    selected={selected}
                    setSelected={setSelected}
                    onClear={clearImage}
                  />


                  <div className="mt-10 grid grid-cols-3 gap-3 rounded-2xl bg-background/70 p-4 text-center backdrop-blur">
                    <Stat label="Tamaño" value={`${width}×${height} ${unit}`} />
                    <Stat label="Cantidad" value={`${qty}`} />
                    <Stat label="Precio estimado" value={currency(price)} highlight />
                  </div>

                  <p className="mt-3 text-center text-[11px] text-muted-foreground">
                    {hasArt
                      ? "Arrastra la imagen para moverla · usa las esquinas para redimensionar · toca los iconos para editar."
                      : "Precio estimado en Lempiras. Cotización final tras revisión de arte."}
                  </p>
                </div>

                <button className="mt-4 w-full rounded-2xl bg-gradient-cta animate-rainbow-shimmer px-6 py-4 text-base font-semibold text-white shadow-elegant transition hover:scale-[1.01]">
                  Añadir a la orden / Solicitar Cotización Profesional
                </button>
                <NavRow onBack={() => goTo(3)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Interactive Canvas ---------- */
type ShapeDef = ShapeItem;

function InteractiveCanvas({
  shapeData, materialSwatch, isDieCut, hasArt, uploaded, preset,
  scale, setScale, offsetX, setOffsetX, offsetY, setOffsetY,
  contrast, brightness, duplicated, setDuplicated, selected, setSelected, onClear,
}: {
  shapeData: ShapeDef; materialSwatch: string; isDieCut: boolean; hasArt: boolean;
  uploaded: string | null; preset: string | null;
  scale: number; setScale: (n: number) => void;
  offsetX: number; setOffsetX: (n: number) => void;
  offsetY: number; setOffsetY: (n: number) => void;
  contrast: number; brightness: number;
  duplicated: boolean; setDuplicated: (b: boolean | ((d: boolean) => boolean)) => void;
  selected: boolean; setSelected: (b: boolean) => void;
  onClear: () => void;
}) {
  const maskRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ mode: "move" | "resize"; startX: number; startY: number; startOX: number; startOY: number; startScale: number; corner?: "tl" | "tr" | "bl" | "br"; rect: DOMRect } | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (maskRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setSelected(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [setSelected]);

  const onPointerDownImage = (e: React.PointerEvent) => {
    if (!hasArt || !maskRef.current) return;
    e.stopPropagation();
    setSelected(true);
    const rect = maskRef.current.getBoundingClientRect();
    dragRef.current = {
      mode: "move",
      startX: e.clientX, startY: e.clientY,
      startOX: offsetX, startOY: offsetY,
      startScale: scale,
      rect,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerDownHandle = (corner: "tl" | "tr" | "bl" | "br") => (e: React.PointerEvent) => {
    if (!maskRef.current) return;
    e.stopPropagation();
    const rect = maskRef.current.getBoundingClientRect();
    dragRef.current = {
      mode: "resize",
      startX: e.clientX, startY: e.clientY,
      startOX: offsetX, startOY: offsetY,
      startScale: scale,
      corner,
      rect,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (d.mode === "move") {
      const pctX = (dx / d.rect.width) * 100;
      const pctY = (dy / d.rect.height) * 100;
      setOffsetX(clamp(d.startOX + pctX, -120, 120));
      setOffsetY(clamp(d.startOY + pctY, -120, 120));
    } else {
      const delta = ((d.corner === "tl" || d.corner === "bl") ? -dx : dx) + ((d.corner === "tl" || d.corner === "tr") ? -dy : dy);
      const pct = (delta / d.rect.width) * 100;
      setScale(clamp(Math.round(d.startScale + pct), 30, 250));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* noop */ }
  };

  const centerHorizontal = () => {
    dragRef.current = null;
    setSelected(true);
    setOffsetX(0);
  };

  const centerVertical = () => {
    dragRef.current = null;
    setSelected(true);
    setOffsetY(0);
  };

  const filterStyle = `contrast(${contrast}%) brightness(${brightness}%)`;
  const imgTransform = `translate(-50%, -50%) translate(${offsetX}%, ${offsetY}%) scale(${scale / 100})`;
  const artBoxStyle: React.CSSProperties = {
    transform: imgTransform,
    width: "80%",
    height: "80%",
  };

  const renderArt = (fadedFilter = false) =>
    uploaded ? (
      <img
        src={uploaded}
        alt=""
        draggable={false}
        className="pointer-events-none max-h-full max-w-full object-contain"
        style={{ filter: fadedFilter ? `${filterStyle} saturate(60%)` : filterStyle }}
      />
    ) : (
      <span
        className="pointer-events-none text-[6rem] leading-none"
        style={{ filter: fadedFilter ? `${filterStyle} saturate(60%)` : filterStyle }}
      >
        {preset}
      </span>
    );

  return (
    <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-gradient-rainbow opacity-10 blur-3xl" />

      {/* Workspace (NO overflow hidden - the image can bleed out visibly) */}
      <div
        ref={maskRef}
        className="relative touch-none select-none"
        style={{
          width: shapeData.aspect >= 1 ? "82%" : `${82 * shapeData.aspect}%`,
          aspectRatio: `${shapeData.aspect} / 1`,
        }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Layer 1: material background (clipped to shape) */}
        <div
          className="absolute inset-0 shadow-elegant"
          style={{
            background: materialSwatch,
            borderRadius: shapeData.radius,
            clipPath: shapeData.clip,
          }}
        />

        {hasArt && !duplicated && (
          <>
            {/* Layer 2: faded ghost of the FULL image (shows overflow at 40%) */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 flex items-center justify-center opacity-40"
              style={artBoxStyle}
            >
              {renderArt(true)}
            </div>

            {/* Layer 3: crisp 100% image clipped to shape */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: shapeData.radius,
                clipPath: shapeData.clip,
                overflow: "hidden",
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 flex items-center justify-center"
                style={artBoxStyle}
              >
                {renderArt(false)}
              </div>
            </div>
          </>
        )}

        {hasArt && duplicated && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: shapeData.radius,
              clipPath: shapeData.clip,
              overflow: "hidden",
            }}
          >
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1 p-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative flex items-center justify-center overflow-hidden">
                  {uploaded ? (
                    <img src={uploaded} alt="" draggable={false}
                      className="max-h-full max-w-full object-contain"
                      style={{ filter: filterStyle, transform: `scale(${scale / 100})` }} />
                  ) : (
                    <span style={{ filter: filterStyle, transform: `scale(${scale / 100})` }} className="text-[4rem] leading-none">{preset}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!hasArt && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-muted-foreground"
            style={{ borderRadius: shapeData.radius, clipPath: shapeData.clip }}
          >
            <div>
              <ImagePlus className="mx-auto h-10 w-10 opacity-40" />
              <p className="mt-2 text-xs">Sube tu arte para verlo aquí</p>
            </div>
          </div>
        )}

        {/* Layer 4: PRINT GUIDES (cut = green, bleed = yellow dashed) */}
        <ShapeGuides shapeData={shapeData} />

        {/* Die-cut soft halo */}
        {isDieCut && !shapeData.clip && (
          <div
            className="pointer-events-none absolute -inset-1.5"
            style={{ border: "2px dashed rgba(0,0,0,0.08)", borderRadius: shapeData.radius }}
          />
        )}

        {/* Layer 5: interactive hit-box + resize handles (always on top) */}
        {hasArt && !duplicated && (
          <div
            className={cn(
              "absolute left-1/2 top-1/2 flex items-center justify-center",
              selected ? "cursor-move" : "cursor-pointer",
            )}
            style={{ ...artBoxStyle, zIndex: 30 }}
            onPointerDown={onPointerDownImage}
          >
            {/* transparent hit area */}
            <div className="absolute inset-0" />

            {selected && (
              <>
                <div
                  className="pointer-events-none absolute -inset-1 rounded-[4px]"
                  style={{ outline: "2px solid var(--brand-violet)", outlineOffset: "0" }}
                />
                {(["tl", "tr", "bl", "br"] as const).map((c) => (
                  <span
                    key={c}
                    onPointerDown={onPointerDownHandle(c)}
                    className="absolute z-40 h-3.5 w-3.5 rounded-full border-2 border-[var(--brand-violet)] bg-white shadow"
                    style={{
                      top: c.startsWith("t") ? "-8px" : "auto",
                      bottom: c.startsWith("b") ? "-8px" : "auto",
                      left: c.endsWith("l") ? "-8px" : "auto",
                      right: c.endsWith("r") ? "-8px" : "auto",
                      cursor: c === "tl" || c === "br" ? "nwse-resize" : "nesw-resize",
                      touchAction: "none",
                    }}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Floating contextual menu */}
      {hasArt && selected && !duplicated && (
        <div
          ref={menuRef}
          className="absolute z-50 flex items-center gap-1 rounded-full border border-border bg-card p-1.5 shadow-elegant animate-fade-up"
          style={{ top: "-8px", left: "50%", transform: "translate(-50%, -100%)", pointerEvents: "auto" }}
          onMouseDown={(e) => { e.stopPropagation(); dragRef.current = null; }}
          onPointerDown={(e) => { e.stopPropagation(); dragRef.current = null; }}
          onPointerUp={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <FloatBtn label="Centrar horizontal" onClick={centerHorizontal}>
            <AlignHorizontalJustifyCenter className="h-4 w-4" />
          </FloatBtn>
          <FloatBtn label="Centrar vertical" onClick={centerVertical}>
            <AlignVerticalJustifyCenter className="h-4 w-4" />
          </FloatBtn>
          <FloatBtn label="Duplicar (patrón)" onClick={() => { dragRef.current = null; setDuplicated((d) => !d); }}>
            <Copy className="h-4 w-4" />
          </FloatBtn>
          <span className="mx-0.5 h-5 w-px bg-border" />
          <FloatBtn label="Eliminar" danger onClick={() => { dragRef.current = null; onClear(); setSelected(false); }}>
            <Trash2 className="h-4 w-4" />
          </FloatBtn>
        </div>
      )}

      {hasArt && duplicated && (
        <button
          onClick={() => setDuplicated(false)}
          className="absolute right-2 top-2 z-40 flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium shadow-card-soft"
        >
          <Copy className="h-3 w-3" /> Salir del patrón
        </button>
      )}

      {/* Legend */}
      <div className="pointer-events-none absolute -bottom-3 left-1/2 z-10 flex -translate-x-1/2 translate-y-full items-center gap-3 whitespace-nowrap rounded-full border border-border bg-card/95 px-2.5 py-1 text-[10px] font-medium text-muted-foreground shadow-card-soft backdrop-blur">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-4 rounded-sm" style={{ background: "#22c55e" }} />
          Corte
        </span>
        <span className="inline-flex items-center gap-1">
          <span
            className="inline-block h-2 w-4 rounded-sm"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, #f59e0b 0 3px, transparent 3px 6px)" }}
          />
          Zona segura
        </span>
      </div>
    </div>
  );
}

function ShapeGuides({ shapeData }: { shapeData: ShapeDef }) {
  // Path-based shapes (cloud, heart): render two SVG paths, one inset for bleed
  if (shapeData.clip && shapeData.path && shapeData.viewBox) {
    return (
      <svg
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
        viewBox={shapeData.viewBox}
        preserveAspectRatio="none"
      >
        {/* Cut line */}
        <path
          d={shapeData.path}
          fill="none"
          stroke="#22c55e"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Bleed / safe area — inset via transform-origin center */}
        <g style={{ transformOrigin: "center", transformBox: "fill-box" }} transform="scale(0.92)">
          <path
            d={shapeData.path}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    );
  }

  // Radius-based shapes: use bordered divs
  const outerRadius = shapeData.radius ?? "0px";
  const innerRadius =
    outerRadius === "9999px"
      ? "9999px"
      : outerRadius === "0px"
        ? "0px"
        : `calc(${outerRadius} - 4px)`;
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{ border: "2px solid #22c55e", borderRadius: outerRadius }}
      />
      <div
        className="pointer-events-none absolute inset-[6px] z-20"
        style={{
          border: "1.5px dashed #f59e0b",
          borderRadius: innerRadius,
        }}
      />
    </>
  );
}


function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function FloatBtn({
  children, onClick, label, danger,
}: { children: React.ReactNode; onClick: () => void; label: string; danger?: boolean }) {
  return (
    <button
      type="button"
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); onClick(); }}
      title={label}
      aria-label={label}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full transition active:scale-95 cursor-pointer",
        danger
          ? "text-destructive hover:bg-destructive/10"
          : "text-foreground hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}


/* ---------- Small helpers ---------- */
function ToolButton({
  children, onClick, title, active, danger,
}: { children: React.ReactNode; onClick: () => void; title: string; active?: boolean; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-lg border transition",
        active ? "rainbow-border-active" :
          danger ? "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                 : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function ToolSlider({
  icon, label, value, min, max, step, onChange, suffix, onMinus, onPlus, minusIcon, plusIcon, compact,
}: {
  icon?: React.ReactNode; label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; suffix?: string;
  onMinus?: () => void; onPlus?: () => void; minusIcon?: React.ReactNode; plusIcon?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">{icon}{label}</span>
        <span className="font-mono font-medium text-foreground">{value}{suffix}</span>
      </div>
      <div className="flex items-center gap-2">
        {onMinus && !compact && (
          <button onClick={onMinus} className="grid h-7 w-7 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground">
            {minusIcon}
          </button>
        )}
        <Slider
          value={[value]}
          min={min} max={max} step={step}
          onValueChange={(v) => onChange(v[0])}
          className="flex-1"
        />
        {onPlus && !compact && (
          <button onClick={onPlus} className="grid h-7 w-7 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground">
            {plusIcon}
          </button>
        )}
      </div>
    </div>
  );
}

function Stepper({ step, onGo }: { step: number; onGo: (n: number) => void }) {
  const labels = ["Categoría", "Forma", "Material", "Diseño"];
  return (
    <div className="mx-auto flex max-w-3xl items-center justify-between gap-2">
      {labels.map((l, i) => {
        const n = i + 1;
        const active = step === n;
        const done = step > n;
        return (
          <div key={l} className="flex flex-1 items-center gap-2">
            <button
              onClick={() => onGo(n)}
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition",
                active && "rainbow-border-active",
                done && "border-transparent bg-foreground text-background",
                !active && !done && "border-border text-muted-foreground",
              )}
            >
              {done ? <Check className="h-4 w-4" /> : n}
            </button>
            <span className={cn("hidden truncate text-sm font-medium sm:inline", active ? "text-foreground" : "text-muted-foreground")}>
              {l}
            </span>
            {i < labels.length - 1 && <div className="h-px flex-1 bg-border" />}
          </div>
        );
      })}
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-soft" style={{ color: "var(--brand-violet)" }}>{icon}</span>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
}

function CategoryCard({
  title, desc, icon, active, onClick, accent,
}: { title: string; desc: string; icon: React.ReactNode; active: boolean; onClick: () => void; accent: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl border-2 p-8 text-left transition-all",
        active ? "rainbow-border-active" : "border-border hover:-translate-y-1 hover:shadow-elegant",
      )}
    >
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
        style={{ background: accent }}
      />
      <div className="relative">
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ background: accent }}>
          {icon}
        </div>
        <h4 className="text-2xl font-bold">{title}</h4>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
        <div className="mt-6 flex items-center gap-2 text-sm font-medium">
          Comenzar <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}

function SelectCard({
  title, desc, active, onClick, accent, swatch,
}: { title: string; desc: string; active: boolean; onClick: () => void; accent: string; swatch?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all",
        active ? "rainbow-border-active" : "border-border hover:-translate-y-0.5 hover:shadow-card-soft",
      )}
    >
      {swatch && (
        <div className="mb-3 h-14 w-full rounded-lg border border-border" style={{ background: swatch }} />
      )}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-semibold leading-tight">{title}</h4>
          <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
        </div>
        {active && (
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white" style={{ background: accent }}>
            <Check className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </button>
  );
}

function NavRow({ onBack, onNext }: { onBack?: () => void; onNext?: () => void }) {
  return (
    <div className="mt-8 flex items-center justify-between">
      {onBack ? (
        <Button variant="ghost" onClick={onBack}>← Atrás</Button>
      ) : <span />}
      {onNext && <Button onClick={onNext}>Continuar <ArrowRight className="ml-1 h-4 w-4" /></Button>}
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={cn("mt-0.5 text-sm font-bold", highlight && "text-gradient-rainbow text-base")}>{value}</div>
    </div>
  );
}
