const { deliverLead, validateLeadPayload } = require('../../lib/leads')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const validation = validateLeadPayload(req.body || {})
  if (!validation.ok) {
    return res.status(400).json({
      error: 'Please check the lead details',
      errors: validation.errors,
    })
  }

  try {
    const delivery = await deliverLead(validation.lead)

    if (!delivery.ok) {
      return res.status(503).json({
        error: delivery.error || 'Lead capture is not configured',
        mode: delivery.mode,
      })
    }

    return res.status(200).json({
      ok: true,
      mode: delivery.mode,
      receivedAt: validation.lead.createdAt,
    })
  } catch (error) {
    return res.status(502).json({
      error: 'Lead could not be delivered. Please email hellordkit@gmail.com.',
    })
  }
}
