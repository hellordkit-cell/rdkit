# RDKit SEO Visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make RDKit's main pages and subpages show up in Google with clear, distinct titles, snippets, page hierarchy, favicon, and structured data.

**Architecture:** Centralize SEO configuration in one small metadata module and render it through a reusable SEO component. Keep page content intact, but replace repeated per-page `<Head>` blocks with consistent metadata, schema, canonical URLs, and indexing rules.

**Tech Stack:** Next.js pages router, `next/head`, React, static XML sitemap, Node built-in test runner.

---

## Expert SEO Direction

The current site already has the SEO basics: page titles, meta descriptions, canonical URLs, Open Graph tags, Twitter tags, `robots.txt`, `sitemap.xml`, and organization schema. The work should therefore focus on clearer search intent, stronger Google display signals, and reducing duplication.

Do not turn this into keyword stuffing. Each page should own one job in search:

| Page | Search intent | Indexing decision |
| --- | --- | --- |
| `/` | Main branded service page for Australian R&D Tax Incentive consulting | `index, follow` |
| `/rdti-program` | Educational guide for eligibility, rates, deadlines, and examples | `index, follow` |
| `/calculator` | Tool query for estimating an R&D tax offset | `index, follow` |
| `/eligibility` | Qualification query for checking whether a company may qualify | `index, follow` |
| `/how-it-works` | Service-process query for how RDKit prepares the claim | `index, follow` |
| `/for-accountants` | Partner/referral query for accountants and tax agents | `index, follow` |
| `/about` | Brand trust and founder credibility query | `index, follow` |
| `/get-started` | Payment/deposit conversion page | `noindex, follow` unless the business explicitly wants deposit pages indexed |

The deposit page should usually be noindexed because it is not a discovery page. It should still be linked internally for users who are ready to pay.

## File Structure

- Create `lib/seo.js`
  - Owns site constants, page metadata, schema builders, and sitemap page list.
- Create `components/SEO.js`
  - Renders all page-level `<Head>` metadata and structured data.
- Modify `pages/_document.js`
  - Keep only global document concerns: charset, theme color, verification, fonts, favicon link, global service schema if needed.
  - Remove the global `robots` tag because `/get-started` needs a different rule.
- Modify all public pages in `pages/*.js`
  - Import `SEO` and `seoPages`.
  - Replace repeated `<Head>` metadata blocks with `<SEO page={seoPages.pageKey} />`.
  - Keep the visible H1/page content intact unless a title/H1 mismatch hurts Google display clarity.
- Modify `public/sitemap.xml`
  - Refresh `lastmod` to `2026-05-13`.
  - Remove `/get-started` if it is noindexed.
- Modify `public/robots.txt`
  - Keep crawling open and point to the sitemap.
  - Do not block `/get-started`; use page-level `noindex` instead so Google can see the directive.
- Create `public/favicon.svg`
  - A simple square RDKit brand favicon, at least 48x48 equivalent.
- Add `tests/seo.test.js`
  - Validate metadata uniqueness, canonical URLs, indexing decisions, sitemap alignment, and favicon existence.
- Modify `package.json`
  - Add a `test` script that runs `node --test tests/*.test.js`.

---

## Task 1: Central SEO Metadata

**Files:**
- Create: `lib/seo.js`
- Test: `tests/seo.test.js` later in Task 5

- [ ] **Step 1: Create the SEO metadata module**

Create `lib/seo.js` with this content:

```javascript
const siteUrl = 'https://rdkit.com.au'
const siteName = 'RDKit'
const defaultImage = `${siteUrl}/og-image.png`
const author = 'RDKit'
const contactEmail = 'hellordkit@gmail.com'

const pageDefaults = {
  siteUrl,
  siteName,
  defaultImage,
  author,
  locale: 'en_AU',
}

const seoPages = {
  home: {
    path: '/',
    title: 'R&D Tax Incentive Consultant Australia | RDKit',
    description: 'RDKit helps Australian companies prepare R&D Tax Incentive claims for 5% of the recovered offset. Check eligibility, estimate your claim, and prepare AusIndustry documentation.',
    h1: 'Your R&D is worth more than you realise',
    robots: 'index, follow',
    breadcrumbs: [{ name: 'Home', path: '/' }],
  },
  rdtiProgram: {
    path: '/rdti-program',
    title: 'R&D Tax Incentive Australia: Eligibility, Rates & Deadlines',
    description: 'Plain-English guide to the Australian R&D Tax Incentive, including who qualifies, 43.5% and 38.5% offset rates, eligible R&D activities, and AusIndustry deadlines.',
    h1: 'The Australian R&D Tax Incentive, explained plainly',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'R&D Tax Incentive Guide', path: '/rdti-program' },
    ],
  },
  calculator: {
    path: '/calculator',
    title: 'R&D Tax Offset Calculator Australia | Estimate Your Claim',
    description: 'Use RDKit\'s free Australian R&D Tax Offset calculator to estimate your refundable or non-refundable R&D Tax Incentive claim based on spend, turnover, and tax position.',
    h1: 'R&D Tax Offset Calculator',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'R&D Tax Offset Calculator', path: '/calculator' },
    ],
  },
  eligibility: {
    path: '/eligibility',
    title: 'R&D Tax Incentive Eligibility Quiz | Check If You Qualify',
    description: 'Take RDKit\'s free 2-minute quiz to see whether your Australian company may qualify for the R&D Tax Incentive and get an estimated offset range.',
    h1: 'Does your R&D qualify?',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Eligibility Quiz', path: '/eligibility' },
    ],
  },
  howItWorks: {
    path: '/how-it-works',
    title: 'R&D Tax Claim Process: From Eligibility to Lodgement',
    description: 'See how RDKit prepares R&D Tax Incentive claims, from free eligibility check to project descriptions, expenditure mapping, AusIndustry registration, and ATO schedule support.',
    h1: 'From eligibility check to cash in your account',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'How It Works', path: '/how-it-works' },
    ],
  },
  forAccountants: {
    path: '/for-accountants',
    title: 'R&D Tax Incentive Specialist for Accountants | RDKit',
    description: 'Accountants and tax agents can engage RDKit as an R&DTI specialist for client project descriptions, financial analysis, AusIndustry applications, and R&D tax schedules.',
    h1: 'Engage RDKit as your R&DTI specialist. You stay in control.',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'For Accountants', path: '/for-accountants' },
    ],
  },
  about: {
    path: '/about',
    title: 'About RDKit | R&D Tax Incentive Documentation Specialist',
    description: 'Meet RDKit, a lean Australian R&DTI documentation service helping startups and SMEs prepare genuine R&D Tax Incentive claims without big-firm fees.',
    h1: 'Built for the companies that don\'t fit the big firm model',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About RDKit', path: '/about' },
    ],
  },
  getStarted: {
    path: '/get-started',
    title: 'Pay Your R&DTI Deposit | RDKit',
    description: 'Pay the $500 RDKit deposit to begin your R&D Tax Incentive claim preparation. The deposit is credited against your final success fee.',
    h1: 'Pay your $500 deposit',
    robots: 'noindex, follow',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Get Started', path: '/get-started' },
    ],
  },
}

const indexedPages = Object.values(seoPages).filter(page => page.robots.startsWith('index'))

const absoluteUrl = path => {
  if (path === '/') return siteUrl
  return `${siteUrl}${path}`
}

const buildWebsiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  alternateName: 'RDKit R&D Tax',
  url: siteUrl,
})

const buildProfessionalServiceJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteName,
  url: siteUrl,
  logo: defaultImage,
  image: defaultImage,
  description: 'Australian R&D Tax Incentive documentation and claim preparation specialist for startups, SMEs, and accounting firms.',
  email: contactEmail,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: contactEmail,
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  priceRange: '5% of R&D tax offset recovered',
  knowsAbout: [
    'R&D Tax Incentive',
    'R&DTI',
    'AusIndustry',
    'Australian tax',
    'R&D project descriptions',
    'Eligible R&D expenditure',
  ],
})

const buildWebPageJsonLd = page => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: page.title,
  description: page.description,
  url: absoluteUrl(page.path),
  isPartOf: {
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
  },
})

const buildBreadcrumbJsonLd = page => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: page.breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
})

module.exports = {
  siteUrl,
  siteName,
  defaultImage,
  contactEmail,
  pageDefaults,
  seoPages,
  indexedPages,
  absoluteUrl,
  buildWebsiteJsonLd,
  buildProfessionalServiceJsonLd,
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
}
```

