import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[RDKit] Supabase env vars not set — DB writes will be skipped.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// ─── Leads ──────────────────────────────────────────────────────────────────
export async function saveLead(lead) {
  if (!supabase) return { ok: false, error: 'Supabase not configured', id: null }
  const { data, error } = await supabase
    .from('leads')
    .insert({
      name:       lead.name,
      email:      lead.email,
      company:    lead.company,
      phone:      lead.phone || null,
      source:     lead.source || 'website',
      context:    lead.context || {},
      created_at: lead.createdAt || new Date().toISOString(),
    })
    .select('id')
    .single()
  if (error) return { ok: false, error: error.message, id: null }
  return { ok: true, id: data.id }
}

// ─── Diagnostics ─────────────────────────────────────────────────────────────
export async function saveDiagnostic({ leadId, input, deterministic, aiResult, mode }) {
  if (!supabase) return { ok: false, error: 'Supabase not configured' }
  const offsets = deterministic?.estimate || {}
  const { error } = await supabase
    .from('diagnostics')
    .insert({
      lead_id:              leadId || null,
      input:                input,
      deterministic:        deterministic,
      ai_result:            aiResult,
      mode:                 mode,
      confidence:           aiResult?.confidence || deterministic?.assessment?.confidence || null,
      estimated_offset_min: offsets.low || null,
      estimated_offset_max: offsets.high || null,
    })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ─── Eligibility checks ───────────────────────────────────────────────────────
export async function saveEligibilityCheck({ leadId, answers, eligible, estimatedOffset }) {
  if (!supabase) return { ok: false, error: 'Supabase not configured' }
  const { error } = await supabase
    .from('eligibility_checks')
    .insert({
      lead_id:          leadId || null,
      answers:          answers,
      eligible:         eligible,
      estimated_offset: estimatedOffset || null,
    })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ─── Deposits ─────────────────────────────────────────────────────────────────
export async function saveDeposit({ leadId, stripeSessionId, amount = 500, status = 'pending' }) {
  if (!supabase) return { ok: false, error: 'Supabase not configured' }
  const { error } = await supabase
    .from('deposits')
    .insert({
      lead_id:           leadId || null,
      stripe_session_id: stripeSessionId || null,
      amount:            amount,
      status:            status,
    })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
