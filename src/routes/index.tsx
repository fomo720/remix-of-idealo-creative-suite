import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Configurator } from "@/components/Configurator";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { MissionVision } from "@/components/MissionVision";
import { Testimonials } from "@/components/Testimonials";
import { ClientsSection } from "@/components/ClientsSection";

import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/")({
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
