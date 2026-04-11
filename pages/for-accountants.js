import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function ForAccountants() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>For Accountants — RDKit R&DTI Consultant</title>
        <meta name="description" content="Engage RDKit as your specialist R&DTI consultant. We write project descriptions and prepare the financial analysis. You lodge everything for your client — AusIndustry and ATO." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Nav />

      {/* Hero */}
      <div className="acct-hero fade-up">
        <div className="tag tag-purple" style={{ marginBottom: 20 }}>For accounting firms</div>
        <h1>Engage RDKit as your R&DTI specialist. You stay in control.</h1>
        <p>Your client needs an R&D Tax Incentive claim. You handle their tax affairs. We handle the R&DTI-specific work — project descriptions and financial analysis. You lodge everything for your client. Simple, clean, and entirely within your existing workflow.</p>
        <div className="hero-ctas">
          <a href="mailto:hellordkit@gmail.com" className="btn btn-primary">Engage us for a client</a>
          <Link href="/how-it-works" className="btn btn-outline">See how claims work</Link>
        </div>
      </div>

      {/* How this works - the core model */}
      <div className="acct-section fade-up">
        <div className="section-tag">// The model</div>
        <h2 className="section-h2">You engage RDKit as your R&DTI consultant. You lodge for your client.</h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 720, marginBottom: 48 }}>
          Think of us as the specialist you bring in for the R&DTI technical work — the same way you might engage a valuation specialist or a transfer pricing advisor. We do the R&DTI documentation. You handle the lodgements. Your client relationship stays entirely yours.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, maxWidth: 960, margin: '0 auto' }}>
          <div style={{ background: 'rgba(255,107,84,0.05)', border: '1.5px solid rgba(255,107,84,0.2)', borderRadius: 20, padding: '32px 24px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--coral)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Step 1 — RDKit</div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 12 }}>We prepare the technical work</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                'Interview your client on their R&D activities',
                'Write all project descriptions (PDs)',
                'Conduct financial analysis & eligible expenditure mapping',
                'Prepare the complete AusIndustry application',
                'Prepare the R&D Tax Offset Schedule',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'var(--dark)', paddingLeft: 20, position: 'relative', lineHeight: 1.5 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--coral)', fontWeight: 700 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'rgba(155,127,255,0.05)', border: '1.5px solid rgba(155,127,255,0.2)', borderRadius: 20, padding: '32px 24px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--purple)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Step 2 — You</div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 12 }}>You lodge everything for your client</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                'Review and approve the prepared application',
                'Lodge the AusIndustry application on behalf of your client',
                'Include the R&D Tax Offset Schedule in their tax return',
                'Lodge the income tax return as normal',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'var(--dark)', paddingLeft: 20, position: 'relative', lineHeight: 1.5 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--purple)', fontWeight: 700 }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic', marginTop: 20, marginBottom: 0, lineHeight: 1.6 }}>
              As the registered tax agent, you lodge both the AusIndustry registration and the ATO return for your client. We hand you everything ready to go.
            </p>
          </div>

          <div style={{ background: 'rgba(78,203,160,0.05)', border: '1.5px solid rgba(78,203,160,0.2)', borderRadius: 20, padding: '32px 24px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Result</div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 12 }}>Your client gets the offset. You earn more.</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                'Client recovers 43.5% or 38.5% of eligible R&D spend',
                'You charge your normal tax return fee',
                'You earn a referral fee from RDKit on top',
                'No new expertise required on your end',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'var(--dark)', paddingLeft: 20, position: 'relative', lineHeight: 1.5 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--sage)', fontWeight: 700 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Why it matters */}
      <div className="acct-section alt fade-up">
        <div className="acct-inner">
          <div className="section-tag">// The opportunity</div>
          <h2 className="section-h2">Most of your SME clients probably qualify. Most won&rsquo;t claim.</h2>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 700, marginBottom: 40 }}>
            The Australian R&D Tax Incentive is claimed by fewer than 15,000 companies annually — despite tens of thousands more being eligible. The gap is R&DTI expertise. You bring the client relationship. We bring the specialist knowledge.
          </p>
          <div className="acct-why">
            <div className="acct-why-card">
              <div className="icon">💰</div>
              <h4>Additional revenue per client</h4>
              <p>Earn a referral fee on every claim, on top of your normal tax return fee. An average claim returns $60–120k to your client — and a meaningful fee to your practice.</p>
            </div>
            <div className="acct-why-card">
              <div className="icon">🤝</div>
              <h4>You stay in control</h4>
              <p>You engage us, we report to you, you lodge for your client. Your client relationship is entirely yours. We&rsquo;re your behind-the-scenes R&DTI specialist — not a competitor.</p>
            </div>
            <div className="acct-why-card">
              <div className="icon">🎯</div>
              <h4>No R&DTI expertise required</h4>
              <p>You don&rsquo;t need to know AusIndustry criteria or write project descriptions. That&rsquo;s exactly what RDKit is for. You assess tax. We assess R&D.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement tiers */}
      <div className="acct-section fade-up">
        <div className="section-tag">// Engagement options</div>
        <h2 className="section-h2">How you engage RDKit for your clients</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 580, marginBottom: 40 }}>
          Two ways to work together depending on your involvement level. No lock-in, no exclusivity.
        </p>

        <div className="partner-tiers">
          {/* Referral */}
          <div className="tier-card">
            <div className="tier-icon" style={{ background: 'rgba(0,180,216,0.08)' }}>📋</div>
            <div className="tier-tag">// Option 1</div>
            <h3>Consultant Engagement</h3>
            <p className="tier-desc">
              You engage RDKit to prepare all R&DTI documentation for your client. We deliver the complete package — PDs, financial analysis, AusIndustry application, and ATO schedule — ready for you to lodge.
            </p>
            <ul className="tier-features">
              <li>RDKit interviews your client on R&D activities</li>
              <li>Full project description writing</li>
              <li>Financial analysis & expenditure mapping</li>
              <li>Complete AusIndustry application prepared</li>
              <li>R&D Tax Offset Schedule prepared for ATO</li>
              <li>You lodge AusIndustry + tax return for client</li>
            </ul>
            <div className="tier-earn">Your referral fee: 15% of RDKit&rsquo;s fee, paid to you on claim completion</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 20, lineHeight: 1.5 }}>
              Example: Client recovers $80k → RDKit fee ~$4,000 → you earn $600, plus your own tax return fee.
            </div>
            <a href="mailto:hellordkit@gmail.com" className="btn btn-outline">Engage for a client →</a>
          </div>

          {/* Active */}
          <div className="tier-card featured">
            <div className="tier-badge">Most popular</div>
            <div className="tier-icon" style={{ background: 'rgba(255,107,84,0.08)' }}>⚡</div>
            <div className="tier-tag">// Option 2</div>
            <h3>Active Engagement</h3>
            <p className="tier-desc">
              You stay actively involved — sharing financial data directly, attending client review sessions, and co-presenting the claim. Higher involvement, higher referral share.
            </p>
            <ul className="tier-features">
              <li>Everything in Consultant Engagement</li>
              <li>You share financial records directly with RDKit</li>
              <li>Joint review sessions with your client</li>
              <li>Branded engagement letter option</li>
              <li>Priority turnaround for your clients</li>
              <li>Quarterly R&DTI briefings to keep you current</li>
              <li>Higher referral fee for active involvement</li>
            </ul>
            <div className="tier-earn">Your referral fee: 20–25% of RDKit&rsquo;s fee + your own tax return fee</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 20, lineHeight: 1.5 }}>
              Example: Client recovers $80k → RDKit fee ~$4,000 → you earn $800–1,000, plus your own fee.
            </div>
            <a href="mailto:hellordkit@gmail.com" className="btn btn-primary">Engage for a client →</a>
          </div>
        </div>
      </div>

      {/* Step by step */}
      <div className="acct-section alt fade-up">
        <div className="acct-inner">
          <div className="section-tag">// Step by step</div>
          <h2 className="section-h2">From first conversation to completed claim</h2>
          <div className="acct-how">
            <div className="acct-step">
              <div className="acct-step-num">01</div>
              <h4>You identify an eligible client</h4>
              <p>Use our one-page screening checklist. Most software, biotech, engineering or manufacturing clients doing any product or process development will qualify.</p>
            </div>
            <div className="acct-step">
              <div className="acct-step-num">02</div>
              <h4>You engage RDKit</h4>
              <p>Email us at hellordkit@gmail.com with the client details. We confirm eligibility, agree on scope, and your client pays the $500 deposit to kick off the work.</p>
            </div>
            <div className="acct-step">
              <div className="acct-step-num">03</div>
              <h4>RDKit prepares everything</h4>
              <p>We interview the client, write the project descriptions, map eligible expenditure, and prepare the full AusIndustry application and ATO R&D schedule. You review and approve before anything is finalised.</p>
            </div>
            <div className="acct-step">
              <div className="acct-step-num">04</div>
              <h4>You lodge, client receives offset</h4>
              <p>You lodge the AusIndustry application and include the R&D Tax Offset Schedule in the client&rsquo;s tax return. The refundable offset (for companies under $20M) pays directly to your client. Your referral fee is paid to you within 14 days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Who it's for */}
      <div className="acct-section fade-up">
        <div className="section-tag">// Who this is for</div>
        <h2 className="section-h2">Ideal for practices that work with innovators</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 680, marginBottom: 36 }}>
          You don&rsquo;t need to be a Big 4 firm. Boutique and mid-market practices make our best partners — closer client relationships mean more opportunities spotted.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { icon: '💼', title: 'SME-focused practices', desc: 'Clients with $1M–$20M turnover doing any form of product development, engineering or process improvement.' },
            { icon: '🖥️', title: 'Tech-sector accountants', desc: 'Software companies, SaaS businesses, AI startups — virtually all building novel technology will qualify.' },
            { icon: '🏭', title: 'Manufacturing & engineering', desc: 'Clients with R&D spend in new processes, materials, equipment modification or industrial innovation.' },
          ].map((c, i) => (
            <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 18, padding: '28px 24px' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: 12 }}>{c.icon}</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{c.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="acct-section alt fade-up">
        <div className="acct-cta">
          <div className="tag tag-purple" style={{ marginBottom: 20 }}>Ready to engage?</div>
          <h2>Tell us about your client</h2>
          <p>Email us with a brief description of your client&rsquo;s business and R&D activities. We&rsquo;ll confirm eligibility within 48 hours — no commitment required.</p>
          <a href="mailto:hellordkit@gmail.com" className="btn btn-primary btn-arrow">Email us at hellordkit@gmail.com</a>
        </div>
      </div>

      <Footer />
    </>
  )
}
