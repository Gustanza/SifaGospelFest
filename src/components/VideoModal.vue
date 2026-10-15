<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
const props = defineProps({ id: { type: String, default: '' } })
const emit = defineEmits(['close'])

const dialog = ref(null)
const closeBtn = ref(null)
let lastFocus = null

// Esc closes; Tab is trapped inside the dialog (close button + iframe).
const onKey = (e) => {
  if (e.key === 'Escape') return emit('close')
  if (e.key !== 'Tab' || !dialog.value) return
  const items = [...dialog.value.querySelectorAll('button, iframe')]
  const first = items[0]
  const last = items[items.length - 1]
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}

watch(() => props.id, async (v) => {
  // same scroll-lock target as the header's mobile menu, so the two never fight
  document.documentElement.style.overflow = v ? 'hidden' : ''
  if (v) {
    lastFocus = document.activeElement
    window.addEventListener('keydown', onKey)
    await nextTick()
    closeBtn.value?.focus()
  } else {
    window.removeEventListener('keydown', onKey)
    lastFocus?.focus?.()
  }
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Transition name="fade">
    <div v-if="id" ref="dialog" class="modal" role="dialog" aria-modal="true" aria-label="Video player" @click.self="emit('close')">
      <button ref="closeBtn" type="button" class="modal__close" aria-label="Close video" @click="emit('close')">×</button>
      <div class="modal__frame">
        <iframe
          :src="`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`"
          title="Sifa Gospel Fest video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal { position: fixed; inset: 0; z-index: 100001; display: grid; place-items: center; padding: 16px; background: rgba(var(--bg-rgb), 0.94); backdrop-filter: blur(4px); }
.modal__frame { width: min(1100px, 100%); aspect-ratio: 16 / 9; border-radius: var(--radius); overflow: hidden; box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5); background: #000; }
.modal__frame iframe { width: 100%; height: 100%; border: 0; }
.modal__close { position: absolute; top: 16px; right: 22px; width: 54px; height: 54px; font-size: 54px; line-height: 1; color: #fff; background: none; border: 0; cursor: pointer; opacity: 0.8; transition: color 0.3s, opacity 0.3s; }
.modal__close:hover, .modal__close:focus-visible { opacity: 1; color: var(--primary); }
.modal__close:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; border-radius: 6px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
