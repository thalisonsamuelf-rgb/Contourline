# Epic 06 — RH & DP

> **Status:** Draft
> **Owner:** @pm Morgan
> **Priority:** P2 🟡
> **Empresa:** Contourline Equipamentos Médicos e Diagnósticos
> **Criado por:** @analyst Atlas + @pm Morgan
> **Data:** 2026-03-27

---

## Contexto

Com 130 funcionários e folha mensal de R$700-800k, RH e DP são setores críticos para a meta do CEO de reduzir custos em 30%. RH Estratégico cuida de recrutamento, cultura e desenvolvimento. DP cuida de admissão, folha, férias, benefícios e obrigações legais. São departamentos separados com dinâmicas distintas.

## Setores Envolvidos

| Setor | Papel |
|-------|-------|
| RH Estratégico (Cassiano Torres) | Recrutamento, seleção, cultura, desenvolvimento |
| DP / RH-Recrutamento e Seleção (Gisele Machado) | Responsável por DP e recrutamento |
| Analista de DP (Aline Saraiva) | Operações de DP |
| Analista de RH | Operações de RH |
| Assistente de RH | Suporte administrativo de RH |
| DP (Departamento Pessoal) | Folha, admissão, demissão, férias, benefícios |

## Contexto Estratégico

**Folha como maior alavanca de economia:** A folha mensal da Contourline e de R$700-800k/mes para ~130 pessoas. O CEO definiu meta explicita de reduzir 30% via automacao com IA, o que representa R$210-240k/mes de economia potencial. Essa meta e a prioridade estrategica numero 1 da empresa. (Fonte: company-profile.yaml -- key_metrics, strategic_roadmap.priority_1)

**KPI central -- Payroll as % of Revenue:**
- Baseline: ~8% (R$700-800k/mes sobre R$115-120M/ano)
- Meta: ~5.5% (reducao de 30%)
- Economia anual projetada: R$2.5-2.9M
(Fonte: company-profile.yaml -- key_metrics)

**Modelo 100% presencial:** A empresa opera com time 100% presencial, sede em Sete Lagoas, MG. (Fonte: team-structure.yaml)

**Integracao com Epic 03 (Financeiro):** Os dados de folha sao criticos para o dashboard financeiro do CEO. O custo de pessoal por setor deve alimentar o sistema financeiro (Totvs) para analise de margem e eficiencia. A reducao de folha impacta diretamente o P&L. (Fonte: ai/strategy.yaml -- use case priority_3)

**Gaps de lideranca identificados:** A empresa nao tem CTO formal (CEO tem background mas acumula funcoes) nem Head de IA/Automacao. O RH estrategico deve considerar esses gaps no plano de recrutamento. (Fonte: team-structure.yaml)

## Escopo IN/OUT

**IN:**
- Sistema de recrutamento com triagem por IA
- Dashboard de folha e custo de pessoal por setor
- Automacao de onboarding digital
- Controle de ponto e ferias digitalizado
- Analise preditiva de custo de pessoal
- Plataforma de desenvolvimento e trilhas de aprendizado

**OUT:**
- Gestao financeira global (Epic 03)
- Compliance trabalhista avancado (Epic 08)
- Definicao de estrategia de remuneracao/comissoes (pricing-strategy.yaml)
- Infraestrutura de TI (Epic 09)

## Riscos

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|--------------|---------|-----------|
| Meta de -30% de folha gerar demissoes mal planejadas | Media | Critico | Foco em automacao de funcoes, nao de pessoas |
| Sistema de ponto remoto com baixa adesao | Media | Medio | Integracao com ferramentas existentes do time |
| Dados de folha inconsistentes entre Totvs e sistema novo | Media | Alto | Validacao cruzada e reconciliacao automatica |
| Triagem por IA com vies em recrutamento | Baixa | Alto | Auditoria periodica de criterios e resultados |

## Dores Mapeadas

| Dor | Urgência | Impacto |
|-----|---------|---------|
| Processos de recrutamento lentos e manuais | Alta | Vagas abertas por semanas |
| Folha de R$700-800k sem análise preditiva | Alta | Meta: reduzir 30% sem demitir |
| Onboarding de novos colaboradores sem automação | Média | Lentidão na integração |
| Controle de ponto e férias manual | Média | Erros e retrabalho no DP |
| Sem plano de desenvolvimento individualizado | Média | Retenção de talentos comprometida |

## Objetivo do Epic

Automatizar os processos operacionais de RH e DP com IA, desde recrutamento até gestão de folha e desenvolvimento de pessoas — liberando o time para trabalho estratégico e identificando oportunidades de redução de custo de pessoal.

## Critérios de Aceite do Epic

- [ ] Sistema de recrutamento com triagem por IA operacional
- [ ] Dashboard de folha com análise de custo por setor
- [ ] Automação de onboarding digital
- [ ] Controle de ponto e férias digitalizado
- [ ] Relatório de análise de custo de pessoal com sugestões de otimização
- [ ] Plataforma de desenvolvimento e trilhas de aprendizado

## Stories Previstas

| # | Story | Agente | Estimativa |
|---|-------|--------|-----------|
| 6.1 | Mapeamento de processos de RH e DP atuais | @analyst | S |
| 6.2 | Sistema de recrutamento com triagem por IA | @dev | L |
| 6.3 | Dashboard de folha e custo de pessoal por setor | @data-engineer | M |
| 6.4 | Automação de onboarding digital | @dev | M |
| 6.5 | Sistema de controle de ponto e férias | @dev | M |
| 6.6 | Análise preditiva de custo de pessoal | @data-engineer | M |
| 6.7 | Plataforma de desenvolvimento e trilhas de aprendizado | @dev | M |
| 6.8 | QA Gate — validação de conformidade trabalhista | @qa | S |

## Stack Sugerida

- Integração com Totvs (folha existente)
- Triagem IA: a definir com @architect
- LMS (trilhas): a definir

## Dependências

- Epic 03 (Financeiro) — custo de folha integrado ao financeiro
- Epic 09 (TI) — infraestrutura

## Métricas de Sucesso

| Métrica | Baseline | Meta |
|---------|---------|------|
| Tempo médio de contratação | Atual | -40% |
| Custo de pessoal / receita | ~8% | ~5.5% (-30%) |
| Tempo de onboarding | Atual | -50% |
| Erros na folha | Atual | < 0.5% |

---

*Próximo passo: `@sm *draft` para criar as stories detalhadas deste epic*
