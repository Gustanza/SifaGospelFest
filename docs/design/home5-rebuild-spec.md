# Homepage rebuild spec: GenesisExpo "Home 5 / Music Fest" for Sifa Gospel Fest

The goal is a homepage that a person comparing it side by side with the theme demo would call **the same theme, re-branded**.
Fidelity to the theme's layout, rhythm, sizes and interactions matters more than novelty.

## Reference material (look at these before coding)
- `docs/design/ref/home5-live-header-hero.png`: the live demo header and hero (user's browser).
- `docs/design/ref/home5-01.jpg` … `home5-06.jpg`: full Home 5 page rendered from the archive, top to bottom
  (1440px wide). In the archive render the hero is boxed to 1170px only because the theme JS didn't run.
  **In the real theme the hero and all `data-vc-full-width` rows are full-bleed.**
- `docs/design/genesisexpo-patterns.md`: measured tokens and component specs (section 3 has sizes).
- `SifaResources/research/SIFA-RESEARCH.md`: the facts. Content lives in `src/data/festival.js`.

## Brand mapping (already in `src/style.css` as CSS variables, so use the variables)
| Theme | Sifa |
|---|---|
| pink `#fd226a` (accents, subtitles, CTA outline, active underline, play button) | `--primary` orange `#f06c20` |
| purple `#7c529c` (solid buttons + glow, outline buttons on dark, role text) | `--secondary` blue `#3854a4` (fills/borders); `--secondary-light` `#7f9bf0` for small text on dark |
| body bg `#070415` | `--bg` `#060a1a` |
| dark panels `#13111f` | `--surface` `#10162c`; hover `--surface-2` |
| ghost words on dark `#13111f` | `--ghost` |
| body text on dark `#dadada` | `--body` |
| fonts Rubik / Open Sans / Anonymous Pro | same + `--font-script` (Mr Dafoe) for the hero brush script |

Global classes ready to use: `.container` (1170), `.section` (120px padding), `.mono`, `.bracket`,
`.lead-center`, `.btn` + `.btn--glow | --outline | --outline-orange | --primary` + sizes `--m --l --full`,
`.play-btn` (with three `<i></i>` rings inside), `.reveal` (fade-up on scroll, auto-wired), `.sr-only`.
Shared components: `DoubleHeading.vue` (props bg, subtitle, title, align, bgColor), `SocialIcon.vue` (name: instagram|facebook|tiktok|youtube|whatsapp),
`VideoModal` (via the `play` emit with a YouTube id).

Assets in `public/images/`: `logo-light.png` (white + orange, for dark), `logo.png` (colour, for the white sticky bar),
`hero-stage.jpg`, `agape-band.jpg`, `geita-stage.jpg`, `geita-crowd.jpg`, `geita-interview.jpg`, `arusha-presser.jpg`,
`suma-mwaitenda.jpg`, `suma-avatar.jpg`, `youth-talk-mwanza.jpg`, `poster-{mbeya,geita,mwanza,arusha}.jpg`,
`baraka-gmen.jpg`, `rose-seben.jpg`, `texture-dark.jpg` (dark grain like theme section_18), `artists/*.jpg` (420×420).

## Rules for every section
- Dark page. Sections alternate between `--bg` and boxed `--surface` panels (radius 10) exactly as the reference shows.
- Every section header is a `DoubleHeading` (giant ghost word + `[orange mono subtitle]` + 40px title).
- Body copy 16/30 Open Sans `--body`; titles Rubik.
- Hover lifts and transitions as in the theme (cards −20px, rows get a `--surface` bg, images scale ~1.05).
- Responsive: 1440 → 1200 → 992 → 768 → 390. No horizontal scroll at any width. 16px side gutters on phones.
- Accessibility: real buttons/links, alt text, focus-visible styles, `prefers-reduced-motion` respected (global CSS already does this).
- Keep each component self-contained (scoped styles). **Only edit the files you own** (see Ownership).
- Content comes from `src/data/festival.js` (read-only for agents; if you need new data, define it locally inside your component).

---

## Sections (in page order)

### 1. SiteHeader.vue (see `home5-live-header-hero.png`)
- **Full-width** (no container): left padding ~40px, right ~30px. Height 110px. Absolute over the hero.
- Background band `rgba(6,10,26,0.4)` (theme `rgba(20,7,35,.4)`) spanning the full width, white text.
- Left: `logo-light.png` at **65px tall**. Centre: nav (Rubik 400, 16px, items padded `0 18px`, chevron ⌄ after items with children).
  Right: search icon (CSS-drawn magnifier or SVG, 20px), 30px spacer, then the **orange solid pill "JOIN FREE"** (`.btn--primary .btn--m`, theme "GET TICKET").
  (The theme also shows a cart icon. We have no shop, so use a WhatsApp or heart icon there linking to `#contact`, styled identically.)
- Nav hover/active: an orange 6px pill highlight grows under the label from width 0 (`span::after`, bottom 6px, left −2px, z-index −1). The current
  section's item keeps the underline (simple scroll-spy is a bonus).
- Dropdowns (items with `children`): white panel, min-width 280, padding 23px 0, radius 10, shadow `0 15px 38px rgba(0,0,0,.1)`,
  dark text #232323; items `7px 30px`; on hover a 10×4px orange pill dash slides in before the label. Fade/slide in on hover/focus-within.
- Sticky: after ~300px scroll a **white** bar (height 100px, shadow) slides down from the top, using the colour `logo.png`, dark nav text and the same right-hand items.
- Search: clicking the icon opens the theme's full-screen overlay (dark navy at 96% opacity, giant ghost word "SEARCH", 40px heading "What are you looking for?",
  a pill input 58px tall, close ×). Esc closes it.
