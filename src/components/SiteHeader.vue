<script setup>
// GenesisExpo header (Home 5, dark): full-width translucent band over the hero, centred nav with
// pill-highlight hover and white dropdowns, icon + "Join Free" pill on the right. A white sticky bar
// slides down after 300px, a full-screen search overlay and a slide-in mobile panel complete it.
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { nav, socials } from '../data/festival.js'
import SocialIcon from './SocialIcon.vue'

const CTA_HREF = '#passes'

const bars = [
  { key: 'main', logo: '/images/logo-light.png', cls: 'hdr__band' },
  { key: 'sticky', logo: '/images/logo.png', cls: 'hdr__sticky' },
]

const sticky = ref(false)
const active = ref('#home')
const menuOpen = ref(false)
const searchOpen = ref(false)
const openSub = ref(null)       // mobile accordion
const query = ref('')
const searchMsg = ref('')

const searchInput = ref(null)
const menuClose = ref(null)
let lastFocus = null

// ---- scroll: sticky bar + simple scroll-spy over the top-level nav targets ----
const spyIds = [...new Set(nav.map((n) => n.href))]
let ticking = false
const update = () => {
  ticking = false
  sticky.value = window.scrollY > 300
  const line = window.innerHeight * 0.35
  let current = spyIds[0]
  let bestTop = -Infinity
  for (const id of spyIds) {
    const el = document.querySelector(id)
    if (!el) continue
    const top = el.getBoundingClientRect().top
    if (top <= line && top > bestTop) { bestTop = top; current = id }
  }
  active.value = current
}
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }

// ---- overlays ----
const lockScroll = (on) => { document.documentElement.style.overflow = on ? 'hidden' : '' }
const anyOverlay = computed(() => menuOpen.value || searchOpen.value)
watch(anyOverlay, lockScroll)

const openSearch = async (e) => {
  lastFocus = e?.currentTarget || document.activeElement
  menuOpen.value = false
  searchMsg.value = ''
  searchOpen.value = true
  await nextTick()
  searchInput.value?.focus()
}
const closeSearch = () => {
  searchOpen.value = false
  lastFocus?.focus?.()
}
const openMenu = async (e) => {
  lastFocus = e?.currentTarget || document.activeElement
  menuOpen.value = true
  await nextTick()
  menuClose.value?.focus()
}
const closeMenu = (restore = true) => {
  menuOpen.value = false
  if (restore) lastFocus?.focus?.()
}
const toggleSub = (i) => { openSub.value = openSub.value === i ? null : i }

// In-page search: match the query against nav labels and a few festival keywords.
const keywords = [
  ...nav.flatMap((n) => [n, ...(n.children || [])]).map((n) => ({ words: n.label.toLowerCase(), href: n.href })),
  { words: 'schedule programme time youth talk festival day', href: '#programme' },
  { words: 'free ticket tickets entry pass passes price cost kiingilio volunteer', href: '#passes' },
  { words: 'singer singers minister ministers lineup line-up choir band guests', href: '#artists' },
  { words: 'venue dodoma jamhuri location where', href: '#venue' },
  { words: 'tour route regions mbeya geita mwanza arusha dar es salaam finale', href: '#tour' },
  { words: 'photo photos gallery pictures instagram', href: '#gallery' },
  { words: 'video videos news live stream youtube', href: '#media' },
  { words: 'sponsor sponsors partner partners clouds global equity brela', href: '#partners' },
  { words: 'whatsapp phone email contact call', href: '#contact' },
]
const runSearch = () => {
  const q = query.value.trim().toLowerCase()
  if (!q) return
  const terms = q.split(/\s+/)
  const hit = keywords.find((k) => terms.some((t) => t.length > 2 && k.words.includes(t))) ||
    keywords.find((k) => k.words.includes(q))
  if (!hit) {
    searchMsg.value = 'Nothing found. Try "programme", "artists", "venue" or "tour".'
    return
  }
  searchOpen.value = false
  query.value = ''
  nextTick(() => document.querySelector(hit.href)?.scrollIntoView({ behavior: 'smooth' }))
}

const onKey = (e) => {
  if (e.key !== 'Escape') return
  if (searchOpen.value) closeSearch()
  else if (menuOpen.value) closeMenu()
}
// Drop focus after clicking a dropdown link so :focus-within doesn't keep the panel open.
const blurLink = (e) => e.currentTarget.blur()
const onResize = () => { if (window.innerWidth > 1080 && menuOpen.value) closeMenu(false) }

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  document.addEventListener('keydown', onKey)
  update()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('keydown', onKey)
  lockScroll(false)
})
</script>

<template>
  <header class="hdr">
    <div
      v-for="bar in bars"
      :key="bar.key"
      :class="[bar.cls, { 'is-on': bar.key === 'sticky' && sticky }]"
      :inert="bar.key === 'sticky' && !sticky"
      :aria-hidden="bar.key === 'sticky' && !sticky ? 'true' : null"
    >
      <div class="hdr__row">
        <a href="#home" class="hdr__logo" aria-label="Sifa Gospel Fest, back to top">
          <img :src="bar.logo" alt="Sifa Gospel Fest" width="123" height="75" />
        </a>

        <nav class="hdr__nav" :aria-label="bar.key === 'main' ? 'Main' : 'Main (sticky)'">
          <ul class="hdr__menu">
            <li
              v-for="item in nav"
              :key="item.label"
              class="hdr__item"
              :class="{ 'has-sub': item.children, 'is-active': active === item.href }"
            >
              <a :href="item.href" class="hdr__link" :aria-current="active === item.href ? 'location' : null" @click="blurLink">
                <span>{{ item.label }}</span>
                <svg v-if="item.children" class="hdr__chev" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" /></svg>
              </a>
              <ul v-if="item.children" class="hdr__sub">
                <li v-for="c in item.children" :key="c.label">
                  <a :href="c.href" @click="blurLink"><span>{{ c.label }}</span></a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div class="hdr__tools">
          <a href="#contact" class="hdr__icon hdr__icon--wa" aria-label="WhatsApp updates">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path class="o" d="M3.6 20.4l1.2-4.2A8.6 8.6 0 1 1 8 19.3z" />
              <path class="f" d="M15.9 13.9c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.2-.4.1a5.6 5.6 0 0 1-2.8-2.4c-.2-.4.2-.3.6-1.1.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.3-.3-.5-.3h-.4a.8.8 0 0 0-.6.3 2.5 2.5 0 0 0-.8 1.9 4.4 4.4 0 0 0 .9 2.3 10 10 0 0 0 3.9 3.4c1.4.6 1.9.7 2.6.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.4-.3z" />
            </svg>
          </a>
          <button type="button" class="hdr__icon hdr__icon--search" aria-label="Search the site" @click="openSearch">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle class="o" cx="10.5" cy="10.5" r="7.5" /><path class="o" d="M16 16l5.5 5.5" /></svg>
          </button>
          <a :href="CTA_HREF" class="btn btn--primary btn--m hdr__cta">Join Free</a>
          <button
            type="button"
            class="hdr__burger"
            aria-label="Open menu"
            aria-controls="hdr-mobile"
            :aria-expanded="menuOpen ? 'true' : 'false'"
            @click="openMenu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Full-screen search (theme search overlay) -->
    <Transition name="hdr-fade">
      <div v-if="searchOpen" class="hdr__search" role="dialog" aria-modal="true" aria-labelledby="hdr-search-title" @click.self="closeSearch">
        <button type="button" class="hdr__x" aria-label="Close search" @click="closeSearch"><span></span><span></span></button>
        <div class="hdr__search-inner">
          <div class="hdr__ghost" aria-hidden="true">Search</div>
          <h2 id="hdr-search-title" class="hdr__search-title">What are you looking for?</h2>
          <form class="hdr__search-form" role="search" @submit.prevent="runSearch">
            <label for="hdr-q" class="sr-only">Search the festival site</label>
            <input id="hdr-q" ref="searchInput" v-model="query" type="search" placeholder="Search…" autocomplete="off" />
            <button type="submit" aria-label="Search">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7.5" /><path d="M16 16l5.5 5.5" /></svg>
            </button>
          </form>
          <p class="hdr__search-msg" aria-live="polite">{{ searchMsg }}</p>
        </div>
      </div>
    </Transition>

    <!-- Mobile menu -->
    <Transition name="hdr-fade">
      <div v-if="menuOpen" class="hdr__scrim" aria-hidden="true" @click="closeMenu()"></div>
    </Transition>
    <div class="hdr__mclip">
    <aside
      id="hdr-mobile"
      class="hdr__mobile"
      :class="{ 'is-open': menuOpen }"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      :inert="!menuOpen"
    >
      <div class="hdr__mobile-top">
        <img src="/images/logo-light.png" alt="Sifa Gospel Fest" width="82" height="50" />
        <button ref="menuClose" type="button" class="hdr__x hdr__x--sm" aria-label="Close menu" @click="closeMenu()"><span></span><span></span></button>
      </div>
      <ul class="hdr__mlist">
        <li v-for="(item, i) in nav" :key="item.label" :class="{ 'is-active': active === item.href }">
          <div class="hdr__mrow">
            <a :href="item.href" @click="closeMenu(false)">{{ item.label }}</a>
            <button
              v-if="item.children"
              type="button"
              class="hdr__mtoggle"
              :class="{ 'is-open': openSub === i }"
              :aria-expanded="openSub === i ? 'true' : 'false'"
              :aria-controls="`hdr-msub-${i}`"
              :aria-label="`${item.label} submenu`"
              @click="toggleSub(i)"
            >
              <svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" /></svg>
            </button>
          </div>
          <div v-if="item.children" :id="`hdr-msub-${i}`" class="hdr__msub" :class="{ 'is-open': openSub === i }">
            <ul>
              <li v-for="c in item.children" :key="c.label"><a :href="c.href" @click="closeMenu(false)">{{ c.label }}</a></li>
            </ul>
          </div>
        </li>
      </ul>
      <a :href="CTA_HREF" class="btn btn--primary btn--l btn--full" @click="closeMenu(false)">Join Free</a>
      <div class="hdr__msocial">
        <a v-for="s in socials" :key="s.name" :href="s.href" target="_blank" rel="noopener" :aria-label="s.name"><SocialIcon :name="s.icon" /></a>
      </div>
    </aside>
    </div>
  </header>
