-- Supabase Schema Template — Based on Pedro's gestao-projeto
-- Source: /docs/workspace-migrations/pedro-reference/GESTAO-PROJETO-SUPABASE-MAP.md
-- Purpose: Reusable schema structure for domains following Pedro's patterns

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- ENUM TYPES (Status values)
-- ============================================================================

CREATE TYPE project_status_enum AS ENUM (
  'planning',      -- Equivalent to: BACKLOG, PESQUISA
  'active',        -- Equivalent to: PRODUCAO, REVISAO
  'completed',     -- Equivalent to: PRODUTO ATIVO
  'archived'       -- Equivalent to: MODELO
);

CREATE TYPE task_status_enum AS ENUM (
  'open',
  'in_progress',
  'blocked',
  'completed',
  'cancelled'
);

-- ============================================================================
-- PROJECTS TABLE (Main entity)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.projects (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- ClickUp Integration
  clickup_task_id TEXT UNIQUE NOT NULL,
  clickup_list_id TEXT NOT NULL,
  clickup_folder_id TEXT,

  -- Identification (From Pedro's custom fields)
  ttcx_id TEXT UNIQUE,
  abbreviation TEXT,
  project_number INTEGER,

  -- Basic Info
  name TEXT NOT NULL,
  description TEXT,

  -- Status & Workflow
  status project_status_enum DEFAULT 'planning',
  clickup_status TEXT,  -- Raw status from ClickUp for mapping

  -- Dates (D1-D11 Timeline)
  start_date DATE,
  kickoff_date DATE,    -- D2 (From "Kick-off Call")
  delivery_date DATE,   -- D11 (From "Data de Entrega")

  -- Financial (From Pedro's custom fields)
  revenue DECIMAL(15, 2),
  currency VARCHAR(3) DEFAULT 'BRL',  -- BRL/USD

  -- Relationships
  client_id UUID,       -- Links to Clientes (00 Gestao de Clientes)
  account_manager_id UUID,  -- Account field (AM)
  strategist_id UUID,   -- Estrategista

  -- Omie Integration
  omie_project_id TEXT,

  -- Document URLs (From Pedro's custom fields)
  drive_url TEXT,
  spreadsheet_url TEXT,
  briefing_attachment_url TEXT,
  market_research_url TEXT,
  icp_url TEXT,
  expert_dna_url TEXT,
  product_map_url TEXT,
  tendencies_url TEXT,

  -- RFC-012 Sync (Bidirectional sync infrastructure)
  sync_source TEXT DEFAULT 'supabase',
  sync_hash TEXT,
  sync_metadata JSONB DEFAULT '{}',
  clickup_last_sync TIMESTAMPTZ,
  supabase_last_sync TIMESTAMPTZ DEFAULT NOW(),

  -- Automation Flags (From Pedro's custom fields)
  automation_enabled BOOLEAN DEFAULT FALSE,
  generate_products BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PROJECT_TASKS TABLE (Tasks within projects)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.project_tasks (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,

  -- ClickUp Integration
  clickup_task_id TEXT UNIQUE NOT NULL,
  clickup_list_id TEXT NOT NULL,

  -- Task Info
  title TEXT NOT NULL,
  description TEXT,

  -- Assignment
  assignee TEXT,
  assignee_id UUID,

  -- Status & Priority
  status task_status_enum DEFAULT 'open',
  priority INTEGER DEFAULT 3,  -- 1=High, 3=Normal, 5=Low

  -- Estimation (Story Points, Time)
  points INTEGER DEFAULT 0,
  time_estimate_hours DECIMAL(5, 2),
  time_spent_hours DECIMAL(5, 2) DEFAULT 0,

  -- Dates
  due_date DATE,
  start_date DATE,

  -- Links
  clickup_url TEXT,

  -- RFC-012 Sync
  sync_source TEXT DEFAULT 'supabase',
  sync_hash TEXT,
  sync_metadata JSONB DEFAULT '{}',
  clickup_last_sync TIMESTAMPTZ,
  supabase_last_sync TIMESTAMPTZ DEFAULT NOW(),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PROJECT_METRICS TABLE (Daily snapshots for burndown/tracking)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.project_metrics (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,

  -- Snapshot Date
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,

  -- Task Counts
  tasks_total INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  tasks_in_progress INTEGER DEFAULT 0,
  tasks_blocked INTEGER DEFAULT 0,

  -- Points
  points_total INTEGER DEFAULT 0,
  points_completed INTEGER DEFAULT 0,
  points_in_progress INTEGER DEFAULT 0,
  points_remaining INTEGER DEFAULT 0,

  -- Health Metrics
  velocity_daily DECIMAL(5, 2) DEFAULT 0,
  health_score DECIMAL(3, 2),  -- 0-1.0

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint: one snapshot per day per project
  UNIQUE (project_id, snapshot_date)
);

-- ============================================================================
-- SYNC INFRASTRUCTURE (RFC-012 Pattern)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.sync_outbox (
  -- For outbox pattern (event sourcing)
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  aggregate_id UUID NOT NULL,
  aggregate_type TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,

  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  INDEX idx_sync_outbox_processed (processed),
  INDEX idx_sync_outbox_aggregate (aggregate_type, aggregate_id)
);

CREATE TABLE IF NOT EXISTS public.sync_dead_letters (
  -- For failed sync messages
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  outbox_id UUID REFERENCES public.sync_outbox(id),
  original_payload JSONB NOT NULL,

  error_message TEXT,
  error_trace TEXT,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,

  last_retry_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  INDEX idx_dead_letters_resolved (resolved_at)
);

CREATE TABLE IF NOT EXISTS public.sync_events (
  -- Audit log of all sync operations
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  operation TEXT NOT NULL,  -- INSERT, UPDATE, DELETE, SYNC

  source TEXT NOT NULL,  -- 'clickup' or 'supabase'
  direction TEXT NOT NULL,  -- 'inbound' or 'outbound'

  data_before JSONB,
  data_after JSONB,

  sync_hash_before TEXT,
  sync_hash_after TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  INDEX idx_sync_events_entity (entity_type, entity_id),
  INDEX idx_sync_events_created (created_at)
);

CREATE TABLE IF NOT EXISTS public.sync_locks (
  -- Distributed locks for preventing duplicate processing
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  lock_key TEXT UNIQUE NOT NULL,
  holder_id TEXT NOT NULL,  -- Agent/process ID

  acquired_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,

  INDEX idx_sync_locks_expires (expires_at)
);

-- ============================================================================
-- INDEXES (For performance)
-- ============================================================================

-- Projects indexes
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_client_id ON public.projects(client_id);
CREATE INDEX idx_projects_account_manager_id ON public.projects(account_manager_id);
CREATE INDEX idx_projects_delivery_date ON public.projects(delivery_date);
CREATE INDEX idx_projects_clickup_task_id ON public.projects(clickup_task_id);
CREATE INDEX idx_projects_sync_source ON public.projects(sync_source);

-- Project tasks indexes
CREATE INDEX idx_project_tasks_project_id ON public.project_tasks(project_id);
CREATE INDEX idx_project_tasks_status ON public.project_tasks(status);
CREATE INDEX idx_project_tasks_assignee_id ON public.project_tasks(assignee_id);
CREATE INDEX idx_project_tasks_due_date ON public.project_tasks(due_date);
CREATE INDEX idx_project_tasks_clickup_task_id ON public.project_tasks(clickup_task_id);

-- Metrics indexes
CREATE INDEX idx_project_metrics_project_id ON public.project_metrics(project_id);
CREATE INDEX idx_project_metrics_snapshot_date ON public.project_metrics(snapshot_date);

-- ============================================================================
-- RLS POLICIES (Row Level Security)
-- ============================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_metrics ENABLE ROW LEVEL SECURITY;

-- Service role has full access
CREATE POLICY "Service role full access to projects"
  ON public.projects FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to project_tasks"
  ON public.project_tasks FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to project_metrics"
  ON public.project_metrics FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Authenticated users can read
CREATE POLICY "Authenticated users can read projects"
  ON public.projects FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read project tasks"
  ON public.project_tasks FOR SELECT TO authenticated
  USING (true);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Get active projects for a period
CREATE OR REPLACE FUNCTION get_active_projects()
RETURNS TABLE (
  id UUID,
  name TEXT,
  ttcx_id TEXT,
  status project_status_enum,
  kickoff_date DATE,
  delivery_date DATE,
  points_remaining INTEGER
) LANGUAGE SQL STABLE AS $$
  SELECT
    p.id,
    p.name,
    p.ttcx_id,
    p.status,
    p.kickoff_date,
    p.delivery_date,
    COALESCE(m.points_remaining, 0)
  FROM projects p
  LEFT JOIN LATERAL (
    SELECT SUM(CASE WHEN status != 'completed' THEN points ELSE 0 END) as points_remaining
    FROM project_tasks
    WHERE project_id = p.id
  ) m ON true
  WHERE p.status = 'active'
  ORDER BY p.delivery_date ASC;
$$;

-- Get project velocity (points per day)
CREATE OR REPLACE FUNCTION calculate_project_velocity(project_uuid UUID)
RETURNS DECIMAL LANGUAGE SQL STABLE AS $$
  SELECT AVG(velocity_daily)
  FROM project_metrics
  WHERE project_id = project_uuid
    AND snapshot_date >= CURRENT_DATE - INTERVAL '7 days';
$$;

-- Get projects with deadline approaching (< 7 days)
CREATE OR REPLACE FUNCTION get_projects_deadline_approaching()
RETURNS TABLE (
  id UUID,
  name TEXT,
  ttcx_id TEXT,
  delivery_date DATE,
  days_remaining INTEGER
) LANGUAGE SQL STABLE AS $$
  SELECT
    p.id,
    p.name,
    p.ttcx_id,
    p.delivery_date,
    (p.delivery_date - CURRENT_DATE)::INTEGER as days_remaining
  FROM projects p
  WHERE p.status = 'active'
    AND p.delivery_date <= CURRENT_DATE + INTERVAL '7 days'
  ORDER BY p.delivery_date ASC;
$$;

-- ============================================================================
-- TIMESTAMPS: Updated at trigger
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_project_tasks_updated_at
  BEFORE UPDATE ON public.project_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
