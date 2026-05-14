import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import LeadCapture from '../components/LeadCapture'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const evidenceOptions = [
  ['payroll', 'Payroll / timesheets'],
  ['invoices', 'Contractor invoices'],
  ['tickets', 'Jira, GitHub, or tickets'],
  ['experiments', 'Experiment notes'],
  ['architecture', 'Architecture notes'],
  ['financials', 'Ledger / cost export'],
]

const defaultForm = {
  turnoverBand: 'under20m',
  profitable: false,
  spend: 300000,
  totalExpenses: 1500000,
  companyTaxRate: 0.25,
  projectSummary: '',
  technicalUncertainty: '',
  experimentation: '',
  evidence: {
    payroll: true,
    tickets: true,
    experiments: false,
  },
}

const FieldLabel = ({ label, children }) => (
  <label className="diagnostic-field">
    <span>{label}</span>
    {children}
  </label>
)

const SegmentButton = ({ active, children, onClick }) => (
  <button
    type="button"
    className={`segment-button${active ? ' active' : ''}`}
    aria-pressed={active}
    onClick={onClick}
  >
    {children}
  </button>
)

const ResultList = ({ items, emptyText }) => (
  <ul>
    {items && items.length > 0
      ? items.map(item => <li key={item}>{item}</li>)
      : <li>{emptyText}</li>}
  </ul>
)

