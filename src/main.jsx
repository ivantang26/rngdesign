import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Bag,
  BookOpen,
  CaretDown,
  Heart,
  HouseLine,
  List,
  MagnifyingGlass,
  PaintBrushHousehold,
  ShoppingCart,
  UserCircle,
  X,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import "./styles.css";

const navItems = ["Shop", "Renovation", "Interior Design", "Portfolio", "Inspiration", "About"];

const portfolio = [
  {
    title: "Soft Walnut Apartment",
    type: "Home renovation",
    image: "https://picsum.photos/seed/rng-walnut-apartment/900/1100",
  },
  {
    title: "Calm Studio Storage",
    type: "Small-space planning",
    image: "https://picsum.photos/seed/rng-studio-storage/900/760",
  },
  {
    title: "Cafe With Residential Warmth",
    type: "Commercial interior",
    image: "https://picsum.photos/seed/rng-cafe-interior/900/920",
  },
];

const products = [
  ["Oak Curve Side Table", "Furniture", "$380", "https://picsum.photos/seed/rng-oak-side-table/700/700"],
  ["Linen Shade Floor Lamp", "Lighting", "$220", "https://picsum.photos/seed/rng-linen-lamp/700/700"],
  ["Stone Tray Set", "Decor", "$96", "https://picsum.photos/seed/rng-stone-tray/700/700"],
  ["Warm Wool Rug", "Textiles", "$540", "https://picsum.photos/seed/rng-wool-rug/700/700"],
];

const articles = [
  ["How to plan storage before renovation starts", "A clear way to map daily routines, cabinetry, and awkward corners before work begins."],
  ["Three materials that make white rooms feel warm", "Wood, stone, and fabric choices that keep a minimalist home from feeling empty."],
  ["What to prepare before a design consultation", "Floor plans, photos, budget range, and the questions worth deciding early."],
];

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
      rootMargin: "-24px 0px 0px 0px",
    });
    const sentinel = document.querySelector("#top-sentinel");
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);
  return scrolled;
}

