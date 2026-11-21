import React, { useState, useMemo, useEffect, useRef } from 'react'
import './CartMain.css'

/* ---------- Tiny inline icon set (no extra dependency needed) ---------- */
const ICONS = {
  cart: (<><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></>),
  trash: (<><path d="M3 6h18" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M10 11v6M14 11v6" /></>),
  tag: (<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><circle cx="7" cy="7" r="1.5" /></>),
  lock: (<><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>),
  shield: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>),
  gift: (<><path d="M20 12v10H4V12" /><path d="M2 7h20v5H2z" /><path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></>),
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="M5 12h14M12 5l7 7-7 7" />,
  clock: (<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  truck: (<><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>),
  check: <path d="M20 6L9 17l-5-5" />,
  close: <path d="M18 6L6 18M6 6l12 12" />,
  leaf: (<><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>),
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
}

const Icon = ({ name, size = 18, filled = false, className = '' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke={filled ? 'none' : 'currentColor'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {ICONS[name]}
  </svg>
)

/* ---------- Data ---------- */
const INITIAL_ITEMS = [
  {
    id: 1, name: 'Margherita Pizza', rating: 4.6, reviews: '1.2k', desc: 'Classic cheese pizza with fresh basil.',
    price: 239, mrp: 299, badge: '20% OFF', qty: 1, emoji: '🍕',
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2, name: 'Cheese Burger', rating: 4.5, reviews: '980', desc: 'Juicy burger with melted cheese.',
    price: 169, mrp: 199, badge: '15% OFF', qty: 1, emoji: '🍔',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3, name: 'French Fries', rating: 4.4, reviews: '720', desc: 'Crispy golden fries.',
    price: 99, mrp: null, badge: null, qty: 1, emoji: '🍟',
    img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4, name: 'Pasta Alfredo', rating: 4.6, reviews: '850', desc: 'Creamy white sauce pasta.',
    price: 249, mrp: null, badge: null, qty: 1, emoji: '🍝',
    img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5, name: 'Cold Coffee', rating: 4.5, reviews: '671', desc: 'Chilled & refreshing coffee.',
    price: 99, mrp: null, badge: null, qty: 1, emoji: '🥤',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80',
  },
]

const PROMOS = {
  FRESH10: { label: '10% off on items', calc: (sub) => Math.round(sub * 0.1) },
  SAVE50: { label: '₹50 off on orders above ₹500', min: 500, calc: () => 50 },
  FREEDEL: { label: 'Free delivery', freeDelivery: true, calc: () => 0 },
}

const DELIVERY_FEE = 49
const TAX_RATE = 0.08
const money = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const fallbackImage = (emoji) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#fff1e6"/><text x="50%" y="55%" font-size="90" text-anchor="middle" dominant-baseline="middle">${emoji}</text></svg>`
  )}`

const Stars = ({ rating }) => (
  <span className="CartMain-stars" aria-label={`${rating} out of 5`}>
    <span className="CartMain-stars-base">
      {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={13} filled />)}
    </span>
    <span className="CartMain-stars-fill" style={{ width: `${(rating / 5) * 100}%` }}>
      {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={13} filled />)}
    </span>
  </span>
)

/* ---------- Component ---------- */
const CartMain = ({ onCheckout }) => {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [couponInput, setCouponInput] = useState('')
  const [coupon, setCoupon] = useState(null) // { code, ...promo }
  const [couponMsg, setCouponMsg] = useState({ type: '', text: '' })
  const [step, setStep] = useState(null) // null | 'form' | 'processing' | 'success'
  const [form, setForm] = useState({ name: '', phone: '', address: '', payment: 'upi' })
  const [errors, setErrors] = useState({})
  const [orderInfo, setOrderInfo] = useState(null)
  const timerRef = useRef(null)
  const topRef = useRef(null)

  /* ----- totals ----- */
  const totals = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0)
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
    const discount = coupon ? Math.min(coupon.calc(subtotal), subtotal) : 0
    const delivery = items.length === 0 || coupon?.freeDelivery ? 0 : DELIVERY_FEE
    const taxes = Math.round((subtotal - discount) * TAX_RATE)
    const total = subtotal - discount + delivery + taxes
    return { count, subtotal, discount, delivery, taxes, total }
  }, [items, coupon])

  /* ----- keep coupon valid when cart changes ----- */
  useEffect(() => {
    if (coupon?.min && totals.subtotal < coupon.min) {
      setCoupon(null)
      setCouponMsg({ type: 'error', text: `Coupon removed: minimum order is ${money(coupon.min)}.` })
    }
  }, [totals.subtotal, coupon])

  /* ----- modal: scroll lock + Esc ----- */
  useEffect(() => {
    if (!step) return undefined
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape' && step !== 'processing') setStep(null) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [step])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  /* ----- handlers ----- */
  const changeQty = (id, delta) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.min(10, Math.max(1, i.qty + delta)) } : i))
    )

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clearAll = () => { setItems([]); setCoupon(null); setCouponMsg({ type: '', text: '' }) }
  const restore = () => setItems(INITIAL_ITEMS)

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase()
    if (!code) return setCouponMsg({ type: 'error', text: 'Please enter a coupon code.' })
    const promo = PROMOS[code]
    if (!promo) return setCouponMsg({ type: 'error', text: 'Invalid coupon code.' })
    if (promo.min && totals.subtotal < promo.min)
      return setCouponMsg({ type: 'error', text: `Add items worth ${money(promo.min)} to use ${code}.` })
    setCoupon({ code, ...promo })
    setCouponInput('')
    setCouponMsg({ type: 'success', text: `${code} applied: ${promo.label}.` })
  }

  const removeCoupon = () => { setCoupon(null); setCouponMsg({ type: '', text: '' }) }

  const openCheckout = () => { if (items.length) setStep('form') }

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit mobile number.'
    if (form.address.trim().length < 8) e.address = 'Enter your complete delivery address.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const placeOrder = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setStep('processing')
    const order = {
      id: `FD${Date.now().toString().slice(-8)}`,
      items: items.map(({ id, name, qty, price }) => ({ id, name, qty, price })),
      customer: form,
      totals,
      coupon: coupon?.code || null,
    }
    timerRef.current = setTimeout(() => {
      setOrderInfo(order)
      setStep('success')
      if (typeof onCheckout === 'function') onCheckout(order)
    }, 1800)
  }

  const finish = () => {
    setStep(null)
    setItems([])
    setCoupon(null)
    setCouponMsg({ type: '', text: '' })
    setForm({ name: '', phone: '', address: '', payment: 'upi' })
  }

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  /* ---------- render ---------- */
  return (
    <section className="CartMain" ref={topRef}>
      <div className="CartMain-layout">
        {/* ===== Cart list ===== */}
        <div className="CartMain-cart">
          <header className="CartMain-cart-header">
            <h2 className="CartMain-title">
              <Icon name="cart" size={26} className="CartMain-title-icon" />
              Your Cart ({totals.count} {totals.count === 1 ? 'Item' : 'Items'})
            </h2>
            {items.length > 0 && (
              <button type="button" className="CartMain-clear" onClick={clearAll}>
                <Icon name="trash" size={16} /> Clear All
              </button>
            )}
          </header>

          {items.length === 0 ? (
            <div className="CartMain-empty">
              <div className="CartMain-empty-emoji">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some delicious food to get started.</p>
              <button type="button" className="CartMain-btn-primary" onClick={restore}>
                Add Items Back
              </button>
            </div>
          ) : (
            <ul className="CartMain-list">
              {items.map((item) => (
                <li className="CartMain-item" key={item.id}>
                  <div className="CartMain-item-media">
                    {item.badge && <span className="CartMain-badge">{item.badge}</span>}
                    <img
                      className="CartMain-item-img"
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage(item.emoji) }}
                    />
                  </div>

                  <div className="CartMain-item-info">
                    <h3 className="CartMain-item-name">{item.name}</h3>
                    <div className="CartMain-rating">
                      <Stars rating={item.rating} />
                      <strong>{item.rating}</strong>
                      <span className="CartMain-reviews">({item.reviews} Reviews)</span>
                    </div>
                    <p className="CartMain-item-desc">{item.desc}</p>
                  </div>

                  <div className="CartMain-item-price">
                    <div className="CartMain-price-row">
                      <span className="CartMain-price">{money(item.price)}</span>
                      {item.mrp && <span className="CartMain-mrp">{money(item.mrp)}</span>}
                    </div>
                    <span className="CartMain-available">
                      <Icon name="leaf" size={13} /> Available
                    </span>
                  </div>

                  <div className="CartMain-item-actions">
                    <div className="CartMain-qty" role="group" aria-label={`Quantity of ${item.name}`}>
                      <button type="button" className="CartMain-qty-btn" onClick={() => changeQty(item.id, -1)} disabled={item.qty <= 1} aria-label="Decrease quantity">
                        <Icon name="minus" size={14} />
                      </button>
                      <span className="CartMain-qty-value">{item.qty}</span>
                      <button type="button" className="CartMain-qty-btn" onClick={() => changeQty(item.id, 1)} disabled={item.qty >= 10} aria-label="Increase quantity">
                        <Icon name="plus" size={14} />
                      </button>
                    </div>
                    <button type="button" className="CartMain-remove" onClick={() => removeItem(item.id)}>
                      <Icon name="trash" size={15} /> Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ===== Sidebar ===== */}
        <aside className="CartMain-side">
          <div className="CartMain-summary">
            <h2 className="CartMain-summary-title">
              <span className="CartMain-summary-icon"><Icon name="tag" size={22} /></span>
              Order Summary
            </h2>

            <dl className="CartMain-summary-rows">
              <div className="CartMain-row"><dt>Items ({totals.count})</dt><dd>{money(totals.subtotal)}</dd></div>
              {totals.discount > 0 && (
                <div className="CartMain-row CartMain-row-discount"><dt>Discount ({coupon.code})</dt><dd>- {money(totals.discount)}</dd></div>
              )}
              <div className="CartMain-row">
                <dt>Delivery Fee</dt>
                <dd>{totals.delivery === 0 && items.length ? 'FREE' : money(totals.delivery)}</dd>
              </div>
              <div className="CartMain-row"><dt>Taxes &amp; Charges</dt><dd>{money(totals.taxes)}</dd></div>
            </dl>

            <div className="CartMain-total">
              <span>Total Amount</span>
              <strong>{money(totals.total)}</strong>
            </div>

            <button type="button" className="CartMain-checkout" onClick={openCheckout} disabled={!items.length}>
              <Icon name="lock" size={18} /> Proceed to Checkout <Icon name="arrow" size={18} />
            </button>

            <div className="CartMain-secure">
              <span className="CartMain-secure-icon"><Icon name="shield" size={26} /></span>
              <div>
                <strong>100% Secure Checkout</strong>
                <small>Your information is safe with us</small>
              </div>
            </div>
          </div>

          <div className="CartMain-promo">
            <div className="CartMain-promo-head">
              <span className="CartMain-promo-icon"><Icon name="gift" size={24} /></span>
              <strong>Apply Promo Code</strong>
            </div>
            {coupon ? (
              <div className="CartMain-promo-applied">
                <span><Icon name="check" size={16} /> {coupon.code} applied</span>
                <button type="button" onClick={removeCoupon}>Remove</button>
              </div>
            ) : (
              <form className="CartMain-promo-form" onSubmit={(e) => { e.preventDefault(); applyCoupon() }}>
                <input
                  className="CartMain-promo-input"
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  aria-label="Coupon code"
                />
                <button type="submit" className="CartMain-promo-btn">Apply</button>
              </form>
            )}
            {couponMsg.text && <p className={`CartMain-promo-msg CartMain-promo-msg-${couponMsg.type}`}>{couponMsg.text}</p>}
            {!coupon && <p className="CartMain-promo-hint">Try: FRESH10, SAVE50, FREEDEL</p>}
          </div>
        </aside>
      </div>

      {/* ===== Delivery banner ===== */}
      <div className="CartMain-banner">
        <div className="CartMain-banner-left">
          <span className="CartMain-banner-icon"><Icon name="truck" size={44} /></span>
          <div>
            <h3 className="CartMain-banner-title">Fast &amp; Fresh <span>Delivery</span></h3>
            <p className="CartMain-banner-text">Get your favorite food delivered at your doorstep!</p>
          </div>
        </div>
        <div className="CartMain-banner-time">
          <span className="CartMain-banner-clock"><Icon name="clock" size={34} /></span>
          <div>
            <strong>30-45 Min</strong>
            <small>Delivery Time</small>
          </div>
        </div>
        <button type="button" className="CartMain-banner-btn" onClick={scrollTop}>
          Order Now <Icon name="arrow" size={18} />
        </button>
      </div>

      {/* ===== Checkout modal ===== */}
      {step && (
        <div className="CartMain-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget && step !== 'processing') setStep(null) }}>
          <div className="CartMain-modal" role="dialog" aria-modal="true" aria-label="Checkout">
            {step === 'form' && (
              <form onSubmit={placeOrder} noValidate>
                <div className="CartMain-modal-head">
                  <h3>Delivery &amp; Payment</h3>
                  <button type="button" className="CartMain-modal-close" onClick={() => setStep(null)} aria-label="Close">
                    <Icon name="close" size={18} />
                  </button>
                </div>

                <label className="CartMain-field">
                  <span>Full Name</span>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                  {errors.name && <em>{errors.name}</em>}
                </label>
                <label className="CartMain-field">
                  <span>Mobile Number</span>
                  <input
                    value={form.phone}
                    inputMode="numeric"
                    maxLength={10}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <em>{errors.phone}</em>}
                </label>
                <label className="CartMain-field">
                  <span>Delivery Address</span>
                  <textarea rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House no, street, city, pincode" />
                  {errors.address && <em>{errors.address}</em>}
                </label>

                <fieldset className="CartMain-pay">
                  <legend>Payment Method</legend>
                  {[['upi', 'UPI'], ['card', 'Credit / Debit Card'], ['cod', 'Cash on Delivery']].map(([val, label]) => (
                    <label key={val} className={`CartMain-pay-option ${form.payment === val ? 'is-active' : ''}`}>
                      <input type="radio" name="payment" value={val} checked={form.payment === val} onChange={() => setForm({ ...form, payment: val })} />
                      {label}
                    </label>
                  ))}
                </fieldset>

                <button type="submit" className="CartMain-btn-primary CartMain-btn-block">
                  Pay {money(totals.total)}
                </button>
              </form>
            )}

            {step === 'processing' && (
              <div className="CartMain-state">
                <div className="CartMain-spinner" />
                <h3>Processing your order…</h3>
                <p>Please don&apos;t close this window.</p>
              </div>
            )}

            {step === 'success' && orderInfo && (
              <div className="CartMain-state">
                <div className="CartMain-success-icon"><Icon name="check" size={38} /></div>
                <h3>Order placed successfully!</h3>
                <p>Order ID <strong>{orderInfo.id}</strong></p>
                <p>Amount paid <strong>{money(orderInfo.totals.total)}</strong></p>
                <p>Estimated delivery in <strong>30-45 min</strong></p>
                <button type="button" className="CartMain-btn-primary CartMain-btn-block" onClick={finish}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default CartMain