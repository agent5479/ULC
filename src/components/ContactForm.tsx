import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ACCEPTED_FILE_TYPES,
  BUSINESS,
  MAX_ATTACHMENTS_BYTES,
} from '../config'

type Status = 'idle' | 'sending' | 'success' | 'error'

type FilePayload = {
  name: string
  mimeType: string
  data: string
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
  const [files, setFiles] = useState<FileList | null>(null)

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

    const selected = files ? Array.from(files) : []
    const totalBytes = selected.reduce((sum, f) => sum + f.size, 0)
    if (totalBytes > MAX_ATTACHMENTS_BYTES) {
      setStatus('error')
      setErrorMessage(
        'Attachments are too large. Please keep the total under about 6 MB.',
      )
      return
    }

    const endpoint = import.meta.env.VITE_GAS_WEBAPP_URL as string | undefined
    if (!endpoint) {
      setStatus('error')
      setErrorMessage(
        'The form is not connected yet. Email us directly at ulc@actrix.co.nz, or set VITE_GAS_WEBAPP_URL after deploying the Apps Script.',
      )
      return
    }

    setStatus('sending')

    try {
      const attachments = await Promise.all(selected.map(readFileAsBase64))
      const payload = {
        name,
        email,
        phone,
        message,
        files: attachments,
        sentAt: new Date().toISOString(),
        source: 'ulc-website',
      }

      const response = await fetch(endpoint, {
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
        // Apps Script sometimes returns empty or HTML after redirect; treat HTTP ok as success
      }

      if (!ok) {
        setStatus('error')
        setErrorMessage(
          serverError ||
            'Something went wrong sending your message. Please try again or email ulc@actrix.co.nz.',
        )
        return
      }

      setStatus('success')
      form.reset()
      setFiles(null)
    } catch {
      setStatus('error')
      setErrorMessage(
        'Could not reach the mail service. Please email ulc@actrix.co.nz directly.',
      )
    }
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">
      <div className="section__inner contact__layout">
        <div className="contact__intro">
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-heading">Send a job or enquiry</h2>
          <p className="lede">
            Attach artwork or documents and we will reply from{' '}
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
          </p>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor={`${formId}-name`}>Name</label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={status === 'sending'}
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
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor={`${formId}-message`}>Message</label>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={6}
              required
              disabled={status === 'sending'}
            />
          </div>

          <div className="field">
            <label htmlFor={`${formId}-files`}>
              Attachments <span className="optional">(optional, max ~6 MB total)</span>
            </label>
            <input
              id={`${formId}-files`}
              name="files"
              type="file"
              multiple
              accept={ACCEPTED_FILE_TYPES}
              disabled={status === 'sending'}
              onChange={(e) => setFiles(e.target.files)}
            />
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

          <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  )
}
