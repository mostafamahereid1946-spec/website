/* =========================================================
   COREVIA — PROJECTS
   ---------------------------------------------------------
   Add a new project every month by copying one block below
   and putting it at the TOP of the list (newest first).

   Fields
   - id        unique, lowercase-with-dashes
   - title     project name
   - client    client name
   - service   one of: video-montage, websites, mobile-apps,
               company-systems, data-analytics, ai-video, cinematic
   - date      "YYYY-MM-DD"
   - summary   one or two sentences
   - tags      short labels
   - cover     image path (optional) e.g. "assets/img/projects/x.jpg"
   - video     mp4 path (keep it under 25 MB for Cloudflare Pages)
   - youtube   YouTube video id or link (use this for big 4K files)
   - link      live website / store link (optional)
   - featured  true = shown on the home page
   - concept   true = studio concept piece (shows a "Concept" badge).
               Delete concept pieces as real client work arrives.
   ========================================================= */
window.COREVIA_PROJECTS = [
  {
    id: "dr-mohamed-ehab",
    title: "Dr Mohamed Ehab — Creative Edit",
    client: "Dr Mohamed Ehab",
    service: "video-montage",
    date: "2026-09-28",
    summary: "Our first client. A 4K creative edit for Dr Mohamed Ehab — fast pacing, clean motion titles and a cinematic grade built to stop the scroll.",
    tags: ["4K", "Creative edit", "Color grade", "Motion titles"],
    cover: "",
    video: "assets/video/projects/dr-mohamed-ehab.mp4",
    youtube: "",
    link: "",
    featured: true,
    concept: false
  },
  {
    id: "concept-corevia-site",
    title: "Corevia — Studio Website",
    client: "Corevia",
    service: "websites",
    date: "2026-10-01",
    summary: "This very website: glassmorphism, a live WebGL background, a real-time 3D logo and scroll-driven transitions — hosted for free on Cloudflare.",
    tags: ["WebGL", "3D", "GSAP", "Cloudflare"],
    link: "index.html",
    featured: true,
    concept: true
  },
  {
    id: "concept-clinic-app",
    title: "Clinic Booking App",
    client: "Concept",
    service: "mobile-apps",
    date: "2026-09-20",
    summary: "A booking app concept for clinics: appointments, reminders and patient history in three taps.",
    tags: ["iOS", "Android", "Booking"],
    featured: true,
    concept: true
  },
  {
    id: "concept-sales-dashboard",
    title: "Retail Sales Dashboard",
    client: "Concept",
    service: "data-analytics",
    date: "2026-09-15",
    summary: "A live KPI dashboard concept that turns daily sales sheets into clear trends and forecasts.",
    tags: ["Dashboard", "KPIs", "Forecast"],
    concept: true
  },
  {
    id: "concept-inventory-system",
    title: "Inventory & Orders System",
    client: "Concept",
    service: "company-systems",
    date: "2026-09-10",
    summary: "A company system concept for stock, orders, invoices and staff roles — all in one place.",
    tags: ["ERP", "Inventory", "Roles"],
    concept: true
  },
  {
    id: "concept-product-ai",
    title: "Perfume Bottle → AI Ad",
    client: "Concept",
    service: "ai-video",
    date: "2026-09-05",
    summary: "One product photo transformed into a moving, cinematic AI advert.",
    tags: ["Image to video", "Product", "Ad"],
    concept: true
  },
  {
    id: "concept-phone-to-cinema",
    title: "Phone Clip → Cinema",
    client: "Concept",
    service: "cinematic",
    date: "2026-09-01",
    summary: "Ordinary phone footage regraded, stabilised and upscaled into a film-look sequence.",
    tags: ["Grading", "Upscale", "Film look"],
    concept: true
  }
];
