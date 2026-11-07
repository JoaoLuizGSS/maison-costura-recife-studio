import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { X } from "lucide-react";

import logoSrc from "@/assets/logo.png";
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

const ASSISTANT_ORIGIN = "https://maison-costura-recife-studio.lovable.app";

const Ctx = createContext<{ openAssistant: () => void }>({ openAssistant: () => {} });
export const useAssistant = () => useContext(Ctx);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ openAssistant: () => setOpen(true) }}>
      {children}
      {open && <AssistantPanel onClose={() => setOpen(false)} />}
    </Ctx.Provider>
  );
}

function AssistantPanel({ onClose }: { onClose: () => void }) {
  // External hosting (e.g. maisondacostura.com.br) has no server, so call the Lovable-hosted endpoint there.
  const transport = useMemo(() => {
    const h = window.location.hostname;
    const local = h === "localhost" || h.endsWith(".lovable.app") || h.endsWith(".lovableproject.com");
    const api = local ? "/api/public/assistente" : `${ASSISTANT_ORIGIN}/api/public/assistente`;
    return new DefaultChatTransport({ api });
  }, []);
  const { messages, sendMessage, status, stop, error } = useChat({ id: "assistente-publico", transport });
  const busy = status === "submitted" || status === "streaming";

  return (
    <div
      role="dialog"
      aria-label="Assistente do Maison da Costura"
      className="fixed inset-0 z-50 flex flex-col bg-background shadow-soft sm:inset-auto sm:bottom-4 sm:right-4 sm:h-[600px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-border"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <img src={logoSrc} alt="" className="h-9 w-9 rounded-full" />
        <p className="flex-1 font-display text-sm font-semibold">Assistente do Maison</p>
        <button onClick={onClose} aria-label="Fechar assistente" className="rounded-md p-1.5 hover:bg-secondary">
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <Conversation className="flex-1">
        <ConversationContent className="gap-5 px-4 py-5">
          {messages.length === 0 && (
            <ConversationEmptyState
              icon={<img src={logoSrc} alt="" className="h-14 w-14 rounded-full" />}
              title="Tire suas dúvidas"
              description="Pergunte sobre os cursos de Corte e Costura e de Modelagem: valores, duração, conteúdo e endereço."
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
                      <p key={i} className="whitespace-pre-wrap">{part.text}</p>
                    )
                  ) : null,
                )}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && <Shimmer className="text-sm">Costurando a resposta...</Shimmer>}
          {error && <p className="text-sm text-destructive">Não foi possível responder. Tente novamente.</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="border-t border-border px-3 py-3">
        <PromptInput onSubmit={({ text }) => { if (text.trim()) sendMessage({ text }); }}>
          <PromptInputTextarea placeholder="Escreva sua dúvida sobre os cursos..." aria-label="Mensagem para o assistente" />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} disabled={busy ? false : undefined} onStop={stop} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
