---
layout: brick-page
title: "Portfolio"
permalink: /mit/
# Unlisted page for the MIT Media Lab application. Nothing on the site links here: share the URL directly.
# noindex asks search engines not to list it; sitemap: false keeps it out of sitemap.xml.
# Anyone with the URL can still open it. Content lives in _data/mit.yml.
noindex: true
sitemap: false
full_width: true
---

{% include base_path %}
{% assign mit = site.data.mit %}
<p class="mit-for">Prepared for the MIT Media Lab</p>

<section class="record mit-intro" id="intro">
  {% if mit.intro and mit.intro != "" %}
  <p class="lede">{{ mit.intro }}</p>
  {% else %}
  <div class="mit-todo"><h3>Intro goes here</h3><p>Sarah to write: who you are and what you want to work on at the Media Lab. Set <code>intro</code> in <code>_data/mit.yml</code> and this box is replaced.</p></div>
  {% endif %}
</section>

<section class="record" id="groups">
  <h2>Groups I'm applying to</h2>
  <div class="mit-groups">
    {% for g in mit.groups %}
    <article class="card mit-group c-{{ g.color }}" id="group-{{ g.id }}">
      <span class="mit-band" aria-hidden="true"></span>
      <h3>{{ g.name }}</h3>
      <p class="meta">{{ g.pi }}</p>
      {% if g.draft %}<p class="mit-draft">Draft</p>{% endif %}
      <p>{{ g.fit }}</p>
      <p class="mit-start">Start with:</p>
      <ul class="mit-links">
        {% for f in mit.featured %}{% if f.groups contains g.id %}{% assign item = site.portfolio | where: "slug", f.slug | first %}<li><a href="#work-{{ f.slug }}">{{ item.title }}</a></li>{% endif %}{% endfor %}
      </ul>
    </article>
    {% endfor %}
  </div>
</section>

<section class="record" id="featured">
  <h2>Featured work</h2>
  <div class="mit-work">
    {% for f in mit.featured %}{% assign item = site.portfolio | where: "slug", f.slug | first %}
    <article class="card mit-item" id="work-{{ f.slug }}">
      <ul class="mit-chips" aria-label="Relevant to">
        {% for gid in f.groups %}{% assign g = mit.groups | where: "id", gid | first %}<li class="c-{{ g.color }}">{{ g.name }}</li>{% endfor %}
      </ul>
      <h3><a class="card-link" href="{{ base_path }}{{ item.url }}">{{ item.title }}</a></h3>
      <p class="meta">{{ item.role }}{% if item.when %}, {{ item.when }}{% endif %}</p>
      {% if f.draft %}<p class="mit-draft">Draft</p>{% endif %}
      <div class="mit-notes">
        <div><strong>Why it's relevant</strong><p>{{ f.why }}</p></div>
        {% if f.read %}<div><strong>How to read it</strong><p>{{ f.read }}</p></div>{% endif %}
      </div>
      <p class="more"><a href="{{ base_path }}{{ item.url }}">See the project</a></p>
    </article>
    {% endfor %}
  </div>
</section>

<section class="record" id="leadership">
  <h2>Community leadership</h2>
  <ul class="mit-chips" aria-label="Relevant to">
    {% for gid in mit.leadership.groups %}{% assign g = mit.groups | where: "id", gid | first %}<li class="c-{{ g.color }}">{{ g.name }}</li>{% endfor %}
  </ul>
  {% include brick/timeline.html items=site.data.leadership.leadership full=true %}
  <ul class="plain two-col mit-more">
    {% for r in site.data.leadership.other %}{% for key in mit.leadership.other %}{% if r.title contains key %}<li><strong>{{ r.title }}</strong>{% if r.detail != "" %}<small>{{ r.detail }}</small>{% endif %}</li>{% endif %}{% endfor %}{% endfor %}
  </ul>
</section>

<section class="record" id="talks">
  <h2>Talks</h2>
  <ul class="mit-chips" aria-label="Relevant to">
    {% for gid in mit.talks.groups %}{% assign g = mit.groups | where: "id", gid | first %}<li class="c-{{ g.color }}">{{ g.name }}</li>{% endfor %}
  </ul>
  <ul class="plain">
    {% assign talks = site.talks | sort: "order" %}
    {% for t in talks %}<li><strong>{{ t.title }}</strong><small>{{ t.role }}, {{ t.when }}{% assign ex = t.excerpt | strip_html | strip %}{% if ex != "" %}. {{ ex }}{% endif %}</small></li>
    {% endfor %}
  </ul>
</section>

<section class="record" id="background">
  <h2>Background</h2>
  <ul class="plain">
    {% for e in site.data.home.education %}<li><strong>{{ e.school }}</strong><small>{{ e.degree }}, {{ e.dates }}</small></li>
    {% endfor %}
    {% for r in site.data.research.programs %}<li><strong>{{ r.title }}</strong><small>{{ r.org }}, {{ r.when }}</small></li>
    {% endfor %}
    {% assign j = site.data.experience | first %}<li><strong>{{ j.title }}</strong><small>{{ j.org }}, {{ j.when }}</small></li>
  </ul>
  <p class="sub-more"><a href="{{ base_path }}/cv/">See the full CV</a></p>
</section>
