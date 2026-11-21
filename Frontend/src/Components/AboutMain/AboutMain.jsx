import React, { useEffect, useRef, useState } from "react";
import "./AboutMain.css";

/* ---------- ASSETS (swap any file name here if an image doesn't match) ---------- */
import img1 from "../../assets/Rectangle-30899.png"; // left  column, top
import img3 from "../../assets/Rectangle-30900.png"; // left  column, bottom
import img2 from "../../assets/Rectangle-30901.png"; // right column, top
import img4 from "../../assets/Rectangle-30902.png"; // right column, bottom
import bannerRed from "../../assets/red.png";
import bannerOrange from "../../assets/orange.png";

/* =====================================================
   HOOKS
===================================================== */

// true once the element enters the viewport (fires once)
const useInView = (threshold = 0.25) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // very old browsers: just show everything
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

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

// 0 -> end counter, starts when `start` is true
const useCountUp = (end, start, duration = 2000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    let frame;
    let t0;
    const tick = (t) => {
      if (!t0) t0 = t;
      const progress = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, end, duration]);

  return value;
};

// writes CSS variable --py (-1 … 1) while scrolling → used for parallax in CSS
const useScrollProgress = (ref) => {
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

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

// letter-by-letter title
const SplitChars = ({ text }) =>
  text.split("").map((c, i) => (
    <span className="about-ch" style={{ "--i": i }} key={i} aria-hidden="true">
      {c === " " ? "\u00A0" : c}
    </span>
  ));

// word-by-word rise inside a mask (words from `accentFrom` get the orange gradient)
const Words = ({ text, accentFrom = Infinity }) =>
  text.split(" ").map((w, i) => (
    <React.Fragment key={i}>
      <span className="about-word-mask">
        <span
          className={`about-word ${i >= accentFrom ? "about-word-accent" : ""}`}
          style={{ "--i": i }}
        >
          {w}
        </span>
      </span>{" "}
    </React.Fragment>
  ));

const CheckIcon = () => (
  <svg className="about-check" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <circle className="about-chk-circle" cx="12" cy="12" r="10.5" pathLength="1" />
    <path className="about-chk-tick" d="M7 12.5l3.2 3.2L17 8.8" pathLength="1" />
  </svg>
);

const ExperienceBadge = ({ active }) => {
  const years = useCountUp(5, active, 2200);
  return (
    <div className={`about-exp ${active ? "is-visible" : ""}`}>
      {/* rotating ring text */}
      <svg className="about-exp-ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="aboutExpCircle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#aboutExpCircle" startOffset="0">
            EXPERIENCE • YEARS • EXPERIENCE • YEARS • EXPERIENCE • YEARS •
          </textPath>
        </text>
      </svg>

      {/* count-up number (stays still in the middle) */}
      <div className="about-exp-center">
        <span className="about-exp-number">{years}</span>
        <span className="about-exp-label">Years</span>
      </div>
    </div>
  );
};

/* =====================================================
   COMPONENT
===================================================== */

const AboutMain = () => {
  const mainRef = useRef(null);
  const [textRef, textIn] = useInView(0.2);
  const [gridRef, gridIn] = useInView(0.25);
  const [promoRef, promoIn] = useInView(0.2);

  useScrollProgress(mainRef);

  // open page at the top + smooth scrolling while on this page
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <div className="about-wrap">
      {/* ===== "ABOUT US" HEADING: half on the breadcrumb banner, half on the white page ===== */}
      <div className="about-title">
        <div className="about-title-card">
          <h1 aria-label="About Us">
            <SplitChars text="About Us" />
          </h1>
          <span className="about-title-line" />
        </div>
      </div>

      {/* ===== MAIN ABOUT ===== */}
      <section ref={mainRef} className="about-main">
        {/* soft drifting background glows + dotted corners (no images) */}
        <span className="about-blob about-blob-a" aria-hidden="true" />
        <span className="about-blob about-blob-b" aria-hidden="true" />
        <span className="about-dots about-dots-left" aria-hidden="true" />
        <span className="about-dots about-dots-right" aria-hidden="true" />

        {/* LEFT: text */}
        <div ref={textRef} className={`about-text ${textIn ? "is-visible" : ""}`}>
          <h2 aria-label="Quality And Fresh">
            <Words text="Quality And Fresh" accentFrom={2} />
          </h2>
          <h3 className="about-brand">UNT – Delivering Deliciousness</h3>

          <p>
            At UNT we bring your favourite food from the best local kitchens straight to your
            door, hot, fresh and on time. From sweet donuts to full meals, every order is
            handled with care by a team that loves what it does. Order, enjoy, anytime.
          </p>

          <ul className="about-list">
            <li style={{ "--d": "0.35s" }}>
              <CheckIcon /> Easy-to-use ordering and tracking
            </li>
            <li style={{ "--d": "0.55s" }}>
              <CheckIcon /> Faster, friendlier service than the rest
            </li>
            <li style={{ "--d": "0.75s" }}>
              <CheckIcon /> Experienced delivery and kitchen staff
            </li>
          </ul>

          <a href="#discover" className="about-btn">
            <span>Discover Now</span>
          </a>
        </div>

        {/* RIGHT: 4 images (2 columns) + rotating badge */}
        <div ref={gridRef} className={`about-gallery ${gridIn ? "is-visible" : ""}`}>
          <div className="about-gal-col about-gal-col-1">
            <div className="about-gal-img about-from-left" style={{ "--d": "0s" }}>
              <img src={img1} alt="Chocolate and nut donuts in a box" loading="lazy" decoding="async" />
            </div>
            <div className="about-gal-img about-from-bottom" style={{ "--d": "0.3s" }}>
              <img src={img3} alt="Child holding a sprinkle donut" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="about-gal-col about-gal-col-2">
            <div className="about-gal-img about-from-top" style={{ "--d": "0.15s" }}>
              <img src={img2} alt="Smiling child eating a donut" loading="lazy" decoding="async" />
            </div>
            <div className="about-gal-img about-from-right" style={{ "--d": "0.45s" }}>
              <img src={img4} alt="Colourful glazed donuts" loading="lazy" decoding="async" />
            </div>
          </div>

          <ExperienceBadge active={gridIn} />
        </div>
      </section>

      {/* ===== PROMO BANNERS (both exactly the same size) ===== */}
      <section ref={promoRef} className={`about-promos ${promoIn ? "is-visible" : ""}`}>
        <a href="#heart" className="about-promo about-promo-left">
          <img
            src={bannerRed}
            alt="Sweet Heart Donut – 30% off your first order"
            loading="lazy"
            decoding="async"
          />
          <span className="about-promo-shine" aria-hidden="true" />
        </a>
        <a href="#orange" className="about-promo about-promo-right">
          <img
            src={bannerOrange}
            alt="Sweet Orange Donut – 30% off your first order"
            loading="lazy"
            decoding="async"
          />
          <span className="about-promo-shine" aria-hidden="true" />
        </a>
      </section>
    </div>
  );
};

export default AboutMain;