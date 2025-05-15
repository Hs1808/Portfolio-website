<template>
  <div
    class="terminal-container"
    :style="containerStyle"
    ref="terminalContainer"
    @mousedown="startDrag"
  >
    <div class="terminal-glass" :style="glassStyle">
      <!-- Terminal Header -->
      <div class="terminal-header" :class="{ 'no-buttons': !showButtons }">
        <div class="terminal-buttons" v-if="showButtons">
          <div class="terminal-btn close"></div>
          <div class="terminal-btn minimize"></div>
          <div class="terminal-btn maximize"></div>
        </div>
        <div class="terminal-title">{{ title }}</div>
      </div>

      <!-- Terminal Content -->
      <div class="terminal-content">
        <div
          v-for="(line, index) in lines"
          :key="index"
          class="terminal-line"
          :class="{ output: line.type === 'output' }"
        >
          <span v-if="line.prompt" class="prompt">{{ line.prompt }}</span>
          <span v-if="line.command" class="command">{{ line.command }}</span>
          <template v-if="line.text">
            <span v-if="line.keyword" class="keyword">{{ line.keyword }}</span>
            <span v-if="line.package" class="package">{{ line.package }}</span>
            <span v-if="line.highlight" class="highlight">{{ line.highlight }}</span>
            <span v-if="line.success" class="success">{{ line.success }}</span>
            <span v-else>{{ line.text }}</span>
          </template>
          <span v-if="line.glow" class="glow">
            <span v-if="line.keyword" class="keyword">{{ line.keyword }}</span>
            <span v-if="line.success" class="success">{{ line.success }}</span>
            <span v-if="line.highlight" class="highlight">{{ line.highlight }}</span>
          </span>
        </div>
        <div class="cursor">_</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '800px',
  },
  height: {
    type: String,
    default: '400px',
  },
  blurStrength: {
    type: Number,
    default: 10,
  },
  glassOpacity: {
    type: Number,
    default: 0.2,
  },
  title: {
    type: String,
    default: 'bash — zsh',
  },
  showButtons: {
    type: Boolean,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  initialX: {
    type: [String, Number],
    default: '50vw',
  },
  initialY: {
    type: [String, Number],
    default: '50vh',
  },
  lines: {
    type: Array,
    default: () => [
      {
        prompt: '~$',
        command: 'npm init portfolio',
        type: 'command',
      },
      {
        text: 'Creating a new developer portfolio in /users/you/portfolio...',
        keyword: 'Creating',
        type: 'output',
      },
      {
        text: 'Installing packages: react@18, threejs, gsap',
        keyword: 'Installing',
        package: 'react@18, threejs, gsap',
        type: 'output',
      },
      {
        prompt: '~$',
        command: 'npm run dev',
        type: 'command',
      },
      {
        keyword: '> ',
        success: 'Portfolio running at',
        highlight: 'https://localhost:3000',
        glow: true,
        type: 'output',
      },
    ],
  },
})

const terminalContainer = ref(null)
const isDragging = ref(false)
const startPos = ref({ x: 0, y: 0 })
const currentPos = ref({
  x: typeof props.initialX === 'number' ? `${props.initialX}px` : props.initialX,
  y: typeof props.initialY === 'number' ? `${props.initialY}px` : props.initialY,
})

const startDrag = (e) => {
  if (!props.draggable || e.target.closest('.terminal-content')) return

  isDragging.value = true

  // Get the actual pixel position of the terminal
  const rect = terminalContainer.value.getBoundingClientRect()
  startPos.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }

  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
  terminalContainer.value.style.cursor = 'grabbing'
}

const handleDrag = (e) => {
  if (!isDragging.value) return

  currentPos.value = {
    x: `${e.clientX - startPos.value.x}px`,
    y: `${e.clientY - startPos.value.y}px`,
  }

  terminalContainer.value.style.left = currentPos.value.x
  terminalContainer.value.style.top = currentPos.value.y
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  terminalContainer.value.style.cursor = props.draggable ? 'grab' : 'default'
}

const containerStyle = computed(() => ({
  width: props.width,
  height: props.height,
  position: 'fixed',
  left: currentPos.value.x,
  top: currentPos.value.y,
  cursor: props.draggable ? 'grab' : 'default',
  zIndex: 1000,
  userSelect: 'none',
  transform: 'none', // Remove transform to prevent teleporting
}))

const glassStyle = computed(() => ({
  '--blur-strength': `${props.blurStrength}px`,
  '--glass-opacity': props.glassOpacity,
}))

onMounted(() => {
  // Initialize position
  if (terminalContainer.value) {
    terminalContainer.value.style.left = currentPos.value.x
    terminalContainer.value.style.top = currentPos.value.y
  }
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
/* Base Styles */
.terminal-container {
  position: fixed;
  margin: 0;
  perspective: 1000px;
}

.terminal-glass {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(20, 25, 35, var(--glass-opacity));
  backdrop-filter: blur(var(--blur-strength));
  -webkit-backdrop-filter: blur(var(--blur-strength));
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(125, 227, 255, 0.05);
  overflow: hidden;
  transform-style: preserve-3d;
}

/* Header Styles */
.terminal-header.no-buttons .terminal-title {
  margin-left: 0;
  padding-left: 16px;
}

.terminal-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(15, 20, 30, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: move;
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.terminal-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.close {
  background: #ff5f56;
  box-shadow: 0 0 4px #ff5f56;
}

.minimize {
  background: #ffbd2e;
  box-shadow: 0 0 4px #ffbd2e;
}

.maximize {
  background: #27c93f;
  box-shadow: 0 0 4px #27c93f;
}

.terminal-title {
  margin-left: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.5px;
}

/* Content Styles */
.terminal-content {
  padding: 20px;
  font-family: 'orbitron', 'Fira Code', monospace;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  cursor: text;
}

.terminal-line {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.terminal-line.output {
  margin-left: 40px;
}

.prompt {
  color: #4ff0b7;
  margin-right: 12px;
  font-weight: 500;
}

.command {
  color: #ffffff;
}

.keyword {
  color: #0cdcf7;
  font-weight: 500;
}

.package {
  color: #ff8b39;
}

.highlight {
  color: #7df3ff;
  text-shadow: 0 0 8px rgba(125, 243, 255, 0.3);
}

.success {
  color: #4ff0b7;
}

.glow {
  animation: pulse 3s infinite alternate;
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background: rgba(125, 243, 255, 0.8);
  animation: blink 1s infinite;
}

/* Animations */
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}

/* Glass Reflection Effect */
.terminal-glass::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(30deg);
  pointer-events: none;
}
</style>

<style>
/* Global font imports */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500&display=swap');
</style>
