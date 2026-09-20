import {
  assetUrl,
  BUSINESS,
  careOfShopAddress,
  PHOTOS,
} from '../config'

const GB_WEEKLY_URL = 'https://www.gbweekly.co.nz/'

export function MoreAtTheShop() {
  const postalImg = assetUrl(PHOTOS.postal)
  const vacuumImg = assetUrl(PHOTOS.vacuum)
  const careOf = careOfShopAddress()

  return (
    <>
      <section
        className="section more-shop"
        id="postal-pickup"
        aria-labelledby="postal-heading"
      >
        <div className="section__inner">
          <p className="eyebrow">Also at the shop</p>
          <h2 id="postal-heading">NZ Couriers &amp; Post Haste agent in Takaka</h2>
          <p className="lede">
            Need a parcel pickup or drop-off in Golden Bay? Unlimited Copies is a town-street
            courier agent for New Zealand Couriers and Post Haste — useful when you want to
            avoid Rural Delivery surcharges.
          </p>

          <article className="more-shop__block">
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
              <p>
                Use the shop as a <strong>courier pickup and drop-off</strong> point during{' '}
                <a href="#visit">opening hours</a>. Ask senders to address parcels{' '}
                <strong>{careOf}</strong>.
              </p>
              <p>
                A <strong>$2</strong> fee covers pickup use. Because we are on{' '}
                {BUSINESS.address.street} (a street address, not Rural Delivery), you often
                avoid the higher RD courier charge that applies to many Golden Bay rural
                addresses.
              </p>
              <ul>
                <li>Address parcels: {careOf}</li>
                <li>$2 pickup fee</li>
                <li>Street address — not RD — helps avoid rural delivery surcharges</li>
                <li>Agents: New Zealand Couriers &amp; Post Haste</li>
                <li>Parcel pickup and drop-off in Takaka / Golden Bay</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section
        className="section more-shop more-shop--alt"
        id="vacuum-bags"
        aria-labelledby="vacuum-heading"
      >
        <div className="section__inner">
          <p className="eyebrow">Also at the shop</p>
          <h2 id="vacuum-heading">Vacuum bags in Takaka &amp; Golden Bay</h2>
          <p className="lede">
            Looking for vacuum cleaner bags in Takaka, Golden Bay, or the wider Nelson–Tasman
            area? We stock common replacement bags and filters on the shelf — including
            vac-pac and Miele.
          </p>

          <article className="more-shop__block more-shop__retail">
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
              <p>
                Bring the model number or an old bag and we can match it, or drop in to see
                what is on the shelf. Stock covers <strong>vac-pac</strong>,{' '}
                <strong>Miele</strong>, and other everyday brands — a handy walk-in option
                when you need bags without a trip to Nelson.
              </p>
              <ul>
                <li>vac-pac vacuum bags</li>
                <li>Miele vacuum bags &amp; filters</li>
                <li>Other common brands — ask in store</li>
                <li>Match from model number or an old bag</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section
        className="section more-shop"
        id="community"
        aria-labelledby="community-heading"
      >
        <div className="section__inner">
          <p className="eyebrow">Also at the shop</p>
          <h2 id="community-heading">Golden Bay Community Directory &amp; GB Weekly</h2>
          <p className="lede">
            Unlimited Copies helps with two local community fixtures — the annual Golden Bay
            Community Directory and The GB Weekly newspaper.
          </p>

          <div className="more-shop__community">
            <article className="more-shop__note">
              <h3>Golden Bay Community Directory</h3>
              <p>
                Each year Unlimited Copies helps with the local phone book (Golden Bay Community
                Directory), which supports <strong>Takaka Rugby Football Club</strong> as a club
                fundraiser. It is free to update your listing and include a cell number if you
                no longer have a landline — call{' '}
                <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a> or email{' '}
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
              </p>
            </article>

            <article className="more-shop__note">
              <h3>The GB Weekly</h3>
              <p>
                We are an agent for{' '}
                <a href={GB_WEEKLY_URL} target="_blank" rel="noopener noreferrer">
                  The GB Weekly
                </a>
                , Golden Bay’s community newspaper — another reason locals know the shop as a
                handy town address on Commercial Street.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
