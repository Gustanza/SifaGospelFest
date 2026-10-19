<script setup>
// Home 5 hero: full-bleed graded concert photo, the giant block letter with a brush script across it
// (theme pink "M" + "Music Fest" -> orange "S" + "Sifa Gospel Fest"), mono slogan line, then the
// "Next Stop" pass (where, when, live countdown, route, CTAs) docked at the bottom.
import { festival } from '../data/festival.js'
import NextStopTicket from './NextStopTicket.vue'

defineEmits(['play'])
</script>

<template>
  <section id="home" class="hero" aria-labelledby="hero-title">
    <!-- Tritone gradient map (navy -> blue -> orange), the Sifa twin of the theme's purple/pink grading -->
    <svg class="hero__defs" width="0" height="0" aria-hidden="true" focusable="false">
      <filter id="hero-tone" color-interpolation-filters="sRGB">
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.02 0.08 0.22 0.62 0.97" />
          <feFuncG type="table" tableValues="0.03 0.09 0.17 0.30 0.56" />
          <feFuncB type="table" tableValues="0.10 0.30 0.52 0.45 0.36" />
        </feComponentTransfer>
      </filter>
      <linearGradient id="hero-s-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#e2551a" />
        <stop offset="1" stop-color="#f6913f" />
      </linearGradient>
    </svg>

    <div class="hero__bg" aria-hidden="true">
      <img class="hero__photo" src="/images/hero-stage.jpg" alt="" width="1677" height="938" fetchpriority="high" />
      <span class="hero__beam hero__beam--1"></span>
      <span class="hero__beam hero__beam--2"></span>
    </div>

    <div class="hero__inner container">
      <div class="hero__lockup">
        <svg class="hero__letter" viewBox="28 4 584 664" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
          <text x="320" y="652" text-anchor="middle">S</text>
        </svg>
        <h1 id="hero-title" class="hero__script">
          <span class="hero__l1">Sifa Gospel</span> <span class="hero__l2">Fest</span>
        </h1>
        <p class="hero__date mono" lang="sw">[{{ festival.slogan }}]</p>
      </div>

      <NextStopTicket class="hero__pass" @play="$emit('play', $event)" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: max(100vh, 760px);
  overflow: hidden;
  color: #fff;
  background: var(--bg);
  isolation: isolate;
}
.hero__defs { position: absolute; }

/* ---------- graded photo ---------- */
.hero__bg { position: absolute; inset: 0; z-index: -1; }
.hero__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 30%;
  filter: url(#hero-tone) contrast(1.05);
  opacity: 0.9;
  transform-origin: 50% 85%;
  animation: heroZoom 14s ease-out both;
}
.hero__bg::before,
.hero__bg::after { content: ''; position: absolute; inset: 0; pointer-events: none; }
/* coloured stage glows */
.hero__bg::before {
  background:
    radial-gradient(60% 55% at 88% 12%, rgba(var(--primary-rgb), 0.38), transparent 70%),
    radial-gradient(55% 60% at 4% 40%, rgba(var(--secondary-rgb), 0.55), transparent 70%);
  mix-blend-mode: screen;
}
/* navy grade fading into the page background */
.hero__bg::after {
  background: linear-gradient(180deg,
    rgba(var(--bg-rgb), 0.92) 0%,
    rgba(var(--bg-rgb), 0.84) 15%,
    rgba(var(--bg-rgb), 0.3) 34%,
    rgba(var(--bg-rgb), 0.62) 62%,
    rgba(var(--bg-rgb), 0.92) 84%,
    var(--bg) 100%);
}
/* faint concert light beams */
.hero__beam {
  position: absolute;
  top: -10%;
  width: 34%;
  height: 90%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), transparent 75%);
  filter: blur(18px);
  mix-blend-mode: screen;
  transform-origin: 50% 0;
  clip-path: polygon(46% 0, 54% 0, 100% 100%, 0 100%);
  animation: beam 9s ease-in-out infinite alternate;
}
.hero__beam--1 { left: 6%; transform: rotate(-24deg); }
.hero__beam--2 { right: 8%; transform: rotate(26deg); animation-delay: -4s; background: linear-gradient(180deg, rgba(var(--primary-rgb), 0.28), transparent 75%); }
@keyframes beam {
  from { opacity: 0.55; rotate: -5deg; }
  to { opacity: 1; rotate: 6deg; }
}
@keyframes heroZoom { from { transform: scale(1.2); } to { transform: scale(1.1); } }

