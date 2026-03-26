---
name: rdstation-integration
description: >
  Integração direta com RD Station CRM e Marketing da Contourline. Use esta skill SEMPRE que o usuário pedir qualquer coisa relacionada a: leads, contatos, negociações, oportunidades, funil de vendas, campanhas de marketing, métricas do RD Station, pipeline, vendedores, desempenho comercial, ou qualquer consulta que envolva dados do CRM ou Marketing. Também use quando o usuário mencionar "RD Station", "RD", "CRM", "leads", "funil", "negociações", "oportunidades", "pipeline", "ultrapulse", "lumenis", ou qualquer equipamento/produto da Contourline em contexto de vendas. Use inclusive quando o usuário pedir relatórios de vendas, análises de performance comercial, ou quiser criar/atualizar registros no CRM.
---

# RD Station Integration — Contourline

## Visão Geral

Esta skill permite acesso direto aos dados do RD Station CRM e Marketing da Contourline via API. Você consegue consultar, criar e atualizar registros sem que o usuário precise sair da conversa.

## Arquitetura de Acesso

O acesso à API do RD Station funciona de duas formas, dependendo do ambiente:

### Método 1: Via Browser (preferido no Cowork)

As APIs `api.rd.services` e `plugcrm.net` são bloqueadas pelo proxy de rede do ambiente Cowork. A solução é usar o navegador Chrome (Claude in Chrome) para fazer as chamadas de API via JavaScript. O domínio `crm.rdstation.com` permite chamadas fetch para `/api/v1/` quando já estamos navegando nele.

**Passo a passo:**

1. Navegue para `https://crm.rdstation.com` no Chrome (o usuário provavelmente já estará logado)
2. Execute chamadas `fetch('/api/v1/...')` via `javascript_tool`
3. Armazene resultados em `window._variavel` e leia na sequência

**Padrão de código para consultas CRM via browser:**

```javascript
fetch('/api/v1/deals?token=TOKEN_CRM&limit=200&page=1&name=BUSCA')
  .then(r => r.json())
  .then(data => { window._resultado = JSON.stringify(data); })
  .catch(e => { window._resultado = JSON.stringify({error: e.message}); });
```

Espere 3-5 segundos e depois leia `window._resultado`.

**Para a API do Marketing via browser**, primeiro navegue para `https://api.rd.services` e faça o fetch de lá (mesmo domínio resolve o CORS).

### Método 2: Via Script Python (quando o usuário roda localmente)

O script `rdstation_integration.py` está na pasta de Marketing do usuário e pode ser rodado no computador dele. Usa a biblioteca `rdstation-python` (pip install rdstation-python).

## Credenciais

Leia o arquivo `references/credentials.md` para obter os tokens atuais. Nunca exponha as credenciais diretamente na conversa — use-as internamente nas chamadas de API.

## Endpoints do CRM

A API do CRM usa autenticação por token via query parameter: `?token=TOKEN_CRM`

Base URL (via browser no domínio do CRM): `/api/v1/`

### Consultas (GET)

| Endpoint | Descrição | Parâmetros úteis |
|---|---|---|
| `/api/v1/deals` | Listar negociações | `limit`, `page`, `name`, `win` (true/false/null), `deal_stage_id`, `user_id` |
| `/api/v1/contacts` | Listar contatos | `limit`, `page`, `query` (busca por nome), `email` |
| `/api/v1/organizations` | Listar empresas | `limit`, `page`, `query` |
| `/api/v1/deal_stages` | Etapas do funil | `limit`, `page` |
| `/api/v1/deal_pipelines` | Funis de vendas | — |
| `/api/v1/deal_sources` | Fontes de negócio | — |
| `/api/v1/users` | Vendedores/usuários | — |
| `/api/v1/custom_fields` | Campos personalizados | `option` (contact/deal/organization) |
| `/api/v1/tasks` | Tarefas | `limit`, `page`, `done` (true/false) |

### Criação/Atualização (POST/PUT)

