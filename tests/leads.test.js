const assert = require('node:assert/strict')
const test = require('node:test')

const { deliverLead, validateLeadPayload } = require('../lib/leads')

test('valid lead payload is normalized with source and context', () => {
  const result = validateLeadPayload({
    name: '  Priya Founder  ',
    company: '  Acme AI  ',
    email: 'PRIYA@EXAMPLE.COM ',
    phone: ' 0400 000 000 ',
    source: 'home-mini-calculator',
    context: {
      spend: 300000,
      estimatedOffset: '$130,500',
    },
  })

  assert.equal(result.ok, true)
  assert.deepEqual(result.errors, {})
  assert.equal(result.lead.name, 'Priya Founder')
  assert.equal(result.lead.company, 'Acme AI')
  assert.equal(result.lead.email, 'priya@example.com')
  assert.equal(result.lead.phone, '0400 000 000')
  assert.equal(result.lead.source, 'home-mini-calculator')
  assert.equal(result.lead.context.spend, 300000)
  assert.match(result.lead.createdAt, /^\d{4}-\d{2}-\d{2}T/)
})

test('lead payload requires name, company, and valid email', () => {
  const result = validateLeadPayload({
    name: '',
    company: ' ',
    email: 'not-an-email',
    source: '',
  })

  assert.equal(result.ok, false)
  assert.equal(result.errors.name, 'Name is required')
  assert.equal(result.errors.company, 'Company is required')
  assert.equal(result.errors.email, 'Enter a valid email address')
  assert.equal(result.lead, null)
})

test('lead payload falls back to website source and ignores non-object context', () => {
  const result = validateLeadPayload({
    name: 'Kay',
    company: 'RDKit',
    email: 'kay@example.com',
    context: 'raw text should not be accepted as context',
  })

  assert.equal(result.ok, true)
  assert.equal(result.lead.source, 'website')
  assert.deepEqual(result.lead.context, {})
})

test('lead delivery accepts local development without a webhook', async () => {
  const delivery = await deliverLead(
    { name: 'Kay', company: 'RDKit', email: 'kay@example.com' },
    { nodeEnv: 'development', webhookUrl: '' }
  )

  assert.deepEqual(delivery, { ok: true, mode: 'local-only' })
})

test('lead delivery refuses production without a webhook', async () => {
  const delivery = await deliverLead(
    { name: 'Kay', company: 'RDKit', email: 'kay@example.com' },
    { nodeEnv: 'production', webhookUrl: '' }
  )

  assert.equal(delivery.ok, false)
  assert.equal(delivery.mode, 'not-configured')
})

test('lead delivery posts to configured webhook', async () => {
  const calls = []
  const delivery = await deliverLead(
    { name: 'Kay', company: 'RDKit', email: 'kay@example.com' },
    {
      webhookUrl: 'https://example.com/webhook',
      fetchImpl: async (url, options) => {
        calls.push({ url, options })
        return { ok: true }
      },
    }
  )

  assert.deepEqual(delivery, { ok: true, mode: 'webhook' })
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, 'https://example.com/webhook')
  assert.equal(calls[0].options.method, 'POST')
  assert.equal(calls[0].options.headers['Content-Type'], 'application/json')
})
