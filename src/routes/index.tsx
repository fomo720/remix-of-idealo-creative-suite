import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Configurator } from "@/components/Configurator";
import { MissionVision } from "@/components/MissionVision";
import { Portfolio } from "@/components/Portfolio";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Configurator />
        <Portfolio />
        <MissionVision />
      </main>
      <Footer />
    </div>
  );
}
