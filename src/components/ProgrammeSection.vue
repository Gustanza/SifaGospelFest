<script setup>
// Theme timetabs (genesisexpo_module_time_tabs) on Home 5's boxed dark panel with a faint photo behind.
// Tabs: equal flex, 28px title + .571em subtitle, orange 3px underline growing from the centre.
// Rows: time · 134px image · title/description · outline "Read more" (expands the row's details here).
import { ref, nextTick } from 'vue'
import DoubleHeading from './DoubleHeading.vue'
import { programme, nextStop } from '../data/festival.js'

const active = ref('festival')
const open = ref('') // key of the expanded row

// Each slot ends when the next begins; the festival runs until 10 PM (nextStop.hours).
const dayEnd = { festival: nextStop.hours.split('–')[1]?.trim() }
const dayDate = { youth: nextStop.youthTalk, festival: nextStop.dateLabel }
const endOf = (day, i) => day.items[i + 1]?.time || dayEnd[day.id] || ''

const tabRefs = ref([])
function select(id, focus = false) {
  active.value = id
  open.value = ''
  if (focus) nextTick(() => tabRefs.value[programme.findIndex((d) => d.id === id)]?.focus())
}
function onKey(e, i) {
  const n = programme.length
  let j = null
  if (e.key === 'ArrowRight') j = (i + 1) % n
  else if (e.key === 'ArrowLeft') j = (i - 1 + n) % n
  else if (e.key === 'Home') j = 0
  else if (e.key === 'End') j = n - 1
  if (j === null) return
  e.preventDefault()
  select(programme[j].id, true)
}
const toggle = (key) => { open.value = open.value === key ? '' : key }
</script>

<template>
  <section id="programme" class="prog">
    <div class="prog__panel">
      <div class="prog__photo" aria-hidden="true"></div>
      <div class="prog__inner">
        <DoubleHeading bg="Schedule" bg-color="var(--ghost-on-surface)" subtitle="This Year's Event" :title="`${nextStop.region} Programme`" />
        <p class="lead-center prog__lead">
          {{ nextStop.dateLabel }} at {{ nextStop.venue }}. Gates open at 10 AM and the praise runs
          until 10 PM, with the Sifa Youth Talk the day before. Entry is free for everyone.
        </p>

        <div class="tabs" role="tablist" aria-label="Programme days">
          <button
            v-for="(day, i) in programme"
            :id="`tab-${day.id}`"
            :key="day.id"
            :ref="(el) => (tabRefs[i] = el)"
            type="button"
            class="tab"
            :class="{ 'is-active': active === day.id }"
            role="tab"
            :aria-selected="active === day.id"
            :aria-controls="`panel-${day.id}`"
            :tabindex="active === day.id ? 0 : -1"
            @click="select(day.id)"
            @keydown="onKey($event, i)"
          >
            <span class="tab__title">{{ day.title }}</span>
            <span class="tab__sub">{{ day.subtitle }}</span>
          </button>
        </div>

        <div
          v-for="day in programme"
          v-show="active === day.id"
          :id="`panel-${day.id}`"
          :key="day.id"
          class="rows"
          role="tabpanel"
          :aria-labelledby="`tab-${day.id}`"
        >
          <article v-for="(item, i) in day.items" :key="item.title" class="row" :class="{ 'is-open': open === `${day.id}-${i}` }">
            <div class="row__time">
              <span>{{ item.time }}<template v-if="endOf(day, i)"> -</template></span>
              <span v-if="endOf(day, i)">{{ endOf(day, i) }}</span>
            </div>
            <img class="row__img" :src="item.image" :alt="item.title" width="134" height="134" loading="lazy" />
            <div class="row__body">
              <h3 class="row__title">{{ item.title }}</h3>
              <p class="row__text">{{ item.text }}</p>
              <div :id="`more-${day.id}-${i}`" class="row__more" :hidden="open !== `${day.id}-${i}`">
                <p class="mono">[{{ dayDate[day.id] }} · {{ item.time }}<template v-if="endOf(day, i)"> to {{ endOf(day, i) }}</template>]</p>
                <p>{{ day.id === 'festival' ? nextStop.venue : nextStop.region }}. Free entry, all welcome. <a href="#passes">How to take part</a></p>
              </div>
            </div>
            <div class="row__action">
              <button
                type="button"
                class="btn btn--outline btn--m"
                :aria-expanded="open === `${day.id}-${i}`"
                :aria-controls="`more-${day.id}-${i}`"
                @click="toggle(`${day.id}-${i}`)"
              >
                {{ open === `${day.id}-${i}` ? 'Show less' : 'Read more' }}<span class="sr-only">: {{ item.title }}</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prog { position: relative; }
