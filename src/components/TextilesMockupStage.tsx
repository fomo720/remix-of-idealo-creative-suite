import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  PRINT_ZONE,
  ZONE_CM,
  SAFE_RATIO,
  cmToIn,
  measureLabel,
  type ViewId,
} from "@/lib/print-zones";

export type StageLayer = { x: number; y: number; w: number; h: number }; // % de la zona de impresión

type Handle = "nw" | "ne" | "sw" | "se" | "w" | "e";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/**
 * Mockup grande con la zona de impresión marcada:
 * caja punteada + pills "Área segura" / "Sangrado" + reglas con medida real en cm/pulgadas.
 * El diseño subido se arrastra y redimensiona dentro de la caja.
 */
export function TextilesMockupStage({
  photoSrc,
  photoAlt,
  view,
  design,
  layer,
  onLayerChange,
  className,
}: {
  photoSrc: string;
  photoAlt: string;
  view: ViewId;
  design: string | null;
  layer: StageLayer;
  onLayerChange: (l: StageLayer) => void;
  className?: string;
}) {
  const zone = PRINT_ZONE[view];
  const zoneCm = ZONE_CM[view];
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [live, setLive] = useState(false);

  const drag = useRef<
    | null
    | { mode: "move" | Handle; startX: number; startY: number; box: DOMRect; init: StageLayer }
  >(null);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      const dx = ((e.clientX - d.startX) / d.box.width) * 100;
      const dy = ((e.clientY - d.startY) / d.box.height) * 100;
      const i = d.init;
      let next: StageLayer = { ...i };

      if (d.mode === "move") {
        next.x = clamp(i.x + dx, 0, 100 - i.w);
        next.y = clamp(i.y + dy, 0, 100 - i.h);
      } else {
        const west = d.mode === "nw" || d.mode === "sw" || d.mode === "w";
        const north = d.mode === "nw" || d.mode === "ne";
        const south = d.mode === "sw" || d.mode === "se";

        if (west) {
          const x = clamp(i.x + dx, 0, i.x + i.w - 5);
          next.w = i.w + (i.x - x);
          next.x = x;
        } else {
          next.w = clamp(i.w + dx, 5, 100 - i.x);
        }
        if (north) {
          const y = clamp(i.y + dy, 0, i.y + i.h - 5);
          next.h = i.h + (i.y - y);
          next.y = y;
        } else if (south) {
          next.h = clamp(i.h + dy, 5, 100 - i.y);
        }
      }
      onLayerChange(next);
    },
    [onLayerChange],
  );

  const endDrag = useCallback(() => {
    drag.current = null;
    setLive(false);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [onPointerMove, endDrag]);

  const start = (mode: "move" | Handle) => (e: React.PointerEvent) => {
    const box = boxRef.current?.getBoundingClientRect();
    if (!box) return;
    e.preventDefault();
    e.stopPropagation();
    drag.current = { mode, startX: e.clientX, startY: e.clientY, box, init: layer };
    setLive(true);
  };

  const handles: { id: Handle; style: string; cursor: string }[] = [
    { id: "nw", style: "left-0 top-0 -translate-x-1/2 -translate-y-1/2", cursor: "cursor-nwse-resize" },
    { id: "ne", style: "right-0 top-0 translate-x-1/2 -translate-y-1/2", cursor: "cursor-nesw-resize" },
    { id: "sw", style: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2", cursor: "cursor-nesw-resize" },
    { id: "se", style: "right-0 bottom-0 translate-x-1/2 translate-y-1/2", cursor: "cursor-nwse-resize" },
    { id: "w", style: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2", cursor: "cursor-ew-resize" },
    { id: "e", style: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2", cursor: "cursor-ew-resize" },
  ];

  const safeInset = `${((1 - SAFE_RATIO) / 2) * 100}%`;

  return (
    <div className={cn("select-none", className)}>
      {/* Escenario: reglas + mockup */}
      <div className="flex gap-2">
        {/* Regla vertical */}
        <div className="relative w-10 shrink-0">
          <div
            className="absolute left-1/2 flex -translate-x-1/2 items-center"
            style={{ top: `${zone.y}%`, height: `${zone.h}%` }}
          >
            <div className="relative h-full">
              <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-[color:var(--brand-cyan-deep)]/50" />
              <div className="absolute left-1/2 top-0 h-px w-4 -translate-x-1/2 bg-[color:var(--brand-cyan-deep)]/70" />
              <div className="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 bg-[color:var(--brand-cyan-deep)]/70" />
            </div>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap rounded-full bg-card px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
              {zoneCm.h} cm · {cmToIn(zoneCm.h)}"
            </span>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-neutral-50">
            <img
              src={photoSrc}
              alt={photoAlt}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />

            {/* Zona de impresión */}
            <div
              ref={boxRef}
              className={cn(
                "absolute rounded-[3px] border-2 border-dashed transition-colors",
                design
                  ? "border-[color:var(--brand-magenta)]/80 bg-[color:var(--brand-magenta)]/5"
                  : "border-foreground/25 bg-foreground/[0.03]",
              )}
              style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%` }}
            >
              {/* Área segura */}
              <div
                className="pointer-events-none absolute rounded-[2px] border border-dashed border-[color:var(--brand-cyan-deep)]/70"
                style={{ inset: safeInset }}
              />

              {/* Pills */}
              <span className="pointer-events-none absolute -top-2.5 left-1 rounded-full bg-[color:var(--brand-cyan)] px-1.5 py-[1px] text-[8px] font-bold uppercase tracking-wide text-white shadow-sm sm:text-[9px]">
                Área segura
              </span>
              <span className="pointer-events-none absolute -bottom-2.5 right-1 rounded-full bg-amber-400 px-1.5 py-[1px] text-[8px] font-bold uppercase tracking-wide text-amber-950 shadow-sm sm:text-[9px]">
                Sangrado
              </span>

              {/* Diseño del cliente */}
              {design && (
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    onPointerDown={start("move")}
                    className="absolute cursor-move touch-none"
                    style={{
                      left: `${layer.x}%`,
                      top: `${layer.y}%`,
                      width: `${layer.w}%`,
                      height: `${layer.h}%`,
                    }}
                  >
                    <img
                      src={design}
                      alt="Tu diseño sobre la prenda"
                      className="h-full w-full object-contain"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 border border-[color:var(--brand-magenta)]/70" />
                    {handles.map((h) => (
                      <span
                        key={h.id}
                        onPointerDown={start(h.id)}
                        className={cn(
                          "absolute h-3 w-3 rounded-full border-2 border-white bg-[color:var(--brand-magenta)] shadow touch-none",
                          h.style,
                          h.cursor,
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Medida en vivo del diseño */}
            {design && (
              <div
                className={cn(
                  "pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm transition",
                  live ? "bg-foreground text-background" : "bg-card/90 text-foreground",
                )}
              >
                ≈ {measureLabel(view, layer.w, layer.h)}
              </div>
            )}
          </div>

          {/* Regla horizontal */}
          <div className="relative mt-1 h-6">
            <div
              className="absolute flex items-center"
              style={{ left: `${zone.x}%`, width: `${zone.w}%` }}
            >
              <div className="relative w-full">
                <div className="h-px w-full bg-[color:var(--brand-cyan-deep)]/50" />
                <div className="absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 bg-[color:var(--brand-cyan-deep)]/70" />
                <div className="absolute right-0 top-1/2 h-4 w-px -translate-y-1/2 bg-[color:var(--brand-cyan-deep)]/70" />
              </div>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-card px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {zoneCm.w} cm · {cmToIn(zoneCm.w)}"
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-1 text-[11px] text-muted-foreground">
        {design
          ? "Arrastrá el diseño o usá los puntos para cambiar el tamaño. La medida de arriba es el tamaño real impreso."
          : "La caja punteada es el área imprimible real de esta prenda (talla M). Subí tu diseño para acomodarlo."}
      </p>
    </div>
  );
}
