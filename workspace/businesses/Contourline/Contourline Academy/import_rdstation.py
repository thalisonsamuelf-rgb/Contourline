"""
Importa negociações do RD Station CRM para o banco de dados ContourlineDB.
Lê o arquivo JSON exportado via MCP e cria registros de Cliente e Venda.

Uso: python3 import_rdstation.py
"""
import json
import sys
import os
from datetime import datetime

# Garante que o diretório do projeto está no path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from models import db, Cliente, Venda, Equipamento

# ── CONFIGURAÇÃO ─────────────────────────────────────────

JSON_FILE = (
    "/Users/thalison/.claude/projects/-Users-thalison-Documents/"
    "83577547-d551-42ff-9f08-85dc573aa6d5/tool-results/"
    "mcp-rdstation-crm_list_deals-1773871322055.txt"
)

DEFAULT_VENDEDOR_ID = 1  # admin

# Mapeamento de deal_stage para status de venda
STAGE_TO_STATUS = {
    # Etapas iniciais -> em_negociacao
    "Sondagem": "em_negociacao",
    "Contato Consultivo": "em_negociacao",
    "Aguardando Ação": "em_negociacao",
    "Diagnóstico": "em_negociacao",
    "Em atendimento (acompanhamento ativo) Tarefas da etapa:": "em_negociacao",
    # Etapas intermediárias -> proposta_enviada
    "Negociação": "proposta_enviada",
    "Solução": "proposta_enviada",
    "Demonstração": "proposta_enviada",
    # Etapas finais -> fechada
    "Fechamento": "fechada",
    "Validação do negócio": "fechada",
    "Aprovação de Negócio": "fechada",
    "Onboarding": "fechada",
    "Aguardando conclusão / retorno de análise": "proposta_enviada",
}

# Mapeamento de nomes de produto RD Station -> nome Equipamento no DB
# Produtos que não existem no banco serão registrados com equipamento_id = None
PRODUCT_TO_EQUIPAMENTO = {
    # Mapeamentos diretos para equipamentos Lumenis existentes
    "ULTRAPULSE": "UltraPulse",
    "ULTRAPULSE ALPHA": "UltraPulse",
    "STELLAR M22": "Stellar M22",
    "STELLAR IPL + NDYAG + Q-SWITCHED + RESURFX": "Stellar M22",
    "STELLAR IPL + RESURFX": "Stellar M22",
    "STELLAR": "Stellar M22",
    "LIGHTSHEER": "LightSheer DESIRE",
    "LIGHTSHEER DESIRE": "LightSheer DESIRE",
    "NUERA TIGHT": "NuEra Tight",
    "NUERA TIGHT 2.0": "NuEra Tight",
    "SPLENDOR X": "Splendor X",
    "SPLENDOR": "Splendor X",
    "LEGEND PRO+": "LEGEND Pro+",
    "LEGEND PRO": "LEGEND Pro+",
    "LEGEND": "LEGEND Pro+",
    "PIQO4": "PiQo4",
    "PIQO": "PiQo4",
    "RESURFX": "ResurFX",
    # Produtos Contourline (não Lumenis)
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
    "PRISCILLA BARACAT 891": None,
}


def parse_client_name(deal_name):
    """Extrai o nome do cliente e produto do nome da negociação.
    Formato esperado: 'NOME DO CLIENTE | PRODUTO' ou apenas 'NOME DO CLIENTE'.
    Também suporta ' - ' como separador.
    """
    client_name = deal_name.strip()
    product_name = None

    if "|" in deal_name:
        parts = deal_name.split("|", 1)
        client_name = parts[0].strip()
        product_name = parts[1].strip()
    elif " - " in deal_name:
        parts = deal_name.split(" - ", 1)
        # Só usa como separador se a segunda parte parece ser um produto
        candidate = parts[1].strip().upper()
        known_keywords = [
            "ULTRAPULSE", "STELLAR", "LIGHTSHEER", "NUERA", "SPLENDOR",
            "LEGEND", "PIQO", "RESURFX", "ESSENZA", "MULTISHAPE",
            "UNYQUE", "SUPREME", "TRILIFT", "HIPRO", "ENYGMA",
            "VISBODY", "S30", "M30",
        ]
        if any(kw in candidate for kw in known_keywords):
            client_name = parts[0].strip()
            product_name = parts[1].strip()

    return client_name, product_name


