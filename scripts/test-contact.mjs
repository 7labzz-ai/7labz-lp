// End-to-end check of the "Talk to us" form API against the built site (run `pnpm build`
// first): `pnpm test:contact`. A fake CRM and a fake Resend run on a local port, so nothing
// real is sent. It proves a request reaches both, and that every failure is an error the
// page shows, never a false success.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'

const MOCK_PORT = 4555
const APP_PORT = 3997
const mock = { fail: false, calls: [] }

const server = createServer((req, res) => {
  let body = ''
  req.on('data', chunk => (body += chunk))
  req.on('end', () => {
    mock.calls.push({ path: req.url, auth: req.headers.authorization, body: JSON.parse(body) })
    res.writeHead(mock.fail ? 500 : 200, { 'Content-Type': 'application/json' })
    res.end('{}')
  })
})
await new Promise(resolve => server.listen(MOCK_PORT, resolve))

async function startApp(env) {
  // Node directly, not through pnpm, so killing it stops the server too.
  const app = spawn(
    process.execPath,
    ['node_modules/next/dist/bin/next', 'start', '-p', String(APP_PORT)],
    {
      env: { ...process.env, ...env },
      stdio: 'ignore',
    },
  )
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(`http://localhost:${APP_PORT}/robots.txt`)
      return app
    } catch {
      await new Promise(resolve => setTimeout(resolve, 250))
    }
  }
  app.kill()
  throw new Error('the app did not start')
}

const stopApp = app =>
  new Promise(resolve => {
    app.once('exit', resolve)
    app.kill()
  })

const post = async body => {
  const response = await fetch(`http://localhost:${APP_PORT}/api/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return { status: response.status, json: await response.json() }
}

const lead = {
  lang: 'pt',
  type: 'business',
  name: 'Ana Exemplo',
  email: 'Ana@Exemplo.pt',
  company: 'Empresa Exemplo Lda',
  phone: '912 345 678',
  need: 'Orçamentos numa folha de cálculo',
  elapsed: 5000,
}

const results = []
const check = async (name, fn) => {
  mock.calls = []
  mock.fail = false
  try {
    await fn()
    results.push(`ok   ${name}`)
  } catch (error) {
    results.push(`FAIL ${name}: ${error.message}`)
  }
}

let app = await startApp({
  CRM_FORM_URL: `http://127.0.0.1:${MOCK_PORT}/crm`,
  CRM_FORM_TOKEN: 'test-token',
  RESEND_API_KEY: 'test-key',
  RESEND_API_URL: `http://127.0.0.1:${MOCK_PORT}/email`,
  LEADS_EMAIL_TO: 'equipa@exemplo.pt',
  LEADS_EMAIL_FROM: 'Site <site@exemplo.pt>',
})

try {
  await check('a valid request reaches the CRM and the inbox', async () => {
    const { status, json } = await post(lead)
    assert.equal(status, 200)
    assert.equal(json.ok, true)
    const crm = mock.calls.find(call => call.path === '/crm')
    const email = mock.calls.find(call => call.path === '/email')
    assert.ok(crm, 'nothing reached the CRM')
    assert.equal(crm.auth, 'Bearer test-token')
    assert.equal(crm.body.email, 'ana@exemplo.pt')
    assert.equal(crm.body.empresa, 'Empresa Exemplo Lda')
    assert.match(crm.body.mensagem, /Precisa: Orçamentos/)
    assert.ok(email, 'nothing reached the inbox')
    assert.deepEqual(email.body.to, ['equipa@exemplo.pt'])
    assert.equal(email.body.reply_to, 'ana@exemplo.pt')
  })

  await check('both destinations down: a visible error, not a success', async () => {
    mock.fail = true
    const { status, json } = await post(lead)
    assert.equal(status, 502)
    assert.equal(json.ok, false)
  })

  await check('a founder needs "what are you building"', async () => {
    const { status, json } = await post({ ...lead, type: 'founder', need: '' })
    assert.equal(status, 400)
    assert.equal(json.error, 'missing:building')
    assert.equal(mock.calls.length, 0)
  })

  await check('a bad email is refused', async () => {
    const { status } = await post({ ...lead, email: 'not-an-email' })
    assert.equal(status, 400)
    assert.equal(mock.calls.length, 0)
  })

  await check('no type picked is refused', async () => {
    const { status, json } = await post({ ...lead, type: '' })
    assert.equal(status, 400)
    assert.equal(json.error, 'missing:type')
  })

  await check('the honeypot is dropped quietly', async () => {
    const { status } = await post({ ...lead, leave_empty: 'spam' })
    assert.equal(status, 200)
    assert.equal(mock.calls.length, 0)
  })

  await check('a send faster than a person can type is refused', async () => {
    const { status } = await post({ ...lead, elapsed: 200 })
    assert.equal(status, 400)
    assert.equal(mock.calls.length, 0)
  })
} finally {
  await stopApp(app)
}

app = await startApp({
  CRM_FORM_URL: '',
  RESEND_API_KEY: '',
  LEADS_EMAIL_TO: '',
  LEADS_EMAIL_FROM: '',
})
try {
  await check('nothing configured: a visible error, not a success', async () => {
    const { status, json } = await post(lead)
    assert.equal(status, 503)
    assert.equal(json.error, 'not_configured')
  })
} finally {
  await stopApp(app)
  server.close()
}

console.log(results.join('\n'))
if (results.some(line => line.startsWith('FAIL'))) process.exit(1)
