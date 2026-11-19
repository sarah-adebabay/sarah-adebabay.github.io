---
layout: brick-page
title: "CV"
permalink: /cv/
redirect_from:
  - /resume
---

{% include base_path %}

<p><a class="btn primary" href="{{ base_path }}/files/Sarah-Adebabay-CV.pdf">Download the full CV (PDF)</a></p>

## Education

* **University of California, Berkeley**, B.A. in Computer Science, minor in Education <span class="cv-when">August 2017 - May 2022</span>
  * Regents’ and Chancellor’s Scholarship - awarded to approximately the top 2% of incoming undergraduate students
* **King’s College London**, University of California Education Abroad Program <span class="cv-when">August 2021 - June 2022</span>
  * Selected as a Benjamin A. Gilman Scholar

## Experience

* **Software Engineer**, LinkedIn <span class="cv-when">Aug 2022 to Sept 2026</span>
  * Built APIs and backend services for large-scale profile features
  * Worked on Resume to Profile, an LLM-based feature that extracts skills from uploaded resumes, and expanded it to more parts of the site
  * Delivered the backend for LinkedIn Profile's first third-party integration (Duolingo) and built a data takeout service for the new partner data
  * Evaluated features through A/B experiments, using SQL to analyze results
  * Handled PII and sensitive data and kept GDPR and data compliance standards current
  * Improved the on-call triage process; mentored a summer intern and wrote the team's first API intern onboarding guide
* **Software Engineering Intern**, Machine Learning Engineering team, SurveyMonkey <span class="cv-when">June to Aug 2020</span>
  * Implemented a pull-based metrics monitoring system for ML models (Python, Pyramid, Docker, Prometheus) and integrated Grafana dashboards
* **Tech Solutions Consultant**, Haas School of Business, UC Berkeley <span class="cv-when">[Dates]</span>
  * Resolved client issues with technology equipment and supported software, and provided AV support for classrooms, conferences, and events

## Research

* **AEP Researcher and Consultant**, Design for Equity Lab, UC Berkeley <span class="cv-when">Aug 2018 to May 2019</span>
  * Advised CS professors on Adaptive Equity-Oriented Pedagogy; collected and coded classroom field notes and student interviews; tested AEP against control classrooms in Stata
* **Fellow**, UC Berkeley x Schmidt Futures Educational Data Science and Learning Engineering Fellowship <span class="cv-when">Jan to May 2021</span>
  * One of 30 undergraduate fellows nationwide; capstone research on teacher hesitancy toward STEM EdTech
* **Participant**, Google CS Research Mentorship Program <span class="cv-when">Jan to May 2021</span>
  * Weekly cohort with a Google HCI researcher discussing CHI papers on HCI and education innovation

## Teaching and curriculum

* **Co-Lead and Curriculum Designer**, Data Science Day <span class="cv-when">Jan to May 2021</span>
  * Co-designed an ethics-centered data science curriculum with students and delivered it to 98 K-12 students, with a pre/post study and findings report
* **Teaching Fellow**, Breakthrough <span class="cv-when">[Dates]</span>
* Taught algebra through calculus at the middle school and college levels

## Leadership and service

* **External Vice President and NSBE Region 6 Senator**, Black Engineering and Science Student Association (NSBE) at UC Berkeley <span class="cv-when">2020 to 2021</span>
  * Raised over $45k in sponsorships and grants; partnered with Google and Genentech on professional development
* **Figma Inaugural Student Fellow** <span class="cv-when">July to Sept 2020</span>
* **President**, Putnam-Freeborn Residence Hall Association <span class="cv-when">2017 to 2018</span>
* **Treasurer**, Somali, Ethiopian, Eritrean, South Sudanese, Sudanese Association <span class="cv-when">2018 to 2019</span>
* **ASUC Staff Member**, Diversity in STEM <span class="cv-when">2019 to 2020</span>
* **Mentor**, LinkedIn Possibilities in Tech Scholarship <span class="cv-when">since 2024</span>
* **SWENext National Youth Advisory Board Member**, Society of Women Engineers

## Honors and fellowships

* Accel Scholar, UC Berkeley EECS (2019 to 2020)
* BESSA Leadership Award (2021)
* Third Place, a16z x MLT Pitch Competition (2020)
* Grace Hopper Celebration Scholarship (2021)
* Koret Undergraduate Research Scholar, UC Berkeley (2017)
* The Achievement Award Program (TAAP) Scholar, Cal Alumni Association (2017 to 2022)
* Rewriting the Code Fellow (2020 to 2021); MLT Career Prep Fellow
* NCWIT Aspirations in Computing National Honorable Mention (2017); SWENext Award (2016)

## Talks and panels

{% assign talks = site.talks | sort: "order" %}
{% for t in talks %}* **{{ t.title }}**, {{ t.role }} <span class="cv-when">{{ t.when }}</span>
{% endfor %}

## Skills and languages

* **Data & Analytics:** Pandas, NumPy, scikit-learn, PyTorch, Stata, Jupyter, matplotlib, seaborn, Spark, Kafka, Grafana
* **Programming & Design:** Python, SQL, Java, JavaScript, REST APIs, Docker, Git, Figma
* **AI Tools:** Claude Code, Cursor, Windsurf, Replit
* **Languages:** American Sign Language (Intermediate), Amharic (Intermediate), Spanish (Beginner)

