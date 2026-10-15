<script setup>
// Home 5 five-photo strip: square images edge to edge, hover zoom + orange overlay with caption.
import SocialIcon from './SocialIcon.vue'
import { photoStrip, socials } from '../data/festival.js'

const instagram = socials.find((s) => s.icon === 'instagram')?.href || 'https://www.instagram.com/sifagospelfest/'
const captions = ['Agape Gospel Band', 'Geita', 'Mwanza', 'Geita', 'Worship']
</script>

<template>
  <section id="gallery" class="strip" aria-labelledby="gallery-title">
    <h2 id="gallery-title" class="sr-only">Photo gallery</h2>
    <ul class="strip__grid">
      <li v-for="(photo, i) in photoStrip" :key="photo.src" class="strip__item">
        <a class="tile" :href="instagram" target="_blank" rel="noopener">
          <img :src="photo.src" :alt="photo.alt" width="240" height="240" loading="lazy" />
          <span class="tile__overlay">
            <span class="tile__icon"><SocialIcon name="instagram" /></span>
            <span class="tile__cap mono">[{{ captions[i] || 'Sifa Gospel Fest' }}]</span>
            <span class="tile__handle">@sifagospelfest</span>
            <span class="sr-only">(opens Instagram in a new tab)</span>
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.strip { background: var(--bg); }
.strip__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: var(--page);
  margin: 0 auto;
  padding: 0;
  list-style: none;
}
.tile { position: relative; display: block; aspect-ratio: 1; overflow: hidden; background: var(--surface); }
.tile img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.04); transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1); }
.tile:hover img,
.tile:focus-visible img { transform: scale(1.12); }
.tile__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px;
  text-align: center;
  color: #fff;
  background: rgba(var(--primary-rgb), 0.86);
  opacity: 0;
  transition: opacity 0.45s;
}
.tile:hover .tile__overlay,
.tile:focus-visible .tile__overlay { opacity: 1; }
.tile__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  margin-bottom: 6px;
  font-size: 20px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  transform: translateY(14px);
  transition: transform 0.45s;
}
.tile__cap { font-size: 18px; line-height: 24px; transform: translateY(14px); transition: transform 0.45s 0.05s; }
.tile__handle { font-family: var(--font-heading); font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.85; transform: translateY(14px); transition: transform 0.45s 0.1s; }
.tile:hover .tile__icon, .tile:hover .tile__cap, .tile:hover .tile__handle,
.tile:focus-visible .tile__icon, .tile:focus-visible .tile__cap, .tile:focus-visible .tile__handle { transform: none; }
.tile:focus-visible { outline: 3px solid #fff; outline-offset: -3px; }

/* Phones/tablets: 3 + 2 mosaic, within the shared page width */
@media (max-width: 767px) {
  .strip__grid { grid-template-columns: repeat(6, 1fr); }
  .strip__item { grid-column: span 2; }
  .strip__item:nth-child(n + 4) { grid-column: span 3; }
  .strip__item:nth-child(n + 4) .tile { aspect-ratio: 3 / 2; }
  .tile__cap { font-size: 15px; }
  .tile__handle { display: none; }
  .tile__icon { width: 38px; height: 38px; font-size: 17px; }
}
@media (hover: none) {
  /* touch: show a slim caption bar so the link is discoverable */
  .tile__overlay { opacity: 1; justify-content: flex-end; background: linear-gradient(180deg, transparent 55%, rgba(var(--bg-rgb), 0.75)); }
  .tile__icon, .tile__handle { display: none; }
  .tile__cap { transform: none; font-size: 13px; }
}
</style>
