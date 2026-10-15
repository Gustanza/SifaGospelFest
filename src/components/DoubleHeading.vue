<script setup>
// Theme section header (genesisexpo_module_double_headings):
// giant faded word behind (120px/800/uppercase), [mono subtitle] in orange, then the title.
defineProps({
  bg: { type: String, required: true },
  subtitle: { type: String, required: true },
  title: { type: String, required: true },
  align: { type: String, default: 'center' }, // 'center' | 'left'
  bgColor: { type: String, default: '' },      // override ghost-word colour
})
</script>

<template>
  <div class="dbl" :class="`dbl--${align}`">
    <div class="dbl__bg" :style="bgColor ? { color: bgColor } : null" aria-hidden="true">{{ bg }}</div>
    <div class="dbl__sub mono bracket">{{ subtitle }}</div>
    <h2 class="dbl__title">{{ title }}</h2>
  </div>
</template>

<style scoped>
.dbl { position: relative; margin-bottom: 26px; }
.dbl--center { text-align: center; }
.dbl__bg {
  font-family: var(--font-heading);
  font-size: 120px;
  font-weight: 800;
  line-height: 0.25;
  padding-top: 35px;
  text-transform: uppercase;
  color: var(--ghost);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}
.dbl--left .dbl__bg { transform: translateX(-90px); }
.dbl__sub { position: relative; z-index: 1; font-size: 22px; line-height: 16px; color: var(--primary); }
.dbl__title { position: relative; z-index: 1; margin: 10px 0 0; font-size: 40px; line-height: 1.3; font-weight: 400; color: var(--heading); }

@media (max-width: 1370px) { .dbl--left .dbl__bg { transform: none; } }
@media (max-width: 1200px) { .dbl__bg { font-size: 100px; } }
@media (max-width: 992px) { .dbl__bg { font-size: 80px; } .dbl__title { font-size: 34px; } }
@media (max-width: 600px) { .dbl__bg { font-size: 54px; } .dbl__sub { font-size: 18px; } .dbl__title { font-size: 28px; } }
</style>
