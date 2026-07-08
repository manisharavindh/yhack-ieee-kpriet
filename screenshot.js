const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto('http://localhost:8000', { waitUntil: 'networkidle0' });
  
  // Wait for loader to disappear
  await page.waitForTimeout(4000);
  
  // Scroll down by 800px
  await page.evaluate(() => {
    window.scrollBy(0, 1000);
  });
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'screenshot1.png', fullPage: true });
  
  await browser.close();
})();
