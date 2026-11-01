import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import logoSrc from "@/assets/logo.png";
import { ChatShell } from "@/components/chat/ChatShell";
import { getThreadMessages } from "@/lib/chat.functions";
import { supabase } from "@/integrations/supabase/client";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const title = "Conversa | Maison da Costura";
const description = "Conversa com o assistente do Maison da Costura.";

export const Route = createFileRoute("/_authenticated/chat/$threadId")({
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
  component: ChatThreadPage,
});

function ChatThreadPage() {
  const { threadId } = Route.useParams();
  const { data: initialMessages, isLoading, error } = useQuery<UIMessage[]>({
    queryKey: ["chat-messages", threadId],
    queryFn: () => getThreadMessages({ data: { threadId } }) as Promise<UIMessage[]>,
    staleTime: Infinity,
    retry: false,
  });

  return (
    <ChatShell>
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <Shimmer className="text-sm">Abrindo a conversa...</Shimmer>
        </div>
      )}
      {error && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
          <p className="text-muted-foreground">Não foi possível abrir esta conversa.</p>
          <Link to="/chat" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            Voltar para as conversas
          </Link>
        </div>
      )}
      {initialMessages && <ChatWindow key={threadId} threadId={threadId} initialMessages={initialMessages} />}
    </ChatShell>
  );
}

function ChatWindow({ threadId, initialMessages }: { threadId: string; initialMessages: UIMessage[] }) {
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { threadId },
        headers: async () => {
          const { data } = await supabase.auth.getSession();
          return data.session ? { Authorization: `Bearer ${data.session.access_token}` } : {};
        },
      }),
    [threadId],
  );

  const { messages, sendMessage, status, stop, error } = useChat({
    id: threadId,
    transport,
    messages: initialMessages,
    onError: (err) => {
      console.error(err);
      toast.error("Não foi possível enviar. Tente novamente.");
    },
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId, status]);

  const busy = status === "submitted" || status === "streaming";

  return (
    <>
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 md:hidden">
        <Link to="/chat" aria-label="Voltar para as conversas" className="rounded-md p-1.5 hover:bg-secondary">
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </Link>
        <img src={logoSrc} alt="" className="h-8 w-8 rounded-full" />
        <p className="font-display text-sm font-semibold">Assistente do Maison</p>
      </div>

      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6">
          {messages.length === 0 && (
            <ConversationEmptyState
              icon={<img src={logoSrc} alt="Maison da Costura" className="h-16 w-16 rounded-full" />}
              title="Assistente do Maison da Costura"
              description="Pergunte sobre os cursos de Corte e Costura e de Modelagem, valores, duração e como chegar."
            />
          )}
          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent>
                {m.parts.map((part, i) =>
                  part.type === "text" ? (
                    m.role === "assistant" ? (
                      <MessageResponse key={i}>{part.text}</MessageResponse>
                    ) : (
                      <p key={i} className="whitespace-pre-wrap">
                        {part.text}
                      </p>
                    )
                  ) : null,
                )}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && <Shimmer className="text-sm">Costurando a resposta...</Shimmer>}
          {error && (
            <p className="text-sm text-destructive">
              A resposta não pôde ser gerada. Envie sua mensagem novamente.
            </p>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border bg-background px-4 py-3">
        <div className="mx-auto w-full max-w-3xl">
          <PromptInput
            onSubmit={({ text }) => {
              if (text.trim()) sendMessage({ text });
            }}
          >
            <PromptInputTextarea
              ref={textareaRef}
              placeholder="Escreva sua dúvida sobre os cursos..."
              aria-label="Mensagem para o assistente"
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={busy ? false : undefined} onStop={stop} />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            O assistente responde com base nas informações oficiais do site. Para inscrições, fale pelo WhatsApp.
          </p>
        </div>
      </div>
    </>
  );
}
