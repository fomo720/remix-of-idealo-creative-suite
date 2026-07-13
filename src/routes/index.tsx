import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategoriesGrid } from "@/components/CategoriesGrid";
import { EventosDestacados } from "@/components/EventosDestacados";
import { Configurator } from "@/components/Configurator";
import { TrustSection } from "@/components/TrustSection";
import { Portfolio } from "@/components/Portfolio";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Idealo · Nosotros lo creamos — Imprenta y estudio creativo en Honduras" },
      {
        name: "description",
        content:
          "Impresión, stickers, banners, grabado láser, sublimación, textiles y eventos personalizados en La Ceiba, Honduras. Si podés imaginarlo, lo creamos.",
      },
      { property: "og:title", content: "Idealo · Nosotros lo creamos" },
      { property: "og:description", content: "Producción gráfica profesional en Honduras." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <CategoriesGrid />
        <EventosDestacados />
        <Configurator />
        <TrustSection />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
