# GenesisExpo design patterns (reference for Sifa Gospel Fest)

Source: the "GenesisExpo | Business Events & Conference" WordPress theme by WebGeniusLab
(ThemeForest item 22734275). The live demo (`genesisexpo.wgl-demo.net`) was suspended in
March 2026, so these notes come from the Wayback Machine archive: raw HTML for Homes 1–5,
About, Speakers, Speakers-horizontal, Schedule 1/3, Gallery, Team single and Typography, plus the
theme's `main.min.css`, inline theme CSS and section images. These are measured values, not guesses.

Use this as the visual language for the site. Recreate the patterns in our own Vue code;
do not copy their assets (photos, logos) into the project.

---

## 1. Design tokens

### Colors
| Token | Value | Used for |
|---|---|---|
| `--primary` (pink) | `#fd226a` | links, `::selection`, subtitles `[ ]`, countdown digits, pricing header, category chips, scroll-up tab, active tab underline, client-logo band bg, breadcrumbs |
| `--secondary` (purple) | `#7c529c` | **default button fill**, counter titles, speaker role text, list bullets, meta dividers, flipbox back, videobox pulse rings |
| `--heading` | `#232323` | headings, labels, dark text |
| `--body` | `#616161` | body copy |
| `--white` | `#ffffff` | page bg (light homes) |
| `--grey-bg` | `#f3f3f3` | section bg, the giant faded background word, team social pill, progress track, ticket "punch" hole |
| `--header-dark` | `rgba(34,35,40,1)` / `#222328` | mobile header / mobile menu bg |
| `--footer-bg` | `#14081f` (light homes), `#040110` (dark home) | footer, with faint geometric "memphis" line pattern |
| `--dark-page` | `#070415` | body bg on the dark Music Fest home (Home 5) |
| `--dark-surface` | `#13111f` | dark section bg and the giant faded word on dark pages |
| muted list item | `#bcbcbc` | "not included" lines in pricing |
| check icon | `#0add9a` | tick next to pricing title |
| meta grey | `#88909d` | blog date meta |
| tab idle | `#919191` title / `#afafaf` subtitle | schedule tabs |

Brand shadows (tinted glows, a key part of the look):
- Pink glow: `0 11px 29px rgba(253,34,106,.45)` (buttons, load more); stronger version `0 11px 38px rgba(253,34,106,.45)`
- Purple glow: `0 11px 29px rgba(124,82,156,.45)` (purple buttons)
- Neutral card shadow (used everywhere): `0 15px 38px 0 rgba(0,0,0,.10)`
- Flipbox shadow: `0 26px 38px 0 rgba(0,0,0,.20)`
- Videobox play button: `0 5px 20px 7px rgba(253,34,106,.25)`

### Typography (Google Fonts)
- **Rubik** 400/500: all headings, nav, buttons, numbers (countdown, counters, prices)
- **Open Sans** 400: body, 16px / 30px line-height
- **Anonymous Pro** 400 (monospace): the accent font. Used for every `[bracketed]` label: section subtitles, speaker roles, pricing descriptions, counter titles, countdown labels, blog dates, the hero date line
- Heading scale (Rubik 500): h1 48/52, h2 40/52, h3 36/48, h4 30/42, h5 24/36, h6 20/36
- Page-title banner h1: **120px / 110px, weight 800, uppercase, white**

### Layout and shape
- Container 1170px. Breakpoints: ≤1200 → 950, ≤992 → 750, ≤767 → 560, ≤600 → 90%
- Grid follows Bootstrap-style 12 columns (WPBakery `vc_col-*`), gutter 30px (15px each side)
- **Radius:** 10px on cards, images, timetable rows and pricing; **pill 50px** on buttons, chips, search field and the social pill; avatars are circles
- Section vertical rhythm: big spacer modules (roughly 90–130px) between sections; `#main` padding 40px
- Common transitions: `all .3s–.5s`; hover lifts use `translateY(-20px)`

---

## 2. Signature motifs (what makes it look like GenesisExpo)

1. **The bracket convention.** Small labels are wrapped in square brackets and set in monospace:
   `[About Conference]`, `[Founder of Forum]`, `[November 10-12, Seattle, Digital Conference]`,
   breadcrumbs `[Home — About]`, blog dates `[ October 8, 2018 ]`. **This is the theme's #1 trait.**
2. **Double heading** (in every section, see §3.1): a giant faded uppercase word behind the
   section, then a pink `[subtitle]`, then the real title.
