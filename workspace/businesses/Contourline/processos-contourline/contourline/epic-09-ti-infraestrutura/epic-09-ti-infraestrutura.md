# Epic 09 — TI & Infraestrutura

> **Status:** Draft
> **Owner:** @pm Morgan
> **Priority:** P1 🔴 (Enabler — todos os outros epics dependem deste)
> **Empresa:** Contourline Equipamentos Médicos e Diagnósticos
> **Criado por:** @analyst Atlas + @pm Morgan
> **Data:** 2026-03-27

---

## Contexto

O time de TI tem apenas 3 pessoas (Supervisor Rafael + Estagiario + 1) para suportar 130 colaboradores em regime 100% presencial. Thalison Samuel (Head de Growth Marketing) e o decisor principal para dados, IA e arquitetura tecnica. Rafael Henrique (Supervisor TI) lidera execucao e operacao. A AIOX esta instalada e em teste. Este e o epic **enabler** — sem infraestrutura robusta, nenhum outro epic consegue ser executado com qualidade.

## Contexto Estrategico

### Perfil da Empresa

- **Stage:** SCALE — empresa consolidada, R$115-120M/ano, buscando otimizacao via IA (Fonte: company/company-profile.yaml — stage.current_stage)
- **AI Maturity:** Iniciante — uso fragmentado, sem coordenacao entre areas (Fonte: company/company-profile.yaml — ai_maturity_level)
- **CEO Background:** Egio Roberto tem background de programacao. Empresa de tecnologia que fornece equipamentos medicos. (Fonte: tech/strategy.yaml — metadata.notes)

### Tech Priority 1

Implementar AIOX para coordenacao de IA entre areas. Este e o enabler de todas as squads. (Fonte: tech/strategy.yaml — tech_priorities.priority_1)

### Autonomy Level

Medium-high — CEO quer sistema que ele valida mas opera autonomamente. Nao quer micro-gerenciar, quer um sistema que funcione e ele supervise. (Fonte: ai/strategy.yaml — strategy_scope.autonomy_level)

### Posicao do CEO

> "Em Casa de Ferreiro, o espeto e de pau" — Egio Roberto, CEO, sobre uma empresa de tecnologia que nao automatiza internamente. (Fonte: brand/strategic-positioning.yaml — contourline_quotes.on_frustration)

### Risk Tolerance

Medio — cetico saudavel. "Parece bom demais para ser verdade." Quer resultado mas precisa ver prova antes de escalar. (Fonte: ai/strategy.yaml — strategy_scope.constraints.risk_tolerance)

### 4 Squads que Dependem da Infraestrutura

Todas as squads planejadas no AIOX dependem deste epic como fundacao:

1. **Marketing Squad** — 14 pessoas a otimizar com IA (Epic 02)
2. **Sales Squad** — SDR com IA (Epic 01)
3. **Finance Squad** — complementar Totvs (Epic 03)
4. **Compliance Squad** — Chat PDF upgrade (Epic 08)

(Fonte: ai/strategy.yaml — agent_topology.specialist_squads)

### Orquestracao

Padrao de orquestracao: AIOX com squads de agentes especializados. Regras de escalacao: CEO aprova decisoes estrategicas, Diretor Financeiro aprova gastos. (Fonte: ai/strategy.yaml — agent_topology)

### Constraints Tecnicas

- **ERP:** Totvs em uso, quer complementar com IA (nao substituir) (Fonte: tech/strategy.yaml)
- **Compliance:** Anvisa — regulacao obrigatoria em todas as comunicacoes (Fonte: tech/strategy.yaml)
- **Work Model:** 100% presencial — 130 pessoas (Fonte: company/company-profile.yaml)

---

## Setores Envolvidos

| Setor | Pessoas | Papel |
|-------|---------|-------|
| Supervisor TI (Rafael Henrique) | 1 | Liderança técnica, decisões de infraestrutura |
| Estagiário em T.I (João Emanuel) | 1 | Suporte e desenvolvimento |
| Thalison Samuel (Head de Growth Marketing) | - | Decisor principal: dados, IA, arquitetura tecnica |
| CEO Egio | - | Validacao estrategica de negocio (investimentos, visao geral) |

## Dores Mapeadas

