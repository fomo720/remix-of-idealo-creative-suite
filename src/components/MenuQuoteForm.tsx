import { useRef, useState } from "react";
import { ArrowLeft, Check, MessageCircle, Minus, Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { menuBindings, menuCuts, menuMaterials, menuQuantity, menuQuoteMessage, menuReady, menuSizes } from "@/lib/menu-options";

export function MenuQuoteForm({ ownDesign, specs, setSpecs, quantity, setQuantity, file, setFile, notes, setNotes, onBack }: {
  ownDesign: boolean; specs: Record<string, string>; setSpecs: (s: Record<string, string>) => void;
  quantity: number; setQuantity: (n: number) => void; file: string | null; setFile: (s: string | null) => void;
  notes: string; setNotes: (s: string) => void; onBack: () => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");
  const s = { size: specs.size || "", customSize: specs.customSize || "", cut: specs.cut || "", customCut: specs.customCut || "", material: specs.material || "", binding: specs.binding || "Sin encuadernación", quantity, notes, ownDesign, hasFile: !!file };
  const ready = menuReady(s);
  const update = (key: string, value: string) => setSpecs({ ...specs, [key]: value });
  const options = (legend: string, key: string, values: string[]) => <fieldset><legend className="mb-3 font-semibold">{legend}</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{values.map(value => <Button key={value} variant="outline" aria-pressed={specs[key] === value} className={cn("h-auto min-h-12 justify-start whitespace-normal rounded-lg border-2 px-3 py-3 text-left", specs[key] === value ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground")} onClick={() => update(key, value)}>{value}</Button>)}</div></fieldset>;
  return <div className="animate-step-in mx-auto max-w-3xl space-y-6">
    <h3 className="text-center text-2xl font-bold">Especificaciones y envío · Menús</h3>
    {options("Tamaño del menú", "size", menuSizes)}
    {s.size === "Otro tamaño" && <div><Label htmlFor="menu-custom-size">Medidas del menú</Label><Input id="menu-custom-size" className="mt-2" placeholder="Ej.: 10 × 15 pulgadas" value={s.customSize} onChange={e => update("customSize", e.target.value)} /></div>}
    {options("Forma o corte", "cut", menuCuts)}
    {s.cut === "Forma personalizada" && <div><Label htmlFor="menu-custom-cut">¿Qué forma querés?</Label><Input id="menu-custom-cut" className="mt-2" placeholder="Ej.: silueta de una taza" value={s.customCut} onChange={e => update("customCut", e.target.value)} /></div>}
    {options("Material", "material", menuMaterials)}
    {s.material === "Cartoncillo grueso completo" && <p className="text-sm text-primary">Portada gruesa, rígida y firme, perfecta para menú. No necesita resorte.</p>}
    <fieldset><legend className="mb-3 font-semibold">Encuadernación · Opcional</legend><div className="flex flex-wrap gap-2">{["Sin encuadernación", "Con encuadernación"].map(value => <Button key={value} variant="outline" aria-pressed={(s.binding === "Sin encuadernación") === (value === "Sin encuadernación")} onClick={() => update("binding", value === "Sin encuadernación" ? value : menuBindings[0])}>{value}</Button>)}</div></fieldset>
    {s.binding !== "Sin encuadernación" && options("Tipo de encuadernación", "binding", menuBindings)}
    <div><Label htmlFor="menu-quantity" className="mb-2 block">Cantidad de menús</Label><div className="flex items-center gap-2"><Button variant="outline" size="icon" aria-label="Reducir cantidad de menús" disabled={quantity <= 1} onClick={() => setQuantity(menuQuantity(quantity - 1))}><Minus /></Button><Input id="menu-quantity" type="number" min={1} step={1} value={quantity} className="w-24 text-center" onChange={e => setQuantity(menuQuantity(Number(e.target.value)))} /><Button variant="outline" size="icon" aria-label="Aumentar cantidad de menús" onClick={() => setQuantity(menuQuantity(quantity + 1))}><Plus /></Button></div></div>
    <div><Label className="mb-2 block">{ownDesign ? "Subí tu diseño" : "Referencia o logo · Opcional"}</Label><input ref={fileInput} className="sr-only" type="file" accept="image/*,.pdf,.ai,.psd" onChange={e => { const f = e.target.files?.[0]; if (!f) return; if (file) URL.revokeObjectURL(file); setFile(URL.createObjectURL(f)); setFilename(f.name); }} /><Button variant="outline" className="h-auto min-h-16 w-full whitespace-normal border-2 border-dashed" onClick={() => fileInput.current?.click()}><Upload />{file ? "Cambiar archivo" : "Seleccionar archivo"}</Button>{file && <div className="mt-2 flex min-w-0 items-center gap-2 text-sm"><Check className="size-4 shrink-0 text-primary" /><span className="min-w-0 flex-1 break-all">{filename || "Archivo seleccionado"}</span><Button variant="ghost" size="icon" aria-label="Quitar archivo" onClick={() => { URL.revokeObjectURL(file); setFile(null); setFilename(""); if (fileInput.current) fileInput.current.value = ""; }}><Trash2 /></Button></div>}{file && <p className="mt-2 text-xs text-muted-foreground">Adjuntá este archivo en el chat de WhatsApp.</p>}</div>
    <div><Label htmlFor="menu-notes">Notas para el equipo · Opcional</Label><Textarea id="menu-notes" className="mt-2" rows={4} placeholder="Colores, número de páginas, fecha de entrega…" value={notes} onChange={e => setNotes(e.target.value)} /></div>
    <Button asChild className={cn("h-auto min-h-12 w-full whitespace-normal px-4 py-3", !ready && "opacity-60")}><a href={`https://wa.me/50433635666?text=${encodeURIComponent(menuQuoteMessage(s))}`} target="_blank" rel="noreferrer" aria-disabled={!ready} onClick={e => { if (!ready) e.preventDefault(); }}><MessageCircle />Enviar cotización por WhatsApp</a></Button>
    {!ready && <p className="text-center text-xs text-muted-foreground">Elegí tamaño, corte y material{ownDesign ? ", y subí tu diseño" : ""} para continuar.</p>}
    <Button variant="ghost" onClick={onBack}><ArrowLeft />Volver</Button>
  </div>;
}