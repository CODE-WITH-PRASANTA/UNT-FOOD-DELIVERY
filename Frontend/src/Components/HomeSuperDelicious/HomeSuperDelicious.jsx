import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from 'react'
import './HomeSuperDelicious.css'

/* ---------- card images ---------- */
import delicious1 from '../../assets/delicious-1.png'
import delicious2 from '../../assets/delicious-2.png'
import delicious3 from '../../assets/delicious-3.png'
import delicious4 from '../../assets/delicious-4.png'
import delicious5 from '../../assets/delicious-5.png'
import delicious6 from '../../assets/delicious-6.png'
import delicious7 from '../../assets/delicious-7.png'
import delicious8 from '../../assets/delicious-8.png'
import delicious9 from '../../assets/delicious-9.png'
import delicious10 from '../../assets/delicious-10.png'

/* ---------- bottom banners ---------- */
import banner1 from '../../assets/image-1.png'
import banner2 from '../../assets/img-2.png'

const AUTO_DELAY = 2000 // a new card moves in every 2 seconds
const SLIDE_MS = 850 // duration of one slide (must be shorter than AUTO_DELAY)
const CLONES = 5 // = max cards visible at once (desktop)
const PAUSE_ON_HOVER = false // true => stop sliding while the mouse is over the cards

const categories = [
  { id: 1, name: 'Chicken', count: 19, slug: 'chicken', image: delicious1 },
  { id: 2, name: 'Pizza', count: 15, slug: 'pizza', image: delicious2 },
  { id: 3, name: 'Chicken', count: 19, slug: 'chicken', image: delicious3 },
  { id: 4, name: 'Burgers', count: 20, slug: 'burgers', image: delicious4 },
  { id: 5, name: 'Burgers', count: 20, slug: 'burgers', image: delicious5 },
  { id: 6, name: 'Burgers', count: 20, slug: 'burgers', image: delicious6 },
  { id: 7, name: 'Burgers', count: 20, slug: 'burgers', image: delicious7 },
  { id: 8, name: 'Burgers', count: 20, slug: 'burgers', image: delicious8 },
  { id: 9, name: 'Burgers', count: 20, slug: 'burgers', image: delicious9 },
  { id: 10, name: 'Burgers', count: 20, slug: 'burgers', image: delicious10 },
]

const banners = [
  { id: 1, image: banner1, alt: 'Super delicious pizza menu, limited offer' },
  { id: 2, image: banner2, alt: 'Super delicious burger, this weekend only' },
]

