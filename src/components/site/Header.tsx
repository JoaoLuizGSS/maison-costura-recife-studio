import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Bot, LogOut, Menu, X } from "lucide-react";
import logoSrc from "@/assets/logo.png";
import { useSession } from "@/hooks/use-session";
import { supabase } from "@/integrations/supabase/client";
import { btn } from "./ui";

export const navLinks = [
  ["#inicio", "Início"],
  ["#cursos", "Nossos Cursos"],
  ["#corte-e-costura", "Corte e Costura"],
  ["#modelagem", "Modelagem"],
  ["#sobre", "Sobre Nós"],
  ["#contato", "Contato"],
  ["#como-chegar", "Como Chegar"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 py-2">
        <a href="#inicio" className="flex items-center gap-2" aria-label="Maison da Costura — início">
          <img src={logoSrc} alt="Maison da Costura" width={56} height={56} className="h-14 w-14 rounded-full" />
        </a>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-5 text-sm">
            {navLinks.map(([href, label]) => (
              <li key={href}><a href={href} className="transition-colors hover:text-primary">{label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/chat" className={btn("outline", "px-5 py-2.5")}>
            <Bot className="h-4 w-4" aria-hidden /> Assistente
          </Link>
          {session ? (
            <button onClick={handleSignOut} className={btn("primary", "px-5 py-2.5")}>
              <LogOut className="h-4 w-4" aria-hidden /> Sair
            </button>
          ) : (
            <Link to="/auth" className={btn("primary", "px-5 py-2.5")}>Entrar</Link>
          )}
        </div>
        <button className="rounded-md p-2 lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t border-border bg-background lg:hidden">
          <ul className="flex flex-col px-4 py-3">
            {navLinks.map(([href, label]) => (
              <li key={href}><a href={href} onClick={() => setOpen(false)} className="block py-2.5 font-display text-lg">{label}</a></li>
            ))}
            <li className="pt-3">
              <Link to="/chat" onClick={() => setOpen(false)} className={btn("outline", "w-full")}>
                <Bot className="h-4 w-4" aria-hidden /> Assistente
              </Link>
            </li>
            <li className="pt-2">
              {session ? (
                <button onClick={() => { setOpen(false); handleSignOut(); }} className={btn("primary", "w-full")}>
                  <LogOut className="h-4 w-4" aria-hidden /> Sair
                </button>
              ) : (
                <Link to="/auth" onClick={() => setOpen(false)} className={btn("primary", "w-full")}>Entrar</Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
