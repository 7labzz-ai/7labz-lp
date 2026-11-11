import { NextResponse } from 'next/server'

const REQUIRED = ['name', 'email', 'company', 'building'] as const

const CRM_URL = process.env.CRM_URL ?? 'https://crm.7labz.ai'
const CRM_FORM = process.env.CRM_VENTURES_FORM ?? 'ventures'

const text = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

/**
 * Takes a Ventures application and hands it to the CRM (`/api/captacao/<form>`), which opens the
 * lead and the follow-up task. The applicant only sees "sent" when the CRM confirmed it stored the
 * application: a failed hand-off is an error on screen, never a silent loss.
 */
export async function POST(request: Request) {
  const data: unknown = await request.json().catch(() => null)
  if (!data || typeof data !== 'object') return NextResponse.json({ ok: false }, { status: 400 })
  const fields = data as Record<string, unknown>

  // The honeypot is hidden from people, so anything in it came from a bot.
  if (fields.fax) return NextResponse.json({ ok: true })

  for (const key of REQUIRED) {
    if (!text(fields[key], 1)) return NextResponse.json({ ok: false, missing: key }, { status: 400 })
  }

  const message = [
    `Building: ${text(fields.building, 2500)}`,
    text(fields.need, 1000) && `Needs: ${text(fields.need, 1000)}`,
    text(fields.stage, 100) && `Stage: ${text(fields.stage, 100)}`,
    text(fields.team, 100) && `Team: ${text(fields.team, 100)}`,
  ]
    .filter(Boolean)
    .join('\n')

  const lead = {
    nome: text(fields.name, 200),
    email: text(fields.email, 200),
    empresa: text(fields.company, 200),
    website: text(fields.website, 200),
    mensagem: message,
    origem: { pagina: '7labz.ai/#apply', formulario: 'ventures' },
  }

  const visitorIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
  try {
    const response = await fetch(`${CRM_URL}/api/captacao/${CRM_FORM}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-captacao-chave': process.env.CAPTACAO_CHAVE ?? '',
        'x-visitante-ip': visitorIp,
      },
      body: JSON.stringify(lead),
      redirect: 'error',
    })
    const result = (await response.json().catch(() => ({}))) as { ok?: boolean }
    if (response.ok && result.ok) return NextResponse.json({ ok: true })
    // No personal data in logs: the status is enough to find the cause.
    console.error('[apply] CRM refused the application', response.status)
  } catch {
    console.error('[apply] CRM did not answer')
  }
  return NextResponse.json({ ok: false }, { status: 502 })
}
