import { projects, site } from "./data.js";
import { projectImages } from "./data/project-images.js";

const displayProjects = projects
  .map((project) => ({
    ...project,
    ...projectImages[project.id],
    image: Object.hasOwn(projectImages[project.id] || {}, "image")
      ? projectImages[project.id].image
      : project.image || "",
    gallery: Object.hasOwn(projectImages[project.id] || {}, "gallery")
      ? projectImages[project.id].gallery
      : project.gallery || [],
  }))
  .sort((a, b) => a.number.localeCompare(b.number));

const app = document.querySelector("#app");
const categories = ["All", "UI/UX Design", "Website Development"];
let activeCategory = "All";
let mobileMenuOpen = false;
let lightboxReturnFocus = null;
let previousDocumentOverflow = "";
let previousBodyOverflow = "";
let lightboxScrollPosition = 0;
let lightboxGallery = null;
let lightboxGalleryScrollPosition = 0;

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });

const safeUrl = (value = "") => {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
};

const iconArrow = '<span class="arrow" aria-hidden="true">↗</span>';
const contactLink = (label, url, className = "text-link") => {
  return safeUrl(url)
    ? `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ${iconArrow}</a>`
    : "";
};

function projectExternalLink(project, className = "button button-dark glass-control") {
  const designProject = project.category === "UI/UX Design";
  return contactLink(
    designProject ? "View Figma Design" : "Visit Website",
    designProject ? project.designUrl : project.liveUrl,
    className,
  );
}

function header() {
  return `
    <header class="site-header">
      <div class="header-inner">
        <a class="wordmark" href="#home" aria-label="${escapeHtml(site.name)} home">${escapeHtml(site.name)}<span class="wordmark-dot">.</span></a>
        <button class="menu-toggle glass-control" type="button" aria-expanded="${mobileMenuOpen}" aria-controls="primary-navigation" aria-label="${mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}">
          <span></span><span></span>
        </button>
        <nav id="primary-navigation" class="primary-navigation glass-nav${mobileMenuOpen ? " is-open" : ""}" aria-label="Main navigation">
          <a href="#work" data-section="work">Work</a>
          <a href="#about" data-section="about">About</a>
          <a href="#skills" data-section="skills">Skills</a>
          <a href="#contact" data-section="contact">Contact</a>
        </nav>
        ${site.availability ? '<span class="availability"><i aria-hidden="true"></i> Available for select work</span>' : ""}
      </div>
    </header>`;
}

function projectVisual(project, large = false) {
  if (project.image) {
    return `<div class="project-visual project-visual-image${large ? " project-visual-large" : ""}">
      <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt || `${project.name} project screen`)}" ${large ? "" : 'loading="lazy"'} />
    </div>`;
  }
  return `<div class="project-visual visual-${escapeHtml(project.accent)}${large ? " project-visual-large" : ""}" aria-label="Project artwork unavailable for ${escapeHtml(project.name)}">
    <div class="visual-art" aria-hidden="true">
      <span class="visual-mark">${escapeHtml(project.number)}</span>
      <span class="visual-name">${escapeHtml(project.name)}</span>
      <span class="visual-orbit"></span>
      <span class="visual-card"></span>
    </div>
    <span class="visual-caption">Project image unavailable</span>
  </div>`;
}

function projectCard(project) {
  const externalLink = projectExternalLink(project);
  return `
    <article class="project-card">
      <a class="project-card-link" href="#/project/${encodeURIComponent(project.id)}" aria-label="View ${escapeHtml(project.name)} project">
        ${projectVisual(project)}
        <div class="project-card-copy">
          <div>
            <p class="eyebrow project-category">${escapeHtml(project.category)} <span>·</span> ${escapeHtml(project.number)}</p>
            <h3>${escapeHtml(project.name)}</h3>
            ${project.description ? `<p class="project-description">${escapeHtml(project.description)}</p>` : ""}
          </div>
          <span class="card-arrow" aria-hidden="true">↗</span>
        </div>
        ${project.tags.length ? `<ul class="tag-list" aria-label="Project tools and topics">
          ${project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}
        </ul>` : ""}
      </a>
      ${externalLink ? `<div class="project-card-actions">${externalLink}</div>` : ""}
    </article>`;
}

