-- ============================================================
-- CONTOURLINE — Mapa de Clientes
-- Rodar no Supabase: Dashboard → SQL Editor → New query
-- ============================================================

-- Tabela principal de clientes
CREATE TABLE IF NOT EXISTS public.clientes_mapa (
    id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    nome        TEXT        NOT NULL,
    cep         TEXT,
    cidade      TEXT,
    estado      CHAR(2),
    regiao      TEXT,
    lat         NUMERIC(10, 7),
    lon         NUMERIC(10, 7),
    telefone    TEXT,
    email       TEXT,
    geocoded    BOOLEAN     DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Cache de CEPs geocodificados (evita re-geocodificar)
CREATE TABLE IF NOT EXISTS public.cep_cache (
    cep         CHAR(8)     PRIMARY KEY,
    cidade      TEXT,
    estado      CHAR(2),
    regiao      TEXT,
    lat         NUMERIC(10, 7),
    lon         NUMERIC(10, 7),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para filtros rápidos
CREATE INDEX IF NOT EXISTS idx_clientes_estado  ON public.clientes_mapa (estado);
CREATE INDEX IF NOT EXISTS idx_clientes_regiao  ON public.clientes_mapa (regiao);
CREATE INDEX IF NOT EXISTS idx_clientes_cidade  ON public.clientes_mapa (cidade);
CREATE INDEX IF NOT EXISTS idx_clientes_geocoded ON public.clientes_mapa (geocoded);

-- RLS: habilita mas permite tudo para anon (ferramenta interna)
ALTER TABLE public.clientes_mapa  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cep_cache      ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_all_clientes" ON public.clientes_mapa;
DROP POLICY IF EXISTS "anon_all_cache"    ON public.cep_cache;

CREATE POLICY "anon_all_clientes" ON public.clientes_mapa
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_all_cache" ON public.cep_cache
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
