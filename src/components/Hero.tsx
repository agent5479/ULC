import { assetUrl, BUSINESS, logoUrl, PHOTOS, SITE_NAME } from '../config'

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
        <img
          className="hero__logo"
          src={logoUrl()}
          alt={`${SITE_NAME} logo`}
          width={280}
          height={280}
        />
        <h1 id="hero-heading" className="hero__title">
          {BUSINESS.name}
        </h1>
        <p className="hero__tagline">{BUSINESS.tagline}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#contact">
            Email a job
          </a>
          <a className="btn btn--ghost" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
        </div>
      </div>
    </section>
  )
}
