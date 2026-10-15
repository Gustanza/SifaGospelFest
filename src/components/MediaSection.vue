<script setup>
// Theme "NEWS / What's New?" (Home 5): 3-column intro, 3 dark blog cards, then a row of video thumbnails.
import DoubleHeading from './DoubleHeading.vue'
import { news, videos, socials } from '../data/festival.js'
defineEmits(['play'])
const youtube = socials.find((s) => s.icon === 'youtube')?.href

// hero-stage.jpg is already the hero background, so the Mwanza recap card uses another stage photo here.
const imageOverride = { '/images/hero-stage.jpg': '/images/stage-speaker.jpg' }
const posts = news.map((n) => ({ ...n, image: imageOverride[n.image] || n.image }))

// maxresdefault is sharper but missing for some uploads; fall back to hqdefault once.
const thumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
const thumbFallback = (e, id) => {
  const fb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  if (e.target.src !== fb) e.target.src = fb
}
// YouTube serves a 120x90 grey placeholder (not an error) when maxres is missing.
const checkThumb = (e, id) => { if (e.target.naturalWidth <= 120) thumbFallback(e, id) }
</script>

<template>
  <section id="media" class="section media">
    <div class="container">
      <div class="intro">
        <DoubleHeading bg="News" subtitle="In the Press" title="What’s New?" align="left" />
        <p class="intro__text reveal">Every stop is streamed live. Catch the highlights, then read what the press is saying about the tour.</p>
        <div class="intro__cta reveal">
          <a :href="youtube" target="_blank" rel="noopener" class="btn btn--outline btn--l" aria-label="View all videos on YouTube">View All</a>
        </div>
      </div>

      <ul class="posts" role="list">
        <li v-for="(n, i) in posts" :key="n.href" class="post reveal" :style="{ '--d': `${i * 0.1}s` }">
          <a :href="n.href" target="_blank" rel="noopener" class="post__media" tabindex="-1" aria-hidden="true">
            <img :src="n.image" alt="" width="740" height="460" loading="lazy" />
            <span class="post__cat">{{ n.category }}</span>
          </a>
          <div class="post__body">
            <div class="post__meta mono">[ {{ n.date }} ]<span class="post__src">{{ n.source }}</span></div>
            <h3 class="post__title">
              <a :href="n.href" target="_blank" rel="noopener">{{ n.title }}<span class="sr-only"> ({{ n.source }}, opens in a new tab)</span></a>
            </h3>
          </div>
        </li>
      </ul>

      <div class="watch">
        <div class="watch__head">
          <span class="watch__label mono bracket">Watch Again</span>
          <span class="watch__line" aria-hidden="true"></span>
        </div>
        <ul class="videos" role="list">
          <li v-for="(v, i) in videos" :key="v.id" class="reveal" :style="{ '--d': `${i * 0.1}s` }">
            <button type="button" class="video" :aria-label="`Play video: ${v.title}`" @click="$emit('play', v.id)">
              <img :src="thumb(v.id)" alt="" width="1280" height="720" loading="lazy" @load="checkThumb($event, v.id)" @error="thumbFallback($event, v.id)" />
              <span class="video__shade" aria-hidden="true"></span>
              <span class="video__play" aria-hidden="true"><i></i><i></i></span>
              <span class="video__text">
                <span class="video__cat">{{ v.category }}</span>
                <span class="video__title">{{ v.title }}</span>
                <span class="video__meta mono">[ {{ v.meta }} ]</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.media { padding-bottom: 60px; }
.intro {
  display: grid;
  grid-template-columns: 300px 1fr auto;
  gap: 30px 60px;
  align-items: end;
  margin-bottom: 60px;
}
.intro :deep(.dbl) { margin-bottom: 0; }
.intro__text { max-width: 540px; margin: 0 0 4px; }
.intro__cta { padding-bottom: 8px; }

