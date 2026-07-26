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
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-[#fdf2f7] text-foreground">
      {/* page-wide doodle background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='none' stroke='%23e9437e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 20 q6 -8 12 0 t12 0'/%3E%3Ccircle cx='110' cy='18' r='4'/%3E%3Cpath d='M95 65 l7 7 M102 65 l-7 7'/%3E%3Cpath d='M25 105 l4 -10 4 10 -4 -3z'/%3E%3Cpath d='M70 55 l3 8 8 1 -6 6 2 8 -7 -4 -7 4 2 -8 -6 -6 8 -1z' stroke='%2348c9c8'/%3E%3Cpath d='M115 110 q-8 -8 -16 0' stroke='%2348c9c8'/%3E%3Ccircle cx='50' cy='25' r='3' stroke='%2348c9c8'/%3E%3Cpath d='M18 60 h12 M24 54 v12' stroke='%2348c9c8'/%3E%3Cpath d='M130 45 c-4 0 -4 6 0 6 s4 -6 8 -6' /%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "260px 260px",
        }}
      />
      <div className="relative z-10">
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
    </div>
  );
}
