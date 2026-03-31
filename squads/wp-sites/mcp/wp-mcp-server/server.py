#!/usr/bin/env python3
"""
=============================================================================
MCP SERVER — WORDPRESS (REST API)
Contourline | Servidor MCP para integração direta com Claude Code
=============================================================================

Protocolo: JSON-RPC 2.0 via stdio (compatível com Python 3.9+)

Ferramentas disponíveis:
  Content:
    - wp_list_posts           Listar posts (com filtros)
    - wp_get_post             Buscar post por ID
    - wp_create_post          Criar post/página
    - wp_update_post          Atualizar post/página
    - wp_delete_post          Deletar post/página
    - wp_list_pages           Listar páginas
    - wp_get_page             Buscar página por ID

  Taxonomies:
    - wp_list_categories      Listar categorias
    - wp_list_tags            Listar tags
    - wp_create_category      Criar categoria
    - wp_create_tag           Criar tag

  Media:
    - wp_list_media           Listar arquivos de mídia
    - wp_get_media            Buscar mídia por ID

  Plugins:
    - wp_list_plugins         Listar plugins instalados
    - wp_get_plugin           Buscar plugin por slug
    - wp_activate_plugin      Ativar plugin
    - wp_deactivate_plugin    Desativar plugin

  Site:
    - wp_get_site_info        Informações gerais do site
    - wp_list_users           Listar usuários
    - wp_list_menus           Listar menus de navegação
    - wp_get_settings         Obter configurações do site

  SEO (Yoast):
    - wp_get_yoast_meta       Obter metadados SEO de um post/página

  Health:
    - wp_site_health          Verificar saúde do site
=============================================================================
"""

import json
import sys
import os
import logging
import base64
from urllib.parse import urlencode, urljoin

import requests

# ===========================================================================
# CONFIGURAÇÃO
# ===========================================================================

WP_URL = os.environ.get("WP_URL", "").rstrip("/")
WP_USER = os.environ.get("WP_USER", "")
WP_APP_PASSWORD = os.environ.get("WP_APP_PASSWORD", "")

# Logging para stderr (stdout é reservado para o protocolo MCP)
logging.basicConfig(
    level=logging.INFO,
    format="[WordPress MCP] %(levelname)s: %(message)s",
    stream=sys.stderr,
)
log = logging.getLogger(__name__)

# Suprimir warnings do urllib3/SSL
import warnings
warnings.filterwarnings("ignore")


# ===========================================================================
# API HELPERS
# ===========================================================================

def wp_auth_header():
    """Gera header de autenticação Basic para Application Passwords."""
    credentials = f"{WP_USER}:{WP_APP_PASSWORD}"
    token = base64.b64encode(credentials.encode()).decode()
    return {"Authorization": f"Basic {token}"}


def wp_request(method, endpoint, params=None, data=None):
    """Faz uma requisição à WordPress REST API."""
    url = f"{WP_URL}/wp-json/wp/v2/{endpoint}"
    headers = {
        **wp_auth_header(),
        "Content-Type": "application/json",
    }

    try:
        if method == "GET":
            resp = requests.get(url, headers=headers, params=params or {}, timeout=30, verify=True)
        elif method == "POST":
            resp = requests.post(url, headers=headers, json=data, timeout=30, verify=True)
        elif method == "PUT":
            resp = requests.put(url, headers=headers, json=data, timeout=30, verify=True)
        elif method == "DELETE":
            resp = requests.delete(url, headers=headers, params=params or {}, timeout=30, verify=True)
        else:
            return {"error": f"Método {method} não suportado"}

        # Incluir headers de paginação quando disponíveis
        result = resp.json() if resp.text else {"status": "ok"}

        if resp.status_code >= 400:
            return {"error": f"HTTP {resp.status_code}", "body": resp.text}

        # Adicionar metadados de paginação em listagens
        if isinstance(result, list):
            total = resp.headers.get("X-WP-Total")
            total_pages = resp.headers.get("X-WP-TotalPages")
            return {
                "items": result,
                "total": int(total) if total else len(result),
                "total_pages": int(total_pages) if total_pages else 1,
            }

        return result
    except Exception as e:
        return {"error": str(e)}


