import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  List,
  MagnifyingGlass,
  Minus,
  Plus,
  ShoppingBag,
  Trash,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import "./styles.css";

const navItems = [
  ["Studio", "#studio"],
  ["Projects", "#projects"],
  ["Shop", "#shop"],
  ["Journal", "#journal"],
];

const projects = [
  {
    id: "walnut",
    number: "01",
    title: "Soft Walnut Apartment",
    location: "Mid-Levels",
    scope: "Full renovation",
    size: "1,180 sq ft",
    completed: "2025",
    category: "residential",
    image: "/images/generated/project-walnut.png",
    alt: "Warm dining room with dark walnut joinery and a paper pendant light",
    description:
      "A home shaped around light, hidden storage and the quiet rituals of everyday living. Dark walnut creates depth while pale limestone keeps the apartment open and calm.",
  },
  {
    id: "harbour",
    number: "02",
    title: "Harbour Light House",
    location: "Pok Fu Lam",
    scope: "Interior design",
    size: "980 sq ft",
    completed: "2025",
    category: "residential",
    image: "/images/generated/project-harbour.png",
    alt: "Pale living room with built-in window seat overlooking Hong Kong harbour",
    description:
      "Soft plaster, pale oak and a continuous window bench turn a compact harbour-facing apartment into a place for long, unhurried mornings.",
  },
  {
    id: "garden",
    number: "03",
    title: "The Garden Studio",
    location: "Sai Kung",
    scope: "Small-space design",
    size: "420 sq ft",
    completed: "2024",
    category: "small-spaces",
    image: "/images/generated/project-garden.png",
    alt: "Compact moss-green studio with a daybed and integrated cabinetry",
    description:
      "A single moss-toned joinery system holds sleeping, cooking, working and storage together, leaving the centre of the studio clear and generous.",
  },
];

const products = [
  {
    id: "arc-table",
    number: "01",
    name: "Arc Side Table",
    material: "Smoked oak",
    price: 3800,
    category: "furniture",
    image: "/images/generated/product-arc-table.png",
    alt: "Round smoked oak side table with intersecting slab legs",
  },
  {
    id: "fold-lamp",
    number: "02",
    name: "Fold Floor Lamp",
    material: "Linen · ash",
    price: 2200,
    category: "lighting",
    image: "/images/generated/product-fold-lamp.png",
    alt: "Tall pleated linen floor lamp on a warm neutral background",
  },
  {
    id: "quiet-tray",
    number: "03",
    name: "Quiet Tray",
    material: "Limestone",
    price: 960,
    category: "objects",
    image: "/images/generated/product-quiet-tray.png",
    alt: "Hand-carved cream limestone tray with an irregular rim",
  },
  {
    id: "nest-chair",
    number: "04",
    name: "Nest Lounge Chair",
    material: "Bouclé · walnut",
    price: 5400,
    category: "furniture",
    image: "/images/generated/product-nest-chair.png",
    alt: "Rounded oatmeal boucle lounge chair with a walnut base",
  },
];

