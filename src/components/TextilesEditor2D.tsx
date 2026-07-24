import { useEffect, useMemo, useRef, useState } from "react";
import { toBlob } from "html-to-image";
import { cn } from "@/lib/utils";
import {
  Upload, Type, Trash2, Image as ImageIcon, Download,
  ChevronUp, ChevronDown, Palette,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import viewFront from "@/assets/tx-view-front.png.asset.json";
import viewBack from "@/assets/tx-view-back.png.asset.json";
import viewSleeveL from "@/assets/tx-view-sleeve-left.png.asset.json";
import viewSleeveR from "@/assets/tx-view-sleeve-right.png.asset.json";
import viewNeck from "@/assets/tx-view-neck.png.asset.json";
import photoFront from "@/assets/tx-photo-front.jpg.asset.json";
import photoBack from "@/assets/tx-photo-back.jpg.asset.json";
import photoFolded from "@/assets/tx-photo-folded.jpg.asset.json";

export type ViewId = "front" | "back" | "sleeve-left" | "sleeve-right" | "neck";

type Layer = {
  id: string;
  view: ViewId;
  type: "image" | "text";
  // % of canvas
  x: number; y: number; w: number; h: number;
  rotation: number;
  // image
  src?: string;
  naturalW?: number;
  naturalH?: number;
  // text
  text?: string;
  font?: string;
  color?: string;
  weight?: number;
};

// Print zones in % of the corresponding view image (empirically matched to uploads)
const PRINT_ZONE: Record<ViewId, { x: number; y: number; w: number; h: number }> = {
  front: { x: 30, y: 25, w: 40, h: 45 },
  back: { x: 30, y: 20, w: 40, h: 50 },
  "sleeve-left": { x: 42, y: 22, w: 20, h: 55 },
  "sleeve-right": { x: 42, y: 22, w: 20, h: 55 },
  neck: { x: 38, y: 25, w: 24, h: 30 },
};

const VIEWS: { id: ViewId; label: string; src: string }[] = [
  { id: "front", label: "Frente", src: viewFront.url },
  { id: "back", label: "Espalda", src: viewBack.url },
  { id: "sleeve-left", label: "Manga izquierda", src: viewSleeveL.url },
  { id: "sleeve-right", label: "Manga derecha", src: viewSleeveR.url },
  { id: "neck", label: "Etiqueta interna", src: viewNeck.url },
];

const FONTS = [
  { id: "'Inter', sans-serif", label: "Inter" },
  { id: "'Poppins', sans-serif", label: "Poppins" },
  { id: "'Montserrat', sans-serif", label: "Montserrat" },
  { id: "'Playfair Display', serif", label: "Playfair" },
  { id: "'Bebas Neue', sans-serif", label: "Bebas Neue" },
  { id: "'Oswald', sans-serif", label: "Oswald" },
  { id: "'Pacifico', cursive", label: "Pacifico" },
  { id: "'Anton', sans-serif", label: "Anton" },
];

// One-time Google Fonts load
let __fontsLoaded = false;
function ensureFonts() {
  if (__fontsLoaded || typeof document === "undefined") return;
  __fontsLoaded = true;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@400;700&family=Montserrat:wght@400;700;900&family=Playfair+Display:wght@400;700&family=Bebas+Neue&family=Oswald:wght@400;700&family=Pacifico&family=Anton&display=swap";
  document.head.appendChild(link);
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

type Props = {
  shirtColor: string; // hex
  onWhatsApp: (extra: { viewsSummary: string; blob: Blob | null }) => void;
  disabled?: boolean;
  ctaLabel?: string;
};

export default function TextilesEditor2D({ shirtColor, onWhatsApp, disabled, ctaLabel }: Props) {
  useEffect(() => { ensureFonts(); }, []);
  const [view, setView] = useState<ViewId>("front");
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);

  const zone = PRINT_ZONE[view];
  const viewLayers = layers.filter((l) => l.view === view);
  const selected = layers.find((l) => l.id === selectedId) ?? null;

  const updateLayer = (id: string, patch: Partial<Layer>) =>
    setLayers((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const removeLayer = (id: string) => {
    setLayers((ls) => ls.filter((l) => l.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const addImageLayer = (src: string, natW: number, natH: number) => {
    // Fit inside print zone, preserve aspect ratio.
    const ratio = natW / natH;
    let w = zone.w * 0.7;
    let h = w / ratio;
    if (h > zone.h * 0.7) { h = zone.h * 0.7; w = h * ratio; }
    const id = uid();
    setLayers((ls) => [
      ...ls,
      {
        id, view, type: "image", src, naturalW: natW, naturalH: natH,
        x: zone.x + zone.w / 2 - w / 2,
        y: zone.y + zone.h / 2 - h / 2,
        w, h, rotation: 0,
      },
    ]);
    setSelectedId(id);
  };

  const addTextLayer = () => {
    const id = uid();
    const w = zone.w * 0.7;
    const h = 8;
    setLayers((ls) => [
      ...ls,
      {
        id, view, type: "text",
        text: "TU TEXTO",
        font: FONTS[4].id, color: "#111827", weight: 700,
        x: zone.x + zone.w / 2 - w / 2,
        y: zone.y + zone.h / 2 - h / 2,
        w, h, rotation: 0,
      },
    ]);
    setSelectedId(id);
  };

  const onFile = (f: File | null) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => addImageLayer(url, img.naturalWidth, img.naturalHeight);
    img.src = url;
  };

  // Pointer drag/resize
  type Op =
    | { kind: "move"; id: string; sx: number; sy: number; ox: number; oy: number }
    | { kind: "resize"; id: string; handle: string; sx: number; sy: number; ox: number; oy: number; ow: number; oh: number };
  const op = useRef<Op | null>(null);

  const pctFromEvent = (e: React.PointerEvent | PointerEvent) => {
    const rect = stageRef.current!.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      rect,
    };
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const cur = op.current;
      if (!cur || !stageRef.current) return;
      const p = pctFromEvent(e);
      const dx = p.x - cur.sx;
      const dy = p.y - cur.sy;
      if (cur.kind === "move") {
        updateLayer(cur.id, { x: cur.ox + dx, y: cur.oy + dy });
      } else {
        let { ox, oy, ow, oh } = cur;
        const h = cur.handle;
        if (h.includes("r")) ow = Math.max(3, cur.ow + dx);
        if (h.includes("l")) { ow = Math.max(3, cur.ow - dx); ox = cur.ox + (cur.ow - ow); }
        if (h.includes("b")) oh = Math.max(3, cur.oh + dy);
        if (h.includes("t")) { oh = Math.max(3, cur.oh - dy); oy = cur.oy + (cur.oh - oh); }
        updateLayer(cur.id, { x: ox, y: oy, w: ow, h: oh });
      }
    };
    const up = () => { op.current = null; };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const startMove = (e: React.PointerEvent, l: Layer) => {
    e.stopPropagation();
    setSelectedId(l.id);
    const p = pctFromEvent(e);
    op.current = { kind: "move", id: l.id, sx: p.x, sy: p.y, ox: l.x, oy: l.y };
  };
  const startResize = (e: React.PointerEvent, l: Layer, handle: string) => {
    e.stopPropagation();
    setSelectedId(l.id);
    const p = pctFromEvent(e);
    op.current = { kind: "resize", id: l.id, handle, sx: p.x, sy: p.y, ox: l.x, oy: l.y, ow: l.w, oh: l.h };
  };

  // Mockup: only front photo shows the current front-view design overlay
  const mockups = useMemo(() => ([
    { id: "photo-front", label: "Frente (lifestyle)", src: photoFront.url, view: "front" as ViewId, overlay: { x: 34, y: 34, w: 32, h: 32 } },
    { id: "photo-back", label: "Espalda", src: photoBack.url, view: "back" as ViewId, overlay: { x: 34, y: 24, w: 32, h: 36 } },
    { id: "photo-folded", label: "Doblada", src: photoFolded.url, view: "front" as ViewId, overlay: { x: 40, y: 44, w: 22, h: 20 } },
  ]), []);

  const composeAndSend = async () => {
    setBusy(true);
    let blob: Blob | null = null;
    try {
      if (stageRef.current) blob = await toBlob(stageRef.current, { pixelRatio: 2, cacheBust: true, backgroundColor: "#ffffff" });
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = `idealo-diseno-${view}-${Date.now()}.png`;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
      }
    } catch { /* ignore */ }
    const parts = VIEWS.map((v) => {
      const n = layers.filter((l) => l.view === v.id).length;
      return n ? `${v.label}: ${n} elemento(s)` : null;
    }).filter(Boolean) as string[];
    onWhatsApp({ viewsSummary: parts.join(" · ") || "sin elementos", blob });
    setBusy(false);
  };

  const totalLayers = layers.length;

  return (
    <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_260px]">
      {/* LEFT: tools */}
      <div className="space-y-3 rounded-2xl border border-border bg-background p-3">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Herramientas</div>
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/svg+xml" className="hidden" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
        <button onClick={() => fileRef.current?.click()} className="flex w-full items-center gap-2 rounded-xl border-2 border-dashed border-border px-3 py-3 text-sm font-semibold hover:border-foreground/30">
          <Upload className="h-4 w-4" style={{ color: "var(--brand-pink)" }} /> Subir imagen / logo
        </button>
        <p className="text-[10px] leading-snug text-muted-foreground">PNG con fondo transparente recomendado.</p>
        <button onClick={addTextLayer} className="flex w-full items-center gap-2 rounded-xl border border-border px-3 py-3 text-sm font-semibold hover:bg-muted">
          <Type className="h-4 w-4" style={{ color: "var(--brand-cyan-deep)" }} /> Agregar texto
        </button>

        {/* Selected layer inspector */}
        {selected && (
          <div className="space-y-2 rounded-xl border border-border/70 bg-muted/40 p-2.5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {selected.type === "text" ? "Texto" : "Imagen"}
              </div>
              <button onClick={() => removeLayer(selected.id)} className="rounded-md p-1 text-red-500 hover:bg-red-50">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            {selected.type === "text" && (
              <>
                <Input
                  value={selected.text ?? ""}
                  onChange={(e) => updateLayer(selected.id, { text: e.target.value })}
                  className="h-8 text-xs"
                  placeholder="Tu texto"
                />
                <select
                  value={selected.font}
                  onChange={(e) => updateLayer(selected.id, { font: e.target.value })}
                  className="h-8 w-full rounded-md border border-border bg-background px-2 text-xs"
                >
                  {FONTS.map((f) => (
                    <option key={f.id} value={f.id} style={{ fontFamily: f.id }}>{f.label}</option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  <Palette className="h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="color"
                    value={selected.color ?? "#111827"}
                    onChange={(e) => updateLayer(selected.id, { color: e.target.value })}
                    className="h-7 w-full cursor-pointer rounded border border-border bg-background"
                  />
                </div>
              </>
            )}
            <div className="text-[10px] text-muted-foreground">Arrastra las esquinas para redimensionar.</div>
          </div>
        )}

        {/* Layers list */}
        {viewLayers.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Capas · {VIEWS.find(v => v.id === view)?.label}</div>
            {viewLayers.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setSelectedId(l.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-xs transition",
                  selectedId === l.id ? "border-foreground bg-foreground/5" : "border-border hover:bg-muted"
                )}
              >
                {l.type === "image" ? <ImageIcon className="h-3.5 w-3.5" /> : <Type className="h-3.5 w-3.5" />}
                <span className="truncate">{l.type === "text" ? (l.text || "Texto") : `Imagen ${i + 1}`}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CENTER: canvas */}
      <div className="min-w-0">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Editor · {VIEWS.find(v => v.id === view)?.label}
        </div>
        <div
          className="relative mx-auto w-full overflow-hidden rounded-2xl border border-border shadow-card-soft"
          style={{ aspectRatio: "4 / 3", backgroundColor: "#f5f2ea" }}
          onPointerDown={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}
        >
          <div ref={stageRef} className="absolute inset-0">
            {/* Fabric color tint under the vector line-art */}
            <div className="absolute inset-[8%] rounded-xl" style={{ backgroundColor: shirtColor, opacity: 0.35 }} aria-hidden />
            <img
              src={VIEWS.find(v => v.id === view)!.src}
              alt=""
              draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
            />
            {/* Print area */}
            <div
              className="pointer-events-none absolute rounded-md border-2 border-dashed"
              style={{
                left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%`,
                borderColor: "rgba(60,60,60,0.55)",
              }}
            />

            {/* Layers */}
            {viewLayers.map((l) => {
              const isSel = selectedId === l.id;
              return (
                <div
                  key={l.id}
                  onPointerDown={(e) => startMove(e, l)}
                  className={cn("absolute select-none touch-none cursor-move", isSel && "outline-2")}
                  style={{
                    left: `${l.x}%`, top: `${l.y}%`, width: `${l.w}%`, height: `${l.h}%`,
                    transform: `rotate(${l.rotation}deg)`, transformOrigin: "center",
                  }}
                >
                  {l.type === "image" ? (
                    <img src={l.src} alt="" draggable={false} className="pointer-events-none h-full w-full object-contain" />
                  ) : (
                    <div
                      className="pointer-events-none flex h-full w-full items-center justify-center whitespace-nowrap"
                      style={{
                        fontFamily: l.font,
                        color: l.color,
                        fontWeight: l.weight,
                        fontSize: `${l.h * 0.9}cqh`,
                        containerType: "size" as any,
                      }}
                    >
                      {l.text}
                    </div>
                  )}
                  {isSel && (
                    <>
                      <div className="pointer-events-none absolute -inset-1 rounded border-2 border-dashed border-[color:var(--brand-pink)]" />
                      {["tl","tr","bl","br","tm","bm","ml","mr"].map((h) => {
                        const style: React.CSSProperties = {
                          position: "absolute",
                          width: 12, height: 12, borderRadius: 999,
                          background: "#fff",
                          border: "2px solid color-mix(in oklab, var(--brand-pink) 90%, black)",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                          touchAction: "none",
                          top: h.startsWith("t") ? -6 : h.startsWith("b") ? "auto" : "50%",
                          bottom: h.startsWith("b") ? -6 : "auto",
                          left: h.endsWith("l") ? -6 : h.endsWith("r") ? "auto" : "50%",
                          right: h.endsWith("r") ? -6 : "auto",
                          transform: (h === "tm" || h === "bm") ? "translateX(-50%)" : (h === "ml" || h === "mr") ? "translateY(-50%)" : undefined,
                          cursor: (h === "tl" || h === "br") ? "nwse-resize" : (h === "tr" || h === "bl") ? "nesw-resize" : (h === "tm" || h === "bm") ? "ns-resize" : "ew-resize",
                          zIndex: 40,
                        };
                        const handleMap: Record<string, string> = { tl:"tl", tr:"tr", bl:"bl", br:"br", tm:"t", bm:"b", ml:"l", mr:"r" };
                        return (
                          <span
                            key={h}
                            onPointerDown={(e) => startResize(e, l, handleMap[h])}
                            style={style}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* View tabs */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {VIEWS.map((v) => {
            const active = view === v.id;
            const count = layers.filter((l) => l.view === v.id).length;
            return (
              <button
                key={v.id}
                onClick={() => { setView(v.id); setSelectedId(null); }}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                  active ? "bg-foreground text-background" : "border border-border bg-background text-muted-foreground hover:bg-muted",
                )}
              >
                {v.label}
                {count > 0 && <span className="ml-1.5 rounded-full bg-[color:var(--brand-pink)]/20 px-1.5 py-0.5 text-[9px] text-[color:var(--brand-pink)]">{count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: mockups */}
      <div className="space-y-2">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Mockups fotorrealistas</div>
        {mockups.map((m) => {
          const overlays = layers.filter((l) => l.view === m.view);
          return (
            <div key={m.id} className="overflow-hidden rounded-xl border border-border bg-white shadow-card-soft">
              <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
                <img src={m.src} alt={m.label} className="absolute inset-0 h-full w-full object-cover" />
                {/* Color tint */}
                <div className="absolute inset-0" style={{ backgroundColor: shirtColor, mixBlendMode: "multiply", opacity: 0.28 }} />
                {/* Print area window with layers, blended into fabric */}
                <div
                  className="absolute overflow-hidden"
                  style={{
                    left: `${m.overlay.x}%`, top: `${m.overlay.y}%`,
                    width: `${m.overlay.w}%`, height: `${m.overlay.h}%`,
                    mixBlendMode: "multiply",
                    opacity: 0.95,
                  }}
                >
                  {overlays.map((l) => {
                    const zx = PRINT_ZONE[m.view];
                    // Map layer coords (relative to full-view canvas) into overlay window (relative to print zone)
                    const nx = ((l.x - zx.x) / zx.w) * 100;
                    const ny = ((l.y - zx.y) / zx.h) * 100;
                    const nw = (l.w / zx.w) * 100;
                    const nh = (l.h / zx.h) * 100;
                    return (
                      <div key={l.id} className="absolute" style={{ left: `${nx}%`, top: `${ny}%`, width: `${nw}%`, height: `${nh}%`, transform: `rotate(${l.rotation}deg)` }}>
                        {l.type === "image" ? (
                          <img src={l.src} alt="" className="h-full w-full object-contain" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center whitespace-nowrap" style={{ fontFamily: l.font, color: l.color, fontWeight: l.weight, fontSize: `${nh * 0.9}cqh`, containerType: "size" as any }}>{l.text}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground">{m.label}</div>
            </div>
          );
        })}
      </div>

      {/* CTA — spans all columns */}
      <div className="lg:col-span-3">
        <button
          type="button"
          disabled={disabled || busy || totalLayers === 0}
          onClick={composeAndSend}
          className={cn(
            "mt-2 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold text-white shadow-elegant transition",
            !disabled && !busy && totalLayers > 0
              ? "bg-gradient-cta animate-rainbow-shimmer hover:scale-[1.01]"
              : "cursor-not-allowed bg-muted-foreground/40",
          )}
        >
          <Download className="h-5 w-5" />
          {busy ? "Generando vista…" : totalLayers === 0 ? "Agrega tu diseño para continuar" : (ctaLabel ?? "Cotizar por WhatsApp")}
        </button>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Se descarga la vista del editor (PNG) y se abre WhatsApp con todos los detalles.
        </p>
      </div>
    </div>
  );
}
