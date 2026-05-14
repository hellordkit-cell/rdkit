import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const hiddenRoutes = ['/calculator', '/diagnostic']
const dismissalKey = 'rdkit:claim-assist-nudge-dismissed'

export default function FloatingClaimAssist() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setDismissed(window.sessionStorage.getItem(dismissalKey) === '1')
    setReady(true)
  }, [])

  const dismiss = () => {
    window.sessionStorage.setItem(dismissalKey, '1')
    setDismissed(true)
  }

  if (!ready || dismissed || hiddenRoutes.includes(router.pathname)) {
    return null
  }

  return (
    <aside className="claim-assist-nudge" aria-label="Try free Claim Assist">
      <button
        type="button"
        className="claim-assist-nudge-close"
        aria-label="Dismiss Claim Assist prompt"
        onClick={dismiss}
      >
        ×
      </button>
      <div className="claim-assist-nudge-head">
        <span className="claim-assist-nudge-icon" aria-hidden="true">✦</span>
        <div>
          <span className="claim-assist-nudge-kicker">Free tool</span>
          <strong>Try free Claim Assist</strong>
        </div>
      </div>
      <p>Estimate your R&D benefit in 60 seconds.</p>
      <Link href="/calculator" className="claim-assist-nudge-link">
        Start estimate →
      </Link>
    </aside>
  )
}
