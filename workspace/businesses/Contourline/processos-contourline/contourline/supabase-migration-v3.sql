-- =============================================
-- CONTOURLINE PORTAL v3 - Storage para evidências
-- Cole no SQL Editor do Supabase > Run
-- =============================================

-- Criar bucket para arquivos de evidência
INSERT INTO storage.buckets (id, name, public)
VALUES ('evidencias', 'evidencias', true)
ON CONFLICT (id) DO NOTHING;

-- Permitir upload via anon key
CREATE POLICY "anon_upload_evidencias" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'evidencias');

-- Permitir leitura pública
CREATE POLICY "public_read_evidencias" ON storage.objects
  FOR SELECT USING (bucket_id = 'evidencias');

-- Permitir delete
CREATE POLICY "anon_delete_evidencias" ON storage.objects
  FOR DELETE USING (bucket_id = 'evidencias');

-- Alterar tabela portal_tasks para suportar múltiplos arquivos
ALTER TABLE portal_tasks ADD COLUMN IF NOT EXISTS evidence_files JSONB DEFAULT '[]';
