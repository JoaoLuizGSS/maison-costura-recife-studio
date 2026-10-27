import { MapPin } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { address, contacts, mapsSearchUrl, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <img src={logo.url} alt="Maison da Costura" width={96} height={96} loading="lazy" className="h-24 w-24 rounded-full" />
          <p className="mt-4 font-script text-2xl text-blush">Costurando ideias, criando possibilidades.</p>
        </div>
        <div>
          <h3 className="mb-3 text-lg">Cursos</h3>
          <ul className="space-y-2 text-sm text-ink-foreground/80">
            <li><a className="hover:text-blush" href="#corte-e-costura">Corte e Costura</a></li>
            <li><a className="hover:text-blush" href="#modelagem">Modelagem</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-lg">WhatsApp</h3>
          <ul className="space-y-2 text-sm text-ink-foreground/80">
            {contacts.map((c) => (
              <li key={c.id}><a className="hover:text-blush" href={whatsappLink(c.id)} target="_blank" rel="noopener noreferrer">{c.name}: {c.phone}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-lg">Endereço</h3>
          <p className="text-sm text-ink-foreground/80">{address}</p>
          <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-blush hover:underline">
            <MapPin className="h-4 w-4" aria-hidden /> Ver no Google Maps
          </a>
        </div>
      </div>
      <div className="border-t border-ink-foreground/15 py-5 text-center text-xs text-ink-foreground/60">
        © {new Date().getFullYear()} Maison da Costura. Todos os direitos reservados.
      </div>
    </footer>
  );
}
