import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Configurator } from "@/components/Configurator";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { MissionVision } from "@/components/MissionVision";
import { Testimonials } from "@/components/Testimonials";

import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Idealo Honduras | Productos personalizados e impresión" },
    { name: "description", content: "Cotizá libretas, textiles, stickers y grabados personalizados con Idealo Honduras." },
    { property: "og:title", content: "Idealo Honduras | Productos personalizados e impresión" },
    { property: "og:description", content: "Elegí tus productos personalizados y solicitá una cotización con Idealo Honduras." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Configurator />
        <FeaturedProducts />
        <Testimonials />

        <MissionVision />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
