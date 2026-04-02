# AIOX Imersão

Repositório compartilhado da **Imersão AIOX** — evento presencial de 48h onde 17 empresários constroem seus sistemas de IA orquestrada com acompanhamento 1:1 de mentores.

**Datas:** 19-20 de Março de 2026
**Local:** CT EAG - Square SC - Florianópolis
**Formato:** 70% construção, 30% contexto
**Ratio:** 1 mentor : 2 empresários

---

## O que tem aqui

Este repositório contém duas coisas:

### 1. `squads/` — Frameworks de agentes IA

32 squads especializados que vocês vão usar durante (e após) a imersão. Cada squad é um time de agentes IA prontos para executar tarefas específicas do seu negócio.

**O que é um squad?** Um conjunto de agentes IA com personalidades, tarefas e workflows definidos. Você ativa um squad no Claude Code e ele executa o trabalho — copy, tráfego, branding, pesquisa, etc.

#### Squads disponíveis

| Squad | O que faz |
|-------|-----------|
| `advisory-board` | Conselho consultivo com 10 especialistas (Ray Dalio, Charlie Munger, etc.) |
| `brand` | Estratégia de marca, posicionamento, identidade visual, naming |
| `copy` | Copywriting completo — VSLs, emails, páginas, headlines (12+ copywriters) |
| `storytelling` | Narrativas de marca, pitches, roteiros, brand stories |
| `movement` | Construção de movimento/tribo, ideologia, rituais, manifestos |
| `hormozi` | Framework Hormozi completo — ofertas, pricing, leads, escala |
| `deep-research` | Pesquisa profunda com pipeline científico (Sackett → Cochrane → Ioannidis) |
| `spy` | Análise competitiva, benchmarking, extração de padrões virais |
| `c-level` | Estratégia executiva — CTO, CMO, COO, CIO, CAIO |
| `data` | Analytics, health scores, CLV, community metrics, growth hacking |
| `etl-ops` | Extração e transformação de dados (scraping, APIs, PDFs) |
| `cybersecurity` | Pentest, blue team, red team, auditorias de segurança |
| `franchise` | Modelagem de franquia, COF, expansão, relação franqueador-franqueado |
| `squad-creator` | Criar novos squads customizados para seu negócio |
| `domain-decoder` | Decodificar domínios de conhecimento e criar taxonomias |
| `claude-code-mastery` | Dominar Claude Code — hooks, MCP, subagentes, config avançada |
| `gerador-pop` | Gerar SOPs/POPs — procedimentos operacionais padrão |
| `pitch-deck` | Criar apresentações e pitch decks |
| `project-dna` | Extrair DNA de projetos existentes |
| `clickup` | Integração e automação com ClickUp |
| `db-sage` | Consultoria de banco de dados |
| `kaizen` | Melhoria contínua e otimização de processos |
| `biohacking` | Otimização de performance pessoal e saúde |
| `face-forge` | Geração e edição de imagens/faces |
| `photo-lab` | Edição e processamento de fotos |
| `theme` | Temas e templates visuais |
| `agent-autonomy` | Framework de autonomia para agentes IA |
| `application-forms` | Formulários de aplicação |

**Squads AIOX (específicos da marca):**

| Squad | O que faz |
|-------|-----------|
| `aiox-copy` | Copy da marca AIOX |
| `aiox-design` | Design da marca AIOX |
| `aiox-traffic` | Tráfego da marca AIOX |

#### Squads em staging

| Diretório | Status | Conteúdo |
|-----------|--------|----------|
| `_conteudo/` | Pronto | Squad completo de conteúdo — 10 agentes, 26 tasks, 9 workflows. Comando `*multiplicar` transforma 1 conteúdo longo em 30+ micro-peças |
| `_draft/` | Em desenvolvimento | `tribunal/` — squad de validação jurídica |
| `_validar/` | Em validação | 5 squads: acceleration, branding, conteúdo, live-content, media-studio |

---

### 2. `workspace/businesses/` — Workspaces dos 17 participantes

Cada pasta é o **workspace pré-configurado** do seu negócio. Contém o DNA da sua empresa em formato que os squads conseguem consumir — marca, ICP, oferta, provas, narrativa, operações.

#### Participantes

| # | Pasta | Empresa | Setor | Arquivos |
|---|-------|---------|-------|----------|
| 1 | `thiago_nishikata` | Brasil em Dobro | FoodTech | 38 |
| 2 | `fabio_avelar` | Grupo Econômico | Marketing/Odonto | 43 |
| 3 | `diogo_pereira` | YouFront + LinkSmart | iGaming | 41 |
| 4 | `eduardo_colautti` | Direct Response | Suplementação | 40 |
| 5 | `egio_roberto` | Conta Magic | Fintech | 40 |
| 6 | `junior_lorenzi` | Easy Builder | Builder Ecosystem | 40 |
| 7 | `karine_lago` | Comunidade Data Driven | EdTech | 40 |
| 8 | `andre_franco` | Mentoria Cripto | Educação | 38 |
| 9 | `bruno_kosminsky` | Eu Médico Residente | Saúde | 38 |
| 10 | `italo_gustavo` | Fintech | Gestão Financeira | 38 |
| 11 | `luca_cortez` | Startup IA | SaaS | 38 |
| 12 | `marcel_scalcko` | Grupo Scalco | Marketing | 38 |
| 13 | `wiliaquison_valentim` | Grupo WV (12 CNPJs) | Holding | 38 |
| 14 | `hugo_santos` | NutraSelf | Direct Response | 37 |
| 15 | `daniel_tenorio` | Operação Nutra EUA | Telemedicina | 37 |
| 16 | `joao_biggie_com_romulo_medeiros` | Level 8 / Hero Academy | SaaS | 33 |
| 17 | `rafaela_mendes_com_michel_arruda` | — | — | 33 |

#### Estrutura de cada workspace

```
{seu_negocio}/
├── ai/                  # Estratégia de IA
├── brand/               # Identidade de marca, brandbook, posicionamento
├── company/             # Perfil, founder DNA, ICP, credenciais, offerbook
├── etl/                 # Metadados de processamento
├── evidence/            # Manifesto de completude, registro de fontes
├── movement/            # Estratégia de comunidade/tribo
├── operations/          # Pricing, KPIs, estrutura de time
├── products/            # Dados por produto (narrativa, provas, depoimentos)
└── tech/                # Stack tecnológico
```

**Esses arquivos são o combustível dos squads.** Quando você ativa um squad de copy, por exemplo, ele automaticamente carrega seu ICP, voz da marca, provas sociais e posicionamento para gerar copy personalizada pro seu negócio.

---

## Schedule — 19-20 de Março de 2026

### Pré-Evento (D-15 a D-1)

| Quando | O que | Ação |
|--------|-------|------|
| Compra | Boas-vindas | Carol faz contato pessoal. Grupo WhatsApp criado. |
| D-15 | Call com Mentor | Claude Code instalado, workspace base, documentos iniciais. |
| D-15 a D-7 | Agente WhatsApp | Assistente pessoal extrai missão, produtos, dores, ferramentas. |
| D-5 | Checklist | Ambiente 80% pronto. Gaps identificados. |
| D-3 | Mensagem Surpresa | Vídeo pessoal de mentor: "Tenho uma ideia pra você." |
| D-1 | Guia Final | Logística, o que trazer. "Amanhã sua empresa muda." |

### Dia 1 — 19/Mar — "Do caos à clareza"

| Horário | Ciclo | Título | Mentor | Entregável |
|---------|-------|--------|--------|------------|
| 08h00-09h30 | Abertura | O Espelho | Thiago Finch + Alan Nicolas | Credenciamento, welcome kit, DNA dos negócios no telão |
| 09h30-11h00 | Ciclo 1 | Seu Sistema Ganha Vida | Pedro Valério | **Squads de sistema ativados** (C-Levels, Sylevels, Conclave) |
| 11h15-12h45 | Ciclo 2 | Processos Documentados | Pedro Valério | **3 processos-chave documentados** |
| 12h45-14h00 | — | Almoço | — | — |
| 14h00-15h30 | Ciclo 3 | Tarefas Reais | Pedro Valério | **Tarefas reais integradas** com ClickUp/Asana |
| 15h45-17h15 | Ciclo 4 | Design System | Alan Nicolas | **Design system próprio** (logo, cores, tipografia, tom) |
| 17h15-18h45 | Ciclo 5 | Crie Seu Próprio Squad | Alan Nicolas | **Squad personalizado** criado do zero |
| 19h15-aberto | War Room | Execução livre | Todos os mentores | Mesas temáticas + hotseats até de madrugada |

