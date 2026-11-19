// Generates link-preview (Open Graph) images from the freshly built site.
// Runs in GitHub Actions after `jekyll build`, so previews always match the live design.
//
//   node scripts/og-images.mjs _site https://sarah-adebabay.github.io
//
// Writes:
//   _site/images/og-image.png             home page (the default preview)
//   _site/images/og/cv.png                CV page
//   _site/images/og/portfolio-<slug>.png  each project page

import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const SITE = path.resolve(process.argv[2] || '_site');
const LIVE = (process.argv[3] || 'https://sarah-adebabay.github.io').replace(/\/$/, '');
const W = 1200, H = 630;

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.json': 'application/json' };

function fileFor(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  let f = path.join(SITE, p);
  if (!f.startsWith(SITE)) return null;
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  return fs.existsSync(f) ? f : null;
}

// Serve the built site locally so screenshots use this build, not the version already online.
const server = http.createServer((req, res) => {
  const f = fileFor(req.url);
  if (!f) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const LOCAL = `http://127.0.0.1:${server.address().port}`;

// Pages to capture: [url path, output file, extra CSS to frame the shot]
const HOME_CSS = `.hero-inner { padding-top: 40px !important; padding-bottom: 34px !important; }
  .tap-hint, .note, .brick-info { display: none !important; }`;
const PAGE_CSS = `.page-main { padding-top: 40px !important; } .crumb { display: none !important; }`;
const jobs = [['/', 'images/og-image.png', HOME_CSS], ['/cv/', 'images/og/cv.png', PAGE_CSS]];
const portfolio = path.join(SITE, 'portfolio');
if (fs.existsSync(portfolio)) {
  for (const slug of fs.readdirSync(portfolio)) {
    if (fs.existsSync(path.join(portfolio, slug, 'index.html'))) {
      jobs.push([`/portfolio/${slug}/`, `images/og/portfolio-${slug}.png`, PAGE_CSS]);
    }
  }
}

fs.mkdirSync(path.join(SITE, 'images/og'), { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: 'light' });
// Links in the built pages point at the live address; send those requests to this build instead.
await context.route(`${LIVE}/**`, (route) => route.continue({ url: route.request().url().replace(LIVE, LOCAL) }));

let made = 0, failed = 0;
for (const [urlPath, out, css] of jobs) {
  const page = await context.newPage();
  try {
    await page.goto(LOCAL + urlPath, { waitUntil: 'networkidle', timeout: 30000 });
    await page.addStyleTag({ content: css });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SITE, out), clip: { x: 0, y: 0, width: W, height: H } });
    made++;
  } catch (err) {
    failed++;
    console.warn(`Could not capture ${urlPath}: ${err.message}`);
    // Fall back to the home image so the preview link never breaks.
    const home = path.join(SITE, 'images/og-image.png');
    if (out !== 'images/og-image.png' && fs.existsSync(home)) fs.copyFileSync(home, path.join(SITE, out));
  }
  await page.close();
}

await browser.close();
server.close();
console.log(`Preview images: ${made} captured, ${failed} fell back to the home image.`);
