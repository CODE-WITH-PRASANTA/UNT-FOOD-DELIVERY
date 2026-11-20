
import React, { useEffect, useRef, useState } from "react";
import "./TermandconditionMain.css";

const termsSections = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>
          Welcome to UNT. These Terms and Conditions govern your access to and
          use of our website, services, and online food ordering platform.
        </p>
        <p>
          By accessing our website, creating an account, placing an order, or
          using any of our services, you agree to comply with these Terms and
          Conditions.
        </p>
        <p>
          If you do not agree with any part of these terms, please do not use
          our platform.
        </p>
      </>
    ),
  },
  {
    id: "definitions",
    title: "Definitions",
    content: (
      <ul>
        <li><strong>"Platform"</strong> refers to the UNT website and associated online services.</li>
        <li><strong>"User", "Customer", "You"</strong> or <strong>"Your"</strong> refers to any person accessing or using our platform.</li>
        <li><strong>"We", "Us"</strong> or <strong>"Our"</strong> refers to the business operating the UNT platform.</li>
        <li><strong>"Restaurant Partner"</strong> refers to restaurants, food outlets, or vendors listed on our platform.</li>
        <li><strong>"Order"</strong> refers to a food purchase request submitted through our platform.</li>
      </ul>
    ),
  },
  {
    id: "eligibility",
    title: "User Eligibility & Account Registration",
    content: (
      <ul>
        <li>You must provide accurate, complete, and up-to-date information when registering or placing an order.</li>
        <li>You are responsible for maintaining the confidentiality of your account credentials and for activities conducted through your account.</li>
        <li>You must notify us promptly if you suspect unauthorized access to your account.</li>
        <li>We reserve the right to restrict or suspend accounts involved in fraudulent, abusive, or unlawful activities.</li>
      </ul>
    ),
  },
  {
    id: "services",
    title: "Our Services",
    content: (
      <>
        <p>UNT provides access to online food ordering and related services, which may include:</p>
        <ul>
          <li>Online food ordering from listed restaurant partners.</li>
          <li>Food delivery and pickup options, where available.</li>
          <li>Restaurant discovery and menu browsing.</li>
          <li>Promotional offers and customer support services.</li>
        </ul>
        <p>Available services may vary depending on your location and participating partners.</p>
      </>
    ),
  },
  {
    id: "orders",
    title: "Orders & Order Confirmation",
    content: (
      <ul>
        <li>All orders placed through UNT are subject to acceptance and availability.</li>
        <li>After placing an order, you may receive an order confirmation through the contact details provided.</li>
        <li>Please review your order details carefully before confirming your purchase.</li>
        <li>UNT reserves the right to reject or cancel an order if an item is unavailable or an order cannot be fulfilled.</li>
      </ul>
    ),
  },
  {
    id: "pricing",
    title: "Pricing & Payments",
    content: (
      <ul>
        <li>All prices displayed on the platform are subject to change without prior notice.</li>
        <li>Applicable taxes, delivery fees, and other charges may be added at checkout.</li>
        <li>Payments must be completed using the payment methods made available on the platform.</li>
        <li>UNT does not store sensitive payment information unless expressly supported through a secure payment provider.</li>
        <li>Any payment dispute should be reported to our customer support team.</li>
      </ul>
    ),
  },
  {
    id: "delivery",
    title: "Delivery & Pickup Policy",
    content: (
      <ul>
        <li>Estimated delivery times are indicative and may vary depending on location, traffic, weather, and restaurant preparation time.</li>
        <li>Customers should provide accurate delivery addresses and contact details.</li>
        <li>Customers must be available to receive their orders at the specified address.</li>
        <li>Pickup orders should be collected from the designated restaurant location.</li>
        <li>UNT is not responsible for delays caused by circumstances beyond reasonable control.</li>
      </ul>
    ),
  },
  {
    id: "cancellation",
    title: "Order Cancellation",
    content: (
      <ul>
        <li>Cancellation requests are subject to the order's preparation and delivery status.</li>
        <li>Once a restaurant has started preparing an order, cancellation may not be possible.</li>
        <li>UNT reserves the right to cancel orders due to availability, technical errors, or suspected fraudulent activity.</li>
        <li>Any eligible refund will be processed according to the applicable refund policy.</li>
      </ul>
    ),
  },
  {
    id: "refund",
    title: "Refund & Replacement Policy",
    content: (
      <ul>
        <li>Refund requests must be submitted through the available customer support channels.</li>
        <li>Refund eligibility may depend on the nature of the issue and the order status.</li>
        <li>Incorrect, missing, or damaged items should be reported promptly with relevant order details.</li>
        <li>Approved refunds will be processed through the applicable payment method or refund mechanism.</li>
        <li>Processing times may vary depending on the payment provider or financial institution.</li>
      </ul>
    ),
  },
  {
    id: "partners",
    title: "Restaurant Partners",
    content: (
      <ul>
        <li>Restaurant partners are responsible for food preparation, quality, hygiene, and menu accuracy.</li>
        <li>Menu items, prices, and availability are managed by participating restaurant partners.</li>
        <li>UNT may update, suspend, or remove restaurant listings when necessary.</li>
        <li>Customers should communicate food allergies and special dietary requirements directly where supported.</li>
      </ul>
    ),
  },
  {
    id: "privacy",
    title: "Privacy & Data Protection",
    content: (
      <ul>
        <li>We collect and use information necessary to operate and improve our services.</li>
        <li>Your personal information is handled in accordance with our Privacy Policy.</li>
        <li>We take reasonable measures to protect information against unauthorized access and misuse.</li>
        <li>You may contact our support team regarding privacy-related questions or requests.</li>
      </ul>
    ),
  },
  {
    id: "responsibilities",
    title: "User Responsibilities",
    content: (
      <ul>
        <li>Users must use the platform only for lawful purposes.</li>
        <li>Users must not attempt to disrupt, damage, or gain unauthorized access to our systems.</li>
        <li>Users must not submit false information, fraudulent orders, or misleading claims.</li>
        <li>Users are responsible for ensuring their use of the platform complies with applicable laws.</li>
      </ul>
    ),
  },
  {
    id: "intellectual",
    title: "Intellectual Property",
    content: (
      <p>
        All website content, branding, logos, designs, graphics, and other
        materials associated with UNT are protected by applicable intellectual
        property laws. No material may be reproduced, distributed, or used
        without prior authorization.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: (
      <p>
        To the extent permitted by applicable law, UNT shall not be liable for
        indirect or consequential losses arising from the use of the platform,
        service interruptions, third-party actions, or circumstances beyond
        our reasonable control.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    content: (
      <p>
        We may update these Terms and Conditions from time to time. Any updated
        version will be published on this page with its revised effective date.
        Continued use of the platform after changes are published constitutes
        acceptance of the updated terms, where applicable.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Information",
    content: (
      <p>
        If you have questions, concerns, or requests relating to these Terms
        and Conditions, please contact the UNT support team through the
        customer support channels provided on our platform.
      </p>
    ),
  },
];

const TermandconditionMain = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [showAll, setShowAll] = useState(false);
  const sectionRefs = useRef({});
  const clickLock = useRef(false);
  const lockTimer = useRef(null);

  const visibleSections = showAll
    ? termsSections
    : termsSections.slice(0, 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLock.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -68% 0px",
        threshold: 0,
      }
    );

    termsSections.forEach((section) => {
      const element = sectionRefs.current[section.id];
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      clearTimeout(lockTimer.current);
    };
  }, []);

  const handleNavigation = (id) => {
    const element = sectionRefs.current[id];

    if (!element) return;

    clickLock.current = true;
    setActiveSection(id);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    clearTimeout(lockTimer.current);

    lockTimer.current = setTimeout(() => {
      clickLock.current = false;
      setActiveSection(id);
    }, 1000);
  };

  const handleSectionHover = (id) => {
    if (!clickLock.current) {
      setActiveSection(id);
    }
  };

  return (
    <div className="tc-page">

      {/* 40px space below navbar */}
      <div className="tc-top-space"></div>

      <div className="tc-layout">

        {/* LEFT QUICK NAVIGATION */}
        <aside className="tc-sidebar">
          <div className="tc-sidebar-inner">

            <div className="tc-sidebar-heading">
              <span className="tc-eyebrow">QUICK NAVIGATION</span>
              <h2>On This Page</h2>
              <span className="tc-heading-line"></span>
            </div>

            <nav className="tc-navigation">
              {visibleSections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  className={`tc-nav-item ${
                    activeSection === section.id ? "active" : ""
                  }`}
                  onClick={() => handleNavigation(section.id)}
                  onMouseEnter={() => handleSectionHover(section.id)}
                  aria-current={
                    activeSection === section.id ? "location" : undefined
                  }
                >
                  <span className="tc-nav-number">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span className="tc-nav-label">{section.title}</span>
                  <span className="tc-nav-arrow">›</span>
                </button>
              ))}
            </nav>

            <button
              type="button"
              className="tc-view-all"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "View All Sections"}
              <span className={showAll ? "tc-chevron rotated" : "tc-chevron"}>
                ⌄
              </span>
            </button>

          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="tc-main">

          {/* WELCOME HEADER */}
          <div className="tc-welcome-card">
            <div className="tc-welcome-icon">
              <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path
                  d="M17 6h23l13 13v32a6 6 0 0 1-6 6H17a6 6 0 0 1-6-6V12a6 6 0 0 1 6-6Z"
                  fill="currentColor"
                />
                <path d="M40 6v13h13" fill="#fff" opacity=".5" />
                <path d="M21 26h17M21 34h17M21 42h11"
                  stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <path
                  d="m43 35 5 5 9-11"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M44 43v9l4-2 4 2v-9"
                  fill="#fff"
                  opacity=".85"
                />
              </svg>
            </div>

            <div className="tc-welcome-divider"></div>

            <div className="tc-welcome-content">
              <span className="tc-eyebrow">PLEASE READ CAREFULLY</span>
              <h1>Welcome to UNT!</h1>
              <p>
                These terms explain how you can use our platform, place
                orders, make payments, and enjoy our food delivery services.
              </p>
            </div>

            <div className="tc-welcome-decoration"></div>
          </div>

          {/* TERMS CONTENT */}
          <div className="tc-content-card">
            <div className="tc-content-topline">
              <span></span>
              <p>TERMS OF SERVICE</p>
            </div>

            <div className="tc-sections">
              {termsSections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(element) => {
                    sectionRefs.current[section.id] = element;
                  }}
                  className={`tc-section ${
                    activeSection === section.id ? "tc-section-active" : ""
                  }`}
                  onMouseEnter={() => handleSectionHover(section.id)}
                >
                  <div className="tc-section-heading">
                    <span className="tc-section-marker"></span>
                    <span className="tc-section-index">
                      {index + 1}.
                    </span>
                    <h2>{section.title}</h2>
                  </div>

                  <div className="tc-section-body">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            {/* SUPPORT FOOTER */}
            <div className="tc-support-card">
              <div className="tc-support-avatar">
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <circle cx="24" cy="24" r="22" fill="#F58220" />
                  <circle cx="24" cy="24" r="17" fill="#fff" />
                  <path
                    d="M14 24a10 10 0 0 1 20 0v6h-5v-7h5M14 23h5v8h-5v-7"
                    stroke="#10294F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="24" cy="19" r="5" fill="#10294F" />
                  <path
                    d="M15 35c1-5 5-8 9-8s8 3 9 8"
                    fill="#10294F"
                  />
                </svg>
              </div>

              <div className="tc-support-divider"></div>

              <div className="tc-support-text">
                <h3>Need Any Assistance?</h3>
                <p>
                  Have questions about our terms or services? Our support
                  team is here to help.
                </p>
              </div>

              <div className="tc-support-decoration">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <a href="/contact" className="tc-contact-button">
                Contact Us
                <span>→</span>
              </a>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default TermandconditionMain;
