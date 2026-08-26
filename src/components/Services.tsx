import { assetUrl, PHOTOS } from '../config'

export function Services() {
  const printImg = assetUrl(PHOTOS.services)
  const postalImg = assetUrl(PHOTOS.postal)

  return (
    <section className="section services" id="services" aria-labelledby="services-heading">
      <div className="section__inner">
        <p className="eyebrow">What we do</p>
        <h2 id="services-heading">Print shop services for Golden Bay</h2>
        <p className="lede">
          From everyday copies to finished marketing pieces — plus a practical postal
          pickup point when couriers charge more for Rural Delivery.
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
              <h3>Commercial printing</h3>
              <p>
                Digital colour and black-and-white printing, photocopying, scanning,
                laminating, and finishing — business cards, flyers, booklets, posters,
                reports, and more.
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
              <h3>Postal pickup &amp; drop-off</h3>
              <p>
                Use the shop as a courier pickup and drop-off point. A gold-coin fee
                covers the service — and because we are not on Rural Delivery, you
                often avoid the higher RD courier rates.
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
