---
layout: brick-page
title: "Full record"
permalink: /all/
section: all
---

{% assign secs = site.data.tabs | where_exp: "t", "t.id != 'about'" %}
<nav class="toc" aria-label="On this page">
  <ul>
    <li><a href="#research">Research</a><span><a href="#research-experience">Experience</a><a href="#research-programs">Programs</a></span></li>
    <li><a href="#work">Work</a><span><a href="#industry-experience">Industry experience</a><a href="#projects">Projects</a></span></li>
    <li><a href="#teaching">Teaching</a></li>
    <li><a href="#service">Service</a><span><a href="#leadership">Leadership</a><a href="#speaking">Speaking</a></span></li>
    <li><a href="#awards">Awards</a><span><a href="#awards-and-honors">Awards and honors</a><a href="#fellowships">Fellowships</a></span></li>
  </ul>
</nav>

{% for s in secs %}
<section class="record" id="{{ s.id }}">
  <h2>{{ s.label }}</h2>
  {% capture inc %}brick/sections/{{ s.id }}.html{% endcapture %}{% include {{ inc }} full=true %}
</section>
{% endfor %}
