import requests
import json
import time
import sys

TOKEN = '689b53d02814af0016699678'
BASE_URL = 'https://crm.rdstation.com/api/v1'
PIPELINE_ID = '6866dce3c3f98300270f311f'
EQUIP_FIELD_ID = '6877f290dbb82500208494a5'

def fetch_all_lost_deals():
    """Busca todas as negociações perdidas do funil High Ticket com paginação por cursor"""
    all_deals = []
    page_num = 0
    cursor = None
    seen_ids = set()

    while True:
        page_num += 1
        url = f'{BASE_URL}/deals?token={TOKEN}&deal_pipeline_id={PIPELINE_ID}&win=false&limit=200'
        if cursor:
            url += f'&page={cursor}'

        print(f'Buscando página {page_num}...')
        resp = requests.get(url, timeout=30)
        data = resp.json()

        deals = data.get('deals', [])

        # Detectar duplicatas para evitar loop infinito
        new_deals = []
        for d in deals:
            did = d.get('id', '')
            if did not in seen_ids:
                seen_ids.add(did)
                new_deals.append(d)

        all_deals.extend(new_deals)

        has_more = data.get('has_more', False)
        next_page = data.get('next_page', None)

        print(f'  -> {len(new_deals)} novas negociações (total: {len(all_deals)})')

        if not has_more or not next_page or len(new_deals) == 0:
            break

        cursor = next_page
        time.sleep(0.5)

    return all_deals

def get_equipment(deal):
    """Extrai o equipamento do campo personalizado"""
    custom_fields = deal.get('deal_custom_fields', [])
    if not custom_fields:
        return ''
    for f in custom_fields:
        if f.get('custom_field_id') == EQUIP_FIELD_ID:
            val = f.get('value')
            if val and val != '':
                return str(val).strip()
    return ''

def compute_new_name(deal):
    """Calcula o novo nome padronizado"""
    current_name = deal.get('name', '').strip()
    equipment = get_equipment(deal)

    if '|' in current_name:
        parts = current_name.split('|')
        nome_parte = parts[0].strip().upper()
        equip_parte = '|'.join(parts[1:]).strip().upper()

        if equipment:
            new_name = f'{nome_parte} | {equipment.upper()}'
        else:
            new_name = f'{nome_parte} | {equip_parte}'
    else:
        nome_upper = current_name.upper()
        if equipment:
            new_name = f'{nome_upper} | {equipment.upper()}'
        else:
            new_name = nome_upper

    return new_name

def update_deal_name(deal_id, new_name):
    """Atualiza o nome da negociação via API"""
    url = f'{BASE_URL}/deals/{deal_id}?token={TOKEN}'
    payload = {'deal': {'name': new_name}}
    resp = requests.put(url, json=payload, timeout=30)
    return resp.status_code == 200

def main():
    print('='*60)
    print('ATUALIZAÇÃO DE NOMES - FUNIL HIGH TICKET (PERDIDAS)')
    print('='*60)

    # 1. Buscar todas as negociações
    print('\nBuscando todas as negociações perdidas...')
    deals = fetch_all_lost_deals()
    print(f'\nTotal encontrado: {len(deals)} negociações')

    # 2. Analisar e preparar atualizações
    updates = []
    no_change = []

    for deal in deals:
        deal_id = deal.get('id', '')
        current_name = deal.get('name', '').strip()
        new_name = compute_new_name(deal)
        equipment = get_equipment(deal)

        if new_name != current_name:
            updates.append({
                'id': deal_id,
                'old_name': current_name,
                'new_name': new_name,
                'equipamento': equipment
            })
        else:
            no_change.append({
                'id': deal_id,
                'name': current_name,
                'equipamento': equipment
            })

    print(f'\nAnálise:')
    print(f'   - Precisam atualizar: {len(updates)}')
    print(f'   - Já estão corretas: {len(no_change)}')

    # 3. Executar atualizações
    print(f'\nAtualizando {len(updates)} negociações...')
    success = 0
    errors = []

    for i, u in enumerate(updates):
        try:
            ok = update_deal_name(u['id'], u['new_name'])
            if ok:
                success += 1
            else:
                errors.append(u)
        except Exception as e:
            u['error'] = str(e)
            errors.append(u)

        if (i+1) % 50 == 0:
            print(f'   Progresso: {i+1}/{len(updates)} ({success} OK)')
            time.sleep(1)
        elif (i+1) % 10 == 0:
            time.sleep(0.3)

    print(f'\nConcluído: {success} atualizadas com sucesso')
    if errors:
        print(f'Erros: {len(errors)}')

    # 4. Gerar relatório MD
    report = generate_report(updates, no_change, errors, success, len(deals))
    with open('/Users/thalison/Documents/RDStation/atualizacao_negociacoes.md', 'w', encoding='utf-8') as f:
        f.write(report)
    print(f'\nRelatório salvo em /Users/thalison/Documents/RDStation/atualizacao_negociacoes.md')

def generate_report(updates, no_change, errors, success, total):
    lines = []
    lines.append('# Relatório de Atualização de Negociações')
    lines.append(f'## Funil: HIGH TICKET (Perdidas)')
    lines.append(f'**Data:** {time.strftime("%d/%m/%Y %H:%M")}')
    lines.append('')
    lines.append('## Resumo')
    lines.append(f'- **Total de negociações:** {total}')
    lines.append(f'- **Atualizadas com sucesso:** {success}')
    lines.append(f'- **Sem alteração necessária:** {len(no_change)}')
    lines.append(f'- **Erros:** {len(errors)}')
    lines.append('')

    if updates:
        lines.append('## Negociações Atualizadas')
        lines.append('')
        lines.append('| # | Nome Anterior | Nome Novo | Equipamento |')
        lines.append('|---|---|---|---|')
        for i, u in enumerate(updates):
            equip = u['equipamento'] if u['equipamento'] else '-'
            lines.append(f"| {i+1} | {u['old_name']} | {u['new_name']} | {equip} |")
        lines.append('')

    if no_change:
        lines.append('## Negociações Sem Alteração')
        lines.append('')
        lines.append('| # | Nome | Equipamento |')
        lines.append('|---|---|---|')
        for i, n in enumerate(no_change):
            equip = n['equipamento'] if n['equipamento'] else '-'
            lines.append(f"| {i+1} | {n['name']} | {equip} |")
        lines.append('')

    if errors:
        lines.append('## Erros')
        lines.append('')
        lines.append('| # | Nome | Erro |')
        lines.append('|---|---|---|')
        for i, e in enumerate(errors):
            err_msg = e.get('error', 'Falha na atualização')
            lines.append(f"| {i+1} | {e['old_name']} | {err_msg} |")

    return '\n'.join(lines)

if __name__ == '__main__':
    main()
