/* =========================================================
   COREVIA — projects grid, filters and modal
   Reads window.COREVIA_PROJECTS (assets/js/projects.js)
   ========================================================= */
(function () {
  const C = window.COREVIA, P = (window.COREVIA_PROJECTS || []).slice()
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const svc = Object.fromEntries(C.services.map(s => [s.id, s]));
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = d => { const x = new Date(d + "T00:00:00"); return isNaN(x) ? "" : x.toLocaleDateString("en-GB", { month: "short", year: "numeric" }); };
  const isNew = d => (Date.now() - new Date(d + "T00:00:00")) / 864e5 < 35;
  const ytId = v => { if (!v) return ""; const m = String(v).match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/); return m ? m[1] : v; };
  const driveId = v => { if (!v) return ""; const m = String(v).match(/(?:\/d\/|id=)([\w-]{20,})/); return m ? m[1] : v; };
  const mockOf = p => window.coreviaMock((svc[p.service] || {}).mock || "web");

  function cover(p) {
    if (p.cover) return `<img src="${esc(p.cover)}" alt="" loading="lazy">`;
    if (p.drive) return mockOf(p) + `<img src="https://drive.google.com/thumbnail?id=${esc(driveId(p.drive))}&sz=w1280" alt="" loading="lazy" onerror="this.remove()" style="position:absolute;inset:0;z-index:1">`;
    if (p.youtube) return `<img src="https://i.ytimg.com/vi/${esc(ytId(p.youtube))}/hqdefault.jpg" alt="" loading="lazy">`;
    if (p.video) return mockOf(p) + `<video src="${esc(p.video)}#t=1" muted loop playsinline preload="metadata" style="position:relative;z-index:1"></video>`;
    return mockOf(p);
  }

  function card(p) {
    const s = svc[p.service] || { title: p.service };
    const playable = p.video || p.youtube || p.drive;
    return `<article class="glass spot pcard" role="button" tabindex="0" aria-label="${esc(p.title)}" data-tilt="6" data-id="${esc(p.id)}" data-cursor="${playable ? "PLAY" : "VIEW"}">
      <div class="cover">
        <div class="badges">
          ${isNew(p.date) ? '<span class="badge new">NEW</span>' : ""}
          ${p.concept ? '<span class="badge">CONCEPT</span>' : '<span class="badge real">CLIENT</span>'}
        </div>
        ${cover(p)}
        ${playable ? '<span class="play" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg></span>' : ""}
      </div>
      <div class="meta">
        <div class="row"><span class="cyan">${esc(s.title)}</span><span>${fmt(p.date)}</span></div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
      </div>
    </article>`;
  }

  function wire(root) {
    root.querySelectorAll(".pcard video").forEach(v => {
      const b = v.closest(".pcard");
      v.addEventListener("error", () => v.remove());
      v.addEventListener("loadeddata", () => v.previousElementSibling && v.previousElementSibling.classList.contains("mock") && v.previousElementSibling.remove());
      b.addEventListener("mouseenter", () => v.play().catch(() => {}));
      b.addEventListener("mouseleave", () => v.pause());
    });
    root.querySelectorAll(".pcard").forEach(b => {
      b.addEventListener("click", () => openModal(b.dataset.id));
      b.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(b.dataset.id); } });
    });
    window.coreviaEnhance(root);
  }

  function animateIn(cards) {
    if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(cards, { y: 60, opacity: 0, rotateX: 10, duration: 0.9, ease: "power3.out", stagger: 0.08,
      scrollTrigger: window.ScrollTrigger ? { trigger: cards[0], start: "top 92%" } : undefined });
  }

  document.querySelectorAll("[data-projects]").forEach(grid => {
    const mode = grid.dataset.projects, limit = +grid.dataset.limit || Infinity;
    if (mode === "featured") {
      const list = P.filter(p => p.featured).sort((a, b) => (a.concept ? 1 : 0) - (b.concept ? 1 : 0)).slice(0, limit);
      grid.innerHTML = list.map(card).join("");
      wire(grid); animateIn([...grid.children]);
      return;
    }
    // full grid with filters
    const bar = document.querySelector("[data-filters]");
    const counts = P.reduce((m, p) => (m[p.service] = (m[p.service] || 0) + 1, m), {});
    const cats = [["all", "All work", P.length], ...C.services.map(s => [s.id, s.title, counts[s.id] || 0])];
    if (bar) bar.innerHTML = cats.map(([id, t, n], i) => `<button data-f="${id}" class="${i ? "" : "on"}" aria-pressed="${!i}">${t}<sup>${n}</sup></button>`).join("");
    const render = f => {
      const list = f === "all" ? P : P.filter(p => p.service === f);
      grid.innerHTML = list.length ? list.map(card).join("") : `<div class="glass empty" style="grid-column:1/-1">New ${esc((svc[f] || {}).title || "")} work is on the way — check back next month ✦</div>`;
      wire(grid);
      if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches)
        gsap.from(grid.children, { y: 40, opacity: 0, scale: 0.96, duration: 0.6, ease: "power3.out", stagger: 0.05 });
      window.coreviaRefresh && window.coreviaRefresh();
    };
    if (bar) bar.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      bar.querySelectorAll("button").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
      render(b.dataset.f);
    });
    const initial = new URLSearchParams(location.search).get("service");
    render("all");
    if (initial && bar) { const b = bar.querySelector(`[data-f="${CSS.escape(initial)}"]`); b && b.click(); }
  });

  /* ---------------- modal ---------------- */
  let modal, lastFocus;
  function openModal(id) {
    const p = P.find(x => x.id === id); if (!p) return;
    const s = svc[p.service] || { title: p.service };
    lastFocus = document.activeElement;
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal"; modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true");
      document.body.append(modal);
      modal.addEventListener("click", e => { if (e.target.closest(".scrim, .close")) closeModal(); });
      addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
    }
    let media;
    if (p.drive) media = `<iframe src="https://drive.google.com/file/d/${esc(driveId(p.drive))}/preview" allow="autoplay; fullscreen" allowfullscreen title="${esc(p.title)}"></iframe>`;
    else if (p.youtube) media = `<iframe src="https://www.youtube-nocookie.com/embed/${esc(ytId(p.youtube))}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="${esc(p.title)}"></iframe>`;
    else if (p.video) media = mockOf(p) + `<video src="${esc(p.video)}" controls autoplay playsinline style="position:relative;z-index:1"></video>`;
    else media = mockOf(p);
    const wa = `Hi Corevia! I saw "${p.title}" on your website and I want something similar.`;
    modal.innerHTML = `<div class="scrim"></div>
      <div class="glass panel">
        <button class="close" aria-label="Close">×</button>
        <div class="media">${media}</div>
        <div class="info">
          <div class="row" style="display:flex;gap:10px;flex-wrap:wrap">
            <span class="chip"><i class="dot"></i>${esc(s.title)}</span>
            <span class="chip gold"><i class="dot"></i>${esc(p.client)}</span>
            <span class="chip">${fmt(p.date)}</span>
            ${p.concept ? '<span class="chip">Concept</span>' : ""}
          </div>
          <h3>${esc(p.title)}</h3>
          <p class="lead">${esc(p.summary)}</p>
          ${p.tags && p.tags.length ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin:18px 0 26px">${p.tags.map(t => `<span class="badge">${esc(t)}</span>`).join("")}</div>` : ""}
          <div class="btn-row">
            <a class="btn" href="contact.html" data-wa-msg="${esc(wa)}">I want something like this</a>
            ${p.link ? `<a class="btn ghost" href="${esc(p.link)}" ${/^https?:/.test(p.link) ? 'target="_blank" rel="noopener"' : ""}>Open project</a>` : ""}
          </div>
        </div>
      </div>`;
    const v = modal.querySelector(".media video");
    if (v) v.addEventListener("error", () => {
      v.remove();
      modal.querySelector(".media").insertAdjacentHTML("beforeend", `<div class="vid-missing">🎬 The full video is being uploaded — check back soon.</div>`);
    });
    requestAnimationFrame(() => modal.classList.add("open"));
    window.lenis && lenis.stop();
    modal.querySelector(".close").focus();
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.querySelectorAll("video").forEach(v => v.pause());
    const f = modal.querySelector("iframe"); if (f) f.remove();
    window.lenis && lenis.start();
    lastFocus && lastFocus.focus();
  }
})();