</template>

<style scoped>
.hdr { position: absolute; top: 0; left: 0; z-index: 99; width: 100%; color: #fff; }

/* ---------- bars ---------- */
.hdr__band { background: rgba(var(--bg-rgb), 0.4); }
/* The band/sticky backgrounds are full-bleed; the row itself sits on the shared page width,
   so the logo and the CTA line up exactly with the edges of the page content. */
.hdr__row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  width: var(--page);
  height: var(--header-h);
  margin-inline: auto;
  padding: 0;
}
.hdr__row > .hdr__nav { justify-self: center; }
.hdr__sticky {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #232323;
  background: #fff;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(-110%);
  transition: transform 0.45s ease;
}
.hdr__sticky.is-on { transform: none; }
.hdr__sticky .hdr__row { height: 100px; }

.hdr__logo { justify-self: start; display: block; line-height: 0; }
.hdr__logo img { width: auto; height: 75px; }

/* ---------- desktop nav ---------- */
.hdr__nav { height: 100%; }
.hdr__menu { display: flex; height: 100%; margin: 0; padding: 0; list-style: none; }
.hdr__item { position: relative; display: flex; align-items: center; }
.hdr__link {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 18px;
  color: inherit;
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  white-space: nowrap;
}
.hdr__link span { position: relative; z-index: 1; display: inline-block; }
/* the theme's growing pill highlight under the label */
.hdr__link span::after {
  content: '';
  position: absolute;
  left: -2px;
  bottom: 1px;
  z-index: -1;
  width: 0;
  height: 6px;
  border-radius: 6px;
  background: var(--primary);
  transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.hdr__item:hover > .hdr__link span::after,
.hdr__item:focus-within > .hdr__link span::after,
.hdr__item.is-active > .hdr__link span::after { width: calc(100% + 4px); }
.hdr__chev { width: 10px; height: 6px; margin-left: 6px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.3s; }
.hdr__item:hover .hdr__chev { transform: rotate(180deg); }
.hdr__link:focus-visible { outline: none; }
.hdr__link:focus-visible span { outline: 2px solid var(--primary); outline-offset: 4px; border-radius: 2px; }

/* dropdown panel */
.hdr__sub {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 5;
  min-width: 280px;
  margin: 0;
  padding: 23px 0;
  list-style: none;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 38px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(14px);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
}
.hdr__band .hdr__sub { box-shadow: 0 15px 38px rgba(0, 0, 0, 0.3); }
.hdr__item:hover > .hdr__sub,
.hdr__item:focus-within > .hdr__sub { opacity: 1; visibility: visible; transform: none; }
.hdr__sub a {
  display: flex;
  align-items: center;
  padding: 7px 30px;
  color: #232323;
  font-family: var(--font-heading);
  font-size: 16px;
  line-height: 26px;
  white-space: nowrap;
}
.hdr__sub a span { position: relative; transition: transform 0.3s ease; }
.hdr__sub a span::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -16px;
  width: 0;
  height: 4px;
  margin-top: -2px;
  border-radius: 4px;
  background: var(--primary);
  transition: width 0.3s ease;
}
.hdr__sub a:hover, .hdr__sub a:focus-visible { color: var(--primary); outline: none; }
.hdr__sub a:hover span, .hdr__sub a:focus-visible span { transform: translateX(16px); }
.hdr__sub a:hover span::before, .hdr__sub a:focus-visible span::before { width: 10px; }

/* ---------- right tools ---------- */
.hdr__tools { justify-self: end; display: flex; align-items: center; }
.hdr__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-right: 14px;
  padding: 0;
  color: inherit;
  background: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: color 0.3s;
}
.hdr__icon--search { margin-right: 26px; }
.hdr__icon svg { width: 20px; height: 20px; }
.hdr__icon .o { fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hdr__icon .f { fill: currentColor; }
.hdr__icon:hover { color: var(--primary); }
.hdr__icon:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
.hdr__cta { min-width: 0; padding: 9px 30px; font-size: 12px; } /* true btn--m, theme GET TICKET ~137x40 */

.hdr__burger {
  display: none;
  width: 44px;
  height: 44px;
  margin-left: 8px;
  padding: 12px 10px;
  color: inherit; /* buttons don't inherit text colour by default: white on the dark bar, dark on the sticky bar */
  background: none;
  border: 0;
  cursor: pointer;
}
.hdr__burger span { display: block; height: 2.5px; margin-bottom: 6px; background: currentColor; border-radius: 2px; transition: width 0.3s; }
.hdr__burger span:nth-child(2) { width: 70%; margin-left: auto; }
.hdr__burger:hover span:nth-child(2) { width: 100%; }
.hdr__burger:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; border-radius: 4px; }

/* ---------- search overlay ---------- */
.hdr__search {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 0 16px;
  background: rgba(var(--bg-rgb), 0.96);
  backdrop-filter: blur(8px);
}
.hdr__search-inner { position: relative; width: min(770px, 100%); text-align: center; }
.hdr__ghost {
  position: absolute;
  top: -86px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-heading);
  font-size: 200px;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.04);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
}
.hdr__search-title { position: relative; margin: 0 0 40px; font-size: 40px; line-height: 1.3; font-weight: 400; }
.hdr__search-form { position: relative; }
.hdr__search-form input {
  width: 100%;
  height: 58px;
  padding: 0 70px 0 30px;
  color: #fff;
  font: 16px var(--font-body);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--pill);
  outline: none;
  transition: border-color 0.3s;
}
.hdr__search-form input::placeholder { color: var(--muted); }
.hdr__search-form input:focus { border-color: var(--primary); }
.hdr__search-form button {
  position: absolute;
  top: 5px;
  right: 5px;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  color: #fff;
  background: var(--primary);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}
.hdr__search-form button svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hdr__search-form button:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hdr__search-msg { min-height: 30px; margin: 16px 0 0; color: var(--muted); font-size: 15px; }

.hdr__x {
  position: absolute;
  top: 34px;
  right: 40px;
  width: 44px;
  height: 44px;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
  transition: transform 0.3s;
}
.hdr__x span { position: absolute; top: 50%; left: 8px; width: 28px; height: 2px; background: #fff; border-radius: 2px; transform: rotate(45deg); }
.hdr__x span + span { transform: rotate(-45deg); }
.hdr__x:hover { transform: rotate(90deg); }
.hdr__x:hover span { background: var(--primary); }
.hdr__x:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; border-radius: 4px; }
.hdr__x--sm { position: relative; top: auto; right: auto; }

