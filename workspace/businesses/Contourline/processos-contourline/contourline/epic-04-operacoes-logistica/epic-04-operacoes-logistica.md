# Epic 04 — Operações & Logística

> **Status:** Draft
> **Owner:** @pm Morgan
> **Priority:** P2 🟡
> **Empresa:** Contourline Equipamentos Médicos e Diagnósticos
> **Criado por:** @analyst Atlas + @pm Morgan
> **Data:** 2026-03-27

---

## Contexto

O Diretor de Operações (Filipe Ferreira) coordena toda a cadeia de valor física da Contourline: fábrica, logística, estoque, recebimento e expedição. Como a empresa tem 130 funcionários e opera como uma das maiores do mercado de equipamentos médicos estéticos, a eficiência operacional é crítica para manter margem.

## Setores Envolvidos

| Setor | Papel |
|-------|-------|
| Diretor de Operações (Filipe Ferreira) | Liderança da cadeia operacional |
| Supervisor de Logística e Patrimônio (Silas Oliveira) | Supervisão de logística e controle patrimonial |
| Logística Nacional | Distribuição de equipamentos |
| Assistente de Logística (Lorena Abreu) | Suporte logístico |
| Expedição (Diego de Araújo) | Saída de pedidos |
| Recebimento (Sueli Martins) | Entrada de materiais e equipamentos |
| Importação | Aquisição de componentes/equipamentos do exterior |
| Estoque | Controle de inventário |
| Almoxarife | Controle de materiais internos |
| PMO | Gestão de projetos operacionais |
| Patrimônio | Controle de ativos da empresa |
| Administrativo | Suporte operacional |

## Contexto Estratégico

**Modelo operacional:** Empresa 100% presencial com sede em Sete Lagoas, MG. Time de ~130 pessoas. (Fonte: company-profile.yaml, team-structure.yaml)

**Logística especial:** Equipamentos médicos de alto valor com certificação Anvisa obrigatória. A logística exige rastreabilidade completa por número de série, controle de temperatura/impacto em transporte e conformidade regulatória em cada etapa da cadeia. (Fonte: company-profile.yaml)

**ERP existente:** Totvs é o ERP central da empresa. Os módulos operacionais (estoque, compras, logística) devem ser integrados ou complementados, nunca substituídos. A meta estratégica de reduzir 30% da folha de R$700-800k/mês depende de automação operacional inteligente. (Fonte: ai/strategy.yaml, company-profile.yaml)

**Barreira regulatória:** A certificação Anvisa é o principal moat competitivo da Contourline. Toda a cadeia operacional -- recebimento, estoque, expedição -- deve manter rastreabilidade regulatória completa. Equipamentos sem rastreabilidade representam risco de perda de certificação. (Fonte: strategic-positioning.yaml)

**Operação presencial:** A coordenação operacional da fábrica/logística exige sistemas digitais robustos de visibilidade e controle. (Fonte: team-structure.yaml)

## Escopo IN/OUT

**IN:**
- Gestão de estoque com rastreabilidade Anvisa por número de série
- Dashboard operacional em tempo real
- Automação de recebimento, expedição e embalagem
- Controle digital de patrimônio
- Integração com Totvs (módulos operacionais)
- Processos de importação de componentes/equipamentos

**OUT:**
- Substituição do Totvs como ERP
- Gestão financeira (Epic 03)
- Qualidade e conformidade de produto (Epic 05)
- Infraestrutura de TI (Epic 09)

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Integração Totvs com sistema novo falhar | Média | Alto | PoC de integração antes de desenvolvimento completo |
| Perda de rastreabilidade durante migração | Baixa | Crítico | Migração gradual com período de dupla operação |
| Resistência do time operacional a sistema novo | Média | Médio | Treinamento progressivo e onboarding digital |
| Equipamento de alto valor danificado em logística | Baixa | Alto | Protocolos de embalagem e rastreio em tempo real |

## Dores Mapeadas

| Dor | Urgência | Impacto |
|-----|---------|---------|
| Visibilidade do estoque em tempo real | Alta | Rupturas e excessos de inventário |
| Rastreabilidade de equipamentos (Anvisa exige) | Alta | Risco regulatório e compliance |
| Coordenação logística sem sistema centralizado | Média | Atrasos na entrega |
| Importação sem automação de processos | Média | Gargalo em supply chain |
| Patrimônio sem controle digital | Média | Perda de ativos |

## Objetivo do Epic

Digitalizar e automatizar a cadeia operacional da Contourline, criando visibilidade completa do estoque, rastreabilidade de equipamentos e otimização logística — garantindo compliance Anvisa e reduzindo custos operacionais.

## Critérios de Aceite do Epic

- [ ] Sistema de gestão de estoque em tempo real operacional
- [ ] Rastreabilidade de equipamentos por número de série (Anvisa)
- [ ] Dashboard operacional para o Diretor de Operações
- [ ] Automação de processos de recebimento e expedição
- [ ] Controle digital de patrimônio e ativos
- [ ] Integração com Financeiro (Totvs) para custo de estoque

## Stories Previstas

| # | Story | Agente | Estimativa |
|---|-------|--------|-----------|
| 4.1 | Mapeamento dos fluxos operacionais atuais (as-is) | @analyst | M |
| 4.2 | Sistema de gestão de estoque com rastreabilidade | @dev | L |
| 4.3 | Dashboard operacional — visibilidade em tempo real | @dev | M |
| 4.4 | Automação de recebimento e expedição | @dev | M |
| 4.5 | Controle digital de patrimônio | @dev | S |
| 4.6 | Integração logística → Financeiro (Totvs) | @dev | M |
| 4.7 | QA Gate — validação operacional e compliance Anvisa | @qa | M |

## Stack Sugerida

- Integração com Totvs (existente)
- Sistema de rastreabilidade: a definir com @architect
- Dashboard: compartilhado com Epic 03 (BI central)

## Dependências

- Epic 03 (Financeiro) — custo de estoque e compras
- Epic 05 (P&D & Q.A) — qualidade dos equipamentos em estoque
- Epic 09 (TI) — infraestrutura

## Métricas de Sucesso

| Métrica | Baseline | Meta |
|---------|---------|------|
| Acuracidade de estoque | Atual | > 98% |
| Tempo de expedição | Atual | -30% |
| Rastreabilidade de equipamentos | Parcial | 100% (Anvisa) |
| Ruptura de estoque | Atual | < 2% |

---

*Próximo passo: `@sm *draft` para criar as stories detalhadas deste epic*
