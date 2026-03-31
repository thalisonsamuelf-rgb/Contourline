# Contourline Academy

Plataforma LMS (Learning Management System) da Contourline para treinamento de profissionais em equipamentos de estetica.

## Visao Geral

O Contourline Academy e a plataforma de cursos online da Contourline, oferecendo treinamentos teoricos e praticos sobre equipamentos esteticos (laser, radiofrequencia, ultrassom, criofrequencia) e conteudos de gestao para clinicas.

### Numeros

- **21 cursos** publicados (equipamentos + gestao)
- **61 aulas** distribuidas em 16 modulos
- **6 categorias** (Equipamentos, Inicio, Treinamentos, etc.)
- **1.379 membros** cadastrados (via MemberKit)
- Integracao com **Vimeo** para hospedagem de videos

## Stack Tecnologico

| Camada | Tecnologia |
|--------|-----------|
| **Backend** | Flask 3.1 (Python) |
| **Banco de Dados** | Supabase (PostgreSQL) + SQLite (local) |
| **Autenticacao** | Supabase Auth |
| **Frontend** | Jinja2 + Bootstrap 5 + CSS custom |
| **Video Player** | Vimeo Player SDK |
| **Preview/Prototipo** | HTML standalone com Supabase API |

## Estrutura do Projeto

```
Contourline Academy/
├── app.py                  # Aplicacao Flask (40+ rotas)
├── models.py               # 14 modelos SQLAlchemy (ORM)
├── config.py               # Configuracao (SECRET_KEY, DB URI)
├── requirements.txt        # Dependencias Python
├── seed_data.py            # Script para popular banco inicial
├── iniciar.sh              # Script de inicializacao
├── login.html              # Pagina de login (Supabase Auth)
├── preview-academy.html    # Preview LMS (dados do Supabase)
├── contourline.db          # Banco SQLite local
│
├── templates/              # Templates Jinja2
│   ├── base.html           # Layout base (navbar, flash messages)
│   ├── login.html          # Login Flask
│   ├── dashboard.html      # Dashboard com KPIs
│   ├── academy/            # Modulo Academy
│   │   ├── lista.html      # Lista de alunos
│   │   ├── detalhe.html    # Detalhe do aluno
│   │   ├── formulario.html # Matricula
│   │   ├── cursos_lista.html
│   │   └── curso_formulario.html
│   ├── equipamentos/       # Catalogo de equipamentos
│   ├── clientes/           # Gestao de clientes
│   ├── vendas/             # Pipeline de vendas
│   ├── chamados/           # Suporte tecnico
│   └── admin/              # Gestao de usuarios
│
├── static/
│   ├── css/style.css       # Tema Contourline
│   └── img/
│       ├── capas/          # 17 capas de cursos (PNG)
│       ├── logo-contourline.png
│       └── login-bg*.png   # Backgrounds de login
│
└── import_rdstation.py     # Importacao de dados do RD Station CRM
```

## Modelos de Dados

### Negocio
- **Usuario** — Usuarios do sistema (admin, vendedor, tecnico, marketing)
- **Equipamento** — Catalogo de equipamentos esteticos (Lumenis, Body Health)
- **Cliente** — Clientes B2B (clinicas, hospitais)
- **Venda** — Pipeline de vendas (negociacao → proposta → fechada)
- **Chamado** — Tickets de suporte tecnico

### Academy (LMS)
- **CategoriaAcademy** — Categorias de cursos (Equipamentos, Inicio)
- **CursoAcademy** — Cursos com metadados (duracao, thumbnail, status)
- **ModuloAcademy** — Modulos dentro de um curso (ordenados)
- **AulaAcademy** — Aulas/conteudos (video, texto, PDF, quiz)
- **MatriculaAcademy** — Matriculas com progresso (%)
- **ProgressoAcademy** — Progresso por aula (concluida, anotacao, favorito)
- **TurmaAcademy** — Turmas/cohorts com data inicio/fim

### Supabase (Producao)
As tabelas `academy_*` no Supabase espelham os modelos acima com UUIDs, slugs e campos adicionais (meta_title, equipment_name, etc.).

## Como Rodar

### Requisitos
- Python 3.10+
- pip

### Instalacao

```bash
# Clonar e entrar no diretorio
cd "Contourline Academy"

# Instalar dependencias
pip install -r requirements.txt

# Popular banco com dados iniciais
python3 seed_data.py

# Iniciar servidor
python3 app.py
```

Ou use o script automatizado:

```bash
chmod +x iniciar.sh
./iniciar.sh
```

### Acesso
- **URL**: http://localhost:5050
- **Admin**: thalison@contourline.com.br
- **Senha**: contourline2026

## Preview (Supabase)

O arquivo `preview-academy.html` e um prototipo standalone que carrega dados diretamente do Supabase via API REST. Abra no navegador para visualizar o Academy com dados reais.

O `login.html` integra com Supabase Auth para autenticacao real.

## Cursos Disponíveis

### Categoria: Inicio
| Curso | Tipo |
|-------|------|
| Marketing para Clinicas | Masterclass |
| Metodo RTC | Metodologia |
| Atendimento Magico | Customer Experience |
| Master Class | Lives |
| Tomada de Decisao | Gestao |
| Gerenciamento do Envelhecimento | Clinico |
| Programa de Indicacao | Vendas |
| Hipro HOF Teorico | Teorico |

### Categoria: Equipamentos
| Curso | Marca |
|-------|-------|
| Unyque PRO | Body Health |
| Iconyc | Body Health |
| MultiShape | Contourline |
| X-Tonus | Contourline |
| HIPRO | Contourline |
| Enygma X-Orbital | Body Health |
| Laser Crystal 3D Plus | — |
| Ultralift | Contourline |
| Supreme PRO | Body Health |
| Criofrequencia & HimFU | — |
| Adena Laser | — |
| Laser Crystal 3D | — |

## Integracoes

| Servico | Status | Uso |
|---------|--------|-----|
| **Supabase** | Ativo | Banco de dados + Auth |
| **Vimeo** | Ativo | Hospedagem de videos |
| **MemberKit** | Referencia | LMS atual (contourline-academy.memberkit.com.br) |
| **RD Station** | Parcial | CRM / Pipeline de vendas |

## Roadmap

### Fase 1: Consolidacao
- [ ] Migrar Flask para Supabase PostgreSQL
- [ ] Unificar autenticacao (Supabase Auth)
- [ ] Mover credenciais para `.env`

### Fase 2: Infraestrutura
- [ ] Dockerizar aplicacao
- [ ] Setup Supabase RLS policies
- [ ] CI/CD com GitHub Actions
- [ ] Deploy em producao

### Fase 3: Produto
- [ ] Player Vimeo integrado no backend
- [ ] Sistema de progresso e certificados PDF
- [ ] Gamificacao (XP, ranking, badges)
- [ ] Quizzes por modulo
- [ ] Dashboard do aluno

### Fase 4: Escala
- [ ] Analytics de engajamento
- [ ] Integracao RD Station automatica
- [ ] PWA mobile
- [ ] CDN para videos e imagens

## Equipe

- **Thalison Samuel** — Marketing / Gestao
- **AIOX Framework** — Desenvolvimento assistido por IA

---

*Contourline Academy - Plataforma de treinamento para profissionais de estetica*
