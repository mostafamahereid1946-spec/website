/* =========================================================
   COREVIA — shared site script
   ========================================================= */
(function () {
  const C = window.COREVIA;
  const page = document.body.dataset.page || "home";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGSAP = !!window.gsap;
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const waLink = (msg = "") => `https://wa.me/${C.whatsapp}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;
  window.coreviaWA = waLink;

  /* ---------------- icons ---------------- */
  const I = {
    film: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5h3"/></svg>',
    system: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="8.5" y="14" width="7" height="7" rx="1.5"/><path d="M6.5 10v2h11v-2M12 12v2"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M3 21h18M6 17v-5M11 17V7M16 17v-8M21 4l-5 4-5-3-5 4"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>',
    lens: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M20.5 9.5l-4.7 1.3M17 19.5l-2.8-4M7 19.5l2.8-4M3.5 9.5l4.7 1.3"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
    coin: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M15 8.5c-.6-1-1.7-1.5-3-1.5-1.9 0-3 1-3 2.3 0 3 6 1.5 6 4.6 0 1.3-1.2 2.4-3 2.4-1.4 0-2.6-.6-3.2-1.6M12 5v2M12 17v2"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    call: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 005 5L15 12l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };
  window.COREVIA_ICONS = I;
  const wa = '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.3c0-.1-.2-.2-.4-.3z"/></svg>';

  /* ---------------- shell: nav, menu, footer ---------------- */
  const links = [
    ["home", "index.html", "Home"],
    ["services", "services.html", "Services"],
    ["work", "work.html", "Work"],
    ["pricing", "pricing.html", "Pricing"],
    ["about", "about.html", "About"],
    ["contact", "contact.html", "Contact"]
  ];
  const nav = document.createElement("header");
  nav.className = "nav";
  nav.innerHTML = `
    <a class="brand" href="index.html" aria-label="Corevia home"><img src="assets/img/logo-mark.svg" alt="" width="32" height="32"><span>COREVIA</span></a>
    <nav aria-label="Main"><ul class="nav-links">${links.map(([k, h, t]) => `<li><a href="${h}" class="${k === page ? "active" : ""}" data-scramble>${t}</a></li>`).join("")}</ul></nav>
    <a class="btn sm" href="contact.html" data-magnetic>Start a project <span class="arr">${I.arrow}</span></a>
    <button class="burger" aria-label="Open menu" aria-expanded="false"><i></i><i></i></button>`;
  document.body.prepend(nav);

  const mm = document.createElement("div");
  mm.className = "mobile-menu";
  mm.innerHTML = links.map(([k, h, t], i) => `<a href="${h}" class="${k === page ? "active" : ""}"><small>0${i + 1}</small>${t}</a>`).join("") +
    `<div class="mm-foot">${C.phone} · ${C.location}</div>`;
  document.body.append(mm);
  const burger = $(".burger", nav);
  burger.addEventListener("click", () => {
    const open = document.documentElement.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", open);
    if (window.lenis) open ? lenis.stop() : lenis.start();
  });

  const svcLinks = C.services.map(s => `<li><a href="services.html#${s.id}">${s.title}</a></li>`).join("");
  const foot = document.createElement("footer");
  foot.className = "footer";
  foot.innerHTML = `
    <div class="wrap">
      <div class="cols">
        <div>
          <a class="brand" href="index.html"><img src="assets/img/logo-mark.svg" alt="" width="32" height="32"><span>COREVIA</span></a>
          <p class="muted" style="margin:18px 0 22px;max-width:34ch">${C.tagline}. Video, web, apps, systems, data and AI — affordable, and delivered fast.</p>
          <a class="btn sm" href="${waLink("Hi Corevia! I'd like to start a project.")}" target="_blank" rel="noopener" data-magnetic>WhatsApp us <span class="arr">${I.arrow}</span></a>
        </div>
        <div><h5>Services</h5><ul>${svcLinks}</ul></div>
        <div><h5>Studio</h5><ul>${links.map(([, h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
        <div><h5>Contact</h5><ul>
          <li><a href="tel:${C.phone.replace(/\s/g, "")}">${C.phone}</a></li>
          <li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a></li>
          ${C.email ? `<li><a href="mailto:${C.email}">${C.email}</a></li>` : ""}
          <li><span class="muted">${C.location}</span></li>
        </ul></div>
      </div>
      <div class="huge" aria-hidden="true">COREVIA</div>
      <div class="bottom"><span>© ${new Date().getFullYear()} Corevia — ${C.tagline}</span><span>New work added every month ✦</span></div>
    </div>`;
  document.body.append(foot);

  if (page !== "contact") {
    const f = document.createElement("a");
    f.className = "wa-float"; f.href = waLink("Hi Corevia!"); f.target = "_blank"; f.rel = "noopener";
    f.setAttribute("aria-label", "Chat on WhatsApp"); f.innerHTML = wa;
    document.body.append(f);
  }

  const prog = document.createElement("div"); prog.className = "progress"; document.body.append(prog);

  /* ---------------- mockups (animated "photos") ---------------- */
  let sid = 0;
  function sceneSVG() {
    const k = "s" + (++sid);
    return `<svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="${k}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d3b4a"/><stop offset=".55" stop-color="#e08a3c"/><stop offset="1" stop-color="#f4c26b"/></linearGradient>
        <radialGradient id="${k}sun"><stop offset="0" stop-color="#fff3cf"/><stop offset=".4" stop-color="#ffc861"/><stop offset="1" stop-color="#ffc861" stop-opacity="0"/></radialGradient>
        <linearGradient id="${k}sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f5e6b"/><stop offset="1" stop-color="#03161b"/></linearGradient>
      </defs>
      <rect width="160" height="90" fill="url(#${k}sky)"/>
      <circle cx="104" cy="50" r="26" fill="url(#${k}sun)"/>
      <path d="M0 58 L22 36 L38 50 L58 28 L80 54 L100 40 L122 56 L140 38 L160 52 V90 H0Z" fill="#1d3f4a" opacity=".8"/>
      <path d="M0 64 L30 48 L52 60 L76 44 L104 62 L130 50 L160 62 V90 H0Z" fill="#0c2a33"/>
      <rect y="66" width="160" height="24" fill="url(#${k}sea)"/>
      <path d="M90 66 h28 M94 70 h20 M98 74 h12" stroke="#ffd27a" stroke-width="1" opacity=".7"/>
      <g fill="#051014"><path d="M34 66 c0-6 2-9 4-9s4 3 4 9z"/><circle cx="38" cy="54" r="2.4"/><path d="M20 66 l3-14 l3 14z"/><path d="M14 66 l4-20 l4 20z"/></g>
    </svg>`;
  }
  window.coreviaScene = sceneSVG;

  function mockup(type) {
    switch (type) {
      case "video": return `<div class="mock m-video"><div class="viewer"><div class="sun"></div><div class="hill"></div><div class="rec">REC 4K</div></div>
        <div class="tl"><div class="trk"><i style="flex:3"></i><i style="flex:2"></i><i style="flex:4"></i><i style="flex:1.5"></i></div>
        <div class="trk"><i style="flex:1.5"></i><i style="flex:4"></i><i style="flex:2"></i></div>
        <div class="trk"><i style="flex:6"></i><i style="flex:3"></i></div><div class="head"></div></div></div>`;
      case "web": return `<div class="mock m-web"><div class="win"><div class="bar"><i></i><i></i><i></i><b></b></div><div class="page"><div class="scroll">
        <div class="hl"></div><div class="ln"></div><div class="ln s"></div><div class="cta-b"></div><div class="img"></div>
        <div class="cards"><i></i><i></i><i></i></div><div class="ln"></div><div class="ln s"></div><div class="cards"><i></i><i></i><i></i></div><div class="img"></div></div></div></div></div>`;
      case "phone": {
        const scr = `<div class="scr"><div class="hi"></div><div class="card"></div><div class="row"></div><div class="row"></div><div class="row"></div><div class="tabs"></div></div>`;
        return `<div class="mock m-phone"><div class="ph">${scr}</div><div class="ph ph2">${scr}</div></div>`;
      }
      case "system": return `<div class="mock m-system"><svg viewBox="0 0 200 150" aria-hidden="true">
        <g fill="none" stroke-width="1.4"><path class="flow" d="M100 75 L40 32" stroke="#1AD4E6"/><path class="flow" d="M100 75 L160 32" stroke="#1AD4E6"/><path class="flow" d="M100 75 L40 118" stroke="#D4A23E"/><path class="flow" d="M100 75 L160 118" stroke="#D4A23E"/><path class="flow" d="M40 32 L160 32" stroke="#ffffff33"/><path class="flow" d="M40 118 L160 118" stroke="#ffffff33"/></g>
        <g font-family="JetBrains Mono, monospace" font-size="7" fill="#e8f1f3" text-anchor="middle">
          <g class="node"><rect x="16" y="20" width="48" height="24" rx="6" fill="#0d2a33" stroke="#1AD4E6"/><text x="40" y="35">CRM</text></g>
          <g class="node"><rect x="136" y="20" width="48" height="24" rx="6" fill="#0d2a33" stroke="#1AD4E6"/><text x="160" y="35">SALES</text></g>
          <g class="node"><rect x="16" y="106" width="48" height="24" rx="6" fill="#2a2210" stroke="#D4A23E"/><text x="40" y="121">STOCK</text></g>
          <g class="node"><rect x="136" y="106" width="48" height="24" rx="6" fill="#2a2210" stroke="#D4A23E"/><text x="160" y="121">HR</text></g>
          <circle cx="100" cy="75" r="24" fill="#071419" stroke="#1AD4E6" stroke-width="2"/>
          <path d="M111 66 A13 13 0 1 0 111 84" fill="none" stroke="#1AD4E6" stroke-width="4"/><path d="M95 71 L101 78 L106 72 H109" fill="none" stroke="#D4A23E" stroke-width="2.6"/>
        </g></svg></div>`;
      case "data": return `<div class="mock m-data"><div class="kpis"><div class="kpi">Revenue<b class="up">+38%</b></div><div class="kpi">Orders<b>2,481</b></div><div class="kpi">Churn<b class="up">−12%</b></div></div>
        <div class="chart">${[40, 62, 48, 75, 58, 88, 70, 96].map((h, i) => `<i style="height:${h}%;animation-delay:${i * 0.08}s"></i>`).join("")}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 70 L14 52 L28 60 L42 34 L56 44 L70 18 L84 28 L100 6" fill="none" stroke="#fff" stroke-width="1.4" vector-effect="non-scaling-stroke"/></svg></div></div>`;
      case "ai": return `<div class="mock m-ai"><div class="photo"><i></i></div><div class="arrow"><b>→</b>AI</div><div class="film"><i></i>
        <span class="spk" style="left:20%;top:20%"></span><span class="spk" style="left:75%;top:35%;animation-delay:.6s"></span><span class="spk" style="left:40%;top:80%;animation-delay:1.2s"></span></div></div>`;
      case "cine": return `<div class="mock m-cine"><div class="scene before">${sceneSVG()}</div><div class="scene after">${sceneSVG()}</div></div>`;
    }
    return `<div class="mock"></div>`;
  }
  window.coreviaMock = mockup;
  $$("[data-mock]").forEach(el => { el.outerHTML = mockup(el.dataset.mock); });
  $$("[data-scene]").forEach(el => { el.innerHTML = sceneSVG(); });

  /* ---------------- loader (first visit per session) ---------------- */
  let firstVisit = false;
  try { firstVisit = !sessionStorage.getItem("cv-loaded"); sessionStorage.setItem("cv-loaded", "1"); } catch (e) {}
  const logoPaths = `<path class="c" d="M78.3 21.7 A40 40 0 1 0 78.3 78.3" fill="none" stroke="#1AD4E6" stroke-width="13"/><path class="v" d="M31 37 L52 61 L70 40 H82" fill="none" stroke="#D4A23E" stroke-width="9"/>`;
  let loaderDone = Promise.resolve();
  if (firstVisit && !reduce) {
    const l = document.createElement("div");
    l.className = "loader";
    l.innerHTML = `<div><svg viewBox="0 0 100 100">${logoPaths}</svg><div class="word">COREVIA</div><div class="bar"><i></i></div></div>`;
    document.body.append(l);
    loaderDone = new Promise(res => setTimeout(() => {
      if (hasGSAP) gsap.to(l, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut", onComplete: () => { l.remove(); } });
      else l.remove();
      res();
    }, 1700));
  }

  /* ---------------- page transitions ---------------- */
  const pt = document.createElement("div");
  pt.className = "pt"; pt.setAttribute("aria-hidden", "true");
  pt.innerHTML = "<i></i><i></i><i></i><i></i><i></i>" + `<svg class="pt-logo" viewBox="0 0 100 100">${logoPaths}</svg>`;
  document.body.append(pt);
  const cols = $$("i", pt);
  if (hasGSAP && !reduce) {
    let cameFromNav = false;
    try { cameFromNav = sessionStorage.getItem("cv-pt") === "1"; sessionStorage.removeItem("cv-pt"); } catch (e) {}
    if (cameFromNav) {
      gsap.set(cols, { scaleY: 1, transformOrigin: "top" });
      gsap.to(cols, { scaleY: 0, duration: 0.7, ease: "power4.inOut", stagger: 0.06, delay: 0.05 });
    }
    document.addEventListener("click", e => {
      const a = e.target.closest("a");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname) || (url.pathname === location.pathname && url.hash)) return;
      if (url.pathname === location.pathname && !url.hash) { e.preventDefault(); return; }
      e.preventDefault();
      document.documentElement.classList.remove("menu-open");
      try { sessionStorage.setItem("cv-pt", "1"); } catch (err) {}
      gsap.set(cols, { transformOrigin: "bottom" });
      gsap.to(cols, { scaleY: 1, duration: 0.55, ease: "power4.inOut", stagger: 0.05, onComplete: () => { location.href = url.href; } });
      gsap.to(".pt-logo", { opacity: 1, duration: 0.3, delay: 0.35 });
    });
    addEventListener("pageshow", e => { if (e.persisted) { gsap.set(cols, { scaleY: 0 }); gsap.set(".pt-logo", { opacity: 0 }); } });
  }

  /* ---------------- smooth scroll ---------------- */
  if (window.Lenis && !reduce) {
    window.lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    if (hasGSAP && window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
      const t = $(a.getAttribute("href")); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -90 }); }
    }));
  }

  /* ---------------- nav hide / progress ---------------- */
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("hide", y > lastY && y > 300 && !document.documentElement.classList.contains("menu-open"));
    lastY = y;
    prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true });

  /* ---------------- cursor ---------------- */
  if (fine && !reduce) {
    const c = document.createElement("div"); c.className = "cursor"; c.innerHTML = '<span class="lbl"></span>';
    const d = document.createElement("div"); d.className = "cursor-dot";
    document.body.append(c, d);
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener("pointermove", e => { x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px,${y}px)`; }, { passive: true });
    (function loop() { cx += (x - cx) * 0.18; cy += (y - cy) * 0.18; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("pointerover", e => {
      const t = e.target.closest("a, button, [data-cursor], .opt span, summary, .ba");
      c.classList.toggle("hover", !!t);
      $(".lbl", c).textContent = t ? (t.dataset.cursor || "") : "";
    });
  }

  /* ---------------- magnetic + scramble ---------------- */
  function magnetic(el) {
    if (!fine || reduce) return;
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2, my = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${mx * 0.28}px, ${my * 0.38}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  }
  $$("[data-magnetic], .btn").forEach(magnetic);
  window.coreviaMagnetic = magnetic;

  const glyphs = "!<>-_\\/[]{}—=+*^?#01";
  $$("[data-scramble]").forEach(el => {
    const orig = el.textContent; let raf;
    el.addEventListener("mouseenter", () => {
      let f = 0; cancelAnimationFrame(raf);
      const run = () => {
        el.textContent = orig.split("").map((ch, i) => i < f / 2 ? orig[i] : glyphs[Math.floor(Math.random() * glyphs.length)]).join("");
        if (f++ < orig.length * 2) raf = requestAnimationFrame(run); else el.textContent = orig;
      };
      run();
    });
  });

  /* ---------------- spotlight + tilt ---------------- */
  function spot(el) {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
    });
  }
  function tilt(el) {
    if (!fine || reduce) return;
    const max = parseFloat(el.dataset.tilt) || 8;
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = "transform .1s";
      el.style.transform = `perspective(1000px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transition = ""; el.style.transform = ""; });
  }
  window.coreviaEnhance = root => {
    $$(".spot", root).forEach(spot);
    $$("[data-tilt]", root).forEach(tilt);
    $$(".btn", root).forEach(magnetic);
  };
  window.coreviaEnhance(document);

  /* ---------------- split text ---------------- */
  $$("[data-split]").forEach(el => {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(document.createTextNode(part)); return; }
            const w = document.createElement("span"); w.className = "w";
            const i = document.createElement("span"); i.textContent = part; w.append(i); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains("w")) walk(n);
      });
    };
    walk(el); el.classList.add("split");
  });

  /* ---------------- before/after slider ---------------- */
  $$(".ba").forEach(ba => {
    const after = $(".after", ba), knob = $(".knob", ba);
    const set = x => {
      const r = ba.getBoundingClientRect();
      const p = Math.min(Math.max((x - r.left) / r.width, 0), 1) * 100;
      after.style.clipPath = `inset(0 0 0 ${p}%)`; knob.style.left = p + "%";
    };
    let down = false;
    ba.addEventListener("pointerdown", e => { down = true; ba.setPointerCapture(e.pointerId); set(e.clientX); });
    ba.addEventListener("pointermove", e => { if (down || fine) set(e.clientX); });
    ba.addEventListener("pointerup", () => { down = false; });
    ba.tabIndex = 0; ba.setAttribute("role", "slider"); ba.setAttribute("aria-label", "Before and after comparison");
    let kp = 50;
    ba.addEventListener("keydown", e => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      kp = Math.min(100, Math.max(0, kp + (e.key === "ArrowLeft" ? -5 : 5)));
      after.style.clipPath = `inset(0 0 0 ${kp}%)`; knob.style.left = kp + "%";
    });
  });

  /* ---------------- GSAP scroll animations ---------------- */
  function animations() {
    if (!hasGSAP || !window.ScrollTrigger || reduce) return;

    // hero intro
    const heroWords = $$(".hero [data-split] .w > span"), heroFade = $$(".hero [data-hero-fade]"), chips = $$(".float-chips .chip");
    const tl = gsap.timeline({ delay: 0.15 });
    if (heroWords.length) tl.from(heroWords, { yPercent: 110, rotate: 6, duration: 1.1, ease: "power4.out", stagger: 0.05 });
    if (heroFade.length) tl.from(heroFade, { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }, "-=0.7");
    if (chips.length) tl.from(chips, { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(2)", stagger: 0.1 }, "-=0.6");

    // generic reveals
    $$("[data-split]:not(.hero [data-split])").forEach(el => {
      gsap.from($$(".w > span", el), { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.035, scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    $$("[data-reveal]").forEach(el => {
      const kids = el.dataset.reveal === "stagger" ? [...el.children] : [el];
      gsap.from(kids, { y: 60, opacity: 0, rotateX: 8, duration: 1.1, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    $$("[data-scale-in]").forEach(el => {
      gsap.from(el, { scale: 0.85, opacity: 0, y: 80, duration: 1.3, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
    });
    $$("[data-speed]").forEach(el => {
      gsap.to(el, { yPercent: -parseFloat(el.dataset.speed) * 100, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    $$("[data-count]").forEach(el => {
      const o = { v: 0 }, end = parseFloat(el.dataset.count), pad = el.dataset.pad ? +el.dataset.pad : 0;
      gsap.to(o, { v: end, duration: 2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => { el.textContent = String(Math.round(o.v)).padStart(pad, "0") + (el.dataset.suffix || ""); } });
    });

    // hero copy fades/moves away while scrolling
    const hc = $(".hero .hero-copy");
    if (hc) gsap.to(hc, { y: -120, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

    // horizontal services
    const hs = $(".hs");
    if (hs && matchMedia("(min-width: 761px) and (min-height: 561px)").matches) {
      const track = $(".hs-track", hs);
      const dist = () => Math.max(0, track.scrollWidth - innerWidth + (parseFloat(getComputedStyle(track).paddingLeft) || 32));
      const hTween = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: hs, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
      gsap.to(".hs-progress i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: hs, start: "top top", end: () => "+=" + dist(), scrub: true } });
      $$(".hs-card", hs).forEach(card => {
        gsap.fromTo(card, { rotateY: -18, scale: 0.88, opacity: 0.4 }, { rotateY: 0, scale: 1, opacity: 1, ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: hTween, start: "left right", end: "center 65%", scrub: true } });
      });
    }

    // scroll-driven transformation
    const tx = $(".tx");
    if (tx) {
      const t2 = gsap.timeline({ scrollTrigger: { trigger: tx, start: "top top", end: "bottom bottom", scrub: 1 } });
      t2.fromTo(".tx-frame", { scale: 0.7, rotateX: 18, borderRadius: 60 }, { scale: 1, rotateX: 0, borderRadius: 28, ease: "power2.out", duration: 0.3 })
        .to(".tx-frame .after", { clipPath: "inset(0 0 0 0%)", ease: "none", duration: 0.5 }, 0.25)
        .to(".tx-frame .handle", { left: "0%", ease: "none", duration: 0.5 }, 0.25)
        .from(".tx-copy", { y: 60, opacity: 0, duration: 0.2 }, 0.6)
        .to(".tx-frame", { scale: 0.92, duration: 0.2 }, 0.8);
    }

    // process line
    const line = $(".steps .line i");
    if (line) gsap.to(line, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".steps", start: "top 70%", end: "bottom 60%", scrub: true } });

    // marquee speed follows scroll velocity
    $$(".marquee").forEach(m => {
      gsap.to(m, { xPercent: m.classList.contains("rev") ? 6 : -6, ease: "none", scrollTrigger: { trigger: m, start: "top bottom", end: "bottom top", scrub: true } });
    });

    addEventListener("load", () => ScrollTrigger.refresh());
  }
  loaderDone.then(animations);
  window.coreviaRefresh = () => { if (window.ScrollTrigger) ScrollTrigger.refresh(); };

  /* ---------------- services sub-nav highlight ---------------- */
  const sn = $$(".svc-nav a");
  if (sn.length) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) sn.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    $$(".svc").forEach(s => io.observe(s));
  }
})();