const articles = [
  {
    id: "storage",
    number: "01",
    title: "How to plan storage before renovation starts",
    meta: "Planning · 8 min read",
    excerpt: "Map daily rituals first, then draw the cabinetry.",
    image: "/images/generated/journal-storage.png",
    alt: "Pale oak bedroom storage with an open drawer in morning light",
    body: [
      "Good storage starts with a week in your life, not a wall of cupboards. List what enters each room, where it is used, and what needs to disappear quickly when the day is done.",
      "Group objects by ritual—arriving home, making coffee, getting dressed—then give each ritual one clear zone. This keeps cabinetry useful and prevents small decisions from spreading across the whole plan.",
      "Only then decide depths, drawer types and doors. A calm elevation is the result of good internal planning, never a substitute for it.",
    ],
  },
  {
    id: "materials",
    number: "02",
    title: "Three materials that make white rooms feel warm",
    meta: "Materials · 6 min read",
    excerpt: "Stone, timber and textile bring depth without visual noise.",
    image: "/images/generated/journal-materials.png",
    alt: "Warm material palette of limestone, plaster, bouclé and dark walnut",
    body: [
      "Warm rooms do not need more colour; they need surfaces that respond differently to light. Honed limestone scatters it softly, timber absorbs it, and woven textiles hold small shadows.",
      "Choose one material with movement, one with grain and one with a tactile weave. Keep their undertones related and let variation come from texture rather than contrast.",
      "Sample everything in the actual room. Morning and evening light reveal undertones no showroom can show you.",
    ],
  },
  {
    id: "lighting",
    number: "03",
    title: "The right light for every hour",
    meta: "Lighting · 5 min read",
    excerpt: "Layer low, warm sources before adding more ceiling light.",
    image: "/images/generated/journal-lighting.png",
    alt: "Warm table lamp beside a boucle chair at blue hour",
    body: [
      "A room should change after sunset. Begin with the light you need at eye level—a table lamp by a chair, a shaded pendant over a table—then add quiet ambient light around it.",
      "Use warmer sources in places of rest and slightly clearer light where tasks happen. The difference should be felt, not announced.",
      "Put layers on separate dimmers. Control is what turns a lighting plan into an atmosphere you can actually live with.",
    ],
  },
];

const processSteps = [
  ["01", "Listen", "Share your space, priorities and budget."],
  ["02", "Define", "Align the scope, design direction and programme."],
  ["03", "Make", "Coordinate drawings, materials and trusted trades."],
  ["04", "Settle in", "Style the final layer and hand over with clarity."],
];

const formatPrice = (value) => `HK$${value.toLocaleString("en-HK")}`;

function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}

function ArrowButton({ label, onClick, href, inverse = false, className = "" }) {
  const content = (
    <>
      <span>{label}</span>
      <span className="arrow-box" aria-hidden="true">
        <ArrowRight size={20} />
      </span>
    </>
  );

  if (href) {
    return (
      <a className={`arrow-button ${inverse ? "inverse" : ""} ${className}`} href={href}>
        {content}
      </a>
    );
  }

  return (
    <button className={`arrow-button ${inverse ? "inverse" : ""} ${className}`} onClick={onClick} type="button">
      {content}
    </button>
  );
}

function Header({ cartCount, wishlistCount, onSearch, onCart }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="wordmark" href="#home" aria-label="RNG Design home">
        RNG Design
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-tools">
        <button className="icon-link" type="button" onClick={onSearch} aria-label="Search site">
          <MagnifyingGlass size={18} />
          <span className="tool-label">Search</span>
        </button>
        <a className="icon-link desktop-wishlist" href="#shop" aria-label={`${wishlistCount} saved items`}>
          <Heart size={18} weight={wishlistCount ? "fill" : "regular"} />
          {wishlistCount > 0 && <span className="count-dot">{wishlistCount}</span>}
        </a>
        <button className="icon-link" type="button" onClick={onCart} aria-label={`Open bag with ${cartCount} items`}>
          <ShoppingBag size={18} />
          <span className="tool-label">Bag</span>
          {cartCount > 0 && <span className="count-dot">{cartCount}</span>}
        </button>
        <button className="mobile-menu-button" type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <List size={22} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
          >
            <div className="mobile-menu-top">
              <span className="wordmark">RNG Design</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {navItems.map(([label, href], index) => (
                <a key={label} href={href} onClick={() => setMobileOpen(false)}>
                  <span>0{index + 1}</span>
                  {label}
                </a>
              ))}
            </nav>
            <a className="mobile-project-link" href="#contact" onClick={() => setMobileOpen(false)}>
              Start a project <ArrowRight size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="kicker">Hong Kong · Est. 2014</p>
        <h1>Spaces with a point of view.</h1>
        <p className="hero-lede">Interior design, renovation and objects—considered as one complete home.</p>
        <div className="hero-actions">
          <a className="primary-button" href="#contact">
            Start a project
          </a>
          <a className="square-link" href="#projects" aria-label="Explore our projects">
            <ArrowRight size={22} />
          </a>
        </div>
        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <span>/</span>
          <span>08</span>
        </div>
      </div>
      <motion.figure
        className="hero-image"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.15, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/images/generated/hero-residence.png" alt="Warm contemporary living room with walnut shelving and limestone furniture" />
        <figcaption>RNG residence · Mid-Levels</figcaption>
      </motion.figure>
    </section>
  );
}

