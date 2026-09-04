import { assetUrl, BUSINESS, PHOTOS } from '../config'

export function Visit() {
  const visitImg = assetUrl(PHOTOS.visit)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BUSINESS.address.street}, ${BUSINESS.address.locality} ${BUSINESS.address.postalCode}`,
  )}`

  return (
    <section className="section visit" id="visit" aria-labelledby="visit-heading">
      <div className="section__inner visit__layout">
        <div className="visit__copy">
          <p className="eyebrow">Find us</p>
          <h2 id="visit-heading">Where is Unlimited Copies in Takaka?</h2>
          <p className="lede">
            We are at 29 Commercial Street in central Takaka — open weekdays 9:00 AM to
            5:00 PM. Call, email, or drop in for printing and scanning.
          </p>

          <dl className="visit__details">
            <div>
              <dt>Address</dt>
              <dd>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  {BUSINESS.address.street}
                  <br />
                  {BUSINESS.address.locality} {BUSINESS.address.postalCode}
                </a>
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>
                {BUSINESS.hours.weekdays}
                <br />
                {BUSINESS.hours.weekend}
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </dd>
            </div>
          </dl>
        </div>

        <figure className="visit__photo">
          <picture>
            <source srcSet={`${visitImg}.webp`} type="image/webp" />
            <img
              src={`${visitImg}.jpg`}
              alt="Looking into Unlimited Copies from the entrance on Commercial Street, Takaka"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </figure>
      </div>
    </section>
  )
}
