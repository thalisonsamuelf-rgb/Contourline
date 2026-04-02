-- ============================================================================
-- PartnerZone — Contourline Material Hub
-- Migration: Initial schema, RLS policies, indexes, and seed data
-- Date: 2026-03-20
-- ============================================================================

-- 1. Categories
CREATE TABLE partnerzone_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT, -- lucide-react icon name
  parent_id UUID REFERENCES partnerzone_categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Materials
CREATE TABLE partnerzone_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category_id UUID NOT NULL REFERENCES partnerzone_categories(id) ON DELETE RESTRICT,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL, -- mime type
  thumbnail_path TEXT,
  tags TEXT[] DEFAULT '{}',
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Material Versions (history)
CREATE TABLE partnerzone_material_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  material_id UUID NOT NULL REFERENCES partnerzone_materials(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  change_note TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Favorites
CREATE TABLE partnerzone_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES partnerzone_materials(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, material_id)
);

-- 5. Download Tracking
CREATE TABLE partnerzone_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  material_id UUID NOT NULL REFERENCES partnerzone_materials(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. User Profiles
CREATE TABLE partnerzone_user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  department TEXT, -- marketing, vendas, clinical, admin, operacoes
  role TEXT DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- Full-text search vector
-- ============================================================================
ALTER TABLE partnerzone_materials ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('portuguese', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('portuguese', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('portuguese', coalesce(array_to_string(tags, ' '), '')), 'C')
  ) STORED;

-- ============================================================================
-- Indexes
-- ============================================================================
CREATE INDEX idx_materials_category ON partnerzone_materials(category_id);
CREATE INDEX idx_materials_active ON partnerzone_materials(is_active) WHERE is_active = true;
CREATE INDEX idx_materials_tags ON partnerzone_materials USING GIN(tags);
CREATE INDEX idx_materials_search ON partnerzone_materials USING GIN(search_vector);
CREATE INDEX idx_materials_created ON partnerzone_materials(created_at DESC);
CREATE INDEX idx_materials_downloads ON partnerzone_materials(download_count DESC);

CREATE INDEX idx_favorites_user ON partnerzone_favorites(user_id);
CREATE INDEX idx_favorites_material ON partnerzone_favorites(material_id);

CREATE INDEX idx_downloads_material ON partnerzone_downloads(material_id);
CREATE INDEX idx_downloads_user ON partnerzone_downloads(user_id);
CREATE INDEX idx_downloads_created ON partnerzone_downloads(created_at DESC);

CREATE INDEX idx_categories_parent ON partnerzone_categories(parent_id);
CREATE INDEX idx_categories_slug ON partnerzone_categories(slug);

-- ============================================================================
-- RLS Policies
-- ============================================================================

ALTER TABLE partnerzone_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerzone_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerzone_material_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerzone_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerzone_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerzone_user_profiles ENABLE ROW LEVEL SECURITY;

-- Categories: all authenticated can read
CREATE POLICY "categories_select" ON partnerzone_categories
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "categories_admin_insert" ON partnerzone_categories
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "categories_admin_update" ON partnerzone_categories
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Materials: all authenticated can read active
CREATE POLICY "materials_select" ON partnerzone_materials
  FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "materials_admin_select_all" ON partnerzone_materials
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

CREATE POLICY "materials_editor_insert" ON partnerzone_materials
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

CREATE POLICY "materials_editor_update" ON partnerzone_materials
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Material Versions: same as materials
CREATE POLICY "versions_select" ON partnerzone_material_versions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "versions_editor_insert" ON partnerzone_material_versions
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Favorites: users manage their own
CREATE POLICY "favorites_select_own" ON partnerzone_favorites
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "favorites_insert_own" ON partnerzone_favorites
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "favorites_delete_own" ON partnerzone_favorites
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Downloads: users can insert their own, admins can read all
CREATE POLICY "downloads_insert_own" ON partnerzone_downloads
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "downloads_select_admin" ON partnerzone_downloads
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- User Profiles: users read own, admins read all
CREATE POLICY "profiles_select_own" ON partnerzone_user_profiles
  FOR SELECT TO authenticated
  USING (
    id = auth.uid() OR
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "profiles_update_own" ON partnerzone_user_profiles
  FOR UPDATE TO authenticated USING (id = auth.uid());

CREATE POLICY "profiles_admin_update" ON partnerzone_user_profiles
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "profiles_insert_own" ON partnerzone_user_profiles
  FOR INSERT TO authenticated WITH CHECK (id = auth.uid());

-- ============================================================================
-- Updated_at triggers
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_categories_updated_at
  BEFORE UPDATE ON partnerzone_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_materials_updated_at
  BEFORE UPDATE ON partnerzone_materials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON partnerzone_user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- Seed: Default Categories
-- ============================================================================
INSERT INTO partnerzone_categories (name, slug, description, icon, sort_order) VALUES
  ('Institucional', 'institucional', 'Materiais institucionais da Contourline', 'Building2', 1),
  ('Marketing', 'marketing', 'Materiais de marketing e comunicação', 'Megaphone', 2),
  ('Vendas', 'vendas', 'Materiais comerciais e de vendas', 'TrendingUp', 3),
  ('Treinamento', 'treinamento', 'Materiais de treinamento e capacitação', 'GraduationCap', 4);

-- Subcategories
INSERT INTO partnerzone_categories (name, slug, description, icon, parent_id, sort_order)
SELECT sub.name, sub.slug, sub.description, sub.icon, p.id, sub.sort_order
FROM (VALUES
  -- Institucional
  ('Logo & Marca', 'logo-marca', 'Logotipos, variações e guidelines de marca', 'Palette', 'institucional', 1),
  ('Manual de Marca', 'manual-marca', 'Brandbook e diretrizes visuais', 'BookOpen', 'institucional', 2),
  ('Apresentações', 'apresentacoes-inst', 'Apresentações institucionais e corporativas', 'Presentation', 'institucional', 3),
  ('Vídeos Institucionais', 'videos-institucionais', 'Vídeos corporativos e institucionais', 'Video', 'institucional', 4),
  -- Marketing
  ('Templates Social Media', 'templates-social', 'Templates para redes sociais', 'Share2', 'marketing', 1),
  ('Catálogos', 'catalogos', 'Catálogos de produtos e serviços', 'FileText', 'marketing', 2),
  ('Materiais para Eventos', 'materiais-eventos', 'Banners, backdrops, materiais de evento', 'Calendar', 'marketing', 3),
  ('Fotos & Vídeos de Produto', 'fotos-videos-produto', 'Banco de imagens e vídeos dos produtos', 'Camera', 'marketing', 4),
  -- Vendas
  ('Propostas Comerciais', 'propostas-comerciais', 'Templates de propostas e orçamentos', 'FileCheck', 'vendas', 1),
  ('Tabelas de Preço', 'tabelas-preco', 'Tabelas de preço atualizadas', 'Table', 'vendas', 2),
  ('Cases de Sucesso', 'cases-sucesso', 'Histórias de sucesso e depoimentos', 'Award', 'vendas', 3),
  ('Scripts & Argumentários', 'scripts-argumentarios', 'Scripts de vendas e argumentários', 'MessageSquare', 'vendas', 4),
  -- Treinamento
  ('Onboarding', 'onboarding', 'Materiais de integração para novos colaboradores', 'UserPlus', 'treinamento', 1),
  ('Produto & Técnico', 'produto-tecnico', 'Treinamentos técnicos e de produto', 'Wrench', 'treinamento', 2),
  ('Compliance Anvisa', 'compliance-anvisa', 'Materiais regulatórios e de conformidade', 'Shield', 'treinamento', 3)
) AS sub(name, slug, description, icon, parent_slug, sort_order)
JOIN partnerzone_categories p ON p.slug = sub.parent_slug;

-- ============================================================================
-- Supabase Storage Buckets (run via Supabase Dashboard or API)
-- ============================================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES
--   ('partnerzone', 'partnerzone', false);
--
-- CREATE POLICY "partnerzone_read" ON storage.objects
--   FOR SELECT TO authenticated
--   USING (bucket_id = 'partnerzone');
--
-- CREATE POLICY "partnerzone_upload" ON storage.objects
--   FOR INSERT TO authenticated
--   WITH CHECK (
--     bucket_id = 'partnerzone' AND
--     EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
--   );
