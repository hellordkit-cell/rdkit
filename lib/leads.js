const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MAX_CONTEXT_BYTES = 12000

function cleanString(value, maxLength = 200) {
  if (value === null || value === undefined) return ''
  return String(value).replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function normalizeContext(context) {
  if (!isPlainObject(context)) return {}

  const serialized = JSON.stringify(context)
  if (Buffer.byteLength(serialized, 'utf8') > MAX_CONTEXT_BYTES) {
    return { note: 'Context was too large to capture safely.' }
  }

  return context
}

function validateLeadPayload(payload = {}) {
  const name = cleanString(payload.name, 120)
  const company = cleanString(payload.company, 160)
  const email = cleanString(payload.email, 180).toLowerCase()
  const phone = cleanString(payload.phone, 80)
  const source = cleanString(payload.source, 100) || 'website'
  const context = normalizeContext(payload.context)
  const errors = {}

  if (!name) errors.name = 'Name is required'
  if (!company) errors.company = 'Company is required'
  if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address'

  if (Object.keys(errors).length > 0) {
    return { ok: false, lead: null, errors }
  }

  return {
    ok: true,
    errors: {},
    lead: {
      name,
      company,
      email,
      phone,
      source,
      context,
      createdAt: new Date().toISOString(),
    },
  }
}

async function deliverLead(lead, options = {}) {
  const webhookUrl = options.webhookUrl ?? process.env.LEAD_WEBHOOK_URL
  const nodeEnv = options.nodeEnv ?? process.env.NODE_ENV
  const fetchImpl = options.fetchImpl ?? globalThis.fetch

  if (!webhookUrl) {
    if (nodeEnv === 'production') {
      return {
        ok: false,
        mode: 'not-configured',
        error: 'Lead capture delivery is not configured',
      }
    }

    return { ok: true, mode: 'local-only' }
  }

  if (!fetchImpl) {
    throw new Error('Fetch is not available for lead delivery')
  }

  const response = await fetchImpl(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  })

  if (!response.ok) {
    throw new Error(`Lead webhook returned ${response.status}`)
  }

  return { ok: true, mode: 'webhook' }
}

module.exports = {
  cleanString,
  validateLeadPayload,
  deliverLead,
}
