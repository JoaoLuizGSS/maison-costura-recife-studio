import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionTitle({ eyebrow, title, children, light }: { eyebrow?: string; title: string; children?: ReactNode; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && <p className={cn("font-script text-3xl", light ? "text-blush" : "text-primary")}>{eyebrow}</p>}
      <h2 className="mt-1 text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
      <div className="mx-auto mt-5 w-24 stitch" aria-hidden />
      {children && <p className={cn("mt-5 text-lg", light ? "text-ink-foreground/80" : "text-muted-foreground")}>{children}</p>}
    </div>
  );
}

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft",
  outline: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  light: "border border-cream/70 text-cream hover:bg-cream hover:text-ink",
  whatsapp: "bg-whatsapp text-primary-foreground hover:bg-whatsapp/90",
};
export const btn = (v: keyof typeof variants = "primary", extra?: string) =>
  cn("inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors", variants[v], extra);

export function InfoList({ items }: { items: [string, string][] }) {
  return (
    <dl className="divide-y divide-border">
      {items.map(([k, v]) => (
        <div key={k} className="flex flex-wrap justify-between gap-2 py-2.5">
          <dt className="text-sm uppercase tracking-wider text-muted-foreground">{k}</dt>
          <dd className="font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
