import { useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Check, MessageCircle, Upload, FileText, Layers,
  Sparkles, Ruler, Copy, Palette, User, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  menuMaterials, menuBindings, menuRules, menuFinishes, menuShapes, menuSizes,
  menuSides, menuQuoteMessage,
  type MenuMaterialId, type MenuBindingId,
} from "@/lib/menu-options";

const WA_NUMBER = "50433635666";
const TOTAL_STEPS = 7;

type Sel = {
  material: MenuMaterialId | null;
  binding: MenuBindingId | null;
  pages: number;
  finish: string | null;
  shape: string | null;
  shapeNotes: string;
  size: string | null;
  customSize: string;
  customSizeNotes: string;
  sides: string | null;
  quantity: number;
  designMode: "propio" | "idealo" | null;
  designFile: { name: string; preview: string | null } | null;
  restaurant: string;
  logo: { name: string; preview: string | null } | null;
  brandColors: string;
  dishPhotos: { name: string; preview: string | null }[];
  dishes: string;
  menuFile: { name: string; preview: string | null } | null;
  styleRef: string;
  styleImage: { name: string; preview: string | null } | null;
  designNotes: string;
  contactName: string;
  contactPhone: string;
  deliveryDate: string;
};

const initialSel: Sel = {
  material: null, binding: null, pages: 8, finish: null, shape: null, shapeNotes: "",
  size: null, customSize: "", customSizeNotes: "", sides: null, quantity: 25,
  designMode: null, designFile: null, restaurant: "", logo: null, brandColors: "",
  dishPhotos: [], dishes: "", menuFile: null, styleRef: "", styleImage: null,
  designNotes: "", contactName: "", contactPhone: "", deliveryDate: "",
};

function toPickedFile(f: File | null): { name: string; preview: string | null } | null {
  if (!f) return null;
  return { name: f.name, preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : null };
}

