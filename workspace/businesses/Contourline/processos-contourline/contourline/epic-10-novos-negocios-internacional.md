# Epic 10 — Novos Negócios & Internacional

> **Status:** Draft
> **Owner:** @pm Morgan
> **Priority:** P4 🔵
> **Empresa:** Contourline Equipamentos Médicos e Diagnósticos
> **Criado por:** @analyst Atlas + @pm Morgan
> **Data:** 2026-03-27

---

## Contexto

A Contourline tem operação internacional via Body Health Internacional, com Filipe Ferreira liderando Novos Negócios e Internacionalização. A empresa tem conselheiros internacionais (Glaucia Moura, Andreia Almeida, Maria Dulce, Diego Baz, Leonardo Rial) e um Egio separado como "CEO Brasil", sugerindo estrutura de holding com expansão planejada. Este epic é P4 — deve ser executado após a casa estar em ordem internamente.

## Setores Envolvidos

| Setor | Pessoas | Papel |
|-------|---------|-------|
| Filipe Ferreira | 1 | Novos Negócios e Internacionalização |
| Comércio Exterior / Importação | - | Operações internacionais |
| Conselho Body Health Internacional | 6 conselheiros | Governança internacional |
| Egio (CEO Brasil) | 1 | Liderança da operação Brasil |

## Contexto Estratégico

**Empresa em stage SCALE:** A Contourline fatura R$115-120M/ano com ~130 funcionários, o que a coloca em estágio de escala consolidada. A expansão internacional é o próximo passo natural para uma empresa que já domina o mercado nacional de equipamentos médicos estéticos. (Fonte: company-profile.yaml -- stage.current_stage: SCALE)

**Certificação Anvisa como passaporte:** A certificação Anvisa, além de moat competitivo no Brasil, serve como credencial de qualidade para mercados internacionais. Agências regulatórias de outros países reconhecem certificações Anvisa como indicador de padrão elevado. (Fonte: strategic-positioning.yaml -- competitive_moat)

**Background tech do CEO:** Egio Roberto tem background de programação e tecnologia. Isso posiciona a Contourline como "empresa de tecnologia que domina equipamentos estéticos", um diferencial relevante para mercados internacionais onde o tech-enabled healthcare é valorizado. (Fonte: company-profile.yaml -- leadership_team)

**Diferenciação vs marcas internacionais:** Enquanto marcas internacionais vendem equipamentos com suporte limitado em mercados emergentes, a Contourline pode replicar seu modelo de suporte local robusto (130 pessoas, compliance total) em novos mercados. A proposta é inversa: empresa brasileira que expande com suporte local, não multinacional com suporte remoto. (Fonte: strategic-positioning.yaml -- vs_marcas_internacionais)

**Estrutura internacional existente:** Body Health Internacional já existe com conselheiros internacionais (Glaucia Moura, Andreia Almeida, Maria Dulce, Diego Baz, Leonardo Rial) e Filipe Ferreira liderando Novos Negócios. Egio como "CEO Brasil" sugere holding com governança preparada para expansão. (Fonte: company-profile.yaml)

**Timing estratégico:** O CEO acredita que "estamos passando pela maior mudança da nossa era" e quer estar na vanguarda. A combinação de IA + equipamentos médicos certificados + expansão internacional é o triângulo estratégico da próxima fase. (Fonte: strategic-positioning.yaml -- egio_roberto_quotes)

## Escopo IN/OUT

**IN:**
- Processo de avaliação de novos mercados com inteligência de dados
- Dashboard de operações internacionais
- Automação de processos de comércio exterior
- Funil de novos negócios no CRM
- Relatório de inteligência de mercado com IA

**OUT:**
- Operações domésticas (Epics 01-09)
- Certificações Anvisa para novos produtos (Epic 05/08)
- Logística doméstica (Epic 04)
- Infraestrutura de TI (Epic 09)

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Expansão prematura antes de operação interna otimizada | Média | Alto | P4 garante que Epics P1-P3 estejam resolvidos antes |
| Regulação de mercado-alvo incompatível com Anvisa | Média | Alto | Pesquisa regulatória por mercado antes de entrar |
| Suporte local em novo mercado sem infraestrutura | Alta | Alto | Parcerias locais antes de operação própria |
| Câmbio e custos de importação/exportação imprevisíveis | Alta | Médio | Hedge cambial e pricing dinâmico |

## Dores Mapeadas

| Dor | Urgência | Impacto |
|-----|---------|---------|
| Operação internacional sem sistema integrado | Média | Ineficiência na expansão |
| Novos negócios sem processo estruturado | Média | Oportunidades perdidas |
| Comércio exterior manual | Média | Gargalos em importação |
| Sem inteligência de mercado para expansão | Baixa | Decisões de expansão sem dados |

## Objetivo do Epic

Estruturar o processo de expansão internacional e novos negócios da Contourline com dados e IA, preparando a empresa para escalar além do Brasil de forma organizada e eficiente.

## Critérios de Aceite do Epic

- [ ] Processo de avaliação de novos mercados documentado
- [ ] Dashboard de operações internacionais
- [ ] Automação de processos de comércio exterior
- [ ] Funil de novos negócios estruturado no CRM
- [ ] Relatório de inteligência de mercado internacional com IA

## Stories Previstas

| # | Story | Agente | Estimativa |
|---|-------|--------|-----------|
| 10.1 | Mapeamento da operação internacional atual | @analyst | M |
| 10.2 | Funil de novos negócios no CRM | @dev | S |
| 10.3 | Automação de processos de comércio exterior | @dev | M |
| 10.4 | Dashboard de operações internacionais | @dev | M |
| 10.5 | Inteligência de mercado com IA para expansão | @analyst | M |
| 10.6 | QA Gate | @qa | S |

## Stack Sugerida

- CRM: RD Station (existente — extensão para internacional)
- Inteligência de mercado: pesquisa + IA
- Comércio exterior: a definir

## Dependências

- Todos os epics P1, P2, P3 devem estar completos ou em andamento
- Epic 01 (Comercial) — base de processos de vendas
- Epic 09 (TI) — infraestrutura

## Métricas de Sucesso

| Métrica | Baseline | Meta |
|---------|---------|------|
| Novos mercados avaliados / trim | Não medido | 3+ |
| Tempo de processo de importação | Atual | -25% |
| Pipeline internacional estruturado | Inexistente | Operacional |

---

*Próximo passo: `@sm *draft` para criar as stories detalhadas deste epic*
