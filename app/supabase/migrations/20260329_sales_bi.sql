-- ============================================================================
-- Sales BI — Contourline Historico de Vendas
-- Migration: Schema + indexes + RLS
-- Date: 2026-03-29
-- Source: Planilha "Controle de Entregas" (2019-2026)
-- ============================================================================

-- 1. Vendedores
CREATE TABLE IF NOT EXISTS sales_sellers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  role_type TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Produtos (catalogo de referencia)
CREATE TABLE IF NOT EXISTS sales_products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  brand TEXT,
  category TEXT,
  unit_price NUMERIC(12,2),
  anvisa_code TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Pedidos de Venda (tabela principal)
CREATE TABLE IF NOT EXISTS sales_orders (
  id SERIAL PRIMARY KEY,
  year INTEGER NOT NULL,
  order_number TEXT,
  sale_date DATE,
  invoice_number TEXT,
  invoice_date DATE,
  month TEXT,
  client_name TEXT,
  client_document TEXT,
  profession TEXT,
  seller_id INTEGER REFERENCES sales_sellers(id),
  seller_name TEXT,
  status TEXT,
  product_name TEXT,
  product_id INTEGER REFERENCES sales_products(id),
  product_line TEXT,
  is_medical BOOLEAN,
  simulator_value NUMERIC(12,2),
  sale_value NUMERIC(12,2),
  quantity INTEGER DEFAULT 1,
  acquisition_source TEXT,
  city TEXT,
  state TEXT,
  serial_number TEXT,
  consultant TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- Indexes
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_sales_orders_year ON sales_orders(year);
CREATE INDEX IF NOT EXISTS idx_sales_orders_date ON sales_orders(sale_date);
CREATE INDEX IF NOT EXISTS idx_sales_orders_product ON sales_orders(product_name);
CREATE INDEX IF NOT EXISTS idx_sales_orders_seller ON sales_orders(seller_name);
CREATE INDEX IF NOT EXISTS idx_sales_orders_state ON sales_orders(state);
CREATE INDEX IF NOT EXISTS idx_sales_orders_month ON sales_orders(month);
CREATE INDEX IF NOT EXISTS idx_sales_orders_line ON sales_orders(product_line);
CREATE INDEX IF NOT EXISTS idx_sales_orders_source ON sales_orders(acquisition_source);

-- ============================================================================
-- RLS
-- ============================================================================
ALTER TABLE sales_sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_orders ENABLE ROW LEVEL SECURITY;

-- Authenticated can read all
CREATE POLICY "sales_sellers_select" ON sales_sellers FOR SELECT TO authenticated USING (true);
CREATE POLICY "sales_products_select" ON sales_products FOR SELECT TO authenticated USING (true);
CREATE POLICY "sales_orders_select" ON sales_orders FOR SELECT TO authenticated USING (true);

-- Service role can do everything (implicit via bypass RLS)