function UploadBox({
  label, hint, accept, file, onFile, multiple,
}: {
  label: string;
  hint?: string;
  accept: string;
  file: { name: string; preview: string | null } | null;
  onFile: (f: { name: string; preview: string | null } | null) => void;
  multiple?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background px-4 py-5 text-sm font-medium text-muted-foreground transition hover:border-foreground/40 hover:text-foreground">
        <Upload className="h-4 w-4 shrink-0" />
        <span className="text-center">{file ? `Cambiar: ${file.name}` : label}</span>
        <input
          ref={ref}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            onFile(toPickedFile(f));
          }}
        />
      </label>
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
      {file && (
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-background p-3">
          {file.preview ? (
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
              <img src={file.preview} alt="" className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-muted">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{file.name} · lo adjuntás en el chat de WhatsApp</div>
          <Button variant="ghost" size="sm" onClick={() => { onFile(null); if (ref.current) ref.current.value = ""; }}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function OptionCard({
  active, onClick, title, hint, image,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint: string;
  image?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 text-left transition-all rainbow-splash",
        active ? "rainbow-border-active" : "border-border hover:-translate-y-0.5 hover:shadow-card-soft",
      )}
    >
      {image && (
        <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
          <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className="p-4 sm:p-5">
        <h4 className="font-bold leading-tight">{title}</h4>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{hint}</p>
      </div>
      {active && (
        <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-foreground text-background">
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
    </button>
  );
}

export function MenuQuoteWizard({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState<Sel>(initialSel);
  const up = (patch: Partial<Sel>) => setSel((s) => ({ ...s, ...patch }));

  const bindingsForMaterial = sel.material ? menuRules.bindingsByMaterial[sel.material] : [];
  const showLaminado = sel.material ? menuRules.laminadoMaterials.includes(sel.material) : false;
  const needsPages = sel.binding === "resorte";

  const pickMaterial = (id: MenuMaterialId) => {
    const allowed = menuRules.bindingsByMaterial[id];
    up({
      material: id,
      binding: sel.binding && allowed.includes(sel.binding) ? sel.binding : null,
      finish: menuRules.laminadoMaterials.includes(id) ? sel.finish : null,
    });
  };

  const stepValid: Record<number, boolean> = {
    1: !!sel.material,
    2: !!sel.binding,
    3: (!showLaminado || !!sel.finish) && !!sel.shape,
    4: !!sel.size && (sel.size !== "otro" || sel.customSize.trim().length > 0),
    5: !!sel.sides && sel.quantity >= 1 && (!needsPages || sel.pages >= 1),
    6: sel.designMode === "propio"
      ? !!sel.designFile
      : sel.designMode === "idealo"
        ? sel.restaurant.trim().length > 0
        : false,
    7: sel.contactName.trim().length > 0,
  };

  const canNext = stepValid[step];
  const next = () => canNext && setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const back = () => (step === 1 ? onBack() : setStep((s) => s - 1));

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    menuQuoteMessage({
      material: sel.material!, binding: sel.binding!, pages: sel.pages,
      finish: sel.finish ?? "", shape: sel.shape!, shapeNotes: sel.shapeNotes,
      size: sel.size!, customSize: sel.customSize, customSizeNotes: sel.customSizeNotes,
      sides: sel.sides!, quantity: sel.quantity, designMode: sel.designMode ?? "idealo",
      hasDesignFile: !!sel.designFile, restaurant: sel.restaurant, brandColors: sel.brandColors,
      dishes: sel.dishes, styleRef: sel.styleRef, designNotes: sel.designNotes,
      hasLogo: !!sel.logo, hasDishPhotos: sel.dishPhotos.length > 0,
      hasMenuFile: !!sel.menuFile, hasStyleImage: !!sel.styleImage,
      contactName: sel.contactName, contactPhone: sel.contactPhone, deliveryDate: sel.deliveryDate,
    }),
  )}`;

  const summaryRows: [string, string][] = [
    ["Material", menuMaterials.find((m) => m.id === sel.material)?.label ?? ""],
    ["Encuadernación", menuBindings.find((b) => b.id === sel.binding)?.label ?? ""],
    ...(needsPages ? [["Hojas por menú", String(sel.pages)] as [string, string]] : []),
    ...(showLaminado && sel.finish ? [["Acabado", menuFinishes.find((f) => f.id === sel.finish)?.label ?? ""] as [string, string]] : []),
    ["Forma", menuShapes.find((s) => s.id === sel.shape)?.label ?? ""],
    ["Tamaño", sel.size === "otro" ? `Otro — ${sel.customSize}` : `${menuSizes.find((s) => s.id === sel.size)?.label ?? ""} (${menuSizes.find((s) => s.id === sel.size)?.dims ?? ""})`],
    ["Impresión", menuSides.find((s) => s.id === sel.sides)?.label ?? ""],
    ["Cantidad", `${sel.quantity} menús`],
    ["Diseño", sel.designMode === "propio" ? "Ya tengo mi diseño" : "Idealo lo diseña 100%"],
  ];

  return (
    <div className="animate-step-in mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span>Menús de restaurante</span>
          <span>Paso {step} de {TOTAL_STEPS}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%`, background: "linear-gradient(90deg, var(--brand-magenta), var(--brand-cyan))" }}
          />
        </div>
      </div>

      {/* Paso 1: material */}
      {step === 1 && (
        <div>
          <h3 className="mb-1 flex items-center gap-2 text-xl font-bold"><FileText className="h-5 w-5" style={{ color: "var(--brand-magenta)" }} /> Elegí el tipo de menú</h3>
          <p className="mb-5 text-sm text-muted-foreground">El material define cómo se ve y cuánto dura tu menú.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {menuMaterials.map((m) => (
              <OptionCard
                key={m.id}
                active={sel.material === m.id}
                onClick={() => pickMaterial(m.id)}
                title={m.label}
                hint={m.hint}
                image={"image" in m ? m.image : undefined}
              />
            ))}
          </div>
        </div>
      )}

      {/* Paso 2: encuadernación */}
      {step === 2 && (
        <div>
          <h3 className="mb-1 flex items-center gap-2 text-xl font-bold"><Layers className="h-5 w-5" style={{ color: "var(--brand-magenta)" }} /> Encuadernación / presentación</h3>
          <p className="mb-5 text-sm text-muted-foreground">Solo te mostramos lo compatible con el material que elegiste.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {menuBindings.filter((b) => bindingsForMaterial.includes(b.id)).map((b) => (
              <OptionCard
                key={b.id}
                active={sel.binding === b.id}
                onClick={() => up({ binding: b.id })}
                title={b.label}
                hint={b.hint}
              />
            ))}
          </div>
          {sel.binding === "resorte" && (
            <p className="mt-4 rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">
              En el paso 5 te preguntamos cuántas hojas lleva cada menú.
            </p>
          )}
        </div>
      )}

      {/* Paso 3: acabado */}
      {step === 3 && (
        <div className="space-y-7">
          {showLaminado && (
            <div>
              <h3 className="mb-1 flex items-center gap-2 text-xl font-bold"><Sparkles className="h-5 w-5" style={{ color: "var(--brand-magenta)" }} /> Acabado</h3>
              <p className="mb-4 text-sm text-muted-foreground">El laminado protege el menú de derrames y uso diario.</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {menuFinishes.map((f) => (
                  <OptionCard key={f.id} active={sel.finish === f.id} onClick={() => up({ finish: f.id })} title={f.label} hint={f.hint} />
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="mb-1 text-xl font-bold">Forma</h3>
            <p className="mb-4 text-sm text-muted-foreground">¿Rectangular clásico o con un corte especial?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {menuShapes.map((s) => (
                <OptionCard key={s.id} active={sel.shape === s.id} onClick={() => up({ shape: s.id })} title={s.label} hint={s.hint} />
              ))}
            </div>
            {sel.shape === "corte-especial" && (
              <Textarea
                value={sel.shapeNotes}
                onChange={(e) => up({ shapeNotes: e.target.value })}
                placeholder="Contanos qué corte necesitás (ej: esquinas redondeadas, forma de hoja, etc.)"
                className="mt-3 min-h-[70px] rounded-2xl border-2"
              />
            )}
          </div>
        </div>
      )}

      {/* Paso 4: tamaño */}
      {step === 4 && (
        <div>
          <h3 className="mb-1 flex items-center gap-2 text-xl font-bold"><Ruler className="h-5 w-5" style={{ color: "var(--brand-magenta)" }} /> Tamaño</h3>
          <p className="mb-5 text-sm text-muted-foreground">Elegí un tamaño estándar o decinos el tuyo.</p>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {menuSizes.map((s) => (
              <OptionCard
                key={s.id}
                active={sel.size === s.id}
                onClick={() => up({ size: s.id })}
                title={s.label}
                hint={`${s.dims} · ${s.hint}`}
              />
            ))}
          </div>
          {sel.size === "otro" && (
            <div className="mt-4 space-y-3 rounded-2xl border border-border bg-background p-4">
              <div>
                <Label className="text-sm font-semibold">Ancho × alto y unidad</Label>
                <Input
                  value={sel.customSize}
                  onChange={(e) => up({ customSize: e.target.value })}
                  placeholder="Ej: 20 × 30 cm"
                  className="mt-1.5 rounded-xl border-2"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">Cuéntanos qué necesitas (opcional)</Label>
                <Textarea
                  value={sel.customSizeNotes}
                  onChange={(e) => up({ customSizeNotes: e.target.value })}
                  placeholder="Ej: es para colgar en la pared del local…"
                  className="mt-1.5 min-h-[70px] rounded-xl border-2"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Paso 5: caras y cantidad */}
      {step === 5 && (
        <div className="space-y-7">
          <h3 className="flex items-center gap-2 text-xl font-bold"><Copy className="h-5 w-5" style={{ color: "var(--brand-magenta)" }} /> Caras y cantidad</h3>
          <div>
            <Label className="text-sm font-semibold">Impresión</Label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {menuSides.map((s) => (
                <OptionCard key={s.id} active={sel.sides === s.id} onClick={() => up({ sides: s.id })} title={s.label} hint={s.id === "una" ? "Solo el frente impreso." : "Frente y reverso impresos."} />
              ))}
            </div>
          </div>
          <div>
            <Label className="text-sm font-semibold">Cantidad de menús</Label>
            <Input
              type="number"
              min={1}
              value={sel.quantity}
              onChange={(e) => up({ quantity: Math.max(1, parseInt(e.target.value || "1", 10)) })}
              className="mt-2 h-12 w-32 rounded-xl border-2 text-center text-lg font-bold"
            />
          </div>
          {needsPages && (
            <div>
              <Label className="text-sm font-semibold">Hojas por menú (con resorte)</Label>
              <Input
                type="number"
                min={1}
                value={sel.pages}
                onChange={(e) => up({ pages: Math.max(1, parseInt(e.target.value || "1", 10)) })}
                className="mt-2 h-12 w-32 rounded-xl border-2 text-center text-lg font-bold"
              />
            </div>
          )}
        </div>
      )}

      {/* Paso 6: quién hace el diseño */}
      {step === 6 && (
        <div>
          <h3 className="mb-1 flex items-center gap-2 text-xl font-bold"><Palette className="h-5 w-5" style={{ color: "var(--brand-magenta)" }} /> ¿Quién hace el diseño?</h3>
          <p className="mb-5 text-sm text-muted-foreground">Elegí si ya tenés tu arte o si lo creamos nosotros.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <OptionCard
              active={sel.designMode === "propio"}
              onClick={() => up({ designMode: "propio" })}
              title="Ya tengo mi diseño"
              hint="Subís tu archivo y lo imprimimos tal cual."
            />
            <OptionCard
              active={sel.designMode === "idealo"}
              onClick={() => up({ designMode: "idealo" })}
              title="Diséñenlo ustedes 100%"
              hint="Nuestro equipo crea el arte completo para tu restaurante."
            />
          </div>

          {sel.designMode === "propio" && (
            <div className="mt-6 space-y-3">
              <UploadBox
                label="Subí tu diseño (PDF, AI, PSD, PNG o JPG)"
                accept="image/*,.pdf,.ai,.psd"
                file={sel.designFile}
                onFile={(f) => up({ designFile: f })}
              />
              <div className="rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">
                <strong className="text-foreground">Recomendaciones:</strong> archivo a 300 dpi, con sangrado de 3 mm y textos convertidos a curvas. El archivo lo adjuntás en el chat de WhatsApp al enviar la cotización.
              </div>
            </div>
          )}

          {sel.designMode === "idealo" && (
            <div className="mt-6 space-y-5">
              <div>
                <Label className="text-sm font-semibold">Nombre del restaurante *</Label>
                <Input value={sel.restaurant} onChange={(e) => up({ restaurant: e.target.value })} placeholder="Ej: La Casa de las Parrilladas" className="mt-1.5 rounded-xl border-2" />
              </div>
              <div>
                <Label className="text-sm font-semibold">Logo (opcional)</Label>
                <div className="mt-1.5">
                  <UploadBox label="Subí tu logo" accept="image/*,.pdf,.ai" file={sel.logo} onFile={(f) => up({ logo: f })} />
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold">Colores de marca (opcional)</Label>
                <Input value={sel.brandColors} onChange={(e) => up({ brandColors: e.target.value })} placeholder="Ej: negro y dorado" className="mt-1.5 rounded-xl border-2" />
              </div>
              <div>
                <Label className="text-sm font-semibold">Fotos de platos (opcional)</Label>
                <div className="mt-1.5">
                  <UploadBox
                    label="Subí fotos de tus platos"
                    accept="image/*"
                    file={sel.dishPhotos[0] ?? null}
                    onFile={(f) => up({ dishPhotos: f ? [f] : [] })}
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold">Platos y precios</Label>
                <Textarea
                  value={sel.dishes}
                  onChange={(e) => up({ dishes: e.target.value })}
                  placeholder="Escribí tu lista de platos con precios, o subí una foto/PDF de tu menú actual abajo."
                  className="mt-1.5 min-h-[90px] rounded-xl border-2"
                />
                <div className="mt-2">
                  <UploadBox label="O subí foto/PDF de tu menú actual" accept="image/*,.pdf" file={sel.menuFile} onFile={(f) => up({ menuFile: f })} />
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold">Estilo de referencia (opcional)</Label>
                <Input value={sel.styleRef} onChange={(e) => up({ styleRef: e.target.value })} placeholder="Link de Instagram, Pinterest o describí el estilo" className="mt-1.5 rounded-xl border-2" />
                <div className="mt-2">
                  <UploadBox label="O subí una imagen de referencia" accept="image/*" file={sel.styleImage} onFile={(f) => up({ styleImage: f })} />
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold">Comentarios (opcional)</Label>
                <Textarea value={sel.designNotes} onChange={(e) => up({ designNotes: e.target.value })} placeholder="Cualquier detalle extra para el diseñador…" className="mt-1.5 min-h-[70px] rounded-xl border-2" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Paso 7: contacto + resumen */}
      {step === 7 && (
        <div className="space-y-6">
          <h3 className="flex items-center gap-2 text-xl font-bold"><User className="h-5 w-5" style={{ color: "var(--brand-magenta)" }} /> Tus datos y resumen</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-sm font-semibold">Tu nombre *</Label>
              <Input value={sel.contactName} onChange={(e) => up({ contactName: e.target.value })} placeholder="Ej: María López" className="mt-1.5 rounded-xl border-2" />
            </div>
            <div>
              <Label className="text-sm font-semibold">Teléfono (opcional)</Label>
              <Input value={sel.contactPhone} onChange={(e) => up({ contactPhone: e.target.value })} placeholder="Ej: 9999-8888" className="mt-1.5 rounded-xl border-2" />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-sm font-semibold">Fecha deseada de entrega (opcional)</Label>
              <Input type="date" value={sel.deliveryDate} onChange={(e) => up({ deliveryDate: e.target.value })} className="mt-1.5 rounded-xl border-2" />
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-background p-5 shadow-card-soft sm:p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Resumen de tu pedido</div>
            <dl className="mt-4 space-y-2 text-sm">
              {summaryRows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-border/60 pb-2">
                  <dt className="shrink-0 text-muted-foreground">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">
              Sin precios aquí: te enviamos la cotización final por WhatsApp tras revisar tu pedido.
            </p>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!canNext}
            onClick={(e) => { if (!canNext) e.preventDefault(); }}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-cta animate-rainbow-shimmer px-6 py-4 text-base font-semibold text-white shadow-elegant transition",
              canNext ? "hover:scale-[1.01]" : "cursor-not-allowed opacity-60",
            )}
          >
            <MessageCircle className="h-5 w-5" /> Solicitar cotización por WhatsApp
          </a>
          {!canNext && <p className="text-center text-xs text-muted-foreground">Escribí tu nombre para enviar la solicitud.</p>}
          {(sel.designFile || sel.logo || sel.menuFile || sel.styleImage || sel.dishPhotos.length > 0) && (
            <p className="rounded-xl bg-muted px-4 py-3 text-center text-xs text-muted-foreground">
              Recordá adjuntar tus archivos en el chat de WhatsApp cuando se abra la conversación 📎
            </p>
          )}
        </div>
      )}

      {/* Navegación */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <Button variant="outline" onClick={back} className="rounded-full">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Atrás
        </Button>
        {step < TOTAL_STEPS && (
          <Button onClick={next} disabled={!canNext} className="rounded-full">
            Siguiente <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
