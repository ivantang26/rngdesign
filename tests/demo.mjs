import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const url = "http://127.0.0.1:4174";
const preview = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4174"], {
  stdio: "ignore",
});

async function waitForPreview() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The preview server can take a moment to bind its port.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Preview server did not start");
}

try {
  await waitForPreview();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const browserErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await assertPageHasNoOverflow(page, 1440);
  await assertHeroAndLabels(page);
  await assertSiteSwitch(page);
  await assertForecastControls(page);
  await assertRotaAndReportStates(page);
  await assertTranslation(page);
  await assertDarkReducedMotion(browser);

  for (const width of [375, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await assertPageHasNoOverflow(page, width);
  }

  assert.deepEqual(browserErrors, [], `Browser console errors: ${browserErrors.join("\n")}`);
  await browser.close();
  console.log("Interactive demo checks passed at 375, 768, 1024 and 1440 pixels.");
} finally {
  preview.kill("SIGTERM");
}

async function assertPageHasNoOverflow(page, expectedWidth) {
  const sizes = await page.evaluate(() => ({
    body: document.body.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  assert.equal(sizes.viewport, expectedWidth);
  assert.equal(sizes.body, sizes.viewport, `Horizontal overflow at ${expectedWidth}px`);
}

async function assertHeroAndLabels(page) {
  await assertVisible(page.getByRole("heading", { name: "Run every site from one operating system." }));
  await assertVisible(page.getByText("Interactive product concept").first());
  await assertVisible(page.getByText("Sample data").first());
  assert.equal(await page.getByRole("link", { name: "Book a demo" }).count(), 0);
}

async function assertSiteSwitch(page) {
  await page.getByRole("button", { name: "Manchester" }).click();
  const board = page.locator(".overview-board");
  await assertVisible(board.getByText("£16,460"));
  await assertVisible(board.getByText("4 Stock alerts"));
}

async function assertForecastControls(page) {
  await page.getByLabel("Promotion").selectOption("major");
  await page.getByLabel("Weather").selectOption("rain");
  await page.getByLabel(/Expected footfall/).fill("15");
  await assertVisible(page.locator(".simulator-results").getByText("£20,038"));
}

async function assertRotaAndReportStates(page) {
  await page.getByRole("button", { name: "Published" }).click();
  await assertVisible(page.getByText("The approved rota is now visible to the team."));
  await page.getByRole("tab", { name: "Growth" }).click();
  await assertVisible(page.getByText("Returning guests"));
}

async function assertTranslation(page) {
  await page.getByRole("button", { name: "繁中" }).click();
  await assertVisible(page.getByRole("heading", { name: "一套系統，睇清每間店。" }));
  assert.equal(await page.title(), "RNG｜一套連接餐飲營運的系統");
}

async function assertDarkReducedMotion(browser) {
  const page = await browser.newPage({
    colorScheme: "dark",
    reducedMotion: "reduce",
    viewport: { width: 1024, height: 900 },
  });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  const bodyBackground = await page.locator("body").evaluate((element) => getComputedStyle(element).backgroundColor);
  assert.equal(bodyBackground, "rgb(17, 24, 21)");
  await page.close();
}

async function assertVisible(locator) {
  await locator.waitFor({ state: "visible" });
  assert.equal(await locator.isVisible(), true);
}
