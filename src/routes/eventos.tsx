import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
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
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId !== "/eventos" && m.routeId.startsWith("/eventos"));
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {!isChild && <EventosIndex />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

type EventCat = {
  slug: string;
  title: string;
  emoji: string;
  desc: string;
  available?: boolean;
};

const CATEGORIES: EventCat[] = [
  { slug: "cumpleanos", title: "Cumpleaños", emoji: "🎂", desc: "PVC bienvenida, banner parador, cake topper, menú, cajitas, etiquetas botellas y número de mesa.", available: true },
  { slug: "bodas", title: "Bodas", emoji: "💍", desc: "Señalética elegante, menús personalizados, letreros de bienvenida y detalles para invitados." },
  { slug: "baby-shower", title: "Baby Shower", emoji: "👶", desc: "Kit temático completo con banners, invitaciones y stickers." },
  { slug: "fiestas-patrias", title: "Fiestas Patrias", emoji: "🇭🇳", desc: "Camisetas patrióticas, banderines, cuadro de danza y decoración institucional." },
  { slug: "san-valentin", title: "San Valentín", emoji: "💖", desc: "Marcos, cadenas grabadas, boxers, retrateras con foto y regalos personalizados." },
  { slug: "navidad", title: "Navidad", emoji: "🎄", desc: "Ornamentos con foto, calendarios corporativos y regalos con tu marca." },
];

function EventosIndex() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-pink-50 via-orange-50 to-rose-50" />
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground">EVENTOS & FECHAS ESPECIALES</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Hacemos que tu{" "}
          <span className="text-gradient-rainbow animate-rainbow-shimmer">evento</span>{" "}
          sea inolvidable.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Diseño 360°: decoración, impresión, montaje y hasta cobertura fotográfica. Contanos qué fecha querés celebrar y lo creamos.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <EventCard key={c.slug} cat={c} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="https://wa.me/50400000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-cta animate-rainbow-shimmer px-6 py-3 text-sm font-semibold text-white shadow-elegant transition hover:scale-105"
          >
            💬 Cotizar mi evento
          </a>
          <span className="text-sm text-muted-foreground">o llamanos: <a href="tel:33635666" className="underline">3363-5666</a></span>
        </div>
      </div>
    </section>
  );
}

function EventCard({ cat }: { cat: EventCat }) {
  const scaledEmoji = cat.slug === "cumpleanos" ? "text-6xl" : "text-4xl";
  const body = (
    <div className={`group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition ${cat.available ? "hover:-translate-y-1 hover:border-foreground/30 hover:shadow-elegant" : "opacity-90"}`}>
      <div className={`${scaledEmoji} mb-4 transition ${cat.available ? "group-hover:scale-110" : ""}`} style={{ transformOrigin: "left center" }}>
        {cat.emoji}
      </div>
      <h3 className="text-xl font-bold">{cat.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{cat.desc}</p>
      {cat.available ? (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
          Ver productos <span aria-hidden>→</span>
        </span>
      ) : (
        <span className="mt-4 inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          Próximamente
        </span>
      )}
    </div>
  );
  if (!cat.available) return body;
  return (
    <Link to="/eventos/$categoria" params={{ categoria: cat.slug }} className="block">
      {body}
    </Link>
  );
}
