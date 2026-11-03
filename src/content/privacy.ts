import { COMPANY, type LegalDocument } from './legal'

export const PRIVACY: LegalDocument = {
  title: 'Privacy policy',
  description:
    'What 7labz and Íris, our WhatsApp assistant, collect, why, who processes it and how to get it deleted',
  intro: `7labz is run by ${COMPANY.name} (VAT ${COMPANY.vat}, ${COMPANY.address}). We are the controller of the data described here. Questions or requests: ${COMPANY.email}.`,
  sections: [
    {
      heading: 'What this covers',
      body: [
        'This website (7labz.ai) and Íris, the assistant we run on WhatsApp for our team, our clients and the people they invite. It does not cover systems we build for a client: there the client is the controller and their own policy applies.',
      ],
    },
    {
      heading: 'On this website',
      body: [
        [
          'Analytics: page views counted with Umami, which we host ourselves. No cookies and no cross-site tracking.',
          'Applications: what you type in the Ventures form (name, email, company, what you are building). We use it to reply to you and nothing else.',
        ],
      ],
    },
    {
      heading: 'In Íris',
      body: [
        'Íris only sees what you send to her number. Never your other chats.',
        [
          'Who you are: phone number, name and work email.',
          'What you send: messages, voice notes (turned into text), images and documents.',
          'What she keeps to help you: conversation history, notes you ask her to remember, reminders, and a log of every action she takes in a connected app.',
          'Connected apps: only the ones you connect yourself (for example Gmail, Google Calendar, Google Drive or Notion), with the permissions shown on the consent screen. You can disconnect any of them at any time.',
        ],
      ],
    },
    {
      heading: 'Why we use it',
      body: [
        'To run the service you asked for: answer you, act on your requests, send you the reminders and summaries you set up. The legal basis is the contract with you or your company, and our legitimate interest in keeping the service secure.',
        'Íris never sends, deletes or shares anything in a connected app without your explicit yes in the conversation. Instructions found inside emails or documents are treated as content, never as orders.',
      ],
    },
    {
      heading: 'Google user data',
      body: [
        "Íris's use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.",
        [
          'We use Google data only to do what you ask Íris to do with your own account.',
          'We do not sell it, use it for advertising, or use it to train general AI or machine learning models.',
          'People at 7labz do not read it, unless you ask us to, it is needed for security or abuse, or the law requires it.',
        ],
      ],
    },
    {
      heading: 'Who processes it for us',
      body: [
        [
          'Supabase: the database where Íris keeps your profile, history and settings.',
          'Composio: connects your apps and keeps the access tokens you grant.',
          'AI model providers (such as OpenAI), through our own gateway: to understand and write replies. Their terms forbid training on this data.',
          'AssemblyAI and ElevenLabs: voice notes to text, and spoken replies.',
          'Vercel: hosts this website. WhatsApp (Meta) carries the messages.',
        ],
        'Some of them are outside the European Union. Those transfers rely on the European Commission standard contractual clauses or an adequacy decision.',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        'While your access to Íris is active. When you ask us, or your access ends, we delete your history, notes and app connections within 30 days. The action log is kept for up to 12 months for security, then deleted. Ventures applications are deleted after 12 months if nothing comes of them.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        `You can ask to see, correct, export or delete your data, or object to how we use it: write to ${COMPANY.email}. We reply within 30 days. You can also complain to the Portuguese data protection authority (CNPD, www.cnpd.pt).`,
        'Sending /pausa to Íris stops her using your apps and sending automatic messages. Disconnecting an app removes its access straight away.',
      ],
    },
    {
      heading: 'Changes',
      body: [
        'If this changes in a way that matters, we tell the people using Íris before it applies. The date at the top is the last update.',
      ],
    },
  ],
}