function homePage() {
  const filtered = displayProjects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory,
  );
  const email = site.email.trim();
  const emailHref = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? `mailto:${email}`
    : "";
  const emailLink = emailHref
    ? `<a class="button button-dark glass-control" href="${escapeHtml(emailHref)}">Email me ${iconArrow}</a>`
    : "";

  return `${header()}
    <main id="main">
      <section class="hero section-shell" id="home" aria-labelledby="hero-title">
        <div class="hero-topline">
          <p class="eyebrow">Independent creative practice <span>·</span> ${escapeHtml(site.role)}</p>
          ${site.availability ? '<span class="availability availability-mobile glass-chip"><i aria-hidden="true"></i> Available for select work</span>' : ""}
        </div>
        <div class="hero-content">
          <h1 id="hero-title">I design thoughtful digital experiences <span>and build them into reality.</span></h1>
          <div class="hero-aside">
            <p>I'm a UI/UX designer and frontend developer focused on creating intuitive interfaces, meaningful user experiences, and responsive digital products.</p>
            <div class="hero-actions">
              <a class="button button-dark" href="#work">Explore selected work <span aria-hidden="true">↓</span></a>
              <a class="button button-light glass-control" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
        <div class="hero-bottomline">
          <p>${escapeHtml(site.location)}</p>
          <a href="#work" class="scroll-cue">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section class="work-section section-shell section-rule" id="work" aria-labelledby="work-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">A selection of recent explorations</p>
            <h2 id="work-title">Selected work<span class="heading-period">.</span></h2>
          </div>
          <p class="section-intro">A selection of digital product design and frontend development projects.</p>
        </div>
        <div class="filter-row">
          <div class="filter-list glass-segment" role="group" aria-label="Filter projects by category">
            ${categories.map((category) => `<button class="filter-button${activeCategory === category ? " is-active" : ""}" type="button" data-category="${escapeHtml(category)}" aria-pressed="${activeCategory === category}">${escapeHtml(category)}</button>`).join("")}
          </div>
          <span class="project-count" aria-live="polite">${String(filtered.length).padStart(2, "0")} projects</span>
        </div>
        <div class="project-grid">
          ${filtered.length ? filtered.map(projectCard).join("") : '<p class="empty-state">No projects in this category yet. Check back soon.</p>'}
        </div>
      </section>

      <section class="about-section section-shell section-rule" id="about" aria-labelledby="about-title">
        <div class="section-heading about-heading">
          <div>
            <p class="eyebrow">A little about me</p>
            <h2 id="about-title">Design with intent.<br /><span>Build with care.</span></h2>
          </div>
          <div class="about-copy">
            <p>${escapeHtml(site.intro)}</p>
            <p>${escapeHtml(site.approach)}</p>
          </div>
        </div>
        <div class="about-details">
          <div class="detail-label">What guides me</div>
          <ul class="principle-list glass-panel">
            <li><span>01</span> Clarity before complexity</li>
            <li><span>02</span> Care in the small details</li>
            <li><span>03</span> Design that works for everyone</li>
          </ul>
          <p class="location-note">${escapeHtml(site.location)}</p>
        </div>
      </section>

      <section class="skills-section section-shell section-rule" id="skills" aria-labelledby="skills-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Capabilities</p>
            <h2 id="skills-title">Skills & expertise<span class="heading-period">.</span></h2>
          </div>
          <p class="section-intro">A considered approach to shaping useful digital experiences and bringing them to life.</p>
        </div>
        <div class="skills-grid">
          ${[
            {
              id: "design",
              eyebrow: "01 / UI/UX DESIGN",
              heading: "Shape the experience.",
              description: "Designing intuitive digital experiences through thoughtful user journeys, structured interfaces, and interactive prototypes.",
              groups: site.skills.design,
            },
            {
              id: "development",
              eyebrow: "02 / FRONTEND DEVELOPMENT",
              heading: "Bring it to life.",
              description: "Turning interface designs into responsive, interactive web experiences through structured code and thoughtful implementation.",
              groups: site.skills.development,
            },
          ].map((section) => `
            <article class="skill-group glass-panel" aria-labelledby="skill-${section.id}-title">
              <p class="eyebrow">${section.eyebrow}</p>
              <h3 id="skill-${section.id}-title">${section.heading}</h3>
              <p class="skill-description">${section.description}</p>
              <div class="skill-categories">
                ${section.groups.map((group) => `
                  <section class="skill-category" aria-label="${escapeHtml(group.title)}">
                    <h4>${escapeHtml(group.title)}</h4>
                    <ul class="skill-list">${group.skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join("")}</ul>
                  </section>`).join("")}
              </div>
            </article>`).join("")}
        </div>
        <div class="tools-row" aria-label="Tools and interests">
          <div class="tools-intro">
            <p class="eyebrow">03 / TOOLS & INTERESTS</p>
            <h3>Tools I use. Ideas I explore.</h3>
            <p class="tools-description">The tools, systems, and design principles that shape how I approach digital products.</p>
          </div>
          <div class="tools-content">
            <section class="tools-category" aria-labelledby="tools-title">
              <h4 id="tools-title">Tools</h4>
              <ul class="skill-list">${site.skills.tools.map((skill) => `<li>${escapeHtml(skill)}</li>`).join("")}</ul>
            </section>
            <section class="tools-category" aria-labelledby="interests-title">
              <h4 id="interests-title">Interests</h4>
              <ul class="skill-list">${site.skills.interests.map((skill) => `<li>${escapeHtml(skill)}</li>`).join("")}</ul>
            </section>
          </div>
        </div>
      </section>

      <section class="contact-section section-shell" id="contact" aria-labelledby="contact-title">
        <p class="eyebrow">The next good thing starts here</p>
        <div class="contact-layout">
          <h2 id="contact-title">Have a good idea?<br /><span>Let's make it happen.</span></h2>
          <div class="contact-aside">
            <p>I'm open to relevant design opportunities, frontend projects, and collaborations.</p>
            ${emailLink}
          </div>
        </div>
        <div class="contact-links">
          ${emailHref ? `<a class="glass-link" href="${escapeHtml(emailHref)}">Email ${iconArrow}</a>` : ""}
          ${contactLink("Chat with me on WhatsApp", site.whatsapp, "glass-link")}
          ${contactLink("LinkedIn", site.linkedin, "glass-link")}
          ${contactLink("GitHub", site.github, "glass-link")}
          ${safeUrl(site.cv) ? `<a class="glass-link" href="${escapeHtml(safeUrl(site.cv))}" target="_blank" rel="noopener noreferrer">Download CV ${iconArrow}</a>` : ""}
          ${!emailHref && !safeUrl(site.whatsapp) && !safeUrl(site.linkedin) && !safeUrl(site.github) && !safeUrl(site.cv) ? '<span class="contact-config-note">Add your contact details in <code>src/data.js</code> to display links here.</span>' : ""}
        </div>
      </section>
    </main>
    ${footer()}`;
}

