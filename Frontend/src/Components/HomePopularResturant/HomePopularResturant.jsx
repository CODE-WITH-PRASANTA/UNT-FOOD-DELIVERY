import React, { useEffect, useRef, useState } from 'react'
import './HomePopularResturant.css'

/* ---------- restaurant photos ---------- */
import popular1 from '../../assets/popular-1.jpg'
import popular2 from '../../assets/popular-2.jpg'
import popular3 from '../../assets/popular-3.jpg'
import popular4 from '../../assets/popular-4.jpg'
import popular5 from '../../assets/popular-5.jpg'
import popular6 from '../../assets/popular-6.jpg'
import popular7 from '../../assets/popular-7.jpg'
import popular8 from '../../assets/popular-8.jpg'

/* ---------- small round restaurant logos ---------- */
import hotel1 from '../../assets/hotel-1.jpg'
import hotel2 from '../../assets/hotel-2.jpg'
import hotel3 from '../../assets/hotel-3.jpg'
import hotel4 from '../../assets/hotel-4.jpg'
import hotel5 from '../../assets/hotel-5.jpg'
import hotel6 from '../../assets/hotel-6.jpg'
import hotel7 from '../../assets/hotel-7.jpg'
import hotel8 from '../../assets/hotel-8.jpg'

/* ---------- middle banners ---------- */
import banner1 from '../../assets/image-1.png'
import banner2 from '../../assets/img-2.png'

const restaurants = [
  { id: 1, slug: 'organic-arcadian-food', name: 'Organic Arcadian Food', time: '12:01 am - 11:59 pm', address: 'Link road, Model Town,', rating: 0, image: popular1, logo: hotel1, logoBg: '#f6f06a' },
  { id: 2, slug: 'aromi-lounge', name: 'Aromi Lounge', time: '2:00 pm - 12:00 am', address: '1784 Willow Creek Drive,', rating: 0, image: popular2, logo: hotel2, logoBg: '#e8c3a4' },
  { id: 3, slug: 'tasty-food-pizza', name: 'Tasty Food Pizza', time: '12:03 am - 11:59 pm', address: '47 W 13th St, New York,', rating: 0, image: popular3, logo: hotel3, logoBg: '#dcdcdc' },
  { id: 4, slug: 'food-chef-italian', name: 'Food Chef Italian', time: '12:01 am - 11:59 pm', address: 'Suite# 3, Abu Dhabi,', rating: 0, image: popular4, logo: hotel4, logoBg: '#f7c6c0' },
  { id: 5, slug: 'toni-food-hub', name: 'Toni Food Hub', time: '12:10 am - 11:00 pm', address: 'Street 5, Oaxaca, Sonora,', rating: 0, image: popular5, logo: hotel5, logoBg: '#d62a2a' },
  { id: 6, slug: 'masterchef-chinese-food', name: 'Masterchef Chinese Food', time: '12:09 am - 11:52 pm', address: 'Suite# 2 Street 5 Main', rating: 0, image: popular6, logo: hotel6, logoBg: '#e4e4e4' },
  { id: 7, slug: 'burgervil-food-processer', name: 'Burgervil Food Processer', time: '8:00 am - 5:00 pm', address: 'Suite# 6, Abu Dhabi, UAE,', rating: 0, image: popular7, logo: hotel7, logoBg: '#e9a93a' },
  { id: 8, slug: 'fun-chicken-meals', name: 'Fun Chicken Meals', time: '12:05 am - 11:59 pm', address: 'Street 6 Park Avenue,', rating: 0, image: popular8, logo: hotel8, logoBg: '#f9c9d8' },
]

const banners = [
  { id: 1, image: banner1, alt: 'Super delicious burger, this weekend only' },
  { id: 2, image: banner2, alt: 'Super delicious pizza menu, limited offer' },
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
const ClockIcon = () => (
  <svg className="HomePopularResturant-icon-clock" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="currentColor" />
    <path d="M12 6v6.2l4 2.3" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PlaneIcon = () => (
  <svg className="HomePopularResturant-icon-plane" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M2.2 21.3 23 12 2.2 2.7 2.2 10l14.9 2-14.9 2z" />
  </svg>
)

const StarIcon = () => (
  <svg className="HomePopularResturant-star-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 17.3 18.2 21l-1.6-7L22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2 7.4 14 5.8 21z" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* ---------- single restaurant card ---------- */
const RestaurantCard = ({ data, index }) => (
  <div
    className="HomePopularResturant-item"
    style={{ '--HomePopularResturant-delay': `${index * 0.1}s` }}
  >
    <a className="HomePopularResturant-card" href={`/restaurant/${data.slug}`} draggable="false">
      <div className="HomePopularResturant-card-media">
        <img
          className="HomePopularResturant-card-img"
          src={data.image}
          alt={data.name}
          loading="lazy"
          draggable="false"
        />
        <span className="HomePopularResturant-card-edge" aria-hidden="true" />
        <span className="HomePopularResturant-card-cta">
          View Menu <ArrowIcon />
        </span>
      </div>

      <div className="HomePopularResturant-card-body">
        <p className="HomePopularResturant-card-time">
          <ClockIcon />
          <span>{data.time}</span>
        </p>

        <h3 className="HomePopularResturant-card-title" title={data.name}>
          {data.name}
        </h3>

        <div className="HomePopularResturant-card-stars" aria-label={`Rated ${data.rating} out of 5`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`HomePopularResturant-star ${n <= data.rating ? 'HomePopularResturant-star-filled' : ''}`}
              style={{ '--HomePopularResturant-star-delay': `${n * 0.06}s` }}
            >
              <StarIcon />
            </span>
          ))}
        </div>
      </div>

      <div className="HomePopularResturant-card-footer">
        <PlaneIcon />
        <span className="HomePopularResturant-card-address" title={data.address}>
          {data.address}
        </span>
      </div>

      <span className="HomePopularResturant-card-logo" style={{ background: data.logoBg }}>
        <img
          className="HomePopularResturant-card-logo-img"
          src={data.logo}
          alt={`${data.name} logo`}
          loading="lazy"
          draggable="false"
        />
      </span>
    </a>
  </div>
)

const HomePopularResturant = () => {
  const [topRef, topInView] = useInView()
  const [bannerRef, bannerInView] = useInView()
  const [bottomRef, bottomInView] = useInView()
  const [headRef, headInView] = useInView()

  const firstRow = restaurants.slice(0, 4)
  const secondRow = restaurants.slice(4, 8)

  return (
    <section className="HomePopularResturant" aria-label="Popular restaurants">
      <div className="HomePopularResturant-container">
        {/* ---------- heading ---------- */}
        <div
          ref={headRef}
          className={`HomePopularResturant-heading ${headInView ? 'HomePopularResturant-inview' : ''}`}
        >
          <span className="HomePopularResturant-eyebrow">Top Restaurants</span>
          <h2 className="HomePopularResturant-title">Popular Restaurant</h2>
          <span className="HomePopularResturant-divider" aria-hidden="true" />
        </div>

        {/* ---------- first 4 cards ---------- */}
        <div
          ref={topRef}
          className={`HomePopularResturant-grid ${topInView ? 'HomePopularResturant-inview' : ''}`}
        >
          {firstRow.map((r, i) => (
            <RestaurantCard key={r.id} data={r} index={i} />
          ))}
        </div>

        {/* ---------- middle banners ---------- */}
        <div
          ref={bannerRef}
          className={`HomePopularResturant-banners ${bannerInView ? 'HomePopularResturant-inview' : ''}`}
        >
          {banners.map((b, i) => (
            <div
              className="HomePopularResturant-item"
              key={b.id}
              style={{ '--HomePopularResturant-delay': `${i * 0.15}s` }}
            >
              <figure className="HomePopularResturant-banner">
                <img
                  className="HomePopularResturant-banner-img"
                  src={b.image}
                  alt={b.alt}
                  loading="lazy"
                />
                <span className="HomePopularResturant-banner-shine" aria-hidden="true" />
              </figure>
            </div>
          ))}
        </div>

        {/* ---------- last 4 cards ---------- */}
        <div
          ref={bottomRef}
          className={`HomePopularResturant-grid ${bottomInView ? 'HomePopularResturant-inview' : ''}`}
        >
          {secondRow.map((r, i) => (
            <RestaurantCard key={r.id} data={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomePopularResturant