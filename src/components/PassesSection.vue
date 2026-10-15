<script setup>
// Theme pricing tables (genesisexpo_module_pricing_plan) in Home 5's dark form.
// The festival is free, so the "tickets" are ways to take part.
import DoubleHeading from './DoubleHeading.vue'
import { passes, socials } from '../data/festival.js'

const youtube = socials.find((s) => s.icon === 'youtube')?.href || '#media'
const hrefs = { 'Festival Day': '#venue', 'Sifa Youth Talk': '#contact', 'Watch Online': youtube, 'Volunteer / Minister': '#contact' }
const cards = passes.map((p) => {
  const href = hrefs[p.desc] || '#contact'
  return { ...p, href, external: href.startsWith('http') }
})
</script>

<template>
  <section id="passes" class="section passes">
    <div class="container">
      <div class="passes__intro">
        <DoubleHeading bg="Tickets" subtitle="Hakuna Kiingilio" title="How Much? Nothing at All." align="left" />
        <p class="passes__lead">
          There is no entrance fee and nothing to buy: Sifa Gospel Fest is free for everyone.
          Choose how you would like to take part.
        </p>
      </div>

      <ul class="cards">
        <li v-for="(card, i) in cards" :key="card.desc" class="card reveal" :class="{ 'card--featured': card.featured }" :style="{ '--d': `${i * 0.1}s` }">
          <div class="card__head">
            <h3 class="card__price">{{ card.price }}</h3>
            <p class="card__desc mono">[{{ card.desc }}]</p>
            <span class="card__badge">
              <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              {{ card.badge }}
            </span>
          </div>
          <div class="card__body">
            <ul class="card__items">
              <li v-for="(item, j) in card.items" :key="item" :class="{ 'is-off': j >= card.items.length - card.off }">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="card__foot">
            <a
              class="btn btn--outline-orange btn--l"
              :href="card.href"
              :target="card.external ? '_blank' : null"
              :rel="card.external ? 'noopener' : null"
            >{{ card.cta }}<span class="sr-only">: {{ card.desc }}</span></a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.passes { background: var(--bg); padding-bottom: 70px; }
.passes__intro { margin-bottom: 55px; }
.passes__lead { max-width: 560px; margin: 0; }

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 30px;
  row-gap: 0;
  margin: 0;
  padding: 0 0 25px;
  list-style: none;
}
.card {
  position: relative;
  display: grid;
  grid-row: span 2;
  grid-template-rows: subgrid;
  row-gap: 0;
  border-radius: var(--radius);
  text-align: center;
  transition: transform 0.5s var(--d, 0s), opacity 0.9s var(--d, 0s);
}
.card:hover { transform: translateY(-20px); }

/* Header with the ticket "punch" notch cut at top centre */
.card__head {
  position: relative;
  padding: 57px 15px 54px;
  background: var(--surface);
  border-radius: var(--radius) var(--radius) 0 0;
}
.card__head::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 50px;
  height: 25px;
  transform: translateX(-50%);
  background: var(--bg);
  border-radius: 0 0 25px 25px;
}
.card__price {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 48px;
  line-height: 50px;
  font-weight: 700;
  color: var(--secondary-light);
}
.card__desc { margin: 6px 0 0; font-size: 19px; line-height: 26px; color: var(--primary); }
.card__badge {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: calc(100% - 24px);
  padding: 10px 18px;
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #fff;
  background: var(--bg);
  border-radius: var(--pill);
}
.card__badge svg { flex: 0 0 auto; color: #0add9a; }

.card__body {
  flex: 1;
  padding: 43px 20px 52px;
  background: color-mix(in srgb, var(--surface) 55%, var(--bg));
  border-radius: 0 0 var(--radius) var(--radius);
}
.card__items { margin: 0; padding: 0; list-style: none; }
.card__items li { font-size: 16px; line-height: 50px; color: #fff; }
.card__items li.is-off { color: #55607a; }

.card__foot { position: absolute; left: 0; right: 0; bottom: 0; transform: translateY(50%); display: flex; justify-content: center; }
.card__foot .btn { min-width: 155px; padding: 14px 30px; }

/* Featured: filled blue header (theme filled-purple card) */
.card--featured .card__head { background: var(--secondary); }
.card--featured .card__price { color: #fff; }
.card--featured .card__desc { color: #fff; }
.card--featured .card__badge { box-shadow: 0 0 0 1px rgba(var(--secondary-rgb), 0.9); }

@media (max-width: 1200px) {
  .card__items li { line-height: 44px; font-size: 15px; }
  .card__badge { white-space: normal; width: max-content; text-align: center; padding: 8px 14px; font-size: 11px; line-height: 15px; border-radius: 20px; }
}
@media (max-width: 992px) {
  .card__badge { white-space: nowrap; padding: 10px 18px; font-size: 12px; line-height: 18px; }
}
@media (max-width: 992px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
  .card { margin-bottom: 70px; }
  .cards { padding-bottom: 0; }
  .passes { padding-bottom: 20px; }
}
@media (max-width: 600px) {
  .passes__intro { margin-bottom: 45px; }
  .cards { grid-template-columns: 1fr; max-width: 360px; margin-inline: auto; }
  .card { margin-bottom: 65px; }
  .card__head { padding: 50px 15px 48px; }
  .card__items li { line-height: 44px; }
}
.card.is-revealed { transition-delay: 0s; } /* stagger is entrance-only */
</style>