function footer() {
  return `<footer class="site-footer section-shell">
    <a class="wordmark" href="#home">${escapeHtml(site.name)}<span class="wordmark-dot">.</span></a>
    <p>Designed with intention. Built with care.</p>
    <nav aria-label="Footer navigation">
      <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
    </nav>
    <span class="copyright">© ${new Date().getFullYear()} ${escapeHtml(site.name)}</span>
  </footer>`;
}

function listSection(title, items) {
  if (!items?.length) return "";
  return `<section class="case-section">
    <p class="eyebrow">${escapeHtml(title)}</p>
    <ul class="case-bullets">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  </section>`;
}

function detailSection(title, items) {
  if (!items?.length) return "";
  return `<section class="case-section">
    <p class="eyebrow">${escapeHtml(title)}</p>
    <div class="process-list">${items.map((item, index) => `<article class="process-item"><span class="process-number">${String(index + 1).padStart(2, "0")}</span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></div></article>`).join("")}</div>
  </section>`;
}

function textSection(title, text, className = "") {
  if (!text) return "";
  return `<section class="case-section${className ? ` ${className}` : ""}">
    <p class="eyebrow">${escapeHtml(title)}</p>
    <p>${escapeHtml(text)}</p>
  </section>`;
}

function projectGallerySection(project) {
  const images = [project.presentation, ...(project.gallery || [])].filter(
    (image) => image?.src,
  );
  if (!images.length) return "";

  const imageButton = (image, index, className = "") => `
    <button class="gallery-image-button${className ? ` ${className}` : ""}" type="button"
      data-gallery-index="${index}"
      aria-label="Open image ${index + 1} of ${images.length}: ${escapeHtml(image.alt || project.name)}">
      <img loading="lazy" src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt || `${project.name} project image`)}" />
    </button>`;

  return `<section class="case-section project-gallery-section" aria-label="${escapeHtml(project.name)} image gallery">
    <p class="eyebrow">Project gallery <span class="gallery-count">${images.length} ${images.length === 1 ? "image" : "images"}</span><span class="gallery-scroll-hint">Scroll to explore</span></p>
    <div class="project-gallery-content" role="region" aria-label="${escapeHtml(project.name)} gallery images. Scroll to explore." tabindex="0">
      <figure class="gallery-presentation">
        ${imageButton(images[0], 0)}
        <figcaption>${escapeHtml(images[0].caption || "Project presentation")}</figcaption>
      </figure>
      ${images.length > 1
        ? `<div class="case-gallery" aria-label="Additional project images">${images.slice(1).map((image, index) => `
          <figure>
            ${imageButton(image, index + 1)}
            ${image.caption ? `<figcaption>${escapeHtml(image.caption)}</figcaption>` : ""}
          </figure>`).join("")}
        </div>`
        : `<p class="gallery-note">Only the presentation image is currently available; no additional project screenshots were included.</p>`}
    </div>
    <dialog class="gallery-lightbox" aria-label="${escapeHtml(project.name)} image viewer">
      <div class="lightbox-topbar">
        <p class="lightbox-counter" aria-live="polite">1 / ${images.length}</p>
        <button class="lightbox-close glass-control" type="button" aria-label="Close image viewer" data-lightbox-close>×</button>
      </div>
      ${images.length > 1 ? '<button class="lightbox-navigation lightbox-previous glass-control" type="button" aria-label="Previous image" data-lightbox-previous>‹</button>' : ""}
      <figure class="lightbox-figure">
        <img class="lightbox-image" alt="" />
        <figcaption class="lightbox-caption"></figcaption>
      </figure>
      ${images.length > 1 ? '<button class="lightbox-navigation lightbox-next glass-control" type="button" aria-label="Next image" data-lightbox-next>›</button>' : ""}
    </dialog>
  </section>`;
}