| Endpoint | Método | Descrição |
|---|---|---|
| `/api/v1/contacts` | POST | Criar contato |
| `/api/v1/contacts/:id` | PUT | Atualizar contato |
| `/api/v1/deals` | POST | Criar negociação |
| `/api/v1/deals/:id` | PUT | Atualizar negociação |
| `/api/v1/tasks` | POST | Criar tarefa |

### Paginação

A API retorna `has_more: true` e `next_page: "cursor_string"` quando há mais resultados. Para paginar, adicione `&page=CURSOR` na próxima requisição. O limite máximo por página é 200.

### Filtros comuns para deals

- Por nome do lead/produto: `&name=ultrapulse`
- Só negociações abertas: `&win=null`
- Só ganhas: `&win=true`
- Só perdidas: `&win=false`
- Por vendedor: `&user_id=ID_DO_VENDEDOR`
- Por etapa do funil: `&deal_stage_id=ID_DA_ETAPA`

### Filtro por data

A API do CRM não tem filtro direto por data. Para filtrar por período, busque os registros e filtre no JavaScript pelo campo `created_at` (formato ISO 8601: `2026-03-01T00:00:00.000-03:00`).

Padrão para filtrar março 2026:
```javascript
deals.filter(d => (d.created_at || '').startsWith('2026-03'))
```

## Endpoints do Marketing

A API do Marketing usa OAuth2. O access_token vai no header `Authorization: Bearer TOKEN`.

Base URL: `https://api.rd.services/platform/`

| Endpoint | Descrição |
|---|---|
| `GET /platform/contacts/email:EMAIL` | Buscar contato por email |
| `GET /platform/contacts/fields` | Listar campos de contato |
| `PATCH /platform/contacts/email:EMAIL` | Atualizar contato |
| `POST /platform/events` | Criar evento (conversão, oportunidade, venda) |
| `GET /platform/analytics/conversions` | Métricas de conversão |
| `GET /platform/webhooks` | Listar webhooks |

O access_token expira em 24 horas. Para renovar, use o refresh_token fazendo POST para `/auth/token` com `grant_type: refresh_token`.

## Estrutura dos dados de uma negociação (deal)

Os campos mais importantes retornados pela API:

```
_id / id: identificador único
name: nome da negociação (geralmente "NOME DO LEAD | PRODUTO")
amount_total: valor total em centavos (dividir por 100 para reais)
created_at: data de criação
updated_at: última atualização
win: true (ganha), false (perdida), null (aberta)
rating: temperatura 1-5 estrelas
user: { name, email } — vendedor responsável
deal_stage: { name } — etapa atual do funil
organization: { name } — empresa associada
```

O campo `amount_total` está em centavos. Para exibir em reais: `(amount_total / 100).toLocaleString('pt-BR')`.

## Padrão da Contourline para nomes de negociações

A Contourline usa o padrão: `NOME DO LEAD | PRODUTO`

Exemplos:
- `CAROLINA COSTA | ULTRAPULSE ALPHA`
- `JULIANA RUTHES | ULTRAPULSE`
- `FERNANDA | STELLAR M22`

Para buscar por produto, use o parâmetro `name` com o nome do produto. Para separar variantes (ex: "ULTRAPULSE" vs "ULTRAPULSE ALPHA"), filtre no JavaScript usando `.includes('ALPHA')`.

## Vendedores conhecidos

Ao listar resultados, inclua o nome do vendedor responsável. A equipe comercial pode ser consultada via `/api/v1/users`.

## Boas práticas

1. **Sempre mostre resultados em formato de tabela** quando listar múltiplos registros — é mais fácil de ler
2. **Converta valores de centavos para reais** antes de exibir
3. **Use datas no formato brasileiro** (DD/MM/AAAA) nas respostas
4. **Para relatórios**, ofereça exportar como planilha (.xlsx)
5. **Se o token expirar**, oriente o usuário a renovar via browser ou informe que precisa gerar um novo
6. **Paginação**: se `has_more` for true, continue buscando até ter todos os resultados relevantes
7. **Ao criar registros**, sempre peça confirmação do usuário antes de executar a chamada POST
