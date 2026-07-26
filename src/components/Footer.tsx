import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/idealo-logo.png.asset.json";
import { Mascot } from "@/components/Mascot";

export function Footer() {
  return (
    <footer className="relative overflow-hidden text-slate-200" style={{ background: "#37474f" }}>
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, var(--brand-magenta), var(--brand-cyan))" }} />

      {/* Mascota saludando — click abre WhatsApp */}
      <div className="relative mx-auto flex max-w-6xl items-end justify-center px-4 pt-10 md:justify-end md:pr-16">
        <a
          href="https://wa.me/50433635666?text=%C2%A1Hola%20Idealo!%20Necesito%20ayuda%20con%20un%20proyecto%20%F0%9F%99%8C"
          target="_blank"
          rel="noreferrer"
          aria-label="Escríbenos por WhatsApp"
          className="group inline-flex flex-col items-center gap-2 transition hover:scale-105"
        >
          <Mascot pose="wave" size={140} animation="wave" className="drop-shadow-2xl !pointer-events-auto" />
          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-slate-800 shadow-lg">
            ¿Necesitas ayuda? <span style={{ color: "#25D366" }}>Escríbenos por WhatsApp →</span>
          </span>
        </a>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-2">
            <img src={logo.url} alt="Idealo" className="h-10 w-auto" />
          </div>
          <p className="mt-5 max-w-md text-sm text-slate-300">
            Producción gráfica profesional en Honduras. Stickers, banners, papelería y regalos personalizados — tu idea, hecha realidad.
          </p>
          <div className="mt-6 flex gap-2">
            {[
              { Icon: Instagram, href: "https://www.instagram.com/idealohn_/", label: "Instagram" },
              { Icon: Facebook, href: "https://www.facebook.com/idealohnd/", label: "Facebook" },
              { Icon: MessageCircle, href: "https://wa.me/50433635666", label: "WhatsApp" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-slate-200 transition hover:border-transparent hover:text-white"
                style={{ transitionProperty: "background,color,border-color" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--brand-magenta)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Explorar</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="/" className="hover:text-white">Inicio</a></li>
            <li><a href="/#personalizar" className="hover:text-white">Personalizar</a></li>
            <li><a href="/empresas" className="hover:text-white">Empresas</a></li>
            <li><a href="/eventos" className="hover:text-white">Eventos</a></li>
            <li><a href="/#portafolio" className="hover:text-white">Portafolio</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Contacto</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-magenta)" }} /> Shopping Center Almina, Ave Colón, La Ceiba</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" style={{ color: "var(--brand-cyan)" }} /> +504 3363-5666</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" style={{ color: "var(--brand-cyan)" }} /> idealo.hn@gmail.com</li>
            <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-magenta)" }} /> Lun–Vie: 9:00 a.m. – 5:00 p.m.<br/>Sáb: 9:00 a.m. – 1:00 p.m.</li>
          </ul>
          <a
            href="https://wa.me/50433635666"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
            style={{ background: "#25D366" }}
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp directo
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Idealo · Producción gráfica profesional · Hecho en Honduras 🇭🇳
      </div>
    </footer>
  );
}
