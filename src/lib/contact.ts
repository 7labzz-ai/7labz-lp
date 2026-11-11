/**
 * The "Talk to us" form, server side: checks a request, then hands it to the CRM and to an
 * email inbox. A request only counts as received once at least one of them has it.
 */

export const CONTACT_TYPES = ['business', 'startup', 'founder'] as const
export type ContactType = (typeof CONTACT_TYPES)[number]

/** The hidden field only bots fill in. Not named like anything autofill would touch. */
export const HONEYPOT = 'leave_empty'

/** Faster than this from page load to send, and it wasn't a person typing. */
export const MIN_FILL_MS = 1500

export type Lead = {
  lang: 'pt' | 'en'
  type: ContactType
  name: string
  email: string
  company: string
  website: string
  phone: string
  need: string
  stage: string
  team: string
  building: string
  ask: string
}

const LIMITS: Record<keyof Omit<Lead, 'lang' | 'type'>, number> = {
  name: 120,
  email: 200,
  company: 160,
  website: 300,
  phone: 40,
  need: 4000,
  stage: 40,
  team: 20,
  building: 4000,
  ask: 4000,
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Checked =
  { ok: true; lead: Lead } | { ok: true; bot: true } | { ok: false; error: string }

/** Turns whatever was posted into a lead, or says why it can't. */
export function checkLead(input: unknown): Checked {
  if (!input || typeof input !== 'object') return { ok: false, error: 'invalid_body' }
  const raw = input as Record<string, unknown>
  const text = (key: string) => (typeof raw[key] === 'string' ? (raw[key] as string).trim() : '')

  // A bot gets the same answer as a person, so it has nothing to learn from.
  if (text(HONEYPOT)) return { ok: true, bot: true }
  if (typeof raw.elapsed !== 'number' || raw.elapsed < MIN_FILL_MS) {
    return { ok: false, error: 'too_fast' }
  }

  const type = text('type') as ContactType
  if (!CONTACT_TYPES.includes(type)) return { ok: false, error: 'missing:type' }

  const lead = { lang: text('lang') === 'en' ? 'en' : 'pt', type } as Lead
  for (const [key, max] of Object.entries(LIMITS) as [keyof typeof LIMITS, number][]) {
    const value = text(key)
    if (value.length > max) return { ok: false, error: `too_long:${key}` }
    lead[key] = value
  }

  const required: (keyof Lead)[] = ['name', 'email', 'company']
  required.push(type === 'founder' ? 'building' : 'need')
  for (const key of required) if (!lead[key]) return { ok: false, error: `missing:${key}` }
  if (!EMAIL.test(lead.email)) return { ok: false, error: 'invalid:email' }
  lead.email = lead.email.toLowerCase()
  return { ok: true, lead }
}

const TYPE_LABEL: Record<ContactType, string> = {
  business: 'Negócio',
  startup: 'Startup',
  founder: 'Fundador (Ventures)',
}

/** The request as plain lines, for the email and the CRM note. Empty fields are left out. */
export function summary(lead: Lead) {
  const rows: [string, string][] = [
    ['Tipo', TYPE_LABEL[lead.type]],
    ['Nome', lead.name],
    ['Email', lead.email],
    ['Empresa', lead.company],
    ['Site', lead.website],
    ['Telefone', lead.phone],
    ['Precisa', lead.need],
    ['Fase', lead.stage],
    ['Equipa', lead.team],
    ['Está a construir', lead.building],
    ['Precisa de nós', lead.ask],
    ['Língua da página', lead.lang === 'en' ? 'Inglês (/en)' : 'Português (/)'],
  ]
  return rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
}

type Env = Record<string, string | undefined>
type Fetch = typeof fetch
type Destination = { name: string; send: () => Promise<Response> }

/** Where requests go, from the environment. Either one can be missing, not both. */
export function destinations(lead: Lead, env: Env, send: Fetch = fetch): Destination[] {
  const list: Destination[] = []
  const text = summary(lead)

  if (env.CRM_FORM_URL) {
    list.push({
      name: 'crm',
      send: () =>
        send(env.CRM_FORM_URL!, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(env.CRM_FORM_TOKEN && { Authorization: `Bearer ${env.CRM_FORM_TOKEN}` }),
          },
          // Field ids as the CRM's public forms name them (nome, email, telefone, empresa,
          // mensagem); the case goes in as a custom deal field.
          body: JSON.stringify({
            nome: lead.name,
            email: lead.email,
            telefone: lead.phone || undefined,
            empresa: lead.company,
            mensagem: text,
            'negocio.tipo': TYPE_LABEL[lead.type],
          }),
          signal: AbortSignal.timeout(8000),
        }),
    })
  }

  const inboxes = env.LEADS_EMAIL_TO?.split(',')
    .map(address => address.trim())
    .filter(Boolean)
  if (env.RESEND_API_KEY && inboxes?.length && env.LEADS_EMAIL_FROM) {
    // No line breaks in a subject, whatever was typed.
    const subject = `Novo pedido no site: ${TYPE_LABEL[lead.type]} · ${lead.company}`
      .replace(/[\r\n]+/g, ' ')
      .slice(0, 200)
    list.push({
      name: 'email',
      send: () =>
        send(env.RESEND_API_URL || 'https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: env.LEADS_EMAIL_FROM,
            to: inboxes,
            reply_to: lead.email,
            subject,
            text,
          }),
          signal: AbortSignal.timeout(8000),
        }),
    })
  }

  return list
}

export type Delivery = { delivered: string[]; failed: string[] }

/** Sends to every destination at once and reports which took it. Never throws. */
export async function deliver(list: Destination[]): Promise<Delivery> {
  const results = await Promise.all(
    list.map(async ({ name, send }) => {
      try {
        const response = await send()
        return { name, ok: response.ok, why: response.ok ? '' : `HTTP ${response.status}` }
      } catch (error) {
        return { name, ok: false, why: error instanceof Error ? error.name : 'error' }
      }
    }),
  )
  for (const r of results) if (!r.ok) console.error(`[contact] ${r.name} failed: ${r.why}`)
  return {
    delivered: results.filter(r => r.ok).map(r => r.name),
    failed: results.filter(r => !r.ok).map(r => r.name),
  }
}
