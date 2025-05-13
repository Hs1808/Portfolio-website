<template>
  <div id="app">
    <GridBackground :is-dark-mode="isDarkMode" />
    <ToolBar />
    <HomeView/>
  </div>
</template>

<script setup>
import ToolBar from './components/ToolBar.vue';
import GridBackground from './components/GridBackground.vue';
import HomeView from './views/HomeView.vue';

</script>
<style>
@import '@/assets/fonts/font.css';

</style>