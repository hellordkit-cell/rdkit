const assert = require('node:assert/strict')
const test = require('node:test')

const {
  buildDeterministicDiagnostic,
  calculateEstimate,
} = require('../lib/rdtiDiagnostic')

test('small loss-making company shows refundable cash benefit after fee', () => {
  const estimate = calculateEstimate({
    turnoverBand: 'under20m',
    profitable: false,
    spend: 300000,
    companyTaxRate: 0.25,
  })

  assert.equal(estimate.refundable, true)
  assert.equal(Math.round(estimate.grossOffset), 130500)
  assert.equal(Math.round(estimate.currentCashBenefit), 130500)
  assert.equal(Math.round(estimate.carriedForwardOffset), 0)
  assert.equal(Math.round(estimate.feeEstimate), 6525)
  assert.equal(Math.round(estimate.afterFeeCurrent), 123975)
})

test('large loss-making company does not show carried-forward offset as current cash', () => {
  const estimate = calculateEstimate({
    turnoverBand: 'over20m',
    profitable: false,
    spend: 300000,
    totalExpenses: 20000000,
    companyTaxRate: 0.30,
  })

  assert.equal(estimate.refundable, false)
  assert.equal(Math.round(estimate.grossOffset), 115500)
  assert.equal(Math.round(estimate.currentCashBenefit), 0)
  assert.equal(Math.round(estimate.carriedForwardOffset), 115500)
  assert.equal(Math.round(estimate.afterFeeCurrent), 0)
})

test('diagnostic scoring rewards uncertainty, experimentation, and evidence', () => {
  const diagnostic = buildDeterministicDiagnostic({
    turnoverBand: 'under20m',
    profitable: false,
    spend: 220000,
    projectSummary: 'We built a new dispatch optimisation engine for route planning under changing constraints.',
    technicalUncertainty: 'The team was uncertain whether live route changes could be solved within acceptable latency.',
    experimentation: 'We tested three optimisation strategies, rejected two, and measured latency under simulated load.',
    evidence: ['payroll', 'tickets', 'experiments'],
  })

  assert.equal(diagnostic.assessment.confidence, 'strong')
  assert.ok(diagnostic.assessment.score >= 75)
  assert.match(diagnostic.summary, /Estimated gross offset/)
  assert.equal(diagnostic.guardrail.includes('not tax advice'), true)
})
