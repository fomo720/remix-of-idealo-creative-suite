import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { toBlob, toPng } from "html-to-image";
import { cn } from "@/lib/utils";
import {
  Upload, Type, Trash2, Image as ImageIcon, Download,
  Palette, Sparkles, ZoomIn, X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ErrorBoundary from "@/components/ErrorBoundary";
const TextilesShirt3D = lazy(() => import("@/components/TextilesShirt3D"));

function Viewer3DFallback({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-[420px] flex-col items-center justify-center gap-3 p-4 text-center">
      <div className="text-sm font-semibold text-foreground">
        No se pudo cargar la vista 3D. Recargá la página o avisanos.
      </div>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
      >
        Reintentar
      </button>
    </div>
  );
}
import viewFrontLine from "@/assets/view-11-line.png.asset.json";
import viewFrontFill from "@/assets/view-11-fill.png.asset.json";
import viewBackLine from "@/assets/view-12-line.png.asset.json";
import viewBackFill from "@/assets/view-12-fill.png.asset.json";
import viewSleeveLLine from "@/assets/view-13-line.png.asset.json";
import viewSleeveLFill from "@/assets/view-13-fill.png.asset.json";
import viewSleeveRLine from "@/assets/view-14-line.png.asset.json";
import viewSleeveRFill from "@/assets/view-14-fill.png.asset.json";
import mockFront from "@/assets/tx-white-front.jpg.asset.json";
import mockBack from "@/assets/tx-white-back.jpg.asset.json";
import mockFolded from "@/assets/tx-white-folded.jpg.asset.json";

import { PRINT_ZONE, ZONE_CM, type ViewId } from "@/lib/print-zones";
export type { ViewId };
export { PRINT_ZONE, ZONE_CM };

type Layer = {
  id: string;
  view: ViewId;
  type: "image" | "text";
  x: number; y: number; w: number; h: number; // % of print zone
  rotation: number;
  src?: string;
  naturalW?: number;
  naturalH?: number;
  text?: string;
  font?: string;
  color?: string;
  weight?: number;
};

// Predefined placements, expressed in % of the existing print zone
// (so the clipping / print-zone logic stays untouched).
type PositionPreset = { id: string; label: string; hint: string; x: number; y: number; w: number; h: number };
const POSITION_PRESETS: Record<ViewId, PositionPreset[]> = {
  front: [
    { id: "left-chest",   label: "Pecho izquierdo", hint: "chico",   x: 6,  y: 8,  w: 30, h: 22 },
    { id: "center-chest", label: "Centro del pecho", hint: "mediano", x: 22, y: 20, w: 56, h: 42 },
    { id: "full-front",   label: "Pecho completo",  hint: "grande",  x: 6,  y: 10, w: 88, h: 76 },
  ],
  back: [
    { id: "under-collar", label: "Bajo el cuello",   hint: "chico",   x: 30, y: 2,  w: 40, h: 16 },
    { id: "upper-back",   label: "Espalda centro-alto", hint: "mediano", x: 20, y: 14, w: 60, h: 44 },
    { id: "full-back",    label: "Espalda completa", hint: "grande",  x: 5,  y: 8,  w: 90, h: 80 },
  ],
  "sleeve-left": [
    { id: "sleeve-high",   label: "Manga alta",     hint: "chico", x: 15, y: 8,  w: 70, h: 20 },
    { id: "sleeve-center", label: "Manga centrada", hint: "chico", x: 15, y: 40, w: 70, h: 20 },
  ],
  "sleeve-right": [
    { id: "sleeve-high",   label: "Manga alta",     hint: "chico", x: 15, y: 8,  w: 70, h: 20 },
    { id: "sleeve-center", label: "Manga centrada", hint: "chico", x: 15, y: 40, w: 70, h: 20 },
  ],
};

const roundHalf = (n: number) => Math.round(n * 2) / 2;
function cmLabelFor(view: ViewId, w: number, h: number) {
  const z = ZONE_CM[view];
  return `${roundHalf((w / 100) * z.w)} cm x ${roundHalf((h / 100) * z.h)} cm`;
}

const VIEWS: { id: ViewId; label: string; line: string; fill: string }[] = [
  { id: "front",         label: "Frente",         line: viewFrontLine.url,   fill: viewFrontFill.url },
  { id: "back",          label: "Espalda",        line: viewBackLine.url,    fill: viewBackFill.url },
  { id: "sleeve-left",   label: "Manga izq.",     line: viewSleeveLLine.url, fill: viewSleeveLFill.url },
  { id: "sleeve-right",  label: "Manga der.",     line: viewSleeveRLine.url, fill: viewSleeveRFill.url },
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

function uid() { return Math.random().toString(36).slice(2, 9); }

type Props = {
  shirtColor: string; // hex
  onWhatsApp: (extra: { viewsSummary: string; blob: Blob | null }) => void;
  onDesignForMe?: () => void;
  disabled?: boolean;
  ctaLabel?: string;
};

// A mockup describes how each view's design projects onto a real photo.
// `box` = bounding box of design area (% of image). `transform` = extra CSS
// transform applied to the design layer inside the box to fake curvature.
type MockOverlay = {
  view: ViewId;
  box: { x: number; y: number; w: number; h: number };
  transform?: string;    // extra CSS transform (perspective, rotate)
  opacity?: number;
  blend?: React.CSSProperties["mixBlendMode"];
};
type Mockup = {
  id: string;
  label: string;
  src: string;
  overlays: MockOverlay[];
};

export default function TextilesEditor2D({ shirtColor, onWhatsApp, onDesignForMe, disabled, ctaLabel }: Props) {
  useEffect(() => { ensureFonts(); }, []);
  const [view, setView] = useState<ViewId>("front");
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState<Mockup | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const printRef = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [composite, setComposite] = useState<{ front: string | null; back: string | null }>({ front: null, back: null });

  const currentView = VIEWS.find((v) => v.id === view)!;
  const zone = PRINT_ZONE[view];
  const viewLayers = layers.filter((l) => l.view === view);
  const selected = layers.find((l) => l.id === selectedId) ?? null;

  const updateLayer = (id: string, patch: Partial<Layer>) =>
    setLayers((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const removeLayer = (id: string) => {
    setLayers((ls) => ls.filter((l) => l.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  // Places the selected layer into a predefined spot, keeping its aspect ratio.
  const applyPreset = (preset: PositionPreset) => {
    if (!selected) return;
    let w = preset.w;
    let h = preset.h;
    if (selected.type === "image" && selected.naturalW && selected.naturalH) {
      const zoneRatio = zone.w / zone.h;
      const imgRatio = selected.naturalW / selected.naturalH;
      h = (w / imgRatio) * zoneRatio;
      if (h > preset.h) { h = preset.h; w = (h * imgRatio) / zoneRatio; }
    }
    updateLayer(selected.id, {
      x: preset.x + (preset.w - w) / 2,
      y: preset.y + (preset.h - h) / 2,
      w, h,
    });
  };

  const addImageLayer = (src: string, natW: number, natH: number) => {
    const zoneRatio = zone.w / zone.h;
    const imgRatio = natW / natH;
    let w = 80;
    let h = (w / imgRatio) * zoneRatio;
    if (h > 80) { h = 80; w = (h * imgRatio) / zoneRatio; }
    const id = uid();
    setLayers((ls) => [
      ...ls,
      { id, view, type: "image", src, naturalW: natW, naturalH: natH,
        x: 50 - w / 2, y: 50 - h / 2, w, h, rotation: 0 },
    ]);
    setSelectedId(id);
  };

  const addTextLayer = () => {
    const id = uid();
    const w = 80, h = 18;
    setLayers((ls) => [
      ...ls,
      { id, view, type: "text",
        text: "TU TEXTO", font: FONTS[4].id, color: "#111827", weight: 700,
        x: 50 - w / 2, y: 50 - h / 2, w, h, rotation: 0 },
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

  type Op =
    | { kind: "move"; id: string; sx: number; sy: number; ox: number; oy: number }
    | { kind: "resize"; id: string; handle: string; sx: number; sy: number; ox: number; oy: number; ow: number; oh: number };
  const op = useRef<Op | null>(null);

  const pctFromEvent = (e: React.PointerEvent | PointerEvent) => {
    const rect = printRef.current!.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const cur = op.current;
      if (!cur || !printRef.current) return;
      const p = pctFromEvent(e);
      const dx = p.x - cur.sx;
      const dy = p.y - cur.sy;
      if (cur.kind === "move") {
        updateLayer(cur.id, { x: cur.ox + dx, y: cur.oy + dy });
      } else {
        let { ox, oy, ow, oh } = cur;
        const h = cur.handle;
        if (h.includes("r")) ow = Math.max(4, cur.ow + dx);
        if (h.includes("l")) { ow = Math.max(4, cur.ow - dx); ox = cur.ox + (cur.ow - ow); }
        if (h.includes("b")) oh = Math.max(4, cur.oh + dy);
        if (h.includes("t")) { oh = Math.max(4, cur.oh - dy); oy = cur.oy + (cur.oh - oh); }
        updateLayer(cur.id, { x: ox, y: oy, w: ow, h: oh });
      }
    };
    const up = () => { op.current = null; setResizing(false); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  // Regenerate the composite image for the current view (front/back only) so
  // the real 3D shirt can wear it as a UV-mapped texture. Debounced to avoid
  // hammering html-to-image while the user is dragging.
  useEffect(() => {
    if (view !== "front" && view !== "back") return;
    const activeView = view;
    const node = printRef.current;
    if (!node) return;
    const hasLayers = layers.some((l) => l.view === activeView);
    if (!hasLayers) {
      setComposite((c) => (c[activeView] === null ? c : { ...c, [activeView]: null }));
      return;
    }
    const t = setTimeout(async () => {
      try {
        const url = await toPng(node, {
          pixelRatio: 2,
          cacheBust: true,
          backgroundColor: undefined,
          filter: (n) =>
            !(n instanceof HTMLElement && n.dataset.compositeSkip === "true"),
        });
        setComposite((c) => ({ ...c, [activeView]: url }));
      } catch {
        /* ignore */
      }
    }, 300);
    return () => clearTimeout(t);
  }, [layers, view]);

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
    setResizing(true);
  };

  // MOCKUPS
  // Each mockup uses a transparent-background PNG of a blank sweater. We
  // desaturate the shirt with a CSS filter and overlay `shirtColor` masked
  // to the shirt silhouette so only fabric recolors (never the background).
  // Sleeve overlays get an extra 3D perspective transform to mimic wrap.
  const mockups: Mockup[] = useMemo(() => ([
    {
      id: "photo-front", label: "Frente (lifestyle)", src: mockFront.url,
      overlays: [
        { view: "front",        box: { x: 36, y: 34, w: 28, h: 26 }, blend: "multiply", opacity: 0.95 },
        { view: "sleeve-left",  box: { x: 20, y: 44, w: 10, h: 18 },
          transform: "perspective(360px) rotateY(35deg)", blend: "multiply", opacity: 0.9 },
        { view: "sleeve-right", box: { x: 70, y: 44, w: 10, h: 18 },
          transform: "perspective(360px) rotateY(-35deg)", blend: "multiply", opacity: 0.9 },
      ],
    },
    {
      id: "photo-back", label: "Espalda", src: mockBack.url,
      overlays: [
        { view: "back", box: { x: 36, y: 30, w: 28, h: 28 }, blend: "multiply", opacity: 0.95 },
      ],
    },
    {
      id: "photo-folded", label: "Doblada", src: mockFolded.url,
      overlays: [
        { view: "front", box: { x: 38, y: 46, w: 20, h: 16 },
          transform: "perspective(600px) rotateX(48deg) rotate(-6deg)",
          blend: "multiply", opacity: 0.92 },
      ],
    },
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
      if (!n) return null;
      const big = layers
        .filter((l) => l.view === v.id)
        .reduce((a, l) => (l.w * l.h > a.w * a.h ? l : a));
      return `${v.label}: ${n} elemento(s) (aprox. ${cmLabelFor(v.id, big.w, big.h)})`;
    }).filter(Boolean) as string[];
    onWhatsApp({ viewsSummary: parts.join(" · ") || "sin elementos", blob });
    setBusy(false);
  };

  const totalLayers = layers.length;

  const renderLayerIn = (l: Layer, opts?: { interactive?: boolean }) => {
    const interactive = opts?.interactive ?? false;
    const isSel = interactive && selectedId === l.id;
    return (
      <div
        key={l.id}
        onPointerDown={interactive ? (e) => startMove(e, l) : undefined}
        className={cn("absolute select-none", interactive && "cursor-move touch-none")}
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
              fontFamily: l.font, color: l.color, fontWeight: l.weight,
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
            {resizing && (
              <div
                data-composite-skip="true"
                className="pointer-events-none absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold text-background shadow-md"
              >
                ≈ {cmLabelFor(l.view, l.w, l.h)}
              </div>
            )}
            {["tl","tr","bl","br","tm","bm","ml","mr"].map((h) => {
              const style: React.CSSProperties = {
                position: "absolute", width: 12, height: 12, borderRadius: 999,
                background: "#fff",
                border: "2px solid color-mix(in oklab, var(--brand-pink) 90%, black)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.25)", touchAction: "none",
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
                <span key={h}
                  onPointerDown={(e) => startResize(e, l, handleMap[h])}
                  style={style} />
              );
            })}
          </>
        )}
      </div>
    );
  };

  // Renders one mockup card (shared between grid + zoom modal).
  const renderMockup = (m: Mockup, opts?: { large?: boolean }) => {
    const large = opts?.large ?? false;
    // Detect "white" so we skip the multiply tint (which would darken).
    const hex = shirtColor.replace("#", "");
    const isWhite = hex.length === 6 &&
      parseInt(hex.slice(0,2),16) > 240 &&
      parseInt(hex.slice(2,4),16) > 240 &&
      parseInt(hex.slice(4,6),16) > 240;
    return (
      <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
        {/* White sweater photo — preserves folds & lighting naturally */}
        <img
          src={m.src}
          alt={m.label}
          className="absolute inset-0 h-full w-full object-contain"
          loading={large ? "eager" : "lazy"}
        />
        {/* Color tint only when not white — masked to shirt silhouette */}
        {!isWhite && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundColor: shirtColor,
              mixBlendMode: "multiply",
              WebkitMaskImage: `url(${m.src})`,
              maskImage: `url(${m.src})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        )}
        {/* Design overlays with per-view perspective */}
        {m.overlays.map((ov, idx) => {
          const overlayLayers = layers.filter((l) => l.view === ov.view);
          if (overlayLayers.length === 0) return null;
          return (
            <div
              key={idx}
              className="pointer-events-none absolute overflow-hidden"
              style={{
                left: `${ov.box.x}%`, top: `${ov.box.y}%`,
                width: `${ov.box.w}%`, height: `${ov.box.h}%`,
                mixBlendMode: ov.blend ?? "multiply",
                opacity: ov.opacity ?? 0.95,
                transform: ov.transform,
                transformOrigin: "center",
              }}
            >
              {overlayLayers.map((l) => renderLayerIn(l))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)_260px]">
      {/* LEFT: tools */}
      <div className="space-y-3 rounded-2xl border border-border bg-background p-3">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Herramientas</div>
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/svg+xml" className="hidden" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
        <button onClick={() => fileRef.current?.click()} className="flex w-full items-center gap-2 rounded-xl border-2 border-dashed border-border px-3 py-3 text-sm font-semibold hover:border-foreground/30">
          <Upload className="h-4 w-4" style={{ color: "var(--brand-pink)" }} /> Subir mi Arte / Logo
        </button>
        <p className="text-[10px] leading-snug text-muted-foreground">PNG con fondo transparente recomendado.</p>
        <button onClick={addTextLayer} className="flex w-full items-center gap-2 rounded-xl border border-border px-3 py-3 text-sm font-semibold hover:bg-muted">
          <Type className="h-4 w-4" style={{ color: "var(--brand-cyan-deep)" }} /> Agregar texto
        </button>

        {onDesignForMe && (
          <button
            onClick={onDesignForMe}
            className="flex w-full items-center gap-2 rounded-xl border border-[color:var(--brand-pink)]/40 bg-[color:var(--brand-pink)]/5 px-3 py-3 text-left text-xs font-semibold text-foreground hover:bg-[color:var(--brand-pink)]/10"
          >
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-pink)" }} />
            <span className="leading-snug">
              Quiero que ustedes me lo diseñen
              <span className="mt-0.5 block text-[10px] font-medium text-muted-foreground">Servicio con costo adicional · Te contactamos por WhatsApp</span>
            </span>
          </button>
        )}

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
                <Input value={selected.text ?? ""} onChange={(e) => updateLayer(selected.id, { text: e.target.value })} className="h-8 text-xs" placeholder="Tu texto" />
                <select value={selected.font} onChange={(e) => updateLayer(selected.id, { font: e.target.value })} className="h-8 w-full rounded-md border border-border bg-background px-2 text-xs">
                  {FONTS.map((f) => (<option key={f.id} value={f.id} style={{ fontFamily: f.id }}>{f.label}</option>))}
                </select>
                <div className="flex items-center gap-2">
                  <Palette className="h-3.5 w-3.5 text-muted-foreground" />
                  <input type="color" value={selected.color ?? "#111827"} onChange={(e) => updateLayer(selected.id, { color: e.target.value })} className="h-7 w-full cursor-pointer rounded border border-border bg-background" />
                </div>
              </>
            )}
            <div className="rounded-lg border border-border/70 bg-background px-2 py-1.5">
              <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Tamaño aprox. impreso</div>
              <div className="text-sm font-semibold text-foreground">≈ {cmLabelFor(selected.view, selected.w, selected.h)}</div>
              <div className="text-[9px] text-muted-foreground">Medida referencial sobre talla M</div>
            </div>
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ubicación rápida</div>
              <div className="grid grid-cols-1 gap-1.5">
                {POSITION_PRESETS[view].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="rounded-xl border border-border bg-background px-2.5 py-1.5 text-left text-[11px] font-semibold transition hover:border-[color:var(--brand-pink)]/60 hover:bg-[color:var(--brand-pink)]/5"
                  >
                    {p.label}
                    <span className="block text-[9px] font-medium text-muted-foreground">
                      {p.hint} · ≈ {cmLabelFor(view, p.w, p.h)}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-[9px] leading-snug text-muted-foreground">Podés seguir arrastrando y ajustando a mano.</p>
            </div>
            <div className="text-[10px] text-muted-foreground">Arrastra las esquinas para redimensionar. Lo que sale del recuadro no se imprime.</div>
          </div>
        )}

        {viewLayers.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Capas · {currentView.label}</div>
            {viewLayers.map((l, i) => (
              <button key={l.id} onClick={() => setSelectedId(l.id)}
                className={cn("flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-xs transition",
                  selectedId === l.id ? "border-foreground bg-foreground/5" : "border-border hover:bg-muted")}>
                {l.type === "image" ? <ImageIcon className="h-3.5 w-3.5" /> : <Type className="h-3.5 w-3.5" />}
                <span className="truncate">{l.type === "text" ? (l.text || "Texto") : `Imagen ${i + 1}`}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CENTER: canvas */}
      <div className="min-w-0">
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Editor · {currentView.label}</span>
          <span className="hidden sm:inline">Solo el área punteada se imprime</span>
        </div>
        <div
          className="relative mx-auto w-full overflow-hidden rounded-2xl border border-border shadow-card-soft"
          style={{ aspectRatio: "4 / 3", background: "linear-gradient(180deg,#fbfaf6, #f2efe6)" }}
          onPointerDown={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}
        >
          <div ref={stageRef} className="absolute inset-0">
            {/* Shirt silhouette tinted with selected color via mask */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundColor: shirtColor,
                WebkitMaskImage: `url(${currentView.fill})`,
                maskImage: `url(${currentView.fill})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
            {/* Vector outline on top */}
            <img src={currentView.line} alt="" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain" />

            {/* Print area (clips content) */}
            <div
              ref={printRef}
              className="absolute overflow-hidden"
              style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%` }}
            >
              <div data-composite-skip="true" className="pointer-events-none absolute inset-0 rounded-[2px] border-2 border-dashed" style={{ borderColor: "rgba(60,60,60,0.55)" }} />
              {viewLayers.map((l) => renderLayerIn(l, { interactive: true }))}
            </div>
          </div>
        </div>

        {/* View tabs */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {VIEWS.map((v) => {
            const active = view === v.id;
            const count = layers.filter((l) => l.view === v.id).length;
            return (
              <button key={v.id}
                onClick={() => { setView(v.id); setSelectedId(null); }}
                className={cn("rounded-full px-3 py-1.5 text-xs font-semibold transition",
                  active ? "bg-foreground text-background" : "border border-border bg-background text-muted-foreground hover:bg-muted")}>
                {v.label}
                {count > 0 && <span className="ml-1.5 rounded-full bg-[color:var(--brand-pink)]/20 px-1.5 py-0.5 text-[9px] text-[color:var(--brand-pink)]">{count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: real 3D viewer (front/back) or sleeve notice */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Vista 3D real</span>
          {(view === "front" || view === "back") && (
            <button
              type="button"
              onClick={() => setZoomed({ id: "3d", label: `Vista 3D · ${currentView.label}`, src: "", overlays: [] })}
              className="flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground hover:bg-muted"
              aria-label="Ampliar 3D"
            >
              <ZoomIn className="h-3 w-3" /> Zoom
            </button>
          )}
        </div>

        {view === "front" || view === "back" ? (
          <div className="overflow-hidden rounded-xl border border-border bg-white shadow-card-soft">
            <ErrorBoundary fallback={(reset) => <Viewer3DFallback reset={reset} />}>
              <Suspense
                fallback={
                  <div className="flex h-[420px] items-center justify-center text-xs text-muted-foreground">
                    Cargando vista 3D…
                  </div>
                }
              >
                <TextilesShirt3D
                  color={shirtColor}
                  sleeve="corta"
                  side={view === "back" ? "back" : "front"}
                  imageUrl={composite[view] ?? null}
                />
              </Suspense>
            </ErrorBoundary>
            <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground">
              {currentView.label} · gira, acerca y aleja la prenda
            </div>
          </div>
        ) : (
          <div className="flex h-[220px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center">
            <div className="text-xs font-semibold text-foreground">Vista 3D disponible para frente y espalda</div>
            <p className="text-[11px] leading-snug text-muted-foreground">
              El diseño de manga se confirma sobre la vista técnica de la izquierda.
            </p>
          </div>
        )}
      </div>

      {/* Zoom modal (3D viewer at large size) */}
      <Dialog open={!!zoomed} onOpenChange={(o) => !o && setZoomed(null)}>
        <DialogContent className="max-w-3xl p-2 sm:p-4">
          {zoomed && (view === "front" || view === "back") && (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="text-sm font-semibold">{zoomed.label}</div>
                <button onClick={() => setZoomed(null)} className="rounded-full p-1 text-muted-foreground hover:bg-muted"><X className="h-4 w-4" /></button>
              </div>
              <div className="overflow-hidden rounded-xl bg-white">
                <ErrorBoundary fallback={(reset) => <Viewer3DFallback reset={reset} />}>
                  <Suspense fallback={<div className="flex h-[520px] items-center justify-center text-xs text-muted-foreground">Cargando vista 3D…</div>}>
                    <TextilesShirt3D
                      color={shirtColor}
                      sleeve="corta"
                      side={view === "back" ? "back" : "front"}
                      imageUrl={composite[view] ?? null}
                    />
                  </Suspense>
                </ErrorBoundary>
              </div>
              <p className="text-center text-[11px] text-muted-foreground">Modelo 3D real · el diseño se aplica sobre las UVs de la prenda.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
        {totalLayers === 0 && onDesignForMe && (
          <button
            type="button"
            onClick={onDesignForMe}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[color:var(--brand-pink)]/50 bg-[color:var(--brand-pink)]/5 px-6 py-3 text-sm font-semibold text-foreground hover:bg-[color:var(--brand-pink)]/10"
          >
            <Sparkles className="h-4 w-4" style={{ color: "var(--brand-pink)" }} />
            ¿No tenés diseño? Nosotros te lo diseñamos (costo adicional)
          </button>
        )}
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Se descarga la vista del editor (PNG) y se abre WhatsApp con todos los detalles.
        </p>
      </div>
    </div>
  );
}
