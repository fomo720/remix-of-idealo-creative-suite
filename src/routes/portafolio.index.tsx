import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/Portfolio";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/portafolio/")({
  head: () => ({
    meta: [
      { title: "Portafolio — Proyectos que hemos producido | Idealo.hn" },
      { name: "description", content: "Explora nuestro portafolio completo: stickers, banderines, iron-ons, PVC, impresos, rotulación, regalos y servicios en Honduras." },
      { property: "og:title", content: "Portafolio — Idealo.hn" },
      { property: "og:description", content: "Trabajos reales para marcas, restaurantes y eventos en Honduras." },
    ],
  }),
  component: PortafolioPage,
});

function PortafolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Portfolio />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
