import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos & Fechas Especiales — Idealo" },
      { name: "description", content: "Diseño 360° para cumpleaños, bodas, baby showers, fiestas patrias y más. Contanos qué fecha querés celebrar y lo creamos." },
      { property: "og:title", content: "Eventos & Fechas Especiales — Idealo" },
      { property: "og:description", content: "PVC de bienvenida, banners, cake toppers, menús, cajitas, etiquetas y más para tu evento." },
    ],
  }),
  component: EventosLayout,
});

function EventosLayout() {
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
