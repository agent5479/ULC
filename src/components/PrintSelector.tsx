import { useId, useState } from 'react'
import { useEnquiry } from '../enquiryContext'
import {
  COLOURS,
  DEFAULT_SELECTION,
  FINISHING,
  JOB_TYPES,
  PAPER_COLOURS,
  PAPERS,
  SIDES,
  SIZES,
  defaultsForJobType,
  formatPrintBrief,
  needsPaperColour,
  type CatalogOption,
  type PrintSelection,
} from '../printApp/catalog'

function ChipRail({
  legend,
  options,
  value,
  onChange,
  name,
}: {
  legend: string
  options: CatalogOption[]
  value: string
  onChange: (id: string) => void
  name: string
}) {
  return (
    <fieldset className="print-rail">
      <legend>{legend}</legend>
      <div className="print-chips" role="radiogroup" aria-label={legend}>
        {options.map((opt) => {
          const selected = value === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              className={`print-chip${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              name={name}
              onClick={() => onChange(opt.id)}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function PrintSelector() {
  const formId = useId()
  const { applyPrintBrief } = useEnquiry()
  const [selection, setSelection] = useState<PrintSelection>(DEFAULT_SELECTION)

  function setJobType(jobType: string) {
    setSelection((prev) => {
      const next = {
        ...prev,
        jobType,
        ...defaultsForJobType(jobType),
      }
      if (!needsPaperColour(next.paper)) next.paperColour = ''
      else if (!next.paperColour) next.paperColour = PAPER_COLOURS[0]?.id ?? ''
      return next
    })
  }

  function setPaper(paper: string) {
    setSelection((prev) => ({
      ...prev,
      paper,
      paperColour: needsPaperColour(paper)
        ? prev.paperColour || PAPER_COLOURS[0]?.id || ''
        : '',
    }))
  }

  function toggleFinish(id: string) {
    setSelection((prev) => {
      const has = prev.finishing.includes(id)
      return {
        ...prev,
        finishing: has ? prev.finishing.filter((x) => x !== id) : [...prev.finishing, id],
      }
    })
  }

  function setQty(next: number) {
    setSelection((prev) => ({ ...prev, quantity: Math.max(1, Math.min(9999, next)) }))
  }

  const brief = formatPrintBrief(selection)

  return (
    <section className="section print-app" id="print" aria-labelledby="print-heading">
      <div className="section__inner">
        <p className="eyebrow">Build your enquiry</p>
        <h2 id="print-heading">What do you need printed?</h2>
        <p className="lede">
          Choose job type, paper, size, and finishing. We’ll fill the contact form message for
          you — prices can be confirmed in the shop (online pricelist coming later).
        </p>

        <div className="print-app__panel">
          <ChipRail
            legend="Job type"
            name="jobType"
            options={JOB_TYPES}
            value={selection.jobType}
            onChange={setJobType}
          />
          <ChipRail
            legend="Paper"
            name="paper"
            options={PAPERS}
            value={selection.paper}
            onChange={setPaper}
          />
          {needsPaperColour(selection.paper) && (
            <div className="print-select field">
              <label htmlFor={`${formId}-paper-colour`}>Stock colour</label>
              <select
                id={`${formId}-paper-colour`}
                value={selection.paperColour}
                onChange={(e) =>
                  setSelection((p) => ({ ...p, paperColour: e.target.value }))
                }
              >
                {PAPER_COLOURS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          <ChipRail
            legend="Size"
            name="size"
            options={SIZES}
            value={selection.size}
            onChange={(size) => setSelection((p) => ({ ...p, size }))}
          />
          <ChipRail
            legend="Colour"
            name="colour"
            options={COLOURS}
            value={selection.colour}
            onChange={(colour) => setSelection((p) => ({ ...p, colour }))}
          />
          <ChipRail
            legend="Sides"
            name="sides"
            options={SIDES}
            value={selection.sides}
            onChange={(sides) => setSelection((p) => ({ ...p, sides }))}
          />

          <fieldset className="print-rail">
            <legend>Finishing</legend>
            <div className="print-chips" role="group" aria-label="Finishing options">
              {FINISHING.map((opt) => {
                const selected = selection.finishing.includes(opt.id)
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`print-chip${selected ? ' is-selected' : ''}`}
                    aria-pressed={selected}
                    onClick={() => toggleFinish(opt.id)}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="print-qty">
            <label htmlFor={`${formId}-qty`}>Quantity</label>
            <div className="print-qty__controls">
              <button type="button" className="print-qty__btn" onClick={() => setQty(selection.quantity - 1)}>
                −
              </button>
              <input
                id={`${formId}-qty`}
                type="number"
                min={1}
                max={9999}
                value={selection.quantity}
                onChange={(e) => setQty(Number(e.target.value) || 1)}
              />
              <button type="button" className="print-qty__btn" onClick={() => setQty(selection.quantity + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="field">
            <label htmlFor={`${formId}-notes`}>
              Extra notes <span className="optional">(optional)</span>
            </label>
            <textarea
              id={`${formId}-notes`}
              rows={2}
              value={selection.notes}
              onChange={(e) => setSelection((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Deadline, paper weight, special instructions…"
            />
          </div>

          <div className="print-summary">
            <h3>Enquiry preview</h3>
            <pre className="print-summary__text">{brief}</pre>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => applyPrintBrief(brief)}
            >
              Apply to enquiry form
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
