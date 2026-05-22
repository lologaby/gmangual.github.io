import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await context.newPage();

await page.goto('http://127.0.0.1:5174/');
await page.waitForTimeout(7000);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/v2-1-initial.png' });

// Click start menu -> projects
await page.click('.taskbar-start');
await page.waitForTimeout(500);
await page.click('.start-menu-nav button', { hasText: 'projects' });
await page.waitForTimeout(1000);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/v2-2-projects-window.png' });

// Click about desktop icon
await page.click('.desktop-icons button', { hasText: 'about' });
await page.waitForTimeout(800);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/v2-3-about-window.png' });

// Check scrollbar visible?
const hasScrollbar = await page.evaluate(() => {
  return window.innerWidth > document.documentElement.clientWidth;
});
console.log('Scrollbar visible?', hasScrollbar);

await browser.close();
