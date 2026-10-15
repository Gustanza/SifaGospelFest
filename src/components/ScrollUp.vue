<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const active = ref(false)
const onScroll = () => { active.value = window.scrollY > 600 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const up = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <button
    type="button"
    class="up"
    :class="{ active }"
    aria-label="Back to top"
    :tabindex="active ? 0 : -1"
    :aria-hidden="active ? null : 'true'"
    @click="up"
  >
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M6 13l6-6 6 6M6 19l6-6 6 6" />
    </svg>
  </button>
</template>

<style scoped>
/* Theme scroll-up: orange tab rounded on the left only, sliding in from the right edge */
.up {
  position: fixed;
  right: 0;
  bottom: 40px;
  z-index: 900;
  width: 52px;
  height: 56px;
  display: grid;
  place-items: center;
  padding: 0 0 0 4px;
  border: 0;
  border-radius: 50px 0 0 50px;
  color: #fff;
  background: var(--primary);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateX(100%);
  transition: transform 0.45s ease, opacity 0.45s ease, visibility 0.45s, background-color 0.3s;
}
.up.active { opacity: 1; visibility: visible; transform: none; }
.up:hover { background: var(--primary-dark); }
.up:hover svg { animation: bob 1.2s ease-in-out infinite; }
.up:focus-visible { outline: 3px solid #fff; outline-offset: -6px; }
/* Phones: sit above the in-card READ MORE buttons */
@media (max-width: 768px) { .up { bottom: 90px; } }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
</style>
