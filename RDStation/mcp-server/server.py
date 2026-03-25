#!/usr/bin/env python3
"""
=============================================================================
MCP SERVER — RD STATION CRM + MARKETING
Contourline | Servidor MCP para integração direta com Claude Code
=============================================================================

Protocolo: JSON-RPC 2.0 via stdio (compatível com Python 3.9+)
Sem dependências externas além de 'requests'.

Ferramentas disponíveis:
  CRM:
    - crm_list_deals          Listar negociações (com filtros)
    - crm_get_deal            Buscar negociação por ID
    - crm_update_deal         Atualizar negociação
    - crm_create_deal         Criar negociação
    - crm_list_contacts       Listar contatos
    - crm_get_contact         Buscar contato por ID
    - crm_create_contact      Criar contato
    - crm_update_contact      Atualizar contato
    - crm_list_pipelines      Listar funis
    - crm_list_deal_stages    Listar etapas do funil
    - crm_list_users          Listar vendedores
    - crm_list_custom_fields  Listar campos personalizados
    - crm_list_sources        Listar fontes de negócio
    - crm_list_tasks          Listar tarefas
    - crm_create_task         Criar tarefa
    - crm_list_organizations  Listar empresas

  Marketing:
    - mkt_get_contact         Buscar contato por email
    - mkt_update_contact      Atualizar contato
    - mkt_create_event        Criar evento (conversão, oportunidade, venda)
    - mkt_list_fields         Listar campos de contato
    - mkt_refresh_token       Renovar access token
=============================================================================
"""

import json
import sys
import os
import logging
from urllib.parse import urlencode

import requests

# ===========================================================================
# CONFIGURAÇÃO
# ===========================================================================

# Credenciais via variáveis de ambiente
CRM_TOKEN = os.environ.get("RDSTATION_CRM_TOKEN", "")
MKT_CLIENT_ID = os.environ.get("RDSTATION_MKT_CLIENT_ID", "")
MKT_CLIENT_SECRET = os.environ.get("RDSTATION_MKT_CLIENT_SECRET", "")
MKT_ACCESS_TOKEN = os.environ.get("RDSTATION_MKT_ACCESS_TOKEN", "")
MKT_REFRESH_TOKEN = os.environ.get("RDSTATION_MKT_REFRESH_TOKEN", "")

CRM_BASE_URL = "https://crm.rdstation.com/api/v1"
MKT_BASE_URL = "https://api.rd.services"

# Logging para stderr (stdout é reservado para o protocolo MCP)
logging.basicConfig(
    level=logging.INFO,
    format="[RDStation MCP] %(levelname)s: %(message)s",
    stream=sys.stderr,
)
log = logging.getLogger(__name__)

# Suprimir warnings do urllib3/SSL
import warnings
warnings.filterwarnings("ignore")


# ===========================================================================
# API HELPERS
# ===========================================================================

def crm_request(method, endpoint, params=None, data=None):
    """Faz uma requisição à API do CRM."""
    url = f"{CRM_BASE_URL}/{endpoint}"
    params = params or {}
    params["token"] = CRM_TOKEN

    try:
        if method == "GET":
            resp = requests.get(url, params=params, timeout=30, verify=False)
        elif method == "POST":
            resp = requests.post(url, params={"token": CRM_TOKEN}, json=data, timeout=30, verify=False)
        elif method == "PUT":
            resp = requests.put(url, params={"token": CRM_TOKEN}, json=data, timeout=30, verify=False)
        elif method == "DELETE":
            resp = requests.delete(url, params=params, timeout=30, verify=False)
        else:
            return {"error": f"Método {method} não suportado"}

        if resp.status_code >= 400:
            return {"error": f"HTTP {resp.status_code}", "body": resp.text}

        return resp.json() if resp.text else {"status": "ok"}
    except Exception as e:
        return {"error": str(e)}


