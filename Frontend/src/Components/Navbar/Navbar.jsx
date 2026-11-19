import React, { useState, useEffect, useRef } from 'react'
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiMapPin,
  FiChevronDown,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
} from 'react-icons/fi'
import { FaRegHandshake } from 'react-icons/fa'
import './Navbar.css'
import navLogo from '../../assets/footer.png'

const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '/', icon: FiHome },
  { id: 'about', label: 'About', href: '/about', icon: FiUsers },
  { id: 'partner', label: 'Partner With Us', href: '/partner', icon: FaRegHandshake },
  { id: 'blog', label: 'Blog', href: '/blog', icon: FiFileText },
]

const LOCATIONS = ['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur']

const ACCOUNT_LINKS = [
  { label: 'Login', href: '/login' },
  { label: 'Sign Up', href: '/signup' },
  { label: 'My Orders', href: '/orders' },
  { label: 'Profile', href: '/profile' },
]

const Navbar = ({ wishlistCount = 0, cartCount = 0 }) => {
  const [activeLink, setActiveLink] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null) // 'location' | 'account' | null
  const [location, setLocation] = useState('Select Location')
  const [scrolled, setScrolled] = useState(false)
  const navbarRef = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  // Elevate navbar on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const toggleDropdown = (name) =>
    setOpenDropdown((current) => (current === name ? null : name))

  const handleNavClick = (id) => {
    setActiveLink(id)
    setMenuOpen(false)
    setOpenDropdown(null)
  }

  const handleLocationSelect = (city) => {
    setLocation(city)
    setOpenDropdown(null)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} ref={navbarRef}>
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo" onClick={() => handleNavClick('home')}>
          <img src={navLogo} alt="UNT - Delivering Deliciousness" className="navbar-logo-img" />
        </a>

        <span className="navbar-divider navbar-divider-main" />

        {/* Desktop links */}
        <nav className={`navbar-menu ${menuOpen ? 'navbar-menu-open' : ''}`} aria-label="Main navigation">
          <ul className="navbar-links">
            {NAV_LINKS.map(({ id, label, href, icon: Icon }) => (
              <li className="navbar-links-item" key={id}>
                <a
                  href={href}
                  className={`navbar-link ${activeLink === id ? 'navbar-link-active' : ''}`}
                  onClick={() => handleNavClick(id)}
                >
                  <Icon className="navbar-link-icon" />
                  <span className="navbar-link-text">{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-selectors">
            {/* Location */}
            <div className="navbar-dropdown">
              <button
                type="button"
                className="navbar-dropdown-btn"
                onClick={() => toggleDropdown('location')}
                aria-expanded={openDropdown === 'location'}
              >
                <FiMapPin className="navbar-link-icon" />
                <span className="navbar-link-text">{location}</span>
                <FiChevronDown
                  className={`navbar-chevron ${openDropdown === 'location' ? 'navbar-chevron-open' : ''}`}
                />
              </button>
              {openDropdown === 'location' && (
                <ul className="navbar-dropdown-list">
                  {LOCATIONS.map((city) => (
                    <li key={city}>
                      <button
                        type="button"
                        className={`navbar-dropdown-option ${location === city ? 'navbar-dropdown-option-active' : ''}`}
                        onClick={() => handleLocationSelect(city)}
                      >
                        {city}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <span className="navbar-divider navbar-divider-small" />

            {/* Account */}
            <div className="navbar-dropdown">
              <button
                type="button"
                className="navbar-dropdown-btn"
                onClick={() => toggleDropdown('account')}
                aria-expanded={openDropdown === 'account'}
              >
                <FiUser className="navbar-link-icon" />
                <span className="navbar-link-text">My Account</span>
                <FiChevronDown
                  className={`navbar-chevron ${openDropdown === 'account' ? 'navbar-chevron-open' : ''}`}
                />
              </button>
              {openDropdown === 'account' && (
                <ul className="navbar-dropdown-list navbar-dropdown-list-right">
                  {ACCOUNT_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} className="navbar-dropdown-option" onClick={() => setOpenDropdown(null)}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </nav>

        <span className="navbar-divider navbar-divider-actions" />

        {/* Wishlist & Cart */}
        <div className="navbar-actions">
          <a href="/wishlist" className="navbar-action" aria-label={`Wishlist, ${wishlistCount} items`}>
            <span className="navbar-action-icon-wrap">
              <FiHeart className="navbar-action-icon" />
              <span className="navbar-badge">{wishlistCount}</span>
            </span>
            <span className="navbar-action-text">Wishlist</span>
          </a>

          <a href="/cart" className="navbar-action" aria-label={`Cart, ${cartCount} items`}>
            <span className="navbar-action-icon-wrap">
              <FiShoppingCart className="navbar-action-icon" />
              <span className="navbar-badge">{cartCount}</span>
            </span>
            <span className="navbar-action-text">Cart</span>
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            className="navbar-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`navbar-overlay ${menuOpen ? 'navbar-overlay-show' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
    </header>
  )
}

export default Navbar