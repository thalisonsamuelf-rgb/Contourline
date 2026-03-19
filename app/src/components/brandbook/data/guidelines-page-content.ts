export const GUIDELINES_PAGE_CONTENT = {
  headerBanner: {
    navLeft: "AIOX SQUAD",
    navCenter: "BRAND GUIDELINES",
    navRightPrefix: "V2.0 //",
    eyebrow: "THE MASTER DOCUMENT.",
    description:
      "ORQUESTRANDO IA COM ESTRUTURA, METODOLOGIA E CLAREZA. DESENHADO PARA O FUTURO DA CRIACAO.",
    footer: {
      left: "Section 01",
      center: "Identity System",
      right: "2026",
    },
  },
  tickerRow: {
    items: [
      "AIOX",
      "Brand Identity System",
      "v2.0",
      "Design Tokens",
      "Pattern Library",
      "Motion System",
    ],
    speed: 25,
  },
  typographyPanel: {
    header: { label: "TYPOGRAPHY", concept: "Type System", num: "02" },
    intro: {
      lead: "Hello, I'm",
      highlight: "Geist",
      description:
        "The primary typeface for AIOX. A workhorse crafted for a wide range of applications, from terminal interfaces to massive billboard statements.",
    },
    titleLines: ["Geist", "Typeface"],
    characterSetLines: [
      "abcdefghijklmnopqrstuvwxyz",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "0123456789!@#$%^&*()_+",
    ],
    metaLines: ["Display: TASA Orbiter 800", "Mono: Roboto Mono 500"],
    weightLabels: [
      { label: "THIN", highlight: true },
      { label: "REG", highlight: false },
      { label: "BOLD", highlight: false },
      { label: "BLACK", highlight: false },
    ],
    specimen: {
      weightLabel: "WEIGHT: 300 // THIN",
      glyph: "Aa",
      pangram: "The quick brown fox jumps over the lazy dog.",
      characterLines: [
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "abcdefghijklmnopqrstuvwxyz",
        "0123456789 !@#$%&*()",
      ],
      note: "A IA e a seta. O X e seu. Terminal real para leigos. De 3 meses para 3 dias.",
    },
    footer: {
      left: "Brand Guidelines",
      center: "Typography System",
      right: "01",
    },
  },
  colorPalettePanel: {
    header: { label: "COLOR PALETTE", concept: "Core Identity", num: "03" },
    fixedColors: [
      {
        name: "VOID DARK",
        hex: "var(--bb-dark)",
        bg: "var(--bb-dark)",
        textColor: "var(--bb-cream)",
        rgb: "Theme dark",
        cmyk: "Theme token",
      },
      {
        name: "SURFACE",
        hex: "var(--bb-surface)",
        bg: "var(--bb-surface)",
        textColor: "var(--bb-cream)",
        rgb: "Theme surface",
        cmyk: "Theme token",
      },
      {
        name: "WARM WHITE",
        hex: "var(--bb-warm-white)",
        bg: "var(--bb-warm-white)",
        textColor: "var(--bb-dark)",
        rgb: "Theme white",
        cmyk: "Theme token",
      },
    ],
    footer: {
      left: "Color Space",
      center: "Restricted Palette",
      right: "02",
    },
  },
  logoConstructionPanel: {
    header: { label: "LOGO CONSTRUCTION", concept: "Logo Metrics", num: "04" },
    safeSpaceLabel: "Safe Space (x)",
    footer: {
      left: "Brand Hierarchy",
      center: "Construction Grid",
      right: "03",
    },
  },
  manifestoPanel: {
    header: { label: "THE MANIFESTO", concept: "Core Belief", num: "05" },
    quoteLines: [
      "EU NÃO PRECISO SER PROGRAMADOR PARA CRIAR.",
      "A IA É A SETA. O X É MEU.",
    ],
    bodyParagraphs: [
      "Nós acreditamos que a IA não é o herói. Você é. A IA não é o destino. É o caminho.",
      "Enquanto o mercado vende promessas de facilidade que entregam frustração, nós te entregamos uma coisa diferente: A VERDADE. O terminal não é o fim. É o começo. A complexidade não te define. Sua visão te define.",
    ],
    footer: {
      left: "Core Belief",
      center: "Manifesto",
      right: "04",
    },
  },
  symbolsPanel: {
    header: { label: "SYMBOLS & MEANING", concept: "Glyphs", num: "06" },
    symbols: [
      {
        key: "triangle",
        title: "TRIANGULO / DELTA",
        description:
          "O delta da transformacao. Representacao visual da jornada de um ponto a outro.",
      },
      {
        key: "joystick",
        title: "JOYSTICK",
        description:
          "Você está no controle absoluto. O criador comanda sua ferramenta.",
      },
    ],
    footer: {
      left: "Symbol Library",
      center: "Visual Language",
      right: "05",
    },
  },
  namingFlowPanel: {
    header: { label: "NAMING & CONCEPT FLOW", concept: "Semantics", num: "07" },
    items: [
      {
        letter: "A",
        color: "var(--bb-cream)",
        borderColor: "var(--bb-cream)",
        title: "A SETA",
        description:
          "Ponto de partida. O motor direcional de IA agindo como meio propulsor.",
      },
      {
        letter: "I",
        color: "var(--bb-dim)",
        borderColor: "var(--bb-border)",
        title: "INPUT",
        description:
          "As Histórias do usuário gerando o comando inicial para o AIOX Squad.",
      },
      {
        letter: "O",
        color: "var(--bb-dim)",
        borderColor: "var(--bb-border)",
        title: "ORQUESTRAÇÃO",
        description:
          "Fluidez da operação inter-agentes e pipelines (Quality Gates) girando.",
      },
      {
        letter: "X",
        color: "var(--bb-accent)",
        borderColor: "var(--bb-accent)",
        title: "O DESTINO",
        description:
          "\"X Marks the Spot\". O local cravado no mapa final onde você definiu chegar.",
      },
    ],
    footer: {
      left: "Concept Architecture",
      center: "Semantic Flow",
      right: "06",
    },
  },
  positioningPanel: {
    header: { label: "POSITIONING", concept: "Strategy", num: "08" },
    cards: [
      {
        label: "THE ENEMY",
        title: "A COMPLEXIDADE",
        description:
          "Ferramentas que prometem facilidade e entregam travamentos. A fricção tecnológica que roubou o poder de realização.",
        variant: "default",
      },
      {
        label: "TARGET AUDIENCE",
        title: "OS CRIADORES",
        description:
          "Pessoas não-técnicas (ou devs frustrados) que têm visão e ideias geniais mas bateram no teto do No-Code genérico.",
        variant: "accent",
      },
      {
        label: "CATEGORY",
        title: "AI ORCHESTRATION EXPERIENCE.",
        description:
          "Acesso direto a IA raiz empacotada com metodologia pesada de Engenharia de Software.",
        variant: "surface",
      },
    ],
    footer: {
      left: "Brand Position",
      center: "Market Strategy",
      right: "07",
    },
  },
  archetypesPanel: {
    header: { label: "ARCHETYPES", concept: "DNA", num: "09" },
    items: [
      {
        label: "MAGICIAN",
        pct: 60,
        color: "var(--bb-accent)",
        description:
          "A essencia transformacional. Revela que o poder de criar sempre esteve ali.",
      },
      {
        label: "SAGE",
        pct: 25,
        color: "var(--bb-cream)",
        description:
          "A sabedoria reveladora. Clareza na escuridao. O metodo codificado e destilado.",
      },
      {
        label: "EXPLORER",
        pct: 15,
        color: "var(--bb-dim)",
        description:
          "O convite a toca do coelho. Autonomia com o mapa certo nas maos.",
      },
    ],
    closingLine:
      "Transformador fundamentado. Revelador não místico. Aventureiro com mapa.",
    footer: {
      left: "Brand Archetypes",
      center: "Personality Core",
      right: "08",
    },
  },
  evidencePanel: {
    header: {
      label: "EVIDENCE & COMPRESSION OF TIME",
      concept: "Proof",
      num: "10",
    },
    stats: [
      {
        value: "R$500K",
        label: "/ANO",
        description: "Criação de Valor Real",
        source: "Joao Pedro -- Anima Educação",
        accent: false,
      },
      {
        value: "6 DIAS",
        label: "TEMPO MVP",
        description: "Normalmente 3 meses",
        source: "Paulo Chaves",
        accent: true,
      },
      {
        value: "R$8K",
        label: "/CLIENTE",
        description: "Sem saber programar",
        source: "Karla Pazos",
        accent: false,
      },
      {
        value: "R$100K",
        label: "ECONOMIA",
        description: "Integração in-house",
        source: "@leoh4236",
        accent: false,
      },
    ],
    footer: {
      left: "Validated Results",
      center: "Real Evidence",
      right: "09",
    },
  },
  narrativePanel: {
    header: { label: "THE NARRATIVE", concept: "Hero's Journey", num: "11" },
    steps: [
      {
        num: "I",
        title: "O SONO",
        description:
          "O Herói (Você) dorme na Matrix das ferramentas visuais e bloqueios mentais.",
      },
      {
        num: "II",
        title: "O CHAMADO",
        description:
          "A Pílula Vermelha é oferecida: o terminal e a metodologia AIOX.",
      },
      {
        num: "III",
        title: "A TOCA DO COELHO",
        description:
          "Aprendizado profundo, flow state, e resultados reais em dias não meses.",
      },
      {
        num: "IV",
        title: "O DESPERTAR",
        description:
          "\"Neo\" acorda. Transforma-se de espectador em criador poderoso.",
      },
    ],
    footer: {
      left: "Story Arc",
      center: "Transformation",
      right: "10",
    },
  },
  voicesPanel: {
    header: { label: "VOICES", concept: "Testimonials", num: "12" },
    testimonials: [
      {
        quote:
          "\"Há dois anos me levava 3 meses. Há seis meses, 3 semanas. Há dois dias, 3 horas.\"",
        author: "-- Rodrigo Faerman",
      },
      {
        quote:
          "\"Pegou minha mentalidade, jogou no lixo e colocou uma semente nova.\"",
        author: "-- Lucas D.",
      },
      {
        quote:
          "\"A sensação que dá é que parece que estamos aprendendo o mapa do tesouro.\"",
        author: "-- Joao da Passeios",
      },
      {
        quote: "\"Estou me sentindo PODEROSAAAA DEMAAAAAIS!\"",
        author: "-- Betty Bonaparte",
      },
      {
        quote:
          "\"Meu sonho era ser programador. Agora é um sonho que se realiza com 47 anos.\"",
        author: "-- Claudio",
      },
    ],
    footer: {
      left: "Real Voices",
      center: "Social Proof",
      right: "11",
    },
  },
  personalityPanel: {
    header: { label: "PERSONALITY", concept: "Traits", num: "13" },
    intro: {
      lead: "Se o AIOX fosse uma pessoa, seria",
      highlight: "Morpheus",
      description:
        "digital, profundo, direto, que não faz por você, mas revela o caminho.",
    },
    traits: [
      {
        trait: "REVELADOR",
        description:
          "Mostra o que estava escondido. Traz clareza na escuridão.",
        variant: "dark-accent",
      },
      {
        trait: "EMPODERADOR",
        description: "Dá as ferramentas, não faz por você.",
        variant: "surface",
      },
      {
        trait: "PROFUNDO",
        description:
          "Vai além da superfície. Princípios fundacionais.",
        variant: "surface",
      },
      {
        trait: "AUTENTICO",
        description: "Sem hype vazio. Resultados reais.",
        variant: "dark",
      },
    ],
    vocabulary: {
      title: "BRAND VOCABULARY",
      filled: ["O X", "A Seta", "O Terminal", "A Clareza"],
      normal: ["Transformador", "Revelador", "Direto", "Jornada"],
      bannedTitle: "BAN LIST (Never Use)",
      banned: ["Mágico", "Revolucionário", "Fácil", "Hack"],
    },
    footer: {
      left: "Personality",
      center: "Vocabulary",
      right: "12",
    },
  },
  dualVoicePanel: {
    header: { label: "DUAL VOICE", concept: "Voices", num: "14" },
    brandVoice: {
      title: "AIOX",
      subtitle: "O MORPHEUS DIGITAL",
      tags: ["Frio & Implacável", "Minimalista", "Sábio"],
      bullets: [
        "Não tenta convencer, fornece o ferramental.",
        "Design brutalista, cores sóbrias com toques neon.",
        "Tom direto, objetivo, institucional premium.",
      ],
    },
    founderVoice: {
      title: "ALAN",
      subtitle: "O MORPHEUS HUMANO",
      tags: ["Quente & Passional", "Expansivo", "Provocador"],
      bullets: [
        "Vende a visao. Destroi o mindset velho.",
        "Expressivo nas redes sociais, energia alta.",
        "Chama para a briga contra a \"Matrix\".",
      ],
    },
    footer: {
      left: "Voice Strategy",
      center: "Brand vs Founder",
      right: "13",
    },
  },
} as const
