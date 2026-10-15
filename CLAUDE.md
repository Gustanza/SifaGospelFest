# Sifa Gospel Fest website

Vue 3 + Vite project (`npm run dev`). The site for the Sifa Gospel Fest event.

## Design reference: read before any UI work
The site's visual language is based on the GenesisExpo event theme. All measured tokens, motifs,
component specs and section layouts are in [docs/design/genesisexpo-patterns.md](docs/design/genesisexpo-patterns.md).
Read it at the start of any design/UI task and follow it: colors (#fd226a pink, #7c529c purple),
Rubik / Open Sans / Anonymous Pro, the `[bracketed]` monospace labels, double headings with a giant
faded word, pill buttons, radius 10 cards with soft shadows, wave dividers, blob backgrounds and hover lifts.

The homepage follows the theme's dark **Home 5 / Music Fest** demo: see the build spec
[docs/design/home5-rebuild-spec.md](docs/design/home5-rebuild-spec.md) and reference screenshots in `docs/design/ref/`.
Screenshot the build with `python docs/design/ref/shot.py http://localhost:4173/ <outprefix> 1440 900` (set `CDP_PORT` per parallel run).

## Event content: read before writing any copy or data
Researched facts about the festival (2026 tour, artists, partners, youth talks, socials, videos) are in
[SifaResources/research/SIFA-RESEARCH.md](SifaResources/research/SIFA-RESEARCH.md), with structured data in
`SifaResources/research/sifa-data.json` and images in `SifaResources/research/images/`. The client's site
structure brief is `SifaResources/ShortDesc.txt`; the master logo is `SifaResources/SIFA GOSPEL FEST LOGO.png`
(brand blue ≈ #3854A4, orange ≈ #F06C20). Facts marked unknown or inferred in the dossier still need client confirmation.

Recreate the patterns in our own code. Don't copy the theme's images or logos.
Use real event details from the user; don't invent dates, venues, artists or prices.
