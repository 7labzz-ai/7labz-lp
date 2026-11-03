import { COMPANY, type LegalDocument } from './legal'

export const TERMS: LegalDocument = {
  title: 'Terms of service',
  description: 'The rules for using 7labz.ai and Íris, our WhatsApp assistant',
  intro: `These terms are between you and ${COMPANY.name} (VAT ${COMPANY.vat}, ${COMPANY.address}), which runs 7labz. By using Íris or this website you accept them. Questions: ${COMPANY.email}.`,
  sections: [
    {
      heading: 'What Íris is',
      body: [
        'An assistant on WhatsApp that answers you, keeps track of what you asked her to remember, sends reminders and, if you connect them, works in your apps (email, calendar, documents). Access is by invitation, for our team, our clients and the people they invite. While in pilot it can change, and parts of it may be switched off.',
      ],
    },
    {
      heading: 'Your account',
      body: [
        [
          'Use your own number and a work email you control.',
          'Only connect apps and accounts you are allowed to use.',
          'Tell us straight away if someone else gets access to your WhatsApp.',
        ],
      ],
    },
    {
      heading: 'What Íris does in your name',
      body: [
        'Íris prepares, you decide. Sending, deleting, sharing or changing anything in a connected app only happens after you say yes in the conversation. You are responsible for what you approve.',
        'If you record calls or meetings with other people, you need to tell them and have their consent first.',
      ],
    },
    {
      heading: 'What is not allowed',
      body: [
        [
          'Breaking the law, or using Íris to harass, spam or deceive anyone.',
          'Getting around the approvals, limits or security, or trying to reach data that is not yours.',
          'Sending other people’s personal data you have no right to share.',
        ],
        'We can suspend access that breaks these rules, and tell you why.',
      ],
    },
    {
      heading: 'AI is not always right',
      body: [
        'Íris uses AI models. Answers can be wrong or out of date, so check what matters before you rely on it, especially numbers, dates, legal or financial points. She will say when she does not know.',
      ],
    },
    {
      heading: 'Your data and ours',
      body: [
        'What you send and connect stays yours. We use it only to provide the service, as set out in the privacy policy. The software, the brand and this site belong to 7labz.',
      ],
    },
    {
      heading: 'Price',
      body: [
        'Pilots are free unless agreed otherwise in writing. Paid plans, when they exist, will be agreed with you before anything is charged.',
      ],
    },
    {
      heading: 'Liability',
      body: [
        'We do our best to keep Íris working and safe, but we cannot promise it will never fail. As far as the law allows, we are not liable for indirect losses, and our total liability is limited to what you paid us in the 12 months before the claim. Nothing here limits liability that the law does not allow us to limit.',
      ],
    },
    {
      heading: 'Ending',
      body: [
        'You can stop at any time: tell Íris or write to us, and we delete your data as the privacy policy says. We can end the service with 30 days’ notice, or straight away for a serious breach of these terms.',
      ],
    },
    {
      heading: 'Changes and law',
      body: [
        'If these terms change in a way that matters, we tell you before it applies. Portuguese law governs them, and the courts of Lisbon decide any dispute, without affecting the rights consumers have where they live.',
      ],
    },
  ],
}
