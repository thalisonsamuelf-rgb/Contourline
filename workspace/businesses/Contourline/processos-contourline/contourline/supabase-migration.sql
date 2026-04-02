-- =============================================
-- CONTOURLINE PORTAL - Migração Supabase
-- Cole este SQL no SQL Editor do Supabase
-- Dashboard > SQL Editor > New Query > Cole > Run
-- =============================================

-- 1. Tabela de usuários do portal
CREATE TABLE portal_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  pin TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de checkboxes (AC e Tasks)
CREATE TABLE portal_checks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES portal_users(id) ON DELETE CASCADE,
  story_id TEXT NOT NULL,
  check_type TEXT NOT NULL CHECK (check_type IN ('ac', 'task')),
  check_index INTEGER NOT NULL,
  checked BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, story_id, check_type, check_index)
);

-- 3. Tabela de notas/entrevistas
CREATE TABLE portal_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES portal_users(id) ON DELETE CASCADE,
  story_id TEXT NOT NULL,
  content TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, story_id)
);

-- 4. Inserir os 4 admins (PIN simples para login)
INSERT INTO portal_users (name, pin, is_admin) VALUES
  ('Thalison Samuel', '1234', TRUE),
  ('Ramon', '1234', TRUE),
  ('Rafael Henrique', '1234', TRUE),
  ('Egio Roberto', '1234', TRUE);

-- 5. Desabilitar RLS para acesso via anon key (controle feito no app)
ALTER TABLE portal_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_notes ENABLE ROW LEVEL SECURITY;

-- Políticas: anon key pode ler/escrever tudo (controle de permissão feito no frontend)
CREATE POLICY "anon_all_users" ON portal_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_checks" ON portal_checks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_notes" ON portal_notes FOR ALL USING (true) WITH CHECK (true);

-- 6. Índices
CREATE INDEX idx_checks_user_story ON portal_checks(user_id, story_id);
CREATE INDEX idx_notes_user_story ON portal_notes(user_id, story_id);
