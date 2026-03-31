# Epic 07 — CX / CS & Pós-venda

> **Status:** Draft
> **Owner:** @pm Morgan
> **Priority:** P3 🟢
> **Empresa:** Contourline Equipamentos Médicos e Diagnósticos
> **Criado por:** @analyst Atlas + @pm Morgan
> **Data:** 2026-03-27

---

## Contexto

O time de CX/CS tem 5 pessoas responsáveis pela experiência e sucesso do cliente após a compra de equipamentos médicos estéticos. A área de Consultoria e Treinamentos (liderada por Andreia Almeida) complementa o pós-venda com treinamentos técnicos para os clientes. O cliente da Contourline é um profissional de medicina estética que precisa dominar o equipamento para gerar resultado para seus pacientes.

## Setores Envolvidos

| Setor | Pessoas | Papel |
|-------|---------|-------|
| Diretora de Consultoria e Treinamentos (Andreia Almeida) | 1 | Liderança de consultoria, treinamentos e pós-venda |
| CX/CS | 5 | Experiência e sucesso do cliente |
| Analista de CS (Nathalia) | - | Acompanhamento de clientes |
| Auxiliar de CS (Alice Coelho) | - | Suporte operacional |
| Auxiliar de CS (Lucas Pereira) | - | Suporte operacional |
| Auxiliar de CS (Rebeca Lindsay) | - | Suporte operacional |
| Analista de CRM | - | Dados de relacionamento |
| Consultora de Treinamento (Dra. Esther Santos) | - | Capacitação em uso de equipamentos |
| Consultora de Treinamento (Raissa Veiga) | - | Capacitação em uso de equipamentos |
| Consultora de Treinamento (Yasmin Gomes) | - | Capacitação em uso de equipamentos |
| Consultoras de Relacionamento | - | Retenção e expansão |

## Contexto Estratégico

**ICP -- Profissional de medicina estética:** O cliente da Contourline é um médico ou profissional de saúde na faixa de 35-55 anos, alta renda, com consultório ou clínica própria. Compra equipamentos de alto valor (alto ticket B2B) e precisa dominar o equipamento para gerar resultado nos pacientes. A decisão de compra é racional (certificação, resultado, suporte) mas o investimento é emocional (diferencial competitivo do consultório). (Fonte: icp.yaml)

**Modelo B2B de alto ticket:** Cada venda representa um relacionamento de longo prazo. O custo de aquisição de cliente é alto, o que torna retenção e expansão (upsell) mais valiosos que novas aquisições. CX proativo é investimento, não custo. (Fonte: pricing-strategy.yaml, icp.yaml)

**Diferenciação vs marcas internacionais:** A Contourline compete com marcas internacionais que vendem equipamentos com suporte limitado no Brasil. A vantagem competitiva no pós-venda é ter empresa brasileira com 130 pessoas, suporte local em português e compliance Anvisa completo. Esse diferencial precisa ser percebido pelo cliente na jornada de pós-venda. (Fonte: strategic-positioning.yaml -- vs_marcas_internacionais)

**Vínculo com Epic 01 (Comercial):** O pós-venda é a continuação natural do funil comercial. Clientes que tiveram boa experiência de onboarding e suporte geram indicações (principal canal de crescimento B2B). O CRM (RD Station) deve ter visibilidade completa da jornada: pré-venda -> venda -> pós-venda -> expansão. (Fonte: company-profile.yaml)

**Dores do ICP que afetam CX:**
- Equipamentos sem certificação Anvisa no mercado geram desconfiança
- Dificuldade em encontrar fornecedores confiáveis
- Alto investimento com risco de equipamento de qualidade duvidosa
(Fonte: icp.yaml -- pain_stack)

## Escopo IN/OUT

**IN:**
- Jornada do cliente mapeada e automatizada no CRM
- Plataforma de treinamento digital (LMS para clientes)
- Sistema de NPS e pesquisas de satisfação
- Alertas proativos de risco de churn
- Fluxo de upsell e expansão no CRM
- Dashboard de saúde da carteira de clientes

**OUT:**
- Funil comercial pré-venda (Epic 01)
- Assistência técnica de equipamentos (Epic 05)
- Infraestrutura de TI (Epic 09)
- Treinamentos internos de colaboradores (Epic 06)

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Modelo preditivo de churn sem dados históricos suficientes | Alta | Médio | Começar com regras manuais e evoluir para IA |
| LMS com baixa adoção por clientes (público 35-55 anos) | Média | Alto | UX simples, mobile-first, conteúdo em vídeo |
| NPS baixo expor problemas não mapeados | Média | Médio | Plano de ação vinculado a cada faixa de NPS |
| Integração CRM incompleta entre pré e pós-venda | Média | Alto | PoC de integração com RD Station antes de desenvolvimento |

## Dores Mapeadas

| Dor | Urgência | Impacto |
|-----|---------|---------|
| Sem jornada do cliente mapeada e automatizada | Alta | Churn silencioso |
| Treinamento de clientes manual e presencial | Média | Escalabilidade limitada |
| Sem sistema de NPS / satisfação estruturado | Média | Sem dados de retenção |
| Atendimento pós-venda reativo | Média | Problemas chegam tarde |
| CRM não usado para expansão (upsell) | Alta | Receita de expansão perdida |

## Objetivo do Epic

Criar uma jornada de sucesso do cliente automatizada e escalável para a Contourline, combinando CX proativo, treinamentos digitais e uso inteligente do CRM para aumentar retenção e expansão de receita.

## Critérios de Aceite do Epic

- [ ] Jornada do cliente mapeada e automatizada no CRM
- [ ] Plataforma de treinamento digital para clientes (LMS)
- [ ] Sistema de NPS e pesquisas de satisfação automatizado
- [ ] Alertas proativos de risco de churn
- [ ] Fluxo de upsell e expansão no CRM
- [ ] Dashboard de saúde de carteira de clientes

## Stories Previstas

| # | Story | Agente | Estimativa |
|---|-------|--------|-----------|
| 7.1 | Mapeamento da jornada do cliente atual | @analyst | S |
| 7.2 | Automação da jornada de onboarding de clientes no CRM | @dev | M |
| 7.3 | Plataforma de treinamento digital (LMS para clientes) | @dev | L |
| 7.4 | Sistema de NPS e pesquisas automatizadas | @dev | S |
| 7.5 | Alertas de churn com IA preditiva | @dev | M |
| 7.6 | Fluxo de upsell e expansão no CRM | @dev | M |
| 7.7 | Dashboard de saúde da carteira de clientes | @dev | M |
| 7.8 | QA Gate — validação da jornada completa | @qa | S |

## Stack Sugerida

- CRM: RD Station (existente)
- LMS para clientes: a definir com @architect
- NPS: a definir (integração CRM ou ferramenta dedicada)

## Dependências

- Epic 01 (Comercial) — base de clientes adquiridos
- Epic 09 (TI) — infraestrutura

## Métricas de Sucesso

| Métrica | Baseline | Meta |
|---------|---------|------|
| NPS | Não medido | > 50 |
| Taxa de churn | Atual | -20% |
| Receita de expansão (upsell) | Atual | +15% |
| Tempo de onboarding de cliente | Atual | -40% |

---

*Stories detalhadas disponíveis em `/stories/`*
