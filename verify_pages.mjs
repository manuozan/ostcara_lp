import { chromium } from '@playwright/test'
const dir = 'C:/Users/jmozan_dat/Desktop/PROYECTOS/ostcara_landing/screenshots'
const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()

const routes = [
  ['conocenos', '/conocenos'],
  ['delegaciones', '/delegaciones'],
  ['cartilla', '/cartilla'],
  ['discapacidad', '/discapacidad'],
  ['coseguros', '/coseguros'],
  ['contacto', '/contacto'],
]

for (const [name, path] of routes) {
  await page.goto(`http://localhost:5175${path}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${dir}/page-${name}.png`, fullPage: false })
  console.log(`${name}: ✓`)
}

await browser.close()
