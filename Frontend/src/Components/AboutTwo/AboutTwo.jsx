import React, { useEffect, useRef, useState } from "react";
import "./AboutTwo.css";

/* ---------- ASSETS (swap any file name here if an image doesn't match) ---------- */
import logo from "../../assets/logo-1.png"; // small UNT logo

// 3 client thumbnails (click one → its review opens)
import thumb1 from "../../assets/9f8f971a39a7d87938ff56172280c9497af70bfc.png";
import thumb2 from "../../assets/9c5c20c037174a1385f85ff3603c8ac5afa5464b.png";
import thumb3 from "../../assets/portrait-of-a-smiling-male-1.png";

// ONE large photo on the right (never changes)
import bigPhoto from "../../assets/CUST-IMG-1 (1).png";

/* =====================================================
   DATA – 3 different client reviews
===================================================== */
const REVIEWS = [
  {
    id: "c1",
    name: "Ananya Sharma",
    role: "Food Blogger",
    text: "Exceptional service and timely delivery! My order from UNT reached hot and fresh in under thirty minutes, and the packaging was spotless. This is now my go-to app for every craving.",
    thumb: thumb1,
  },
  {
    id: "c2",
    name: "Rahul Mehta",
    role: "Regular Customer",
    text: "I order for my family almost every weekend. The tracking is accurate, the discounts are real, and the support team solved a missing item within minutes. Truly delivering deliciousness.",
    thumb: thumb2,
  },
  {
    id: "c3",
    name: "Chef Arjun Rao",
    role: "Restaurant Partner",
    text: "Partnering with UNT grew our orders in just a few months. Riders are professional, payouts are on time, and our dishes always reach customers the way we plated them.",
    thumb: thumb3,
  },
];

/* =====================================================
   HOOKS
===================================================== */

// true once the element enters the viewport (fires once)
const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

// writes CSS variable --py (-1 … 1) while scrolling → parallax in CSS
const useScrollProgress = (ref) => {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      node.style.setProperty("--py", Math.max(-1, Math.min(1, p)).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
};

/* =====================================================
   SMALL PIECES
===================================================== */

const Words = ({ text }) =>
  text.split(" ").map((w, i) => (
    <React.Fragment key={i}>
      <span className="about-two-word-mask">
        <span className="about-two-word" style={{ "--i": i }}>
          {w}
        </span>
      </span>{" "}
    </React.Fragment>
  ));

const Stars = () => (
  <div className="about-two-stars" aria-label="Rated 5 out of 5">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} viewBox="0 0 24 24" width="18" height="18" style={{ "--i": i }} aria-hidden="true">
        <path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9z" />
      </svg>
    ))}
  </div>
);

const QuoteIcon = () => (
  <svg className="about-two-quote-icon" viewBox="0 0 48 48" aria-hidden="true">
    <path d="M19 10C11 12 6 18 6 27v11h14V25h-7c0-5 2-8 6-10zM42 10c-8 2-13 8-13 17v11h14V25h-7c0-5 2-8 6-10z" />
  </svg>
);

/* =====================================================
   COMPONENT
===================================================== */

const AboutTwo = () => {
  const sectionRef = useRef(null);
  const [inRef, inView] = useInView(0.15);
  const [active, setActive] = useState(0);

  useScrollProgress(sectionRef);

  const current = REVIEWS[active];

  return (
    <section ref={sectionRef} className="about-two">
      <span className="about-two-blob blob-a" aria-hidden="true" />
      <span className="about-two-blob blob-b" aria-hidden="true" />

      <div ref={inRef} className={`about-two-inner ${inView ? "is-visible" : ""}`}>
        {/* ===== TITLE ===== */}
        <header className="about-two-head">
          <span className="about-two-eyebrow">Satisfied Clients</span>
          <h2 aria-label="What our clients say">
            <Words text="What our clients say" />
          </h2>
          <span className="about-two-head-line" />
        </header>

        <div className="about-two-body">
          {/* ===== LEFT : logo → review → 3 client photos ===== */}
          <div className="about-two-left">
            <img src={logo} alt="UNT – Delivering Deliciousness" className="about-two-logo" />

            {/* shows the review of the client photo you clicked */}
            <div className="about-two-review" key={current.id} aria-live="polite">
              <QuoteIcon />
              <p className="about-two-text">{current.text}</p>

              <div className="about-two-author">
                <h3>{current.name}</h3>
                <span>{current.role}</span>
                <Stars />
              </div>
            </div>

            {/* 3 client photos – click to open that client's review */}
            <div className="about-two-thumbs" role="group" aria-label="Choose a client review">
              {REVIEWS.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  className={`about-two-thumb ${i === active ? "is-active" : ""}`}
                  style={{ "--i": i }}
                  onClick={() => setActive(i)}
                  aria-label={`Show review from ${r.name}`}
                  aria-pressed={i === active}
                >
                  <img src={r.thumb} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* ===== RIGHT : ONE LARGE IMAGE (fixed) ===== */}
          <div className="about-two-visual">
            <div className="about-two-photo">
              <img src={bigPhoto} alt="Happy UNT client" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTwo;