import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'contourline-chave-secreta-2026-trocar-em-producao'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'contourline.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WTF_CSRF_ENABLED = True
