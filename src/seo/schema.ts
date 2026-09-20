import { BUSINESS, LOGO_SRC, SITE_URL, careOfShopAddress } from '../config'

const PRINTING_SERVICE_ID = `${SITE_URL}/#print-scan-finish`
const POSTAL_SERVICE_ID = `${SITE_URL}/#postal-pickup`
const VACUUM_SERVICE_ID = `${SITE_URL}/#vacuum-bags`
const BUSINESS_ID = `${SITE_URL}/#business`

export function getJsonLdGraph() {
  const careOf = careOfShopAddress()

  const printShop = {
    '@type': ['LocalBusiness', 'PrintShop'],
    '@id': BUSINESS_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.legalName,
    description:
      'Commercial printer and copy shop in Takaka, Golden Bay, Tasman. Printing, photocopying, scanning, finishing, business cards, posters, and higher-quality prints. Also New Zealand Couriers and Post Haste agent ($2 pickup fee — street address, not RD), and vacuum cleaner bags in store.',
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
        { '@type': 'Offer', itemOffered: { '@id': VACUUM_SERVICE_ID } },
      ],
    },
  }

  const commercialPrinting = {
    '@type': 'Service',
    '@id': PRINTING_SERVICE_ID,
    name: 'Commercial printing in Takaka',
    description:
      'Digital colour and black-and-white printing, photocopying, scanning, laminating, and finishing — business cards, flyers, booklets, posters, and reports up to SRA3. Print shop serving Takaka, Golden Bay, and Tasman.',
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
    name: 'NZ Couriers and Post Haste agent in Takaka',
    description: `New Zealand Couriers and Post Haste agent for parcel pickup and drop-off in Golden Bay. Address parcels ${careOf}. $2 pickup fee — street address (not Rural Delivery) often avoids RD surcharges.`,
    provider: { '@id': BUSINESS_ID },
    areaServed: {
      '@type': 'City',
      name: 'Takaka',
    },
    serviceType: 'Postal and courier pickup point',
  }

  const vacuumBags = {
    '@type': 'Service',
    '@id': VACUUM_SERVICE_ID,
    name: 'Vacuum cleaner bags in Takaka',
    description:
      'Replacement vacuum bags and filters in store at Unlimited Copies Takaka — including vac-pac, Miele, and other common brands. Walk-in matching for Golden Bay and Nelson–Tasman customers.',
    provider: { '@id': BUSINESS_ID },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Golden Bay, Tasman, New Zealand',
    },
    serviceType: 'Vacuum cleaner bags and filters retail',
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [printShop, commercialPrinting, postalPickup, vacuumBags],
  }
}

export function getJsonLdScriptHtml(): string {
  const json = JSON.stringify(getJsonLdGraph())
  return `<script type="application/ld+json">${json}</script>`
}
