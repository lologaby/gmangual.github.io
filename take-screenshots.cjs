const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:5173/');

  // Wait 7 seconds for boot sequence to finish
  await page.waitForTimeout(7000);

  // Try to restore minimized windows by clicking taskbar buttons
  try {
    const taskbarButtons = await page.locator('.taskbar button, .panel button, .dock button, [class*="taskbar"] button, [class*="dock"] button').all();
    for (const btn of taskbarButtons) {
      const classAttr = await btn.getAttribute('class');
      if (classAttr && classAttr.toLowerCase().includes('minimized')) {
        await btn.click();
        await page.waitForTimeout(300);
      }
    }
  } catch (e) {
    // Ignore taskbar errors
  }

  // Wait a moment after potential clicks
  await page.waitForTimeout(1000);

  // Take full-page screenshot
  await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/final-desktop.png', fullPage: true });

  // Take viewport-only screenshot
  await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/final-desktop-viewport.png', fullPage: false });

  await browser.close();
})();
