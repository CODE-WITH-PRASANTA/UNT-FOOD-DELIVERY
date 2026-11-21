
import React from "react";
import "./ResturantsearchBreadcrumb.css";
import bannerImage from "../../assets/pngtree-pepperoni-pizza-slice-on-wood-image_16450781.jpg";

const ResturantsearchBreadcrumb = () => {
  return (
    <section
      className="restaurant-breadcrumb"
      style={{ "--restaurant-bg": `url(${bannerImage})` }}
    >
      {/* Background image and overlay */}
      <div className="restaurant-breadcrumb-bg"></div>
      <div className="restaurant-breadcrumb-overlay"></div>

      {/* Main Content */}
      <div className="restaurant-breadcrumb-container">
        <div className="restaurant-breadcrumb-content">

          <div className="restaurant-breadcrumb-label">
            <span className="restaurant-breadcrumb-label-line"></span>
            FOOD DISCOVERY
          </div>

          <h1>
            Discover Your
            <br />
            <span>Favourite Restaurants</span>
          </h1>

          <p>
            Explore delicious food, discover amazing restaurants
            and enjoy your favourite meals delivered fresh to you.
          </p>

          <div className="restaurant-breadcrumb-navigation">
            <a href="/">Home</a>
            <span>/</span>
            <span className="restaurant-breadcrumb-current">
              Restaurant Search
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ResturantsearchBreadcrumb;
