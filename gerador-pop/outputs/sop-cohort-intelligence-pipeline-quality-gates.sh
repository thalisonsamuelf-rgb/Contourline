#!/usr/bin/env bash
# =============================================================================
# Pipeline Quality Gates — SOP-CI-001 v1.1.0
# =============================================================================
# Executa todos os quality gates do pipeline Cohort Intelligence.
# Usage: ./pipeline-quality-gates.sh <gate> <cohort> [slug]
#
# Gates: qg-001, qg-002, qg-003, qg-004, qg-005, qg-006, qg-final, all
# Example: ./pipeline-quality-gates.sh qg-001 psa2
#          ./pipeline-quality-gates.sh all psa2 psa2
# =============================================================================

set -euo pipefail

GATE="${1:-}"
COHORT="${2:-}"
SLUG="${3:-$COHORT}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

pass() { echo -e "${GREEN}PASS${NC}: $1"; }
fail() { echo -e "${RED}FAIL${NC}: $1"; FAILURES=$((FAILURES + 1)); }
warn() { echo -e "${YELLOW}WARN${NC}: $1"; }

FAILURES=0

usage() {
  echo "Usage: $0 <gate> <cohort> [slug]"
  echo "Gates: qg-001, qg-002, qg-003, qg-004, qg-005, qg-006, qg-final, all"
  exit 1
}

[ -z "$GATE" ] || [ -z "$COHORT" ] && usage

# ---------------------------------------------------------------------------
# QG-001: Transcript Ready
# ---------------------------------------------------------------------------
qg_001() {
  echo "=== QG-001: Transcript Ready ==="
  local FILE="calls/transcripts/${COHORT}-clean.md"

  if [ ! -f "$FILE" ]; then
    fail "Transcript limpo não encontrado: $FILE"
    return
  fi
  pass "Arquivo existe"

  local WORDS
  WORDS=$(wc -w < "$FILE")
  if [ "$WORDS" -gt 1000 ]; then
    pass "Word count: $WORDS (> 1000)"
  else
    fail "Transcript muito curto: $WORDS palavras (DEVE ser > 1000)"
  fi

  local SPEAKERS
  SPEAKERS=$(grep -c "^### " "$FILE" || true)
  if [ "$SPEAKERS" -gt 1 ]; then
    pass "Speakers: $SPEAKERS (>= 2)"
  else
    fail "Speakers insuficientes: $SPEAKERS (DEVE ser >= 2)"
  fi

  if grep -q "[0-9]:[0-9][0-9]" "$FILE"; then
    pass "Timestamps presentes"
  else
    warn "Timestamps ausentes — qualidade degradada"
  fi
  echo ""
}

# ---------------------------------------------------------------------------
# QG-002: Extraction Complete
# ---------------------------------------------------------------------------
qg_002() {
  echo "=== QG-002: Extraction Complete ==="
  local FILE="calls/summaries/${COHORT}-insights-extraction.md"
  local TRANSCRIPT="calls/transcripts/${COHORT}-clean.md"

  if [ ! -f "$FILE" ]; then
    fail "Arquivo de extração não encontrado: $FILE"
    return
  fi
  pass "Arquivo existe"

  if [ -f "$TRANSCRIPT" ]; then
    local T_SPEAKERS E_SPEAKERS
    T_SPEAKERS=$(grep -c "^### " "$TRANSCRIPT" || true)
    E_SPEAKERS=$(grep -c "^### " "$FILE" || true)
    if [ "$E_SPEAKERS" -ge "$T_SPEAKERS" ]; then
      pass "Speakers: $E_SPEAKERS / $T_SPEAKERS (100%)"
    else
      fail "Speakers faltando: $E_SPEAKERS / $T_SPEAKERS"
    fi
  fi

  local TABLES
  TABLES=$(grep -c "^| [0-9]" "$FILE" || true)
  if [ "$TABLES" -gt 10 ]; then
    pass "Insights extraídos: $TABLES (> 10)"
  else
    fail "Poucos insights: $TABLES (DEVE ser > 10)"
  fi

  if grep -q "## Mapa de Temas" "$FILE"; then
    pass "Seção de temas presente"
  else
    fail "Seção 'Mapa de Temas' ausente"
  fi

  if grep -qE "## Ac[oõ]es Sugeridas" "$FILE"; then
    pass "Seção de ações presente"
  else
    warn "Seção de ações ausente"
  fi
  echo ""
}

# ---------------------------------------------------------------------------
# QG-003: Racional Complete
# ---------------------------------------------------------------------------
qg_003() {
  echo "=== QG-003: Racional Complete ==="
  local FILE="calls/summaries/${COHORT}-racional-tecnico.md"
  local EXTRACTION="calls/summaries/${COHORT}-insights-extraction.md"

  if [ ! -f "$FILE" ]; then
    fail "Racional não encontrado: $FILE"
    return
  fi
  pass "Arquivo existe"

  if [ -f "$EXTRACTION" ]; then
    local E_TOPICS R_TOPICS COVERAGE
    E_TOPICS=$(grep -cE "^###? T[oó]pico:" "$EXTRACTION" || echo 1)
    R_TOPICS=$(grep -cE "^####? T[oó]pico:" "$FILE" || true)
    COVERAGE=$((R_TOPICS * 100 / E_TOPICS))
    if [ "$COVERAGE" -ge 70 ]; then
      pass "Cobertura de tópicos: $COVERAGE% (>= 70%)"
    else
      fail "Cobertura baixa: $COVERAGE% (DEVE ser >= 70%)"
    fi
  fi

  if grep -qE "## S[ií]ntese" "$FILE"; then
    pass "Tabela de síntese presente"
  else
    fail "Tabela de síntese ausente"
  fi

  local DEPTH
  DEPTH=$(grep -ci "arquitetura\|pattern\|principio\|princípio\|design\|sistema\|framework" "$FILE" || true)
  if [ "$DEPTH" -gt 20 ]; then
    pass "Profundidade técnica: $DEPTH termos (> 20)"
  else
    warn "Análise pode estar rasa: $DEPTH termos técnicos"
  fi
  echo ""
}

