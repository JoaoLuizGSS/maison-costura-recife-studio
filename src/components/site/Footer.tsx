import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import logoSrc from "@/assets/logo.png";
import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/site/CookieBanner";
import { address, businessName, contactEmail, contacts, mapsSearchUrl, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <img src={logoSrc} alt="Maison da Costura" width={96} height={96} loading="lazy" className="h-24 w-24 rounded-full" />
          <p className="mt-4 font-script text-2xl text-blush">Costurando ideias, criando possibilidades.</p>
        </div>
        <div>
          <h3 className="mb-3 text-lg">Cursos</h3>
          <ul className="space-y-2 text-sm text-ink-foreground/80">
            <li><a className="hover:text-blush" href="/#corte-e-costura">Corte e Costura</a></li>
            <li><a className="hover:text-blush" href="/#modelagem">Modelagem</a></li>
            <li><a className="hover:text-blush" href="/#ajustes-e-reformas">Ajustes e Reformas</a></li>
            <li><a className="hover:text-blush" href="/#materiais">Materiais digitais</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-lg">WhatsApp</h3>
          <ul className="space-y-2 text-sm text-ink-foreground/80">
            {contacts.map((c) => (
              <li key={c.id}><a className="hover:text-blush" href={whatsappLink(c.id)} target="_blank" rel="noopener noreferrer">{c.name}: {c.phone}</a></li>
            ))}
          </ul>
          <a href={`mailto:${contactEmail}`} className="mt-4 inline-flex items-start gap-2 text-sm text-blush underline-offset-4 hover:underline">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {contactEmail}
          </a>
        </div>
        <div>
          <h3 className="mb-3 text-lg">Endereço</h3>
          <p className="text-sm text-ink-foreground/80">{address}</p>
          <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-blush hover:underline">
            <MapPin className="h-4 w-4" aria-hidden /> Ver no Google Maps
          </a>
        </div>
        <div>
          <h3 className="mb-3 text-lg">Informações legais</h3>
          <ul className="space-y-2 text-sm text-ink-foreground/80">
            <li><Link className="hover:text-blush" to="/privacidade">Política de Privacidade</Link></li>
            <li><Link className="hover:text-blush" to="/termos">Termos de Uso</Link></li>
            <li><Link className="hover:text-blush" to="/cookies">Política de Cookies</Link></li>
            <li><Link className="hover:text-blush" to="/reembolso">Troca e Reembolso</Link></li>
          </ul>
          <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))} className="mt-4 text-left text-sm text-blush underline-offset-4 hover:underline">
            Configurações de cookies
          </button>
        </div>
      </div>
      <div className="border-t border-ink-foreground/15 px-4 py-5 text-center text-xs text-ink-foreground/70">
        <p>{businessName} · {contactEmail}</p>
        <p className="mt-1">© {new Date().getFullYear()} {businessName}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
