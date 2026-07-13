import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Portfolio } from "@/components/Portfolio";

export const Route = createFileRoute("/portafolio")({
  head: () => ({
    meta: [
      { title: "Portafolio — Idealo Honduras" },
      {
        name: "description",
        content:
          "Proyectos que mueven marcas: menús, stickers, banners, rotulación, tarjetas y más. Casos reales de clientes en Honduras.",
      },
      { property: "og:title", content: "Portafolio Idealo" },
      { property: "og:description", content: "Proyectos reales de producción gráfica en Honduras." },
      { property: "og:url", content: "/portafolio" },
    ],
    links: [{ rel: "canonical", href: "/portafolio" }],
  }),
  component: PortafolioPage,
});

function PortafolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Portafolio
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Proyectos que <span className="text-gradient-rainbow">mueven marcas</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Desde emprendimientos locales hasta cadenas de restaurantes: producción impecable,
              plazos cumplidos.
            </p>
          </div>
        </section>
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
