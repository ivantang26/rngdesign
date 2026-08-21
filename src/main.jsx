import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AddressBook, ArrowDown, ArrowUpRight, Bank, CalendarBlank, CaretDown,
  ChartLineUp, Check, CheckCircle, Clock, Desktop, DeviceMobile, FileText,
  Gauge, List, LockKey, Megaphone, Package, Receipt, Sparkle, UsersThree,
  Warning, X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CONTENT_CALENDAR, DEMO_SITES, FAQ_KEYS, LOOP_STEPS, MODULES, PNL_ROWS,
  REVENUE_CURVES, ROTA_SHIFTS, SITE_CONFIG, TEXT,
} from "./demoData";
import "./styles.css";

const MODULE_ICONS = { forecast: ChartLineUp, workforce: UsersThree, inventory: Package, finance: Bank, crm: AddressBook, marketing: Megaphone };
const LOOP_ICONS = { forecast: ChartLineUp, rota: UsersThree, inventory: Package, reconcile: Receipt, report: FileText };
const currency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat("en-GB", { style: "percent", signDisplay: "exceptZero", maximumFractionDigits: 1 });

function siteName(site, language) {
  if (site.id === "group") return language === "zh" ? "全部分店" : site.name;
  return site.name;
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reduceMotion ? 0 : 0.58, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

function SampleLabel({ children }) {
  return <span className="sample-label"><Sparkle size={13} weight="fill" aria-hidden="true" />{children}</span>;
}

function SparkBars({ values, label }) {
  const max = Math.max(...values);
  return <div className="spark-bars" role="img" aria-label={label}>{values.map((value, index) => <motion.i key={`${index}-${value}`} initial={{ scaleY: 0 }} animate={{ scaleY: value / max }} transition={{ duration: 0.38, delay: index * 0.018, ease: [0.16, 1, 0.3, 1] }} />)}</div>;
}

function Header({ language, onToggleLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = TEXT[language];
  useEffect(() => {
    const close = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="RNG home">RNG</a>
    <nav className="desktop-nav" aria-label="Primary navigation">{copy.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
    <div className="header-actions">
      <button className="language-button" type="button" onClick={onToggleLanguage}>{copy.language}</button>
      {SITE_CONFIG.bookingUrl && <a className="button button-small" href={SITE_CONFIG.bookingUrl} target="_blank" rel="noreferrer">{copy.book}</a>}
      <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={22} /> : <List size={23} />}</button>
    </div>
    <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      {copy.nav.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      <a href="#product" onClick={() => setMenuOpen(false)}>{copy.explore}</a>
    </motion.nav>}</AnimatePresence>
  </header>;
}

function Metric({ label, value, detail, compact = false }) {
  return <div className={`metric ${compact ? "metric-compact" : ""}`}><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>;
}

function WorkspacePanel({ site, language, className = "" }) {
  const copy = TEXT[language];
  const variance = (site.revenue - site.forecast) / site.forecast;
  return <div className={`workspace-panel ${className}`}>
    <div className="workspace-head"><div><span>{copy.workspace.title}</span><strong>{siteName(site, language)}</strong></div><SampleLabel>{copy.sample}</SampleLabel></div>
    <div className="workspace-primary">
      <div><span>{copy.workspace.revenue}</span><strong>{currency.format(site.revenue)}</strong><small className={variance >= 0 ? "positive" : "negative"}>{percent.format(variance)} {variance >= 0 ? copy.workspace.varianceAhead : copy.workspace.belowForecast}</small></div>
      <SparkBars values={REVENUE_CURVES[site.id]} label={`${site.name} sample revenue curve`} />
    </div>
    <div className="workspace-metrics"><Metric label={copy.workspace.forecast} value={currency.format(site.forecast)} compact /><Metric label={copy.workspace.labour} value={currency.format(site.labourCost)} compact /><Metric label={copy.workspace.gp} value={currency.format(site.grossProfit)} compact /></div>
    <div className="workspace-alerts"><div><Warning size={17} weight="fill" /><span>{site.stockAlerts} {copy.workspace.alerts}</span></div><div><CheckCircle size={17} weight="fill" /><span>{site.approvals} {copy.workspace.approvals}</span></div><small>{site.orders.toLocaleString("en-GB")} {copy.workspace.orders}</small></div>
  </div>;
}

function Hero({ site, language }) {
  const copy = TEXT[language];
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-copy"><SampleLabel>{copy.concept}</SampleLabel><motion.h1 id="hero-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>{copy.hero.title}</motion.h1><p>{copy.hero.body}</p><div className="hero-actions"><a className="button" href="#product">{copy.explore}<ArrowDown size={18} /></a>{SITE_CONFIG.bookingUrl && <a className="text-link" href={SITE_CONFIG.bookingUrl} target="_blank" rel="noreferrer">{copy.book}<ArrowUpRight size={18} /></a>}</div></div>
    <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}><img src="/images/generated/rng-operations-manager.webp" alt={copy.hero.imageAlt} width="1586" height="1024" /><WorkspacePanel site={site} language={language} className="hero-workspace" /></motion.div>
  </section>;
}

function SiteSelector({ selectedSite, onSelect, language }) {
  const copy = TEXT[language];
  return <div className="site-selector" role="group" aria-label={copy.workspace.selector}>{DEMO_SITES.map((site) => <button type="button" key={site.id} className={site.id === selectedSite.id ? "active" : ""} aria-pressed={site.id === selectedSite.id} onClick={() => onSelect(site)}>{siteName(site, language)}</button>)}</div>;
}

function OperationsOverview({ site, setSite, language }) {
  const copy = TEXT[language];
  return <section className="section section-overview" id="product" aria-labelledby="overview-title"><div className="section-shell">
    <div className="section-heading compact-heading"><Reveal><h2 id="overview-title">{copy.workspace.live}</h2></Reveal><SiteSelector selectedSite={site} onSelect={setSite} language={language} /></div>
    <Reveal className="overview-board"><WorkspacePanel site={site} language={language} className="overview-workspace" /><div className="overview-insights"><div className="insight-main"><Gauge size={25} weight="duotone" /><span>{copy.workspace.gp}</span><strong>{percent.format(site.grossProfit / site.revenue)}</strong><small>{siteName(site, language)}</small></div><div className="insight-pair"><Metric label={copy.workspace.alerts} value={String(site.stockAlerts).padStart(2, "0")} detail={language === "zh" ? "需要店舖跟進" : "Need site action"} /><Metric label={copy.workspace.approvals} value={String(site.approvals).padStart(2, "0")} detail={language === "zh" ? "等待負責人" : "Awaiting owners"} /></div></div></Reveal>
  </div></section>;
}

function ConnectedLoop({ language }) {
  const copy = TEXT[language];
  const [active, setActive] = useState("forecast");
  const Icon = LOOP_ICONS[active];
  const [title, body] = copy.loop.details[active];
  return <section className="section loop-section" aria-labelledby="loop-title"><div className="section-shell loop-layout">
    <div className="loop-copy"><Reveal><h2 id="loop-title">{copy.loop.title}</h2></Reveal><Reveal delay={0.05}><p>{copy.loop.body}</p></Reveal></div>
    <Reveal className="loop-console"><div className="loop-rail" role="tablist" aria-label={copy.loop.title}>{LOOP_STEPS.map((step) => { const StepIcon = LOOP_ICONS[step]; return <button key={step} type="button" role="tab" aria-selected={active === step} className={active === step ? "active" : ""} onClick={() => setActive(step)}><StepIcon size={20} /><span>{copy.loop.labels[step]}</span></button>; })}</div>
      <AnimatePresence mode="wait"><motion.div className="loop-detail" key={`${language}-${active}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}><div className="loop-icon"><Icon size={30} weight="duotone" /></div><span>{copy.loop.labels[active]}</span><h3>{title}</h3><p>{body}</p><div className="loop-line"><i /><Check size={17} weight="bold" /></div></motion.div></AnimatePresence>
    </Reveal>
  </div></section>;
}

function ModulePreview({ module, copy }) {
  if (module === "forecast") return <SparkBars values={[42, 55, 48, 71, 68, 82, 76, 91]} label="Sample forecast" />;
  if (module === "workforce") return <div className="mini-shifts"><i /><i /><i /></div>;
  if (module === "inventory") return <div className="mini-stock"><span>82%</span><span>64%</span><span>91%</span></div>;
  if (module === "finance") return <div className="mini-match"><CheckCircle size={22} weight="fill" /><span>{copy.workspace.live}</span></div>;
  if (module === "crm") return <div className="mini-segments"><span>2+ visits</span><span>Local</span></div>;
  return <div className="mini-calendar"><CalendarBlank size={26} /><span>12</span><span>18</span><span>22</span></div>;
}

function PlatformModules({ language }) {
  const copy = TEXT[language];
  const [activeModule, setActiveModule] = useState("forecast");
  return <section className="section modules-section" aria-labelledby="modules-title"><div className="section-shell"><div className="section-heading"><Reveal><h2 id="modules-title">{copy.platform.title}</h2></Reveal><Reveal delay={0.05}><p>{copy.platform.body}</p></Reveal></div><div className="module-grid">
    {MODULES.map((module, index) => { const Icon = MODULE_ICONS[module.id]; const [title, body] = copy.platform.items[module.id]; return <Reveal className={`module-wrap module-${module.size}`} delay={index * 0.035} key={module.id}><button type="button" className={`module-card ${activeModule === module.id ? "active" : ""}`} aria-pressed={activeModule === module.id} onClick={() => setActiveModule(module.id)}><div className="module-top"><Icon size={24} weight="duotone" /><span>{copy.platform.open}</span></div><div><h3>{title}</h3><p>{body}</p></div><ModulePreview module={module.id} copy={copy} /></button></Reveal>; })}
  </div></div></section>;
}

function ForecastSimulator({ site, language }) {
  const copy = TEXT[language];
  const [periodIndex, setPeriodIndex] = useState(0);
  const [promotion, setPromotion] = useState("none");
  const [weather, setWeather] = useState("dry");
  const [footfall, setFootfall] = useState(0);
  const result = useMemo(() => {
    const periodMultiplier = [1, 2, 5][periodIndex];
    const promoMultiplier = { none: 1, standard: 1.07, major: 1.16 }[promotion];
    const weatherMultiplier = { dry: 1, rain: 0.94, hot: 1.05 }[weather];
    const multiplier = promoMultiplier * weatherMultiplier * (1 + footfall / 100);
    const revenue = site.forecast * periodMultiplier * multiplier;
    return { revenue, labour: Math.round(revenue / 42), stock: Math.round(revenue / 6.8), variance: multiplier - 1 };
  }, [footfall, periodIndex, promotion, site.forecast, weather]);
  return <section className="section simulator-section" id="forecast" aria-labelledby="simulator-title"><div className="section-shell simulator-layout">
    <div className="simulator-copy"><SampleLabel>{copy.sample}</SampleLabel><Reveal><h2 id="simulator-title">{copy.simulator.title}</h2></Reveal><Reveal delay={0.05}><p>{copy.simulator.body}</p></Reveal><div className="control-grid">
      <label><span>{copy.simulator.period}</span><select value={periodIndex} onChange={(event) => setPeriodIndex(Number(event.target.value))}>{copy.simulator.periods.map((label, index) => <option value={index} key={label}>{label}</option>)}</select></label>
      <label><span>{copy.simulator.promotion}</span><select value={promotion} onChange={(event) => setPromotion(event.target.value)}>{Object.entries(copy.simulator.promotions).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label><span>{copy.simulator.weather}</span><select value={weather} onChange={(event) => setWeather(event.target.value)}>{Object.entries(copy.simulator.weatherOptions).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label className="range-control"><span>{copy.simulator.footfall}<strong>{footfall > 0 ? `+${footfall}%` : `${footfall}%`}</strong></span><input type="range" min="-15" max="25" step="5" value={footfall} onChange={(event) => setFootfall(Number(event.target.value))} /></label>
    </div></div>
    <Reveal className="simulator-results" delay={0.08}><div className="result-hero"><span>{copy.simulator.projectedRevenue}</span><motion.strong key={Math.round(result.revenue)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{currency.format(result.revenue)}</motion.strong><small className={result.variance >= 0 ? "positive" : "negative"}>{percent.format(result.variance)} {copy.simulator.variance}</small></div><SparkBars values={REVENUE_CURVES[site.id].map((value) => value * (1 + result.variance))} label="Scenario revenue curve" /><div className="result-grid"><Metric label={copy.simulator.labourHours} value={`${result.labour}h`} compact /><Metric label={copy.simulator.stockUnits} value={result.stock.toLocaleString("en-GB")} compact /></div><p className="caveat"><LockKey size={16} />{copy.simulator.caveat}</p></Reveal>
  </div></section>;
}

function RotaDemo({ language }) {
  const copy = TEXT[language];
  const [status, setStatus] = useState("proposed");
  const statusOrder = ["proposed", "approved", "published"];
  return <section className="section rota-section" id="workforce" aria-labelledby="rota-title"><div className="section-shell rota-layout">
    <div className="rota-heading"><Reveal><h2 id="rota-title">{copy.rota.title}</h2></Reveal><Reveal delay={0.05}><p>{copy.rota.body}</p></Reveal><div className="status-switch" role="group" aria-label="Rota status">{statusOrder.map((item) => <button type="button" key={item} className={status === item ? "active" : ""} aria-pressed={status === item} onClick={() => setStatus(item)}>{copy.rota.statuses[item]}</button>)}</div><AnimatePresence mode="wait"><motion.div className={`status-note status-${status}`} key={`${language}-${status}`} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{status === "published" ? <CheckCircle size={20} weight="fill" /> : <Clock size={20} weight="fill" />}<span>{copy.rota.stateCopy[status]}</span></motion.div></AnimatePresence></div>
    <Reveal className="rota-board" delay={0.08}><div className="rota-summary"><Metric label={copy.rota.demand} value="98%" compact /><Metric label={copy.rota.budget} value="£4,520" compact /><Metric label={copy.rota.scheduled} value="£4,380" compact /></div><div className="rota-time"><span>08</span><span>12</span><span>16</span><span>20</span></div><div className="shift-list">{ROTA_SHIFTS.map((shift) => <div className="shift-row" key={shift.name}><div><strong>{shift.name}</strong><span>{shift.role}</span></div><div className="shift-track"><motion.i className={shift.tone} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} style={{ left: `${((shift.start - 8) / 13) * 100}%`, width: `${((shift.end - shift.start) / 13) * 100}%` }} /></div><span>{shift.start}:00</span></div>)}</div></Reveal>
  </div></section>;
}

function ReportTable({ copy }) {
  return <div className="report-table"><div className="report-row report-header"><span /><span>{copy.reports.actual}</span><span>{copy.reports.budget}</span><span>{copy.reports.variance}</span></div>{PNL_ROWS.map((row) => { const variance = row.actual - row.budget; return <div className={`report-row ${row.key === "grossProfit" || row.key === "operatingContribution" ? "total" : ""}`} key={row.key}><strong>{copy.reports.labels[row.key]}</strong><span>{currency.format(row.actual)}</span><span>{currency.format(row.budget)}</span><span className={variance >= 0 ? "positive" : "negative"}>{currency.format(variance)}</span></div>; })}</div>;
}

function InsightList({ items }) {
  return <div className="report-insights">{items.map(([label, value, note]) => <div key={label}><span>{label}</span><strong>{value}</strong><p>{note}</p></div>)}</div>;
}

function MonthlyReports({ language }) {
  const copy = TEXT[language];
  const [tab, setTab] = useState("pnl");
  return <section className="section reports-section" id="reports" aria-labelledby="reports-title"><div className="section-shell"><div className="section-heading"><Reveal><h2 id="reports-title">{copy.reports.title}</h2></Reveal><Reveal delay={0.05}><p>{copy.reports.body}</p></Reveal></div><Reveal className="report-frame">
    <div className="report-sidebar"><div><FileText size={24} weight="duotone" /><span>{copy.reports.preview}</span></div><strong>{copy.reports.month}</strong><SampleLabel>{copy.sample}</SampleLabel><div className="report-tabs" role="tablist" aria-label={copy.reports.preview}>{Object.entries(copy.reports.tabs).map(([id, label]) => <button role="tab" type="button" key={id} aria-selected={tab === id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}>{label}</button>)}</div></div>
    <div className="report-content"><AnimatePresence mode="wait"><motion.div key={`${language}-${tab}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>{tab === "pnl" && <ReportTable copy={copy} />}{tab === "operations" && <InsightList items={copy.reports.operations} />}{tab === "growth" && <InsightList items={copy.reports.growth} />}</motion.div></AnimatePresence><div className="variance-note"><Sparkle size={19} weight="fill" /><p>{copy.reports.explanation}</p></div></div>
  </Reveal></div></section>;
}

function MarketingCms({ language }) {
  const copy = TEXT[language];
  const [device, setDevice] = useState("desktop");
  return <section className="section marketing-section" id="marketing" aria-labelledby="marketing-title"><div className="section-shell marketing-layout">
    <div className="marketing-copy"><Reveal><h2 id="marketing-title">{copy.marketing.title}</h2></Reveal><Reveal delay={0.05}><p>{copy.marketing.body}</p></Reveal><div className="campaign-brief"><Megaphone size={24} weight="duotone" /><div><span>{copy.marketing.objective}</span><strong>{copy.marketing.campaign}</strong></div><dl><div><dt>{copy.marketing.budget}</dt><dd>£2,400</dd></div><div><dt>{copy.marketing.audience}</dt><dd>1,840</dd></div></dl></div><div className="content-calendar"><span>{copy.marketing.calendar}</span><div>{CONTENT_CALENDAR.map((item) => <article key={`${item.day}-${item.channel}`}><strong>{item.day}</strong><span>{item.channel}</span><small>{copy.marketing.statuses[item.status]}</small></article>)}</div></div></div>
    <Reveal className="cms-board" delay={0.08}><div className="cms-head"><span>{copy.marketing.website}</span><div role="group" aria-label="Preview device"><button type="button" aria-pressed={device === "desktop"} className={device === "desktop" ? "active" : ""} onClick={() => setDevice("desktop")}><Desktop size={17} />{copy.marketing.desktop}</button><button type="button" aria-pressed={device === "mobile"} className={device === "mobile" ? "active" : ""} onClick={() => setDevice("mobile")}><DeviceMobile size={17} />{copy.marketing.mobile}</button></div></div><div className={`website-preview ${device}`}><div className="preview-nav"><strong>HARBOUR</strong><span>Menu&nbsp;&nbsp;Locations</span></div><div className="preview-hero"><span>{copy.marketing.campaign}</span><h3>{copy.marketing.previewTitle}</h3><p>{copy.marketing.previewBody}</p><button type="button">{copy.marketing.previewCta}</button></div></div><div className="readiness-list"><strong>{copy.marketing.checklist}</strong><div>{copy.marketing.checks.map((check) => <span key={check}><Check size={15} weight="bold" />{check}</span>)}</div></div></Reveal>
  </div></section>;
}

function RolesSection({ language }) {
  const copy = TEXT[language];
  return <section className="section roles-section" aria-labelledby="roles-title"><div className="section-shell roles-layout"><Reveal className="roles-copy"><h2 id="roles-title">{copy.roles.title}</h2><p>{copy.roles.body}</p><div>{copy.roles.items.map((item) => <span key={item}>{item}</span>)}</div></Reveal><div className="role-images"><Reveal><img src="/images/references/past-uk-glasgow-matcha-counter.webp" alt={copy.roles.imageAltOne} loading="lazy" width="1280" height="960" /></Reveal><Reveal delay={0.08}><img src="/images/references/past-uk-glasgow-matcha-frontage.webp" alt={copy.roles.imageAltTwo} loading="lazy" width="1280" height="960" /></Reveal></div></div></section>;
}

function Faq({ language }) {
  const copy = TEXT[language];
  const [open, setOpen] = useState("concept");
  return <section className="section faq-section" id="faq" aria-labelledby="faq-title"><div className="section-shell faq-layout"><Reveal><h2 id="faq-title">{copy.faq.title}</h2></Reveal><div className="faq-list">{FAQ_KEYS.map((key) => { const [question, answer] = copy.faq.items[key]; const isOpen = open === key; return <article className={isOpen ? "open" : ""} key={key}><h3><button type="button" aria-expanded={isOpen} aria-controls={`faq-${key}`} onClick={() => setOpen(isOpen ? "" : key)}><span>{question}</span><CaretDown size={20} /></button></h3><AnimatePresence initial={false}>{isOpen && <motion.div id={`faq-${key}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><p>{answer}</p></motion.div>}</AnimatePresence></article>; })}</div></div></section>;
}

function FinalCta({ language }) {
  const copy = TEXT[language];
  return <section className="final-cta" aria-labelledby="final-title"><div className="section-shell"><SampleLabel>{copy.concept}</SampleLabel><h2 id="final-title">{copy.final.title}</h2><p>{copy.final.body}</p><a className="button button-light" href="#product">{copy.explore}<ArrowUpRight size={18} /></a></div></section>;
}

function Footer({ language }) {
  const copy = TEXT[language];
  return <footer className="site-footer"><div className="section-shell footer-main"><div><strong>RNG</strong><span>{copy.footer.statement}</span></div><p>{copy.footer.disclaimer}</p><a href="#top">{copy.footer.back}<ArrowUpRight size={16} /></a></div></footer>;
}

function App() {
  const [language, setLanguage] = useState("en");
  const [site, setSite] = useState(DEMO_SITES[0]);
  const copy = TEXT[language];
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-HK" : "en-GB";
    document.title = copy.pageTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", copy.pageDescription);
  }, [copy.pageDescription, copy.pageTitle, language]);
  return <><a className="skip-link" href="#main">{copy.skip}</a><Header language={language} onToggleLanguage={() => setLanguage((value) => value === "en" ? "zh" : "en")} /><main id="main"><Hero site={site} language={language} /><OperationsOverview site={site} setSite={setSite} language={language} /><ConnectedLoop language={language} /><PlatformModules language={language} /><ForecastSimulator site={site} language={language} /><RotaDemo language={language} /><MonthlyReports language={language} /><MarketingCms language={language} /><RolesSection language={language} /><Faq language={language} /><FinalCta language={language} /></main><Footer language={language} /></>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
