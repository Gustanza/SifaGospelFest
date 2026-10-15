<script setup>
// Theme footer on dark (home5-06): 4 columns (logo/blurb/socials · links · next event · newsletter)
// and a copyright row. No wave on Home 5.
import { ref } from 'vue'
import SocialIcon from './SocialIcon.vue'
import { nav, nextStop, socials, festival } from '../data/festival.js'

const phone = ref('')
const joined = ref(false)
</script>

<template>
  <footer class="ftr">
    <div class="container ftr__grid">
      <div class="ftr__col ftr__brand">
        <a href="#home" class="ftr__logo-link" aria-label="Sifa Gospel Fest, back to top">
          <img src="/images/logo-light.png" alt="Sifa Gospel Fest" class="ftr__logo" height="65" loading="lazy" />
        </a>
        <p class="ftr__blurb">A free, open-air praise and worship festival touring the regions of Tanzania. {{ festival.slogan }}.</p>
        <div class="ftr__social">
          <a v-for="s in socials" :key="s.name" :href="s.href" target="_blank" rel="noopener" :aria-label="`Sifa Gospel Fest on ${s.name}`"><SocialIcon :name="s.icon" /></a>
        </div>
      </div>

      <nav class="ftr__col" aria-label="Footer">
        <h2 class="ftr__title">Quick Links</h2>
        <ul class="ftr__links">
          <li v-for="n in nav.filter((x) => x.href !== '#home')" :key="n.label"><a :href="n.href">{{ n.label }}</a></li>
        </ul>
      </nav>

      <div class="ftr__col">
        <h2 class="ftr__title">Next Event</h2>
        <dl class="ftr__event">
          <div><dt class="mono bracket">Where</dt><dd>{{ nextStop.venue }}</dd></div>
          <div><dt class="mono bracket">When</dt><dd>{{ nextStop.dateLabel }}</dd></div>
          <div><dt class="mono bracket">Time</dt><dd>{{ nextStop.hours }}</dd></div>
          <div><dt class="mono bracket">Entry</dt><dd>Free for everyone</dd></div>
        </dl>
      </div>

      <div class="ftr__col">
        <h2 class="ftr__title">WhatsApp Updates</h2>
        <form v-if="!joined" class="ftr__form" @submit.prevent="joined = true">
          <label class="sr-only" for="ftr-phone">Your WhatsApp number</label>
          <input id="ftr-phone" v-model="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="Your WhatsApp number" required />
          <button type="submit" class="btn btn--primary ftr__join">Join</button>
        </form>
        <p v-else class="ftr__joined" role="status"><span class="mono bracket">Karibu</span> You’re on the list for line-ups and next-region news.</p>
        <p v-if="!joined" class="ftr__small">Line-ups and next-region announcements, straight to your phone.</p>
      </div>
    </div>

    <div class="container ftr__bottom">
      <span>Copyright © {{ festival.year }} Sifa Gospel Fest. All Rights Reserved</span>
      <span class="ftr__legal"><a href="#">Privacy Policy</a><a href="#">Terms of Use</a></span>
    </div>
  </footer>
</template>

<style scoped>
.ftr { padding-top: 100px; background: #03050f; color: var(--body); }
.ftr__grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 30px; padding-bottom: 80px; }
.ftr__logo-link { display: inline-block; margin-bottom: 30px; }
.ftr__logo { height: 65px; width: auto; }
.ftr__blurb { max-width: 260px; margin-bottom: 30px; font-size: 14px; line-height: 30px; }
.ftr__social { display: flex; gap: 8px; }
.ftr__social a {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 13px;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  transition: all 0.3s;
}
.ftr__social a:hover, .ftr__social a:focus-visible { background: #fff; color: var(--primary); box-shadow: 0 3px 16px rgba(0, 0, 0, 0.4); }

.ftr__title { margin: 32px 0 22px; font-size: 20px; line-height: 30px; font-weight: 500; color: #fff; }
.ftr__links { list-style: none; margin: 0; padding: 0; }
.ftr__links li { margin-bottom: 12px; }
.ftr__links a { color: var(--body); font-size: 16px; line-height: 30px; transition: color 0.3s, padding 0.3s; }
.ftr__links a:hover, .ftr__links a:focus-visible { color: var(--primary); }

.ftr__event { margin: 0; }
.ftr__event > div { margin-bottom: 14px; }
.ftr__event dt { font-size: 15px; line-height: 20px; color: var(--primary); }
.ftr__event dd { margin: 2px 0 0; font-size: 16px; line-height: 26px; color: var(--body); }

.ftr__form { display: grid; gap: 30px; justify-items: start; }
.ftr__form input {
  width: 100%;
  height: 46px;
  padding: 0 11px;
  font-family: var(--font-body);
  font-size: 14px;
  color: #fff;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0;
  transition: border-color 0.3s;
}
.ftr__form input::placeholder { color: rgba(218, 218, 218, 0.75); }
.ftr__form input:focus { outline: none; border-bottom-color: var(--primary); }
.ftr__join { min-width: 142px; height: 40px; padding: 0 30px; font-weight: 700; letter-spacing: 0.1em; }
.ftr__small { margin: 18px 0 0; font-size: 13px; line-height: 22px; color: var(--muted); }
.ftr__joined { font-size: 15px; line-height: 26px; }
.ftr__joined .mono { display: block; color: var(--primary); font-size: 18px; }

.ftr a:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; }

.ftr__bottom {
  display: flex;
  justify-content: space-between;
  gap: 10px 24px;
  flex-wrap: wrap;
  padding: 22px 0 28px;
  border-top: 1px solid var(--line);
  font-size: 14px;
  line-height: 24px;
  color: var(--muted);
}
.ftr__legal { display: flex; gap: 24px; }
.ftr__bottom a { color: var(--muted); }
.ftr__bottom a:hover { color: var(--primary); }

@media (max-width: 992px) {
  .ftr { padding-top: 80px; }
  .ftr__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 20px; padding-bottom: 60px; }
}
@media (max-width: 600px) {
  .ftr { padding-top: 60px; }
  .ftr__grid { grid-template-columns: minmax(0, 1fr); padding-bottom: 40px; }
  .ftr__title { margin-top: 20px; margin-bottom: 14px; }
  .ftr__links { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 16px; }
  .ftr__links li { margin-bottom: 4px; }
  .ftr__bottom { flex-direction: column; }
}
</style>
