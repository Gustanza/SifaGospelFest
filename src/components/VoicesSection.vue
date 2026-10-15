<script setup>
// Theme testimonials (speech-bubble carousel) in dark form: --surface bubbles with a tail,
// avatar + name underneath, scroll-snap track with orange page dots.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DoubleHeading from './DoubleHeading.vue'
import { voices } from '../data/festival.js'

const track = ref(null)
const active = ref(0)
const pages = ref(1)

// The organisers' entry uses the colour logo (made for white); swap to the light logo on dark.
const avatar = (v) => (v.image.endsWith('/logo.png') ? '/images/logo-light.png' : v.image)
const isLogo = (v) => v.image.endsWith('/logo.png')

const step = () => {
  const t = track.value
  const first = t?.children[0]
  if (!first) return 1
  const gap = parseFloat(getComputedStyle(t).columnGap) || 0
  return first.offsetWidth + gap
}
const measure = () => {
  const t = track.value
  if (!t) return
  const visible = Math.max(1, Math.round((t.clientWidth + 1) / step()))
  pages.value = Math.max(1, voices.length - visible + 1)
  onScroll()
}
const onScroll = () => {
  const t = track.value
  if (!t) return
  active.value = Math.min(pages.value - 1, Math.round(t.scrollLeft / step()))
}
const goTo = (i) => track.value?.scrollTo({ left: i * step(), behavior: 'smooth' })

let ro
onMounted(() => {
  measure()
  ro = new ResizeObserver(measure)
  ro.observe(track.value)
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <section id="voices" class="section voices">
    <div class="container">
      <DoubleHeading bg="Voices" subtitle="They Say" title="What People Are Saying" />
      <p class="lead-center voices__lead reveal">Words from the organisers and ministers who carried the 2026 tour across Tanzania.</p>

      <div ref="track" class="track reveal" tabindex="0" aria-label="Testimonials, scroll horizontally" @scroll.passive="onScroll">
        <figure v-for="(v, i) in voices" :key="i" class="item">
          <div class="item__date mono">{{ v.date }}</div>
          <blockquote class="item__bubble"><p>{{ v.quote }}</p></blockquote>
          <figcaption class="item__meta">
            <img :src="avatar(v)" :alt="''" :class="{ 'is-logo': isLogo(v) }" width="80" height="80" loading="lazy" />
            <div>
              <div class="item__name">{{ v.name }}</div>
              <div class="item__role mono bracket">{{ v.role }}</div>
            </div>
          </figcaption>
        </figure>
      </div>

      <div v-if="pages > 1" class="dots" aria-label="Choose testimonials">
        <button
          v-for="p in pages"
          :key="p"
          type="button"
          :class="{ active: active === p - 1 }"
          :aria-label="`Show testimonials from ${p}`"
          :aria-current="active === p - 1 ? 'true' : null"
          @click="goTo(p - 1)"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.voices { padding-bottom: 60px; }
.voices__lead { max-width: 560px; }
.track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% - 60px) / 3);
  column-gap: 30px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 26px 0 30px;
  margin: -26px 0 0;
  border-radius: var(--radius);
}
.track::-webkit-scrollbar { display: none; }
.track:focus-visible { outline: 2px solid rgba(var(--primary-rgb), 0.6); outline-offset: 4px; }
.item { display: flex; flex-direction: column; margin: 0; scroll-snap-align: start; transition: transform 0.4s ease; }
.item:hover { transform: translateY(-20px); }
.item__date { padding: 0 0 12px 4px; font-size: 16px; color: var(--meta); }
.item__bubble {
  flex: 1;
  position: relative;
  margin: 0;
  padding: 30px 40px 40px;
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: 0 15px 38px rgba(0, 0, 0, 0.3);
  transition: background-color 0.4s;
}
.item:hover .item__bubble { background: var(--surface-2); }
.item__bubble p { position: relative; z-index: 1; margin: 0; font-size: 16px; line-height: 1.9; color: var(--body); }
.item__bubble::before {
  content: '“';
  display: block;
  height: 34px;
  font-family: var(--font-heading);
  font-size: 72px;
  font-weight: 700;
  line-height: 0.9;
  color: var(--primary);
}
.item__bubble::after {
  content: '';
  position: absolute;
  left: 64px;
  bottom: -14px;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background: inherit;
  transform: translateX(-50%) rotate(45deg);
}
.item__meta { display: flex; align-items: center; gap: 18px; margin-top: 36px; padding-left: 24px; }
.item__meta img {
  flex: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--surface);
  border: 2px solid rgba(var(--primary-rgb), 0.5);
}
.item__meta img.is-logo { object-fit: contain; padding: 14px; }
.item__name { font-family: var(--font-heading); font-size: 22px; line-height: 1.5; color: var(--heading); }
.item__role { font-size: 14px; line-height: 20px; color: var(--secondary-light); }

.dots { display: flex; justify-content: center; align-items: center; gap: 12px; height: 20px; margin-top: 30px; }
.dots button {
  width: 10px;
  height: 10px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--primary);
  opacity: 0.3;
  cursor: pointer;
  transition: all 0.3s;
}
.dots button:hover { opacity: 0.6; }
.dots button.active { width: 14px; height: 14px; opacity: 1; box-shadow: 0 2px 10px rgba(var(--primary-rgb), 0.7); }
.dots button:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

@media (max-width: 992px) { .track { grid-auto-columns: calc((100% - 30px) / 2); } }
@media (max-width: 600px) {
  .track { grid-auto-columns: 100%; column-gap: 16px; }
  .item__bubble { padding: 26px 26px 34px; }
  .item:hover { transform: none; }
}
</style>