# ---------------------------------------------------------------------------
# QG-004: Data Files Compile
# ---------------------------------------------------------------------------
qg_004() {
  echo "=== QG-004: Data Files Compile ==="
  local DIR="apps/ps-hub/cohorts/${SLUG}/data"

  for FILE in stats.ts participants.ts deep-dives.ts themes.ts actions.ts racional-tecnico.ts index.ts; do
    if [ -f "$DIR/$FILE" ]; then
      pass "$FILE existe"
    else
      fail "Faltando: $DIR/$FILE"
    fi
  done

  if cd apps/ps-hub && npx tsc --noEmit 2>/dev/null; then
    pass "TypeScript compila sem erros"
  else
    fail "Compilação TypeScript falhou"
  fi
  cd - > /dev/null 2>&1

  local EXPORTS
  EXPORTS=$(grep -c "^export" "$DIR/index.ts" 2>/dev/null || true)
  if [ "$EXPORTS" -ge 6 ]; then
    pass "Barrel exports: $EXPORTS (>= 6)"
  else
    fail "Exports incompletos: $EXPORTS (DEVE ser >= 6)"
  fi
  echo ""
}

# ---------------------------------------------------------------------------
# QG-005: Dashboard Builds
# ---------------------------------------------------------------------------
qg_005() {
  echo "=== QG-005: Dashboard Builds ==="

  if [ ! -d "apps/ps-hub/cohorts/${SLUG}" ]; then
    fail "Diretório do cohort não encontrado"
    return
  fi
  pass "Diretório existe"

  if cd apps/ps-hub && pnpm run build > /dev/null 2>&1; then
    pass "Build passou"
  else
    fail "Build falhou"
  fi
  cd - > /dev/null 2>&1

  if [ -f "apps/ps-hub/dist/index.html" ]; then
    pass "dist/index.html existe"
  else
    fail "Build output ausente"
  fi
  echo ""
}

# ---------------------------------------------------------------------------
# QG-006: Deploy Success
# ---------------------------------------------------------------------------
qg_006() {
  echo "=== QG-006: Deploy Success ==="
  local URL="${DEPLOY_URL:-}"

  if [ -z "$URL" ]; then
    warn "DEPLOY_URL não definida. Defina: export DEPLOY_URL=https://..."
    return
  fi

  local HTTP_CODE
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${URL}/${SLUG}" 2>/dev/null || echo "000")
  if [ "$HTTP_CODE" -eq 200 ]; then
    pass "HTTP $HTTP_CODE na rota /${SLUG}"
  else
    fail "HTTP $HTTP_CODE (DEVE ser 200)"
  fi

  local CONTENT_LENGTH
  CONTENT_LENGTH=$(curl -s "${URL}/${SLUG}" 2>/dev/null | wc -c)
  if [ "$CONTENT_LENGTH" -gt 1000 ]; then
    pass "Conteúdo: $CONTENT_LENGTH bytes (> 1000)"
  else
    fail "Página parece em branco: $CONTENT_LENGTH bytes"
  fi
  echo ""
}

# ---------------------------------------------------------------------------
# QG-FINAL: Completude Cross-check
# ---------------------------------------------------------------------------
qg_final() {
  echo "=== QG-FINAL: Completude Cross-check ==="
  local EXTRACTION="calls/summaries/${COHORT}-insights-extraction.md"
  local PARTICIPANTS_TS="apps/ps-hub/cohorts/${SLUG}/data/participants.ts"

  if [ ! -f "$EXTRACTION" ] || [ ! -f "$PARTICIPANTS_TS" ]; then
    fail "Arquivos necessários não encontrados para cross-check"
    return
  fi

  local SOURCE_INSIGHTS APP_INSIGHTS COMPLETENESS
  SOURCE_INSIGHTS=$(grep -c "^| [0-9]" "$EXTRACTION" || echo 1)
  APP_INSIGHTS=$(grep -c "content:" "$PARTICIPANTS_TS" || true)
  COMPLETENESS=$((APP_INSIGHTS * 100 / SOURCE_INSIGHTS))

  echo "Source insights: $SOURCE_INSIGHTS"
  echo "App insights: $APP_INSIGHTS"
  echo "Completude: $COMPLETENESS%"

  if [ "$COMPLETENESS" -ge 95 ]; then
    pass "Completude: $COMPLETENESS% (>= 95%)"
  else
    fail "Completude: $COMPLETENESS% (DEVE ser >= 95%)"
  fi
  echo ""
}

# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------
echo "============================================"
echo "Pipeline Quality Gates — SOP-CI-001 v1.1.0"
echo "Cohort: $COHORT | Slug: $SLUG"
echo "============================================"
echo ""

case "$GATE" in
  qg-001) qg_001 ;;
  qg-002) qg_002 ;;
  qg-003) qg_003 ;;
  qg-004) qg_004 ;;
  qg-005) qg_005 ;;
  qg-006) qg_006 ;;
  qg-final) qg_final ;;
  all)
    qg_001
    qg_002
    qg_003
    qg_004
    qg_005
    qg_006
    qg_final
    ;;
  *) usage ;;
esac

echo "============================================"
if [ "$FAILURES" -eq 0 ]; then
  echo -e "${GREEN}RESULTADO: ALL PASS${NC}"
  exit 0
else
  echo -e "${RED}RESULTADO: $FAILURES FAILURE(S)${NC}"
  exit 1
fi
