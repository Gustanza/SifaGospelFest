<script setup>
// Theme "Special Guests" (Home 5): boxed dark panel, 4-column team cards with circular
// grayscale photos that turn to colour on hover, and a dark social pill overlapping the photo.
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import DoubleHeading from './DoubleHeading.vue'
import SocialIcon from './SocialIcon.vue'
import { artists, alsoFeatured, socials, nextStop } from '../data/festival.js'
defineEmits(['play'])

const sifa = (icon) => socials.find((s) => s.icon === icon)?.href
// Mark the first item of each wrapped line so it gets no leading dot.
const list = ref(null)
const markLineStarts = () => {
  const items = list.value ? [...list.value.children] : []
  // Greedy, in order: earlier items are already final, so each read reflects the real line breaks.
  let prev = null
  items.forEach((li) => {
    li.classList.remove('line-start')
    const top = li.offsetTop
    if (prev !== null && top > prev + 2) li.classList.add('line-start')
    prev = li.offsetTop
  })
}
let ro
onMounted(async () => {
  await nextTick()
  markLineStarts()
  document.fonts?.ready.then(markLineStarts)
  if ('ResizeObserver' in window) { ro = new ResizeObserver(markLineStarts); ro.observe(list.value) }
})
onBeforeUnmount(() => ro?.disconnect())
const ytSearch = (name) => `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' gospel')}`
</script>

<template>
  <section id="artists" class="artists">
    <div class="artists__panel">
      <div class="container">
        <DoubleHeading bg="Artists" subtitle="Our Ministers" title="Who’s Ministering?" bg-color="var(--ghost-on-surface)" />
        <p class="lead-center artists__lead reveal">
          Tanzania’s best-loved gospel ministers, choirs and bands, sharing the stage with the new voices
          Sifa is raising up.
        </p>

        <ul class="grid" role="list">
          <li v-for="(a, i) in artists" :key="a.name" class="card reveal" :class="{ 'is-next': a.next }" :style="{ '--d': `${(i % 4) * 0.1}s` }">
            <span v-if="a.next" class="card__next">
              <span class="card__next-dot" aria-hidden="true"></span>{{ nextStop.region }} · {{ nextStop.shortDate.replace(/^\w+ | \d{4}$/g, '') }}
            </span>
            <div class="card__img">
              <img :src="a.image" :alt="`Portrait of ${a.name}`" width="420" height="420" loading="lazy" />
            </div>
            <div class="card__info">
              <div class="card__icons">
                <a :href="sifa('instagram')" target="_blank" rel="noopener" aria-label="Sifa Gospel Fest on Instagram"><SocialIcon name="instagram" /></a>
                <a :href="sifa('facebook')" target="_blank" rel="noopener" aria-label="Sifa Gospel Fest on Facebook"><SocialIcon name="facebook" /></a>
                <a :href="ytSearch(a.name)" target="_blank" rel="noopener" :aria-label="`Find ${a.name} on YouTube`"><SocialIcon name="youtube" /></a>
                <button v-if="a.video" type="button" class="card__playbtn" :aria-label="`Watch ${a.name} live at Sifa Gospel Fest`" @click="$emit('play', a.video)">
                  <span class="card__play" aria-hidden="true"></span>
                </button>
              </div>
              <h3 class="card__name">{{ a.name }}</h3>
              <p class="card__role mono bracket">{{ a.role }}</p>
            </div>
          </li>
        </ul>

        <div class="also reveal">
          <p class="also__label mono bracket">Also on the 2026 tour</p>
          <ul ref="list" class="also__list" role="list">
            <li v-for="n in alsoFeatured" :key="n">{{ n }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.artists { position: relative; }
.artists__panel {
  width: var(--page);
  margin-inline: auto;
  padding: 60px 0 120px;
  background: var(--surface);
  border-radius: var(--radius) var(--radius) 0 0;
  overflow: hidden;
}
.artists__lead { max-width: 560px; margin-bottom: 60px; }

.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 30px;
}
.card {
  position: relative;
  padding: 30px 30px 26px;
  border-radius: var(--radius);
  text-align: center;
  transition: box-shadow 0.5s, background-color 0.5s, opacity 0.9s, transform 0.9s;
}
.card:hover, .card:focus-within { background: rgba(255, 255, 255, 0.025); box-shadow: 0 15px 38px rgba(0, 0, 0, 0.45); }

