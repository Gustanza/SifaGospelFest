<script setup>
// Home 5 client-logo row: single-tone logos on the page background, soft grey -> white on hover.
// Logos are sized for equal optical weight, not equal height: height falls with aspect ratio
// (wide wordmarks come out shorter, square emblems taller) but more gently than equal-area (^0.42, not ^0.5),
// since equal area makes long wordmarks look small; then a ±10% nudge for airy vs dense ink.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { partners } from '../data/festival.js'

// The duplicate list only exists for the <=1200px marquee loop; desktop renders one static row.
const marquee = ref(false)
let mq
const sync = () => { marquee.value = mq.matches }
onMounted(() => { mq = window.matchMedia('(max-width: 1200px)'); sync(); mq.addEventListener('change', sync) })
onBeforeUnmount(() => mq && mq.removeEventListener('change', sync))

const SCALE = 81        // height (px) of a square logo with typical ink at desktop size
const INK = 0.36        // typical ink coverage; lighter logos scale up, denser ones down (gently)
const H_MIN = 36
const H_MAX = 80
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const logos = partners.map((p) => {
  const density = clamp((INK / p.ink) ** 0.35, 0.9, 1.1)
  const h = clamp(SCALE * p.aspect ** -0.42 * density, H_MIN, H_MAX)
  return { ...p, h: Math.round(h), w: Math.round(h * p.aspect) }
})
</script>

<template>
  <section id="partners" class="partners" aria-labelledby="partners-title">
    <h2 id="partners-title" class="sr-only">Our partners</h2>
    <div class="partners__viewport">
      <div class="partners__track">
        <ul v-for="copy in (marquee ? 2 : 1)" :key="copy" class="partners__list" :class="{ 'is-clone': copy === 2 }" :aria-hidden="copy === 2 ? 'true' : null">
          <li v-for="l in logos" :key="l.name" class="logo" :title="l.name">
            <img
              :src="l.logo"
              :alt="copy === 2 ? '' : l.name"
              :width="l.w"
              :height="l.h"
              :style="{ '--w': `${l.w}px`, '--h': `${l.h}px` }"
              loading="lazy"
              decoding="async"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners { --k: 1; padding: 90px 0 90px; background: var(--bg); overflow: hidden; }
.partners__viewport { width: var(--page); margin-inline: auto; }
.partners__track { display: flex; }
.partners__list {
  flex: 1 0 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.partners__list.is-clone { display: none; }

/* one shared 84px row so every logo is centred on the same line */
.logo {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(84px * var(--k));
  opacity: 0.5;
  transform: scale(0.95);
  transition: opacity 0.4s, transform 0.4s;
}
.logo:hover { opacity: 1; transform: scale(1); }
.logo img {
  display: block;
  width: calc(var(--w) * var(--k));
  height: calc(var(--h) * var(--k));
  max-width: none;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}

/* Narrow screens: gentle marquee (two copies, the clone is hidden from assistive tech) */
@media (max-width: 1200px) {
  .partners { padding: 70px 0; }
  .partners__viewport {
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  }
  .partners__track { width: max-content; animation: partnersMarquee 36s linear infinite; }
  .partners__track:hover { animation-play-state: paused; }
  .partners__list { flex: 0 0 auto; justify-content: flex-start; gap: 72px; padding-right: 72px; }
  .partners__list.is-clone { display: flex; }
}
@media (max-width: 600px) {
  .partners { --k: 0.78; padding: 50px 0; }
  .partners__list { gap: 52px; padding-right: 52px; }
}
@keyframes partnersMarquee { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
  .partners__track { animation: none !important; }
  .partners__viewport { overflow-x: auto; }
}
</style>
