import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Settings, X } from "lucide-react";

import { needsAnswer, onConsentChange, readChoice, saveChoices } from "@/lib/consent";
import { btn } from "@/components/site/ui";

export const OPEN_COOKIE_SETTINGS_EVENT = "maison:open-cookie-settings";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [gpc, setGpc] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let active = true;
    const privacySignal = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    setGpc(privacySignal);
    setAnalytics(readChoice("analytics") === "granted");
    void needsAnswer(["analytics"]).then((needed) => {
      if (active) setVisible(needed);
    });

    const openSettings = () => {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setAnalytics(readChoice("analytics") === "granted");
      setSettings(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    const unsubscribe = onConsentChange(() => setAnalytics(readChoice("analytics") === "granted"));
    return () => {
      active = false;
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (visible) panelRef.current?.focus();
  }, [visible]);

  function close() {
    setVisible(false);
    setSettings(false);
    returnFocusRef.current?.focus();
  }

  function answer(choice: "granted" | "denied") {
    saveChoices({ analytics: choice });
    close();
  }

  if (!visible) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      tabIndex={-1}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-soft sm:p-6"
    >
      <div className="flex items-start gap-3">
        <Settings className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div className="flex-1">
          <h2 id="cookie-title" className="font-display text-xl font-semibold">
            {settings ? "Configurações de cookies" : "Sua privacidade"}
          </h2>
          {!settings && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Contamos visitas sem cookies. Se você aceitar, também medimos cliques. Consulte a{" "}
              <Link to="/privacidade" className="text-primary underline underline-offset-4">Política de Privacidade</Link> e a{" "}
              <Link to="/cookies" className="text-primary underline underline-offset-4">Política de Cookies</Link>.
            </p>
          )}
        </div>
        <button type="button" onClick={close} aria-label="Fechar aviso de cookies" className="min-h-11 min-w-11 rounded-md p-2 hover:bg-secondary">
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>

      {settings ? (
        <div className="mt-5">
          <div className="flex items-center justify-between gap-4 border-b border-border py-3">
            <div><p className="font-medium">Necessários</p><p className="text-sm text-muted-foreground">Recursos essenciais e segurança.</p></div>
            <span className="text-sm font-medium">Sempre ativos</span>
          </div>
          <div className="flex items-center justify-between gap-4 py-4">
            <div><p className="font-medium">Analytics, fornecido pelo Lovable</p><p className="text-sm text-muted-foreground">Medição de cliques e outras interações.</p></div>
            <button
              type="button"
              role="switch"
              aria-checked={analytics && !gpc}
              aria-label="Permitir analytics"
              disabled={gpc}
              onClick={() => setAnalytics((value) => !value)}
              className="min-h-11 min-w-24 rounded-full border border-primary px-3 py-2 text-sm font-medium text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {analytics && !gpc ? "Ativado" : "Desativado"}
            </button>
          </div>
          {gpc && <p className="mb-3 text-sm text-muted-foreground">O sinal de privacidade do seu navegador está aplicado: o analytics permanece desativado.</p>}
          <button type="button" onClick={() => answer(analytics && !gpc ? "granted" : "denied")} className={btn("primary", "w-full")}>
            Salvar configurações
          </button>
        </div>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <button type="button" onClick={() => answer("granted")} className={btn("primary", "w-full")}>Aceitar todos</button>
          <button type="button" onClick={() => answer("denied")} className={btn("primary", "w-full")}>Rejeitar todos</button>
          <button type="button" onClick={() => { setAnalytics(readChoice("analytics") === "granted"); setSettings(true); }} className={btn("outline", "w-full")}>
            Configurações de cookies
          </button>
        </div>
      )}
    </div>
  );
}
