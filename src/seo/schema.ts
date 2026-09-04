import { BUSINESS, LOGO_SRC, SITE_URL } from '../config'

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
      'Commercial printer and copy shop in Takaka, Tasman. Printing, scanning, finishing, business cards, posters, and higher-quality prints. Also New Zealand Couriers and Post Haste agent ($2 pickup fee — street address, not RD).',
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: BUSINESS.phoneE164,
    image: `${SITE_URL}/images/shop-wide.jpg`,
    logo: `${SITE_URL}${LOGO_SRC}`,
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
      'New Zealand Couriers and Post Haste agent. Address parcels c/o Unlimited Copies, 29 Commercial Street, Takaka. $2 pickup fee — street address (not Rural Delivery) often avoids RD surcharges.',
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