### Dia 2 — 20/Mar — "Da estrutura à máquina"

| Horário | Ciclo | Título | Mentor | Entregável |
|---------|-------|--------|--------|------------|
| 08h00-09h15 | Abertura | Placar da Noite | — | Métricas da noite anterior no telão |
| 09h15-11h00 | Ciclo 6 | Traffic Squad | Thiago Finch | **Campanha real rodando** com tráfego pago |
| 11h15-12h30 | Ciclo 7 | Content Squad | Alan Nicolas | **Análise competitiva + conteúdo** produzido |
| 12h30-13h30 | — | Almoço | — | — |
| 13h30-15h00 | Ciclo 8 | Copy + Página | Alan Nicolas | **Página de oferta** com copy profissional |
| 15h15-16h30 | Ciclo 9 | Página No Ar | Alan Nicolas | **Página publicada** com URL real |
| 16h30-18h00 | Ciclo 10 | A Máquina Orquestrada | Alan Nicolas | **Fluxo integrado:** anúncio → página → conversão |
| 18h00-19h00 | Gran Finale | Dashboard + Depoimentos | — | Report personalizado + próximos passos |
| 19h+ | Happy Hour | Brinde Bilhon | — | Chopp, vinho, gin tônica, finger food |

### Pós-Evento (D+1 a 6 semanas)

