import { assetUrl, PHOTOS } from '../config'

export function Services() {
  const printImg = assetUrl(PHOTOS.services)
  const postalImg = assetUrl(PHOTOS.postal)

  return (
    <section className="section services" id="services" aria-labelledby="services-heading">
      <div className="section__inner">
        <p className="eyebrow">What we do</p>
        <h2 id="services-heading">What print and postal services do you offer in Takaka?</h2>
        <p className="lede">
          Unlimited Copies is the commercial print shop on Commercial Street for Golden Bay
          — everyday copies through to finished marketing pieces, plus a practical courier
          pickup point when Rural Delivery rates are too high.
        </p>

        <div className="services__grid">
          <article className="service-block">
            <picture>
              <source srcSet={`${printImg}.webp`} type="image/webp" />
              <img
                src={`${printImg}.jpg`}
                alt="Professional multifunction printers at Unlimited Copies Takaka"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="service-block__body">
              <h3>Commercial printing in Takaka</h3>
              <p>
                Need printing in Takaka? We handle digital colour and black-and-white jobs,
                photocopying, scanning, laminating, and finishing — business cards, flyers,
                booklets, posters, reports, and more.
              </p>
              <ul>
                <li>High-quality prints up to SRA3</li>
                <li>Scanning &amp; document digitising</li>
                <li>Finishing: trim, staple, fold, bind</li>
                <li>Self-service options when you need a quick job</li>
              </ul>
            </div>
          </article>

          <article className="service-block service-block--reverse">
            <picture>
              <source srcSet={`${postalImg}.webp`} type="image/webp" />
              <img
                src={`${postalImg}.jpg`}
                alt="Print equipment and Post Haste courier signage in the shop"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="service-block__body">
              <h3>Can I pick up courier parcels in Takaka?</h3>
              <p>
                Yes — use the shop as a courier pickup and drop-off point during opening
                hours. A gold-coin fee covers pickup use, and because we are on Commercial
                Street (not Rural Delivery), you often avoid the higher RD courier rates.
              </p>
              <ul>
                <li>Pickup &amp; drop-off during shop hours</li>
                <li>Gold-coin payment for pickup use</li>
                <li>Street address — not RD — on Commercial Street</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
