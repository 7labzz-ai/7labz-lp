import { type Copy } from './en'

/** Every visible string on the home page, in Portuguese (Portugal). Same shape as en.ts. */
export const pt: Copy = {
  lang: 'pt',
  htmlLang: 'pt-PT',
  ogLocale: 'pt_PT',
  path: '/',

  meta: {
    title: '7labz | Estúdio boutique de growth engineers',
    slogan: 'Estúdio boutique de growth engineers',
    description:
      'Construímos os sistemas que tornam um negócio mais rápido: CRM, automações, ferramentas internas, sites e produtos de IA. A funcionar em semanas, feitos por uma equipa pequena de growth engineers, com um braço de investimento, a 7labz Ventures, que apoia poucos fundadores por ano.',
    ventures:
      'O braço de investimento da 7labz: em vez de faturar, fica com uma participação em poucos fundadores por ano e constrói com eles.',
    catalog: 'Serviços',
    // The share image still has the English headline until a Portuguese one is made.
    shareAlt:
      'O logótipo da 7labz e um cavalo a galope desenhado em glifos, sobre fundo branco pontilhado, por cima do título "Boutique studio of growth engineers"',
  },

  cta: 'Fala connosco',

  switcher: {
    group: 'Idioma',
    label: 'EN',
    labelLang: 'en',
    aria: 'Ver o site em inglês',
  },

  nav: {
    links: [
      { href: '#services', label: 'Serviços' },
      { href: '#apply', label: 'Ventures' },
      { href: '#manifesto', label: 'Manifesto' },
    ],
    main: 'Principal',
    home: 'Página inicial da 7labz',
    menu: 'Menu',
    close: 'Fechar',
    footer: 'Rodapé',
  },

  hero: {
    // No-break space, so a narrow phone never leaves "de" alone on its line.
    line1: 'Estúdio boutique\u00a0de',
    line2: 'growth engineers',
    lede: 'Construímos os sistemas que tornam um negócio mais rápido: CRM, automações, ferramentas internas, produtos de IA. A funcionar em semanas e, quando é o projeto certo, com o apoio da 7labz Ventures',
  },

  model: {
    eyebrow: 'O modelo',
    // No-break spaces keep the short words together, so phones don't strand "fases,".
    line1: 'Uma equipa, quatro\u00a0fases,',
    line2: 'poucos negócios de\u00a0cada\u00a0vez',
    stages: [
      {
        id: 'map',
        title: 'Mapear',
        body: 'Um período curto dentro do teu negócio para encontrar onde se perdem as horas e o dinheiro',
      },
      {
        id: 'build',
        title: 'Construir',
        body: 'CRM, automações, ferramentas internas, produtos de IA. Feito por quem mapeou, sem passar de mão em mão',
      },
      {
        id: 'ship',
        title: 'Lançar',
        body: 'A funcionar em semanas, não em trimestres. Ficamos até a tua equipa o usar sem nós',
      },
      {
        id: 'back',
        title: 'Apoiar',
        body: 'Quando um fundador está a construir algo em que não deixamos de pensar, ficamos com uma participação através da 7labz Ventures',
      },
    ],
    quarter: 'T4 2026',
    slots: (taken: number, total: number) => `${taken} de ${total} lugares ocupados`,
  },

  timeBack: {
    eyebrow: 'Tempo de volta',
    line1: 'Recupera as tuas',
    line2: 'noites',
    lede: 'Quando entramos numa empresa, a primeira coisa que encontramos são as horas perdidas em papelada, a correr atrás de contactos e a fazer relatórios. Cada hora que um sistema tira à tua equipa é uma hora de volta para o trabalho e para quem espera em casa',
    railTitle: 'Uma semana, mapeada',
    railNote: 'Semana de exemplo',
    chartTitle: 'Para onde vai a semana do dono',
    chartLede:
      'Horas por semana em trabalho que um sistema podia fazer. Desce para ver esse trabalho passar da tua equipa para sistemas',
    today: 'A tua semana hoje',
    with: 'Com sistemas 7labz',
    tasks: [
      { label: 'Papelada e registos', fix: 'Sincronizado pelo CRM' },
      { label: 'Correr atrás de contactos', fix: 'Follow-ups automáticos' },
      { label: 'Responder às mesmas perguntas', fix: 'Um assistente de IA responde' },
      { label: 'Orçamentos e faturação', fix: 'Gerados a partir do serviço' },
      { label: 'Tirar números e relatórios', fix: 'Painel em tempo real' },
    ],
    total1: 'horas de volta por semana,',
    total2: 'passadas de pessoas para sistemas',
    timelineTitle: 'E em quanto tempo as recuperas',
  },

  process: [
    { when: 'Dia 1', what: 'Uma conversa. Mostras-nos uma semana normal' },
    { when: 'Semana 1', what: 'Vemos para onde vão as tuas horas e o que resolver primeiro' },
    { when: 'Semana 2', what: 'O primeiro sistema está a funcionar e a tua equipa já o usa' },
    { when: 'Semana 4', what: 'Funciona sem ti. As horas voltam a ser tuas' },
  ],

  services: {
    eyebrow: 'Serviços',
    title: 'O que construímos',
    list: [
      {
        id: 'crm',
        title: 'CRM e funil de vendas',
        body: 'Cada contacto num só sítio, do primeiro telefonema à fatura',
        items: [
          'Funil de vendas',
          'Contactos do telefone, email e formulários',
          'Follow-ups',
          'Relatórios',
        ],
      },
      {
        id: 'automations',
        title: 'Automações',
        body: 'O trabalho que se faz sozinho depois de configurado',
        items: [
          'Orçamentos e faturação',
          'Lembretes e marcações',
          'Ligação entre ferramentas',
          'Alertas',
        ],
      },
      {
        id: 'tools',
        title: 'Ferramentas internas',
        body: 'Os ecrãs onde a tua equipa trabalha de facto',
        items: ['Painéis', 'Painéis de gestão', 'Controlo de stock e serviços', 'Aprovações'],
      },
      {
        id: 'websites',
        title: 'Sites e landing pages',
        body: 'Sites que trazem trabalho em vez de estarem parados',
        items: ['Sites de marketing', 'Landing pages', 'Marcações e formulários', 'Medição'],
      },
      {
        id: 'ai',
        title: 'Produtos de IA',
        body: 'Lançamos funcionalidades e produtos de IA, para startups e para empresas',
        items: [
          'Assistentes e agentes',
          'Leitura de documentos',
          'Pesquisa nos teus dados',
          'Construção de produto',
        ],
      },
      {
        id: 'growth',
        title: 'Crescimento',
        body: 'Trazer as pessoas certas até à porta e saber de onde vieram',
        items: ['Anúncios e medição', 'Métricas', 'Email e fidelização', 'Testes de conversão'],
      },
    ],
  },

  strip: ['Lançar esta semana', 'Dizer sem rodeios', 'Jantar em casa'],

  manifesto: {
    title: 'Manifesto',
    paragraphs: [
      'A maioria dos estúdios vende horas. Nós preferimos vender rapidez. A 7labz é uma equipa pequena de growth engineers: encontramos a parte do negócio que é lenta, construímos o que a resolve e ficamos o tempo suficiente para ver as horas voltar',
      'Não entregamos uma apresentação e vamos embora. Entramos na empresa, sentamo-nos com quem a gere e refazemos a forma como o trabalho corre de facto: os funis de venda, as ferramentas e os sistemas por baixo. Reestruturar por dentro, não aconselhar de fora. Algumas das empresas onde entramos cresceram para lá da forma como funcionam, outras são startups de IA que precisam de um produto lançado. Problemas diferentes, a mesma equipa',
      'Somos boutique de propósito. Poucos negócios de cada vez, para cada um trabalhar com quem faz o trabalho, e não com alguém a passar recados. Quando estamos cheios, estamos cheios. Por isso, tudo começa por uma conversa',
      'Temos opiniões e não vamos fingir o contrário. Se alguma coisa não vai resultar, ouves isso antes de ser lançada, não depois de ficar cara. Mostra-nos que estamos errados e mudamos de ideias com a mesma rapidez',
      'E de vez em quando um fundador está a construir algo em que não deixamos de pensar. É para isso que existe a 7labz Ventures. Em vez de faturar, ficamos com uma participação: pomos a equipa, o tempo e, quando faz sentido, o capital, e construímos contigo como se fosse nosso. Em parte, é',
      'Constrói connosco, ou deixa-nos construir ao teu lado. Seja como for, a exigência é a mesma',
    ],
    signature: (name: string) => `Assinatura de ${name}`,
  },

  founders: [
    { name: 'Mário', role: 'Cofundador, Gestão' },
    { name: 'Miguel', role: 'Cofundador, Crescimento' },
  ],

  faq: {
    eyebrow: 'Perguntas frequentes',
    title: 'Antes de falarmos',
    list: [
      {
        question: 'O que constrói a 7labz',
        answer:
          'Os sistemas que tornam um negócio mais rápido: CRM e funis de venda, automações, ferramentas internas, sites e landing pages, produtos de IA, e o trabalho de crescimento à volta, como anúncios, medição e email. Tudo feito por uma equipa pequena de growth engineers',
      },
      {
        question: 'Para quem é a 7labz',
        answer:
          'Empresas que cresceram para lá da forma como funcionam e startups de IA que precisam de um produto lançado. Entramos na equipa e reestruturamos o trabalho por dentro: os processos, as ferramentas e os sistemas por baixo. Problemas diferentes, a mesma equipa',
      },
      {
        question: 'Em quanto tempo fica a funcionar',
        answer:
          'Em semanas, não em trimestres. No dia 1 há uma conversa em que nos mostras uma semana normal. Na semana 1 vemos para onde vão as tuas horas e escolhemos o que resolver primeiro. Na semana 2 o primeiro sistema já está a funcionar e a tua equipa usa-o, e na semana 4 funciona sem ti',
      },
      {
        question: 'Preciso de uma equipa técnica',
        answer:
          'Não. As mesmas pessoas mapeiam o problema, constroem o que o resolve e põem-no a funcionar, por isso nada passa de mão em mão. Ficamos até a tua equipa o usar sem nós',
      },
      {
        question: 'O que acontece depois da entrega',
        answer:
          'O sistema continua a funcionar sem nós e as horas voltam a ser tuas. Não saímos no lançamento: ficamos até a tua equipa o usar sozinha e o tempo ter mesmo voltado',
      },
      {
        question: 'Como começamos a trabalhar juntos',
        answer:
          'Começa por uma conversa. Trabalhamos com poucos negócios de cada vez, para cada um trabalhar com quem faz o trabalho, e quando estamos cheios, estamos cheios. Escreve-nos pelo formulário desta página. Não precisas de apresentação, respostas curtas chegam',
      },
      {
        question: 'O que é a 7labz Ventures',
        answer:
          'O braço de investimento da 7labz. Algumas vezes por ano, um fundador está a construir algo em que não deixamos de pensar e, em vez de faturar, ficamos com uma participação: pomos a equipa, o tempo e, quando faz sentido, o capital. De pre-seed a seed, com as mãos na massa e não só a aconselhar',
      },
      {
        question: 'Qual a diferença entre a Ventures e pagar à 7labz',
        answer:
          'Um cliente paga pelo trabalho. Na Ventures não há fatura: ficamos com uma participação em vez de honorários e construímos contigo como se fosse nosso. É para poucos fundadores por ano, e falas connosco pelo mesmo formulário',
      },
    ],
  },

  ventures: {
    eyebrow: '7labz Ventures',
    title: 'Há fundadores que apoiamos em vez de faturar',
    lede: 'Algumas vezes por ano, um fundador está a construir algo em que não deixamos de pensar. Em vez de faturar, ficamos com uma participação: pomos a equipa, o tempo e, quando faz sentido, o capital, e construímos contigo como se fosse nosso',
    terms: [
      'De pre-seed a seed',
      'Participação, não faturas',
      'Mãos na massa, não conselhos',
      'Poucos por ano',
    ],
  },

  form: {
    title: 'Fala connosco',
    lede: 'Diz-nos quem és e o que precisas. Respondemos por email',
    type: 'És',
    types: {
      business: 'Um negócio',
      startup: 'Uma startup',
      founder: 'Um fundador (Ventures)',
    },
    name: 'O teu nome',
    email: 'Email',
    emailPlaceholder: 'nome@empresa.pt',
    company: {
      business: 'Nome do negócio',
      startup: 'Nome da startup',
      founder: 'Nome da empresa',
    },
    website: 'Site, se tiveres',
    phone: 'Telemóvel, se preferires que liguemos',
    need: {
      business: 'Onde estás a perder mais horas',
      startup: 'O que precisas de lançar',
    },
    needPlaceholder: {
      business: 'Ex.: orçamentos numa folha de cálculo, contactos espalhados pelo email',
      startup: 'Ex.: um assistente de IA para o nosso produto',
    },
    stage: 'Fase',
    stages: ['Ideia', 'Em construção', 'No ar, sem receita', 'No ar, com receita'],
    team: 'Tamanho da equipa',
    teams: ['Só eu', '2–5', '6–20', '21–50', '50+'],
    building: 'O que estás a construir',
    ask: 'O que precisas de nós',
    send: 'Enviar',
    sending: 'A enviar',
    note: 'Sem apresentações. Respostas curtas chegam',
    privacy: 'Usamos estes dados só para te responder.',
    privacyLink: 'Política de privacidade',
    sent: 'Recebido. Lemos tudo e respondemos por email',
    // The contact email follows, as a link.
    error: 'Não foi possível enviar. Tenta outra vez ou escreve-nos para',
    requiredNote: '* Obrigatório',
    pickOne: 'Escolhe uma opção',
    required: 'Preenche este campo',
    invalidEmail: 'Escreve um email válido',
  },

  notFound: {
    title: 'Esta página não existe',
    body: 'O link pode estar desatualizado ou ter um erro',
    back: 'Voltar à página inicial',
  },

  footer: {
    rights: 'Todos os direitos reservados',
    privacy: 'Privacidade',
    terms: 'Termos',
  },
}
