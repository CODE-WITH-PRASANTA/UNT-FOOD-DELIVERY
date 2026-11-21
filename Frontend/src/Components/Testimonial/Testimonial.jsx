import React, { useState, useEffect, useCallback, useRef } from 'react'
import './Testimonial.css'

/* ---------- customer photos ---------- */
import testimonial1 from '../../assets/testimonial-1.png'
import testimonial2 from '../../assets/testimonial-2.png'
import testimonial3 from '../../assets/testimonial-1.png'
import testimonial4 from '../../assets/testimonial-2.png'
import testimonial5 from '../../assets/testimonial-1.png'
import testimonial6 from '../../assets/testimonial-2.png'

const AUTO_DELAY = 2000 // one card every 2 seconds
const CLONES = 3 // = max cards visible at once (desktop)

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Burger Lover',
    image: testimonial1,
    rating: 5,
    text: '"The burger was an explosion of flavor—juicy, cheesy, and perfectly grilled. Delivery was quick, packaging neat, and honestly, Ordered out of curiosity, but wow! Every bite was fresh and delicious. "',
  },
  {
    id: 2,
    name: 'Priya Das',
    role: 'Pizza Fan',
    image: testimonial2,
    rating: 5,
    text: '"Pizza crust was crisp yet airy, toppings generously loaded, and the blend of herbs felt like magic. Didn’t expect much, but I’m low-key obsessed after the first slice.Next level! Honestly felt "',
  },
  {
    id: 3,
    name: 'Amit Patra',
    role: 'Pasta Addict',
    image: testimonial3,
    rating: 5,
    text: '"Didn’t expect the pasta to arrive this hot and fresh—sauce was creamy, herbs vibrant, and the garlic bread? Toasted perfection. I cleaned the plate before I even blinked."',
  },
  {
    id: 4,
    name: 'Sneha Mohanty',
    role: 'Regular Customer',
    image: testimonial4,
    rating: 5,
    text: '"I order every weekend now. The food always arrives piping hot, the portions are generous and the taste is consistent every single time. Easily my favorite delivery app."',
  },
  {
    id: 5,
    name: 'Arjun Nayak',
    role: 'Foodie Blogger',
    image: testimonial5,
    rating: 5,
    text: '"As a food blogger I’ve tried them all, and this one stands out. Fresh ingredients, beautiful packaging and delivery well within the promised time. Highly recommended!"',
  },
  {
    id: 6,
    name: 'Ananya Rath',
    role: 'Weekend Diner',
    image: testimonial6,
    rating: 5,
    text: '"Ordered for a family get-together and everyone loved it. Hot, fresh and so easy to track from kitchen to doorstep. Customer support was lovely too."',
  },
]

/* ---------- reveal-on-scroll hook ---------- */
const useInView = () => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

/* ---------- icons ---------- */
const QuoteIcon = () => (
  <svg
    className="Testimonial-quote-svg"
    viewBox="0 0 60 48"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M0 48V30C0 14 9 4 24 0V9C17 12 14 17 14 23H24V48Z M36 48V30C36 14 45 4 60 0V9C53 12 50 17 50 23H60V48Z"
    />
  </svg>
)

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 17.3 18.2 21l-1.6-7L22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2 7.4 14 5.8 21z" />
  </svg>
)

