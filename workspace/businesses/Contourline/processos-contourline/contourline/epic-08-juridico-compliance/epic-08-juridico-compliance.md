# Epic 08 — Jurídico & Compliance

> **Status:** Draft
> **Owner:** @pm Morgan
> **Priority:** P3 🟢
> **Empresa:** Contourline Equipamentos Médicos e Diagnósticos
> **Criado por:** @analyst Atlas + @pm Morgan
> **Data:** 2026-03-27

---

## Contexto

A certificação Anvisa é a maior barreira competitiva da Contourline e também seu maior risco regulatório. O time jurídico e de compliance cuida das normativas Anvisa, documentação legal, contratos e conformidade regulatória. Já usam Chat PDF para consultas de normativas Anvisa — um uso pioneiro de IA nessa área. O KPI principal é zero infrações regulatórias.

## Setores Envolvidos

| Setor | Papel |
|-------|-------|
| Analista Jurídico (Julia Maria) | Contratos, obrigações legais |
| Compliance (Valdirene Gomes) | Conformidade regulatória Anvisa |

## Contexto Estratégico

**Compliance Anvisa é o MOAT da empresa:** A certificação Anvisa é a barreira competitiva central da Contourline. Sem ela, concorrentes não conseguem operar legalmente no mesmo mercado. Manter, expandir e monitorar certificações é o que protege R$115-120M de faturamento anual. Perder uma certificação pode paralisar linhas inteiras de produto. (Fonte: strategic-positioning.yaml -- competitive_moat, company-profile.yaml)

**IA já em uso -- Chat PDF para consultas normativas:** O time jurídico/compliance já usa Chat PDF para consultas pontuais de normativas Anvisa. O roadmap estratégico prevê upgrade para agente especializado em normativas Anvisa com monitoramento contínuo e alertas automáticos. (Fonte: ai/strategy.yaml -- use case priority_4: "Compliance Anvisa com IA")

**Squad planejada -- Compliance Squad:** A estratégia de IA da empresa prevê um Compliance Squad com agentes especializados, como parte da topologia de squads com agentes coordenados. O Chat PDF atual é o ponto de partida; o objetivo é um agente autônomo que monitore mudanças regulatórias, alerte sobre vencimentos e responda consultas em tempo real. (Fonte: ai/strategy.yaml -- agent_topology.specialist_squads)

**Todas as comunicações devem seguir normas Anvisa:** A constraint regulatória se aplica a toda a empresa -- todas as comunicações de equipamentos médicos (marketing, vendas, pós-venda, documentação) devem seguir normativas Anvisa. O jurídico/compliance é o guardião dessa conformidade transversal. (Fonte: ai/strategy.yaml -- constraints.compliance)

**Integração transversal:** Compliance conecta com P&D (homologação de novos equipamentos), Operações (rastreabilidade de lote), Comercial (comunicação regulatória) e Internacional (certificações para novos mercados). Este epic é hub de conformidade para todos os outros.

## Escopo IN/OUT

**IN:**
- Sistema de monitoramento automático de normativas Anvisa com IA
- Repositório centralizado de contratos com alertas de vencimento
- Dashboard de status de certificações e licenças
- Expansão do Chat PDF para agente especializado
- Alertas de mudanças regulatórias
- Integração compliance -> P&D -> Q.A para homologação

**OUT:**
- Gestão de qualidade de produto (Epic 05)
- Compliance trabalhista (parte do Epic 06)
- Processos de importação (Epic 04)
- Infraestrutura de TI (Epic 09)

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Agente de IA interpretar normativa Anvisa incorretamente | Média | Crítico | Human-in-the-loop obrigatório para decisões regulatórias |
| Mudança regulatória não detectada pelo sistema | Baixa | Crítico | Dupla verificação: IA + checagem manual periódica |
| Perda de certificação durante transição de sistema | Baixa | Crítico | Manter processo manual em paralelo até validação |
| Excesso de alertas gerando "fadiga de compliance" | Média | Médio | Classificação de severidade e filtros inteligentes |

## Dores Mapeadas

| Dor | Urgência | Impacto |
|-----|---------|---------|
| Consultas Anvisa manuais e demoradas | Alta | Risco de não-conformidade |
| Gestão de contratos sem sistema centralizado | Média | Perda de prazos e obrigações |
| Monitoramento de mudanças regulatórias manual | Alta | Surpresas regulatórias |
| Documentação de conformidade descentralizada | Alta | Dificuldade em auditorias |
| Sem alertas automáticos de vencimento de certificações | Alta | Risco de perda de licenças |

## Objetivo do Epic

Centralizar e automatizar a gestão jurídica e de compliance da Contourline, com foco em monitoramento contínuo de normativas Anvisa, gestão de contratos e alertas proativos de vencimento de certificações.

## Critérios de Aceite do Epic

- [ ] Sistema de monitoramento automático de normativas Anvisa
- [ ] Repositório centralizado de contratos com alertas de vencimento
- [ ] Dashboard de status de certificações e licenças
- [ ] Automação de consultas regulatórias (expansão do Chat PDF)
- [ ] Alertas de mudanças regulatórias para o time
- [ ] Integração compliance → P&D → Q.A para homologação

## Stories Previstas

| # | Story | Agente | Estimativa |
|---|-------|--------|-----------|
| 8.1 | Mapeamento de todas as certificações e obrigações Anvisa | @analyst | M |
| 8.2 | Sistema de monitoramento de normativas Anvisa com IA | @dev | L |
| 8.3 | Repositório de contratos com alertas inteligentes | @dev | M |
| 8.4 | Dashboard de compliance e certificações | @dev | M |
| 8.5 | Integração compliance → P&D → Q.A | @dev | M |
| 8.6 | QA Gate — validação regulatória | @qa | S |

## Stack Sugerida

- Chat PDF existente (expandir para monitoramento contínuo)
- Gestão de contratos: a definir com @architect
- Monitoramento Anvisa: scraping + IA de alertas

## Dependências

- Epic 05 (P&D & Q.A) — conformidade de produtos
- Epic 09 (TI) — infraestrutura

## Métricas de Sucesso

| Métrica | Baseline | Meta |
|---------|---------|------|
| Infrações regulatórias | Zero (manter) | Zero |
| Tempo de resposta a consulta Anvisa | Horas/dias | < 30 min (IA) |
| Contratos vencidos sem renovação | Atual | 0 |
| Cobertura de monitoramento normativo | Parcial | 100% |

---

*Stories detalhadas disponíveis em `/stories/`*