def mkt_request(method, endpoint, data=None):
    """Faz uma requisição à API do Marketing."""
    url = f"{MKT_BASE_URL}/{endpoint}"
    headers = {
        "Authorization": f"Bearer {MKT_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }

    try:
        if method == "GET":
            resp = requests.get(url, headers=headers, timeout=30, verify=False)
        elif method == "POST":
            resp = requests.post(url, headers=headers, json=data, timeout=30, verify=False)
        elif method == "PATCH":
            resp = requests.patch(url, headers=headers, json=data, timeout=30, verify=False)
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
    # === CRM: DEALS ===
    {
        "name": "crm_list_deals",
        "description": "Lista negociações do CRM com filtros. Retorna até 200 por página. Use 'page' para paginar (cursor retornado em next_page).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page": {"type": "string", "description": "Cursor de paginação (retornado como next_page na resposta anterior)"},
                "limit": {"type": "integer", "description": "Registros por página (max 200)", "default": 200},
                "name": {"type": "string", "description": "Filtrar por nome (busca parcial)"},
                "win": {"type": "string", "description": "Filtrar: 'true' (ganhas), 'false' (perdidas), 'null' (abertas)"},
                "user_id": {"type": "string", "description": "Filtrar por ID do vendedor"},
                "deal_stage_id": {"type": "string", "description": "Filtrar por ID da etapa do funil"},
                "deal_pipeline_id": {"type": "string", "description": "Filtrar por ID do funil"},
            },
        },
    },
    {
        "name": "crm_get_deal",
        "description": "Busca uma negociação específica por ID. Retorna todos os campos incluindo custom_fields.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "deal_id": {"type": "string", "description": "ID da negociação"},
            },
            "required": ["deal_id"],
        },
    },
    {
        "name": "crm_update_deal",
        "description": "Atualiza uma negociação existente. Pode alterar nome, etapa, valor, rating, campos personalizados, etc.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "deal_id": {"type": "string", "description": "ID da negociação"},
                "name": {"type": "string", "description": "Novo nome da negociação"},
                "deal_stage_id": {"type": "string", "description": "ID da nova etapa"},
                "rating": {"type": "integer", "description": "Temperatura 0-5"},
                "amount_total": {"type": "number", "description": "Valor total em centavos"},
                "prediction_date": {"type": "string", "description": "Data prevista (YYYY-MM-DD)"},
                "deal_custom_fields": {
                    "type": "array",
                    "description": "Campos personalizados: [{custom_field_id, value}]",
                    "items": {"type": "object"},
                },
            },
            "required": ["deal_id"],
        },
    },
    {
        "name": "crm_create_deal",
        "description": "Cria uma nova negociação no CRM.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Nome da negociação (padrão: NOME | PRODUTO)"},
                "deal_stage_id": {"type": "string", "description": "ID da etapa do funil"},
                "rating": {"type": "integer", "description": "Temperatura 0-5", "default": 3},
                "organization_id": {"type": "string", "description": "ID da empresa"},
                "deal_source_id": {"type": "string", "description": "ID da fonte"},
                "amount_total": {"type": "number", "description": "Valor em centavos"},
                "prediction_date": {"type": "string", "description": "Data prevista (YYYY-MM-DD)"},
                "deal_custom_fields": {"type": "array", "items": {"type": "object"}},
                "contacts": {"type": "array", "description": "IDs dos contatos", "items": {"type": "object"}},
            },
            "required": ["name", "deal_stage_id"],
        },
    },

    # === CRM: CONTACTS ===
    {
        "name": "crm_list_contacts",
        "description": "Lista contatos do CRM. Suporta busca por nome ou email.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page": {"type": "string", "description": "Cursor de paginação"},
                "limit": {"type": "integer", "default": 200},
                "query": {"type": "string", "description": "Buscar por nome"},
                "email": {"type": "string", "description": "Filtrar por email"},
            },
        },
    },
    {
        "name": "crm_get_contact",
        "description": "Busca um contato específico por ID.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "contact_id": {"type": "string", "description": "ID do contato"},
            },
            "required": ["contact_id"],
        },
    },
    {
        "name": "crm_create_contact",
        "description": "Cria um novo contato no CRM.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Nome do contato"},
                "title": {"type": "string", "description": "Cargo"},
                "facebook": {"type": "string"},
                "linkedin": {"type": "string"},
                "skype": {"type": "string"},
                "custom_fields": {"type": "array", "items": {"type": "object"}},
            },
            "required": ["name"],
        },
    },
    {
        "name": "crm_update_contact",
        "description": "Atualiza um contato existente.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "contact_id": {"type": "string", "description": "ID do contato"},
                "name": {"type": "string"},
                "title": {"type": "string"},
                "custom_fields": {"type": "array", "items": {"type": "object"}},
            },
            "required": ["contact_id"],
        },
    },

    # === CRM: PIPELINE & STAGES ===
    {
        "name": "crm_list_pipelines",
        "description": "Lista todos os funis (pipelines) de vendas.",
        "inputSchema": {"type": "object", "properties": {}},
    },
    {
        "name": "crm_list_deal_stages",
        "description": "Lista etapas do funil de vendas.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page": {"type": "string"},
                "limit": {"type": "integer", "default": 200},
                "deal_pipeline_id": {"type": "string", "description": "Filtrar por funil"},
            },
        },
    },

    # === CRM: USERS ===
    {
        "name": "crm_list_users",
        "description": "Lista todos os vendedores/usuários do CRM.",
        "inputSchema": {"type": "object", "properties": {}},
    },

    # === CRM: CUSTOM FIELDS ===
    {
        "name": "crm_list_custom_fields",
        "description": "Lista campos personalizados. Filtre por tipo: 'contact', 'deal', ou 'organization'.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "option": {"type": "string", "description": "Tipo: contact, deal, ou organization"},
            },
        },
    },

    # === CRM: SOURCES ===
    {
        "name": "crm_list_sources",
        "description": "Lista todas as fontes de negócio.",
        "inputSchema": {"type": "object", "properties": {}},
    },

    # === CRM: TASKS ===
    {
        "name": "crm_list_tasks",
        "description": "Lista tarefas do CRM.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page": {"type": "string"},
                "limit": {"type": "integer", "default": 200},
                "done": {"type": "string", "description": "'true' ou 'false'"},
                "deal_id": {"type": "string", "description": "Filtrar por negociação"},
            },
        },
    },
    {
        "name": "crm_create_task",
        "description": "Cria uma nova tarefa no CRM.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "subject": {"type": "string", "description": "Assunto da tarefa"},
                "type": {"type": "string", "description": "Tipo: call, email, meeting, task, whatsapp"},
                "hour": {"type": "string", "description": "Hora (HH:MM)"},
                "date": {"type": "string", "description": "Data (YYYY-MM-DD)"},
                "deal_id": {"type": "string", "description": "ID da negociação associada"},
                "contact_id": {"type": "string", "description": "ID do contato"},
                "notes": {"type": "string", "description": "Observações"},
                "user_id": {"type": "string", "description": "ID do responsável"},
            },
            "required": ["subject", "type", "date"],
        },
    },

    # === CRM: ORGANIZATIONS ===
    {
        "name": "crm_list_organizations",
        "description": "Lista empresas/organizações do CRM.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "page": {"type": "string"},
                "limit": {"type": "integer", "default": 200},
                "query": {"type": "string", "description": "Buscar por nome"},
            },
        },
    },

    # === MARKETING ===
    {
        "name": "mkt_get_contact",
        "description": "Busca um contato no RD Station Marketing por email.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "email": {"type": "string", "description": "Email do contato"},
            },
            "required": ["email"],
        },
    },
    {
        "name": "mkt_update_contact",
        "description": "Atualiza campos de um contato no Marketing.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "email": {"type": "string", "description": "Email do contato"},
                "name": {"type": "string"},
                "job_title": {"type": "string"},
                "tags": {"type": "array", "items": {"type": "string"}},
                "custom_fields": {"type": "object", "description": "Campos personalizados (chave: valor)"},
            },
            "required": ["email"],
        },
    },
    {
        "name": "mkt_create_event",
        "description": "Cria um evento no Marketing (conversão, oportunidade, venda, etc).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "event_type": {
                    "type": "string",
                    "description": "Tipo: CONVERSION, OPPORTUNITY, SALE, OPPORTUNITY_LOST, ORDER_PLACED, CART_ABANDONED",
                },
                "email": {"type": "string"},
                "conversion_identifier": {"type": "string", "description": "Identificador da conversão"},
                "payload": {"type": "object", "description": "Dados adicionais (name, tags, custom fields, etc)"},
            },
            "required": ["event_type", "email"],
        },
    },
    {
        "name": "mkt_list_fields",
        "description": "Lista todos os campos de contato disponíveis no Marketing.",
        "inputSchema": {"type": "object", "properties": {}},
    },
    {
        "name": "mkt_refresh_token",
        "description": "Renova o access_token do Marketing usando o refresh_token. Retorna novo token.",
        "inputSchema": {"type": "object", "properties": {}},
    },
]


