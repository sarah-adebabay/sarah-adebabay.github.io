// Screenshots the built site at common screen widths and checks that the layout holds together.
// Runs on every pull request (see .github/workflows/layout-check.yml) and locally:
//
//   bundle exec jekyll build
//   npm install --no-save playwright && npx playwright install chromium
//   node scripts/layout-check.mjs _site layout-shots
//
// Writes one PNG per page and width into the output folder, plus report.md with the results.
// Exits with an error if any check fails, so a layout regression shows up as a red check on the PR.

import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const SITE = path.resolve(process.argv[2] || '_site');
const OUT = path.resolve(process.argv[3] || 'layout-shots');
const LIVE = (process.argv[4] || 'https://sarah-adebabay.github.io').replace(/\/$/, '');

// Phone, tablet, small laptop, laptop, large desktop.
const WIDTHS = [375, 768, 1024, 1440, 1920];
const PAGES = [['home', '/'], ['cv', '/cv/']];
const SHOT_HEIGHT = 1100;

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.json': 'application/json',
  '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.woff': 'font/woff' };

function fileFor(urlPath) {
  const p = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  let f = path.join(SITE, p);
  if (!f.startsWith(SITE)) return null;
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  return fs.existsSync(f) ? f : null;
}

const server = http.createServer((req, res) => {
  const f = fileFor(req.url);
  if (!f) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const LOCAL = `http://127.0.0.1:${server.address().port}`;

// Measured in the page. Each check returns null when it passes, or a sentence saying what is wrong.
function measure() {
  const vw = document.documentElement.clientWidth;
  const box = (el) => el && el.getBoundingClientRect();
  const problems = [];

  // 1. Nothing pokes out sideways, so there is never a horizontal scrollbar.
  if (document.documentElement.scrollWidth > vw + 1) {
    const wide = [...document.querySelectorAll('body *')]
      .filter((el) => box(el).right > vw + 1 && getComputedStyle(el).position !== 'fixed')
      .slice(0, 3).map((el) => el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''));
    problems.push(`page is ${document.documentElement.scrollWidth}px wide in a ${vw}px window (${wide.join(', ')})`);
  }

  // 2. The hero content sits in the middle of the screen, not hugging one side.
  const hero = document.querySelector('.hero-inner');
  if (hero) {
    const kids = [...hero.children].map(box).filter((b) => b.width > 0);
    const left = Math.min(...kids.map((b) => b.left));
    const right = Math.max(...kids.map((b) => b.right));
    const gapL = left, gapR = vw - right;
    if (Math.abs(gapL - gapR) > Math.max(48, vw * 0.06)) {
      problems.push(`hero content is off-center: ${Math.round(gapL)}px space on the left, ${Math.round(gapR)}px on the right`);
    }
    // 3. On screens 1024px and up, the brick stack sits beside the intro instead of below it.
    const intro = hero.children[0] && box(hero.children[0]);
    const play = box(hero.querySelector('.playground'));
    if (vw >= 1024 && intro && play && play.top >= intro.bottom - 1) {
      problems.push('brick stack is below the intro instead of beside it');
    }
  }

  // 4. The hero, nav bar and page content share the same left edge (the profile column, when shown, sits on it).
  const edges = ['.hero-inner > :first-child', '.bar-inner', '.profile, main', '.page-main', '.topbar-inner']
    .map((s) => [s, [...document.querySelectorAll(s)].find((el) => box(el).width > 0)])
    .filter(([, el]) => el)
    .map(([s, el]) => {
      const b = box(el), pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      return [s, Math.round(b.left + pad)];
    });
  if (edges.length > 1) {
    const xs = edges.map(([, x]) => x);
    if (Math.max(...xs) - Math.min(...xs) > 4) {
      problems.push('content edges do not line up: ' + edges.map(([s, x]) => `${s} at ${x}px`).join(', '));
    }
  }
  return problems;
}

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const rows = [];
let failures = 0;

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: SHOT_HEIGHT }, deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: 'light',
  });
  // Built pages link to the live address; answer those from this build.
  await context.route(`${LIVE}/**`, (route) => {
    const f = fileFor(new URL(route.request().url()).pathname);
    if (!f) return route.fulfill({ status: 404, body: '' });
    return route.fulfill({ status: 200, contentType: TYPES[path.extname(f)] || 'application/octet-stream', body: fs.readFileSync(f) });
  });
  for (const [name, urlPath] of PAGES) {
    if (!fileFor(urlPath)) continue;
    const page = await context.newPage();
    await page.goto(LOCAL + urlPath, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    const problems = await page.evaluate(measure);
    const file = `${name}-${width}.png`;
    await page.screenshot({ path: path.join(OUT, file) });
    failures += problems.length;
    rows.push({ name, width, file, problems });
    console.log(`${problems.length ? 'FAIL' : 'ok  '} ${name} @ ${width}px${problems.map((p) => '\n       - ' + p).join('')}`);
    await page.close();
  }
  await context.close();
}

await browser.close();
server.close();

const report = ['# Layout check', '', `Widths: ${WIDTHS.join(', ')}px. ${failures ? `**${failures} problem(s) found.**` : 'All checks passed.'}`, '',
  '| Page | Width | Result |', '| --- | --- | --- |',
  ...rows.map((r) => `| ${r.name} | ${r.width}px | ${r.problems.length ? r.problems.join('<br>') : 'ok'} |`), ''];
fs.writeFileSync(path.join(OUT, 'report.md'), report.join('\n'));
if (failures) process.exit(1);
