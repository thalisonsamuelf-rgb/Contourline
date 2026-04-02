from datetime import datetime, timezone
from functools import wraps

from flask import Flask, render_template, redirect, url_for, flash, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_wtf.csrf import CSRFProtect

from config import Config
from models import (db, Usuario, Equipamento, Cliente, Venda, Chamado,
                     CategoriaAcademy, CursoAcademy, ModuloAcademy, AulaAcademy,
                     MatriculaAcademy, ProgressoAcademy, TurmaAcademy)


# ── APP FACTORY ───────────────────────────────────────────
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CSRFProtect(app)

    login_manager = LoginManager()
    login_manager.login_view = 'login'
    login_manager.login_message = 'Faça login para acessar o sistema.'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return db.session.get(Usuario, int(user_id))

    # ── DECORADOR DE CARGO ────────────────────────────────
    def cargo_required(*cargos):
        def decorator(f):
            @wraps(f)
            def decorated_function(*args, **kwargs):
                if current_user.cargo not in cargos and current_user.cargo != 'admin':
                    flash('Acesso não autorizado.', 'danger')
                    return redirect(url_for('dashboard'))
                return f(*args, **kwargs)
            return decorated_function
        return decorator

    # ── CONTEXT PROCESSOR ─────────────────────────────────
    @app.context_processor
    def inject_now():
        return {'now': datetime.now(timezone.utc)}

    # ── AUTH ──────────────────────────────────────────────
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if current_user.is_authenticated:
            return redirect(url_for('dashboard'))
        if request.method == 'POST':
            email = request.form.get('email', '').strip()
            senha = request.form.get('senha', '')
            usuario = Usuario.query.filter_by(email=email).first()
            if usuario and usuario.verificar_senha(senha) and usuario.ativo:
                login_user(usuario)
                next_page = request.args.get('next')
                return redirect(next_page or url_for('dashboard'))
            flash('Email ou senha incorretos.', 'danger')
        return render_template('login.html')

    @app.route('/logout')
    @login_required
    def logout():
        logout_user()
        return redirect(url_for('login'))

    # ── DASHBOARD ────────────────────────────────────────
    @app.route('/')
    @login_required
    def dashboard():
        stats = {
            'total_clientes': Cliente.query.filter_by(ativo=True).count(),
            'total_equipamentos': Equipamento.query.filter_by(ativo=True).count(),
            'vendas_abertas': Venda.query.filter(Venda.status.in_(['em_negociacao', 'proposta_enviada'])).count(),
            'vendas_fechadas': Venda.query.filter_by(status='fechada').count(),
            'chamados_abertos': Chamado.query.filter(Chamado.status.in_(['aberto', 'em_andamento', 'aguardando_peca'])).count(),
            'alunos_academy': MatriculaAcademy.query.count(),
            'cursos_academy': CursoAcademy.query.filter_by(ativo=True).count(),
            'certificados_emitidos': MatriculaAcademy.query.filter_by(certificado_emitido=True).count(),
            'alunos_ativos': MatriculaAcademy.query.filter_by(status='ativa').count(),
        }
        vendas_recentes = Venda.query.order_by(Venda.criado_em.desc()).limit(5).all()
        chamados_recentes = Chamado.query.filter(Chamado.status != 'fechado').order_by(Chamado.criado_em.desc()).limit(5).all()
        return render_template('dashboard.html', stats=stats, vendas_recentes=vendas_recentes, chamados_recentes=chamados_recentes)

    # ── EQUIPAMENTOS ─────────────────────────────────────
    @app.route('/equipamentos')
    @login_required
    def equipamentos_lista():
        categoria = request.args.get('categoria', '')
        query = Equipamento.query.filter_by(ativo=True)
        if categoria:
            query = query.filter_by(categoria=categoria)
        equipamentos = query.order_by(Equipamento.nome).all()
        categorias = db.session.query(Equipamento.categoria).distinct().order_by(Equipamento.categoria).all()
        return render_template('equipamentos/lista.html', equipamentos=equipamentos, categorias=[c[0] for c in categorias], categoria_selecionada=categoria)

    @app.route('/equipamentos/<int:id>')
    @login_required
    def equipamento_detalhe(id):
        equip = db.session.get(Equipamento, id)
        if not equip:
            flash('Equipamento não encontrado.', 'warning')
            return redirect(url_for('equipamentos_lista'))
        vendas = Venda.query.filter_by(equipamento_id=id).order_by(Venda.criado_em.desc()).limit(10).all()
        return render_template('equipamentos/detalhe.html', equip=equip, vendas=vendas)

    # ── CLIENTES ─────────────────────────────────────────
    @app.route('/clientes')
    @login_required
    def clientes_lista():
        busca = request.args.get('busca', '')
        query = Cliente.query.filter_by(ativo=True)
        if busca:
            query = query.filter(
                db.or_(
                    Cliente.razao_social.ilike(f'%{busca}%'),
                    Cliente.nome_fantasia.ilike(f'%{busca}%'),
                    Cliente.cidade.ilike(f'%{busca}%'),
                    Cliente.contato_nome.ilike(f'%{busca}%'),
                )
            )
        clientes = query.order_by(Cliente.razao_social).all()
        return render_template('clientes/lista.html', clientes=clientes, busca=busca)

    @app.route('/clientes/novo', methods=['GET', 'POST'])
    @login_required
    @cargo_required('admin', 'vendedor', 'marketing')
    def cliente_novo():
        if request.method == 'POST':
            cliente = Cliente(
                razao_social=request.form['razao_social'],
                nome_fantasia=request.form.get('nome_fantasia'),
                cnpj=request.form.get('cnpj'),
                contato_nome=request.form.get('contato_nome'),
                contato_email=request.form.get('contato_email'),
                contato_telefone=request.form.get('contato_telefone'),
                endereco=request.form.get('endereco'),
                cidade=request.form.get('cidade'),
                estado=request.form.get('estado'),
                segmento=request.form.get('segmento'),
                observacoes=request.form.get('observacoes'),
            )
            db.session.add(cliente)
            db.session.commit()
            flash(f'Cliente "{cliente.razao_social}" cadastrado!', 'success')
            return redirect(url_for('clientes_lista'))
        return render_template('clientes/formulario.html', cliente=None)

    @app.route('/clientes/<int:id>/editar', methods=['GET', 'POST'])
    @login_required
    @cargo_required('admin', 'vendedor', 'marketing')
    def cliente_editar(id):
        cliente = db.session.get(Cliente, id)
        if not cliente:
            flash('Cliente não encontrado.', 'warning')
            return redirect(url_for('clientes_lista'))
        if request.method == 'POST':
            cliente.razao_social = request.form['razao_social']
            cliente.nome_fantasia = request.form.get('nome_fantasia')
            cliente.cnpj = request.form.get('cnpj')
            cliente.contato_nome = request.form.get('contato_nome')
            cliente.contato_email = request.form.get('contato_email')
            cliente.contato_telefone = request.form.get('contato_telefone')
            cliente.endereco = request.form.get('endereco')
            cliente.cidade = request.form.get('cidade')
            cliente.estado = request.form.get('estado')
            cliente.segmento = request.form.get('segmento')
            cliente.observacoes = request.form.get('observacoes')
            db.session.commit()
            flash('Cliente atualizado!', 'success')
            return redirect(url_for('clientes_lista'))
        return render_template('clientes/formulario.html', cliente=cliente)

    # ── VENDAS ───────────────────────────────────────────
    @app.route('/vendas')
    @login_required
    @cargo_required('admin', 'vendedor', 'marketing')
    def vendas_lista():
        status = request.args.get('status', '')
        query = Venda.query
        if status:
            query = query.filter_by(status=status)
        vendas = query.order_by(Venda.criado_em.desc()).all()
        return render_template('vendas/lista.html', vendas=vendas, status_selecionado=status)

    @app.route('/vendas/nova', methods=['GET', 'POST'])
    @login_required
    @cargo_required('admin', 'vendedor')
    def venda_nova():
        if request.method == 'POST':
            venda = Venda(
                cliente_id=int(request.form['cliente_id']),
                equipamento_id=int(request.form['equipamento_id']),
                vendedor_id=current_user.id,
                valor=float(request.form['valor']),
                tipo_pagamento=request.form.get('tipo_pagamento'),
                parcelas=int(request.form.get('parcelas', 1)),
                status=request.form.get('status', 'em_negociacao'),
                observacoes=request.form.get('observacoes'),
            )
            db.session.add(venda)
            db.session.commit()
            flash('Venda registrada!', 'success')
            return redirect(url_for('vendas_lista'))
        clientes = Cliente.query.filter_by(ativo=True).order_by(Cliente.razao_social).all()
        equipamentos = Equipamento.query.filter_by(ativo=True).order_by(Equipamento.nome).all()
        return render_template('vendas/formulario.html', venda=None, clientes=clientes, equipamentos=equipamentos)

    @app.route('/vendas/<int:id>/editar', methods=['GET', 'POST'])
    @login_required
    @cargo_required('admin', 'vendedor')
    def venda_editar(id):
        venda = db.session.get(Venda, id)
        if not venda:
            flash('Venda não encontrada.', 'warning')
            return redirect(url_for('vendas_lista'))
        if request.method == 'POST':
            venda.cliente_id = int(request.form['cliente_id'])
            venda.equipamento_id = int(request.form['equipamento_id'])
            venda.valor = float(request.form['valor'])
            venda.tipo_pagamento = request.form.get('tipo_pagamento')
            venda.parcelas = int(request.form.get('parcelas', 1))
            venda.status = request.form.get('status', venda.status)
            venda.observacoes = request.form.get('observacoes')
            if venda.status == 'fechada' and not venda.data_venda:
                venda.data_venda = datetime.now(timezone.utc)
            db.session.commit()
            flash('Venda atualizada!', 'success')
            return redirect(url_for('vendas_lista'))
        clientes = Cliente.query.filter_by(ativo=True).order_by(Cliente.razao_social).all()
        equipamentos = Equipamento.query.filter_by(ativo=True).order_by(Equipamento.nome).all()
        return render_template('vendas/formulario.html', venda=venda, clientes=clientes, equipamentos=equipamentos)

    # ── CHAMADOS ─────────────────────────────────────────
    @app.route('/chamados')
    @login_required
    def chamados_lista():
        status = request.args.get('status', '')
        query = Chamado.query
        if status:
            query = query.filter_by(status=status)
        chamados = query.order_by(Chamado.criado_em.desc()).all()
        return render_template('chamados/lista.html', chamados=chamados, status_selecionado=status)

    @app.route('/chamados/novo', methods=['GET', 'POST'])
    @login_required
    def chamado_novo():
        if request.method == 'POST':
            chamado = Chamado(
                cliente_id=int(request.form['cliente_id']),
                equipamento_id=int(request.form['equipamento_id']) if request.form.get('equipamento_id') else None,
                titulo=request.form['titulo'],
                descricao=request.form['descricao'],
                prioridade=request.form.get('prioridade', 'media'),
            )
            db.session.add(chamado)
            db.session.commit()
            flash('Chamado aberto!', 'success')
            return redirect(url_for('chamados_lista'))
        clientes = Cliente.query.filter_by(ativo=True).order_by(Cliente.razao_social).all()
        equipamentos = Equipamento.query.filter_by(ativo=True).order_by(Equipamento.nome).all()
        return render_template('chamados/formulario.html', chamado=None, clientes=clientes, equipamentos=equipamentos)

    @app.route('/chamados/<int:id>/editar', methods=['GET', 'POST'])
    @login_required
    def chamado_editar(id):
        chamado = db.session.get(Chamado, id)
        if not chamado:
            flash('Chamado não encontrado.', 'warning')
            return redirect(url_for('chamados_lista'))
        if request.method == 'POST':
            chamado.titulo = request.form['titulo']
            chamado.descricao = request.form['descricao']
            chamado.prioridade = request.form.get('prioridade', chamado.prioridade)
            chamado.status = request.form.get('status', chamado.status)
            chamado.tecnico_id = int(request.form['tecnico_id']) if request.form.get('tecnico_id') else chamado.tecnico_id
            chamado.solucao = request.form.get('solucao')
            if chamado.status == 'resolvido' and not chamado.resolvido_em:
                chamado.resolvido_em = datetime.now(timezone.utc)
            db.session.commit()
            flash('Chamado atualizado!', 'success')
            return redirect(url_for('chamados_lista'))
        clientes = Cliente.query.filter_by(ativo=True).order_by(Cliente.razao_social).all()
        equipamentos = Equipamento.query.filter_by(ativo=True).order_by(Equipamento.nome).all()
        tecnicos = Usuario.query.filter(Usuario.cargo.in_(['tecnico', 'admin'])).all()
        return render_template('chamados/formulario.html', chamado=chamado, clientes=clientes, equipamentos=equipamentos, tecnicos=tecnicos)

    # ── ACADEMY: CONTEUDOS (catalogo) ────────────────────
    @app.route('/academy')
    @login_required
    def academy_conteudos():
        cat_id = request.args.get('categoria', '')
        categorias = CategoriaAcademy.query.filter_by(ativo=True).order_by(CategoriaAcademy.ordem).all()
        if cat_id:
            cursos = CursoAcademy.query.filter_by(ativo=True, categoria_id=int(cat_id)).order_by(CursoAcademy.ordem).all()
        else:
            cursos = CursoAcademy.query.filter_by(ativo=True).order_by(CursoAcademy.ordem).all()
        return render_template('academy/conteudos.html', cursos=cursos, categorias=categorias, categoria_selecionada=cat_id)

    # ── ACADEMY: CURSO (modulos) ─────────────────────────
    @app.route('/academy/curso/<int:id>')
    @login_required
    def academy_curso(id):
        curso = db.session.get(CursoAcademy, id)
        if not curso:
            flash('Curso nao encontrado.', 'warning')
            return redirect(url_for('academy_conteudos'))
        modulos = curso.modulos.all()
        # Verificar matricula do usuario atual
        matricula = MatriculaAcademy.query.filter_by(usuario_id=current_user.id, curso_id=id).first()
        return render_template('academy/curso.html', curso=curso, modulos=modulos, matricula=matricula)

    # ── ACADEMY: AULA (player) ───────────────────────────
    @app.route('/academy/aula/<int:id>')
    @login_required
    def academy_aula(id):
        aula = db.session.get(AulaAcademy, id)
        if not aula:
            flash('Aula nao encontrada.', 'warning')
            return redirect(url_for('academy_conteudos'))
        modulo = aula.modulo
        curso = modulo.curso
        # Buscar todas as aulas do curso para sidebar
        todas_aulas = []
        for m in curso.modulos.all():
            for a in m.aulas.all():
                todas_aulas.append(a)
        # Matricula e progresso
        matricula = MatriculaAcademy.query.filter_by(usuario_id=current_user.id, curso_id=curso.id).first()
        progresso = None
        if matricula:
            progresso = ProgressoAcademy.query.filter_by(matricula_id=matricula.id, aula_id=id).first()
        # Aula anterior/proxima
        idx = next((i for i, a in enumerate(todas_aulas) if a.id == id), 0)
        aula_anterior = todas_aulas[idx - 1] if idx > 0 else None
        proxima_aula = todas_aulas[idx + 1] if idx < len(todas_aulas) - 1 else None
        return render_template('academy/aula.html', aula=aula, curso=curso, modulo=modulo,
                               todas_aulas=todas_aulas, matricula=matricula, progresso=progresso,
                               aula_anterior=aula_anterior, proxima_aula=proxima_aula)

    # ── ACADEMY: CONCLUIR AULA ───────────────────────────
    @app.route('/academy/aula/<int:id>/concluir', methods=['POST'])
    @login_required
    def academy_concluir_aula(id):
        aula = db.session.get(AulaAcademy, id)
        if not aula:
            flash('Aula nao encontrada.', 'warning')
            return redirect(url_for('academy_conteudos'))
        curso = aula.modulo.curso
        matricula = MatriculaAcademy.query.filter_by(usuario_id=current_user.id, curso_id=curso.id).first()
        if not matricula:
            # Auto-matricular
            matricula = MatriculaAcademy(usuario_id=current_user.id, curso_id=curso.id)
            db.session.add(matricula)
            db.session.flush()
        progresso = ProgressoAcademy.query.filter_by(matricula_id=matricula.id, aula_id=id).first()
        if not progresso:
            progresso = ProgressoAcademy(matricula_id=matricula.id, aula_id=id)
            db.session.add(progresso)
        progresso.concluida = not progresso.concluida
        if progresso.concluida:
            progresso.concluida_em = datetime.now(timezone.utc)
            matricula.xp_total += aula.xp
        else:
            progresso.concluida_em = None
            matricula.xp_total = max(0, matricula.xp_total - aula.xp)
        # Recalcular progresso do curso
        total_aulas = sum(m.aulas.count() for m in curso.modulos.all())
        aulas_concluidas = ProgressoAcademy.query.filter_by(matricula_id=matricula.id, concluida=True).count()
        matricula.progresso_pct = int((aulas_concluidas / total_aulas * 100)) if total_aulas > 0 else 0
        if matricula.progresso_pct == 100:
            matricula.status = 'concluida'
            matricula.data_conclusao = datetime.now(timezone.utc)
        else:
            matricula.status = 'ativa'
            matricula.data_conclusao = None
        db.session.commit()
        return redirect(url_for('academy_aula', id=id))

    # ── ACADEMY: MATRICULAR ──────────────────────────────
    @app.route('/academy/curso/<int:id>/matricular', methods=['POST'])
    @login_required
    def academy_matricular(id):
        curso = db.session.get(CursoAcademy, id)
        if not curso:
            flash('Curso nao encontrado.', 'warning')
            return redirect(url_for('academy_conteudos'))
        existente = MatriculaAcademy.query.filter_by(usuario_id=current_user.id, curso_id=id).first()
        if not existente:
            matricula = MatriculaAcademy(usuario_id=current_user.id, curso_id=id)
            db.session.add(matricula)
            db.session.commit()
            flash(f'Matriculado em "{curso.nome}"!', 'success')
        return redirect(url_for('academy_curso', id=id))

    # ── ACADEMY ADMIN: GESTAO DE CURSOS ──────────────────
    @app.route('/academy/admin/cursos')
    @login_required
    @cargo_required('admin', 'marketing')
    def academy_admin_cursos():
        cursos = CursoAcademy.query.order_by(CursoAcademy.ordem).all()
        categorias = CategoriaAcademy.query.order_by(CategoriaAcademy.ordem).all()
        return render_template('academy/admin_cursos.html', cursos=cursos, categorias=categorias)

    @app.route('/academy/admin/curso/novo', methods=['GET', 'POST'])
    @login_required
    @cargo_required('admin', 'marketing')
    def academy_admin_curso_novo():
        if request.method == 'POST':
            curso = CursoAcademy(
                nome=request.form['nome'],
                descricao=request.form.get('descricao'),
                categoria_id=int(request.form['categoria_id']) if request.form.get('categoria_id') else None,
                duracao_minutos=int(request.form.get('duracao_minutos', 0)),
            )
            db.session.add(curso)
            db.session.commit()
            flash(f'Curso "{curso.nome}" criado!', 'success')
            return redirect(url_for('academy_admin_cursos'))
        categorias = CategoriaAcademy.query.filter_by(ativo=True).order_by(CategoriaAcademy.ordem).all()
        return render_template('academy/admin_curso_form.html', curso=None, categorias=categorias)

    @app.route('/academy/admin/curso/<int:id>/editar', methods=['GET', 'POST'])
    @login_required
    @cargo_required('admin', 'marketing')
    def academy_admin_curso_editar(id):
        curso = db.session.get(CursoAcademy, id)
        if not curso:
            flash('Curso nao encontrado.', 'warning')
            return redirect(url_for('academy_admin_cursos'))
        if request.method == 'POST':
            curso.nome = request.form['nome']
            curso.descricao = request.form.get('descricao')
            curso.categoria_id = int(request.form['categoria_id']) if request.form.get('categoria_id') else None
            curso.duracao_minutos = int(request.form.get('duracao_minutos', 0))
            db.session.commit()
            flash('Curso atualizado!', 'success')
            return redirect(url_for('academy_admin_cursos'))
        categorias = CategoriaAcademy.query.filter_by(ativo=True).order_by(CategoriaAcademy.ordem).all()
        return render_template('academy/admin_curso_form.html', curso=curso, categorias=categorias)

    # ── ACADEMY ADMIN: MODULOS E AULAS ───────────────────
    @app.route('/academy/admin/curso/<int:curso_id>/modulo/novo', methods=['POST'])
    @login_required
    @cargo_required('admin', 'marketing')
    def academy_admin_modulo_novo(curso_id):
        nome = request.form.get('nome', '').strip()
        if nome:
            ultimo = ModuloAcademy.query.filter_by(curso_id=curso_id).order_by(ModuloAcademy.ordem.desc()).first()
            modulo = ModuloAcademy(curso_id=curso_id, nome=nome, ordem=(ultimo.ordem + 1) if ultimo else 1)
            db.session.add(modulo)
            db.session.commit()
            flash(f'Modulo "{nome}" criado!', 'success')
        return redirect(url_for('academy_curso', id=curso_id))

    @app.route('/academy/admin/modulo/<int:modulo_id>/aula/nova', methods=['POST'])
    @login_required
    @cargo_required('admin', 'marketing')
    def academy_admin_aula_nova(modulo_id):
        modulo = db.session.get(ModuloAcademy, modulo_id)
        if not modulo:
            flash('Modulo nao encontrado.', 'warning')
            return redirect(url_for('academy_conteudos'))
        titulo = request.form.get('titulo', '').strip()
        if titulo:
            ultima = AulaAcademy.query.filter_by(modulo_id=modulo_id).order_by(AulaAcademy.ordem.desc()).first()
            aula = AulaAcademy(
                modulo_id=modulo_id,
                titulo=titulo,
                tipo=request.form.get('tipo', 'video'),
                video_url=request.form.get('video_url'),
                duracao_minutos=int(request.form.get('duracao_minutos', 0)),
                ordem=(ultima.ordem + 1) if ultima else 1,
            )
            db.session.add(aula)
            # Atualizar total_conteudos do curso
            modulo.curso.total_conteudos = sum(m.aulas.count() for m in modulo.curso.modulos.all()) + 1
            db.session.commit()
            flash(f'Aula "{titulo}" criada!', 'success')
        return redirect(url_for('academy_curso', id=modulo.curso_id))

    # ── ACADEMY ADMIN: TURMAS ────────────────────────────
    @app.route('/academy/admin/turmas')
    @login_required
    @cargo_required('admin', 'marketing')
    def academy_admin_turmas():
        turmas = TurmaAcademy.query.order_by(TurmaAcademy.criado_em.desc()).all()
        return render_template('academy/admin_turmas.html', turmas=turmas)

    # ── ACADEMY ADMIN: MEMBROS ───────────────────────────
    @app.route('/academy/admin/membros')
    @login_required
    @cargo_required('admin', 'marketing')
    def academy_admin_membros():
        matriculas = MatriculaAcademy.query.order_by(MatriculaAcademy.criado_em.desc()).all()
        return render_template('academy/admin_membros.html', matriculas=matriculas)

    # ── ADMIN: USUÁRIOS ──────────────────────────────────
    @app.route('/admin/usuarios')
    @login_required
    @cargo_required('admin')
    def admin_usuarios():
        usuarios = Usuario.query.order_by(Usuario.nome).all()
        return render_template('admin/usuarios.html', usuarios=usuarios)

    @app.route('/admin/usuarios/novo', methods=['GET', 'POST'])
    @login_required
    @cargo_required('admin')
    def admin_usuario_novo():
        if request.method == 'POST':
            usuario = Usuario(
                nome=request.form['nome'],
                email=request.form['email'],
                cargo=request.form['cargo'],
            )
            usuario.set_senha(request.form['senha'])
            db.session.add(usuario)
            db.session.commit()
            flash(f'Usuário "{usuario.nome}" criado!', 'success')
            return redirect(url_for('admin_usuarios'))
        return render_template('admin/usuario_form.html', usuario=None)

    # ── API SIMPLES (para integrações futuras) ───────────
    @app.route('/api/clientes')
    @login_required
    def api_clientes():
        clientes = Cliente.query.filter_by(ativo=True).all()
        return jsonify([{
            'id': c.id, 'razao_social': c.razao_social,
            'cidade': c.cidade, 'estado': c.estado,
            'contato_nome': c.contato_nome,
        } for c in clientes])

    @app.route('/api/equipamentos')
    @login_required
    def api_equipamentos():
        equipamentos = Equipamento.query.filter_by(ativo=True).all()
        return jsonify([{
            'id': e.id, 'nome': e.nome,
            'categoria': e.categoria, 'fabricante': e.fabricante,
        } for e in equipamentos])

    @app.route('/api/academy/cursos')
    @login_required
    def api_academy_cursos():
        cursos = CursoAcademy.query.filter_by(ativo=True).all()
        return jsonify([{
            'id': c.id, 'nome': c.nome,
            'categoria': c.categoria.nome if c.categoria else None,
            'duracao': c.duracao_formatada,
            'total_conteudos': c.total_conteudos,
            'matriculas': c.matriculas.count(),
        } for c in cursos])

    @app.route('/api/academy/stats')
    @login_required
    def api_academy_stats():
        return jsonify({
            'total_membros': MatriculaAcademy.query.count(),
            'membros_ativos': MatriculaAcademy.query.filter_by(status='ativa').count(),
            'certificados': MatriculaAcademy.query.filter_by(certificado_emitido=True).count(),
            'cursos_ativos': CursoAcademy.query.filter_by(ativo=True).count(),
            'total_aulas': AulaAcademy.query.filter_by(ativo=True).count(),
        })

    return app


# ── MAIN ─────────────────────────────────────────────────
if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5050)
