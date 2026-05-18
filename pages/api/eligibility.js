import { saveEligibilityCheck } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { answers, eligible, estimatedOffset, leadId } = req.body || {}

  if (!answers || typeof eligible === 'undefined') {
    return res.status(400).json({ error: 'answers and eligible are required' })
  }

  try {
    await saveEligibilityCheck({ leadId: leadId || null, answers, eligible, estimatedOffset })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[eligibility] Save failed:', err)
    return res.status(200).json({ ok: true, warning: 'Could not save to database.' })
  }
}