- Mobile ≤1080px: hamburger (white lines). The menu is a full-height dark `--surface` panel sliding from the right, with accordion children.

### 2. HeroSection.vue (see `home5-live-header-hero.png` and `home5-01.jpg`)
- Full-bleed, about 100vh (min 760px). Background `hero-stage.jpg` cover with heavy grading: dark navy gradient + orange/blue tint so it reads like the theme's
  purple-pink concert photo (for example `linear-gradient(180deg, rgba(6,10,26,.55), rgba(6,10,26,.75) 70%, var(--bg))`
  plus `radial-gradient` orange glow top-right and blue glow left). It should fade into `--bg` at the bottom (no wave on Home 5).
- **Centred brand lockup, the Sifa equivalent of the theme's giant pink "M" with the white "Music Fest" brush script:**
  - Behind: a huge rounded block letter **"S"** (Rubik 800, about 520px tall on desktop) filled with an orange gradient
    (`#e2551a → #f6913f`), slightly rounded via text rendering, centred.
  - Over it: **"Sifa Gospel"** on line 1 and **"Fest"** offset right on line 2 in white `--font-script` (Mr Dafoe), about 170px, crossing the block letter like the theme's script.
  - Under it, centred: `[Next stop: Dodoma · Sat 24 Oct 2026 · Free Entry]` in Anonymous Pro 36px/72px white (mobile 20/30).
  - Then a centred 16px paragraph (max 560px): festival summary.
  - Then two inline xl pills, 10px apart: **"JOIN FREE"** `.btn--glow` (solid blue + glow, theme purple "GET TICKET") and **"WATCH LIVE"** `.btn--outline-orange` (theme "INTRO VIDEO"), the latter emitting `play('XhYi949kti0')`.
- Entrance animation: lockup scales in from 0.9 + fades (like theme sX:0.9 → 1), text lines fade up staggered (600/1200/1800ms).
- Keep it readable at 390px (the script shrinks to ~70px, the "S" to ~240px).

### 3. AboutSection.vue (see `home5-01.jpg` lower half)
- Two columns: **left = image-layer collage** (theme `genesisexpo_module_img_layer`): 3 rounded (radius 10) photos overlapping at offsets,
  sliding in from down / right / left with 0 / 600 / 1200ms delays when scrolled into view. Use `agape-band.jpg`, `geita-stage.jpg`, `hero-stage.jpg`.
  **Right** (col 6) = DoubleHeading bg "ABOUT", `[About Festival]`, "A Great Service of Praise, Touring Tanzania", paragraph, `.btn--outline` "READ MORE" (links `#programme`).

### 4. CountdownBar.vue (see `home5-02.jpg` top)
- A boxed panel (container width, radius 10) on `texture-dark.jpg` (cover) with a `--surface` tint. Padding ~60px 0.
- Left column: **two-tone heading** "Count **Every Second** Until **Dodoma**", 36/48 Rubik 500: white words, with the `<span>`s in `--secondary-light` (the theme uses purple words).
  Under it `[Saturday, 24 October 2026]` mono.
