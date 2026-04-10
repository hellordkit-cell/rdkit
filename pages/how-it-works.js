import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const steps = [
  {
    num: '01',
    title: 'Free eligibility check',
    desc: 'Take our 2-minute quiz or book a 20-minute call. We\'ll assess your R&D activities against the AusIndustry criteria and give you an honest verdict — including a rough estimate of your potential offset.',
    includes: ['Eligibility assessment', 'Estimated offset range', 'No obligation'],
    note: 'This is genuinely free. No sign-up, no email wall, no sales pressure.'
  },
  {
    num: '02',
    title: '$500 deposit & strategy session',
    desc: 'Once you\'re in, we schedule a 45-minute deep dive. We go through your R&D activities in detail — what you were trying to achieve, what was technically uncertain, what you tested, what worked and what didn\'t. This is where we scope the full claim.',
    includes: ['45-min detailed interview', 'Activity mapping', 'Expenditure scope', 'Claim structure plan'],
    note: 'The $500 deposit is credited against your final success fee — it\'s not an extra cost.'
  },
  {
    num: '03',
    title: 'Project descriptions & expenditure analysis',
    desc: 'We write the project descriptions (PDs) — the technical narrative that AusIndustry reviewers assess. We also work through your financials to identify every eligible expenditure category: salaries, contractors, cloud costs, consumables, depreciation.',
    includes: ['Full PD writing', 'Eligible expenditure mapping', 'Contractor classification', 'Supporting activity identification'],
    note: 'You\'ll review every PD before anything is submitted. We\'ll iterate until it\'s exactly right.'
  },
  {
    num: '04',
    title: 'Your review & sign-off',
    desc: 'We send you the complete claim package to review: all project descriptions, the expenditure schedule, and a summary of what we\'re registering. You approve, suggest edits, or flag anything that doesn\'t look right. We don\'t submit anything without your explicit sign-off.',
    includes: ['Full claim package', 'Review meeting (if needed)', 'Unlimited revisions'],
    note: 'Most clients find very little to change at this stage — we\'ve already interviewed you thoroughly.'
  },
  {
    num: '05',
    title: 'Registration & lodgement',
    desc: 'We register your R&D activities with AusIndustry via the Business Portal. Your accountant then includes the R&D Tax Offset Schedule when lodging your income tax return. For companies under $20M turnover, the offset typically pays out as a direct cash refund.',
    includes: ['AusIndustry registration', 'ATO schedule preparation', 'Accountant coordination'],
    note: 'Deadline: 10 months after your financial year end (April 30 for June 30 FY companies).'
  }
]

const faqs = [
  {
    q: 'How long does the whole process take?',
    a: 'From starting with us to submitting your registration: 4–6 weeks typically. The ATO/AusIndustry then processes the claim on their timeline, usually in line with your tax return lodgement.'
  },
  {
    q: 'What if we haven\'t kept great records?',
    a: 'It\'s more common than you\'d think. We can work with whatever you have — git commit histories, meeting notes, Jira tickets, invoices — and help you reconstruct a credible contemporaneous record. The sooner you start keeping records, the better, but imperfect records aren\'t a dealbreaker.'
  },
  {
    q: 'Do we need to be profitable to claim?',
    a: 'No — and this is one of the most misunderstood aspects. If your turnover is under $20M, the offset is refundable. That means even if you\'re in a tax loss position, you get the offset as a cash payment. It\'s one of the most valuable features of the R&DTI for early-stage companies.'
  },
  {
    q: 'What does your accountant need to do?',
    a: 'Your accountant lodges the R&D Tax Offset Schedule (part of your income tax return). We prepare all the R&D-specific documentation. Most accountants are comfortable with this and appreciate having the technical work done for them.'
  },
  {
    q: 'What if AusIndustry comes back with questions?',
    a: 'We\'re here for that. We\'ll respond to any queries from AusIndustry on your behalf and make any adjustments needed. Our 100% first-submission approval rate means this rarely happens when claims are prepared properly.'
  },
  {
    q: 'Can we claim activities from previous years?',
    a: 'You can\'t retroactively claim years that have already been lodged, but if your prior year tax return hasn\'t been lodged yet, it may still be possible. Get in touch and we can assess your specific situation.'
  }
]

