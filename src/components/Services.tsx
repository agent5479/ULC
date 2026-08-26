import { assetUrl, PHOTOS } from '../config'

export function Services() {
  const printImg = assetUrl(PHOTOS.services)

  return (
    <section className="section services" id="services" aria-labelledby="services-heading">
      <div className="section__inner">
        <p className="eyebrow">What we do</p>
        <h2 id="services-heading">Commercial printing in Takaka</h2>
        <p className="lede">
          Unlimited Copies is the commercial print shop on Commercial Street for Golden Bay —
          everyday copies through to finished marketing pieces, business cards, posters, and
          higher-quality prints.
        </p>

        <div className="services__grid">
          <article className="service-block" id="commercial-printing">
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
              <h3>Print, scan &amp; finish</h3>
              <p>
                Need printing in Takaka? We handle digital colour and black-and-white jobs,
                photocopying, scanning, laminating, and finishing — business cards, flyers,
                booklets, posters, reports, and photo-quality pieces.
              </p>
              <ul>
                <li>High-quality prints up to SRA3</li>
                <li>Colour or black &amp; white · single or double sided</li>
                <li>Scanning &amp; document digitising</li>
                <li>Finishing: laminate, bind, staple, fold, trim</li>
                <li>Business cards, posters &amp; higher-quality prints</li>
                <li>Self-service options when you need a quick job</li>
              </ul>
              <p>
                <a className="btn btn--outline" href="#print">
                  Start a print enquiry
                </a>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
