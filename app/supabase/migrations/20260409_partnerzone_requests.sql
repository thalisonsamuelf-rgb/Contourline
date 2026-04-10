-- ============================================================================
-- PartnerZone — Requests (Solicitations & Complaints)
-- Migration: Create partnerzone_requests table with RLS and indexes
-- Date: 2026-04-09
-- ============================================================================

-- Partnerzone Requests table for solicitations and complaints
CREATE TABLE IF NOT EXISTS partnerzone_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  equipamento TEXT,
  assunto TEXT NOT NULL,
  descricao TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'solicitar' CHECK (type IN ('solicitar', 'reportar')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  admin_notes TEXT,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_requests_status ON partnerzone_requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_type ON partnerzone_requests(type);
CREATE INDEX IF NOT EXISTS idx_requests_created ON partnerzone_requests(created_at DESC);

-- ============================================================================
-- RLS Policies
-- ============================================================================

ALTER TABLE partnerzone_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public form)
CREATE POLICY "Anyone can create requests" ON partnerzone_requests
  FOR INSERT WITH CHECK (true);

-- Only admins/editors can read all
CREATE POLICY "Admins can read all requests" ON partnerzone_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partnerzone_user_profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Only admins can update
CREATE POLICY "Admins can update requests" ON partnerzone_requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM partnerzone_user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- Updated_at trigger (reuses existing function from initial migration)
-- ============================================================================

CREATE TRIGGER trg_requests_updated_at
  BEFORE UPDATE ON partnerzone_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