/* ---------- lockup ----------
   Theme proportions: block letter ~430x404, brush script one line ~2.8x the letter width
   crossing it at mid-height, mono date line over the letter's lower third. */
.hero__inner { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: max(100vh, 760px); padding: 140px 0 48px; text-align: center; }
.hero__lockup {
  position: relative;
  width: 100%;
  height: 400px;
}
.hero__letter {
  position: absolute;
  top: 0;
  left: 50%;
  width: auto;
  height: 100%;
  overflow: visible;
  transform: translateX(-50%);
  animation: lockIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.hero__letter text {
  font-family: var(--font-heading);
  font-size: 900px;
  font-weight: 800;
  fill: url(#hero-s-fill);
  stroke: url(#hero-s-fill);
  stroke-width: 8px;
  stroke-linejoin: round;
  paint-order: stroke;
}
.hero__script {
  position: absolute;
  left: 50%;
  top: 45%;
  margin: 0;
  font-family: var(--font-script);
  font-size: 160px;
  font-weight: 400;
  line-height: 1;
  word-spacing: 0.14em;
  white-space: nowrap;
  color: #fff;
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
  transform: translate(-50%, -58%);
  pointer-events: none;
}
.hero__script span { display: inline-block; animation: fadeUp 1.1s cubic-bezier(0.65, 0, 0.35, 1) both; }
.hero__l1 { animation-delay: 0.6s !important; }
.hero__l2 { animation-delay: 1.2s !important; }
.hero__date {
  position: absolute;
  top: 74%;
  left: 0;
  right: 0;
  margin: 0;
  font-size: 36px;
  line-height: 72px;
  white-space: nowrap;
  color: #fff;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
  animation: fadeUpY 1.1s 1.8s cubic-bezier(0.65, 0, 0.35, 1) both;
}

.hero__pass { margin-top: 44px; animation: fadeUpY 1s 1.5s cubic-bezier(0.22, 1, 0.36, 1) both; }

@keyframes lockIn { from { opacity: 0; transform: translateX(-50%) scale(0.9); } to { opacity: 1; transform: translateX(-50%) scale(1); } }
@keyframes fadeUp { from { opacity: 0; translate: 0 50px; } to { opacity: 1; translate: 0 0; } }
@keyframes fadeUpY { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }

/* ---------- responsive ---------- */
@media (max-width: 1200px) {
  .hero__script { font-size: 13vw; }
  .hero__date { font-size: 32px; }
}
@media (max-width: 992px) {
  .hero__inner { padding-top: 150px; }
  .hero__lockup { height: 360px; }
  .hero__date { font-size: 26px; line-height: 44px; }
}
/* stacked lockup on small screens */
@media (max-width: 767px) {
  .hero { min-height: 0; }
  .hero__inner { min-height: 0; padding: 118px 0 70px; }
  .hero__lockup { height: 330px; }
  .hero__script { inset: 0; top: 0; left: 0; transform: none; font-size: 96px; word-spacing: normal; white-space: normal; }
  .hero__script span { position: absolute; left: 50%; white-space: nowrap; }
  .hero__l1 { top: 74px; transform: translateX(-56%) rotate(-4deg); }
  .hero__l2 { top: 158px; transform: translateX(-4%) rotate(-4deg); }
  .hero__date { top: auto; bottom: -6px; padding: 0 6px; font-size: 20px; line-height: 30px; white-space: normal; }
  .hero__pass { margin-top: 40px; }
}
@media (max-width: 520px) {
  .hero__lockup { height: 270px; }
  .hero__script { font-size: 72px; }
  .hero__l1 { top: 58px; }
  .hero__l2 { top: 124px; }
}
</style>
