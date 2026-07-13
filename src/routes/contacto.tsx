import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WHATSAPP_NUMBER, WHATSAPP_ALT, whatsappLink } from "@/data/catalog";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Idealo Honduras" },
      {
        name: "description",
        content:
          "Visitanos en Shopping Center Almina, Ave. Colón, La Ceiba. Escribinos por WhatsApp al 3363-5666 o 3178-7201.",
      },
      { property: "og:title", content: "Contacto — Idealo Honduras" },
      { property: "og:description", content: "Visitanos en La Ceiba o cotizá por WhatsApp." },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Contacto
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Contanos tu idea, <span className="text-gradient-rainbow">nosotros la creamos</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              La forma más rápida es WhatsApp. También podés visitarnos en nuestra tienda en La Ceiba.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2">
            <div
              className="rounded-3xl border-2 p-8"
              style={{
                borderColor: "var(--brand-green)",
                background: "oklch(0.97 0.05 150)",
              }}
            >
              <MessageCircle className="h-10 w-10" style={{ color: "var(--brand-green)" }} />
              <h2 className="mt-4 text-2xl font-bold">WhatsApp</h2>
              <p className="mt-2 text-sm text-foreground/70">Respuesta inmediata en horario de tienda.</p>
              <div className="mt-6 space-y-3">
                <a
                  href={whatsappLink("Hola Idealo, quiero cotizar un producto.")}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl bg-white px-5 py-3 text-sm font-semibold shadow-card-soft transition hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> 3363-5666</span>
                  <span className="text-xs text-muted-foreground">Escribir →</span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_ALT}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl bg-white px-5 py-3 text-sm font-semibold shadow-card-soft transition hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> 3178-7201</span>
                  <span className="text-xs text-muted-foreground">Escribir →</span>
                </a>
              </div>
            </div>

            <div
              className="rounded-3xl border-2 p-8"
              style={{
                borderColor: "var(--brand-pink)",
                background: "oklch(0.97 0.05 350)",
              }}
            >
              <MapPin className="h-10 w-10" style={{ color: "var(--brand-pink)" }} />
              <h2 className="mt-4 text-2xl font-bold">Visitanos</h2>
              <p className="mt-2 text-sm text-foreground/70">
                Shopping Center Almina<br />
                Ave. Colón, La Ceiba, Atlántida<br />
                Honduras
              </p>
              <div className="mt-6 space-y-2 text-sm text-foreground/80">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" style={{ color: "var(--brand-pink)" }} />
                  Lun–Vie 9:00 AM – 6:00 PM
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" style={{ color: "var(--brand-pink)" }} />
                  Sáb 9:00 AM – 2:00 PM
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" style={{ color: "var(--brand-pink)" }} />
                  hola@idealo.hn
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <a
                  href="https://instagram.com/idealohn"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-card-soft transition hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com/idealohn"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-card-soft transition hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
