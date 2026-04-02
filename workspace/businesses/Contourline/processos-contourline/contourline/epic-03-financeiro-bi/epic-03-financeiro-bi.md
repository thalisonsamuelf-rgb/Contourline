# Epic 03 — Financeiro & BI

> **Status:** Draft
> **Owner:** @pm Morgan
> **Priority:** P1 🔴
> **Empresa:** Contourline Equipamentos Médicos e Diagnósticos
> **Criado por:** @analyst Atlas + @pm Morgan
> **Data:** 2026-03-27

---

## Contexto

O financeiro opera com Totvs (ERP) como sistema central, mas o CEO quer algo mais personalizado e com IA integrada. A folha mensal de R$700-800k é o maior custo da empresa, com meta de redução de 30% via automação. O CFO Claudio Kaizer lidera essa área. Subáreas incluem Contábil, Tesouraria, Contas a Pagar/Receber, Cobrança, Fiscal e Compras.

## Contexto Estrategico

### Lideranca — Correcao de Papel

Claudio Kaizer e **CFO / Diretor Financeiro** da Contourline. Participa da imersao estrategica no lugar do CEO Egio Roberto junto com Thalison.

### Use Case Estrategico de IA

**Gestao Financeira com IA** — Totvs + IA personalizada para insights e automacao. Estado atual: Totvs funcional mas limitado. Estado desejado: Totvs complementado por IA personalizada com relatorios automaticos e previsibilidade. Metrica de sucesso: relatorios automaticos, previsibilidade. Owner: Diretor Financeiro. (Fonte: ai/strategy.yaml — use_cases.priority_3)

### Squad Planejada

Finance Squad — uma das 4 squads de agentes especializados planejadas para complementar o Totvs com IA. (Fonte: ai/strategy.yaml — agent_topology.specialist_squads)

### KPIs Estrategicos

- **Payroll as % of Revenue:** Atual ~8% (R$700-800k/mes sobre ~R$10M/mes). Meta: ~5.5% (reducao de 30%). (Fonte: operations/kpi-scorecards.yaml — operational_metrics.payroll_efficiency)
- **Economia projetada:** R$210.000-240.000/mes com reducao de 30% da folha. (Fonte: company/company-profile.yaml — key_metrics.potential_savings)

### Posicao do CEO

> "Se reduzir 30% da folha, ja vale" — Egio Roberto, CEO. (Fonte: brand/strategic-positioning.yaml — egio_roberto_quotes.on_goal)

### Human-in-the-Loop

CFO (Claudio Kaizer) para aprovacao de pagamentos. CEO para validacao estrategica. (Fonte: ai/strategy.yaml — human_in_the_loop)

### Tech Priority

Priority 2 do roadmap tecnico: Integrar IA com Totvs para gestao financeira avancada. (Fonte: tech/strategy.yaml — tech_priorities.priority_2)

### Dados Financeiros da Empresa

- Faturamento anual: R$115-120M (Fonte: company/company-profile.yaml)
- Folha mensal: R$700.000-800.000 (Fonte: company/company-profile.yaml)
- Meta de reducao da folha: 30% (Fonte: company/company-profile.yaml)

---

## Setores Envolvidos

| Setor | Papel |
|-------|-------|
| CFO / Diretor Financeiro (Claudio Kaizer) | Liderança, validação de investimentos |
| Coordenadora Financeira (Ana Paula) | Coordenação das operações financeiras |
| Contábil (Thais Fernanda) | Escrituração, relatórios contábeis |
| Tesouraria (Isabella Araujo) | Fluxo de caixa, investimentos |
| Contas a Pagar | Fornecedores, obrigações |
| Contas a Receber (Polimara) | Clientes, cobrança |
| Cobrança (Eduarda Cristina) | Inadimplência, régua de cobrança |
| Fiscal (Isabella Augusta, Janice Cristina) | Obrigações fiscais, compliance tributário |
| Compras (Graciele Silva) | Aquisições, fornecedores |

## Dores Mapeadas

