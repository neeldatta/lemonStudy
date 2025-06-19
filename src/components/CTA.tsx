import Link from 'next/link'

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Experience the Future of Interactive Media</h2>
          <p>Join the pioneers shaping tomorrow&apos;s entertainment and communication</p>
          <div className="cta-buttons">
            <Link href="#" className="btn-hero-primary">
              <i className="fas fa-magic"></i> Create Your Own AI
            </Link>
            <Link href="#" className="secondary-btn">
              <i className="fas fa-book"></i> Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 