# Sarah Adebabay: Personal Site

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

## Credits

- Site engine: [Academic Pages](https://github.com/academicpages/academicpages.github.io), MIT License.
- ASL fingerspelling illustrations in `assets/asl/`: adapted (colored) from [All the Ways](https://github.com/davidlwatsonjr/alltheways), MIT License (see `assets/asl/LICENSE`).
