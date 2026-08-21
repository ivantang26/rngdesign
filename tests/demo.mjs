import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const url = "http://127.0.0.1:4174";
const preview = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4174"], { stdio: "ignore" });

async function waitForPreview() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { const response = await fetch(url); if (response.ok) return; } catch { /* preview is still starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Preview server did not start");
}

try {
  await waitForPreview();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const browserErrors = [];
  const externalRequests = [];
  page.on("console", (message) => { if (message.type() === "error") browserErrors.push(message.text()); });
  page.on("request", (request) => { if (!request.url().startsWith(url)) externalRequests.push(request.url()); });

  await page.goto(url, { waitUntil: "networkidle" });
  await assertPageHasNoOverflow(page, 1440);
  await assertHeroAndDisclosures(page);
  await assertSharedSiteAndWorkflow(page);
  await assertForecastAndDownstreamDemos(page);
  await assertWorkforceFinanceMarketing(page);
  await assertCrmAndReports(page);
  await assertTranslation(page);
  await assertDarkReducedMotion(browser);

  for (const width of [375, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await assertPageHasNoOverflow(page, width);
  }

  assert.deepEqual(browserErrors, [], `Browser console errors: ${browserErrors.join("\n")}`);
  assert.deepEqual(externalRequests, [], `Unexpected external requests: ${externalRequests.join("\n")}`);
  assert.equal(await page.evaluate(() => localStorage.length), 0, "Demo state must not persist to localStorage");
  await browser.close();
  console.log("All product demos and layouts passed at 375, 768, 1024 and 1440 pixels.");
} finally {
  preview.kill("SIGTERM");
}

async function assertPageHasNoOverflow(page, expectedWidth) {
  const sizes = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: document.documentElement.clientWidth }));
  assert.equal(sizes.viewport, expectedWidth);
  assert.equal(sizes.body, sizes.viewport, `Horizontal overflow at ${expectedWidth}px`);
}

async function assertHeroAndDisclosures(page) {
  await assertVisible(page.getByRole("heading", { name: "Run every site from one operating system." }));
  await assertVisible(page.getByRole("link", { name: "Explore the demo" }).first());
  assert.equal(await page.getByRole("link", { name: "Book a demo" }).count(), 0);
  await assertVisible(page.getByText("Interactive product concept", { exact: true }));
  assert.ok(await page.getByText("Sample data").count() >= 7);
}

async function assertSharedSiteAndWorkflow(page) {
  await page.getByRole("button", { name: "Manchester" }).click();
  const hero = page.locator(".hero-demo-window");
  await assertVisible(hero.getByText("£16,460"));
  await assertVisible(hero.getByText("4 Stock alerts"));
  await page.getByRole("tab", { name: "Order stock" }).click();
  await assertVisible(hero.getByRole("heading", { name: "Stock follows demand" }));
}

async function assertForecastAndDownstreamDemos(page) {
  await page.getByLabel("Promotion").selectOption("major");
  await page.getByLabel("Weather").selectOption("rain");
  await page.getByLabel("Expected footfall").fill("15");
  await assertVisible(page.locator(".forecast-output").getByText("£20,038"));
  await assertVisible(page.locator(".forecast-output").getByText("Scenario ready"));
  await assertVisible(page.locator(".workforce-demo").getByText("£5,915"));
  await assertVisible(page.locator(".inventory-demo").getByText("70kg"));
  await page.locator(".inventory-demo").getByRole("button", { name: "Review order" }).click();
  await assertVisible(page.locator(".inventory-demo").getByRole("button", { name: "Order reviewed" }));
}

async function assertWorkforceFinanceMarketing(page) {
  const workforce = page.locator(".workforce-demo");
  await workforce.getByRole("button", { name: "Approved" }).click();
  await assertVisible(workforce.getByText("Manager approved the plan. Staff cannot see it yet."));
  await workforce.getByRole("button", { name: "Published" }).click();
  await assertVisible(workforce.getByText("The approved rota is visible to the team."));

  const finance = page.locator(".finance-demo");
  await assertVisible(finance.getByText("-£25.00"));
  await finance.getByRole("button", { name: "Match sample lines" }).click();
  await assertVisible(finance.getByText("Reconciliation reviewed"));

  const marketing = page.locator(".marketing-demo");
  await marketing.getByLabel("Campaign").selectOption("events");
  await marketing.getByRole("button", { name: "Mobile" }).click();
  await marketing.getByRole("button", { name: "Approve campaign" }).click();
  await assertVisible(page.getByText("Campaign approved").last());
  assert.equal(await page.locator(".campaign-preview.mobile").count(), 1);
}

async function assertCrmAndReports(page) {
  const crm = page.locator(".crm-demo");
  await crm.getByRole("button", { name: "B2B" }).click();
  await crm.getByLabel("Segment").selectOption("office");
  await crm.getByRole("button", { name: "Prepare audience" }).click();
  await assertVisible(crm.getByRole("button", { name: "Audience prepared" }));

  const reports = page.locator(".reports-demo");
  await reports.getByRole("tab", { name: "Growth" }).click();
  await assertVisible(reports.getByText("Returning guests"));
  await reports.getByRole("button", { name: "Preview report" }).click();
  const dialog = page.getByRole("dialog", { name: "June management report" });
  await assertVisible(dialog);
  const close = dialog.getByRole("button", { name: "Close preview" });
  assert.equal(await close.evaluate((element) => element === document.activeElement), true, "Report close control should receive focus");
  await page.keyboard.press("Escape");
  assert.equal(await dialog.count(), 0);
  assert.equal(await reports.getByRole("button", { name: "Preview report" }).evaluate((element) => element === document.activeElement), true, "Report trigger should regain focus");
}

async function assertTranslation(page) {
  await page.getByRole("button", { name: "繁中" }).click();
  await assertVisible(page.getByRole("heading", { name: "一套系統，睇清每間店。" }));
  assert.equal(await page.title(), "RNG｜連接每間餐廳營運的示範平台");
  assert.equal(await page.locator("html").getAttribute("lang"), "zh-Hant");
  await page.setViewportSize({ width: 375, height: 900 });
  await assertPageHasNoOverflow(page, 375);
  await page.setViewportSize({ width: 1440, height: 900 });
}

async function assertDarkReducedMotion(browser) {
  const page = await browser.newPage({ colorScheme: "dark", reducedMotion: "reduce", viewport: { width: 1024, height: 900 } });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  const bodyBackground = await page.locator("body").evaluate((element) => getComputedStyle(element).backgroundColor);
  assert.equal(bodyBackground, "rgb(18, 25, 22)");
  const scrollBehaviour = await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior);
  assert.equal(scrollBehaviour, "auto");
  await page.close();
}

async function assertVisible(locator) {
  await locator.waitFor({ state: "visible" });
  assert.equal(await locator.isVisible(), true);
}