- Right: live countdown (Days/Hours/Minutes/Seconds) **white** 80px Rubik 500 digits, `[Days]` mono labels, the colon as two small `#99999c` dots between units (theme Home 5 inline style).
- Target from `nextStop.date`.

### 5. DreamSection.vue (see `home5-02.jpg`: "Image Your Dream")
- Boxed (container) panel, radius 10, ~620px tall, background `geita-interview.jpg` or `hero-stage.jpg` with a strong **orange→blue duotone** overlay
  (theme uses a pink/blue duotone photo). Centered: **"Raise Your Praise"** 72px/72px Rubik 700 white, an 18/30 line
  "Sifa Gospel Fest Dodoma takes place at Viwanja vya Jamhuri…", then `.play-btn` → `play('Kc5dU11dUQc')`.
- `id="venue"`. It overlaps the countdown panel slightly (the theme uses −140px margin-top), so the countdown appears to sit on top of it. Optional but nice.

### 6. ProgrammeSection.vue (see `home5-02.jpg` bottom, `home5-03.jpg`)
- `id="programme"`. Boxed `--surface`-ish panel with a very dark, low-opacity photo behind (the theme uses a raised-hand photo: use `geita-crowd.jpg` at ~12% opacity, grayscale+blue).
- DoubleHeading bg "SCHEDULE", `[This Year's Event]`, "Dodoma Programme", lead paragraph.
- Timetabs: tabs from `programme` data (Youth Talk / Festival Day). Tab title 28px `#dadada`, subtitle .571em; active = white title, subtitle `--secondary-light`,
  and an orange 3px underline grows from the centre over a `rgba(255,255,255,.1)` baseline.
- Rows: time (18px Rubik 500 white, ~12.5% width) · 134px image radius 10 · title 20px white + description `--body` · `.btn--outline .btn--m` "READ MORE".
  Row hover → background `--surface-2` (theme `#131120`), radius 10. Padding 35px.

