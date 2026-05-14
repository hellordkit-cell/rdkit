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
