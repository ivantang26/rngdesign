export const SITE_CONFIG = {
  bookingUrl: "",
};

export const DEMO_SITES = [
  { id: "group", name: "All sites", revenue: 48520, forecast: 47240, labourCost: 11980, grossProfit: 34210, stockAlerts: 7, approvals: 5, orders: 1384 },
  { id: "leeds", name: "Leeds", revenue: 17840, forecast: 17120, labourCost: 4380, grossProfit: 12630, stockAlerts: 2, approvals: 2, orders: 514 },
  { id: "manchester", name: "Manchester", revenue: 16460, forecast: 15980, labourCost: 4120, grossProfit: 11640, stockAlerts: 4, approvals: 1, orders: 467 },
  { id: "glasgow", name: "Glasgow", revenue: 14220, forecast: 14140, labourCost: 3480, grossProfit: 9940, stockAlerts: 1, approvals: 2, orders: 403 },
];

export const DEFAULT_SCENARIO = { period: 7, promotion: "none", weather: "dry", footfallChange: 0 };
export const LOOP_STEPS = ["forecast", "rota", "inventory", "reconcile", "report"];

export const REVENUE_CURVES = {
  group: [38, 46, 43, 58, 64, 61, 78, 72, 84, 88, 81, 94],
  leeds: [32, 39, 37, 52, 58, 55, 71, 67, 75, 82, 77, 89],
  manchester: [42, 48, 45, 61, 68, 64, 76, 73, 87, 85, 83, 91],
  glasgow: [35, 41, 44, 49, 57, 58, 69, 71, 78, 84, 79, 88],
};

export const ROTA_SHIFTS = [
  { role: "Kitchen", name: "Maya K.", start: 8, end: 16, tone: "strong" },
  { role: "Kitchen", name: "Callum R.", start: 11, end: 20, tone: "soft" },
  { role: "Floor", name: "Imani T.", start: 10, end: 18, tone: "strong" },
  { role: "Floor", name: "Theo W.", start: 12, end: 21, tone: "soft" },
  { role: "Manager", name: "Nadia P.", start: 9, end: 18, tone: "neutral" },
];

export const INVENTORY_ITEMS = [
  { id: "chicken", name: "Chicken thigh", unit: "kg", onHand: 42, par: 86, cost: 4.18 },
  { id: "oil", name: "Rapeseed oil", unit: "L", onHand: 18, par: 41, cost: 2.76 },
  { id: "tomato", name: "Heritage tomato", unit: "kg", onHand: 29, par: 57, cost: 3.24 },
];

export const SETTLEMENTS = [
  { id: "sq-1606", label: "Square settlement 16 Jun", expected: 8421.37, received: 8421.37, matched: 14 },
  { id: "sq-1706", label: "Square settlement 17 Jun", expected: 7918.24, received: 7893.24, matched: 11 },
  { id: "bank-1806", label: "Bank deposit 18 Jun", expected: 6240.18, received: 6231.68, matched: 9 },
];

export const CRM_SEGMENTS = {
  guest: [
    { id: "returning", label: "Returning guests", count: 1842, note: "Visited twice or more in 90 days" },
    { id: "lapsed", label: "Lapsed regulars", count: 326, note: "No visit in the last 45 days" },
  ],
  b2b: [
    { id: "events", label: "Private events", count: 18, note: "Open enquiries worth £31,480" },
    { id: "office", label: "Office catering", count: 27, note: "Accounts with active proposals" },
  ],
};

export const CAMPAIGNS = [
  { id: "summer", name: "Summer terrace", channel: "Website", status: "review", audience: "Local guests", headline: "Long evenings, one table away." },
  { id: "lunch", name: "Lunch return", channel: "Email", status: "draft", audience: "Lapsed regulars", headline: "Make lunch worth leaving the desk for." },
  { id: "events", name: "Private dining", channel: "Landing page", status: "approved", audience: "B2B enquiries", headline: "A private room that runs to your timing." },
];

export const REPORT_ROWS = [
  { key: "netSales", actual: 48520, budget: 47240 },
  { key: "cogs", actual: -14310, budget: -13940 },
  { key: "grossProfit", actual: 34210, budget: 33300 },
  { key: "labour", actual: -11980, budget: -11620 },
  { key: "contribution", actual: 22230, budget: 21680 },
];

export const FAQ_KEYS = ["concept", "integrations", "approval", "accounting", "data"];

export const TEXT = {
  en: {
    pageTitle: "RNG | Restaurant operations, connected",
    pageDescription: "Explore an interactive product concept connecting restaurant forecasting, labour, stock, finance, CRM and marketing.",
    language: "繁中", skip: "Skip to main content", backTop: "Back to top", primaryNav: "Primary navigation",
    nav: [["Product", "#product-demo"], ["Platform", "#platform"], ["Reports", "#reports"], ["Marketing", "#marketing"]],
    explore: "Explore the demo", book: "Book a demo", menuOpen: "Open menu", menuClose: "Close menu",
    concept: "Interactive product concept", sample: "Sample data", restart: "Restart demo",
    hero: { title: "Run every site from one operating system.", body: "Connect sales, labour, stock, finance and marketing before small variances become expensive problems." },
    siteSelector: "Workspace location", allSites: "All sites",
    overview: { title: "Today at a glance", revenue: "Net revenue", forecast: "Forecast", labour: "Labour cost", gp: "Gross profit", alerts: "Stock alerts", approvals: "Approvals", orders: "orders today", ahead: "ahead of forecast", below: "below forecast", connected: "One live operating view" },
    loop: {
      title: "One forecast runs the whole week.", body: "Every operating decision starts from the same version of demand.",
      labels: { forecast: "Forecast demand", rota: "Build rota", inventory: "Order stock", reconcile: "Reconcile accounts", report: "Publish report" },
      details: {
        forecast: ["Demand is versioned", "Revenue and item demand update together."],
        rota: ["Coverage meets demand", "Recommended hours stay inside the labour budget."],
        inventory: ["Stock follows demand", "Suggested orders account for recipe usage and waste."],
        reconcile: ["Exceptions come first", "Sales, settlements and deposits line up before close."],
        report: ["One approved view", "Every source and variance remains traceable."],
      },
    },
    forecast: {
      kicker: "Forecast and variance", title: "Test the week before it happens.", body: "Change the operating assumptions once. Revenue, labour and stock planning move with them.",
      period: "Forecast period", periods: { 7: "Next 7 days", 14: "Next 14 days", 35: "Next 5 weeks" }, promotion: "Promotion", promotions: { none: "None", standard: "Lunch offer", major: "Major launch" }, weather: "Weather", weatherOptions: { dry: "Dry", rain: "Rain", hot: "Hot" }, footfall: "Expected footfall", projected: "Projected revenue", variance: "Variance to baseline", labourHours: "Recommended hours", stock: "Stock requirement", ready: "Scenario ready", caveat: "Demonstration model only. It does not represent a live forecast or guaranteed outcome.",
    },
    workforce: {
      kicker: "Workforce scheduling", title: "Build a rota managers can approve.", body: "See demand, coverage and cost before a shift reaches the team.", day: "Demand day", days: { weekday: "Weekday", friday: "Friday" }, status: "Rota status", statuses: { proposed: "Proposed", approved: "Approved", published: "Published" }, coverage: "Demand coverage", budget: "Labour budget", scheduled: "Scheduled cost", notes: { proposed: "Recommendation ready for manager review.", approved: "Manager approved the plan. Staff cannot see it yet.", published: "The approved rota is visible to the team." },
    },
    finance: {
      kicker: "Accounting and reconciliation", title: "Close the books without the spreadsheet chase.", body: "Start from the exception, confirm the match and keep the month-end trail clear.", settlement: "Sample settlement", match: "Match sample lines", matched: "Matched lines", variance: "Variance", status: "Reconciliation reviewed", pending: "Ready to review", explanation: "The remaining difference is a fixed sample card-processing adjustment.",
    },
    marketing: {
      kicker: "Campaign and CMS", title: "Turn one campaign into every channel.", body: "Review the brief, landing page and discoverability checks in one approval flow.", campaign: "Campaign", status: "Approval", device: "Preview device", desktop: "Desktop", mobile: "Mobile", approve: "Approve campaign", approved: "Campaign approved", audience: "Audience", checklist: "SEO, GEO and AEO readiness", checks: ["Search intent is explicit", "Entity facts are consistent", "Answer summary is extractable"],
    },
    compact: { heading: "Keep every decision in the same system.", body: "Inventory, relationships and reporting stay connected to the operating view." },
    inventory: { kicker: "Inventory and suppliers", title: "Order to demand.", item: "Low-stock item", onHand: "On hand", suggested: "Suggested order", cost: "Estimated cost", review: "Review order", reviewed: "Order reviewed" },
    crm: { kicker: "Guest and B2B CRM", title: "Know every guest and account.", modes: { guest: "Guest", b2b: "B2B" }, segment: "Segment", prepare: "Prepare audience", prepared: "Audience prepared", profiles: "profiles" },
    reports: {
      kicker: "Monthly reporting", title: "Publish one monthly truth.", tabs: { pnl: "P&L", operations: "Operations", growth: "Growth" }, actual: "Actual", budget: "Budget", variance: "Variance", preview: "Preview report", ready: "Report preview ready", month: "June management report", labels: { netSales: "Net sales", cogs: "Cost of goods", grossProfit: "Gross profit", labour: "Labour", contribution: "Operating contribution" }, operations: [["Order accuracy", "96.4%"], ["Waste to sales", "1.8%"], ["Labour to sales", "24.7%"]], growth: [["Returning guests", "41.2%"], ["Organic discovery", "+8.6%"], ["Campaign revenue", "£6,840"]], explanation: "Revenue finished ahead of plan. Labour pressure came from longer Friday closing shifts.", close: "Close preview",
    },
    faq: {
      title: "What this concept is, and is not.",
      items: {
        concept: ["Is this the finished product?", "No. This website is an interactive product concept using local sample data and no live backend."],
        integrations: ["Which integrations are live?", "None in this concept. Square is planned as the first POS connector."],
        approval: ["Does AI publish rotas or campaigns?", "No. The demos show recommendations that require a manager to approve them."],
        accounting: ["Is RNG HMRC recognised?", "No claim of HMRC recognition is made for this concept."],
        data: ["Is any visitor or business data saved?", "No. Demo state remains in the browser session and resets on refresh."],
      },
    },
    cta: { title: "See how one decision moves through the week.", body: "Explore every product surface with local sample data." },
    footer: "Product demonstration only. No live integrations, customer data or financial records.",
  },
  zh: {
    pageTitle: "RNG｜連接每間餐廳營運的示範平台",
    pageDescription: "互動展示餐飲預測、排班、庫存、財務、CRM 及市場推廣如何連接。",
    language: "EN", skip: "跳到主要內容", backTop: "返回頁頂", primaryNav: "主要導覽",
    nav: [["產品", "#product-demo"], ["平台", "#platform"], ["報表", "#reports"], ["市場推廣", "#marketing"]],
    explore: "探索產品示範", book: "預約示範", menuOpen: "開啟選單", menuClose: "關閉選單",
    concept: "互動產品概念", sample: "示範數據", restart: "重新開始",
    hero: { title: "一套系統，睇清每間店。", body: "連接銷售、人手、庫存、財務及市場推廣，及早發現細小差異。" },
    siteSelector: "營運地點", allSites: "全部分店",
    overview: { title: "今日營運總覽", revenue: "淨營業額", forecast: "預測", labour: "人工成本", gp: "毛利", alerts: "庫存提示", approvals: "待審批", orders: "今日訂單", ahead: "高於預測", below: "低於預測", connected: "同一個即時營運視圖" },
    loop: {
      title: "一個預測，帶動全星期。", body: "每個營運決定都使用同一個需求版本。",
      labels: { forecast: "預測需求", rota: "建立更表", inventory: "安排補貨", reconcile: "財務對數", report: "發佈報表" },
      details: {
        forecast: ["需求有清晰版本", "營業額與貨品需求同步更新。"], rota: ["人手配合需求", "建議工時保持在人工預算內。"], inventory: ["庫存跟隨需求", "建議訂貨量包括食譜用量與損耗。"], reconcile: ["先處理例外項目", "銷售、結算與銀行入數在月結前對齊。"], report: ["只用一個核准版本", "每個來源與 variance 都可以追溯。"],
      },
    },
    forecast: {
      kicker: "預測與差異", title: "在一星期發生之前先測試。", body: "改一次營運假設，營業額、人手及庫存計劃會同步更新。", period: "預測週期", periods: { 7: "未來 7 日", 14: "未來 14 日", 35: "未來 5 星期" }, promotion: "推廣活動", promotions: { none: "沒有", standard: "午市優惠", major: "大型推廣" }, weather: "天氣", weatherOptions: { dry: "乾爽", rain: "下雨", hot: "炎熱" }, footfall: "預計人流", projected: "預計營業額", variance: "與基準差異", labourHours: "建議工時", stock: "庫存需求", ready: "情境已準備", caveat: "只屬示範模型，不代表真實預測或保證結果。",
    },
    workforce: {
      kicker: "員工排班", title: "建立經理能夠審批的更表。", body: "在更表發給員工之前，先查看需求、覆蓋率及成本。", day: "需求日子", days: { weekday: "平日", friday: "星期五" }, status: "更表狀態", statuses: { proposed: "建議", approved: "已審批", published: "已發佈" }, coverage: "需求覆蓋率", budget: "人工預算", scheduled: "已安排成本", notes: { proposed: "建議已準備，等待經理審核。", approved: "經理已批准，員工暫時未能查看。", published: "已批准的更表已向團隊發佈。" },
    },
    finance: {
      kicker: "會計與對數", title: "不用追逐試算表完成月結。", body: "先處理例外項目，確認配對，保留清晰月結紀錄。", settlement: "示範結算項目", match: "配對示範項目", matched: "已配對項目", variance: "差異", status: "對數已審核", pending: "等待審核", explanation: "餘下差異來自固定示範的信用卡處理調整。",
    },
    marketing: {
      kicker: "Campaign 與 CMS", title: "將一個 campaign 延伸至每個 channel。", body: "在同一個審批流程檢查 brief、landing page 及搜尋可見度。", campaign: "Campaign", status: "審批狀態", device: "預覽裝置", desktop: "桌面", mobile: "手機", approve: "批准 campaign", approved: "Campaign 已批准", audience: "受眾", checklist: "SEO、GEO 及 AEO 準備度", checks: ["搜尋意圖清晰", "品牌實體資料一致", "答案摘要可被引用"],
    },
    compact: { heading: "每個決定都留在同一套系統。", body: "庫存、客戶關係及每月報表繼續連接營運視圖。" },
    inventory: { kicker: "庫存與供應商", title: "按需求安排補貨。", item: "低庫存貨品", onHand: "現有庫存", suggested: "建議訂貨", cost: "預計成本", review: "審核訂貨", reviewed: "訂貨已審核" },
    crm: { kicker: "顧客及 B2B CRM", title: "了解每位顧客與商業客戶。", modes: { guest: "顧客", b2b: "B2B" }, segment: "客戶群組", prepare: "準備受眾", prepared: "受眾已準備", profiles: "個檔案" },
    reports: {
      kicker: "每月報表", title: "每月發佈同一版本的營運真相。", tabs: { pnl: "損益表", operations: "營運", growth: "增長" }, actual: "實際", budget: "預算", variance: "差異", preview: "預覽報表", ready: "報表預覽已準備", month: "六月管理報表", labels: { netSales: "淨銷售", cogs: "銷售成本", grossProfit: "毛利", labour: "人工", contribution: "營運貢獻" }, operations: [["訂單準確率", "96.4%"], ["損耗佔銷售", "1.8%"], ["人工佔銷售", "24.7%"]], growth: [["回訪顧客", "41.2%"], ["自然搜尋發現", "+8.6%"], ["Campaign 營業額", "£6,840"]], explanation: "營業額高於計劃，人工壓力來自星期五延長收舖更。", close: "關閉預覽",
    },
    faq: {
      title: "這個概念包括甚麼，不包括甚麼。",
      items: {
        concept: ["這是已完成的產品嗎？", "不是。這個網站是使用本地示範數據的互動產品概念，沒有 live backend。"],
        integrations: ["現時有哪些真實整合？", "這個概念沒有真實整合。Square 是計劃中的首個 POS connector。"],
        approval: ["AI 會直接發佈更表或 campaign 嗎？", "不會。示範中的建議必須由經理審批。"],
        accounting: ["RNG 已獲 HMRC 認可嗎？", "這個產品概念沒有聲稱獲 HMRC 認可。"],
        data: ["會儲存訪客或公司資料嗎？", "不會。示範狀態只存在於當前瀏覽器 session，重新整理後會重設。"],
      },
    },
    cta: { title: "看看一個決定如何影響整個星期。", body: "使用本地示範數據探索每個產品介面。" },
    footer: "只供產品示範，沒有真實整合、客戶資料或財務紀錄。",
  },
};

export function getForecastResult(site, scenario) {
  const periodMultiplier = scenario.period / 7;
  const promotionMultiplier = { none: 1, standard: 1.07, major: 1.16 }[scenario.promotion];
  const weatherMultiplier = { dry: 1, rain: 0.94, hot: 1.05 }[scenario.weather];
  const multiplier = promotionMultiplier * weatherMultiplier * (1 + scenario.footfallChange / 100);
  const revenue = site.forecast * periodMultiplier * multiplier;
  return { revenue, labourHours: Math.round(revenue / 42), stockUnits: Math.round(revenue / 6.8), variance: multiplier - 1 };
}
