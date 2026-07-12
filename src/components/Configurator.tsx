import { useMemo, useRef, useState } from "react";
import { Upload, Check, ArrowRight, Sparkles, Package, Layers, Scissors, FileImage, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Category = "stickers" | "iron-ons";
type CutShape = "die-cut" | "kiss-cut" | "sheets" | "rolls";
type Material = "vinyl-white" | "vinyl-clear" | "semi-gloss" | "matte";

const cuts: { id: CutShape; name: string; desc: string; accent: string }[] = [
  { id: "die-cut", name: "Die-Cut", desc: "Corte individual exacto al contorno", accent: "var(--brand-red)" },
  { id: "kiss-cut", name: "Kiss-Cut", desc: "Corte sobre el papel base", accent: "var(--brand-orange)" },
  { id: "sheets", name: "Hojas de Stickers", desc: "Varios diseños por hoja", accent: "var(--brand-green)" },
  { id: "rolls", name: "Rollos", desc: "Ideal para producción a escala", accent: "var(--brand-blue)" },
];

const materials: { id: Material; name: string; desc: string; priceFactor: number; swatch: string }[] = [
  { id: "vinyl-white", name: "Vinil Blanco Removible", desc: "Premium · Impermeable · Duradero", priceFactor: 1.15, swatch: "#ffffff" },
  { id: "vinyl-clear", name: "Vinil Transparente", desc: "Efecto sin fondo, look profesional", priceFactor: 1.25, swatch: "linear-gradient(135deg,#e0f2fe,#fce7f3)" },
  { id: "semi-gloss", name: "Papel Semi-Gloss", desc: "Económico, brillo sutil", priceFactor: 0.85, swatch: "#f5f5f4" },
  { id: "matte", name: "Acabado Mate Elegante", desc: "Textura mate premium, sin reflejos", priceFactor: 1.1, swatch: "#e7e5e4" },
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
  const [preset, setPreset] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<string | null>(null);
  const [size, setSize] = useState("3");
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [qty, setQty] = useState(100);
  const [notes, setNotes] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const materialData = materials.find((m) => m.id === material);
  const price = useMemo(() => {
    const base = 8; // L. per sticker base
    const sizeMult = Math.max(1, parseFloat(size || "1") / 2);
    const factor = materialData?.priceFactor ?? 1;
    const bulk = qty >= 500 ? 0.7 : qty >= 200 ? 0.8 : qty >= 100 ? 0.9 : 1;
    return Math.round(base * sizeMult * factor * bulk * qty);
  }, [size, qty, materialData]);

  const goTo = (s: number) => setStep(s);

  const handleFile = (f: File | null) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setUploaded(url);
    setPreset(null);
  };

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
            <span className="text-gradient-rainbow">3 pasos</span>
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
                onClick={() => { setCategory("stickers"); setTimeout(() => goTo(2), 250); }}
              />
              <CategoryCard
                title="Iron-ons (Textiles)"
                desc="Estampados sublimados y transfer para uniformes y merch."
                accent="var(--brand-blue)"
                icon={<Package className="h-8 w-8" />}
                active={category === "iron-ons"}
                onClick={() => { setCategory("iron-ons"); setTimeout(() => goTo(2), 250); }}
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
                    onClick={() => { setCut(c.id); setTimeout(() => goTo(3), 250); }}
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
                    onClick={() => { setMaterial(m.id); setTimeout(() => goTo(4), 250); }}
                    swatch={m.swatch}
                  />
                ))}
              </div>
              <NavRow onBack={() => goTo(2)} onNext={material ? () => goTo(4) : undefined} />
            </div>
          )}

          {step === 4 && (
            <div className="animate-step-in grid gap-8 lg:grid-cols-2">
              {/* Configurator column */}
              <div className="space-y-6">
                <SectionTitle icon={<ImagePlus className="h-5 w-5" />} title="Personaliza tu arte" />

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
                    style={{ backgroundImage: uploaded ? "none" : undefined }}
                  >
                    <Upload className="h-5 w-5" style={{ color: "var(--brand-violet)" }} />
                    {uploaded ? "Cambiar arte / logo" : "Subir mi Arte / Logo"}
                  </button>
                </div>

                <div>
                  <Label className="mb-2 block text-sm">O elige un arte prediseñado</Label>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                    {presetArts.map((a) => (
                      <button
                        key={a}
                        onClick={() => { setPreset(a); setUploaded(null); }}
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

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="size" className="mb-2 block text-sm">Medida</Label>
                    <div className="flex gap-2">
                      <Input id="size" value={size} onChange={(e) => setSize(e.target.value)} inputMode="decimal" />
                      <div className="flex rounded-md border border-border p-1 text-xs">
                        {(["in", "cm"] as const).map((u) => (
                          <button
                            key={u}
                            onClick={() => setUnit(u)}
                            className={cn(
                              "rounded px-2 py-1 font-medium transition",
                              unit === u ? "bg-foreground text-background" : "text-muted-foreground",
                            )}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="qty" className="mb-2 block text-sm">Cantidad</Label>
                    <Input id="qty" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[50, 100, 250, 500, 1000].map((n) => (
                    <button
                      key={n}
                      onClick={() => setQty(n)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition",
                        qty === n ? "border-transparent bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {n} uds
                    </button>
                  ))}
                </div>

                <div>
                  <Label htmlFor="notes" className="mb-2 block text-sm">Instrucciones especiales</Label>
                  <Textarea
                    id="notes"
                    rows={4}
                    placeholder="Colores Pantone, tipo de laminado, entrega, empaque, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* Preview column */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <div className="overflow-hidden rounded-3xl border border-border bg-gradient-soft p-6">
                  <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>Vista previa en vivo</span>
                    <span className="rounded-full bg-background px-2 py-0.5">{materialData?.name ?? "—"}</span>
                  </div>

                  <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-rainbow opacity-10 blur-3xl" />
                    <div
                      className="relative flex aspect-square w-4/5 items-center justify-center overflow-hidden rounded-3xl shadow-elegant"
                      style={{
                        background: materialData?.swatch ?? "#fff",
                        outline: cut === "die-cut" ? "3px dashed rgba(0,0,0,0.12)" : "none",
                        outlineOffset: "6px",
                      }}
                    >
                      {uploaded ? (
                        <img src={uploaded} alt="Tu arte" className="h-full w-full object-contain p-6" />
                      ) : preset ? (
                        <span className="text-8xl">{preset}</span>
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <ImagePlus className="mx-auto h-10 w-10 opacity-40" />
                          <p className="mt-2 text-xs">Sube tu arte para verlo aquí</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-background/70 p-4 text-center backdrop-blur">
                    <Stat label="Tamaño" value={`${size || "—"} ${unit}`} />
                    <Stat label="Cantidad" value={`${qty}`} />
                    <Stat label="Precio estimado" value={currency(price)} highlight />
                  </div>

                  <p className="mt-3 text-center text-[11px] text-muted-foreground">
                    Precio estimado en Lempiras. Cotización final tras revisión de arte.
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
              onClick={() => n <= step && onGo(n)}
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
