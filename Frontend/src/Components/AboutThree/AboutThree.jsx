import React, { useEffect, useRef, useState } from "react";
import "./AboutThree.css";

/* ---------- ASSETS (swap any file name here if an image doesn't match) ---------- */
import flavor1 from "../../assets/Rectangle-30905-2.png"; // cinnamon sugar donut
import flavor2 from "../../assets/Rectangle-30904-1.png"; // caramel cocoa donut
import flavor3 from "../../assets/Rectangle-30903-1.png"; // honey glazed donut
import sideDonut from "../../assets/side-donut-2.png"; // decorative donut

/* =====================================================
   DATA
===================================================== */
const FLAVORS = [
  {
    id: "f1",
    year: "2026",
    title: "Cinnamon Sugar Twist",
    text: "“Crunchy sugar, soft centre” Freshly fried, rolled in warm cinnamon sugar and served at its fluffiest best…",
    img: flavor1,
    k: -22, // parallax strength (px) – left
  },
  {
    id: "f2",
    year: "2026",
    title: "Caramel Dream Ring",
    text: "“Warm caramel love in every layer” Warm, gooey caramel flows from the heart of this cocoa-dusted treat…",
    img: flavor2,
    k: 0, // middle
  },
  {
    id: "f3",
    year: "2026",
    title: "Honey Glaze Classic",
    text: "“Golden, glossy and pure” A light, pillowy ring with a silky honey glaze that melts the moment you bite…",
    img: flavor3,
    k: 22, // right
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
      <span className="about-three-word-mask">
        <span className="about-three-word" style={{ "--i": i }}>
          {w}
        </span>
      </span>{" "}
    </React.Fragment>
  ));

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* =====================================================
   COMPONENT
===================================================== */

const AboutThree = () => {
  const sectionRef = useRef(null);
  const [inRef, inView] = useInView(0.15);

  useScrollProgress(sectionRef);

  // spotlight that follows the mouse inside each card
  const handleMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={sectionRef} className="about-three">
      <span className="about-three-blob blob-a" aria-hidden="true" />
      <span className="about-three-blob blob-b" aria-hidden="true" />
      <img src={sideDonut} alt="" className="about-three-donut" aria-hidden="true" />

      <div ref={inRef} className={`about-three-inner ${inView ? "is-visible" : ""}`}>
        {/* ===== TITLE ===== */}
        <header className="about-three-head">
          <span className="about-three-eyebrow">New Flavor</span>
          <h2 aria-label="Explore The New Taste">
            <Words text="Explore The New Taste" />
          </h2>
          <span className="about-three-head-line" />
        </header>

        {/* ===== CARDS ===== */}
        <div className="about-three-grid">
          {FLAVORS.map(({ id, year, title, text, img, k }, i) => (
            <article
              key={id}
              className="about-three-card"
              style={{ "--i": i, "--k": k }}
              onMouseMove={handleMove}
            >
              <div className="about-three-media">
                <img src={img} alt={title} />

                <span className="about-three-badge">{year}</span>

                
              </div>

              <div className="about-three-body">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutThree;