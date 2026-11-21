
import React, { useEffect, useState } from "react";
import {
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaChevronDown,
  FaArrowRight,
  FaHeadset,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./PrivicypolicyMain.css";

const privacySections = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <p>
        At UNT, we respect your privacy and are committed to protecting your
        personal information. This Privacy Policy explains how we collect,
        use, store, and disclose information when you use our website, place
        an order, or interact with our services.
      </p>
    ),
  },
  {
    id: "information",
    title: "Information We Collect",
    content: (
      <>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, delivery address, and payment details.
          </li>
          <li>
            <strong>Usage Information:</strong> Pages visited, orders placed,
            and your preferences.
          </li>
          <li>
            <strong>Device Information:</strong> IP address, browser type,
            operating system, and device details.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>Process and deliver your food orders.</li>
          <li>Improve our services and personalize your experience.</li>
          <li>
            Send promotional offers, updates, and relevant information if you
            have opted in.
          </li>
          <li>Prevent fraud and ensure a safe and secure platform.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How We Share Your Information",
    content: (
      <>
        <p>
          We do not sell your personal information. We may share relevant
          information with trusted partners when necessary to provide our
          services.
        </p>
        <ul>
          <li>
            <strong>Delivery Partners:</strong> To complete and deliver your
            orders.
          </li>
          <li>
            <strong>Payment Providers:</strong> To securely process payments.
          </li>
          <li>
            <strong>Service Providers:</strong> To maintain and improve our
            website and services.
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required by applicable
            law.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "rights",
    title: "Your Rights",
    content: (
      <>
        <p>
          You have certain rights regarding your personal information,
          subject to applicable laws.
        </p>
        <ul>
          <li>Request access to your personal information.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of eligible personal information.</li>
          <li>Withdraw consent for promotional communications.</li>
          <li>Ask questions about how your information is processed.</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "Data Security",
    content: (
      <>
        <p>
          Protecting your information is important to us. We use appropriate
          technical and organizational safeguards designed to protect personal
          information against unauthorized access, alteration, disclosure,
          or destruction.
        </p>
        <p>
          However, no online platform or electronic transmission can be
          guaranteed to be completely secure.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    content: (
      <>
        <p>
          Our website may use cookies and similar technologies to improve
          website performance and understand how visitors interact with our
          platform.
        </p>
        <ul>
          <li>Remember your preferences.</li>
          <li>Improve website functionality.</li>
          <li>Understand website traffic and performance.</li>
          <li>Provide a more personalized browsing experience.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    content: (
      <p>
        Our website may contain links to third-party websites or services.
        These websites have their own privacy policies and practices. UNT is
        not responsible for the privacy practices or content of external
        websites.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our services, business practices, or applicable legal requirements.
        Any updated version will be published on this page with its revised
        effective date.
      </p>
    ),
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or how your personal information is handled, please
          contact our support team.
        </p>
        <p>
          Our team will be happy to assist you with your privacy-related
          questions.
        </p>
      </>
    ),
  },
];

const PrivicypolicyMain = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [showAllSections, setShowAllSections] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      }
    );

    privacySections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navigateToSection = (id) => {
    setActiveSection(id);
    setMobileNavOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="privacy-main">

      {/* TOP INTRODUCTION SPACE */}
      <div className="privacy-top-space" />

      <div className="privacy-layout">

        {/* MOBILE NAVIGATION BUTTON */}
        <button
          className="privacy-mobile-toggle"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <span>
            <FaBars />
            Quick Navigation
          </span>

          {mobileNavOpen ? <FaTimes /> : <FaChevronDown />}
        </button>

        {/* LEFT QUICK NAVIGATION */}
        <aside
          className={`privacy-sidebar ${
            mobileNavOpen ? "privacy-sidebar-open" : ""
          }`}
        >
          <div className="privacy-sidebar-heading">
            <span className="privacy-eyebrow">
              QUICK NAVIGATION
            </span>

            <h2>On This Page</h2>
          </div>

          <div className="privacy-navigation-list">
            {privacySections
              .slice(0, showAllSections ? privacySections.length : 10)
              .map((section, index) => (
                <button
                  key={section.id}
                  className={`privacy-nav-item ${
                    activeSection === section.id ? "active" : ""
                  }`}
                  onClick={() => navigateToSection(section.id)}
                >
                  <span className="privacy-nav-number">
                    {index + 1}.
                  </span>

                  <span className="privacy-nav-label">
                    {section.title}
                  </span>
                </button>
              ))}
          </div>

          <button
            className="privacy-view-all"
            onClick={() => setShowAllSections(!showAllSections)}
          >
            {showAllSections ? "Show Less" : "View All Sections"}

            <FaChevronDown
              className={showAllSections ? "privacy-chevron-up" : ""}
            />
          </button>
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <main className="privacy-content">

          {/* PRIVACY HERO HEADER */}
          <div className="privacy-hero">
            <div className="privacy-hero-icon">
              <FaShieldAlt />
              <FaLock className="privacy-lock-icon" />
            </div>

            <div className="privacy-hero-divider" />

            <div className="privacy-hero-text">
              <span className="privacy-eyebrow">
                WELCOME TO UNT
              </span>

              <h1>Our Commitment to Your Privacy</h1>

              <p>
                Your personal information is important to us. This Privacy
                Policy explains how we collect, use, and protect it.
              </p>
            </div>
          </div>

          {/* PRIVACY SECTIONS */}
          <div className="privacy-sections-card">

            {privacySections.map((section, index) => (
              <article
                className={`privacy-section ${
                  activeSection === section.id
                    ? "privacy-section-active"
                    : ""
                }`}
                id={section.id}
                key={section.id}
              >
                <div className="privacy-section-heading">
                  <span className="privacy-section-marker" />

                  <h2>
                    {index + 1}. {section.title}
                  </h2>
                </div>

                <div className="privacy-section-content">
                  {section.content}
                </div>
              </article>
            ))}

            {/* BOTTOM CONTACT BANNER */}
            <div className="privacy-contact-banner">
              <div className="privacy-contact-icon">
                <FaHeadset />
              </div>

              <div className="privacy-contact-divider" />

              <div className="privacy-contact-text">
                <h3>Have Questions?</h3>

                <p>
                  If you have any questions about our Privacy Policy,
                  feel free to contact our support team.
                </p>
              </div>

              <button
                className="privacy-contact-button"
                onClick={() => navigateToSection("contact-us")}
              >
                Contact Us
                <FaArrowRight />
              </button>
            </div>

          </div>
        </main>
      </div>
    </section>
  );
};

export default PrivicypolicyMain;
