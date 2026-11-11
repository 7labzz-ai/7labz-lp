import { type Mark } from '@/lib/glyphMarks'

/**
 * Every visible string on the home page, in English. pt.ts mirrors this shape; the page,
 * metadata, structured data and llms.txt all read from here.
 */

export type Service = { id: Mark; title: string; body: string; items: string[] }
export type Stage = { id: Mark; title: string; body: string }
export type FaqItem = { question: string; answer: string }
export type ContactType = 'business' | 'startup' | 'founder'

export const en = {
  lang: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  path: '/en',

  meta: {
    title: '7labz | Boutique studio of growth engineers',
    slogan: 'Boutique studio of growth engineers',
    description:
      'We build the systems that make a business faster: CRMs, automations, internal tools, websites and AI products. Live in weeks, built by a small team of growth engineers, with a venture arm, 7labz Ventures, that backs a few founders a year.',
    ventures:
      'The venture arm of 7labz: instead of an invoice, it takes a stake in a few founders a year and builds with them.',
    catalog: 'Services',
    shareAlt:
      'The 7labz logo and a dithered, glyph-drawn galloping horse on a dotted white background, above the headline "Boutique studio of growth engineers"',
  },

  cta: 'Talk to us',

  switcher: {
    group: 'Language',
    // The link goes to the other language, so its label and name are in that language.
    label: 'PT',
    labelLang: 'pt-PT',
    aria: 'View the site in Portuguese',
  },

  nav: {
    links: [
      { href: '#services', label: 'Services' },
      { href: '#apply', label: 'Ventures' },
      { href: '#manifesto', label: 'Manifesto' },
    ],
    main: 'Main',
    home: '7labz home',
    menu: 'Menu',
    close: 'Close',
    footer: 'Footer',
  },

  hero: {
    line1: 'Boutique studio of',
    line2: 'growth engineers',
    lede: 'We build the systems that make a business faster: CRMs, automations, internal tools, AI products. Live in weeks, and backed through 7labz Ventures when it is the right one',
  },

  model: {
    eyebrow: 'The model',
    line1: 'One team, four stages,',
    line2: 'a few businesses at a time',
    // Draft copy and slot numbers: placeholders until they're real.
    stages: [
      {
        id: 'map',
        title: 'Map',
        body: 'A short run inside your business to find where the hours and the money leak',
      },
      {
        id: 'build',
        title: 'Build',
        body: 'CRMs, automations, internal tools, AI products. Built by the people who mapped it, not handed down a chain',
      },
      {
        id: 'ship',
        title: 'Ship',
        body: 'Live in weeks, not quarters. We stay until your team runs it without us',
      },
      {
        id: 'back',
        title: 'Back',
        body: 'When a founder is building something we can’t stop thinking about, we take a stake through 7labz Ventures',
      },
    ] as Stage[],
    quarter: 'Q4 2026',
    slots: (taken: number, total: number) => `${taken} of ${total} slots taken`,
  },

  timeBack: {
    eyebrow: 'Time back',
    line1: 'Get your evenings',
    line2: 'back',
    lede: 'When we embed with a company, the first thing we find is the hours lost to admin, chasing and reporting. Every hour a system takes off your team is an hour back for the work, and for the people waiting at home',
    railTitle: 'A week, mapped',
    railNote: 'Illustrative week',
    chartTitle: 'Where a founder’s week goes',
    chartLede:
      'Hours a week spent on work a system could do. Keep scrolling to watch that work move off your team and into systems',
    today: 'Your week today',
    with: 'With 7labz systems',
    // Same order and hours as the chart's WEEK; only the words change per language.
    tasks: [
      { label: 'Admin and data entry', fix: 'Synced by the CRM' },
      { label: 'Chasing leads and follow-ups', fix: 'Automatic follow-ups' },
      { label: 'Answering the same questions', fix: 'An AI assistant answers' },
      { label: 'Quotes and invoicing', fix: 'Generated from the job' },
      { label: 'Pulling numbers and reports', fix: 'A live dashboard' },
    ],
    total1: 'hours back every week,',
    total2: 'moved from people to systems',
    timelineTitle: 'And how fast you get them back',
  },

  /** How an engagement runs, in the order the site tells it. */
  process: [
    { when: 'Day 1', what: 'A call. You walk us through a normal week' },
    { when: 'Week 1', what: 'We map where your hours go and pick what to fix first' },
    { when: 'Week 2', what: 'The first system is live and your team is using it' },
    { when: 'Week 4', what: 'It runs without you. The hours are yours again' },
  ],

  services: {
    eyebrow: 'Services',
    title: 'What we build',
    // Draft copy: service names and lines are placeholders until the team signs them off.
    list: [
      {
        id: 'crm',
        title: 'CRM & pipelines',
        body: 'Every lead in one place, from the first call to the invoice',
        items: [
          'Pipeline setup',
          'Lead capture from phone, email and forms',
          'Follow-ups',
          'Reporting',
        ],
      },
      {
        id: 'automations',
        title: 'Automations',
        body: 'The work that happens on its own once it is set up',
        items: [
          'Quotes and invoicing',
          'Reminders and scheduling',
          'Syncing between tools',
          'Alerts',
        ],
      },
      {
        id: 'tools',
        title: 'Internal tools',
        body: 'The screens your team actually works in',
        items: ['Dashboards', 'Admin panels', 'Stock and job tracking', 'Approvals'],
      },
      {
        id: 'websites',
        title: 'Websites & landing pages',
        body: 'Sites that bring work in instead of sitting there',
        items: ['Marketing sites', 'Landing pages', 'Booking and forms', 'Tracking'],
      },
      {
        id: 'ai',
        title: 'AI products',
        body: 'Shipping AI features and products, for startups and for businesses',
        items: [
          'Assistants and agents',
          'Document processing',
          'Search over your data',
          'Product build-out',
        ],
      },
      {
        id: 'growth',
        title: 'Growth',
        body: 'Getting the right people to the door, and knowing where they came from',
        items: ['Ads and tracking', 'Analytics', 'Email and lifecycle', 'Conversion testing'],
      },
    ] as Service[],
  },

  // Draft copy: the culture lines are placeholders until the team signs them off.
  strip: ['Ship it this week', 'Say it straight', 'Home for dinner'],

  manifesto: {
    title: 'Manifesto',
    // Draft copy: no claims about clients, numbers or history until they're real.
    paragraphs: [
      'Most studios sell hours. We would rather sell speed. 7labz is a small team of growth engineers: we find the part of a business that is slow, we build the thing that fixes it, and we stay long enough to see the hours come back',
      'We do not hand over a deck and leave. We embed inside the company, sit with the people who run it and rebuild how the work actually flows: the pipelines, the tools and the systems underneath. Restructuring from within, not advising from outside. Some of the companies we embed with have outgrown the way they run, some are AI startups that need a product shipped. Different problems, same team',
      'We keep it boutique on purpose. A handful of businesses at a time, so every one of them works with the people doing the work, not someone relaying messages. When we are full, we are full. That is why you apply instead of book',
      'We are opinionated, and we will not pretend otherwise. If something is not going to work, you will hear it before it ships, not after it gets expensive. Prove us wrong and we change our minds just as fast',
      'And every so often a founder is building something we cannot stop thinking about. That is what 7labz Ventures is for. Instead of an invoice, we take a stake: we put in the team, the time and, when it makes sense, the capital, and we build it with you like it is ours. Partly, it is',
      'Build with us, or let us build alongside you. Either way, the bar is the same',
    ],
    signature: (name: string) => `${name}'s signature`,
  },

  /** The co-founders, as named on the site. Same order as the signatures. */
  founders: [
    { name: 'Mário', role: 'Co-founder, Management' },
    { name: 'Miguel', role: 'Co-founder, Growth' },
  ],

  faq: {
    eyebrow: 'FAQ',
    title: 'Before you apply',
    // Draft copy: answers only restate what the rest of the page says, until the team signs them off.
    list: [
      {
        question: 'What does 7labz build',
        answer:
          'The systems that make a business faster: CRMs and pipelines, automations, internal tools, websites and landing pages, AI products, and the growth work around them, like ads, tracking and email. All of it built by a small team of growth engineers',
      },
      {
        question: 'Who is 7labz for',
        answer:
          'Companies that have outgrown the way they run, and AI startups that need a product shipped. We embed with the team and restructure the work from within: the processes, the tools and the systems underneath. Different problems, same team',
      },
      {
        question: 'How fast does something go live',
        answer:
          'In weeks, not quarters. Day 1 is a call where you walk us through a normal week. In week 1 we map where your hours go and pick what to fix first. By week 2 the first system is live and your team is using it, and by week 4 it runs without you',
      },
      {
        question: 'Do I need a technical team',
        answer:
          'No. The same people map the problem, build the fix and ship it, so nothing gets handed down a chain. We stay until your team runs it without us',
      },
      {
        question: 'What happens after handover',
        answer:
          'The system keeps running without us and the hours are yours again. We do not leave at launch: we stay until your team runs it on its own and the time has actually come back',
      },
      {
        question: 'How does working together start',
        answer:
          'You talk to us instead of booking. We work with a handful of businesses at a time, so each one works with the people doing the work, and when we are full, we are full. Get in touch through the form on this page. No deck needed, short answers are fine',
      },
      {
        question: 'What is 7labz Ventures',
        answer:
          'The venture arm of 7labz. A few times a year a founder is building something we cannot stop thinking about, and instead of an invoice we take a stake: we put in the team, the time and, when it makes sense, the capital. Pre-seed to seed, hands on rather than advisory',
      },
      {
        question: 'How is Ventures different from paying 7labz',
        answer:
          'A client pays for the work. With Ventures there is no invoice: we take equity instead of fees and build it with you like it is ours. It is for a few founders a year, and you get in touch through the same form',
      },
    ] as FaqItem[],
  },

  ventures: {
    eyebrow: '7labz Ventures',
    title: 'Some founders we back instead of bill',
    lede: 'A few times a year a founder is building something we cannot stop thinking about. Instead of an invoice, we take a stake: we put in the team, the time and, when it makes sense, the capital, and we build it with you like it is ours',
    // Draft copy: terms and wording are placeholders until the partners sign them off.
    terms: ['Pre-seed to seed', 'Equity, not fees', 'Hands on, not advisory', 'A few a year'],
  },

  form: {
    title: 'Talk to us',
    lede: 'Tell us who you are and what you need. We reply by email',
    type: 'You are',
    types: {
      business: 'A business',
      startup: 'A startup',
      founder: 'A founder (Ventures)',
    } as Record<ContactType, string>,
    name: 'Your name',
    email: 'Email',
    emailPlaceholder: 'name@company.com',
    company: {
      business: 'Business name',
      startup: 'Startup name',
      founder: 'Company name',
    } as Record<ContactType, string>,
    website: 'Website, if any',
    phone: 'Phone, if you’d rather we call',
    need: {
      business: 'Where are you losing the most hours',
      startup: 'What do you need shipped',
    },
    needPlaceholder: {
      business: 'E.g. quotes in a spreadsheet, leads spread across inboxes',
      startup: 'E.g. an AI assistant for our product',
    },
    stage: 'Stage',
    stages: ['Idea', 'Building', 'Live, no revenue', 'Live, with revenue'],
    team: 'Team size',
    teams: ['Just me', '2–5', '6–20', '21–50', '50+'],
    building: 'What are you building',
    ask: 'What would you need from us',
    send: 'Send',
    sending: 'Sending',
    note: 'No deck needed. Short answers are fine',
    privacy: 'We only use this to reply to you.',
    privacyLink: 'Privacy policy',
    sent: 'Got it. We read everything and reply by email',
    error: (email: string) => `That did not go through. Try again, or email us at ${email}`,
    pickOne: 'Pick one',
    required: 'Fill in this field',
    invalidEmail: 'Enter a valid email',
  },

  footer: {
    rights: 'All rights reserved',
    privacy: 'Privacy',
    terms: 'Terms',
  },
}

export type Copy = typeof en
