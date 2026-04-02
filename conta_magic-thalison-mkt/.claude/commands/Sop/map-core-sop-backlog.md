# map-core-sop-backlog

Analisa todos os businesses do workspace, categoriza por indústria, e gera backlog priorizado de SOPs core para cada business.

---

## Quando Usar

Use quando precisar mapear quais SOPs cada business precisa, baseado na sua categoria de mercado. Gera dois arquivos por business: `sop-research-context.yaml` (contexto de pesquisa) e `sop-backlog.yaml` (backlog priorizado).

---

## Conceito

- **Processos Burros:** repetitivos, determinísticos, sem singularidade. Worker executa 80%+.
- **Processos Core (Delivery):** o que a empresa vende, o que gera receita. Criam moat competitivo.

Esta task mapeia ambos, mas prioriza os core.

---

## Execução

Este comando ativa o @sop-chief e executa a task `map-core-sop-backlog`:

1. Ativar @sop-chief (se não ativo)
2. Carregar task: `squads/aiox-sop/tasks/map-core-sop-backlog.md`
3. Seguir o workflow completo (7 fases)

### Uso

```
/AioxSop:map-core-sop-backlog
```

---

## Pipeline (7 fases)

```
Fase 1: Scan de businesses no workspace
Fase 2: Categorização por indústria/mercado
Fase 3: Research de processos core por categoria
Fase 4: Mapeamento de processos burros universais
Fase 5: Geração de sop-research-context.yaml por business
Fase 6: Geração de sop-backlog.yaml priorizado por business
Fase 7: Validação cruzada e consolidação
```

---

## Outputs (por business)

| Output | Path | Descrição |
|--------|------|-----------|
| `sop-research-context.yaml` | `workspace/businesses/{slug}/operations/` | Contexto de pesquisa da categoria |
| `sop-backlog.yaml` | `workspace/businesses/{slug}/operations/` | Backlog priorizado de SOPs |

---

## Executores

| Agente | Papel |
|--------|-------|
| @sop-chief | Orquestração |
| @analyst | Research de contexto por indústria |
| @sop-creator | Geração do backlog |

---

## Task Source

`squads/aiox-sop/tasks/map-core-sop-backlog.md`

**Estimated Time:** 2-4h (com research)
