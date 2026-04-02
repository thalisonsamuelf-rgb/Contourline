# Epic 02 — Marketing & IA

> **Status:** Draft
> **Owner:** @pm Morgan
> **Priority:** P1 🔴
> **Empresa:** Contourline Equipamentos Médicos e Diagnósticos
> **Criado por:** @analyst Atlas + @pm Morgan
> **Data:** 2026-03-27

---

## Contexto

O time de Marketing tem 14 pessoas e é o maior gerador de leads da empresa. Já usa IA para produção de vídeos e animações, mas de forma fragmentada — cada pessoa usa suas próprias ferramentas sem coordenação. A Diretora de Marketing é Helaine Hohendorff, e o Thalison (Head de Growth Marketing) coordena a área de growth. A meta do CEO é automatizar processos repetitivos para liberar o time para trabalho estratégico, reduzindo custo sem reduzir qualidade.

## Contexto Estrategico

### Lideranca — Correcao de Papel

Thalison Samuel Franca Abreu e **Head de Growth Marketing** da Contourline Equipamentos Medicos e Diagnosticos (CNPJ 14.458.149/0001-23). Participa da imersao estrategica no lugar do CEO Egio Roberto. A **Diretora de Marketing** e Helaine Hohendorff.

### Use Case Estrategico de IA

**Marketing Coordenado com IA** — Producao de conteudo 3x sem aumentar time. Estado atual: 14 pessoas, acoes isoladas com IA. Estado desejado: Squad de marketing com agentes coordenados. Owner: Diretora de Marketing (Helaine Hohendorff). (Fonte: ai/strategy.yaml — use_cases.priority_1)

### Squad Planejada

Marketing Squad — uma das 4 squads de agentes especializados planejadas. As 14 pessoas do time atual serao otimizadas com IA coordenada via AIOX. (Fonte: ai/strategy.yaml — agent_topology.specialist_squads)

### KPI Estrategico

Revenue per Marketing Team Member = ~R$8.5M por pessoa (R$120M / 14 pessoas). (Fonte: operations/kpi-scorecards.yaml — operational_metrics.marketing_team_productivity)

### Posicao do CEO

> "Acoes individuais do time, mas nada coordenado" — Egio Roberto, CEO, sobre o uso atual de IA no marketing. (Fonte: brand/strategic-positioning.yaml — contourline_quotes.on_ai_usage)

### Autonomy Level

Medium-high — CEO quer sistema que ele valida mas opera autonomamente. (Fonte: ai/strategy.yaml — strategy_scope.autonomy_level)

### Compliance

Todas as comunicacoes de equipamentos medicos devem seguir normas Anvisa. Isso inclui conteudo de marketing, videos, posts e materiais de anuncio. (Fonte: ai/strategy.yaml — constraints.compliance)

### Dados da Empresa

- Faturamento: R$115-120M/ano (Fonte: company/company-profile.yaml)
- Equipe total: ~130 pessoas (Fonte: company/company-profile.yaml)
- Modelo de trabalho: 100% presencial (Fonte: company/company-profile.yaml)
- Stage: SCALE — empresa consolidada buscando otimizacao via IA (Fonte: company/company-profile.yaml)

---

## Setores Envolvidos

| Setor | Pessoas | Papel |
|-------|---------|-------|
| Diretora de Marketing (Helaine Hohendorff) | 1 | Liderança e direção de marketing |
| Head de Growth Marketing (Thalison) | 1 | Growth marketing, tráfego pago, performance |
| Supervisora de Eventos (Fernanda Normando) | 1 | Eventos e ações presenciais |
| Supervisor de Audiovisual (Giovani Gomes) | 1 | Vídeos, edição, Videomakers |
| Audiovisual | - | Vídeos, edição, Videomakers |
| Growth | - | Tráfego pago, performance |
| Gestão de Mídias Sociais | - | Conteúdo orgânico |
| Analista de Performance | - | Dados e otimização |
| Analista de CRM | - | RD Station e automações |
| Designer Gráfico | - | Identidade visual |

## Dores Mapeadas