| Dor | Urgência | Impacto |
|-----|---------|---------|
| Time TI minúsculo para empresa de R$115M | Crítica | Gargalo em todos os projetos |
| Sem arquitetura de dados centralizada | Alta | Cada setor com seus silos |
| AIOX instalada mas sem processo de adoção | Alta | Investimento sem retorno |
| Sem documentação técnica do ambiente atual | Alta | Risco operacional |
| Integrações entre sistemas inexistentes | Alta | Ilhas de dados em cada setor |

## Objetivo do Epic

Estabelecer a fundação tecnológica da Contourline: arquitetura de dados centralizada, integrações entre sistemas, processo de adoção da AIOX e capacitação do time — habilitando a execução de todos os outros epics.

## Critérios de Aceite do Epic

- [ ] Arquitetura técnica de dados da Contourline documentada
- [ ] Hub de integração entre sistemas (Totvs, RD Station, demais) operacional
- [ ] Processo de adoção e governança da AIOX definido
- [ ] Documentação técnica do ambiente atual completa
- [ ] Plano de capacitação do time de TI
- [ ] Roadmap técnico alinhado com os 9 outros epics

## Stories Previstas

| # | Story | Agente | Estimativa |
|---|-------|--------|-----------|
| 9.1 | Auditoria técnica completa do ambiente atual | @architect | M |
| 9.2 | Arquitetura de dados e integrações (design) | @architect | L |
| 9.3 | Hub de integração entre sistemas (implementação) | @dev | L |
| 9.4 | Processo de adoção e governança da AIOX | @pm + @architect | M |
| 9.5 | Documentação técnica do ambiente | @dev | M |
| 9.6 | Capacitação do time TI | @pm | S |
| 9.7 | Roadmap técnico de suporte aos 9 epics | @architect | M |
| 9.8 | QA Gate — validação de segurança e LGPD | @qa | M |

## Stack Sugerida

- AIOX (instalado, em teste — formalizar adoção)
- Totvs (ERP existente — APIs)
- RD Station (CRM existente — APIs)
- Hub de integração: a definir com @architect
- Infraestrutura cloud: a definir

## Escopo

### IN (dentro do epic)
- Arquitetura de dados centralizada
- Hub de integração entre sistemas (Totvs, RD Station, etc.)
- Processo de adoção e governança da AIOX
- Documentação técnica do ambiente
- Capacitação do time de TI
- Roadmap técnico de suporte aos demais epics

### OUT (fora do epic)
- Suporte ao usuário final / helpdesk (manter processo atual)
- Compra de hardware
- Desenvolvimento de features de produto (isso é cada epic)
- Gestão de projetos não-técnicos (isso é PMO geral)
- Migração/substituição do Totvs ou RD Station
- Decisões de negócio sobre quais epics priorizar (isso é @pm/@po)

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Time mínimo: 3 pessoas para 130 colaboradores | Alta | Crítico | Priorizar automação do próprio TI primeiro, contratar ou terceirizar se necessário |
| Decisoes tecnicas de dados/IA podem travar se Thalison nao estiver disponivel | Alta | Alto | Definir alcada: Rafael decide operacional, Thalison valida dados/IA/arquitetura, CEO valida investimentos estrategicos |
| APIs do Totvs e RD Station com limitações | Média | Alto | Auditoria técnica primeiro (Story 9.1), documentar limitações |
| LGPD compliance — dados de 130 pessoas | Média | Crítico | Story 9.8 como gate obrigatório, consultoria jurídica se necessário |
| Virar "epic coringa" — absorver tudo que ninguém sabe onde colocar | Alta | Alto | Respeitar IN/OUT rigorosamente, escalar para @pm se houver dúvida |
| Dependência circular: todos dependem do Epic 09, mas Epic 09 precisa de contexto dos outros | Média | Médio | Iniciar Stories 9.1 e 9.2 antes dos outros epics, rodar em paralelo depois |

## Dependências

- Este epic é **pré-requisito** para todos os outros (especialmente 01, 02, 03)
- Deve ser iniciado em paralelo com Epics 01, 02, 03

## Métricas de Sucesso

| Métrica | Baseline | Meta |
|---------|---------|------|
| Sistemas integrados | 0 | Todos os sistemas core |
| Documentação técnica | Inexistente | 100% do ambiente |
| Uptime dos sistemas | Desconhecido | > 99.5% |
| Adoção do AIOX | Em teste | 100% dos setores |

---

*Próximo passo: `@architect *design` para detalhar a arquitetura técnica*
