import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { buildSystemPrompt } from "@/lib/chat.server";
import { createLovableAiGatewayProvider, getLovableAiGatewayRunId } from "@/lib/ai/gateway.server";

// Public (no login) course assistant. No persistence; input size is capped to limit abuse.
export const Route = createFileRoute("/api/public/assistente")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "IA não configurada." }, { status: 500 });
        let body: { messages?: UIMessage[] };
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Pedido inválido." }, { status: 400 });
        }
        const messages = (body.messages ?? []).slice(-12);
        const last = messages[messages.length - 1];
        if (!last || last.role !== "user") return Response.json({ error: "Pedido inválido." }, { status: 400 });
        const size = JSON.stringify(messages).length;
        if (size > 20000) return Response.json({ error: "Conversa muito longa." }, { status: 413 });

        const gateway = createLovableAiGatewayProvider(apiKey, getLovableAiGatewayRunId(request), {
          baseURL: "https://ai.gateway.lovable.dev/v1",
        });
        const result = streamText({
          model: gateway("google/gemini-3.1-flash-lite"),
          system:
            buildSystemPrompt() +
            "\n5. Responda SOMENTE perguntas sobre os cursos e informações do site. Recuse qualquer outro assunto com educação.",
          messages: await convertToModelMessages(messages),
          abortSignal: request.signal,
          maxRetries: 0,
        });
        return result.toUIMessageStreamResponse();
      },
    },
  },
});