### 7. PartnersStrip.vue (see `home5-04.jpg` top)
- `id="partners"`. On `--bg`. A **row of grey logo wordmarks** (6 across, evenly spaced, `#9aa0b4` at 0.7 opacity, hover → white and scale 1),
  using `partners` data. Render each as a styled wordmark (vary weights/letter-spacing so they read as distinct logos, like the theme's client logos).
  A gentle auto-scroll marquee is OK on narrow screens; on desktop show a static row like the theme.

### 8. PhotoStrip.vue (see `home5-04.jpg`)
- Full-width (container-width in the reference) strip of **5 square photos edge to edge**, no gaps, from `photoStrip`.
  Hover: image scales 1.08 inside its box and an orange overlay shows with a mono caption. Links to Instagram. `id="gallery"`.

### 9. PassesSection.vue (see `home5-04.jpg`: "TICKETS / How Much?" with 4 cards)
- `id="passes"`. Left-aligned DoubleHeading bg "TICKETS" (ghost word), `[Hakuna Kiingilio]`, "How Much? Nothing at All." plus a short line saying the festival is free.
- Four cards from `passes`, theme pricing card in dark form: header `--surface` with a **punch notch** (50×25 semicircle cut at top centre, colour `--bg`),
  big price text (Rubik 700 48px **`--secondary-light`**, theme purple), `[desc]` mono in orange, and a pill badge straddling the header/body edge
  (dark `--bg` pill, white text, green ✓ `#0add9a`). Body `--bg`-ish darker with the 5 items (line-height 50px); items at index ≥ (5 − `off`) are muted `#55607a`.
  Footer: `.btn--outline-orange .btn--l` CTA (theme "GET TICKET" pink outline) half overlapping the bottom.
- **Featured card** (`featured: true`): header filled `--secondary` blue with white price (theme filled-purple card).
- Card hover: lift −20px.

### 10. TourSection.vue
- `id="tour"`. Sifa-specific (not in the theme), styled like the theme's dark blog cards: DoubleHeading bg "TOUR", `[2026 Route]`, "Six Regions, One Voice".
- 6 cards in a 3-column grid (`tour` data): poster image (16:9) or, for TBC stops, a dark gradient placeholder with the big city name;
  orange category-chip-style status badge ("DONE" in blue, "NEXT STOP" orange + pulse, "GRAND FINALE" white-on-dark). Body on `--surface`:
  big ghost number 01–06, city (Rubik 24), `[Sat 5 Sep]` mono orange, venue. The next stop gets an orange outline.

### 11. ArtistsSection.vue (see `home5-05.jpg`: "GUESTS / Special Guests")
- `id="artists"`. Boxed `--surface` panel (radius 10). DoubleHeading bg "ARTISTS", `[Our Ministers]`, "Who's Ministering?", lead.
- 4-column team cards (`artists` data): **circular photo, grayscale by default → full colour on hover** (theme `anim_grayscale`),
  social pill overlapping the photo bottom by −30px on `--bg` (theme dark pill), with icons `#909aa3` → orange on hover (+ a play icon when `video` exists, emitting `play`).
  Name Rubik 24 white weight 400, role `[mono]` in `--secondary-light`. Card bg transparent; hover shadow.
- Under it: an "Also on the 2026 tour" line from `alsoFeatured`.

### 12. CountersBand.vue (see `home5-05.jpg` middle)
- Container-width band, radius 0, ~260px tall, background `agape-band.jpg` with dark plus orange/blue duotone overlay (theme section_09 neon photo).
- 4 counters (`counters` data): 60px Rubik 500 white numbers counting up on view; titles uppercase Anonymous Pro 20px white.

### 13. VoicesSection.vue
- Testimonials (theme speech-bubble cards) in dark form: bubble `--surface`, quote `--body`, orange quote mark, tail at bottom-left,
  avatar 80px circle, name white 22px, role `--secondary-light`. Scroll-snap carousel with dots (orange). DoubleHeading bg "VOICES".

### 14. MediaSection.vue (see `home5-05/06.jpg`: "NEWS / What's New?")
- `id="media"`. 3-column intro (DoubleHeading left, paragraph centre, `.btn--outline` "VIEW ALL" right).
- **3 news cards** (theme dark blog cards): image 16:10 with radius 10 10 0 0, orange category chip bottom-left, then a body panel on `--surface`
  (radius 0 0 10 10, padding 30px): `[ date ]` mono `--meta`, title Rubik 26/36 white (hover orange). Data: `news`.
- Above or below: a row of 3 video thumbnails (`videos`) with play buttons that emit `play`.

### 15. ContactSection.vue
- `id="contact"`. Dark two-column: left DoubleHeading bg "CONTACT", details list (mono orange labels), round social buttons; right a `--surface` card form
  (inputs `--bg` with 1px `--line` border, pill radius, focus orange border). Submitting shows a thank-you state (no backend).

### 16. SiteFooter.vue (see `home5-06.jpg`)
- Background `#03050f` (darker than `--bg`), **no wave**. 4 columns: `logo-light.png` (65px tall) + 14px blurb + round social icons (30px, `rgba(255,255,255,.08)` bg);
  "Quick Links"; "Next Event" (mono orange labels); "WhatsApp Updates" (underline-only input, orange pill "JOIN").
  Column titles Rubik 20 white; links `--body` → orange on hover.
- Bottom: border-top `--line`, "Copyright © 2026 Sifa Gospel Fest. All Rights Reserved" left, Privacy/Terms right, 14px `--muted`.

### 17. ScrollUp.vue / VideoModal.vue
- Already exist; restyle only if needed (scroll-up = orange tab rounded on the left only).

---

## Ownership (parallel agents: only touch your files)
- **Agent A (Header and Hero):** SiteHeader.vue, HeroSection.vue, AboutSection.vue, CountdownBar.vue, DreamSection.vue
- **Agent B (Programme and Passes):** ProgrammeSection.vue, PartnersStrip.vue, PhotoStrip.vue, PassesSection.vue, TourSection.vue
- **Agent C (People and Footer):** ArtistsSection.vue, CountersBand.vue, VoicesSection.vue, MediaSection.vue, ContactSection.vue, SiteFooter.vue, ScrollUp.vue
- Lead (main session) owns `style.css`, `App.vue`, `main.js`, `DoubleHeading.vue`, `SocialIcon.vue`, `VideoModal.vue`, `src/data/festival.js`, `index.html`.

## Verification
- `npx vite build` must pass.
- Screenshot with `python docs/design/ref/shot.py http://localhost:4173/ <outprefix> 1440 900` (and 390 844) after `npx vite build && npx vite preview --port 4173`
  (a preview server may already be running on 4173; just rebuild, since preview serves `dist/`). The script writes `<prefix>-full.jpg` and `<prefix>-NN.jpg` chunks.
- Compare your sections against the matching `docs/design/ref/home5-*.jpg`.