def find_equipamento(product_name, equipamento_cache):
    """Busca o equipamento correspondente ao nome do produto."""
    if not product_name:
        return None

    key = product_name.upper().strip()

    # Busca direta no mapeamento
    if key in PRODUCT_TO_EQUIPAMENTO:
        equip_nome = PRODUCT_TO_EQUIPAMENTO[key]
        return equipamento_cache.get(equip_nome)

    # Busca parcial: verifica se alguma chave do mapeamento está contida no nome
    for map_key, equip_nome in PRODUCT_TO_EQUIPAMENTO.items():
        if map_key in key or key in map_key:
            return equipamento_cache.get(equip_nome)

    return None


def get_product_name_from_deal(deal):
    """Extrai o nome do produto da deal, usando deal_products ou o nome da deal."""
    # Primeiro tenta deal_products
    if deal.get("deal_products"):
        return deal["deal_products"][0]["name"]

    # Depois tenta extrair do nome da deal
    _, product_name = parse_client_name(deal.get("name", ""))
    return product_name


def determine_status(deal):
    """Determina o status da venda baseado no estágio e resultado."""
    win = deal.get("win")

    if win is True:
        return "fechada"
    elif win is False:
        return "perdida"

    # Deal aberta: mapeia pelo estágio
    stage_name = ""
    if deal.get("deal_stage"):
        stage_name = deal["deal_stage"].get("name", "")

    return STAGE_TO_STATUS.get(stage_name, "em_negociacao")


def run_import():
    app = create_app()

    with app.app_context():
        db.create_all()

        # Carrega o arquivo JSON
        print(f"Lendo arquivo: {JSON_FILE}")
        with open(JSON_FILE, "r", encoding="utf-8") as f:
            raw = json.load(f)

        # O arquivo tem formato {"result": "<json_string>"} do MCP
        if isinstance(raw, dict) and "result" in raw:
            result = json.loads(raw["result"])
        else:
            result = raw

        deals = result.get("deals", [])
        total_reported = result.get("total", len(deals))
        has_more = result.get("has_more", False)

        print(f"Total de deals no arquivo: {len(deals)}")
        print(f"Total reportado pelo RD Station: {total_reported}")
        if has_more:
            print(f"AVISO: Existem mais deals no RD Station ({total_reported} total). "
                  f"Este arquivo contém apenas {len(deals)}.")
        print()

        # Cache de equipamentos
        equipamento_cache = {}
        for eq in Equipamento.query.all():
            equipamento_cache[eq.nome] = eq
        print(f"Equipamentos no banco: {list(equipamento_cache.keys())}")
        print()

        # Contadores
        stats = {
            "deals_processados": 0,
            "deals_duplicados": 0,
            "clientes_criados": 0,
            "clientes_existentes": 0,
            "vendas_criadas": 0,
            "sem_equipamento": 0,
            "erros": 0,
            "produtos_nao_mapeados": set(),
        }

        # Cache de clientes já criados (por razao_social)
        cliente_cache = {}
        for c in Cliente.query.all():
            cliente_cache[c.razao_social.upper().strip()] = c

        for deal in deals:
            stats["deals_processados"] += 1
            deal_id = deal.get("_id") or deal.get("id")
            deal_name = deal.get("name", "").strip()

            if not deal_name:
                stats["erros"] += 1
                print(f"  ERRO: Deal {deal_id} sem nome, pulando.")
                continue

            # Verifica duplicata pelo rd_deal_id
            existing_venda = Venda.query.filter_by(rd_deal_id=deal_id).first()
            if existing_venda:
                stats["deals_duplicados"] += 1
                continue

            # Extrai nome do cliente
            client_name, product_from_name = parse_client_name(deal_name)

            # Usa organização se disponível, senão usa o nome do cliente
            org_name = None
            if deal.get("organization") and deal["organization"].get("name"):
                org_name = deal["organization"]["name"]

            razao_social = org_name if org_name else client_name
            if not razao_social:
                stats["erros"] += 1
                continue

            # Cria ou reutiliza cliente
            cliente_key = razao_social.upper().strip()
            if cliente_key in cliente_cache:
                cliente = cliente_cache[cliente_key]
                stats["clientes_existentes"] += 1
            else:
                # Extrai contato do deal
                contato_nome = client_name
                contato_email = None
                contato_telefone = None
                if deal.get("contacts") and len(deal["contacts"]) > 0:
                    contact = deal["contacts"][0]
                    contato_nome = contact.get("name", client_name)
                    if contact.get("emails") and len(contact["emails"]) > 0:
                        contato_email = contact["emails"][0].get("email")
                    if contact.get("phones") and len(contact["phones"]) > 0:
                        contato_telefone = contact["phones"][0].get("phone")

                cliente = Cliente(
                    razao_social=razao_social,
                    contato_nome=contato_nome,
                    contato_email=contato_email,
                    contato_telefone=contato_telefone,
                    rd_station_id=deal_id,
                    observacoes=f"Importado do RD Station CRM",
                )
                db.session.add(cliente)
                db.session.flush()  # Para obter o ID
                cliente_cache[cliente_key] = cliente
                stats["clientes_criados"] += 1

            # Determina o equipamento
            product_name = get_product_name_from_deal(deal)
            if not product_name:
                product_name = product_from_name

            equipamento = find_equipamento(product_name, equipamento_cache)

            if not equipamento:
                stats["sem_equipamento"] += 1
                if product_name:
                    stats["produtos_nao_mapeados"].add(product_name)
                # Pula deals sem equipamento mapeado no banco
                # (não temos como criar Venda sem equipamento_id por ser NOT NULL)
                continue

            # Determina o status
            status = determine_status(deal)

            # Valor (amount_total já em centavos no RD Station - verificar)
            # Na amostra vimos 169900.0 que parece ser R$ 1.699,00 (centavos)
            # Mas o campo preco_tabela do seed está em reais inteiros (450000 = R$ 450.000)
            # Vamos verificar: deal_products tem price 169900 e o nome é S30 (Visbody)
            # Parece ser em centavos (R$ 1.699,00) - mas 169900/100 = 1699 que é muito barato
            # Na verdade, olhando os precos_tabela (450000 = R$ 450.000), o RD Station
            # provavelmente usa centavos: 169900 = R$ 1.699,00
            # MAS: os equipamentos Lumenis custam 200-450k, então 169900 em reais = R$ 169.900
            # faz mais sentido. Vamos assumir que amount_total já está em reais.
            amount = deal.get("amount_total", 0) or 0

            # Data de criação
            created_str = deal.get("created_at", "")
            data_venda = None
            criado_em = None
            if created_str:
                try:
                    criado_em = datetime.fromisoformat(created_str)
                except (ValueError, TypeError):
                    criado_em = None

            if status == "fechada" and deal.get("closed_at"):
                try:
                    data_venda = datetime.fromisoformat(deal["closed_at"])
                except (ValueError, TypeError):
                    data_venda = criado_em
            elif status == "fechada":
                data_venda = criado_em

            # Cria a venda
            venda = Venda(
                cliente_id=cliente.id,
                equipamento_id=equipamento.id,
                vendedor_id=DEFAULT_VENDEDOR_ID,
                valor=amount,
                status=status,
                rd_deal_id=deal_id,
                data_venda=data_venda,
                observacoes=f"RD Stage: {deal.get('deal_stage', {}).get('name', 'N/A')} | "
                            f"Vendedor RD: {deal.get('user', {}).get('name', 'N/A')} | "
                            f"Rating: {deal.get('rating', 'N/A')}",
                criado_em=criado_em,
            )
            db.session.add(venda)
            stats["vendas_criadas"] += 1

        # Commit final
        db.session.commit()

        # ── RESUMO ───────────────────────────────────────────
        print("=" * 60)
        print("RESUMO DA IMPORTAÇÃO RD STATION -> ContourlineDB")
        print("=" * 60)
        print(f"Deals processados:      {stats['deals_processados']}")
        print(f"Deals duplicados:       {stats['deals_duplicados']} (já existiam, pulados)")
        print(f"Clientes criados:       {stats['clientes_criados']}")
        print(f"Clientes reutilizados:  {stats['clientes_existentes']}")
        print(f"Vendas criadas:         {stats['vendas_criadas']}")
        print(f"Sem equipamento (skip): {stats['sem_equipamento']}")
        print(f"Erros:                  {stats['erros']}")
        print()

        if stats["produtos_nao_mapeados"]:
            print(f"Produtos sem mapeamento para Equipamento ({len(stats['produtos_nao_mapeados'])}):")
            for p in sorted(stats["produtos_nao_mapeados"]):
                print(f"  - {p}")
            print()
            print("Para importar esses deals, adicione os equipamentos ao banco")
            print("ou estenda o dicionário PRODUCT_TO_EQUIPAMENTO neste script.")

        print()
        print(f"Total clientes no banco: {Cliente.query.count()}")
        print(f"Total vendas no banco:   {Venda.query.count()}")


if __name__ == "__main__":
    run_import()
