from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


# ── USUÁRIOS ──────────────────────────────────────────────
class Usuario(UserMixin, db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha_hash = db.Column(db.String(256), nullable=False)
    cargo = db.Column(db.String(50), nullable=False, default='vendedor')  # admin, vendedor, tecnico, marketing
    ativo = db.Column(db.Boolean, default=True)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    # Relacionamentos
    vendas = db.relationship('Venda', backref='vendedor', lazy='dynamic', foreign_keys='Venda.vendedor_id')
    chamados = db.relationship('Chamado', backref='tecnico', lazy='dynamic', foreign_keys='Chamado.tecnico_id')

    def set_senha(self, senha):
        self.senha_hash = generate_password_hash(senha)

    def verificar_senha(self, senha):
        return check_password_hash(self.senha_hash, senha)

    def __repr__(self):
        return f'<Usuario {self.nome}>'


# ── EQUIPAMENTOS ──────────────────────────────────────────
class Equipamento(db.Model):
    __tablename__ = 'equipamentos'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    fabricante = db.Column(db.String(120))
    categoria = db.Column(db.String(80))  # Laser, Luz Pulsada, Radiofrequência, Ultrassom, Criolipólise, etc.
    registro_anvisa = db.Column(db.String(60))
    origem = db.Column(db.String(60))  # Israel, EUA, etc.
    tecnologia = db.Column(db.Text)
    indicacoes = db.Column(db.Text)  # Indicações clínicas
    diferenciais = db.Column(db.Text)
    preco_tabela = db.Column(db.Float)
    ativo = db.Column(db.Boolean, default=True)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    # Relacionamentos
    vendas = db.relationship('Venda', backref='equipamento', lazy='dynamic')
    chamados = db.relationship('Chamado', backref='equipamento', lazy='dynamic')

    def __repr__(self):
        return f'<Equipamento {self.nome}>'


# ── CLIENTES ──────────────────────────────────────────────
class Cliente(db.Model):
    __tablename__ = 'clientes'
    id = db.Column(db.Integer, primary_key=True)
    razao_social = db.Column(db.String(200), nullable=False)
    nome_fantasia = db.Column(db.String(200))
    cnpj = db.Column(db.String(20), unique=True)
    contato_nome = db.Column(db.String(120))
    contato_email = db.Column(db.String(120))
    contato_telefone = db.Column(db.String(20))
    endereco = db.Column(db.String(300))
    cidade = db.Column(db.String(100))
    estado = db.Column(db.String(2))
    segmento = db.Column(db.String(80))  # Clínica Dermatológica, Clínica Estética, Hospital, etc.
    rd_station_id = db.Column(db.String(80))  # ID no RD Station CRM
    observacoes = db.Column(db.Text)
    ativo = db.Column(db.Boolean, default=True)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    atualizado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relacionamentos
    vendas = db.relationship('Venda', backref='cliente', lazy='dynamic')
    chamados = db.relationship('Chamado', backref='cliente', lazy='dynamic')
    alunos_academy = db.relationship('AlunoAcademy', backref='cliente', lazy='dynamic')

    def __repr__(self):
        return f'<Cliente {self.razao_social}>'


# ── VENDAS ────────────────────────────────────────────────
class Venda(db.Model):
    __tablename__ = 'vendas'
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'), nullable=False)
    equipamento_id = db.Column(db.Integer, db.ForeignKey('equipamentos.id'), nullable=False)
    vendedor_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    valor = db.Column(db.Float, nullable=False)
    tipo_pagamento = db.Column(db.String(50))  # À vista, Parcelado, Leasing, Financiamento
    parcelas = db.Column(db.Integer, default=1)
    status = db.Column(db.String(30), default='em_negociacao')  # em_negociacao, proposta_enviada, fechada, perdida
    rd_deal_id = db.Column(db.String(80))  # ID da negociação no RD Station
    data_venda = db.Column(db.DateTime)
    observacoes = db.Column(db.Text)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    atualizado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f'<Venda {self.id} - {self.status}>'


# ── CHAMADOS / ASSISTÊNCIA TÉCNICA ───────────────────────
class Chamado(db.Model):
    __tablename__ = 'chamados'
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'), nullable=False)
    equipamento_id = db.Column(db.Integer, db.ForeignKey('equipamentos.id'))
    titulo = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    prioridade = db.Column(db.String(20), default='media')  # baixa, media, alta, urgente
    status = db.Column(db.String(30), default='aberto')  # aberto, em_andamento, aguardando_peca, resolvido, fechado
    tecnico_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    solucao = db.Column(db.Text)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    atualizado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    resolvido_em = db.Column(db.DateTime)

    def __repr__(self):
        return f'<Chamado {self.id} - {self.status}>'


# ── ACADEMY: CATEGORIAS ──────────────────────────────────
class CategoriaAcademy(db.Model):
    __tablename__ = 'academy_categorias'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    ordem = db.Column(db.Integer, default=0)
    ativo = db.Column(db.Boolean, default=True)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    cursos = db.relationship('CursoAcademy', backref='categoria', lazy='dynamic', order_by='CursoAcademy.ordem')

    def __repr__(self):
        return f'<Categoria {self.nome}>'


# ── ACADEMY: CURSOS ──────────────────────────────────────
class CursoAcademy(db.Model):
    __tablename__ = 'academy_cursos'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text)
    categoria_id = db.Column(db.Integer, db.ForeignKey('academy_categorias.id'))
    thumbnail_url = db.Column(db.String(500))
    duracao_minutos = db.Column(db.Integer, default=0)
    total_conteudos = db.Column(db.Integer, default=0)
    ordem = db.Column(db.Integer, default=0)
    ativo = db.Column(db.Boolean, default=True)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    atualizado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    modulos = db.relationship('ModuloAcademy', backref='curso', lazy='dynamic', order_by='ModuloAcademy.ordem')
    matriculas = db.relationship('MatriculaAcademy', backref='curso', lazy='dynamic')

    @property
    def duracao_formatada(self):
        h, m = divmod(self.duracao_minutos or 0, 60)
        return f'{h}h {m}min' if h else f'{m}min'

    def __repr__(self):
        return f'<Curso {self.nome}>'