function projectPage(project) {
  const index = displayProjects.findIndex((item) => item.id === project.id);
  const previous = displayProjects[(index - 1 + displayProjects.length) % displayProjects.length];
  const next = displayProjects[(index + 1) % displayProjects.length];
  const designProject = project.category === "UI/UX Design";
  const externalLinks = designProject
    ? `${contactLink("View Figma Design", project.designUrl, "button button-dark glass-control")}${contactLink("View Prototype", project.prototypeUrl, "text-link glass-link")}`
    : projectExternalLink(project);
  const processItems = project.process?.length
    ? project.process
    : project.implementation
      ? [{ title: "Implementation", text: project.implementation }]
      : [];

  return `${header()}
    <main id="main" class="project-page">
      <div class="section-shell">
        <a class="back-link button button-dark glass-control" href="#work"><span aria-hidden="true">←</span> Back to Projects</a>
        <section class="project-hero" aria-labelledby="project-title">
          <div class="project-hero-top">
            <p class="eyebrow">${escapeHtml(project.category)} <span>·</span> ${escapeHtml(project.number)} / ${String(displayProjects.length).padStart(2, "0")}</p>
            ${project.status ? `<span class="status-pill glass-chip">${escapeHtml(project.status)}</span>` : ""}
          </div>
          <h1 id="project-title">${escapeHtml(project.name)}<span class="heading-period">.</span></h1>
          ${project.description ? `<p class="project-lede">${escapeHtml(project.description)}</p>` : ""}
          <div class="project-meta">
            ${project.type ? `<div class="glass-panel"><span>Project type</span><strong>${escapeHtml(project.type)}</strong></div>` : ""}
            ${project.tools.length ? `<div class="glass-panel"><span>Tools</span><strong>${project.tools.map(escapeHtml).join(" · ")}</strong></div>` : ""}
            <div class="glass-panel"><span>Discipline</span><strong>${escapeHtml(project.category)}</strong></div>
          </div>
          ${externalLinks ? `<div class="project-actions">${externalLinks}</div>` : ""}
          ${projectVisual(project, true)}
        </section>
        <div class="case-content">
          ${project.overview || project.description || project.challenge ? `<section class="case-section case-overview">
            <p class="eyebrow">Project overview</p>
            <div><p class="case-lead">${escapeHtml(project.overview || project.description)}</p>${project.challenge ? `<h2>The challenge</h2><p>${escapeHtml(project.challenge)}</p>` : ""}</div>
          </section>` : ""}
          ${projectGallerySection(project)}
          ${listSection(project.objectives ? "Project objectives" : "Design goals", project.objectives || project.goals)}
          ${detailSection(project.processTitle || (designProject ? "Process & decisions" : "Implementation details"), processItems)}
          ${textSection("My contribution", project.contribution)}
          ${textSection("Project outcome", project.outcome)}
          ${textSection("Scope & verification", project.verificationNote, "case-verification")}
          ${listSection(designProject ? "Reflection" : "Challenges", designProject ? [project.reflection].filter(Boolean) : [project.challenges].filter(Boolean))}
          ${designProject ? "" : listSection("Next steps", project.futureImprovements)}
          ${project.features?.length ? listSection("Implemented features", project.features) : ""}
        </div>
        <nav class="project-pagination" aria-label="Project navigation">
          <a href="#/project/${encodeURIComponent(previous.id)}"><span>← Previous project</span><strong>${escapeHtml(previous.name)}</strong></a>
          <a href="#/project/${encodeURIComponent(next.id)}"><span>Next project →</span><strong>${escapeHtml(next.name)}</strong></a>
        </nav>
        <div class="return-work"><a class="text-link" href="#work">Return to all work ${iconArrow}</a></div>
      </div>
    </main>
    ${footer()}`;
}

