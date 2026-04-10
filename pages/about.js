import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const values = [
  {
    icon: '⚖️',
    bg: 'rgba(255,107,84,0.08)',
    title: 'Radical transparency',
    desc: 'We show you our fee before we start. We tell you honestly if we think your claim is weak. We don\'t oversell. The R&DTI landscape is complex enough without your advisor adding confusion.'
  },
  {
    icon: '🎯',
    bg: 'rgba(0,180,216,0.08)',
    title: 'We only win when you do',
    desc: 'Our success fee model means we\'re incentivised to maximise your legitimate claim — not bill hours. If you don\'t get money back, we don\'t either. That\'s how it should work.'
  },
  {
    icon: '🔬',
    bg: 'rgba(78,203,160,0.08)',
    title: 'Substance over tick-boxes',
    desc: 'AusIndustry can spot templated claims immediately. We write genuine project descriptions that reflect your actual R&D — which is both the right thing to do and what gets claims approved.'
  },
  {
    icon: '🤝',
    bg: 'rgba(155,127,255,0.08)',
    title: 'Accessible to founders',
    desc: 'Enterprise consulting firms built their pricing for ASX-listed companies. We built RDKit for the startup trying to make payroll, the SME investing in product, the founder doing real innovation without a finance team.'
  }
]

export default function About() {
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
        <title>About RDKit — Mission, Values & Kay</title>
        <meta name="description" content="Who we are, what we stand for, and why RDKit exists. Meet Kay, the expert behind your R&D tax claim." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Nav />

      {/* Hero */}
      <div className="about-hero fade-up">
        <div className="tag tag-cyan" style={{ marginBottom: 20 }}>About RDKit</div>
        <h1>Built for the companies that don&rsquo;t fit the big firm model</h1>
        <p>We&rsquo;re a lean R&DTI service with deep expertise and a simple belief: if you&rsquo;re doing genuine R&D, you deserve to claim it — without paying a fortune to do so.</p>
      </div>

      {/* Mission */}
      <div className="mission-block">
        <div className="mission-inner">
          <div className="section-tag" style={{ color: 'var(--coral)', marginBottom: 16 }}>// Our mission</div>
          <p className="mission-statement">
            To make the R&D Tax Incentive <em>actually accessible</em> to Australian companies doing real innovation — not just the ones with big advisory budgets.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="values-section fade-up">
        <div className="section-tag">// What we believe</div>
        <h2 className="section-h2">Our values</h2>
        <div className="values-grid">
          {values.map((v, i) => (
            <div className="value-card" key={i}>
              <div className="value-icon" style={{ background: v.bg }}>{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kay */}
      <div className="kay-section fade-up">
        <div className="kay-inner">
          <div>
            <div className="kay-avatar">K</div>
            <div className="kay-side-tags">
              <div className="kay-tag">Biomedical Science</div>
              <div className="kay-tag">5yr+ R&DTI</div>
              <div className="kay-tag">AusIndustry Expert</div>
              <div className="kay-tag">Lab Research</div>
              <div className="kay-tag">Technical Writing</div>
            </div>
          </div>
          <div className="kay-bio">
            <div className="tag tag-sage" style={{ marginBottom: 20 }}>Meet Kay</div>
            <h2>Hey, I&rsquo;m Kay. I built this because the system was broken.</h2>
            <p>I started in biomedical research — lab bench work, experimental design, writing up methodologies for work where the outcome genuinely wasn&rsquo;t known in advance. That experience taught me how to articulate technical uncertainty in a way that non-specialists can evaluate. Turns out that&rsquo;s exactly what R&DTI claims require.</p>
            <p>After moving into R&DTI consulting, I kept running into the same situation: genuinely innovative companies — software founders, manufacturing engineers, biotech researchers — doing work that clearly qualified, but either couldn&rsquo;t afford the consulting fees or had been told by a generalist accountant that they &ldquo;probably don&rsquo;t qualify.&rdquo;</p>
            <p>The big consulting firms charge 15–25% of the refund, or $15k+ upfront. For a company recovering $80k, that&rsquo;s $12–20k in fees. It&rsquo;s excessive, and it prices out exactly the companies the R&DTI was designed for.</p>
            <p className="muted">RDKit charges 5% — and I credit your $500 upfront payment against the final fee. I handle the technical writing, the expenditure mapping, and the AusIndustry submission. You review, approve, and receive your offset. Simple.</p>
            <div style={{ marginTop: 32 }}>
              <Link href="/eligibility" className="btn btn-primary btn-arrow">Check if you&rsquo;re eligible</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ padding: '80px 32px', maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 1 }} className="fade-up">
        <div className="cta-card">
          <h2>Ready to see what your R&D could recover?</h2>
          <p>Two minutes. Eight questions. Instant estimate. No obligation.</p>
          <div className="cta-btns">
            <Link href="/eligibility" className="btn-white btn-arrow">Take the free eligibility quiz</Link>
            <Link href="/how-it-works" className="btn-white-outline">See how it works →</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
