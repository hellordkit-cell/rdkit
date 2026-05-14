import Link from 'next/link'
import LeadCapture from './LeadCapture'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">rdkit</div>
          <p className="footer-tagline">Australia&rsquo;s fairest R&D tax claim service.</p>
        </div>
        <div className="footer-lead">
          <LeadCapture
            source="site-footer"
            variant="footer"
            compact
            title="Ask RDKit to check your claim"
            description="Leave company and email details and we can point you to the right next step."
            ctaLabel="Ask RDKit"
          />
        </div>
        <div className="footer-links-group">
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/rdti-program">R&DTI Program</Link>
            <Link href="/for-accountants">For Accountants</Link>
            <Link href="/calculator">Claim Assist</Link>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <Link href="/about">About & Mission</Link>
            <Link href="/eligibility">Free Quiz</Link>
            <a href="mailto:hellordkit@gmail.com">hellordkit@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 RDKit. ABN coming soon.</span>
        <span>Built for Australian innovators.</span>
      </div>
    </footer>
  )
}