function StudioSection() {
  const services = [
    ["01", "Interior design", "Layouts, material palettes and rooms shaped around the way you live."],
    ["02", "Renovation", "Clear scope, trusted trades and thoughtful delivery from first drawing to final detail."],
    ["03", "Objects", "A considered edit of furniture, lighting and objects that completes the room."],
  ];

  return (
    <section className="studio-section section-shell" id="studio">
      <Reveal className="studio-heading">
        <p className="kicker">One home. One vision.</p>
        <h2>One vision,<br />end to end.</h2>
        <ArrowButton label="Discover our approach" href="#process" />
      </Reveal>
      <div className="service-columns">
        {services.map(([number, title, text], index) => (
          <Reveal className="service-item" delay={index * 0.08} key={number}>
            <span className="editorial-number">{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="studio-image">
        <img src="/images/generated/material-still-life.png" alt="Limestone, dark walnut, linen and a handmade ceramic bowl" />
      </Reveal>
    </section>
  );
}

function FeaturedProject({ onOpen }) {
  const project = projects[0];
  return (
    <section className="featured-project" aria-labelledby="featured-title">
      <Reveal className="featured-image">
        <img src={project.image} alt={project.alt} />
      </Reveal>
      <Reveal className="featured-copy">
        <p className="kicker">Featured project</p>
        <span className="hero-number">01</span>
        <h2 id="featured-title">The quiet apartment</h2>
        <p>{project.description}</p>
        <dl className="project-facts">
          <div><dt>Location</dt><dd>{project.location}</dd></div>
          <div><dt>Scope</dt><dd>{project.scope}</dd></div>
          <div><dt>Size</dt><dd>{project.size}</dd></div>
          <div><dt>Completed</dt><dd>{project.completed}</dd></div>
        </dl>
        <ArrowButton label="View the residence" onClick={() => onOpen(project)} />
      </Reveal>
    </section>
  );
}

function ProjectsSection({ onOpen }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? projects : projects.filter((project) => project.category === filter);
  const filters = [["all", "All"], ["residential", "Residential"], ["small-spaces", "Small spaces"]];

  return (
    <section className="projects-section section-shell" id="projects">
      <div className="section-heading-row">
        <Reveal>
          <p className="kicker">Selected homes</p>
          <h2>Rooms with their<br />own rhythm.</h2>
        </Reveal>
        <div className="text-filters" role="group" aria-label="Filter projects">
          {filters.map(([value, label]) => (
            <button
              className={filter === value ? "active" : ""}
              key={value}
              onClick={() => setFilter(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <motion.div className={`project-gallery count-${filtered.length}`} layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.button
              className={`gallery-project gallery-project-${index + 1}`}
              key={project.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.4 }}
              onClick={() => onOpen(project)}
              type="button"
            >
              <span className="gallery-image"><img src={project.image} alt={project.alt} /></span>
              <span className="gallery-meta">
                <span className="editorial-number">{project.number}</span>
                <span>
                  <strong>{project.title}</strong>
                  <small>{project.location} · {project.scope}</small>
                </span>
                <ArrowUpRight className="gallery-arrow" size={20} />
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function ShopSection({ wishlist, onToggleWishlist, onAdd }) {
  const [category, setCategory] = useState("all");
  const categories = [["all", "All"], ["furniture", "Furniture"], ["lighting", "Lighting"], ["objects", "Objects"]];
  const visible = category === "all" ? products : products.filter((product) => product.category === category);

  return (
    <section className="shop-section" id="shop">
      <div className="section-shell">
        <div className="section-heading-row shop-heading">
          <Reveal>
            <p className="kicker">The edit</p>
            <h2>Objects worth<br />living with.</h2>
          </Reveal>
          <div className="text-filters" role="group" aria-label="Filter products">
            {categories.map(([value, label]) => (
              <button className={category === value ? "active" : ""} key={value} onClick={() => setCategory(value)} type="button">
                {label}
              </button>
            ))}
          </div>
        </div>

        <motion.div className={`product-grid count-${visible.length}`} layout>
          <AnimatePresence mode="popLayout">
            {visible.map((product, index) => {
              const saved = wishlist.includes(product.id);
              return (
                <motion.article
                  className={`product product-${index + 1}`}
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="product-image"><img src={product.image} alt={product.alt} /></div>
                  <div className="product-title-row">
                    <span className="editorial-number">{product.number}</span>
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.material}</p>
                    </div>
                    <button
                      className={`save-button ${saved ? "saved" : ""}`}
                      onClick={() => onToggleWishlist(product)}
                      type="button"
                      aria-label={`${saved ? "Remove" : "Save"} ${product.name}`}
                    >
                      <Heart size={21} weight={saved ? "fill" : "regular"} />
                    </button>
                  </div>
                  <div className="product-buy-row">
                    <span>{formatPrice(product.price)}</span>
                    <button type="button" onClick={() => onAdd(product)}>Add</button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="process-section" id="process">
      <div className="process-intro section-shell">
        <Reveal className="process-heading">
          <p className="kicker">How we work</p>
          <h2>From first thought<br />to final handover.</h2>
        </Reveal>
        <Reveal className="process-image">
          <img src="/images/generated/process-drawing.png" alt="Designer reviewing a floor plan with stone, timber and textile samples" />
        </Reveal>
      </div>
      <div className="process-steps section-shell" role="tablist" aria-label="Design process">
        {processSteps.map(([number, title, text], index) => (
          <button
            className={active === index ? "active" : ""}
            key={number}
            onClick={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
            role="tab"
            aria-selected={active === index}
            type="button"
          >
            <span className="editorial-number">{number}</span>
            <strong>{title}</strong>
            <span>{text}</span>
          </button>
        ))}
      </div>
      <div className="testimonial">
        <blockquote>“They made every difficult decision feel calm—and the finished home still feels completely ours.”</blockquote>
        <div>
          <cite>Maya & Leon · Mid-Levels</cite>
          <a href="#contact" aria-label="Start the conversation"><ArrowRight size={28} /></a>
        </div>
      </div>
    </section>
  );
}

function JournalSection({ onOpen }) {
  return (
    <section className="journal-section section-shell" id="journal">
      <div className="journal-heading">
        <Reveal>
          <p className="kicker">Notes on living</p>
          <h2>Ideas for making<br />better rooms.</h2>
        </Reveal>
        <p>Materials, planning and practical guidance from the studio.</p>
      </div>
      <div className="journal-grid">
        {articles.map((article, index) => (
          <Reveal className={`journal-story story-${index + 1}`} key={article.id}>
            <button className="story-image" type="button" onClick={() => onOpen(article)}>
              <img src={article.image} alt={article.alt} />
            </button>
            <div className="story-copy">
              <span className="editorial-number">{article.number}</span>
              <div>
                <h3>{article.title}</h3>
                <p className="story-meta">{article.meta}</p>
                {index === 0 && <p className="story-excerpt">{article.excerpt}</p>}
                <button type="button" onClick={() => onOpen(article)}>Read story <ArrowRight size={16} /></button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ onSuccess }) {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    setSubmitted(true);
    onSuccess("Enquiry received — we’ll reply within two working days.");
    event.currentTarget.reset();
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-image">
        <img src="/images/generated/enquiry-materials.png" alt="Walnut and limestone samples beside a floor plan in morning light" />
      </div>
      <Reveal className="contact-copy">
        <p className="kicker">Begin a project</p>
        <h2>Let’s make room<br />for what matters.</h2>
        <p>Tell us a little about your space. We’ll reply within two working days with the clearest next step.</p>
      </Reveal>
      <form className="enquiry-form" onSubmit={onSubmit}>
        <label>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Project type</span>
          <select name="projectType" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>Full renovation</option>
            <option>Interior design</option>
            <option>Small-space planning</option>
            <option>Product sourcing</option>
          </select>
        </label>
        <label>
          <span>Budget range</span>
          <select name="budget" defaultValue="" required>
            <option value="" disabled>Select range</option>
            <option>Below HK$500k</option>
            <option>HK$500k–1m</option>
            <option>HK$1m–2m</option>
            <option>HK$2m+</option>
          </select>
        </label>
        <label className="full-field">
          <span>Tell us about your space</span>
          <textarea name="message" rows="3" required />
        </label>
        <button className="submit-button" type="submit">
          <span>{submitted ? "Send another enquiry" : "Send enquiry"}</span>
          <span><ArrowRight size={22} /></span>
        </button>
      </form>
    </section>
  );
}

function Footer({ onSuccess }) {
  const onNewsletter = (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    event.currentTarget.reset();
    onSuccess("You’re on the list — notes will arrive occasionally.");
  };

  return (
    <footer className="site-footer">
      <div className="footer-nav">
        {navItems.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
      </div>
      <div className="footer-contact">
        <span>Visit by appointment · Wong Chuk Hang, Hong Kong</span>
        <a href="mailto:hello@rngdesign.hk">hello@rngdesign.hk</a>
      </div>
      <div className="footer-lower">
        <span className="footer-wordmark">RNG Design</span>
        <form onSubmit={onNewsletter}>
          <label htmlFor="newsletter">Notes, occasionally</label>
          <div>
            <input id="newsletter" type="email" placeholder="Email address" aria-label="Email address" required />
            <button type="submit" aria-label="Subscribe"><ArrowRight size={20} /></button>
          </div>
        </form>
        <div className="social-links">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">Pinterest</a>
        </div>
      </div>
      <div className="footer-legal"><span>© 2026 RNG Design</span><a href="#home">Back to top ↑</a></div>
    </footer>
  );
}

function SearchOverlay({ open, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const results = useMemo(() => {
    const all = [
      ...projects.map((item) => ({ type: "Project", title: item.title, detail: `${item.location} · ${item.scope}`, item })),
      ...products.map((item) => ({ type: "Object", title: item.name, detail: `${item.material} · ${formatPrice(item.price)}`, item })),
      ...articles.map((item) => ({ type: "Journal", title: item.title, detail: item.meta, item })),
    ];
    if (!query.trim()) return all.slice(0, 6);
    const normalized = query.toLowerCase();
    return all.filter((result) => `${result.type} ${result.title} ${result.detail}`.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    if (!open) setQuery("");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay search-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Search RNG Design">
          <button className="overlay-backdrop" onClick={onClose} aria-label="Close search" />
          <motion.div className="search-panel" initial={{ y: -36 }} animate={{ y: 0 }} exit={{ y: -36 }}>
            <div className="search-input-row">
              <MagnifyingGlass size={24} />
              <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, objects and notes" />
              <button type="button" onClick={onClose} aria-label="Close search"><X size={24} /></button>
            </div>
            <div className="search-results">
              <p>{query ? `${results.length} results` : "Suggested"}</p>
              {results.length ? results.map((result) => (
                <button key={`${result.type}-${result.item.id}`} type="button" onClick={() => onSelect(result)}>
                  <span>{result.type}</span>
                  <strong>{result.title}</strong>
                  <small>{result.detail}</small>
                  <ArrowUpRight size={18} />
                </button>
              )) : <div className="empty-search">Nothing found. Try “walnut”, “lighting” or “storage”.</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CartDrawer({ open, onClose, cart, onChange, onCheckout }) {
  const items = cart.map((entry) => ({ ...entry, product: products.find((product) => product.id === entry.id) }));
  const subtotal = items.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="overlay-backdrop" onClick={onClose} aria-label="Close bag" />
          <motion.aside className="cart-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} role="dialog" aria-modal="true" aria-label="Shopping bag">
            <div className="drawer-header">
              <div><span className="kicker">Your selection</span><h2>Bag</h2></div>
              <button type="button" onClick={onClose} aria-label="Close bag"><X size={24} /></button>
            </div>
            {items.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={32} />
                <h3>Your bag is quiet.</h3>
                <p>Add a considered object from the edit.</p>
                <button type="button" onClick={onClose}>Continue browsing</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map(({ product, quantity }) => (
                    <div className="cart-item" key={product.id}>
                      <img src={product.image} alt="" />
                      <div>
                        <h3>{product.name}</h3>
                        <p>{product.material}</p>
                        <span>{formatPrice(product.price)}</span>
                        <div className="quantity-control">
                          <button type="button" onClick={() => onChange(product.id, quantity - 1)} aria-label={`Reduce ${product.name} quantity`}><Minus size={14} /></button>
                          <span>{quantity}</span>
                          <button type="button" onClick={() => onChange(product.id, quantity + 1)} aria-label={`Increase ${product.name} quantity`}><Plus size={14} /></button>
                        </div>
                      </div>
                      <button className="remove-item" type="button" onClick={() => onChange(product.id, 0)} aria-label={`Remove ${product.name}`}><Trash size={18} /></button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
                  <p>Delivery is calculated after we confirm your Hong Kong address.</p>
                  <button className="primary-button" type="button" onClick={onCheckout}>Request checkout</button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContentModal({ item, type, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div className="overlay content-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="overlay-backdrop" onClick={onClose} aria-label="Close" />
          <motion.div className={`content-modal ${type}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} role="dialog" aria-modal="true" aria-label={item.title}>
            <button className="modal-close" type="button" onClick={onClose} aria-label="Close"><X size={24} /></button>
            <img src={item.image} alt={item.alt} />
            <div className="modal-copy">
              <p className="kicker">{type === "project" ? `${item.location} · ${item.scope}` : item.meta}</p>
              <h2>{item.title}</h2>
              {type === "project" ? (
                <>
                  <p>{item.description}</p>
                  <dl className="project-facts">
                    <div><dt>Size</dt><dd>{item.size}</dd></div>
                    <div><dt>Completed</dt><dd>{item.completed}</dd></div>
                  </dl>
                  <a className="primary-button" href="#contact" onClick={onClose}>Plan a similar project</a>
                </>
              ) : (
                <article>{item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div className="toast" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} role="status">
          <Check size={18} weight="bold" /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [project, setProject] = useState(null);
  const [article, setArticle] = useState(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const modalOpen = searchOpen || cartOpen || project || article;

  const notify = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 3200);
  };

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(modalOpen));
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setCartOpen(false);
        setProject(null);
        setArticle(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { id: product.id, quantity: 1 }];
    });
    notify(`${product.name} added to your bag.`);
  };

  const changeQuantity = (id, quantity) => {
    setCart((current) => quantity <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const toggleWishlist = (product) => {
    const saved = wishlist.includes(product.id);
    setWishlist((current) => saved ? current.filter((id) => id !== product.id) : [...current, product.id]);
    notify(saved ? `${product.name} removed from saved items.` : `${product.name} saved.`);
  };

  const selectSearchResult = (result) => {
    setSearchOpen(false);
    if (result.type === "Project") setProject(result.item);
    if (result.type === "Journal") setArticle(result.item);
    if (result.type === "Object") {
      document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" });
      notify(`${result.item.name} is in The Edit.`);
    }
  };

  return (
    <>
      <Header cartCount={cartCount} wishlistCount={wishlist.length} onSearch={() => setSearchOpen(true)} onCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <StudioSection />
        <FeaturedProject onOpen={setProject} />
        <ProjectsSection onOpen={setProject} />
        <ShopSection wishlist={wishlist} onToggleWishlist={toggleWishlist} onAdd={addToCart} />
        <ProcessSection />
        <JournalSection onOpen={setArticle} />
        <ContactSection onSuccess={notify} />
      </main>
      <Footer onSuccess={notify} />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onSelect={selectSearchResult} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onChange={changeQuantity}
        onCheckout={() => {
          setCartOpen(false);
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          notify("Tell us your delivery details in the enquiry form.");
        }}
      />
      <ContentModal item={project} type="project" onClose={() => setProject(null)} />
      <ContentModal item={article} type="article" onClose={() => setArticle(null)} />
      <Toast message={toast} />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
