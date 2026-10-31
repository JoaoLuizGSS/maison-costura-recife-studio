import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createClient } from "@supabase/supabase-js";

import type { Database, Json } from "@/integrations/supabase/types";
import { address, contacts, courses } from "@/lib/site";
import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./ai/gateway.server";

const GATEWAY_BASE_URL = "https://ai.gateway.lovable.dev/v1";
const CHAT_MODEL = "google/gemini-3.1-flash-lite";
const DEFAULT_THREAD_TITLE = "Nova conversa";

export function buildSystemPrompt(): string {
  const [tatiana, laura] = contacts;
  return `Você é o assistente virtual do Maison da Costura, um espaço de cursos de corte, costura e modelagem de roupas em Recife-PE. Responda sempre em português brasileiro, com tom acolhedor, objetivo e elegante.

INFORMAÇÕES OFICIAIS (use somente estes dados):
- Curso de Corte e Costura: duração de ${courses.costura.duration}; mensalidade de ${courses.costura.price} por mês; público iniciante e intermediário. Conteúdo inclui materiais de costura, máquina de costura, tipos de tecidos, medidas, noções de corte, técnicas de costura, acabamentos e prática de confecção.
- Curso de Modelagem: duração de ${courses.modelagem.duration}; valor total de ${courses.modelagem.price} pelo curso completo (NÃO é mensalidade); 6 aulas: Saia Base, Saia Evasê e Saia Lápis, Blusa Manga Japonesa, Calça Cós de Elástico, Vestido Tubinho e Calça de Pijama Feminina.
- Endereço: ${address}
- Atendimento pelo WhatsApp: ${tatiana.name} ${tatiana.phone} e ${laura.name} ${laura.phone}.
- Professoras: Laura Ayres (designer de moda sustentável e educadora) e Tatiana (costureira há cerca de 10 anos, formada em Corte, Costura e Modelagem pelo Senac-PE).
- Parceria: Pátio Tecidos e Aviamentos, Rua do Livramento, 93, São José, Recife-PE.

REGRAS OBRIGATÓRIAS:
1. Nunca invente horários, datas de turmas, descontos, parcelamentos, certificados, depoimentos ou qualquer informação que não esteja listada acima.
2. Se a pergunta fugir dessas informações (inscrições, vagas, horários, formas de pagamento etc.), diga que não tem essa informação e oriente a pessoa a falar pelo WhatsApp com ${tatiana.name} (${tatiana.phone}) ou ${laura.name} (${laura.phone}).
3. Responda apenas sobre o Maison da Costura e seus cursos. Para assuntos sem relação, redirecione educadamente para o atendimento pelo WhatsApp.
4. Seja breve: respostas com poucas frases, sem listas longas desnecessárias.`;
}

function jsonError(status: number, message: string): Response {
  return Response.json({ error: message }, { status });
}

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

async function authenticateRequest(request: Request) {
  const supabaseUrl = process.env["SUPABASE_URL"];
  const supabaseKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!supabaseUrl || !supabaseKey) {
    throw jsonError(500, "Configuração do servidor incompleta.");
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw jsonError(401, "Entre na sua conta para conversar com o assistente.");
  }
  const token = authHeader.slice("Bearer ".length);

  const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
    global: {
      fetch: createSupabaseFetch(supabaseKey),
      headers: { Authorization: `Bearer ${token}` },
    },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.auth.getClaims(token);
  if (error || !data?.claims?.sub) {
    throw jsonError(401, "Sessão inválida. Entre novamente.");
  }
  return { supabase, userId: data.claims.sub };
}

export async function handleChat(request: Request): Promise<Response> {
  try {
    const { supabase, userId } = await authenticateRequest(request);

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return jsonError(500, "O serviço de IA não está configurado.");
    }

    const body = (await request.json()) as { messages?: UIMessage[]; threadId?: string };
    const messages = body.messages;
    const threadId = body.threadId;
    if (!Array.isArray(messages) || messages.length === 0 || !threadId) {
      return jsonError(400, "Pedido inválido.");
    }
    const last = messages[messages.length - 1];
    if (!last || last.role !== "user") {
      return jsonError(400, "A última mensagem deve ser do visitante.");
    }

    const { data: thread, error: threadError } = await supabase
      .from("chat_threads")
      .select("id, title")
      .eq("id", threadId)
      .eq("user_id", userId)
      .maybeSingle();
    if (threadError) {
      console.error("Failed to load thread:", threadError);
      return jsonError(500, "Não foi possível abrir a conversa.");
    }
    if (!thread) {
      return jsonError(404, "Conversa não encontrada.");
    }

    const { error: insertError } = await supabase.from("chat_messages").insert({
      thread_id: threadId,
      role: "user",
      parts: last.parts as unknown as Json,
    });
    if (insertError) {
      console.error("Failed to persist user message:", insertError);
      return jsonError(500, "Não foi possível salvar sua mensagem.");
    }

    if (thread.title === DEFAULT_THREAD_TITLE) {
      const text = last.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join(" ")
        .trim();
      if (text) {
        const { error } = await supabase
          .from("chat_threads")
          .update({ title: text.slice(0, 60) })
          .eq("id", threadId);
        if (error) console.error("Failed to set thread title:", error);
      }
    }

    const modelMessages = await convertToModelMessages(messages);
    const gateway = createLovableAiGatewayProvider(apiKey, getLovableAiGatewayRunId(request), {
      baseURL: GATEWAY_BASE_URL,
    });

    const result = streamText({
      model: gateway(CHAT_MODEL),
      system: buildSystemPrompt(),
      messages: modelMessages,
      abortSignal: request.signal,
      maxRetries: 0,
    });

    const response = result.toUIMessageStreamResponse({
      originalMessages: messages,
      onFinish: async ({ responseMessage }) => {
        const { error } = await supabase.from("chat_messages").insert({
          thread_id: threadId,
          role: "assistant",
          parts: responseMessage.parts as unknown as Json,
        });
        if (error) console.error("Failed to persist assistant message:", error);
        const { error: touchError } = await supabase
          .from("chat_threads")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", threadId);
        if (touchError) console.error("Failed to update thread timestamp:", touchError);
      },
    });

    return withLovableAiGatewayRunIdHeader(response, gateway);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error(error);
    return jsonError(500, "Algo deu errado. Tente novamente.");
  }
}
