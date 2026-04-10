import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const questions = [
  { question: 'Is your company incorporated in Australia (or an Australian tax resident)?', options: ['Yes', 'No', 'Not sure'], weights: [2, -5, 0] },
  { question: 'Does your company have an aggregated turnover under $20 million?', options: ['Yes, under $20M', 'No, over $20M', 'Not sure'], weights: [2, 1, 0] },
  { question: 'What industry does your R&D fall into?', options: ['Software / SaaS / AI', 'Manufacturing / Engineering', 'Biotech / Pharma / Medical', 'Agriculture / Food / CleanTech', 'Other'], weights: [2, 2, 2, 2, 1] },
  { question: 'Are you trying to solve a technical problem where the outcome is uncertain?', options: ["Yes — we're experimenting and don't know if it'll work", "Somewhat — there's some technical uncertainty", "No — we're building with known methods"], weights: [3, 2, -2] },
  { question: 'Can you describe a hypothesis you\'re testing through your R&D?', options: ["Yes — clear hypotheses we're actively testing", "Sort of — goals but not framed as hypotheses", "No — we're just building / developing"], weights: [3, 1, -1] },
  { question: 'Do you keep records of your R&D activities?', options: ['Yes — good documentation (logs, commits, test results)', 'Some — but inconsistent', "No — we don't track this"], weights: [2, 1, -1] },
  { question: 'Have you claimed the R&DTI before?', options: ["Yes — we've claimed successfully before", "No — this would be our first claim", "We tried but gave up or got rejected"], weights: [1, 1, 1] },
  { question: 'Roughly how much do you spend annually on R&D (salaries, contractors, materials)?', options: ['Under $100k', '$100k – $500k', '$500k – $1M', 'Over $1M'], weights: [1, 2, 3, 3] },
]

export default function Eligibility() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [scores, setScores] = useState([])
  const [done, setDone] = useState(false)

  const selectOption = idx => {
    const a = [...answers]; a[current] = idx
    const s = [...scores]; s[current] = questions[current].weights[idx]
    setAnswers(a); setScores(s)
  }

  const goNext = () => {
    if (answers[current] === undefined) return
    if (current < questions.length - 1) setCurrent(current + 1)
    else setDone(true)
  }

  const retake = () => { setCurrent(0); setAnswers([]); setScores([]); setDone(false) }

  const pct = done ? 100 : (current / questions.length) * 100
  const q = questions[current]
  const fmt = n => '$' + n.toLocaleString()

  let result = null
  if (done) {
    const total = scores.reduce((a, b) => a + b, 0)
    const max = questions.reduce((a, q) => a + Math.max(...q.weights), 0)
    const score = (total / max) * 100
    const isSmall = answers[1] === 0
    const rate = isSmall ? 0.185 : 0.085
    const spendRanges = [[50000,100000],[100000,500000],[500000,1000000],[1000000,2000000]]
    const [sLow, sHigh] = spendRanges[answers[7]] || [100000,500000]
    const oLow = Math.round(sLow * rate)
    const oHigh = Math.round(sHigh * rate)
    const industries = ['Software / SaaS / AI','Manufacturing / Engineering','Biotech / Pharma / Medical','Agriculture / Food / CleanTech','Other']
    const industry = industries[answers[2]] || 'Other'

    if (total <= 2 || scores.some(s => s <= -5)) {
      result = { icon: '❌', cls: 'neg', title: "Eligibility looks unlikely right now", msg: "Based on your answers, your company may not currently meet the R&DTI criteria. But this can change as your activities evolve — and sometimes the quiz doesn't capture the full picture. Feel free to reach out directly.", showEstimate: false }
    } else if (score >= 65) {
      result = { icon: '🎉', cls: 'pos', title: "Strong eligibility — you're very likely to qualify", msg: "Your company looks like a great candidate for the R&D Tax Incentive. Here's a rough estimate based on your answers. Book a free call to get the precise number.", showEstimate: true }
    } else {
      result = { icon: '🤔', cls: 'may', title: "Potential eligibility — worth investigating", msg: "Your answers suggest there's something to work with, but we'd need to look at your R&D activities in more detail. A free 20-minute call with Kay will give you a definitive answer.", showEstimate: true }
    }
    result.oLow = oLow; result.oHigh = oHigh; result.industry = industry; result.isSmall = isSmall
  }

  return (
    <>
      <Head>
        <title>Free R&D Tax Eligibility Quiz — RDKit</title>
        <meta name="description" content="2-minute quiz to find out if your business qualifies for the Australian R&D Tax Incentive. Instant result, no sign-up." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Nav />

      <div className="quiz-page">
        <div className="quiz-hero">
          <div className="badge">Free · 2 minutes · instant result</div>
          <h1>Does your R&D qualify?</h1>
          <p>Answer 8 quick questions and get an honest eligibility verdict — plus a rough estimate of your potential offset.</p>
        </div>

        <div className="quiz-container">
          <div className="quiz-bar">
            <div className="quiz-bar-fill" style={{ width: `${pct}%` }} />
          </div>

          {!done ? (
            <div className="quiz-body">
              <div className="quiz-q-num">Question {String(current + 1).padStart(2,'0')} of {String(questions.length).padStart(2,'0')}</div>
              <div className="quiz-q-text">{q.question}</div>
              <div className="quiz-options">
                {q.options.map((opt, i) => (
                  <div key={i} className={`quiz-opt${answers[current] === i ? ' selected' : ''}`} onClick={() => selectOption(i)}>
                    <div className="quiz-dot" />
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
              <div className="quiz-nav">
                {current > 0 ? <button className="btn-glass" onClick={() => setCurrent(current - 1)}>← Back</button> : <div />}
                <button className="btn btn-primary" onClick={goNext} disabled={answers[current] === undefined}>
                  {current === questions.length - 1 ? 'See my result' : 'Next →'}
                </button>
              </div>
            </div>
          ) : (
            <div className="quiz-result">
              <div className={`result-icon-wrap ${result.cls}`}>{result.icon}</div>
              <h3>{result.title}</h3>
              <p>{result.msg}</p>

              {result.showEstimate && (
                <div className="est-box">
                  <div className="est-row"><span className="el">Industry</span><span className="ev">{result.industry}</span></div>
                  <div className="est-row"><span className="el">Company size</span><span className="ev">{result.isSmall ? 'Under $20M (refundable offset)' : '$20M+ (non-refundable offset)'}</span></div>
                  <div className="est-row"><span className="el">Net offset rate</span><span className="ev">{result.isSmall ? '18.5%' : '8.5%'} of eligible spend</span></div>
                  <div className="est-row">
                    <span className="el">Estimated cash back</span>
                    <span className="ev big">{fmt(result.oLow)} – {fmt(result.oHigh)}</span>
                  </div>
                  <div className="est-row">
                    <span className="el">RDKit fee (5%)</span>
                    <span className="ev">{fmt(Math.max(2500, Math.round(result.oLow * 0.05) + 500))} – {fmt(Math.max(2500, Math.round(result.oHigh * 0.05) + 500))}</span>
                  </div>
                </div>
              )}

              <a href="mailto:hello@rdkit.com.au" className="btn btn-primary btn-arrow">
                {result.cls === 'neg' ? 'Talk to Kay directly' : 'Book your free strategy call'}
              </a>
              <div style={{ marginTop: 16 }}>
                <button className="btn-ghost" onClick={retake}>Retake quiz</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
