<script setup>
// Theme Home 5 "Image Your Dream": boxed duotone photo panel with a big title, venue line and the
// pulsing play button. Pulled up over the countdown panel like the theme (margin-top: -140px).
import { nextStop } from '../data/festival.js'

defineEmits(['play'])
</script>

<template>
  <section id="venue" class="dream" aria-labelledby="dream-title">
    <svg class="dream__defs" width="0" height="0" aria-hidden="true" focusable="false">
      <!-- Soft gradient map (theme-style pink/blue softness in Sifa colours): navy shadows,
           brand-blue mids, a muted warm mid and light peach highlights -->
      <filter id="dream-duo" color-interpolation-filters="sRGB">
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.06 0.17 0.42 0.80 0.94" />
          <feFuncG type="table" tableValues="0.08 0.24 0.32 0.44 0.62" />
          <feFuncB type="table" tableValues="0.26 0.60 0.58 0.44 0.48" />
        </feComponentTransfer>
      </filter>
    </svg>

    <div class="container dream__box">
      <div class="dream__panel reveal">
        <img class="dream__photo" src="/images/stage-prayer.jpg" alt="" loading="lazy" width="984" height="938" />
        <div class="dream__content">
          <h2 id="dream-title" class="dream__title">Raise Your Praise</h2>
          <p class="dream__text">
            Sifa Gospel Fest {{ nextStop.region }} takes place at {{ nextStop.venue.split(',')[0] }} on
            {{ nextStop.dateLabel.replace(/ 2026$/, '') }}, {{ nextStop.hours.replace(' – ', ' to ') }}. Free entry for everyone.
          </p>
          <button type="button" class="play-btn dream__play" aria-label="Play the Sifa Gospel Fest video" @click="$emit('play', 'Kc5dU11dUQc')">
            <i></i><i></i><i></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dream { position: relative; z-index: 1; margin-top: -140px; }
.dream__defs { position: absolute; }
.dream__box { width: var(--page); }
.dream__panel {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 620px;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--secondary);
  isolation: isolate;
}
.dream__photo {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* crop below the stage banner: keep the praying minister, singers and crowd */
  object-position: 50% 72%;
  transform: scale(1.04);
  filter: url(#dream-duo) contrast(1.02);
  transition: transform 1.2s ease;
}
.dream__panel:hover .dream__photo { transform: scale(1.08); }
.dream__panel::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(60% 55% at 50% 52%, rgba(var(--bg-rgb), 0.45), rgba(var(--bg-rgb), 0.1) 75%);
}
.dream__content { max-width: 860px; padding: 60px 30px; text-align: center; }
.dream__title {
  margin: 0 0 16px;
  font-size: 72px;
  line-height: 72px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
}
.dream__text { margin: 0 auto 44px; max-width: 760px; color: #fff; font-size: 18px; line-height: 30px; opacity: 0.92; }
.dream__play:focus-visible { outline: 3px solid #fff; outline-offset: 6px; }

@media (max-width: 992px) {
  .dream { margin-top: -120px; }
  .dream__panel { min-height: 520px; }
  .dream__title { font-size: 56px; line-height: 60px; }
}
@media (max-width: 600px) {
  .dream { margin-top: -90px; }
  .dream__panel { min-height: 460px; }
  /* the narrow panel shows the photo's full height: scale from the bottom to hide the stage banner */
  .dream__photo, .dream__panel:hover .dream__photo { object-position: 35% 100%; transform: scale(1.42); transform-origin: 40% 100%; }
  .dream__content { padding: 50px 18px; }
  .dream__panel::after { background: rgba(var(--bg-rgb), 0.42); }
  .dream__title { font-size: 40px; line-height: 46px; }
  .dream__text { font-size: 16px; line-height: 27px; margin-bottom: 36px; }
}
</style>
