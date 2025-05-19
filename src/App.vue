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
import { ref, watch, onMounted } from 'vue'
import ToolBar from './components/ToolBar.vue'
import HomeView from './views/HomeView.vue'
import TransitionIntro from './components/TransitionIntro.vue'

const showIntro = ref(true)

const handleAnimationComplete = () => {
  showIntro.value = false
}

// Ensure scrolling is enabled after intro
watch(showIntro, (val) => {
  if (!val) {
    document.body.style.overflow = 'auto'
  } else {
    document.body.style.overflow = 'hidden'
  }
})

// Also set initial state on mount
onMounted(() => {
  document.body.style.overflow = showIntro.value ? 'hidden' : 'auto'
})
</script>

<style>
@import '@/assets/fonts/font.css';
</style>
