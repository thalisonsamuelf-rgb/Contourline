# Task: Elicit Operations

```yaml
task:
  id: elicit-operations
  name: Elicitação de Estrutura Operacional
  agent: coo-orchestrator
  elicit: true
```

## Descrição

O COO (Operations Orchestrator) conduz elicitação para definir estrutura operacional, processos e configuração geral do workspace.

## Workflow

### Fase 1: Estrutura da Empresa

```yaml
elicitation:
  questions:
    - id: company_stage
      text: "Em qual estágio está a empresa? (ideia, MVP, growth, scale)"
      required: true

    - id: team_size
      text: "Qual o tamanho atual do time?"
      required: true

    - id: departments
      text: "Quais áreas/departamentos existem?"
      required: true
```

### Fase 2: Produtos

```yaml
elicitation:
  questions:
    - id: products
      text: "Quais produtos a empresa oferece? (liste todos)"
      required: true

    - id: main_product
      text: "Qual é o produto principal/carro-chefe?"
      required: true

    - id: product_stage
      text: "Em qual estágio cada produto está?"
      required: false
```

### Fase 3: Processos

```yaml
elicitation:
  questions:
    - id: workflows
      text: "Quais são os principais workflows da empresa?"
      required: true

    - id: tools
      text: "Quais ferramentas vocês usam? (Notion, Slack, etc)"
      required: false

    - id: cadence
      text: "Qual a cadência de reuniões/rituais?"
      required: false
```

### Fase 4: Output

**workspace/config.md:**
```markdown
# Configuração do Workspace

## Empresa

- **Estágio:** {company_stage}
- **Tamanho do Time:** {team_size}
- **Áreas:** {departments}

## Produtos

### Principal
{main_product}

### Todos os Produtos
{products}

### Estágios
{product_stage}

## Operações

### Workflows Principais
{workflows}

### Ferramentas
{tools}

### Cadência
{cadence}

---

*Gerado via Squad C-Level (COO) em {date}*
```

## Validação

- [ ] Estrutura da empresa documentada
- [ ] Produtos listados
- [ ] Processos identificados
- [ ] Arquivo salvo em `workspace/config.md`
