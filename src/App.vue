<template>
  <div id="app">
    <TransitionIntro
      v-if="showIntro"
      bgColor="#121212"
      duration="2000"
      @animation-complete="handleAnimationComplete"
    />

    <div v-if="!showIntro">
      <ToolBar />
      <HomeView />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ToolBar from './components/ToolBar.vue'
import HomeView from './views/HomeView.vue'
import TransitionIntro from './components/TransitionIntro.vue'

const showIntro = ref(true)

const handleAnimationComplete = () => {
  showIntro.value = false
}
</script>

<style>
@import '@/assets/fonts/font.css';

/* Optional: prevent scrolling during intro */
body {
  overflow: hidden;
}

body.intro-complete {
  overflow: auto;
}
</style>
