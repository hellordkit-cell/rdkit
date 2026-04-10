import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const questions = [
  {
    question: 'Is your company incorporated in Australia (or an Australian tax resident)?',
    options: ['Yes', 'No', 'Not sure'],
    weights: [2, -5, 0],
  },
  {
    question: "Does your company have an aggregated turnover under $20 million?",
    options: ['Yes, under $20M', 'No, over $20M', 'Not sure'],
    weights: [2, 1, 0],
  },
  {
    question: "What industry does your R&D fall into?",
    options: ['Software / SaaS / AI', 'Manufacturing / Engineering', 'Biotech / Pharma / Medical', 'Agriculture / Food', 'Energy / CleanTech', 'Other'],
    weights: [2, 2, 2, 2, 2, 1],
  },
  {
    question: "Are you trying to solve a technical problem where the outcome is uncertain?",
    options: ["Yes — we're experimenting and don't know if it'll work", "Somewhat — there's some technical uncertainty", "No — we're building something with known methods"],
    weights: [3, 2, -2],
  },
  {
    question: "Can you describe a hypothesis you're testing through your R&D work?",
    options: ["Yes — we have clear hypotheses we're testing", "Sort of — we have goals but haven't framed them as hypotheses", "No — we're just building / developing"],
    weights: [3, 1, -1],
  },
  {
    question: "Do you keep records of your R&D activities (e.g., experiment logs, git commits, test results)?",
    options: ["Yes — we have good documentation", "Some — but it's inconsistent", "No — we don't track this"],
    weights: [2, 1, -1],
  },
  {
    question: "Have you claimed the R&DTI before?",
    options: ["Yes — we've claimed before", "No — this would be our first time", "We tried but gave up / got rejected"],
    weights: [1, 1, 1],
  },
  {
    question: "Roughly how much do you spend annually on R&D activities (salaries, contractors, materials)?",
    options: ['Under $100k', '$100k – $500k', '$500k – $1M', 'Over $1M'],
    weights: [1, 2, 3, 3],
  },
]

