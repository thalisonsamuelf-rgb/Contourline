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


# ── ACADEMY ───────────────────────────────────────────────
class AlunoAcademy(db.Model):
    __tablename__ = 'academy_alunos'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120))
    telefone = db.Column(db.String(20))
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'))
    curso = db.Column(db.String(120), nullable=False)
    data_inicio = db.Column(db.DateTime)
    data_conclusao = db.Column(db.DateTime)
    certificado = db.Column(db.Boolean, default=False)
    observacoes = db.Column(db.Text)
    criado_em = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f'<Aluno {self.nome} - {self.curso}>'
