import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const clientSteps = [
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
    desc: 'Once you\'re in, we schedule a 45-minute deep dive. We go through your R&D activities in detail — what you were trying to achieve, what was technically uncertain, what you tested, what worked and what didn\'t. This scopes the full claim.',
    includes: ['45-min detailed interview', 'Activity mapping', 'Expenditure scope', 'Claim structure plan'],
    note: 'The $500 deposit is credited against your final success fee — it\'s not an extra cost.'
  },
  {
    num: '03',
    title: 'We write your project descriptions',
    desc: 'We write the project descriptions (PDs) — the technical narrative that AusIndustry reviewers assess. We also work through your financials to identify every eligible expenditure: salaries, contractors, cloud costs, consumables, depreciation.',
    includes: ['Full PD writing', 'Eligible expenditure mapping', 'Contractor classification', 'Supporting activity identification'],
    note: 'You\'ll review every PD before anything is submitted. We iterate until it\'s exactly right.'
  },
  {
    num: '04',
    title: 'Your review & sign-off',
    desc: 'We send you the complete application package: all project descriptions, expenditure schedule, and a plain-English summary. You approve or request changes. Nothing goes further without your explicit sign-off.',
    includes: ['Full application package', 'Review meeting if needed', 'Unlimited revisions'],
    note: 'Most clients find very little to change — we\'ve already interviewed you thoroughly.'
  },
  {
    num: '05',
    title: 'You lodge on AusIndustry, your accountant handles the ATO',
    desc: 'You (as company director) log into the AusIndustry Business Portal using your myGovID and submit the application we\'ve prepared — we walk you through it step by step. Your registered tax agent then includes the R&D Tax Offset Schedule when lodging your income tax return.',
    includes: ['We prepare 100% of the application', 'You submit via AusIndustry portal (we guide you)', 'Your tax agent lodges the ATO schedule'],
    note: 'Deadline: 10 months after your financial year end — April 30 for June 30 FY companies.'
  }
]

const accountantSteps = [
  {
    num: '01',
    title: 'Partner with RDKit',
    desc: 'Email us at hellordkit@gmail.com to apply. We\'ll have a quick 20-minute call to assess fit and set up your partner account. No exclusivity, no lock-in. We work around your existing client relationships.',
    includes: ['Quick onboarding call', 'Partner agreement', 'Client screening checklist'],
    note: 'Free to apply. No commitment until your first referral is confirmed.'
  },
  {
    num: '02',
    title: 'You identify eligible clients',
    desc: 'We give you a one-page screening checklist to run through your client base. Most software, biotech, manufacturing and engineering companies qualify. You make the introduction — a warm email or a call — and we take it from there.',
    includes: ['Eligibility screening checklist', 'Training on what qualifies', 'Co-branded assessment link'],
    note: 'Most SME clients doing any form of product development or process improvement will flag positive.'
  },
  {
    num: '03',
    title: 'RDKit prepares everything',
    desc: 'We handle the full technical workload: interviewing the client, writing project descriptions, conducting the financial analysis, and preparing the complete AusIndustry application. You stay informed but don\'t need to do the R&D technical work.',
    includes: ['Client interviews', 'Project description writing', 'Financial analysis & expenditure mapping', 'Full AusIndustry application prep'],
    note: 'This is where RDKit\'s expertise sits. You don\'t need to become an R&DTI specialist.'
  },
  {
    num: '04',
    title: 'Client lodges, you handle the ATO return',
    desc: 'The client submits the prepared application on the AusIndustry portal (we guide them through it). As their registered tax agent, you then include the R&D Tax Offset Schedule in their income tax return — the schedule we\'ve already prepared for you.',
    includes: ['We prepare the ATO R&D schedule', 'You lodge it with the client\'s tax return', 'Client submits AusIndustry portal themselves'],
    note: 'This keeps the legal structure clean — you handle what requires a registered tax agent, we handle the rest.'
  },
  {
    num: '05',
    title: 'Claim completes, you get paid',
    desc: 'Once the offset pays out, your revenue share is transferred within 14 days. Transparent, tracked, and consistent. For Co-Claim partners, your own accounting fee is charged separately on top.',
    includes: ['Revenue share paid within 14 days', 'Transparent tracking dashboard', 'Your own accounting fee is separate'],
    note: 'Average claim returns $60–120k to your client — and a meaningful fee to your practice.'
  }
]