const ChevronIcon = ({ dir = 'right' }) => (
  <svg
    className="HomeSuperDelicious-chevron"
    width="20"
    height="20"
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

const HomeSuperDelicious = () => {
  const total = categories.length
  // a copy of the first cards is added at the end => endless loop
  const items = [...categories, ...categories.slice(0, CLONES)]

  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)

  const trackRef = useRef(null)
  const indexRef = useRef(0) // always holds the latest index
  indexRef.current = index
  const pausedRef = useRef(false) // read by the interval, never causes re-render
  const pendingPrev = useRef(false)
  const touchStartX = useRef(null)

  /* ---------- moving ---------- */
  const next = useCallback(() => {
    setAnimate(true)
    // while waiting for the silent reset we never go further than the copies
    setIndex((i) => (i >= total ? i : i + 1))
  }, [total])

  const prev = useCallback(() => {
    if (indexRef.current === 0) {
      // jump (invisibly) to the copies, the layout effect then slides back
      pendingPrev.current = true
      setAnimate(false)
      setIndex(total)
    } else {
      setAnimate(true)
      setIndex(indexRef.current - 1)
    }
  }, [total])

  /* 1) AUTO SLIDE ---------------------------------------------------
     A plain interval that lives for the whole life of the component.
     It is never cancelled by state changes, so it can't get "stuck". */
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current || document.hidden) return
      next()
    }, AUTO_DELAY)
    return () => clearInterval(id)
  }, [next])

  /* 2) SILENT RESET -------------------------------------------------
     When the copied cards are on screen, wait for the slide to finish
     and jump back to the real cards. Uses a timer (not transitionend),
     so it also works when the browser tab was in the background. */
  useEffect(() => {
    if (index < total) return undefined
    const timer = setTimeout(() => {
      setAnimate(false)
      setIndex((i) => (i >= total ? i - total : i))
    }, SLIDE_MS + 80)
    return () => clearTimeout(timer)
  }, [index, total])

  /* 3) after an invisible jump: flush the layout, then switch the
        transition back on in the very same commit */
  useLayoutEffect(() => {
    if (animate) return
    if (trackRef.current) trackRef.current.getBoundingClientRect() // force reflow
    setAnimate(true)
    if (pendingPrev.current) {
      pendingPrev.current = false
      setIndex(total - 1)
    }
  }, [animate, total])

  /* 4) coming back to the tab: make sure we never stay on the copies */
  useEffect(() => {
    const onVisible = () => {
      if (document.hidden) return
      if (indexRef.current >= total) {
        setAnimate(false)
        setIndex(indexRef.current - total)
      }
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [total])

  /* ---------- touch / hover ---------- */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    pausedRef.current = true
  }

  const finishTouch = (e) => {
    if (touchStartX.current !== null && e.changedTouches) {
      const diff = e.changedTouches[0].clientX - touchStartX.current
      if (Math.abs(diff) > 40) (diff < 0 ? next : prev)()
    }
    touchStartX.current = null
    pausedRef.current = false // always resume, even if the touch was cancelled
  }

  const handleMouseEnter = () => {
    if (PAUSE_ON_HOVER) pausedRef.current = true
  }

  const handleMouseLeave = () => {
    pausedRef.current = false
  }

  // never let the track point past the last copy (no blank space, ever)
  const safeIndex = Math.min(index, total + CLONES - 1)

  return (
    <section className="HomeSuperDelicious" aria-label="Super delicious categories">
      <div className="HomeSuperDelicious-wrapper">
        {/* ---------- header ---------- */}
        <div className="HomeSuperDelicious-header">
          <h2 className="HomeSuperDelicious-title">Super Delicious</h2>

          <div className="HomeSuperDelicious-controls">
            <button
              type="button"
              className="HomeSuperDelicious-nav"
              onClick={prev}
              aria-label="Previous categories"
            >
              <ChevronIcon dir="left" />
            </button>
            <button
              type="button"
              className="HomeSuperDelicious-nav"
              onClick={next}
              aria-label="Next categories"
            >
              <ChevronIcon />
            </button>
          </div>
        </div>

        {/* ---------- sliding cards ---------- */}
        <div
          className="HomeSuperDelicious-viewport"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={finishTouch}
          onTouchCancel={finishTouch}
        >
          <ul
            ref={trackRef}
            className={`HomeSuperDelicious-track ${animate ? '' : 'HomeSuperDelicious-track-static'}`}
            style={{
              '--HomeSuperDelicious-index': safeIndex,
              transitionDuration: `${SLIDE_MS}ms`,
            }}
          >
            {items.map((item, i) => {
              const isClone = i >= total
              return (
                <li
                  className="HomeSuperDelicious-slide"
                  key={isClone ? `clone-${item.id}` : item.id}
                  aria-hidden={isClone}
                >
                  <a
                    className="HomeSuperDelicious-card"
                    href={`/product-category/${item.slug}`}
                    tabIndex={isClone ? -1 : 0}
                    draggable="false"
                  >
                    <span className="HomeSuperDelicious-card-media">
                      <img
                        className="HomeSuperDelicious-card-img"
                        src={item.image}
                        alt={item.name}
                        decoding="async"
                        draggable="false"
                      />
                    </span>
                    <h3 className="HomeSuperDelicious-card-title">{item.name}</h3>
                    <span className="HomeSuperDelicious-card-badge">
                      {item.count} products
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* ---------- bottom banners (static) ---------- */}
        <div className="HomeSuperDelicious-banners">
          {banners.map((b) => (
            <figure className="HomeSuperDelicious-banner" key={b.id}>
              <img
                className="HomeSuperDelicious-banner-img"
                src={b.image}
                alt={b.alt}
                loading="lazy"
              />
              <span className="HomeSuperDelicious-banner-shine" aria-hidden="true" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeSuperDelicious