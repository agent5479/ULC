import { assetUrl, BUSINESS, PHOTOS, streetLocality } from '../config'
import { BrandLogo } from './BrandLogo'

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
        <BrandLogo className="hero__logo" width={560} height={200} />
        <h1 id="hero-heading" className="hero__title">
          {BUSINESS.name}
        </h1>
        <p className="hero__tagline">
          {BUSINESS.tagline} — copies, scanning, finishing, business cards, posters, and more at{' '}
          {streetLocality()}.
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
