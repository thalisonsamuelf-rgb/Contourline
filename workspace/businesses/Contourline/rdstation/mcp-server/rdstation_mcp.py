"""RD Station MCP Server - Contourline"""

import os
import json
from typing import Optional

import httpx
from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

mcp = FastMCP(
    "RD Station",
    instructions="Acesso direto ao RD Station CRM e Marketing da Contourline",
)

CRM_BASE = "https://crm.rdstation.com/api/v1"
MARKETING_BASE = "https://api.rd.services"

CRM_TOKEN = os.getenv("CRM_TOKEN", "")
MARKETING_CLIENT_ID = os.getenv("MARKETING_CLIENT_ID", "")
MARKETING_CLIENT_SECRET = os.getenv("MARKETING_CLIENT_SECRET", "")
_marketing_access_token = os.getenv("MARKETING_ACCESS_TOKEN", "")
_marketing_refresh_token = os.getenv("MARKETING_REFRESH_TOKEN", "")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

async def _crm_get(endpoint: str, params: dict | None = None) -> dict:
    params = params or {}
    params["token"] = CRM_TOKEN
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.get(f"{CRM_BASE}/{endpoint}", params=params)
        r.raise_for_status()
        return r.json()


async def _crm_post(endpoint: str, data: dict) -> dict:
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(
            f"{CRM_BASE}/{endpoint}",
            params={"token": CRM_TOKEN},
            json=data,
        )
        r.raise_for_status()
        return r.json()


async def _crm_put(endpoint: str, data: dict) -> dict:
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.put(
            f"{CRM_BASE}/{endpoint}",
            params={"token": CRM_TOKEN},
            json=data,
        )
        r.raise_for_status()
        return r.json()


async def _marketing_get(endpoint: str, params: dict | None = None) -> dict:
    global _marketing_access_token
    headers = {"Authorization": f"Bearer {_marketing_access_token}"}
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.get(
            f"{MARKETING_BASE}/{endpoint}", headers=headers, params=params
        )
        if r.status_code == 401:
            await _do_refresh_token()
            headers["Authorization"] = f"Bearer {_marketing_access_token}"
            r = await client.get(
                f"{MARKETING_BASE}/{endpoint}", headers=headers, params=params
            )
        r.raise_for_status()
        return r.json()


async def _marketing_patch(endpoint: str, data: dict) -> dict:
    global _marketing_access_token
    headers = {
        "Authorization": f"Bearer {_marketing_access_token}",
        "Content-Type": "application/json",
    }
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.patch(
            f"{MARKETING_BASE}/{endpoint}", headers=headers, json=data
        )
        if r.status_code == 401:
            await _do_refresh_token()
            headers["Authorization"] = f"Bearer {_marketing_access_token}"
            r = await client.patch(
                f"{MARKETING_BASE}/{endpoint}", headers=headers, json=data
            )
        r.raise_for_status()
        return r.json()


async def _marketing_post(endpoint: str, data: dict) -> dict:
    global _marketing_access_token
    headers = {
        "Authorization": f"Bearer {_marketing_access_token}",
        "Content-Type": "application/json",
    }
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(
            f"{MARKETING_BASE}/{endpoint}", headers=headers, json=data
        )
        if r.status_code == 401:
            await _do_refresh_token()
            headers["Authorization"] = f"Bearer {_marketing_access_token}"
            r = await client.post(
                f"{MARKETING_BASE}/{endpoint}", headers=headers, json=data
            )
        r.raise_for_status()
        return r.json()


async def _do_refresh_token() -> str:
    global _marketing_access_token, _marketing_refresh_token
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(
            f"{MARKETING_BASE}/auth/token",
            json={
                "client_id": MARKETING_CLIENT_ID,
                "client_secret": MARKETING_CLIENT_SECRET,
                "refresh_token": _marketing_refresh_token,
            },
        )
        r.raise_for_status()
        data = r.json()
    _marketing_access_token = data["access_token"]
    _marketing_refresh_token = data["refresh_token"]
    # Persist new tokens to .env
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    with open(env_path, "r") as f:
        content = f.read()
    for key, val in [
        ("MARKETING_ACCESS_TOKEN", _marketing_access_token),
        ("MARKETING_REFRESH_TOKEN", _marketing_refresh_token),
    ]:
        import re
        content = re.sub(rf"^{key}=.*$", f"{key}={val}", content, flags=re.MULTILINE)
    with open(env_path, "w") as f:
        f.write(content)
    return _marketing_access_token


# ---------------------------------------------------------------------------
# CRM Tools
# ---------------------------------------------------------------------------

@mcp.tool()
async def crm_list_deals(
    name: Optional[str] = None,
    win: Optional[str] = None,
    deal_stage_id: Optional[str] = None,
    user_id: Optional[str] = None,
    page: int = 1,
    limit: int = 200,
) -> str:
    """Lista negociações do CRM. Filtros: name (busca por nome), win (true/false/null), deal_stage_id, user_id, page, limit (max 200)."""
    params: dict = {"limit": limit, "page": page}
    if name:
        params["name"] = name
    if win is not None:
        params["win"] = win
    if deal_stage_id:
        params["deal_stage_id"] = deal_stage_id
    if user_id:
        params["user_id"] = user_id
    data = await _crm_get("deals", params)
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_get_deal(deal_id: str) -> str:
    """Busca uma negociação específica por ID."""
    data = await _crm_get(f"deals/{deal_id}")
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_update_deal(deal_id: str, fields: str) -> str:
    """Atualiza uma negociação. fields é um JSON string com os campos a atualizar. Ex: {"deal": {"name": "NOVO NOME", "amount_total": 50000}}"""
    data = await _crm_put(f"deals/{deal_id}", json.loads(fields))
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_create_deal(fields: str) -> str:
    """Cria uma nova negociação. fields é um JSON string. Ex: {"deal": {"name": "NOME | PRODUTO", "deal_stage_id": "abc123"}}"""
    data = await _crm_post("deals", json.loads(fields))
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_list_contacts(
    query: Optional[str] = None,
    email: Optional[str] = None,
    page: int = 1,
    limit: int = 200,
) -> str:
    """Lista contatos do CRM. Filtros: query (busca por nome), email, page, limit."""
    params: dict = {"limit": limit, "page": page}
    if query:
        params["query"] = query
    if email:
        params["email"] = email
    data = await _crm_get("contacts", params)
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_get_contact(contact_id: str) -> str:
    """Busca um contato específico por ID."""
    data = await _crm_get(f"contacts/{contact_id}")
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_update_contact(contact_id: str, fields: str) -> str:
    """Atualiza um contato. fields é um JSON string. Ex: {"contact": {"name": "Novo Nome"}}"""
    data = await _crm_put(f"contacts/{contact_id}", json.loads(fields))
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_create_contact(fields: str) -> str:
    """Cria um novo contato. fields é um JSON string. Ex: {"contact": {"name": "Nome", "emails": [{"email": "a@b.com"}]}}"""
    data = await _crm_post("contacts", json.loads(fields))
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_list_organizations(
    query: Optional[str] = None,
    page: int = 1,
    limit: int = 200,
) -> str:
    """Lista empresas/organizações do CRM."""
    params: dict = {"limit": limit, "page": page}
    if query:
        params["query"] = query
    data = await _crm_get("organizations", params)
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_list_pipelines() -> str:
    """Lista todos os funis de vendas."""
    data = await _crm_get("deal_pipelines")
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_list_deal_stages(page: int = 1, limit: int = 200) -> str:
    """Lista todas as etapas de funil."""
    data = await _crm_get("deal_stages", {"limit": limit, "page": page})
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_list_users() -> str:
    """Lista todos os vendedores/usuários do CRM."""
    data = await _crm_get("users")
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_list_deal_sources() -> str:
    """Lista todas as fontes de negócio."""
    data = await _crm_get("deal_sources")
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_custom_fields(option: str = "deal") -> str:
    """Lista campos personalizados. option: 'deal', 'contact' ou 'organization'."""
    data = await _crm_get("custom_fields", {"option": option})
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def crm_list_tasks(
    done: Optional[str] = None,
    page: int = 1,
    limit: int = 200,
) -> str:
    """Lista tarefas do CRM. done: 'true' ou 'false' para filtrar."""
    params: dict = {"limit": limit, "page": page}
    if done is not None:
        params["done"] = done
    data = await _crm_get("tasks", params)
    return json.dumps(data, ensure_ascii=False)


# ---------------------------------------------------------------------------
# Marketing Tools
# ---------------------------------------------------------------------------

@mcp.tool()
async def marketing_get_contact(email: str) -> str:
    """Busca um contato no RD Marketing por email."""
    data = await _marketing_get(f"platform/contacts/email:{email}")
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def marketing_update_contact(email: str, fields: str) -> str:
    """Atualiza um contato no RD Marketing. fields é um JSON string com os campos."""
    data = await _marketing_patch(
        f"platform/contacts/email:{email}", json.loads(fields)
    )
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def marketing_create_event(fields: str) -> str:
    """Cria um evento no RD Marketing (conversão, oportunidade, venda). fields é um JSON string. Ex: {"event_type": "CONVERSION", "event_family": "CDP", "payload": {"email": "a@b.com"}}"""
    data = await _marketing_post("platform/events", json.loads(fields))
    return json.dumps(data, ensure_ascii=False)


@mcp.tool()
async def marketing_refresh_token() -> str:
    """Renova o access token do RD Marketing manualmente."""
    token = await _do_refresh_token()
    return json.dumps({"status": "ok", "new_token_prefix": token[:20] + "..."}, ensure_ascii=False)


@mcp.tool()
async def marketing_list_contact_fields() -> str:
    """Lista todos os campos de contato disponíveis no RD Marketing."""
    data = await _marketing_get("platform/contacts/fields")
    return json.dumps(data, ensure_ascii=False)


# ---------------------------------------------------------------------------
# Run
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    mcp.run()
