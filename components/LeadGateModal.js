import { useState } from 'react'

const emptyForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
}

export default function LeadGateModal({
  open,
  onClose,
  onSuccess,
  source,
  context,
  title = 'Before the AI diagnostic',
  description = 'Share your details so RDKit can connect this diagnostic with your estimate.',
  ctaLabel = 'Continue to AI diagnostic',
}) {
  const [form, setForm] = useState(emptyForm)
  const [acknowledged, setAcknowledged] = useState(false)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  if (!open) return null

  const update = event => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  const submit = async event => {
    event.preventDefault()
    setMessage('')

    if (!acknowledged) {
      setStatus('error')
      setMessage('Please acknowledge the AI diagnostic limitations before continuing.')
      return
    }

    setStatus('sending')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source,
          context,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        const firstFieldError = data.errors && Object.values(data.errors)[0]
        throw new Error(firstFieldError || data.error || 'Could not continue')
      }

      setStatus('success')
      setForm(emptyForm)
      await onSuccess?.(data)
    } catch (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  return (
    <div className="lead-modal-backdrop" role="presentation">
      <section
        className="lead-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-gate-title"
        data-source={source}
      >
        <button
          className="lead-modal-close"
          type="button"
          aria-label="Close lead form"
          onClick={onClose}
        >
          x
        </button>

        <div className="lead-modal-head">
          <span>AI diagnostic</span>
          <h2 id="lead-gate-title">{title}</h2>
          <p>{description}</p>
        </div>

        <form className="lead-form" onSubmit={submit}>
          <div className="lead-fields">
            <label>
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={update}
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </label>
            <label>
              <span>Company</span>
              <input
                name="company"
                value={form.company}
                onChange={update}
                autoComplete="organization"
                placeholder="Company"
                required
              />
            </label>
            <label>
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
            </label>
            <label>
              <span>Phone optional</span>
              <input
                name="phone"
                value={form.phone}
                onChange={update}
                autoComplete="tel"
                placeholder="Phone"
              />
            </label>
          </div>

          <label className="lead-ack">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={event => setAcknowledged(event.target.checked)}
            />
            <span>
              I understand this diagnostic is AI-assisted, may be wrong, and is not tax advice.
              RDKit should review the facts and evidence before any claim decision.
            </span>
          </label>

          {message && <p className="lead-status error" aria-live="polite">{message}</p>}

          <div className="lead-modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Not now
            </button>
            <button className="lead-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Saving...' : ctaLabel}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
