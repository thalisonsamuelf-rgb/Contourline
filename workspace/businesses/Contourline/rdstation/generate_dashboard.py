#!/usr/bin/env python3
"""Dashboard Comercial Contourline 2026 - Server + Data Collector"""
import httpx, json, os, sys, time
from collections import defaultdict, Counter
from flask import Flask, jsonify, send_file
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), 'mcp-server', '.env'))
TOKEN = os.getenv('CRM_TOKEN')
BASE = 'https://crm.rdstation.com/api/v1'
DATA_FILE = os.path.join(os.path.dirname(__file__), 'dashboard_data.json')
HTML_FILE = os.path.join(os.path.dirname(__file__), 'dashboard.html')

EQUIP_FIELD = '6877f290dbb82500208494a5'
FONTE_FIELD = '69a6da473bfb3600166be34d'
ESPEC_FIELD = '685ea0a0d399c20014c5fff8'

STAGE_PIPELINE = {
    "698f7217a770e7001397f7ac": "VENDAS", "698f7217a770e7001397f7ad": "VENDAS",
    "698f7217a770e7001397f7ae": "VENDAS", "698f7217a770e7001397f7af": "VENDAS",
    "698f7217a770e7001397f7b0": "VENDAS", "69a59504a67fcb00153defec": "VENDAS",
    "6866dce3c3f98300270f3121": "HIGH TICKET", "692f3e572954cc0013f113a5": "HIGH TICKET",
    "6866dce3c3f98300270f3122": "HIGH TICKET", "6866dce3c3f98300270f3123": "HIGH TICKET",
    "6866dce3c3f98300270f3124": "HIGH TICKET", "6866dce3c3f98300270f3125": "HIGH TICKET",
    "6960186f729d3400243fcd27": "HIGH TICKET",
    "699634f0cb5aa400132abc7f": "SDR", "699634f0cb5aa400132abc80": "SDR",
    "699634f0cb5aa400132abc81": "SDR", "699634f0cb5aa400132abc82": "SDR",
}

def get_custom(deal, field_id):
    for cf in (deal.get('deal_custom_fields') or []):
        if cf.get('custom_field_id') == field_id:
            v = cf.get('value')
            if isinstance(v, list):
                return ', '.join(str(x) for x in v) if v else ''
            return str(v) if v else ''
    return ''

def fetch_all_deals():
    all_deals = []
    page = 1
    while True:
        r = httpx.get(f'{BASE}/deals', params={'token': TOKEN, 'limit': 200, 'page': page},
                      timeout=60, follow_redirects=True)
        data = r.json()
        batch = data.get('deals', [])
        if not batch:
            break
        all_deals.extend(batch)
        print(f'  Deals: {len(all_deals)}/{data.get("total","?")}', flush=True)
        if not data.get('has_more', False):
            break
        page += 1
    return all_deals

def build_dashboard_data():
    print('Coletando dados do CRM...', flush=True)
    all_deals = fetch_all_deals()
    print(f'Total: {len(all_deals)} deals', flush=True)

    # Filter 2026 + target pipelines, build raw records
    records = []
    for d in all_deals:
        created = d.get('created_at', '')
        if not created.startswith('2026'):
            continue
        sid = (d.get('deal_stage') or {}).get('_id', '')
        pl = STAGE_PIPELINE.get(sid)
        if not pl:
            continue
        records.append({
            'id': d.get('_id'),
            'name': d.get('name', ''),
            'pipeline': pl,
            'stage': (d.get('deal_stage') or {}).get('name', ''),
            'user': (d.get('user') or {}).get('name', 'Sem vendedor'),
            'win': d.get('win'),
            'amount': (d.get('amount_total') or 0) / 100,
            'month': created[:7],
            'created_at': created[:10],
            'equipment': get_custom(d, EQUIP_FIELD),
            'source': get_custom(d, FONTE_FIELD),
            'specialty': get_custom(d, ESPEC_FIELD),
            'lost_reason': (d.get('deal_lost_reason') or {}).get('name', 'Sem motivo'),
        })

    # Build filter options
    equipments = sorted(set(r['equipment'] for r in records if r['equipment']))
    users = sorted(set(r['user'] for r in records))
    sources = sorted(set(r['source'] for r in records if r['source']))
    specialties = sorted(set(r['specialty'] for r in records if r['specialty']))
    months = sorted(set(r['month'] for r in records))

    MONTH_NAMES = {'01':'Jan','02':'Fev','03':'Mar','04':'Abr','05':'Mai','06':'Jun',
                   '07':'Jul','08':'Ago','09':'Set','10':'Out','11':'Nov','12':'Dez'}

    data = {
        'generated': time.strftime('%d/%m/%Y %H:%M'),
        'filters': {
            'equipments': equipments,
            'users': users,
            'sources': sources,
            'specialties': specialties,
            'months': [{'value': m, 'label': MONTH_NAMES.get(m[5:7], m)} for m in months],
        },
        'records': records,
    }

    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, ensure_ascii=False)
    print(f'Dados salvos: {len(records)} registros de 2026', flush=True)
    return data

# Flask app
app = Flask(__name__)

@app.route('/')
def index():
    return send_file(HTML_FILE)

@app.route('/api/data')
def get_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE) as f:
            return jsonify(json.load(f))
    return jsonify({'error': 'No data. Click refresh.'}), 404

@app.route('/api/refresh')
def refresh():
    data = build_dashboard_data()
    return jsonify({'ok': True, 'records': len(data['records']), 'generated': data['generated']})

if __name__ == '__main__':
    if '--collect' in sys.argv:
        build_dashboard_data()
    else:
        if not os.path.exists(DATA_FILE):
            build_dashboard_data()
        print('\n=== Dashboard rodando em http://localhost:8080 ===\n')
        app.run(host='0.0.0.0', port=8080, debug=False)