function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();

  return (
    <header className={`glass-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#home" aria-label="RNG Design home">
        <span className="brand-mark">R</span>
        <span>RNG Design</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>
            {item}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button aria-label="Search">
          <MagnifyingGlass size={19} weight="regular" />
        </button>
        <button aria-label="Wishlist">
          <Heart size={19} weight="regular" />
        </button>
        <button aria-label="Cart">
          <ShoppingCart size={19} weight="regular" />
        </button>
        <button className="desktop-only" aria-label="Account">
          <UserCircle size={20} weight="regular" />
        </button>
        <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu">
          <List size={22} weight="regular" />
        </button>
      </div>

      <div className={`mobile-panel ${open ? "open" : ""}`} aria-hidden={!open}>
        <button className="close-button" onClick={() => setOpen(false)} aria-label="Close menu">
          <X size={24} />
        </button>
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setOpen(false)}>
            {item}
          </a>
        ))}
        <a className="mobile-contact" href="#contact" onClick={() => setOpen(false)}>
          Start Enquiry
        </a>
      </div>
    </header>
  );
}

function Reveal({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Home transformation platform</p>
        <h1>Shop, design, and renovate with calm confidence.</h1>
        <p className="hero-text">RNG Design connects curated home products, real portfolios, and renovation guidance in one refined experience.</p>
        <div className="hero-actions">
          <a className="primary-cta" href="#contact">
            Start Enquiry <ArrowRight size={18} />
          </a>
          <a className="secondary-cta" href="#portfolio">
            View Portfolio
          </a>
        </div>
      </div>
      <div className="hero-media">
        <img src="/images/rng-hero-interior.png" alt="Warm minimalist living room with wood shelving and soft seating" />
      </div>
    </section>
  );
}

function PillarSection() {
  const pillars = [
    ["Curated Shop", "Furniture, lighting, decor, textiles, and finishing touches selected for cohesive rooms.", Bag],
    ["Renovation Services", "Planning, quotation, materials, site coordination, and practical delivery support.", HouseLine],
    ["Interior Consultation", "Layout advice, mood boards, styling direction, and custom design recommendations.", PaintBrushHousehold],
  ];

  return (
    <section className="pillars" id="shop">
      <Reveal className="section-copy narrow">
        <h2>A home journey, not a scattered checklist.</h2>
        <p>Move from inspiration to action without separating products, contractors, materials, and design decisions across different vendors.</p>
      </Reveal>
      <div className="pillar-grid">
        {pillars.map(([title, text, Icon]) => (
          <Reveal className="pillar-card" key={title}>
            <Icon size={28} weight="duotone" />
            <h3>{title}</h3>
            <p>{text}</p>
            <a href={title === "Curated Shop" ? "#products" : "#contact"}>
              Explore <ArrowRight size={16} />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services" id="renovation">
      <div className="service-image">
        <img src="https://picsum.photos/seed/rng-renovation-material-board/900/1200" alt="Interior material board with wood, stone, ceramic, and fabric samples" />
      </div>
      <Reveal className="service-copy">
        <h2>Renovation made easier to begin.</h2>
        <p>Customers can share a floor plan, photos, room goals, and budget range. RNG Design turns that into a clear next step.</p>
        <div className="service-list">
          <div>
            <strong>Quotation path</strong>
            <span>Upload requirements and receive practical scope direction.</span>
          </div>
          <div>
            <strong>Design path</strong>
            <span>Book a consultation for layout, finishes, styling, and storage.</span>
          </div>
          <div>
            <strong>Shopping path</strong>
            <span>Match the project look with selected products and materials.</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <Reveal className="section-copy">
        <h2>Real spaces create the trust.</h2>
        <p>Filter-ready project cards show style, room type, and design intent without hiding the work behind decoration.</p>
      </Reveal>
      <div className="portfolio-grid">
        {portfolio.map((item, index) => (
          <Reveal className={`project-card project-${index + 1}`} key={item.title}>
            <img src={item.image} alt={`${item.title} interior project`} />
            <div>
              <span>{item.type}</span>
              <h3>{item.title}</h3>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section className="products" id="products">
      <div className="products-head">
        <h2>Shop the finishing layer.</h2>
        <a href="#shop">
          Browse Shop <ArrowRight size={16} />
        </a>
      </div>
      <div className="product-row">
        {products.map(([name, type, price, image]) => (
          <Reveal className="product-card" key={name}>
            <img src={image} alt={name} />
            <div>
              <span>{type}</span>
              <button aria-label={`Save ${name}`}>
                <Heart size={18} />
              </button>
            </div>
            <h3>{name}</h3>
            <p>{price}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Consultation() {
  const options = useMemo(() => ["Full renovation", "Interior consultation", "Product sourcing", "Commercial project"], []);
  return (
    <section className="consultation" id="contact">
      <Reveal className="consultation-copy">
        <h2>Tell us what your home needs next.</h2>
        <p>Start with a short enquiry. The form supports renovation quotes, design consultations, and product-led styling requests.</p>
        <div className="contact-note">
          <BookOpen size={22} weight="duotone" />
          <span>Prepare photos, floor plan, budget range, and the rooms you want to improve.</span>
        </div>
      </Reveal>
      <form className="enquiry-form">
        <label>
          Name
          <input type="text" name="name" autoComplete="name" />
        </label>
        <label>
          Email
          <input type="email" name="email" autoComplete="email" />
        </label>
        <label>
          Project type
          <select name="projectType" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Message
          <textarea name="message" rows="4" />
        </label>
        <button className="primary-cta" type="submit">
          Send Enquiry <ArrowRight size={18} />
        </button>
      </form>
    </section>
  );
}

function Inspiration() {
  return (
    <section className="inspiration" id="inspiration">
      <Reveal className="section-copy narrow">
        <h2>Guides for better decisions.</h2>
        <p>Short articles help customers understand materials, costs, layout choices, and styling before they commit.</p>
      </Reveal>
      <div className="article-grid">
        {articles.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#inspiration">
              Read guide <ArrowRight size={15} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="about">
      <div>
        <a className="brand" href="#home">
          <span className="brand-mark">R</span>
          <span>RNG Design</span>
        </a>
        <p>Cozy minimalist products, renovation support, and interior direction for better homes.</p>
      </div>
      <div className="footer-links">
        <a href="#shop">Shop</a>
        <a href="#renovation">Renovation</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <div id="top-sentinel" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <PillarSection />
        <Services />
        <Portfolio />
        <Products />
        <Consultation />
        <Inspiration />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
