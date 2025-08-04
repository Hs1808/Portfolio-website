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
const showGrid = ref(true)

const showIntro = ref(false)

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
  font-family: 'YourCustomFont', sans-serif;
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
