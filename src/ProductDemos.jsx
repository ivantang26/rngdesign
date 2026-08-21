import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AddressBook, Bank, ChartLineUp, Check, CheckCircle,
  FileText, Package, Receipt, UsersThree, Warning,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import {
  CAMPAIGNS, CRM_SEGMENTS, DEFAULT_SCENARIO, INVENTORY_ITEMS, LOOP_STEPS,
  REPORT_ROWS, REVENUE_CURVES, ROTA_SHIFTS, SETTLEMENTS, getForecastResult,
} from "./demoData";
import { useDemo } from "./DemoContext";
import {
  Completion, DemoFrame, Metric, Segmented, SiteSelector, SparkBars,
  currency, percent, preciseCurrency,
} from "./DemoUi";

const LOOP_ICONS = { forecast: ChartLineUp, rota: UsersThree, inventory: Package, reconcile: Receipt, report: FileText };

export function HeroProductDemo() {
  const { copy, site } = useDemo();
  const [active, setActive] = useState("forecast");
  const variance = (site.revenue - site.forecast) / site.forecast;
  const ActiveIcon = LOOP_ICONS[active];
  const [detailTitle, detailBody] = copy.loop.details[active];

  return <div className="hero-stage stage-backdrop stage-operations" id="product-demo" tabIndex="-1">
    <DemoFrame title={copy.overview.connected} className="hero-demo-window" showConcept>
      <div className="overview-nav"><SiteSelector /><div className="overview-today"><span>{copy.overview.title}</span><strong>18 Jun 2026</strong></div></div>
      <div className="workflow-tabs" role="tablist" aria-label={copy.loop.title}>
        {LOOP_STEPS.map((step) => { const Icon = LOOP_ICONS[step]; return <button type="button" role="tab" aria-selected={active === step} className={active === step ? "active" : ""} key={step} onClick={() => setActive(step)}><Icon size={18} /><span>{copy.loop.labels[step]}</span></button>; })}
      </div>
      <div className="overview-grid">
        <div className="overview-main">
          <div className="overview-revenue"><span>{copy.overview.revenue}</span><motion.strong key={site.revenue} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{currency.format(site.revenue)}</motion.strong><small className={variance >= 0 ? "positive" : "negative"}>{percent.format(variance)} {variance >= 0 ? copy.overview.ahead : copy.overview.below}</small></div>
          <SparkBars values={REVENUE_CURVES[site.id]} label={`${site.name} sample revenue curve`} />
          <div className="overview-metrics"><Metric label={copy.overview.forecast} value={currency.format(site.forecast)} /><Metric label={copy.overview.labour} value={currency.format(site.labourCost)} /><Metric label={copy.overview.gp} value={currency.format(site.grossProfit)} /></div>
        </div>
        <AnimatePresence mode="wait"><motion.aside className="workflow-detail" key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
          <ActiveIcon size={28} weight="duotone" /><span>{copy.loop.labels[active]}</span><h3>{detailTitle}</h3><p>{detailBody}</p><div className="workflow-ready"><Check size={15} weight="bold" />{copy.sample}</div>
        </motion.aside></AnimatePresence>
      </div>
      <div className="overview-footer"><span><Warning size={16} weight="fill" />{site.stockAlerts} {copy.overview.alerts}</span><span><CheckCircle size={16} weight="fill" />{site.approvals} {copy.overview.approvals}</span><small>{site.orders.toLocaleString("en-GB")} {copy.overview.orders}</small></div>
    </DemoFrame>
  </div>;
}

