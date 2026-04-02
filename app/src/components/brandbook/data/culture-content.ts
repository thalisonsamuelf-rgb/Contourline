import type { SectionChrome, SidebarGroup, InsightBlock } from "./movimento-content"

// ---------------------------------------------------------------------------
// Section Chrome (header/footer metadata for each section)
// ---------------------------------------------------------------------------

export const CULTURE_SECTION_CHROME = {
  manifesto: {
    id: "manifesto",
    label: "MANIFESTO",
    concept: "Core Belief",
    num: "01",
    subtitle: "01. Manifesto",
    title: "O Manifesto Cultural",
    footerLeft: "Core Belief",
    footerCenter: "Manifesto",
  },
  mvp: {
    id: "mvp",
    label: "MISSAO, VISAO & POSICIONAMENTO",
    concept: "Direction",
    num: "02",
    subtitle: "02. Direcionamento",
    title: "Missao, Visao & Posicionamento",
    footerLeft: "Direction",
    footerCenter: "MVV",
  },
  pillars: {
    id: "pillars",
    label: "PILARES CULTURAIS",
    concept: "Foundation",
    num: "03",
    subtitle: "03. Pilares",
    title: "Pilares Culturais",
    footerLeft: "Foundation",
    footerCenter: "Culture Pillars",
  },
  values: {
    id: "values",
    label: "VALORES OPERACIONAIS",
    concept: "Principles",
    num: "04",
    subtitle: "04. Valores",
    title: "Valores Operacionais",
    footerLeft: "Core Values",
    footerCenter: "Operating Principles",
  },
  commandments: {
    id: "commandments",
    label: "MANDAMENTOS",
    concept: "Rules",
    num: "05",
    subtitle: "05. Mandamentos",
    title: "Os Mandamentos",
    footerLeft: "Non-Negotiables",
    footerCenter: "Commandments",
  },
  mantras: {
    id: "mantras",
    label: "MANTRAS",
    concept: "Daily Practice",
    num: "06",
    subtitle: "06. Mantras",
    title: "Os Mantras",
    footerLeft: "Tribal Language",
    footerCenter: "Daily Mantras",
  },
  leadership: {
    id: "leadership",
    label: "LIDERANCA",
    concept: "Leaders",
    num: "07",
    subtitle: "07. Lideranca",
    title: "Perfil de Lideranca",
    footerLeft: "Leadership DNA",
    footerCenter: "Leader Profile",
  },
  hiring: {
    id: "hiring",
    label: "CONTRATACAO & DESLIGAMENTO",
    concept: "People",
    num: "08",
    subtitle: "08. People",
    title: "Contratacao & Desligamento",
    footerLeft: "People Decisions",
    footerCenter: "Hiring & Firing",
  },
  frameworks: {
    id: "frameworks",
    label: "FRAMEWORKS DE DECISAO",
    concept: "Decisions",
    num: "09",
    subtitle: "09. Frameworks",
    title: "Frameworks de Decisao",
    footerLeft: "Decision Making",
    footerCenter: "Frameworks",
  },
  lifestyle: {
    id: "lifestyle",
    label: "LIFESTYLE",
    concept: "Way of Life",
    num: "10",
    subtitle: "10. Lifestyle",
    title: "Legendario vs Mediocre",
    footerLeft: "Way of Life",
    footerCenter: "Lifestyle",
  },
  symbols: {
    id: "symbols",
    label: "SIMBOLOS & HISTORIA",
    concept: "Identity",
    num: "11",
    subtitle: "11. Simbolos",
    title: "Simbolos & Historia",
    footerLeft: "Cultural Artifacts",
    footerCenter: "Symbols",
  },
} satisfies Record<string, SectionChrome>

// ---------------------------------------------------------------------------
// 01. Manifesto
// ---------------------------------------------------------------------------

