<script setup>
// Hero "Next Stop" pass: the theme's ticket motif (punched notches, perforation) as a boarding pass
// docked in the hero. Orange stub = where/when, glass body = live countdown + tour route, end = CTAs.
// Replaces the theme's separate countdown bar so "what's next and how long" is above the fold.
import { computed } from 'vue'
import { nextStop, tour, artists } from '../data/festival.js'
import { useCountdown, pad } from '../composables/useCountdown.js'

defineEmits(['play'])

const { phase, units } = useCountdown(nextStop.date, nextStop.end)

const stopIndex = tour.findIndex((t) => t.status === 'next')
// Ministers announced for this stop (official posts), shown as an avatar stack on the stub
const lineup = artists.filter((a) => a.next)
const lineupText = lineup.length > 1
  ? `${lineup.slice(0, -1).map((a) => a.name).join(', ')} & ${lineup.at(-1).name}`
  : lineup[0]?.name
const finale = tour.find((t) => t.status === 'finale')
const stopNo = `${pad(stopIndex + 1)} / ${pad(tour.length)}`
const progress = stopIndex / (tour.length - 1)
const startTime = new Date(nextStop.date).toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Africa/Dar_es_Salaam' }).toUpperCase()

// Screen readers get a calm, minute-level summary instead of a value changing every second.
const summary = computed(() => {
  if (phase.value !== 'soon') return ''
  const [d, h, m] = units.value
  return `${d.value} days, ${h.value} hours and ${m.value} minutes until Sifa Gospel Fest ${nextStop.region}`
})

