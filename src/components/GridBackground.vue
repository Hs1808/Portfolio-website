<template>
  <div class="grid-background-container" @mousemove="handleMouseMove" @mouseleave="clearHighlights">
    <!-- Base grid -->
    <div class="base-grid" />

    <!-- Persistent highlighted squares -->
    <div
      v-for="(square, index) in highlightedSquares"
      :key="index"
      class="highlight-square"
      :style="{
        left: `${square.x}px`,
        top: `${square.y}px`,
        opacity: square.opacity,
      }"
    />

    <!-- Current hover effect -->
    <div
      class="hover-effect"
      :style="{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Configuration
const GRID_SIZE = 40
const HIGHLIGHT_DURATION = 2000 // ms
const HIGHLIGHT_CHANCE = 0.4 // 40% chance to leave a highlight
const FADE_SPEED = 0.03 // How fast highlights fade

// State
const mousePosition = ref({ x: -100, y: -100 })
const highlightedSquares = ref<
  Array<{
    x: number
    y: number
    opacity: number
  }>
>([])
let animationFrameId: number

function handleMouseMove(e: MouseEvent) {
  // Update mouse position
  mousePosition.value = { x: e.clientX, y: e.clientY }

  // Occasionally leave a persistent highlight
  if (Math.random() < HIGHLIGHT_CHANCE) {
    const gridX = Math.floor(e.clientX / GRID_SIZE) * GRID_SIZE
    const gridY = Math.floor(e.clientY / GRID_SIZE) * GRID_SIZE

    // Check if this grid cell is already highlighted
    const exists = highlightedSquares.value.some((s) => s.x === gridX && s.y === gridY)

    if (!exists) {
      highlightedSquares.value.push({
        x: gridX,
        y: gridY,
        opacity: 0.7,
      })
    }
  }
}

function clearHighlights() {
  highlightedSquares.value = []
}

function animate() {
  // Fade out all highlights
  highlightedSquares.value = highlightedSquares.value
    .map((square) => ({
      ...square,
      opacity: square.opacity - FADE_SPEED,
    }))
    .filter((square) => square.opacity > 0.05)

  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  animationFrameId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>
.grid-background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 1;
  overflow: hidden;
}

.base-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: v-bind('GRID_SIZE + "px"') v-bind('GRID_SIZE + "px"');
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  pointer-events: none;
}

.highlight-square {
  position: absolute;
  width: v-bind('GRID_SIZE + "px"');
  height: v-bind('GRID_SIZE + "px"');
  background-color: rgba(255, 255, 255, 0.053);
  border: 1px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
  transition: opacity 0.2s ease-out;
}

.hover-effect {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: v-bind('GRID_SIZE + "px"') v-bind('GRID_SIZE + "px"');
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
  -webkit-mask-image: radial-gradient(
    circle 120px at var(--mouse-x) var(--mouse-y),
    white 0%,
    transparent 70%
  );
  mask-image: radial-gradient(
    circle 120px at var(--mouse-x) var(--mouse-y),
    white 0%,
    transparent 70%
  );
  pointer-events: none;
  transition: opacity 0.2s ease-out;
}
</style>
