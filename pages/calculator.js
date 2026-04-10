import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const fmt = n => '$' + Math.round(n).toLocaleString()

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
        <meta name="description" content="Instantly estimate your Australian R&D tax offset. Real-time calculator — no sign-up needed." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Nav />

      <div className="calc-page">
        <div className="calc-hero">
          <div className="tag tag-cyan" style={{ marginBottom: 16 }}>Estimate your offset</div>
          <h1>R&D Tax Offset Calculator</h1>
          <p>Adjust your R&D spend and company size for an instant estimate. Detailed breakdown included.</p>
        </div>

        <div className="calc-card">
          <div className="calc-section">
            <div className="calc-tag">// Company size</div>
            <div className="calc-title">What&rsquo;s your aggregated annual turnover?</div>
            <div className="toggle-group">
              <button className={`toggle-btn${size === 'small' ? ' active' : ''}`} onClick={() => setSize('small')}>
                Under $20M
                <div style={{ fontSize: '0.72rem', color: 'var(--sage)', marginTop: 3 }}>43.5% offset — refundable</div>
              </button>
              <button className={`toggle-btn${size === 'large' ? ' active' : ''}`} onClick={() => setSize('large')}>
                $20M+
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 3 }}>38.5% offset — non-refundable</div>
              </button>
            </div>
          </div>

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

          <div className="results-box">
            <div className="result-row">
              <span className="rl">Your R&D spend</span>
              <span className="rv">{fmt(spend)}</span>
            </div>
            <div className="result-row">
              <span className="rl">Gross offset ({isSmall ? '43.5%' : '38.5%'})</span>
              <span className="rv">{fmt(gross)}</span>
            </div>
            <div className="result-row">
              <span className="rl">Less tax deduction benefit ({isSmall ? '25%' : '30%'})</span>
              <span className="rv">-{fmt(taxBenefit)}</span>
            </div>
            <div className="result-row">
              <span className="rl">Net cash benefit</span>
              <span className="rv big">{fmt(net)}</span>
            </div>
            <div className="result-row">
              <span className="rl" style={{ color: 'var(--muted)' }}>RDKit fee (5% + $500)</span>
              <span className="rv" style={{ fontSize: '0.95rem', color: 'var(--coral)' }}>{fmt(fee)}</span>
            </div>
            <div className="result-row result-divider">
              <span className="rl" style={{ fontWeight: 700 }}>You keep</span>
              <span className="rv big" style={{ fontSize: '1.4rem' }}>{fmt(keep)}</span>
            </div>
          </div>

          <div className="breakdown-box">
            <div className="breakdown-title">How we calculate this — {isSmall ? 'small' : 'large'} company</div>
            <div className="br-row"><span className="br-label">R&D spend</span><span className="br-val">{fmt(spend)}</span></div>
            <div className="br-row"><span className="br-label">Offset rate</span><span className="br-val">{isSmall ? '43.5%' : '38.5%'}</span></div>
            <div className="br-row"><span className="br-label">Gross offset</span><span className="br-val">{fmt(gross)}</span></div>
            <div className="br-row"><span className="br-label">Less {isSmall ? '25%' : '30%'} tax rate benefit (you&rsquo;d have deducted this anyway)</span><span className="br-val">-{fmt(taxBenefit)}</span></div>
            <div className="br-row"><span className="br-label">Net cash to you</span><span className="br-val">{fmt(net)}</span></div>
            <div className="br-row"><span className="br-label">RDKit fee (5% of net + $500)</span><span className="br-val">{fmt(fee)}</span></div>
            <div className="br-row" style={{ fontWeight: 600 }}><span className="br-label" style={{ fontWeight: 600 }}>You receive</span><span className="br-val">{fmt(keep)}</span></div>
          </div>

          <div className="calc-disclaimer">
            <p>⚠️ <strong>This is an estimate.</strong> Actual amounts depend on eligible expenditure verified by AusIndustry, your specific R&D activities, and your tax position. Let&rsquo;s get a precise figure.</p>
            <Link href="/eligibility" className="btn btn-primary btn-arrow">Get your actual estimate — free</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
