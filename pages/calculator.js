import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const fmt = n => '$' + Math.round(n).toLocaleString()

export default function Calculator() {
  const [spend, setSpend]         = useState(300000)
  const [size, setSize]           = useState('small')
  const [profitable, setProfitable] = useState(false)

  const isSmall    = size === 'small'
  const offsetRate = isSmall ? 0.435 : 0.385
  const taxRate    = isSmall ? 0.25  : 0.30

  // Gross offset = what ATO pays out / applies
  const gross = spend * offsetRate

  // Net benefit depends on tax position:
  // - Profitable: offset replaces deduction, so net = gross - lost deduction
  // - Loss: full offset is cash refund, no deduction value anyway
  const lostDeduction = profitable ? spend * taxRate : 0
  const net = gross - lostDeduction

  // Fee = 5% of gross ATO offset, min $2,500
  const fee  = Math.max(2500, gross * 0.05)
  const keep = net - fee

  return (
    <>
      <Head>
        <title>R&D Tax Offset Calculator — RDKit</title>
        <meta name="description" content="Instantly estimate your Australian R&D tax offset. Real-time calculator — no sign-up needed." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Nav />

      <div className="calc-page">
        <div className="calc-hero">
          <div className="tag tag-cyan" style={{ marginBottom: 16 }}>Estimate your offset</div>
          <h1>R&D Tax Offset Calculator</h1>
          <p>Adjust your R&D spend, company size, and tax position for an accurate estimate.</p>
        </div>

        <div className="calc-card">

          {/* Company size */}
          <div className="calc-section">
            <div className="calc-tag">// Company size</div>
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

          {/* Tax position */}
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
                  {isSmall ? 'Full 43.5% paid as cash refund' : 'Offset carried forward until profitable'}
                </div>
              </button>
              <button
                className={`toggle-btn${profitable ? ' active' : ''}`}
                onClick={() => setProfitable(true)}
              >
                Yes — we&rsquo;re profitable
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 3 }}>Offset applied against tax payable</div>
              </button>
            </div>
            {!profitable && isSmall && (
              <div style={{ marginTop: 12, background: 'rgba(78,203,160,0.08)', border: '1px solid rgba(78,203,160,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: '0.82rem', color: 'var(--sage)' }}>
                ✓ Great news — loss-making companies under $20M get the <strong>full 43.5% as a direct cash refund</strong> from the ATO. No tax payable required.
              </div>
            )}
            {!profitable && !isSmall && (
              <div style={{ marginTop: 12, background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: '0.82rem', color: 'var(--amber)' }}>
                ⚠ For companies over $20M, the offset is non-refundable — it&rsquo;s applied against tax payable and carried forward if in a loss.
              </div>
            )}
          </div>

          {/* Spend slider */}
          <div className="calc-section">
            <div className="calc-tag">// Annual R&D spend</div>
            <div className="calc-title">How much do you spend on eligible R&D annually?</div>
            <div className="slider-row">
              <span className="left">$50k</span>
              <span className="right">{fmt(spend)}</span>
            </div>
            <input
              type="range" min="50000" max="2000000" step="10000"
              value={spend} onChange={e => setSpend(parseInt(e.target.value))}
            />
          </div>

          {/* Results */}
          <div className="results-box">
            <div className="result-row">
              <span className="rl">Your eligible R&D spend</span>
              <span className="rv">{fmt(spend)}</span>
            </div>
            <div className="result-row">
              <span className="rl">ATO tax offset ({isSmall ? '43.5%' : '38.5%'})</span>
              <span className="rv">{fmt(gross)}</span>
            </div>
            {profitable && (
              <div className="result-row">
                <span className="rl">Less: lost tax deduction ({isSmall ? '25%' : '30%'})</span>
                <span className="rv" style={{ color: 'var(--muted)' }}>-{fmt(lostDeduction)}</span>
              </div>
            )}
            <div className="result-row">
              <span className="rl">
                {profitable
                  ? 'Net cash benefit'
                  : isSmall
                    ? 'Cash refund from ATO (full offset)'
                    : 'Offset applied against tax payable'}
              </span>
              <span className="rv big">{fmt(net)}</span>
            </div>
            <div className="result-row">
              <span className="rl" style={{ color: 'var(--muted)' }}>RDKit fee (5% of ATO offset)</span>
              <span className="rv" style={{ fontSize: '0.95rem', color: 'var(--coral)' }}>-{fmt(fee)}</span>
            </div>
            <div className="result-row result-divider">
              <span className="rl" style={{ fontWeight: 700 }}>You keep</span>
              <span className="rv big" style={{ fontSize: '1.4rem' }}>{fmt(keep)}</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="breakdown-box">
            <div className="breakdown-title">
              How we calculate this — {isSmall ? 'small' : 'large'} company,{' '}
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
                  Less {isSmall ? '25%' : '30%'} lost deduction benefit (the R&DTI replaces your normal deduction)
                </span>
                <span className="br-val">-{fmt(lostDeduction)}</span>
              </div>
            ) : (
              <div className="br-row">
                <span className="br-label">
                  {isSmall
                    ? 'Loss company — full offset paid as cash refund, no deduction lost'
                    : 'Loss company — offset carried forward, applied when profitable'}
                </span>
                <span className="br-val" style={{ color: 'var(--sage)' }}>$0 lost</span>
              </div>
            )}
            <div className="br-row">
              <span className="br-label">Net benefit to you</span>
              <span className="br-val">{fmt(net)}</span>
            </div>
            <div className="br-row">
              <span className="br-label">RDKit fee (5% of gross ATO offset, min. $2,500)</span>
              <span className="br-val">-{fmt(fee)}</span>
            </div>
            <div className="br-row" style={{ fontWeight: 600 }}>
              <span className="br-label" style={{ fontWeight: 600 }}>You receive</span>
              <span className="br-val">{fmt(keep)}</span>
            </div>
          </div>

          {/* Context note */}
          <div style={{ background: 'var(--bg-alt)', borderRadius: 14, padding: '16px 20px', marginTop: 8, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--charcoal)' }}>What counts as eligible R&D spend?</strong> Salaries of staff working on R&D, contractor costs, cloud computing and hosting, consumables, depreciation on R&D equipment, and approved overseas expenditure. Most tech, product development, and engineering costs qualify.
          </div>

          <div className="calc-disclaimer">
            <p>⚠️ <strong>This is an estimate.</strong> Actual amounts depend on eligible expenditure verified by AusIndustry, your specific R&D activities, and your tax position. Let&rsquo;s get your precise figure.</p>
            <Link href="/eligibility" className="btn btn-primary btn-arrow">Get your actual estimate — free</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
