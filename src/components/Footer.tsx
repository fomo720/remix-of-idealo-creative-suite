import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/idealo-logo.png.asset.json";
import { WHATSAPP_NUMBER, WHATSAPP_ALT, categories } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      <div className="h-1.5 w-full bg-gradient-rainbow" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo.url} alt="Idealo" className="h-14 w-auto" />
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Si puedes imaginarlo, Idealo lo hace realidad. Imprenta profesional y estudio creativo
            en La Ceiba, Honduras. Nosotros lo creamos.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href="https://instagram.com/idealohn"
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-gradient-cta hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com/idealohn"
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-gradient-cta hover:text-white"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-gradient-cta hover:text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest">Contacto</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-pink)" }} />
              Shopping Center Almina, Ave. Colón, La Ceiba, Honduras
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" style={{ color: "var(--brand-orange)" }} />
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-foreground">3363-5666</a>
              {" / "}
              <a href={`tel:+${WHATSAPP_ALT}`} className="hover:text-foreground">3178-7201</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" style={{ color: "var(--brand-blue)" }} />
              hola@idealo.hn
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest">Servicios</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/servicios/$categoria"
                  params={{ categoria: c.slug }}
                  className="hover:text-foreground"
                >
                  {c.short}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/servicios" className="hover:text-foreground">Ver todo el catálogo →</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Idealo · Producción gráfica profesional · Hecho en Honduras 🇭🇳
      </div>
    </footer>
  );
}