- [ ] **Step 2: Verify the module loads in Node**

Run:

```bash
node -e "const { seoPages, indexedPages } = require('./lib/seo'); console.log(Object.keys(seoPages).length, indexedPages.length)"
```

Expected:

```text
8 7
```

- [ ] **Step 3: Commit**

```bash
git add lib/seo.js
git commit -m "feat: centralize SEO metadata"
```

---

## Task 2: Reusable SEO Component

**Files:**
- Create: `components/SEO.js`
- Modify: `pages/_document.js`

- [ ] **Step 1: Create the SEO component**

Create `components/SEO.js` with this content:

```javascript
import Head from 'next/head'
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildProfessionalServiceJsonLd,
  buildWebPageJsonLd,
  buildWebsiteJsonLd,
  defaultImage,
  siteName,
} from '../lib/seo'

export default function SEO({ page, jsonLd = [] }) {
  const canonical = absoluteUrl(page.path)
  const schemas = [
    buildWebPageJsonLd(page),
    buildBreadcrumbJsonLd(page),
    ...jsonLd,
  ]

  if (page.path === '/') {
    schemas.unshift(buildWebsiteJsonLd(), buildProfessionalServiceJsonLd())
  }

  return (
    <Head>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={page.robots} />
      <meta name="author" content={siteName} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:locale" content="en_AU" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={defaultImage} />

      {schemas.map((schema, index) => (
        <script
          key={`${page.path}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  )
}
```

- [ ] **Step 2: Simplify global document metadata**

In `pages/_document.js`, keep global-only metadata. Remove the global `robots`, `author`, favicon `.ico`, Apple touch icon, and global JSON-LD block from `_document.js`. The resulting `<Head>` block should be:

```javascript
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#FF6B54" />
        <meta name="google-site-verification" content="0ZkFTTXg4L9vTuFw5xQ_50SUpHSOQBOYW07nxsDvEf0" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
```

- [ ] **Step 3: Build to catch JSX or import errors**

Run:

```bash
npm run build
```

Expected: build completes without JSX, import, or prerender errors.

- [ ] **Step 4: Commit**

```bash
git add components/SEO.js pages/_document.js
git commit -m "feat: add reusable SEO head component"
```

---

## Task 3: Replace Page-Level Metadata

**Files:**
- Modify: `pages/index.js`
- Modify: `pages/rdti-program.js`
- Modify: `pages/calculator.js`
- Modify: `pages/eligibility.js`
- Modify: `pages/how-it-works.js`
- Modify: `pages/for-accountants.js`
- Modify: `pages/about.js`
- Modify: `pages/get-started.js`

- [ ] **Step 1: Replace home page metadata**

In `pages/index.js`, replace:

```javascript
import Head from 'next/head'
```

with:

```javascript
import SEO from '../components/SEO'
import { seoPages } from '../lib/seo'
```

Then replace the entire `<Head>...</Head>` block with:

```javascript
      <SEO page={seoPages.home} />
```

- [ ] **Step 2: Replace R&DTI guide metadata**

In `pages/rdti-program.js`, replace:

```javascript
import Head from 'next/head'
```

with:

```javascript
import SEO from '../components/SEO'
import { seoPages } from '../lib/seo'
```

Then replace the entire `<Head>...</Head>` block with:

```javascript
      <SEO page={seoPages.rdtiProgram} />
