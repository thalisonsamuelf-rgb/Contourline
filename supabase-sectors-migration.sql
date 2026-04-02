-- =============================================
-- Contourline IA Hub - Sectors-Based Permissions
-- Execute no Supabase SQL Editor
-- =============================================

-- 1. Tabela de setores (baseado nos Epics)
CREATE TABLE IF NOT EXISTS public.sectors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Vincular páginas a setores (N:N)
CREATE TABLE IF NOT EXISTS public.sector_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sector_id INT NOT NULL REFERENCES public.sectors(id) ON DELETE CASCADE,
  page_route TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(sector_id, page_route)
);

-- 3. Vincular usuários a setores (N:N)
CREATE TABLE IF NOT EXISTS public.user_sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  sector_id INT NOT NULL REFERENCES public.sectors(id) ON DELETE CASCADE,
  granted_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, sector_id)
);

-- 4. Inserir os 13 setores dos Epics
INSERT INTO public.sectors (name, description, color, sort_order) VALUES
  ('Comercial & SDR',           'Funil comercial, qualificacao de leads e SDR com IA',          '#3b82f6', 1),
  ('Marketing & IA',            'Producao de conteudo, midia paga, CRM e analytics',            '#8b5cf6', 2),
  ('Financeiro & BI',           'Inteligencia financeira, relatorios, cobranca e compras',      '#10b981', 3),
  ('Operacoes & Logistica',     'Cadeia operacional, estoque, rastreabilidade e expedicao',     '#06b6d4', 4),
  ('P&D & Qualidade',           'Ciclo de vida de produtos, conformidade Anvisa e Q.A',         '#f59e0b', 5),
  ('RH & DP',                   'Recrutamento, folha, onboarding e desenvolvimento',            '#ec4899', 6),
  ('CX / CS & Pos-venda',       'Customer Success, suporte e retencao de clientes',             '#f97316', 7),
  ('Juridico & Compliance',     'Contratos, regulatorio Anvisa e compliance',                   '#ef4444', 8),
  ('TI & Infraestrutura',       'Arquitetura de dados, integracoes, AIOX e capacitacao',        '#6366f1', 9),
  ('Novos Negocios & Internacional', 'Expansao internacional e novos mercados',                 '#14b8a6', 10),
  ('Assistencia Tecnica',       'Manutencao, reparo e gestao de equipamentos em campo',         '#a855f7', 11),
  ('Producao',                  'Montagem, PCP, controle de qualidade na fabrica',              '#64748b', 12),
  ('Eventos',                   'Feiras, congressos e eventos do setor',                        '#e11d48', 13)
ON CONFLICT (name) DO NOTHING;

-- 5. RLS
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sector_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sectors ENABLE ROW LEVEL SECURITY;

-- Sectors: todos autenticados podem ver
CREATE POLICY "Authenticated users can view sectors" ON public.sectors
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage sectors" ON public.sectors
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Sector Pages: todos autenticados podem ver
CREATE POLICY "Authenticated users can view sector_pages" ON public.sector_pages
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage sector_pages" ON public.sector_pages
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- User Sectors: ver os próprios + admin vê todos
CREATE POLICY "Users can view own sectors" ON public.user_sectors
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage user_sectors" ON public.user_sectors
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 6. Indexes
CREATE INDEX IF NOT EXISTS idx_user_sectors_user ON public.user_sectors(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sectors_sector ON public.user_sectors(sector_id);
CREATE INDEX IF NOT EXISTS idx_sector_pages_sector ON public.sector_pages(sector_id);
CREATE INDEX IF NOT EXISTS idx_sector_pages_route ON public.sector_pages(page_route);
