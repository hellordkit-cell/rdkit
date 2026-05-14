import { useState } from 'react'

const emptyForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
}

export default function LeadCapture({
  source = 'website',
  context = {},
  title = 'Get RDKit to review this',
  description = 'Share your company and email so RDKit can follow up with a practical next step.',
  ctaLabel = 'Send details',
  compact = false,
  variant = 'light',
}) {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const update = event => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  const submit = async event => {
    event.preventDefault()
    setStatus('sending')
    setMessage('')

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
        throw new Error(firstFieldError || data.error || 'Could not send details')
      }

      setStatus('success')
      setForm(emptyForm)
      setMessage(
        data.mode === 'local-only'
          ? 'Details captured locally. Add LEAD_WEBHOOK_URL before taking this live.'
          : 'Thanks. RDKit can now review this and follow up.'
      )
    } catch (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  const className = [
    'lead-capture',
    `lead-capture-${variant}`,
    compact ? 'lead-capture-compact' : '',
  ].filter(Boolean).join(' ')

  return (
    <section className={className} data-source={source}>
      <div className="lead-copy">
        <h3>{title}</h3>
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

        <button className="lead-submit" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : ctaLabel}
        </button>
      </form>

      {message && (
        <p className={`lead-status ${status === 'error' ? 'error' : 'success'}`} aria-live="polite">
          {message}
        </p>
      )}
    </section>
  )
}
