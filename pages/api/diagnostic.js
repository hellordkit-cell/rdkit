import { buildDeterministicDiagnostic } from '../../lib/rdtiDiagnostic'
import { saveDiagnostic } from '../../lib/supabase'

const RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    userSummary:          { type: 'string' },
    confidence:           { type: 'string', enum: ['early', 'moderate', 'strong'] },
    riskFlags:            { type: 'array', items: { type: 'string' } },
    followUpQuestions:    { type: 'array', items: { type: 'string' } },
    evidenceGaps:         { type: 'array', items: { type: 'string' } },
    recommendedNextStep:  { type: 'string' },
    advisorNote:          { type: 'string' },
  },
  required: ['userSummary','confidence','riskFlags','followUpQuestions','evidenceGaps','recommendedNextStep','advisorNote'],
}

const extractOutputText = response => {
  if (typeof response.output_text === 'string') return response.output_text
  const chunks = []
  for (const item of response.output || []) {
    for (const content of item.content || []) {
      if (content.type === 'output_text' && content.text) chunks.push(content.text)
      if (content.type === 'text' && content.text) chunks.push(content.text)
    }
  }
  return chunks.join('\n').trim()
}

const callOpenAI = async ({ input, deterministic }) => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      input: [
        { role: 'system', content: [{ type: 'input_text', text: 'You are RDKit Diagnostic, an Australian R&D Tax Incentive discovery assistant. You do not provide tax advice, guarantees, or lodgement-ready conclusions. Use the deterministic estimate as authoritative for money values. Be conservative, plain-English, and suitable for a founder or accountant.' }] },
        { role: 'user', content: [{ type: 'input_text', text: JSON.stringify({ visitorInput: input, deterministicDiagnostic: deterministic }) }] },
      ],
      text: { format: { type: 'json_schema', name: 'rdkit_diagnostic', strict: true, schema: RESPONSE_SCHEMA } },
    }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error?.message || 'OpenAI request failed')
  const text = extractOutputText(data)
  if (!text) throw new Error('OpenAI response missing output text')
  return JSON.parse(text)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const input = req.body || {}
  const leadId = input._leadId || null           // passed from frontend after lead capture
  const deterministic = buildDeterministicDiagnostic(input)

  try {
    const ai = await callOpenAI({ input, deterministic })
    const mode = ai ? 'ai-assisted' : 'rules-only'
    const aiResult = ai || {
      userSummary:         deterministic.summary,
      confidence:          deterministic.assessment.confidence,
      riskFlags:           deterministic.assessment.risks,
      followUpQuestions:   deterministic.assessment.followUpQuestions,
      evidenceGaps:        deterministic.assessment.missingEvidence,
      recommendedNextStep: deterministic.assessment.recommendedNextStep,
      advisorNote:         deterministic.guardrail,
    }

    // Save to Supabase (non-blocking — don't fail the response if DB write fails)
    saveDiagnostic({ leadId, input, deterministic, aiResult, mode }).catch(err =>
      console.error('[diagnostic] Supabase save failed:', err)
    )

    return res.status(200).json({ mode, diagnostic: deterministic, ai: aiResult })
  } catch (error) {
    const deterministic2 = buildDeterministicDiagnostic(input)
    const fallbackAi = {
      userSummary:         deterministic2.summary,
      confidence:          deterministic2.assessment.confidence,
      riskFlags:           deterministic2.assessment.risks,
      followUpQuestions:   deterministic2.assessment.followUpQuestions,
      evidenceGaps:        deterministic2.assessment.missingEvidence,
      recommendedNextStep: deterministic2.assessment.recommendedNextStep,
      advisorNote:         `${deterministic2.guardrail} AI enhancement unavailable — deterministic fallback used.`,
    }
    saveDiagnostic({ leadId, input, deterministic: deterministic2, aiResult: fallbackAi, mode: 'rules-fallback' }).catch(() => {})
    return res.status(200).json({ mode: 'rules-fallback', diagnostic: deterministic2, ai: fallbackAi, warning: error.message })
  }
}
