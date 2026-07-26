import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mascot } from "@/components/Mascot";
import { MessageCircle, ArrowLeft, Mail, Phone, Trash2, Minus, Plus, ClipboardList } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

export const Route = createFileRoute("/cotizar")({
  component: CotizarPage,
  head: () => ({
    meta: [
      { title: "Mi cotización — Idealo" },
      { name: "description", content: "Revisa los productos que agregaste y envíanos tu cotización completa por WhatsApp." },
    ],
  }),
});

const WHATSAPP = "50433635666";

function CotizarPage() {
  const { items, updateQuantity, removeItem, clearAll } = useQuote();

  const mensaje =
    items.length === 0
      ? "Hola Idealo 👋 Quiero cotizar un proyecto. ¿Me pueden ayudar?"
      : `Hola Idealo 👋 Quiero cotizar lo siguiente:\n\n${items
          .map((i) => `- ${i.title} x${i.quantity}`)
          .join("\n")}\n\n¿Me pueden ayudar con precios y tiempos?`;
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-24">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>

        <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Cotización</div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Mi <span className="text-gradient-rainbow">cotización</span>.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Revisa los productos que agregaste y envíanos tu lista completa por WhatsApp — te respondemos con precios y tiempos el mismo día.
        </p>

        {isEmpty ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-10 text-center shadow-elegant">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full" style={{ background: "var(--brand-magenta)" }}>
              <ClipboardList className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-5 text-xl font-bold">Tu cotización está vacía</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Explora nuestro portafolio y agrega los productos que te interesan.
            </p>
            <Link
              to="/portafolio"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105"
              style={{ background: "linear-gradient(90deg, var(--brand-magenta), var(--brand-cyan))" }}
            >
              Ver portafolio
            </Link>
          </div>
        ) : (
          <div className="relative mt-10 overflow-visible rounded-3xl border border-border bg-card p-6 shadow-elegant sm:p-8">
            <div className="pointer-events-none absolute -top-16 -right-6 hidden sm:block">
              <Mascot pose="hero" size={150} animation="float" priority className="drop-shadow-2xl" />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Productos ({items.length})</h2>
            </div>

            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.slug} className="flex items-center gap-4 py-4">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                  ) : (
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">{item.title}</div>
                    <div className="mt-2 inline-flex items-center rounded-full border border-border">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        className="grid h-8 w-8 place-items-center rounded-l-full hover:bg-muted"
                        aria-label="Disminuir"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.slug, parseInt(e.target.value, 10) || 1)}
                        className="h-8 w-14 bg-transparent text-center text-sm font-semibold outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="grid h-8 w-8 place-items-center rounded-r-full hover:bg-muted"
                        aria-label="Aumentar"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    aria-label={`Quitar ${item.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-lg font-semibold text-white shadow-md transition hover:brightness-95"
            >
              <MessageCircle className="h-6 w-6" />
              Cotizar por WhatsApp ({items.length})
            </a>

            <div className="mt-4 flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={clearAll}
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Vaciar cotización
              </button>
              <Link to="/portafolio" className="text-muted-foreground hover:text-foreground">
                Seguir agregando →
              </Link>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <a href={`tel:+${WHATSAPP}`} className="flex items-center gap-2 hover:text-foreground">
                <Phone className="h-4 w-4" /> +504 3363-5666
              </a>
              <a href="mailto:idealo.hn@gmail.com" className="flex items-center gap-2 hover:text-foreground">
                <Mail className="h-4 w-4" /> idealo.hn@gmail.com
              </a>
            </div>
          </div>
        )}

        <div className="mt-8 text-sm text-muted-foreground">
          💡 Tip: si ya tienes un diseño o referencia, adjúntalo en el chat de WhatsApp para una cotización más exacta.
        </div>
      </main>
      <Footer />
    </div>
  );
}
