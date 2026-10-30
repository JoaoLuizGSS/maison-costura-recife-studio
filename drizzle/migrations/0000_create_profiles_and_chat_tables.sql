CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.chat_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Nova conversa',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_threads TO authenticated;
GRANT ALL ON public.chat_threads TO service_role;

ALTER TABLE public.chat_threads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own threads"
  ON public.chat_threads FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own threads"
  ON public.chat_threads FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own threads"
  ON public.chat_threads FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own threads"
  ON public.chat_threads FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES public.chat_threads(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  parts JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX chat_messages_thread_created_idx ON public.chat_messages (thread_id, created_at);

GRANT SELECT, INSERT, DELETE ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read messages of own threads"
  ON public.chat_messages FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.chat_threads t WHERE t.id = thread_id AND t.user_id = auth.uid()));

CREATE POLICY "Users can insert messages into own threads"
  ON public.chat_messages FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.chat_threads t WHERE t.id = thread_id AND t.user_id = auth.uid()));

CREATE POLICY "Users can delete messages of own threads"
  ON public.chat_messages FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.chat_threads t WHERE t.id = thread_id AND t.user_id = auth.uid()));