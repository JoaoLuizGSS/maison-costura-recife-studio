import { createContext, useContext, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle } from "lucide-react";

import logoSrc from "@/assets/logo.png";
import { useContactChooser } from "@/components/site/ContactChooser";
import { btn } from "@/components/site/ui";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
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

const Ctx = createContext<{ openAssistant: () => void }>({ openAssistant: () => {} });
export const useAssistant = () => useContext(Ctx);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  return (
    <Ctx.Provider value={{ openAssistant: () => {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
    } }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <AssistantPanel onClose={() => setOpen(false)} returnFocusRef={returnFocusRef} />
      </Dialog>
    </Ctx.Provider>
  );
}

function AssistantPanel({ onClose, returnFocusRef }: { onClose: () => void; returnFocusRef: RefObject<HTMLElement | null> }) {
  const choose = useContactChooser();
  // The site is served by its own server on every domain, so always call the same-origin endpoint
  // (a cross-origin call to the lovable.app URL gets redirected to the custom domain and fails CORS).
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/public/assistente" }), []);
  const { messages, sendMessage, status, stop, error } = useChat({ id: "assistente-publico", transport });
  const busy = status === "submitted" || status === "streaming";

  return (
    <DialogContent
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        returnFocusRef.current?.focus();
      }}
      className="inset-0 left-0 top-0 flex h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 p-0 shadow-soft sm:inset-auto sm:bottom-24 sm:left-auto sm:right-4 sm:top-auto sm:h-[600px] sm:w-[400px] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl sm:border"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 pr-14">
        <img src={logoSrc} alt="" className="h-9 w-9 rounded-full" />
        <DialogTitle className="flex-1 font-display text-sm font-semibold">Assistente do Maison</DialogTitle>
        <DialogDescription className="sr-only">Conversa com inteligência artificial sobre os cursos do Maison da Costura.</DialogDescription>
      </div>
      <Conversation className="flex-1">
        <ConversationContent className="gap-5 px-4 py-5">
          {messages.length === 0 && (
            <ConversationEmptyState
              icon={<img src={logoSrc} alt="" className="h-14 w-14 rounded-full" />}
              title="Tire suas dúvidas"
              description="Pergunte sobre cursos, valores, duração, conteúdo e endereço."
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
          {error && (
            <div className="rounded-lg border border-border bg-card p-3" role="alert">
              <p className="text-sm text-destructive">Não foi possível responder agora.</p>
              <button type="button" onClick={() => { onClose(); choose(); }} className={btn("whatsapp", "mt-3 w-full")}>
                <MessageCircle className="h-4 w-4" aria-hidden /> Falar pelo WhatsApp
              </button>
            </div>
          )}
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
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Não envie dados pessoais desnecessários. As mensagens são processadas por IA. Consulte a{" "}
          <Link to="/privacidade" className="text-primary underline underline-offset-4">Política de Privacidade</Link>.
        </p>
      </div>
    </DialogContent>
  );
}
