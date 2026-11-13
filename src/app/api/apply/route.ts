import { checkLead, deliver, destinations } from '@/lib/contact'
import { NextResponse } from 'next/server'

/** Bigger than any honest request, small enough that nobody can post a novel. */
const MAX_BODY = 32_000

/**
 * Takes a "Talk to us" request and hands it to the CRM and the inbox. It answers `ok` only
 * once at least one of them has it, so the page never shows a success that isn't one.
 */
export async function POST(request: Request) {
  const body = await request.text().catch(() => '')
  if (body.length > MAX_BODY) return NextResponse.json({ ok: false }, { status: 413 })
  let input: unknown = null
  try {
    input = JSON.parse(body)
  } catch {}

  const checked = checkLead(input)
  if (!checked.ok) return NextResponse.json({ ok: false, error: checked.error }, { status: 400 })
  if ('bot' in checked) return NextResponse.json({ ok: true })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null
  const list = destinations(checked.lead, process.env, ip)
  if (!list.length) {
    console.error('[contact] no destination configured: set CRM_FORM_URL and/or RESEND_*')
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const { delivered } = await deliver(list)
  if (!delivered.length)
    return NextResponse.json({ ok: false, error: 'not_delivered' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
