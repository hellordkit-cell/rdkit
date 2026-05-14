const assert = require('node:assert/strict')
const { existsSync, readFileSync } = require('node:fs')
const test = require('node:test')
const {
  absoluteUrl,
  indexedPages,
  seoPages,
} = require('../lib/seo')

test('SEO pages have unique titles and descriptions', () => {
  const pages = Object.values(seoPages)
  const titles = pages.map(page => page.title)
  const descriptions = pages.map(page => page.description)

  assert.equal(new Set(titles).size, titles.length)
  assert.equal(new Set(descriptions).size, descriptions.length)
})

test('indexed pages have canonical absolute URLs', () => {
  for (const page of indexedPages) {
    assert.equal(absoluteUrl(page.path).startsWith('https://rdkit.com.au'), true)
    assert.match(page.robots, /^index, follow$/)
  }
})

test('deposit page is noindex and excluded from sitemap', () => {
  assert.equal(seoPages.getStarted.robots, 'noindex, follow')

  const sitemap = readFileSync('public/sitemap.xml', 'utf8')
  assert.doesNotMatch(sitemap, /\/get-started/)
})

test('sitemap includes every indexed SEO page', () => {
  const sitemap = readFileSync('public/sitemap.xml', 'utf8')

  for (const page of indexedPages) {
    const sitemapUrl = page.path === '/' ? `${absoluteUrl(page.path)}/` : absoluteUrl(page.path)
    assert.match(sitemap, new RegExp(`<loc>${sitemapUrl}</loc>`))
  }
})

test('favicon exists and document points to it', () => {
  assert.equal(existsSync('public/favicon.svg'), true)

  const document = readFileSync('pages/_document.js', 'utf8')
  assert.match(document, /href="\/favicon\.svg"/)
})