| Quando | O que | Ação |
|--------|-------|------|
| D+1 | Mentores se apresentam | Mensagem pessoal via WhatsApp com proposta de próximos passos |
| D+1 | NPS Individual | Formulário enquanto a memória emocional está fresca |
| D+2 | Materiais Completos | Gravações, slides, documentos de apoio |
| D+3-7 | Primeira Call Individual | Alinhamento de prioridades + plano das 6 semanas |
| D+7 | After Movie | Vídeo profissional com melhores momentos |
| D+15 | **Quick Win (WOW #9)** | Primeiro resultado concreto no negócio real — **garantido** |
| Semanas 1-6 | Mentoria Semanal | Call individual focada no projeto |
| Ongoing | Comunidade Alumni | Grupo permanente com acesso a mentores |

---

## Entregáveis — O que cada empresário sai com

### Durante o evento (48h)

| # | Entregável | Ciclo | Verificação |
|---|-----------|-------|-------------|
| 1 | Squads de sistema configurados e operando | Ciclo 1 | Squad respondendo a comandos no terminal |
| 2 | 3+ processos-chave documentados como SOPs | Ciclo 2 | Arquivos `.md` no workspace com processo mapeado |
| 3 | Tarefas reais geradas e integradas com gestão de projetos | Ciclo 3 | Tasks visíveis no ClickUp/Asana |
| 4 | Design system próprio (logo, cores, tipografia, tom de voz) | Ciclo 4 | Tokens no workspace, output visual antes/depois |
| 5 | Squad personalizado criado do zero para problema específico | Ciclo 5 | Squad customizado respondendo no Claude Code |
| 6 | Campanha de tráfego real rodando | Ciclo 6 | Anúncio ativo no Meta Ads com métricas |
| 7 | Análise competitiva de 3+ concorrentes | Ciclo 7 | Relatório de análise no workspace |
| 8 | Página de oferta com copy + design system | Ciclo 8-9 | URL publicada acessível |
| 9 | Máquina integrada: anúncio → página → conversão | Ciclo 10 | Fluxo validado por mentor: "Funcional" |
| 10 | Dashboard individual personalizado | Gran Finale | Report com todas as métricas do que construiu |

### Pós-evento

| # | Entregável | Prazo | Verificação |
|---|-----------|-------|-------------|
| 11 | 6 semanas de mentoria individual | Semanas 1-6 | Calls semanais registradas |
| 12 | Quick Win verificável | D+15 | Resultado concreto documentado |
| 13 | Gravação integral de todas as sessões | D+30 | Links enviados |
| 14 | After Movie cinematográfico | D+7 | Vídeo entregue |
| 15 | Comunidade Alumni permanente | Ongoing | Acesso ao grupo |

---

## Guia para Mentores

### Antes do evento

1. **Conheça seus empresários.** Leia o workspace de cada um em `workspace/businesses/{nome}/`. Os arquivos mais importantes:
   - `company/company-profile.yaml` — perfil da empresa, faturamento, equipe
   - `company/founder-dna.yaml` — jornada, motivação, estilo de liderança
   - `company/icp.yaml` — público-alvo do negócio dele
   - `brand/brandbook.yaml` — identidade visual e tom de voz

2. **Entenda as dores.** As top 5 dores recorrentes dos 17 participantes:
   - Escalar sem aumentar headcount (15/17 — 88%)
   - Processos manuais consumindo tempo do founder (14/17 — 82%)
   - Marketing fragmentado/terceirizado sem controle (13/17 — 76%)
   - IA usada pontualmente, sem orquestração (12/17 — 71%)
   - Gestão de pessoas — frustração com contratação e retenção (10/17 — 59%)

3. **Clone o repositório.** Tenha o repo local pra navegar rápido durante o evento:
   ```bash
   git clone https://github.com/oalanicolas/aiox-imersao.git
   cd aiox-imersao
   ```

### Durante o evento — Como apoiar cada ciclo

#### Ciclo 1 — Seu Sistema Ganha Vida (Pedro Valério)
**Objetivo:** Empresário sai com squads de sistema ativados.
- Certifique-se que o Claude Code está rodando
- Ajude a ativar squads C-Level, Sylevels, Conclave no contexto do negócio
- **Checkpoint:** Empresário executa `*help` e recebe resposta do squad

#### Ciclo 2 — Processos Documentados (Pedro Valério)
**Objetivo:** 3 processos-chave mapeados.
- Pergunte: "Qual processo te toma mais tempo hoje?"
- Guie o mapeamento: trigger → passos → saída → responsável
- **Checkpoint:** Meta 100% com pelo menos 2 processos completos

#### Ciclo 3 — Tarefas Reais (Pedro Valério)
**Objetivo:** Tarefas integradas com gestão de projetos.
- Conectar ClickUp/Asana com os squads
- Gerar tarefas a partir dos processos do Ciclo 2
- **Desafio "15 Minutos Sozinho":** Deixe o empresário operar sem ajuda por 15 min

#### Ciclo 4 — Design System (Alan Nicolas)
**Objetivo:** Identidade visual tokenizada.
- Logo, cores, tipografia e tom de voz configurados no workspace
- Mostrar antes/depois: output genérico vs. com Design System
- **Checkpoint:** Design tokens salvos, output visual aplicado

#### Ciclo 5 — Crie Seu Próprio Squad (Alan Nicolas)
**Objetivo:** Squad personalizado funcionando.
- Usar o Squad Creator ao vivo
- Cada empresário cria um squad para um problema específico do negócio
- **Showcase:** "Squad mais inesperado" votado pelo grupo

#### Ciclo 6 — Traffic Squad (Thiago Finch)
**Objetivo:** Campanha real rodando.
- Business Manager conectado, pixel setado
- Campanha com anúncio real e orçamento real (mínimo R$10/dia)
- **WOW:** Counter ao vivo no telão — "Campanhas ativas: X"

#### Ciclo 7 — Content Squad (Alan Nicolas)
**Objetivo:** Análise competitiva + conteúdo produzido.
- Análise de 3+ concorrentes ao vivo
- Conteúdo gerado com identidade visual do Ciclo 4
- **Showcase:** Análise de mercado de 2-3 empresas no telão

#### Ciclo 8 — Copy + Página (Alan Nicolas)
**Objetivo:** Página com copy profissional.
- Copy Squad reescreve a oferta do empresário
- Página montada com design system + copy nova
- **Preview:** Review final do CTA com mentor

#### Ciclo 9 — Página No Ar (Alan Nicolas)
**Objetivo:** URL publicada e acessível.
- Deploy da página (Vercel, Netlify ou equivalente)
- Feedback cruzado entre empresários
- **WOW:** "Manda o link pra alguém real."

#### Ciclo 10 — A Máquina Orquestrada (Alan Nicolas)
**Objetivo:** Fluxo integrado funcionando.
- Tráfego (Ciclo 6) apontando pra página (Ciclo 9) com copy (Ciclo 8)
- Fluxo: anúncio → página → conversão
- **Validação:** Mentor assina: "Fluxo funcional."

### Regras de ouro para mentores

1. **70/30** — 70% do tempo o empresário executa, 30% você contextualiza. Não palestre.
2. **Ninguém fica pra trás.** Se alguém travou, sinalize imediatamente no grupo de mentores.
3. **Use o workspace.** Tudo que o empresário precisa está em `workspace/businesses/{nome}/`. Não recrie do zero.
4. **Checkpoint antes de avançar.** Cada ciclo tem um entregável mínimo. Valide antes do próximo.
5. **War Room é obrigatório pra mentores.** Fique até pelo menos meia-noite. Os melhores insights acontecem ali.
6. **Quick Win é contrato.** Em D+15, o empresário TEM que ter um resultado concreto. Planeje isso desde o Ciclo 1.
7. **Documente no workspace.** Tudo que vocês construírem juntos precisa ficar salvo em `workspace/businesses/{nome}/`. Se não salvou, não aconteceu.

### Ferramentas que todo mentor precisa ter instalado

| Ferramenta | Por quê |
|------------|---------|
| Claude Code | Ativar e operar squads |
| Git / GitHub | Acessar este repositório e fazer pulls |
| Cursor (opcional) | IDE visual com IA para quem preferir |
| Meta Business Manager | Ciclo 6 — criação de campanhas |

---

## Como usar

### Pré-requisito

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) instalado e configurado
- Acesso a este repositório

