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
    title: 'R&D Claim Assist Australia | AI-Assisted Offset Estimate',
    description: 'Use RDKit Claim Assist for an AI-assisted R&D Tax Incentive estimate, cash-position snapshot, and evidence-readiness path based on spend, turnover, and tax position.',
    h1: 'R&D Claim Assist',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'R&D Claim Assist', path: '/calculator' },
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
