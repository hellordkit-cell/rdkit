import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function RdtiProgram() {
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
        <title>The R&D Tax Incentive Explained — Australia | RDKit</title>
        <meta name="description" content="Plain-English guide to the Australian R&D Tax Incentive: who qualifies, how much you get back, and how to claim. 43.5% for small companies, 38.5% for large." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RDKit" />
        <meta property="og:title" content="The R&D Tax Incentive Explained — Australia | RDKit" />
        <meta property="og:description" content="Plain-English guide to the Australian R&D Tax Incentive: who qualifies, how much you get back, and how to claim. 43.5% for small companies, 38.5% for large." />
        <meta property="og:url" content="https://rdkit.com.au/rdti-program" />
        <meta property="og:image" content="https://rdkit.com.au/og-image.png" />
        <meta property="og:locale" content="en_AU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The R&D Tax Incentive Explained — Australia | RDKit" />
        <meta name="twitter:description" content="Plain-English guide to the Australian R&D Tax Incentive: who qualifies, how much you get back, and how to claim. 43.5% for small companies, 38.5% for large." />
        <meta name="twitter:image" content="https://rdkit.com.au/og-image.png" />
        <link rel="canonical" href="https://rdkit.com.au/rdti-program" />
      </Head>

      <Nav />

      <div className="program-hero fade-up">
        <div className="tag tag-cyan" style={{ marginBottom: 20 }}>R&DTI Program</div>
        <h1>The Australian R&D Tax Incentive, explained plainly</h1>
        <p>Everything you need to understand the program — who qualifies, what you can claim, how the offset works, and the mistakes that cost companies thousands.</p>
      </div>

      {/* What is it */}
      <div className="program-section fade-up">
        <div className="section-tag">// The 60-second version</div>
        <h2>What is the R&DTI?</h2>
        <p>The Research and Development Tax Incentive is an Australian Government program that gives companies a cash offset for eligible R&D activities. If you&rsquo;re doing genuinely innovative work — where the outcome isn&rsquo;t certain in advance — the government gives you back a percentage of what you spent on that work.</p>
        <p>It&rsquo;s not a grant. It&rsquo;s not competitive. It&rsquo;s a tax incentive available to any eligible company, and unlike grants, there&rsquo;s no pool of money that runs out. If you qualify, you claim it.</p>
        <p>The program is jointly administered by AusIndustry (who assess the R&D activities) and the ATO (who process the offset as part of your tax return).</p>

        <div className="key-stats">
          <div className="key-stat">
            <div className="big">43.5%</div>
            <div className="desc">Refundable offset for companies under $20M turnover — even if you&rsquo;re loss-making</div>
          </div>
          <div className="key-stat">
            <div className="big">$4B+</div>
            <div className="desc">Claimed by Australian companies annually through the R&DTI program</div>
          </div>
          <div className="key-stat">
            <div className="big">12,000+</div>
            <div className="desc">Companies register R&D activities each year — with many more eligible but not claiming</div>
          </div>
        </div>
      </div>

      {/* How much */}
      <div className="program-section alt fade-up">
        <div className="program-inner">
          <div className="section-tag">// Offset rates</div>
          <h2>How much can you actually get back?</h2>
          <p>The amount depends on your aggregated turnover. There are two tiers.</p>

          <div className="qual-grid">
            <div className="qual-card yes">
              <h4><span style={{ color: 'var(--sage)' }}>●</span> Under $20M turnover</h4>
              <p><strong>43.5% refundable offset.</strong> Since you&rsquo;d normally deduct R&D at your 25% tax rate, the net benefit is <strong>18.5 cents for every dollar spent on eligible R&D.</strong> And it&rsquo;s refundable — you get it as cash even in a loss year.</p>
            </div>
            <div className="qual-card yes" style={{ borderLeftColor: 'var(--amber)' }}>
              <h4><span style={{ color: 'var(--amber)' }}>●</span> $20M+ turnover</h4>
              <p><strong>38.5% non-refundable offset.</strong> Net benefit of <strong>8.5 cents per dollar</strong> above the 30% corporate rate. Reduces your tax liability; any excess carries forward.</p>
            </div>
          </div>

          <div className="rdkit-help" style={{ marginTop: 28 }}>
            <h3>📐 Quick example</h3>
            <p style={{ fontSize: '0.93rem', color: 'var(--dark)', lineHeight: 1.75, marginBottom: 0 }}>
              A SaaS startup with $400,000 in eligible R&D spend and under $20M turnover gets back roughly <strong>$74,000 cash</strong> ($400k × 18.5%). The RDKit fee at 5% is $3,700 + $500 upfront — a net benefit of over $69,800 that didn&rsquo;t exist before the claim.
            </p>
          </div>
        </div>
      </div>

      {/* Who qualifies */}
      <div className="program-section fade-up">
        <div className="section-tag">// Eligibility</div>
        <h2>What actually qualifies as R&D?</h2>
        <p>This is where most confusion lives. AusIndustry requires <strong>core R&D activities</strong> to be genuinely experimental — you&rsquo;re generating new knowledge, and the outcome can&rsquo;t be known in advance, even by a competent professional in the field. The test is <strong>genuine technical uncertainty</strong>.</p>
        <p>Supporting activities that directly enable your core R&D — building test environments, developing prototypes, collecting experimental data — can also be included. These often make up a significant portion of a claim.</p>

        <div className="qual-grid" style={{ marginTop: 24 }}>
          <div className="qual-card yes">
            <h4>✓ Likely qualifies</h4>
            <p>ML model where you don&rsquo;t know if the approach will reach target accuracy. New manufacturing process at untested scale. Novel compound with uncertain efficacy. IoT firmware for untested hardware combinations. Any technical problem where the answer isn&rsquo;t obvious to an expert.</p>
          </div>
          <div className="qual-card no">
            <h4>✗ Likely doesn&rsquo;t qualify</h4>
            <p>Implementing an established CRM. Routine software development with known methods. Copy-pasting a proven manufacturing process. Market research, business planning, or quality control. Anything where a competent professional would know how to do it from the start.</p>
          </div>
        </div>

        <div className="rdkit-help">
          <h3 style={{ marginTop: 0 }}>💡 How RDKit helps with this</h3>
          <div className="help-list">
            <div className="help-item">We assess your activities against AusIndustry&rsquo;s criteria before we start — so you know where you stand.</div>
            <div className="help-item">We write project descriptions that clearly articulate the technical uncertainty, the hypothesis, and the experimental method — the three things reviewers are looking for.</div>
            <div className="help-item">We identify supporting activities you might not have thought to claim — often adding 20–40% more to the eligible spend.</div>
          </div>
        </div>
      </div>

      {/* Real examples */}
      <div className="program-section dark fade-up">
        <div className="program-inner">
          <div className="section-tag" style={{ color: 'var(--coral)' }}>// Case studies</div>
          <h2 style={{ color: 'white' }}>How Australian companies have used the R&DTI</h2>
          <p>These represent typical claim profiles. Numbers and scenarios reflect real R&DTI claims; names are illustrative.</p>

          <div className="cases-grid">
            <div className="case-card">
              <div className="case-tag">Software / AI</div>
              <h4>AI-powered logistics platform</h4>
              <p className="case-desc">Melbourne SaaS startup building route-optimisation algorithms using ML. Technical uncertainty: whether the novel approach could beat existing heuristic methods with real-time traffic data at scale.</p>
              <div className="case-stats">
                <div className="cs"><div className="cs-label">R&D Spend</div><div className="cs-val">$320k</div></div>
                <div className="cs"><div className="cs-label">Cash offset</div><div className="cs-val hi">$59,200</div></div>
                <div className="cs"><div className="cs-label">Activities</div><div className="cs-val">3</div></div>
                <div className="cs"><div className="cs-label">Turnover</div><div className="cs-val">&lt;$20M</div></div>
              </div>
            </div>
            <div className="case-card">
              <div className="case-tag">Biotech / Medtech</div>
              <h4>Point-of-care diagnostic device</h4>
              <p className="case-desc">Sydney biotech developing a rapid diagnostic tool. Multiple unknowns: biosensor sensitivity, sample preparation, achieving consistent results outside controlled lab conditions.</p>
              <div className="case-stats">
                <div className="cs"><div className="cs-label">R&D Spend</div><div className="cs-val">$680k</div></div>
                <div className="cs"><div className="cs-label">Cash offset</div><div className="cs-val hi">$125,800</div></div>
                <div className="cs"><div className="cs-label">Activities</div><div className="cs-val">5</div></div>
                <div className="cs"><div className="cs-label">Turnover</div><div className="cs-val">&lt;$20M</div></div>
              </div>
            </div>
            <div className="case-card">
              <div className="case-tag">Manufacturing</div>
              <h4>Sustainable packaging materials</h4>
              <p className="case-desc">Brisbane manufacturer experimenting with biodegradable polymer composites. Uncertainty: whether new materials could meet food-safety and shelf-life requirements at commercial scale.</p>
              <div className="case-stats">
                <div className="cs"><div className="cs-label">R&D Spend</div><div className="cs-val">$450k</div></div>
                <div className="cs"><div className="cs-label">Cash offset</div><div className="cs-val hi">$83,250</div></div>
                <div className="cs"><div className="cs-label">Activities</div><div className="cs-val">4</div></div>
                <div className="cs"><div className="cs-label">Turnover</div><div className="cs-val">&lt;$20M</div></div>
              </div>
            </div>
            <div className="case-card">
              <div className="case-tag">AgTech</div>
              <h4>Precision irrigation network</h4>
              <p className="case-desc">Regional AgTech company building IoT soil-moisture sensors with custom firmware. Uncertainty: reliable wireless across large paddocks, calibration for diverse soil types.</p>
              <div className="case-stats">
                <div className="cs"><div className="cs-label">R&D Spend</div><div className="cs-val">$240k</div></div>
                <div className="cs"><div className="cs-label">Cash offset</div><div className="cs-val hi">$44,400</div></div>
                <div className="cs"><div className="cs-label">Activities</div><div className="cs-val">2</div></div>
                <div className="cs"><div className="cs-label">Turnover</div><div className="cs-val">&lt;$20M</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common mistakes */}
      <div className="program-section fade-up">
        <div className="section-tag">// What goes wrong</div>
        <h2>5 mistakes that cost companies thousands</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: 28 }}>After 5+ years in R&DTI consulting, these are the errors Kay sees most often — and every one of them is preventable.</p>
        <div className="mistake-list">
          {[
            { title: 'Not claiming because "we\'re not doing science"', desc: 'The R&DTI covers software, engineering, manufacturing innovation, and more. If there\'s technical uncertainty, you may qualify — no lab coat needed.' },
            { title: 'Weak project descriptions that don\'t demonstrate uncertainty', desc: 'AusIndustry needs to see a clear hypothesis, the technical uncertainty, and the experimental method. "We built a new app" gets rejected. This is where RDKit\'s expertise matters most.' },
            { title: 'Overclaiming or underclaiming eligible expenditure', desc: 'Some companies include ineligible costs (marketing, admin). Others miss legitimate items: cloud hosting for R&D, contractor costs, depreciation on R&D equipment. Both mistakes are expensive.' },
            { title: 'Not keeping contemporaneous records', desc: 'If AusIndustry audits your claim, they want to see evidence the R&D happened — git commits, experiment logs, meeting notes, test results. Records created after the fact raise red flags.' },
            { title: 'Missing the registration deadline', desc: 'You must register with AusIndustry within 10 months of your financial year end. For June 30 FY companies, that\'s April 30 the following year. No exceptions, no extensions.' },
          ].map((m, i) => (
            <div className="mistake" key={i}>
              <div className="mistake-num">{i + 1}</div>
              <div>
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rdkit-help" style={{ marginTop: 40 }}>
          <h3 style={{ marginTop: 0 }}>🛡️ How RDKit prevents all of these</h3>
          <div className="help-list">
            <div className="help-item">We assess eligibility upfront so you know before you commit any money.</div>
            <div className="help-item">We write project descriptions that meet AusIndustry&rsquo;s technical requirements — not templated, not vague.</div>
            <div className="help-item">We map your expenditure methodically to identify every eligible category — including ones you&rsquo;d miss.</div>
            <div className="help-item">We advise on record-keeping best practice so you&rsquo;re audit-ready.</div>
            <div className="help-item">We manage your registration deadline and coordinate with your accountant so nothing slips.</div>
          </div>
        </div>
      </div>

      {/* Key dates */}
      <div className="program-section alt fade-up">
        <div className="program-inner">
          <div className="section-tag">// Key dates</div>
          <h2>R&DTI timeline for FY2025-26</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 28 }}>If your financial year ends June 30, 2026, these are the dates that matter.</p>
          <div className="qual-grid">
            <div className="qual-card yes">
              <h4>📅 July 2025 – June 2026</h4>
              <p>Your R&D activities occur during this financial year. Keep records as you go — don&rsquo;t wait until the end of the year to document what you did.</p>
            </div>
            <div className="qual-card yes">
              <h4>📅 By April 30, 2027</h4>
              <p>Deadline to register your R&D activities with AusIndustry. This is 10 months after FY end and is completely non-negotiable.</p>
            </div>
            <div className="qual-card yes">
              <h4>📅 With your tax return</h4>
              <p>Your accountant includes the R&D Tax Offset Schedule with your income tax return lodgement.</p>
            </div>
            <div className="qual-card yes">
              <h4>📅 After ATO processing</h4>
              <p>The offset hits your account. For refundable offsets (under $20M), this is a direct cash payment — even if you&rsquo;re in a loss position.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '80px 32px', maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 1 }} className="fade-up">
        <div className="cta-card">
          <h2>See if your R&D qualifies — in 2 minutes</h2>
          <p>Our free eligibility quiz gives you an instant answer and a rough estimate. No sign-up required.</p>
          <div className="cta-btns">
            <Link href="/eligibility" className="btn-white btn-arrow">Take the free quiz</Link>
            <Link href="/calculator" className="btn-white-outline">Estimate your offset →</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
