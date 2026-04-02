import {
  STARTER_REFERENCE_LABELS,
  STARTER_SYMBOL_FLOW,
  STARTER_TYPOGRAPHY,
  STARTER_VISUAL_COLOR_GROUPS,
  STARTER_VISUAL_SYMBOLS,
  STARTER_VISUAL_TYPOGRAPHY_EXAMPLES,
} from "./starter-brand-data"

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export type InsightBlock = { title: string; body: string }
export type SectionChrome = {
  id: string
  label: string
  concept: string
  num: string
  subtitle: string
  title: string
  footerLeft: string
  footerCenter: string
}

export type SidebarGroup = {
  label: string
  items: Array<{ id: string; label: string; num: string }>
}

export const SECTION_CHROME = {
  manifesto: {
    id: "manifesto",
    label: "MANIFESTO",
    concept: "Core Belief",
    num: "01",
    subtitle: "01. Manifesto",
    title: "O Manifesto da Marca",
    footerLeft: "Core Belief",
    footerCenter: "Manifesto",
  },
  proposito: {
    id: "proposito",
    label: "PROPOSITO & VALORES",
    concept: "Foundation",
    num: "02",
    subtitle: "02. Proposito",
    title: "Proposito & Valores",
    footerLeft: "Foundation",
    footerCenter: "Purpose & Values",
  },
  valores: {
    id: "valores",
    label: "VALORES CORPORATIVOS",
    concept: "Core Values",
    num: "02b",
    subtitle: "02b. Valores",
    title: "Valores Corporativos",
    footerLeft: "Core Values",
    footerCenter: "6 Principios",
  },
  arquetipo: {
    id: "arquetipo",
    label: "ARQUETIPO & PERSONALIDADE",
    concept: "DNA",
    num: "03",
    subtitle: "03. Arquetipo",
    title: "Arquetipo & Personalidade",
    footerLeft: "Brand Archetypes",
    footerCenter: "Personality Core",
  },
  posicionamento: {
    id: "posicionamento",
    label: "POSICIONAMENTO & HIERARQUIA",
    concept: "Strategy",
    num: "04",
    subtitle: "04. Posicionamento",
    title: "Posicionamento & Hierarquia",
    footerLeft: "Brand Position",
    footerCenter: "Market Strategy",
  },
  contraste: {
    id: "contraste",
    label: "CONTRASTE COMPETITIVO",
    concept: "Landscape",
    num: "04b",
    subtitle: "04b. Contraste",
    title: "Contraste Competitivo",
    footerLeft: "Competitive Landscape",
    footerCenter: "Brand Positioning",
  },
  brandscript: {
    id: "brandscript",
    label: "BRANDSCRIPT",
    concept: "Message Frame",
    num: "05",
    subtitle: "05. BrandScript",
    title: "Frame de Mensagem (SB7)",
    footerLeft: "Story Brand",
    footerCenter: "SB7 Framework",
  },
  truelines: {
    id: "truelines",
    label: "TRUELINES & TAGLINES",
    concept: "Messaging",
    num: "06",
    subtitle: "06. Truelines",
    title: "Truelines & Taglines",
    footerLeft: "Messaging",
    footerCenter: "Trueline Matrix",
  },
  naming: {
    id: "naming",
    label: "NAMING SEMANTICO",
    concept: "Semantics",
    num: "07",
    subtitle: "07. Naming",
    title: "Naming Semantico",
    footerLeft: "Concept Architecture",
    footerCenter: "Semantic Flow",
  },
  vocabulario: {
    id: "vocabulario",
    label: "VOCABULARIO & TOM DE VOZ",
    concept: "Voice",
    num: "08",
    subtitle: "08. Vocabulario",
    title: "Vocabulario & Tom de Voz",
    footerLeft: "Vocabulary",
    footerCenter: "Tone of Voice",
  },
  voz: {
    id: "voz",
    label: "TRAITS DA VOZ",
    concept: "Voice Traits",
    num: "08b",
    subtitle: "08b. Voz da Marca",
    title: "Traits da Voz",
    footerLeft: "Voice Traits",
    footerCenter: "4 Dimensoes",
  },
  jornada: {
    id: "jornada",
    label: "A JORNADA DO HEROI",
    concept: "Hero's Journey",
    num: "09",
    subtitle: "09. Jornada",
    title: "A Jornada do Heroi",
    footerLeft: "Story Arc",
    footerCenter: "Transformation",
  },
  depoimentos: {
    id: "depoimentos",
    label: "DEPOIMENTOS & PROOF POINTS",
    concept: "Evidence",
    num: "10",
    subtitle: "10. Depoimentos",
    title: "Depoimentos & Proof Points",
    footerLeft: "Validated Results",
    footerCenter: "Real Evidence",
  },
  visual: {
    id: "visual",
    label: "IDENTIDADE VISUAL",
    concept: "Visual Identity",
    num: "11",
    subtitle: "11. Identidade Visual",
    title: "Marcas & Cores",
    footerLeft: "Visual System",
    footerCenter: "Identity Kit",
  },
  contrato: {
    id: "contrato",
    label: "O CONTRATO DA MARCA",
    concept: "Promise",
    num: "12",
    subtitle: "12. Compromisso",
    title: "O Contrato da Marca",
    footerLeft: "Brand Contract",
    footerCenter: "Mutual Promise",
  },
  fundadores: {
    id: "fundadores",
    label: "OS FUNDADORES",
    concept: "People",
    num: "13",
    subtitle: "13. Os Fundadores",
    title: "A Lideranca",
    footerLeft: "Leadership",
    footerCenter: "Complementary Forces",
  },
} satisfies Record<string, SectionChrome>

