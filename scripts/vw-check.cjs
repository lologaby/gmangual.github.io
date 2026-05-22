const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://127.0.0.1:5173/');
  await page.waitForTimeout(8000);
  const ucBtn = page.locator('.win98-uc-btn, .uc-ok');
  if (await ucBtn.isVisible().catch(() => false)) await ucBtn.first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/vw-desktop.png' });
  
  await page.locator('.desktop-icons button:has-text("projects")').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/vw-projects.png' });
  
  await page.locator('.desktop-icons button:has-text("homelab")').click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'screenshots/vw-homelab.png' });
  
  const mobile = await browser.newContext({ viewport: { width: 393, height: 852 }, isMobile: true });
  const mPage = await mobile.newPage();
  await mPage.goto('http://127.0.0.1:5173/');
  await mPage.waitForTimeout(6000);
  const ucBtn2 = mPage.locator('.win98-uc-btn, .uc-ok');
  if (await ucBtn2.isVisible().catch(() => false)) await ucBtn2.first().click();
  await mPage.waitForTimeout(300);
  await mPage.screenshot({ path: 'screenshots/vw-mobile.png', fullPage: false });
  
  await browser.close();
  console.log('Done');
})();
