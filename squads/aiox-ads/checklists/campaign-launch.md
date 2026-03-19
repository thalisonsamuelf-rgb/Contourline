# Campaign Launch Checklist

## Pré-Lançamento

### Tracking & Pixel

- [ ] Pixel instalado e disparando PageView
- [ ] Eventos configurados (VC, ATC, IC, Purchase/Lead)
- [ ] CAPI ativo e funcionando
- [ ] Match rate acima de 80%
- [ ] Teste de eventos realizado via Events Manager

### Página de Vendas

- [ ] URL carregando corretamente
- [ ] Checkout funcionando (teste de compra)
- [ ] Mobile responsive verificado
- [ ] Velocidade < 3s (PageSpeed)
- [ ] Sem erros de console

### Criativos

- [ ] Mínimo 3 criativos aprovados
- [ ] Formatos corretos (1:1, 9:16)
- [ ] Legendas/captions incluídos
- [ ] Copy variations prontas (3x)
- [ ] Headlines prontas (3x)

### Audiências

- [ ] Públicos criados e salvos
- [ ] HOT: Compradores/leads recentes
- [ ] WARM: Engajados + Visitantes
- [ ] COLD: Interesses + LALs
- [ ] Tamanhos adequados (não muito pequenos)

### Campanha

- [ ] Objetivo correto selecionado
- [ ] Otimização para evento certo
- [ ] Budget inicial definido
- [ ] Bid strategy configurada
- [ ] Posicionamentos revisados

---

## No Momento do Lançamento

### Configuração Final

- [ ] Nome da campanha padronizado
- [ ] UTMs configurados
- [ ] Atribuição correta (7-day click, 1-day view)
- [ ] Janela de conversão adequada
- [ ] Limites de gasto verificados

### Validação

- [ ] Preview dos anúncios revisado
- [ ] Links testados nos previews
- [ ] Políticas do Meta verificadas
- [ ] Budget liberado na conta

### Publicação

- [ ] Campanha ativada
- [ ] Horário de lançamento registrado
- [ ] Print da estrutura salvo
- [ ] Alerta de monitoramento configurado

---

## Pós-Lançamento (Primeiras 24h)

### Monitoramento Inicial

- [ ] Campanha aprovada (não rejeitada)
- [ ] Impressões sendo entregues
- [ ] Eventos sendo registrados
- [ ] Sem erros de entrega

### Métricas Iniciais (após 1000 impressões)

- [ ] CTR dentro do esperado (>0.5%)
- [ ] CPM dentro do benchmark
- [ ] Custo por evento razoável
- [ ] Distribuição entre adsets ok

### Documentação

- [ ] Screenshot do Ads Manager salvo
- [ ] Métricas iniciais registradas
- [ ] Observações documentadas
- [ ] Próxima revisão agendada

---

## v5.0 Addition: Definition of Done (DoD) Gate

> **Reference:** `checklists/launch-dod.md` -- ALL 8 gates MUST pass before activation
> **Enforced by:** @fiscal (Safety Officer)
> **Severity:** BLOCK (each gate individually blocks launch)

Antes de ativar qualquer campanha, o DoD gate completo deve ser executado.
Nenhum item e negociavel -- falha em qualquer gate impede publicacao.

- [ ] **Gate 1:** Campaign Status == PAUSED (API read-back confirmado)
- [ ] **Gate 2:** Pixel/CAPI validado e disparando (skill `tracking-audit`)
- [ ] **Gate 3:** Landing Page EMQ Score >= 6.0 (skill `page-analyzer`)
- [ ] **Gate 4:** Budget dentro dos limites de `safety-rules.yaml`
- [ ] **Gate 5:** Audience exclusions configuradas (compradores 30d excluidos, overlap < 60%)
- [ ] **Gate 6:** Creatives passaram compliance check (skill `ad-compliance-gate`)
- [ ] **Gate 7:** Action ledger completamente registrado (WAL sem gaps)
- [ ] **Gate 8:** Campaign state YAML atualizado (todos IDs + config registrados)

