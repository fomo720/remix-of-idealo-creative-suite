import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/eventos/$categoria")({
  head: ({ params }) => ({ meta: [
    { title: `${params.categoria} — Productos para eventos | Idealo` },
    { name: "description", content: "Productos personalizados para tu celebración con Idealo Honduras." },
    { property: "og:title", content: `${params.categoria} — Productos para eventos | Idealo` },
    { property: "og:description", content: "Cotizá productos personalizados para tu celebración." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <Outlet />,
});