.posts { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 30px; }
.post { display: flex; flex-direction: column; }
.post__media {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius) var(--radius) 0 0;
  overflow: hidden;
  background: var(--surface);
}
.post__media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
.post:hover .post__media img { transform: scale(1.05); }
.post__cat {
  position: absolute;
  left: 30px;
  bottom: 30px;
  padding: 0 14px;
  line-height: 25px;
  border-radius: 12px;
  background: var(--primary);
  color: #fff;
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  transition: background 0.45s, color 0.45s;
}
.post:hover .post__cat { background: #fff; color: var(--primary); }
.post__body {
  flex: 1;
  padding: 30px 32px 40px;
  border-radius: 0 0 var(--radius) var(--radius);
  background: var(--surface);
}
.post__meta { font-size: 17px; line-height: 24px; color: var(--meta); }
.post__src { display: block; margin-top: 4px; font-family: var(--font-heading); font-size: 12px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--secondary-light); }
.post__title { margin: 14px 0 0; font-size: 24px; line-height: 36px; font-weight: 400; }
.post__title a { color: var(--heading); transition: color 0.3s; }
.post__title a:hover, .post:hover .post__title a { color: var(--primary); }
.post__title a:focus-visible { outline: 2px solid var(--primary); outline-offset: 4px; border-radius: 2px; }

.watch { margin-top: 70px; }
.watch__head { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
.watch__label { font-size: 22px; color: var(--primary); white-space: nowrap; }
.watch__line { flex: 1; height: 1px; background: var(--line); }

.videos { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 30px; }
.video {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  padding: 0;
  border: 0;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);
  text-align: left;
  color: #fff;
  cursor: pointer;
}
.video img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
.video:hover img, .video:focus-visible img { transform: scale(1.06); }
.video:focus-visible { outline: 3px solid rgba(var(--primary-rgb), 0.7); outline-offset: 3px; }
.video__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(var(--bg-rgb), 0.1) 0%, rgba(var(--bg-rgb), 0.3) 40%, rgba(var(--bg-rgb), 0.94) 100%);
  transition: background-color 0.4s;
}
.video:hover .video__shade { background-color: rgba(var(--secondary-rgb), 0.2); }
.video__play {
  position: absolute;
  top: 36%;
  left: 50%;
  width: 60px;
  height: 60px;
  margin: -30px 0 0 -30px;
  border-radius: 50%;
  background: var(--primary);
  transition: transform 0.3s;
}
.video:hover .video__play { transform: scale(1.1); }
.video__play::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  border-style: solid;
  border-width: 8px 0 8px 13px;
  border-color: transparent transparent transparent #fff;
  transform: translate(-35%, -50%);
}
.video__play i { position: absolute; inset: 0; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.8); opacity: 0; animation: pulseCircle 3.9s linear infinite; }
.video__play i:nth-child(2) { animation-delay: 1.95s; }
.video__cat {
  justify-self: start;
  margin-bottom: 6px;
  padding: 0 12px;
  line-height: 23px;
  border-radius: 12px;
  background: rgba(var(--primary-rgb), 0.9);
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}
.video__text { position: absolute; left: 22px; right: 22px; bottom: 16px; display: grid; gap: 2px; }
.video__title {
  font-family: var(--font-heading);
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  color: #fff;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-wrap: balance;
  transition: color 0.3s;
}
.video:hover .video__title { color: var(--primary); }
.video__meta { font-size: 14px; line-height: 20px; color: rgba(255, 255, 255, 0.7); }

@media (max-width: 1200px) {
  .intro { grid-template-columns: 280px 1fr auto; gap: 30px; }
}
@media (max-width: 992px) {
  .intro { grid-template-columns: 1fr auto; align-items: end; }
  .intro__text { grid-column: 1 / -1; grid-row: 2; }
  .intro__cta { grid-column: 2; grid-row: 1; }
  .posts, .videos { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .posts > :last-child, .videos > :last-child { grid-column: 1 / -1; }
  .posts > :last-child .post__media { aspect-ratio: 21 / 9; }
}
@media (max-width: 600px) {
  .intro { grid-template-columns: 1fr; gap: 20px; margin-bottom: 40px; }
  .intro__cta { grid-column: 1; grid-row: 3; padding: 0; }
  .posts, .videos { grid-template-columns: minmax(0, 1fr); gap: 24px; }
  .posts > :last-child .post__media { aspect-ratio: 16 / 10; }
  .post__body { padding: 24px 24px 30px; }
  .post__meta { font-size: 15px; }
  .post__title { font-size: 21px; line-height: 30px; }
  .watch { margin-top: 50px; }
  .watch__label { font-size: 18px; }
}
</style>
