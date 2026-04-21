#!/bin/bash
cd /tmp && node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:5175/', { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: '/Volumes/My Book Duo 4T/PROJECT03（after CW/00.PROJECTS MAC Studio/02.claude_test/public/app_screenshot.png',
    fullPage: true
  });
  await browser.close();
  console.log('screenshot saved to public/app_screenshot.png');
})();
"