function notFoundPage() {
  return `${header()}<main id="main" class="not-found section-shell">
    <p class="eyebrow">404 · Page not found</p><h1>This page isn't here<span class="heading-period">.</span></h1>
    <p>The project may have moved, or the address might be incomplete.</p><a class="button button-dark" href="#work">Back to selected work <span aria-hidden="true">↗</span></a>
  </main>${footer()}`;
}

function render({ scroll = false } = {}) {
  const previousDialog = app.querySelector(".gallery-lightbox");
  if (previousDialog?.open) previousDialog.close();

  const route = decodeURIComponent(location.hash);
  const match = route.match(/^#\/project\/([^/?]+)$/);
  const project = match ? displayProjects.find((item) => item.id === match[1]) : null;
  app.innerHTML = match
    ? project
      ? projectPage(project)
      : notFoundPage()
    : homePage();

  initializeGlassInteractions();
  initializeProjectLightbox();
  document.title = project
    ? `${project.name} — ${site.name}`
    : match
      ? `Page not found — ${site.name}`
      : `${site.name} — Digital designer & developer`;

  updateNavigation(project || match);

  if (!match && route.length > 1) {
    const target = document.getElementById(route.slice(1));
    if (target) target.scrollIntoView({ behavior: scroll ? "smooth" : "auto", block: "start" });
  } else if (scroll || match) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function initializeProjectLightbox() {
  const dialog = app.querySelector(".gallery-lightbox");
  if (!dialog) return;

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    if (dialog.open) return;

    document.documentElement.style.overflow = previousDocumentOverflow;
    document.body.style.overflow = previousBodyOverflow;
    if (lightboxReturnFocus?.isConnected) lightboxReturnFocus.focus({ preventScroll: true });
    if (lightboxGallery?.isConnected) {
      lightboxGallery.scrollTop = lightboxGalleryScrollPosition;
    }
    window.scrollTo({ top: lightboxScrollPosition, behavior: "instant" });
    lightboxReturnFocus = null;
    lightboxGallery = null;
  });
}

function openProjectLightbox(trigger) {
  const dialog = app.querySelector(".gallery-lightbox");
  if (!dialog || dialog.open) return;

  if (!lightboxReturnFocus) {
    previousDocumentOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;
    lightboxScrollPosition = window.scrollY;
    lightboxGallery = trigger.closest(".project-gallery-content");
    lightboxGalleryScrollPosition = lightboxGallery?.scrollTop || 0;
  }
  lightboxReturnFocus = trigger;
  updateLightbox(dialog, Number(trigger.dataset.galleryIndex));
  dialog.showModal();
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  dialog.querySelector("[data-lightbox-close]").focus();
}

