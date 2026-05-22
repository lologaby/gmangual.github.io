import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await context.newPage();

await page.goto('http://127.0.0.1:5174/');
await page.waitForTimeout(7000);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/v3-1-initial.png' });

// Click desktop icon "projects"
await page.click('.desktop-icons button', { hasText: 'projects' });
await page.waitForTimeout(800);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/v3-2-projects-open.png' });

// Click desktop icon "about"
await page.click('.desktop-icons button', { hasText: 'about' });
await page.waitForTimeout(800);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/v3-3-about-open.png' });

console.log('Done v3');
await browser.close();
