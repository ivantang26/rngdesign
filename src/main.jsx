import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  CaretDown,
  ChatCircleText,
  Check,
  Clock,
  MapPin,
  Phone,
  Storefront,
  TrendUp,
  User,
  Wrench,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import "./styles.css";

const SITE_CONFIG = {
  whatsappNumber: "",
  phoneDisplay: "",
  phoneHref: "",
  email: "",
  wechatId: "",
  wechatQr: "",
  companyName: "[Ltd 名待補] trading as RNG",
  media: {
    hero: "",
    caseStages: ["", "", "", ""],
    founder: "",
  },
};

const WHATSAPP_MESSAGE = {
  zh: "你好 Tony，我喺 RNG 網站見到你。我間舖喺＿＿，想傾下＿＿",
  en: "Hi Tony, I found you through the RNG website. My shop is in __, and I would like to talk about __.",
};

const COPY = {
  zh: {
    pageTitle: "RNG｜開舖・旺舖・慳人手｜Leeds 餐飲舖項目拍檔",
    pageDescription: "自己開過舖嘅餐飲項目拍檔，幫你開新店、執靚間舖同慳人手。Leeds 出發，數碼項目全國都做。",
    skip: "跳到主要內容",
    brandTagline: "開舖・旺舖・慳人手",
    langLabel: "EN",
    nav: [
      ["真店", "#case"],
      ["點樣行", "#process"],
      ["三樣嘢", "#services"],
      ["Tony", "#about"],
      ["FAQ", "#faq"],
    ],
    whatsappShort: "WhatsApp 我",
    hero: {
      eyebrow: "Leeds 餐飲舖項目拍檔",
      title: "開舖、旺舖、慳人手——搵個自己開過舖嘅人，一手幫你搞掂。",
      subtitle: "獨立餐飲老闆嘅項目拍檔｜Leeds 出發・digital 全國",
      stats: ["8 週開店", "86% 毛利", "website＋app 自己 build"],
      cta: "WhatsApp 我・免費 30 分鐘上門診斷",
      reassurance: "唔啱做唔會硬 sell",
      proof: "真人・真舖・真數字",
      photoLabel: "M+ 營業中實相",
      photoPending: "真相待補",
      scroll: "睇我做過嘅真店",
    },
    caseStudy: {
      eyebrow: "01 · 真店證據",
      title: "唔講概念，睇我自己行過嘅每一步。",
      body: "呢兩間舖由零到開門係我自己做嘅：搵舖、談 lease、8–9 週裝修、品牌、餐牌、POS、website、app、請人、每個月自己睇 P&L。你間舖嘅每一步，我都行過。",
      stages: ["空殼", "裝修中", "完工", "營業中"],
      imagePending: "M+ 真相待補",
      note: "相大過字，因為做過比講過更有說服力。",
    },
    process: {
      eyebrow: "02 · 點樣行",
      title: "每一步講清楚，你隨時知錢用咗去邊。",
      steps: [
        ["01", "睇舖傾偈", "免費，先睇清楚最痛嗰樣。"],
        ["02", "出計劃", "一條 timeline、一份預算、固定費。"],
        ["03", "落地", "按 50 / 30 / 20 分期，唔估鐘。"],
        ["04", "開張跟數", "30–60–90 日睇營運同數字。"],
        ["05", "長期夥伴", "要先再做，唔綁無謂服務。"],
      ],
      responsibility: "工程由合資格承建商承接及負責；我係你嘅單一負責窗口。",
      report: "每星期你收一頁報告——使咗幾多、去到邊、下週做乜。",
    },
    services: {
      eyebrow: "03 · 三樣嘢",
      title: "由你而家最痛嗰樣開始。",
      intro: "唔使一次過買晒。免費睇舖後，我會先講清楚咩要做、咩可以遲啲。",
      items: [
        {
          number: "01",
          title: "執靚間舖",
          problem: "舖殘咗？生意跌咗？客搵唔到你？",
          answer: "翻新＋餐牌＋Google＋website 一次過執好。",
          price: "Fixed fee・免費診斷後報實價",
        },
        {
          number: "02",
          title: "開新店／接手",
          problem: "簽咗舖唔知點開始？",
          answer: "由空殼到開門，一條 timeline 一份預算搞掂。",
          price: "Fixed fee・免費傾完先報價",
        },
        {
          number: "03",
          title: "慳人手",
          problem: "電話接到漏單？",
          answer: "AI 接單、訂座、報表，裝好自己行（全國都做）。",
          price: "Setup＋月費",
        },
      ],
      qualifier: "有真項目、有預算，先約——我哋唔做齋傾。",
      cta: "俾我睇下你間舖",
    },
    about: {
      eyebrow: "04 · 真人負責",
      title: "我係 Tony。自己落過場，先知老闆最怕漏咩。",
      body: "我自己由零開始做過兩間舖，搵舖、裝修、品牌、餐牌、POS、website、app、請人同每月 P&L 都親手行過。RNG 唔係企喺旁邊俾意見；我會幫你將預算、時間表同每個合作團隊拉返埋一條線，直到間舖開門、營運同數字行順。",
      location: "Leeds 地面・digital 全國",
      portrait: "Tony 店內半身真相",
      portraitPending: "真人相待補",
    },
    boundaries: {
      eyebrow: "05 · 三樣我哋唔做",
      title: "信任由界線清楚開始。",
      items: [
        ["唔係承建商", "工程由合資格承建商承接同負責。"],
        ["唔代你決定開唔開", "盤生意係你嘅，我會俾你睇清風險同數字。"],
        ["唔賣你唔需要嘅嘢", "計劃書寫明先做乜、後做乜、唔使做乜。"],
      ],
    },
    faq: {
      eyebrow: "06 · 常見問題",
      title: "傾之前，先答你最實際嗰四樣。",
      items: [
        ["收幾錢？", "免費上門診斷後報實價，全部 fixed fee 分期，冇時薪冇隱藏收費。"],
        ["邊個施工？", "合資格承建商同專業團隊；我負責設計、預算、時間表、全程統籌。"],
        ["你哋喺邊？", "Leeds 出發北英地面；網站、系統、AI 全國。"],
        ["我間舖好細，做唔做？", "做。分階段買，由最痛嗰樣開始。"],
      ],
    },
    finalCta: {
      eyebrow: "免費 30 分鐘上門診斷",
      title: "你講間舖最頭痛嗰樣，我先幫你睇清楚。",
      body: "唔啱做，我會直接講。啱做先出 fixed-fee 計劃。",
      cta: "WhatsApp Tony",
    },
    footer: {
      phone: "電話",
      wechat: "微信",
      email: "Email",
      pending: "資料待補",
      qr: "打開微信 QR",
      privacy: "私隱",
      terms: "條款",
      privacyText: "RNG 只會用你主動透過 WhatsApp、電話、微信或 email 提供嘅資料回覆查詢，唔會出售個人資料。正式版本待公司資料確認後補上。",
      termsText: "網站內容只供一般參考；任何項目範圍、費用、時間表同責任，以雙方簽署嘅計劃書及合約為準。",
      backToTop: "返頁頂",
      stickyLabel: "免費上門診斷",
    },
    qrModal: {
      title: "微信搵我",
      pending: "微信 QR 待補",
      hint: "Tony 提供微信 ID 後，將 QR 圖放入網站設定即可。",
      close: "關閉",
    },
  },
  en: {
    pageTitle: "RNG — Open, Upgrade & Automate Your Shop, Leeds",
    pageDescription: "A hands-on partner for independent hospitality owners opening, upgrading or automating a shop. Leeds on site, digital projects nationwide.",
    skip: "Skip to main content",
    brandTagline: "Open · Upgrade · Automate",
    langLabel: "中",
    nav: [
      ["Real shop", "#case"],
      ["Process", "#process"],
      ["What I do", "#services"],
      ["Tony", "#about"],
      ["FAQ", "#faq"],
    ],
    whatsappShort: "WhatsApp me",
    hero: {
      eyebrow: "Hospitality project partner · Leeds",
      title: "One partner to open, upgrade and automate your shop — built by someone who runs his own.",
      subtitle: "For independent hospitality owners｜Leeds on site・digital nationwide",
      stats: ["Open in 8 weeks", "86% gross margin", "Website＋app built in-house"],
      cta: "WhatsApp me・free 30-minute shop visit",
      reassurance: "If I am not the right fit, I will say so",
      proof: "A real person・real shops・real numbers",
      photoLabel: "M+ open for business",
      photoPending: "Real photo pending",
      scroll: "See the shops I have built",
    },
    caseStudy: {
      eyebrow: "01 · Real-world proof",
      title: "No theory. I have walked every step myself.",
      body: "I built these two shops from zero to opening: site search, lease negotiation, an 8–9 week fit-out, brand, menu, POS, website, app, hiring and the monthly P&L. I have already walked every step your shop will take.",
      stages: ["Empty shell", "Fit-out", "Finished", "Trading"],
      imagePending: "M+ real photo pending",
      note: "The photographs lead because doing the work matters more than describing it.",
    },
    process: {
      eyebrow: "02 · How it works",
      title: "A clear route from first visit to opening day.",
      steps: [
        ["01", "Visit and listen", "Free. We identify the most urgent problem first."],
        ["02", "Build the plan", "One timeline, one budget and a fixed fee."],
        ["03", "Deliver", "Pay in 50 / 30 / 20 stages, never by the hour."],
        ["04", "Open and measure", "Review operations and numbers at 30–60–90 days."],
        ["05", "Stay useful", "Continue only where the business needs it."],
      ],
      responsibility: "Qualified contractors carry out and take responsibility for construction; I remain your single point of contact.",
      report: "Every week you receive one page: money spent, current status and next week’s work.",
    },
    services: {
      eyebrow: "03 · Three ways I help",
      title: "Start with the problem costing you most.",
      intro: "You do not need to buy everything at once. After the free visit, I will separate what matters now from what can wait.",
      items: [
        {
          number: "01",
          title: "Upgrade your shop",
          problem: "Tired space? Falling trade? Hard to find online?",
          answer: "Fit-out, menu, Google and website fixed as one joined-up project.",
          price: "Fixed fee・firm quote after the free visit",
        },
        {
          number: "02",
          title: "Open or take over",
          problem: "Signed the lease and not sure where to start?",
          answer: "From empty shell to open doors with one timeline and one budget.",
          price: "Fixed fee・quote after a free conversation",
        },
        {
          number: "03",
          title: "Reduce admin",
          problem: "Missing orders while the phone keeps ringing?",
          answer: "AI ordering, bookings and reporting that keep working after setup.",
          price: "Setup＋monthly fee",
        },
      ],
      qualifier: "Real project and real budget required — I do not sell open-ended consultancy.",
      cta: "Show me your shop",
    },
    about: {
      eyebrow: "04 · Founder led",
      title: "I’m Tony. Running my own shops taught me what owners cannot afford to miss.",
      body: "I have built two shops from zero, handling the site search, fit-out, brand, menu, POS, website, app, hiring and monthly P&L. RNG is not advice from the sidelines. I bring the budget, timeline and specialist teams onto one line, then stay close until the doors are open and the operation is working.",
      location: "Leeds on site・digital nationwide",
      portrait: "Tony inside his own shop",
      portraitPending: "Founder photo pending",
    },
    boundaries: {
      eyebrow: "05 · Three things I do not do",
      title: "Trust starts with clear boundaries.",
      items: [
        ["I am not the contractor", "Qualified contractors carry out and take responsibility for construction."],
        ["I will not decide whether you should open", "It is your business. I make the risks and numbers clear."],
        ["I will not sell work you do not need", "The plan states what comes first, what comes later and what to skip."],
      ],
    },
    faq: {
      eyebrow: "06 · Questions",
      title: "The four practical answers owners ask for first.",
      items: [
        ["What does it cost?", "After the free shop visit, I give you a firm price. Every project uses staged fixed fees, with no hourly billing or hidden charges."],
        ["Who carries out construction?", "Qualified contractors and specialist teams. I coordinate design, budget, programme and delivery."],
        ["Where do you work?", "Leeds and the North of England on site; websites, systems and AI nationwide."],
        ["My shop is small. Will you take it on?", "Yes. Work can be phased, starting with the problem that hurts most."],
      ],
    },
    finalCta: {
      eyebrow: "Free 30-minute shop visit",
      title: "Tell me what is costing your shop most. I’ll help you see it clearly.",
      body: "If I am not the right fit, I will say so. If I am, the next step is a fixed-fee plan.",
      cta: "WhatsApp Tony",
    },
    footer: {
      phone: "Phone",
      wechat: "WeChat",
      email: "Email",
      pending: "Details pending",
      qr: "Open WeChat QR",
      privacy: "Privacy",
      terms: "Terms",
      privacyText: "RNG only uses information you choose to provide by WhatsApp, phone, WeChat or email to answer your enquiry. We do not sell personal data. A full notice will follow when the company details are confirmed.",
      termsText: "Website content is general information only. The signed project plan and contract define the final scope, fees, programme and responsibilities.",
      backToTop: "Back to top",
      stickyLabel: "Free shop visit",
    },
    qrModal: {
      title: "Find me on WeChat",
      pending: "WeChat QR pending",
      hint: "Add Tony’s QR image to the site configuration once the WeChat ID is supplied.",
      close: "Close",
    },
  },
};

