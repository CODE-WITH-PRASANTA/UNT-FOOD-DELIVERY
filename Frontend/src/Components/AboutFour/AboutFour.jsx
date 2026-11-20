import React, { useEffect, useRef, useState } from "react";
import "./AboutFour.css";

/* ---------- ASSETS (swap with your chef cut-out images if you have them) ---------- */
import member1 from "../../assets/portrait-of-a-smiling-male-1.png";
import member2 from "../../assets/portrait-of-a-smiling-male-1-1.png";
import member3 from "../../assets/portrait-of-a-smiling-male-1.png";
import member4 from "../../assets/portrait-of-a-smiling-male-1.png";

/* =====================================================
   DATA
===================================================== */
const TEAM = [
  { id: "t1", name: "Arjun Rao", role: "Head Chef", img: member1, k: -20 },
  { id: "t2", name: "Priya Nair", role: "Pastry Chef", img: member2, k: 10 },
  { id: "t3", name: "Rohan Das", role: "Senior Chef", img: member3, k: -10 },
  { id: "t4", name: "Meera Patel", role: "Sous Chef", img: member4, k: 20 },
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
      <span className="about-four-word-mask">
        <span className="about-four-word" style={{ "--i": i }}>
          {w}
        </span>
      </span>{" "}
    </React.Fragment>
  ));

const iconProps = {
  viewBox: "0 0 24 24",
  width: 18,
  height: 18,
  fill: "currentColor",
  "aria-hidden": "true",
};

const SOCIALS = [
  {
    label: "Facebook",
    icon: (
      <svg {...iconProps}>
        <path d="M14 8h2.5V5H14c-2.2 0-3.5 1.4-3.5 3.6V11H8v3h2.5v7h3v-7H16l.5-3h-3V9c0-.6.4-1 1-1z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg {...iconProps}>
        <path d="M6.5 9h-3v11h3zM5 4a1.8 1.8 0 100 3.6A1.8 1.8 0 005 4zM20.5 20v-6c0-3-1.6-4.5-3.8-4.5-1.7 0-2.5 1-2.9 1.7V9h-3v11h3v-6c0-1.5.8-2.5 2-2.5s1.7.9 1.7 2.5v6z" />
      </svg>
    ),
  },
];

/* =====================================================
   COMPONENT
===================================================== */

const AboutFour = () => {
  const sectionRef = useRef(null);
  const [inRef, inView] = useInView(0.15);

  useScrollProgress(sectionRef);

  return (
    <section ref={sectionRef} className="about-four">
      <span className="about-four-blob blob-a" aria-hidden="true" />
      <span className="about-four-blob blob-b" aria-hidden="true" />

      <div ref={inRef} className={`about-four-inner ${inView ? "is-visible" : ""}`}>
        {/* ===== TITLE ===== */}
        <header className="about-four-head">
          <span className="about-four-eyebrow">Team Member</span>
          <h2 aria-label="Our Best Team">
            <Words text="Our Best Team" />
          </h2>
          <span className="about-four-head-line" />
        </header>

        {/* ===== TEAM CARDS ===== */}
        <div className="about-four-grid">
          {TEAM.map(({ id, name, role, img, k }, i) => (
            <article key={id} className="about-four-card" style={{ "--i": i, "--k": k }}>
              <div className="about-four-media">
                <span className="about-four-circle" aria-hidden="true" />
                <img src={img} alt={`${name}, ${role}`} />

                <ul className="about-four-social">
                  {SOCIALS.map(({ label, icon }, s) => (
                    <li key={label} style={{ "--s": s }}>
                      <a href="#team" aria-label={`${name} on ${label}`}>
                        {icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="about-four-info">
                <h3>{name}</h3>
                <span>{role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFour;