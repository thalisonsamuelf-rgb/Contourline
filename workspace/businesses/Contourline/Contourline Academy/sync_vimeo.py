"""
Sincronizacao Vimeo → Supabase
Puxa videos das pastas do Vimeo e atualiza as aulas no Supabase.

Uso:
    python3 sync_vimeo.py           # Listar pastas e videos
    python3 sync_vimeo.py --sync    # Sincronizar com Supabase
    python3 sync_vimeo.py --map     # Mostrar mapeamento pastas→cursos
"""

import json
import sys
import time
import urllib.request
import urllib.parse
import ssl

# Fix SSL on macOS
ssl._create_default_https_context = ssl._create_unverified_context

# ── CONFIG ────────────────────────────────────────────
VIMEO_TOKEN = 'c6452961de0096cc48ce88813d83d72f'
SUPABASE_URL = 'https://lyifnttxpoypwibbffnv.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aWZudHR4cG95cHdpYmJmZm52Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM0NjcxNCwiZXhwIjoyMDY1OTIyNzE0fQ.UP0B9Bb4NncVhaSqlbUWX74xspisyEphKFW98ECjy1g'

# Mapeamento: pasta Vimeo → curso no Supabase (por titulo)
FOLDER_TO_COURSE = {
    'Treinamento Unyque': 'Unyque PRO',
    'Unyque Pro Complementar': 'Unyque PRO',
    'Treinamento Iconyc': 'Iconyc',
    'Treinamento Multishape': 'MultiShape',
    'Treinamento Hipro': 'HIPRO',
    'Novo Treinamento Hipro': 'HIPRO',
    'Treinamento Enygma BHS 156': 'Enygma X-Orbital',
    'Treinamento Crystal 3D': 'Laser Crystal 3D',
    'Treinamento Crystal 3D Plus': 'Laser Crystal 3D Plus',
    'Treinamento Adena': 'Adena Laser',
    'Treinamento BHS 156': 'Criofrequência & HImFU',
    'Aula Teórica ULTRALIFT': 'Ultralift',
    'Montagem ULTRALIFT': 'Ultralift',
    'Aplicação Feminina Xtonus': 'X-Tonus',
    'Montagem X-Tonus': 'X-Tonus',
    'XTonus': 'X-Tonus',
    'Speaker HOF': 'Hipro HOF Teórico',
    'Hipro Hof': 'Hipro HOF Teórico',
    'Curso Telma': 'Gerenciamento do Envelhecimento',
    'MasterClass': 'Master Class',
    'Treinamento Disney': 'Humanização das experiências do cliente',
    'Treinamento Indicação -  Rodrigo': 'Como Criar um programa de Indicação para Clínicas de estética',
    'Rodrigo Noll': 'Como Criar um programa de Indicação para Clínicas de estética',
}


# ── VIMEO API ─────────────────────────────────────────
def vimeo_get(endpoint, params=None):
    url = f'https://api.vimeo.com{endpoint}'
    if params:
        url += '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={
        'Authorization': f'Bearer {VIMEO_TOKEN}',
        'Accept': 'application/vnd.vimeo.*+json;version=3.4',
    })
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def get_folders():
    """Lista todas as pastas do Vimeo."""
    data = vimeo_get('/me/folders', {'per_page': 100, 'sort': 'name'})
    return data.get('data', [])


def get_folder_videos(folder_uri, per_page=100):
    """Lista videos de uma pasta."""
    all_videos = []
    page = 1
    while True:
        try:
            data = vimeo_get(f'{folder_uri}/items', {'per_page': per_page, 'page': page})
            items = data.get('data', [])
            for item in items:
                video = item.get('video') or item
                if video.get('type') == 'video' or video.get('uri', '').startswith('/videos/'):
                    all_videos.append(video)
            if len(items) < per_page:
                break
            page += 1
            time.sleep(0.5)
        except Exception as e:
            # Fallback: try /videos endpoint
            try:
                data = vimeo_get(f'{folder_uri}/videos', {'per_page': per_page, 'page': page})
                all_videos.extend(data.get('data', []))
            except:
                pass
            break
    return all_videos


# ── SUPABASE API ──────────────────────────────────────
def sb_request(method, path, data=None):
    url = f'{SUPABASE_URL}/rest/v1/{path}'
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
    }
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f'  ERRO Supabase: {e.code} {e.read().decode()[:200]}')
        return None


def get_courses():
    """Busca todos os cursos do Supabase."""
    return sb_request('GET', 'academy_courses?select=id,title&order=title') or []


def get_modules(course_id):
    """Busca modulos de um curso."""
    return sb_request('GET', f'academy_modules?select=id,title,order_index&course_id=eq.{course_id}&order=order_index') or []


def get_lessons(module_id):
    """Busca aulas de um modulo."""
    return sb_request('GET', f'academy_lessons?select=id,title,vimeo_id,vimeo_url&module_id=eq.{module_id}') or []


def update_lesson(lesson_id, vimeo_data):
    """Atualiza uma aula com dados do Vimeo."""
    return sb_request('PATCH', f'academy_lessons?id=eq.{lesson_id}', vimeo_data)


def create_lesson(data):
    """Cria nova aula no Supabase."""
    return sb_request('POST', 'academy_lessons', data)


# ── HELPERS ───────────────────────────────────────────
def extract_vimeo_id(uri):
    """Extrai ID do video da URI do Vimeo (/videos/12345)."""
    return uri.split('/')[-1] if uri else None


def format_duration(seconds):
    """Formata segundos em Xh Xmin."""
    if not seconds:
        return '0min'
    h, m = divmod(int(seconds), 3600)
    m = m // 60
    return f'{h}h {m}min' if h else f'{m}min'


