import React, { useEffect, useMemo, useState } from "react";

import {
  FaUtensils,
  FaPizzaSlice,
  FaBreadSlice,
  FaHamburger,
  FaPepperHot,
  FaDrumstickBite,
  FaCarrot,
  FaBacon,
  FaCheese,
  FaFish,
  FaLeaf,
  FaCoffee,
  FaIceCream,
} from "react-icons/fa";

import cardimg1 from "../../assets/cardimg1.jpg";
import cardimg2 from "../../assets/cardimg2.jpg";
import cardimg3 from "../../assets/cardimg3.jpg";
import cardimg4 from "../../assets/cardimg4.jpg";
import cardimg5 from "../../assets/cardimg5.jpg";
import cardimg6 from "../../assets/cardimg6.jpg";
import cardimg7 from "../../assets/cardimg7.jpg";
import cardimg8 from "../../assets/cardimg8.jpg";
import cardimg9 from "../../assets/cardimg9.jpg";
import cardimg10 from "../../assets/cardimg10.jpg";
import cardimg11 from "../../assets/cardimg11.jpg";
import cardimg12 from "../../assets/cardimg12.jpg";
import cardimg13 from "../../assets/cardimg13.jpg";
import cardimg14 from "../../assets/cardimg15.jpg";
import cardimg15 from "../../assets/cardimg16.jpg";

import dishimg1 from "../../assets/dishimg1.jpg";
import dishimg2 from "../../assets/dishimg2.jpg";
import dishimg3 from "../../assets/dishimg3.jpg";
import dishimg4 from "../../assets/dishimg4.jpg";
import dishimg5 from "../../assets/dishimg5.jpg";
import dishimg6 from "../../assets/dishimg6.jpg";
import dishimg7 from "../../assets/dishimg7.jpg";
import dishimg8 from "../../assets/dishimg8.jpg";
import dishimg9 from "../../assets/dishimg9.jpg";
import dishimg10 from "../../assets/dishimg10.jpg";
import dishimg11 from "../../assets/dishimg11.jpg";
import dishimg12 from "../../assets/dishimg12.jpg";

import "./ResturantsearchMain.css";

/* =========================
   FOOD CATEGORIES
========================= */

const categories = [
  ["Appetizers", 52],
  ["Beverages", 33],
  ["Chicken", 19],
  ["Chinese", 15],
  ["Breakfast", 14],
  ["Uncategorized", 3],
  ["BBQ", 9],
  ["Salads", 12],
  ["New Arrival", 10],
  ["Desserts", 18],
  ["Happy Meal", 4],
  ["Hi Tea", 3],
  ["Soups", 1],
  ["Deals", 10],
  ["Rolls", 12],
  ["Chow Mein", 6],
  ["Calzone", 9],
  ["Broast", 6],
  ["Dinner Buffet", 4],
  ["Pizza", 15],
  ["Sauces", 12],
  ["Paratha", 10],
  ["Shakes", 22],
  ["Casa Deals", 1],
  ["Nuggets", 2],
  ["Steaks", 5],
  ["Hot Drinks", 3],
  ["Sandwiches", 6],
  ["Side Order", 4],
  ["Rice", 7],
  ["Vegetarian", 3],
  ["Starters", 4],
  ["Sea Food", 4],
];

/* =========================
   RESTAURANT DATA
========================= */

const restaurants = [
  {
    id: 1,
    name: "Organic Arcadian Food",
    image: cardimg1,
    logo: <FaIceCream />,
    rating: 4.5,
    reviews: 128,
    address: "Link road, Model Town",
    time: "12:01 am - 11:59 pm",
    delivery: true,
    pickup: true,
    categories: ["Beverages", "Desserts", "Hot Drinks"],
    description:
      "Discover delicious food, fresh ingredients and exceptional flavors.",
  },
  {
    id: 2,
    name: "Aromi Lounge",
    image: cardimg2,
    logo: <FaUtensils />,
    rating: 5,
    reviews: 216,
    address: "1784 Willow Creek Drive, TX",
    time: "12:00 pm - 12:00 am",
    delivery: true,
    pickup: true,
    categories: ["Dinner Buffet", "Steaks", "Appetizers"],
    description:
      "An elegant dining experience featuring handcrafted meals and signature dishes.",
  },
  {
    id: 3,
    name: "Tasty Food Pizza",
    image: cardimg3,
    logo: <FaPizzaSlice />,
    rating: 4,
    reviews: 96,
    address: "47 W 13th St, New York",
    time: "12:03 am - 11:59 pm",
    delivery: true,
    pickup: true,
    categories: ["Pizza", "Calzone", "Deals"],
    description:
      "Freshly baked pizzas prepared with premium toppings and authentic flavors.",
  },
  {
    id: 4,
    name: "Food Chef Italian",
    image: cardimg4,
    logo: <FaBreadSlice />,
    rating: 4.5,
    reviews: 84,
    address: "Suite #3, Abu Dhabi",
    time: "11:53 pm - 11:50 pm",
    delivery: true,
    pickup: true,
    categories: ["Pasta", "Pizza", "Italian"],
    description:
      "Taste the magic of Italian cooking with traditional recipes and fresh flavors.",
  },
  {
    id: 5,
    name: "Toni Food Hub",
    image: cardimg5,
    logo: <FaHamburger />,
    rating: 5,
    reviews: 173,
    address: "Street 5, Oaxaca, Sonora",
    time: "12:08 am - 11:50 pm",
    delivery: true,
    pickup: true,
    categories: ["Chicken", "Burgers", "Sandwiches"],
    description:
      "Enjoy juicy burgers, delicious meals and freshly prepared comfort food.",
  },
  {
    id: 6,
    name: "Masterchef Chinese Food",
    image: cardimg6,
    logo: <FaPepperHot />,
    rating: 4,
    reviews: 105,
    address: "Suite #2 Street 5 Main",
    time: "12:04 am - 11:48 pm",
    delivery: true,
    pickup: false,
    categories: ["Chinese", "Chow Mein", "Rice"],
    description:
      "Delicious Chinese specialties prepared fresh with authentic spices.",
  },
  {
    id: 7,
    name: "Burgervil Food Processor",
    image: cardimg7,
    logo: <FaCheese />,
    rating: 5,
    reviews: 194,
    address: "Suite #6, Abu Dhabi, UAE",
    time: "8:00 am - 5:00 pm",
    delivery: true,
    pickup: true,
    categories: ["Burgers", "Chicken", "Nuggets"],
    description:
      "A destination for mouthwatering burgers, crispy fries and satisfying meals.",
  },
  {
    id: 8,
    name: "Fun Chicken Meals",
    image: cardimg8,
    logo: <FaDrumstickBite />,
    rating: 4.5,
    reviews: 143,
    address: "Street 6 Park Avenue",
    time: "12:08 am - 11:58 pm",
    delivery: true,
    pickup: true,
    categories: ["Chicken", "Broast", "Nuggets"],
    description:
      "Crispy, juicy chicken made with our signature seasonings and recipes.",
  },
  {
    id: 9,
    name: "Chef Ganteng Restaurant",
    image: cardimg9,
    logo: <FaCarrot />,
    rating: 5,
    reviews: 209,
    address: "Main Boulevard",
    time: "12:08 am - 11:57 pm",
    delivery: true,
    pickup: true,
    categories: ["Vegetarian", "Salads", "Rice"],
    description:
      "A wonderful selection of fresh meals, vibrant flavors and chef specialties.",
  },
  {
    id: 10,
    name: "Marshall Steak House",
    image: cardimg10,
    logo: <FaBacon />,
    rating: 4.5,
    reviews: 178,
    address: "Suite #9 Main Boulevard",
    time: "12:05 am - 11:55 pm",
    delivery: true,
    pickup: true,
    categories: ["Steaks", "BBQ", "Dinner Buffet"],
    description:
      "Premium steaks and expertly grilled meals for every occasion.",
  },
  {
    id: 11,
    name: "Chickenzilla Pizza Fusion",
    image: cardimg11,
    logo: <FaCheese />,
    rating: 4,
    reviews: 72,
    address: "Block A Suite #7, Sydney",
    time: "12:05 am - 11:55 pm",
    delivery: true,
    pickup: true,
    categories: ["Pizza", "Chicken", "Deals"],
    description:
      "A delicious fusion of chicken, cheese, pizza and bold flavors.",
  },
  {
    id: 12,
    name: "Taste & Gather",
    image: cardimg12,
    logo: <FaFish />,
    rating: 5,
    reviews: 221,
    address: "8821 Oak Meadow Lane, OR",
    time: "12:00 pm - 12:00 am",
    delivery: true,
    pickup: true,
    categories: ["Appetizers", "Steaks", "Sea Food"],
    description:
      "Gather around great food, exceptional service and unforgettable moments.",
  },
  {
    id: 13,
    name: "Casa Gourmet",
    image: cardimg13,
    logo: <FaLeaf />,
    rating: 4.5,
    reviews: 87,
    address: "Downtown Avenue",
    time: "10:00 am - 11:00 pm",
    delivery: true,
    pickup: true,
    categories: ["Vegetarian", "Salads", "Casa Deals"],
    description:
      "Fresh, carefully prepared food with delightful combinations of ingredients.",
  },
  {
    id: 14,
    name: "Golden Spoon",
    image: cardimg14,
    logo: <FaUtensils />,
    rating: 4,
    reviews: 64,
    address: "Market Street",
    time: "9:00 am - 10:00 pm",
    delivery: true,
    pickup: true,
    categories: ["Breakfast", "Paratha", "Rice"],
    description:
      "Comforting traditional meals served with fresh ingredients and love.",
  },
  {
    id: 15,
    name: "Sweet Moments Cafe",
    image: cardimg15,
    logo: <FaCoffee />,
    rating: 5,
    reviews: 135,
    address: "Central Square",
    time: "8:00 am - 10:00 pm",
    delivery: true,
    pickup: true,
    categories: ["Desserts", "Shakes", "Hot Drinks"],
    description:
      "Delight in freshly brewed coffee, sweet treats and refreshing beverages.",
  },
];

/* =========================
   MENU DATA
========================= */

const menuItems = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    category: "Appetizers",
    image: dishimg1,
    description:
      "Spaghetti Bolognese is a delicious Italian dish with rich tomato sauce.",
    price: 150,
    oldPrice: 200,
  },
  {
    id: 2,
    name: "Calzone",
    category: "Calzone",
    image: dishimg2,
    description:
      "Calzone is a traditional Italian folded pizza with cheese and fillings.",
    price: 80,
    oldPrice: 100,
  },
  {
    id: 3,
    name: "Torta Caprese",
    category: "Desserts",
    image: dishimg3,
    description:
      "A rich chocolate cake with a delicious soft center and sweet flavor.",
    price: 100,
    oldPrice: 200,
  },
  {
    id: 4,
    name: "Crostini Toscani",
    category: "Appetizers",
    image: dishimg4,
    description:
      "A delicious Italian starter served with fresh ingredients.",
    price: 100,
    oldPrice: 150,
  },
  {
    id: 5,
    name: "Pasta",
    category: "Breakfast",
    image: dishimg5,
    description:
      "Freshly cooked pasta with flavorful herbs and a delicious sauce.",
    price: 100,
    oldPrice: 200,
  },
  {
    id: 6,
    name: "Alfredo Pasta",
    category: "Appetizers",
    image: dishimg6,
    description:
      "Creamy Alfredo pasta prepared with parmesan and a smooth sauce.",
    price: 100,
    oldPrice: 150,
  },
  {
    id: 7,
    name: "Gluten Free Lasanga",
    category: "Breakfast",
    image: dishimg7,
    description:
      "Layered lasagna with rich sauce and delicious cheese.",
    price: 150,
    oldPrice: 200,
  },
  {
    id: 8,
    name: "Maccheroni Al Forno",
    category: "Appetizers",
    image: dishimg8,
    description:
      "Oven-baked macaroni with cheese, herbs and a rich sauce.",
    price: 100,
    oldPrice: 200,
  },
  {
    id: 9,
    name: "Chicken Burger",
    category: "Chicken",
    image: dishimg9,
    description:
      "Juicy chicken burger with fresh vegetables and signature sauce.",
    price: 120,
    oldPrice: 180,
  },
  {
    id: 10,
    name: "Fresh Garden Salad",
    category: "Salads",
    image: dishimg10,
    description:
      "Fresh seasonal vegetables with a light and refreshing dressing.",
    price: 90,
    oldPrice: 120,
  },
  {
    id: 11,
    name: "Margherita Pizza",
    category: "Pizza",
    image: dishimg11,
    description:
      "Classic pizza with mozzarella cheese, tomato and fresh basil.",
    price: 180,
    oldPrice: 240,
  },
  {
    id: 12,
    name: "Chocolate Shake",
    category: "Shakes",
    image: dishimg12,
    description:
      "A rich, creamy chocolate shake topped with delicious chocolate.",
    price: 80,
    oldPrice: 110,
  },
];

/* =========================
   SMALL COMPONENTS
========================= */

const RatingStars = ({ rating = 5, interactive = false, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const activeRating = hoverRating || rating;

  return (
    <div
      className={`rs-stars ${interactive ? "rs-stars-interactive" : ""}`}
      onMouseLeave={() => setHoverRating(0)}
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = activeRating >= star;
        const half = activeRating >= star - 0.5 && activeRating < star;

        return (
          <span
            key={star}
            className={`rs-star ${filled ? "is-filled" : ""} ${
              half ? "is-half" : ""
            }`}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onClick={() => interactive && onChange?.(star)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

const SectionUnderline = () => <div className="rs-section-underline" />;

const CartButton = ({ count, onClick }) => (
  <button className="rs-floating-cart" onClick={onClick}>
    <span>🛒</span>
    {count > 0 && <span className="rs-cart-count">{count}</span>}
  </button>
);

/* =========================
   MAIN COMPONENT
========================= */

const ResturantsearchMain = () => {
  const [search, setSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [pickup, setPickup] = useState(true);
  const [nearby, setNearby] = useState(false);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState("Menu");
  const [activeMenuCategory, setActiveMenuCategory] =
    useState("Appetizers");
  const [menuSearch, setMenuSearch] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [workingHoursOpen, setWorkingHoursOpen] = useState(false);

  const pageSize = 9;

  /* =========================
     CATEGORY FILTERING
  ========================= */

  const filteredCategories = categories.filter(([name]) =>
    name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  /* =========================
     RESTAURANT FILTERING
  ========================= */

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch = restaurant.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        restaurant.categories.some(
          (category) =>
            category.toLowerCase() === selectedCategory.toLowerCase()
        );

      const matchesDelivery = !delivery || restaurant.delivery;
      const matchesPickup = !pickup || restaurant.pickup;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDelivery &&
        matchesPickup
      );
    });
  }, [search, selectedCategory, delivery, pickup]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRestaurants.length / pageSize)
  );

  const currentRestaurants = filteredRestaurants.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory, delivery, pickup]);

  /* =========================
     CART
  ========================= */

  const addToCart = (item) => {
    setCart((previous) => [...previous, item]);
  };

  const cartCount = cart.length;

  /* =========================
     RESTAURANT DETAILS
  ========================= */

  const openRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setActiveDetailTab("Menu");
    setActiveMenuCategory("Appetizers");
    setMenuSearch("");
    setExpandedDescriptions([]);
    setMobileSidebarOpen(false);
    setWorkingHoursOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBack = () => {
    setSelectedRestaurant(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     MENU CATEGORY FILTERING
  ========================= */

  const menuCategories = [
    "Appetizers",
    "Breakfast",
    "Calzone",
    "Chicken",
    "Desserts",
    "Pizza",
    "Salads",
    "Shakes",
  ];

  const filteredMenu = menuItems.filter((item) => {
    const matchesCategory =
      activeMenuCategory === "All" ||
      item.category === activeMenuCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(menuSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  /* =========================
     RESTAURANT CARD
  ========================= */

  const RestaurantCard = ({ restaurant }) => (
    <article
      className="rs-restaurant-card"
      onClick={() => openRestaurant(restaurant)}
    >
      <div className="rs-card-image">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          loading="lazy"
        />

        <button
          className="rs-delivery-icon"
          title="Delivery available"
          onClick={(e) => e.stopPropagation()}
        >
          🚚
        </button>

        <div className="rs-card-rating">
          <RatingStars rating={restaurant.rating} interactive />
        </div>

        <div className="rs-card-image-overlay">
          <span>View Restaurant</span>
        </div>
      </div>

      <div className="rs-card-title">
        {restaurant.name}
        <span className="rs-card-arrow">↗</span>
      </div>

      <div className="rs-card-information">
        <div className="rs-card-logo">{restaurant.logo}</div>

        <div className="rs-card-meta">
          <div className="rs-card-time">
            <span>🟢</span>
            {restaurant.time}
          </div>

          <div className="rs-card-address">
            <span>📍</span>
            {restaurant.address}
          </div>

          <div className="rs-card-delivery-tags">
            {restaurant.delivery && <span>Delivery</span>}
            {restaurant.pickup && <span>Pickup</span>}
          </div>
        </div>
      </div>
    </article>
  );

  /* =========================
     MENU ITEM
  ========================= */

  const MenuItem = ({ item }) => {
    const isExpanded = expandedDescriptions.includes(item.id);

    return (
      <div className="rs-menu-item">
        <img
          className="rs-menu-item-image"
          src={item.image}
          alt={item.name}
          loading="lazy"
        />

        <div className="rs-menu-item-content">
          <h4>{item.name}</h4>

          <p>
            {isExpanded
              ? item.description
              : `${item.description.slice(0, 65)}...`}

            <button
              className="rs-read-more"
              onClick={() =>
                setExpandedDescriptions((previous) =>
                  previous.includes(item.id)
                    ? previous.filter((id) => id !== item.id)
                    : [...previous, item.id]
                )
              }
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          </p>

          <div className="rs-menu-prices">
            <strong>₹{item.price.toFixed(2)}</strong>
            <del>₹{item.oldPrice.toFixed(2)}</del>
          </div>
        </div>

        <button
          className="rs-order-button"
          onClick={() =>
            addToCart({
              ...item,
              restaurant: selectedRestaurant?.name,
            })
          }
        >
          Order Now
        </button>
      </div>
    );
  };

  /* =========================
     PRODUCT CARD
  ========================= */

  const ProductCard = ({ item }) => (
    <div className="rs-product-card">
      <div className="rs-product-image">
        <img src={item.image} alt={item.name} loading="lazy" />

        <button className="rs-product-delivery">🚚</button>
      </div>

      <div className="rs-product-details">
        <RatingStars rating={item.rating || 4.5} />

        <h4>{item.name}</h4>

        <div className="rs-product-price">
          <strong>₹{item.price}</strong>
          <del>₹{item.oldPrice}</del>
        </div>

        <div className="rs-product-address">
          📍 {selectedRestaurant?.address}
        </div>

        <button
          className="rs-order-button rs-order-button-full"
          onClick={() => addToCart(item)}
        >
          Order Now
        </button>
      </div>
    </div>
  );

  /* =========================
     DETAIL VIEW
  ========================= */

  const DetailView = () => {
    const restaurant = selectedRestaurant;

    if (!restaurant) return null;

    return (
      <div className="rs-detail-page">
        {/* HERO BANNER */}

        <div className="rs-detail-banner">
          <img src={restaurant.image} alt={restaurant.name} />

          <div className="rs-detail-banner-overlay" />
        </div>

        {/* RESTAURANT HEADER */}

        <div className="rs-detail-header">
          <div className="rs-detail-header-inner">
            <div className="rs-detail-logo">{restaurant.logo}</div>

            <div className="rs-detail-identity">
              <RatingStars rating={restaurant.rating} />

              <h1>{restaurant.name}</h1>

              <p>📍 {restaurant.address}</p>
            </div>

            <div className="rs-working-hours-wrapper">
              <button
                className="rs-working-hours"
                onClick={() => setWorkingHoursOpen(!workingHoursOpen)}
              >
                Working Hours
                <span>{workingHoursOpen ? "▲" : "▼"}</span>
              </button>

              {workingHoursOpen && (
                <div className="rs-working-hours-dropdown">
                  <strong>Opening Hours</strong>
                  <p>Monday – Sunday</p>
                  <span>{restaurant.time}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DETAIL CONTENT */}

        <div className="rs-detail-container">
          {/* LEFT COLUMN */}

          <aside className="rs-detail-left">
            <div className="rs-detail-sidebar-box">
              <h3>All Details</h3>

              <SectionUnderline />

              {[
                ["🍽️", "Menu"],
                ["⭐", "Reviews"],
                ["ℹ️", "Restaurant Info"],
              ].map(([icon, label]) => (
                <button
                  key={label}
                  type="button"
                  className={`rs-detail-nav-item ${
                    activeDetailTab === label ? "active" : ""
                  }`}
                  onClick={() => setActiveDetailTab(label)}
                >
                  <span className="rs-detail-nav-icon">{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* ADVERTISEMENT */}

            <div className="rs-ad-card">
              <h3>Advertisement</h3>

              <SectionUnderline />

              <a
                href="#advertisement"
                className="rs-ad-image-link"
                onClick={(e) => e.preventDefault()}
              >
                <img src={dishimg12} alt="Restaurant advertisement" />

                <div className="rs-ad-overlay">
                  <span>Special Offer</span>
                  <strong>Buy 1 Get 1</strong>
                  <small>ORDER NOW</small>
                </div>
              </a>
            </div>
          </aside>

          {/* CENTER COLUMN */}

          <main className="rs-detail-center">
            {/* MENU TAB */}

            {activeDetailTab === "Menu" && (
              <>
                <div className="rs-categories-header">
                  <h3>Categories</h3>
                  <SectionUnderline />
                </div>

                {/* CATEGORY CAROUSEL */}

                <div className="rs-menu-category-slider">
                  <button
                    className="rs-category-arrow"
                    onClick={() => {
                      const index =
                        menuCategories.indexOf(activeMenuCategory);

                      setActiveMenuCategory(
                        menuCategories[
                          (index - 1 + menuCategories.length) %
                            menuCategories.length
                        ]
                      );
                    }}
                  >
                    ‹
                  </button>

                  <div className="rs-menu-category-track">
                    {menuCategories.map((category) => (
                      <button
                        key={category}
                        className={`rs-menu-category ${
                          activeMenuCategory === category ? "active" : ""
                        }`}
                        onClick={() => setActiveMenuCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  <button
                    className="rs-category-arrow"
                    onClick={() => {
                      const index =
                        menuCategories.indexOf(activeMenuCategory);

                      setActiveMenuCategory(
                        menuCategories[
                          (index + 1) % menuCategories.length
                        ]
                      );
                    }}
                  >
                    ›
                  </button>
                </div>

                {/* MENU SEARCH */}

                <div className="rs-detail-menu-search">
                  <input
                    type="text"
                    placeholder="Search menu..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                  />

                  <span>⌕</span>
                </div>

                <h3 className="rs-menu-heading">
                  {activeMenuCategory} ({filteredMenu.length})
                </h3>

                <SectionUnderline />

                {/* MENU ITEMS */}

                <div className="rs-menu-list">
                  {filteredMenu.length ? (
                    filteredMenu.map((item) => (
                      <MenuItem key={item.id} item={item} />
                    ))
                  ) : (
                    <div className="rs-empty-menu">
                      No items available in this category.
                    </div>
                  )}
                </div>
              </>
            )}

            {/* REVIEWS TAB */}

            {activeDetailTab === "Reviews" && (
              <div className="rs-reviews-section">
                <h3>Customer Reviews</h3>

                <SectionUnderline />

                <div className="rs-review-summary">
                  <strong>{restaurant.rating.toFixed(1)}</strong>

                  <RatingStars rating={restaurant.rating} />

                  <p>
                    Based on {restaurant.reviews} customer reviews
                  </p>
                </div>

                {[
                  ["Alex Morgan", 5, "Amazing food and excellent service!"],
                  ["James Wilson", 4, "Very good experience. Loved the food."],
                  ["Sophia Brown", 5, "Highly recommended. Everything was fresh."],
                ].map(([name, rating, message]) => (
                  <div className="rs-review-item" key={name}>
                    <div className="rs-review-avatar">
                      {name.charAt(0)}
                    </div>

                    <div>
                      <h4>{name}</h4>

                      <RatingStars rating={rating} />

                      <p>{message}</p>
                    </div>
                  </div>
                ))}

                <button className="rs-order-button">
                  Write a Review
                </button>
              </div>
            )}

            {/* RESTAURANT INFO TAB */}

            {activeDetailTab === "Restaurant Info" && (
              <div className="rs-restaurant-info">
                <h3>Restaurant Information</h3>

                <SectionUnderline />

                <div className="rs-info-row">
                  <strong>Restaurant Name</strong>
                  <span>{restaurant.name}</span>
                </div>

                <div className="rs-info-row">
                  <strong>Address</strong>
                  <span>{restaurant.address}</span>
                </div>

                <div className="rs-info-row">
                  <strong>Working Hours</strong>
                  <span>{restaurant.time}</span>
                </div>

                <div className="rs-info-row">
                  <strong>Delivery</strong>
                  <span>
                    {restaurant.delivery ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="rs-info-row">
                  <strong>Pickup</strong>
                  <span>
                    {restaurant.pickup ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="rs-info-row">
                  <strong>Description</strong>
                  <span>{restaurant.description}</span>
                </div>

                <h3 className="rs-info-categories-title">
                  Restaurant Categories
                </h3>

                <div className="rs-info-category-tags">
                  {restaurant.categories.map((category) => (
                    <span key={category}>{category}</span>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* RIGHT COLUMN */}

          <aside className="rs-detail-right">
            {/* BEST SELLING */}

            <div className="rs-product-section">
              <h3>Best Selling Products</h3>

              <SectionUnderline />

              <ProductCard
                item={{
                  ...menuItems[2],
                  rating: 4.5,
                }}
              />
            </div>

            {/* SALE PRODUCTS */}

            <div className="rs-product-section">
              <h3>Sale Products</h3>

              <SectionUnderline />

              <ProductCard
                item={{
                  ...menuItems[1],
                  rating: 4,
                }}
              />
            </div>

            {/* POPULAR PRODUCTS */}

            <div className="rs-product-section">
              <h3>Popular Products</h3>

              <SectionUnderline />

              <ProductCard
                item={{
                  ...menuItems[10],
                  rating: 5,
                }}
              />
            </div>
          </aside>
        </div>
      </div>
    );
  };

  /* =========================
     LISTING VIEW
  ========================= */

  return (
    <div className="rs-main">
      {/* FLOATING CART */}

      <CartButton
        count={cartCount}
        onClick={() =>
          alert(
            cart.length
              ? `You have ${cart.length} items in your cart.`
              : "Your cart is empty."
          )
        }
      />

      {/* SCROLL TO TOP */}

      <button
        className="rs-scroll-top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        ↑
      </button>

      {/* DETAIL VIEW */}

      {selectedRestaurant ? (
        <>
          <button className="rs-back-button" onClick={goBack}>
            ← Back to Restaurants
          </button>

          <DetailView />
        </>
      ) : (
        <div className="rs-layout">
          {/* MOBILE FILTER BUTTON */}

          <button
            className="rs-mobile-filter-button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            ☰ Filters & Categories
          </button>

          {/* SIDEBAR */}

          <aside
            className={`rs-sidebar ${
              mobileSidebarOpen ? "rs-sidebar-open" : ""
            }`}
          >
            {/* SIDEBAR TOP */}

            <div className="rs-sidebar-top">
              <div>
                <h2>New title</h2>

                <SectionUnderline />
              </div>

              <button
                className="rs-refresh"
                onClick={() => {
                  setSearch("");
                  setCategorySearch("");
                  setSelectedCategory("");
                  setDelivery(false);
                  setPickup(true);
                  setNearby(false);
                  setPage(1);
                }}
              >
                ↻ Refresh
              </button>
            </div>

            {/* FILTERS */}

            <div className="rs-filter-row">
              <span>Near By Me</span>

              <button
                className={`rs-switch ${
                  nearby ? "rs-switch-active" : ""
                }`}
                onClick={() => setNearby(!nearby)}
              >
                <span />
              </button>
            </div>

            <div className="rs-filter-row">
              <span>Delivery</span>

              <button
                className={`rs-switch ${
                  delivery ? "rs-switch-active" : ""
                }`}
                onClick={() => setDelivery(!delivery)}
              >
                <span />
              </button>
            </div>

            <div className="rs-filter-row">
              <span>Pickup</span>

              <button
                className={`rs-switch ${
                  pickup ? "rs-switch-active" : ""
                }`}
                onClick={() => setPickup(!pickup)}
              >
                <span />
              </button>
            </div>

            {/* FOOD CATEGORY */}

            <div className="rs-sidebar-category-heading">
              <h2>Search By Food</h2>

              <SectionUnderline />
            </div>

            <input
              className="rs-category-search"
              type="text"
              placeholder="Search categories..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
            />

            <div className="rs-category-scroll">
              {filteredCategories.map(([category, count]) => (
                <button
                  className={`rs-category-option ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  key={category}
                  onClick={() => {
                    setSelectedCategory(
                      selectedCategory === category ? "" : category
                    );

                    setMobileSidebarOpen(false);
                  }}
                >
                  <span className="rs-category-radio" />

                  <span className="rs-category-name">{category}</span>

                  <span className="rs-category-count">({count})</span>
                </button>
              ))}
            </div>

            {/* SIDEBAR ADVERTISEMENT */}

            <div className="rs-ad-card rs-list-ad">
              <h3>Advertisement</h3>

              <SectionUnderline />

              <div className="rs-ad-image-link">
                <img
                  src={dishimg3}
                  alt="Food promotion"
                  loading="lazy"
                />

                <div className="rs-ad-overlay">
                  <span>Special Offer</span>
                  <strong>Save 40%</strong>
                  <small>ORDER NOW</small>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN RESTAURANT CONTENT */}

          <main className="rs-content">
            {/* BANNER */}

            <div className="rs-banner">
              <img src={cardimg15} alt="Restaurant food" />

              <div className="rs-banner-overlay">
                <div>
                  <h2>Your order is now delivered contact-free</h2>

                  <p>
                    Your rider will place your order at your door and
                    wait nearby to ensure you receive it.
                  </p>
                </div>
              </div>
            </div>

            {/* RESTAURANT SEARCH */}

            <form
              className="rs-search-bar"
              onSubmit={(e) => {
                e.preventDefault();
                setPage(1);
              }}
            >
              <input
                type="text"
                placeholder="Search by restaurants name enter at least 3 characters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button type="submit">Search</button>
            </form>

            {/* RESULTS HEADING */}

            <div className="rs-results-heading">
              <h2>{filteredRestaurants.length} + Restaurants</h2>

              <SectionUnderline />

              {selectedCategory && (
                <button
                  className="rs-selected-category"
                  onClick={() => setSelectedCategory("")}
                >
                  {selectedCategory} ×
                </button>
              )}
            </div>

            {/* RESTAURANT GRID */}

            <div className="rs-restaurant-grid">
              {currentRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              ))}
            </div>

            {/* NO RESULTS */}

            {!currentRestaurants.length && (
              <div className="rs-no-results">
                <div>🍽️</div>

                <h3>No restaurants found</h3>

                <p>Try changing your search or category.</p>

                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("");
                    setDelivery(false);
                    setPickup(true);
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* PAGINATION */}

            {filteredRestaurants.length > 0 && (
              <div className="rs-pagination">
                <span>
                  Page {page} of {totalPages}
                </span>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={page === i + 1 ? "active" : ""}
                    onClick={() => {
                      setPage(i + 1);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    {i + 1}
                  </button>
                ))}

                {page < totalPages && (
                  <button
                    className="rs-pagination-next"
                    onClick={() => {
                      setPage(page + 1);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    →
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default ResturantsearchMain;