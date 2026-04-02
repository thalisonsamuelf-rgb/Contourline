"""
Importa TODAS as negociações do RD Station CRM para o ContourlineDB.
Busca diretamente da API com paginação automática.

Uso: python3 import_todas_negociacoes.py
"""
import json
import sys
import os
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    import requests
except ImportError:
    print("Instalando requests...")
    os.system(f"{sys.executable} -m pip install requests -q")
    import requests

from app import create_app
from models import db, Cliente, Venda, Equipamento

# ── CONFIG ────────────────────────────────────────────────
CRM_TOKEN = "689b53d02814af0016699678"
API_BASE = "https://crm.rdstation.com/api/v1"
PER_PAGE = 200

# ── MAPEAMENTOS ──────────────────────────────────────────
STAGE_TO_STATUS = {
    "Sondagem": "em_negociacao",
    "Contato Consultivo": "em_negociacao",
    "Aguardando Ação": "em_negociacao",
    "Diagnóstico": "em_negociacao",
    "Em atendimento (acompanhamento ativo) Tarefas da etapa:": "em_negociacao",
    "Negociação": "proposta_enviada",
    "Solução": "proposta_enviada",
    "Demonstração": "proposta_enviada",
    "Aguardando conclusão / retorno de análise": "proposta_enviada",
    "Fechamento": "fechada",
    "Validação do negócio": "fechada",
    "Aprovação de Negócio": "fechada",
    "Onboarding": "fechada",
}

PRODUCT_MAP = {
    "ULTRAPULSE": "UltraPulse",
    "ULTRAPULSE ALPHA": "UltraPulse",
    "STELLAR M22": "Stellar M22",
    "STELLAR IPL + NDYAG + Q-SWITCHED + RESURFX": "Stellar M22",
    "STELLAR IPL + RESURFX": "Stellar M22",
    "STELLAR": "Stellar M22",
    "M22": "Stellar M22",
    "LIGHTSHEER": "LightSheer DESIRE",
    "LIGHTSHEER DESIRE": "LightSheer DESIRE",
    "NUERA TIGHT": "NuEra Tight",
    "NUERA TIGHT 2.0": "NuEra Tight",
    "NUERA": "NuEra Tight",
    "SPLENDOR X": "Splendor X",
    "SPLENDOR": "Splendor X",
    "LEGEND PRO+": "LEGEND Pro+",
    "LEGEND PRO": "LEGEND Pro+",
    "LEGEND": "LEGEND Pro+",
    "PIQO4": "PiQo4",
    "PIQO": "PiQo4",
    "RESURFX": "ResurFX",
    "ESSENZA": "Essenza",
    "MULTISHAPE": "Multishape",
    "UNYQUE PRO": "Unyque PRO",
    "UNYQUE": "Unyque PRO",
    "SUPREME PRO": "Supreme PRO",
    "SUPREME": "Supreme PRO",
    "TRILIFT": "TriLift",
    "HIPRO": "HiPro",
    "HIPRO MED": "HiPro MED",
    "ENYGMA": "Enygma",
    "VISBODY": "Visbody S30",
    "VISBODY S30": "Visbody S30",
    "S30": "Visbody S30",
    "VISBODY M30": "Visbody M30",
    "M30": "Visbody M30",
    "ESTEIRA CREATOR 600": "Esteira Creator 600",
}


def fetch_all_deals():
    """Busca TODAS as negociações via API com paginação por cursor."""
    all_deals = []
    next_page = None
    page_num = 0
    total = None

    while True:
        page_num += 1
        url = f"{API_BASE}/deals?token={CRM_TOKEN}&limit={PER_PAGE}"
        if next_page:
            url += f"&page={next_page}"
        print(f"  Buscando pagina {page_num}...", end=" ", flush=True)

        try:
            resp = requests.get(url, timeout=60)
            resp.raise_for_status()
            data = resp.json()
        except requests.exceptions.RequestException as e:
            print(f"\n  ERRO na pagina {page_num}: {e}")
            print("  Tentando novamente em 5s...")
            time.sleep(5)
            try:
                resp = requests.get(url, timeout=60)
                resp.raise_for_status()
                data = resp.json()
            except Exception as e2:
                print(f"  ERRO persistente: {e2}. Parando.")
                break

        deals = data.get("deals", [])
        if total is None:
            total = data.get("total", "?")
        all_deals.extend(deals)
        print(f"{len(deals)} deals ({len(all_deals)}/{total})")

        if not data.get("has_more", False):
            break

        next_page = data.get("next_page")
        if not next_page:
            break
        time.sleep(0.3)  # Respeitar rate limit

    return all_deals


def parse_deal_name(name):
    """Extrai nome do cliente e produto do nome da negociação."""
    client_name = name.strip()
    product_name = None

    if "|" in name:
        parts = name.split("|", 1)
        client_name = parts[0].strip()
        product_name = parts[1].strip()
    elif " - " in name:
        parts = name.split(" - ", 1)
        candidate = parts[1].strip().upper()
        for key in PRODUCT_MAP:
            if key in candidate:
                client_name = parts[0].strip()
                product_name = parts[1].strip()
                break

    return client_name, product_name


def find_equipamento(deal, equip_cache):
    """Tenta encontrar o equipamento a partir dos dados do deal."""
    # 1. Tentar via deal_products
    products = deal.get("deal_products") or []
    if products:
        prod_name = (products[0].get("name") or "").upper().strip()
        if prod_name in PRODUCT_MAP:
            return equip_cache.get(PRODUCT_MAP[prod_name])

    # 2. Tentar via nome da negociação
    _, product_name = parse_deal_name(deal.get("name", ""))
    if product_name:
        prod_upper = product_name.upper().strip()
        # Tentar match exato
        if prod_upper in PRODUCT_MAP:
            return equip_cache.get(PRODUCT_MAP[prod_upper])
        # Tentar match parcial
        for key, equip_name in PRODUCT_MAP.items():
            if key in prod_upper or prod_upper in key:
                return equip_cache.get(equip_name)

    return None


