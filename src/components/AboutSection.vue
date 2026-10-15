<script setup>
// Theme "About Festival" row on Home 5: image-layer collage left (3 layers sliding in from
// down / right / left), double heading + copy + outline button right.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DoubleHeading from './DoubleHeading.vue'

const layers = [
  { src: '/images/agape-band.jpg', alt: 'Agape Gospel Band ministering to a night crowd at Sifa Gospel Fest', cls: 'l1' },
  { src: '/images/geita-stage.jpg', alt: 'A worship minister singing on the Sifa Gospel Fest stage in Geita', cls: 'l2' },
  { src: '/images/stage-speaker.jpg', alt: 'A minister speaking to the crowd with the choir behind him on the Sifa Gospel Fest stage in Mwanza', cls: 'l3' },
]

const collage = ref(null)
const inView = ref(false)
let io
onMounted(() => {
  if (!('IntersectionObserver' in window)) { inView.value = true; return }
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { inView.value = true; io.disconnect() }
  }, { threshold: 0.25 })
  io.observe(collage.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section id="festival" class="section about">
    <div class="container about__grid">
      <div ref="collage" class="about__collage" :class="{ 'is-in': inView }">
        <span class="about__dots" aria-hidden="true"></span>
        <figure v-for="l in layers" :key="l.cls" class="about__layer" :class="`about__layer--${l.cls}`">
          <img :src="l.src" :alt="l.alt" loading="lazy" />
        </figure>
        <span class="about__tag mono" aria-hidden="true">[Free Entry]</span>
      </div>

      <div class="about__text reveal">
        <DoubleHeading bg="About" subtitle="About Festival" title="A Great Service of Praise, Touring Tanzania" align="left" />
        <p>
          Sifa Gospel Fest is a free, open-air <em>ibada kubwa ya kusifu na kuabudu</em>, a festival of praise and
          worship that moves from region to region and brings the nation’s favourite gospel ministers to one big stage,
          alongside choirs and new voices who have never had a platform before.
        </p>
        <p>
          There is no entrance fee. We sell nothing but the Word of God, free to believers and non-believers alike.
        </p>
        <a href="#programme" class="btn btn--outline about__btn">Read More</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: center; }

/* ---------- image layers ---------- */
.about__collage { position: relative; width: 100%; max-width: 560px; aspect-ratio: 560 / 520; }
.about__layer {
  position: absolute;
  margin: 0;
  overflow: hidden;
  border-radius: var(--radius);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 1.1s ease, transform 1.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.about__layer img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.about__layer:hover img { transform: scale(1.05); }
.about__layer--l1 { top: 0; left: 0; width: 68%; height: 54%; transform: translateY(90px); }
.about__layer--l2 { top: 24%; right: 0; z-index: 2; width: 54%; height: 44%; transform: translateX(90px); transition-delay: 0.6s; }
.about__layer--l3 { bottom: 0; left: 8%; z-index: 3; width: 62%; height: 42%; transform: translateX(-90px); transition-delay: 1.2s; }
.about__layer--l2, .about__layer--l3 { border: 6px solid var(--bg); }
.about__layer--l3 img { object-position: 50% 42%; }
.about__collage.is-in .about__layer { opacity: 1; transform: none; }

.about__dots {
  position: absolute;
  top: -26px;
  right: 6%;
  width: 150px;
  height: 120px;
  background-image: radial-gradient(rgba(var(--primary-rgb), 0.55) 1.5px, transparent 1.6px);
  background-size: 16px 16px;
  opacity: 0.6;
}
.about__tag {
  position: absolute;
  top: 44%;
  left: 18px;
  z-index: 4;
  padding: 4px 16px;
  color: #fff;
  font-size: 16px;
  line-height: 28px;
  background: var(--primary);
  border-radius: var(--pill);
  box-shadow: var(--shadow-primary);
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 0.6s 1.8s ease, transform 0.6s 1.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.about__collage.is-in .about__tag { opacity: 1; transform: none; }

/* ---------- copy ---------- */
.about__text { padding-left: 15px; }
.about__text p { color: var(--body); }
.about__text em { font-style: normal; color: #fff; }
.about__btn { margin-top: 20px; }

@media (max-width: 992px) {
  .about__grid { grid-template-columns: 1fr; gap: 70px; }
  .about__collage { margin: 0 auto; }
  .about__text { padding-left: 0; }
}
@media (max-width: 600px) {
  .about__tag { left: 12px; font-size: 14px; }
  .about__dots { width: 100px; height: 90px; }
}
</style>