| Dor | Urgência | Impacto |
|-----|---------|---------|
| Totvs limitado — sem personalização com IA | Alta | Decisões financeiras sem inteligência |
| Gestão de folha R$700-800k sem automação | Alta | Meta: reduzir 30% = R$210-240k/mês |
| Relatórios financeiros manuais e lentos | Alta | Liderança sem visibilidade em tempo real |
| Compras sem automação de cotação | Média | Ineficiência em aquisições |
| Cobrança manual de inadimplentes | Média | Perda de caixa por lentidão |

## Objetivo do Epic

Criar uma camada de inteligência financeira sobre o Totvs existente, automatizando relatórios, gestão de folha, cobrança e compras com IA — entregando visibilidade em tempo real para a liderança e reduzindo custo operacional.

## Critérios de Aceite do Epic

- [ ] Dashboard financeiro em tempo real integrado ao Totvs
- [ ] Automação de relatórios mensais (DRE, fluxo de caixa, balanço)
- [ ] Régua de cobrança automatizada para inadimplentes
- [ ] Sistema de cotação e compras com IA
- [ ] Análise de folha com sugestões de otimização
- [ ] Alertas automáticos para CFO em desvios de budget

## Stories Previstas

| # | Story | Agente | Estimativa |
|---|-------|--------|-----------|
| 3.1 | Auditoria do Totvs — mapeamento de dados disponíveis via API | @analyst + @data-engineer | M |
| 3.2 | Dashboard financeiro em tempo real | @dev | L |
| 3.3 | Automação de relatórios contábeis e fiscais | @dev | M |
| 3.4 | Régua de cobrança inteligente com IA | @dev | M |
| 3.5 | Sistema de cotação e compras automatizado | @dev | M |
| 3.6 | Análise de folha e projeção de economia | @data-engineer | M |
| 3.7 | Integração Totvs → BI central da empresa | @data-engineer | L |
| 3.8 | QA Gate — validação financeira e segurança de dados | @qa | M |

## Stack Sugerida

- ERP: Totvs (existente — via API ou integração)
- BI: a definir com @architect
- Automação de cobrança: a definir
- Análise de folha: a definir com @data-engineer

## Escopo

### IN (dentro do epic)
- Camada de BI sobre o Totvs (dashboard, relatórios, alertas)
- Automação de relatórios contábeis e fiscais
- Régua de cobrança inteligente
- Sistema de cotação e compras com IA
- Análise de folha com sugestões de otimização
- Integração Totvs → BI central

### OUT (fora do epic)
- Substituição do Totvs (o ERP permanece, IA é camada sobre ele)
- Mudança de sistema contábil ou fiscal
- Decisões de demissão/contratação (IA sugere, humano decide)
- Gestão de RH e DP (isso é Epic 06)
- Compliance regulatório Anvisa (isso é Epic 08)
- Renegociação de contratos com fornecedores

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| API do Totvs limitada ou inexistente | Alta | Crítico | Auditoria técnica primeiro (Story 3.1), plano B com exportação de dados |
| Segurança de dados financeiros | Média | Crítico | Criptografia, controle de acesso, validação com @qa (Story 3.8) |
| Ambiguidade "substituir vs complementar Totvs" | Alta | Alto | **Definido: NÃO substituir.** IA é camada SOBRE o Totvs |
| Resistência do CFO a mudar processos | Média | Alto | Envolver Claudio desde a Story 3.1, mostrar ganhos rápidos |
| Compliance tributário — relatórios gerados por IA | Média | Alto | Validação obrigatória pelo Fiscal antes de entrega oficial |
| Dados financeiros inconsistentes entre sistemas | Média | Alto | Reconciliação automática com alertas de divergência |

## Dependências

- Epic 09 (TI) — infraestrutura e APIs
- Epic 06 (RH & DP) — dados de folha

## Métricas de Sucesso

| Métrica | Baseline | Meta |
|---------|---------|------|
| Tempo de fechamento mensal | Atual (dias) | < 1 dia |
| Redução de folha via automação | R$700-800k | -30% = R$210-240k/mês |
| Taxa de recuperação de inadimplência | Atual | +25% |
| Tempo de geração de relatórios | Manual | Automático / tempo real |

---

*Próximo passo: `@sm *draft` para criar as stories detalhadas deste epic*
