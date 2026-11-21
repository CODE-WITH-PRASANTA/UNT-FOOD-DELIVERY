import React, { useEffect, useRef, useState } from "react";
import "./AboutThree.css";

/* ---------- ASSETS (swap any file name here if an image doesn't match) ---------- */
import flavor1 from "../../assets/Rectangle-30905-2.png"; // cinnamon sugar donut
import flavor2 from "../../assets/Rectangle-30904-1.png"; // caramel cocoa donut
import flavor3 from "../../assets/Rectangle-30903-1.png"; // honey glazed donut

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
const useInView = (threshold = 0.15) => {
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

// writes CSS variable --py (-1 … 1) while scrolling → parallax in CSS
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

// title: every word slides up, words from `accentFrom` get the orange gradient
const Words = ({ text, accentFrom = Infinity }) =>
  text.split(" ").map((w, i) => (
    <React.Fragment key={i}>
      <span className="about-three-word-mask">
        <span
          className={`about-three-word ${i >= accentFrom ? "about-three-word-accent" : ""}`}
          style={{ "--i": i }}
        >
          {w}
        </span>
      </span>{" "}
    </React.Fragment>
  ));

// splits  “quote” rest of the text  →  { quote, rest }
const splitQuote = (text) => {
  const match = text.match(/^(“[^”]+”)\s*(.*)$/);
  return match ? { quote: match[1], rest: match[2] } : { quote: "", rest: text };
};

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
    <section ref={sectionRef} className="about-three" aria-labelledby="about-three-title">
      {/* decorative background (no images) */}
      <span className="about-three-blob about-three-blob-a" aria-hidden="true" />
      <span className="about-three-blob about-three-blob-b" aria-hidden="true" />
      <span className="about-three-dots about-three-dots-top" aria-hidden="true" />
      <span className="about-three-dots about-three-dots-bottom" aria-hidden="true" />

      <div ref={inRef} className={`about-three-inner ${inView ? "is-visible" : ""}`}>
        {/* ===== TITLE ===== */}
        <header className="about-three-head">
          <span className="about-three-eyebrow">New Flavor</span>
          <h2 id="about-three-title" aria-label="Explore The New Taste">
            <Words text="Explore The New Taste" accentFrom={2} />
          </h2>
          <span className="about-three-head-line" />
        </header>

        {/* ===== CARDS ===== */}
        <div className="about-three-grid">
          {FLAVORS.map(({ id, year, title, text, img, k }, i) => {
            const { quote, rest } = splitQuote(text);

            return (
              <article
                key={id}
                className="about-three-card"
                style={{ "--i": i, "--k": k }}
                onMouseMove={handleMove}
              >
                <div className="about-three-media">
                  <img src={img} alt={title} loading="lazy" decoding="async" />
                  <span className="about-three-badge">{year}</span>
                </div>

                <div className="about-three-body">
                  <span className="about-three-num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3>{title}</h3>
                  <p>
                    {quote && <span className="about-three-quote">{quote}</span>}
                    {rest}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutThree;