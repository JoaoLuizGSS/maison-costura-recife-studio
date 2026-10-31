import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { UIMessage } from "ai";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listThreads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("chat_threads")
      .select("id, title, updated_at")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("chat_threads")
      .insert({ user_id: context.userId })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return data;
  });

export const getThreadMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ threadId: z.string().uuid() }))
  .handler(async ({ context, data: input }) => {
    const { data: thread, error: threadError } = await context.supabase
      .from("chat_threads")
      .select("id")
      .eq("id", input.threadId)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (threadError) throw new Error(threadError.message);
    if (!thread) throw new Error("Conversa não encontrada.");

    const { data, error } = await context.supabase
      .from("chat_messages")
      .select("id, role, parts, created_at")
      .eq("thread_id", input.threadId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);

    return data.map(
      (m): UIMessage => ({
        id: m.id,
        role: m.role as UIMessage["role"],
        parts: m.parts as unknown as UIMessage["parts"],
      }),
    );
  });

export const deleteThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ threadId: z.string().uuid() }))
  .handler(async ({ context, data: input }) => {
    const { error } = await context.supabase
      .from("chat_threads")
      .delete()
      .eq("id", input.threadId)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