export default function Diagnostic() {
  const [form, setForm] = useState(defaultForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [prefillNotice, setPrefillNotice] = useState('')

  const selectedEvidence = useMemo(
    () => Object.values(form.evidence).filter(Boolean).length,
    [form.evidence]
  )

  const update = patch => setForm(current => ({ ...current, ...patch }))
  const updateEvidence = key => {
    setForm(current => ({
      ...current,
      evidence: {
        ...current.evidence,
        [key]: !current.evidence[key],
      },
    }))
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const raw = window.sessionStorage.getItem('rdkit:diagnostic-prefill')
    if (!raw) return

    try {
      const calculatorContext = JSON.parse(raw)
      const nextSpend = Number(calculatorContext.spend)
      const nextExpenses = Number(calculatorContext.totalExpenses)
      const turnoverBand = calculatorContext.turnoverBand === 'over20m' ? 'over20m' : 'under20m'
      const companyTaxRate = turnoverBand === 'over20m'
        ? 0.30
        : Number(calculatorContext.companyTaxRate) || 0.25

      setForm(current => ({
        ...current,
        turnoverBand,
        profitable: Boolean(calculatorContext.profitable),
        spend: Number.isFinite(nextSpend) && nextSpend > 0 ? nextSpend : current.spend,
        totalExpenses: Number.isFinite(nextExpenses) && nextExpenses > 0
          ? nextExpenses
          : current.totalExpenses,
        companyTaxRate,
      }))
      setPrefillNotice(
        'Estimate imported from the Claim Assistant. This AI-assisted diagnostic may be wrong and is not tax advice; RDKit should review the facts and evidence.'
      )
    } catch (err) {
      window.sessionStorage.removeItem('rdkit:diagnostic-prefill')
    }
  }, [])

  const submit = async event => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Diagnostic failed')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const estimate = result?.diagnostic?.estimate
  const ai = result?.ai

  return (
    <>
      <Head>
        <title>AI R&D Diagnostic Tool | RDKit</title>
        <meta name="description" content="Run an AI-assisted R&D Tax Incentive diagnostic with RDKit. Estimate benefit, identify eligibility risks, and discover missing evidence." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Nav />

      <main className="diagnostic-page">
        <section className="diagnostic-shell">
          <div className="diagnostic-intro">
            <div className="tag tag-cyan">AI diagnostic</div>
            <h1>R&D claim discovery tool</h1>
            <p>
              Estimate the numbers, test the claim story, and surface the documents RDKit would ask for next.
            </p>
            {prefillNotice && (
              <div className="diagnostic-prefill-note">
                {prefillNotice}
              </div>
            )}
          </div>

          <div className="diagnostic-grid">
            <form className="diagnostic-panel" onSubmit={submit}>
              <div className="diagnostic-section">
                <div className="diagnostic-kicker">// Company profile</div>
                <div className="segment-group">
                  <SegmentButton
                    active={form.turnoverBand === 'under20m'}
                    onClick={() => update({ turnoverBand: 'under20m', companyTaxRate: 0.25 })}
                  >
                    Under $20M
                  </SegmentButton>
                  <SegmentButton
                    active={form.turnoverBand === 'over20m'}
                    onClick={() => update({ turnoverBand: 'over20m', companyTaxRate: 0.30 })}
                  >
                    $20M+
                  </SegmentButton>
                </div>

                <div className="segment-group">
                  <SegmentButton
                    active={!form.profitable}
                    onClick={() => update({ profitable: false })}
                  >
                    Loss-making
                  </SegmentButton>
                  <SegmentButton
                    active={form.profitable}
                    onClick={() => update({ profitable: true })}
                  >
                    Profitable
                  </SegmentButton>
                </div>

                <div className="field-row">
                  <FieldLabel label="Eligible R&D spend">
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={form.spend}
                      onChange={event => update({ spend: event.target.value })}
                    />
                  </FieldLabel>
                  <FieldLabel label="Company tax rate">
                    <select
                      value={form.companyTaxRate}
                      onChange={event => update({ companyTaxRate: Number(event.target.value) })}
                    >
                      <option value={0.25}>25%</option>
                      <option value={0.30}>30%</option>
                    </select>
                  </FieldLabel>
                </div>

                {form.turnoverBand === 'over20m' && (
                  <FieldLabel label="Total company expenditure for R&D intensity">
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={form.totalExpenses}
                      onChange={event => update({ totalExpenses: event.target.value })}
                    />
                  </FieldLabel>
                )}
              </div>

              <div className="diagnostic-section">
                <div className="diagnostic-kicker">// Discovery</div>
                <FieldLabel label="What did the team build or improve?">
                  <textarea
                    rows="4"
                    value={form.projectSummary}
                    onChange={event => update({ projectSummary: event.target.value })}
                    placeholder="Example: We built a new optimisation engine for live dispatch decisions."
                  />
                </FieldLabel>
                <FieldLabel label="What was technically uncertain?">
                  <textarea
                    rows="4"
                    value={form.technicalUncertainty}
                    onChange={event => update({ technicalUncertainty: event.target.value })}
                    placeholder="Example: We did not know whether route changes could be solved within latency limits."
                  />
                </FieldLabel>
                <FieldLabel label="What experiments or iterations happened?">
                  <textarea
                    rows="4"
                    value={form.experimentation}
                    onChange={event => update({ experimentation: event.target.value })}
                    placeholder="Example: We tested three algorithms, rejected two, and benchmarked latency."
                  />
                </FieldLabel>
              </div>

              <div className="diagnostic-section">
                <div className="diagnostic-kicker">// Evidence available</div>
                <div className="evidence-grid">
                  {evidenceOptions.map(([key, label]) => (
                    <label key={key} className="evidence-option">
                      <input
                        type="checkbox"
                        checked={Boolean(form.evidence[key])}
                        onChange={() => updateEvidence(key)}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <p className="microcopy">{selectedEvidence} evidence categories selected.</p>
              </div>

              <button type="submit" className="btn btn-primary diagnostic-submit" disabled={loading}>
                {loading ? 'Running diagnostic...' : 'Run diagnostic'}
              </button>
              {error && <p className="diagnostic-error">{error}</p>}
            </form>

            <aside className="diagnostic-results" aria-live="polite">
              {!result && (
                <div className="empty-result">
                  <div className="diagnostic-kicker">// Output</div>
                  <h2>Diagnostic result will appear here</h2>
                  <p>
                    The result separates cash benefit, carried-forward offset, RDKit fee, risk flags, and missing evidence.
                  </p>
                </div>
              )}

              {result && (
                <>
                  <div className="result-banner">
                    <span>{result.mode === 'ai-assisted' ? 'OpenAI assisted' : 'Rules fallback'}</span>
                    <strong>{ai.confidence} confidence</strong>
                  </div>

                  <div className="result-card primary">
                    <div>
                      <span>Current cash / tax benefit</span>
                      <strong>{estimate.display.currentCashBenefit}</strong>
                    </div>
                    <div>
                      <span>After RDKit fee estimate</span>
                      <strong>{estimate.display.afterFeeCurrent}</strong>
                    </div>
                    <div>
                      <span>Carried-forward offset</span>
                      <strong>{estimate.display.carriedForwardOffset}</strong>
                    </div>
                  </div>

                  <div className="result-card">
                    <h3>Estimate breakdown</h3>
                    <dl className="result-list">
                      <div><dt>Gross offset</dt><dd>{estimate.display.grossOffset}</dd></div>
                      <div><dt>Offset rate</dt><dd>{estimate.display.offsetRate}</dd></div>
                      <div><dt>Premium rate</dt><dd>{estimate.display.premiumRate}</dd></div>
                      <div><dt>RDKit fee</dt><dd>{estimate.display.feeEstimate}</dd></div>
                    </dl>
                    <p>{estimate.intensityNote}</p>
                  </div>

                  <div className="result-card">
                    <h3>Diagnostic summary</h3>
                    <p>{ai.userSummary}</p>
                    <p className="guardrail">{ai.advisorNote}</p>
                  </div>

                  <div className="result-card">
                    <h3>Risk flags</h3>
                    <ResultList
                      items={ai.riskFlags}
                      emptyText="No major risk flags from the information provided. RDKit should still review the evidence."
                    />
                  </div>

                  <div className="result-card">
                    <h3>Follow-up questions</h3>
                    <ResultList
                      items={ai.followUpQuestions}
                      emptyText="No urgent follow-up questions. The next useful step is evidence review."
                    />
                  </div>

                  <div className="result-card">
                    <h3>Evidence gaps</h3>
                    <ResultList
                      items={ai.evidenceGaps}
                      emptyText="No evidence gaps selected by the diagnostic."
                    />
                  </div>

                  <div className="result-actions">
                    <Link href="/eligibility" className="btn btn-primary btn-arrow">Check eligibility</Link>
                    <Link href="/calculator" className="btn btn-outline">Back to calculator</Link>
                  </div>

                  <LeadCapture
                    source="diagnostic-result"
                    compact
                    title="Get RDKit to review this"
                    description="Send the diagnostic context and RDKit can follow up with the practical claim path."
                    ctaLabel="Request review"
                    context={{
                      input: form,
                      mode: result.mode,
                      confidence: ai.confidence,
                      estimate: estimate.display,
                      riskFlags: ai.riskFlags,
                      evidenceGaps: ai.evidenceGaps,
                      followUpQuestions: ai.followUpQuestions,
                    }}
                  />
                </>
              )}
            </aside>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .diagnostic-page {
          min-height: 100vh;
          padding: 112px 32px 72px;
          position: relative;
          z-index: 1;
        }

        .diagnostic-shell {
          max-width: 1180px;
          margin: 0 auto;
        }

        .diagnostic-intro {
          max-width: 720px;
          margin-bottom: 28px;
        }

        .diagnostic-intro h1 {
          font-family: var(--serif);
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.08;
          font-weight: 600;
          margin: 16px 0 14px;
        }

        .diagnostic-intro p {
          color: var(--muted);
          font-size: 1.02rem;
          max-width: 620px;
        }

        .diagnostic-prefill-note {
          margin-top: 18px;
          border: 1px solid rgba(0,180,216,0.18);
          background: rgba(0,180,216,0.06);
          color: var(--dark);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 0.88rem;
          line-height: 1.55;
        }

        .diagnostic-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
          gap: 24px;
          align-items: start;
        }

        .diagnostic-panel,
        .diagnostic-results {
          background: var(--card);
          border: 1px solid var(--card-border);
          border-radius: 18px;
          padding: 28px;
          box-shadow: 0 6px 32px rgba(0,0,0,0.04);
        }

        .diagnostic-results {
          position: sticky;
          top: 88px;
        }

        .diagnostic-section {
          padding-bottom: 26px;
          margin-bottom: 26px;
          border-bottom: 1px solid var(--card-border);
        }

        .diagnostic-section:last-of-type {
          border-bottom: 0;
          margin-bottom: 20px;
        }

        .diagnostic-kicker {
          font-family: var(--mono);
          font-size: 0.7rem;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 1.4px;
          margin-bottom: 12px;
        }

        .segment-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 12px;
        }

        .segment-button {
          border: 1.5px solid var(--card-border);
          background: var(--bg-alt);
          color: var(--muted);
          border-radius: 10px;
          padding: 13px 14px;
          font-weight: 700;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }

        .segment-button.active {
          border-color: var(--coral);
          background: rgba(255,107,84,0.06);
          color: var(--coral);
        }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 160px;
          gap: 12px;
        }

        .diagnostic-field {
          display: grid;
          gap: 8px;
          margin-bottom: 14px;
        }

        .diagnostic-field span {
          font-size: 0.86rem;
          color: var(--charcoal);
          font-weight: 700;
        }

        .diagnostic-field input,
        .diagnostic-field select,
        .diagnostic-field textarea {
          width: 100%;
          border: 1.5px solid var(--card-border);
          background: var(--bg);
          border-radius: 10px;
          padding: 13px 14px;
          font: inherit;
          color: var(--charcoal);
        }

        .diagnostic-field textarea {
          resize: vertical;
          line-height: 1.55;
        }

        .evidence-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .evidence-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          background: var(--bg-alt);
          border: 1px solid var(--card-border);
          border-radius: 10px;
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--dark);
        }

        .evidence-option input {
          width: 16px;
          height: 16px;
          accent-color: var(--coral);
        }

        .microcopy {
          margin-top: 10px;
          color: var(--muted);
          font-size: 0.82rem;
        }

        .diagnostic-submit {
          width: 100%;
          justify-content: center;
        }

        .diagnostic-error {
          margin-top: 12px;
          color: var(--coral);
          font-size: 0.9rem;
          font-weight: 700;
        }

        .empty-result {
          min-height: 360px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: var(--muted);
        }

        .empty-result h2 {
          font-family: var(--serif);
          color: var(--charcoal);
          font-size: 1.7rem;
          margin-bottom: 10px;
        }

        .result-banner {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          background: var(--bg-alt);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 12px 14px;
          margin-bottom: 14px;
          color: var(--muted);
          text-transform: capitalize;
        }

        .result-banner strong {
          color: var(--coral);
        }

        .result-card {
          border: 1px solid var(--card-border);
          border-radius: 14px;
          padding: 18px;
          margin-bottom: 14px;
          background: white;
        }

        .result-card.primary {
          background: linear-gradient(135deg, var(--purple-light), var(--cyan-light));
          display: grid;
          gap: 12px;
        }

        .result-card.primary div {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: baseline;
        }

        .result-card.primary span {
          font-size: 0.86rem;
          color: var(--dark);
          font-weight: 600;
        }

        .result-card.primary strong {
          font-family: var(--mono);
          font-size: 1.2rem;
          color: var(--coral);
        }

        .result-card h3 {
          margin-bottom: 10px;
          font-size: 1rem;
        }

        .result-card p,
        .result-card li {
          color: var(--muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .result-card ul {
          padding-left: 18px;
        }

        .result-list {
          display: grid;
          gap: 8px;
          margin-bottom: 10px;
        }

        .result-list div {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid var(--card-border);
          padding-bottom: 8px;
        }

        .result-list dt {
          color: var(--muted);
          font-size: 0.86rem;
        }

        .result-list dd {
          font-family: var(--mono);
          font-weight: 700;
        }

        .guardrail {
          border-top: 1px solid var(--card-border);
          margin-top: 12px;
          padding-top: 12px;
        }

        .result-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        @media(max-width: 980px) {
          .diagnostic-grid {
            grid-template-columns: 1fr;
          }

          .diagnostic-results {
            position: static;
          }
        }

        @media(max-width: 620px) {
          .diagnostic-page {
            padding: 96px 20px 56px;
          }

          .diagnostic-panel,
          .diagnostic-results {
            padding: 22px 18px;
          }

          .field-row,
          .evidence-grid,
          .segment-group {
            grid-template-columns: 1fr;
          }

          .result-card.primary div,
          .result-list div {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}