// ---------------------------------------------------------------------------
// 01. Manifesto
// ---------------------------------------------------------------------------

export const MANIFESTO = {
  paragraphs: [
    "O Manifesto é a declaração de guerra da marca ao status quo.\nNão é um texto institucional bonito pra colocar no site.\nÉ a crença que a marca defende com tanta convicção que está disposta a perder seguidores por ela.",
    'Um bom Manifesto responde a uma pergunta simples:\n"O que você acredita que o mercado inteiro está fazendo errado?"',
    "Ele nasce de uma leitura real do que está acontecendo na cultura,\nno mercado, no comportamento das pessoas.\nSem essa leitura, o manifesto vira opinião pessoal.\nCom ela, vira convicção fundamentada.",
    "O Manifesto é a semente de tudo. Dele nascem as crenças que a marca ensina,\nas histórias que conta, os rituais que cria.\nTudo que a marca faz no mundo começa aqui.",
  ],
  cta: "Escreva aqui a crença central da sua marca.",
  insight: {
    title: "É o primeiro tijolo.",
    body: "O Manifesto define o antagonismo central (o que combatemos) e a promessa de transformação (o que oferecemos). Se isso não estiver claro, toda comunicação que vem depois vira ruído genérico. É o primeiro documento que um estrategista de marca constrói depois de entender a cultura do mercado.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 02. Propósito
// ---------------------------------------------------------------------------

export const PROPOSITO = {
  headline: "Defina aqui a missão transformadora da marca.",
  headlineAccent: "missão transformadora",
  description:
    'O Propósito responde uma pergunta direta: "Por que esta marca existe além de gerar lucro?" Ele é o motor emocional que conecta a marca às pessoas certas. Sem propósito claro, a marca compete por preço. Com propósito, compete por significado.',
  values: [
    { name: "Valor 1", desc: "Descreva o primeiro valor fundamental da marca. Valores são filtros de decisão. Quando bem definidos, eliminam dúvidas sobre o que fazer e o que recusar." },
    { name: "Valor 2", desc: "Cada valor precisa gerar comportamento. 'Inovação' é genérico. 'Construir antes de teorizar' muda o jeito que as pessoas trabalham." },
    { name: "Valor 3", desc: "Valores revelam personalidade. Se dois concorrentes podem dizer a mesma coisa, não é um valor. É clichê." },
    { name: "Valor 4", desc: "Um bom teste: se o oposto do seu valor também seria defensável por outra marca, você tem um valor de verdade. 'Velocidade' vs 'Precisão', por exemplo." },
    { name: "Valor 5", desc: "Valores são hierárquicos. Quando dois entram em conflito, qual prevalece? Essa hierarquia mostra a cultura real, não a declarada." },
    { name: "Valor 6", desc: "Limite a 6 valores. Mais do que isso, ninguém lembra. E o que não é lembrado não guia decisão nenhuma." },
  ],
  enemyIntro: "Toda marca que vira movimento tem um antagonista. Defina aqui a força que sua marca combate.",
  enemies: [
    { bold: "Inimigo 1", desc: "O antagonista principal. Não é um concorrente. É uma força cultural, um paradigma, um modo de pensar que prejudica as pessoas que você serve." },
    { bold: "Inimigo 2", desc: "Pode ser uma crença limitante compartilhada ('isso não é para mim'), uma prática de mercado nociva, ou uma barreira que ninguém está nomeando." },
    { bold: "Inimigo 3", desc: "O inimigo cria coesão. Quando pessoas compartilham um antagonista, elas se reconhecem como aliadas. É o que transforma público em tribo." },
    { bold: "Inimigo 4", desc: "Cuidado: o inimigo nunca é uma pessoa ou grupo de pessoas. É uma ideia, um sistema, uma prática. Marcas que atacam pessoas se tornam tóxicas." },
    { bold: "Inimigo 5", desc: "Melhor teste: sua tribo já sente frustração com isso antes de você nomear? Se sim, você achou o inimigo certo. Você não inventa, você revela." },
  ],
  insight: {
    title: "É a tríade fundacional.",
    body: 'Propósito, Valores e Inimigo trabalham juntos. O Propósito é o "para quê", os Valores são o "como", e o Inimigo é o "contra o quê". Juntos, criam o campo gravitacional que atrai as pessoas certas e repele quem não pertence. Essa tríade alimenta diretamente tudo que a marca vai dizer e fazer no mundo.',
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 02b. Valores Corporativos
// ---------------------------------------------------------------------------

export const VALORES = {
  items: [
    { num: "01", title: "Valor Fundacional", desc: "O valor que, se removido, destruiria a identidade da marca. É inegociável e orienta todas as decisões difíceis." },
    { num: "02", title: "Valor de Diferenciação", desc: "O valor que separa a marca dos concorrentes. Se o oposto deste valor é defensável por outra marca, você encontrou um diferenciador de verdade." },
    { num: "03", title: "Valor de Cultura", desc: "O valor que define como a equipe opera por dentro. Marcas que vivem seus valores internamente projetam isso naturalmente para fora." },
    { num: "04", title: "Valor de Filtro", desc: "O valor que afasta quem não é para a marca. Valores que polarizam são mais poderosos que valores universais. Eles criam pertencimento real." },
    { num: "05", title: "Valor de Operação", desc: "O valor que guia o dia a dia. Como entregamos? Qual padrão mínimo de qualidade? Este valor define a experiência concreta de quem está dentro." },
    { num: "06", title: "Valor de Aspiração", desc: "O valor que a marca ainda está construindo. Incluir um valor aspiracional cria tensão produtiva e mostra que a marca está em evolução constante." },
  ],
  insight: {
    title: "Valores viram crenças ensináveis.",
    body: 'Um valor como "Transparência Radical" vira uma crença que a marca ensina, com histórias que provam e práticas que reforçam. Valores vagos geram crenças fracas. Valores específicos geram movimentos. Se a sua tribo não consegue repetir seus valores de memória, eles não estão funcionando.',
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 03. Arquétipo
// ---------------------------------------------------------------------------

export const ARQUETIPO = {
  archetypes: [
    { label: "Arquétipo Primário", pct: 50, quote: '"O dominante define o tom emocional da marca. É a primeira impressão que fica."', color: "var(--bb-accent)" },
    { label: "Arquétipo Secundário", pct: 35, quote: '"O secundário adiciona nuance e profundidade. Evita que a marca vire caricatura."', color: "var(--bb-cream)" },
    { label: "Arquétipo Terciário", pct: 15, quote: '"O terciário tempera. Pequena dose que surpreende e cria memorabilidade."', color: "var(--bb-dim)" },
  ],
  compositionIntro: "Nenhuma marca é um arquétipo puro. O mix de 3 cria personalidade única. Defina as proporções e cite qual dos 12 arquétipos jungianos ocupa cada posição.",
  analogyPrompt: "Se sua marca fosse uma pessoa, quem seria? Essa referência ajuda toda a equipe a manter o tom consistente em qualquer canal.",
  voicesIntro: "Marcas fortes operam com duas vozes: a voz do líder (humana, imperfeita, relacional) e a voz do produto (polida, confiável, funcional). Separar as duas evita confusão.",
  founderVoice: "A voz pessoal. Pode ser vulnerável, apaixonada, informal. É a voz que cria conexão emocional e puxa as pessoas para dentro. Vive nas redes sociais, lives e conversas diretas.",
  productVoice: "A voz institucional. Confiante, estruturada, precisa. Nunca vulnerável. Transmite competência e segurança. Vive nos docs, landing pages, e-mails e materiais de suporte.",
  voiceRule: '"O líder atrai. O produto retém e entrega."',
  insight: {
    title: "Autenticidade não se inventa.",
    body: "O arquétipo é extraído da identidade real do líder e da marca. Forçar um arquétipo que não é seu gera dissonância, e as pessoas percebem. Cruze o que a cultura pede com o que o fundador realmente é. A sobreposição entre esses dois mundos é onde nasce a personalidade autêntica da marca.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 04. Posicionamento
// ---------------------------------------------------------------------------

export const POSICIONAMENTO = {
  columns: [
    { label: "Categoria", value: "Em qual categoria mental a marca vive?", isLong: false },
    { label: "Público", value: "Para quem é. Descrito pela dor, não pela demografia.", isLong: false },
    { label: "Onlyness Statement", value: "A única [categoria] que [transformação], através de [mecanismo], para [tribo]. Se outra marca pode dizer a mesma frase, você não tem posição. Esse é o teste definitivo.", isLong: true },
  ],
  polarityIntro: "Polaridade cria clareza. Definir o que a marca NÃO é elimina ambiguidade e ajuda as pessoas a se identificarem. Essa polaridade nasce do antagonismo definido no Manifesto.",
  isTags: ["Defina o que a marca É", "Território mental ocupado", "Promessa central", "Mecanismo único", "Diferenciador real"],
  notTags: ["O que a marca NÃO é", "Confusões comuns", "Promessas que não fazemos", "Território que rejeitamos", "Associações indesejadas"],
  pyramidIntro: "Sempre lidere pelo WHY. Se a primeira coisa que a pessoa ouve é uma feature, você perdeu a atenção emocional. A hierarquia define a ordem em que a marca comunica.",
  pyramid: [
    { level: 1, label: "1. WHY: Sentimento e Missão", value: '"Por que existimos? Qual transformação causamos na vida das pessoas?"' },
    { level: 2, label: "2. HOW: Mecanismo Único", value: '"Como entregamos essa transformação de forma diferente de todos os outros?"' },
    { level: 3, label: "3. WHAT: Features e Lógica", value: '"O que entregamos concretamente? Produto, serviço, formato, tecnologia."' },
  ],
  insight: {
    title: "Posicionamento é território mental.",
    body: "A marca precisa ocupar um espaço claro na cabeça das pessoas. Esse espaço é definido por 7 elementos: a causa que defende, o antagonista que combate, a promessa de transformação, o mecanismo único, a prova, a convocação e a identidade de quem pertence. A Hierarquia da Comunicação garante que a causa e a promessa venham antes das features. Sem essa ordem, a marca fala de dentro para fora e o mundo não entende.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 04b. Contraste
// ---------------------------------------------------------------------------

export const CONTRASTE = {
  intro: 'Contraste não é sobre ser "melhor". É sobre ocupar um espaço mental que ninguém mais ocupa. Mapeie os concorrentes não por features, mas por arquétipo, framing e promessa. O gap de cada um é a sua oportunidade.',
  competitors: [
    { name: STARTER_REFERENCE_LABELS.competitorLeadName, archetype: "Seu Mix Arquetípico", framing: "Seu Framing Único", promise: "Sua Promessa Central", gap: "—", highlight: true },
    { name: "Concorrente A", archetype: "Sage / Creator", framing: "Como eles se posicionam", promise: "O que prometem", gap: "O que falta na proposta deles" },
    { name: "Concorrente B", archetype: "Innocent / Caregiver", framing: "Como eles se posicionam", promise: "O que prometem", gap: "O que falta na proposta deles" },
    { name: "Concorrente C", archetype: "Sage / Hero", framing: "Como eles se posicionam", promise: "O que prometem", gap: "O que falta na proposta deles" },
    { name: "Concorrente D", archetype: "Magician / Creator", framing: "Como eles se posicionam", promise: "O que prometem", gap: "O que falta na proposta deles" },
  ] as Array<{ name: string; archetype: string; framing: string; promise: string; gap: string; highlight?: boolean }>,
  rowLabels: { archetype: "Arquétipo", framing: "Framing", promise: "Promessa", gap: "Gap" } as Record<string, string>,
  insight: {
    title: "Não basta ler o mercado. Precisa ler a disputa de narrativas.",
    body: "O mapa competitivo olha para além de features e preço. Quem está dizendo o quê? Quais arquétipos estão saturados no seu mercado? Onde existe espaço vazio que ninguém ocupa? Essa análise alimenta diretamente o seu posicionamento e garante que a marca ocupe um lugar genuinamente único na cabeça das pessoas.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 05. BrandScript
// ---------------------------------------------------------------------------

export const BRANDSCRIPT = {
  intro: "O BrandScript (framework SB7, de Donald Miller) estrutura a narrativa da marca em 6 elementos. Garante que toda comunicação coloca o cliente como herói e a marca como guia. É a ponte entre o que a marca acredita e o que ela comunica no dia a dia.",
  cards: [
    { title: "1. O Herói", color: "var(--bb-accent)", text: "Quem é o protagonista da história? O herói nunca é a marca. É a pessoa que você serve. Descreva pela dor e pelo desejo, não por dados demográficos." },
    { title: "2. O Problema", color: "var(--bb-accent)", text: "Externo: o obstáculo visível.\nInterno: a frustração emocional.\nFilosófico: por que isso não deveria existir.\nOs três níveis juntos criam ressonância profunda." },
    { title: "3. O Guia", color: "var(--bb-accent)", text: "A marca como mentora. Duas qualidades obrigatórias:\nAutoridade: prova de que sabe o caminho.\nEmpatia: prova de que entende a dor." },
    { title: "4. O Plano", color: "var(--bb-accent)", text: "3 passos simples que removem o medo de agir. O plano deve ser tão claro que elimina a objeção 'e se eu não conseguir?' antes que ela apareça." },
    { title: "5. O Fracasso", color: "#ef4444", text: "O que acontece se a pessoa NÃO agir? Pinte o cenário de inação com dados reais. Urgência sem manipulação." },
    { title: "6. O Sucesso", color: "#ED4609", text: "A transformação completa. Como a vida muda? Use linguagem sensorial: o que a pessoa vê, sente, ouve, faz de diferente depois da transformação." },
  ],
  insight: {
    title: "Traduz crença em narrativa.",
    body: "O BrandScript pega as crenças da marca e organiza em formato de história que qualquer pessoa entende. Cada peça de comunicação que a marca publica deve se conectar a pelo menos um dos 6 blocos. Se um post, vídeo ou e-mail não se encaixa em nenhum, ele não pertence à comunicação da marca. Simples assim.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 06. Truelines
// ---------------------------------------------------------------------------

export const TRUELINES = {
  intro: "Truelines são frases-verdade que condensam a essência da marca em poucas palavras. Diferente de slogans genéricos, uma trueline carrega a crença central e funciona sozinha, sem contexto. Crie variações por tipo para cobrir diferentes situações de uso.",
  rows: [
    { line: '"Escreva aqui sua trueline primária."', tipo: "Provocativa", uso: "PRIMÁRIA: hero message, primeira impressão", highlight: true },
    { line: '"Variação posicional da trueline."', tipo: "Posicional", uso: "Contextos internacionais, premium, institucional", highlight: false },
    { line: '"Variação descritiva, mais funcional."', tipo: "Descritiva", uso: "Social media, CTAs, comunicação rápida", highlight: false },
    { line: '"Variação imperativa, call to action."', tipo: "Imperativa", uso: "Workshops, landing pages, convocação", highlight: false },
    { line: '"Variação possessiva, empoderamento."', tipo: "Possessiva", uso: "Momentos de pertencimento, pós-compra", highlight: false },
  ],
  insight: {
    title: "A trueline é o destilado da marca.",
    body: "A primária precisa carregar a causa e a promessa de transformação numa frase só. As variações servem momentos diferentes da jornada: a provocativa chama atenção, a posicional gera confiança, a imperativa converte, a possessiva cria pertencimento. Cada uma serve um momento, mas todas carregam a mesma essência.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 07. Naming
// ---------------------------------------------------------------------------

export const NAMING = {
  intro: 'Naming semântico vai além de "soar bem". Cada letra, sílaba e combinação carrega significado. O fluxo abaixo mostra como decompor o nome da marca em unidades de significado. Documente a intenção por trás de cada parte.',
  letters: [
    { char: "N", desc: "Primeira letra: o gancho visual e fonético do nome", color: "var(--bb-cream)" },
    { char: "O", desc: "Letras intermediárias: ritmo, sonoridade, flow", color: "var(--bb-dim)" },
    { char: "M", desc: "Construção semântica: o que cada parte comunica", color: "var(--bb-dim)" },
    { char: "E", desc: "Letra final: o fechamento, a memorabilidade", color: "var(--bb-accent)" },
  ],
  scoreIntro: "Avalie o nome em 8 dimensões. Score abaixo de 70% indica que vale repensar.",
  scores: [
    ["Pronunciabilidade", "?/10"], ["Memorabilidade", "?/10"], ["Semântica Embutida", "?/10"],
    ["Internacionalidade", "?/10"], ["Domínio (.com)", "?/10"], ["Diferenciação", "?/10"],
    ["Escalabilidade", "?/10"], ["Proteção Legal", "?/10"], ["TOTAL", "?%"],
  ] as [string, string][],
  architectureIntro: "Planeje sub-marcas desde o início. A arquitetura define como o nome escala para novos produtos e verticais.",
  architecture: [
    ["Marca Principal", "O núcleo: nome do produto ou empresa central"],
    ["Sub-marca A", "Extensão para vertical, produto ou comunidade"],
    ["Sub-marca B", "Extensão para nova audiência ou mercado"],
    ["Sub-marca C", "Extensão futura reservada para escalabilidade"],
  ] as [string, string][],
  insight: {
    title: "O nome é o ativo mais permanente da marca.",
    body: "Ele precisa refletir a interseção entre o que a cultura pede e o que a marca realmente é. Nomes que soam bem mas não carregam significado viram commodity. Nomes com semântica embutida se tornam parte do vocabulário da tribo. As pessoas passam a usar o nome como verbo, como referência, como identidade.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 08. Vocabulário
// ---------------------------------------------------------------------------

export const VOCABULARIO = {
  intro: "O Dicionário Proprietário é a ferramenta mais subestimada de uma marca. Quando a tribo adota seu vocabulário e passa a usar suas palavras no dia a dia, o movimento se instala na linguagem. Power Words são termos que você sempre usa. Palavras Banidas são termos proibidos, com justificativa.",
  powerWords: [
    { word: "Palavra-Poder 1", tip: "Palavra que a marca usa sempre. Carrega identidade e cria reconhecimento." },
    { word: "Palavra-Poder 2", tip: "Substitui o termo genérico do mercado por um termo proprietário da marca." },
    { word: "Palavra-Poder 3", tip: "Termo técnico que a marca se apropriou e redefiniu com significado novo." },
    { word: "Palavra-Poder 4", tip: "Metáfora recorrente que ancora o universo simbólico da marca." },
    { word: "Palavra-Poder 5", tip: "Termo que nomeia o destino ou resultado que a marca promete." },
    { word: "Palavra-Poder 6", tip: "Verbo de ação que define o que a marca faz pelas pessoas." },
    { word: "Palavra-Poder 7", tip: "Referência cultural que a tribo reconhece e adota no dia a dia." },
    { word: "Palavra-Poder 8", tip: "Termo que nomeia a jornada ou o processo de transformação." },
    { word: "Palavra-Poder 9", tip: "Termo que descreve o inimigo ou o problema de forma proprietária." },
    { word: "Palavra-Poder 10", tip: "Expressão que captura o momento de chegada, o resultado final." },
  ],
  forbidden: [
    { word: "Palavra Banida 1", alt: "Por que banir: genérica demais, todos os concorrentes usam." },
    { word: "Palavra Banida 2", alt: "Por que banir: promessa vazia que gera desconfiança." },
    { word: "Palavra Banida 3", alt: "Por que banir: minimiza o esforço real que a transformação exige." },
    { word: "Palavra Banida 4", alt: "Por que banir: buzzword sem substância." },
    { word: "Palavra Banida 5", alt: "Por que banir: despersonaliza quem a marca serve." },
    { word: "Palavra Banida 6", alt: "Por que banir: contradiz o posicionamento da marca." },
  ],
  tones: [
    { left: "Formal", right: "Informal", pos: 50 },
    { left: "Sério", right: "Divertido", pos: 50 },
    { left: "Técnico", right: "Acessível", pos: 50 },
    { left: "Distante", right: "Próximo", pos: 50 },
    { left: "Arrogante", right: "Humilde", pos: 50 },
  ],
  tonesIntro: "Posicione o marcador em cada escala. Os pontos estão no centro (neutro). Mova para refletir a personalidade real. A posição define como a marca se comporta em cada dimensão da comunicação.",
  voiceSummaryPrompt: "Descreva aqui a voz da marca em uma frase. Como ela soa? Que tipo de pessoa parece ser quando fala?",
  insight: {
    title: "Linguagem é território.",
    body: "O vocabulário proprietário é uma das ferramentas mais poderosas de uma marca. Quando a tribo passa a usar suas palavras no dia a dia, o movimento se instala na linguagem das pessoas. Palavras Banidas evitam que a marca caia em padrões genéricos que diluem o posicionamento. O vocabulário também alimenta os rituais verbais da comunidade: saudações, gírias internas, expressões que só quem é de dentro entende.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 08b. Voz
// ---------------------------------------------------------------------------

export const VOZ = {
  intro: "Traits são as dimensões permanentes da voz da marca. Eles não mudam por contexto. O que muda é a dosagem: um e-mail de suporte pode ser mais Humano e menos Provocativo, mas nunca perde o trait completamente. Defina 3 a 5 traits com descrição e exemplo concreto.",
  traits: [
    { title: "Trait 1: Direto", desc: "A marca vai ao ponto. Frases curtas, sem enrolação. Respeita o tempo de quem lê. Esse trait define o ritmo da comunicação.", example: '"Escreva aqui um exemplo real de como esse trait soa na prática."' },
    { title: "Trait 2: Provocativo", desc: "A marca confronta sem pedir licença. Questiona o que todo mundo aceita e desafia as pessoas a pensarem diferente. Energia alta sem ser agressivo.", example: '"Escreva aqui um exemplo de provocação no tom da marca."' },
    { title: "Trait 3: Técnico", desc: "A marca demonstra competência com precisão. Usa dados reais, referências concretas e linguagem especializada quando o contexto pede.", example: '"Escreva aqui um exemplo de como a marca mostra autoridade técnica."' },
    { title: "Trait 4: Humano", desc: "A marca é gente falando com gente. Coloquial, empática, próxima. Esse trait evita que os outros três tornem a marca fria ou distante.", example: '"Escreva aqui um exemplo do lado humano da comunicação."' },
  ],
  insight: {
    title: "A tribo reconhece a marca pela voz antes de ver o logo.",
    body: "Traits consistentes criam reconhecimento imediato. As pessoas sabem que é você pelo jeito de falar, pela escolha de palavras, pelo ritmo. Traits incoerentes criam confusão e corroem confiança. Se a marca soa diferente em cada canal, as pessoas não sabem com quem estão falando.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 09. Jornada
// ---------------------------------------------------------------------------

export const JORNADA = {
  intro: "A Jornada do Herói mapeia a transformação que a marca proporciona em 6 atos. Cada ato precisa de uma citação real de alguém que viveu aquela fase. Sem prova real, a jornada é ficção de marketing.",
  acts: [
    { num: "I", title: "O Mundo Ordinário", desc: "Onde a pessoa está antes de encontrar a marca. A frustração, a estagnação, o loop em que ela vive. Quanto mais específico, mais a tribo se reconhece.", quote: '"Coloque aqui uma frase real de alguém que vivia nesse estágio."', author: "Nome real" },
    { num: "II", title: "O Chamado", desc: "Algo muda. A pessoa descobre que existe outro caminho. Pode ser um conteúdo, uma conversa, uma demonstração. É o primeiro contato com a marca.", quote: '"Coloque aqui a frase que captura o momento de descoberta."', author: "Nome real" },
    { num: "III", title: "A Descida", desc: "Primeiro contato real com a transformação. Medo, confusão, mas também fascinação. Muitos desistem aqui. A marca precisa sustentar quem fica.", quote: '"Coloque aqui uma frase de quem está no meio do processo."', author: "Nome real" },
    { num: "IV", title: "O Treinamento", desc: "A fase de construção. Erros, iterações, pequenas vitórias. A pessoa começa a sentir progresso real. A comunidade se torna essencial.", quote: '"Coloque aqui uma frase de quem está descobrindo do que é capaz."', author: "Nome real" },
    { num: "V", title: "A Transformação", desc: "O momento em que a pessoa se reconhece diferente. Passou de 'não consigo' para 'eu consigo'. Essa virada é a prova mais poderosa que a marca tem.", quote: '"Coloque aqui a frase de empoderamento mais forte que você tem."', author: "Nome real" },
    { num: "VI", title: "O Retorno", desc: "A pessoa completa o ciclo: mostra resultados, ajuda outros, espalha a ideia. O herói volta transformado e inspira novos heróis. O movimento se alimenta sozinho.", quote: '"Coloque aqui a frase de alguém que já está propagando."', author: "Nome real" },
  ],
  insight: {
    title: "A jornada é o ciclo de vida do movimento.",
    body: "Os 6 atos mapeiam o ciclo completo: chamar atenção (Atos I e II), construir confiança (Atos III e IV), converter (Ato V) e fazer a pessoa espalhar a ideia (Ato VI). As citações reais são o tipo mais poderoso de prova social que existe. E o Ato VI é o motor: quando o herói transformado inspira outros, o movimento cresce sem depender só da marca.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 10. Depoimentos
// ---------------------------------------------------------------------------

export const DEPOIMENTOS = {
  intro: "Proof Points são evidências verificáveis de que a transformação prometida realmente acontece. Organize em dois níveis: métricas de impacto (números duros) e depoimentos (narrativas reais). Ambos devem ser reais, atribuídos e contextualizados.",
  stats: [
    { number: "R$___", label: "Métrica de Valor", desc: "Nome, contexto e resultado concreto", accent: false },
    { number: "R$___", label: "Métrica de Resultado", desc: "Nome, contexto e resultado concreto", accent: true },
    { number: "___ dias", label: "Compressão Temporal", desc: "Nome, quanto levava antes vs agora", accent: false },
    { number: "R$___", label: "Economia Real", desc: "Nome, quanto economizou e em quê", accent: false },
  ],
  testimonialGroups: [
    {
      category: "Transformação Emocional",
      items: [
        { quote: "Coloque aqui um depoimento real que mostre a transformação emocional da pessoa. A mudança de identidade, não só de resultado.", author: "Nome Real" },
        { quote: "Busque frases que mostrem quem a pessoa se tornou, não apenas o que conquistou. Mudança de identidade é mais poderosa que mudança de número.", author: "Nome Real" },
      ],
    },
    {
      category: "Empoderamento",
      items: [
        { quote: "Depoimentos de empoderamento mostram a pessoa se sentindo capaz. Frases espontâneas valem mais que textos roteirizados.", author: "Nome Real" },
        { quote: "Screenshots de WhatsApp e mensagens brutas são mais críveis que depoimentos editados. Quanto mais cru, melhor.", author: "Nome Real" },
      ],
    },
    {
      category: "Resultado Mensurável",
      items: [
        { quote: "Depoimentos com números concretos: 'antes levava X, agora leva Y'. 'Fechei contrato de R$Z'. Dados ancoram a narrativa.", author: "Nome Real" },
        { quote: "Combine o número com contexto: quem é a pessoa, o que fazia antes, qual era a barreira. Número sem história é planilha.", author: "Nome Real" },
      ],
    },
  ],
  insight: {
    title: "Depoimentos são histórias de vivência, a prova mais poderosa que existe.",
    body: "Eles cumprem duas funções: provam que o sistema funciona e servem como histórias que a tribo conta para atrair novos membros. Organize por categoria emocional (transformação, empoderamento, resultado) para cobrir diferentes momentos da jornada. Use esses dados para calibrar o que está funcionando e ajustar o que vem pela frente.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 12. Contrato
// ---------------------------------------------------------------------------

export const CONTRATO = {
  intro: "O Contrato da Marca é bilateral: o que a marca promete e o que a marca exige. Marcas que só prometem sem exigir criam dependência. Marcas que exigem e entregam criam respeito, lealdade e identidade de grupo.",
  promises: [
    { bold: "Promessa 1:", text: "O que a marca se compromete a entregar. Seja específico: qual transformação, em qual prazo, com qual evidência." },
    { bold: "Promessa 2:", text: "Promessas vagas ('a melhor experiência') não criam confiança. Promessas verificáveis ('resultados documentados') criam contrato real." },
    { bold: "Promessa 3:", text: "Cada promessa precisa ser rastreável a um proof point. Se não tem prova, não prometa." },
    { bold: "Promessa 4:", text: "Menos promessas cumpridas vencem mais promessas quebradas. A confiança se constrói na entrega, não na expectativa." },
  ],
  demands: [
    { bold: "Exigência 1:", text: "O que a marca exige de quem entra. Boas marcas filtram na entrada. Isso protege a comunidade e eleva o nível." },
    { bold: "Exigência 2:", text: "Exigências criam pertencimento. Quem passa pelo filtro se sente parte de algo exclusivo." },
    { bold: "Exigência 3:", text: "A marca deve exigir o que ela mesma pratica. Incoerência entre exigência e prática destrói tudo." },
    { bold: "Exigência 4:", text: "Exigências são valores em ação. Se a marca valoriza 'execução', exija execução como requisito de entrada." },
  ],
  oathLines: [
    "Escreva aqui a declaração-juramento da marca.",
    "A frase que a tribo repete como identidade.",
    "A frase que define quem pertence.",
    "Curta, memorável e emocionalmente carregada.",
    "Eu sou um [nome da tribo].",
  ],
  insight: {
    title: "O contrato é o rito de entrada.",
    body: "Quem aceita as promessas e as exigências se torna membro. A declaração-juramento cristaliza o pertencimento. É o ponto em que a pessoa deixa de ser público e passa a ser tribo. E o juramento que ela repete é o que faz o movimento crescer de boca em boca.",
  } satisfies InsightBlock,
}

// ---------------------------------------------------------------------------
// 13. Fundadores
// ---------------------------------------------------------------------------

export const FUNDADORES = {
  intro: "A seção de Fundadores documenta as pessoas por trás da marca. O líder é o coração do movimento: sua jornada, seus atributos e sua voz definem a face humana de tudo. Documente cada fundador com papel, estilo e contribuição única.",
  founder1: {
    initials: "F1",
    name: "FUNDADOR 1",
    role: "Papel / Título",
    desc: "Descreva o fundador pelo papel que exerce no movimento. Qual é a contribuição única dele? Qual energia traz? Documente tanto a identidade (quem é) quanto a expressão (como se comunica).",
  },
  founder2: {
    initials: "F2",
    name: "FUNDADOR 2",
    role: "Papel / Título",
    desc: "Se há co-fundador, descreva a complementaridade. Duplas fortes criam dinâmica: um atrai, outro entrega. Um sonha, outro constrói. A tensão entre os dois é a energia do movimento.",
  },
  dynamicDesc: "Descreva aqui como os fundadores se potencializam. Qual é a regra de divisão? Visão sem execução é fantasia. Execução sem visão é burocracia. A complementaridade dos líderes define a estabilidade do movimento inteiro.",
  dynamicFormula: "VISÃO + EXECUÇÃO = MOVIMENTO",
  insight: {
    title: "O líder é a face humana do movimento.",
    body: "Extraia a identidade autêntica do fundador: a jornada real, os atributos verdadeiros, o jeito de se expressar. Não fabrique uma persona. As pessoas percebem quando é forçado. A autenticidade do líder é o que gera confiança e faz a tribo querer seguir. Sem autenticidade, o movimento vira performance.",
  } satisfies InsightBlock,
}

export const VISUAL = {
  headings: {
    symbols: "Símbolos",
    palette: "Paleta de Cores",
    typography: "Tipografia",
  },
  symbols: STARTER_VISUAL_SYMBOLS,
  symbolFlow: STARTER_SYMBOL_FLOW,
  colorGroups: STARTER_VISUAL_COLOR_GROUPS,
  typography: {
    displayFamily: STARTER_TYPOGRAPHY.display.family,
    sansFamily: STARTER_TYPOGRAPHY.sans.family,
    monoFamily: STARTER_TYPOGRAPHY.mono.family,
    headline: STARTER_VISUAL_TYPOGRAPHY_EXAMPLES.headline,
    body: STARTER_VISUAL_TYPOGRAPHY_EXAMPLES.body,
    command: STARTER_VISUAL_TYPOGRAPHY_EXAMPLES.command,
  },
}

// ---------------------------------------------------------------------------
// Page-level content (ticker, footer)
// ---------------------------------------------------------------------------

export const PAGE_CONTENT = {
  sidebarGroups: [
    {
      label: "Fundamentos",
      items: [
        { id: "manifesto", label: "Manifesto", num: "01" },
        { id: "proposito", label: "Propósito", num: "02" },
        { id: "valores", label: "Valores", num: "02b" },
        { id: "arquetipo", label: "Arquétipo", num: "03" },
      ],
    },
    {
      label: "Estratégia",
      items: [
        { id: "posicionamento", label: "Posicionamento", num: "04" },
        { id: "contraste", label: "Contraste", num: "04b" },
        { id: "brandscript", label: "BrandScript", num: "05" },
        { id: "truelines", label: "Truelines", num: "06" },
      ],
    },
    {
      label: "Identidade Verbal",
      items: [
        { id: "naming", label: "Naming", num: "07" },
        { id: "vocabulario", label: "Vocabulário", num: "08" },
        { id: "voz", label: "Traits da Voz", num: "08b" },
      ],
    },
    {
      label: "Jornada & Prova",
      items: [
        { id: "jornada", label: "Jornada do Herói", num: "09" },
        { id: "depoimentos", label: "Depoimentos", num: "10" },
      ],
    },
    {
      label: "Identidade Visual",
      items: [{ id: "visual", label: "Marcas & Cores", num: "11" }],
    },
    {
      label: "Compromisso",
      items: [
        { id: "contrato", label: "Contrato da Marca", num: "12" },
        { id: "fundadores", label: "Os Fundadores", num: "13" },
      ],
    },
  ] satisfies SidebarGroup[],
  headerBanner: {
    navCenter: "BRANDBOOK ESTRATEGICO",
    eyebrow: "THE MASTER DOCUMENT.",
    footerLeft: "Section 00",
    footerCenter: "Identity System",
    footerRight: "2026",
  },
  tickerItems: [
    "MANIFESTO DEFINE A CRENÇA",
    "PROPÓSITO DEFINE A MISSÃO",
    "ARQUÉTIPO DEFINE A PERSONALIDADE",
    "POSICIONAMENTO DEFINE O TERRITÓRIO",
    "VOZ DEFINE COMO VOCÊ FALA",
  ],
  tickerSpeed: 20,
  footerTagline: "Marcas que sabem quem são, constroem movimentos.",
  headerSubtitle: "O DOCUMENTO ESTRATÉGICO QUE DEFINE QUEM A MARCA É, O QUE DEFENDE E COMO SE EXPRESSA.",
}
