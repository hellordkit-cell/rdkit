import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function RdtiProgram() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>The Australian R&D Tax Incentive Explained — RDKit</title>
        <meta name="description" content="A plain-English guide to the Australian R&D Tax Incentive: who qualifies, how much you can get back, real examples, and common mistakes to avoid." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo">rd<span>kit.</span></Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/eligibility">Eligibility Quiz</Link></li>
            <li><Link href="/#pricing">Pricing</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/eligibility" className="btn btn-primary">Check eligibility</Link></li>
          </ul>
        </div>
      </nav>

      <div className="page-hero">
        <div className="section-label">// the complete guide</div>
        <h1>The Australian R&D Tax Incentive, explained in plain English</h1>
        <p>Everything you need to know about the R&DTI program: who qualifies, how much you get back, real examples, and the mistakes that cost companies thousands.</p>
      </div>

      <section className="content-section fade-in">
        <div className="section-label">// what is it</div>
        <h2>The R&DTI in 60 seconds</h2>
        <p>The Research and Development Tax Incentive (R&DTI) is an Australian Government program that gives companies a tax offset for eligible R&D activities. It&rsquo;s administered jointly by AusIndustry (who assess the R&D activities) and the ATO (who process the tax offset).</p>
        <p>In simple terms: if your company is doing genuinely innovative work where the outcome isn&rsquo;t certain, the government will give you back a percentage of what you spent on that work. For most small-to-medium companies, this comes as a direct cash refund.</p>
        <p>The program has been running since 2011 and supports thousands of Australian companies every year across software, manufacturing, biotech, agriculture, construction, and many other industries. It&rsquo;s not a grant you apply for — it&rsquo;s a tax incentive that&rsquo;s available to any eligible company.</p>

        <div className="key-numbers">
          <div className="key-num">
            <div className="big">43.5%</div>
            <div className="desc">Refundable offset rate for companies under $20M turnover</div>
          </div>
          <div className="key-num">
            <div className="big">$4B+</div>
            <div className="desc">Claimed by Australian companies each year through the R&DTI</div>
          </div>
          <div className="key-num">
            <div className="big">12,000+</div>
            <div className="desc">Companies register R&D activities annually</div>
          </div>
        </div>
      </section>

      <section className="content-section alt-bg fade-in">
        <div className="inner">
          <div className="section-label">// how much can you get</div>
          <h2>The offset rates explained</h2>
          <p>How much you get back depends on your company&rsquo;s aggregated turnover. There are two tiers.</p>

          <div className="elig-grid">
            <div className="elig-card yes">
              <h4><span style={{ color: 'var(--sage)' }}>●</span> Under $20M turnover</h4>
              <p>You get a <strong>43.5% refundable tax offset</strong>. Since you&rsquo;d normally deduct R&D at your 25% corporate tax rate, the net cash benefit is <strong>18.5 cents back for every dollar</strong> you spend on eligible R&D. And it&rsquo;s refundable — even if you&rsquo;re not making a profit yet, you get cash back.</p>
            </div>
            <div className="elig-card yes">
              <h4><span style={{ color: 'var(--amber)' }}>●</span> $20M+ turnover</h4>
              <p>You get a <strong>38.5% non-refundable tax offset</strong>. The net benefit is <strong>8.5 cents per dollar</strong> (above the 30% corporate tax rate). It&rsquo;s non-refundable, meaning it reduces your tax liability — and any unused offset carries forward.</p>
            </div>
          </div>

          <h3>Quick example</h3>
          <p>A SaaS startup with $400,000 in eligible R&D expenditure and under $20M turnover would get back roughly <strong>$74,000 as a direct cash refund</strong> ($400k × 18.5%). Their RDKit fee at 5% would be about $3,700 + the $500 upfront — still saving them $69,800+ they didn&rsquo;t have before.</p>
        </div>
      </section>

      <section className="content-section fade-in">
        <div className="section-label">// who qualifies</div>
        <h2>Eligibility: what AusIndustry is looking for</h2>
        <p>The R&DTI has specific eligibility criteria. Here&rsquo;s the practical breakdown.</p>

        <h3>The basics</h3>
        <p>Your company must be incorporated in Australia (or a foreign-owned company with an Australian permanent establishment), have an ABN, and actually incur R&D expenditure. You register your R&D activities with AusIndustry and then claim the offset through your income tax return.</p>

        <h3>The real test: what counts as &ldquo;R&D&rdquo;</h3>
        <p>This is where most confusion lives. AusIndustry requires <strong>core R&D activities</strong> to be experimental — meaning you&rsquo;re generating new knowledge and the outcome can&rsquo;t be known in advance, even by a competent professional in the field. The key ingredient is <strong>genuine technical uncertainty</strong>.</p>

        <div className="elig-grid" style={{ marginTop: '24px' }}>
          <div className="elig-card yes">
            <h4>✓ Likely qualifies</h4>
            <p>Building a new ML model where you don&rsquo;t know if the approach will achieve the required accuracy. Developing a new manufacturing process that hasn&rsquo;t been done at this scale. Creating a novel compound with uncertain efficacy. Engineering a product with untested materials.</p>
          </div>
          <div className="elig-card no">
            <h4>✗ Likely doesn&rsquo;t qualify</h4>
            <p>Implementing an off-the-shelf CRM. Routine software development using established frameworks. Copy-pasting someone else&rsquo;s proven manufacturing process. Market research, business planning, or quality control (these are explicitly excluded).</p>
          </div>
        </div>

        <h3>Supporting activities count too</h3>
        <p>Activities that directly support your core R&D — like building test environments, developing prototypes, collecting data for experiments — can also be included. These &ldquo;supporting R&D activities&rdquo; often make up a significant portion of a claim.</p>
      </section>

      <section className="content-section dark-bg fade-in">
        <div className="inner">
          <div className="section-label" style={{ color: 'var(--coral)' }}>// real-world examples</div>
          <h2 style={{ color: 'white' }}>How Australian companies are using the R&DTI</h2>
          <p>These examples represent typical R&DTI claims across different industries. Names have been changed, but the numbers and scenarios reflect real claim profiles.</p>

          <div className="cases-grid">
            <div className="case-card">
              <div className="case-tag">Software / AI</div>
              <h4>AI-powered logistics platform</h4>
              <div className="case-desc">A Melbourne SaaS startup building route-optimisation algorithms using machine learning. The technical uncertainty: whether their novel approach could outperform existing heuristic methods at scale with real-time traffic data.</div>
              <div className="case-stats">
                <div className="case-stat"><div className="slabel">R&D Spend</div><div className="sval">$320k</div></div>
                <div className="case-stat"><div className="slabel">Offset</div><div className="sval highlight">$59,200</div></div>
                <div className="case-stat"><div className="slabel">Activities</div><div className="sval">3</div></div>
                <div className="case-stat"><div className="slabel">Turnover</div><div className="sval">&lt;$20M</div></div>
              </div>
            </div>

            <div className="case-card">
              <div className="case-tag">Biotech / Medtech</div>
              <h4>Point-of-care diagnostic device</h4>
              <div className="case-desc">A Sydney biotech developing a rapid diagnostic tool for infectious diseases. Multiple unknowns around biosensor sensitivity, sample preparation methods, and achieving consistent results outside lab conditions.</div>
              <div className="case-stats">
                <div className="case-stat"><div className="slabel">R&D Spend</div><div className="sval">$680k</div></div>
                <div className="case-stat"><div className="slabel">Offset</div><div className="sval highlight">$125,800</div></div>
                <div className="case-stat"><div className="slabel">Activities</div><div className="sval">5</div></div>
                <div className="case-stat"><div className="slabel">Turnover</div><div className="sval">&lt;$20M</div></div>
              </div>
            </div>

            <div className="case-card">
              <div className="case-tag">Manufacturing</div>
              <h4>Sustainable packaging materials</h4>
              <div className="case-desc">A Brisbane manufacturer experimenting with biodegradable polymer composites to replace plastic packaging. The uncertainty centred on whether the new materials could meet food-safety and shelf-life requirements.</div>
              <div className="case-stats">
                <div className="case-stat"><div className="slabel">R&D Spend</div><div className="sval">$450k</div></div>
                <div className="case-stat"><div className="slabel">Offset</div><div className="sval highlight">$83,250</div></div>
                <div className="case-stat"><div className="slabel">Activities</div><div className="sval">4</div></div>
                <div className="case-stat"><div className="slabel">Turnover</div><div className="sval">&lt;$20M</div></div>
              </div>
            </div>

            <div className="case-card">
              <div className="case-tag">AgTech</div>
              <h4>Precision irrigation sensor network</h4>
              <div className="case-desc">A regional AgTech company developing IoT soil-moisture sensors with custom firmware. Technical uncertainty in achieving reliable wireless communication across large paddocks and calibrating sensors for diverse soil types.</div>
              <div className="case-stats">
                <div className="case-stat"><div className="slabel">R&D Spend</div><div className="sval">$240k</div></div>
                <div className="case-stat"><div className="slabel">Offset</div><div className="sval highlight">$44,400</div></div>
                <div className="case-stat"><div className="slabel">Activities</div><div className="sval">2</div></div>
                <div className="case-stat"><div className="slabel">Turnover</div><div className="sval">&lt;$20M</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section fade-in">
        <div className="section-label">// watch out</div>
        <h2>The 5 mistakes that cost companies thousands</h2>
        <p>After 5+ years in R&DTI consulting, these are the errors Kay sees most often — and they&rsquo;re all preventable.</p>

        <div className="mistake-list">
          <div className="mistake">
            <div className="mistake-icon">1</div>
            <div>
              <h4>Not claiming at all because &ldquo;we&rsquo;re not doing science&rdquo;</h4>
              <p>The R&DTI covers software development, engineering, manufacturing innovation, and much more. If there&rsquo;s technical uncertainty in what you&rsquo;re building, you may qualify — even without a single lab coat.</p>
            </div>
          </div>
          <div className="mistake">
            <div className="mistake-icon">2</div>
            <div>
              <h4>Weak project descriptions that don&rsquo;t demonstrate uncertainty</h4>
              <p>AusIndustry reviewers need to see a clear hypothesis, the technical uncertainty, and the experimental method. Vague descriptions like &ldquo;we built a new app&rdquo; will get flagged or rejected. This is where proper PD writing matters most.</p>
            </div>
          </div>
          <div className="mistake">
            <div className="mistake-icon">3</div>
            <div>
              <h4>Overclaiming (or underclaiming) eligible expenditure</h4>
              <p>Some companies include costs that aren&rsquo;t eligible (general admin, marketing). Others miss claimable items like cloud hosting used for R&D, contractor costs, or depreciation on R&D equipment. Both mistakes cost money.</p>
            </div>
          </div>
          <div className="mistake">
            <div className="mistake-icon">4</div>
            <div>
              <h4>Not keeping contemporaneous records</h4>
              <p>If AusIndustry audits your claim, they want to see evidence that the R&D work actually happened — experiment logs, git commits, meeting notes, test results. Creating records after the fact is a red flag.</p>
            </div>
          </div>
          <div className="mistake">
            <div className="mistake-icon">5</div>
            <div>
              <h4>Missing the registration deadline</h4>
              <p>You must register your R&D activities with AusIndustry within 10 months of the end of your income year. For most companies (June 30 FY), that&rsquo;s April 30 the following year. Miss it and you can&rsquo;t claim — no extensions, no exceptions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section alt-bg fade-in">
        <div className="inner">
          <div className="section-label">// key dates</div>
          <h2>The R&DTI timeline for FY 2025-26</h2>
          <p>If your financial year ends June 30, 2026, here are the dates that matter.</p>
          <div className="elig-grid">
            <div className="elig-card yes">
              <h4>📅 July 2025 – June 2026</h4>
              <p>Your R&D activities take place during this financial year. Keep records as you go.</p>
            </div>
            <div className="elig-card yes">
              <h4>📅 By April 30, 2027</h4>
              <p>Deadline to register your R&D activities with AusIndustry (10 months after FY end). This is non-negotiable.</p>
            </div>
            <div className="elig-card yes">
              <h4>📅 With your tax return</h4>
              <p>Your accountant lodges the R&D Tax Offset Schedule with your income tax return.</p>
            </div>
            <div className="elig-card yes">
              <h4>📅 After ATO processing</h4>
              <p>The offset hits your account. For refundable offsets (under $20M), this is a direct cash payment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section fade-in">
        <div className="cta-banner">
          <div className="section-label">// ready to find out?</div>
          <h2>See if your R&D qualifies in 2 minutes</h2>
          <p>Our free eligibility quiz gives you an instant answer and an estimate of what you could get back. No sign-up, no commitment.</p>
          <div className="cta-buttons">
            <Link href="/eligibility" className="btn btn-primary btn-arrow">Take the free quiz </Link>
            <Link href="/#about" className="btn btn-outline">Talk to Kay directly</Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">rd<span>kit.</span></div>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/eligibility">Eligibility Quiz</Link></li>
            <li><Link href="/#pricing">Pricing</Link></li>
          </ul>
          <div className="footer-copy">&copy; 2026 RDKit. ABN coming soon.</div>
        </div>
      </footer>
    </>
  )
}
