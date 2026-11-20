import React, { useEffect, useRef, useState } from "react";
import "./ContactMain.css";

/* ---------- ASSETS (swap any file name here if an image doesn't match) ---------- */
import girl from "../../assets/cont.png"; // girl holding donuts (right side)
import sideDonut from "../../assets/side-donut-1.png"; // decorative donut on the left edge


/* =====================================================
   DATA  (replace with your real UNT details)
===================================================== */
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 7l8.5 6.5L20.5 7" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 5.1 5.1l1.4-2.3L19 14.5V18a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.2 2" />
  </svg>
);

const INFO = [
  { id: "mail", title: "Email Address", text: "info@untfooddelivery.com", href: "mailto:info@untfooddelivery.com", Icon: MailIcon },
  { id: "phone", title: "Contact", text: "+91 98765 43210", href: "tel:+919876543210", Icon: PhoneIcon },
  { id: "place", title: "Location", text: "UNT Food Delivery, Bhubaneswar, Odisha", href: "#map", Icon: PinIcon },
  { id: "time", title: "Timing", text: "Mon – Sun: 8 AM – 11 PM", href: null, Icon: ClockIcon },
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

// letter-by-letter title
const SplitChars = ({ text }) =>
  text.split("").map((c, i) => (
    <span className="ch" style={{ "--i": i }} key={i} aria-hidden="true">
      {c === " " ? "\u00A0" : c}
    </span>
  ));

// word-by-word rise inside a mask
const Words = ({ text }) =>
  text.split(" ").map((w, i) => (
    <React.Fragment key={i}>
      <span className="contact-word-mask">
        <span className="contact-word" style={{ "--i": i }}>
          {w}
        </span>
      </span>{" "}
    </React.Fragment>
  ));

/* =====================================================
   COMPONENT
===================================================== */

const EMPTY = { name: "", email: "", message: "" };

const ContactMain = () => {
  const mainRef = useRef(null);
  const [infoRef, infoIn] = useInView(0.2);
  const [formRef, formIn] = useInView(0.15);

  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

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

  /* ----- form logic ----- */
  const validate = (v) => {
    const e = {};
    if (v.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
    if (v.message.trim().length < 10) e.message = "Please write at least 10 characters.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    // TODO: replace this timeout with your real API call (fetch / axios)
    setTimeout(() => {
      setStatus("sent");
      setValues(EMPTY);
      setTimeout(() => setStatus("idle"), 4500);
    }, 1400);
  };

  return (
    <div className="contact-wrap">
      {/* ===== "CONTACT US" HEADING: half on the breadcrumb banner, half on the page ===== */}
      <div className="contact-title">
        <div className="contact-title-card">
          <h1 aria-label="Contact Us">
            <SplitChars text="Contact Us" />
          </h1>
          <span className="contact-title-line" />
        </div>
      </div>

      <section ref={mainRef} className="contact-main">
        <span className="contact-blob blob-a" aria-hidden="true" />
        <span className="contact-blob blob-b" aria-hidden="true" />
        <img src={sideDonut} alt="" className="contact-donut" aria-hidden="true" />

        {/* ===== 4 INFO CARDS ===== */}
        <div ref={infoRef} className={`contact-info ${infoIn ? "is-visible" : ""}`}>
          {INFO.map(({ id, title, text, href, Icon }, i) => {
            const Tag = href ? "a" : "div";
            return (
              <Tag key={id} className="contact-info-card" href={href || undefined} style={{ "--i": i }}>
                <span className="contact-info-icon">
                  <Icon />
                </span>
                <span className="contact-info-text">
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </Tag>
            );
          })}
        </div>

        {/* ===== FORM + IMAGE ===== */}
        <div ref={formRef} className={`contact-body ${formIn ? "is-visible" : ""}`}>
          {/* ----- form card ----- */}
          <div className="contact-form-card">
            <h2 aria-label="Get In Touch">
              <Words text="Get In Touch" />
            </h2>
            <p className="contact-form-lead">
              Feel free to reach out if you need any information or assistance about your UNT food
              delivery. We’re here to help and answer any questions you may have!
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className={`contact-field ${errors.name ? "has-error" : ""}`} style={{ "--f": 0 }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Type Your Full Name Here"
                  value={values.name}
                  onChange={handleChange}
                  aria-label="Full name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <small>{errors.name}</small>}
              </div>

              <div className={`contact-field ${errors.email ? "has-error" : ""}`} style={{ "--f": 1 }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Type Your Email Here"
                  value={values.email}
                  onChange={handleChange}
                  aria-label="Email"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <small>{errors.email}</small>}
              </div>

              <div className={`contact-field ${errors.message ? "has-error" : ""}`} style={{ "--f": 2 }}>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Type Your Comment Here..."
                  value={values.message}
                  onChange={handleChange}
                  aria-label="Comment"
                  aria-invalid={!!errors.message}
                />
                {errors.message && <small>{errors.message}</small>}
              </div>

              <div className="contact-actions" style={{ "--f": 3 }}>
                <p className={`contact-success ${status === "sent" ? "is-shown" : ""}`} role="status">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <circle cx="12" cy="12" r="10.5" />
                    <path d="M7 12.5l3.2 3.2L17 8.8" />
                  </svg>
                  Thank you! We’ll get back to you soon.
                </p>

                <button
                  type="submit"
                  className={`contact-btn ${status === "sending" ? "is-sending" : ""}`}
                  disabled={status === "sending"}
                >
                  <span>{status === "sending" ? "Sending..." : "Submit Now"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* ----- girl image ----- */}
          <div className="contact-visual">
            <div className="contact-visual-inner">
              <img src={girl} alt="Smiling girl holding donuts" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactMain;