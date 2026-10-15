<script setup>
// Home 5 client-logo row: grey logos on the page background, hover -> white.
// Typographic wordmarks stand in until the client supplies partner logo files;
// each gets its own treatment so the row reads as distinct brands, like the theme's logos.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { partners } from '../data/festival.js'

// The duplicate list only exists for the <=1200px marquee loop; desktop renders one static row.
const marquee = ref(false)
let mq
const sync = () => { marquee.value = mq.matches }
onMounted(() => { mq = window.matchMedia('(max-width: 1200px)'); sync(); mq.addEventListener('change', sync) })
onBeforeUnmount(() => mq && mq.removeEventListener('change', sync))

const styles = {
  'Clouds Media': 'clouds',
  'Global TV': 'global',
  'Timeless Expedition': 'timeless',
  'Talanta Sports': 'talanta',
  'Event Set': 'eventset',
  'Equity Bank': 'equity',
  BRELA: 'brela',
}
const marks = partners.map((name) => {
  const [first, ...rest] = name.split(' ')
  return { name, kind: styles[name] || 'plain', first, rest: rest.join(' ') }
})
</script>

<template>
  <section id="partners" class="partners" aria-labelledby="partners-title">
    <h2 id="partners-title" class="sr-only">Our partners</h2>
    <div class="partners__viewport">
      <div class="partners__track">
        <ul v-for="copy in (marquee ? 2 : 1)" :key="copy" class="partners__list" :class="{ 'is-clone': copy === 2 }" :aria-hidden="copy === 2 ? 'true' : null">
          <li v-for="m in marks" :key="m.name" class="logo" :class="`logo--${m.kind}`" :title="m.name">
            <span v-if="m.kind !== 'plain'" class="sr-only">{{ m.name }}</span>

            <!-- Clouds Media: cloud glyph + lowercase heavy word + spaced sub -->
            <span v-if="m.kind === 'clouds'" class="mk" aria-hidden="true">
              <svg class="mk__icon" viewBox="0 0 48 32" width="46" height="31"><path fill="currentColor" d="M38.5 13.2A12 12 0 0015.6 9 9 9 0 003 17.6 8.4 8.4 0 0011.4 26h26.4a6.4 6.4 0 00.7-12.8z" /></svg>
              <span class="mk__stack"><b>clouds</b><small>MEDIA</small></span>
            </span>

            <!-- Global TV: ringed globe + condensed caps + boxed TV -->
            <span v-else-if="m.kind === 'global'" class="mk" aria-hidden="true">
              <svg class="mk__icon" viewBox="0 0 32 32" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="16" cy="16" r="13" /><ellipse cx="16" cy="16" rx="6" ry="13" /><path d="M3 16h26M5.5 9h21M5.5 23h21" /></svg>
              <b>GLOBAL</b><i>TV</i>
            </span>

            <!-- Timeless Expedition: airy wide caps over a mono line -->
            <span v-else-if="m.kind === 'timeless'" class="mk mk--col" aria-hidden="true">
              <b>TIMELESS</b><small>— expedition —</small>
            </span>

            <!-- Talanta Sports: slanted heavy caps with speed bars -->
            <span v-else-if="m.kind === 'talanta'" class="mk" aria-hidden="true">
              <span class="mk__bars"><i></i><i></i><i></i></span>
              <span class="mk__stack"><b>TALANTA</b><small>SPORTS</small></span>
            </span>

            <!-- Event Set: light word + solid block -->
            <span v-else-if="m.kind === 'eventset'" class="mk" aria-hidden="true">
              <b>event</b><i>SET</i>
            </span>

            <!-- Equity Bank: serif italic + small caps -->
            <span v-else-if="m.kind === 'equity'" class="mk mk--col" aria-hidden="true">
              <b>Equity</b><small>BANK</small>
            </span>

            <!-- BRELA: very wide heavy caps with rule -->
            <span v-else-if="m.kind === 'brela'" class="mk mk--col" aria-hidden="true">
              <b>BRELA</b><small>business registrations</small>
            </span>

            <span v-else class="mk mk--plain">{{ m.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners { padding: 90px 0 90px; background: var(--bg); overflow: hidden; }
.partners__viewport { width: var(--page); margin-inline: auto; }
.partners__track { display: flex; }
.partners__list {
  flex: 1 0 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  padding-inline: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.partners__list.is-clone { display: none; }

.logo {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  color: #9aa0b4;
  opacity: 0.7;
  transform: scale(0.95);
  transition: color 0.4s, opacity 0.4s, transform 0.4s;
  cursor: default;
  white-space: nowrap;
}
.logo:hover { color: #fff; opacity: 1; transform: scale(1); }

.mk { display: inline-flex; align-items: center; gap: 8px; line-height: 1; }
.mk--col { flex-direction: column; gap: 5px; }
.mk__stack { display: inline-flex; flex-direction: column; line-height: 1; }
.mk b, .mk i { font-style: normal; }

/* Clouds Media */
.logo--clouds b { font-family: var(--font-heading); font-weight: 700; font-size: 30px; letter-spacing: -0.5px; }
.logo--clouds small { font-family: var(--font-heading); font-weight: 500; font-size: 10px; letter-spacing: 0.62em; margin-top: 3px; padding-left: 2px; }
.logo--clouds .mk { gap: 10px; }

/* Global TV */
.logo--global b { font-family: var(--font-heading); font-weight: 800; font-size: 27px; letter-spacing: -1px; transform: scaleX(0.86); transform-origin: left; margin-right: -12px; }
.logo--global i { font-family: var(--font-heading); font-weight: 700; font-size: 15px; padding: 3px 5px 2px; border: 2px solid currentColor; border-radius: 4px; }

/* Timeless Expedition */
.logo--timeless b { font-family: var(--font-body); font-weight: 400; font-size: 24px; letter-spacing: 0.28em; margin-right: -0.28em; }
.logo--timeless small { font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.08em; }

/* Talanta Sports */
.logo--talanta .mk { transform: skewX(-10deg); }
.logo--talanta b { font-family: var(--font-heading); font-weight: 800; font-style: italic; font-size: 30px; letter-spacing: 0.5px; }
.logo--talanta small { font-family: var(--font-heading); font-weight: 500; font-size: 11px; letter-spacing: 0.75em; margin-top: 2px; align-self: flex-end; margin-right: -0.75em; }
.mk__bars { display: inline-flex; flex-direction: column; gap: 4px; align-items: flex-end; }
.mk__bars i { display: block; height: 5px; border-radius: 3px; background: currentColor; }
.mk__bars i:nth-child(1) { width: 22px; }
.mk__bars i:nth-child(2) { width: 15px; }
.mk__bars i:nth-child(3) { width: 9px; }

/* Event Set */
.logo--eventset b { font-family: var(--font-body); font-weight: 400; font-size: 30px; letter-spacing: -0.5px; }
.logo--eventset i { font-family: var(--font-heading); font-weight: 700; font-size: 17px; letter-spacing: 0.08em; padding: 6px 7px 5px; border-radius: 4px; background: currentColor; }
.logo--eventset i { -webkit-text-fill-color: var(--bg); }
.logo--eventset .mk { gap: 5px; }

/* Equity Bank */
.logo--equity b { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-weight: 700; font-size: 34px; letter-spacing: -0.5px; }
.logo--equity small { font-family: var(--font-heading); font-weight: 500; font-size: 10px; letter-spacing: 0.9em; margin-right: -0.9em; }
.logo--equity .mk { gap: 3px; }

/* BRELA */
.logo--brela b { font-family: var(--font-heading); font-weight: 800; font-size: 29px; letter-spacing: 0.2em; margin-right: -0.2em; padding-bottom: 4px; border-bottom: 3px solid currentColor; }
.logo--brela small { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; }

.mk--plain { font-family: var(--font-heading); font-weight: 700; font-size: 24px; }

/* Narrow screens: gentle marquee (two copies, the clone is hidden from assistive tech) */
@media (max-width: 1200px) {
  .partners { padding: 70px 0; }
  .partners__viewport {
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  }
  .partners__track { width: max-content; animation: partnersMarquee 32s linear infinite; }
  .partners__track:hover { animation-play-state: paused; }
  .partners__list { flex: 0 0 auto; justify-content: flex-start; gap: 64px; padding-right: 64px; }
  .partners__list.is-clone { display: flex; }
}
@media (max-width: 600px) {
  .partners { padding: 50px 0; }
  .partners__list { gap: 48px; padding-right: 48px; }
  .logo { transform: scale(0.85); }
}
@keyframes partnersMarquee { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
  .partners__track { animation: none !important; }
  .partners__viewport { overflow-x: auto; }
}
</style>
