import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  CaretDown,
  ChatCircleText,
  Check,
  Clock,
  Equals,
  MapPin,
  Phone,
  Storefront,
  TrendUp,
  User,
  Wrench,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import "./styles.css";
import renaissanceVideo from "../image/renaissance_editorial_explainer.mp4";

const SITE_CONFIG = {
  whatsappNumber: "",
  phoneDisplay: "",
  phoneHref: "",
  email: "",
  wechatId: "",
  wechatQr: "",
  companyName: "[Ltd 名待補] trading as RNG",
  media: {
    hero: "/images/generated/renaissance-hero.webp",
    heroSmall: "/images/generated/renaissance-hero-768.webp",
    caseStages: ["", "", "", ""],
    founder: "",
    process: "/images/generated/process-drawing.webp",
    processSmall: "/images/generated/process-drawing-720.webp",
    materials: "/images/generated/material-still-life.webp",
    materialsSmall: "/images/generated/material-still-life-640.webp",
    boundaries: "/images/generated/enquiry-materials.webp",
    boundariesSmall: "/images/generated/enquiry-materials-640.webp",
    references: {
      hongKongFrontage: "/images/references/past-hong-kong-ma-wan-frontage.webp",
      hongKongGarden: "/images/references/past-hong-kong-ma-wan-garden-room.webp",
      glasgowCounter: "/images/references/past-uk-glasgow-matcha-counter.webp",
      glasgowFrontage: "/images/references/past-uk-glasgow-matcha-frontage.webp",
      vidaCoffee: "/images/references/past-studio-vida-coffee.webp",
    },
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
    langLabel: "SELECT",
    nav: [
      ["真店", "#case"],
      ["過往參考", "#past"],
      ["點樣行", "#process"],
      ["三樣嘢", "#services"],
      ["Tony", "#about"],
      ["FAQ", "#faq"],
    ],
    whatsappShort: "WhatsApp 我",
    hero: {
      artAlt: "暖白石灰牆與胡桃木壁龕內的文藝復興風格大理石雕像",
    },
    caseStudy: {
      eyebrow: "真店證據",
      title: "唔講概念，睇我自己行過嘅每一步。",
      body: "呢兩間舖由零到開門係我自己做嘅：搵舖、談 lease、8-9 週裝修、品牌、餐牌、POS、website、app、請人、每個月自己睇 P&L。你間舖嘅每一步，我都行過。",
      stages: ["空殼", "裝修中", "完工", "營業中"],
      imagePending: "M+ 真相待補",
      note: "相大過字，因為做過比講過更有說服力。",
    },
    past: {
      title: "俾 Leeds 做店嘅過往參考。",
      intro: "由香港、英國到品牌視覺，揀幾張相留下空間、材料同動線嘅重點。唔放成份 deck，只帶走值得用嘅細節。",
      items: [
        ["香港／馬灣", "茶飲店內外", "淺色門面、樹蔭同室內外連接，令細店都有一個自然嘅入口。", SITE_CONFIG.media.references.hongKongFrontage, "大樹下的淺色茶飲店門面，前方有遮棚、玻璃門和綠化。"],
        ["香港／馬灣", "有樹嘅休憩位", "座位圍住樹同窗邊展開，俾客人停留得耐啲，亦令公共空間有生活感。", SITE_CONFIG.media.references.hongKongGarden, "玻璃天幕下的室內花園休憩區，樹木和座位圍繞中央桌台。"],
        ["英國／格拉斯哥", "M plus matcha", "深木、抹茶綠同一條清楚嘅服務動線，將小店做出完整體驗。", SITE_CONFIG.media.references.glasgowCounter, "格拉斯哥 M plus matcha 店內的深木色吧檯、綠色天花和展示牆。"],
        ["英國／格拉斯哥", "街舖門面", "門面、招牌同室內燈光一齊工作，客人未入門已經知道間舖係乜。", SITE_CONFIG.media.references.glasgowFrontage, "格拉斯哥 M plus matcha 店的街舖門面和玻璃入口。"],
        ["品牌參考／YE4 LAB", "Vida Coffee", "一套有節奏嘅包裝系統，將咖啡品牌由一包豆帶到每個接觸點。", SITE_CONFIG.media.references.vidaCoffee, "Vida Coffee 的包裝、杯、卡片和品牌物料排列在淺色桌面上。"],
      ],
    },
    process: {
      eyebrow: "點樣行",
      title: "每一步講清楚，你隨時知錢用咗去邊。",
      steps: [
        ["01", "睇舖傾偈", "免費，先睇清楚最痛嗰樣。"],
        ["02", "出計劃", "一條 timeline、一份預算、固定費。"],
        ["03", "落地", "按 50 / 30 / 20 分期，唔估鐘。"],
        ["04", "開張跟數", "30-60-90 日睇營運同數字。"],
        ["05", "長期夥伴", "要先再做，唔綁無謂服務。"],
      ],
      responsibility: "工程由合資格承建商承接及負責；我係你嘅單一負責窗口。",
      report: "每星期你收一頁報告：使咗幾多、去到邊、下週做乜。",
    },
    services: {
      eyebrow: "三樣嘢",
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
      qualifier: "有真項目、有預算，先約。我哋唔做齋傾。",
      cta: "俾我睇下你間舖",
    },
    about: {
      eyebrow: "真人負責",
      title: "我係 Tony。自己落過場，先知老闆最怕漏咩。",
      body: "我自己由零開始做過兩間舖，搵舖、裝修、品牌、餐牌、POS、website、app、請人同每月 P&L 都親手行過。RNG 唔係企喺旁邊俾意見；我會幫你將預算、時間表同每個合作團隊拉返埋一條線，直到間舖開門、營運同數字行順。",
      location: "Leeds 地面・digital 全國",
      portrait: "Tony 店內半身真相",
      portraitPending: "真人相待補",
    },
    boundaries: {
      eyebrow: "三樣我哋唔做",
      title: "信任由界線清楚開始。",
      artAlt: "暖白石材、深色胡桃木與天然布料的材質組合",
      items: [
        ["唔係承建商", "工程由合資格承建商承接同負責。"],
        ["唔代你決定開唔開", "盤生意係你嘅，我會俾你睇清風險同數字。"],
        ["唔賣你唔需要嘅嘢", "計劃書寫明先做乜、後做乜、唔使做乜。"],
      ],
    },
    faq: {
      eyebrow: "常見問題",
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
    pageTitle: "RNG - Open, Upgrade & Automate Your Shop, Leeds",
    pageDescription: "A hands-on partner for independent hospitality owners opening, upgrading or automating a shop. Leeds on site, digital projects nationwide.",
    skip: "Skip to main content",
    brandTagline: "Open · Upgrade · Automate",
    langLabel: "SELECT",
    nav: [
      ["Real shop", "#case"],
      ["Past refs", "#past"],
      ["Process", "#process"],
      ["What I do", "#services"],
      ["Tony", "#about"],
      ["FAQ", "#faq"],
    ],
    whatsappShort: "WhatsApp me",
    hero: {
      artAlt: "Renaissance-inspired marble sculpture in a warm white plaster and walnut studio",
    },
    caseStudy: {
      eyebrow: "Real-world proof",
      title: "No theory. I have walked every step myself.",
      body: "I built these two shops from zero to opening: site search, lease negotiation, an 8-9 week fit-out, brand, menu, POS, website, app, hiring and the monthly P&L. I have already walked every step your shop will take.",
      stages: ["Empty shell", "Fit-out", "Finished", "Trading"],
      imagePending: "M+ real photo pending",
      note: "The photographs lead because doing the work matters more than describing it.",
    },
    past: {
      title: "Past references for Leeds work.",
      intro: "Selected images from Hong Kong, Glasgow and brand practice. The decks stay behind. The details worth carrying forward come first.",
      items: [
        ["Hong Kong / Ma Wan", "Tea shop, inside and out", "A light frontage, mature planting and a clear connection between the shop and the street.", SITE_CONFIG.media.references.hongKongFrontage, "Light tea shop frontage beneath a mature tree with a canopy, glass doors and planting."],
        ["Hong Kong / Ma Wan", "A garden room", "A planted seating landscape gives people a reason to stay, not just a reason to order.", SITE_CONFIG.media.references.hongKongGarden, "A garden-like seating area beneath a glass roof, with trees, tables and rounded stools."],
        ["UK / Glasgow", "M plus matcha", "Dark timber, matcha green and a clear service line make a compact shop feel complete.", SITE_CONFIG.media.references.glasgowCounter, "M plus matcha counter in Glasgow with dark timber, green ceiling detail and a patterned floor."],
        ["UK / Glasgow", "The street frontage", "Signage, glazing and warm interior light do the work before the customer reaches the door.", SITE_CONFIG.media.references.glasgowFrontage, "M plus matcha shopfront in Glasgow with a lit sign, glazed entrance and street posters."],
        ["Brand reference / YE4 LAB", "Vida Coffee", "A disciplined packaging system that carries a coffee brand across every useful touchpoint.", SITE_CONFIG.media.references.vidaCoffee, "Vida Coffee packaging, cards and cups arranged on a pale surface."],
      ],
    },
    process: {
      eyebrow: "How it works",
      title: "A clear route from first visit to opening day.",
      steps: [
        ["01", "Visit and listen", "Free. We identify the most urgent problem first."],
        ["02", "Build the plan", "One timeline, one budget and a fixed fee."],
        ["03", "Deliver", "Pay in 50 / 30 / 20 stages, never by the hour."],
        ["04", "Open and measure", "Review operations and numbers at 30-60-90 days."],
        ["05", "Stay useful", "Continue only where the business needs it."],
      ],
      responsibility: "Qualified contractors carry out and take responsibility for construction; I remain your single point of contact.",
      report: "Every week you receive one page: money spent, current status and next week’s work.",
    },
    services: {
      eyebrow: "Three ways I help",
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
      qualifier: "Real project and real budget required. I do not sell open-ended consultancy.",
      cta: "Show me your shop",
    },
    about: {
      eyebrow: "Founder led",
      title: "I’m Tony. Running my own shops taught me what owners cannot afford to miss.",
      body: "I have built two shops from zero, handling the site search, fit-out, brand, menu, POS, website, app, hiring and monthly P&L. RNG is not advice from the sidelines. I bring the budget, timeline and specialist teams onto one line, then stay close until the doors are open and the operation is working.",
      location: "Leeds on site・digital nationwide",
      portrait: "Tony inside his own shop",
      portraitPending: "Founder photo pending",
    },
    boundaries: {
      eyebrow: "Three things I do not do",
      title: "Trust starts with clear boundaries.",
      artAlt: "Warm white stone, dark walnut and natural linen material study",
      items: [
        ["I am not the contractor", "Qualified contractors carry out and take responsibility for construction."],
        ["I will not decide whether you should open", "It is your business. I make the risks and numbers clear."],
        ["I will not sell work you do not need", "The plan states what comes first, what comes later and what to skip."],
      ],
    },
    faq: {
      eyebrow: "Questions",
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

const ResponsiveMotionContext = React.createContext({ compact: false });

function useResponsiveMotionProfile() {
  const [compact, setCompact] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 720px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return useMemo(() => ({ compact }), [compact]);
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const { compact } = React.useContext(ResponsiveMotionContext);
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: compact ? 14 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: compact ? 0.08 : 0.14 }}
      transition={{ duration: compact ? 0.46 : 0.64, delay: compact ? delay * 0.65 : delay, ease: [0.16, 1, 0.3, 1] }}
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
    <div className={`media-placeholder ${portrait ? "portrait" : ""}`} role="img" aria-label={`${label} - ${pending}`}>
      <span className="placeholder-mark" aria-hidden="true">RNG</span>
      <span className="placeholder-label">{label}</span>
      <span className="placeholder-status">{pending}</span>
    </div>
  );
}

function Loader({ ready, onComplete }) {
  const [progress, setProgress] = useState(8);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const steps = [
      window.setTimeout(() => setProgress(34), reduceMotion ? 20 : 360),
      window.setTimeout(() => setProgress(68), reduceMotion ? 40 : 820),
      window.setTimeout(() => setProgress(86), reduceMotion ? 60 : 1320),
    ];
    return () => steps.forEach(window.clearTimeout);
  }, [reduceMotion]);

  useEffect(() => {
    if (!ready) return undefined;
    const finish = window.setTimeout(() => setProgress(100), reduceMotion ? 20 : 240);
    const dismiss = window.setTimeout(onComplete, reduceMotion ? 80 : 920);
    return () => {
      window.clearTimeout(finish);
      window.clearTimeout(dismiss);
    };
  }, [onComplete, ready, reduceMotion]);

  return (
    <motion.div
      className="rng-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: [0.76, 0, 0.24, 1] }}
      aria-label={`Loading RNG, ${progress}%`}
    >
      <div className="loader-ghost" aria-hidden="true">RNG</div>
      <motion.div
        className="loader-card"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <strong>RNG</strong>
        <span>{progress}%</span>
        <i aria-hidden="true" style={{ transform: `scaleX(${progress / 100})` }} />
      </motion.div>
    </motion.div>
  );
}

function Header({ language, setLanguage, copy }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-label={language === "zh" ? "打開選單" : "Open menu"} aria-expanded={menuOpen}>
          <Equals size={42} weight="thin" aria-hidden="true" />
        </button>
        <a className="brand" href="#top" aria-label="RNG home">
          <strong>RNG</strong>
        </a>
        <div className="header-actions">
          <button className="language-toggle" type="button" onClick={() => setLanguage(language === "zh" ? "en" : "zh")} aria-label={language === "zh" ? "EN, switch to English" : "中，切換至中文"}>
            {copy.langLabel}
          </button>
          <a className="header-contact" href="#contact">CONTACT US</a>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.35 }} role="dialog" aria-modal="true" aria-label={language === "zh" ? "選單" : "Menu"}>
            <button className="menu-scrim" type="button" onClick={() => setMenuOpen(false)} aria-label={language === "zh" ? "關閉選單" : "Close menu"} />
            <motion.div className="menu-sheet" initial={reduceMotion ? false : { x: "-104%" }} animate={{ x: 0 }} exit={{ x: "-104%" }} transition={{ duration: reduceMotion ? 0.01 : 0.72, ease: [0.76, 0, 0.24, 1] }}>
              <img src={SITE_CONFIG.media.hero} alt="" aria-hidden="true" />
              <div className="menu-head">
                <button type="button" onClick={() => setMenuOpen(false)} aria-label={language === "zh" ? "關閉選單" : "Close menu"}><X size={38} weight="thin" /></button>
                <strong>RNG</strong>
              </div>
              <nav className="menu-links" aria-label="Primary navigation">
                {copy.nav.map(([label, href], index) => (
                  <motion.a href={href} onClick={() => setMenuOpen(false)} key={href} initial={reduceMotion ? false : { opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduceMotion ? 0 : 0.22 + index * 0.055 }}>
                    {label}
                  </motion.a>
                ))}
              </nav>
              <div className="menu-actions">
                <WhatsAppButton language={language} label={copy.whatsappShort} location="menu" compact />
                <a href="#services" onClick={() => setMenuOpen(false)}>{language === "zh" ? "睇服務" : "View services"}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero({ copy, onVideoReady }) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const pendingProgress = useRef(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const seekVideo = (progress) => {
    pendingProgress.current = progress;
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    const duration = Math.max(0, video.duration - 0.04);
    video.currentTime = reduceMotion ? 0 : progress * duration;
  };

  useMotionValueEvent(scrollYProgress, "change", seekVideo);

  const handleVideoReady = () => {
    seekVideo(pendingProgress.current);
    onVideoReady();
  };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={sectionRef}>
      <div className="hero-sticky">
        <video ref={videoRef} className="hero-video" src={renaissanceVideo} muted playsInline preload="auto" onLoadedMetadata={handleVideoReady} onCanPlay={onVideoReady} aria-label={copy.hero.artAlt} />
        <div className="hero-scrim" aria-hidden="true" />
        <motion.div className="hero-title-block" initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: reduceMotion ? 0.01 : 1.05, delay: reduceMotion ? 0 : 0.18, ease: [0.76, 0, 0.24, 1] }}>
          <h1 id="hero-title" aria-label="RNG">RNG</h1>
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudy({ copy }) {
  return (
    <section className="case-section section-block" id="case" aria-labelledby="case-title">
      <div className="page-shell case-board">
        <div className="case-statement">
          <Reveal className="case-heading">
            <h2 id="case-title">{copy.caseStudy.title}</h2>
          </Reveal>
          <Reveal className="case-description" delay={0.08}>
            <p>{copy.caseStudy.body}</p>
          </Reveal>
        </div>
        <div className="case-grid" aria-label="M+ project stages">
          {copy.caseStudy.stages.map((stage, index) => (
            <Reveal className="case-frame" delay={index * 0.06} key={stage}>
              <div className="case-frame-head"><span>0{index + 1}</span><strong>{stage}</strong></div>
              <MediaPlaceholder src={SITE_CONFIG.media.caseStages[index]} label={stage} pending={copy.caseStudy.imagePending} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PastReferences({ copy }) {
  return (
    <section className="past-section section-block" id="past" aria-labelledby="past-title">
      <div className="page-shell past-board">
        <div className="past-heading">
          <Reveal>
            <h2 id="past-title">{copy.past.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>{copy.past.intro}</p>
          </Reveal>
        </div>
        <div className="past-grid">
          {copy.past.items.map(([location, title, body, image, alt], index) => (
            <Reveal className={`past-item past-item-${index + 1}`} delay={index * 0.05} key={`${location}-${title}`}>
              <figure>
                <img src={image} alt={alt} loading="lazy" />
                <figcaption>
                  <span>{location}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ language, copy }) {
  const icons = [Storefront, TrendUp, Wrench, Clock, User];
  const [activeStage, setActiveStage] = useState(0);
  const reduceMotion = useReducedMotion();
  const [number, title, body] = copy.process.steps[activeStage];
  const ActiveIcon = icons[activeStage];
  return (
    <section className="process-section section-block" id="process" aria-labelledby="process-title">
      <div className="page-shell">
        <div className="process-heading">
          <Reveal><h2 id="process-title">{copy.process.title}</h2></Reveal>
          <Reveal delay={0.08}><p>{copy.process.report}</p></Reveal>
        </div>
        <div className="process-board">
          <aside className="process-rail" aria-label={copy.process.eyebrow}>
            <span className="rail-label">{copy.process.eyebrow}</span>
            {copy.process.steps.map(([stepNumber, stepTitle], index) => {
              const Icon = icons[index];
              return (
                <button type="button" className={index === activeStage ? "active" : ""} onClick={() => setActiveStage(index)} aria-pressed={index === activeStage} key={stepNumber}>
                  {index === activeStage && <motion.span className="process-active-marker" layoutId="process-active-marker" aria-hidden="true" transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }} />}
                  <span>{stepNumber}</span>
                  <Icon aria-hidden="true" size={18} />
                  <strong>{stepTitle}</strong>
                </button>
              );
            })}
          </aside>
          <div className="process-canvas">
            <Reveal className="process-visual">
              <img src={SITE_CONFIG.media.process} srcSet={`${SITE_CONFIG.media.processSmall} 720w, ${SITE_CONFIG.media.process} 1672w`} sizes="(max-width: 900px) calc(100vw - 40px), 1040px" width="1672" height="941" alt={language === "zh" ? "胡桃木桌上擺放平面圖、石材與布料樣板" : "Plans, stone and fabric samples arranged on a walnut worktable"} loading="lazy" />
            </Reveal>
            <div className="process-detail-grid">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article className="active-stage" key={`${language}-${number}`} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={{ duration: reduceMotion ? 0 : 0.22 }}>
                  <div className="active-stage-meta"><span>{number}</span><ActiveIcon aria-hidden="true" size={26} /></div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </motion.article>
              </AnimatePresence>
              <div className="process-report-card">
                <span>{language === "zh" ? "每週一頁" : "One page weekly"}</span>
                <strong>{copy.process.report}</strong>
              </div>
              <div className="process-responsibility">
                <Check size={21} weight="bold" aria-hidden="true" />
                <p>{copy.process.responsibility}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ language, copy }) {
  return (
    <section className="services-section section-block" id="services" aria-labelledby="services-title">
      <div className="page-shell">
        <div className="section-intro stacked-intro services-intro">
          <Reveal>
            <h2 id="services-title">{copy.services.title}</h2>
          </Reveal>
          <Reveal delay={0.08}><p>{copy.services.intro}</p></Reveal>
        </div>
        <div className="service-grid">
          {copy.services.items.map((item, index) => (
            <Reveal className={`service-card ${index === 0 ? "recommended" : ""}`} delay={index * 0.08} key={item.number}>
              {index === 0 && <img className="service-image" src={SITE_CONFIG.media.materials} srcSet={`${SITE_CONFIG.media.materialsSmall} 640w, ${SITE_CONFIG.media.materials} 1122w`} sizes="(max-width: 720px) calc(100vw - 96px), 52vw" width="1122" height="1402" alt={language === "zh" ? "暖白石材、胡桃木與天然布料材質組合" : "Warm white stone, walnut and natural linen material study"} loading="lazy" />}
              <h3>{item.title}</h3>
              <p className="service-problem">{item.problem}</p>
              <p className="service-answer">{item.answer}</p>
              <p className="service-price">{item.price}</p>
            </Reveal>
          ))}
        </div>
        <div className="service-footer">
          <p>{copy.services.qualifier}</p>
          <WhatsAppButton language={language} label={copy.whatsappShort} location="services" />
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
          <h2 id="boundaries-title">{copy.boundaries.title}</h2>
          <img className="boundaries-material" src={SITE_CONFIG.media.boundaries} srcSet={`${SITE_CONFIG.media.boundariesSmall} 640w, ${SITE_CONFIG.media.boundaries} 1122w`} sizes="(max-width: 720px) 230px, 260px" width="1122" height="1402" alt={copy.boundaries.artAlt} loading="lazy" />
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
  const reduceMotion = useReducedMotion();
  return (
    <section className="faq-section section-block" id="faq" aria-labelledby="faq-title">
      <div className="page-shell faq-grid">
        <Reveal className="faq-heading">
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
                <motion.div className="faq-answer" id={panelId} initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ height: { duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: reduceMotion ? 0 : 0.2 } }} aria-hidden={!isOpen}>
                  <div className="faq-answer-inner"><p>{answer}</p></div>
                </motion.div>
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
          <WhatsAppButton language={language} label={copy.whatsappShort} location="final_cta" />
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
  const reduceMotion = useReducedMotion();
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
          <motion.div className="qr-panel" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="qr-panel-head"><h2 id="wechat-title">{copy.qrModal.title}</h2><button type="button" onClick={onClose} aria-label={copy.qrModal.close}><X size={22} /></button></div>
            {SITE_CONFIG.wechatQr ? <img src={SITE_CONFIG.wechatQr} alt={`WeChat QR - ${SITE_CONFIG.wechatId}`} /> : <div className="qr-placeholder"><span>RNG</span><strong>{copy.qrModal.pending}</strong></div>}
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

function App() {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem("rng-language") === "zh" ? "zh" : "en"; }
    catch { return "en"; }
  });
  const [qrOpen, setQrOpen] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const motionProfile = useResponsiveMotionProfile();
  const copy = useMemo(() => COPY[language], [language]);

  useEffect(() => {
    try { localStorage.setItem("rng-language", language); } catch { /* Storage may be disabled. */ }
    document.documentElement.lang = language === "zh" ? "zh-Hant" : "en-GB";
    document.title = copy.pageTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", copy.pageDescription);
  }, [copy, language]);

  useEffect(() => {
    if (!loaderVisible) return undefined;
    document.body.classList.add("loading");
    const safety = window.setTimeout(() => setMediaReady(true), 5000);
    return () => {
      document.body.classList.remove("loading");
      window.clearTimeout(safety);
    };
  }, [loaderVisible]);

  return (
    <ResponsiveMotionContext.Provider value={motionProfile}>
      <AnimatePresence>{loaderVisible && <Loader ready={mediaReady} onComplete={() => setLoaderVisible(false)} />}</AnimatePresence>
      <a className="skip-link" href="#main">{copy.skip}</a>
      <Header language={language} setLanguage={setLanguage} copy={copy} />
      <main id="main">
        <Hero copy={copy} onVideoReady={() => setMediaReady(true)} />
        <CaseStudy copy={copy} />
        <PastReferences copy={copy} />
        <ProcessSection language={language} copy={copy} />
        <ServicesSection language={language} copy={copy} />
        <AboutSection copy={copy} />
        <BoundariesSection copy={copy} />
        <FaqSection copy={copy} />
        <FinalCta language={language} copy={copy} />
      </main>
      <div id="contact"><Footer copy={copy} onOpenQr={() => setQrOpen(true)} /></div>
      <StickyBar language={language} copy={copy} />
      <WeChatModal open={qrOpen} onClose={() => setQrOpen(false)} copy={copy} />
    </ResponsiveMotionContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
