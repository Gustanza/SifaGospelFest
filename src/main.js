import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

// Fade-up reveal for any element with .reveal once it scrolls into view,
// including elements rendered after mount (tabs, toggled panels).
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return
    const el = e.target
    el.classList.add('is-visible')
    io.unobserve(el)
    // once the entrance finishes, drop the stagger so hover transitions respond instantly
    setTimeout(() => el.classList.add('is-revealed'), 1800)
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
)
const watch = (root) => {
  if (root.nodeType !== 1) return
  if (root.matches('.reveal:not(.is-visible)')) io.observe(root)
  root.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el))
}
watch(document.body)
new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach(watch)))
  .observe(document.body, { childList: true, subtree: true })
