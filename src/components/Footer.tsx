import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/idealo-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      <div className="h-1.5 w-full bg-gradient-rainbow" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo.url} alt="Idealo" className="h-14 w-auto" />

          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Si puedes imaginarlo, Idealo lo hace realidad. Sin límites para tu marca.
            Imprenta profesional y estudio creativo en Honduras.
          </p>
          <div className="mt-6 flex gap-2">
            {[
              { Icon: Instagram, href: "https://www.instagram.com/idealohn_/", label: "Instagram" },
              { Icon: Facebook, href: "https://www.facebook.com/idealohnd/", label: "Facebook" },
              { Icon: MessageCircle, href: "https://wa.me/50432316100", label: "WhatsApp" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-gradient-cta hover:text-white">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest">Contacto</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-pink)" }} /> La Ceiba, Honduras · Plaza Almina</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" style={{ color: "var(--brand-orange)" }} /> +504 0000-0000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" style={{ color: "var(--brand-blue)" }} /> hola@idealo.hn</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest">Explorar</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/#personalizar" className="hover:text-foreground">Personalizar</a></li>
            <li><a href="/empresas" className="hover:text-foreground">Empresas</a></li>
            <li><a href="/eventos" className="hover:text-foreground">Eventos</a></li>
            <li><a href="/#portafolio" className="hover:text-foreground">Portafolio</a></li>
            <li><a href="https://wa.me/50432316100" className="hover:text-foreground">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Idealo · Producción gráfica profesional · Hecho en Honduras 🇭🇳
      </div>
    </footer>
  );
}
