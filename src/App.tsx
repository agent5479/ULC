import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Visit } from './components/Visit'
import { BUSINESS, SITE_NAME, SITE_URL } from './config'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PrintShop',
  name: BUSINESS.name,
  alternateName: BUSINESS.legalName,
  description:
    'Commercial printer and copy shop in Takaka, Tasman. Printing, scanning, finishing, and postal courier pickup/drop-off (gold coin fee — not an RD address).',
  url: SITE_URL,
  email: BUSINESS.email,
  telephone: BUSINESS.phoneE164,
  image: `${SITE_URL}/images/counter.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -40.8516,
    longitude: 172.8063,
  },
  openingHoursSpecification: BUSINESS.hours.schema.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.day,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [BUSINESS.facebook],
  priceRange: '$$',
}

export default function App() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-header__inner">
          <a className="site-header__brand" href="#top" aria-label={SITE_NAME}>
            {SITE_NAME}
          </a>
          <nav className="site-nav" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#visit">Visit</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>
      <main id="main">
        <Hero />
        <Services />
        <Visit />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
