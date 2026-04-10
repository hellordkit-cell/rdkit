import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('darkMode') === 'true'
    setDarkMode(stored)
    if (stored) document.body.classList.add('dark-mode')
  }, [])

  const toggleDark = () => {
    const next = !darkMode
    setDarkMode(next)
    localStorage.setItem('darkMode', String(next))
    document.body.classList.toggle('dark-mode')
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav')
      if (nav) nav.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.08)' : 'none'
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Head>
        <title>RDKit — R&D Tax Claims Made Simple</title>
        <meta name="description" content="RDKit helps Australian companies claim R&D tax incentives at 5% instead of 15-25%. Free eligibility quiz. Real results." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo">
            <div className="logo-mark">RD</div>
            <div className="logo-text">rd<span>kit</span></div>
          </Link>
          <div className="nav-right">
            <ul className="nav-links">
              <li><a href="#how">How it works</a></li>
              <li><a href="#calculator">Calculator</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#about">About</a></li>
            </ul>
            <button className="theme-toggle" onClick={toggleDark} title="Toggle dark mode">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <Link href="/eligibility" className="btn btn-primary">Check eligibility</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">✨ Now live for FY25-26</div>
        <h1>Your R&D is worth more than you <span className="highlight">think</span></h1>
        <p>We help Australian companies claim R&D tax incentives at a fraction of what consulting firms charge. 5% instead of 15-25%.</p>
        <div className="hero-ctas">
          <Link href="/eligibility" className="btn btn-primary btn-arrow">Take the free quiz </Link>
          <a href="#calculator" className="btn btn-outline">See how much you could get</a>
        </div>
      </section>

      <section className="proof-bar fade-in">
        <p>// trusted by Australian innovators</p>
        <div className="proof-stats">
          <div className="proof-stat"><div className="number">$2M+</div><div className="label">Offsets claimed</div></div>
          <div className="proof-stat"><div className="number">100%</div><div className="label">Success rate</div></div>
          <div className="proof-stat"><div className="number">5yr+</div><div className="label">R&DTI experience</div></div>
          <div className="proof-stat"><div className="number">$73k</div><div className="label">Avg. client saves</div></div>
        </div>
      </section>

      <section className="home-section fade-in" id="calculator">
        <div className="section-label">// interactive tool</div>
        <div className="calculator-cta">
          <h3>See your potential offset in real-time</h3>
          <p>Slide your R&D spend and instantly see how much cash you could get back from the government — no guessing.</p>
          <Link href="/calculator" className="btn btn-primary btn-arrow">Launch calculator </Link>
        </div>
      </section>

      <section className="home-section alt-bg fade-in" id="how">
        <div className="inner">
          <div className="section-label">// how it works</div>
          <h2>Four steps. No complexity.</h2>
          <p>From &ldquo;I wonder if we qualify?&rdquo; to money in the bank. We handle the expertise so you don&rsquo;t have to.</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <h4>Quick check</h4>
              <p>2-min quiz. We tell you if you likely qualify.</p>
            </div>
            <div className="step-card">
              <div className="step-num">02</div>
              <h4>Deep dive</h4>
              <p>45-min strategy call. We map your claim.</p>
            </div>
            <div className="step-card">
              <div className="step-num">03</div>
              <h4>We build it</h4>
              <p>PDs, financials, everything ready to lodge.</p>
            </div>
            <div className="step-card">
              <div className="step-num">04</div>
              <h4>Payday</h4>
              <p>Offset hits. You pay 5%. We&rsquo;re done.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section fade-in">
        <div className="section-label">// real feedback</div>
        <h2>What clients say</h2>
        <p>Real results from companies that trusted us with their R&DTI claim.</p>
        <div className="testimonials-grid">
          <div className="testimonial">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <div className="testimonial-text">&ldquo;Kay knew the AusIndustry framework inside out. Our PDs were thorough but clear. We got approved on the first submission.&rdquo;</div>
            <div className="testimonial-author">Sarah Chen</div>
            <div className="testimonial-role">Founder, AI Logistics SaaS</div>
          </div>
          <div className="testimonial">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <div className="testimonial-text">&ldquo;We thought we&rsquo;d only qualify for $40k. Turns out we had $94k of eligible spend we didn&rsquo;t know about. RDKit found it.&rdquo;</div>
            <div className="testimonial-author">James Wilson</div>
            <div className="testimonial-role">CFO, Medtech Company</div>
          </div>
          <div className="testimonial">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <div className="testimonial-text">&ldquo;5% fee is insane compared to what we quoted from big consulting firms. And the service was actually better. Weird.&rdquo;</div>
            <div className="testimonial-author">Tom Harrison</div>
            <div className="testimonial-role">CEO, Manufacturing Startup</div>
          </div>
        </div>
      </section>

      <section className="home-section alt-bg fade-in">
        <div className="inner">
          <div className="section-label">// for different industries</div>
          <h2>We speak your language</h2>
          <p>From SaaS to biotech to manufacturing — we&rsquo;ve worked across every R&D type.</p>
          <div className="industries-grid">
            <div className="industry-card">
              <div className="industry-icon">💻</div>
              <h4>Software / SaaS / AI</h4>
              <p>Building ML models, APIs, new frameworks with genuine uncertainty.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">🧬</div>
              <h4>Biotech / Medtech</h4>
              <p>New compounds, diagnostic devices, experimental treatments.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">⚙️</div>
              <h4>Manufacturing / Engineering</h4>
              <p>New processes, materials, designs with technical uncertainty.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">🌾</div>
              <h4>AgTech & Others</h4>
              <p>Precision agriculture, energy, construction tech, and more.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section fade-in" id="pricing">
        <div className="section-label">// pricing</div>
        <h2>Radically simple. Radically fair.</h2>
        <p>Most consulting firms charge $5k-$15k upfront or take 15-25% of your refund. We think that&rsquo;s excessive.</p>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="tier">// STARTER</div>
            <h3>First-time claimants</h3>
            <div className="price">$500</div>
            <div className="price-note">upfront + 5% of your offset (min. $2,500)</div>
            <div className="divider"></div>
            <ul>
              <li>Free eligibility check</li>
              <li>45-min deep dive</li>
              <li>Full PD writing</li>
              <li>Expenditure analysis</li>
              <li>Ready-to-lodge package</li>
              <li>$500 credited toward final fee</li>
            </ul>
            <Link href="/eligibility" className="btn btn-primary">Get started</Link>
          </div>
          <div className="pricing-card featured">
            <div className="tier">// GROWTH</div>
            <h3>Returning clients</h3>
            <div className="price">4%</div>
            <div className="price-note">of your offset (min. $2,000, no upfront)</div>
            <div className="divider"></div>
            <ul>
              <li>Everything in Starter</li>
              <li>No upfront payment</li>
              <li>Annual review included</li>
              <li>Priority support</li>
              <li>Faster turnaround</li>
              <li>Direct line to Kay</li>
            </ul>
            <Link href="/eligibility" className="btn btn-primary">Get started</Link>
          </div>
        </div>
      </section>

      <section className="home-section fade-in" id="about">
        <div className="about">
          <div className="section-label">// about</div>
          <div className="about-avatar">K</div>
          <h2>Hey, I&rsquo;m Kay.</h2>
          <p>I spent years in biomedical research — lab work, experimental design, writing up methodologies. I learned how to explain technical work to people who aren&rsquo;t experts. That skill matters in R&DTI claims.</p>
          <p>With 5+ years in R&DTI consulting, I kept meeting founders doing innovative work who were either priced out of claims or overwhelmed by the process. I built RDKit to fix that.</p>
          <p className="muted">I handle the technical and financial side — the parts that actually make or break claims — at a fraction of what traditional firms charge. If you need someone who understands both the science and the AusIndustry criteria, let&rsquo;s talk.</p>
          <div className="about-tags">
            <span className="about-tag">Biomedical Science</span>
            <span className="about-tag">Lab Research</span>
            <span className="about-tag">5yr+ R&DTI</span>
            <span className="about-tag">AusIndustry Expert</span>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">rd<span>kit</span></div>
          <ul className="footer-links">
            <li><a href="#how">How it works</a></li>
            <li><a href="#calculator">Calculator</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><Link href="/rdti-program">R&DTI Guide</Link></li>
            <li><Link href="/eligibility">Quiz</Link></li>
          </ul>
          <div className="footer-copy">&copy; 2026 RDKit. ABN coming soon.</div>
        </div>
      </footer>
    </>
  )
}
