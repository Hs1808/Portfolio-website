<template>
  <div
    class="grid-background-container"
    @mousemove="onMouseMove"
  >
    <div
      class="absolute inset-0 grid-bg"
      :style="gridStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const mouse = ref({ x: -100, y: -100 }); // Initialize off-screen

function onMouseMove(e: MouseEvent) {
  mouse.value = { x: e.clientX, y: e.clientY };
}

const gridStyle = computed(() => ({
  '--mouse-x': `${mouse.value.x}px`,
  '--mouse-y': `${mouse.value.y}px`,
}));
</script>

<style scoped>
.grid-background-container {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 1;
  overflow: hidden;
}

.grid-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-size: 40px 40px;
  background-image:
    /* Base grid always visible */
    linear-gradient(to right, rgba(255, 255, 255, 0.062) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.064) 1px, transparent 1px);
  
  /* Highlight effect using pseudo-element */
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px);
    background-size: 40px 40px;
    -webkit-mask-image: radial-gradient(
      circle 150px at var(--mouse-x, -100px) var(--mouse-y, -100px),
      white 0%,
      transparent 70%
    );
    mask-image: radial-gradient(
      circle 150px at var(--mouse-x, -100px) var(--mouse-y, -100px),
      white 0%,
      transparent 70%
    );
    transition: opacity 0.3s ease;
  }
}
</style>