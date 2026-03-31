# BI Unificado — Cruzamentos Sales x RD Station

> **Empresa:** Contourline Equipamentos Medicos e Diagnosticos
> **Data:** 2026-03-29
> **Status:** Planejado — aguardando importacao do RD Station no Supabase
> **Supabase:** lyifnttxpoypwibbffnv

---

## Bases de Dados

| Base | Tabela Supabase | Volume | Origem |
|------|----------------|--------|--------|
| **Sales BI** | `sales_orders` | 2.420 vendas fechadas (2019-2026) | Planilha "Controle de Entregas" |
| **Sales BI** | `sales_sellers` | 75 vendedores | Planilha |
| **Sales BI** | `sales_products` | 100 produtos | Planilha |
| **RD Station** | `rd_station_deals` (a criar) | 2.800 negociacoes | Backup JSON do RD Station CRM |

### Chave de cruzamento principal: **nome do cliente**

Ambas as bases possuem o nome do cliente. Para cruzamentos mais precisos, pode-se usar CPF/CNPJ (Sales) x email/telefone (RD Station) com tabela auxiliar de de-para.

---

## 8 Cruzamentos Estrategicos

### 1. Lead-to-Sale (Funil Completo)

**Pergunta:** Quantos leads do RD Station viraram venda real? Qual o tempo medio entre o primeiro contato e a venda?

**Como cruzar:**
- `rd_station_deals.contacts[].name` → `sales_orders.client_name`
- Comparar `rd_station_deals.created_at` com `sales_orders.sale_date`

**Metricas resultantes:**
- Taxa de conversao lead → venda (%)
- Tempo medio lead → venda (dias)
- Leads no RD que nunca converteram (oportunidade perdida)
- Vendas na planilha que nao tem lead no RD (vendas offline/indicacao)

**Impacto:** Medir ROI real de marketing. Saber se o investimento em geracao de leads esta trazendo retorno.

---

### 2. Atribuicao de Campanha → Receita

**Pergunta:** Qual campanha de marketing gera mais receita real? Qual o custo de aquisicao por campanha?

**Como cruzar:**
- `rd_station_deals.campaign.name` → identificar o lead
- Cruzar com `sales_orders.sale_value` da venda correspondente

**Campanhas existentes no RD:**
- CONVERSAO - VISBODY S-30 (112 deals)
- CONVERSAO - VISBODY M-30 (98 deals)
- CONVERSAO - MULTISHAPE (70 deals)
- CONVERSAO - HIPRO (56 deals)
- CONVERSAO - SUPREME PRO (42 deals)
- CONVERSAO - NUERA TIGHT (28 deals)
- CONVERSAO - TRILIFT (28 deals)
- CONVERSAO - HIPRO MED (28 deals)
- CONVERSAO - UNYQUE PRO (28 deals)

**Metricas resultantes:**
- Receita gerada por campanha (R$)
- CAC por campanha (custo de ads / vendas da campanha)
- Campanha com melhor ROI
- Campanha com mais leads mas menos vendas (desperdicio)

**Impacto:** Otimizar verba de ads. Parar de gastar em campanhas que nao convertem.

---

### 3. Funil por Produto

**Pergunta:** Qual produto tem a melhor taxa de conversao? Qual tem o ciclo de venda mais longo?

**Como cruzar:**
- `rd_station_deals.deal_products[].name` → `sales_orders.product_name`
- Comparar volume no pipeline RD vs vendas reais

**Dados disponíveis:**

| Produto | Deals no RD | Vendas reais |
|---------|------------|--------------|
| HIPRO | 154 | 500+ |
| MULTISHAPE | 84 | ~100 |
| S30 (Visbody) | 112 | a cruzar |
| SUPREME PRO | 42 | a cruzar |
| UNYQUE PRO | 42 | a cruzar |

**Metricas resultantes:**
- Taxa de conversao por produto (deals → vendas)
- Ciclo medio de venda por produto (dias)
- Produto com maior taxa de abandono no funil
- Produto com maior ticket medio real vs estimado

**Impacto:** Priorizar estoque, marketing e treinamento do time comercial por produto.

---

### 4. Performance SDR vs Closer

**Pergunta:** Qual SDR gera leads que mais convertem em venda? Qual closer tem melhor aproveitamento?

**Como cruzar:**
- `rd_station_deals.user.name` (SDR que criou o deal) → lead
- `sales_orders.seller_name` (closer que fechou a venda)

**SDRs no RD Station:**
- Gleidsson Felix (1.666 deals)
- Paulo Nunes (840 deals)
- Representantes Contourline (98 deals)

**Closers na planilha:**
- Diana Carvalho (423 vendas)
- Egio (308 vendas)
- Brandina Vidal (239 vendas)
- Glaucia Moura (188 vendas)
- Bruna Campos (181 vendas)

**Metricas resultantes:**
- Leads do Gleidsson → quantos Diana fechou? E Brandina?
- Taxa de conversao por par SDR/Closer
- SDR cujos leads tem maior ticket medio
- Closer com melhor taxa de aproveitamento