export default function Eligibility() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [scores, setScores] = useState([])
  const [done, setDone] = useState(false)

  const selectOption = (idx) => {
    const newAnswers = [...answers]
    const newScores = [...scores]
    newAnswers[current] = idx
    newScores[current] = questions[current].weights[idx]
    setAnswers(newAnswers)
    setScores(newScores)
  }

  const goNext = () => {
    if (answers[current] === undefined) return
    if (current < questions.length - 1) setCurrent(current + 1)
    else setDone(true)
  }

  const goBack = () => { if (current > 0) setCurrent(current - 1) }

  const retake = () => { setCurrent(0); setAnswers([]); setScores([]); setDone(false) }

  const pct = done ? 100 : (current / questions.length) * 100

  // Results calculation
  let result = null
  if (done) {
    const total = scores.reduce((a, b) => a + b, 0)
    const max = questions.reduce((a, q) => a + Math.max(...q.weights), 0)
    const score = (total / max) * 100

    const isSmall = answers[1] === 0
    const rate = isSmall ? 0.185 : 0.085
    const spendRanges = [[50000, 100000], [100000, 500000], [500000, 1000000], [1000000, 2000000]]
    const [sLow, sHigh] = spendRanges[answers[7]] || [100000, 500000]
    const oLow = Math.round(sLow * rate)
    const oHigh = Math.round(sHigh * rate)
    const industries = ['Software / SaaS / AI', 'Manufacturing / Engineering', 'Biotech / Pharma / Medical', 'Agriculture / Food', 'Energy / CleanTech', 'Other']
    const industry = industries[answers[2]] || 'Other'

    if (total <= 2 || scores.some(s => s <= -5)) {
      result = { icon: '❌', cls: 'negative', title: "Hmm, eligibility looks unlikely right now", msg: "Based on your answers, your company may not currently meet the R&DTI criteria. But eligibility can change as your activities evolve. We'd still be happy to have a quick chat to explore options.", cta: 'Chat with Kay anyway', showEstimate: false }
    } else if (score >= 65) {
      result = { icon: '🎉', cls: 'positive', title: "Great news — you're very likely eligible!", msg: "Your company looks like a strong candidate for the R&D Tax Incentive. Here's a rough estimate based on your answers.", cta: 'Book your free strategy call', showEstimate: true }
    } else {
      result = { icon: '🤔', cls: 'maybe', title: "You might be eligible — let's dig deeper", msg: "Your answers suggest potential, but we'd need to look at your R&D activities in more detail. A free chat with Kay will give you a clear answer.", cta: 'Book a free chat with Kay', showEstimate: true }
    }

    result.oLow = oLow; result.oHigh = oHigh; result.industry = industry; result.isSmall = isSmall
  }

  const fmt = n => '$' + n.toLocaleString()
  const q = questions[current]

  return (
    <>
      <Head>
        <title>Free R&D Tax Eligibility Quiz — RDKit</title>
        <meta name="description" content="Take our free 2-minute quiz to find out if your business qualifies for the Australian R&D Tax Incentive — and how much you could claim back." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo">rd<span>kit.</span></Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#pricing">Pricing</Link></li>
            <li><Link href="/rdti-program">R&DTI Guide</Link></li>
            <li><Link href="/#about">About</Link></li>
          </ul>
        </div>
      </nav>

      <main style={{ flex: 1, minHeight: '100vh' }}>
        <div className="quiz-hero">
          <div className="quiz-badge">Free · 2 minutes · instant result</div>
          <h1>Could your R&D be worth thousands?</h1>
          <p>Answer 8 quick questions. We&rsquo;ll tell you if you likely qualify for the R&DTI and estimate what you could get back.</p>
        </div>

        <div id="quiz-container">
          <div className="quiz-progress">
            <div className="quiz-progress-bar" style={{ width: `${pct}%` }} />
          </div>

          {!done ? (
            <div className="quiz-body">
              <div className="quiz-question-num">
                // question {String(current + 1).padStart(2, '0')} of {String(questions.length).padStart(2, '0')}
              </div>
              <div className="quiz-question-text">{q.question}</div>
              <div className="quiz-options">
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`quiz-option${answers[current] === i ? ' selected' : ''}`}
                    onClick={() => selectOption(i)}
                  >
                    <div className="quiz-option-dot" />
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
              <div className="quiz-nav">
                {current > 0 ? (
                  <button className="btn-glass" onClick={goBack}>← Back</button>
                ) : <div />}
                <button
                  className="btn btn-primary"
                  onClick={goNext}
                  disabled={answers[current] === undefined}
                >
                  {current === questions.length - 1 ? 'See my results' : 'Next →'}
                </button>
              </div>
            </div>
          ) : (
            <div className="quiz-result">
              <div className={`result-icon ${result.cls}`}>{result.icon}</div>
              <h3>{result.title}</h3>
              <p>{result.msg}</p>

              {result.showEstimate && (
                <div className="estimate-box">
                  <div className="estimate-row">
                    <span className="elabel">Industry</span>
                    <span className="val">{result.industry}</span>
                  </div>
                  <div className="estimate-row">
                    <span className="elabel">Company size</span>
                    <span className="val">{result.isSmall ? 'Under $20M turnover (refundable offset)' : '$20M+ turnover (non-refundable offset)'}</span>
                  </div>
                  <div className="estimate-row">
                    <span className="elabel">Offset rate</span>
                    <span className="val">{result.isSmall ? '43.5% (net 18.5%)' : '38.5% (net 8.5%)'}</span>
                  </div>
                  <div className="estimate-row">
                    <span className="elabel">Estimated cash back</span>
                    <span className="val big">{fmt(result.oLow)} – {fmt(result.oHigh)}</span>
                  </div>
                  <div className="estimate-row">
                    <span className="elabel">RDKit fee (5%)</span>
                    <span className="val">
                      {fmt(Math.max(2500, Math.round(result.oLow * 0.05) + 500))} – {fmt(Math.max(2500, Math.round(result.oHigh * 0.05) + 500))}
                    </span>
                  </div>
                </div>
              )}

              <Link href="/#about" className="btn btn-primary btn-arrow">{result.cta} </Link>
              <div style={{ marginTop: '16px' }}>
                <button className="btn-ghost" onClick={retake}>Retake quiz</button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">rd<span>kit.</span></div>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#pricing">Pricing</Link></li>
            <li><Link href="/rdti-program">R&DTI Guide</Link></li>
          </ul>
          <div className="footer-copy">&copy; 2026 RDKit. ABN coming soon.</div>
        </div>
      </footer>
    </>
  )
}
