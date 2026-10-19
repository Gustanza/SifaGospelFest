// Live countdown to an event window: ticks every second and reports the phase
// ('soon' before start, 'live' between start and end, 'done' after end).
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export function useCountdown(start, end) {
  const startMs = new Date(start).getTime()
  const endMs = new Date(end ?? start).getTime()
  const now = ref(Date.now())
  let timer
  onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 1000) })
  onBeforeUnmount(() => clearInterval(timer))

  const phase = computed(() => (now.value < startMs ? 'soon' : now.value < endMs ? 'live' : 'done'))
  const units = computed(() => {
    const s = Math.floor(Math.max(0, startMs - now.value) / 1000)
    return [
      { label: 'Days', value: Math.floor(s / 86400) },
      { label: 'Hours', value: Math.floor((s % 86400) / 3600) },
      { label: 'Minutes', value: Math.floor((s % 3600) / 60) },
      { label: 'Seconds', value: s % 60 },
    ]
  })
  return { phase, units }
}

export const pad = (n) => String(n).padStart(2, '0')
