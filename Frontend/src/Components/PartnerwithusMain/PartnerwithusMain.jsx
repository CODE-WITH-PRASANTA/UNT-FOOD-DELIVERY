
import React, { useState, useEffect, useRef } from "react";
import "./PartnerwithusMain.css";

const services = ["Food Delivery", "Dineout", "Toing"];

const serviceContent = {
  "Food Delivery": {
    description:
      "Bring your restaurant online, reach more hungry customers, and grow your business with UNT Food Delivery.",
    formTitle: "Partner with UNT",
    formDescription:
      "Enter your registered mobile number or restaurant ID to begin your restaurant partnership journey.",
    benefits: [
      "Reach more customers",
      "Grow your online orders",
      "Manage your restaurant presence",
      "Build your business with UNT",
    ],
  },
  Dineout: {
    description:
      "Help more customers discover your restaurant and explore your dining experience through UNT.",
    formTitle: "Join UNT Dineout",
    formDescription:
      "Enter your registered mobile number or restaurant ID to start your Dineout partnership enquiry.",
    benefits: [
      "Improve restaurant visibility",
      "Connect with local diners",
      "Showcase your dining experience",
      "Build customer relationships",
    ],
  },
  Toing: {
    description:
      "Connect with UNT and explore the opportunities available through our Toing partner programme.",
    formTitle: "Get Started with Toing",
    formDescription:
      "Enter your registered mobile number or restaurant ID to begin your partnership enquiry.",
    benefits: [
      "Connect with UNT",
      "Explore partner opportunities",
      "Get onboarding assistance",
      "Build your business presence",
    ],
  },
};

const onboardingSteps = [
  {
    number: "01",
    title: "Register Your Restaurant",
    description:
      "Share your mobile number and basic restaurant information to begin.",
  },
  {
    number: "02",
    title: "Submit Business Details",
    description:
      "Provide your restaurant address, business information, and required documents.",
  },
  {
    number: "03",
    title: "Complete Verification",
    description:
      "Our team can review the details and documents submitted for your partnership.",
  },
  {
    number: "04",
    title: "Get Ready to Grow",
    description:
      "Once your partnership is approved, follow the onboarding instructions to get started.",
  },
];

const documents = [
  {
    name: "FSSAI License",
    description: "Valid food business license, as applicable.",
  },
  {
    name: "PAN Card",
    description: "PAN details of the business or proprietor.",
  },
  {
    name: "GST Details",
    description: "GST registration details, if applicable.",
  },
  {
    name: "Bank Account Details",
    description: "Account information for business payments.",
  },
  {
    name: "Restaurant Information",
    description: "Restaurant name, address, contact, and menu details.",
  },
];

