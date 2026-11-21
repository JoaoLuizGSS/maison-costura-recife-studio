import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";

import logoSrc from "@/assets/logo.png";
import { Footer } from "@/components/site/Footer";
import { address, businessName, contactEmail } from "@/lib/site";

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
}

export function LegalPage({ title, introduction, children }: { title: string; introduction: string; children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <a href="#conteudo" className="fixed left-4 top-3 z-[70] -translate-y-24 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:translate-y-0">
        Ir para o conteúdo
      </a>
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Maison da Costura — página inicial">
            <img src={logoSrc} alt="" width={48} height={48} className="h-12 w-12 rounded-full" />
            <span className="font-display text-lg font-semibold">Maison da Costura</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary underline-offset-4 hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Voltar ao site
          </Link>
        </div>
      </header>
      <main id="conteudo" className="mx-auto max-w-4xl px-4 py-14">
        <article>
          <p className="font-script text-3xl text-primary">Informações e transparência</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight">{title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">Última atualização: 21 de novembro de 2026.</p>
          <p className="mt-6 text-lg leading-relaxed">{introduction}</p>
          <div className="mt-8 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed">
            <p><strong className="text-foreground">Responsável:</strong> {businessName}</p>
            <p className="mt-2"><strong className="text-foreground">Endereço:</strong> {address}</p>
            <a href={`mailto:${contactEmail}`} className="mt-2 inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline">
              <Mail className="h-4 w-4" aria-hidden /> {contactEmail}
            </a>
          </div>
          {children}
        </article>
      </main>
      <Footer />
    </div>
  );
}
