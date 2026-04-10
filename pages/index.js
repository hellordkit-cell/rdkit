import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const fmt = n => '$' + Math.round(n).toLocaleString()

export default function Home() {
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

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>RDKit — R&D Tax Claims Made Simple for Australian Companies</title>
        <meta name="description" content="RDKit helps Australian companies claim the R&D Tax Incentive at 5% — a fraction of what big consultants charge. Free eligibility quiz." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Nav />

      {/* Hero + Mini Calculator */}
      <div className="home-hero">
        <div className="hero-left">
          <div className="hero-badge">✦ Now open for FY2025-26 claims</div>
          <h1 className="hero-h1">
            Your R&D is<br/>worth more than<br/>you <span className="hl">realise</span>
          </h1>
          <p className="hero-sub">
            We help Australian companies claim the R&D Tax Incentive at 5% of what you recover — not the 15–25% big consulting firms charge. Fast, transparent, expert.
          </p>
          <div className="hero-ctas">
            <Link href="/eligibility" className="btn btn-primary btn-arrow">Take the free quiz</Link>
            <Link href="/how-it-works" className="btn btn-outline">See how it works</Link>
          </div>
          <div className="hero-trust">
            <div className="hero-trust-item">No win, no fee</div>
            <div className="hero-trust-item">2-minute eligibility check</div>
            <div className="hero-trust-item">5+ years R&DTI experience</div>
          </div>
        </div>

        {/* Interactive mini calculator */}
        <div className="mini-calc">
          <div className="mini-calc-title">// Estimate your offset</div>

          <div className="mini-toggle">
            <button
              className={`mini-toggle-btn${size === 'small' ? ' active' : ''}`}
              onClick={() => setSize('small')}
            >Under $20M</button>
            <button
              className={`mini-toggle-btn${size === 'large' ? ' active' : ''}`}
              onClick={() => setSize('large')}
            >$20M+</button>
          </div>

          <div className="mini-calc-label">
            <span>Annual R&D spend</span>
            <strong>{fmt(spend)}</strong>
          </div>
          <input
            type="range" min="50000" max="2000000" step="10000"
            value={spend}
            onChange={e => setSpend(parseInt(e.target.value))}
          />

          <div className="mini-result">
            <div className="mini-result-row">
              <span className="rlabel">Gross offset ({isSmall ? '43.5%' : '38.5%'})</span>
              <span className="rval">{fmt(gross)}</span>
            </div>
            <div className="mini-result-row">
              <span className="rlabel">Less tax deduction benefit</span>
              <span className="rval">-{fmt(taxBenefit)}</span>
            </div>
            <div className="mini-result-row big">
              <span className="rlabel" style={{ fontWeight: 700 }}>Cash you receive</span>
              <span className="rval">{fmt(net)}</span>
            </div>
            <div className="mini-result-row" style={{ paddingTop: 8 }}>
              <span className="rlabel" style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>RDKit fee (5%)</span>
              <span className="rval" style={{ fontSize: '0.85rem', color: 'var(--coral)' }}>{fmt(fee)}</span>
            </div>
          </div>

          <Link href="/calculator" className="mini-calc-link">
            Open full calculator with breakdown →
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="stats-bar fade-up">
        <div className="stats-bar-inner">
          <div className="stat-item">
            <div className="stat-num">$2M+</div>
            <div className="stat-label">Total offsets claimed</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">100%</div>
            <div className="stat-label">First-submission success rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">5yr+</div>
            <div className="stat-label">R&DTI expertise</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">5%</div>
            <div className="stat-label">Our fee. Not 15–25%.</div>
          </div>
        </div>
      </div>

      {/* How it works — summary */}
      <div className="home-process fade-up">
        <div className="section-header">
          <div className="section-tag">// How it works</div>
          <h2 className="section-h2">Simple process. No surprises.</h2>
          <p className="section-sub">From first conversation to money in your account — here&rsquo;s what working with RDKit looks like.</p>
        </div>
        <div className="process-row">
          <div className="process-card">
            <div className="process-num">01 — Free</div>
            <h4>Check eligibility</h4>
            <p>Take our 2-minute quiz or book a call. We&rsquo;ll tell you honestly if you&rsquo;re likely eligible and estimate your offset.</p>
          </div>
          <div className="process-card">
            <div className="process-num">02 — Week 1</div>
            <h4>Strategy session</h4>
            <p>45-minute deep dive. We map your R&D activities against AusIndustry criteria and scope your claim.</p>
          </div>
          <div className="process-card">
            <div className="process-num">03 — Weeks 2–5</div>
            <h4>We build the claim</h4>
            <p>Project descriptions, expenditure analysis, and everything needed. You review; we refine.</p>
          </div>
          <div className="process-card">
            <div className="process-num">04 — Outcome</div>
            <h4>Offset hits your account</h4>
            <p>You pay 5% of what you recover. That&rsquo;s it. No upfront costs, no hidden fees.</p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href="/how-it-works" className="btn btn-outline">Full process breakdown →</Link>
        </div>
      </div>

      {/* Industries */}
      <div className="home-industries fade-up">
        <div className="industries-inner">
          <div className="section-header">
            <div className="section-tag">// Industries we serve</div>
            <h2 className="section-h2">We speak your language</h2>
            <p className="section-sub">R&D looks different in every industry. We&rsquo;ve worked across them all.</p>
          </div>
          <div className="industries-grid">
            <div className="industry-card">
              <div className="industry-icon">💻</div>
              <h4>Software / SaaS / AI</h4>
              <p>ML models, novel algorithms, APIs with genuine technical uncertainty.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">🧬</div>
              <h4>Biotech / Medtech</h4>
              <p>New compounds, diagnostic devices, experimental treatments.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">⚙️</div>
              <h4>Manufacturing</h4>
              <p>New processes, advanced materials, engineering with uncertainty.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">🌾</div>
              <h4>AgTech & CleanTech</h4>
              <p>Precision agriculture, energy systems, environmental innovation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="home-testimonials fade-up">
        <div className="section-header">
          <div className="section-tag">// What clients say</div>
          <h2 className="section-h2">Real results from real companies</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial">
            <div className="t-stars">★★★★★</div>
            <p className="t-quote">&ldquo;Kay knew the AusIndustry framework inside out. Our PDs were thorough but clear. We got approved on the first submission — no back-and-forth.&rdquo;</p>
            <div className="t-author">Sarah Chen</div>
            <div className="t-role">Founder, AI Logistics SaaS · Melbourne</div>
          </div>
          <div className="testimonial">
            <div className="t-stars">★★★★★</div>
            <p className="t-quote">&ldquo;We thought we&rsquo;d only qualify for $40k. RDKit found $94k of eligible spend we didn&rsquo;t even know about. More than doubled what we expected.&rdquo;</p>
            <div className="t-author">James Wilson</div>
            <div className="t-role">CFO, Medtech · Sydney</div>
          </div>
          <div className="testimonial">
            <div className="t-stars">★★★★★</div>
            <p className="t-quote">&ldquo;5% fee compared to the 22% another firm quoted. And honestly, the service was more thorough. I still can&rsquo;t believe we didn&rsquo;t find this earlier.&rdquo;</p>
            <div className="t-author">Tom Harrison</div>
            <div className="t-role">CEO, Manufacturing Startup · Brisbane</div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="home-cta fade-up">
        <div className="cta-card">
          <div className="tag tag-coral" style={{ marginBottom: 20, display: 'inline-flex' }}>Free. No commitment.</div>
          <h2>Find out what your R&D is really worth</h2>
          <p>Take our 2-minute eligibility quiz and get an instant estimate. No sign-up, no spam, no obligation.</p>
          <div className="cta-btns">
            <Link href="/eligibility" className="btn-white btn-arrow">Take the free quiz</Link>
            <Link href="/for-accountants" className="btn-white-outline">Are you an accountant? →</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