```

- [ ] **Step 3: Replace calculator metadata**

In `pages/calculator.js`, replace:

```javascript
import Head from 'next/head'
```

with:

```javascript
import SEO from '../components/SEO'
import { seoPages } from '../lib/seo'
```

Then replace the entire `<Head>...</Head>` block with:

```javascript
      <SEO page={seoPages.calculator} />
```

- [ ] **Step 4: Replace eligibility metadata**

In `pages/eligibility.js`, replace:

```javascript
import Head from 'next/head'
```

with:

```javascript
import SEO from '../components/SEO'
import { seoPages } from '../lib/seo'
```

Then replace the entire `<Head>...</Head>` block with:

```javascript
      <SEO page={seoPages.eligibility} />
```

- [ ] **Step 5: Replace how-it-works metadata and keep FAQ schema**

In `pages/how-it-works.js`, replace:

```javascript
import Head from 'next/head'
```

with:

```javascript
import SEO from '../components/SEO'
import { seoPages } from '../lib/seo'
```

Inside the component, above `return`, add:

```javascript
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
```

Then replace the entire `<Head>...</Head>` block with:

```javascript
      <SEO page={seoPages.howItWorks} jsonLd={[faqJsonLd]} />
```

Remove the later standalone FAQ JSON-LD `<script>` block near the bottom of the page so the FAQ schema is only emitted once.

- [ ] **Step 6: Replace accountants page metadata**

In `pages/for-accountants.js`, replace:

```javascript
import Head from 'next/head'
```

with:

```javascript
import SEO from '../components/SEO'
import { seoPages } from '../lib/seo'
```

Then replace the entire `<Head>...</Head>` block with:

```javascript
      <SEO page={seoPages.forAccountants} />
```

- [ ] **Step 7: Replace about page metadata**

In `pages/about.js`, replace:

```javascript
import Head from 'next/head'
```

with:

```javascript
import SEO from '../components/SEO'
import { seoPages } from '../lib/seo'
```

Then replace the entire `<Head>...</Head>` block with:

```javascript
      <SEO page={seoPages.about} />
```

- [ ] **Step 8: Replace get-started metadata and apply noindex**

In `pages/get-started.js`, replace:

```javascript
import Head from 'next/head'
```

with:

```javascript
import SEO from '../components/SEO'
import { seoPages } from '../lib/seo'
```

Then replace the entire `<Head>...</Head>` block with:

```javascript
      <SEO page={seoPages.getStarted} />
```

This emits `noindex, follow` for the deposit page.

- [ ] **Step 9: Build to catch import and render errors**

Run:

```bash
npm run build
```

Expected: all pages compile and prerender successfully.

- [ ] **Step 10: Commit**

```bash
git add pages/index.js pages/rdti-program.js pages/calculator.js pages/eligibility.js pages/how-it-works.js pages/for-accountants.js pages/about.js pages/get-started.js
git commit -m "feat: apply page-specific SEO metadata"
```

---

## Task 4: Favicon, Sitemap, and Robots

**Files:**
- Create: `public/favicon.svg`
- Modify: `public/sitemap.xml`
- Modify: `public/robots.txt`

- [ ] **Step 1: Add an RDKit favicon**

Create `public/favicon.svg` with this content:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#FF6B54"/>
  <path d="M18 43V20h13c5 0 8 3 8 7 0 3-2 5-5 6l8 10h-7l-7-9h-4v9h-6zm6-14h6c2 0 3-1 3-3s-1-3-3-3h-6v6z" fill="#fff"/>
  <path d="M43 43V20h6v23h-6z" fill="#fff" opacity=".9"/>
</svg>
```

- [ ] **Step 2: Update sitemap**

Replace `public/sitemap.xml` with this content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://rdkit.com.au/</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://rdkit.com.au/rdti-program</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://rdkit.com.au/calculator</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://rdkit.com.au/eligibility</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://rdkit.com.au/how-it-works</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rdkit.com.au/for-accountants</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>https://rdkit.com.au/about</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

Do not include `/get-started` while it is `noindex`.

- [ ] **Step 3: Keep robots simple**

Keep `public/robots.txt` as:

