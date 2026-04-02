# Epic 05 — P&D & Qualidade

> **Status:** Draft
> **Owner:** @pm Morgan
> **Priority:** P2 🟡
> **Empresa:** Contourline Equipamentos Médicos e Diagnósticos
> **Criado por:** @analyst Atlas + @pm Morgan
> **Data:** 2026-03-27

---

## Contexto

A Contourline tem certificação Anvisa como barreira competitiva central. O time de P&D (Gerente, Coordenador, Analistas e Auxiliares) é responsável por desenvolver e homologar novos equipamentos. O Q.A / Controle de Qualidade garante que cada equipamento saia da fábrica dentro dos padrões regulatórios. A Assistência Técnica cuida do pós-venda técnico com técnicos de eletrônica especializados.

## Setores Envolvidos

| Setor | Papel |
|-------|-------|
| Gerente de P&D (Vanessa Melo) | Liderança de inovação de produtos |
| Coordenador de P&D (Rodrigo Martins) | Execução dos projetos de produto |
| Analistas de P&D | Desenvolvimento técnico |
| Auxiliares de P&D | Suporte ao desenvolvimento |
| Q.A / Controle de Qualidade | Inspeção e testes de conformidade Anvisa |
| Analistas de CQ (Thiago Marques, Breno Souza, Marcelo Avelar) | Controle e documentação de qualidade |
| Gerente de Assistência Técnica (Filipe Fraga) | Liderança da assistência técnica pós-venda |
| Assistência Técnica (Marcelo Henrique, Vitor Aguiar) | Suporte técnico pós-venda |
| Técnicos de Eletrônica | Reparo e manutenção de equipamentos |

## Contexto Estratégico

**Anvisa como moat e risco:** A certificação Anvisa é simultaneamente a maior vantagem competitiva e o maior risco regulatório da Contourline. Concorrentes sem certificação completa não conseguem competir no mesmo nível. Manter e expandir certificações é barreira de entrada significativa que protege R$115-120M de faturamento anual. (Fonte: strategic-positioning.yaml, company-profile.yaml)

**Certificação como vantagem competitiva:**
- vs. Importadores genéricos: Contourline tem foco exclusivo em medicina estética com certificação Anvisa completa. (Fonte: strategic-positioning.yaml)
- vs. Marcas internacionais: empresa brasileira com 130 pessoas, suporte local e compliance total. (Fonte: strategic-positioning.yaml)
- vs. Fornecedores sem certificação: risco regulatório recai sobre o profissional que compra, não sobre a Contourline. (Fonte: strategic-positioning.yaml)

**IA já em uso para compliance:** O time jurídico/compliance já utiliza Chat PDF para consultas pontuais de normativas Anvisa. O roadmap estratégico prevê upgrade para agente especializado em normativas Anvisa com monitoramento contínuo. (Fonte: ai/strategy.yaml -- use case priority_4)

**DNA tech:** O CEO tem background de programação, o que facilita a adoção de ferramentas digitais para P&D e qualidade. A empresa se posiciona como "empresa de tecnologia que domina equipamentos estéticos". (Fonte: company-profile.yaml, strategic-positioning.yaml)

## Escopo IN/OUT

**IN:**
- Gestão de projetos de P&D com ciclo de vida digital
- Documentação Anvisa digitalizada e rastreável
- Registro digital de inspeções e testes de Q.A
- Base de conhecimento para Assistência Técnica
- Dashboard de conformidade por equipamento
- Integração P&D -> Q.A -> liberação de lote

**OUT:**
- Gestão de estoque físico (Epic 04)
- Gestão jurídica e contratos (Epic 08)
- Certificações novas para mercado internacional (Epic 10)
- Infraestrutura de TI (Epic 09)

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Perda de conformidade Anvisa durante digitalização | Baixa | Crítico | Manter processo manual em paralelo até validação completa |
| Base de conhecimento incompleta ou desatualizada | Média | Alto | Processo de review periódico com time de P&D |
| Resistência do time técnico a mudança de processo | Média | Médio | Treinamento e envolvimento desde fase de mapeamento |
| Mudança regulatória Anvisa impactar sistema novo | Média | Alto | Monitoramento contínuo (integração com Epic 08) |

## Dores Mapeadas

| Dor | Urgência | Impacto |
|-----|---------|---------|
| Documentação de conformidade Anvisa manual | Alta | Risco regulatório alto |
| Ciclo de desenvolvimento de produto longo | Média | Time-to-market lento |
| Registro de testes e inspeções em papel/planilha | Alta | Rastreabilidade comprometida |
| Assistência técnica sem base de conhecimento centralizada | Média | Retrabalho e tempo de reparo alto |
| Gestão de projetos de P&D descentralizada | Média | Sobreposição de esforços |

## Objetivo do Epic

Digitalizar e otimizar o ciclo de vida de produtos da Contourline, desde o P&D até a assistência técnica, com foco em garantir conformidade Anvisa, reduzir o ciclo de desenvolvimento e aumentar a eficiência do time técnico.

## Critérios de Aceite do Epic

- [ ] Sistema de gestão de projetos de P&D operacional
- [ ] Documentação de conformidade Anvisa digitalizada e rastreável
- [ ] Registro digital de inspeções e testes de Q.A
- [ ] Base de conhecimento técnico para Assistência Técnica
- [ ] Dashboard de status de conformidade por equipamento
- [ ] Integração P&D → Q.A → Estoque (liberação de lote)

## Stories Previstas

| # | Story | Agente | Estimativa |
|---|-------|--------|-----------|
| 5.1 | Mapeamento do ciclo de desenvolvimento atual | @analyst | S |
| 5.2 | Sistema de gestão de projetos de P&D | @dev | M |
| 5.3 | Registro digital de inspeções e testes Q.A | @dev | M |
| 5.4 | Documentação Anvisa — digitalização e rastreabilidade | @dev | L |
| 5.5 | Base de conhecimento para Assistência Técnica | @dev | M |
| 5.6 | Dashboard de conformidade por equipamento | @dev | M |
| 5.7 | Integração Q.A → liberação de lote no estoque | @dev | M |
| 5.8 | QA Gate — validação regulatória e técnica | @qa | M |

## Stack Sugerida

- Documentação Anvisa: Chat PDF existente + sistema dedicado
- Gestão de P&D: a definir com @architect
- Base de conhecimento: a definir

## Dependências

- Epic 04 (Operações) — liberação de lote no estoque
- Epic 08 (Jurídico) — conformidade regulatória Anvisa
- Epic 09 (TI) — infraestrutura

## Métricas de Sucesso

| Métrica | Baseline | Meta |
|---------|---------|------|
| Tempo de ciclo de P&D | Atual | -20% |
| Rastreabilidade de conformidade Anvisa | Parcial | 100% |
| Tempo médio de reparo (MTTR) | Atual | -30% |
| Não-conformidades em inspeção | Atual | -40% |

---

*Próximo passo: `@sm *draft` para criar as stories detalhadas deste epic*
