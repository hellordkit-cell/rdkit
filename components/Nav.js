import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navLinks = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/rdti-program', label: 'R&DTI Program' },
  { href: '/for-accountants', label: 'For Accountants' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const isActive = (path) => router.pathname === path

  useEffect(() => {
    setMenuOpen(false)
  }, [router.pathname])

  return (
    <nav>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">rdkit</Link>
        <div className="nav-center" aria-label="Primary navigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${isActive(link.href) ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <Link href="/eligibility" className="btn btn-outline nav-cta nav-cta-eligibility">Check eligibility</Link>
          <Link href="/get-started" className="btn btn-primary nav-cta nav-cta-deposit">Pay deposit →</Link>
        </div>
        <button
          type="button"
          className="nav-menu-button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="mobile-nav-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(open => !open)}
        >
          <span className="nav-menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="mobile-nav-menu" className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
        <div className="nav-mobile-panel">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-mobile-link${isActive(link.href) ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="nav-mobile-actions">
            <Link href="/eligibility" className="btn btn-outline nav-mobile-cta">Check eligibility</Link>
            <Link href="/get-started" className="btn btn-primary nav-mobile-cta">Pay deposit →</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