3. **Organic blob backgrounds.** Light grey (`#f3f3f3`) section backgrounds with soft, shadowed
   wavy shapes in the corners, sometimes filled purple (top-left) and pink (right edge).
4. **Wave dividers.** An SVG wave at the bottom of the hero (`wave_header.svg`, 20% of hero height,
   white over grey) and a wave at the top of the footer (158px tall). Section images also have
   curved top and bottom edges.
5. **Pink and purple duo.** Pink is the main accent and the CTA outline color; purple is the
   default solid button. Hero CTAs come as a pair: a solid purple pill and a pink-outline pill.
6. **Concert photography** with dark purple/magenta grading, used for heroes and parallax counter bands.
7. **Floating white panels** over full-bleed backgrounds: radius 10, big soft shadow, often with
   negative side margins (-90px) so they break out of the container. Example: the countdown bar.
8. **Hover lift** on almost every card (pricing, testimonials, infobox: −20px; team: shadow appears).
9. **Ticket metaphor.** Pricing cards have a semicircle "punch" notch cut into the top edge,
   the same color as the section bg.

---

## 3. Components (with measured specs)

### 3.1 Double heading (section header)
```
heading_bgtitle   giant word, e.g. "ABOUT": 120px, weight 800, line-height .25, uppercase,
                  color #f3f3f3 (light) / #13111f (dark) / #fff on grey bg; padding-top 35px;
                  shifted translateX(-90px) when left-aligned (+90 when right), reset ≤1370px.
                  Responsive: 100 desktop → 80 tablet → 50–75 mobile
heading_subtitle  "[About Conference]": Anonymous Pro 22px/16px, color #fd226a, z-index above
heading_title     40px, line-height 1.3, weight 400–500, #232323, margin-top 10px (36px on mobile)
```
Alignments: `aleft` (2-col intros) or `acenter` (section intros, followed by a centered paragraph
in a narrow column: lg-6 offset-3).

A frequent layout: **3-column section intro.** Double heading (md-3), paragraph (lg-6), "VIEW ALL"
button right-aligned (md-2). Used for Gallery and Blog.

### 3.2 Buttons (`wgl_button`)
- Uppercase Rubik 500, 13px, letter-spacing .07em, line-height 20px, 1px border, **radius 50px**, transition .4s
- Sizes: xl `14px 30px`, min-width 155 · l `12px 30px`, min 145 · m `9px 30px` 12px, min 130 · s `7px 30px`
- Default: purple fill and border `#7c529c`, white text. **Hover: background white, text in the accent color** (inverts)
- Outline variant (hero): transparent with a pink `#fd226a` border and white text
- Full-width variant for pricing footers; the pricing button sits half outside the card (`translateY(-50%)`)

### 3.3 Header
- Overlaps the hero (`position:absolute`, transparent), height 110px, white text
- Left: logo · center: nav (Rubik 400 16px, items padded `0 20px`) · right: cart, search icon (CSS-drawn
  magnifier), **"Get Ticket" pill button**
- Nav hover: a 6px pill-shaped highlight bar grows under the label text (`span:after`, width 0→full)
- Dropdowns: white, min-width 280, padding 23px 0, radius 10, card shadow; items `7px 30px`; on hover a
  small 10×4px pill dash slides in before the item
- **Sticky header:** separate white bar, 100px, slides down (`translateY(-100%)` → 0) with a shadow, logo swaps to a dark version
- Dark home: header row `rgba(20,7,35,.4)` translucent over the hero
- Mobile: dark `#222328` bar, hamburger, full-height dark menu
- Search: full-screen overlay with its own giant faded word, big 40px heading and a pill input (58px tall)

### 3.4 Hero (Revolution Slider)
- Full-width photo bg (dark stage/concert shot), pulled up -40px under the header, **wave SVG at the bottom**
- Home 1 stack: "3 Days" / "10 Workshops" / "21 Speakers": **100px/100px Rubik 500, white**, staggered
  fade-up animation (`y:50px → 0`, delays 600 / 1200 / 1800ms, 1100ms each, Power3.easeInOut)
- Then `[November 10-12, Seattle, Digital Conference]` 28px white, letter-spacing .5px (2400ms)
- Then 2 pill buttons (2660ms): solid purple "GET TICKET" and pink-outline "PRESENTATION"; 13px uppercase
- Responsive font sizes: 100 → 60 → 40 → 30
- Dark home (Home 5): logo-type image over a crowd photo, centered `[November 10-12, Seattle, Live Show]`
  in Anonymous Pro 36px/72px, paragraph, then inline "Get Ticket" and "Intro Video" buttons, then a layered
  image collage (3 PNGs sliding in from down/right/left)

