import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/empresas")({
  head: () => ({
    meta: [
      { title: "Soluciones para Empresas — Idealo" },
      { name: "description", content: "Kits corporativos para restaurantes, oficinas, emprendedores y flotas. Producción gráfica profesional en Honduras." },
      { property: "og:title", content: "Soluciones para Empresas — Idealo" },
      { property: "og:description", content: "Kits de identidad y branding llave en mano para tu negocio." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmpresasLayout,
});

function EmpresasLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
