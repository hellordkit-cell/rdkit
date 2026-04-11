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
        <title>For Accountants — RDKit Partner Program</title>
        <meta name="description" content="Partner with RDKit to offer R&D Tax Incentive claims to your clients. We handle the documentation and analysis. You handle the tax return. Earn revenue share with no R&D expertise required." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Nav />

      {/* Hero */}
      <div className="acct-hero fade-up">
        <div className="tag tag-purple" style={{ marginBottom: 20 }}>For accounting firms</div>
        <h1>Your clients are leaving R&D money on the table. You can fix that.</h1>
        <p>Partner with RDKit and offer expert R&D Tax Incentive claims to your clients. We handle the documentation and technical analysis. You handle what you already do — the tax return. Clean, legal, and profitable for your practice.</p>
        <div className="hero-ctas">
          <a href="mailto:hellordkit@gmail.com" className="btn btn-primary">Apply to partner</a>
          <Link href="/how-it-works" className="btn btn-outline">See how claims work</Link>
        </div>
      </div>

      {/* Role clarity */}
      <div className="acct-section fade-up">
        <div className="section-tag">// How the split works</div>
        <h2 className="section-h2">Clear roles. No overlap. No conflict.</h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 680, marginBottom: 40 }}>
          The R&D Tax Incentive process has two distinct parts. RDKit handles one. You handle the other. This is legally clean and operationally simple.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 860, margin: '0 auto' }}>
          <div style={{ background: 'rgba(255,107,84,0.05)', border: '1.5px solid rgba(255,107,84,0.2)', borderRadius: 20, padding: '32px 28px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--coral)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>RDKit handles</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, margin: 0, padding: 0 }}>
              {[
                'R&D activity interviews with your client',
                'Writing project descriptions (PDs)',
                'Financial analysis & eligible expenditure mapping',
                'Full AusIndustry application preparation',
                'Guiding client through portal submission',
                'Preparing the R&D Tax Offset Schedule for you'
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'var(--dark)', paddingLeft: 22, position: 'relative', lineHeight: 1.5 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--coral)', fontWeight: 700 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'rgba(155,127,255,0.05)', border: '1.5px solid rgba(155,127,255,0.2)', borderRadius: 20, padding: '32px 28px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--purple)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>You handle (as registered tax agent)</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, margin: 0, padding: 0 }}>
              {[
                'Lodging the client\'s income tax return',
                'Including the R&D Tax Offset Schedule (we prepare this)',
                'Any ATO correspondence post-lodgement',
                'Your existing client relationship — unchanged'
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'var(--dark)', paddingLeft: 22, position: 'relative', lineHeight: 1.5 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--purple)', fontWeight: 700 }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic', marginTop: 20, marginBottom: 0, lineHeight: 1.6 }}>
              The AusIndustry registration is lodged by the client (company director) via myGovID — not you, not us. This keeps everything legally clean.
            </p>
          </div>
        </div>
      </div>

      {/* Why it matters */}
      <div className="acct-section alt fade-up">
        <div className="acct-inner">
          <div className="section-tag">// The opportunity</div>
          <h2 className="section-h2">Most of your SME clients probably qualify. Most won&rsquo;t claim.</h2>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 700, marginBottom: 40 }}>
            The Australian R&D Tax Incentive is claimed by fewer than 15,000 companies annually — despite tens of thousands more being eligible. The gap is expertise and accessibility. That&rsquo;s where you come in.
          </p>
          <div className="acct-why">
            <div className="acct-why-card">
              <div className="icon">💰</div>
              <h4>New revenue for your practice</h4>
              <p>Earn a revenue share on every claim you refer. An average claim returns $60–120k to your client — and a meaningful referral fee to you, on top of your existing tax return fee.</p>
            </div>
            <div className="acct-why-card">
              <div className="icon">🤝</div>
              <h4>You keep the relationship</h4>
              <p>We work behind the scenes. Your client&rsquo;s primary contact remains you. You refer the R&D work; we do it. You stay the trusted advisor.</p>
            </div>
            <div className="acct-why-card">
              <div className="icon">🎯</div>
              <h4>No R&D expertise required</h4>
              <p>You don&rsquo;t need to know AusIndustry criteria or write project descriptions. That&rsquo;s our job. You identify the opportunity; we handle the technical R&D work.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partner tiers */}
      <div className="acct-section fade-up">
        <div className="section-tag">// Partnership tiers</div>
        <h2 className="section-h2">Choose how you want to work with us</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 580, marginBottom: 40 }}>
          Two models depending on how involved you want to be. No exclusivity, no lock-in. Cancel anytime.
        </p>

        <div className="partner-tiers">
          {/* Referral */}
          <div className="tier-card">
            <div className="tier-icon" style={{ background: 'rgba(0,180,216,0.08)' }}>📨</div>
            <div className="tier-tag">// Tier 1</div>
            <h3>Referral Partner</h3>
            <p className="tier-desc">
              You identify eligible clients and refer them to RDKit. We handle the full R&D documentation and analysis. You lodge their tax return as normal and include our prepared R&D schedule.
            </p>
            <ul className="tier-features">
              <li>Refer clients via a simple form or warm intro</li>
              <li>RDKit handles all R&D documentation</li>
              <li>We prepare the R&D Tax Offset Schedule for you</li>
              <li>You lodge the tax return as usual</li>
              <li>Monthly revenue share payments</li>
              <li>Eligibility screening checklist provided</li>
            </ul>
            <div className="tier-earn">You earn: 15% of RDKit&rsquo;s fee on every referred claim</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 20, lineHeight: 1.5 }}>
              Example: Client recovers $80k offset → RDKit fee ~$4,000 → you earn $600 per claim, plus your own tax return fee.
            </div>
            <a href="mailto:hellordkit@gmail.com" className="btn btn-outline">Apply free →</a>
          </div>

          {/* Co-claim */}
          <div className="tier-card featured">
            <div className="tier-badge">Most popular</div>
            <div className="tier-icon" style={{ background: 'rgba(255,107,84,0.08)' }}>⚡</div>
            <div className="tier-tag">// Tier 2</div>
            <h3>Active Partner</h3>
            <p className="tier-desc">
              More involvement, more earning. You stay actively engaged throughout the claim — attending client reviews, sharing financial data directly, and co-presenting the finished claim.
            </p>
            <ul className="tier-features">
              <li>Everything in Referral Partner</li>
              <li>You share financial data directly with RDKit</li>
              <li>Joint client review meetings</li>
              <li>Branded engagement letter option</li>
              <li>Quarterly R&DTI briefings</li>
              <li>Priority turnaround for your clients</li>
              <li>Higher revenue share for active involvement</li>
            </ul>
            <div className="tier-earn">You earn: 20–25% of RDKit&rsquo;s fee + your own tax return fee</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 20, lineHeight: 1.5 }}>
              Example: Client recovers $80k offset → RDKit fee ~$4,000 → you earn $800–1,000 per claim, plus your normal fee.
            </div>
            <a href="mailto:hellordkit@gmail.com" className="btn btn-primary">Apply to partner →</a>
          </div>
        </div>
      </div>

      {/* How it works for accountants */}
      <div className="acct-section alt fade-up">
        <div className="acct-inner">
          <div className="section-tag">// How it works</div>
          <h2 className="section-h2">Four steps from referral to payment</h2>
          <div className="acct-how">
            <div className="acct-step">
              <div className="acct-step-num">01</div>
              <h4>Apply to partner</h4>
              <p>Email us at hellordkit@gmail.com. Quick onboarding call. We set up your partner account and give you the client eligibility checklist.</p>
            </div>
            <div className="acct-step">
              <div className="acct-step-num">02</div>
              <h4>Identify eligible clients & refer</h4>
              <p>Run your client list through our screening checklist. Software, biotech, engineering, manufacturing — most will flag positive. Make the introduction and we take it from there.</p>
            </div>
            <div className="acct-step">
              <div className="acct-step-num">03</div>
              <h4>RDKit does the R&D work, you lodge the return</h4>
              <p>We handle interviews, project descriptions, financial analysis, and AusIndustry application prep. We send you the completed R&D Tax Offset Schedule — you include it in the client&rsquo;s tax return as normal.</p>
            </div>
            <div className="acct-step">
              <div className="acct-step-num">04</div>
              <h4>Claim completes, you get paid</h4>
              <p>Once the offset pays out, your revenue share is transferred within 14 days. Transparent tracking. Consistent payment cycle.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Who it's for */}
      <div className="acct-section fade-up">
        <div className="section-tag">// Who this is for</div>
        <h2 className="section-h2">Ideal for practices that work with innovators</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 680, marginBottom: 36 }}>
          You don&rsquo;t need to be a Big 4 firm. Mid-market and boutique accounting practices make our best partners — because you have closer relationships with your clients and can spot opportunities they&rsquo;d otherwise miss.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { icon: '💼', title: 'SME-focused practices', desc: 'Clients with $1M–$20M turnover doing any form of product development or engineering.' },
            { icon: '🖥️', title: 'Tech-sector accountants', desc: 'Software companies, SaaS businesses, AI startups — virtually all qualify if building novel technology.' },
            { icon: '🏭', title: 'Manufacturing & engineering', desc: 'Clients with R&D spend in new processes, materials, or equipment modification.' },
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
          <div className="tag tag-purple" style={{ marginBottom: 20 }}>Ready to partner?</div>
          <h2>Let&rsquo;s talk about your client base</h2>
          <p>A quick 20-minute call is all it takes to see if partnership makes sense. No commitment required.</p>
          <a href="mailto:hellordkit@gmail.com" className="btn btn-primary btn-arrow">Email us at hellordkit@gmail.com</a>
        </div>
      </div>

      <Footer />
    </>
  )
}
