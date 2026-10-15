<script setup>
// Sifa-specific tour route, styled like the theme's dark blog cards (Home 5 "What's New?"):
// image with radius 10 10 0 0 and a category chip bottom-left, body panel on --surface.
import DoubleHeading from './DoubleHeading.vue'
import { tour } from '../data/festival.js'

const statusLabel = { done: 'Done', next: 'Next Stop', finale: 'Grand Finale' }
const doneCount = tour.filter((s) => s.status === 'done').length
const pad = (n) => String(n).padStart(2, '0')
// 'Sat 24 Oct' -> '24 Oct': the placeholder shows the date so it doesn't repeat the city name below it
const bigDate = (d) => d.split(' ').slice(1).join(' ')
// Mbeya / Mwanza posters carry a baked-in red frame and a broadcaster bug top-left; crop them out
const framed = new Set(['Mbeya', 'Mwanza'])
const stops = tour.map((s) => ({ ...s, crop: framed.has(s.region) ? 'framed' : null }))
</script>

<template>
  <section id="tour" class="section tour">
    <div class="container">
      <div class="tour__intro">
        <DoubleHeading bg="Tour" subtitle="2026 Route" title="Six Regions, One Voice" align="left" />
        <p class="tour__text">
          Each edition moves across the country, with street teams, radio and a Youth Talk before every stop.
          {{ doneCount }} regions down, {{ tour.length - doneCount }} to go.
        </p>
        <a href="#programme" class="btn btn--outline btn--l tour__btn">Programme</a>
      </div>

      <ol class="route">
        <li
          v-for="(stop, i) in stops"
          :key="stop.region"
          class="stop reveal"
          :class="`stop--${stop.status}`"
          :style="{ '--d': `${(i % 3) * 0.1}s` }"
          :aria-current="stop.status === 'next' ? 'step' : null"
        >
          <div class="stop__media">
            <img v-if="stop.image" :class="stop.crop ? `crop-${stop.crop}` : null" :src="stop.image" :alt="`Sifa Gospel Fest ${stop.region} poster`" width="370" height="208" loading="lazy" />
            <div v-else class="stop__placeholder" aria-hidden="true">
              <span class="stop__ph-city">{{ bigDate(stop.date) }}</span>
              <span class="stop__ph-sub mono">[{{ stop.status === 'finale' ? 'Grand finale' : 'Up next' }}]</span>
            </div>
            <span class="stop__chip">{{ statusLabel[stop.status] }}</span>
          </div>
          <div class="stop__body">
            <span class="stop__num" aria-hidden="true">{{ pad(i + 1) }}</span>
            <p class="stop__meta mono">[ {{ stop.date }}{{ stop.draft ? ' · TBC' : '' }} ]</p>
            <h3 class="stop__city">{{ stop.region }}</h3>
            <p class="stop__venue">{{ stop.venue }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.tour { background: var(--bg); padding-top: 90px; }
.tour__intro {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 30px 60px;
  align-items: end;
  margin-bottom: 60px;
}
.tour__intro :deep(.dbl) { margin-bottom: 0; }
.tour__text { margin: 0; max-width: 480px; }
.tour__btn { justify-self: end; margin-bottom: 4px; }

.route { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.stop {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius);
  transition: transform 0.5s var(--d, 0s), box-shadow 0.5s, opacity 0.9s var(--d, 0s);
}
.stop:hover { transform: translateY(-10px); box-shadow: var(--shadow-card); }

.stop__media { position: relative; aspect-ratio: 16 / 9; overflow: hidden; border-radius: var(--radius) var(--radius) 0 0; background: var(--surface-2); }
.stop__media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1); }
.stop:hover .stop__media img { transform: scale(1.05); }
/* scale + off-centre origin keeps x 12-97%, y 6-91% of the 16:9 poster: frame and corner bug fall outside */
.stop__media img.crop-framed { transform-origin: 78% 40%; transform: scale(1.18); }
.stop:hover .stop__media img.crop-framed { transform: scale(1.24); }
.stop__placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 16px 34px;
  text-align: center;
  background:
    radial-gradient(circle at 18% 15%, rgba(var(--primary-rgb), 0.45), transparent 55%),
    radial-gradient(circle at 85% 95%, rgba(var(--secondary-rgb), 0.85), transparent 60%),
    linear-gradient(135deg, var(--surface), var(--bg));
  transition: transform 0.8s;
}
.stop:hover .stop__placeholder { transform: scale(1.05); }
.stop__ph-city { font-family: var(--font-heading); font-weight: 800; font-size: 56px; line-height: 1; text-transform: uppercase; color: #fff; letter-spacing: 0.5px; }
.stop__ph-sub { font-size: 16px; color: rgba(255, 255, 255, 0.75); }
.stop--finale .stop__placeholder {
  background:
    radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.12), transparent 50%),
    radial-gradient(circle at 15% 100%, rgba(var(--secondary-rgb), 0.7), transparent 60%),
    linear-gradient(135deg, var(--surface), var(--bg));
}

/* Category-chip-style status badge, bottom-left over the image */
.stop__chip {
  position: absolute;
  left: 30px;
  bottom: 22px;
  padding: 0 14px;
  min-height: 25px;
  line-height: 25px;
  border-radius: 12px;
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #fff;
  background: var(--secondary);
}
.stop--next .stop__chip { background: var(--primary); }
.stop--finale .stop__chip { background: var(--bg); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.55); }
@keyframes chipPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.65); }
  60% { box-shadow: 0 0 0 9px rgba(var(--primary-rgb), 0); }
}

.stop__body {
  position: relative;
  flex: 1;
  padding: 26px 30px 30px;
  overflow: hidden;
  background: var(--surface);
  border-radius: 0 0 var(--radius) var(--radius);
}
.stop__num {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-heading);
  font-size: 96px;
  font-weight: 800;
  line-height: 1;
  color: rgba(255, 255, 255, 0.045);
  pointer-events: none;
  transition: color 0.5s;
}
.stop:hover .stop__num { color: rgba(var(--primary-rgb), 0.12); }
.stop__meta { position: relative; margin: 0 0 6px; font-size: 16px; line-height: 24px; color: var(--primary); }
.stop__city { position: relative; margin: 0; font-size: 24px; line-height: 34px; font-weight: 500; color: #fff; transition: color 0.3s; }
.stop:hover .stop__city { color: var(--primary); }
.stop__venue { position: relative; margin: 2px 0 0; font-size: 15px; line-height: 26px; color: var(--body); }

/* Next stop highlight */
.stop--next, .stop--next:hover { box-shadow: 0 0 0 2px var(--primary); }
.stop--done .stop__media img { filter: saturate(0.85); }

@media (max-width: 1200px) {
  .stop__chip { left: 22px; }
  .stop__body { padding: 24px 22px 26px; }
}
@media (max-width: 992px) {
  .tour__intro { grid-template-columns: 1fr; gap: 18px; margin-bottom: 45px; }
  .tour__btn { justify-self: start; }
  .route { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .tour { padding-top: 60px; }
  .route { grid-template-columns: 1fr; gap: 26px; }
  .stop__ph-city { font-size: 38px; }
}
.stop.is-revealed { transition-delay: 0s; } /* stagger is entrance-only */
</style>