**Verificacao:** Executar `launch-dod.md` checklist completo via @fiscal. Resultado 8/8 PASS libera para ativacao.

---

## v5.0 Addition: Ban Prevention Pre-Launch

> **Reference:** `checklists/ban-prevention.md` -- Secao 1 (Pre-Automacao)
> **Enforced by:** @fiscal (Safety Officer)
> **Severity:** BLOCK (todos os 5 checks)

Estas verificacoes sao OBRIGATORIAS antes de conectar qualquer agente a conta de ads.
Devem ser validadas UMA VEZ por conta (nao por campanha), mas re-verificadas se conta mudar.

- [ ] **Check 1.1:** Business Manager verificado + identidade confirmada (badge "Verified" em Security Center)
- [ ] **Check 1.2:** 2FA habilitado em TODAS as contas conectadas (metodo primario + backup)
- [ ] **Check 1.3:** IP fixo e consistente para chamadas API (confirmar via `curl ifconfig.me`)
- [ ] **Check 1.4:** Nenhuma VPN ou proxy em uso (IP real, sem proxy HTTP/HTTPS)
- [ ] **Check 1.5:** Conta com minimo 30 dias de atividade manual (< 30 dias = automacao BLOQUEADA)

**Verificacao:** @fiscal valida cada item. Falha em qualquer check BLOCK impede qualquer operacao automatizada.

---

## v5.0 Addition: PAUSED Verification Step

> **Severity:** BLOCK
> **Reference:** `config/safety-rules.yaml` -- `paused_by_default: true`

- [ ] **Confirmar campaign status == PAUSED via API read-back antes de prosseguir**

**Descricao:** Toda campanha criada via API DEVE ter status PAUSED. A ativacao e uma acao HITL separada que so ocorre apos TODOS os gates do DoD passarem. Campanhas criadas como ACTIVE sem revisao humana sao padrao bot e trigger de moderacao da Meta.

**Verificacao:** Apos criacao da campanha, executar GET via `get_campaigns` e confirmar que campo `status` == `PAUSED`. NAO confiar em state local -- usar API como source of truth (read-back obrigatorio).

**Remediacao:** Se status != PAUSED, executar `pause-campaign` (HITL) IMEDIATAMENTE. Investigar por que campanha nao foi criada como PAUSED (violacao de `safety-rules.yaml`). Registrar incidente no WAL.

---

## v5.0 Addition: Learning Phase Awareness

> **Severity:** WARN
> **Reference:** `data/knowledge/meta/learning_phase.md`

- [ ] **Nota de Learning Phase reconhecida e documentada**

**Descricao:** Campanhas novas entram em Learning Phase -- o sistema de delivery da Meta explora a melhor combinacao de audiencia, posicionamentos e horarios. O ad set precisa de aproximadamente 50 eventos de otimizacao (conversoes) dentro de uma janela de 7 dias para sair da Learning Phase.

**Regra:** NAO modificar a campanha durante os primeiros 7 dias OU ate acumular 50+ conversoes (o que vier primeiro). Alteracoes durante Learning Phase reiniciam o processo, desperdicando budget e dados.

**Acoes proibidas durante Learning Phase:**
- Alterar budget > 20%
- Alterar targeting
- Pausar por mais de 24h
- Trocar criativos

**Verificacao:** Apos lancamento, registrar data de inicio da Learning Phase. Configurar alerta para revisar somente apos 7 dias ou 50 conversoes. Verificar status via Ads Manager ou API.

---

## Critérios de Go/No-Go

### GO (Pode lançar)

✅ Todos os itens de tracking verificados
✅ Pelo menos 3 criativos prontos
✅ Página funcionando 100%
✅ Budget aprovado

### NO-GO (Não lançar)

❌ Pixel não dispara eventos
❌ CAPI não configurado
❌ Checkout quebrado
❌ Menos de 2 criativos

---

_Checklist: Campaign Launch | @media-buyer-squad_
