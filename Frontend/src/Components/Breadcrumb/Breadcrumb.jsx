
import React from "react";
import "./Breadcrumb.css";

// Replace this path with your actual image from src/assets
import bannerImage from "../../assets/pngtree-pepperoni-pizza-slice-on-wood-image_16450781.jpg";

const Breadcrumb = () => {
  return (
    <section className="breadcrumb-banner">
      <div className="breadcrumb-banner-image">
        <img src={bannerImage} alt="Page Banner" />
      </div>
    </section>
  );
};

export default Breadcrumb;
