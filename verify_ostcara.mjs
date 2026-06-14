import { chromium } from '@playwright/test';
import { existsSync, mkdirSync } from 'fs';

const screenshotsDir = 'C:/Users/jmozan_dat/Desktop/PROYECTOS/ostcara_landing/screenshots';
if (!existsSync(screenshotsDir)) mkdirSync(screenshotsDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

// Desktop view
const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const desktopPage = await desktopCtx.newPage();
await desktopPage.goto('http://localhost:5175', { waitUntil: 'networkidle', timeout: 15000 });
await desktopPage.waitForTimeout(2000);
await desktopPage.screenshot({ path: `${screenshotsDir}/desktop-full.png`, fullPage: true });
console.log('Desktop screenshot saved');

const checks = [
  ['Header logo', 'header img[alt="OSTCARA"]'],
  ['Navigation', 'header nav'],
  ['Hero slider', '.hero-slider-container'],
  ['CTA button', 'a[href="https://afiliados.ostcara.org.ar"]'],
  ['Services grid', 'section .grid'],
  ['Footer', 'footer'],
];
for (const [name, selector] of checks) {
  const el = await desktopPage.$(selector);
  console.log(`${name}: ${el ? 'FOUND' : 'MISSING'}`);
}

// Mobile view
const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
const mobilePage = await mobileCtx.newPage();
await mobilePage.goto('http://localhost:5175', { waitUntil: 'networkidle', timeout: 15000 });
await mobilePage.waitForTimeout(1000);
await mobilePage.screenshot({ path: `${screenshotsDir}/mobile-full.png`, fullPage: true });
console.log('Mobile screenshot saved');

const menuBtn = await mobilePage.$('button[aria-label="Menú"]');
console.log(`Mobile menu button: ${menuBtn ? 'FOUND' : 'MISSING'}`);

await browser.close();
console.log('Done!');
