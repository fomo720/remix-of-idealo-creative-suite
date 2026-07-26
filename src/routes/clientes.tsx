import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ClientsSection } from "@/components/ClientsSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes — Idealo" },
      { name: "description", content: "Empresas que confían en Idealo para sus proyectos de impresión, branding y producción gráfica en La Ceiba, Honduras." },
      { property: "og:title", content: "Clientes — Idealo" },
      { property: "og:description", content: "Empresas que confían en Idealo para sus proyectos de impresión, branding y producción gráfica." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClientesPage,
});

function ClientesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <ClientsSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
