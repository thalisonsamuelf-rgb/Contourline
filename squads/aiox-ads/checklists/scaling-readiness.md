# Scaling Readiness Checklist

## Pré-Requisitos para Escala

### Performance Estável

- [ ] ROAS consistente por 3+ dias
- [ ] CPA estável (variação < 20%)
- [ ] Volume mínimo de 50 conversões/semana
- [ ] CTR acima de 1% (média)
- [ ] Frequência abaixo de 2.5

### Criativos Validados

- [ ] Pelo menos 2 criativos "winners" identificados
- [ ] Winners com 1000+ impressões cada
- [ ] Performance consistente (não one-hit wonder)
- [ ] Novos criativos em teste (pipeline ativo)

### Audiências Testadas

- [ ] Tier mais rentável identificado
- [ ] LALs testados (1%, 2%, 3%)
- [ ] Interesses broad testados
- [ ] Audiences não saturadas (frequência ok)

### Infraestrutura

- [ ] Tracking 100% funcional
- [ ] CAPI com match rate > 80%
- [ ] Página suporta mais tráfego
- [ ] Checkout escala (sem gargalos)
- [ ] Suporte ao cliente preparado

---

## v5.0 Addition: Auction Overlap Check

> **Severity:** BLOCK
> **Reference:** `data/knowledge/meta/auction_overlap.md`, skill `auction-overlap-detector`

- [ ] **Verificar audience overlap < 30% entre ad sets antes de escalar**

**Descricao:** Auction overlap ocorre quando seus proprios ad sets competem entre si no mesmo leilao da Meta. Isso fragmenta learning, desperdicea budget e infla CPMs. Overlap acima de 30% indica auto-competicao ativa que deve ser resolvida ANTES de qualquer decisao de escala.

**Verificacao:** Usar skill `auction-overlap-detector` para analisar overlap entre TODOS os ad sets ativos da campanha. Resultado esperado:
- < 15%: LOW (monitorar, sem acao)
- 15-30%: MEDIUM (revisar, planejar consolidacao)
- > 30%: HIGH (BLOCK escala ate resolver)
- > 50%: CRITICAL (consolidacao imediata obrigatoria)

**Remediacao (se > 30%):**
1. Consolidar ad sets com audiencias sobrepostas
2. Adicionar exclusoes mutuas entre ad sets
3. Diferenciar creative/messaging por ad set
4. Migrar para CBO para que Meta resolva alocacao automaticamente

---

## v5.0 Addition: Breakdown Effect Disclaimer

> **Severity:** WARN
> **Reference:** `data/knowledge/meta/breakdown_effect.md`

- [ ] **Disclaimer de Breakdown Effect reconhecido**

**Descricao:** Metricas de breakdown da Meta (por idade, genero, posicionamento, device, etc.) NAO somam ao total da campanha/ad set. Isso ocorre porque o sistema de delivery otimiza holisticamente, e a segmentacao retroativa cria discrepancias. Breakdowns sao ferramentas de DIAGNOSTICO, nao ancoras de decisao.

**Regra:** NAO basear decisoes de escala exclusivamente em dados de breakdown. Sempre usar metricas AGREGADAS (campaign-level ou ad-set-level) como base para decisoes de escala. Breakdowns servem apenas para identificar tendencias e diagnosticar problemas.

**Verificacao:** Antes de aprovar escala, confirmar que a recomendacao e baseada em metricas agregadas (ROAS total, CPA total, volume total) e NAO em performance de um segmento especifico de breakdown.

---

## v5.0 Addition: Learning Phase Complete Verification

> **Severity:** BLOCK
> **Reference:** `data/knowledge/meta/learning_phase.md`

- [ ] **Confirmar que campanha saiu da Learning Phase: 7+ dias E 50+ conversoes**

**Descricao:** Escalar uma campanha que ainda esta em Learning Phase e contraproducente -- o algoritmo ainda esta explorando e a performance e volatil. O ad set precisa de aproximadamente 50 eventos de otimizacao dentro de uma janela de 7 dias para estabilizar delivery. Escalar antes disso amplifica a instabilidade.

**Verificacao:** Checar AMBOS os criterios:
1. **Tempo:** Campanha tem 7+ dias desde criacao ou ultimo reset significativo
2. **Volume:** 50+ conversoes acumuladas no ad set (verificar via API ou Ads Manager)

Se qualquer criterio nao for atendido, escala BLOQUEADA.

**Excecao:** Se ad set esta em "Learning Limited" (nao consegue 50 conversoes em 7 dias), avaliar causas (budget muito baixo, audiencia muito restrita, evento de otimizacao muito raro) e resolver ANTES de tentar escalar.

---

## v5.0 Addition: Rampagem Gradual Rule

> **Severity:** BLOCK
> **Reference:** `config/safety-rules.yaml` -- `budget_thresholds.max_daily_increase_pct: 20`