const faqs = [
  {
    q: 'How long does the whole process take?',
    a: 'Shorter than you think — and entirely in your hands. Here\'s the honest answer: we have no waiting list, no internal review queues, and no account manager hand-offs slowing things down. The moment you book your strategy session, we start. The moment you send us your information, we write. The moment you approve, we\'re ready to submit. Some clients go from first call to AusIndustry submission in under a week. Others take a few weeks because life gets in the way — and that\'s fine too. The pace is yours. We just make sure we\'re never the bottleneck.'
  },
  {
    q: 'What if we haven\'t kept great records?',
    a: 'More common than you\'d think. We can work with whatever you have — git commit histories, meeting notes, Jira tickets, invoices — and help reconstruct a credible contemporaneous record. The sooner you start keeping records, the better, but imperfect records aren\'t a dealbreaker.'
  },
  {
    q: 'Do we need to be profitable to claim?',
    a: 'No. If your turnover is under $20M, the offset is refundable — meaning even if you\'re in a tax loss position, you receive the offset as a direct cash payment. It\'s one of the most valuable features of the R&DTI for early-stage companies.'
  },
  {
    q: 'What does our accountant need to do?',
    a: 'Your accountant lodges the R&D Tax Offset Schedule as part of your income tax return. We prepare all the R&D-specific documentation and the schedule itself. Most accountants find very little extra work on their end.'
  },
  {
    q: 'Who actually lodges the AusIndustry application?',
    a: 'You do — as the company director, via your myGovID on the AusIndustry Business Portal. We prepare 100% of the application content and walk you through submitting it. This keeps the process legally clean and you in control.'
  },
  {
    q: 'What if AusIndustry comes back with questions?',
    a: 'We help you respond. We\'ll draft responses to any AusIndustry queries and work with you to provide any additional documentation needed. Our thorough preparation means this rarely happens.'
  },
  {
    q: 'Can we claim activities from previous years?',
    a: 'You can\'t retroactively claim years already lodged, but if your prior year tax return hasn\'t been lodged yet, it may still be possible. Get in touch and we\'ll assess your specific situation.'
  }
]