**Impacto:** Coaching direcionado, comissionamento justo, redistribuicao de leads.

---

### 5. Deals Perdidos vs Vendas Reais

**Pergunta:** Leads que o RD marcou como "perdido" ou "estagnado" compraram por outro canal? Ha oportunidade de reativar?

**Como cruzar:**
- `rd_station_deals` com `win = false` (84 perdidos) ou estagnados em "Sondagem" (2.450)
- Verificar se o nome aparece em `sales_orders` com status confirmada

**Dados:**
- 84 deals marcados como perdidos no RD
- 2.716 deals abertos/estagnados (nunca avancaram)
- 2.420 vendas confirmadas na planilha

**Metricas resultantes:**
- Leads "perdidos" no RD que compraram mesmo assim (venda offline/indicacao)
- Volume de leads estagnados que nunca foram reativados
- Leads com potencial de reativacao (abertos ha mais de 90 dias sem atividade)
- Razoes de perda (se documentadas no RD)

**Impacto:** Recuperar leads "mortos". Identificar falhas no processo de follow-up.

---

### 6. Geografico + Fonte de Captacao

**Pergunta:** Qual canal de marketing funciona melhor por regiao? SP vem mais de Google ou Instagram?

**Como cruzar:**
- `rd_station_deals.deal_source.name` (Inbound, Google, Instagram, etc.)
- `sales_orders.city` + `sales_orders.state`
- Cruzar via nome do cliente

**Fontes no RD:**
- Inbound (126 deals)
- Social/Instagram (56 deals)
- Busca Paga/Google (42 deals)
- Outbound (28 deals)
- Indicacao (14 deals)

**Top estados nas vendas:**
- SP (524), MG (427), PR (207), SC (124), RJ (117)

**Metricas resultantes:**
- Mapa de calor: fonte de captacao x estado
- Canal mais eficiente por regiao (custo vs receita)
- Regioes com muitos leads mas poucas vendas (problema de cobertura comercial?)
- Regioes sem presenca digital que vendem via indicacao

**Impacto:** Segmentar campanhas por regiao. Investir Google Ads em SP e Instagram em MG (por exemplo).

---

### 7. Ticket Medio Real vs Estimado

**Pergunta:** Os SDRs estao estimando corretamente o valor dos deals? Ha upsell no fechamento?

**Como cruzar:**
- `rd_station_deals.amount_total` (valor estimado pelo SDR)
- `sales_orders.sale_value` (valor real da venda)
- Cruzar via nome do cliente

**Faixas de valor no RD (616 deals com valor):**
- 50-100k: 56 deals
- 100-200k: 210 deals
- 200-400k: 196 deals
- 400k+: 154 deals

**Metricas resultantes:**
- Desvio medio entre valor estimado e valor real (%)
- Deals com upsell (real > estimado) — quantos e por quanto
- Deals com desconto (real < estimado) — quantos e por quanto
- Vendedor que mais da desconto vs que mais faz upsell
- Produto com maior desvio entre estimado e real

**Impacto:** Forecasting mais preciso. Treinamento de precificacao para SDRs.

---

### 8. Cliente Recorrente (Recompra)

**Pergunta:** Qual % da receita vem de recompra? Qual o ciclo medio de recompra?

**Como cruzar:**
- `sales_orders` agrupado por `client_name` — clientes com 2+ vendas
- `sales_orders.acquisition_source` = "Recorrente" vs "Novo"
- `rd_station_deals.contacts` para historico de interacoes

**Metricas resultantes:**
- % de receita de clientes recorrentes vs novos
- Ciclo medio de recompra (meses entre 1a e 2a compra)
- Produto mais comprado na recompra (upgrade? complemento?)
- Clientes com 1 compra ha mais de 12 meses (candidatos a reativacao)
- LTV medio por cliente

**Impacto:** Estrategia de retencao e CS. Automacoes de recompra. Programa de indicacao.

---

## Proximo Passo

**Importar os 2.800 deals do RD Station no Supabase** (tabela `rd_station_deals`) para viabilizar todos os cruzamentos acima.

### Prioridade sugerida de implementacao

| # | Cruzamento | Esforco | Impacto |
|---|-----------|---------|---------|
| 1 | Lead-to-Sale | Medio | Muito Alto |
| 2 | Atribuicao de Campanha | Medio | Muito Alto |
| 3 | Cliente Recorrente | Baixo | Alto |
| 4 | Ticket Real vs Estimado | Baixo | Alto |
| 5 | Funil por Produto | Medio | Alto |
| 6 | SDR vs Closer | Medio | Medio |
| 7 | Deals Perdidos | Baixo | Medio |
| 8 | Geografico + Fonte | Alto | Medio |

---

*Documento gerado em 2026-03-29 por AIOX Workspace Chief*
*Fonte: Sales BI (Supabase) + RD Station (backup JSON)*