### 3.5 About block
2 columns. Left (md-5): double heading, paragraph, xl "Read More". Right (md-6 offset-1): **video box**,
a 570×530 image with a centered play button. Play button: 80px circle, pink fill, white border,
CSS triangle, 3 rings pulsing outwards (`pulse-circle` 3.9s, staggered 1.3s, scale 1→3.2,
border .5px purple), always animating (`always-pulse-animation`).

### 3.6 Countdown bar
Floating white panel (radius 10, shadow, negative side margins). Left (md-3): "Count Every Second
Until the Event" 36/48. Right (md-9): countdown, **80px Rubik 500 pink digits**, labels
`[Days] [Hours] [Minutes] [Seconds]` in Anonymous Pro at .275em, colon made of 2 small dots
between units, format dHMS. Dark variant uses digit color `#e3e3e3` on a dark bg.

### 3.7 Schedule: Timetabs (main schedule pattern)
- Tab row: equal flex tabs, title 28px (`First Day`) and subtitle .571em (`November 10, 2018`); idle grey;
  3px grey baseline; **active: pink 3px underline grows from the center** (.75s), title turns dark,
  subtitle turns purple
- Rows: flex, padding 35px, radius 10, transparent; **hover → white bg and card shadow**
  Columns: time (18px Rubik 500, ~12.5% width, centered) · 134px square image, radius 10 ·
  title 20px 500 and description · m "Read more" button
- Section bg: light grey with blobs
- Alternatives: vertical timeline (Home 2; icons, alternating, pulsing dots) and horizontal timeline (Schedule 3)

### 3.8 Sponsors / clients band
Full-bleed **solid pink `#fd226a` strip** with 6 white logos in a carousel; logos `scale(.95)` → 1 on
hover (other modes: opacity .5 → 1, grayscale → color).

### 3.9 Speakers (team cards)
- 4 columns, gutter 30. Card: white, padding 30, radius 10, **shadow appears on hover**
- **Circular photo** (420×420 source) on top
- A **grey `#f3f3f3` pill holding the social icons** (twitter, facebook, linkedin, instagram;
  color `#909aa3`) overlaps the photo bottom by -30px; icons lift 2px on hover
- Name: h4 24px weight 400; role `[Founder of Forum]` in Anonymous Pro, purple
- Centered "VIEW ALL" xl button below
- Variants: `horiz_type` 2-col (big photo left and bio right), `anim_grayscale` (B&W → color on hover),
  `anim_moveup`, `shadow_always`
- Speaker single page: big photo, info list (Speciality, Company, Experience, Email, Phone), a
  "Speeches by …" schedule list, bio, skill progress bars, contact form

### 3.10 Venue block
Full-bleed bg; inside it a **rounded (10px) photo panel with box-shadow** containing a centered
double heading ("Place / Discover Our Venue"), an 18/30 sentence and a play button (no image).

### 3.11 Pricing (ticket cards)
- 2 cards (lg-3 each) + left-aligned double heading block (lg-5 offset-1); or a row of 4 cards
- Header: **pink bg**, padding 57px 15px, radius 10 10 0 0, **punch notch** 50×25 semicircle at the
  top center (color = section bg). Price `$ 299.99` at 40px weight 700 white; `[Main Conference]`
  Anonymous Pro .45em white
- Title pill straddling the header and body edge: white, 1px pink border, radius 50, `13px 21px`,
  uppercase 13px, green check icon, e.g. "2 DAYS"
- Body: white, padding `43px 35px 30px`, shadow, items line-height 50px, excluded items `#bcbcbc`
- Footer: full-width pill "Get Ticket" button half overlapping the bottom edge
- **Whole card lifts -20px on hover**
- Section bg has a ticket photo in the corner and a wave

### 3.12 Gallery
3-column intro (see 3.1), then a masonry grid of portfolio images (740×740 and 740×350 mixed).
Portfolio filters use isotope with count badges.

### 3.13 Testimonials (tweet-style)
- Carousel; each item: date line, then a **white speech-bubble card** (radius 10, padding
  `30px 40px 40px`, shadow, with a rotated 40px square "tail" at bottom-left), quote 16px / 1.9
- Below: 80px circle avatar, name h3 22px weight 400, `[UX Designer]` 14px
- Item lifts -20px on hover. Dots: 10px circles at .3 opacity, active 14px solid with a glow
- Bg: grey with purple and pink blobs (section_08)

