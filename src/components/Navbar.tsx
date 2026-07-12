import { Menu, MessageCircle } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#personalizar", label: "Personalizar Ahora" },
    { href: "#empresas", label: "Servicios para Empresas" },
    { href: "#portafolio", label: "Portafolio" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-cta text-lg font-black text-white shadow-elegant">i</span>
          <span className="text-xl font-bold tracking-tight">Idealo</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="https://wa.me/50400000000"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-full bg-gradient-cta px-4 py-2 text-sm font-semibold text-white shadow-elegant transition hover:scale-105 md:inline-flex"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <button onClick={() => setOpen((v) => !v)} className="rounded-lg border border-border p-2 md:hidden" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
                {l.label}
              </a>
            ))}
            <a href="https://wa.me/50400000000" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cta px-4 py-2 text-sm font-semibold text-white">
              <MessageCircle className="h-4 w-4" /> Contacto WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
