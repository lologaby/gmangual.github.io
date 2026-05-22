import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await context.newPage();

await page.goto('http://127.0.0.1:5174/');
await page.waitForTimeout(7000);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/explore-1-initial.png' });

// Click start menu
await page.click('.taskbar-start');
await page.waitForTimeout(500);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/explore-2-startmenu.png' });

// Click projects in start menu
await page.click('.start-menu-nav a[href="#projects"]');
await page.waitForTimeout(1000);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/explore-3-after-projects-click.png' });

// Scroll down
await page.evaluate(() => window.scrollBy(0, 800));
await page.waitForTimeout(500);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/explore-4-scrolled.png' });

// Drag ALEX_ARCHIVE.EXE window
const win = await page.locator('.window-frame').first();
const titlebar = await win.locator('.window-titlebar').first();
const box = await titlebar.boundingBox();
await titlebar.dragTo(page.locator('body'), { targetPosition: { x: 300, y: 300 } });
await page.waitForTimeout(500);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/explore-5-dragged.png' });

// Minimize
const minimizeBtn = await win.locator('button[aria-label="Minimize"]').first();
await minimizeBtn.click();
await page.waitForTimeout(500);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/explore-6-minimized.png' });

// Restore from taskbar
const taskbarBtn = await page.locator('.taskbar-programs button').first();
await taskbarBtn.click();
await page.waitForTimeout(500);
await page.screenshot({ path: '/home/gabongo/gmangual.github.io/screenshots/explore-7-restored.png' });

console.log('Done exploring');
await browser.close();
