const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const test = require('node:test')
const path = require('node:path')

const root = path.join(__dirname, '..')
const read = file => readFileSync(path.join(root, file), 'utf8')

test('lead capture appears on the homepage mini calculator', () => {
  const source = read('pages/index.js')

  assert.match(source, /LeadCapture/)
  assert.match(source, /home-mini-calculator/)
  assert.match(source, /hero-secondary-actions/)
  assert.doesNotMatch(source, /className="btn btn-primary btn-arrow">Take the free quiz/)
  assert.doesNotMatch(source, /Open Claim Assist/)
})

test('claim assistant gates the AI diagnostic instead of showing an embedded lead form', () => {
  const source = read('pages/calculator.js')

  assert.match(source, /LeadGateModal/)
  assert.match(source, /claim-assistant-diagnostic-gate/)
  assert.match(source, /rdkit:diagnostic-prefill/)
  assert.doesNotMatch(source, /claim-assistant-snapshot/)
  assert.doesNotMatch(source, /Send this estimate to RDKit/)
})

test('lead capture appears after diagnostic results', () => {
  const source = read('pages/diagnostic.js')

  assert.match(source, /LeadCapture/)
  assert.match(source, /diagnostic-result/)
})

test('lead capture appears in the site footer', () => {
  const source = read('components/Footer.js')

  assert.match(source, /LeadCapture/)
  assert.match(source, /site-footer/)
})

test('diagnostic page can import calculator context from the gate', () => {
  const source = read('pages/diagnostic.js')

  assert.match(source, /rdkit:diagnostic-prefill/)
  assert.match(source, /Estimate imported from Claim Assist/)
})

test('lead gate modal includes AI acknowledgement and lead submission', () => {
  const source = read('components/LeadGateModal.js')

  assert.match(source, /AI-assisted/)
  assert.match(source, /not tax advice/)
  assert.match(source, /acknowledged/)
  assert.match(source, /\/api\/leads/)
})
