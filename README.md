# Corevia — website

Animated, glassy, 3D studio website for **Corevia — IT Solutions Engineering**.
Plain HTML/CSS/JS with no build step, so it can be hosted for free on **Cloudflare Pages**.

## Pages

| Page | File | Highlights |
|---|---|---|
| Home | `index.html` | 3D logo, pinned horizontal service cards, scroll-driven before → after transformation, process timeline, latest work |
| Services | `services.html` | 7 services with animated visuals, sticky side menu, drag-to-compare cinematic slider |
| Work | `work.html` | Portfolio with filters, "NEW" badges, video popup |
| Pricing | `pricing.html` | 3 packages, quote builder that sends to WhatsApp, FAQ |
| About | `about.html` | Founder card (Moustafa Maher), promises, timeline |
| Contact | `contact.html` | Form that opens WhatsApp with the message filled in |

The animated background is a live WebGL shader in the brand colours. It reacts to scrolling and to the mouse, and each page has its own variation.

## Put it online for free (Cloudflare Pages)

**Option A — connect GitHub (updates go live automatically)**
1. Go to <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick this repository and the branch.
3. Framework preset: **None**. Build command: *(leave empty)*. Build output directory: `/`.
4. Click **Save and Deploy**. You get a free link like `corevia.pages.dev`.

**Option B — drag and drop**
Workers & Pages → Create → Pages → **Upload assets** → drag the whole project folder.

## Monthly update: add new work

1. Open `assets/js/projects.js`.
2. Copy a project block, paste it at the **top** of the list, and change the fields.
3. Put images in `assets/img/projects/` and short videos in `assets/video/projects/`.
4. Commit and push. Cloudflare redeploys by itself.

Projects dated in the last 35 days get a gold **NEW** badge automatically.
Studio pieces with `concept: true` show a **CONCEPT** badge. Delete them as real client work comes in.

### Video sizes
Cloudflare Pages accepts files up to **25 MB** each. For 4K or long videos:
- **Best:** upload to YouTube (it can be *Unlisted*) and put the link in `youtube: "..."`. The site shows the thumbnail and plays it in the popup.
- **Or:** export a 1080p web version under 25 MB (HandBrake → "Fast 1080p30", or lower the bitrate) and save it as `assets/video/projects/<name>.mp4`.

**Dr Mohamed Ehab:** the site expects `assets/video/projects/dr-mohamed-ehab.mp4`. If you use YouTube instead, set `youtube:` in that project and clear `video:`.

## Gemini Omni background videos (optional)

The WebGL background works without any video. To add a Gemini Omni clip on top of it:

1. Generate a clip in the Gemini app or Google Flow (prompts below). Export it as MP4, ideally 1080p, under 25 MB, with no audio.
2. Save it in `assets/video/backgrounds/`, for example `home.mp4`.
3. In `assets/js/config.js`, set `backgrounds.home.src = "assets/video/backgrounds/home.mp4"`.
   - `mode: "scrub"`: the video plays forwards and backwards as the visitor scrolls. This is the scroll transformation effect.
   - `mode: "loop"`: the video loops on its own.

The video is blended with *screen* mode over the shader, so dark parts disappear and bright parts glow. Clips with **dark backgrounds** work best.

**Suggested prompts** (brand colours: deep navy `#050f14`, cyan `#1AD4E6`, gold `#D4A23E`):

- **Home (scrub):** "Slow cinematic camera push through a dark navy void filled with glowing cyan light ribbons and thin gold particles, abstract tech energy, a large thin cyan ring slowly rotating, volumetric fog, pure black background, seamless, 8 seconds, no text."
- **Services (loop):** "Abstract floating glass shapes and soft cyan neon lines drifting in darkness, gold dust sparkles, very slow, seamless loop, dark background, no text."
- **Work (loop):** "Film strips and glowing screens floating in a dark space with cyan and gold light leaks, slow parallax drift, seamless loop, no text."
- **About (scrub):** "Camera slowly orbiting a glowing cyan circular core with a gold check-mark shaped light, dark navy space, particles, cinematic, no text."
- **Contact / Pricing (loop):** "Soft cyan aurora waves flowing across a near-black background with tiny gold particles, calm, seamless loop, no text."

## Editing basics

- **Contact info and services:** `assets/js/config.js`
- **Colours and styles:** `assets/css/style.css` (the variables at the top)
- **Text on each page:** the `.html` files
- **Libraries:** GSAP, Lenis and Three.js are stored in `assets/vendor/`, so the site does not depend on outside CDNs.
