export const SITE_URL = 'https://unlimitedcopies.co.nz'
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
  /** Apps Script / Gmail sending account (not shown as public contact) */
  mailGateway: 'unlimitedcopies07@gmail.com',
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
  hero: 'images/shop-wide',
  services: 'images/copiers-both-colour-and-grayscale',
  postal: 'images/courier',
  visit: 'images/entranceway',
  vacuum: 'images/vacuum-bags',
} as const

/** Max total decoded attachment size (bytes) before base64 inflation */
export const MAX_ATTACHMENTS_BYTES = 6 * 1024 * 1024

export const ACCEPTED_FILE_TYPES =
  '.pdf,.png,.jpg,.jpeg,.gif,.webp,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv'

function envString(key: string, fallback = ''): string {
  const viteVal = import.meta.env?.[key as keyof ImportMetaEnv]
  if (viteVal != null && viteVal !== '') return String(viteVal)
  const nodeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env
  const nodeVal = nodeEnv?.[key]
  if (nodeVal != null && nodeVal !== '') return nodeVal
  return fallback
}

/** Live when GitHub secret / local .env sets VITE_GAS_WEBAPP_URL */
export const GAS_WEBAPP_URL = envString('VITE_GAS_WEBAPP_URL').trim()
export const FORM_LIVE = GAS_WEBAPP_URL.length > 0

export function assetUrl(path: string): string {
  const base = envString('BASE_URL', '/')
  return `${base}${path.replace(/^\//, '')}`
}

export const LOGO_SRC = assetUrl('logos/ulc-logo.png')
