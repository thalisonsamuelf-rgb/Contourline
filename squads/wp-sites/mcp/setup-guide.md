# WordPress MCP — Setup Guide

## Visão Geral

O squad `wp-sites` utiliza dois MCP servers complementares:

| Server | Tipo | Uso Principal |
|--------|------|---------------|
| **wordpress** (custom) | stdio / Python | CRUD de conteúdo, plugins, SEO, health checks |
| **wordpress-mcp-adapter** (plugin) | SSE / WordPress.org | Abilities de plugins third-party (WooCommerce, ACF, Elementor) |

---

## 1. Setup do MCP Server Custom

### Pré-requisitos
- Python 3.9+
- `pip install requests`
- Acesso admin ao WordPress

### Passo 1: Gerar Application Password no WordPress

1. Acesse: `WP Admin > Usuários > Seu Perfil`
2. Role até **Application Passwords**
3. Dê um nome: `AIOX MCP Server`
4. Clique em **Add New Application Password**
5. Copie a senha gerada (formato: `xxxx xxxx xxxx xxxx xxxx xxxx`)

### Passo 2: Configurar variáveis de ambiente

```bash
# Copiar template
cp tools/wp-mcp-server/.env.example tools/wp-mcp-server/.env

# Editar com seus dados
WP_URL=https://seusite.com.br
WP_USER=admin
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
```

### Passo 3: Registrar no Claude Code

Adicionar em `.claude/settings.local.json`:

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "python3",
      "args": ["tools/wp-mcp-server/server.py"],
      "env": {
        "WP_URL": "https://seusite.com.br",
        "WP_USER": "admin",
        "WP_APP_PASSWORD": "xxxx xxxx xxxx xxxx xxxx xxxx"
      }
    }
  }
}
```

### Passo 4: Testar

```bash
# Testar manualmente
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' | \
  WP_URL=https://seusite.com.br \
  WP_USER=admin \
  WP_APP_PASSWORD="xxxx xxxx xxxx xxxx" \
  python3 tools/wp-mcp-server/server.py
```

### Passo 5: Validar no Claude Code

Pergunte ao Claude: "Liste os posts do meu site WordPress" — ele deve usar `wp_list_posts`.

---

## 2. Setup do WordPress MCP Adapter (Plugin)

### Passo 1: Instalar o plugin

```
WP Admin > Plugins > Adicionar > Buscar "WordPress MCP Adapter" > Instalar > Ativar
```

### Passo 2: Configurar abilities

```
WP Admin > Settings > MCP Adapter
```

Habilitar as abilities desejadas:
- [x] Content (posts, pages)
- [x] Plugins (ativar/desativar)
- [x] Themes (informações)
- [x] Site Settings
- [ ] WooCommerce (se instalado)
- [ ] ACF (se instalado)

### Passo 3: Gerar token MCP

Na mesma tela de settings, gerar um token de autenticação.

### Passo 4: Registrar no Claude Code

```json
{
  "mcpServers": {
    "wordpress-adapter": {
      "url": "https://seusite.com.br/wp-json/mcp/v1/sse",
      "headers": {
        "Authorization": "Bearer SEU_TOKEN_MCP"
      }
    }
  }
}
```

---

## 3. Multi-Site

Para gerenciar múltiplos sites WordPress:

```json
{
  "mcpServers": {
    "wp-site-principal": {
      "command": "python3",
      "args": ["tools/wp-mcp-server/server.py"],
      "env": {
        "WP_URL": "https://site1.com.br",
        "WP_USER": "admin",
        "WP_APP_PASSWORD": "..."
      }
    },
    "wp-site-cliente": {
      "command": "python3",
      "args": ["tools/wp-mcp-server/server.py"],
      "env": {
        "WP_URL": "https://clientesite.com.br",
        "WP_USER": "admin",
        "WP_APP_PASSWORD": "..."
      }
    }
  }
}
```

---

## 4. Troubleshooting

| Problema | Causa | Solução |
|----------|-------|---------|
| `HTTP 401` | Credenciais inválidas | Verificar WP_USER e WP_APP_PASSWORD |
| `HTTP 403` | Sem permissão | Usuário precisa ser admin |
| `Connection refused` | URL incorreta ou site offline | Verificar WP_URL |
| `REST API disabled` | REST API desabilitada | Verificar plugins de segurança que bloqueiam REST API |
| `Yoast meta vazio` | Yoast não instalado | Instalar e configurar Yoast SEO |
| `Menus 404` | Tema sem suporte | Instalar plugin WP REST API Menus |
| `Plugins endpoint 403` | Sem cap `activate_plugins` | Precisa ser admin |

---

## 5. Ferramentas Disponíveis (MCP Custom)

| Tool | Descrição |
|------|-----------|
| `wp_list_posts` | Listar posts (filtros, paginação) |
| `wp_get_post` | Buscar post por ID |
| `wp_create_post` | Criar post/página |
| `wp_update_post` | Atualizar post/página |
| `wp_delete_post` | Deletar post |
| `wp_list_pages` | Listar páginas |
| `wp_get_page` | Buscar página por ID |
| `wp_list_categories` | Listar categorias |
| `wp_list_tags` | Listar tags |
| `wp_create_category` | Criar categoria |
| `wp_create_tag` | Criar tag |
| `wp_list_media` | Listar mídia |
| `wp_get_media` | Buscar mídia por ID |
| `wp_list_plugins` | Listar plugins |
| `wp_get_plugin` | Info de plugin |
| `wp_activate_plugin` | Ativar plugin |
| `wp_deactivate_plugin` | Desativar plugin |
| `wp_get_site_info` | Info do site |
| `wp_list_users` | Listar usuários |
| `wp_list_menus` | Listar menus |
| `wp_get_settings` | Configurações do site |
| `wp_get_yoast_meta` | Metadados SEO (Yoast) |
| `wp_site_health` | Health check |

---

## Referências

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [WordPress MCP Adapter](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/)
- [Application Passwords](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/#application-passwords)