### 3.14 Counters band
Parallax concert photo (dark purple), 4 columns: number **60px Rubik 500** (white on dark),
title 20px uppercase Anonymous Pro purple/pink (e.g. "21 / skilled speakers"). Counts up on view.

### 3.15 Blog carousel
3 cards: image 740×460 radius 10, pink category chip (radius 12, 12px uppercase, letter-spacing 1.2px)
over the image, `[ October 8, 2018 ]` meta, h5 title, circle dots.

### 3.16 Other modules
- **Flipbox** (about/what we offer): 290px tall, radius 10, front = photo and white 44px title,
  back = purple `#7c529c` with logo and text; 3D flip (right/bottom/left), .8s cubic-bezier
- **Infobox tiles**: 1px `#ddd` border, radius 10, padding `35px 35px 45px 40px`; hover → border
  disappears, white bg, lift -20px, read-more bounces in
- **Progress bars**: 10px track `#f3f3f3` radius 10, label and % above (13px uppercase 500)
- **Steps list** ("Your Phone - Your Ticket"): phone mockup image and 3 numbered h4 steps
- **Image layers**: 2–3 overlapping rounded photos animating in from different directions

### 3.17 Inner page title banner
Height 345px, cover photo bg (`#313131` fallback), padding-top 90px (under the overlapping header),
margin-bottom 60px, left aligned. Breadcrumbs `[Home — About]` pink 20px (divider = 9px line),
then **h1 120px/110px, weight 800, uppercase, white**, `margin-bottom:-18px` so it sits on the bottom edge.

### 3.18 Footer
- Bg `#14081f` and a faint geometric memphis line pattern; **white wave SVG on top** (158px), content padding-top 230px
- 4 columns: logo, 14px blurb and round social icons (30px, hover → white bg and shadow) · "Workshops" links ·
  "Events" links · "Newsletter" (underline-only email input, 142×40 pill submit)
- Column titles h6 white; links white 16/30, hover pink
- Bottom row: border-top `rgba(255,255,255,.15)`, centered "Copyright © …" 14px

### 3.19 Scroll-to-top
Fixed right edge, 52×56, **pink tab rounded on the left only** (`50px 0 0 50px`), slides in from the
right when active; double-chevron icon animates on hover.

---

## 4. Homepage section order (Home 1, the default demo)
1. Overlapping header
2. Hero slider with wave bottom
3. About + video box (white)
4. Floating countdown panel
5. Schedule timetabs (grey blob bg)
6. Pink sponsor-logo strip
7. Speakers grid (white bg, lanyard photo in the corner) + View All
8. Venue photo panel with play button
9. Pricing ×2 + heading (grey wave bg with ticket photo)
10. Gallery intro + masonry
11. Testimonials carousel (grey bg, purple/pink blobs)
12. Parallax counters band
13. Blog intro + carousel
14. Footer with wave

Other homes reuse the same blocks in different orders:
- **Home 2** (Marketing Summit): flipboxes, skills/progress bars, vertical timeline, steps ("Your Phone - Your Ticket")
- **Home 3** (Business Forum): registration form in the hero, infobox tiles, a big founder cut-out photo with a
  signature, horizontal 2-col speakers, 4 pricing cards
- **Home 4** (Smart Seminar): infoboxes, split image/text with counters, parallax CTA "Special Approach for Everyone"
- **Home 5** (Music Fest), **the dark variant and the closest match to a gospel fest**: body `#070415`, dark
  sections `#13111f`, giant faded words in `#13111f`, darkened concert photos (hands raised, crowd),
  image-layer collage, "Image Your Dream" 72px block with play button, "[Our Rockstars] Special Guests"
  grid with grayscale→color hover, 4 pricing cards, footer `#040110`

---

## 5. How to apply this to Sifa Gospel Fest
- Keep the structure, motifs and interactions. Swap the palette only if the client asks (pink/purple
  works well for a gospel concert); define every value as a CSS variable from §1 so it can be re-themed.
- Recommended base: a **Home 1 structure**, optionally with **Home 5 dark styling** for a night-concert feel.
- Map sections: Speakers → Artists/Ministers, Workshops → Choirs/Worship sessions, Timetable → Program per day,
  Pricing → Ticket tiers (Regular / VIP / VVIP), Sponsors strip → Partners/Churches.
- Use real event content from the user; never invent dates, venues, artists or prices.