export function ForecastDemo() {
  const { copy, scenario, setScenario, resetScenario, site } = useDemo();
  const result = useMemo(() => getForecastResult(site, scenario), [scenario, site]);
  const changed = JSON.stringify(scenario) !== JSON.stringify(DEFAULT_SCENARIO);
  const update = (field, value) => setScenario((current) => ({ ...current, [field]: value }));

  return <DemoFrame title={copy.forecast.kicker} onRestart={resetScenario}>
    <div className="forecast-demo">
      <div className="demo-controls forecast-controls">
        <label><span>{copy.forecast.period}</span><select value={scenario.period} onChange={(event) => update("period", Number(event.target.value))}>{Object.entries(copy.forecast.periods).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <label><span>{copy.forecast.promotion}</span><select value={scenario.promotion} onChange={(event) => update("promotion", event.target.value)}>{Object.entries(copy.forecast.promotions).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <label><span>{copy.forecast.weather}</span><select value={scenario.weather} onChange={(event) => update("weather", event.target.value)}>{Object.entries(copy.forecast.weatherOptions).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <label className="range-label"><span>{copy.forecast.footfall}<strong>{scenario.footfallChange > 0 ? "+" : ""}{scenario.footfallChange}%</strong></span><input type="range" min="-15" max="25" step="5" value={scenario.footfallChange} onChange={(event) => update("footfallChange", Number(event.target.value))} /></label>
      </div>
      <div className="forecast-output">
        <div className="output-value"><span>{copy.forecast.projected}</span><motion.strong key={Math.round(result.revenue)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{currency.format(result.revenue)}</motion.strong><small className={result.variance >= 0 ? "positive" : "negative"}>{percent.format(result.variance)} {copy.forecast.variance}</small></div>
        <SparkBars values={REVENUE_CURVES[site.id].map((value) => value * (1 + result.variance))} label="Scenario revenue curve" />
        <div className="output-pair"><Metric label={copy.forecast.labourHours} value={`${result.labourHours}h`} /><Metric label={copy.forecast.stock} value={result.stockUnits.toLocaleString("en-GB")} /></div>
        <Completion done={changed} pending={copy.forecast.caveat} complete={copy.forecast.ready} />
      </div>
    </div>
  </DemoFrame>;
}

export function WorkforceDemo() {
  const { copy, site, scenario } = useDemo();
  const [day, setDay] = useState("weekday");
  const [status, setStatus] = useState("proposed");
  const weeklyScenario = { ...scenario, period: 7 };
  const result = getForecastResult(site, weeklyScenario);
  const dayFactor = day === "friday" ? 1.14 : 1;
  const hours = Math.round(result.labourHours * dayFactor);
  const scheduled = Math.round(hours * 12.4);
  const budget = Math.round(hours * 12.8);
  const reset = () => { setDay("weekday"); setStatus("proposed"); };

  return <DemoFrame title={copy.workforce.kicker} onRestart={reset}>
    <div className="workforce-demo">
      <div className="workforce-top"><Segmented label={copy.workforce.day} options={copy.workforce.days} value={day} onChange={setDay} /><Segmented label={copy.workforce.status} options={copy.workforce.statuses} value={status} onChange={setStatus} /></div>
      <div className="workforce-metrics"><Metric label={copy.workforce.coverage} value={day === "friday" ? "96.8%" : "98.4%"} /><Metric label={copy.workforce.budget} value={currency.format(budget)} /><Metric label={copy.workforce.scheduled} value={currency.format(scheduled)} /></div>
      <div className="rota-timeline"><div className="time-axis"><span>08</span><span>12</span><span>16</span><span>20</span></div>{ROTA_SHIFTS.map((shift, index) => <div className="shift-row" key={shift.name}><div><strong>{shift.name}</strong><small>{shift.role}</small></div><div className="shift-track"><motion.i className={shift.tone} animate={{ scaleX: status === "published" ? 1 : status === "approved" ? 0.96 : 0.9 }} style={{ left: `${((shift.start - 8) / 13) * 100}%`, width: `${((shift.end - shift.start) / 13) * 100}%` }} transition={{ delay: index * 0.025 }} /></div></div>)}</div>
      <Completion done={status !== "proposed"} pending={copy.workforce.notes.proposed} complete={copy.workforce.notes[status]} />
    </div>
  </DemoFrame>;
}

export function FinanceDemo() {
  const { copy } = useDemo();
  const [settlementId, setSettlementId] = useState(SETTLEMENTS[1].id);
  const [reviewed, setReviewed] = useState(false);
  const settlement = SETTLEMENTS.find((item) => item.id === settlementId) ?? SETTLEMENTS[0];
  const difference = settlement.received - settlement.expected;
  const reset = () => { setSettlementId(SETTLEMENTS[1].id); setReviewed(false); };

  return <DemoFrame title={copy.finance.kicker} onRestart={reset}>
    <div className="finance-demo">
      <div className="finance-controls"><label><span>{copy.finance.settlement}</span><select value={settlementId} onChange={(event) => { setSettlementId(event.target.value); setReviewed(false); }}>{SETTLEMENTS.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label><button type="button" className="demo-action" onClick={() => setReviewed(true)}>{copy.finance.match}</button></div>
      <div className="reconciliation-grid"><div><span>POS total</span><strong>{preciseCurrency.format(settlement.expected)}</strong></div><div><span>Bank received</span><strong>{preciseCurrency.format(settlement.received)}</strong></div><div><span>{copy.finance.matched}</span><strong>{reviewed ? settlement.matched : settlement.matched - 3}</strong></div><div><span>{copy.finance.variance}</span><strong className={difference === 0 ? "positive" : "negative"}>{preciseCurrency.format(difference)}</strong></div></div>
      <div className="match-lines"><div><CheckCircle size={18} weight="fill" /><span>Card sales batch</span><strong>{preciseCurrency.format(settlement.expected * 0.78)}</strong></div><div><CheckCircle size={18} weight="fill" /><span>Online orders</span><strong>{preciseCurrency.format(settlement.expected * 0.22)}</strong></div></div>
      <Completion done={reviewed} pending={copy.finance.pending} complete={copy.finance.status} />
      {reviewed && difference !== 0 && <p className="fixed-narrative">{copy.finance.explanation}</p>}
    </div>
  </DemoFrame>;
}

export function MarketingDemo() {
  const { copy } = useDemo();
  const [campaignId, setCampaignId] = useState(CAMPAIGNS[0].id);
  const [device, setDevice] = useState("desktop");
  const [approved, setApproved] = useState(false);
  const campaign = CAMPAIGNS.find((item) => item.id === campaignId) ?? CAMPAIGNS[0];
  const reset = () => { setCampaignId(CAMPAIGNS[0].id); setDevice("desktop"); setApproved(false); };

  return <DemoFrame title={copy.marketing.kicker} onRestart={reset}>
    <div className="marketing-demo">
      <div className="marketing-sidebar">
        <label><span>{copy.marketing.campaign}</span><select value={campaignId} onChange={(event) => { setCampaignId(event.target.value); setApproved(false); }}>{CAMPAIGNS.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
        <Segmented label={copy.marketing.device} options={{ desktop: copy.marketing.desktop, mobile: copy.marketing.mobile }} value={device} onChange={setDevice} />
        <dl><div><dt>{copy.marketing.audience}</dt><dd>{campaign.audience}</dd></div><div><dt>Channel</dt><dd>{campaign.channel}</dd></div></dl>
        <div className="readiness"><strong>{copy.marketing.checklist}</strong>{copy.marketing.checks.map((item) => <span key={item}><CheckCircle size={16} weight="fill" />{item}</span>)}</div>
        <button type="button" className="demo-action" onClick={() => setApproved(true)}>{approved ? copy.marketing.approved : copy.marketing.approve}</button>
      </div>
      <div className={`campaign-preview ${device}`}>
        <div className="preview-browser"><span /><span /><span /><small>rng.example/campaign</small></div>
        <div className="preview-page"><div className="preview-nav"><strong>RNG TABLE</strong><span>Menus&nbsp;&nbsp; Locations&nbsp;&nbsp; Book</span></div><div className="preview-copy"><small>{campaign.name}</small><h3>{campaign.headline}</h3><p>Seasonal menus, clear availability and a simple route to the right table.</p><button type="button">View availability</button></div></div>
      </div>
    </div>
    <Completion done={approved} pending={campaign.status === "approved" ? copy.marketing.approved : copy.finance.pending} complete={copy.marketing.approved} />
  </DemoFrame>;
}

export function InventoryDemo() {
  const { copy, scenario, site } = useDemo();
  const [itemId, setItemId] = useState(INVENTORY_ITEMS[0].id);
  const [reviewed, setReviewed] = useState(false);
  const item = INVENTORY_ITEMS.find((entry) => entry.id === itemId) ?? INVENTORY_ITEMS[0];
  const scenarioResult = getForecastResult(site, { ...scenario, period: 7 });
  const demandFactor = Math.max(0.82, 1 + scenarioResult.variance);
  const suggested = Math.max(0, Math.ceil((item.par * demandFactor - item.onHand) / 5) * 5);
  const reset = () => { setItemId(INVENTORY_ITEMS[0].id); setReviewed(false); };

  return <DemoFrame title={copy.inventory.kicker} onRestart={reset} compact>
    <div className="compact-demo inventory-demo">
      <label><span>{copy.inventory.item}</span><select value={itemId} onChange={(event) => { setItemId(event.target.value); setReviewed(false); }}>{INVENTORY_ITEMS.map((entry) => <option value={entry.id} key={entry.id}>{entry.name}</option>)}</select></label>
      <div className="compact-metrics"><Metric label={copy.inventory.onHand} value={`${item.onHand}${item.unit}`} /><Metric label={copy.inventory.suggested} value={`${suggested}${item.unit}`} /><Metric label={copy.inventory.cost} value={currency.format(suggested * item.cost)} /></div>
      <div className="stock-visual"><i style={{ transform: `scaleX(${Math.min(1, item.onHand / item.par)})` }} /></div>
      <button type="button" className="demo-action" onClick={() => setReviewed(true)}>{reviewed ? copy.inventory.reviewed : copy.inventory.review}</button>
    </div>
  </DemoFrame>;
}

export function CrmDemo() {
  const { copy } = useDemo();
  const [mode, setMode] = useState("guest");
  const [segmentId, setSegmentId] = useState(CRM_SEGMENTS.guest[0].id);
  const [prepared, setPrepared] = useState(false);
  const segments = CRM_SEGMENTS[mode];
  const segment = segments.find((item) => item.id === segmentId) ?? segments[0];
  const changeMode = (next) => { setMode(next); setSegmentId(CRM_SEGMENTS[next][0].id); setPrepared(false); };
  const reset = () => { setMode("guest"); setSegmentId(CRM_SEGMENTS.guest[0].id); setPrepared(false); };

  return <DemoFrame title={copy.crm.kicker} onRestart={reset} compact>
    <div className="compact-demo crm-demo">
      <Segmented label="CRM" options={copy.crm.modes} value={mode} onChange={changeMode} />
      <label><span>{copy.crm.segment}</span><select value={segmentId} onChange={(event) => { setSegmentId(event.target.value); setPrepared(false); }}>{segments.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label>
      <div className="audience-count"><AddressBook size={24} weight="duotone" /><strong>{segment.count.toLocaleString("en-GB")}</strong><span>{copy.crm.profiles}</span></div>
      <p>{segment.note}</p>
      <button type="button" className="demo-action" onClick={() => setPrepared(true)}>{prepared ? copy.crm.prepared : copy.crm.prepare}</button>
    </div>
  </DemoFrame>;
}

function ReportContent({ tab, copy }) {
  if (tab === "pnl") return <div className="report-table"><div className="report-row report-head"><span /><span>{copy.reports.actual}</span><span>{copy.reports.budget}</span><span>{copy.reports.variance}</span></div>{REPORT_ROWS.map((row) => { const variance = row.actual - row.budget; return <div className={`report-row ${row.key === "grossProfit" || row.key === "contribution" ? "total" : ""}`} key={row.key}><strong>{copy.reports.labels[row.key]}</strong><span>{currency.format(row.actual)}</span><span>{currency.format(row.budget)}</span><span className={variance >= 0 ? "positive" : "negative"}>{currency.format(variance)}</span></div>; })}</div>;
  const items = tab === "operations" ? copy.reports.operations : copy.reports.growth;
  return <div className="report-summary-list">{items.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>;
}

export function ReportsDemo() {
  const { copy, site, language } = useDemo();
  const [tab, setTab] = useState("pnl");
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const previewRef = useRef(null);
  const hasOpened = useRef(false);
  const reset = () => { setTab("pnl"); setOpen(false); };
  const displaySite = site.id === "group" && language === "zh" ? copy.allSites : site.name;

  useEffect(() => {
    if (!open) {
      if (hasOpened.current) previewRef.current?.focus();
      return undefined;
    }
    hasOpened.current = true;
    closeRef.current?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") { event.preventDefault(); closeRef.current?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return <>
    <DemoFrame title={copy.reports.kicker} onRestart={reset} compact>
      <div className="compact-demo reports-demo">
        <div className="report-title"><div><span>{copy.reports.month}</span><strong>{displaySite}</strong></div><Bank size={23} weight="duotone" /></div>
        <Segmented label={copy.reports.kicker} options={copy.reports.tabs} value={tab} onChange={setTab} role="tablist" />
        <ReportContent tab={tab} copy={copy} />
        <button ref={previewRef} type="button" className="demo-action" onClick={() => setOpen(true)}>{copy.reports.preview}</button>
      </div>
    </DemoFrame>
    {open && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><div className="report-modal" role="dialog" aria-modal="true" aria-labelledby="report-modal-title"><header><div><span>{copy.sample}</span><h2 id="report-modal-title">{copy.reports.month}</h2><p>{displaySite}</p></div><button ref={closeRef} type="button" className="modal-close" onClick={() => setOpen(false)}>{copy.reports.close}</button></header><ReportContent tab={tab} copy={copy} /><p className="fixed-narrative">{copy.reports.explanation}</p><Completion done pending="" complete={copy.reports.ready} /></div></div>}
  </>;
}
