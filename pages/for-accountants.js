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
        <meta name="description" content="Partner with RDKit to offer R&D Tax Incentive claims to your clients. Earn revenue share, keep the relationship, no R&D expertise required." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Nav />

      {/* Hero */}
      <div className="acct-hero fade-up">
        <div className="tag tag-purple" style={{ marginBottom: 20 }}>For accounting firms</div>
        <h1>Your clients are leaving R&D money on the table. You can fix that.</h1>
        <p>Partner with RDKit and offer expert R&D Tax Incentive claims to your clients — without needing to become an R&DTI specialist yourself. You stay the trusted advisor. We handle the technical work.</p>
        <div className="hero-ctas">
          <a href="mailto:partners@rdkit.com.au" className="btn btn-primary">Apply to partner</a>
          <Link href="/how-it-works" className="btn btn-outline">How claims work</Link>
        </div>
      </div>

      {/* Why it matters */}
      <div className="acct-section fade-up">
        <div className="section-tag">// The opportunity</div>
        <h2 className="section-h2">Most of your SME clients probably qualify. Most won&rsquo;t claim.</h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 700, marginBottom: 40 }}>
          The Australian R&D Tax Incentive is claimed by fewer than 15,000 companies annually — despite tens of thousands more being eligible. The gap is expertise and accessibility. That&rsquo;s where you come in.
        </p>
        <div className="acct-why">
          <div className="acct-why-card">
            <div className="icon">💰</div>
            <h4>New revenue for your practice</h4>
            <p>Earn a revenue share on every claim you refer or co-manage. An average claim returns $60–120k to your client — and a meaningful fee to you.</p>
          </div>
          <div className="acct-why-card">
            <div className="icon">🤝</div>
            <h4>You keep the relationship</h4>
            <p>We work in the background. Your client&rsquo;s primary contact remains you. We make you look good — not the other way around.</p>
          </div>
          <div className="acct-why-card">
            <div className="icon">🎯</div>
            <h4>No R&D expertise required</h4>
            <p>You don&rsquo;t need to know AusIndustry criteria or write project descriptions. That&rsquo;s Kay&rsquo;s job. You identify the opportunity; we do the technical work.</p>
          </div>
        </div>
      </div>

      {/* Partner tiers */}
      <div className="acct-section alt fade-up">
        <div className="acct-inner">
          <div className="section-tag">// Partnership tiers</div>
          <h2 className="section-h2">Choose how you want to work with us</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 580, marginBottom: 0 }}>
            Three models depending on how involved you want to be. No exclusivity, no lock-in.
          </p>

          <div className="partner-tiers">
            {/* Referral */}
            <div className="tier-card">
              <div className="tier-icon" style={{ background: 'rgba(0,180,216,0.08)' }}>📨</div>
              <div className="tier-tag">// Tier 1</div>
              <h3>Referral Partner</h3>
              <p className="tier-desc">
                You identify eligible clients and refer them to RDKit. We handle everything from there. Simple, low-effort revenue.
              </p>
              <ul className="tier-features">
                <li>Refer clients via a simple form</li>
                <li>We manage the full claim process</li>
                <li>Monthly revenue share payments</li>
                <li>Dedicated referral tracking dashboard</li>
                <li>Training session to identify eligible clients</li>
              </ul>
              <div className="tier-earn">You earn: 15% of RDKit&rsquo;s fee on every referred claim</div>
              <a href="mailto:partners@rdkit.com.au" className="btn btn-outline">Apply free →</a>
            </div>

            {/* Co-claim */}
            <div className="tier-card featured">
              <div className="tier-badge">Most popular</div>
              <div className="tier-icon" style={{ background: 'rgba(255,107,84,0.08)' }}>⚡</div>
              <div className="tier-tag">// Tier 2</div>
              <h3>Co-Claim Partner</h3>
              <p className="tier-desc">
                Stay actively involved throughout the claim. Joint service: you handle the financial side, we handle the technical R&D narrative.
              </p>
              <ul className="tier-features">
                <li>Collaborative claim management</li>
                <li>Shared client communications</li>
                <li>You prepare the financials; we write the PDs</li>
                <li>Branded engagement letter option</li>
                <li>Quarterly R&DTI briefings from Kay</li>
                <li>Priority support for your clients</li>
              </ul>
              <div className="tier-earn">You earn: 20–25% of RDKit&rsquo;s fee + your own accounting fee</div>
              <a href="mailto:partners@rdkit.com.au" className="btn btn-primary">Apply to partner →</a>
            </div>

            {/* White label */}
            <div className="tier-card">
              <div className="tier-icon" style={{ background: 'rgba(155,127,255,0.08)' }}>🏷️</div>
              <div className="tier-tag">// Tier 3</div>
              <h3>White-Label Partner</h3>
              <p className="tier-desc">
                RDKit powers your R&DTI service under your brand. You own the client relationship entirely. By application only.
              </p>
              <ul className="tier-features">
                <li>Your brand, your client relationship</li>
                <li>Kay works as your behind-the-scenes expert</li>
                <li>Your letterhead on all deliverables</li>
                <li>Volume pricing for multiple clients</li>
                <li>Dedicated account manager</li>
                <li>Training for your team</li>
              </ul>
              <div className="tier-earn">Pricing: Volume-based. Enquire for rates.</div>
              <a href="mailto:partners@rdkit.com.au" className="btn btn-outline">Enquire →</a>
            </div>
          </div>
        </div>
      </div>

      {/* How it works for accountants */}
      <div className="acct-section fade-up">
        <div className="section-tag">// How it works</div>
        <h2 className="section-h2">Four steps to your first referred claim</h2>
        <div className="acct-how">
          <div className="acct-step">
            <div className="acct-step-num">01</div>
            <h4>Apply to partner</h4>
            <p>Email us. Quick onboarding call. We&rsquo;ll assess fit and set up your partner account.</p>
          </div>
          <div className="acct-step">
            <div className="acct-step-num">02</div>
            <h4>Identify eligible clients</h4>
            <p>We&rsquo;ll give you a one-page screening checklist. Most software, biotech, and engineering clients will flag positive.</p>
          </div>
          <div className="acct-step">
            <div className="acct-step-num">03</div>
            <h4>Make the introduction</h4>
            <p>Warm intro to Kay, or use your co-branded assessment link. We handle it from there.</p>
          </div>
          <div className="acct-step">
            <div className="acct-step-num">04</div>
            <h4>Claim completes, you get paid</h4>
            <p>Once the offset pays out, your revenue share is paid within 14 days. Tracked and transparent.</p>
          </div>
        </div>
      </div>

      {/* Who it's for */}
      <div className="acct-section alt fade-up">
        <div className="acct-inner">
          <div className="section-tag">// Who this is for</div>
          <h2 className="section-h2">Ideal for practices that work with innovators</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 680, marginBottom: 36 }}>
            You don&rsquo;t need to be a Big 4 firm. In fact, mid-market and boutique accounting practices are our best partners — because you have closer relationships with your clients.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { icon: '💼', title: 'SME-focused practices', desc: 'Clients with $1M–$20M turnover doing any form of product development or engineering.' },
              { icon: '🖥️', title: 'Tech-sector accountants', desc: 'Software companies, SaaS businesses, AI startups — virtually all qualify if building novel tech.' },
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
      </div>

      {/* CTA */}
      <div className="acct-section fade-up">
        <div className="acct-cta">
          <div className="tag tag-purple" style={{ marginBottom: 20 }}>Ready to partner?</div>
          <h2>Let&rsquo;s talk about your client base</h2>
          <p>A quick 20-minute call is all it takes to understand if partnership makes sense. No commitment required.</p>
          <a href="mailto:partners@rdkit.com.au" className="btn btn-primary btn-arrow">Email Kay at partners@rdkit.com.au</a>
        </div>
      </div>

      <Footer />
    </>
  )
}
