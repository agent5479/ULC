/** Swap logo by changing ACTIVE_LOGO to 1–6 */
export const ACTIVE_LOGO = 1 as 1 | 2 | 3 | 4 | 5 | 6

export const SITE_URL = 'https://agent5479.github.io/ULC'
export const SITE_NAME = 'Unlimited Copies Takaka'

export const BUSINESS = {
  name: 'Unlimited Copies Takaka',
  legalName: 'Unlimited Copies 07',
  tagline: 'Commercial printing in Takaka, Tasman',
  address: {
    street: '29 Commercial Street',
    locality: 'Takaka',
    region: 'Tasman',
    postalCode: '7110',
    country: 'NZ',
  },
  phoneDisplay: '03 525 8355',
  phoneE164: '+6435258355',
  email: 'ulc@actrix.co.nz',
  facebook: 'https://www.facebook.com/p/Unlimited-Copies-100050000846281/',
  hours: {
    weekdays: 'Monday–Friday 9:00 AM – 5:00 PM',
    weekend: 'Closed Saturday & Sunday',
    schema: [
      { day: 'Monday', opens: '09:00', closes: '17:00' },
      { day: 'Tuesday', opens: '09:00', closes: '17:00' },
      { day: 'Wednesday', opens: '09:00', closes: '17:00' },
      { day: 'Thursday', opens: '09:00', closes: '17:00' },
      { day: 'Friday', opens: '09:00', closes: '17:00' },
    ],
  },
} as const

export const PHOTOS = {
  hero: 'images/counter',
  services: 'images/copiers',
  postal: 'images/equipment',
  visit: 'images/service-desk',
} as const

/** Max total decoded attachment size (bytes) before base64 inflation */
export const MAX_ATTACHMENTS_BYTES = 6 * 1024 * 1024

export const ACCEPTED_FILE_TYPES =
  '.pdf,.png,.jpg,.jpeg,.gif,.webp,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv'

/** Live when GitHub secret / local .env sets VITE_GAS_WEBAPP_URL */
export const GAS_WEBAPP_URL = (import.meta.env.VITE_GAS_WEBAPP_URL ?? '').trim()
export const FORM_LIVE = GAS_WEBAPP_URL.length > 0

export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}

export function logoUrl(id: typeof ACTIVE_LOGO = ACTIVE_LOGO): string {
  return assetUrl(`logos/logo${id}.png`)
}
