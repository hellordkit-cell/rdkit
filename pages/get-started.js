import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

// ─── Replace this with your real Stripe Payment Link URL ───────────────────
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/eVq9AS8ezg9Xd3n0DOdnW00'
// ────────────────────────────────────────────────────────────────────────────

export default function GetStarted() {
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
        <title>Get Started — RDKit $500 Deposit</title>
        <meta name="description" content="Pay your $500 RDKit deposit to kick off your R&DTI claim. Credited in full against your final success fee." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Nav />

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '120px 32px 80px' }}>

        {/* Header */}
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="tag tag-coral" style={{ marginBottom: 20, display: 'inline-block' }}>Get started</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: '2.4rem', fontWeight: 600, marginBottom: 16 }}>
            Pay your $500 deposit
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75 }}>
            This kicks off your R&DTI claim — strategy session booked, project descriptions started, and financial analysis underway. The deposit is credited in full against your final success fee.
          </p>
        </div>

        {/* What you get */}
        <div className="fade-up" style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)', borderRadius: 20, padding: '32px 36px', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--coral)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>What this covers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['45-min strategy session', 'Deep-dive into your R&D activities — what you built, what was uncertain, what you tested.'],
              ['Project description writing', 'We write the full technical narrative for AusIndustry reviewers. You review and approve.'],
              ['Financial analysis', 'We map every eligible expenditure category: salaries, contractors, cloud costs, consumables.'],
              ['AusIndustry application prep', 'The complete application, ready for you (or your accountant) to lodge.'],
            ].map(([title, desc], i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--coral)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment card */}
        <div className="fade-up" style={{ background: 'var(--card)', border: '1.5px solid var(--coral)', borderRadius: 20, padding: '36px', boxShadow: '0 8px 40px var(--coral-glow)', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Total due today</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '3rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1 }}>$500</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 6 }}>Credited against final success fee</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 4 }}>Accepted payments</div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                {['Visa', 'MC', 'Amex'].map(card => (
                  <div key={card} style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)', borderRadius: 6, padding: '4px 10px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--muted)' }}>{card}</div>
                ))}
              </div>
            </div>
          </div>

          <a
            href={STRIPE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '16px 28px', borderRadius: 14 }}
          >
            Pay $500 securely via Stripe →
          </a>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>🔒 Secure payment powered by Stripe</span>
          </div>
        </div>

        {/* Alternative */}
        <div className="fade-up" style={{ textAlign: 'center', padding: '24px', background: 'var(--bg-alt)', borderRadius: 16, marginBottom: 32 }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: 8 }}>Prefer to pay by bank transfer or need an invoice first?</p>
          <a href="mailto:hellordkit@gmail.com" style={{ color: 'var(--coral)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
            Email hellordkit@gmail.com →
          </a>
        </div>

        {/* Reassurance */}
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { icon: '💰', title: 'Credited in full', desc: 'The $500 deposit reduces your final fee — it\'s not on top.' },
            { icon: '📋', title: 'Work starts immediately', desc: 'We book your strategy session within 2 business days.' },
            { icon: '✅', title: 'You approve everything', desc: 'Nothing is lodged without your explicit sign-off.' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, padding: '20px' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
