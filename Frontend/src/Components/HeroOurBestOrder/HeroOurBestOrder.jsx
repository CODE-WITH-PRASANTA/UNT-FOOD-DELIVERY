import React, { useState, useEffect, useCallback, useRef } from 'react'
import './HeroOurBestOrder.css'

/* ---------- food images ---------- */
import product1 from '../../assets/product-1.avif'
import product2 from '../../assets/product-2.avif'
import product3 from '../../assets/product-3.avif'
import product4 from '../../assets/product-4.avif'
import product5 from '../../assets/product-5.avif'
import product6 from '../../assets/product-6.avif'
import product7 from '../../assets/product-7.avif'
import product8 from '../../assets/product-8.avif'
import product9 from '../../assets/product-9.avif'
import product10 from '../../assets/product-10.avif'
import product11 from '../../assets/product-11.avif'
import product12 from '../../assets/product-12.avif'
import product13 from '../../assets/product-13.avif'
import product14 from '../../assets/product-14.avif'
import product15 from '../../assets/product-15.avif'
import product16 from '../../assets/product-16.avif'
import product17 from '../../assets/product-17.avif'
import product18 from '../../assets/product-18.avif'
import product19 from '../../assets/product-19.avif'
import product20 from '../../assets/product-20.avif'

/* Every card opens this page for now.
   Later, when your details page is ready, change it per item,
   for example: to: `/food/${slug}` */
const DEFAULT_ROUTE = '/blog'

/* Order = column by column (top item, then bottom item), like your design */
const foods = [
  { id: 1, name: 'Biryani', slug: 'biryani', image: product1 },
  { id: 2, name: 'Noodles', slug: 'noodles', image: product2 },
  { id: 3, name: 'North Indian', slug: 'north-indian', image: product3 },
  { id: 4, name: 'Dosa', slug: 'dosa', image: product4 },
  { id: 5, name: 'Burger', slug: 'burger', image: product5 },
  { id: 6, name: 'Salad', slug: 'salad', image: product6 },
  { id: 7, name: 'Pizza', slug: 'pizza', image: product7 },
  { id: 8, name: 'Khichdi', slug: 'khichdi', image: product8 },
  { id: 9, name: 'Cake', slug: 'cake', image: product9 },
  { id: 10, name: 'Ice Cream', slug: 'ice-cream', image: product10 },
  { id: 11, name: 'Chinese', slug: 'chinese', image: product11 },
  { id: 12, name: 'Pasta', slug: 'pasta', image: product12 },
  { id: 13, name: 'South Indian', slug: 'south-indian', image: product13 },
  { id: 14, name: 'Vada', slug: 'vada', image: product14 },
  { id: 15, name: 'Rolls', slug: 'rolls', image: product15 },
  { id: 16, name: 'Coffee', slug: 'coffee', image: product16 },
  { id: 17, name: 'Desserts', slug: 'desserts', image: product17 },
  { id: 18, name: 'Shawarma', slug: 'shawarma', image: product18 },
  { id: 19, name: 'Paratha', slug: 'paratha', image: product19 },
  { id: 20, name: 'Chole Bhature', slug: 'chole-bhature', image: product20 },
].map((f) => ({ ...f, to: DEFAULT_ROUTE }))

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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

const ArrowIcon = ({ dir = 'right' }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={dir === 'left' ? { transform: 'rotate(180deg)' } : undefined}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const HeroOurBestOrder = () => {
  const scrollerRef = useRef(null)
  const dragRef = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 })
  const [edges, setEdges] = useState({ start: true, end: false })
  const [sectionRef, inView] = useInView()

  /* ---------- are we at the left / right end? ---------- */
  const updateEdges = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= max - 2,
    })
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return undefined

    updateEdges()
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)

    let observer
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateEdges)
      observer.observe(el)
    }

    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
      if (observer) observer.disconnect()
    }
  }, [updateEdges])

  /* ---------- arrow buttons ---------- */
  const scrollByDir = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({
      left: dir * el.clientWidth * 0.85,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  /* ---------- mouse drag to scroll (touch uses native scrolling) ---------- */
  const handleMouseDown = (e) => {
    const el = scrollerRef.current
    if (!el || e.button !== 0) return

    dragRef.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: 0,
    }

    const onMove = (ev) => {
      const d = dragRef.current
      if (!d.active) return
      const dx = ev.clientX - d.startX
      d.moved = Math.max(d.moved, Math.abs(dx))
      if (d.moved > 6) el.classList.add('HeroOurBestOrder-scroller-dragging')
      el.scrollLeft = d.startLeft - dx
    }

    const onUp = () => {
      dragRef.current.active = false
      el.classList.remove('HeroOurBestOrder-scroller-dragging')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  // a drag must not open a link
  const handleClickCapture = (e) => {
    if (dragRef.current.moved > 6) {
      e.preventDefault()
      e.stopPropagation()
      dragRef.current.moved = 0
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`HeroOurBestOrder ${inView ? 'HeroOurBestOrder-inview' : ''}`}
      aria-label="Our best food options"
    >
      <div className="HeroOurBestOrder-container">
        {/* ---------- header ---------- */}
        <div className="HeroOurBestOrder-header">
          <h2 className="HeroOurBestOrder-title">Order our best food options</h2>

          <div className="HeroOurBestOrder-controls">
            <button
              type="button"
              className="HeroOurBestOrder-nav"
              onClick={() => scrollByDir(-1)}
              disabled={edges.start}
              aria-label="Scroll left"
            >
              <ArrowIcon dir="left" />
            </button>
            <button
              type="button"
              className="HeroOurBestOrder-nav"
              onClick={() => scrollByDir(1)}
              disabled={edges.end}
              aria-label="Scroll right"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>

        {/* ---------- scrollable 2-row list ---------- */}
        <ul
          ref={scrollerRef}
          className={`HeroOurBestOrder-scroller ${edges.start ? '' : 'HeroOurBestOrder-fade-left'} ${edges.end ? '' : 'HeroOurBestOrder-fade-right'}`}
          onMouseDown={handleMouseDown}
          onClickCapture={handleClickCapture}
        >
          {foods.map((food, i) => (
            <li
              className="HeroOurBestOrder-item"
              key={food.id}
              style={{ '--HeroOurBestOrder-delay': `${Math.floor(i / 2) * 0.06}s` }}
            >
              <a
                className="HeroOurBestOrder-card"
                href={food.to}
                draggable="false"
                aria-label={`Order ${food.name}`}
                title={food.name}
              >
                <span className="HeroOurBestOrder-card-media">
                  <img
                    className="HeroOurBestOrder-card-img"
                    src={food.image}
                    alt={food.name}
                    decoding="async"
                    draggable="false"
                  />
                  <span className="HeroOurBestOrder-card-chip" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HeroOurBestOrder