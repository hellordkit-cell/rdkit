import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Nav() {
  const router = useRouter()
  const isActive = (path) => router.pathname === path

  return (
    <nav>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">rdkit</Link>
        <div className="nav-center">
          <Link href="/how-it-works" className={`nav-link${isActive('/how-it-works') ? ' active' : ''}`}>How it works</Link>
          <Link href="/rdti-program" className={`nav-link${isActive('/rdti-program') ? ' active' : ''}`}>R&DTI Program</Link>
          <Link href="/for-accountants" className={`nav-link${isActive('/for-accountants') ? ' active' : ''}`}>For Accountants</Link>
          <Link href="/calculator" className={`nav-link${isActive('/calculator') ? ' active' : ''}`}>Calculator</Link>
          <Link href="/about" className={`nav-link${isActive('/about') ? ' active' : ''}`}>About</Link>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href="/eligibility" className="btn btn-outline nav-cta" style={{ padding: '10px 20px' }}>Check eligibility</Link>
          <Link href="/get-started" className="btn btn-primary nav-cta">Pay deposit →</Link>
        </div>
      </div>
    </nav>
  )
}
