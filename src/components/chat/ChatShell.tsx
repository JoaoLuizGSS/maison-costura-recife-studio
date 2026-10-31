import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { MessageCircle, Plus, Scissors, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { ReactNode } from "react";

import logoSrc from "@/assets/logo.png";
import { createThread, deleteThread, listThreads } from "@/lib/chat.functions";
import { cn } from "@/lib/utils";

export function useThreads() {
  return useQuery({ queryKey: ["chat-threads"], queryFn: () => listThreads() });
}

export function ChatShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams({ strict: false }) as { threadId?: string };
  const activeThreadId = params.threadId;
  const { data: threads, isLoading } = useThreads();

  const create = useMutation({
    mutationFn: () => createThread(),
    onSuccess: (thread) => {
      queryClient.invalidateQueries({ queryKey: ["chat-threads"] });
      navigate({ to: "/chat/$threadId", params: { threadId: thread.id } });
    },
    onError: () => toast.error("Não foi possível criar a conversa."),
  });

  const remove = useMutation({
    mutationFn: (threadId: string) => deleteThread({ data: { threadId } }),
    onSuccess: (_data, threadId) => {
      queryClient.invalidateQueries({ queryKey: ["chat-threads"] });
      if (threadId === activeThreadId) navigate({ to: "/chat" });
    },
    onError: () => toast.error("Não foi possível apagar a conversa."),
  });

  return (
    <div className="flex h-dvh bg-background">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-border bg-secondary/40 md:flex">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <img src={logoSrc} alt="Maison da Costura" className="h-9 w-9 rounded-full" />
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold">Assistente</p>
            <p className="truncate text-xs text-muted-foreground">Maison da Costura</p>
          </div>
        </div>
        <div className="p-3">
          <button
            onClick={() => create.mutate()}
            disabled={create.isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            <Plus className="h-4 w-4" aria-hidden /> Nova conversa
          </button>
        </div>
        <nav aria-label="Conversas" className="flex-1 overflow-y-auto px-3 pb-3">
          {isLoading && <p className="px-2 py-4 text-sm text-muted-foreground">Carregando conversas...</p>}
          {!isLoading && threads?.length === 0 && (
            <p className="px-2 py-4 text-sm text-muted-foreground">Nenhuma conversa ainda. Comece uma nova!</p>
          )}
          <ul className="space-y-1">
            {threads?.map((t) => (
              <li key={t.id} className="group flex items-center gap-1">
                <Link
                  to="/chat/$threadId"
                  params={{ threadId: t.id }}
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    t.id === activeThreadId
                      ? "bg-primary/10 font-medium text-foreground"
                      : "text-muted-foreground hover:bg-background hover:text-foreground",
                  )}
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="truncate">{t.title}</span>
                </Link>
                <button
                  onClick={() => remove.mutate(t.id)}
                  aria-label={`Apagar conversa ${t.title}`}
                  className="rounded-md p-1.5 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive focus:opacity-100 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-border p-3">
          <a
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Scissors className="h-4 w-4" aria-hidden /> Voltar ao site
          </a>
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
