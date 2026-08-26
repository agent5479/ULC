import { assetUrl, BUSINESS, PHOTOS } from '../config'
import { LogoCycleButton } from './LogoCycleButton'

export function Hero() {
  const heroBase = assetUrl(PHOTOS.hero)

  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero__media" aria-hidden="true">
        <picture>
          <source srcSet={`${heroBase}.webp`} type="image/webp" />
          <img
            src={`${heroBase}.jpg`}
            alt=""
            width={1600}
            height={1200}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero__scrim" />
      </div>
      <div className="hero__content">
        <LogoCycleButton className="hero__logo" width={280} height={280} size="hero" />
        <h1 id="hero-heading" className="hero__title">
          {BUSINESS.name}
        </h1>
        <p className="hero__tagline">
          {BUSINESS.tagline} — copies, scanning, finishing, business cards, posters, and more at
          29 Commercial Street, Takaka.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#print">
            Build a print enquiry
          </a>
          <a className="btn btn--ghost" href={`mailto:${BUSINESS.email}`}>
            Email {BUSINESS.email}
          </a>
          <a className="btn btn--ghost" href={`tel:${BUSINESS.phoneE164}`}>
            Call {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
