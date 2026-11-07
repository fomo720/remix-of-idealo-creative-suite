import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Sparkles, Loader2, MessageCircle, Shirt, BookOpen } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { analyzeIdea, type IdeaResult } from "@/lib/idea-assistant.functions";

export const Route = createFileRoute("/asistente")({
  component: AsistentePage,
  head: () => ({
    meta: [
      { title: "Asistente de ideas · Idealo" },
      { name: "description", content: "Contanos tu idea de camisa o libreta y te recomendamos opciones de personalización con un resumen de tu pedido." },
      { property: "og:title", content: "Asistente de ideas · Idealo" },
      { property: "og:description", content: "Describí tu camisa o libreta ideal y recibí recomendaciones al instante." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const WHATSAPP = "50433635666";

function AsistentePage() {
  const analyze = useServerFn(analyzeIdea);
  const [producto, setProducto] = useState<"camisa" | "libreta">("camisa");
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IdeaResult | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await analyze({ data: { producto, idea } });
      if (r.error) setError(r.error);
      else setResult(r.result ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Algo salió mal.");
    } finally {
      setLoading(false);
    }
  };

  const waText = result
    ? `Hola Idealo! Quiero cotizar una ${producto}.\n\nMi idea: ${idea}\n\nResumen: ${result.resumen}\n\nEspecificaciones:\n${result.especificaciones.map((s) => `• ${s.campo}: ${s.valor}`).join("\n")}`
    : "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold"><Sparkles className="h-3.5 w-3.5" /> Asistente de ideas</span>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">Contanos tu idea</h1>
          <p className="mt-2 text-muted-foreground">Te recomendamos opciones y armamos el resumen de tu pedido.</p>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {([["camisa", "Camisa", Shirt], ["libreta", "Libreta", BookOpen]] as const).map(([k, label, Icon]) => (
              <button key={k} onClick={() => setProducto(k)} className={`flex items-center justify-center gap-2 rounded-xl border-2 p-3 font-semibold transition ${producto === k ? "border-primary bg-primary/10" : "border-border"}`}>
                <Icon className="h-5 w-5" /> {label}
              </button>
            ))}
          </div>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={5}
            maxLength={2000}
            placeholder={producto === "camisa" ? "Ej: 20 camisas negras para mi equipo de fútbol con el logo al frente y números atrás…" : "Ej: 50 libretas pequeñas para un evento de la empresa, con nuestro logo y hojas rayadas…"}
            className="mt-4 w-full rounded-xl border bg-background p-3 text-sm"
          />
          <button onClick={submit} disabled={loading || idea.trim().length < 5} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Analizando tu idea…" : "Recomendarme opciones"}
          </button>
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        </div>

        {result && (
          <div className="mt-8 space-y-6">
            <p className="rounded-2xl bg-muted p-4 text-sm">{result.resumen}</p>
            <section>
              <h2 className="mb-3 text-lg font-bold">Recomendaciones</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {result.recomendaciones.map((r, i) => (
                  <div key={i} className="rounded-xl border bg-card p-4">
                    <p className="font-semibold">{r.titulo}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.detalle}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-bold">Resumen de tu pedido</h2>
              <dl className="divide-y rounded-xl border bg-card">
                {result.especificaciones.map((s, i) => (
                  <div key={i} className="flex justify-between gap-4 p-3 text-sm">
                    <dt className="text-muted-foreground">{s.campo}</dt>
                    <dd className="text-right font-medium">{s.valor}</dd>
                  </div>
                ))}
              </dl>
            </section>
            {result.preguntas.length > 0 && (
              <section>
                <h2 className="mb-2 text-lg font-bold">Para confirmar</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {result.preguntas.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              </section>
            )}
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-cta px-5 py-3 font-semibold text-primary-foreground">
              <MessageCircle className="h-4 w-4" /> Cotizar por WhatsApp
            </a>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
