import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LeadGateModal from '../components/LeadGateModal'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { seoPages } from '../lib/seo'

const fmt = n => '$' + Math.round(n).toLocaleString()

export default function Calculator() {
  const router = useRouter()
  const [spend, setSpend] = useState(300000)
  const [size, setSize] = useState('small')
  const [profitable, setProfitable] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)

  const isSmall = size === 'small'
  const offsetRate = isSmall ? 0.435 : 0.385
  const taxRate = isSmall ? 0.25 : 0.30

  const gross = spend * offsetRate
  const lostDeduction = profitable ? spend * taxRate : 0
  const net = gross - lostDeduction
  const fee = Math.max(2500, gross * 0.05)
  const carriedForward = !isSmall && !profitable ? gross : 0
  const currentBenefit = carriedForward > 0 ? 0 : net
  const keep = currentBenefit > 0 ? currentBenefit - fee : 0
  const diagnosticContext = {
    sourcePage: 'calculator',
    turnoverBand: isSmall ? 'under20m' : 'over20m',
    profitable,
    spend,
    totalExpenses: Math.max(spend * 5, 1500000),
    companyTaxRate: taxRate,
    estimate: {
      grossOffset: Math.round(gross),
      currentBenefit: Math.round(currentBenefit),
      carriedForward: Math.round(carriedForward),
      rdkitFee: Math.round(fee),
      estimatedAfterFee: Math.round(keep),
      offsetRate,
    },
  }

  const continueToDiagnostic = async () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(
        'rdkit:diagnostic-prefill',
        JSON.stringify({
          ...diagnosticContext,
          capturedAt: new Date().toISOString(),
        })
      )
    }

    await router.push('/diagnostic?from=calculator')
  }

  return (
    <>
      <SEO page={seoPages.calculator} />

      <Nav />

      <div className="calc-page">
        <div className="calc-hero">
          <div>
            <div className="claim-ai-badge">
              <span className="claim-spark" aria-hidden="true">✦</span>
              AI-assisted claim estimate
            </div>
            <h1>R&D Claim Assist</h1>
            <p>Estimate your offset, understand your cash position, and use AI-assisted discovery to prepare the right evidence for review.</p>
          </div>
          <div className="assist-hero-panel" aria-label="Claim assistant workflow">
            <span>Estimate</span>
            <span>Position</span>
            <span>Evidence</span>
          </div>
        </div>

        <div className="claim-assist-shell">
          <div className="calc-card claim-input-card">
            <div className="assist-card-head">
              <span>01</span>
              <div>
                <h2>Claim inputs</h2>
                <p>Start with the financial position. Run the AI diagnostic after this to test the claim story.</p>
              </div>
            </div>

            <div className="calc-section">
              <div className="calc-tag">// Company profile</div>
              <div className="calc-title">What&rsquo;s your aggregated annual turnover?</div>
              <div className="toggle-group">
                <button
                  className={`toggle-btn${size === 'small' ? ' active' : ''}`}
                  onClick={() => setSize('small')}
                >
                  Under $20M
                  <div style={{ fontSize: '0.72rem', color: 'var(--sage)', marginTop: 3 }}>43.5% offset — refundable</div>
                </button>
                <button
                  className={`toggle-btn${size === 'large' ? ' active' : ''}`}
                  onClick={() => setSize('large')}
                >
                  $20M+
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 3 }}>38.5% offset — non-refundable</div>
                </button>
              </div>
            </div>

            <div className="calc-section">
              <div className="calc-tag">// Tax position</div>
              <div className="calc-title">Is your company currently profitable?</div>
              <div className="toggle-group">
                <button
                  className={`toggle-btn${!profitable ? ' active' : ''}`}
                  onClick={() => setProfitable(false)}
                >
                  No — we&rsquo;re in a loss
                  <div style={{ fontSize: '0.72rem', color: 'var(--sage)', marginTop: 3 }}>
                    {isSmall ? 'Potential cash refund' : 'Offset carried forward'}
                  </div>
                </button>
                <button
                  className={`toggle-btn${profitable ? ' active' : ''}`}
                  onClick={() => setProfitable(true)}
                >
                  Yes — we&rsquo;re profitable
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 3 }}>Applied against tax payable</div>
                </button>
              </div>
              {!profitable && isSmall && (
                <div className="assist-note good">
                  Loss-making companies under $20M may receive the refundable offset as cash after review.
                </div>
              )}
              {!profitable && !isSmall && (
                <div className="assist-note warn">
                  For companies over $20M, this is usually carried forward until tax is payable.
                </div>
              )}
            </div>

            <div className="calc-section">
              <div className="calc-tag">// Annual R&D spend</div>
              <div className="calc-title">How much do you spend on eligible R&D annually?</div>
              <div className="slider-row">
                <span className="left">$50k</span>
                <span className="right">{fmt(spend)}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="10000"
                value={spend}
                onChange={e => setSpend(parseInt(e.target.value))}
              />
            </div>
          </div>

          <aside className="claim-snapshot-card">
            <div className="snapshot-topline">
              <span>Live claim snapshot</span>
              <strong>{isSmall ? 'Refundable' : 'Non-refundable'}</strong>
            </div>

            <div className="snapshot-hero">
              <span>{carriedForward > 0 ? 'Current cash benefit' : 'Estimated current benefit'}</span>
              <strong>{fmt(currentBenefit)}</strong>
              <p>
                {carriedForward > 0
                  ? `${fmt(carriedForward)} may be carried forward until tax is payable.`
                  : `${fmt(keep)} estimated after RDKit fee.`}
              </p>
            </div>

            <div className="snapshot-grid">
              <div>
                <span>Gross offset</span>
                <strong>{fmt(gross)}</strong>
              </div>
              <div>
                <span>Offset rate</span>
                <strong>{isSmall ? '43.5%' : '38.5%'}</strong>
              </div>
              <div>
                <span>RDKit fee</span>
                <strong>-{fmt(fee)}</strong>
              </div>
              <div>
                <span>{carriedForward > 0 ? 'Carried forward' : 'You keep'}</span>
                <strong>{carriedForward > 0 ? fmt(carriedForward) : fmt(keep)}</strong>
              </div>
            </div>

            {profitable && (
              <div className="snapshot-deduction">
                Deduction adjustment: -{fmt(lostDeduction)} at {isSmall ? '25%' : '30%'} company tax rate.
              </div>
            )}

            <div className="assistant-next">
              <span>Next best step</span>
              <p>Start the AI-assisted diagnostic to test eligibility signals and prepare the right evidence list.</p>
              <button
                type="button"
                className="btn btn-primary btn-arrow"
                onClick={() => setGateOpen(true)}
              >
                Run AI claim diagnostic
              </button>
            </div>
          </aside>
        </div>

        <div className="calc-support-grid">
          <div className="breakdown-box">
            <div className="breakdown-title">
              Calculation detail — {isSmall ? 'small' : 'large'} company,{' '}
              {profitable ? 'profitable' : 'loss-making'}
            </div>
            <div className="br-row">
              <span className="br-label">Eligible R&D spend</span>
              <span className="br-val">{fmt(spend)}</span>
            </div>
            <div className="br-row">
              <span className="br-label">ATO offset rate</span>
              <span className="br-val">{isSmall ? '43.5%' : '38.5%'}</span>
            </div>
            <div className="br-row">
              <span className="br-label">Gross ATO offset</span>
              <span className="br-val">{fmt(gross)}</span>
            </div>
            {profitable ? (
              <div className="br-row">
                <span className="br-label">
                  Less {isSmall ? '25%' : '30%'} lost deduction benefit
                </span>
                <span className="br-val">-{fmt(lostDeduction)}</span>
              </div>
            ) : (
              <div className="br-row">
                <span className="br-label">
                  {isSmall
                    ? 'Loss company — refundable offset may be paid as cash'
                    : 'Loss company — non-refundable offset is carried forward'}
                </span>
                <span className="br-val" style={{ color: 'var(--sage)' }}>{carriedForward > 0 ? fmt(carriedForward) : '$0 lost'}</span>
              </div>
            )}
            <div className="br-row">
              <span className="br-label">{carriedForward > 0 ? 'Current cash benefit' : 'Net benefit to you'}</span>
              <span className="br-val">{fmt(currentBenefit)}</span>
            </div>
            <div className="br-row">
              <span className="br-label">RDKit fee estimate</span>
              <span className="br-val">-{fmt(fee)}</span>
            </div>
            <div className="br-row" style={{ fontWeight: 600 }}>
              <span className="br-label" style={{ fontWeight: 600 }}>{carriedForward > 0 ? 'Potential carried-forward offset' : 'You receive'}</span>
              <span className="br-val">{carriedForward > 0 ? fmt(carriedForward) : fmt(keep)}</span>
            </div>
          </div>

          <div className="assistant-explainer">
            <div className="calc-tag">// What the assistant checks next</div>
            <h3>Numbers are only step one.</h3>
            <p><strong>Eligible R&D spend</strong> can include staff time, contractors, cloud infrastructure, consumables, depreciation, and approved overseas expenditure.</p>
            <p>The diagnostic helps turn this estimate into a review-ready evidence list by asking about technical uncertainty, experiments, project records, and cost support.</p>
            <Link href="/eligibility" className="btn btn-outline">Check basic eligibility</Link>
          </div>
        </div>
      </div>

      <LeadGateModal
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        onSuccess={continueToDiagnostic}
        source="claim-assistant-diagnostic-gate"
        context={diagnosticContext}
        title="Start AI claim diagnostic"
        description="We will carry your estimate into the diagnostic and use these details so RDKit can follow up if the claim looks worth reviewing."
        ctaLabel="Continue to AI diagnostic"
      />

      <Footer />
    </>
  )
}
