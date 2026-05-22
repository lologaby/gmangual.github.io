const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:5179/');
  await page.waitForTimeout(6000);
  
  // Dismiss UC dialog
  const ucBtn = page.locator('.win98-uc-btn');
  if (await ucBtn.isVisible().catch(() => false)) {
    await ucBtn.click();
    await page.waitForTimeout(300);
  }
  
  // Screenshot 1: Hero desktop (should show no scroll sections below)
  await page.screenshot({ path: 'screenshots/desktop-1-hero.png' });
  console.log('desktop-1-hero.png saved');
  
  // Check if scroll sections exist
  const hasScrollSections = await page.locator('.portfolio-scroll-sections').isVisible().catch(() => false);
  console.log('Scroll sections visible on desktop:', hasScrollSections);
  
  // Try dragging the first window frame by its titlebar
  const titlebar = page.locator('.window-frame').first().locator('.window-titlebar');
  const box = await titlebar.boundingBox();
  if (box) {
    console.log('Titlebar found at:', box.x, box.y, box.width, box.height);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 300, box.y + box.height / 2 + 200, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/desktop-2-dragged.png' });
    console.log('desktop-2-dragged.png saved');
  } else {
    console.log('No titlebar found for dragging');
  }
  
  // Click projects icon
  await page.click('.desktop-icons button', { hasText: 'projects' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/desktop-3-projects.png' });
  console.log('desktop-3-projects.png saved');
  
  await browser.close();
  console.log('Desktop test done!');
})();
