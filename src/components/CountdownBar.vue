<script setup>
// Theme Home 5 countdown: boxed textured dark panel, two-tone heading left, white 80px digits right
// with dot colons. The Dream panel below overlaps its lower edge (theme margin-top: -140px).
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { nextStop } from '../data/festival.js'

const target = new Date(nextStop.date).getTime()
const now = ref(Date.now())
let timer
onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 1000) })
onBeforeUnmount(() => clearInterval(timer))

const left = computed(() => Math.max(0, target - now.value))
const units = computed(() => {
  const s = Math.floor(left.value / 1000)
  return [
    { label: 'Days', value: Math.floor(s / 86400) },
    { label: 'Hours', value: Math.floor((s % 86400) / 3600) },
    { label: 'Minutes', value: Math.floor((s % 3600) / 60) },
    { label: 'Seconds', value: s % 60 },
  ]
})
const pad = (n) => String(n).padStart(2, '0')
// Screen readers get a calm, minute-level summary instead of a value changing every second.
const summary = computed(() => {
  if (!left.value) return `Sifa Gospel Fest ${nextStop.region} is happening now`
  const [d, h, m] = units.value
  return `${d.value} days, ${h.value} hours and ${m.value} minutes until Sifa Gospel Fest ${nextStop.region}`
})
</script>

<template>
  <section class="cdw" aria-labelledby="cd-title">
    <div class="container cdw__box">
      <div class="cd">
        <div class="cd__head reveal">
          <h3 id="cd-title" class="cd__title">Count <span>Every Second</span> Until <span>{{ nextStop.region }}</span></h3>
          <p class="cd__date mono bracket">{{ nextStop.dateLabel }}</p>
        </div>

        <div class="cd__clock reveal" role="timer" :aria-label="summary">
          <template v-for="(u, i) in units" :key="u.label">
            <span v-if="i" class="cd__colon" aria-hidden="true"><i></i><i></i></span>
            <div class="cd__unit" aria-hidden="true">
              <span class="cd__num">{{ pad(u.value) }}</span>
              <span class="cd__label mono bracket">{{ u.label }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cdw { position: relative; }
/* theme boxed rows are 1200px (container + gutters), matching the other boxed panels */
.cdw__box { width: var(--page); }
.cd {
  position: relative;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  align-items: center;
  padding: 64px 60px 204px; /* 140px of the bottom sits under the Dream panel */
  overflow: hidden;
  border-radius: var(--radius);
  background:
    linear-gradient(rgba(var(--surface-rgb), 0.62), rgba(var(--surface-rgb), 0.74)),
    url('/images/texture-dark.jpg') center / cover;
}
.cd__title { margin: 0 0 14px; font-size: 36px; line-height: 48px; font-weight: 500; color: #fff; }
.cd__title span { color: var(--secondary-light); }
.cd__date { margin: 0; color: var(--primary); font-size: 18px; line-height: 24px; white-space: nowrap; }

.cd__clock { display: flex; align-items: flex-start; justify-content: space-between; padding-left: 20px; }
.cd__unit { display: flex; flex-direction: column; align-items: center; min-width: 120px; }
.cd__num {
  font-family: var(--font-heading);
  font-size: 80px;
  font-weight: 500;
  line-height: 80px;
  color: #fff;
  font-variant-numeric: tabular-nums;
}
.cd__label { margin-top: 14px; color: var(--body); font-size: 22px; line-height: 22px; }
.cd__colon { display: flex; flex-direction: column; justify-content: center; gap: 14px; height: 80px; }
.cd__colon i { display: block; width: 7px; height: 7px; background: #99999c; border-radius: 50%; }

@media (max-width: 1200px) {
  .cd { grid-template-columns: 250px 1fr; padding-inline: 40px; }
  .cd__num { font-size: 66px; }
  .cd__title { font-size: 32px; line-height: 44px; }
  .cd__date { font-size: 15px; }
  .cd__unit { min-width: 96px; }
}
@media (max-width: 992px) {
  .cd { grid-template-columns: 1fr; gap: 36px; padding: 56px 40px 176px; text-align: center; }
  .cd__clock { padding-left: 0; justify-content: center; gap: 18px; }
}
@media (max-width: 600px) {
  .cd { padding: 46px 18px 136px; }
  .cd__title { font-size: 28px; line-height: 38px; }
  .cd__date { white-space: normal; }
  .cd__clock { gap: 4px; justify-content: space-between; }
  .cd__unit { min-width: 0; flex: 1; }
  .cd__num { font-size: 40px; line-height: 44px; }
  .cd__label { margin-top: 8px; font-size: 13px; }
  .cd__colon { height: 44px; gap: 8px; }
  .cd__colon i { width: 4px; height: 4px; }
}
</style>
