<template>
  <div id="app" class="dark-mode">
    <GridBackground v-if="showGrid" :is-dark-mode="isDarkMode" />
    <TransitionIntro
      v-if="showIntro"
      bgColor="#121212"
      duration="2000"
      @animation-complete="handleAnimationComplete"
    />

    <div v-if="!showIntro" class="page-wrapper">
      <ToolBar />

      <main class="scroll-container">
        <section id="home">
          <HomeView />
        </section>

        <section id="about">
          <AboutView />
        </section>
        <section id="projects">
          <ProjectView />
        </section>
        <section id="contact">
          <ContactView />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import ToolBar from './components/ToolBar.vue'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import TransitionIntro from './components/TransitionIntro.vue'
import GridBackground from '@/components/GridBackground.vue'
import ProjectView from './views/ProjectView.vue'
import ContactView from './views/ContactView.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Harshdeep Singh | AI-First Full Stack Developer | DevVizr Creator',
  htmlAttrs: {
    lang: 'en',
  },
  link: [{ rel: 'canonical', href: 'https://harshdeepstudio.com/' }],
  meta: [
    // Primary Meta Tags
    {
      name: 'description',
      content:
        'Official portfolio of Harshdeep Singh — an AI-first full-stack developer building futuristic, user-focused web applications with Vue.js, PrimeVue, Flask, and MongoDB. Creator of DevVizr — a GitHub and LeetCode insights dashboard.',
    },
    {
      name: 'keywords',
      content:
        'Harshdeep Singh, AI developer, full-stack developer, Vue.js portfolio, DevVizr, GitHub analytics dashboard, MongoDB developer, Flask backend, sci-fi UI, frontend developer, Vue transitions, software engineer, Canadian developer portfolio',
    },
    { name: 'author', content: 'Harshdeep Singh' },
    { name: 'robots', content: 'index, follow' },
    { httpEquiv: 'Content-Type', content: 'text/html; charset=UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

    // Open Graph / Facebook
    { property: 'og:title', content: 'Harshdeep Singh | AI Developer Portfolio' },
    {
      property: 'og:description',
      content:
        'Explore Harshdeep Singh’s AI-first development portfolio featuring futuristic projects like DevVizr, built with Vue.js and Flask.',
    },
    { property: 'og:image', content: 'https://harshdeepstudio.com/images/preview.png' }, // Replace with actual path
    { property: 'og:url', content: 'https://harshdeepstudio.com/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'en_CA' },
    { property: 'og:site_name', content: 'Harshdeep Singh Portfolio' },

    // Twitter Cards
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Harshdeep Singh | AI-First Full Stack Developer' },
    {
      name: 'twitter:description',
      content:
        'Check out Harshdeep Singh’s work on DevVizr and other AI-powered full stack projects.',
    },
    { name: 'twitter:image', content: 'https://harshdeepstudio.com/images/preview.png' },
    { name: 'twitter:site', content: '@_sardarG_' }, // Optional if you have a Twitter account
    { name: 'twitter:creator', content: '@_sardarG_' },

    // Mobile/Web App Settings
    { name: 'theme-color', content: '#0a192f' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'Harshdeep Portfolio' },
  ],
})

const showGrid = ref(true)

const showIntro = ref(true)

const handleAnimationComplete = () => {
  showIntro.value = false
}

// Enable/disable scrolling based on intro state
watch(showIntro, (val) => {
  document.body.style.overflow = val ? 'hidden' : 'auto'
})

onMounted(() => {
  document.body.style.overflow = showIntro.value ? 'hidden' : 'auto'
})
</script>

<style>
@import '@/assets/fonts/font.css';

/* RESET + BASE */
body,
html {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  scroll-behavior: smooth;
  height: 100%;
}

/* WRAPPER */
#app {
  width: 100%;
  min-height: 100vh;
  overflow: visible;
  z-index: 0;
}

.page-wrapper {
  width: 100%;
  min-height: 100vh;
  overflow: visible;
}

/* TOOLBAR should stay at the top */
.page-wrapper > .toolbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* SCROLLABLE SECTIONS */
.scroll-container {
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  min-height: 100vh;
}

/* INDIVIDUAL SECTION STYLING */
.parallax-section {
  position: relative;
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  color: white;
  padding: 2rem;
}

/* Make sure sections stack vertically and allow scrolling on mobile */
@media (max-width: 600px) {
  .scroll-container {
    scroll-snap-type: none;
    overflow-y: auto;
    min-height: 100vh;
  }
  .parallax-section {
    min-height: 100vh;
    padding: 1rem 0.5rem;
    background-attachment: scroll;
    flex-direction: column;
  }
}
</style>
