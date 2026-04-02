-- =============================================
-- Contourline IA Hub - Auth & Access Control
-- Execute no Supabase SQL Editor
-- =============================================

-- 1. Tabela de perfis (vinculada ao auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Tabela de permissões por página
CREATE TABLE IF NOT EXISTS public.page_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  page_route TEXT NOT NULL,
  can_access BOOLEAN NOT NULL DEFAULT true,
  granted_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, page_route)
);

-- 3. Tabela de logs de acesso
CREATE TABLE IF NOT EXISTS public.access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  email TEXT,
  page_route TEXT NOT NULL,
  action TEXT NOT NULL DEFAULT 'page_view',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Tabela de páginas disponíveis
CREATE TABLE IF NOT EXISTS public.hub_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#3b82f6',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Inserir páginas do hub
INSERT INTO public.hub_pages (route, title, description, color, sort_order) VALUES
  ('/portal', 'Portal de Processos', 'Gestão completa de processos organizacionais', '#3b82f6', 1),
  ('/dashboard', 'Dashboard Estratégico', 'Indicadores de performance e métricas', '#10b981', 2),
  ('/fechamento', 'DFs Acionistas', 'Demonstrações financeiras para acionistas', '#a855f7', 3),
  ('/mapa', 'Mapa Interativo', 'Visualização geográfica das operações', '#06b6d4', 4),
  ('/rdstation', 'Dashboard Comercial', 'Pipeline de vendas e métricas de conversão', '#f59e0b', 5),
  ('/academy', 'Contourline Academy', 'Plataforma LMS de treinamento', '#ec4899', 6)
ON CONFLICT (route) DO NOTHING;

-- 6. RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hub_pages ENABLE ROW LEVEL SECURITY;

-- Profiles: usuário vê próprio perfil, admin vê todos
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

-- Page Permissions: usuário vê próprias, admin vê/edita todas
CREATE POLICY "Users can view own permissions" ON public.page_permissions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all permissions" ON public.page_permissions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Access Logs: só admin pode ver
CREATE POLICY "Admins can view access logs" ON public.access_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users can insert logs" ON public.access_logs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Hub Pages: todos autenticados podem ver
CREATE POLICY "Authenticated users can view pages" ON public.hub_pages
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage pages" ON public.hub_pages
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 7. Trigger para criar perfil ao registrar usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Função para dar acesso total ao admin
CREATE OR REPLACE FUNCTION public.grant_all_pages(target_user_id UUID, admin_id UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.page_permissions (user_id, page_route, can_access, granted_by)
  SELECT target_user_id, route, true, admin_id
  FROM public.hub_pages
  ON CONFLICT (user_id, page_route) DO UPDATE SET can_access = true, granted_by = admin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Index para performance
CREATE INDEX IF NOT EXISTS idx_page_permissions_user ON public.page_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_user ON public.access_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_created ON public.access_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
