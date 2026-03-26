from datetime import datetime, timezone
from functools import wraps

from flask import Flask, render_template, redirect, url_for, flash, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_wtf.csrf import CSRFProtect

from config import Config
from models import db, Usuario, Equipamento, Cliente, Venda, Chamado, AlunoAcademy


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
            'alunos_academy': AlunoAcademy.query.count(),
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

    # ── ACADEMY ──────────────────────────────────────────
    @app.route('/academy')
    @login_required
    def academy_lista():
        alunos = AlunoAcademy.query.order_by(AlunoAcademy.criado_em.desc()).all()
        return render_template('academy/lista.html', alunos=alunos)

    @app.route('/academy/novo', methods=['GET', 'POST'])
    @login_required
    @cargo_required('admin', 'marketing')
    def academy_novo():
        if request.method == 'POST':
            aluno = AlunoAcademy(
                nome=request.form['nome'],
                email=request.form.get('email'),
                telefone=request.form.get('telefone'),
                cliente_id=int(request.form['cliente_id']) if request.form.get('cliente_id') else None,
                curso=request.form['curso'],
                observacoes=request.form.get('observacoes'),
            )
            db.session.add(aluno)
            db.session.commit()
            flash('Aluno cadastrado!', 'success')
            return redirect(url_for('academy_lista'))
        clientes = Cliente.query.filter_by(ativo=True).order_by(Cliente.razao_social).all()
        return render_template('academy/formulario.html', aluno=None, clientes=clientes)

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

    return app


# ── MAIN ─────────────────────────────────────────────────
if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5050)
