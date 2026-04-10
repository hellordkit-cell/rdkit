import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const fmt = n => '$' + n.toLocaleString()

export default function Calculator() {
  const [spend, setSpend] = useState(300000)
  const [size, setSize] = useState('small')

  const isSmall = size === 'small'
  const offsetRate = isSmall ? 0.435 : 0.385
  const taxRate = isSmall ? 0.25 : 0.30

  const gross = Math.round(spend * offsetRate)
  const taxBenefit = Math.round(spend * taxRate)
  const net = gross - taxBenefit
  const fee = Math.max(2500, Math.round(net * 0.05) + 500)
  const keep = net - fee

  return (
    <>
      <Head>
        <title>R&D Tax Offset Calculator — RDKit</title>
        <meta name="description" content="See exactly how much Australian R&D tax offset you could claim. Interactive calculator for instant estimates." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo">
            <div className="logo-mark">RD</div>
            <div className="logo-text">rd<span>kit</span></div>
          </Link>
          <Link href="/eligibility" className="btn btn-primary">Check eligibility</Link>
        </div>
      </nav>

      <main className="calc-main">
        <div className="calc-hero">
          <h1>R&D Tax Offset Calculator</h1>
          <p>Slide your R&D spend and see your estimated offset in real-time. No guessing, no complexity.</p>
        </div>

        <div className="calc-container">
          <div className="calc-section">
            <div className="calc-label">// Company size</div>
            <div className="calc-title">What&rsquo;s your aggregated turnover?</div>
            <div className="toggle-group">
              <button
                className={`toggle-btn${size === 'small' ? ' active' : ''}`}
                onClick={() => setSize('small')}
              >
                Under $20M
                <div style={{ fontSize: '0.75rem', color: 'var(--sage)', marginTop: '2px' }}>43.5% offset (refundable)</div>
              </button>
              <button
                className={`toggle-btn${size === 'large' ? ' active' : ''}`}
                onClick={() => setSize('large')}
              >
                $20M+
                <div style={{ fontSize: '0.75rem', color: 'var(--coral)', marginTop: '2px' }}>38.5% offset (non-refundable)</div>
              </button>
            </div>
          </div>

          <div className="calc-section">
            <div className="calc-label">// R&D Spend</div>
            <div className="calc-title">How much do you spend on R&D annually?</div>
            <div className="slider-group">
              <div className="slider-label">
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

          <div className="results">
            <div className="result-row">
              <span className="result-label">Your R&D spend</span>
              <span className="result-value">{fmt(spend)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Estimated gross offset</span>
              <span className="result-value">{fmt(gross)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Less tax benefit already taken</span>
              <span className="result-value">-{fmt(taxBenefit)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Net cash benefit</span>
              <span className="result-value big">{fmt(net)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">RDKit fee (5% + $500)</span>
              <span className="result-value" style={{ color: 'var(--coral)' }}>{fmt(fee)}</span>
            </div>
            <div className="result-row" style={{ borderBottom: 'none', marginTop: '8px', paddingTop: '16px', borderTop: '2px solid rgba(255,255,255,0.3)' }}>
              <span className="result-label" style={{ fontWeight: 700 }}>You keep</span>
              <span className="result-value big" style={{ fontSize: '1.6rem' }}>{fmt(keep)}</span>
            </div>
          </div>

          <div className="breakdown">
            <div className="breakdown-title">
              How we calculate this ({isSmall ? 'Small company' : 'Large company'})
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Your R&D spend</span>
              <span className="breakdown-value">{fmt(spend)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Offset rate ({isSmall ? 'small' : 'large'} company)</span>
              <span className="breakdown-value">{isSmall ? '43.5%' : '38.5%'}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Gross offset</span>
              <span className="breakdown-value">{fmt(gross)}</span>
            </div>
            <div className="breakdown-row" style={{ borderBottom: '2px solid var(--card-border)', paddingTop: '16px' }}>
              <span className="breakdown-label">Less your {isSmall ? '25%' : '30%'} tax rate benefit</span>
              <span className="breakdown-value">-{fmt(taxBenefit)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Net to you</span>
              <span className="breakdown-value">{fmt(net)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">RDKit fee (5% of offset + $500)</span>
              <span className="breakdown-value">{fmt(fee)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label" style={{ fontWeight: 600 }}>Final amount you receive</span>
              <span className="breakdown-value" style={{ fontWeight: 600 }}>{fmt(keep)}</span>
            </div>
          </div>

          <div className="calc-cta">
            <p>⚠️ <strong>This is an estimate.</strong> Actual amounts depend on eligible expenditure, your specific R&D activities, and AusIndustry&rsquo;s assessment. Let&rsquo;s get a precise figure.</p>
            <Link href="/eligibility" className="btn btn-primary btn-arrow">Get your actual estimate </Link>
          </div>
        </div>
      </main>

      <footer style={{ marginTop: '60px' }}>
        <div className="footer-inner">
          <div className="footer-logo">rd<span>kit</span></div>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/eligibility">Quiz</Link></li>
            <li><Link href="/rdti-program">R&DTI Guide</Link></li>
          </ul>
          <div className="footer-copy">&copy; 2026 RDKit</div>
        </div>
      </footer>
    </>
  )
}
