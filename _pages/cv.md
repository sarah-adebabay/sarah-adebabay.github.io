---
layout: brick-page
title: "CV"
permalink: /cv/
section: cv
redirect_from:
  - /resume
  - /all/
---

{% include base_path %}
{% assign secs = site.data.tabs | where_exp: "t", "t.id != 'about'" %}
<p><a class="btn primary" href="{{ base_path }}/files/Sarah-Adebabay-CV.pdf">Download the full CV (PDF)</a></p>

<nav class="toc" aria-label="On this page">
  <ul>
    <li><a href="#education">Education</a></li>
    <li><a href="#research">Research</a><span><a href="#research-experience">Experience</a><a href="#research-programs">Programs</a></span></li>
    <li><a href="#work">Work</a><span><a href="#industry-experience">Industry experience</a><a href="#projects">Projects</a></span></li>
    <li><a href="#teaching">Teaching</a></li>
    <li><a href="#service">Service</a><span><a href="#leadership">Leadership</a><a href="#speaking">Speaking</a></span></li>
    <li><a href="#awards">Awards</a><span><a href="#awards-and-honors">Awards and honors</a><a href="#fellowships">Fellowships</a></span></li>
    <li><a href="#skills">Skills and languages</a></li>
  </ul>
</nav>

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
