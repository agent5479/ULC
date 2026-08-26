import { BUSINESS, SITE_NAME } from '../config'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__name">{SITE_NAME}</p>
          <p>
            {BUSINESS.address.street}, {BUSINESS.address.locality}{' '}
            {BUSINESS.address.postalCode}
          </p>
        </div>
        <div className="site-footer__links">
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
          <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
        <p className="site-footer__copy">
          © {year} {BUSINESS.name}
        </p>
      </div>
    </footer>
  )
}