# ── ACADEMY: MODULOS ─────────────────────────────────────
class ModuloAcademy(db.Model):
    __tablename__ = 'academy_modulos'
    id = db.Column(db.Integer, primary_key=True)
    curso_id = db.Column(db.Integer, db.ForeignKey('academy_cursos.id'), nullable=False)
    nome = db.Column(db.String(200), nullable=False)
    ordem = db.Column(db.Integer, default=0)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    aulas = db.relationship('AulaAcademy', backref='modulo', lazy='dynamic', order_by='AulaAcademy.ordem')

    def __repr__(self):
        return f'<Modulo {self.nome}>'


# ── ACADEMY: AULAS (conteudos) ───────────────────────────
class AulaAcademy(db.Model):
    __tablename__ = 'academy_aulas'
    id = db.Column(db.Integer, primary_key=True)
    modulo_id = db.Column(db.Integer, db.ForeignKey('academy_modulos.id'), nullable=False)
    titulo = db.Column(db.String(300), nullable=False)
    descricao = db.Column(db.Text)
    tipo = db.Column(db.String(30), default='video')  # video, texto, pdf, quiz
    video_url = db.Column(db.String(500))
    material_url = db.Column(db.String(500))
    duracao_minutos = db.Column(db.Integer, default=0)
    xp = db.Column(db.Integer, default=25)
    ordem = db.Column(db.Integer, default=0)
    ativo = db.Column(db.Boolean, default=True)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    progressos = db.relationship('ProgressoAcademy', backref='aula', lazy='dynamic')

    def __repr__(self):
        return f'<Aula {self.titulo}>'


# ── ACADEMY: MEMBROS/MATRICULAS ──────────────────────────
class MatriculaAcademy(db.Model):
    __tablename__ = 'academy_matriculas'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    curso_id = db.Column(db.Integer, db.ForeignKey('academy_cursos.id'), nullable=False)
    turma_id = db.Column(db.Integer, db.ForeignKey('academy_turmas.id'))
    status = db.Column(db.String(30), default='ativa')  # ativa, concluida, cancelada, expirada
    progresso_pct = db.Column(db.Integer, default=0)
    xp_total = db.Column(db.Integer, default=0)
    data_inicio = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    data_conclusao = db.Column(db.DateTime)
    certificado_emitido = db.Column(db.Boolean, default=False)
    certificado_em = db.Column(db.DateTime)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    usuario = db.relationship('Usuario', backref='matriculas_academy')
    progressos = db.relationship('ProgressoAcademy', backref='matricula', lazy='dynamic')

    def __repr__(self):
        return f'<Matricula {self.usuario_id} - Curso {self.curso_id}>'


# ── ACADEMY: PROGRESSO POR AULA ──────────────────────────
class ProgressoAcademy(db.Model):
    __tablename__ = 'academy_progresso'
    id = db.Column(db.Integer, primary_key=True)
    matricula_id = db.Column(db.Integer, db.ForeignKey('academy_matriculas.id'), nullable=False)
    aula_id = db.Column(db.Integer, db.ForeignKey('academy_aulas.id'), nullable=False)
    concluida = db.Column(db.Boolean, default=False)
    concluida_em = db.Column(db.DateTime)
    anotacao = db.Column(db.Text)
    favorito = db.Column(db.Boolean, default=False)

    __table_args__ = (db.UniqueConstraint('matricula_id', 'aula_id'),)

    def __repr__(self):
        return f'<Progresso Aula {self.aula_id} - {"OK" if self.concluida else "Pendente"}>'


# ── ACADEMY: TURMAS ──────────────────────────────────────
class TurmaAcademy(db.Model):
    __tablename__ = 'academy_turmas'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text)
    data_inicio = db.Column(db.Date)
    data_fim = db.Column(db.Date)
    ativo = db.Column(db.Boolean, default=True)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    matriculas = db.relationship('MatriculaAcademy', backref='turma', lazy='dynamic')

    def __repr__(self):
        return f'<Turma {self.nome}>'
