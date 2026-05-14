const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const test = require('node:test')
const { seoPages } = require('../lib/seo')

const read = file => readFileSync(file, 'utf8')

test('navigation labels the calculator route as Claim Assist', () => {
  const nav = read('components/Nav.js')
  const footer = read('components/Footer.js')

  assert.match(nav, /href: '\/calculator', label: 'Claim Assist', assist: true/)
  assert.match(nav, /nav-assist-icon/)
  assert.match(nav, /nav-claim-assist/)
  assert.match(footer, />Claim Assist</)
})

test('calculator page presents the tool as AI-assisted Claim Assist', () => {
  const page = read('pages/calculator.js')

  assert.match(page, /R&D Claim Assist/)
  assert.match(page, /AI-assisted claim estimate/)
  assert.match(page, /claim-spark/)
  assert.doesNotMatch(page, /R&D Claim Assistant/)
})

test('calculator SEO keeps the route but updates the product positioning', () => {
  assert.equal(seoPages.calculator.path, '/calculator')
  assert.match(seoPages.calculator.title, /Claim Assist/)
  assert.match(seoPages.calculator.description, /AI-assisted/)
  assert.match(seoPages.calculator.h1, /Claim Assist/)
})

test('floating Claim Assist prompt is available outside the tool pages', () => {
  const app = read('pages/_app.js')
  const prompt = read('components/FloatingClaimAssist.js')

  assert.match(app, /FloatingClaimAssist/)
  assert.match(prompt, /Try free Claim Assist/)
  assert.match(prompt, /Estimate your R&D benefit in 60 seconds\./)
  assert.match(prompt, /href="\/calculator"/)
  assert.match(prompt, /'\/calculator'/)
  assert.match(prompt, /'\/diagnostic'/)
  assert.match(prompt, /rdkit:claim-assist-nudge-dismissed/)
})
