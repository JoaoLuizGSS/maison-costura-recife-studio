import { createContext, useContext, useState, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { contacts, courseNames, whatsappLink, type CourseId } from "@/lib/site";

const Ctx = createContext<(course?: CourseId) => void>(() => {});
export const useContactChooser = () => useContext(Ctx);

export function ContactChooserProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState<CourseId | undefined>();
  return (
    <Ctx.Provider value={(c) => { setCourse(c); setOpen(true); }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Com quem deseja falar?</DialogTitle>
            <DialogDescription>
              {course ? `Escolha uma atendente para saber mais sobre o curso de ${courseNames[course]}.` : "Escolha uma atendente para conversar pelo WhatsApp."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            {contacts.map((c) => (
              <a key={c.id} href={whatsappLink(c.id, course)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card p-5 text-center transition hover:border-primary hover:shadow-soft">
                <MessageCircle className="h-6 w-6 text-whatsapp" aria-hidden />
                <span className="font-display text-xl">{c.name}</span>
                <span className="text-sm text-muted-foreground">{c.phone}</span>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
