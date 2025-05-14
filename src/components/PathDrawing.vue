<script setup lang="ts">
import { motion } from 'motion-v'
import { ref } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 400,
  },
  strokeWidth: {
    type: Number,
    default: 12,
  },
  color: {
    type: String,
    default: '#0cdcf7',
  },
  glowColor: {
    type: String,
    default: 'rgba(12, 220, 247, 0.5)',
  },
  duration: {
    type: Number,
    default: 1.5,
  },
})

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: props.duration,
        type: 'spring',
        bounce: 0,
      },
      opacity: { duration: 0.1 },
    },
  },
}

// Letter H paths
const hPaths = [
  // Vertical left
  'M 50,100 L 50,300',
  // Vertical right
  'M 150,100 L 150,300',
  // Horizontal
  'M 50,200 L 150,200',
]

// Letter S path (cubic bezier curve)
const sPath = ['M 250,120 C 200,120 200,200 250,200 C 300,200 300,280 250,280']
</script>

<template>
  <div class="letter-container">
    <motion.svg
      :width="size"
      :height="size"
      viewBox="0 0 400 400"
      initial="hidden"
      animate="visible"
    >
      <defs>
        <filter id="glow-effect">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Letter H -->
      <template v-for="(path, index) in hPaths" :key="`h-${index}`">
        <motion.path
          :d="path"
          fill="transparent"
          :stroke="color"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          :variants="draw"
          :style="{ filter: 'url(#glow-effect)' }"
        />
      </template>

      <!-- Letter S -->
      <motion.path
        v-for="(path, index) in sPath"
        :key="`s-${index}`"
        :d="path"
        fill="transparent"
        :stroke="color"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :variants="draw"
        :style="{ filter: 'url(#glow-effect)' }"
        :transition="{
          pathLength: {
            delay: duration * 0.7,
            duration: duration * 1.3,
          },
        }"
      />

      <!-- Glow background effect -->
      <rect
        width="100%"
        height="100%"
        fill="transparent"
        :stroke="glowColor"
        stroke-width="2"
        stroke-dasharray="10 5"
      />
    </motion.svg>
  </div>
</template>

<style scoped>
.letter-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1;
  overflow: visible;
}

svg {
  overflow: visible;
}

path {
  filter: drop-shadow(0 0 8px v-bind(glowColor));
}
:deep(.grid-background) {
  z-index: 1;
}
</style>
