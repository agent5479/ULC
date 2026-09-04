import { assetUrl, BUSINESS, PHOTOS } from '../config'

const GB_WEEKLY_URL = 'https://www.gbweekly.co.nz/'

export function MoreAtTheShop() {
  const postalImg = assetUrl(PHOTOS.postal)
  const vacuumImg = assetUrl(PHOTOS.vacuum)

  return (
    <section className="section more-shop" id="more" aria-labelledby="more-heading">
      <div className="section__inner">
        <p className="eyebrow">Also at the shop</p>
        <h2 id="more-heading">Courier pickup, vacuum bags &amp; community services</h2>
        <p className="lede">
          Beyond printing, Unlimited Copies is a handy town address for parcels, replacement
          vacuum bags, and a few local community services.
        </p>

        <div className="more-shop__grid">
          <article className="more-shop__block" id="postal-pickup">
            <picture>
              <source srcSet={`${postalImg}.webp`} type="image/webp" />
              <img
                src={`${postalImg}.jpg`}
                alt="New Zealand Couriers van used for parcel pickup and drop-off at Unlimited Copies Takaka"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div>
              <h3>Courier parcels in Takaka</h3>
              <p>
                We are agents for <strong>New Zealand Couriers</strong> and{' '}
                <strong>Post Haste</strong>. Use the shop as a pickup and drop-off point during
                opening hours.
              </p>
              <p>
                Ask senders to address parcels{' '}
                <strong>
                  c/o Unlimited Copies, 29 Commercial Street, Takaka
                </strong>
                . A <strong>$2</strong> fee covers pickup use — and because we are on Commercial
                Street (not Rural Delivery), you often avoid the higher RD courier charge.
              </p>
              <ul>
                <li>Address: c/o Unlimited Copies, 29 Commercial Street, Takaka</li>
                <li>$2 pickup fee</li>
                <li>Street address — not RD — saves rural delivery surcharges</li>
                <li>Agents: New Zealand Couriers &amp; Post Haste</li>
              </ul>
            </div>
          </article>

          <div className="more-shop__aside">
            <article className="more-shop__note">
              <h3>The GB Weekly</h3>
              <p>
                We are an agent for{' '}
                <a href={GB_WEEKLY_URL} target="_blank" rel="noopener noreferrer">
                  The GB Weekly
                </a>
                , Golden Bay’s community newspaper.
              </p>
            </article>

            <article className="more-shop__note more-shop__note--quiet">
              <h3>Golden Bay Community Directory</h3>
              <p>
                Each year Unlimited Copies helps with the local phone book (Golden Bay Community
                Directory), which supports Takaka Rugby Football Club as a club fundraiser. It is
                free to update your listing and include a cell number if you no longer have a
                landline — call{' '}
                <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a> or email{' '}
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
              </p>
            </article>
          </div>
        </div>

        <article className="more-shop__block more-shop__retail" id="vacuum-bags">
          <picture>
            <source srcSet={`${vacuumImg}.webp`} type="image/webp" />
            <img
              src={`${vacuumImg}.jpg`}
              alt="Vacuum cleaner bags and filters on display at Unlimited Copies Takaka, including vac-pac and Miele"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div>
            <h3>Vacuum cleaner bags</h3>
            <p>
              We stock replacement vacuum bags and filters at the shop — including{' '}
              <strong>vac-pac</strong>, <strong>Miele</strong>, and other common brands. Bring
              the model or an old bag and we can match it, or drop in to see what is on the
              shelf.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
