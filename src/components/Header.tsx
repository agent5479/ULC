import { useEffect, useState } from 'react'
import { BUSINESS, SITE_NAME } from '../config'
import { LogoCycleButton } from './LogoCycleButton'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  function close() {
    setOpen(false)
  }

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} data-site-header>
      <div className="site-header__inner">
        <div className="site-header__brand">
          <LogoCycleButton className="site-header__logo-btn" width={48} height={48} />
          <a
            className="site-header__brand-link"
            href="#top"
            aria-label={`${SITE_NAME} home`}
            onClick={close}
          >
            <span className="site-header__brand-text">
              <span className="site-header__brand-name">Unlimited Copies</span>
              <span className="site-header__brand-place">Takaka</span>
            </span>
          </a>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav className="site-nav" id="site-nav" aria-label="Primary" data-open={open || undefined}>
          <a href="#services" onClick={close}>
            Services
          </a>
          <a href="#print" onClick={close}>
            Print enquiry
          </a>
          <a href="#visit" onClick={close}>
            Visit
          </a>
          <a className="site-nav__cta" href="#contact" onClick={close}>
            Contact
          </a>
          <a className="site-nav__outline" href={`mailto:${BUSINESS.email}`} onClick={close}>
            Email
          </a>
          <a className="site-nav__outline" href={`tel:${BUSINESS.phoneE164}`} onClick={close}>
            Call
          </a>
        </nav>
      </div>
    </header>
  )
}
