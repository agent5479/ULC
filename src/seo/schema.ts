import { BUSINESS, SITE_URL, logoUrl } from '../config'

const PRINTING_SERVICE_ID = `${SITE_URL}/#commercial-printing`
const POSTAL_SERVICE_ID = `${SITE_URL}/#postal-pickup`
const BUSINESS_ID = `${SITE_URL}/#business`

export function getJsonLdGraph() {
  const printShop = {
    '@type': ['LocalBusiness', 'PrintShop'],
    '@id': BUSINESS_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.legalName,
    description:
      'Commercial printer and copy shop in Takaka, Tasman. Printing, scanning, finishing, and postal courier pickup/drop-off (gold coin fee — not an RD address).',
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: BUSINESS.phoneE164,
    image: `${SITE_URL}/images/counter.jpg`,
    logo: `${SITE_URL}${logoUrl()}`,
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
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Golden Bay, Tasman, New Zealand',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Print shop services in Takaka',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@id': PRINTING_SERVICE_ID } },
        { '@type': 'Offer', itemOffered: { '@id': POSTAL_SERVICE_ID } },
      ],
    },
  }

  const commercialPrinting = {
    '@type': 'Service',
    '@id': PRINTING_SERVICE_ID,
    name: 'Commercial printing in Takaka',
    description:
      'Digital colour and black-and-white printing, photocopying, scanning, laminating, and finishing — business cards, flyers, booklets, posters, and reports up to SRA3.',
    provider: { '@id': BUSINESS_ID },
    areaServed: {
      '@type': 'City',
      name: 'Takaka',
    },
    serviceType: 'Commercial printing and copy shop',
  }

  const postalPickup = {
    '@type': 'Service',
    '@id': POSTAL_SERVICE_ID,
    name: 'Postal and courier pickup in Takaka',
    description:
      'Courier pickup and drop-off point on Commercial Street (street address, not Rural Delivery). Gold-coin fee for pickup use — often cheaper than RD courier rates.',
    provider: { '@id': BUSINESS_ID },
    areaServed: {
      '@type': 'City',
      name: 'Takaka',
    },
    serviceType: 'Postal and courier pickup point',
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [printShop, commercialPrinting, postalPickup],
  }
}

export function getJsonLdScriptHtml(): string {
  const json = JSON.stringify(getJsonLdGraph())
  return `<script type="application/ld+json">${json}</script>`
}