def wp_request_plugins(method, endpoint, params=None, data=None):
    """Requisição para a API de plugins (namespace diferente)."""
    url = f"{WP_URL}/wp-json/wp/v2/plugins/{endpoint}" if endpoint else f"{WP_URL}/wp-json/wp/v2/plugins"
    headers = {
        **wp_auth_header(),
        "Content-Type": "application/json",
    }

    try:
        if method == "GET":
            resp = requests.get(url, headers=headers, params=params or {}, timeout=30, verify=True)
        elif method == "POST":
            resp = requests.post(url, headers=headers, json=data, timeout=30, verify=True)
        elif method == "PUT":
            resp = requests.put(url, headers=headers, json=data, timeout=30, verify=True)
        else:
            return {"error": f"Método {method} não suportado"}

        if resp.status_code >= 400:
            return {"error": f"HTTP {resp.status_code}", "body": resp.text}

        return resp.json() if resp.text else {"status": "ok"}
    except Exception as e:
        return {"error": str(e)}


# ===========================================================================
# DEFINIÇÃO DAS FERRAMENTAS (TOOLS)
# ===========================================================================

TOOLS = [
    # === CONTENT: POSTS ===
    {
        "name": "wp_list_posts",
        "description": "Lista posts do WordPress com filtros. Suporta paginação, busca, filtro por categoria/tag/status/autor.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page": {"type": "integer", "description": "Página (default: 1)", "default": 1},
                "per_page": {"type": "integer", "description": "Posts por página (max 100)", "default": 10},
                "search": {"type": "string", "description": "Buscar por termo"},
                "status": {"type": "string", "description": "Filtrar: publish, draft, pending, private, future", "default": "publish"},
                "categories": {"type": "string", "description": "IDs de categorias (separados por vírgula)"},
                "tags": {"type": "string", "description": "IDs de tags (separados por vírgula)"},
                "author": {"type": "integer", "description": "ID do autor"},
                "orderby": {"type": "string", "description": "Ordenar: date, title, modified, relevance", "default": "date"},
                "order": {"type": "string", "description": "asc ou desc", "default": "desc"},
            },
        },
    },
    {
        "name": "wp_get_post",
        "description": "Busca um post específico por ID. Retorna título, conteúdo, excerpt, status, categorias, tags, autor, datas.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "post_id": {"type": "integer", "description": "ID do post"},
            },
            "required": ["post_id"],
        },
    },
    {
        "name": "wp_create_post",
        "description": "Cria um novo post ou página no WordPress.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "title": {"type": "string", "description": "Título do post"},
                "content": {"type": "string", "description": "Conteúdo HTML do post"},
                "status": {"type": "string", "description": "Status: publish, draft, pending, private", "default": "draft"},
                "excerpt": {"type": "string", "description": "Resumo do post"},
                "categories": {"type": "array", "items": {"type": "integer"}, "description": "IDs das categorias"},
                "tags": {"type": "array", "items": {"type": "integer"}, "description": "IDs das tags"},
                "slug": {"type": "string", "description": "URL slug personalizado"},
                "featured_media": {"type": "integer", "description": "ID da imagem destacada"},
                "meta": {"type": "object", "description": "Campos meta personalizados"},
            },
            "required": ["title"],
        },
    },
    {
        "name": "wp_update_post",
        "description": "Atualiza um post existente. Pode alterar título, conteúdo, status, categorias, tags, etc.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "post_id": {"type": "integer", "description": "ID do post"},
                "title": {"type": "string", "description": "Novo título"},
                "content": {"type": "string", "description": "Novo conteúdo HTML"},
                "status": {"type": "string", "description": "Novo status"},
                "excerpt": {"type": "string", "description": "Novo resumo"},
                "categories": {"type": "array", "items": {"type": "integer"}},
                "tags": {"type": "array", "items": {"type": "integer"}},
                "slug": {"type": "string", "description": "Novo slug"},
                "featured_media": {"type": "integer", "description": "ID da nova imagem destacada"},
                "meta": {"type": "object", "description": "Campos meta atualizados"},
            },
            "required": ["post_id"],
        },
    },
    {
        "name": "wp_delete_post",
        "description": "Deleta um post. Use force=true para excluir permanentemente (sem lixeira).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "post_id": {"type": "integer", "description": "ID do post"},
                "force": {"type": "boolean", "description": "Excluir permanentemente (default: false)", "default": False},
            },
            "required": ["post_id"],
        },
    },

    # === CONTENT: PAGES ===
    {
        "name": "wp_list_pages",
        "description": "Lista páginas do WordPress. Suporta paginação, busca e filtro por status.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page": {"type": "integer", "default": 1},
                "per_page": {"type": "integer", "default": 10},
                "search": {"type": "string", "description": "Buscar por termo"},
                "status": {"type": "string", "default": "publish"},
                "parent": {"type": "integer", "description": "ID da página pai (para hierarquia)"},
                "orderby": {"type": "string", "default": "menu_order"},
                "order": {"type": "string", "default": "asc"},
            },
        },
    },
    {
        "name": "wp_get_page",
        "description": "Busca uma página específica por ID.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page_id": {"type": "integer", "description": "ID da página"},
            },
            "required": ["page_id"],
        },
    },

    # === TAXONOMIES ===
    {
        "name": "wp_list_categories",
        "description": "Lista todas as categorias do site.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page": {"type": "integer", "default": 1},
                "per_page": {"type": "integer", "default": 100},
                "search": {"type": "string"},
                "parent": {"type": "integer", "description": "ID da categoria pai"},
                "hide_empty": {"type": "boolean", "default": False},
            },
        },
    },
    {
        "name": "wp_list_tags",
        "description": "Lista todas as tags do site.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page": {"type": "integer", "default": 1},
                "per_page": {"type": "integer", "default": 100},
                "search": {"type": "string"},
                "hide_empty": {"type": "boolean", "default": False},
            },
        },
    },
    {
        "name": "wp_create_category",
        "description": "Cria uma nova categoria.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Nome da categoria"},
                "slug": {"type": "string", "description": "Slug (URL amigável)"},
                "description": {"type": "string"},
                "parent": {"type": "integer", "description": "ID da categoria pai"},
            },
            "required": ["name"],
        },
    },
    {
        "name": "wp_create_tag",
        "description": "Cria uma nova tag.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Nome da tag"},
                "slug": {"type": "string"},
                "description": {"type": "string"},
            },
            "required": ["name"],
        },
    },

    # === MEDIA ===
    {
        "name": "wp_list_media",
        "description": "Lista arquivos de mídia (imagens, vídeos, documentos).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page": {"type": "integer", "default": 1},
                "per_page": {"type": "integer", "default": 10},
                "search": {"type": "string"},
                "media_type": {"type": "string", "description": "Tipo: image, video, audio, application"},
            },
        },
    },
    {
        "name": "wp_get_media",
        "description": "Busca detalhes de um arquivo de mídia por ID.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "media_id": {"type": "integer", "description": "ID da mídia"},
            },
            "required": ["media_id"],
        },
    },

    # === PLUGINS ===
    {
        "name": "wp_list_plugins",
        "description": "Lista todos os plugins instalados com status (ativo/inativo).",
        "inputSchema": {"type": "object", "properties": {}},
    },
    {
        "name": "wp_get_plugin",
        "description": "Busca informações de um plugin específico pelo slug (ex: 'yoast-seo/wp-seo').",
        "inputSchema": {
            "type": "object",
            "properties": {
                "plugin_slug": {"type": "string", "description": "Slug do plugin (ex: akismet/akismet)"},
            },
            "required": ["plugin_slug"],
        },
    },
    {
        "name": "wp_activate_plugin",
        "description": "Ativa um plugin pelo slug.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "plugin_slug": {"type": "string", "description": "Slug do plugin"},
            },
            "required": ["plugin_slug"],
        },
    },
    {
        "name": "wp_deactivate_plugin",
        "description": "Desativa um plugin pelo slug.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "plugin_slug": {"type": "string", "description": "Slug do plugin"},
            },
            "required": ["plugin_slug"],
        },
    },

    # === SITE INFO ===
    {
        "name": "wp_get_site_info",
        "description": "Retorna informações gerais do site: nome, descrição, URL, timezone, versão do WP.",
        "inputSchema": {"type": "object", "properties": {}},
    },
    {
        "name": "wp_list_users",
        "description": "Lista usuários do site com roles.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page": {"type": "integer", "default": 1},
                "per_page": {"type": "integer", "default": 10},
                "roles": {"type": "string", "description": "Filtrar por role: administrator, editor, author, subscriber"},
            },
        },
    },
    {
        "name": "wp_list_menus",
        "description": "Lista menus de navegação registrados.",
        "inputSchema": {"type": "object", "properties": {}},
    },
    {
        "name": "wp_get_settings",
        "description": "Retorna configurações do site (título, descrição, timezone, formato de data, etc).",
        "inputSchema": {"type": "object", "properties": {}},
    },

    # === SEO (Yoast) ===
    {
        "name": "wp_get_yoast_meta",
        "description": "Obtém metadados SEO (Yoast) de um post/página: title, description, focus keyword, readability score.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "post_id": {"type": "integer", "description": "ID do post/página"},
                "post_type": {"type": "string", "description": "Tipo: posts ou pages", "default": "posts"},
            },
            "required": ["post_id"],
        },
    },

    # === HEALTH ===
    {
        "name": "wp_site_health",
        "description": "Verifica a saúde do site: conectividade, versão WP, plugins ativos, tema ativo.",
        "inputSchema": {"type": "object", "properties": {}},
    },
]


