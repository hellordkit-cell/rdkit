const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const test = require('node:test')

const nav = readFileSync('components/Nav.js', 'utf8')
const home = readFileSync('pages/index.js', 'utf8')
const css = readFileSync('styles/globals.css', 'utf8')

test('shared nav exposes a collapsible mobile menu contract', () => {
  assert.match(nav, /useState/)
  assert.match(nav, /nav-menu-button/)
  assert.match(nav, /aria-expanded=\{menuOpen\}/)
  assert.match(nav, /id="mobile-nav-menu"/)
  assert.match(nav, /nav-mobile-link/)
})

test('home comparison section uses responsive class hooks instead of inline grid columns', () => {
  assert.match(home, /className="comparison-section/)
  assert.match(home, /className="comparison-grid"/)
  assert.doesNotMatch(home, /gridTemplateColumns: '1fr 1fr'/)
})

test('phone breakpoint stacks the primary page components', () => {
  assert.match(css, /@media\(max-width: 560px\)/)
  assert.match(css, /\.nav-menu-button\s*\{[^}]*display: inline-flex/s)
  assert.match(css, /\.nav-mobile-menu\.open\s*\{[^}]*display: block/s)
  assert.match(css, /\.comparison-grid\s*\{[^}]*grid-template-columns: 1fr/s)
  assert.match(css, /\.hero-ctas \.btn\s*\{[^}]*width: 100%/s)
  assert.match(css, /\.mini-result-row\s*\{[^}]*flex-wrap: wrap/s)
  assert.match(css, /\.lead-fields\s*\{[^}]*grid-template-columns: 1fr/s)
})
