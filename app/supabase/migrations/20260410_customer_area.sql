-- ============================================================================
-- PartnerZone — Customer Area
-- Migration: Customer profile, contracts, invoices and equipment
-- Date: 2026-04-10
-- ============================================================================

-- Customer profile (extends partnerzone_user_profiles)
CREATE TABLE IF NOT EXISTS partnerzone_customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  customer_code TEXT UNIQUE NOT NULL,
  razao_social TEXT,
  nome_fantasia TEXT,
  cnpj TEXT,
  cpf TEXT,
  telefone TEXT,
  whatsapp TEXT,
  endereco TEXT,
  cidade TEXT,
  estado TEXT,
  cep TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contracts
CREATE TABLE IF NOT EXISTS partnerzone_contracts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES partnerzone_customers(id) ON DELETE CASCADE,
  contract_number TEXT NOT NULL,
  contract_type TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'finished', 'cancelled', 'pending')),
  start_date DATE,
  end_date DATE,
  monthly_value NUMERIC(10,2),
  total_value NUMERIC(10,2),
  installments_total INTEGER,
  installments_paid INTEGER DEFAULT 0,
  contract_pdf_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Boletos / Invoices
CREATE TABLE IF NOT EXISTS partnerzone_invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES partnerzone_customers(id) ON DELETE CASCADE,
  contract_id UUID REFERENCES partnerzone_contracts(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL,
  description TEXT,
  amount NUMERIC(10,2) NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  boleto_url TEXT,
  barcode TEXT,
  pix_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Customer Equipment (which equipment the customer owns)
CREATE TABLE IF NOT EXISTS partnerzone_customer_equipment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES partnerzone_customers(id) ON DELETE CASCADE,
  equipment_name TEXT NOT NULL,
  equipment_category_id UUID REFERENCES partnerzone_categories(id) ON DELETE SET NULL,
  serial_number TEXT,
  purchase_date DATE,
  warranty_until DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'inactive')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_customers_user ON partnerzone_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_code ON partnerzone_customers(customer_code);
CREATE INDEX IF NOT EXISTS idx_contracts_customer ON partnerzone_contracts(customer_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON partnerzone_contracts(status);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON partnerzone_invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON partnerzone_invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due ON partnerzone_invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_equipment_customer ON partnerzone_customer_equipment(customer_id);

-- RLS
ALTER TABLE partnerzone_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerzone_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerzone_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerzone_customer_equipment ENABLE ROW LEVEL SECURITY;

-- Customers: users see only their own
CREATE POLICY "Users can view own customer data" ON partnerzone_customers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all customers" ON partnerzone_customers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Contracts: users see only their own
CREATE POLICY "Users can view own contracts" ON partnerzone_contracts
  FOR SELECT USING (
    customer_id IN (SELECT id FROM partnerzone_customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins manage contracts" ON partnerzone_contracts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Invoices: users see only their own
CREATE POLICY "Users can view own invoices" ON partnerzone_invoices
  FOR SELECT USING (
    customer_id IN (SELECT id FROM partnerzone_customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins manage invoices" ON partnerzone_invoices
  FOR ALL USING (
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Equipment: users see only their own
CREATE POLICY "Users can view own equipment" ON partnerzone_customer_equipment
  FOR SELECT USING (
    customer_id IN (SELECT id FROM partnerzone_customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins manage equipment" ON partnerzone_customer_equipment
  FOR ALL USING (
    EXISTS (SELECT 1 FROM partnerzone_user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Triggers for updated_at
CREATE TRIGGER trg_customers_updated_at BEFORE UPDATE ON partnerzone_customers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_contracts_updated_at BEFORE UPDATE ON partnerzone_contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_invoices_updated_at BEFORE UPDATE ON partnerzone_invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at();