# ===========================================================================
# HANDLERS DAS FERRAMENTAS
# ===========================================================================

def handle_tool_call(name, arguments):
    """Executa a ferramenta e retorna o resultado."""
    args = arguments or {}

    # === CONTENT: POSTS ===
    if name == "wp_list_posts":
        params = {}
        for key in ["page", "per_page", "search", "status", "categories", "tags", "author", "orderby", "order"]:
            if args.get(key) is not None:
                params[key] = args[key]
        return wp_request("GET", "posts", params=params)

    elif name == "wp_get_post":
        return wp_request("GET", f"posts/{args['post_id']}")

    elif name == "wp_create_post":
        data = {}
        for key in ["title", "content", "status", "excerpt", "categories", "tags", "slug", "featured_media", "meta"]:
            if args.get(key) is not None:
                data[key] = args[key]
        return wp_request("POST", "posts", data=data)

    elif name == "wp_update_post":
        post_id = args.pop("post_id")
        return wp_request("PUT", f"posts/{post_id}", data=args)

    elif name == "wp_delete_post":
        params = {}
        if args.get("force"):
            params["force"] = "true"
        return wp_request("DELETE", f"posts/{args['post_id']}", params=params)

    # === CONTENT: PAGES ===
    elif name == "wp_list_pages":
        params = {}
        for key in ["page", "per_page", "search", "status", "parent", "orderby", "order"]:
            if args.get(key) is not None:
                params[key] = args[key]
        return wp_request("GET", "pages", params=params)

    elif name == "wp_get_page":
        return wp_request("GET", f"pages/{args['page_id']}")

    # === TAXONOMIES ===
    elif name == "wp_list_categories":
        params = {}
        for key in ["page", "per_page", "search", "parent", "hide_empty"]:
            if args.get(key) is not None:
                params[key] = args[key]
        return wp_request("GET", "categories", params=params)

    elif name == "wp_list_tags":
        params = {}
        for key in ["page", "per_page", "search", "hide_empty"]:
            if args.get(key) is not None:
                params[key] = args[key]
        return wp_request("GET", "tags", params=params)

    elif name == "wp_create_category":
        data = {}
        for key in ["name", "slug", "description", "parent"]:
            if args.get(key) is not None:
                data[key] = args[key]
        return wp_request("POST", "categories", data=data)

    elif name == "wp_create_tag":
        data = {}
        for key in ["name", "slug", "description"]:
            if args.get(key) is not None:
                data[key] = args[key]
        return wp_request("POST", "tags", data=data)

    # === MEDIA ===
    elif name == "wp_list_media":
        params = {}
        for key in ["page", "per_page", "search", "media_type"]:
            if args.get(key) is not None:
                params[key] = args[key]
        return wp_request("GET", "media", params=params)

    elif name == "wp_get_media":
        return wp_request("GET", f"media/{args['media_id']}")

    # === PLUGINS ===
    elif name == "wp_list_plugins":
        return wp_request_plugins("GET", "")

    elif name == "wp_get_plugin":
        return wp_request_plugins("GET", args["plugin_slug"])

    elif name == "wp_activate_plugin":
        return wp_request_plugins("PUT", args["plugin_slug"], data={"status": "active"})

    elif name == "wp_deactivate_plugin":
        return wp_request_plugins("PUT", args["plugin_slug"], data={"status": "inactive"})

    # === SITE INFO ===
    elif name == "wp_get_site_info":
        url = f"{WP_URL}/wp-json/"
        headers = wp_auth_header()
        try:
            resp = requests.get(url, headers=headers, timeout=30, verify=True)
            if resp.status_code >= 400:
                return {"error": f"HTTP {resp.status_code}", "body": resp.text}
            data = resp.json()
            return {
                "name": data.get("name"),
                "description": data.get("description"),
                "url": data.get("url"),
                "home": data.get("home"),
                "gmt_offset": data.get("gmt_offset"),
                "timezone_string": data.get("timezone_string"),
                "namespaces": data.get("namespaces", []),
            }
        except Exception as e:
            return {"error": str(e)}

    elif name == "wp_list_users":
        params = {}
        for key in ["page", "per_page", "roles"]:
            if args.get(key) is not None:
                params[key] = args[key]
        return wp_request("GET", "users", params=params)

    elif name == "wp_list_menus":
        url = f"{WP_URL}/wp-json/wp/v2/menus"
        headers = wp_auth_header()
        try:
            resp = requests.get(url, headers=headers, timeout=30, verify=True)
            if resp.status_code == 404:
                return {"info": "Menus endpoint não disponível. Verifique se o tema suporta menus REST API ou instale o plugin WP REST API Menus."}
            if resp.status_code >= 400:
                return {"error": f"HTTP {resp.status_code}", "body": resp.text}
            return resp.json()
        except Exception as e:
            return {"error": str(e)}

    elif name == "wp_get_settings":
        url = f"{WP_URL}/wp-json/wp/v2/settings"
        headers = wp_auth_header()
        try:
            resp = requests.get(url, headers=headers, timeout=30, verify=True)
            if resp.status_code >= 400:
                return {"error": f"HTTP {resp.status_code}", "body": resp.text}
            return resp.json()
        except Exception as e:
            return {"error": str(e)}

    # === SEO (Yoast) ===
    elif name == "wp_get_yoast_meta":
        post_type = args.get("post_type", "posts")
        result = wp_request("GET", f"{post_type}/{args['post_id']}")
        if isinstance(result, dict) and "error" not in result:
            yoast = result.get("yoast_head_json", {})
            return {
                "title": yoast.get("title"),
                "description": yoast.get("description"),
                "og_title": yoast.get("og_title"),
                "og_description": yoast.get("og_description"),
                "og_image": yoast.get("og_image", [{}])[0].get("url") if yoast.get("og_image") else None,
                "canonical": yoast.get("canonical"),
                "robots": yoast.get("robots"),
                "schema": yoast.get("schema"),
            }
        return result

    # === HEALTH ===
    elif name == "wp_site_health":
        results = {}

        # Conectividade básica
        site_info = handle_tool_call("wp_get_site_info", {})
        results["site"] = {
            "name": site_info.get("name"),
            "url": site_info.get("url"),
            "connected": "error" not in site_info,
        }

        # Plugins ativos
        plugins = handle_tool_call("wp_list_plugins", {})
        if isinstance(plugins, list):
            results["plugins"] = {
                "total": len(plugins),
                "active": sum(1 for p in plugins if p.get("status") == "active"),
                "inactive": sum(1 for p in plugins if p.get("status") != "active"),
            }
        else:
            results["plugins"] = plugins

        return results

    else:
        return {"error": f"Ferramenta '{name}' não encontrada"}