export default function HowItWorks() {
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
        <title>How It Works — RDKit R&D Tax Claims</title>
        <meta name="description" content="A clear, honest breakdown of how RDKit prepares and lodges your R&D Tax Incentive claim — from eligibility check to offset in your account." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Nav />

      <div className="hiw-hero fade-up">
        <div className="tag tag-cyan" style={{ marginBottom: 20 }}>How it works</div>
        <h1>From eligibility check to cash in your account</h1>
        <p>A clear, honest breakdown of every step — including what we do, what you do, and how long it takes.</p>
      </div>

      <div className="hiw-steps fade-up">
        {steps.map((step, i) => (
          <div className="step-item" key={i}>
            <div>
              <div className="step-num-circle">{step.num}</div>
            </div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <div className="step-includes">
                {step.includes.map((item, j) => (
                  <span className="step-include" key={j}>✓ {item}</span>
                ))}
              </div>
              {step.note && (
                <p style={{ fontSize: '0.8rem', color: 'var(--cyan)', marginTop: 12, marginBottom: 0, fontStyle: 'italic' }}>
                  {step.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="hiw-timeline fade-up">
        <div className="timeline-inner">
          <div className="section-tag">// Typical timeline</div>
          <h2 className="section-h2" style={{ marginBottom: 32 }}>What to expect, week by week</h2>
          <div className="timeline-row">
            <div className="timeline-week">Week 0</div>
            <div className="timeline-content">
              <h4>Eligibility check & scoping call</h4>
              <p>Free assessment. You&rsquo;ll know within 48 hours whether we think you have a strong claim.</p>
            </div>
          </div>
          <div className="timeline-row">
            <div className="timeline-week">Week 1</div>
            <div className="timeline-content">
              <h4>Strategy session & deposit</h4>
              <p>45-minute deep-dive interview. We scope the full claim and agree on the approach.</p>
            </div>
          </div>
          <div className="timeline-row">
            <div className="timeline-week">Weeks 2–3</div>
            <div className="timeline-content">
              <h4>PD drafting & expenditure mapping</h4>
              <p>We write project descriptions and work through your financials. You&rsquo;ll see a first draft by end of week 3.</p>
            </div>
          </div>
          <div className="timeline-row">
            <div className="timeline-week">Week 4</div>
            <div className="timeline-content">
              <h4>Review, feedback, finalisation</h4>
              <p>You review the full package. We incorporate any feedback and get to sign-off.</p>
            </div>
          </div>
          <div className="timeline-row">
            <div className="timeline-week">Week 5–6</div>
            <div className="timeline-content">
              <h4>AusIndustry registration & ATO schedule</h4>
              <p>We register your activities. Your accountant includes the schedule with your tax return.</p>
            </div>
          </div>
          <div className="timeline-row">
            <div className="timeline-week">After lodgement</div>
            <div className="timeline-content">
              <h4>Offset pays out</h4>
              <p>For refundable claims (under $20M turnover), the cash typically arrives within weeks of your tax return being processed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: '80px 32px', maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 1 }} className="fade-up">
        <div className="section-tag">// Pricing</div>
        <h2 className="section-h2" style={{ marginBottom: 32 }}>Simple. Transparent. Aligned.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 20, padding: '36px 32px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8 }}>// Starter</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 600, marginBottom: 6 }}>First-time claimants</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '2.4rem', fontWeight: 600, color: 'var(--charcoal)', margin: '16px 0 4px' }}>$500</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: 24 }}>deposit + 5% of offset (min. $2,500 total fee)</div>
            <div style={{ height: 1, background: 'var(--card-border)', margin: '20px 0' }}></div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {['Free eligibility check','45-min strategy session','Full PD writing','Expenditure analysis','AusIndustry registration','$500 credited to final fee'].map((f,i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'var(--dark)', paddingLeft: 22, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--sage)', fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/eligibility" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get started</Link>
          </div>
          <div style={{ background: 'var(--card)', border: '1.5px solid var(--coral)', borderRadius: 20, padding: '36px 32px', boxShadow: '0 8px 32px var(--coral-glow)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, left: 28, background: 'var(--coral)', color: 'white', fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 600, padding: '3px 12px', borderRadius: 50, textTransform: 'uppercase', letterSpacing: 1 }}>Most popular</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8 }}>// Growth</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 600, marginBottom: 6 }}>Returning clients</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '2.4rem', fontWeight: 600, color: 'var(--charcoal)', margin: '16px 0 4px' }}>4%</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: 24 }}>of offset (min. $2,000, no deposit required)</div>
            <div style={{ height: 1, background: 'var(--card-border)', margin: '20px 0' }}></div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {['Everything in Starter','No upfront deposit','Annual review included','Priority turnaround','Direct line to Kay','Discounted rate for loyalty'].map((f,i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'var(--dark)', paddingLeft: 22, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--sage)', fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/eligibility" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get started</Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="hiw-faq fade-up">
        <div className="section-tag">// Common questions</div>
        <h2 className="section-h2" style={{ marginBottom: 32 }}>Frequently asked</h2>
        {faqs.map((faq, i) => (
          <div className="faq-item" key={i}>
            <div className="faq-q">{faq.q}</div>
            <div className="faq-a">{faq.a}</div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  )
}
