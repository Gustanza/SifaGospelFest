<script setup>
// Section order follows the theme's Home 5 ("Music Fest") demo, extended with the Sifa IA brief.
import { ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import CountdownBar from './components/CountdownBar.vue'
import DreamSection from './components/DreamSection.vue'
import ProgrammeSection from './components/ProgrammeSection.vue'
import PartnersStrip from './components/PartnersStrip.vue'
import PhotoStrip from './components/PhotoStrip.vue'
import PassesSection from './components/PassesSection.vue'
import TourSection from './components/TourSection.vue'
import ArtistsSection from './components/ArtistsSection.vue'
import CountersBand from './components/CountersBand.vue'
import VoicesSection from './components/VoicesSection.vue'
import MediaSection from './components/MediaSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import ScrollUp from './components/ScrollUp.vue'
import VideoModal from './components/VideoModal.vue'

const videoId = ref('')
const play = (id) => { videoId.value = id }
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection @play="play" />
    <AboutSection />
    <CountdownBar />
    <DreamSection @play="play" />
    <ProgrammeSection />
    <PartnersStrip />
    <PhotoStrip />
    <PassesSection />
    <TourSection />
    <ArtistsSection @play="play" />
    <CountersBand />
    <VoicesSection />
    <MediaSection @play="play" />
    <ContactSection />
  </main>
  <SiteFooter />
  <ScrollUp />
  <VideoModal :id="videoId" @close="videoId = ''" />
</template>