# ===========================================================================
# PROTOCOLO MCP (JSON-RPC 2.0 via stdio)
# ===========================================================================

SERVER_INFO = {
    "name": "wordpress-mcp",
    "version": "1.0.0",
}

CAPABILITIES = {
    "tools": {},
}


def make_response(id, result):
    """Cria uma resposta JSON-RPC."""
    return {"jsonrpc": "2.0", "id": id, "result": result}


def make_error(id, code, message):
    """Cria uma resposta de erro JSON-RPC."""
    return {"jsonrpc": "2.0", "id": id, "error": {"code": code, "message": message}}


def handle_message(msg):
    """Processa uma mensagem JSON-RPC e retorna a resposta."""
    method = msg.get("method", "")
    id = msg.get("id")
    params = msg.get("params", {})

    # Initialize
    if method == "initialize":
        return make_response(id, {
            "protocolVersion": "2024-11-05",
            "capabilities": CAPABILITIES,
            "serverInfo": SERVER_INFO,
        })

    # Initialized notification
    elif method == "notifications/initialized":
        return None

    # List tools
    elif method == "tools/list":
        return make_response(id, {"tools": TOOLS})

    # Call tool
    elif method == "tools/call":
        tool_name = params.get("name", "")
        arguments = params.get("arguments", {})

        log.info(f"Chamando ferramenta: {tool_name}")

        try:
            result = handle_tool_call(tool_name, arguments)
            text = json.dumps(result, ensure_ascii=False, indent=2, default=str)

            # Truncar se muito grande (> 100KB)
            if len(text) > 100000:
                text = text[:100000] + "\n\n... [TRUNCADO - resultado muito grande, use filtros para refinar]"

            return make_response(id, {
                "content": [{"type": "text", "text": text}],
                "isError": "error" in (result if isinstance(result, dict) else {}),
            })
        except Exception as e:
            log.error(f"Erro ao executar {tool_name}: {e}")
            return make_response(id, {
                "content": [{"type": "text", "text": json.dumps({"error": str(e)})}],
                "isError": True,
            })

    # Ping
    elif method == "ping":
        return make_response(id, {})

    # Unknown method
    else:
        if id is not None:
            return make_error(id, -32601, f"Método não suportado: {method}")
        return None


