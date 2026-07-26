import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook, ExternalLink, ArrowLeft, Send } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  component: ContactoPage,
  head: () => ({
    meta: [
      { title: "Contáctanos · Idealo" },
      { name: "description", content: "Estamos en La Ceiba, Honduras. Escríbenos por WhatsApp, correo o visítanos en nuestro taller." },
      { property: "og:title", content: "Contáctanos · Idealo" },
      { property: "og:description", content: "Escríbenos por WhatsApp, correo o visítanos en nuestro taller en La Ceiba." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const WHATSAPP = "50433635666";
const MAPS_LINK = "https://maps.app.goo.gl/U7w2qo2K6tJTQyqA9";
const MAPS_EMBED = "https://www.google.com/maps?q=15.7785536,-86.7905529&z=17&output=embed";

function ContactoPage() {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
    asunto: "Cotización",
    mensaje: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.correo || !form.mensaje) return;
    const lines = [
      `Hola Idealo 👋 Soy *${form.nombre}*.`,
      form.empresa && `Empresa: ${form.empresa}`,
      `Correo: ${form.correo}`,
      form.telefono && `Teléfono: ${form.telefono}`,
      `Asunto: ${form.asunto}`,
      "",
      "Mensaje:",
      form.mensaje,
    ].filter(Boolean).join("\n");
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const directWa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola Idealo 👋 quiero hacerles una consulta.")}`;

  const inputCls =
    "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-transparent focus:ring-2";
  const focusStyle = { boxShadow: undefined } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>

        <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contacto</div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Contáctanos · <span className="text-gradient-rainbow">Idealo</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Estamos en La Ceiba — escríbenos o visítanos.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-elegant sm:p-8">
              <h2 className="text-xl font-bold">Información de contacto</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: "var(--brand-magenta)" }}
                  >
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">IDEALO</div>
                    <div className="text-muted-foreground">[Dirección — completar]</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: "var(--brand-cyan)" }}
                  >
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">Teléfono / WhatsApp</div>
                    <a href={`tel:+${WHATSAPP}`} className="text-muted-foreground hover:text-foreground">
                      +504 3363-5666
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: "var(--brand-magenta)" }}
                  >
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">Correo</div>
                    <a href="mailto:idealo.hn@gmail.com" className="text-muted-foreground hover:text-foreground">
                      idealo.hn@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: "var(--brand-cyan)" }}
                  >
                    <Clock className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">Horario</div>
                    <div className="text-muted-foreground">[Horario — completar]</div>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Redes sociales</div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/${WHATSAPP}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
                    style={{ background: "#25D366" }}
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                  <a
                    href="https://www.instagram.com/idealohn_/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
                    style={{ background: "var(--brand-magenta)" }}
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/idealohnd/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
                    style={{ background: "var(--brand-cyan)" }}
                  >
                    <Facebook className="h-4 w-4" /> Facebook
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
              <div className="flex items-center justify-between px-6 py-3">
                <div className="text-sm font-semibold">Nuestra ubicación</div>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                  style={{ color: "var(--brand-magenta)" }}
                >
                  Abrir en Maps <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <iframe
                src={MAPS_EMBED}
                title="Ubicación Idealo en Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0 sm:h-80"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-elegant sm:p-8">
            <h2 className="text-xl font-bold">Envíanos un mensaje</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Rellena el formulario y te contactamos por WhatsApp.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Nombre *
                  </label>
                  <input required value={form.nombre} onChange={set("nombre")} className={inputCls} style={focusStyle} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Empresa
                  </label>
                  <input value={form.empresa} onChange={set("empresa")} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Correo electrónico *
                  </label>
                  <input required type="email" value={form.correo} onChange={set("correo")} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Teléfono / WhatsApp
                  </label>
                  <input value={form.telefono} onChange={set("telefono")} className={inputCls} />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Asunto
                </label>
                <select value={form.asunto} onChange={set("asunto")} className={inputCls}>
                  <option>Cotización</option>
                  <option>Soporte</option>
                  <option>Trabajemos juntos</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Mensaje *
                </label>
                <textarea required rows={5} value={form.mensaje} onChange={set("mensaje")} className={inputCls} />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:scale-[1.01]"
                style={{ background: "linear-gradient(90deg, var(--brand-magenta), var(--brand-cyan))" }}
              >
                <Send className="h-5 w-5" /> Enviar mensaje
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> o <span className="h-px flex-1 bg-border" />
            </div>

            <a
              href={directWa}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-lg font-semibold text-white shadow-md transition hover:brightness-95"
              style={{ background: "#25D366" }}
            >
              <MessageCircle className="h-6 w-6" /> Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