.prog__panel {
  position: relative;
  width: var(--page);
  margin-inline: auto;
  padding: 120px 0 90px;
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
  isolation: isolate;
}
/* Faint raised-hands photo behind the panel (theme section photo at very low opacity) */
.prog__photo {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(var(--surface-rgb), 0.2), var(--surface) 92%),
    url('/images/geita-crowd.jpg') center 30% / cover no-repeat;
  filter: grayscale(1) sepia(0.4) hue-rotate(185deg) saturate(1.6) brightness(0.75);
  opacity: 0.14;
}
.prog__inner { width: min(var(--container), 100%); margin-inline: auto; padding: 0 15px; }
.prog__lead { margin-bottom: 60px; }

/* ---- Tabs ---- */
.tabs { position: relative; display: flex; margin: 0 0 20px; }
.tab {
  position: relative;
  flex: 1 1 0;
  padding: 0 10px 20px;
  font-size: 28px;
  text-align: center;
  background: none;
  border: 0;
  cursor: pointer;
}
.tab::before,
.tab::after { content: ''; position: absolute; top: 100%; height: 3px; }
.tab::before { left: 0; width: 100%; background: rgba(255, 255, 255, 0.1); }
.tab::after { left: 50%; width: 0; transform: translateX(-50%); background: var(--primary); transition: width 0.75s ease; }
.tab.is-active::after { width: 100%; }
.tab__title { display: block; font-family: var(--font-heading); font-weight: 400; font-size: 1em; line-height: 1.4; color: var(--body); transition: color 0.3s; }
.tab__sub { display: block; margin-top: 2px; font-family: var(--font-body); font-size: 0.571em; line-height: 1.4; color: var(--muted); transition: color 0.3s; }
.tab.is-active .tab__title,
.tab:hover .tab__title { color: #fff; }
.tab.is-active .tab__sub,
.tab:hover .tab__sub { color: var(--secondary-light); }
.tab:focus-visible { outline: 3px solid rgba(var(--primary-rgb), 0.6); outline-offset: 4px; border-radius: 4px; }

/* ---- Rows ---- */
.rows { padding-top: 20px; }
.row {
  display: flex;
  align-items: center;
  padding: 35px;
  border-radius: var(--radius);
  transition: background-color 0.5s, box-shadow 0.5s;
}
.row:hover,
.row.is-open { background: var(--surface-2); box-shadow: var(--shadow-card); }
.row__time {
  flex: 0 0 12.5%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  color: #fff;
  white-space: nowrap;
}
.row__img { flex: 0 0 134px; width: 134px; height: 134px; object-fit: cover; border-radius: var(--radius); }
.row__body { flex: 1; min-width: 0; padding: 0 40px; }
.row__title { margin: 0 0 4px; font-size: 20px; line-height: 1.5; font-weight: 500; color: #fff; }
.row__text { margin: 0; max-width: 580px; }
.row__more { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--line); }
.row__more[hidden] { display: none; }
.row__more p { margin: 0; }
.row__more .mono { color: var(--primary); }
.row__more a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
.row__more a:hover { color: #fff; }
.row__action { flex: 0 0 auto; }
.row__action .btn { min-width: 140px; }

@media (max-width: 1200px) {
  .row__time { flex-basis: 15%; }
}
@media (max-width: 992px) {
  .prog__panel { padding: 90px 0 60px; }
  .row { padding: 28px 20px; }
  .row__body { padding: 0 24px; }
  .row__time { flex-basis: 120px; padding-right: 16px; font-size: 16px; }
}
@media (max-width: 767px) {
  .prog__panel { padding: 70px 0 40px; }
  .prog__inner { padding: 0 16px; }
  .prog__lead { margin-bottom: 40px; }
  .tab { font-size: 20px; padding-bottom: 14px; }
  .tab__sub { font-size: 13px; }
  .row {
    display: grid;
    grid-template-columns: 88px 1fr;
    grid-template-areas: 'img time' 'img body' 'act act';
    column-gap: 18px;
    align-items: start;
    padding: 22px 12px;
  }
  .row__img { grid-area: img; width: 88px; height: 88px; }
  .row__time { grid-area: time; flex-direction: row; gap: 5px; padding: 0; text-align: left; font-size: 15px; line-height: 24px; color: var(--secondary-light); }
  .row__body { grid-area: body; padding: 0; }
  .row__title { font-size: 18px; line-height: 1.4; margin: 2px 0 6px; }
  .row__text { font-size: 15px; line-height: 26px; }
  .row__action { grid-area: act; padding: 16px 0 0 106px; }
}
@media (max-width: 400px) {
  .tab { padding-inline: 4px; }
  .tab__title { font-size: 18px; }
}
</style>
