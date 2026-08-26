import { useId, useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
  ACCEPTED_FILE_TYPES,
  BUSINESS,
  FORM_LIVE,
  GAS_WEBAPP_URL,
  MAX_ATTACHMENTS_BYTES,
} from '../config'

type Status = 'idle' | 'sending' | 'success' | 'error'

type FilePayload = {
  name: string
  mimeType: string
  data: string
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

function readFileAsBase64(file: File): Promise<FilePayload> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result ?? '')
      const comma = result.indexOf(',')
      const data = comma >= 0 ? result.slice(comma + 1) : result
      resolve({
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        data,
      })
    }
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export function ContactForm() {
  const formId = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])

  const totalBytes = useMemo(
    () => files.reduce((sum, f) => sum + f.size, 0),
    [files],
  )

  function onFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files ? Array.from(event.target.files) : []
    setFiles((prev) => {
      const merged = [...prev]
      for (const file of next) {
        if (!merged.some((f) => f.name === file.name && f.size === file.size)) {
          merged.push(file)
        }
      }
      return merged.slice(0, 8)
    })
    event.target.value = ''
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!name || !email || !message) {
      setStatus('error')
      setErrorMessage('Please fill in your name, email, and message.')
      return
    }

    if (totalBytes > MAX_ATTACHMENTS_BYTES) {
      setStatus('error')
      setErrorMessage(
        'Attachments are too large. Please keep the total under about 6 MB.',
      )
      return
    }

    if (!FORM_LIVE) {
      setStatus('error')
      setErrorMessage(
        `The mailer is not connected yet. Email ${BUSINESS.email} directly, or finish Apps Script setup (gateway ${BUSINESS.mailGateway}).`,
      )
      return
    }

    setStatus('sending')

    try {
      const attachments = await Promise.all(files.map(readFileAsBase64))
      const payload = {
        name,
        email,
        phone,
        message,
        files: attachments,
        sentAt: new Date().toISOString(),
        source: 'ulc-website',
      }

      const response = await fetch(GAS_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        redirect: 'follow',
      })

      let ok = response.ok
      let serverError = ''
      try {
        const json = (await response.json()) as { ok?: boolean; error?: string }
        if (typeof json.ok === 'boolean') ok = json.ok
        if (!ok && json.error) serverError = json.error
      } catch {
        // Apps Script sometimes returns empty body after redirect
      }

      if (!ok) {
        setStatus('error')
        setErrorMessage(
          serverError ||
            `Something went wrong. Please email ${BUSINESS.email} instead.`,
        )
        return
      }

      setStatus('success')
      form.reset()
      setFiles([])
    } catch {
      setStatus('error')
      setErrorMessage(
        `Could not reach the mail service. Please email ${BUSINESS.email} directly.`,
      )
    }
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">
      <div className="section__inner contact__layout">
        <div className="contact__intro">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading">Send a job or enquiry</h2>
          <p className="lede">
            Attach artwork or documents and we’ll get back to you. Messages go to{' '}
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
          </p>

          <ul className="contact__direct">
            <li>
              <span>Email</span>
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </li>
            <li>
              <span>Phone</span>
              <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
            </li>
            <li>
              <span>Hours</span>
              <span>{BUSINESS.hours.weekdays}</span>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="contact-form__head">
            <h3>Enquiry form</h3>
            <p>PDF, images, and common Office files welcome.</p>
          </div>

          {!FORM_LIVE && (
            <p className="form-status form-status--warn" role="status">
              Mail gateway pending — form UI is ready; connect Apps Script (
              {BUSINESS.mailGateway} → {BUSINESS.email}) to go live.
            </p>
          )}

          <div className="field">
            <label htmlFor={`${formId}-name`}>Name</label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={status === 'sending'}
              placeholder="Your name"
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor={`${formId}-email`}>Email</label>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={status === 'sending'}
                placeholder="you@example.com"
              />
            </div>
            <div className="field">
              <label htmlFor={`${formId}-phone`}>
                Phone <span className="optional">(optional)</span>
              </label>
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                disabled={status === 'sending'}
                placeholder="03 …"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor={`${formId}-message`}>Message</label>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={5}
              required
              disabled={status === 'sending'}
              placeholder="What do you need printed, scanned, or posted?"
            />
          </div>

          <div className="field">
            <span className="field-label" id={`${formId}-files-label`}>
              Attachments{' '}
              <span className="optional">(optional · max ~6 MB total)</span>
            </span>
            <label className="file-drop" htmlFor={`${formId}-files`}>
              <input
                id={`${formId}-files`}
                name="files"
                type="file"
                multiple
                accept={ACCEPTED_FILE_TYPES}
                disabled={status === 'sending'}
                onChange={onFilesChange}
                aria-labelledby={`${formId}-files-label`}
              />
              <span className="file-drop__title">Add files</span>
              <span className="file-drop__hint">
                Click to browse · PDF, JPG, PNG, Word, Excel…
              </span>
            </label>

            {files.length > 0 && (
              <ul className="file-list">
                {files.map((file, index) => (
                  <li key={`${file.name}-${file.size}-${index}`}>
                    <span className="file-list__name">{file.name}</span>
                    <span className="file-list__meta">{formatBytes(file.size)}</span>
                    <button
                      type="button"
                      className="file-list__remove"
                      onClick={() => removeFile(index)}
                      disabled={status === 'sending'}
                    >
                      Remove
                    </button>
                  </li>
                ))}
                <li className="file-list__total">
                  Total {formatBytes(totalBytes)}
                  {totalBytes > MAX_ATTACHMENTS_BYTES ? ' — over limit' : ''}
                </li>
              </ul>
            )}
          </div>

          {status === 'success' && (
            <p className="form-status form-status--ok" role="status">
              Thanks — your message is on its way to {BUSINESS.email}.
            </p>
          )}
          {status === 'error' && (
            <p className="form-status form-status--err" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="contact-form__actions">
            <button
              className="btn btn--primary"
              type="submit"
              disabled={status === 'sending' || totalBytes > MAX_ATTACHMENTS_BYTES}
            >
              {status === 'sending' ? 'Sending…' : 'Send with attachments'}
            </button>
            <a className="btn btn--outline" href={`mailto:${BUSINESS.email}`}>
              Or email directly
            </a>
          </div>
        </form>
      </div>
    </section>
  )
}
