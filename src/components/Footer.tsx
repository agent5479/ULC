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
        <nav className="site-footer__links" aria-label="Footer">
          <a href="#services">Printing</a>
          <a href="#postal-pickup">Courier agent</a>
          <a href="#vacuum-bags">Vacuum bags</a>
          <a href="#community">Community</a>
          <a href="#visit">Visit</a>
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
          <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </nav>
        <p className="site-footer__copy">
          © {year} {BUSINESS.name}
        </p>
      </div>
    </footer>
  )
}
