import { useRef, useState } from "react";
import { File, List, Grid2x2, Upload, Trash2, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { notebookPaperTypes, notebookQuoteMessage, notebookQuoteSizes } from "@/lib/notebook-options";

export function NotebookQuoteForm({ sizeIdx, setSizeIdx, pageType, setPageType, qty, setQty, notes, setNotes, onBack }: {
  sizeIdx: number; setSizeIdx: (n: number) => void;
  pageType: string; setPageType: (p: "blank" | "ruled" | "dotted" | "grid") => void;
  qty: number; setQty: (n: number) => void; notes: string; setNotes: (n: string) => void; onBack: () => void;
}) {
  const [pages, setPages] = useState(80);
  const [reference, setReference] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const selection = (active: boolean) => cn("h-auto min-h-12 justify-start whitespace-normal rounded-lg border-2 px-3 py-3 text-left", active ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background text-muted-foreground");
  const href = `https://wa.me/50433635666?text=${encodeURIComponent(notebookQuoteMessage({ sizeIndex: sizeIdx, paper: pageType, pages, quantity: qty, notes, hasReference: !!reference }))}`;

  return (
    <div className="animate-step-in mx-auto max-w-3xl space-y-6">
      <h3 className="text-center text-2xl font-bold">Tu libreta de portada gruesa</h3>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Tipo de hojas interiores</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {notebookPaperTypes.map((p) => (
            <Button key={p.id} variant="outline" aria-pressed={pageType === p.id} className={selection(pageType === p.id)} onClick={() => setPageType(p.id)}>
              {p.id === "blank" ? <File className="size-4 shrink-0" /> : p.id === "ruled" ? <List className="size-4 shrink-0" /> : p.id === "grid" ? <Grid2x2 className="size-4 shrink-0" /> : <span aria-hidden="true" className="grid size-4 shrink-0 grid-cols-3 items-center justify-items-center">{Array.from({ length: 9 }, (_, i) => <span key={i} className="size-0.5 rounded-full bg-current" />)}</span>}
              {p.label}
            </Button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Tamaño de la libreta</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {notebookQuoteSizes.map((s, i) => (
            <Button key={s.id} variant="outline" aria-pressed={sizeIdx === i} className={cn(selection(sizeIdx === i), "flex-col items-start gap-1")} onClick={() => setSizeIdx(i)}>
              <span className="text-sm font-bold">{s.label}</span>
              <span className="text-xs font-normal">{s.width} × {s.height} pulgadas</span>
              <span className="text-xs font-normal text-muted-foreground">{s.hint}</span>
            </Button>
          ))}
        </div>
      </fieldset>
      <div>
        <Label htmlFor="notebook-reference" className="mb-2 block">Subir diseño de referencia · Opcional</Label>
        <Input ref={fileRef} id="notebook-reference" type="file" accept="image/*,.pdf,.ai" className="sr-only" onChange={(e) => setReference(e.target.files?.[0] ?? null)} />
        <Button variant="outline" className="h-auto min-h-20 w-full gap-3 whitespace-normal rounded-lg border-2 border-dashed" onClick={() => fileRef.current?.click()}>
          <Upload className="size-5 shrink-0" />{reference ? "Cambiar diseño de referencia" : "Subir diseño de referencia"}
        </Button>
        {reference && <div className="mt-2 flex min-w-0 items-center gap-2 text-sm"><Check className="size-4 shrink-0 text-primary" /><span className="min-w-0 flex-1 break-all">{reference.name}</span><Button variant="ghost" size="icon" aria-label="Eliminar referencia" onClick={() => { setReference(null); if (fileRef.current) fileRef.current.value = ""; }}><Trash2 className="size-4" /></Button></div>}
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Cantidad de páginas</legend>
        <div className="grid grid-cols-5 gap-2">{[50, 80, 100, 150, 200].map((n) => <Button key={n} variant="outline" aria-pressed={pages === n} className={cn(selection(pages === n), "justify-center px-1")} onClick={() => setPages(n)}>{n}</Button>)}</div>
      </fieldset>
      <div>
        <Label htmlFor="notebook-quantity" className="mb-2 block">Cantidad de libretas</Label>
        <Input id="notebook-quantity" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} />
        <div className="mt-2 grid grid-cols-4 gap-2">{[10, 25, 50, 100].map((n) => <Button key={n} variant="outline" aria-pressed={qty === n} className={cn(selection(qty === n), "justify-center")} onClick={() => setQty(n)}>{n}</Button>)}</div>
      </div>
      <div>
        <Label htmlFor="notebook-notes" className="mb-2 block">Instrucciones especiales</Label>
        <Textarea id="notebook-notes" rows={4} placeholder="Colores Pantone, número de hojas… Quiero convertirla en un planificador / una agenda." value={notes} onChange={(e) => setNotes(e.target.value)} />
        <p className="mt-2 text-xs text-primary">Ejemplo: «Quiero convertirla en una agenda con fechas» o «Quiero un planificador semanal».</p>
      </div>
      <Button asChild className="h-auto min-h-12 w-full gap-2 whitespace-normal rounded-lg px-4 py-3 text-center"><a href={href} target="_blank" rel="noreferrer"><MessageCircle className="size-5 shrink-0" />Solicitar cotización por WhatsApp</a></Button>
      <Button variant="ghost" onClick={onBack}>Volver</Button>
    </div>
  );
}