- [ ] **Max +20% aumento de budget por ajuste respeitado**

**Descricao:** Spike de ad spend e o trigger #1 (ALTO) de ban na moderacao AI da Meta. Qualquer aumento de budget deve respeitar o limite maximo de +20% sobre o valor atual por ajuste. Aumentos maiores devem ser feitos em etapas com intervalos de 24-48h entre cada ajuste.

**Verificacao:** Antes de qualquer ajuste de budget, calcular: `(novo_budget - budget_atual) / budget_atual * 100`. Se resultado > 20%, bloquear e reformular plano de rampagem.

**Limites completos (ref: `safety-rules.yaml`):**
- Max aumento diario: +20% sobre valor atual
- Max acumulo semanal: +50% sobre valor de inicio da semana
- Rampagem para budget novo: Day 1 = 25% do target, Day 3 = 50%, Day 7 = 100%

**Remediacao:** Se aumento desejado > 20%, criar plano de rampagem escalonado:
1. Dia 1: +20% (maximo)
2. Dia 2-3: Aguardar estabilizacao
3. Dia 3-4: +20% adicional
4. Repetir ate atingir target

Registrar plano no WAL com aprovacao HITL.

---

## Tipos de Escala

### Escala Vertical (Mesmo Adset)

**Quando usar:** Winner claro, quer manter dados de aprendizado

- [ ] Aumentar máximo 20-30% por dia
- [ ] Aguardar 24-48h entre aumentos
- [ ] Monitorar CPA após aumento
- [ ] Ter fallback se CPA subir

**Critérios:**
| Métrica | Mínimo |
|---------|--------|
| ROAS | 2x+ consistente |
| Conversões | 10+/dia no adset |
| Fase | Fora do learning |

### Escala Horizontal (Duplicação)

**Quando usar:** Testar variações, diversificar risco

- [ ] Duplicar adset winner
- [ ] Manter budget igual ao original
- [ ] Testar nova audiência ou criativo
- [ ] Não duplicar mais que 3x

**Critérios:**
| Métrica | Mínimo |
|---------|--------|
| ROAS | 1.5x+ consistente |
| Dados | 500+ impressões |
| Tendência | Estável ou crescente |

### CBO (Campaign Budget Optimization)

**Quando usar:** Múltiplos winners, quer automação

- [ ] Mínimo 3 adsets validados
- [ ] Todos com ROAS positivo
- [ ] Migrar para CBO com budget total
- [ ] Monitorar distribuição do budget

**Critérios:**
| Métrica | Mínimo |
|---------|--------|
| Adsets | 3+ validados |
| ROAS médio | 2x+ |
| Variação | < 30% entre adsets |

---

## Sinais de Alerta Durante Escala

### Parar Imediatamente ❌

- CPA dobrou após 48h
- CTR caiu mais de 50%
- Frequência acima de 4
- ROAS negativo por 3 dias

### Cautela ⚠️

- CPA subiu 30-50%
- Frequência subindo rápido
- CPM aumentando
- Menos conversões proporcionalmente

### Continuar ✅

- CPA estável (variação < 20%)
- Volume aumentando proporcionalmente
- Frequência controlada
- ROAS mantendo ou melhorando

---

## Playbook de Escala

### Fase 1: Validação (R$50-100/dia)

```
Objetivo: Provar que campanha funciona
Duração: 7-14 dias
Meta: ROAS > 2x consistente
```

### Fase 2: Otimização (R$100-300/dia)

```
Objetivo: Maximizar eficiência
Duração: 14-30 dias
Meta: Identificar winners, cortar losers
```

### Fase 3: Escala Controlada (R$300-1000/dia)

```
Objetivo: Aumentar volume mantendo ROAS
Método: 20% a cada 3 dias
Meta: Dobrar faturamento
```

### Fase 4: Escala Agressiva (R$1000+/dia)

```
Objetivo: Maximizar volume
Método: Múltiplas campanhas + CBO
Meta: Dominar audiência
```

---

## Checklist de Aprovação

### Nível 1: Pode escalar 20%

- [ ] ROAS > 2x por 3 dias
- [ ] 30+ conversões na campanha
- [ ] Nenhum sinal de alerta

### Nível 2: Pode escalar 50%

- [ ] ROAS > 2.5x por 7 dias
- [ ] 100+ conversões na campanha
- [ ] Criativos diversificados
- [ ] Múltiplos tiers funcionando

### Nível 3: Pode escalar 100%+

- [ ] ROAS > 3x consistente
- [ ] 500+ conversões histórico
- [ ] Infraestrutura validada
- [ ] Pipeline de criativos ativo
- [ ] Múltiplas campanhas testadas

---

_Checklist: Scaling Readiness | @media-buyer-squad_