# ── COMANDOS ──────────────────────────────────────────
def cmd_list():
    """Lista pastas e quantidade de videos."""
    print('\n=== PASTAS NO VIMEO (Contourline) ===\n')
    folders = get_folders()
    total_videos = 0
    for f in folders:
        vcount = f.get('metadata', {}).get('connections', {}).get('videos', {}).get('total', 0)
        mapped = FOLDER_TO_COURSE.get(f['name'], '—')
        marker = ' ✓' if mapped != '—' else ''
        print(f'  {vcount:3d} videos | {f["name"]:<45} → {mapped}{marker}')
        total_videos += vcount
    print(f'\n  Total: {total_videos} videos em {len(folders)} pastas')
    mapped_count = sum(1 for f in folders if f['name'] in FOLDER_TO_COURSE)
    print(f'  Mapeadas: {mapped_count}/{len(folders)} pastas')


def cmd_map():
    """Mostra mapeamento detalhado pastas→cursos com videos."""
    print('\n=== MAPEAMENTO VIMEO → SUPABASE ===\n')
    folders = get_folders()
    courses = get_courses()
    course_map = {c['title']: c['id'] for c in courses}

    for folder in folders:
        course_name = FOLDER_TO_COURSE.get(folder['name'])
        if not course_name:
            continue

        course_id = course_map.get(course_name, 'NAO ENCONTRADO')
        vcount = folder.get('metadata', {}).get('connections', {}).get('videos', {}).get('total', 0)

        print(f'📁 {folder["name"]} ({vcount} videos)')
        print(f'   → Curso: {course_name} [{course_id[:8] if len(str(course_id)) > 8 else course_id}]')

        if vcount > 0 and vcount <= 50:
            videos = get_folder_videos(folder['uri'])
            for i, v in enumerate(videos):
                vid = extract_vimeo_id(v['uri'])
                dur = format_duration(v.get('duration', 0))
                print(f'   {i+1:2d}. [{vid}] {v["name"][:60]} ({dur})')
            time.sleep(0.3)
        print()


def cmd_sync():
    """Sincroniza videos do Vimeo para aulas no Supabase."""
    print('\n=== SINCRONIZACAO VIMEO → SUPABASE ===\n')
    folders = get_folders()
    courses = get_courses()
    course_map = {c['title']: c['id'] for c in courses}

    stats = {'updated': 0, 'created': 0, 'skipped': 0, 'errors': 0}

    for folder in folders:
        course_name = FOLDER_TO_COURSE.get(folder['name'])
        if not course_name:
            continue

        course_id = course_map.get(course_name)
        if not course_id:
            print(f'  SKIP: Curso "{course_name}" nao encontrado no Supabase')
            stats['skipped'] += 1
            continue

        vcount = folder.get('metadata', {}).get('connections', {}).get('videos', {}).get('total', 0)
        if vcount == 0:
            continue

        print(f'\n📁 {folder["name"]} → {course_name}')

        # Buscar modulos do curso
        modules = get_modules(course_id)
        if not modules:
            print(f'  WARN: Curso sem modulos, criando modulo padrao...')
            # Criar modulo padrao
            mod = sb_request('POST', 'academy_modules', {
                'course_id': course_id,
                'title': folder['name'],
                'slug': folder['name'].lower().replace(' ', '-'),
                'order_index': 0,
            })
            if mod:
                modules = mod if isinstance(mod, list) else [mod]
            else:
                stats['errors'] += 1
                continue

        target_module = modules[0]  # Primeiro modulo como destino padrao

        # Buscar aulas existentes no modulo
        existing_lessons = get_lessons(target_module['id'])
        existing_vimeo_ids = {l.get('vimeo_id') for l in existing_lessons if l.get('vimeo_id')}

        # Buscar videos da pasta
        videos = get_folder_videos(folder['uri'])

        for i, video in enumerate(videos):
            vid = extract_vimeo_id(video['uri'])
            vimeo_url = f'https://vimeo.com/{vid}'
            duration = video.get('duration', 0)
            title = video.get('name', f'Video {vid}')
            thumb = None
            if video.get('pictures', {}).get('sizes'):
                thumb = video['pictures']['sizes'][-1].get('link')

            if vid in existing_vimeo_ids:
                # Atualizar aula existente com dados do Vimeo
                lesson = next(l for l in existing_lessons if l.get('vimeo_id') == vid)
                update_lesson(lesson['id'], {
                    'vimeo_url': vimeo_url,
                    'duration_seconds': duration,
                    'thumbnail_url': thumb,
                })
                print(f'  ↻ Atualizado: {title[:50]} ({format_duration(duration)})')
                stats['updated'] += 1
            else:
                # Criar nova aula
                slug = title.lower().replace(' ', '-').replace('.', '')[:80]
                result = create_lesson({
                    'module_id': target_module['id'],
                    'title': title,
                    'slug': slug,
                    'vimeo_id': vid,
                    'vimeo_url': vimeo_url,
                    'duration_seconds': duration,
                    'thumbnail_url': thumb,
                    'order_index': i,
                    'is_published': True,
                    'xp_reward': 25,
                })
                if result:
                    print(f'  + Criado: {title[:50]} ({format_duration(duration)})')
                    stats['created'] += 1
                else:
                    stats['errors'] += 1

            time.sleep(0.2)

    print(f'\n=== RESULTADO ===')
    print(f'  Criados:     {stats["created"]}')
    print(f'  Atualizados: {stats["updated"]}')
    print(f'  Ignorados:   {stats["skipped"]}')
    print(f'  Erros:       {stats["errors"]}')


# ── MAIN ──────────────────────────────────────────────
if __name__ == '__main__':
    if '--sync' in sys.argv:
        cmd_sync()
    elif '--map' in sys.argv:
        cmd_map()
    else:
        cmd_list()
