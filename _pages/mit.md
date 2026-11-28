---
layout: brick-page
title: "Portfolio"
permalink: /mit/
# Unlisted page for MIT. Nothing on the site links here: share the URL directly.
# noindex asks search engines not to list it; sitemap: false keeps it out of sitemap.xml.
# Anyone with the URL can still open it.
noindex: true
sitemap: false
full_width: true
---

{% include base_path %}
{% assign projects = site.portfolio | sort: "order" %}

<section class="record mit-intro" id="intro">
  {% if site.data.home.mit_intro %}
  <p class="lede">{{ site.data.home.mit_intro }}</p>
  {% else %}
  <div class="projects"><article class="card todo"><h3>Intro goes here</h3><p>Sarah to write: a few sentences for MIT on who you are and what you want to work on. Set <code>mit_intro</code> in <code>_data/home.yml</code> and this box is replaced.</p></article></div>
  {% endif %}
</section>

<section class="record" id="education">
  <h2>Education</h2>
  <ul class="plain">
    {% for e in site.data.home.education %}<li class="edu"><div class="edu-top"><strong>{{ e.school }}</strong><small>{{ e.degree }}</small><small class="edu-when">{{ e.dates }}</small></div>{% include brick/scholarship.html s=e.scholarship %}
      {% if e.coursework %}<p class="li-about edu-courses"><span class="edu-lbl">Relevant coursework:</span> {{ e.coursework | join: ", " }}</p>{% endif %}</li>
    {% endfor %}
  </ul>
</section>

<section class="record" id="research">
  <h2>Research</h2>
  {% include brick/sections/research.html full=true %}
</section>

<section class="record" id="projects">
  <h2>Projects</h2>
  <div class="projects">
    {% for item in projects %}{% if item.tab == 'work' %}{% include brick/project-card.html item=item %}{% endif %}{% endfor %}
  </div>
</section>

<section class="record" id="talks">
  <h2>Talks</h2>
  <ul class="plain">
    {% assign talks = site.talks | sort: "order" %}
    {% for t in talks %}<li><strong>{{ t.title }}</strong><small>{{ t.role }}, {{ t.when }}{% assign ex = t.excerpt | strip_html | strip %}{% if ex != "" %}. {{ ex }}{% endif %}</small></li>
    {% endfor %}
  </ul>
</section>

<p class="more"><a href="{{ base_path }}/cv/">See the full CV</a></p>