| Dor | Urgência | Impacto |
|-----|---------|---------|
| IA fragmentada — sem coordenação | Alta | Retrabalho, inconsistência de conteúdo |
| Muita verba de anúncio, pouca automação | Alta | ROI de mídia abaixo do potencial |
| Produção de vídeo manual e lenta | Alta | Gargalo na geração de conteúdo |
| Sem dashboard central de performance | Média | Decisões baseadas em dados fragmentados |
| CRM desconectado do marketing | Média | Leads sem contexto chegando ao SDR |

## Objetivo do Epic

Criar um sistema coordenado de IA para o time de Marketing da Contourline, integrando produção de conteúdo, gestão de mídia paga, CRM e analytics em um hub central — reduzindo trabalho manual e aumentando ROI sem ampliar headcount.

## Critérios de Aceite do Epic

- [ ] Hub central de IA para Marketing operacional (briefings, aprovações, distribuição)
- [ ] Pipeline de produção de vídeo com IA semi-automatizado
- [ ] Integração tráfego pago → CRM (RD Station) → SDR funcionando
- [ ] Dashboard unificado de performance (ads + orgânico + leads)
- [ ] Automações de conteúdo para mídias sociais configuradas
- [ ] Playbook de uso de IA documentado para o time

## Stories Previstas

| # | Story | Agente | Estimativa |
|---|-------|--------|-----------|
| 2.1 | Auditoria do stack de IA atual do time de Marketing | @analyst | S |
| 2.2 | Hub central de briefing e aprovação de conteúdo com IA | @dev | L |
| 2.3 | Pipeline de vídeo com IA (roteiro → edição → publicação) | @dev | L |
| 2.4 | Integração tráfego pago + CRM + funil de leads | @dev | M |
| 2.5 | Dashboard unificado de performance de marketing | @dev | M |
| 2.6 | Automações de social media com IA | @dev | M |
| 2.7 | Playbook de IA para o time de Marketing | @analyst + @pm | S |
| 2.8 | QA Gate — validação e testes do hub completo | @qa | M |

## Stack Sugerida

- Vídeo IA: ferramentas existentes + coordenação via hub
- Áudio: Eleven Labs (existente)
- CRM: RD Station (existente)
- Analytics: a definir com @architect
- Hub de conteúdo: a definir com @architect

## Escopo

### IN (dentro do epic)
- Hub central de IA para coordenação de conteúdo
- Pipeline de vídeo com IA (roteiro → edição → publicação)
- Integração tráfego pago → CRM → funil de leads
- Dashboard unificado de performance
- Automações de social media
- Playbook de uso de IA para o time

### OUT (fora do epic)
- Eventos presenciais e branding offline
- Contratação de novos profissionais de marketing
- Criação de brand guidelines (existe e não muda)
- Gestão do funil comercial pós-lead (isso é Epic 01)
- Infraestrutura técnica de servidores (isso é Epic 09)
- Compra de novas ferramentas sem aprovação do CEO

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Resistência do time a centralizar ferramentas de IA | Alta | Alto | Onboarding gradual, manter ferramentas que já funcionam |
| Dependência de APIs de terceiros (Eleven Labs, ferramentas de vídeo IA) | Média | Alto | Mapear alternativas para cada ferramenta crítica |
| Curva de aprendizado do hub central | Média | Médio | Playbook + treinamento (Story 2.7) |
| Qualidade do conteúdo gerado por IA abaixo do padrão | Média | Alto | Fluxo de aprovação humana obrigatório antes de publicação |
| Fragmentação voltar — cada pessoa usando sua ferramenta | Média | Médio | Governança clara no hub, métricas de adoção |

## Dependências

- Epic 01 (Comercial) — destino dos leads gerados
- Epic 09 (TI) — infraestrutura e integrações

## Métricas de Sucesso

| Métrica | Baseline | Meta |
|---------|---------|------|
| Tempo de produção de vídeo | Atual (manual) | -50% com IA |
| Custo por lead (CPL) | Atual | -20% |
| Velocidade de publicação | Atual | +3x conteúdos/semana |
| ROI de mídia paga | Atual | +30% |

---

*Próximo passo: `@sm *draft` para criar as stories detalhadas deste epic*
