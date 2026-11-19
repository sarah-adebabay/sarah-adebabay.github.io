---
layout: brick-page
title: "CV"
permalink: /cv/
section: cv
pdf: /files/Sarah-Adebabay-CV.pdf
redirect_from:
  - /resume
  - /all/
---

{% include base_path %}
{% assign secs = site.data.tabs | where_exp: "t", "t.id != 'about'" %}
<div class="cv-grid">
<nav class="cv-index" aria-label="On this page">
  <p class="lbl">On this page</p>
  <ul>
    <li><a href="#education">Education</a></li>
    <li><a href="#research">Research</a><ul><li><a href="#research-experience">Experience</a></li><li><a href="#research-programs">Programs</a></li></ul></li>
    <li><a href="#work">Work</a><ul><li><a href="#industry-experience">Industry experience</a></li><li><a href="#projects">Projects</a></li></ul></li>
    <li><a href="#teaching">Teaching</a></li>
    <li><a href="#service">Service</a><ul><li><a href="#leadership">Leadership</a></li><li><a href="#speaking">Speaking</a></li></ul></li>
    <li><a href="#awards">Awards</a><ul><li><a href="#awards-and-honors">Awards and honors</a></li><li><a href="#fellowships">Fellowships</a></li></ul></li>
    <li><a href="#skills">Skills and languages</a></li>
  </ul>
</nav>
<div class="cv-flow">

<section class="record" id="education">
  <h2>Education</h2>
  <ul class="plain">
    <li><strong>University of California, Berkeley</strong><small>B.A. in Computer Science, minor in Education, August 2017 to May 2022</small><p class="li-about">Regents’ and Chancellor’s Scholarship, awarded to approximately the top 2% of incoming undergraduate students</p></li>
    <li><strong>King’s College London</strong><small>University of California Education Abroad Program, August 2021 to June 2022</small><p class="li-about">Selected as a Benjamin A. Gilman Scholar</p></li>
  </ul>
</section>

{% for s in secs %}
<section class="record" id="{{ s.id }}">
  <h2>{{ s.label }}</h2>
  {% capture inc %}brick/sections/{{ s.id }}.html{% endcapture %}{% include {{ inc }} full=true %}
</section>
{% endfor %}

<section class="record" id="skills">
  <h2>Skills and languages</h2>
  <ul class="plain two-col">
    <li><strong>Data and analytics</strong><small>Pandas, NumPy, scikit-learn, PyTorch, Stata, Jupyter, matplotlib, seaborn, Spark, Kafka, Grafana</small></li>
    <li><strong>Programming and design</strong><small>Python, SQL, Java, JavaScript, REST APIs, Docker, Git, Figma</small></li>
    <li><strong>AI tools</strong><small>Claude Code, Cursor, Windsurf, Replit</small></li>
    <li><strong>Languages</strong><small>American Sign Language (Intermediate), Amharic (Intermediate), Spanish (Beginner)</small></li>
  </ul>
</section>
</div>
</div>
