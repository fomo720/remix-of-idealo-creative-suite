import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, whatsappLink } from "@/data/catalog";

const highlights = [
  { emoji: "🎂", title: "Cumpleaños", desc: "PVC bienvenida, banner parador, cake topper, menú, cajitas, etiquetas botellas y número de mesa." },
  { emoji: "💍", title: "Bodas", desc: "Señalética elegante, menús personalizados, letreros de bienvenida y detalles para invitados." },
  { emoji: "👶", title: "Baby Shower", desc: "Kit temático completo con banners, invitaciones y stickers." },
  { emoji: "🇭🇳", title: "Fiestas Patrias", desc: "Camisetas patrióticas, banderines, cuadro de danza y decoración institucional." },
  { emoji: "❤️", title: "San Valentín", desc: "Marcos, cadenas grabadas, boxers, retrateras con foto y regalos personalizados." },
  { emoji: "🎄", title: "Navidad", desc: "Ornamentos con foto, calendarios corporativos y regalos con tu marca." },
];

export function EventosDestacados() {
  return (
    <section
      id="eventos-destacados"
      className="relative overflow-hidden py-24"
      style={{ background: "linear-gradient(135deg, oklch(0.97 0.03 350), oklch(0.97 0.04 55))" }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Eventos & fechas especiales
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hacemos que tu <span className="text-gradient-rainbow">evento</span> sea inolvidable.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Diseño 360°: decoración, impresión, montaje y hasta cobertura fotográfica. Contanos qué
            fecha querés celebrar y lo creamos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border-2 border-white bg-white/70 p-6 backdrop-blur-sm shadow-card-soft transition hover:-translate-y-1"
            >
              <div className="text-3xl">{h.emoji}</div>
              <h3 className="mt-3 text-lg font-bold">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={whatsappLink("Hola Idealo, quiero cotizar un evento personalizado.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-cta px-6 py-3 text-sm font-semibold text-white shadow-elegant transition hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" /> Cotizar mi evento
          </a>
          <Link
            to="/servicios/$categoria"
            params={{ categoria: "eventos" }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/10 bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground/30"
          >
            Ver todos los eventos
          </Link>
          <span className="text-xs text-muted-foreground">o llamanos: <a className="underline" href={`tel:+${WHATSAPP_NUMBER}`}>3363-5666</a></span>
        </div>
      </div>
    </section>
  );
}
