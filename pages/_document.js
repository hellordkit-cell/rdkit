import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en-AU">
      <Head>
        {/* Charset & global meta */}
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="RDKit" />
        <meta name="theme-color" content="#FF6B54" />
        <meta name="google-site-verification" content="0ZkFTTXg4L9vTuFw5xQ_50SUpHSOQBOYW07nxsDvEf0" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />

        {/* Global JSON-LD — Organisation schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'RDKit',
              url: 'https://rdkit.com.au',
              logo: 'https://rdkit.com.au/og-image.png',
              description: "Australia's R&D Tax Incentive documentation specialist. We prepare project descriptions and financial analysis for your R&DTI claim at 5% of what you recover.",
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'AU',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hellordkit@gmail.com',
                contactType: 'customer service',
                availableLanguage: 'English',
              },
              sameAs: [],
              areaServed: {
                '@type': 'Country',
                name: 'Australia',
              },
              priceRange: '5% of R&D tax offset recovered',
              knowsAbout: ['R&D Tax Incentive', 'AusIndustry', 'R&DTI', 'Australian tax', 'Innovation'],
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
