-- =============================================
-- CONTOURLINE PORTAL v2 - Tasks detalhadas
-- Cole no SQL Editor do Supabase > Run
-- =============================================

-- Tabela de tasks detalhadas
CREATE TABLE portal_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id TEXT NOT NULL,
  task_index INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'done', 'blocked')),
  assignee TEXT,
  deadline DATE,
  notes TEXT DEFAULT '',
  evidence_url TEXT DEFAULT '',
  block_reason TEXT DEFAULT '',
  updated_by UUID REFERENCES portal_users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(story_id, task_index)
);

-- RLS
ALTER TABLE portal_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all_tasks" ON portal_tasks FOR ALL USING (true) WITH CHECK (true);

-- Índice
CREATE INDEX idx_tasks_story ON portal_tasks(story_id);
CREATE INDEX idx_tasks_assignee ON portal_tasks(assignee);
CREATE INDEX idx_tasks_status ON portal_tasks(status);