```text
User-agent: *
Allow: /
Sitemap: https://rdkit.com.au/sitemap.xml
```

- [ ] **Step 4: Commit**

```bash
git add public/favicon.svg public/sitemap.xml public/robots.txt
git commit -m "feat: refresh crawl and favicon assets"
```

---

## Task 5: SEO Regression Tests

**Files:**
- Create: `tests/seo.test.js`
- Modify: `package.json`

- [ ] **Step 1: Add the SEO test file**

Create `tests/seo.test.js` with this content:

```javascript
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
    assert.match(sitemap, new RegExp(`<loc>${absoluteUrl(page.path)}</loc>`))
  }
})

test('favicon exists and document points to it', () => {
  assert.equal(existsSync('public/favicon.svg'), true)

  const document = readFileSync('pages/_document.js', 'utf8')
  assert.match(document, /href="\/favicon\.svg"/)
})
```

- [ ] **Step 2: Add a test script**

In `package.json`, change the `scripts` block to:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "node --test tests/*.test.js"
  },
```

- [ ] **Step 3: Run tests**

Run:

```bash
npm test
```

Expected: all tests in `tests/responsive.test.js` and `tests/seo.test.js` pass.

- [ ] **Step 4: Commit**

```bash
git add tests/seo.test.js package.json
git commit -m "test: cover SEO metadata contract"
```

---

## Task 6: Render and Search Signal Verification

**Files:**
- No planned file changes unless verification exposes a defect.

- [ ] **Step 1: Build the production site**

Run:

```bash
npm run build
```

Expected: Next.js build completes successfully.

- [ ] **Step 2: Start the production server**

Run:

```bash
npm run start
```

Expected: the server starts on `http://localhost:3000`.

- [ ] **Step 3: Inspect page heads locally**

Run these commands in a second terminal:

```bash
curl -s http://localhost:3000/ | grep -E '<title>|name="description"|name="robots"|rel="canonical"|application/ld\\+json'
curl -s http://localhost:3000/get-started | grep -E '<title>|name="description"|name="robots"|rel="canonical"'
```

Expected:

```text
The home page includes index, follow, canonical https://rdkit.com.au, WebSite schema, ProfessionalService schema, WebPage schema, and BreadcrumbList schema.
The get-started page includes noindex, follow and canonical https://rdkit.com.au/get-started.
```

- [ ] **Step 4: Verify sitemap and robots over HTTP**

Run:

```bash
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/sitemap.xml
```

Expected:

```text
robots.txt allows crawling and points to https://rdkit.com.au/sitemap.xml.
sitemap.xml lists the seven indexed pages and excludes /get-started.
```

- [ ] **Step 5: Commit verification fixes if needed**

Only if Step 1-4 expose a fix, commit the fix with:

```bash
git add components/SEO.js lib/seo.js pages public tests package.json
git commit -m "fix: correct SEO verification issues"
```

---

## Post-Deploy Checklist

- Submit `https://rdkit.com.au/sitemap.xml` in Google Search Console.
- Use URL Inspection for:
  - `https://rdkit.com.au/`
  - `https://rdkit.com.au/rdti-program`
  - `https://rdkit.com.au/calculator`
  - `https://rdkit.com.au/eligibility`
  - `https://rdkit.com.au/how-it-works`
  - `https://rdkit.com.au/for-accountants`
- Request indexing for changed indexed pages after deployment.
- Use Google's Rich Results Test for structured data validation.
- Check Google Search Console after several days for title rewrites, indexed coverage, and query impressions.

## Self-Review

- Spec coverage: The plan covers page intent, unique Google listings, reusable metadata, canonical URLs, robots behavior, favicon, schema, sitemap, tests, and verification.
- Placeholder scan: No placeholder task remains; each implementation task names exact files and concrete code.
- Type consistency: The page keys used by page imports match the keys defined in `seoPages`.
- Scope check: This is one coherent SEO metadata and indexing pass. It does not include new content pages, blog strategy, backlink strategy, analytics setup, or Google Search Console access automation.