// One-tap "Add to calendar" (.ics works with Google, Apple and Outlook calendars)
const ics = (() => {
  const utc = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const esc = (s) => s.replace(/[,;]/g, '\\$&')
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Sifa Gospel Fest//EN', 'BEGIN:VEVENT',
    `UID:sifa-${nextStop.region.toLowerCase()}-${nextStop.date.slice(0, 10)}@sifagospelfest.co.tz`,
    `DTSTAMP:${utc(nextStop.date)}`, `DTSTART:${utc(nextStop.date)}`, `DTEND:${utc(nextStop.end)}`,
    `SUMMARY:Sifa Gospel Fest ${nextStop.region}`, `LOCATION:${esc(nextStop.venue)}`,
    'DESCRIPTION:Free open-air praise and worship. Kila mwenye pumzi na amsifu Bwana.',
    'END:VEVENT', 'END:VCALENDAR',
  ]
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`
})()
</script>

<template>
  <aside class="pass" :aria-label="`Next stop: Sifa Gospel Fest ${nextStop.region}`">
    <!-- stub: where and when -->
    <div class="pass__seg pass__stub">
      <p class="pass__chip">
        <span class="pass__dot" aria-hidden="true"></span>
        {{ phase === 'live' ? 'Live Now' : 'Next Stop' }}
        <span class="pass__no mono">[{{ stopNo }}]</span>
      </p>
      <p class="pass__city">{{ nextStop.region }}</p>
      <p class="pass__when mono bracket">{{ nextStop.shortDate.replace(/ \d{4}$/, '') }} · {{ startTime }}</p>
      <p class="pass__venue">
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>
        {{ nextStop.venue.split(',')[0] }}
      </p>
      <a v-if="lineup.length" href="#artists" class="pass__lineup">
        <span class="pass__faces" aria-hidden="true">
          <img v-for="a in lineup" :key="a.name" :src="a.image" alt="" width="34" height="34" />
        </span>
        <span class="pass__names"><span class="sr-only">Ministering: </span>{{ lineupText }}</span>
      </a>
    </div>

    <!-- body: countdown + route -->
    <div class="pass__seg pass__main">
      <template v-if="phase === 'soon'">
        <p class="pass__label mono bracket">Gates open in</p>
        <div class="pass__clock" role="timer" :aria-label="summary">
          <template v-for="(u, i) in units" :key="u.label">
            <span v-if="i" class="pass__colon" aria-hidden="true"><i></i><i></i></span>
            <div class="pass__unit" aria-hidden="true">
              <span class="pass__num">
                <Transition name="roll"><span :key="u.value">{{ pad(u.value) }}</span></Transition>
              </span>
              <span class="pass__unit-label mono bracket">{{ u.label }}</span>
            </div>
          </template>
        </div>
      </template>
      <div v-else class="pass__state">
        <p class="pass__label mono bracket">{{ phase === 'live' ? 'Happening right now' : `Thank you, ${nextStop.region}` }}</p>
        <p class="pass__big">
          <template v-if="phase === 'live'">Gates are open, the praise is on</template>
          <template v-else>Next up: the Grand Finale in {{ finale.region }}</template>
        </p>
      </div>

      <ol class="pass__route" :style="{ '--progress': progress }" aria-label="2026 tour route">
        <li v-for="(t, i) in tour" :key="t.region" :class="`is-${t.status}`">
          <span class="pass__stop" aria-hidden="true"></span>
          <span class="pass__stop-name mono">{{ t.region.split(' ')[0] }}</span>
          <span class="sr-only">{{ i < stopIndex ? 'visited' : i === stopIndex ? 'next stop' : 'upcoming' }}</span>
        </li>
      </ol>
    </div>

    <!-- end: actions -->
    <div class="pass__seg pass__end">
      <a v-if="phase !== 'live'" href="#passes" class="btn btn--primary">Join Free</a>
      <button type="button" class="btn btn--glow" @click="$emit('play', 'XhYi949kti0')">Watch Live</button>
      <a v-if="phase === 'soon'" class="pass__cal mono" :href="ics" :download="`sifa-gospel-fest-${nextStop.region.toLowerCase()}.ics`">[+ Add to calendar]</a>
    </div>
  </aside>
</template>

<style scoped>
/* Notches: each segment masks a quarter circle out of chosen corners; two neighbours' quarters meet
   on the perforation line to form the punched semicircle (theme pricing "punch", here see-through). */
.pass {
  --n: 17px;
  --none: 0.1px;
  display: grid;
  grid-template-columns: 300px 1fr 230px;
  width: 100%;
  text-align: left;
}
.pass__seg {
  --tl: var(--none); --tr: var(--none); --bl: var(--none); --br: var(--none);
  position: relative;
  padding: 26px 32px;
  -webkit-mask:
    radial-gradient(circle var(--tl) at 0 0, #0000 98%, #000) 0 0 / 51% 51% no-repeat,
    radial-gradient(circle var(--tr) at 100% 0, #0000 98%, #000) 100% 0 / 51% 51% no-repeat,
    radial-gradient(circle var(--bl) at 0 100%, #0000 98%, #000) 0 100% / 51% 51% no-repeat,
    radial-gradient(circle var(--br) at 100% 100%, #0000 98%, #000) 100% 100% / 51% 51% no-repeat;
  mask:
    radial-gradient(circle var(--tl) at 0 0, #0000 98%, #000) 0 0 / 51% 51% no-repeat,
    radial-gradient(circle var(--tr) at 100% 0, #0000 98%, #000) 100% 0 / 51% 51% no-repeat,
    radial-gradient(circle var(--bl) at 0 100%, #0000 98%, #000) 0 100% / 51% 51% no-repeat,
    radial-gradient(circle var(--br) at 100% 100%, #0000 98%, #000) 100% 100% / 51% 51% no-repeat;
}
.pass__main, .pass__end {
  background: rgba(var(--surface-rgb), 0.82);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  backdrop-filter: blur(16px) saturate(1.2);
}

/* ---------- stub ---------- */
.pass__stub {
  --tr: var(--n); --br: var(--n);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: var(--radius) 0 0 var(--radius);
  color: #fff;
  background:
    radial-gradient(120% 90% at 100% 0, rgba(255, 255, 255, 0.18), transparent 60%),
    linear-gradient(135deg, #e2551a, #f6913f);
  overflow: hidden;
}
.pass__stub p { position: relative; z-index: 1; margin: 0; }
.pass__chip {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 8px;
  padding: 3px 14px 3px 12px;
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 22px;
  text-transform: uppercase;
  background: rgba(6, 10, 26, 0.28);
  border-radius: var(--pill);
}
.pass__no { font-size: 13px; letter-spacing: 0; opacity: 0.85; text-transform: none; }
.pass__dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: #fff; }
.pass__dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid #fff;
  animation: ping 1.8s ease-out infinite;
}
@keyframes ping { from { transform: scale(1); opacity: 1; } to { transform: scale(3); opacity: 0; } }
.pass__city {
  margin-top: 10px !important;
  font-family: var(--font-heading);
  font-size: 46px;
  font-weight: 500;
  line-height: 50px;
  letter-spacing: -0.01em;
}
.pass__when { margin-top: 6px !important; font-size: 18px; line-height: 24px; }
.pass__venue { display: flex; align-items: center; gap: 6px; margin-top: 4px !important; font-size: 14px; line-height: 22px; opacity: 0.9; }
.pass__venue svg { flex: none; }
.pass__lineup {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  padding-top: 14px;
  color: #fff;
  border-top: 1px solid rgba(255, 255, 255, 0.28);
}
.pass__faces { display: flex; flex: none; }
.pass__faces img {
  width: 34px;
  height: 34px;
  border: 2px solid #ee7a2c;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s;
}
.pass__faces img + img { margin-left: -12px; }
.pass__lineup:hover .pass__faces img { transform: translateY(-3px); }
.pass__lineup:hover .pass__faces img:nth-child(2) { transition-delay: 0.05s; }
.pass__lineup:hover .pass__faces img:nth-child(3) { transition-delay: 0.1s; }
.pass__names { font-family: var(--font-heading); font-size: 13px; font-weight: 500; line-height: 17px; text-wrap: balance; }
.pass__lineup:hover .pass__names { text-decoration: underline; text-underline-offset: 3px; }
.pass__lineup:focus-visible { outline: 2px solid #fff; outline-offset: 4px; border-radius: 4px; }

/* ---------- main ---------- */
.pass__main {
  --tl: var(--n); --tr: var(--n); --bl: var(--n); --br: var(--n);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-inline: 40px;
  border-right: 2px dashed rgba(255, 255, 255, 0.16);
}
.pass__label { margin: 0 0 6px; color: var(--primary); font-size: 16px; line-height: 20px; }

.pass__clock { display: flex; align-items: flex-start; justify-content: space-between; }
.pass__unit { display: flex; flex-direction: column; align-items: center; min-width: 76px; }
.pass__num {
  position: relative;
  display: block;
  height: 64px;
  overflow: hidden;
  font-family: var(--font-heading);
  font-size: 64px;
  font-weight: 500;
  line-height: 64px;
  color: #fff;
  font-variant-numeric: tabular-nums;
}
.pass__num > span { display: block; }
.pass__unit-label { margin-top: 8px; color: var(--muted); font-size: 15px; line-height: 16px; }
.pass__colon { display: flex; flex-direction: column; justify-content: center; gap: 12px; height: 64px; }
.pass__colon i { display: block; width: 6px; height: 6px; background: #99999c; border-radius: 50%; }

/* digits roll up as they change */
.roll-enter-active, .roll-leave-active { transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s; }
.roll-leave-active { position: absolute; inset: 0; }
.roll-enter-from { transform: translateY(70%); opacity: 0; }
.roll-leave-to { transform: translateY(-70%); opacity: 0; }

.pass__state { min-height: 102px; display: flex; flex-direction: column; justify-content: center; }
.pass__big { margin: 0; font-family: var(--font-heading); font-size: 30px; font-weight: 500; line-height: 40px; color: #fff; }

/* tour route: track fills up to the next stop */
.pass__route {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}
.pass__route::before,
.pass__route::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 6px;
  height: 2px;
  border-radius: 2px;
}
.pass__route::before { right: 6px; background: rgba(255, 255, 255, 0.12); }
.pass__route::after { width: calc((100% - 12px) * var(--progress)); background: linear-gradient(90deg, var(--secondary-light), var(--primary)); }
.pass__route li { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; width: 12px; }
.pass__stop { width: 12px; height: 12px; border-radius: 50%; background: var(--secondary-light); border: 2px solid rgba(var(--bg-rgb), 0.9); }
.pass__stop-name { margin-top: 6px; font-size: 12px; line-height: 14px; color: var(--muted); white-space: nowrap; }
.is-next .pass__stop { background: var(--primary); box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.3); animation: beacon 2s ease-in-out infinite; }
.is-next .pass__stop-name { color: #fff; }
.is-finale .pass__stop { background: var(--bg); border-color: rgba(255, 255, 255, 0.5); }
@keyframes beacon { 50% { box-shadow: 0 0 0 7px rgba(var(--primary-rgb), 0.12); } }

/* ---------- end ---------- */
.pass__end {
  --tl: var(--n); --bl: var(--n);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding-inline: 30px;
  border-radius: 0 var(--radius) var(--radius) 0;
}
.pass__end .btn { width: 100%; min-width: 0; }
.pass__cal { align-self: center; color: var(--body); font-size: 14px; line-height: 18px; }
.pass__cal:hover { color: var(--primary); }
.pass__cal:focus-visible { outline: 2px solid var(--primary); outline-offset: 4px; }

/* ---------- responsive ---------- */
@media (max-width: 1200px) {
  .pass { grid-template-columns: 260px 1fr 200px; }
  .pass__main { padding-inline: 28px; }
  .pass__end { padding-inline: 22px; }
  .pass__num { font-size: 52px; }
  .pass__unit { min-width: 62px; }
}
/* stacked pass: notches move to the left/right edges of horizontal perforations */
@media (max-width: 992px) {
  .pass { grid-template-columns: 1fr; max-width: 640px; margin-inline: auto; }
  .pass__seg { padding: 24px 28px; }
  .pass__stub { --tr: var(--none); --bl: var(--n); border-radius: var(--radius) var(--radius) 0 0; }
  .pass__main { border-right: 0; border-bottom: 2px dashed rgba(255, 255, 255, 0.16); }
  .pass__end { --tl: var(--n); --tr: var(--n); --bl: var(--none); flex-direction: row; flex-wrap: wrap; border-radius: 0 0 var(--radius) var(--radius); }
  .pass__end .btn { width: auto; flex: 1; }
  .pass__cal { flex-basis: 100%; text-align: center; }
}
@media (max-width: 600px) {
  .pass { --n: 12px; }
  .pass__seg { padding: 20px 18px; }
  .pass__city { font-size: 36px; line-height: 40px; }
  .pass__when { font-size: 16px; }
  .pass__unit { min-width: 0; flex: 1; }
  .pass__num { height: 44px; font-size: 40px; line-height: 44px; }
  .pass__unit-label { font-size: 12px; }
  .pass__colon { height: 44px; gap: 8px; }
  .pass__colon i { width: 4px; height: 4px; }
  .pass__big { font-size: 22px; line-height: 30px; }
  .pass__stop-name { font-size: 11px; }
  .pass__end .btn { padding-inline: 14px; }
}
</style>
