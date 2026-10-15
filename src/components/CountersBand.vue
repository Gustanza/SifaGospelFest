<script setup>
// Theme counters band (Home 5 section_09): container-width neon concert photo, 4 count-up numbers.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { counters } from '../data/festival.js'

const el = ref(null)
const shown = ref(counters.map(() => 0))
let observer

// A zero entry fee reads better as a word than as "TSh 0".
const isFree = (c) => c.value === 0 && /entry/i.test(c.label)
const display = (c, v) => (isFree(c) ? 'Free' : `${v}${c.suffix || ''}`)

const finish = () => { shown.value = counters.map((c) => c.value) }

const animate = () => {
  const start = performance.now()
  const dur = 2000
  const tick = (t) => {
    const p = Math.min(1, (t - start) / dur)
    const ease = 1 - Math.pow(1 - p, 3)
    shown.value = counters.map((c) => Math.round(c.value * ease))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window)) return finish()
  observer = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { animate(); observer.disconnect() }
  }, { threshold: 0.35 })
  observer.observe(el.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="el" class="band" aria-label="The festival in numbers">
    <div class="band__bg" aria-hidden="true"></div>
    <ul class="container band__grid" role="list">
      <li v-for="(c, i) in counters" :key="c.label" class="counter">
        <span class="sr-only">{{ display(c, c.value) }} {{ c.label }}</span>
        <span class="counter__value" aria-hidden="true">
          <template v-if="isFree(c)">Free</template>
          <template v-else>{{ shown[i] }}<span v-if="c.suffix" class="counter__suffix">{{ c.suffix }}</span></template>
        </span>
        <span class="counter__label mono" aria-hidden="true">{{ c.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.band {
  position: relative;
  width: var(--page);
  margin-inline: auto;
  min-height: 264px;
  display: flex;
  align-items: center;
  padding: 70px 0;
  overflow: hidden;
  color: #fff;
  isolation: isolate;
  background: var(--surface);
}
/* Neon duotone: grayscale photo, then an orange-to-blue colour wash and a dark vignette */
.band__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(90deg, rgba(var(--bg-rgb), 0.78) 0%, rgba(var(--bg-rgb), 0.35) 45%, rgba(var(--bg-rgb), 0.15) 100%),
    linear-gradient(115deg, rgba(var(--primary-rgb), 0.95) 0%, rgba(214, 70, 60, 0.75) 35%, rgba(var(--secondary-rgb), 0.9) 70%, rgba(127, 155, 240, 0.85) 100%),
    url('/images/agape-band.jpg') center 40% / cover no-repeat;
  background-blend-mode: normal, color, luminosity;
  filter: contrast(1.15) saturate(1.2);
}
.band__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(var(--bg-rgb), 0.25), rgba(var(--bg-rgb), 0) 40%, rgba(var(--bg-rgb), 0.3));
}
.band__grid {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  text-align: center;
}
.counter { display: flex; flex-direction: column; align-items: center; }
.counter__value {
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: 60px;
  line-height: 1.2;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
}
.counter__suffix { font-size: 0.6em; margin-left: 2px; vertical-align: 0.45em; }
.counter__label {
  margin-top: 10px;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
}

@media (max-width: 992px) {
  .counter__value { font-size: 50px; }
  .counter__label { font-size: 17px; }
}
@media (max-width: 768px) {
  .band { padding: 60px 0; }
  .band__bg::after { background: rgba(var(--bg-rgb), 0.35); }
  .band__grid { grid-template-columns: repeat(2, 1fr); row-gap: 44px; }
  .counter__value { font-size: 46px; }
  .counter__label { font-size: 15px; line-height: 20px; }
}
</style>
