import React from "react";
import { ArrowCounterClockwise, Sparkle } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { DEMO_SITES } from "./demoData";
import { useDemo } from "./DemoContext";

export const currency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
export const preciseCurrency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 });
export const percent = new Intl.NumberFormat("en-GB", { style: "percent", signDisplay: "exceptZero", maximumFractionDigits: 1 });

export function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduceMotion ? 0 : 0.55, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

export function SampleLabel({ concept = false }) {
  const { copy } = useDemo();
  return <span className="sample-label"><Sparkle size={13} weight="fill" aria-hidden="true" />{concept ? copy.concept : copy.sample}</span>;
}

export function SiteSelector({ compact = false }) {
  const { copy, language, siteId, setSiteId } = useDemo();
  return <div className={`site-selector ${compact ? "site-selector-compact" : ""}`} role="group" aria-label={copy.siteSelector}>
    {DEMO_SITES.map((site) => <button type="button" key={site.id} className={site.id === siteId ? "active" : ""} aria-pressed={site.id === siteId} onClick={() => setSiteId(site.id)}>{site.id === "group" && language === "zh" ? copy.allSites : site.name}</button>)}
  </div>;
}

export function DemoFrame({ title, onRestart, children, className = "", compact = false, showConcept = false }) {
  const { copy, site, language } = useDemo();
  const displaySite = site.id === "group" && language === "zh" ? copy.allSites : site.name;
  return <div className={`demo-window ${compact ? "demo-window-compact" : ""} ${className}`}>
    <div className="demo-toolbar">
      <div className="demo-brand"><strong>RNG</strong><span>{title}</span>{showConcept && <SampleLabel concept />}</div>
      <div className="demo-meta"><span>{displaySite}</span><SampleLabel />{onRestart && <button type="button" className="icon-button" onClick={onRestart} aria-label={copy.restart} title={copy.restart}><ArrowCounterClockwise size={16} /></button>}</div>
    </div>
    {children}
  </div>;
}

export function Metric({ label, value, detail, tone = "" }) {
  return <div className={`metric ${tone}`}><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>;
}

export function SparkBars({ values, label }) {
  const max = Math.max(...values);
  const reduceMotion = useReducedMotion();
  return <div className="spark-bars" role="img" aria-label={label}>{values.map((value, index) => <motion.i key={`${index}-${Math.round(value)}`} initial={reduceMotion ? false : { scaleY: 0 }} animate={{ scaleY: value / max }} transition={{ duration: reduceMotion ? 0 : 0.36, delay: index * 0.018, ease: [0.16, 1, 0.3, 1] }} />)}</div>;
}

export function Segmented({ label, options, value, onChange, role = "group" }) {
  return <div className="segmented-wrap"><span>{label}</span><div className="segmented" role={role} aria-label={label}>{Object.entries(options).map(([key, text]) => <button type="button" key={key} className={value === key ? "active" : ""} aria-pressed={role === "group" ? value === key : undefined} role={role === "tablist" ? "tab" : undefined} aria-selected={role === "tablist" ? value === key : undefined} onClick={() => onChange(key)}>{text}</button>)}</div></div>;
}

export function Completion({ done, pending, complete }) {
  return <div className={`completion ${done ? "done" : ""}`} aria-live="polite"><i />{done ? complete : pending}</div>;
}
