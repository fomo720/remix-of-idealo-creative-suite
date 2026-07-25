import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mascot } from "@/components/Mascot";
import { MessageCircle, ArrowLeft, Mail, Phone } from "lucide-react";


export const Route = createFileRoute("/cotizar")({
  component: CotizarPage,
  head: () => ({
    meta: [
      { title: "Cotiza con nosotros — Idealo" },
      { name: "description", content: "Solicita una cotización personalizada para tu proyecto de impresión, rotulación, stickers o grabado láser." },
    ],
  }),
});

const WHATSAPP = "50433635666";

function CotizarPage() {
  const producto = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("producto") : null;
  const mensaje = `Hola Idealo 👋 Quiero cotizar${producto ? ` *${producto}*` : " un proyecto"}. ¿Me pueden ayudar?`;
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-24">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>

        <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Cotización</div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Cotiza <span className="text-gradient-rainbow">con nosotros</span>.
        </h1>
        {producto && (
          <p className="mt-3 text-lg text-muted-foreground">
            Producto de interés: <span className="font-semibold text-foreground">{producto}</span>
          </p>
        )}
        <p className="mt-4 text-muted-foreground">
          Cuéntanos qué necesitas — tamaño, cantidad, material o referencia — y te enviamos precio,
          tiempos y opciones el mismo día.
        </p>

        <div className="mt-10 rounded-3xl border border-border bg-card p-8 shadow-elegant">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-lg font-semibold text-white shadow-md transition hover:brightness-95"
          >
            <MessageCircle className="h-6 w-6" />
            Cotizar por WhatsApp
          </a>

          <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <a href={`tel:+${WHATSAPP}`} className="flex items-center gap-2 hover:text-foreground">
              <Phone className="h-4 w-4" /> +504 3363-5666
            </a>
            <a href="mailto:idealo.hn@gmail.com" className="flex items-center gap-2 hover:text-foreground">
              <Mail className="h-4 w-4" /> idealo.hn@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          💡 Tip: si ya tienes un diseño o referencia, adjúntalo en el chat para una cotización más exacta.
        </div>
      </main>
      <Footer />
    </div>
  );
}
