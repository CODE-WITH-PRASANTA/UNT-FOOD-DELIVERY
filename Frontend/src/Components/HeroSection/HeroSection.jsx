import React, { useState, useEffect, useCallback, useRef } from 'react'
import heroBg from '../../assets/heroimag.png'
import './HeroSection.css'

const SLIDE_DURATION = 3000 // slide changes every 3 seconds
const COUNT_DURATION = 2200 // numbers finish running before the next slide

const BRAND = 'UNT'
const BRAND_TAGLINE = 'Delivering Deliciousness'

const slides = [
  {
    id: 1,
    tag: `Welcome to ${BRAND}`,
    title: 'Delivering Deliciousness,',
    highlight: 'Fresh To Your Door',
    text: `${BRAND} brings your favorite food from the best local kitchens straight to your doorstep, hot, fresh and right on time.`,
    cta: 'Order Now',
    ctaSecondary: 'View Menu',
    stats: [
      { end: 30, suffix: ' min', label: 'Avg. Delivery' },
      { end: 4.8, decimals: 1, suffix: '★', label: 'Customer Rating' },
      { end: 500, suffix: '+', label: 'Restaurants' },
    ],
    cardOne: { icon: '🛵', title: 'Free Delivery', sub: 'On orders above ₹299' },
    cardTwo: { icon: '🔥', title: 'Hot & Fresh', sub: 'Served in 30 minutes' },
  },
  {
    id: 2,
    tag: `${BRAND} · 100% Fresh & Healthy`,
    title: 'Order Healthy &',
    highlight: 'Fresh Food Any Time',
    text: `Handpicked ingredients, hygienic kitchens and chef-crafted recipes. With ${BRAND}, every bite is made to taste as good as it looks.`,
    cta: 'Explore More',
    ctaSecondary: 'Track Order',
    stats: [
      { end: 50000, suffix: '+', label: 'Happy Orders' },
      { end: 25, suffix: '+', label: 'Cities Served' },
      { end: 100, suffix: '%', label: 'Fresh Promise' },
    ],
    cardOne: { icon: '🥗', title: 'Fresh Ingredients', sub: 'Picked daily, cooked fresh' },
    cardTwo: { icon: '⭐', title: 'Top Rated', sub: 'Loved by 50,000+ foodies' },
  },
  {
    id: 3,
    tag: `Partner With ${BRAND}`,
    title: 'Partner With Us &',
    highlight: 'Grow Your Business',
    text: `Join hundreds of restaurant partners on ${BRAND} and reach more hungry customers with our smart, fast delivery network.`,
    cta: 'Become a Partner',
    ctaSecondary: 'Learn More',
    stats: [
      { end: 500, suffix: '+', label: 'Partner Restaurants' },
      { end: 3, suffix: 'x', label: 'Faster Growth' },
      { end: 24, suffix: '/7', label: 'Partner Support' },
    ],
    cardOne: { icon: '📈', title: 'Grow Faster', sub: 'More orders, more revenue' },
    cardTwo: { icon: '🤝', title: 'Easy Onboarding', sub: 'Go live in just 48 hours' },
  },
]

/* ---------- number running (count-up) hook ---------- */
const useCountUp = (end, duration, decimals = 0, run = true) => {
  const [value, setValue] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!run) {
      setValue(0)
      setDone(false)
      return undefined
    }

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      setValue(end)
      setDone(true)
      return undefined
    }

    let raf
    const start = performance.now() + 350 // wait for the slide to glide in

    const tick = (now) => {
      const progress = Math.max(Math.min((now - start) / duration, 1), 0)
      const eased = 1 - Math.pow(1 - progress, 4) // ease-out, slows down at the end
      setValue(end * eased)
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setValue(end)
        setDone(true)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, run])

  const formatted = value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return { formatted, done }
}

const StatItem = ({ end, decimals = 0, suffix = '', label, run }) => {
  const { formatted, done } = useCountUp(end, COUNT_DURATION, decimals, run)

  return (
    <li className="HeroSection-stat">
      <strong
        className={`HeroSection-stat-value ${done ? 'HeroSection-stat-done' : ''}`}
      >
        {formatted}
        {suffix}
      </strong>
      <span className="HeroSection-stat-label">{label}</span>
    </li>
  )
}

