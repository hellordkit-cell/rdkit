const MONEY = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
})

const evidenceLabels = {
  payroll: 'Payroll or timesheet records',
  invoices: 'Contractor invoices',
  tickets: 'Jira, GitHub, or project tickets',
  experiments: 'Experiment notes or iteration logs',
  architecture: 'Technical designs or architecture notes',
  financials: 'General ledger or R&D cost export',
}

const toNumber = (value, fallback = 0) => {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const formatMoney = value => MONEY.format(Math.round(toNumber(value)))

const getBaseTaxRate = ({ turnoverBand, companyTaxRate }) => {
  const parsed = toNumber(companyTaxRate, 0)
  if (parsed > 0 && parsed < 1) return parsed
  return turnoverBand === 'under20m' ? 0.25 : 0.30
}

const getLargeCompanyPremium = ({ spend, totalExpenses }) => {
  const expenses = toNumber(totalExpenses, 0)
  if (expenses <= 0) {
    return {
      intensity: null,
      premiumRate: 0.085,
      note: 'Using the lower non-refundable premium until total company expenditure is known.',
    }
  }

  const intensity = clamp(toNumber(spend, 0) / expenses, 0, 1)
  return {
    intensity,
    premiumRate: intensity > 0.02 ? 0.165 : 0.085,
    note: intensity > 0.02
      ? 'R&D intensity is above 2%, so the higher premium may apply.'
      : 'R&D intensity is at or below 2%, so the lower premium is used.',
  }
}

const calculateEstimate = input => {
  const spend = Math.max(0, toNumber(input.spend, 0))
  const turnoverBand = input.turnoverBand === 'over20m' ? 'over20m' : 'under20m'
  const profitable = Boolean(input.profitable)
  const taxRate = getBaseTaxRate({ turnoverBand, companyTaxRate: input.companyTaxRate })

  const largePremium = turnoverBand === 'over20m'
    ? getLargeCompanyPremium({ spend, totalExpenses: input.totalExpenses })
    : null

  const premiumRate = turnoverBand === 'under20m' ? 0.185 : largePremium.premiumRate
  const offsetRate = taxRate + premiumRate
  const grossOffset = spend * offsetRate
  const lostDeduction = profitable ? spend * taxRate : 0
  const incrementalBenefit = spend * premiumRate
  const refundable = turnoverBand === 'under20m'
  const currentCashBenefit = refundable || profitable ? Math.max(grossOffset - lostDeduction, 0) : 0
  const carriedForwardOffset = !refundable && !profitable ? grossOffset : 0
  const feeEstimate = Math.max(2500, grossOffset * 0.05)
  const afterFeeCurrent = currentCashBenefit > 0 ? currentCashBenefit - feeEstimate : 0

  return {
    spend,
    turnoverBand,
    profitable,
    taxRate,
    premiumRate,
    offsetRate,
    refundable,
    rAndDIntensity: largePremium ? largePremium.intensity : null,
    intensityNote: largePremium ? largePremium.note : 'Refundable small-company offset uses company tax rate plus 18.5%.',
    grossOffset,
    lostDeduction,
    incrementalBenefit,
    currentCashBenefit,
    carriedForwardOffset,
    feeEstimate,
    afterFeeCurrent,
    display: {
      spend: formatMoney(spend),
      grossOffset: formatMoney(grossOffset),
      lostDeduction: formatMoney(lostDeduction),
      incrementalBenefit: formatMoney(incrementalBenefit),
      currentCashBenefit: formatMoney(currentCashBenefit),
      carriedForwardOffset: formatMoney(carriedForwardOffset),
      feeEstimate: formatMoney(feeEstimate),
      afterFeeCurrent: formatMoney(afterFeeCurrent),
      offsetRate: `${(offsetRate * 100).toFixed(1)}%`,
      premiumRate: `${(premiumRate * 100).toFixed(1)}%`,
      taxRate: `${(taxRate * 100).toFixed(1)}%`,
      rAndDIntensity: largePremium && largePremium.intensity !== null
        ? `${(largePremium.intensity * 100).toFixed(2)}%`
        : 'Unknown',
    },
  }
}

const normalizeEvidence = evidence => {
  if (!evidence) return []
  if (Array.isArray(evidence)) return evidence.filter(Boolean)
  if (typeof evidence === 'object') {
    return Object.entries(evidence)
      .filter(([, selected]) => Boolean(selected))
      .map(([key]) => key)
  }
  return []
}

const hasMeaningfulText = value => typeof value === 'string' && value.trim().length >= 24

const buildRiskAssessment = input => {
  const evidence = normalizeEvidence(input.evidence)
  const risks = []
  const strengths = []
  const followUpQuestions = []

  if (!hasMeaningfulText(input.projectSummary)) {
    risks.push('Project description is too thin to assess R&D eligibility.')
    followUpQuestions.push('What product or technical system were you trying to build or improve?')
  } else {
    strengths.push('Project has a written technical summary to start discovery.')
  }

  if (!hasMeaningfulText(input.technicalUncertainty)) {
    risks.push('Technical uncertainty is not clearly described.')
    followUpQuestions.push('What technical uncertainty could not be solved by routine engineering or public knowledge?')
  } else {
    strengths.push('Technical uncertainty has been described.')
  }

  if (!hasMeaningfulText(input.experimentation)) {
    risks.push('Experimentation or iteration evidence is missing.')
    followUpQuestions.push('What experiments, prototypes, failed attempts, or technical iterations did the team run?')
  } else {
    strengths.push('Experimentation narrative is available.')
  }

  if (evidence.length < 2) {
    risks.push('Evidence base is light; at least two record types should be gathered before a serious claim review.')
  } else {
    strengths.push(`${evidence.length} evidence categories are already available.`)
  }

  if (toNumber(input.spend, 0) < 50000) {
    risks.push('Spend is below the current calculator floor, so fee/value fit needs review.')
  }

  const missingEvidence = Object.keys(evidenceLabels)
    .filter(key => !evidence.includes(key))
    .map(key => evidenceLabels[key])

  const score = clamp(
    35
      + (hasMeaningfulText(input.projectSummary) ? 15 : 0)
      + (hasMeaningfulText(input.technicalUncertainty) ? 20 : 0)
      + (hasMeaningfulText(input.experimentation) ? 15 : 0)
      + Math.min(evidence.length * 5, 15),
    0,
    100
  )

  const confidence = score >= 75 ? 'strong' : score >= 55 ? 'moderate' : 'early'
  const recommendedNextStep = confidence === 'strong'
    ? 'Book a claim review and prepare the listed evidence.'
    : confidence === 'moderate'
      ? 'Answer the follow-up questions before estimating claim readiness.'
      : 'Run a discovery call before relying on the estimate.'

  return {
    score,
    confidence,
    strengths,
    risks,
    followUpQuestions,
    missingEvidence,
    selectedEvidence: evidence.map(key => evidenceLabels[key] || key),
    recommendedNextStep,
  }
}

const buildDeterministicDiagnostic = input => {
  const estimate = calculateEstimate(input)
  const assessment = buildRiskAssessment(input)

  return {
    estimate,
    assessment,
    summary: [
      `Estimated gross offset is ${estimate.display.grossOffset}.`,
      estimate.currentCashBenefit > 0
        ? `Estimated current cash/tax benefit is ${estimate.display.currentCashBenefit} before RDKit fee.`
        : `Estimated current cash benefit is ${estimate.display.currentCashBenefit}; the non-refundable offset may be carried forward.`,
      `Diagnostic confidence is ${assessment.confidence} (${assessment.score}/100).`,
    ].join(' '),
    guardrail: 'This is a diagnostic estimate only, not tax advice or a lodged claim position.',
  }
}

module.exports = {
  evidenceLabels,
  calculateEstimate,
  buildRiskAssessment,
  buildDeterministicDiagnostic,
  formatMoney,
}
