import React, { useState } from 'react'
import {
  FiChevronRight,
  FiMail,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
} from 'react-icons/fi'
import './Footer.css'
import footerLogo from '../../assets/footer.png'

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Partner With Us', href: '/partner' },
  { label: 'Blog', href: '/blog' },
]

const SUPPORT_LINKS = [
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Track Order', href: '/track-order' },
  { label: 'Select Location', href: '/location' },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: FiFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: FiInstagram },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: FiYoutube },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: FiLinkedin },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const Footer = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleSubscribe = (e) => {
    e.preventDefault()
    const value = email.trim()

    if (!value) {
      setStatus({ type: 'error', message: 'Please enter your email address.' })
      return
    }
    if (!EMAIL_PATTERN.test(value)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    // TODO: connect your newsletter API here
    setStatus({ type: 'success', message: 'Thanks for subscribing! Delicious deals are on the way.' })
    setEmail('')
  }

  return (
    <footer className="footer">
      {/* Top wave */}
      <svg className="footer-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path className="footer-wave-orange" d="M0 0H1440V22C1100 60 780 -6 420 34C260 52 110 40 0 14Z" />
        <path className="footer-wave-navy" d="M0 0H1440V10C1100 48 780 -18 420 22C260 40 110 28 0 2Z" />
      </svg>

      {/* Decorative food outlines */}
      <div className="footer-doodles" aria-hidden="true">
        <svg className="footer-doodle footer-doodle-burger" viewBox="0 0 64 64">
          <path d="M10 30c0-10 9-17 22-17s22 7 22 17z" />
          <path d="M8 37h48" />
          <path d="M10 44h44c0 6-4 9-9 9H19c-5 0-9-3-9-9z" />
          <path d="M22 21h2M32 18h2M41 22h2" />
        </svg>
        <svg className="footer-doodle footer-doodle-drink" viewBox="0 0 64 64">
          <path d="M19 22h26l-3 33H22z" />
          <path d="M16 22h32" />
          <path d="M34 22l6-15h9" />
          <path d="M22 36h20" />
        </svg>
        <svg className="footer-doodle footer-doodle-pizza" viewBox="0 0 64 64">
          <path d="M8 18C28 6 54 14 58 32L30 56z" />
          <circle cx="32" cy="26" r="4" />
          <circle cx="24" cy="38" r="3" />
          <circle cx="42" cy="36" r="3" />
        </svg>
        <svg className="footer-doodle footer-doodle-bowl" viewBox="0 0 64 64">
          <path d="M8 34h48c0 13-10 21-24 21S8 47 8 34z" />
          <path d="M30 32l22-20M37 32l19-17" />
          <path d="M16 34c3-5 6-5 9 0s6 5 9 0 6-5 9 0" />
        </svg>
      </div>

      <div className="footer-container">
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand">
            <a href="/" className="footer-logo" aria-label="UNT home">
              <img src={footerLogo} alt="UNT - Delivering Deliciousness" className="footer-logo-img" />
            </a>
            <p className="footer-tagline">
              Your favorite food, delivered fast and fresh, anytime, anywhere.
            </p>
            <ul className="footer-social">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label} className="footer-social-item">
                  <a
                    href={href}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <span className="footer-divider" />

          {/* Quick Links */}
          <nav className="footer-column" aria-label="Quick links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-list">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label} className="footer-list-item">
                  <a href={href} className="footer-link">
                    <FiChevronRight className="footer-link-icon" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Help & Support */}
          <nav className="footer-column" aria-label="Help and support">
            <h3 className="footer-title">Help &amp; Support</h3>
            <ul className="footer-list">
              {SUPPORT_LINKS.map(({ label, href }) => (
                <li key={label} className="footer-list-item">
                  <a href={href} className="footer-link">
                    <FiChevronRight className="footer-link-icon" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <span className="footer-divider" />

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h3 className="footer-title">Subscribe to Our Newsletter</h3>
            <p className="footer-newsletter-text">
              Get the latest offers, food updates, and exclusive deals directly in your inbox.
            </p>
            <form className="footer-form" onSubmit={handleSubscribe} noValidate>
              <label htmlFor="footer-email" className="footer-form-label">
                Email address
              </label>
              <FiMail className="footer-form-icon" />
              <input
                id="footer-email"
                type="email"
                className="footer-form-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status.message) setStatus({ type: '', message: '' })
                }}
                autoComplete="email"
              />
              <button type="submit" className="footer-form-btn">
                Subscribe
              </button>
            </form>
            <p
              className={`footer-form-message ${status.type ? `footer-form-message-${status.type}` : ''}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          </div>
        </div>

        {/* Horizontal line */}
        <hr className="footer-line" />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()}{' '}
            <a
              href="https://prwebstock.com/"
              className="footer-copyright-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              PR WEBSTOCK
            </a>
            . All Rights Reserved.
          </p>
          <ul className="footer-legal">
            <li className="footer-legal-item">
              <a href="/terms" className="footer-legal-link">Terms &amp; Conditions</a>
            </li>
            <li className="footer-legal-item">
              <a href="/privacy" className="footer-legal-link">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer