import React, { useEffect, useMemo, useRef, useState } from "react";
import "./BlogMain.css";

/* ---------- ASSETS (swap any file name here if an image doesn't match) ---------- */
import b1 from "../../assets/pexels-abhinav-goswami-291528.jpg";
import b2 from "../../assets/post-2-1.jpg";
import b3 from "../../assets/post-3.jpg";
import b4 from "../../assets/post-4.jpg";
import b5 from "../../assets/post-5.jpg";
import b6 from "../../assets/post-7.jpg";
import b7 from "../../assets/post-8.jpg";
import b8 from "../../assets/post-9.jpg";
import b9 from "../../assets/mexican.jpg";
import b10 from "../../assets/stick.jpg";
import b11 from "../../assets/sushi.jpg";
import b12 from "../../assets/pasta.jpg";
import adImg from "../../assets/sd.png"; // advertisement image (shown as it is, nothing on top)
import sideDonut from "../../assets/side-donut-1.png";

/* =====================================================
   DATA  (edit / add your real blog posts here)
===================================================== */
const POSTS = [
  {
    id: "p1",
    cat: "Appetizers",
    title: "Amazing Decadent Pecan PIE Best Cake",
    text: "Pie is a rich chewy, nutty, sweet holiday staple. For many the holidays aren’t the holidays without it, so we explain all this and why pleasure and pain was born and…",
    date: "November 18, 2026",
    img: b1,
  },
  {
    id: "p2",
    cat: "Appetizers",
    title: "Vegetable & Chicken Wrap For Lunch",
    text: "I love a good salad for lunch and dinner. And I have them often. But I also love my carbs. So a little while back, I tried a wrap that changed my lunch routine…",
    date: "November 16, 2026",
    img: b2,
  },
  {
    id: "p3",
    cat: "Sushi",
    title: "Black Special Hot Sushi With Salad Serving",
    text: "I always love a little sweet and creamy salty taste at parties and this Brie has just that! Baked brie is an appetizer that will wow the entire party. Sed ut perspiciatis…",
    date: "November 14, 2026",
    img: b3,
  },
  {
    id: "p4",
    cat: "Appetizers",
    title: "Best Ever Healthy Breakfast Everyday",
    text: "Impress your family with this beautiful cut of meat! When making this prime rib add healthy ingredients in your breakfast and stay active. Hope you’ll enjoy this cooked breakfast…",
    date: "November 12, 2026",
    img: b4,
  },
  {
    id: "p5",
    cat: "Cuisine",
    title: "Grilled Chicken & Kabab With Tomato Sauce",
    text: "If you have been to any Asian restaurant or any Indian’s home you have probably tried some version of this dish. You’ll surely enjoy this meal. Topped with an asian slaw and…",
    date: "November 10, 2026",
    img: b5,
  },
  {
    id: "p6",
    cat: "Cuisine",
    title: "Hot & Air Fryer Creamy Chicken Bowls",
    text: "Air Frying has turned the culinary world on its head with it is healthy, quick, and easy cooking methods. From Steak, Salmon to Grilled Cheese, air frying is so much better…",
    date: "November 8, 2026",
    img: b6,
  },
  {
    id: "p7",
    cat: "Italian",
    title: "Deep Dish Zucchini Special Crust Pizza",
    text: "A healthier and delicious low carb option that the entire family will go crazy for. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque…",
    date: "November 6, 2026",
    img: b7,
  },
  {
    id: "p8",
    cat: "Appetizers",
    title: "Stuffed Bite Sweet Appetizers",
    text: "These are always the crescent roll first to go at all-beef hot a party, and for good reason. Whole all-beef hot dogs are wrapped in crescent roll dough, stuffed with…",
    date: "November 4, 2026",
    img: b8,
  },
  {
    id: "p9",
    cat: "Mexican",
    title: "Spicy Mexican Street Tacos You Must Try",
    text: "Soft tortillas, smoky grilled meat, fresh lime and a handful of coriander: street-style tacos are the fastest way to bring a little fiesta to your weekday dinner table…",
    date: "November 2, 2026",
    img: b9,
  },
  {
    id: "p10",
    cat: "SteakHouse",
    title: "Perfectly Seared Steakhouse Classics",
    text: "The secret to a steakhouse crust is a very hot pan, a dry surface and patience. Here is how to get that restaurant-style sear at home without any fancy equipment…",
    date: "October 30, 2026",
    img: b10,
  },
  {
    id: "p11",
    cat: "Sushi",
    title: "Fresh Salmon Sushi Rolls Made Easy",
    text: "Rolling sushi at home is easier than it looks. With the right rice, a sharp knife and a few fresh ingredients you can serve beautiful rolls in under thirty minutes…",
    date: "October 28, 2026",
    img: b11,
  },
  {
    id: "p12",
    cat: "Italian",
    title: "Creamy Italian Pasta Night At Home",
    text: "A silky sauce, al dente pasta and plenty of parmesan. This one-pan pasta comes together fast and tastes like it came straight from a little Italian kitchen…",
    date: "October 26, 2026",
    img: b12,
  },
];

const CATEGORIES = ["Appetizers", "Cuisine", "Italian", "Mexican", "SteakHouse", "Sushi"];
const PAGE_SIZE = 8;

/* =====================================================
   HOOKS
===================================================== */

// true once the element enters the viewport (fires once)
const useInView = (threshold = 0.15) => {
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

const SplitChars = ({ text }) =>
  text.split("").map((c, i) => (
    <span className="ch" style={{ "--i": i }} key={i} aria-hidden="true">
      {c === " " ? "\u00A0" : c}
    </span>
  ));

const Chevron = () => (
  <svg className="blog-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 5l7 7-7 7" />
  </svg>
);

const Avatar = () => (
  <span className="blog-avatar" aria-hidden="true">
    <svg viewBox="0 0 48 48">
      <circle cx="24" cy="18" r="9" />
      <path d="M6 48c0-10 8-16 18-16s18 6 18 16z" />
    </svg>
  </span>
);

// one blog card – reveals itself when it scrolls into view
const BlogCard = ({ post, index }) => {
  const [ref, inView] = useInView(0.12);
  return (
    <article
      ref={ref}
      id={post.id}
      className={`blog-card ${inView ? "is-visible" : ""}`}
      style={{ "--i": index % 2 }}
    >
      <a href={`#${post.id}`} className="blog-card-media" aria-label={post.title}>
        <img src={post.img} alt={post.title} loading="lazy" />
      </a>

      <div className="blog-card-body">
        <span className="blog-card-cat">{post.cat}</span>
        <h3>
          <a href={`#${post.id}`}>{post.title}</a>
        </h3>
        <p>{post.text}</p>

        <div className="blog-card-author">
          <Avatar />
          <div>
            <strong>Admin</strong>
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

/* =====================================================
   COMPONENT
===================================================== */

const BlogMain = () => {
  const mainRef = useRef(null);
  const listTopRef = useRef(null);
  const [sideRef, sideIn] = useInView(0.1);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

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

  /* ----- filter + paginate ----- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter(
      (p) =>
        (!category || p.cat === category) &&
        (!q || p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q))
    );
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const goToPage = (n) => {
    setPage(n);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pickCategory = (c) => {
    setCategory((prev) => (prev === c ? "" : c));
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setPage(1);
  };

  const recent = POSTS.slice(0, 5);
  const hasFilter = query.trim() || category;

  return (
    <div className="blog-wrap">
      {/* ===== HEADING: half on the breadcrumb banner, half on the page ===== */}
      <div className="blog-title">
        <div className="blog-title-card">
          <h1 aria-label="Latest News & Trends">
            <SplitChars text="Latest News & Trends" />
          </h1>
          <span className="blog-title-line" />
        </div>
      </div>

      <section ref={mainRef} className="blog-main">
        <span className="blog-blob blob-a" aria-hidden="true" />
        <span className="blog-blob blob-b" aria-hidden="true" />
        <img src={sideDonut} alt="" className="blog-donut" aria-hidden="true" />

        <div className="blog-layout">
          {/* ================= POSTS ================= */}
          <div className="blog-posts" ref={listTopRef}>
            {hasFilter && (
              <div className="blog-filter-chip">
                <span>
                  {filtered.length} result{filtered.length === 1 ? "" : "s"}
                  {category && <> in <b>{category}</b></>}
                  {query.trim() && <> for “<b>{query.trim()}</b>”</>}
                </span>
                <button type="button" onClick={clearFilters}>Clear ✕</button>
              </div>
            )}

            {visible.length ? (
              <div className="blog-grid" key={`${current}-${category}-${query}`}>
                {visible.map((p, i) => (
                  <BlogCard key={p.id} post={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="blog-empty">
                <h3>No posts found</h3>
                <p>Try a different keyword or category.</p>
                <button type="button" onClick={clearFilters}>Show all posts</button>
              </div>
            )}

            {/* pagination */}
            {visible.length > 0 && (
              <nav className="blog-pagination" aria-label="Blog pages">
                <span className="blog-page-label">
                  Page {current} of {totalPages}
                </span>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={n === current ? "is-active" : ""}
                    onClick={() => goToPage(n)}
                    aria-current={n === current ? "page" : undefined}
                  >
                    {n}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside ref={sideRef} className={`blog-sidebar ${sideIn ? "is-visible" : ""}`}>
            {/* search */}
            <div className="blog-widget" style={{ "--w": 0 }}>
              <h4 className="blog-widget-title no-line">Search</h4>
              <form className="blog-search" onSubmit={handleSearch} role="search">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Search blog posts"
                />
                <button type="submit">Search</button>
              </form>
            </div>

            {/* categories */}
            <div className="blog-widget" style={{ "--w": 1 }}>
              <h4 className="blog-widget-title">Food Categories</h4>
              <ul className="blog-links">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      className={category === c ? "is-active" : ""}
                      onClick={() => pickCategory(c)}
                    >
                      <Chevron /> {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* advertisement – ONLY the image, fully visible */}
            <div className="blog-widget" style={{ "--w": 2 }}>
              <h4 className="blog-widget-title">Advertisement</h4>
              <a href="#order" className="blog-ad" aria-label="Advertisement">
                <img src={adImg} alt="Advertisement" />
              </a>
            </div>

            {/* recent posts */}
            <div className="blog-widget" style={{ "--w": 3 }}>
              <h4 className="blog-widget-title">Recent Posts</h4>
              <ul className="blog-links">
                {recent.map((p) => (
                  <li key={p.id}>
                    <a href={`#${p.id}`}>
                      <Chevron /> {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default BlogMain;