import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

import logoSrc from "@/assets/logo.png";
import { ChatShell, useThreads } from "@/components/chat/ChatShell";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Scissors } from "lucide-react";
import { createThread } from "@/lib/chat.functions";
import { toast } from "sonner";

const title = "Assistente | Maison da Costura";
const description = "Converse com o assistente do Maison da Costura e tire dúvidas sobre os cursos.";

export const Route = createFileRoute("/_authenticated/chat")({
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
  component: ChatIndex,
});

function ChatIndex() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: threads } = useThreads();

  const create = useMutation({
    mutationFn: () => createThread(),
    onSuccess: (thread) => {
      queryClient.invalidateQueries({ queryKey: ["chat-threads"] });
      navigate({ to: "/chat/$threadId", params: { threadId: thread.id } });
    },
    onError: () => toast.error("Não foi possível criar a conversa."),
  });

  return (
    <ChatShell>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <img src={logoSrc} alt="Maison da Costura" className="h-20 w-20 rounded-full" />
        <div>
          <h1 className="font-display text-2xl font-semibold">Assistente do Maison da Costura</h1>
          <p className="mt-2 max-w-md text-muted-foreground">
            Tire dúvidas sobre os cursos de Corte e Costura e de Modelagem, valores, duração e como chegar.
          </p>
        </div>
        <button
          onClick={() => create.mutate()}
          disabled={create.isPending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" aria-hidden /> Começar uma conversa
        </button>

        {/* Lista de conversas no celular (a barra lateral só aparece em telas maiores) */}
        <div className="mt-6 w-full max-w-md md:hidden">
          {threads && threads.length > 0 && (
            <ul className="space-y-2 text-left">
              {threads.map((t) => (
                <li key={t.id}>
                  <Link
                    to="/chat/$threadId"
                    params={{ threadId: t.id }}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span className="truncate">{t.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <a href="/" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Scissors className="h-4 w-4" aria-hidden /> Voltar ao site
          </a>
        </div>
      </div>
    </ChatShell>
  );
}
