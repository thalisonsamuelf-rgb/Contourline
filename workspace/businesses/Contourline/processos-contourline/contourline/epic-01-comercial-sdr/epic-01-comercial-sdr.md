# Epic 01 — Comercial & SDR

> **Status:** Draft
> **Owner:** @pm Morgan
> **Priority:** P1 🔴
> **Empresa:** Contourline Equipamentos Médicos e Diagnósticos
> **Criado por:** @analyst Atlas + @pm Morgan
> **Data:** 2026-03-27

---

## Contexto

O time comercial da Contourline tem 23 pessoas distribuídas em 5 camadas (Diretor, Gerentes, Field Sales, Inside Sales, SDR). O principal gargalo é o tratamento manual de leads e a tentativa frustrada de implementar SDR com IA — o CEO declarou que está "apanhando ainda". O handoff entre Marketing → SDR → Inside Sales → Field Sales é o processo mais lento da empresa.

## Contexto Estrategico

### ICP — Perfil do Cliente Ideal

O cliente da Contourline e um profissional de medicina estetica, faixa etaria 35-55 anos, com consultorio ou clinica propria, alta renda, modelo B2B de alto ticket. Busca equipamentos certificados Anvisa como diferencial competitivo e tem preocupacao central com conformidade regulatoria. (Fonte: company/icp.yaml)

### Use Case Estrategico de IA

**SDR com IA** — Leads qualificados tratados automaticamente. Estado atual: "Apanhando — tentou mas nao funciona." Estado desejado: SDR autonomo que qualifica e encaminha leads. Metrica de sucesso: leads qualificados tratados automaticamente. (Fonte: ai/strategy.yaml — use_cases.priority_2)

### Posicao do CEO

> "Apanhando ainda" — Egio Roberto, CEO, sobre a tentativa atual de SDR com IA. (Fonte: company/company-profile.yaml — stage.key_pains.pain_5)

O CEO tem background de programacao e visao clara de onde IA agrega valor. A meta e escalar atendimento de leads sem aumentar headcount. (Fonte: ai/strategy.yaml)

### Diferenciacao vs Concorrentes

- **vs Importadores genericos:** Contourline tem foco exclusivo em medicina estetica com certificacao Anvisa completa (Fonte: brand/strategic-positioning.yaml)
- **vs Marcas internacionais:** Empresa brasileira, 130 funcionarios, suporte local, R$115-120M de faturamento (Fonte: brand/strategic-positioning.yaml)
- **vs Fornecedores sem certificacao:** Certificacao Anvisa e pre-requisito — barreira regulatoria significativa (Fonte: brand/strategic-positioning.yaml)

### Human-in-the-Loop

CEO para validacao estrategica. Diretor financeiro para aprovacao de gastos. (Fonte: ai/strategy.yaml — human_in_the_loop)

### Compliance

Todas as comunicacoes comerciais de equipamentos medicos devem seguir normas Anvisa. (Fonte: ai/strategy.yaml — constraints.compliance)

### Squad Planejada

Sales Squad (SDR com IA) — uma das 4 squads de agentes especializados planejadas na topologia AIOX. (Fonte: ai/strategy.yaml — agent_topology.specialist_squads)

---

## Setores Envolvidos

| Setor | Pessoas | Papel |
|-------|---------|-------|
| SDR | 2 | Qualificação inicial de leads |
| Inside Sales | 7 | Vendas remotas B2B |
| Field Sales | 10 | Vendas externas (SP, MG, PR, CO, RJ, NO) |
| Gerentes Comerciais | 3 | Gestão e forecasting |
| Diretor Comercial (Gabriel Carpelo) | 1 | Estratégia e metas |
| Head Comercial (Hermano Lanza) | 1 | Liderança comercial |
| Supervisora SDR (Brandina Vidal) | 1 | Supervisão SDR |
| Supervisora Inside Sales (Fabricia Resende) | 1 | Supervisão Inside Sales |
| Supervisora Sales Ops (Lorena Silva) | 1 | Supervisão Sales Ops |
| Sales Ops | - | Processos e dados comerciais |
| VIS Body / Time Clínico | - | Vertical de produto clínico |

