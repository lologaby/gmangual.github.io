const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // iPhone 14 Pro viewport
  const context = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5175/');
  
  // Wait for boot then scroll through sections
  await page.waitForTimeout(6000);
  await page.screenshot({ path: 'screenshots/mobile-1-hero.png', fullPage: false });
  console.log('mobile-1-hero.png saved');
  
  // Scroll down through sections
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/mobile-2-about.png', fullPage: false });
  console.log('mobile-2-about.png saved');
  
  await page.evaluate(() => window.scrollTo(0, 2200));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/mobile-3-projects.png', fullPage: false });
  console.log('mobile-3-projects.png saved');
  
  await page.evaluate(() => window.scrollTo(0, 4200));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/mobile-4-skills.png', fullPage: false });
  console.log('mobile-4-skills.png saved');
  
  await page.evaluate(() => window.scrollTo(0, 6500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/mobile-5-contact.png', fullPage: false });
  console.log('mobile-5-contact.png saved');
  
  await browser.close();
  console.log('All mobile screenshots done!');
})();