def main():
    """Loop principal: lê JSON-RPC de stdin, responde em stdout."""
    log.info("🚀 WordPress MCP Server iniciado!")
    log.info(f"WP URL: {WP_URL or '❌ não configurado'}")
    log.info(f"WP User: {'✅ configurado' if WP_USER else '❌ não configurado'}")
    log.info(f"App Password: {'✅ configurado' if WP_APP_PASSWORD else '❌ não configurado'}")

    while True:
        try:
            line = sys.stdin.readline()
            if not line:
                log.info("stdin fechado, encerrando...")
                break

            line = line.strip()

            # Ler headers (Content-Length)
            if line.startswith("Content-Length:"):
                content_length = int(line.split(":")[1].strip())
                sys.stdin.readline()  # linha vazia
                body = sys.stdin.read(content_length)
                msg = json.loads(body)
            elif line.startswith("{"):
                msg = json.loads(line)
            elif line == "":
                continue
            else:
                continue

            response = handle_message(msg)

            if response is not None:
                response_str = json.dumps(response, ensure_ascii=False)
                response_bytes = response_str.encode("utf-8")
                sys.stdout.write(f"Content-Length: {len(response_bytes)}\r\n\r\n")
                sys.stdout.write(response_str)
                sys.stdout.flush()

        except json.JSONDecodeError as e:
            log.error(f"JSON inválido: {e}")
            continue
        except KeyboardInterrupt:
            log.info("Interrompido pelo usuário")
            break
        except Exception as e:
            log.error(f"Erro inesperado: {e}")
            continue


if __name__ == "__main__":
    main()