export default function HowItWorks() {
  const [audience, setAudience] = useState('client')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const steps = audience === 'client' ? clientSteps : accountantSteps

  return (
    <>
      <Head>
        <title>How It Works — RDKit R&D Tax Claims</title>
        <meta name="description" content="A clear, honest breakdown of how RDKit prepares your R&D Tax Incentive claim — for companies and accounting firms." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Nav />

      <div className="hiw-hero fade-up">
        <div className="tag tag-cyan" style={{ marginBottom: 20 }}>How it works</div>
        <h1>From eligibility check to cash in your account</h1>
        <p>A clear, step-by-step breakdown for both companies claiming R&D and accounting firms partnering with us.</p>

        {/* Audience toggle */}
        <div style={{ display: 'flex', gap: 8, marginTop: 32, justifyContent: 'center' }}>
          <button
            onClick={() => setAudience('client')}
            style={{
              padding: '10px 28px',
              borderRadius: 50,
              border: audience === 'client' ? 'none' : '1.5px solid var(--card-border)',
              background: audience === 'client' ? 'var(--coral)' : 'transparent',
              color: audience === 'client' ? 'white' : 'var(--muted)',
              fontFamily: 'var(--sans)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            I&apos;m a company
          </button>
          <button
            onClick={() => setAudience('accountant')}
            style={{
              padding: '10px 28px',
              borderRadius: 50,
              border: audience === 'accountant' ? 'none' : '1.5px solid var(--card-border)',
              background: audience === 'accountant' ? 'var(--purple)' : 'transparent',
              color: audience === 'accountant' ? 'white' : 'var(--muted)',
              fontFamily: 'var(--sans)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            I&apos;m an accounting firm
          </button>
        </div>

        {audience === 'accountant' && (
          <p style={{ marginTop: 16, fontSize: '0.875rem', color: 'var(--muted)', fontStyle: 'italic' }}>
            Showing the partnership process for accounting firms and tax agents.
          </p>
        )}
      </div>

      <div className="hiw-steps fade-up">
        {steps.map((step, i) => (
          <div className="step-item" key={i}>
            <div>
              <div className="step-num-circle" style={{ background: audience === 'accountant' ? 'var(--purple)' : undefined }}>{step.num}</div>
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
                <p style={{ fontSize: '0.8rem', color: audience === 'accountant' ? 'var(--purple)' : 'var(--cyan)', marginTop: 12, marginBottom: 0, fontStyle: 'italic' }}>
                  {step.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Role clarity box */}
      <div style={{ padding: '0 32px 80px', maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }} className="fade-up">
        <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--card-border)', borderRadius: 20, padding: '36px 40px' }}>
          <div className="section-tag" style={{ marginBottom: 16 }}>// Who does what</div>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 600, marginBottom: 24 }}>Clear separation of responsibilities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--coral)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>RDKit handles</div>
              {['R&D activity descriptions', 'Financial analysis & expenditure mapping', 'Full AusIndustry application preparation', 'Guiding you through portal submission'].map((item, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: 'var(--dark)', paddingLeft: 20, position: 'relative', marginBottom: 8, lineHeight: 1.5 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--coral)', fontWeight: 700 }}>✓</span> {item}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Company director handles</div>
              {['Submitting the AusIndustry portal application (using myGovID)', 'Reviewing & approving project descriptions', 'Providing R&D activity details in our interview'].map((item, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: 'var(--dark)', paddingLeft: 20, position: 'relative', marginBottom: 8, lineHeight: 1.5 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--cyan)', fontWeight: 700 }}>✓</span> {item}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--purple)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Tax agent handles</div>
              {['Lodging the income tax return', 'Including the R&D Tax Offset Schedule (which we prepare)', 'Any ATO correspondence post-lodgement'].map((item, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: 'var(--dark)', paddingLeft: 20, position: 'relative', marginBottom: 8, lineHeight: 1.5 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--purple)', fontWeight: 700 }}>✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="hiw-timeline fade-up">
        <div className="timeline-inner">
          <div className="section-tag">// Timeline</div>
          <h2 className="section-h2" style={{ marginBottom: 12 }}>The faster you move, the faster we move.</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 32, maxWidth: 640 }}>
            There&rsquo;s no fixed timeline at RDKit — we work at your pace. Some clients go from first call to AusIndustry submission in under a week. The steps below show what&rsquo;s involved; how fast you get through them is up to you.
          </p>
          <div className="timeline-row">
            <div className="timeline-week">Day 1</div>
            <div className="timeline-content">
              <h4>Eligibility check &amp; scoping call</h4>
              <p>Free assessment. You&rsquo;ll know the same day whether you have a strong claim and what your offset estimate looks like.</p>
            </div>
          </div>
          <div className="timeline-row">
            <div className="timeline-week">Day 2–3</div>
            <div className="timeline-content">
              <h4>Strategy session &amp; deposit</h4>
              <p>45-minute deep-dive interview. We scope the full claim. Pay the $500 deposit and work begins immediately.</p>
            </div>
          </div>
          <div className="timeline-row">
            <div className="timeline-week">Day 3–5</div>
            <div className="timeline-content">
              <h4>PD drafting &amp; expenditure mapping</h4>
              <p>We write your project descriptions and map eligible expenditure. You&rsquo;ll see a first draft within days of the interview — not weeks.</p>
            </div>
          </div>
          <div className="timeline-row">
            <div className="timeline-week">Day 5–6</div>
            <div className="timeline-content">
              <h4>Review &amp; sign-off</h4>
              <p>You review the full package. Quick turnaround on any feedback. We finalise and get your sign-off — often same day.</p>
            </div>
          </div>
          <div className="timeline-row">
            <div className="timeline-week">Day 6–7</div>
            <div className="timeline-content">
              <h4>AusIndustry portal &amp; ATO schedule</h4>
              <p>You submit via the AusIndustry portal — we walk you through it live. Your tax agent includes the R&D schedule with your return.</p>
            </div>
          </div>
          <div className="timeline-row">
            <div className="timeline-week">After lodgement</div>
            <div className="timeline-content">
              <h4>Offset pays out</h4>
              <p>For refundable claims (under $20M turnover), the cash arrives within weeks of your tax return being processed.</p>
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
              {['Free eligibility check', '45-min strategy session', 'Project description writing', 'Financial & expenditure analysis', 'Full AusIndustry application prep', '$500 deposit credited to final fee'].map((f, i) => (
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
              {['Everything in Starter', 'No upfront deposit', 'Annual review included', 'Priority turnaround', 'Direct line to Kay', 'Loyalty rate discount'].map((f, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'var(--dark)', paddingLeft: 22, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--sage)', fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/eligibility" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get started</Link>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.85rem', color: 'var(--muted)' }}>
          Accounting firm? <Link href="/for-accountants" style={{ color: 'var(--coral)', textDecoration: 'none', fontWeight: 600 }}>See partner pricing →</Link>
        </p>
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
