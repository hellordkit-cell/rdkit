import { saveDeposit } from '../../lib/supabase'
import Stripe from 'stripe'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { leadId, stripeSessionId } = req.body || {}

  try {
    // Optionally verify with Stripe if session ID provided
    let status = 'pending'
    if (stripe && stripeSessionId) {
      const session = await stripe.checkout.sessions.retrieve(stripeSessionId)
      status = session.payment_status === 'paid' ? 'paid' : 'pending'
    }

    await saveDeposit({ leadId: leadId || null, stripeSessionId, amount: 500, status })
    return res.status(200).json({ ok: true, status })
  } catch (err) {
    console.error('[deposit] Save failed:', err)
    return res.status(200).json({ ok: true, warning: 'Could not record deposit.' })
  }
}
