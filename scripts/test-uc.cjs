const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:38155/');
  await page.waitForTimeout(6000); // longer wait for boot + transition
  
  // Screenshot 1: Desktop after boot
  await page.screenshot({ path: 'screenshots/v5-1-desktop.png' });
  console.log('Screenshot 1 saved: v5-1-desktop.png');
  
  // Count desktop icons
  const icons = await page.locator('.desktop-icons button').all();
  console.log(`Found ${icons.length} desktop icons`);
  for (let i = 0; i < icons.length; i++) {
    const text = await icons[i].textContent();
    console.log(`  [${i}] ${text}`);
  }
  
  // Click coming_soon.txt (last icon)
  await icons[icons.length - 1].click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/v5-2-uc-dialog.png' });
  console.log('Screenshot 2 saved: v5-2-uc-dialog.png');
  
  // Check if dialog exists
  const ucVisible = await page.locator('.uc-dialog').isVisible().catch(() => false);
  console.log(`UC dialog visible: ${ucVisible}`);
  
  if (ucVisible) {
    await page.locator('.uc-ok').click();
    await page.waitForTimeout(300);
  }
  
  // Click projects (second icon)
  await icons[1].click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/v5-3-projects.png' });
  console.log('Screenshot 3 saved: v5-3-projects.png');
  
  await browser.close();
  console.log('All tests done!');
})();