function buildWhatsAppUrl(language) {
  const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  const destination = number ? `https://wa.me/${number}` : "https://wa.me/";
  return `${destination}?text=${encodeURIComponent(WHATSAPP_MESSAGE[language])}`;
}

function trackWhatsApp(location) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "whatsapp_click", location });
  window.dispatchEvent(new CustomEvent("rng:whatsapp-click", { detail: { location } }));
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.64, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function WhatsAppButton({ language, label, location, compact = false, inverse = false }) {
  return (
    <a
      className={`whatsapp-button ${compact ? "compact" : ""} ${inverse ? "inverse" : ""}`}
      href={buildWhatsAppUrl(language)}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackWhatsApp(location)}
      data-ga-event="whatsapp_click"
    >
      <ChatCircleText aria-hidden="true" size={compact ? 18 : 21} weight="fill" />
      <span>{label}</span>
      {!compact && <ArrowUpRight aria-hidden="true" size={19} />}
    </a>
  );
}

function MediaPlaceholder({ src = "", label, pending, portrait = false }) {
  if (src) return <img className={`real-media ${portrait ? "portrait" : ""}`} src={src} alt={label} />;
  return (
    <div className={`media-placeholder ${portrait ? "portrait" : ""}`} role="img" aria-label={`${label} — ${pending}`}>
      <span className="placeholder-cross" aria-hidden="true" />
      <span className="placeholder-label">{label}</span>
      <span className="placeholder-status">{pending}</span>
    </div>
  );
}

function Header({ language, setLanguage, copy, activeSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="RNG home">
        <strong>RNG</strong>
        <span>{copy.brandTagline}</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {copy.nav.map(([label, href]) => {
          const id = href.slice(1);
          return (
            <a className={activeSection === id ? "active" : ""} href={href} key={href} aria-current={activeSection === id ? "location" : undefined}>
              {label}
            </a>
          );
        })}
      </nav>
      <div className="header-actions">
        <button className="language-toggle" type="button" onClick={() => setLanguage(language === "zh" ? "en" : "zh")} aria-label={language === "zh" ? "Switch to English" : "切換至中文"}>
          {copy.langLabel}
        </button>
        <WhatsAppButton language={language} label={copy.whatsappShort} location="header" compact />
      </div>
    </header>
  );
}

function Hero({ language, copy }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media">
        <MediaPlaceholder src={SITE_CONFIG.media.hero} label={copy.hero.photoLabel} pending={copy.hero.photoPending} />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content page-shell">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <p className="eyebrow light">{copy.hero.eyebrow}</p>
          <h1 id="hero-title">{copy.hero.title}</h1>
          <p className="hero-subtitle">{copy.hero.subtitle}</p>
          <div className="proof-strip" aria-label={copy.hero.proof}>
            {copy.hero.stats.map((stat) => <span key={stat}>{stat}</span>)}
          </div>
          <div className="hero-cta-row">
            <WhatsAppButton language={language} label={copy.hero.cta} location="hero" inverse />
            <small>{copy.hero.reassurance}</small>
          </div>
        </motion.div>
        <a className="hero-scroll" href="#case">
          <span>{copy.hero.scroll}</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

function CaseStudy({ copy }) {
  return (
    <section className="case-section section-block" id="case" aria-labelledby="case-title">
      <div className="page-shell">
        <div className="section-intro split-intro">
          <Reveal>
            <p className="eyebrow">{copy.caseStudy.eyebrow}</p>
            <h2 id="case-title">{copy.caseStudy.title}</h2>
          </Reveal>
          <Reveal className="case-description" delay={0.08}>
            <p>{copy.caseStudy.body}</p>
            <small>{copy.caseStudy.note}</small>
          </Reveal>
        </div>
      </div>
      <div className="case-rail" aria-label="M+ project stages">
        {copy.caseStudy.stages.map((stage, index) => (
          <Reveal className="case-frame" delay={index * 0.06} key={stage}>
            <MediaPlaceholder src={SITE_CONFIG.media.caseStages[index]} label={`0${index + 1} · ${stage}`} pending={copy.caseStudy.imagePending} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProcessSection({ copy }) {
  const icons = [Storefront, TrendUp, Wrench, Clock, User];
  return (
    <section className="process-section section-block" id="process" aria-labelledby="process-title">
      <div className="page-shell">
        <Reveal className="section-intro narrow-intro">
          <p className="eyebrow">{copy.process.eyebrow}</p>
          <h2 id="process-title">{copy.process.title}</h2>
        </Reveal>
        <div className="process-grid">
          {copy.process.steps.map(([number, title, body], index) => {
            const Icon = icons[index];
            return (
              <Reveal className={`process-step ${index === 2 ? "featured" : ""}`} delay={index * 0.06} key={number}>
                <span className="step-number">{number}</span>
                <span className="step-icon" aria-hidden="true"><Icon size={22} weight="regular" /></span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="process-note">
          <div><Check size={20} weight="bold" aria-hidden="true" /><strong>{copy.process.responsibility}</strong></div>
          <p>{copy.process.report}</p>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesSection({ language, copy }) {
  return (
    <section className="services-section section-block" id="services" aria-labelledby="services-title">
      <div className="page-shell">
        <div className="section-intro split-intro services-intro">
          <Reveal>
            <p className="eyebrow">{copy.services.eyebrow}</p>
            <h2 id="services-title">{copy.services.title}</h2>
          </Reveal>
          <Reveal delay={0.08}><p>{copy.services.intro}</p></Reveal>
        </div>
        <div className="service-grid">
          {copy.services.items.map((item, index) => (
            <Reveal className={`service-card ${index === 0 ? "recommended" : ""}`} delay={index * 0.08} key={item.number}>
              <div className="service-card-top">
                <span>{item.number}</span>
                {index === 0 && <span className="recommended-mark">RNG</span>}
              </div>
              <h3>{item.title}</h3>
              <p className="service-problem">{item.problem}</p>
              <p className="service-answer">{item.answer}</p>
              <p className="service-price">{item.price}</p>
            </Reveal>
          ))}
        </div>
        <div className="service-footer">
          <p>{copy.services.qualifier}</p>
          <WhatsAppButton language={language} label={copy.services.cta} location="services" />
        </div>
      </div>
    </section>
  );
}

function AboutSection({ copy }) {
  return (
    <section className="about-section section-block" id="about" aria-labelledby="about-title">
      <div className="page-shell about-grid">
        <Reveal className="about-portrait">
          <MediaPlaceholder src={SITE_CONFIG.media.founder} label={copy.about.portrait} pending={copy.about.portraitPending} portrait />
        </Reveal>
        <Reveal className="about-copy" delay={0.08}>
          <p className="eyebrow">{copy.about.eyebrow}</p>
          <h2 id="about-title">{copy.about.title}</h2>
          <p>{copy.about.body}</p>
          <div className="location-line"><MapPin size={20} weight="fill" aria-hidden="true" /><span>{copy.about.location}</span></div>
          <span className="signature" aria-hidden="true">Tony</span>
        </Reveal>
      </div>
    </section>
  );
}

function BoundariesSection({ copy }) {
  return (
    <section className="boundaries-section section-block" id="boundaries" aria-labelledby="boundaries-title">
      <div className="page-shell boundaries-panel">
        <Reveal className="boundaries-heading">
          <p className="eyebrow">{copy.boundaries.eyebrow}</p>
          <h2 id="boundaries-title">{copy.boundaries.title}</h2>
        </Reveal>
        <div className="boundary-list">
          {copy.boundaries.items.map(([title, body], index) => (
            <Reveal className="boundary-item" delay={index * 0.07} key={title}>
              <span>0{index + 1}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ copy }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="faq-section section-block" id="faq" aria-labelledby="faq-title">
      <div className="page-shell faq-grid">
        <Reveal className="faq-heading">
          <p className="eyebrow">{copy.faq.eyebrow}</p>
          <h2 id="faq-title">{copy.faq.title}</h2>
        </Reveal>
        <div className="faq-list">
          {copy.faq.items.map(([question, answer], index) => {
            const isOpen = index === openIndex;
            const panelId = `faq-panel-${index}`;
            return (
              <Reveal className={`faq-item ${isOpen ? "open" : ""}`} delay={index * 0.05} key={question}>
                <h3>
                  <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} aria-expanded={isOpen} aria-controls={panelId}>
                    <span>{question}</span>
                    <CaretDown size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-answer" id={panelId} hidden={!isOpen}><p>{answer}</p></div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ language, copy }) {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="page-shell final-cta-grid">
        <Reveal>
          <p className="eyebrow light">{copy.finalCta.eyebrow}</p>
          <h2 id="final-cta-title">{copy.finalCta.title}</h2>
        </Reveal>
        <Reveal className="final-cta-action" delay={0.08}>
          <p>{copy.finalCta.body}</p>
          <WhatsAppButton language={language} label={copy.finalCta.cta} location="final_cta" inverse />
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ copy, onOpenQr }) {
  const phoneContent = SITE_CONFIG.phoneDisplay || copy.footer.pending;
  const emailContent = SITE_CONFIG.email || copy.footer.pending;
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-main">
          <div className="footer-brand"><strong>RNG</strong><span>{copy.brandTagline}</span></div>
          <div className="footer-contacts">
            <div>
              <span><Phone size={17} aria-hidden="true" />{copy.footer.phone}</span>
              {SITE_CONFIG.phoneHref ? <a href={`tel:${SITE_CONFIG.phoneHref}`}>{phoneContent}</a> : <em>{phoneContent}</em>}
            </div>
            <div>
              <span><ChatCircleText size={17} aria-hidden="true" />{copy.footer.wechat}</span>
              <button type="button" onClick={onOpenQr}>{SITE_CONFIG.wechatId || copy.footer.qr}</button>
            </div>
            <div>
              <span>{copy.footer.email}</span>
              {SITE_CONFIG.email ? <a href={`mailto:${SITE_CONFIG.email}`}>{emailContent}</a> : <em>{emailContent}</em>}
            </div>
          </div>
        </div>
        <div className="footer-meta">
          <span>{SITE_CONFIG.companyName}</span>
          <span>© 2026 RNG</span>
          <a href="#top">{copy.footer.backToTop} ↑</a>
        </div>
        <div className="legal-row">
          <details id="privacy"><summary>{copy.footer.privacy}</summary><p>{copy.footer.privacyText}</p></details>
          <details id="terms"><summary>{copy.footer.terms}</summary><p>{copy.footer.termsText}</p></details>
        </div>
      </div>
    </footer>
  );
}

function WeChatModal({ open, onClose, copy }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} role="dialog" aria-modal="true" aria-labelledby="wechat-title">
          <button className="modal-backdrop" type="button" onClick={onClose} aria-label={copy.qrModal.close} />
          <motion.div className="qr-panel" initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="qr-panel-head"><h2 id="wechat-title">{copy.qrModal.title}</h2><button type="button" onClick={onClose} aria-label={copy.qrModal.close}><X size={22} /></button></div>
            {SITE_CONFIG.wechatQr ? <img src={SITE_CONFIG.wechatQr} alt={`WeChat QR — ${SITE_CONFIG.wechatId}`} /> : <div className="qr-placeholder"><span>RNG</span><strong>{copy.qrModal.pending}</strong></div>}
            <p>{SITE_CONFIG.wechatId || copy.qrModal.hint}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StickyBar({ language, copy }) {
  return (
    <div className="mobile-sticky" role="region" aria-label={copy.footer.stickyLabel}>
      <span>{copy.footer.stickyLabel}</span>
      <WhatsAppButton language={language} label={copy.whatsappShort} location="mobile_sticky" compact />
    </div>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = ["case", "process", "services", "about", "faq"];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.4] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return active;
}

function App() {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem("rng-language") === "en" ? "en" : "zh"; }
    catch { return "zh"; }
  });
  const [qrOpen, setQrOpen] = useState(false);
  const activeSection = useActiveSection();
  const copy = useMemo(() => COPY[language], [language]);

  useEffect(() => {
    try { localStorage.setItem("rng-language", language); } catch { /* Storage may be disabled. */ }
    document.documentElement.lang = language === "zh" ? "zh-Hant" : "en-GB";
    document.title = copy.pageTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", copy.pageDescription);
  }, [copy, language]);

  return (
    <>
      <a className="skip-link" href="#main">{copy.skip}</a>
      <Header language={language} setLanguage={setLanguage} copy={copy} activeSection={activeSection} />
      <main id="main">
        <Hero language={language} copy={copy} />
        <CaseStudy copy={copy} />
        <ProcessSection copy={copy} />
        <ServicesSection language={language} copy={copy} />
        <AboutSection copy={copy} />
        <BoundariesSection copy={copy} />
        <FaqSection copy={copy} />
        <FinalCta language={language} copy={copy} />
      </main>
      <Footer copy={copy} onOpenQr={() => setQrOpen(true)} />
      <StickyBar language={language} copy={copy} />
      <WeChatModal open={qrOpen} onClose={() => setQrOpen(false)} copy={copy} />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
