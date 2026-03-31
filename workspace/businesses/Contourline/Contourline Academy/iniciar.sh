#!/bin/bash
# ══════════════════════════════════════════════════════════
#  CONTOURLINE DB - Script de Inicializacao
# ══════════════════════════════════════════════════════════

cd "$(dirname "$0")"

echo ""
echo "  ╔══════════════════════════════════════╗"
echo "  ║       CONTOURLINE DB v1.0            ║"
echo "  ║   Sistema de Gestao Integrada        ║"
echo "  ╚══════════════════════════════════════╝"
echo ""

# Verificar Python
if ! command -v python3 &> /dev/null; then
    echo "ERRO: Python3 nao encontrado. Instale o Python 3."
    exit 1
fi

# Instalar dependencias se necessario
if ! python3 -c "import flask" 2>/dev/null; then
    echo "Instalando dependencias..."
    python3 -m pip install -r requirements.txt
fi

# Popular banco se nao existir
if [ ! -f contourline.db ]; then
    echo "Criando banco de dados..."
    python3 seed_data.py
fi

echo ""
echo "  Iniciando servidor..."
echo "  Acesse: http://localhost:5050"
echo ""
echo "  Login: thalison@contourline.com.br"
echo "  Senha: contourline2026"
echo ""
echo "  Pressione Ctrl+C para parar"
echo ""

python3 app.py
