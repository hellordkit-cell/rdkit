const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const test = require('node:test')
const { seoPages } = require('../lib/seo')

const read = file => readFileSync(file, 'utf8')

test('navigation labels the calculator route as Claim Assist', () => {
  const nav = read('components/Nav.js')
  const footer = read('components/Footer.js')

  assert.match(nav, /href: '\/calculator', label: 'Claim Assist'/)
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