## Dores Mapeadas

| Dor | Urgência | Impacto |
|-----|---------|---------|
| SDR com IA não funcional | Alta | Leads não qualificados chegando ao IS |
| Tratamento manual de leads | Alta | Perda de oportunidades por tempo de resposta |
| Handoff Marketing → Vendas lento | Alta | Leads esfriando antes do contato |
| Sem Sales Ops estruturado | Média | Forecasting impreciso |
| Field Sales sem visibilidade de pipeline | Média | Perda de coordenação regional |

## Objetivo do Epic

Estruturar e automatizar o funil comercial da Contourline com IA, desde a qualificação de leads (SDR) até o fechamento (Field + Inside Sales), reduzindo o tempo de resposta e aumentando a taxa de conversão sem aumentar headcount.

## Critérios de Aceite do Epic

- [ ] SDR com IA funcional — qualificação automática de leads do RD Station
- [ ] Fluxo de handoff SDR → Inside Sales documentado e automatizado
- [ ] Dashboard de pipeline por região (Field Sales) operacional
- [ ] Forecasting automatizado para gerentes e diretor
- [ ] Integração CRM (RD Station) como fonte única de verdade
- [ ] Playbook de vendas digitalizado e acessível ao time

## Stories Previstas

| # | Story | Agente | Estimativa |
|---|-------|--------|-----------|
| 1.1 | Mapeamento do funil comercial atual (as-is) | @analyst | S |
| 1.2 | Configuração e integração RD Station como hub central | @dev | M |
| 1.3 | SDR IA — qualificação automática de leads | @dev | L |
| 1.4 | Automação de handoff SDR → Inside Sales | @dev | M |
| 1.5 | Dashboard de pipeline por região (Field Sales) | @dev | M |
| 1.6 | Forecasting automatizado para liderança | @dev | M |
| 1.7 | Playbook digital de vendas | @analyst + @pm | S |
| 1.8 | QA Gate — validação e testes do funil completo | @qa | M |

## Stack Sugerida

- CRM: RD Station (existente)
- IA para SDR: integração via API (a definir com @architect)
- Dashboard: a definir (@architect)

## Escopo

### IN (dentro do epic)
- Qualificação automática de leads via IA (SDR)
- Automação do handoff SDR → Inside Sales → Field Sales
- Dashboard de pipeline por região
- Forecasting automatizado
- Integração com RD Station (CRM existente)
- Playbook digital de vendas

### OUT (fora do epic)
- Contratação de novos vendedores
- Mudança de CRM (RD Station permanece)
- Estratégia de geração de leads (isso é Epic 02 — Marketing)
- Pós-venda e CS (isso é Epic 07)
- Infraestrutura técnica de servidores (isso é Epic 09)

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| SDR com IA já falhou antes — resistência do time | Alta | Alto | Implementação incremental, piloto com 1 vendedor antes de escalar |
| API do RD Station com limitações de integração | Média | Alto | Auditoria técnica antes (Story 1.2), plano B com webhooks |
| Adoção baixa pelo time comercial | Média | Alto | Treinamento hands-on, playbook digital (Story 1.7) |
| Dados de leads desatualizados/sujos | Média | Médio | Limpeza de base antes de ativar IA (pré-requisito Story 1.3) |
| Dependência do Epic 09 (TI) atrasar | Média | Alto | Iniciar stories independentes (1.1, 1.7) em paralelo |

## Dependências

- Epic 02 (Marketing) — fonte dos leads
- Epic 09 (TI) — infraestrutura de integração

## Métricas de Sucesso

| Métrica | Baseline | Meta |
|---------|---------|------|
| Tempo de resposta ao lead | Manual / lento | < 5 min (IA) |
| Taxa de qualificação SDR | Baixa | +40% |
| Leads convertidos / mês | Atual | +25% sem headcount |
| Forecasting accuracy | Baixa | > 80% |

---

*Próximo passo: `@sm *draft` para criar as stories detalhadas deste epic*