function updateLightbox(dialog, index) {
  const images = [...app.querySelectorAll("[data-gallery-index]")];
  if (!images.length) return;

  const nextIndex = (index + images.length) % images.length;
  const trigger = images[nextIndex];
  const image = trigger.querySelector("img");
  const lightboxImage = dialog.querySelector(".lightbox-image");
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  dialog.querySelector(".lightbox-counter").textContent = `${nextIndex + 1} / ${images.length}`;
  dialog.querySelector(".lightbox-caption").textContent =
    trigger.closest("figure")?.querySelector("figcaption")?.textContent || image.alt;
  dialog.dataset.currentIndex = String(nextIndex);
}

const glassControlGroups = [
  { selector: ".primary-navigation", controls: "a[data-section]" },
  { selector: ".filter-list", controls: ".filter-button" },
  { selector: ".contact-links", controls: ".glass-link" },
  { selector: ".contact-aside", controls: ".glass-control, .glass-link" },
  { selector: ".hero-actions", controls: ".glass-control, .glass-link" },
  { selector: ".project-card-copy", controls: ".card-arrow" },
  { selector: ".project-actions", controls: ".glass-control, .glass-link" },
  { selector: ".project-card-actions", controls: ".glass-control, .glass-link" },
  { selector: ".menu-toggle", controls: ".menu-toggle" },
];

function initializeGlassInteractions() {
  for (const { selector, controls } of glassControlGroups) {
    for (const group of app.querySelectorAll(selector)) {
      if (group.querySelector(":scope > .glass-follow-highlight")) continue;

      group.classList.add("glass-interaction-group");
      group.dataset.glassControls = controls;
      const highlight = document.createElement("span");
      highlight.className = "glass-follow-highlight";
      highlight.setAttribute("aria-hidden", "true");
      group.prepend(highlight);
    }
  }
}

function findGlassControl(group, target) {
  if (!(target instanceof Element)) return null;
  if (group.contains(target)) {
    const control = target.closest(group.dataset.glassControls || "");
    return control && group.contains(control) ? control : null;
  }
  if (target.contains(group)) return group.querySelector(group.dataset.glassControls);
  return null;
}

function moveGlassHighlight(group, control) {
  const highlight = group.querySelector(":scope > .glass-follow-highlight");
  if (!highlight || !control) return;

  const groupBounds = group.getBoundingClientRect();
  const controlBounds = control.getBoundingClientRect();
  const style = getComputedStyle(group);
  const borderLeft = parseFloat(style.borderLeftWidth) || 0;
  const borderTop = parseFloat(style.borderTopWidth) || 0;
  highlight.style.width = `${controlBounds.width}px`;
  highlight.style.height = `${controlBounds.height}px`;
  highlight.style.transform = `translate3d(${controlBounds.left - groupBounds.left - borderLeft}px, ${controlBounds.top - groupBounds.top - borderTop}px, 0)`;
  highlight.classList.add("is-visible");
}

function selectedGlassControl(group) {
  const selectors = group.dataset.glassControls
    .split(",")
    .map((selector) => selector.trim())
    .flatMap((selector) => [
      `${selector}.is-active`,
      `${selector}[aria-pressed="true"]`,
      `${selector}[aria-current]`,
    ]);
  return group.querySelector(selectors.join(", "));
}

function restoreGlassHighlight(group) {
  const selected = selectedGlassControl(group);
  if (selected) {
    moveGlassHighlight(group, selected);
    highlightGlassControl(group, selected);
    return;
  }

  group.querySelector(":scope > .glass-follow-highlight")?.classList.remove("is-visible");
  group.classList.remove("has-glass-hover");
}

function highlightGlassControl(group, control) {
  moveGlassHighlight(group, control);
  group.classList.add("has-glass-hover");
}

function glassGroupFor(target) {
  if (!(target instanceof Element)) return null;
  return target.closest(".glass-interaction-group")
    || target.closest(".project-card-link")?.querySelector(".project-card-copy.glass-interaction-group")
    || null;
}

app.addEventListener("pointerover", (event) => {
  if (event.pointerType === "touch") return;
  const group = glassGroupFor(event.target);
  const control = group && findGlassControl(group, event.target);
  if (group && control) highlightGlassControl(group, control);
});

app.addEventListener("pointerout", (event) => {
  const group = glassGroupFor(event.target);
  if (!group || (event.relatedTarget instanceof Node && group.contains(event.relatedTarget))) return;
  restoreGlassHighlight(group);
});