const ChevronIcon = ({ dir = 'right' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={dir === 'left' ? { transform: 'rotate(180deg)' } : undefined}
  >
    <path d="M9 5l7 7-7 7" />
  </svg>
)

/* ---------- hand-drawn food doodles ---------- */
const OnionDoodle = () => (
  <svg viewBox="0 0 160 180" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="80" cy="92" rx="68" ry="78" />
    <ellipse cx="80" cy="92" rx="55" ry="64" />
    <ellipse cx="80" cy="92" rx="41" ry="48" />
    <ellipse cx="80" cy="92" rx="27" ry="32" />
    <ellipse cx="80" cy="92" rx="13" ry="16" />
    <path d="M132 36l9-8M146 78l11-3M142 124l10 5M118 160l7 9M44 160l-7 9M16 118l-11 5M14 70l-11-3M40 30l-6-9" />
  </svg>
)

const TomatoDoodle = () => (
  <svg viewBox="0 0 140 180" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M30 60C10 40 40 5 90 15c40 7 50 65 30 105-15 30-50 40-70 30C20 135 10 95 30 60Z" />
    <path d="M62 148c-7 17-2 30 8 32M72 148c3 18 10 26 18 28M82 146c10 12 20 16 28 14" />
    <path d="M118 56c5 15 3 30-4 42" />
  </svg>
)

const ChiliDoodle = () => (
  <svg viewBox="0 0 150 150" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 20C20 10 40 25 50 50c12 30 40 60 90 72l2 18c-52 2-92-22-112-58C20 62 10 45 5 20Z" />
    <path d="M30 40c8 24 22 46 40 62" />
  </svg>
)

const Testimonial = () => {
  const total = testimonials.length
  // a copy of the first cards is added at the end => endless loop
  const items = [...testimonials, ...testimonials.slice(0, CLONES)]

  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const pendingPrev = useRef(false)
  const touchStartX = useRef(null)

  const [headRef, headInView] = useInView()
  const [sliderRef, sliderInView] = useInView()

  const activeDot = index % total

  const next = useCallback(() => {
    setAnimate(true)
    setIndex((i) => i + 1)
  }, [])

  const prev = useCallback(() => {
    if (index === 0) {
      // jump (invisibly) to the copied cards, then slide back one step
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

  // when the copied cards are reached, silently reset to the real ones
  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (index >= total) {
      setAnimate(false)
      setIndex(index - total)
    }
  }

  // switch the transition back on after an invisible jump
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

  // auto slide: one card every 2 seconds (pauses on hover / touch)
  useEffect(() => {
    if (paused || !animate) return undefined
    const timer = setTimeout(next, AUTO_DELAY)
    return () => clearTimeout(timer)
  }, [index, paused, animate, next])

  // swipe support for phones / tablets
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    setPaused(true)
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const diff = e.changedTouches[0].clientX - touchStartX.current
      if (Math.abs(diff) > 40) (diff < 0 ? next : prev)()
    }
    touchStartX.current = null
    setPaused(false)
  }

  return (
    <section className="Testimonial" aria-label="Customer testimonials">
      {/* decorative doodles */}
      <span className="Testimonial-doodle Testimonial-doodle-onion" aria-hidden="true">
        <OnionDoodle />
      </span>
      <span className="Testimonial-doodle Testimonial-doodle-tomato" aria-hidden="true">
        <TomatoDoodle />
      </span>
      <span className="Testimonial-doodle Testimonial-doodle-chili" aria-hidden="true">
        <ChiliDoodle />
      </span>

      <div className="Testimonial-container">
        {/* ---------- heading ---------- */}
        <div
          ref={headRef}
          className={`Testimonial-heading ${headInView ? 'Testimonial-inview' : ''}`}
        >
          <span className="Testimonial-eyebrow">Our Testimonial</span>
          <h2 className="Testimonial-title">Customers are Saying Something Foodie</h2>
        </div>

        {/* ---------- sliding testimonial cards ---------- */}
        <div
          ref={sliderRef}
          className={`Testimonial-slider ${sliderInView ? 'Testimonial-inview' : ''}`}
        >
          <div
            className="Testimonial-viewport"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <ul
              className={`Testimonial-track ${animate ? '' : 'Testimonial-track-static'}`}
              style={{ '--Testimonial-index': index }}
              onTransitionEnd={handleTransitionEnd}
            >
              {items.map((item, i) => {
                const isClone = i >= total
                return (
                  <li
                    className="Testimonial-slide"
                    key={isClone ? `clone-${item.id}` : item.id}
                    aria-hidden={isClone}
                  >
                    <article className="Testimonial-card">
                      <div className="Testimonial-bubble">
                        <span className="Testimonial-quote Testimonial-quote-open" aria-hidden="true">
                          <QuoteIcon />
                        </span>

                        <p className="Testimonial-text">{item.text}</p>

                        <span className="Testimonial-quote Testimonial-quote-close" aria-hidden="true">
                          <QuoteIcon />
                        </span>
                      </div>

                      <div className="Testimonial-author">
                        <span className="Testimonial-avatar">
                          <img
                            className="Testimonial-avatar-img"
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            draggable="false"
                          />
                        </span>

                        <div className="Testimonial-author-info">
                          <h3 className="Testimonial-name">{item.name}</h3>
                          <span className="Testimonial-role">{item.role}</span>
                          <div className="Testimonial-stars" aria-label={`Rated ${item.rating} out of 5`}>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <span
                                key={n}
                                className={`Testimonial-star ${n <= item.rating ? 'Testimonial-star-filled' : ''}`}
                                style={{ '--Testimonial-star-delay': `${n * 0.06}s` }}
                              >
                                <StarIcon />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ---------- controls ---------- */}
          <div className="Testimonial-controls">
            <button
              type="button"
              className="Testimonial-nav"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronIcon dir="left" />
            </button>

            <div className="Testimonial-dots" role="tablist">
              {testimonials.map((t, i) => (
                <button
                  type="button"
                  key={t.id}
                  role="tab"
                  aria-selected={i === activeDot}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`Testimonial-dot ${i === activeDot ? 'Testimonial-dot-active' : ''}`}
                  onClick={() => goTo(i)}
                >
                  {i === activeDot && (
                    <span
                      key={`${index}-${paused}`}
                      className="Testimonial-dot-fill"
                      style={{
                        animationDuration: `${AUTO_DELAY}ms`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="Testimonial-nav"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial