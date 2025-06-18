'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <Link href="/" className="logo">
            🍋 Lemon Slice
          </Link>
          <ul className="nav-links">
            <li><Link href="#features">Features</Link></li>
            <li><Link href="#vision">Vision</Link></li>
            <li><Link href="#pricing">Pricing</Link></li>
            <li><Link href="#examples">Examples</Link></li>
          </ul>
          <div className="nav-cta">
            <Link href="#" className="btn-secondary">Sign In</Link>
            <Link href="#" className="btn-primary">Start Free</Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 