import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import logoSrc from "@/assets/logo.png";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { btn } from "@/components/site/ui";

const title = "Entrar | Maison da Costura";
const description = "Entre com sua conta para conversar com o assistente do Maison da Costura.";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" && search.redirect.startsWith("/") ? search.redirect : "/chat",
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [busy, setBusy] = useState<"google" | "lovable" | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const target = sessionStorage.getItem("auth_redirect") ?? redirect;
        sessionStorage.removeItem("auth_redirect");
        navigate({ to: target, replace: true });
      }
    });
  }, [navigate, redirect]);

  async function signIn(provider: "google" | "lovable") {
    setBusy(provider);
    sessionStorage.setItem("auth_redirect", redirect);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(null);
      toast.error("Não foi possível entrar. Tente novamente.");
      return;
    }
    if (result.redirected) return;
    sessionStorage.removeItem("auth_redirect");
    navigate({ to: redirect, replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
        <img src={logoSrc} alt="Maison da Costura" className="mx-auto h-20 w-20 rounded-full" />
        <p className="mt-4 font-script text-3xl text-primary">Maison da Costura</p>
        <h1 className="mt-1 text-2xl font-semibold">Entre para conversar</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Para guardar suas conversas com o assistente, entre com uma das opções abaixo.
        </p>
        <div className="mt-8 space-y-3">
          <button onClick={() => signIn("google")} disabled={busy !== null} className={btn("primary", "w-full")}>
            {busy === "google" ? "Abrindo o Google..." : "Entrar com Google"}
          </button>
          <button onClick={() => signIn("lovable")} disabled={busy !== null} className={btn("outline", "w-full")}>
            {busy === "lovable" ? "Abrindo..." : "Entrar com Lovable"}
          </button>
        </div>
        <a href="/" className="mt-6 inline-block text-sm text-muted-foreground underline-offset-4 hover:underline">
          Voltar para o site
        </a>
      </div>
    </div>
  );
}
