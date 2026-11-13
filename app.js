(() => {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const CREDENTIAL_ICONS = {
    linkedin: {
      color: "#0A66C2",
      code: "PROFILE",
      svg: `<svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>`,
    },
    gmail: {
      color: "#EA4335",
      code: "EMAIL",
      svg: `<svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    },
    github: {
      color: "#e2e8f0",
      code: "CODE",
      svg: `<svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>`,
    },
    leetcode: {
      color: "#F89F1B",
      code: "DSA",
      svg: `<svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 4.5-7 7a3.5 3.5 0 0 0 0 5l2.5 2.5a3.5 3.5 0 0 0 5 0l3-3"/><path d="m11 8 3.5-3.5a2.12 2.12 0 0 1 3 3L16 9"/><path d="M12 13h7"/></svg>`,
    },
    codolio: {
      color: "#818cf8",
      code: "STATS",
      svg: `<svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="m9 10-2.5 2 2.5 2"/><path d="m15 10 2.5 2-2.5 2"/><path d="m12.8 9-1.6 6"/></svg>`,
    },
  };

  // DOM References
  const homeView = document.getElementById("home-view");
  const projectsView = document.getElementById("projects-view");
  const navHomeBtn = document.getElementById("nav-home-btn");
  const navProjectsBtn = document.getElementById("nav-projects-btn");
  const brandHomeBtn = document.getElementById("brand-home-btn");
  const openProjectsBtn = document.getElementById("open-projects-btn");
  const backHomeBtn = document.getElementById("back-home-btn");
  const categoryFiltersEl = document.getElementById("category-filters");
  const projectsGridEl = document.getElementById("projects-grid");
  const dialog = document.getElementById("project-dialog");
  const dialogCloseBtn = document.getElementById("dialog-close-btn");
  const dialogDismissBtn = document.getElementById("dialog-dismiss-btn");

  let activeView = "home";
  let activeCategory = "All";

  // 0. Collectible HoloCard pointer-tracking 3D tilt, foil & glare
  const motionReduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function attachHoloCardInteraction(cardEl, { tiltMax = 14, glare = 0.5 } = {}) {
    if (!cardEl) return;

    cardEl.addEventListener("pointermove", (e) => {
      if (motionReduceQuery.matches) return;
      const rect = cardEl.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotateX = -((y - cy) / cy) * tiltMax;
      const rotateY = ((x - cx) / cx) * tiltMax;

      cardEl.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
      cardEl.style.setProperty("--foil-x", `${((x / rect.width) * 100).toFixed(1)}%`);
      cardEl.style.setProperty("--foil-y", `${((y / rect.height) * 100).toFixed(1)}%`);
      cardEl.style.setProperty("--glare-x", `${x.toFixed(1)}px`);
      cardEl.style.setProperty("--glare-y", `${y.toFixed(1)}px`);
      cardEl.style.setProperty("--glare-opacity", String(glare));
    });

    cardEl.addEventListener("pointerleave", () => {
      cardEl.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      cardEl.style.setProperty("--foil-x", "50%");
      cardEl.style.setProperty("--foil-y", "50%");
      cardEl.style.setProperty("--glare-x", "50%");
      cardEl.style.setProperty("--glare-y", "50%");
      cardEl.style.setProperty("--glare-opacity", "0");
    });
  }

  // 0b. Shuffle Text Animation (React Bits Shuffle JS-CSS style)
  const SHUFFLE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*";

  function renderShuffleName(element, text, { shuffleTimes = 4, intervalMs = 38 } = {}) {
    if (!element) return;

    element.innerHTML = "";

    const srOnly = document.createElement("span");
    srOnly.className = "visually-hidden";
    srOnly.textContent = text;

    const visual = document.createElement("span");
    visual.className = "shuffle-visual";
    visual.setAttribute("aria-hidden", "true");

    const charCells = [];
    for (const ch of text) {
      const cell = document.createElement("span");
      cell.className = ch === " " ? "shuffle-char is-space" : "shuffle-char";

      const glyph = document.createElement("span");
      glyph.className = "shuffle-glyph";
      glyph.textContent = ch === " " ? "\u00A0" : ch;

      cell.appendChild(glyph);
      visual.appendChild(cell);
      charCells.push({ cell, glyph, target: ch, isSpace: ch === " " });
    }

    element.append(srOnly, visual);

    let timerId = null;
    let isRunning = false;

    function settleAll() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      isRunning = false;
      for (const item of charCells) {
        item.cell.classList.remove("is-scrambling");
        if (!item.isSpace) {
          item.glyph.textContent = item.target;
        }
      }
    }

    function playShuffle() {
      if (motionReduceQuery.matches) {
        settleAll();
        return;
      }
      if (isRunning) return;
      isRunning = true;

      let step = 0;
      const totalChars = charCells.length;
      const locked = new Array(totalChars).fill(false);

      for (const item of charCells) {
        item.cell.classList.remove("is-settled");
      }

      timerId = setInterval(() => {
        let allDone = true;

        for (let i = 0; i < totalChars; i++) {
          const item = charCells[i];
          if (item.isSpace) {
            locked[i] = true;
            continue;
          }

          const lockStep = (i + 1) * shuffleTimes;
          if (step >= lockStep) {
            if (!locked[i]) {
              locked[i] = true;
              item.glyph.textContent = item.target;
              item.cell.classList.remove("is-scrambling");
              item.cell.classList.add("is-settled");
            }
          } else {
            allDone = false;
            item.cell.classList.add("is-scrambling");
            const randChar =
              SHUFFLE_GLYPHS[Math.floor(Math.random() * SHUFFLE_GLYPHS.length)];
            item.glyph.textContent =
              item.target === item.target.toLowerCase() &&
              /[a-z]/.test(item.target)
                ? randChar.toLowerCase()
                : randChar;
          }
        }

        step += 1;
        if (allDone) {
          clearInterval(timerId);
          timerId = null;
          isRunning = false;
        }
      }, intervalMs);
    }

    element.addEventListener("pointerenter", playShuffle);
    playShuffle();
  }

  // 1. Hydrate Profile & Credentials
  function renderProfile() {
    const { profile, credentials, projects } = data;

    document.getElementById("header-brand-name").textContent = profile.name;
    renderShuffleName(document.getElementById("hero-name"), profile.name);
    document.getElementById("hero-role").textContent = profile.role;
    document.getElementById("hero-location").textContent = profile.location;
    document.getElementById("footer-copy").textContent =
      `© ${new Date().getFullYear()} ${profile.name}`;

    const heroCardName = document.querySelector(".hero-holo-name");
    if (heroCardName) heroCardName.textContent = profile.name;

    renderAboutBlurHighlight(profile.aboutSegments || []);

    const avatarImg = document.getElementById("hero-avatar");
    avatarImg.src = profile.avatar;
    avatarImg.alt = profile.avatarAlt || `Portrait of ${profile.name}`;

    attachHoloCardInteraction(document.getElementById("hero-holo-card"), {
      tiltMax: 14,
      glare: 0.52,
    });

    attachHoloCardInteraction(openProjectsBtn, {
      tiltMax: 5,
      glare: 0.35,
    });

    document.getElementById("nav-project-count").textContent = String(projects.length);
    document.getElementById("launcher-count").textContent = String(projects.length);

    // Credentials list as Taped Sticky Notes
    const credList = document.getElementById("credentials-list");
    credList.innerHTML = "";
    for (const cred of credentials) {
      const li = document.createElement("li");
      li.className = "cred-card-item";

      const a = document.createElement("a");
      a.className = "sticky-note cred-sticky-note";
      a.href = cred.url;
      a.dataset.noteId = cred.id;
      if (cred.external) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.setAttribute("aria-label", `${cred.label}: ${cred.handle}`);

      const tape = document.createElement("span");
      tape.className = "sticky-tape";
      tape.setAttribute("aria-hidden", "true");

      const topRow = document.createElement("span");
      topRow.className = "sticky-top-row";

      const iconMeta = CREDENTIAL_ICONS[cred.id] || CREDENTIAL_ICONS.codolio;
      const emblem = document.createElement("span");
      emblem.className = "sticky-emblem";
      emblem.innerHTML = iconMeta.svg;

      const arrow = document.createElement("span");
      arrow.className = "sticky-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";

      topRow.append(emblem, arrow);

      const content = document.createElement("span");
      content.className = "sticky-content";

      const title = document.createElement("span");
      title.className = "sticky-title";
      title.textContent = cred.label;

      const handle = document.createElement("span");
      handle.className = "sticky-handle";
      handle.textContent = cred.handle;

      content.append(title, handle);
      a.append(tape, topRow, content);
      li.appendChild(a);
      credList.appendChild(li);
    }

    // Launcher preview chips
    const previewWrap = document.getElementById("launcher-preview-chips");
    previewWrap.innerHTML = "";
    for (const proj of projects.slice(0, 4)) {
      const chip = document.createElement("span");
      chip.className = "preview-chip";
      chip.style.setProperty("--chip-hue", String(proj.accentHue ?? 245));

      const dot = document.createElement("span");
      dot.className = "preview-chip-dot";

      const label = document.createElement("span");
      label.textContent = proj.title.split(" — ")[0];

      chip.append(dot, label);
      previewWrap.appendChild(chip);
    }
    if (projects.length > 4) {
      const more = document.createElement("span");
      more.className = "preview-chip";
      more.textContent = `+${projects.length - 4} more`;
      previewWrap.appendChild(more);
    }
  }

  // 1b. Render Blur Highlight "About Me" paragraph
  function renderAboutBlurHighlight(segments) {
    const container = document.getElementById("about-blur-highlight");
    if (!container) return;

    const fullText = segments.map((seg) => seg.text).join("");
    container.innerHTML = "";

    const srOnly = document.createElement("span");
    srOnly.className = "visually-hidden";
    srOnly.textContent = fullText;

    const visual = document.createElement("span");
    visual.className = "bh-visual";
    visual.setAttribute("aria-hidden", "true");

    for (const seg of segments) {
      if (seg.highlight) {
        const mark = document.createElement("mark");
        mark.className = "bh-token bh-highlight";
        mark.textContent = seg.text;
        visual.appendChild(mark);
      } else {
        // Split plain text into words + whitespace so each word blurs in sequentially
        const parts = seg.text.split(/(\s+)/);
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            visual.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement("span");
            span.className = "bh-token";
            span.textContent = part;
            visual.appendChild(span);
          }
        }
      }
    }

    if (!CSS.supports("animation-delay: calc(sibling-index() * 0.1s)")) {
      [...visual.children].forEach((el, index) => {
        el.style.setProperty("--sibling-index", String(index + 1));
      });
    }

    container.append(srOnly, visual);
  }

  // 2. Category Filters & Projects Grid
  function renderCategoryFilters() {
    const categories = ["All", ...new Set(data.projects.map((p) => p.category))];
    categoryFiltersEl.innerHTML = "";

    for (const category of categories) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-pill";
      btn.textContent = category;
      btn.setAttribute("aria-pressed", String(category === activeCategory));
      btn.addEventListener("click", () => {
        if (activeCategory === category) return;
        activeCategory = category;
        renderCategoryFilters();
        renderProjectsGrid();
      });
      categoryFiltersEl.appendChild(btn);
    }
  }

  function renderProjectsGrid() {
    const filtered =
      activeCategory === "All"
        ? data.projects
        : data.projects.filter((p) => p.category === activeCategory);

    projectsGridEl.innerHTML = "";

    for (const project of filtered) {
      const li = document.createElement("li");
      li.className = "project-grid-item";

      const card = document.createElement("article");
      card.className = "project-card-trigger holo-card";
      card.style.setProperty("--card-hue", String(project.accentHue ?? 245));

      const topMeta = document.createElement("div");
      topMeta.className = "card-top-meta";

      const catBadge = document.createElement("span");
      catBadge.className = "card-category";
      const catDot = document.createElement("span");
      catDot.className = "card-category-dot";
      catDot.setAttribute("aria-hidden", "true");
      catBadge.append(catDot, document.createTextNode(project.category));

      const yearSpan = document.createElement("span");
      yearSpan.className = "card-year";
      yearSpan.textContent = project.year;
      topMeta.append(catBadge, yearSpan);

      const title = document.createElement("h2");
      title.className = "card-title";
      const titleBtn = document.createElement("button");
      titleBtn.type = "button";
      titleBtn.className = "card-title-btn";
      titleBtn.textContent = project.title;
      titleBtn.setAttribute("aria-label", `${project.title} — View project details`);
      titleBtn.addEventListener("click", () => openProjectDialog(project));
      title.appendChild(titleBtn);

      const tagline = document.createElement("p");
      tagline.className = "card-tagline";
      tagline.textContent = project.tagline;

      const footerRow = document.createElement("div");
      footerRow.className = "card-footer-row";

      const stackPreview = document.createElement("div");
      stackPreview.className = "card-stack-preview";
      for (const tech of project.techStack.slice(0, 2)) {
        const tag = document.createElement("span");
        tag.className = "mini-tag";
        tag.textContent = tech;
        stackPreview.appendChild(tag);
      }

      const actions = document.createElement("div");
      actions.className = "card-actions";

      if (project.downloadUrl) {
        const dlLink = document.createElement("a");
        dlLink.className = "card-download-btn";
        dlLink.href = project.downloadUrl;
        dlLink.setAttribute("download", project.downloadName || "");
        dlLink.setAttribute("aria-label", `${project.downloadLabel || "Download"} ${project.title}`);
        dlLink.innerHTML = `<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg><span>${project.downloadLabel || "Download"}</span>`;
        actions.appendChild(dlLink);
      }

      const cue = document.createElement("span");
      cue.className = "card-inspect-cue";
      cue.setAttribute("aria-hidden", "true");
      cue.innerHTML = `Details <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
      actions.appendChild(cue);

      footerRow.append(stackPreview, actions);

      const foil = document.createElement("span");
      foil.className = "holo-foil";
      foil.setAttribute("aria-hidden", "true");

      const glareEl = document.createElement("span");
      glareEl.className = "holo-glare";
      glareEl.setAttribute("aria-hidden", "true");

      card.append(topMeta, title, tagline, footerRow, foil, glareEl);
      li.appendChild(card);
      projectsGridEl.appendChild(li);

      attachHoloCardInteraction(card, { tiltMax: 8, glare: 0.4 });
    }
  }

  // 3. View Switching with View Transitions API + Accessibility Focus Routing
  function applyViewState(nextView) {
    activeView = nextView;
    const isProjects = nextView === "projects";

    homeView.hidden = isProjects;
    projectsView.hidden = !isProjects;

    if (isProjects) {
      navProjectsBtn.setAttribute("aria-current", "page");
      navHomeBtn.removeAttribute("aria-current");
      document.title = `Projects | ${data.profile.name}`;
    } else {
      navHomeBtn.setAttribute("aria-current", "page");
      navProjectsBtn.removeAttribute("aria-current");
      document.title = `${data.profile.name} — Portfolio`;
    }
  }

  function focusActiveHeading(view) {
    const headingId = view === "projects" ? "projects-heading" : "hero-name";
    document.getElementById(headingId)?.focus();
  }

  function switchView(nextView, { updateHash = true } = {}) {
    if (activeView === nextView) return;

    if (updateHash) {
      const targetHash = nextView === "projects" ? "#projects" : "#home";
      if (window.location.hash !== targetHash) {
        history.pushState({ view: nextView }, "", targetHash);
      }
    }

    const launcherTitle = openProjectsBtn.querySelector(".launcher-title");
    const projectsHeading = document.getElementById("projects-heading");

    if (!document.startViewTransition) {
      applyViewState(nextView);
      window.scrollTo({ top: 0, behavior: "instant" });
      focusActiveHeading(nextView);
      return;
    }

    // Shared morph between Projects launcher title and All Projects heading
    if (nextView === "projects" && launcherTitle) {
      launcherTitle.style.viewTransitionName = "projects-title-morph";
    } else if (nextView === "home" && projectsHeading) {
      projectsHeading.style.viewTransitionName = "projects-title-morph";
    }

    const transition = document.startViewTransition(() => {
      if (launcherTitle) launcherTitle.style.viewTransitionName = "";
      if (projectsHeading) projectsHeading.style.viewTransitionName = "";

      if (nextView === "projects" && projectsHeading) {
        projectsHeading.style.viewTransitionName = "projects-title-morph";
      } else if (nextView === "home" && launcherTitle) {
        launcherTitle.style.viewTransitionName = "projects-title-morph";
      }

      applyViewState(nextView);
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    transition.finished.finally(() => {
      if (launcherTitle) launcherTitle.style.viewTransitionName = "";
      if (projectsHeading) projectsHeading.style.viewTransitionName = "";
      focusActiveHeading(nextView);
    });
  }

  // 4. Native Modal Dialog + Top-Layer Exit Fallback + closedby Fallback
  let supportsDisplayTransition;
  function canTransitionDisplay() {
    if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
    if (!window.CSS?.supports?.("transition-behavior", "allow-discrete") || !document.body) {
      return false;
    }
    const probe = document.createElement("div");
    probe.style.cssText =
      "transition: display 1s allow-discrete !important; display: block;";
    document.body.appendChild(probe);
    getComputedStyle(probe).display;
    probe.style.display = "none";
    supportsDisplayTransition = getComputedStyle(probe).display === "block";
    probe.remove();
    return supportsDisplayTransition;
  }

  function supportsTopLayerExit() {
    return window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay();
  }

  async function closeTopLayer(element) {
    if (!element.open) return;
    if (!supportsTopLayerExit()) {
      element.setAttribute("data-closing", "");
      const animations = element.getAnimations({ subtree: true });
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((r) => setTimeout(r, 1000)),
        ]);
      }
      if (!element.hasAttribute("data-closing")) return;
      element.removeAttribute("data-closing");
    }
    element.close();
  }

  function openProjectDialog(project) {
    dialog.style.setProperty("--dialog-hue", String(project.accentHue ?? 245));
    document.getElementById("dialog-category").textContent = project.category;
    document.getElementById("dialog-year").textContent = project.year;
    document.getElementById("dialog-title").textContent = project.title;
    document.getElementById("dialog-tagline").textContent = project.tagline;
    document.getElementById("dialog-description").textContent = project.description;

    const highlightsEl = document.getElementById("dialog-highlights");
    highlightsEl.innerHTML = "";
    for (const item of project.highlights) {
      const li = document.createElement("li");
      li.textContent = item;
      highlightsEl.appendChild(li);
    }

    const techEl = document.getElementById("dialog-tech");
    techEl.innerHTML = "";
    for (const tech of project.techStack) {
      const li = document.createElement("li");
      li.className = "tech-tag";
      li.textContent = tech;
      techEl.appendChild(li);
    }

    const downloadLink = document.getElementById("dialog-download-link");
    const downloadLabel = document.getElementById("dialog-download-label");
    const projectLink = document.getElementById("dialog-project-link");
    projectLink.href = project.projectUrl || "#";

    if (project.downloadUrl) {
      downloadLink.href = project.downloadUrl;
      downloadLink.setAttribute("download", project.downloadName || "");
      downloadLabel.textContent = project.downloadLabel || "Download APK";
      downloadLink.hidden = false;
      projectLink.className = "btn-secondary";
    } else {
      downloadLink.hidden = true;
      projectLink.className = "btn-primary";
    }

    const repoLink = document.getElementById("dialog-repo-link");
    if (project.repoUrl && project.repoUrl !== project.projectUrl) {
      repoLink.href = project.repoUrl;
      repoLink.hidden = false;
    } else {
      repoLink.hidden = true;
    }

    dialog.removeAttribute("data-closing");
    dialog.showModal();
  }

  // Event wiring
  openProjectsBtn.addEventListener("click", () => switchView("projects"));
  navProjectsBtn.addEventListener("click", () => switchView("projects"));
  navHomeBtn.addEventListener("click", () => switchView("home"));
  brandHomeBtn.addEventListener("click", () => switchView("home"));
  backHomeBtn.addEventListener("click", () => switchView("home"));

  dialogCloseBtn.addEventListener("click", () => closeTopLayer(dialog));
  dialogDismissBtn.addEventListener("click", () => closeTopLayer(dialog));

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeTopLayer(dialog);
  });

  dialog.addEventListener("close", () => {
    dialog.returnValue = "";
  });

  // Fallback for browsers without native closedby="any" support (e.g., Safari)
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    const isOutsideDialog = (e) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };
    let pressedOutside = false;
    dialog.addEventListener("pointerdown", (e) => {
      pressedOutside = isOutsideDialog(e);
    });
    dialog.addEventListener("pointerup", (e) => {
      if (pressedOutside && isOutsideDialog(e)) {
        closeTopLayer(dialog);
      }
      pressedOutside = false;
    });
  }

  window.addEventListener("popstate", () => {
    const target = window.location.hash === "#projects" ? "projects" : "home";
    switchView(target, { updateHash: false });
  });

  // 5. GlowCursor Overlay (matching user's exact GlowCursor props)
  function initGlowCursor() {
    const canvas = document.getElementById("glow-cursor-layer");
    if (!canvas || typeof window.createGlowCursor !== "function") return;

    window.createGlowCursor(canvas, {
      color: "#5f8bff",
      intensity: 1.3,
      trailWidth: 3,
      linger: 1.4,
      glow: 1.2,
      clickBurst: true,
      theme: "dark",
    });
  }

  // 6. Interactive Self-Healing Cutting Mat Background
  function initCuttingMat() {
    const container = document.getElementById("cutting-mat-bg");
    const svg = document.getElementById("cutting-mat-overlay");
    const grid = document.querySelector(".cutting-mat-grid");
    if (!container || !svg || !grid) return;

    function renderMat() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 640;
      const unit = isMobile ? 50 : 60;
      const margin = isMobile ? 24 : 36;

      // Synchronize CSS grid background with ruler margins
      grid.style.backgroundPosition = `${margin}px ${margin}px`;
      grid.style.backgroundSize = `${unit}px ${unit}px, ${unit}px ${unit}px, ${unit / 5}px ${unit / 5}px, ${unit / 5}px ${unit / 5}px`;

      const cols = Math.floor((w - 2 * margin) / unit);
      const rows = Math.floor((h - 2 * margin) / unit);
      const gridW = cols * unit;
      const gridH = rows * unit;

      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.setAttribute("width", `${w}`);
      svg.setAttribute("height", `${h}`);

      const elements = [];

      // Main Outer Border Rectangle
      elements.push(`<rect x="${margin}" y="${margin}" width="${gridW}" height="${gridH}" class="mat-border" />`);

      // Top-Left 'inch' Label
      elements.push(`<text x="${Math.max(6, margin / 4)}" y="${margin - 12}" class="mat-label">inch</text>`);

      // Top Ruler Ticks & Column Numbers
      for (let c = 1; c <= cols; c++) {
        const x = margin + c * unit;
        for (let s = 1; s <= 4; s++) {
          const sx = x - unit + s * (unit / 5);
          const tickH = (s === 2 || s === 3) ? (margin * 0.28) : (margin * 0.18);
          elements.push(`<line x1="${sx}" y1="0" x2="${sx}" y2="${tickH}" class="mat-tick-sub" />`);
        }
        elements.push(`<line x1="${x}" y1="0" x2="${x}" y2="${margin * 0.42}" class="mat-tick-maj" />`);
        elements.push(`<text x="${x}" y="${margin - 10}" text-anchor="middle" class="mat-number">${c}</text>`);
      }

      // Left Ruler Ticks & Row Numbers
      for (let r = 1; r <= rows; r++) {
        const y = margin + r * unit;
        for (let s = 1; s <= 4; s++) {
          const sy = y - unit + s * (unit / 5);
          const tickW = (s === 2 || s === 3) ? (margin * 0.28) : (margin * 0.18);
          elements.push(`<line x1="0" y1="${sy}" x2="${tickW}" y2="${sy}" class="mat-tick-sub" />`);
        }
        elements.push(`<line x1="0" y1="${y}" x2="${margin * 0.42}" y2="${y}" class="mat-tick-maj" />`);
        elements.push(`<text x="${margin - 10}" y="${y + 4}" text-anchor="end" class="mat-number">${r}</text>`);
      }

      // Right Ruler Ticks & Numbers (matching reference descending scale)
      const rightEdge = margin + gridW;
      const rightOffset = w - rightEdge;
      if (rightOffset >= margin - 8) {
        for (let r = 1; r <= rows; r++) {
          const y = margin + r * unit;
          for (let s = 1; s <= 4; s++) {
            const sy = y - unit + s * (unit / 5);
            const tickW = (s === 2 || s === 3) ? (margin * 0.28) : (margin * 0.18);
            elements.push(`<line x1="${w - tickW}" y1="${sy}" x2="${w}" y2="${sy}" class="mat-tick-sub" />`);
          }
          elements.push(`<line x1="${w - margin * 0.42}" y1="${y}" x2="${w}" y2="${y}" class="mat-tick-maj" />`);
          const num = (rows - r + 1) + 10;
          elements.push(`<text x="${rightEdge + 10}" y="${y + 4}" text-anchor="start" class="mat-number">${num}</text>`);
        }
      }

      // Bottom Ruler Ticks & Numbers
      const bottomEdge = margin + gridH;
      const bottomOffset = h - bottomEdge;
      if (bottomOffset >= margin - 8) {
        for (let c = 1; c <= cols; c++) {
          const x = margin + c * unit;
          for (let s = 1; s <= 4; s++) {
            const sx = x - unit + s * (unit / 5);
            const tickH = (s === 2 || s === 3) ? (margin * 0.28) : (margin * 0.18);
            elements.push(`<line x1="${sx}" y1="${h - tickH}" x2="${sx}" y2="${h}" class="mat-tick-sub" />`);
          }
          elements.push(`<line x1="${x}" y1="${h - margin * 0.42}" x2="${x}" y2="${h}" class="mat-tick-maj" />`);
          elements.push(`<text x="${x}" y="${bottomEdge + margin - 10}" text-anchor="middle" class="mat-number">${c}</text>`);
        }
      }

      // Intersection Crosshairs at Major Grid Crossings
      for (let c = 1; c < cols; c++) {
        const x = margin + c * unit;
        for (let r = 1; r < rows; r++) {
          const y = margin + r * unit;
          elements.push(`<path d="M ${x - 3} ${y} L ${x + 3} ${y} M ${x} ${y - 3} L ${x} ${y + 3}" class="mat-crosshair" />`);
        }
      }

      // 45° & 60° Angle Guidelines
      if (cols >= 4 && rows >= 4) {
        const x0 = margin;
        const y0 = margin + Math.min(rows, cols) * unit;
        const len = Math.min(gridW, gridH);
        elements.push(`<line x1="${x0}" y1="${y0}" x2="${x0 + len}" y2="${y0 - len}" class="mat-angle-line" />`);
        elements.push(`<text x="${x0 + len * 0.5 + 8}" y="${y0 - len * 0.5 - 6}" class="mat-angle-label" transform="rotate(-45 ${x0 + len * 0.5} ${y0 - len * 0.5})">45°</text>`);

        const rad60 = (60 * Math.PI) / 180;
        const len60 = Math.min(gridW * 0.7, gridH);
        const dx60 = len60 / Math.tan(rad60);
        elements.push(`<line x1="${x0}" y1="${y0}" x2="${x0 + dx60}" y2="${y0 - len60}" class="mat-angle-line" />`);
        elements.push(`<text x="${x0 + dx60 * 0.5 + 8}" y="${y0 - len60 * 0.5 - 6}" class="mat-angle-label" transform="rotate(-60 ${x0 + dx60 * 0.5} ${y0 - len60 * 0.5})">60°</text>`);
      }

      svg.innerHTML = elements.join("");
    }

    renderMat();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderMat, 120);
    }, { passive: true });
  }

  // Initialize
  initCuttingMat();
  initGlowCursor();
  renderProfile();
  renderCategoryFilters();
  renderProjectsGrid();

  if (window.location.hash === "#projects") {
    applyViewState("projects");
  }
})();
