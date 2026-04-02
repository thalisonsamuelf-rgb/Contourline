"""
Script para popular o banco de dados com dados iniciais da Contourline.
Execute: python3 seed_data.py
"""
from app import create_app
from models import db, Usuario, Equipamento

app = create_app()

EQUIPAMENTOS = [
    {
        'nome': 'UltraPulse',
        'fabricante': 'Lumenis',
        'categoria': 'Laser CO2 Fracionado',
        'origem': 'Israel',
        'registro_anvisa': '80117400294',
        'tecnologia': 'Laser CO2 fracionado com tecnologia SCAAR FX e DeepFX para rejuvenescimento e cicatrizes',
        'indicacoes': 'Rejuvenescimento facial, cicatrizes de acne, estrias, lesoes pigmentadas, resurfacing',
        'diferenciais': 'Padrao-ouro mundial em laser CO2 fracionado. Unico com tecnologia SCAAR FX para cicatrizes profundas. Maior base instalada do mundo.',
        'preco_tabela': 450000,
    },
    {
        'nome': 'Stellar M22',
        'fabricante': 'Lumenis',
        'categoria': 'Luz Intensa Pulsada',
        'origem': 'Israel',
        'registro_anvisa': '80117400312',
        'tecnologia': 'Plataforma multi-aplicacao com IPL (Optimal Pulse Technology) e modulos de laser',
        'indicacoes': 'Fotorejuvenescimento, lesoes vasculares, manchas, depilacao, acne, rosacea, olho seco',
        'diferenciais': 'Plataforma mais completa do mercado. OPT (Optimal Pulse Technology) exclusiva. Modulos intercambiaveis para diferentes tratamentos.',
        'preco_tabela': 380000,
    },
    {
        'nome': 'LightSheer DESIRE',
        'fabricante': 'Lumenis',
        'categoria': 'Laser Diodo',
        'origem': 'Israel',
        'registro_anvisa': '80117400286',
        'tecnologia': 'Laser Diodo 805nm com tecnologia de vacuo (HS) para depilacao',
        'indicacoes': 'Depilacao a laser definitiva para todos os fototipos',
        'diferenciais': 'Maior ponteira do mercado (22x35mm). Tecnologia de vacuo HS elimina necessidade de gel. Velocidade ate 5x maior que concorrentes.',
        'preco_tabela': 280000,
    },
    {
        'nome': 'NuEra Tight',
        'fabricante': 'Lumenis',
        'categoria': 'Radiofrequencia',
        'origem': 'Israel',
        'registro_anvisa': '80117400330',
        'tecnologia': 'Radiofrequencia monopolar e multipolar com controle de temperatura (ACE)',
        'indicacoes': 'Flacidez facial e corporal, contorno corporal, celulite, reducao de gordura localizada',
        'diferenciais': 'Tecnologia ACE (Automated Contact Ensurance) para seguranca. Tratamento facial e corporal na mesma plataforma. Resultados progressivos e duradouros.',
        'preco_tabela': 220000,
    },
    {
        'nome': 'Splendor X',
        'fabricante': 'Lumenis',
        'categoria': 'Laser Alexandrite + Nd:YAG',
        'origem': 'Israel',
        'registro_anvisa': '80117400348',
        'tecnologia': 'Laser dual Alexandrite 755nm e Nd:YAG 1064nm com feixe quadrado BLEND X',
        'indicacoes': 'Depilacao a laser, lesoes vasculares, rejuvenescimento, lesoes pigmentadas',
        'diferenciais': 'Unico com feixe quadrado (sem sobreposicao). BLEND X mistura dois comprimentos de onda simultaneamente. Seguro para todos os fototipos.',
        'preco_tabela': 350000,
    },
    {
        'nome': 'LEGEND Pro+',
        'fabricante': 'Lumenis',
        'categoria': 'Plataforma Multi-Tecnologia',
        'origem': 'Israel',
        'registro_anvisa': '80117400355',
        'tecnologia': 'Plataforma com RF fracionada, microagulhamento com RF, e VoluDerm',
        'indicacoes': 'Rejuvenescimento, cicatrizes, flacidez, remodelamento corporal, estrias',
        'diferenciais': 'Combina RF fracionada + microagulhamento + TriPollar. Tecnologia VoluDerm para bioestimulacao. Versatilidade facial e corporal.',
        'preco_tabela': 250000,
    },
    {
        'nome': 'PiQo4',
        'fabricante': 'Lumenis',
        'categoria': 'Laser Picossegundos',
        'origem': 'Israel',
        'registro_anvisa': '80117400363',
        'tecnologia': 'Laser picossegundos com 4 comprimentos de onda (532, 585, 650, 1064nm)',
        'indicacoes': 'Remocao de tatuagem, melasma, lesoes pigmentadas, rejuvenescimento',
        'diferenciais': 'Unico pico com 4 comprimentos de onda. Maior energia pico do mercado. Remove todas as cores de tatuagem.',
        'preco_tabela': 400000,
    },
    {
        'nome': 'ResurFX',
        'fabricante': 'Lumenis',
        'categoria': 'Laser Fracionado Nao-Ablativo',
        'origem': 'Israel',
        'registro_anvisa': '80117400371',
        'tecnologia': 'Laser fracionado nao-ablativo 1565nm (modulo do M22)',
        'indicacoes': 'Rejuvenescimento, cicatrizes de acne, estrias, textura da pele',
        'diferenciais': 'Sem downtime significativo. CoolScan para distribuicao homogenea. Pode ser combinado com IPL na mesma sessao.',
        'preco_tabela': 0,
    },
]


def seed():
    with app.app_context():
        db.create_all()

        # Criar admin se nao existir
        if not Usuario.query.filter_by(email='admin@contourline.com.br').first():
            admin = Usuario(
                nome='Administrador',
                email='admin@contourline.com.br',
                cargo='admin',
            )
            admin.set_senha('contourline2026')
            db.session.add(admin)
            print('Usuario admin criado: admin@contourline.com.br / contourline2026')

        # Criar usuario Thalison
        if not Usuario.query.filter_by(email='thalison@contourline.com.br').first():
            thalison = Usuario(
                nome='Thalison',
                email='thalison@contourline.com.br',
                cargo='admin',
            )
            thalison.set_senha('contourline2026')
            db.session.add(thalison)
            print('Usuario Thalison criado: thalison@contourline.com.br / contourline2026')

        # Inserir equipamentos
        for eq_data in EQUIPAMENTOS:
            if not Equipamento.query.filter_by(nome=eq_data['nome']).first():
                equip = Equipamento(**eq_data)
                db.session.add(equip)
                print(f'  Equipamento cadastrado: {eq_data["nome"]}')

        db.session.commit()
        print('\nBanco de dados populado com sucesso!')
        print(f'  {Equipamento.query.count()} equipamentos')
        print(f'  {Usuario.query.count()} usuarios')


if __name__ == '__main__':
    seed()