### Ativar um squad

1. Clone o repositório:
```bash
git clone https://github.com/oalanicolas/aiox-imersao.git
cd aiox-imersao
```

2. Abra o Claude Code na pasta de um squad:
```bash
cd squads/copy
claude
```

3. Ative o agente principal:
```
@copy-chief
```

4. Use os comandos do squad:
```
*help
```

### Usar seu workspace

Os squads carregam dados do seu workspace automaticamente quando configurados. Durante a imersão, vocês vão aprender a conectar tudo.

---

## Estrutura do repositório

```
aiox-imersao/
├── README.md                        # Este arquivo
├── squads/                          # 32 squads de agentes IA
│   ├── copy/                        # Squad de copywriting
│   ├── brand/                       # Squad de branding
│   ├── hormozi/                     # Squad Hormozi
│   ├── deep-research/               # Squad de pesquisa
│   ├── squad-creator/               # Criador de squads
│   ├── _conteudo/                   # Squad de conteúdo (staging)
│   ├── _draft/                      # Em desenvolvimento
│   ├── _validar/                    # Em validação
│   └── ...                          # +29 squads
└── workspace/
    └── businesses/                  # 17 workspaces individuais
        ├── thiago_nishikata/        # Gold standard (~95%)
        ├── fabio_avelar/
        └── ...                      # +15 participantes
```

---

## Regras

- **Somente leitura** para a equipe técnica. Alterações são feitas no repositório principal e sincronizadas.
- **Nunca commitar segredos** (.env, tokens, chaves). O `.gitignore` já protege isso.
- **Squads são genéricos** — nenhum squad contém dados específicos de um negócio. Dados de negócio ficam em `workspace/businesses/`.

---

## Mentores

| Mentor | Especialidade |
|--------|--------------|
| **Alan Nicolas** | Orquestração IA, Claude Code, squads, design systems, copy, automação |
| **Pedro Valério** | Processos, SOPs, operações, eficiência (TTCX #6 global) |
| **Thiago Finch** | Tráfego, conteúdo, funnels |

---

## Suporte

Dúvidas sobre squads, workspace ou Claude Code → [grupo de mentores no WhatsApp](https://chat.whatsapp.com/BSEIt5uXva0EFODmXUJbpq?mode=gi_t) ou diretamente com os mentores durante o evento.
