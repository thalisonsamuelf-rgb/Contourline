# Task: Bootstrap

```yaml
task:
  id: bootstrap
  name: Bootstrap do Workspace
  agent: coo-orchestrator
  elicit: true
  required: true
  order: 1
```

## Descrição

Primeira task obrigatória do Squad C-Level. Cria o arquivo `workspace/user.md` com informações básicas do usuário e estrutura inicial do workspace.

**IMPORTANTE:** Esta task deve ser executada ANTES de qualquer outra task do squad.

## Workflow

### Fase 1: Verificar se workspace já existe

```bash
ls workspace/ 2>/dev/null
```

Se existir, perguntar se quer reinicializar ou apenas atualizar user.md.

### Fase 2: Coleta de Informações do Usuário

```yaml
elicitation:
  questions:
    - id: name
      text: "Qual é o seu nome completo?"
      required: true
    - id: preferred_name
      text: "Como você prefere ser chamado?"
      required: true
    - id: role
      text: "Qual é o seu papel? (founder, funcionário, freelancer)"
      required: true
    - id: area
      text: "Qual é sua área de atuação principal?"
      required: true
    - id: communication_tone
      text: "Prefere comunicação formal ou casual?"
      required: false
      default: "casual"
    - id: language
      text: "Idioma preferido?"
      required: false
      default: "pt-BR"
```

### Fase 3: Criação da Estrutura

1. Criar diretório `workspace/` se não existir
2. Criar subdiretórios:
   - `workspace/businesses/` (para múltiplos negócios)
   - `workspace/ui/tokens/`
   - `workspace/ui/components/`
   - `workspace/ui/styles/`
3. Criar `workspace/user.md` com as informações coletadas
4. Criar `workspace/config.md` com configuração inicial

### Fase 4: Output - user.md

```markdown
# User Profile

## Identidade
- **Nome:** {name}
- **Como chamar:** {preferred_name}

## Contexto Profissional
- **Área:** {area}
- **Papel:** {role}

## Preferências
- **Tom de comunicação:** {communication_tone}
- **Idioma:** {language}

---
*Este arquivo é referenciado por todos os agentes para personalizar interações.*
*Criado em: {date}*
*Última atualização: {date}*
```

### Fase 5: Output - config.md

```markdown
# Workspace Configuration

## Negócios
_Nenhum negócio configurado ainda. Use `*add-business {slug}` para adicionar._

## Preferências Globais
- **Idioma:** {language}
- **Formato de data:** DD/MM/YYYY
- **Fuso horário:** America/Sao_Paulo

---
*Configuração gerenciada pelo COO - Squad C-Level*
```

## Estrutura Final

```
workspace/
├── user.md              # Perfil do usuário
├── config.md            # Configuração do workspace
├── businesses/          # Múltiplos negócios
│   └── (vazio até add-business)
└── ui/                  # Design system compartilhado
    ├── tokens/
    ├── components/
    └── styles/
```

## Validação

- [ ] Diretório `workspace/` existe
- [ ] Arquivo `workspace/user.md` criado com nome do usuário
- [ ] Arquivo `workspace/config.md` criado
- [ ] Diretório `workspace/businesses/` existe
- [ ] Diretório `workspace/ui/` existe com subdiretórios

## Próximos Passos

Após bootstrap, sugerir:
1. `*add-business {slug}` - Adicionar primeiro negócio
2. `*setup-workspace` - Rodar elicitação completa (após add-business)

---

*Task do Squad C-Level - COO Orchestrator*