export const CULTURE_MANIFESTO = {
  paragraphs: [
    "O Manifesto Cultural e a declaracao de guerra ao status quo interno.\nNao e um texto bonito pra colocar no handbook.\nE a crenca que a empresa defende com tanta conviccao que esta disposta a demitir por ela.",
    'Um bom Manifesto Cultural responde uma pergunta:\n"O que acreditamos que todo o mercado esta fazendo errado internamente?"',
    "Ele define quem somos por dentro. Como operamos.\nQual e a cultura que nos separa dos outros.\nSem isso, a empresa e so mais um lugar pra trabalhar.",
  ],
  cta: "Escreva aqui a crenca central da sua cultura.",
  insight: {
    title: "E a fundacao de tudo.",
    body: "O Manifesto Cultural define o antagonismo interno (o que nao toleramos) e a promessa de transformacao para quem faz parte. Se isso nao estiver claro, valores viram poster na parede. Com o manifesto, valores viram filtro de contratacao e demissao.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 02. Missao, Visao & Posicionamento
// ---------------------------------------------------------------------------

export const CULTURE_MVP = {
  items: [
    { label: "Missao", value: "Por que existimos alem de gerar lucro? Quem se beneficia e qual transformacao causamos?", color: "var(--bb-accent)" },
    { label: "Visao", value: "Onde queremos estar em 5-10 anos? Qual e a visao de futuro que inspira o time?", color: "var(--bb-cream)" },
    { label: "Posicionamento", value: "Como o mercado nos ve? Complete: 'Somos um(a) _____ que _____'", color: "var(--bb-dim)" },
  ],
  insight: {
    title: "Tres frases que orientam todas as decisoes.",
    body: "Missao e o 'para que'. Visao e o 'para onde'. Posicionamento e o 'como nos veem'. Se o time nao consegue repetir as tres de memoria, elas nao estao funcionando. Teste: pergunte a 5 pessoas do time. Se as respostas divergirem, e hora de alinhar.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 03. Pilares
// ---------------------------------------------------------------------------

export const CULTURE_PILLARS = {
  intro: "Pilares sao os fundamentos que sustentam tudo: valores, decisoes, contratacoes. Se um pilar for removido, a cultura desmorona. Tipicamente 3-5 pilares que se conectam e reforcam mutuamente.",
  pillars: [
    { num: "I", name: "Pilar 1", description: "O que esse pilar significa, por que e fundamental, e como aparece no dia a dia.", connection: "Como se conecta aos outros pilares." },
    { num: "II", name: "Pilar 2", description: "Cada pilar deve ser inegociavel. Se voce pudesse ter apenas esse pilar, a empresa ainda funcionaria?", connection: "A conexao entre pilares cria o ciclo virtuoso." },
    { num: "III", name: "Pilar 3", description: "Pilares nao sao valores. Sao mais profundos: sao as premissas sobre as quais os valores se constroem.", connection: "Sem esse pilar, os outros dois nao se sustentam." },
  ],
  insight: {
    title: "Se um pilar faltar, nao e um legendario.",
    body: "Esses pilares sao fundamentais para um membro do time. Se qualquer um estiver em falta, nao estamos diante de alguem alinhado com a visao. A empresa e composta exclusivamente de individuos excepcionais, e e esse padrao de excelencia que se busca manter.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 04. Valores
// ---------------------------------------------------------------------------

export const CULTURE_VALUES = {
  intro: "Falar de valores e facil. Dificil e vivencia-los. Valores operacionais guiam decisoes, contratacoes e demissoes. Para cada valor: nome, definicao, perguntas-guia e referencias.",
  values: [
    { num: "01", name: "Valor 1", definition: "O que esse valor significa na pratica. Nao o que soa bonito, mas o que muda comportamento." },
    { num: "02", name: "Valor 2", definition: "Cada valor precisa de perguntas-guia: 'Como aplico isso hoje?' Se nao tem pergunta, nao tem acao." },
    { num: "03", name: "Valor 3", definition: "Valores com citacao de referencia ancoram mais forte. 'Clareza e gentileza' (Jason Fried) e mais memoravel que 'Seja claro'." },
    { num: "04", name: "Valor 4", definition: "Se o oposto do seu valor tambem e defensavel, voce tem um valor de verdade. 'Velocidade' vs 'Precisao'." },
    { num: "05", name: "Valor 5", definition: "Valores sao hierarquicos. Quando dois entram em conflito, qual prevalece? Essa hierarquia mostra a cultura real." },
    { num: "06", name: "Valor 6", definition: "Limite a 9 valores. Mais do que isso, ninguem lembra. E o que nao e lembrado nao guia decisao nenhuma." },
  ],
  insight: {
    title: "Valores viram filtro de contratacao e demissao.",
    body: "Um valor como 'Sinceridade Absoluta' vira um criterio de entrevista, um tema de feedback 360, e um motivo de desligamento. Valores vagos geram culturas fracas. Valores especificos geram times excepcionais.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 05. Mandamentos
// ---------------------------------------------------------------------------

export const CULTURE_COMMANDMENTS = {
  intro: "Como se livrar do microgerenciamento e regras pra tudo? Seguindo os mandamentos. Mandamentos sao mais rigidos que valores. Sao regras que nao mudam independente do contexto. Curtos, diretos, inegociaveis.",
  commandments: [
    { num: "I", title: "Mandamento 1", description: "Regra inegociavel que define como a empresa opera. Sem excecoes." },
    { num: "II", title: "Mandamento 2", description: "Se alguem viola um mandamento, e conversa franca imediata. Nao e opcional." },
    { num: "III", title: "Mandamento 3", description: "Mandamentos eliminam ambiguidade. Quando bate duvida, o mandamento resolve." },
    { num: "IV", title: "Mandamento 4", description: "Bons mandamentos sao memoraveis. Se ninguem lembra, nao funciona." },
    { num: "V", title: "Mandamento 5", description: "O principio orientador geral: uma pergunta que qualquer pessoa faz antes de decidir." },
  ],
  insight: {
    title: "Mandamentos substituem microgerenciamento.",
    body: "Quando os mandamentos sao claros, as pessoas nao precisam de permissao para agir. Sabem o que fazer porque os limites estao definidos. Liberdade com responsabilidade so funciona quando os limites sao explicitos.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 06. Mantras
// ---------------------------------------------------------------------------

export const CULTURE_MANTRAS = {
  intro: "Mantras sao reflexos dos valores que carregamos. Eles fazem parte do dia a dia. O obvio precisa ser dito, reforcado e repetido. Frases curtas, memoraveis, que o time repete naturalmente.",
  mantras: [
    { text: "Mantra 1", context: "Em que situacao esse mantra e invocado no dia a dia." },
    { text: "Mantra 2", context: "Mantras condensam cultura em linguagem tribal." },
    { text: "Mantra 3", context: "Quanto mais curto, mais poderoso. Menos de 5 palavras e ideal." },
    { text: "Mantra 4", context: "Se o time ja repete naturalmente, voce encontrou um mantra real." },
    { text: "Mantra 5", context: "Mantras nao se inventam. Se observam e se nomeiam." },
  ],
  insight: {
    title: "Linguagem compartilhada cria pertencimento.",
    body: "Quando o time usa as mesmas frases, os mesmos termos, os mesmos mantras, a cultura se instala na linguagem das pessoas. Mantras sao o nível mais acessível da cultura: qualquer pessoa nova entende e adota rapidamente.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 07. Lideranca
// ---------------------------------------------------------------------------

export const CULTURE_LEADERSHIP = {
  intro: "Lideres nao sao meros gestores. Sao catalisadores de grandeza. Aqui esta o que define um verdadeiro lider nesta empresa. Documente expectativas especificas, nao genericas.",
  expectations: [
    { title: "Expectativa 1", description: "O que diferencia um lider aqui de um gestor comum." },
    { title: "Expectativa 2", description: "Cada expectativa precisa de exemplo concreto." },
    { title: "Expectativa 3", description: "Lideres sao avaliados por essas expectativas, nao por politica." },
  ],
  teamVirtues: [
    { title: "Virtude 1", description: "O que define um membro ideal do time." },
    { title: "Virtude 2", description: "Virtudes sao observaveis. Se nao da pra medir, nao e virtude, e desejo." },
    { title: "Virtude 3", description: "Cada virtude e um criterio de avaliacao de performance." },
  ],
  insight: {
    title: "O time e reflexo da lideranca.",
    body: "Se os lideres nao vivem a cultura, o time nao vai viver. Expectativas de lideranca sao o contrato mais importante da empresa. Documente, avalie, cobre. Sem isso, cultura e discurso vazio.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 08. Contratacao & Desligamento
// ---------------------------------------------------------------------------

export const CULTURE_HIRING = {
  sections: [
    {
      title: "Quem Contratar",
      items: [
        { bold: "Green Flag 1:", text: "Sinais positivos que indicam alinhamento cultural." },
        { bold: "Green Flag 2:", text: "Must-haves inegociaveis para qualquer contratacao." },
        { bold: "Green Flag 3:", text: "Perfil que nao apenas se encaixa, mas eleva o ecossistema." },
      ],
    },
    {
      title: "Quem NAO Contratar",
      items: [
        { bold: "Anti-Pattern 1:", text: "Perfis que parecem bons no papel mas destroem cultura." },
        { bold: "Anti-Pattern 2:", text: "Red flags que devem ser eliminatorias na entrevista." },
        { bold: "Anti-Pattern 3:", text: "Erros comuns de contratacao que a empresa ja cometeu." },
      ],
    },
    {
      title: "Quando Desligar",
      items: [
        { bold: "Pergunta 1:", text: "Esta pessoa esta ativamente promovendo e vivendo nossos valores?" },
        { bold: "Pergunta 2:", text: "Se anunciasse saida, eu lutaria incondicionalmente para mante-la?" },
        { bold: "Pergunta 3:", text: "Conhecendo seu desempenho atual, eu a contrataria de novo?" },
      ],
    },
  ],
  insight: {
    title: "Manter alguem desalinhado nao e gentileza.",
    body: "E um desservico para todos. Uma saida rapida e digna abre espaco para alguem novo e permite que a pessoa encontre um ambiente onde possa verdadeiramente florescer. A responsabilidade de manter a excelencia do time e coletiva.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 09. Frameworks de Decisao
// ---------------------------------------------------------------------------

export const CULTURE_FRAMEWORKS = {
  intro: "Frameworks eliminam duvida. Quando alguem nao sabe o que fazer, o framework resolve. Documente os frameworks que o time usa no dia a dia e os principios guia que norteiam todas as decisoes.",
  frameworks: [
    { name: "Framework 1", description: "Como funciona e quando usar.", rule: "A regra central desse framework." },
    { name: "Framework 2", description: "Frameworks sao atalhos de decisao testados.", rule: "Se X, entao Y. Simples assim." },
    { name: "Framework 3", description: "Bons frameworks cabem em uma frase.", rule: "Se nao cabe, nao e framework, e processo." },
  ],
  principles: [
    "Principio Guia 1",
    "Principio Guia 2",
    "Principio Guia 3",
    "Principio Guia 4",
  ],
  insight: {
    title: "Frameworks substituem reunioes.",
    body: "Cada framework bem definido e uma reuniao a menos. Cada principio guia e uma decisao mais rapida. O objetivo e que qualquer pessoa do time consiga tomar a decisao certa sem precisar perguntar ao chefe.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 10. Lifestyle (Legendario vs Mediocre)
// ---------------------------------------------------------------------------

export const CULTURE_LIFESTYLE = {
  intro: "Ser legendario e um compromisso diario. Todos nos somos uma mistura entre o legendario e o mediocre. Como o conto dos dois lobos, vence quem alimentarmos mais. Use essa tabela como auto-avaliacao constante.",
  rows: [
    { legendary: "Usa IA ativamente", mediocre: "Usa desculpas" },
    { legendary: "Assume responsabilidade", mediocre: "Culpa os outros" },
    { legendary: "Entrega mais do que o esperado", mediocre: "Entrega o minimo possivel" },
    { legendary: "Tem iniciativa", mediocre: "Espera que outros tomem a iniciativa" },
    { legendary: "E otimista e grato", mediocre: "E pessimista e ingrato" },
    { legendary: "Sonha grande", mediocre: "Sonha pequeno" },
    { legendary: "Busca constante evolucao", mediocre: "Fica estagnado na zona de conforto" },
    { legendary: "Pensa a longo prazo", mediocre: "E imediatista" },
    { legendary: "Ve oportunidades", mediocre: "Ve falhas" },
    { legendary: "Foca no essencial (0,8%)", mediocre: "Dispersa-se em atividades pouco relevantes" },
    { legendary: "Gera resultados sem mimimi", mediocre: "Reclama mais do que age" },
    { legendary: "Assume postura de dono", mediocre: "Age apenas como funcionario" },
  ],
  insight: {
    title: "A tabela e o espelho.",
    body: "Nao e sobre ser perfeito. E sobre saber em qual coluna voce esta em cada dimensao e escolher conscientemente para qual lado quer ir. Auto-avaliacao constante e o que separa quem evolui de quem estagna.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 11. Simbolos & Historia
// ---------------------------------------------------------------------------

export const CULTURE_SYMBOLS = {
  intro: "Numa era onde tudo e liquido, onde nada tem forma, escolher ter simbolos e um ato revolucionario. Simbolos criam identidade, pertencimento e reconhecimento. Documente os simbolos visuais, verbais, rituais e artefatos da cultura.",
  symbols: [
    { name: "Simbolo 1", type: "visual", meaning: "O que representa e por que importa.", origin: "De onde veio." },
    { name: "Simbolo 2", type: "ritual", meaning: "Rituais de reconhecimento entre membros.", origin: "Como nasceu." },
    { name: "Simbolo 3", type: "artefato", meaning: "Objeto fisico ou digital que carrega significado.", origin: "A historia por tras." },
  ],
  equation: null as string | null,
  closingStatement: "Os simbolos nao sao o que importa. O que importa e que escolhemos ter simbolos. Escolhemos ter forma. Escolhemos ter identidade. Escolhemos ter tribo.",
  insight: {
    title: "Simbolos sao tecnologia de pertencimento.",
    body: "Quando dois membros se reconhecem pelos simbolos, a cultura se prova viva. Simbolos nao se inventam em brainstorm. Eles emergem da pratica e sao nomeados depois. Documente os que ja existem naturalmente antes de criar novos.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// Page-level content
// ---------------------------------------------------------------------------

export const CULTURE_PAGE_CONTENT = {
  sidebarGroups: [
    {
      label: "Fundacao",
      items: [
        { id: "manifesto", label: "Manifesto", num: "01" },
        { id: "mvp", label: "Missao/Visao", num: "02" },
        { id: "pillars", label: "Pilares", num: "03" },
      ],
    },
    {
      label: "Principios",
      items: [
        { id: "values", label: "Valores", num: "04" },
        { id: "commandments", label: "Mandamentos", num: "05" },
        { id: "mantras", label: "Mantras", num: "06" },
      ],
    },
    {
      label: "Pessoas",
      items: [
        { id: "leadership", label: "Lideranca", num: "07" },
        { id: "hiring", label: "Contratacao", num: "08" },
      ],
    },
    {
      label: "Operacao",
      items: [
        { id: "frameworks", label: "Frameworks", num: "09" },
        { id: "lifestyle", label: "Lifestyle", num: "10" },
        { id: "symbols", label: "Simbolos", num: "11" },
      ],
    },
  ] satisfies SidebarGroup[],
  headerBanner: {
    navCenter: "CULTURE DECK",
    eyebrow: "THE INTERNAL DOCUMENT.",
    footerLeft: "Section 00",
    footerCenter: "Culture System",
    footerRight: "2026",
  },
  tickerItems: [
    "MANIFESTO DEFINE A CRENCA",
    "PILARES DEFINEM A FUNDACAO",
    "VALORES DEFINEM AS DECISOES",
    "MANDAMENTOS ELIMINAM AMBIGUIDADE",
    "MANTRAS CRIAM PERTENCIMENTO",
  ],
  tickerSpeed: 20,
  footerTagline: "Cultura nao e o que voce diz. E o que voce tolera.",
  headerSubtitle: "O DOCUMENTO INTERNO QUE DEFINE COMO A EMPRESA OPERA, QUEM CONTRATA E O QUE NAO TOLERA.",
}
