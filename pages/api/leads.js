import { validateLeadPayload } from '../../lib/leads'
import { saveLead } from '../../lib/supabase'

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
    const result = await saveLead(validation.lead)
    if (!result.ok) {
      console.error('[leads] Supabase save failed:', result.error)
      // Still return success to user — don't block the form
    }
    return res.status(200).json({
      ok: true,
      leadId: result.id || null,
      receivedAt: validation.lead.createdAt,
    })
  } catch (error) {
    console.error('[leads] Unexpected error:', error)
    return res.status(200).json({
      ok: true,
      warning: 'Lead captured but could not be saved to database.',
    })
  }
}
