import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/idealo-logo.png.asset.json";
import { WHATSAPP_NUMBER } from "@/data/catalog";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/eventos", label: "Eventos" },
  { to: "/portafolio", label: "Portafolio" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center" aria-label="Idealo">
          <img src={logo.url} alt="Idealo · Nosotros lo creamos" className="h-10 w-auto sm:h-12" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-full bg-gradient-cta px-4 py-2 text-sm font-semibold text-white shadow-elegant transition hover:scale-105 md:inline-flex"
        >
          <MessageCircle className="h-4 w-4" /> Cotizar
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-border p-2 md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                activeProps={{ className: "bg-muted font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cta px-4 py-2 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" /> Cotizar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