app.addEventListener("focusin", (event) => {
  const group = glassGroupFor(event.target);
  const control = group && findGlassControl(group, event.target);
  if (group && control) highlightGlassControl(group, control);
});

app.addEventListener("focusout", (event) => {
  const group = glassGroupFor(event.target);
  if (!group || (event.relatedTarget instanceof Node && group.contains(event.relatedTarget))) return;
  restoreGlassHighlight(group);
});

app.addEventListener("pointerdown", (event) => {
  const group = glassGroupFor(event.target);
  const control = group && findGlassControl(group, event.target);
  if (group && control) highlightGlassControl(group, control);
});

window.addEventListener("resize", () => {
  for (const group of app.querySelectorAll(".glass-interaction-group")) {
    const control = findGlassControl(group, document.activeElement) || selectedGlassControl(group);
    if (control && group.classList.contains("has-glass-hover")) moveGlassHighlight(group, control);
    else if (control) moveGlassHighlight(group, control);
  }
});

function updateNavigation(isProjectPage = false) {
  const navigation = document.querySelector(".primary-navigation");
  if (!navigation) return;

  const links = [...navigation.querySelectorAll("[data-section]")];
  let activeSection = isProjectPage ? "work" : "";

  if (!isProjectPage) {
    const hashSection = location.hash.slice(1);
    if (links.some((link) => link.dataset.section === hashSection)) {
      activeSection = hashSection;
    } else {
      const sections = links
        .map((link) => document.getElementById(link.dataset.section))
        .filter(Boolean);
      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= 120 && bounds.bottom > 120;
      });
      activeSection = current?.id || "";
    }
  }

  for (const link of links) {
    const active = link.dataset.section === activeSection;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }

  const activeLink = links.find((link) => link.dataset.section === activeSection);
  navigation.classList.toggle("has-active", Boolean(activeLink));
  if (activeLink) {
    navigation.style.setProperty("--pill-left", `${activeLink.offsetLeft}px`);
    navigation.style.setProperty("--pill-width", `${activeLink.offsetWidth}px`);
  }
}

app.addEventListener("click", (event) => {
  const galleryTrigger = event.target.closest("[data-gallery-index]");
  if (galleryTrigger) {
    openProjectLightbox(galleryTrigger);
    return;
  }

  const lightbox = event.target.closest(".gallery-lightbox");
  if (lightbox) {
    if (event.target.closest("[data-lightbox-close]")) {
      lightbox.close();
      return;
    }
    const currentIndex = Number(lightbox.dataset.currentIndex);
    if (event.target.closest("[data-lightbox-previous]")) {
      updateLightbox(lightbox, currentIndex - 1);
      return;
    }
    if (event.target.closest("[data-lightbox-next]")) {
      updateLightbox(lightbox, currentIndex + 1);
      return;
    }
  }

  const filter = event.target.closest("[data-category]");
  if (filter) {
    activeCategory = filter.dataset.category;
    render({ scroll: true });
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const toggle = event.target.closest(".menu-toggle");
  if (toggle) {
    mobileMenuOpen = !mobileMenuOpen;
    render();
    document.querySelector(".menu-toggle")?.focus();
    return;
  }

  if (event.target.closest(".primary-navigation a")) {
    mobileMenuOpen = false;
    const navigation = document.querySelector(".primary-navigation");
    const menuToggle = document.querySelector(".menu-toggle");
    navigation?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  }
});

document.addEventListener("keydown", (event) => {
  const dialog = app.querySelector(".gallery-lightbox");
  if (dialog?.open && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    event.preventDefault();
    const currentIndex = Number(dialog.dataset.currentIndex);
    updateLightbox(dialog, currentIndex + (event.key === "ArrowRight" ? 1 : -1));
    return;
  }

  if (event.key !== "Escape" || !mobileMenuOpen) return;

  mobileMenuOpen = false;
  document.querySelector(".primary-navigation")?.classList.remove("is-open");
  const menuToggle = document.querySelector(".menu-toggle");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation menu");
  menuToggle?.focus();
});

window.addEventListener("hashchange", () => {
  mobileMenuOpen = false;
  render({ scroll: true });
});

window.addEventListener("scroll", () => updateNavigation(), { passive: true });
window.addEventListener("resize", () => updateNavigation());

render();
