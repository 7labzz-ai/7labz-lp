import { COPY } from '@/content/i18n'
import { SITE_NAME, SITE_URL } from '@/content/site'

// Written for machines in English; the Portuguese home page is linked below.
const { meta, services, process: steps, faq, founders } = COPY.en

export const dynamic = 'force-static'

/**
 * llms.txt: a plain summary of the studio for AI assistants and answer engines, so they can
 * describe 7labz accurately without parsing the animated page.
 */
export function GET() {
  const body = [
    `# ${SITE_NAME}`,
    '',
    `> ${meta.description}`,
    '',
    '7labz is a boutique studio of growth engineers. It embeds inside companies and restructures them from within: it maps how the work actually flows, then rebuilds the processes, tools and systems underneath. Clients are companies that have outgrown the way they run, and AI startups that need a product shipped. The same small team maps the problem, builds the fix and stays until the client runs it without them. It works with a few companies at a time, so every engagement starts with a conversation.',
    '',
    '## Services',
    '',
    ...services.list.map(
      service =>
        `- **${service.title}**: ${service.body}. Includes ${service.items.join(', ').toLowerCase()}.`,
    ),
    '',
    '## How an engagement runs',
    '',
    ...steps.map(step => `- **${step.when}**: ${step.what}`),
    '',
    '## 7labz Ventures',
    '',
    'The venture arm. A few times a year, instead of an invoice, 7labz takes a stake in a founder: it puts in the team, the time and, when it makes sense, the capital. Pre-seed to seed, hands on rather than advisory. Founders get in touch through the form on the site.',
    '',
    '## FAQ',
    '',
    ...faq.list.flatMap(item => [`### ${item.question}?`, '', `${item.answer}.`, '']),
    '## Team',
    '',
    ...founders.map(founder => `- ${founder.name}, ${founder.role}`),
    '',
    '## Links',
    '',
    `- [Home, in Portuguese](${SITE_URL}/)`,
    `- [Home, in English](${SITE_URL}/en)`,
    `- [Services](${SITE_URL}/en#services)`,
    `- [Talk to us, or to 7labz Ventures](${SITE_URL}/en#apply)`,
    `- [Manifesto](${SITE_URL}/en#manifesto)`,
    `- [FAQ](${SITE_URL}/en#faq)`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