/* announced for the next stop: theme category chip straddling the photo top, orange ring on the photo */
.card__next {
  position: absolute;
  top: 16px;
  left: 50%;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 13px;
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 16px;
  text-transform: uppercase;
  white-space: nowrap;
  color: #fff;
  background: var(--primary);
  border-radius: var(--pill);
  transform: translateX(-50%);
}
.card__next-dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; animation: nextBlink 1.6s ease-in-out infinite; }
@keyframes nextBlink { 50% { opacity: 0.25; } }
.card.is-next .card__img { box-shadow: 0 0 0 3px var(--surface), 0 0 0 5px var(--primary); }
.card__img { border-radius: 50%; overflow: hidden; aspect-ratio: 1; background: var(--bg); }
.card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition: filter 0.5s ease, transform 0.6s ease;
}
.card:hover .card__img img, .card:focus-within .card__img img { filter: grayscale(0); transform: scale(1.05); }

.card__info { position: relative; z-index: 1; margin-top: -30px; }
.card__icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: calc(100% - 20px);
  height: 50px;
  margin: 0 auto;
  border-radius: var(--pill);
  background: var(--bg);
  color: var(--muted);
}
.card__icons a, .card__icons button {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 16px;
  color: inherit;
  background: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s, color 0.3s;
}
.card__icons a:hover, .card__icons button:hover,
.card__icons a:focus-visible, .card__icons button:focus-visible { transform: translateY(-2px); color: var(--primary); }
.card__icons a:focus-visible, .card__icons button:focus-visible { outline: 2px solid var(--primary); outline-offset: 1px; }
.card__playbtn { position: relative; }
.card__play {
  width: 0;
  height: 0;
  margin-left: 3px;
  border-style: solid;
  border-width: 6px 0 6px 10px;
  border-color: transparent transparent transparent currentColor;
}
.card__name {
  margin: 22px 0 0;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 400;
  color: var(--heading);
  /* Two-line slot so roles line up across a row; one-line names sit centred in it */
  min-height: 2.6em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-wrap: balance;
}
.card__role { margin: 8px 0 0; font-size: 15px; line-height: 20px; color: var(--secondary-light); }

.also {
  margin: 60px auto 0;
  padding-top: 40px;
  max-width: 900px;
  text-align: center;
  border-top: 1px solid var(--line);
}
.also__label { margin: 0 0 12px; font-size: 18px; color: var(--primary); }
.also__list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; line-height: 2; }
/* Separator before every item except the first on each wrapped line (.line-start is set in script) */
.also__list li { font-family: var(--font-heading); font-size: 17px; color: var(--heading); }
.also__list li + li::before { content: '·'; margin: 0 14px; color: var(--secondary-light); }
.also__list li.line-start::before { display: none; }

@media (max-width: 992px) {
  .artists__panel { padding: 50px 0 90px; }
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 640px; margin-inline: auto; }
}
@media (max-width: 600px) {
  .artists__panel { padding: 40px 0 60px; }
  .artists__lead { margin-bottom: 36px; }
  .grid { gap: 8px 10px; }
  .card { padding: 12px 6px 18px; }
  .card__icons { width: calc(100% - 8px); height: 42px; gap: 0; }
  .card__icons a, .card__icons button { width: 30px; font-size: 14px; }
  .card__name { margin-top: 16px; font-size: 18px; }
  .card__role { font-size: 13px; }
  .card__next { top: 4px; padding: 3px 10px; font-size: 10px; letter-spacing: 0.06em; }
  .also { margin-top: 36px; padding-top: 30px; }
  .also__list li { font-size: 15px; }
  .also__list li + li::before { margin: 0 9px; }
}
</style>
