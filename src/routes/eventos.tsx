import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventosDestacados } from "@/components/EventosDestacados";
import { findCategory, whatsappLink } from "@/data/catalog";
import { MessageCircle } from "lucide-react";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos personalizados — Idealo Honduras" },
      {
        name: "description",
        content:
          "Cumpleaños, bodas, baby showers, fiestas patrias y fechas especiales. Diseño, impresión y montaje 360° para tu evento inolvidable.",
      },
      { property: "og:title", content: "Eventos personalizados — Idealo" },
      { property: "og:description", content: "Diseño 360° para cumpleaños, bodas, baby showers y más." },
      { property: "og:url", content: "/eventos" },
    ],
    links: [{ rel: "canonical", href: "/eventos" }],
  }),
  component: EventosPage,
});

function EventosPage() {
  const cat = findCategory("eventos");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Eventos & fechas especiales
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Tu evento, <span className="text-gradient-rainbow">nuestro arte</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Diseño 360°: nos encargamos de decoración, impresión, montaje y cobertura fotográfica.
              Vos disfrutá, nosotros lo creamos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink("Hola Idealo, quiero cotizar un evento personalizado.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-cta px-6 py-3 text-sm font-semibold text-white shadow-elegant transition hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" /> Empezar a planear
              </a>
            </div>
          </div>
        </section>

        <EventosDestacados />

        {cat && (
          <section className="py-20">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="mb-8 text-3xl font-bold">Todo lo que podemos hacer para tu evento</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.products.map((p) => (
                  <div
                    key={p.slug}
                    className="rounded-2xl border-2 border-border bg-card p-5"
                    style={{ borderTopColor: "var(--brand-red)", borderTopWidth: 4 }}
                  >
                    <h3 className="text-base font-bold">{p.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
