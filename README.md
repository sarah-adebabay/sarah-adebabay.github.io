# Sarah Adebabay: personal site

Built on the [Academic Pages](https://github.com/academicpages/academicpages.github.io) Jekyll template
(MIT license), restyled with a custom "brick" theme: toy-brick primaries, stud motifs, sticker tags,
and a draggable scatter plot on the home page.

## How it works

The site uses the Academic Pages **engine** (Jekyll, content in Markdown and YAML files,
SEO tags, sitemap, RSS feed, and the GitHub deploy workflow) with a **custom layout**: the
single-page brick design, plus matching pages for each project and the full CV. The original
template's sidebar layout is no longer used.

## Where things live

| What | File |
| --- | --- |
| Name, email, GitHub, LinkedIn, site URL | `_config.yml` (the `author:` block and `url`) |
| Hero text, About paragraphs, research interests, contact blurb | `_data/home.yml` |
| Experience timeline | `_data/experience.yml` |
| Research and fellowships | `_data/research.yml` |
| Leadership and community | `_data/leadership.yml` |
| Projects (cards on the home page and their own pages) | one file per project in `_portfolio/` |
| Talks and panels | one file per talk in `_talks/` |
| Full CV page | `_pages/cv.md` |
| CV PDF | `files/Sarah-Adebabay-CV.pdf` |
| Home page layout | `_layouts/brick-home.html` |
| Project and CV page layout | `_layouts/brick-page.html` |
| All styles, colors, and dark mode | `assets/css/brick.css` |
| Scatter plot behavior | `assets/js/brick-plot.js` |

### Adding a project

Copy any file in `_portfolio/` and edit the top section. It appears on the home page and gets
its own page automatically.

```yaml
---
title: "Project name"
collection: portfolio
order: 10            # position on the home page (lower comes first)
role: "Your role, organization"
when: "Jan to May 2025"
excerpt: "One or two sentences for the project card."
topics: ["Topic one", "Topic two"]
# featured: true     # makes it the big card at the top of Projects
---

The full write-up goes here, in Markdown.
```

## Before you publish: fill in the placeholders

Search the repo for `[` and `YOUR-` to find every one.

- [ ] CV PDF: add `files/Sarah-Adebabay-CV.pdf`
- [ ] `_config.yml`: `email` and `linkedin` (url, repository, and GitHub are already set)
- [ ] `_portfolio/data-science-day.md`: optionally link the findings report
- [ ] `_portfolio/name-recognition-audit.md`: year, method, findings, and a report link
- [ ] `_talks/`: year and a one-line description for each panel
- [ ] `_pages/cv.md` and `_data/experience.yml`: dates for Haas and Breakthrough or teaching
- [ ] Confirm you are comfortable naming the Duolingo integration publicly

## Publishing

**The website is always public. A private repo only hides the source code.**

### Option A: GitHub Pages (needs GitHub Pro for a private repo)

1. Create a new **private** repository named `sarah-adebabay.github.io`.
2. Upload these files (drag the unzipped folder's contents into "Add file > Upload files"),
   or push from a terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/sarah-adebabay/sarah-adebabay.github.io.git
   git push -u origin main
   ```
3. In the repo, open **Settings > Pages** and set **Source** to **GitHub Actions**.
   The included workflow (`.github/workflows/jekyll.yml`) builds and deploys on every push.
4. Watch the **Actions** tab; when it turns green, visit `https://sarah-adebabay.github.io`.

### Option B: free, with a private repo (Cloudflare Pages)

1. Push to a private repo as above (any name).
2. In Cloudflare Pages, connect the repo and use:
   - Build command: `bundle exec jekyll build`
   - Output directory: `_site`
   - Environment variable: `RUBY_VERSION = 3.3.6`
3. Update `url` in `_config.yml` to the address Cloudflare gives you.

## Previewing on your computer (optional)

With Docker installed: `docker compose up`, then open http://localhost:4000.
Or with Ruby: `bundle install` then `bundle exec jekyll serve -l -H localhost`.

## Credits

- Site engine: [Academic Pages](https://github.com/academicpages/academicpages.github.io), MIT License.
- ASL fingerspelling illustrations in `assets/asl/`: adapted (colored) from [All the Ways](https://github.com/davidlwatsonjr/alltheways), MIT License (see `assets/asl/LICENSE`).
