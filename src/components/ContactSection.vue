<script setup>
// Dark two-column contact: details + socials on the left, a --surface form card on the right.
import { ref, nextTick } from 'vue'
import DoubleHeading from './DoubleHeading.vue'
import SocialIcon from './SocialIcon.vue'
import { contact, socials } from '../data/festival.js'

const sent = ref(false)
const done = ref(null)
const form = ref({ name: '', email: '', topic: 'General enquiry', message: '' })
// No backend yet: acknowledge the message and move focus to the confirmation.
const submit = async () => {
  sent.value = true
  await nextTick()
  done.value?.focus()
}
const reset = () => {
  form.value = { name: '', email: '', topic: 'General enquiry', message: '' }
  sent.value = false
}
// Phone / WhatsApp rows render only once real numbers are set in festival.js (currently null).
const wa = contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` : ''
const waReady = !!contact.whatsapp && /^\+?[\d\s]+$/.test(contact.whatsapp)
</script>

<template>
  <section id="contact" class="section contact">
    <div class="container contact__grid">
      <div class="contact__info reveal">
        <DoubleHeading bg="Contact" subtitle="Get in Touch" title="Partner, Minister or Just Say Hi" align="left" />
        <p class="contact__lead">Want to bring Sifa to your region, partner with us, or minister on the Sifa stage? Send us a message and the team will get back to you.</p>
        <dl class="info">
          <div>
            <dt class="mono bracket">Email</dt>
            <dd><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></dd>
          </div>
          <div v-if="contact.phone">
            <dt class="mono bracket">Phone</dt>
            <dd><a :href="`tel:${contact.phone.replace(/[^\d+]/g, '')}`">{{ contact.phone }}</a></dd>
          </div>
          <div v-if="contact.whatsapp">
            <dt class="mono bracket">WhatsApp</dt>
            <dd><a v-if="waReady" :href="wa" target="_blank" rel="noopener">{{ contact.whatsapp }}</a><template v-else>{{ contact.whatsapp }}</template></dd>
          </div>
        </dl>
        <div class="socials">
          <a v-for="s in socials" :key="s.name" :href="s.href" target="_blank" rel="noopener" :aria-label="`Sifa Gospel Fest on ${s.name}`"><SocialIcon :name="s.icon" /></a>
        </div>
      </div>

      <div class="card reveal">
        <form v-if="!sent" class="form" @submit.prevent="submit">
          <h3 class="card__title">Send a Message</h3>
          <div class="form__row">
            <label class="field">
              <span class="field__label">Your name</span>
              <input v-model="form.name" type="text" required autocomplete="name" placeholder="Full name" />
            </label>
            <label class="field">
              <span class="field__label">Email address</span>
              <input v-model="form.email" type="email" required autocomplete="email" placeholder="you@example.com" />
            </label>
          </div>
          <label class="field">
            <span class="field__label">I’m writing about</span>
            <span class="select">
              <select v-model="form.topic">
                <option>General enquiry</option>
                <option>Artist &amp; programme</option>
                <option>Sponsorship &amp; partnership</option>
                <option>Volunteering</option>
                <option>Media &amp; press</option>
              </select>
            </span>
          </label>
          <label class="field">
            <span class="field__label">Message</span>
            <textarea v-model="form.message" rows="5" required placeholder="How can we help?"></textarea>
          </label>
          <button type="submit" class="btn btn--primary btn--l form__submit">Send Message</button>
        </form>
        <div v-else ref="done" class="done" role="status" tabindex="-1">
          <div class="done__check" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </div>
          <div class="done__sub mono bracket">Message received</div>
          <h3 class="done__title">Asante, {{ form.name.trim() || 'friend' }}!</h3>
          <p>Thank you for reaching out. The Sifa team will get back to you soon. Mungu akubariki.</p>
          <button type="button" class="btn btn--outline btn--m" @click="reset">Send another</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact { padding-top: 80px; }
.contact__grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 70px; align-items: center; }
.contact__lead { max-width: 460px; margin-bottom: 30px; }

.info { margin: 0 0 34px; padding: 0; border-top: 1px solid var(--line); }
.info > div { display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--line); }
.info dt { flex: 0 0 120px; font-size: 18px; color: var(--primary); }
.info dd { margin: 0; color: var(--heading); font-family: var(--font-heading); font-size: 17px; overflow-wrap: anywhere; }
.info dd a { color: var(--heading); }
.info dd a:hover { color: var(--primary); }
.info dd a:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; }

.socials { display: flex; gap: 12px; }
.socials a {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  transition: all 0.3s;
}
.socials a:hover, .socials a:focus-visible { background: var(--primary); transform: translateY(-3px); box-shadow: var(--shadow-primary); }
.socials a:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }

.card {
  padding: 50px;
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: 0 15px 38px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
}
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50px;
  right: 50px;
  height: 3px;
  border-radius: 0 0 3px 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
}
.card__title { margin: 0 0 26px; font-size: 26px; line-height: 1.3; font-weight: 400; }
.form { display: grid; gap: 20px; }
.form__row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.field { display: grid; gap: 8px; }
.field__label { font-family: var(--font-heading); font-size: 14px; line-height: 1; color: var(--body); }
.field input, .field select, .field textarea {
  width: 100%;
  height: 50px;
  padding: 0 22px;
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--heading);
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 25px;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.field textarea { height: auto; min-height: 140px; padding: 14px 22px; line-height: 1.6; border-radius: 22px; resize: vertical; }
.field ::placeholder { color: var(--muted); opacity: 0.8; }
.field input:focus, .field select:focus, .field textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
}
.select { position: relative; display: block; }
.select select { appearance: none; -webkit-appearance: none; padding-right: 48px; cursor: pointer; }
.select select option { background: var(--surface); color: #fff; }
.select::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 24px;
  width: 8px;
  height: 8px;
  margin-top: -6px;
  border-right: 2px solid var(--primary);
  border-bottom: 2px solid var(--primary);
  transform: rotate(45deg);
  pointer-events: none;
}
.form__submit { justify-self: start; margin-top: 6px; }

.done { text-align: center; padding: 30px 0 10px; outline: none; }
.done__check {
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  margin: 0 auto 22px;
  border-radius: 50%;
  color: #fff;
  background: var(--primary);
  box-shadow: var(--shadow-primary);
}
.done__sub { font-size: 18px; color: var(--primary); }
.done__title { margin: 8px 0 14px; font-size: 30px; line-height: 1.3; font-weight: 400; }
.done p { max-width: 380px; margin: 0 auto 26px; }

@media (max-width: 992px) {
  .contact__grid { grid-template-columns: minmax(0, 1fr); gap: 50px; }
}
@media (max-width: 600px) {
  .card { padding: 34px 20px 30px; }
  .card::before { left: 20px; right: 20px; }
  .form__row { grid-template-columns: minmax(0, 1fr); }
  .info dt { flex-basis: 100px; font-size: 16px; }
  .info dd { font-size: 16px; }
  .form__submit { justify-self: stretch; }
}
</style>
