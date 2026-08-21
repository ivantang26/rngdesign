import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { FAQ_KEYS, SITE_CONFIG } from "./demoData";
import { useDemo } from "./DemoContext";
import { Reveal } from "./DemoUi";
import {
  CrmDemo, FinanceDemo, ForecastDemo, HeroProductDemo, InventoryDemo,
  MarketingDemo, ReportsDemo, WorkforceDemo,
} from "./ProductDemos";

function validUrl(value) {
  if (!value) return false;
  try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
}

function Header() {
  const { copy, language, setLanguage } = useDemo();
  const [menuOpen, setMenuOpen] = useState(false);
  const hasBooking = validUrl(SITE_CONFIG.bookingUrl);
  useEffect(() => {
    const close = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  return <header className="site-header">
    <a className="brand" href="#top" aria-label="RNG home"><span>R</span>RNG</a>
    <nav className="desktop-nav" aria-label={copy.primaryNav}>{copy.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
    <div className="header-actions">
      <button className="language-button" type="button" onClick={() => setLanguage(language === "en" ? "zh" : "en")}>{copy.language}</button>
      {hasBooking && <a className="button button-small" href={SITE_CONFIG.bookingUrl} target="_blank" rel="noreferrer">{copy.book}</a>}
      <button className="menu-button" type="button" aria-label={menuOpen ? copy.menuClose : copy.menuOpen} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>{menuOpen ? <X size={22} /> : <List size={22} />}</button>
    </div>
    <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{copy.nav.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href="#product-demo" onClick={() => setMenuOpen(false)}>{copy.explore}</a></motion.nav>}</AnimatePresence>
  </header>;
}

function Hero() {
  const { copy } = useDemo();
  const hasBooking = validUrl(SITE_CONFIG.bookingUrl);
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-copy">
      <motion.h1 id="hero-title" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}>{copy.hero.title}</motion.h1>
      <p>{copy.hero.body}</p>
      <div className="hero-actions"><a className="button" href="#product-demo">{copy.explore}<ArrowDown size={18} /></a>{hasBooking && <a className="button button-secondary" href={SITE_CONFIG.bookingUrl} target="_blank" rel="noreferrer">{copy.book}<ArrowRight size={18} /></a>}</div>
    </div>
    <motion.div className="hero-product" initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.72, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}><HeroProductDemo /></motion.div>
  </section>;
}

function ProductCopy({ section, id }) {
  return <Reveal className="story-copy"><span>{section.kicker}</span><h2 id={`${id}-title`}>{section.title}</h2><p>{section.body}</p></Reveal>;
}

function ProductStories() {
  const { copy } = useDemo();
  return <>
    <section className="story story-full" id="forecast" aria-labelledby="forecast-title"><div className="section-shell"><ProductCopy section={copy.forecast} id="forecast" /><Reveal className="stage-backdrop stage-forecast"><ForecastDemo /></Reveal></div></section>
    <section className="story story-split" id="workforce" aria-labelledby="workforce-title"><div className="section-shell story-grid"><Reveal className="stage-backdrop stage-team"><WorkforceDemo /></Reveal><ProductCopy section={copy.workforce} id="workforce" /></div></section>
    <section className="story story-split story-reverse" id="finance" aria-labelledby="finance-title"><div className="section-shell story-grid"><ProductCopy section={copy.finance} id="finance" /><Reveal className="stage-backdrop stage-finance"><FinanceDemo /></Reveal></div></section>
    <section className="story story-full" id="marketing" aria-labelledby="marketing-title"><div className="section-shell"><ProductCopy section={copy.marketing} id="marketing" /><Reveal className="stage-backdrop stage-campaign"><MarketingDemo /></Reveal></div></section>
  </>;
}

function CompactPlatform() {
  const { copy } = useDemo();
  return <section className="platform-section" id="platform" aria-labelledby="platform-title"><div className="section-shell"><Reveal className="platform-heading"><h2 id="platform-title">{copy.compact.heading}</h2><p>{copy.compact.body}</p></Reveal><div className="compact-grid">
    <article aria-labelledby="inventory-title"><div className="compact-copy"><span>{copy.inventory.kicker}</span><h3 id="inventory-title">{copy.inventory.title}</h3></div><InventoryDemo /></article>
    <article aria-labelledby="crm-title"><div className="compact-copy"><span>{copy.crm.kicker}</span><h3 id="crm-title">{copy.crm.title}</h3></div><CrmDemo /></article>
    <article id="reports" aria-labelledby="reports-title"><div className="compact-copy"><span>{copy.reports.kicker}</span><h3 id="reports-title">{copy.reports.title}</h3></div><ReportsDemo /></article>
  </div></div></section>;
}

function Faq() {
  const { copy } = useDemo();
  return <section className="faq-section" aria-labelledby="faq-title"><div className="section-shell faq-layout"><Reveal><h2 id="faq-title">{copy.faq.title}</h2></Reveal><div className="faq-list">{FAQ_KEYS.map((key, index) => { const [question, answer] = copy.faq.items[key]; return <details key={key} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>; })}</div></div></section>;
}

function FinalCta() {
  const { copy } = useDemo();
  return <section className="final-cta"><div className="section-shell"><h2>{copy.cta.title}</h2><p>{copy.cta.body}</p><a className="button button-light" href="#product-demo">{copy.explore}<ArrowRight size={18} /></a></div></section>;
}

function Footer() {
  const { copy } = useDemo();
  return <footer className="site-footer"><div className="section-shell"><div className="footer-brand"><span>R</span><strong>RNG</strong></div><p>{copy.footer}</p><a href="#top">{copy.backTop}</a></div></footer>;
}

export function App() {
  const { copy, language } = useDemo();
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-Hant" : "en-GB";
    document.title = copy.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.pageDescription);
  }, [copy, language]);

  return <><a className="skip-link" href="#main">{copy.skip}</a><Header /><main id="main"><Hero /><ProductStories /><CompactPlatform /><Faq /><FinalCta /></main><Footer /></>;
}