# ===========================================================================
# HANDLERS DAS FERRAMENTAS
# ===========================================================================

def handle_tool_call(name, arguments):
    """Executa a ferramenta e retorna o resultado."""
    args = arguments or {}

    # === CRM: DEALS ===
    if name == "crm_list_deals":
        params = {}
        if args.get("page"):
            params["page"] = args["page"]
        if args.get("limit"):
            params["limit"] = args["limit"]
        if args.get("name"):
            params["name"] = args["name"]
        if args.get("win"):
            params["win"] = args["win"]
        if args.get("user_id"):
            params["user_id"] = args["user_id"]
        if args.get("deal_stage_id"):
            params["deal_stage_id"] = args["deal_stage_id"]
        if args.get("deal_pipeline_id"):
            params["deal_pipeline_id"] = args["deal_pipeline_id"]
        return crm_request("GET", "deals", params=params)

    elif name == "crm_get_deal":
        return crm_request("GET", f"deals/{args['deal_id']}")

    elif name == "crm_update_deal":
        deal_id = args.pop("deal_id")
        return crm_request("PUT", f"deals/{deal_id}", data=args)

    elif name == "crm_create_deal":
        return crm_request("POST", "deals", data=args)

    # === CRM: CONTACTS ===
    elif name == "crm_list_contacts":
        params = {}
        for key in ["page", "limit", "query", "email"]:
            if args.get(key):
                params[key] = args[key]
        return crm_request("GET", "contacts", params=params)

    elif name == "crm_get_contact":
        return crm_request("GET", f"contacts/{args['contact_id']}")

    elif name == "crm_create_contact":
        return crm_request("POST", "contacts", data=args)

    elif name == "crm_update_contact":
        contact_id = args.pop("contact_id")
        return crm_request("PUT", f"contacts/{contact_id}", data=args)

    # === CRM: PIPELINE & STAGES ===
    elif name == "crm_list_pipelines":
        return crm_request("GET", "deal_pipelines")

    elif name == "crm_list_deal_stages":
        params = {}
        for key in ["page", "limit", "deal_pipeline_id"]:
            if args.get(key):
                params[key] = args[key]
        return crm_request("GET", "deal_stages", params=params)

    # === CRM: USERS ===
    elif name == "crm_list_users":
        return crm_request("GET", "users")

    # === CRM: CUSTOM FIELDS ===
    elif name == "crm_list_custom_fields":
        params = {}
        if args.get("option"):
            params["option"] = args["option"]
        return crm_request("GET", "custom_fields", params=params)

    # === CRM: SOURCES ===
    elif name == "crm_list_sources":
        return crm_request("GET", "deal_sources")

    # === CRM: TASKS ===
    elif name == "crm_list_tasks":
        params = {}
        for key in ["page", "limit", "done", "deal_id"]:
            if args.get(key):
                params[key] = args[key]
        return crm_request("GET", "tasks", params=params)

    elif name == "crm_create_task":
        return crm_request("POST", "tasks", data=args)

    # === CRM: ORGANIZATIONS ===
    elif name == "crm_list_organizations":
        params = {}
        for key in ["page", "limit", "query"]:
            if args.get(key):
                params[key] = args[key]
        return crm_request("GET", "organizations", params=params)

    # === MARKETING ===
    elif name == "mkt_get_contact":
        return mkt_request("GET", f"platform/contacts/email:{args['email']}")

    elif name == "mkt_update_contact":
        email = args.pop("email")
        payload = {}
        for key in ["name", "job_title", "tags"]:
            if args.get(key):
                payload[key] = args[key]
        if args.get("custom_fields"):
            payload.update(args["custom_fields"])
        return mkt_request("PATCH", f"platform/contacts/email:{email}", data=payload)

    elif name == "mkt_create_event":
        payload = {
            "event_type": args["event_type"],
            "event_family": "CDP",
            "payload": {
                "email": args["email"],
                "conversion_identifier": args.get("conversion_identifier", "MCP Integration"),
            },
        }
        if args.get("payload"):
            payload["payload"].update(args["payload"])
        return mkt_request("POST", "platform/events", data=payload)

    elif name == "mkt_list_fields":
        return mkt_request("GET", "platform/contacts/fields")

    elif name == "mkt_refresh_token":
        global MKT_ACCESS_TOKEN
        data = {
            "client_id": MKT_CLIENT_ID,
            "client_secret": MKT_CLIENT_SECRET,
            "refresh_token": MKT_REFRESH_TOKEN,
        }
        try:
            resp = requests.post(
                f"{MKT_BASE_URL}/auth/token",
                json=data,
                timeout=30,
                verify=False,
            )
            result = resp.json()
            if "access_token" in result:
                MKT_ACCESS_TOKEN = result["access_token"]
                log.info("Token do Marketing renovado com sucesso!")
            return result
        except Exception as e:
            return {"error": str(e)}

    else:
        return {"error": f"Ferramenta '{name}' não encontrada"}


# ===========================================================================
# PROTOCOLO MCP (JSON-RPC 2.0 via stdio)
# ===========================================================================

SERVER_INFO = {
    "name": "rdstation-mcp",
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

    # Initialized notification (no response needed)
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
    log.info("🚀 RD Station MCP Server iniciado!")
    log.info(f"CRM Token: {'✅ configurado' if CRM_TOKEN else '❌ não configurado'}")
    log.info(f"Marketing Token: {'✅ configurado' if MKT_ACCESS_TOKEN else '❌ não configurado'}")

    buffer = ""

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
                # Ler linha vazia após header
                sys.stdin.readline()
                # Ler o body
                body = sys.stdin.read(content_length)
                msg = json.loads(body)
            elif line.startswith("{"):
                # Mensagem JSON direta (sem headers)
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
