import React, { useEffect, useRef, useState } from "react";
import "./AboutOne.css";

/* ---------- ASSETS (swap any file name here if an image doesn't match) ---------- */
import girl from "../../assets/cont.png"; // girl holding donuts + red splash
import sideDonut1 from "../../assets/side-donut-1.png"; // left edge donut
import sideDonut2 from "../../assets/side-donut-2.png"; // bottom-right donut

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
   ICONS (inline SVG – no extra files needed)
===================================================== */

const svgProps = {
  viewBox: "0 0 64 64",
  width: 38,
  height: 38,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const TruckIcon = () => (
  <svg {...svgProps}>
    <path d="M6 40V16a3 3 0 0 1 3-3h28a3 3 0 0 1 3 3v24" />
    <path d="M40 24h10l8 10v6h-18" />
    <path d="M6 40h6M26 40h14" />
    <circle cx="19" cy="44" r="5.5" />
    <circle cx="48" cy="44" r="5.5" />
    <path d="M2 22h10M5 29h7" />
  </svg>
);

const DiscountIcon = () => (
  <svg {...svgProps}>
    <path d="M32 5l6 4.5 7.5-.8 3 6.9 6.9 3-.8 7.5L59 32l-4.5 6 .8 7.5-6.9 3-3 6.9-7.5-.8L32 59l-6-4.5-7.5.8-3-6.9-6.9-3 .8-7.5L5 32l4.5-6-.8-7.5 6.9-3 3-6.9 7.5.8z" />
    <path d="M24 40l16-16" />
    <circle cx="25" cy="26" r="2.6" />
    <circle cx="39" cy="38" r="2.6" />
  </svg>
);

const ClocheIcon = () => (
  <svg {...svgProps}>
    <path d="M32 9v4" />
    <circle cx="32" cy="8" r="2" />
    <path d="M10 38a22 22 0 0 1 44 0" />
    <path d="M6 41h52" />
    <path d="M4 52l10-4h14l9 3H21" />
    <path d="M37 51l14-6c2-1 4 1 2.5 3L42 57H18" />
  </svg>
);

/* =====================================================
   DATA
===================================================== */

const SERVICES = [
  {
    id: "delivery",
    title: "Free Delivery",
    text: "Zero delivery charges on your orders. Hot, fresh and right at your door.",
    Icon: TruckIcon,
    cls: "card-delivery",
    delay: "0.15s",
  },
  {
    id: "fast",
    title: "Fast Service",
    text: "Riders and kitchens work in sync so your food arrives quick and stays fresh.",
    Icon: DiscountIcon,
    cls: "card-fast",
    delay: "0.3s",
  },
  {
    id: "discount",
    title: "Regular Discount",
    text: "Regular offers, coupons and member deals, because good taste should never cost too much.",
    Icon: ClocheIcon,
    cls: "card-discount",
    delay: "0.45s",
  },
];

// word-by-word rise inside a mask
const Words = ({ text, accent }) =>
  text.split(" ").map((w, i) => (
    <React.Fragment key={i}>
      <span className="about-one-word-mask">
        <span
          className={`about-one-word ${w === accent ? "is-accent" : ""}`}
          style={{ "--i": i }}
        >
          {w}
        </span>
      </span>{" "}
    </React.Fragment>
  ));

/* =====================================================
   COMPONENT
===================================================== */

const AboutOne = () => {
  const sectionRef = useRef(null);
  const [inRef, inView] = useInView(0.2);

  useScrollProgress(sectionRef);

  // spotlight that follows the mouse inside each card
  const handleMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={sectionRef} className="about-one">
      <span className="about-one-blob blob-1" aria-hidden="true" />
      <span className="about-one-blob blob-2" aria-hidden="true" />
      <img src={sideDonut1} alt="" className="about-one-donut-left" aria-hidden="true" />
      <img src={sideDonut2} alt="" className="about-one-donut-right" aria-hidden="true" />

      {/* container: 50% (4 grids)  |  50% (girl image) */}
      <div ref={inRef} className={`about-one-container ${inView ? "is-visible" : ""}`}>
        {/* ===== LEFT 50% : 2 x 2 grid ===== */}
        <div className="about-one-left">
          {/* grid 1 – heading */}
          <div className="about-one-title">
            <h2 aria-label="Service shows good taste.">
              <Words text="Service shows good taste." accent="taste." />
            </h2>
            <span className="about-one-title-line" />
          </div>

          {/* grids 2, 3, 4 – cards */}
          {SERVICES.map(({ id, title, text, Icon, cls, delay }) => (
            <article
              key={id}
              className={`about-one-card ${cls}`}
              style={{ "--d": delay }}
              onMouseMove={handleMove}
            >
              <div className="about-one-icon">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        {/* ===== RIGHT 50% : girl image ===== */}
        <div className="about-one-visual">
          <div className="about-one-visual-inner">
            <img src={girl} alt="Smiling girl holding two donuts" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOne;