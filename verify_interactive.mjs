import { chromium } from '@playwright/test';
const dir = 'C:/Users/jmozan_dat/Desktop/PROYECTOS/ostcara_landing/screenshots';

const browser = await chromium.launch({ headless: true });

// Test slider autoplay - wait for slide 2
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://localhost:5175', { waitUntil: 'networkidle' });
await page.waitForTimeout(6000); // wait one autoplay cycle
await page.screenshot({ path: `${dir}/desktop-slide2.png` });
const slide2Text = await page.textContent('.swiper-slide-active');
console.log('Slide 2 text (after autoplay):', slide2Text?.substring(0, 80));

// Test sticky header - scroll down
await page.evaluate(() => window.scrollTo(0, 400));
await page.waitForTimeout(500);
const headerFixed = await page.$eval('header', el => el.className);
console.log('Header class after scroll:', headerFixed.includes('fixed') ? 'STICKY ✓' : 'NOT STICKY');

// Test mobile menu open
const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
const mobilePage = await mobileCtx.newPage();
await mobilePage.goto('http://localhost:5175', { waitUntil: 'networkidle' });
await mobilePage.click('button[aria-label="Menú"]');
await mobilePage.waitForTimeout(300);
await mobilePage.screenshot({ path: `${dir}/mobile-menu-open.png` });
const menuVisible = await mobilePage.$('nav ul li a');
console.log('Mobile menu items visible:', menuVisible ? 'YES ✓' : 'NO ✗');

await browser.close();
console.log('Interactive tests done');