function PartnerwithusMain() {
  const [activeService, setActiveService] = useState("Food Delivery");
  const [identity, setIdentity] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const mainRef = useRef(null);
  const getStartedRef = useRef(null);
  const formCardRef = useRef(null);

  const currentService = serviceContent[activeService];

  // Scroll reveal animation
  useEffect(() => {
    const elements = mainRef.current?.querySelectorAll(
      ".partner-reveal"
    );

    if (!elements?.length) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      elements.forEach((element) =>
        element.classList.add("partner-visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("partner-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // Smooth 3D mouse movement
  const handleCardMouseMove = (event) => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 850px)").matches
    ) {
      return;
    }

    const card = getStartedRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 1.8;
    const rotateX = ((centerY - y) / centerY) * 1.8;

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  };

  const resetCardRotation = () => {
    const card = getStartedRef.current;
    if (!card) return;

    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "50%");
  };

  const scrollToForm = () => {
    document.getElementById("partner-registration")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleServiceChange = (service) => {
    setActiveService(service);
    setIdentity("");
    setError("");
    setSubmitted(false);
    setShowInfo(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = identity.trim();

    if (!value) {
      setError("Please enter your mobile number or restaurant ID.");
      setSubmitted(false);
      return;
    }

    const digits = value.replace(/\D/g, "");
    const isMobile = /^[6-9]\d{9}$/.test(digits);
    const isRestaurantId = /^[a-zA-Z0-9_-]{4,30}$/.test(value);

    if (!isMobile && !isRestaurantId) {
      setError(
        "Please enter a valid 10-digit Indian mobile number or restaurant ID."
      );
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <main className="partner-main" ref={mainRef}>

      {/* SERVICE TABS */}
      <section className="partner-navigation">
        <div className="partner-tabs" role="tablist" aria-label="UNT services">
          {services.map((service) => (
            <button
              key={service}
              type="button"
              role="tab"
              aria-selected={activeService === service}
              className={`partner-tab ${
                activeService === service ? "active" : ""
              }`}
              onClick={() => handleServiceChange(service)}
            >
              {service}
            </button>
          ))}
        </div>
      </section>

      {/* GET STARTED */}
      <section
        className="partner-get-started partner-reveal"
        id="partner-registration"
      >
        <div
          className="partner-get-inner"
          ref={getStartedRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={resetCardRotation}
        >
          <div className="partner-get-copy">
            <span className="partner-small-label">
              PARTNER WITH UNT FOOD DELIVERY
            </span>

            <h2>
              Start Growing Your
              <br />
              <span>Restaurant Business</span>
            </h2>

            <p>{currentService.description}</p>

            <div className="partner-benefits">
              {currentService.benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  style={{ "--item-index": index }}
                >
                  <span className="partner-check">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="partner-form-card"
            ref={formCardRef}
            key={activeService}
          >
            <div className="partner-form-heading">
              <div>
                <span className="partner-form-kicker">
                  LET'S GET STARTED
                </span>

                <h3>{currentService.formTitle}</h3>
              </div>

              <button
                className="partner-info-button"
                type="button"
                aria-label="More information"
                aria-expanded={showInfo}
                onClick={() => setShowInfo(!showInfo)}
              >
                i
              </button>
            </div>

            {showInfo && (
              <div className="partner-info-message">
                Use the mobile number registered with your restaurant or
                your existing restaurant ID. Our registration form
                currently validates the information locally.
              </div>
            )}

            <p className="partner-form-description">
              {currentService.formDescription}
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <label
                className="partner-input-label"
                htmlFor="partner-identity"
              >
                Mobile Number / Restaurant ID
              </label>

              <input
                id="partner-identity"
                type="text"
                value={identity}
                onChange={(event) => {
                  setIdentity(event.target.value);
                  setError("");
                  setSubmitted(false);
                }}
                placeholder="Enter mobile number or restaurant ID"
                autoComplete="off"
              />

              {error && (
                <p className="partner-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="partner-continue-button"
              >
                Continue to Partner Registration
                <span aria-hidden="true">→</span>
              </button>

              {submitted && (
                <div className="partner-success" role="status">
                  <span className="partner-success-icon">✓</span>
                  <span>
                    Your details passed the local validation. Connect
                    this form to your UNT registration API to complete
                    registration.
                  </span>
                </div>
              )}

              <p className="partner-terms">
                By continuing, you agree to the applicable UNT partner
                registration terms and policies.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ONBOARDING */}
      <section className="partner-onboarding">
        <div className="partner-onboarding-heading partner-reveal">
          <span className="partner-section-eyebrow">
            SIMPLE PARTNER ONBOARDING
          </span>

          <h2>How to Partner with UNT</h2>

          <p>
            Follow these steps to begin your restaurant partnership
            journey with UNT Food Delivery.
          </p>

          <div className="partner-heading-underline"></div>

          <span className="partner-step-count">4 EASY STEPS</span>
        </div>

        <div className="partner-onboarding-grid">

          {/* STEPS */}
          <div className="partner-steps-card partner-reveal">
            <span className="partner-small-label">
              YOUR PARTNER JOURNEY
            </span>

            <div className="partner-steps-list">
              {onboardingSteps.map((step, index) => (
                <div
                  className="partner-step"
                  key={step.number}
                  style={{ "--item-index": index }}
                >
                  <div className="partner-step-marker">
                    <span className="partner-step-dot">
                      {index + 1}
                    </span>

                    {index !== onboardingSteps.length - 1 && (
                      <span className="partner-step-line"></span>
                    )}
                  </div>

                  <div className="partner-step-content">
                    <span className="partner-step-number">
                      STEP {step.number}
                    </span>

                    <h4>{step.title}</h4>

                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="partner-interest-button"
              onClick={scrollToForm}
            >
              Start Your Registration <span>→</span>
            </button>
          </div>

          {/* DOCUMENTS */}
          <div className="partner-documents partner-reveal">
            <div className="partner-documents-heading">
              <div className="partner-documents-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="25"
                  height="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M8 13h8M8 17h8" />
                </svg>
              </div>

              <div>
                <h3>Documents Required</h3>
                <p>Keep these business details ready.</p>
              </div>
            </div>

            <div className="partner-documents-divider"></div>

            <div className="partner-document-list">
              {documents.map((document, index) => (
                <div
                  key={document.name}
                  style={{ "--item-index": index }}
                >
                  <span className="partner-document-dot">✓</span>

                  <div className="partner-document-info">
                    <span className="partner-document-name">
                      {document.name}
                    </span>

                    <span className="partner-document-description">
                      {document.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="partner-documents-note">
              Document requirements may vary depending on your business
              type and applicable regulations. UNT's onboarding team can
              confirm the final requirements.
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="partner-bottom-cta partner-reveal">
        <div>
          <h2>Ready to Grow Your Food Business?</h2>

          <p>
            Take the next step and explore partnership opportunities
            with UNT Food Delivery.
          </p>
        </div>

        <button
          type="button"
          className="partner-terms-anchor"
          onClick={scrollToForm}
        >
          Become a Partner <span>→</span>
        </button>
      </section>
    </main>
  );
}

export default PartnerwithusMain;