const ArrowIcon = ({ dir = 'right' }) => (
  <svg
    className="HeroSection-arrow-icon"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={dir === 'left' ? { transform: 'rotate(180deg)' } : undefined}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const HeroSection = () => {
  // slides + 1 clone of the first slide => endless right-to-left sliding
  const total = slides.length
  const track = [...slides, slides[0]]

  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const pendingPrev = useRef(false)

  const activeDot = index % total

  const next = useCallback(() => {
    setAnimate(true)
    setIndex((i) => (i >= total ? 1 : i + 1))
  }, [total])

  const prev = useCallback(() => {
    if (index === 0) {
      // jump (invisibly) to the clone, then glide back one slide
      pendingPrev.current = true
      setAnimate(false)
      setIndex(total)
    } else {
      setAnimate(true)
      setIndex((i) => i - 1)
    }
  }, [index, total])

  const goTo = (i) => {
    setAnimate(true)
    setIndex(i)
  }

  // when the clone is reached, silently reset to the real first slide
  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (index === total) {
      setAnimate(false)
      setIndex(0)
    }
  }

  // re-enable the transition after an invisible jump
  useEffect(() => {
    if (animate) return undefined
    let r1
    let r2
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        setAnimate(true)
        if (pendingPrev.current) {
          pendingPrev.current = false
          setIndex(total - 1)
        }
      })
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [animate, total])

  // auto slide after 3 seconds
  useEffect(() => {
    if (paused || !animate) return undefined
    const timer = setTimeout(next, SLIDE_DURATION)
    return () => clearTimeout(timer)
  }, [index, paused, animate, next])

  return (
    <section
      className="HeroSection"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={`${BRAND} featured offers`}
    >
      <div
        className="HeroSection-bg"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="HeroSection-overlay" />
      <span className="HeroSection-glow HeroSection-glow-one" />
      <span className="HeroSection-glow HeroSection-glow-two" />

      <div className="HeroSection-viewport">
        <div
          className={`HeroSection-track ${animate ? '' : 'HeroSection-track-static'}`}
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {track.map((slide, i) => {
            const isClone = i === total
            // the clone and the real first slide light up together, so
            // nothing flickers or restarts when the silent jump happens
            const isActive = i === index || (i === 0 && index === total)
            const tab = isActive && !isClone ? 0 : -1

            return (
              <div
                className={`HeroSection-slide ${isActive ? 'HeroSection-slide-active' : ''}`}
                key={isClone ? 'clone' : slide.id}
                aria-hidden={!isActive || isClone}
              >
                <div className="HeroSection-container">
                  {/* LEFT : content */}
                  <div className="HeroSection-content">
                    <div className="HeroSection-brand">
                      <span className="HeroSection-brand-name">{BRAND}</span>
                      <span className="HeroSection-brand-line" />
                      <span className="HeroSection-brand-tagline">{BRAND_TAGLINE}</span>
                    </div>

                    <div className="HeroSection-tag-wrap">
                      <span className="HeroSection-tag">
                        <i className="HeroSection-tag-dot" />
                        {slide.tag}
                      </span>
                    </div>

                    <h1 className="HeroSection-title">
                      {slide.title}
                      <span className="HeroSection-highlight">{slide.highlight}</span>
                    </h1>

                    <p className="HeroSection-text">{slide.text}</p>

                    <div className="HeroSection-actions">
                      <button
                        type="button"
                        tabIndex={tab}
                        className="HeroSection-btn HeroSection-btn-primary"
                      >
                        {slide.cta}
                        <ArrowIcon />
                      </button>
                      <button
                        type="button"
                        tabIndex={tab}
                        className="HeroSection-btn HeroSection-btn-ghost"
                      >
                        {slide.ctaSecondary}
                      </button>
                    </div>

                    <ul className="HeroSection-stats">
                      {slide.stats.map((s) => (
                        <StatItem key={`${slide.id}-${s.label}`} {...s} run={isActive} />
                      ))}
                    </ul>
                  </div>

                  {/* RIGHT : floating info cards */}
                  <div className="HeroSection-visual" aria-hidden="true">
                    <div className="HeroSection-card HeroSection-card-one">
                      <span className="HeroSection-card-icon">{slide.cardOne.icon}</span>
                      <div>
                        <strong className="HeroSection-card-title">{slide.cardOne.title}</strong>
                        <span className="HeroSection-card-sub">{slide.cardOne.sub}</span>
                      </div>
                    </div>
                    <div className="HeroSection-card HeroSection-card-two">
                      <span className="HeroSection-card-icon">{slide.cardTwo.icon}</span>
                      <div>
                        <strong className="HeroSection-card-title">{slide.cardTwo.title}</strong>
                        <span className="HeroSection-card-sub">{slide.cardTwo.sub}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="HeroSection-controls">
        <button
          type="button"
          className="HeroSection-nav"
          onClick={prev}
          aria-label="Previous slide"
        >
          <ArrowIcon dir="left" />
        </button>

        <div className="HeroSection-dots" role="tablist">
          {slides.map((s, i) => (
            <button
              type="button"
              key={s.id}
              role="tab"
              aria-selected={i === activeDot}
              aria-label={`Go to slide ${i + 1}`}
              className={`HeroSection-dot ${i === activeDot ? 'HeroSection-dot-active' : ''}`}
              onClick={() => goTo(i)}
            >
              {i === activeDot && (
                <span
                  key={`${index}-${paused}`}
                  className="HeroSection-dot-fill"
                  style={{
                    animationDuration: `${SLIDE_DURATION}ms`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="HeroSection-nav"
          onClick={next}
          aria-label="Next slide"
        >
          <ArrowIcon />
        </button>

        <span className="HeroSection-counter">
          0{activeDot + 1}
          <em>/0{total}</em>
        </span>
      </div>
    </section>
  )
}

export default HeroSection