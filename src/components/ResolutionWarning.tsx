import { useState } from "react";
import { AlertTriangle, X, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import stickerAlta from "@/assets/sticker-alta-resolucion.jpg.asset.json";
import stickerBaja from "@/assets/sticker-baja-resolucion.jpg.asset.json";

type Props = {
  /** Natural pixel width of the uploaded image */
  naturalW: number;
  /** Natural pixel height of the uploaded image */
  naturalH: number;
  /** Physical print width */
  width: number;
  /** Physical print height */
  height: number;
  /** Unit for width/height */
  unit: "in" | "cm";
  /** Minimum DPI to consider "good" (default 150) */
  minDpi?: number;
};

/**
 * Non-blocking warning banner shown when an uploaded image's real DPI is
 * below the recommended threshold for the selected physical print size.
 * Includes a modal with side-by-side comparison so the client can visually
 * understand why resolution matters.
 */
export function ResolutionWarning({
  naturalW,
  naturalH,
  width,
  height,
  unit,
  minDpi = 150,
}: Props) {
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(false);

  const wIn = unit === "in" ? width : width / 2.54;
  const hIn = unit === "in" ? height : height / 2.54;
  if (!wIn || !hIn || !naturalW || !naturalH) return null;

  const dpiX = naturalW / wIn;
  const dpiY = naturalH / hIn;
  const dpi = Math.min(dpiX, dpiY);
  const ok = dpi >= minDpi;

  if (ok || dismissed) return null;

  const recommendedPx = Math.round(minDpi * Math.max(wIn, hIn));

  return (
    <>
      <div className="relative mt-3 flex items-start gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50 p-3.5 pr-9 text-amber-900 shadow-sm">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-200/70">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1 text-[13px] leading-snug">
          <p className="font-semibold">
            Tu imagen tiene baja resolución para este tamaño (~{Math.round(dpi)} DPI).
          </p>
          <p className="mt-1 text-amber-800/90">
            Podría verse pixelada (efecto "Minecraft") al imprimirse. Puedes
            continuar tu cotización, pero recomendamos subir una imagen de al
            menos <b>{recommendedPx}px</b> o un archivo vectorial (SVG/PDF/AI).
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-900/10 px-3 py-1 text-[12px] font-semibold text-amber-900 hover:bg-amber-900/20"
          >
            <ZoomIn className="h-3.5 w-3.5" /> Ver por qué importa
          </button>
        </div>
        <button
          type="button"
          aria-label="Cerrar advertencia"
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-2 rounded-full p-1 text-amber-900/70 hover:bg-amber-900/10 hover:text-amber-900"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              ¿Por qué importa la resolución?
            </DialogTitle>
            <DialogDescription>
              Cuando una imagen pequeña se estira a un tamaño de impresión
              grande, los píxeles se agrandan y se ve borrosa o "cuadriculada".
              Este es un ejemplo real:
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border-2 border-emerald-300 bg-emerald-50">
              <img
                src={stickerAlta.url}
                alt="Sticker impreso con imagen de alta resolución"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="p-3 text-center text-xs font-semibold text-emerald-900">
                ✅ Alta resolución — nítido y profesional
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border-2 border-red-300 bg-red-50">
              <img
                src={stickerBaja.url}
                alt="Sticker impreso con imagen de baja resolución (pixelado)"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="p-3 text-center text-xs font-semibold text-red-900">
                ❌ Baja resolución — pixelado ("Minecraft")
              </figcaption>
            </figure>
          </div>
          <div className="mt-2 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
            <b>Tip:</b> lo ideal es enviar un archivo vectorial (SVG, PDF o AI)
            o una imagen de al menos <b>300 DPI</b> al tamaño real de impresión.
            Si no tienes uno, podemos vectorizarlo por ti — cotízalo con tu asesor.
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-2 w-full rounded-2xl bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90"
          >
            Entendido, continuar
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
