# scripts/

Utility scripts for the Academic Pages template.

## `make-og-image.py`

Generates the default Open Graph / social preview image at
`images/og-image.png` (1200x630 PNG) used by `_includes/seo.html` when a page
does not define its own header image.

```
python3 scripts/make-og-image.py
```

Requirements:

- Python 3 with [Pillow](https://python-pillow.org) (`pip install Pillow`)
- A TrueType font; defaults to DejaVu Sans (`/usr/share/fonts/truetype/dejavu`),
  override with the `FONT_DIR` environment variable
- The site favicon at `images/favicon-512x512.png` (already in the template);
  it is composited as the card logo

The output is byte-reproducible for a given Pillow/font version and is committed
to the repo, so the build itself does not need Pillow.

## `layout-check.mjs`

Screenshots the built home and CV pages at 375, 768, 1024, 1440 and 1920px wide and
checks that the layout holds together at each width:

- nothing sticks out sideways (no horizontal scrollbar)
- the hero is centered on the screen, not hugging one side
- from 1024px up, the brick stack sits beside the intro, not below it
- the hero, nav bar and page content start at the same left edge

It runs on every pull request that touches the design (`.github/workflows/layout-check.yml`).
The screenshots are attached to the run as the `layout-shots` artifact and the results
appear in the run summary. To run it locally:

```
bundle exec jekyll build
npm install --no-save playwright && npx playwright install chromium
node scripts/layout-check.mjs _site layout-shots
```

All page-width settings live in three tokens at the top of `assets/css/brick.css`:
`--container` (max page width), `--gutter` (side padding) and `--reading` (text width).
