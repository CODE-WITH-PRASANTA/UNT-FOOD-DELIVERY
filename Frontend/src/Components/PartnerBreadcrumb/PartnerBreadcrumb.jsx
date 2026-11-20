
import React from "react";
import Partnerimg from "../../assets/partnerbreadcrumb.jpg";
import "./PartnerBreadcrumb.css";

const PartnerBreadcrumb = () => {
  const scrollToForm = () => {
    document.getElementById("partner-registration")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section
      className="partner-breadcrumb"
      style={{ "--partner-bg-image": `url(${Partnerimg})` }}
    >
      <div className="partner-breadcrumb-overlay"></div>

      <div className="partner-breadcrumb-content">

        <div className="partner-breadcrumb-brand">
          <span className="partner-breadcrumb-brand-icon">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M24 4C13 4 5 12.5 5 24c0 10.5 8 18.5 19 21V29H14L24 4Z"
                fill="white"
              />
              <path
                d="M27 17H42V29H27V17Z"
                fill="white"
                opacity=".72"
              />
              <path
                d="M27 32H40V38H27V32Z"
                fill="white"
                opacity=".9"
              />
            </svg>
          </span>

          <span>UNT FOOD DELIVERY</span>
        </div>

        <span className="partner-breadcrumb-tag">
          FOOD DELIVERY PARTNERS
        </span>

        <h1>
          Grow Your Restaurant with{" "}
          <span>UNT Food Delivery</span>
        </h1>

        <div className="partner-breadcrumb-line"></div>

        <p>
          Bring your restaurant online, reach more hungry customers,
          and grow your business with UNT Food Delivery.
        </p>

        <button
          className="partner-breadcrumb-button"
          type="button"
          onClick={scrollToForm}
        >
          Become a Partner
          <span aria-hidden="true">→</span>
        </button>

      </div>
    </section>
  );
};

export default PartnerBreadcrumb;