/* ---------- mobile panel ---------- */
.hdr__scrim { position: fixed; inset: 0; z-index: 150; background: rgba(0, 0, 0, 0.55); }
/* fixed clip box so the off-canvas panel never adds horizontal overflow */
.hdr__mclip { position: fixed; inset: 0; z-index: 160; overflow: hidden; pointer-events: none; }
.hdr__mobile {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  width: min(360px, 88vw);
  padding: 26px 28px 34px;
  overflow-y: auto;
  background: var(--surface);
  box-shadow: -20px 0 50px rgba(0, 0, 0, 0.4);
  transform: translateX(105%);
  visibility: hidden;
  transition: transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), visibility 0.45s;
}
.hdr__mobile.is-open { transform: none; visibility: visible; }
.hdr__mobile-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 26px; }
.hdr__mobile-top img { width: auto; height: 50px; }
.hdr__mlist { margin: 0 0 30px; padding: 0; list-style: none; }
.hdr__mlist > li { border-bottom: 1px solid var(--line); }
.hdr__mrow { display: flex; align-items: center; justify-content: space-between; }
.hdr__mrow a { flex: 1; padding: 14px 0; color: #fff; font-family: var(--font-heading); font-size: 18px; line-height: 24px; }
.hdr__mlist > li.is-active .hdr__mrow a { color: var(--primary); }
.hdr__mrow a:hover { color: var(--primary); }
.hdr__mtoggle {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}
.hdr__mtoggle svg { width: 11px; height: 7px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.3s; }
.hdr__mtoggle.is-open { background: var(--primary); }
.hdr__mtoggle.is-open svg { transform: rotate(180deg); }
.hdr__mtoggle:focus-visible, .hdr__mrow a:focus-visible, .hdr__msub a:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
.hdr__msub { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.35s ease; }
.hdr__msub.is-open { grid-template-rows: 1fr; }
.hdr__msub > ul { min-height: 0; margin: 0; padding: 0; overflow: hidden; list-style: none; visibility: hidden; transition: visibility 0.35s; }
.hdr__msub.is-open > ul { padding-bottom: 12px; visibility: visible; }
.hdr__msub a { display: block; padding: 6px 0 6px 16px; color: var(--body); font-size: 15px; line-height: 24px; border-left: 2px solid rgba(var(--primary-rgb), 0.5); }
.hdr__msub a:hover { color: var(--primary); }
.hdr__msocial { display: flex; gap: 10px; margin-top: 26px; }
.hdr__msocial a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 17px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  transition: background 0.3s;
}
.hdr__msocial a:hover { background: var(--primary); }

.hdr-fade-enter-active, .hdr-fade-leave-active { transition: opacity 0.35s ease; }
.hdr-fade-enter-from, .hdr-fade-leave-to { opacity: 0; }
.hdr-fade-enter-active .hdr__search-inner { transition: transform 0.45s ease; }
.hdr-fade-enter-from .hdr__search-inner { transform: translateY(30px); }

/* ---------- responsive ---------- */
@media (max-width: 1360px) {
  .hdr__link { padding: 0 13px; }
}
@media (max-width: 1240px) {
  .hdr__link { padding: 0 10px; font-size: 15px; }
  .hdr__icon--wa { display: none; }
  .hdr__icon--search { margin-right: 14px; }
}
@media (max-width: 1080px) {
  .hdr__band { background: rgba(var(--bg-rgb), 0.85); }
  .hdr__row { grid-template-columns: auto 1fr; height: 90px; }
  .hdr__sticky .hdr__row { height: 80px; }
  .hdr__nav { display: none; }
  .hdr__logo img { height: 56px; }
  .hdr__sticky .hdr__logo img { height: 50px; }
  .hdr__icon--wa { display: grid; }
  .hdr__burger { display: block; }
}
@media (max-width: 600px) {
  .hdr__row { height: 78px; }
  .hdr__sticky .hdr__row { height: 70px; }
  .hdr__logo img { height: 48px; }
  .hdr__sticky .hdr__logo img { height: 44px; }
  .hdr__cta, .hdr__icon--wa { display: none; }
  .hdr__icon--search { margin-right: 2px; }
  .hdr__ghost { top: -40px; font-size: 96px; }
  .hdr__search-title { font-size: 28px; margin-bottom: 28px; }
  .hdr__x { top: 18px; right: 16px; }
}
</style>
