/* =========================================================
   COREVIA — site configuration
   Edit this file to change contact info, services and
   background videos. No build step needed.
   ========================================================= */
window.COREVIA = {
  brand: "Corevia",
  tagline: "IT Solutions Engineering",
  founder: "Moustafa Maher",
  role: "Digital Solutions Engineer",
  phone: "+974 3301 8108",
  whatsapp: "97433018108", // digits only, used for wa.me links
  email: "", // add a public business email here if you want it shown
  location: "Doha, Qatar",
  socials: {
    instagram: "",
    tiktok: "",
    youtube: "",
    linkedin: ""
  },

  /* Background videos generated with Google Gemini Omni (or any tool).
     Put an .mp4 in assets/video/backgrounds/ and set its path below.
     mode "scrub" = the video plays forward/backward as the visitor scrolls.
     mode "loop"  = the video loops on its own.
     Leave src empty to use the built-in animated WebGL background only. */
  backgrounds: {
    home:     { src: "", mode: "scrub", opacity: 0.55 },
    services: { src: "", mode: "loop",  opacity: 0.45 },
    work:     { src: "", mode: "loop",  opacity: 0.4 },
    pricing:  { src: "", mode: "loop",  opacity: 0.4 },
    about:    { src: "", mode: "scrub", opacity: 0.45 },
    contact:  { src: "", mode: "loop",  opacity: 0.45 }
  },

  services: [
    {
      id: "video-montage",
      icon: "film",
      mock: "video",
      title: "Video Montage",
      short: "Edits that hook in the first second and hold to the last.",
      long: "Reels, ads, events, doctors, brands and YouTube — we cut, color, sound-design and animate your footage into content people actually watch to the end.",
      points: ["Reels / TikTok / Shorts", "Ads & promos", "Color grading", "Motion titles & subtitles", "Sound design"],
      speed: "Fast delivery"
    },
    {
      id: "websites",
      icon: "globe",
      mock: "web",
      title: "Websites",
      short: "Fast, animated, glassy websites that sell for you.",
      long: "Landing pages, company sites, portfolios and online stores — designed and built from scratch, mobile-first, with motion that makes visitors stay.",
      points: ["Landing pages", "Company websites", "Portfolios", "E-commerce", "Free hosting setup"],
      speed: "Fast delivery"
    },
    {
      id: "mobile-apps",
      icon: "phone",
      mock: "phone",
      title: "Mobile Applications",
      short: "iOS & Android apps people enjoy opening.",
      long: "From idea to store: clean UI, smooth animations and a backend that scales — booking apps, delivery, internal tools and more.",
      points: ["iOS & Android", "UI / UX design", "Backend & APIs", "Admin dashboards", "Store publishing"],
      speed: "Milestone delivery"
    },
    {
      id: "company-systems",
      icon: "system",
      mock: "system",
      title: "Systems for Companies",
      short: "Custom systems that run your business on autopilot.",
      long: "CRM, ERP, inventory, HR, booking and clinic systems built around how your company really works — not the other way round.",
      points: ["CRM & ERP", "Inventory & sales", "Clinic & booking", "Automation", "Role-based access"],
      speed: "Milestone delivery"
    },
    {
      id: "data-analytics",
      icon: "chart",
      mock: "data",
      title: "Data Analysis",
      short: "Turn messy numbers into clear decisions.",
      long: "We clean, analyse and visualise your data — sales, marketing, operations — into live dashboards and reports you can act on.",
      points: ["Dashboards", "Excel / Power BI", "Sales & KPI reports", "Data cleaning", "Forecasting"],
      speed: "Fast delivery"
    },
    {
      id: "ai-video",
      icon: "spark",
      mock: "ai",
      title: "AI Video from Images",
      short: "Your photos, brought to life with AI.",
      long: "We turn still product shots, portraits and posters into moving, cinematic AI video — perfect for ads, launches and social content.",
      points: ["Image → video", "Product animations", "AI avatars", "Ad creatives", "Social content"],
      speed: "Fast delivery"
    },
    {
      id: "cinematic",
      icon: "lens",
      mock: "cine",
      title: "Cinematic Transformation",
      short: "Normal phone footage → movie-grade cinema.",
      long: "We take everyday video and transform it with cinematic grading, AI enhancement, upscaling, stabilisation and film-style effects.",
      points: ["Cinematic grading", "4K upscaling", "Stabilisation", "AI enhancement", "Film look & effects"],
      speed: "Fast delivery"
    }
  ]
};