def main():
    print("=" * 60)
    print("  IMPORTAÇÃO COMPLETA: RD Station CRM -> ContourlineDB")
    print("=" * 60)
    print()

    # 1. Buscar todos os deals
    print("[1/3] Buscando negociações da API RD Station...")
    all_deals = fetch_all_deals()
    print(f"\n  Total de deals baixados: {len(all_deals)}")

    # Salvar backup
    backup_file = os.path.join(os.path.dirname(__file__), "backup_deals_rdstation.json")
    with open(backup_file, "w", encoding="utf-8") as f:
        json.dump(all_deals, f, ensure_ascii=False)
    print(f"  Backup salvo em: {backup_file}")

    # 2. Importar no banco
    print(f"\n[2/3] Importando no banco de dados...")
    app = create_app()

    with app.app_context():
        # Cache de equipamentos
        equip_cache = {}
        for e in Equipamento.query.all():
            equip_cache[e.nome] = e.id

        # Cache de clientes existentes (por razao_social normalizada)
        client_cache = {}
        for c in Cliente.query.all():
            client_cache[c.razao_social.strip().upper()] = c.id

        # Deals já importados
        existing_deals = set()
        for v in Venda.query.with_entities(Venda.rd_deal_id).filter(Venda.rd_deal_id.isnot(None)).all():
            existing_deals.add(v.rd_deal_id)

        stats = {
            "processados": 0,
            "clientes_criados": 0,
            "clientes_reusados": 0,
            "vendas_criadas": 0,
            "duplicados": 0,
            "sem_equipamento": 0,
            "erros": 0,
        }
        produtos_sem_mapa = set()
        batch_size = 500

        for i, deal in enumerate(all_deals):
            stats["processados"] += 1
            deal_id = deal.get("_id") or deal.get("id", "")

            # Pular duplicados
            if deal_id in existing_deals:
                stats["duplicados"] += 1
                continue

            # ── Cliente ──
            client_name, product_name = parse_deal_name(deal.get("name", ""))
            org = deal.get("organization") or {}
            razao = (org.get("name") or client_name or "Sem nome").strip()
            razao_key = razao.upper()

            if razao_key in client_cache:
                cliente_id = client_cache[razao_key]
                stats["clientes_reusados"] += 1
            else:
                contacts = deal.get("contacts") or []
                contact = contacts[0] if contacts else {}
                emails = contact.get("emails") or []
                phones = contact.get("phones") or []

                cliente = Cliente(
                    razao_social=razao,
                    nome_fantasia=client_name if client_name != razao else None,
                    contato_nome=contact.get("name"),
                    contato_email=emails[0].get("email") if emails else None,
                    contato_telefone=phones[0].get("phone") if phones else None,
                    segmento="Clinica Estetica",
                    rd_station_id=contact.get("_id"),
                )
                db.session.add(cliente)
                db.session.flush()
                cliente_id = cliente.id
                client_cache[razao_key] = cliente_id
                stats["clientes_criados"] += 1

            # ── Equipamento ──
            equip_id = find_equipamento(deal, equip_cache)
            if equip_id is None:
                if product_name:
                    produtos_sem_mapa.add(product_name.upper().strip())
                stats["sem_equipamento"] += 1
                continue

            # ── Status ──
            deal_stage = deal.get("deal_stage") or {}
            stage_name = deal_stage.get("name", "")
            if deal.get("win") is False:
                status = "perdida"
            elif deal.get("win") is True:
                status = "fechada"
            else:
                status = STAGE_TO_STATUS.get(stage_name, "em_negociacao")

            # ── Valor ──
            amount = deal.get("amount_total") or 0
            if amount > 100000:
                amount = amount / 100  # centavos para reais

            # ── Criar Venda ──
            venda = Venda(
                cliente_id=cliente_id,
                equipamento_id=equip_id,
                vendedor_id=1,
                valor=amount,
                status=status,
                rd_deal_id=deal_id,
                observacoes=f"Vendedor RD: {(deal.get('user') or {}).get('name', 'N/A')} | Etapa: {stage_name}",
            )

            created = deal.get("created_at")
            if created:
                try:
                    venda.criado_em = created
                except Exception:
                    pass

            db.session.add(venda)
            existing_deals.add(deal_id)
            stats["vendas_criadas"] += 1

            # Commit em batches
            if (i + 1) % batch_size == 0:
                db.session.commit()
                print(f"  ... {i + 1}/{len(all_deals)} processados")

        db.session.commit()

    # 3. Relatório
    print(f"\n[3/3] CONCLUÍDO!")
    print("=" * 60)
    print(f"  Deals processados:      {stats['processados']}")
    print(f"  Deals duplicados:       {stats['duplicados']} (já existiam)")
    print(f"  Clientes criados:       {stats['clientes_criados']}")
    print(f"  Clientes reutilizados:  {stats['clientes_reusados']}")
    print(f"  Vendas criadas:         {stats['vendas_criadas']}")
    print(f"  Sem equipamento (skip): {stats['sem_equipamento']}")
    print(f"  Erros:                  {stats['erros']}")

    if produtos_sem_mapa:
        print(f"\n  Produtos sem mapeamento ({len(produtos_sem_mapa)}):")
        for p in sorted(produtos_sem_mapa)[:30]:
            print(f"    - {p}")
        if len(produtos_sem_mapa) > 30:
            print(f"    ... e mais {len(produtos_sem_mapa) - 30}")

    with app.app_context():
        print(f"\n  TOTAIS NO BANCO:")
        print(f"    Clientes:     {Cliente.query.count()}")
        print(f"    Vendas:       {Venda.query.count()}")
        print(f"    Equipamentos: {Equipamento.query.count()}")
    print("=" * 60)


if __name__ == "__main__":
    main()
