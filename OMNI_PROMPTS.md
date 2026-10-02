# Corevia × Gemini Omni — prompt pack

Generate these in the **Gemini app** or **Google Flow** with Omni, then send them to Claude (or put them in the folders listed). Each one has a ready slot on the website.

## Rules for every clip and photo

- **Dark background.** The site blends videos with *screen* mode, so black areas become see-through and bright areas glow. A dark navy or black background is essential.
- **Brand colours:** cyan `#1AD4E6`, gold `#D4A23E`, deep navy `#050f14`. Put these words in every prompt: *"cyan and gold on deep navy black"*.
- **No text, no logos, no letters.** AI-made text and logos come out broken. The site adds the real logo and text itself.
- **Video:** MP4, 1080p, no audio, 6–10 seconds. Keep each file under **8 MB** so the site stays fast (Cloudflare's limit is 25 MB).
- **Seamless loops:** add *"seamless loop, the last frame matches the first frame"*.
- **Photos:** JPG or WebP, at least 1600 px wide.

Add this **style tail** to the end of every prompt:

> cinematic, ultra detailed, soft volumetric light, shallow depth of field, cyan and gold on deep navy black background, premium tech brand aesthetic, no text, no logos, no letters

---

## Priority 1 — Home page background (the biggest impact)

**File:** `assets/video/backgrounds/home.mp4` · 16:9 · scroll-controlled (it plays forwards and backwards as people scroll)

> Slow continuous camera push forward through a dark void, glowing cyan light ribbons flowing past the camera, tiny gold particles drifting, a huge thin cyan ring slowly rotating in the distance, light fog, smooth motion, 8 seconds, + style tail

Alternative (more "3D"):
> Camera slowly flying through a field of floating dark glass cubes and glass spheres lit by cyan rim light and warm gold highlights, reflections and refractions, smooth forward dolly, 8 seconds, + style tail

---

## Priority 2 — Seven service loops (they replace the drawn visuals on Home and Services)

Format: **1:1 square**, 6–8 s, seamless loop. Save as `assets/video/services/<name>.mp4`.

| # | File name | Prompt (+ style tail) |
|---|---|---|
| 1 | `video-montage.mp4` | A floating holographic video-editing timeline in dark space, clips sliding and snapping together, a glowing playhead sweeping across, film frames flying out in 3D, seamless loop |
| 2 | `websites.mp4` | A floating glass laptop screen in dark space showing an abstract glowing website layout that scrolls, UI cards assembling themselves in 3D, seamless loop |
| 3 | `mobile-apps.mp4` | Two sleek smartphones floating and slowly rotating in dark space, screens glowing with abstract app interface cards that slide in, seamless loop |
| 4 | `company-systems.mp4` | A glowing 3D network of connected glass nodes, cyan data pulses travelling between them like a living company system, slow orbit camera, seamless loop |
| 5 | `data-analytics.mp4` | Holographic 3D bar charts rising from a dark glass floor, a glowing cyan line graph drawing itself above them, gold data particles, seamless loop |
| 6 | `ai-video.mp4` | A still black-and-white photo of a perfume bottle on a dark table slowly comes to life: colour floods in, light sweeps across, mist swirls, cinematic product commercial, seamless loop |
| 7 | `cinematic.mp4` | Split screen in one shot: the left half is flat grey amateur phone footage of a sunset over mountains, and a glowing gold line sweeps across turning it into a rich teal-and-orange cinematic film grade with lens flare, seamless loop |

**Prefer photos?** Use the same prompts as still images (1:1) and save them as `assets/img/services/<name>.jpg`.

---

## Priority 3 — Founder photo (About page)

**File:** `assets/img/founder.jpg` · 4:5 portrait

Upload a clear photo of yourself to Omni, then:
> Turn this into a premium studio portrait of the same person, keep the face exactly the same, dark navy background, cyan rim light from the left, warm gold key light from the right, confident relaxed pose, smart casual outfit, cinematic, sharp focus, no text

---

## Priority 4 — Other page backgrounds (loops, 16:9)

| File | Prompt (+ style tail) |
|---|---|
| `assets/video/backgrounds/services.mp4` | Abstract floating glass shapes and soft cyan neon lines drifting slowly in darkness, gold dust sparkles, seamless loop |
| `assets/video/backgrounds/work.mp4` | Film strips and glowing screens floating in dark space with cyan and gold light leaks, slow parallax drift, seamless loop |
| `assets/video/backgrounds/pricing.mp4` | Soft cyan aurora waves flowing across a near-black background with tiny gold particles, calm, seamless loop |
| `assets/video/backgrounds/about.mp4` | Camera slowly orbiting a glowing cyan circular ring with a warm gold light at its centre, dark space, particles, 8 seconds (scroll-controlled) |
| `assets/video/backgrounds/contact.mp4` | Two glowing points of light, one cyan and one gold, connected by a flowing ribbon of light across a dark world map silhouette, slow, seamless loop |

---

## Priority 5 — Project covers

For every project you add each month, export one strong frame as `assets/img/projects/<project-id>.jpg` (16:9 or 4:3).
**Dr Mohamed Ehab:** take your best frame from the edit and save it as `assets/img/projects/dr-mohamed-ehab.jpg`.

---

### When you send files back

Send the files with their names. Claude will:
1. compress them if they're too big,
2. put them in the right folders,
3. switch them on in `assets/js/config.js` (`backgrounds` and each service's `image` / `video`),
4. check them on desktop and phone, then push.
