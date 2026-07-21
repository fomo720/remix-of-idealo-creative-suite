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
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Above the fold — no reveal, loads instantly */}
        <Hero />
        <Reveal y={28}><HowItWorks /></Reveal>
        <Reveal y={28}><Configurator /></Reveal>
        <Reveal y={28}><FeaturedProducts /></Reveal>
        <Reveal y={28}><Testimonials /></Reveal>
        <Reveal y={28}><MissionVision /></Reveal>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
