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
          <article className="service-block" id="print-scan-finish">
            <picture>
              <source srcSet={`${printImg}.webp`} type="image/webp" />
              <img
                src={`${printImg}.jpg`}
                alt="Colour and black-and-white Canon copiers at Unlimited Copies Takaka"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="service-block__body">
              <h3>Print, scan &amp; finish</h3>
              <p>
                Need printing or photocopying in Takaka? We handle digital colour and
                black-and-white jobs, document scanning and digitising, laminating, and finishing
                for Golden Bay and the wider Tasman area — walk in or send a brief ahead.
              </p>
              <ul>
                <li>High-quality prints up to SRA3</li>
                <li>Colour or black &amp; white · single or double sided</li>
                <li>Scanning &amp; document digitising</li>
                <li>Finishing: laminate, bind, staple, fold, trim</li>
                <li>Flyers, booklets, reports &amp; photo-quality pieces</li>
                <li>Self-service options when you need a quick job</li>
              </ul>
              <p>
                <a className="btn btn--outline" href="#print">
                  Start a print enquiry
                </a>
              </p>
            </div>
          </article>

          <article className="service-block service-block--text" id="business-cards">
            <div className="service-block__body">
              <h3>Business cards Takaka</h3>
              <p>
                Looking for business cards in Takaka or Golden Bay? Bring artwork or a rough
                brief — we print quality cards in-house so you can collect from Commercial Street
                without waiting on a national online broker.
              </p>
              <ul>
                <li>Colour or black &amp; white business cards</li>
                <li>Standard card sizes and stock options</li>
                <li>Finishing available when you need it</li>
                <li>Local print shop turnaround — confirm timing in store</li>
              </ul>
              <p>
                <a className="btn btn--outline" href="#print">
                  Enquire about business cards
                </a>
              </p>
            </div>
          </article>

          <article className="service-block service-block--text" id="posters">
            <div className="service-block__body">
              <h3>Poster printing Golden Bay</h3>
              <p>
                Poster printing for Takaka events, shop windows, and Golden Bay notices — plus
                photo-quality prints when you want something sharper than a standard copy. We
                print up to SRA3 in colour or black and white.
              </p>
              <ul>
                <li>Posters and large-format-friendly SRA3 prints</li>
                <li>Colour or black &amp; white · single or double sided</li>
                <li>Photo-quality prints for personal or display use</li>
                <li>Laminating and trim available in-shop</li>
              </ul>
              <p>
                <a className="btn btn--outline" href="#print">
                  Enquire about posters
                </a>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
