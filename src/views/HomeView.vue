<template>
  <div class="home-view" :class="{ dark: isDarkMode }">
    <!-- Background elements -->
    <GridBackground v-if="showGrid" :is-dark-mode="isDarkMode" />

    <!-- Content container with intersection observer -->
    <div class="content-container" ref="contentContainer">
      <!-- Hello text with dynamic contrast class -->
      <div class="hello-text" :class="{ 'high-contrast': needsContrast }" ref="helloText">
        <TypewriterEffect
          :text="['Hello', 'Hola', 'Bonjour', 'Ciao', 'Namaste', 'Sat Sri Akal']"
          :typingSpeed="100"
          :deletingSpeed="75"
          :pauseDuration="1500"
          class="typewriter-hello"
        />
      </div>

      <!-- Left-side intro block -->
      <div class="left-intro">
        <div class="left-intro-title">
          Full-Stack & <br />
          data Engineer
        </div>
        <div class="left-intro-sub">Code × Cognition × Future Systems</div>

        <div class="left-intro-quote">
          <TerminalCard
            class="terminal-card"
            title="mission-statement — txt"
            :lines="[
              { text: '▍', type: 'output', keyword: 'Mission' },
              {
                text: 'Designing intelligent full-stack systems with AI &  dynamic data to turn bold ideas into working realities.',
                type: 'output',
              },
            ]"
            width="380px"
            height="200px"
            :glassOpacity="-0.5"
            :blurStrength="0"
            :showButtons="false"
          />
        </div>
      </div>

      <!-- Profile image with intersection detection -->
      <div class="image-wrapper" ref="imageWrapper">
        <Image
          :src="profileImage"
          alt="Harshdeep Singh"
          imageClass="profile-image"
          @load="handleImageLoad"
        />
      </div>
      <div class="dot-animation">
        <DotAnimation text="Learn More . Click Here . " radius="60" font-size="12" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import GridBackground from '@/components/GridBackground.vue'
import Image from 'primevue/image'
import TypewriterEffect from '@/components/TypewriterEffect.vue'
import DotAnimation from '@/components/DotAnimation.vue'
import TerminalCard from '@/components/TerminalCard.vue'

const isDarkMode = ref(false)
const showGrid = ref(true)
const profileImage = ref(new URL('@/assets/homeImage.png', import.meta.url).href)
const needsContrast = ref(false)
const contentContainer = ref(null)
const imageWrapper = ref(null)
const helloText = ref(null)

// Check contrast against image
const checkContrast = () => {
  if (!contentContainer.value || !imageWrapper.value || !helloText.value) return

  const imageRect = imageWrapper.value.getBoundingClientRect()
  const textRect = helloText.value.getBoundingClientRect()

  // Check if text overlaps with image (with 20px buffer)
  needsContrast.value = textRect.bottom + 20 > imageRect.top
}

// Handle image load to ensure proper measurements
const handleImageLoad = () => {
  checkContrast()
}

// Handle scroll/resize events
const handleScrollResize = () => {
  checkContrast()
}

onMounted(() => {
  window.addEventListener('scroll', handleScrollResize)
  window.addEventListener('resize', handleScrollResize)

  // Initial check after slight delay to ensure all elements are rendered
  setTimeout(checkContrast, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollResize)
  window.removeEventListener('resize', handleScrollResize)
})
</script>

<style scoped>
.home-view {
  font-family:
    'orbitron',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Arial,
    sans-serif;
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  pointer-events: auto;
}

.content-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%) scale(0.9);
  transform-origin: center bottom;
  width: min(37.8%, 378px);
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 2;
  pointer-events: none;
}
.dot-animation {
  position: absolute;
  right: -5%;
  top: 82%;
  transform: translateY(-50%) scale(0.9);
  transform-origin: center bottom;
  width: min(37.8%, 378px);
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
  pointer-events: none;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  transition: transform 0.3s ease;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Rest of your styles remain unchanged */
.hello-text {
  font-family: '911porschav3-3d', sans-serif;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  color: var(--primary-color);
  z-index: 3;
  margin: 0;
  text-shadow: 0 0 20px rgba(100, 181, 246, 0.5);
  transition: all 0.3s ease;
  mix-blend-mode: normal;
  pointer-events: none;
  text-align: center;
}

.typewriter-hello {
  display: inline-block;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  text-shadow: inherit;
}

.typewriter-hello .blinking-cursor {
  animation: blink 1s step-end infinite;
  margin-left: 2px;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.hello-text.high-contrast {
  color: white;
  text-shadow:
    0 0 10px rgba(100, 181, 246, 0.5),
    0 0 20px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(0, 0, 0, 0.4);
  mix-blend-mode: difference;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.3);
}

.hello-text.high-contrast .typewriter-hello {
  color: inherit;
  text-shadow: inherit;
}

@keyframes blink {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.left-intro {
  position: absolute;
  top: 50%;
  left: 2.5%;
  transform: translateY(-50%);
  max-width: 550px;
  z-index: 3;
  pointer-events: none;
  line-height: 1.2;
  text-shadow:
    0 0 8px rgba(100, 181, 246, 0.5),
    0 0 16px rgba(100, 181, 246, 0.25);
  transition: text-shadow 0.3s ease;
}

.left-intro-title {
  font-family: 'orbitron', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: var(--primary-color);
  margin: 0 0 10px 0;
  font-weight: 600;
}

.left-intro-sub {
  font-size: clamp(1rem, 3vw, 1.2rem);
  color: var(--text-color);
  margin: 0 0 20rem 0;
}

.left-intro-quote {
  color: var(--text-color);
  margin: 0;
  padding-top: 10px;
  padding-left: 0.5rem;
  line-height: 1.1;
  display: inline-block;
}
.terminal-card .terminal-title {
  margin-left: 0;
}
@media (max-width: 768px) {
  .hello-text {
    top: 52%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: clamp(2.5rem, 8vw, 2.5rem);
  }
  .hello-text.high-contrast {
    text-shadow: 0 0 15px rgba(0, 0, 0, 0.9);
  }

  .left-intro {
    position: static;
    max-width: 100%;
    transform: none;
    padding: 0 1rem;
  }

  .left-intro-title {
    font-size: clamp(1.2rem, 4vw, 2rem);
  }

  .left-intro-sub {
    font-size: clamp(0.8rem, 3vw, 1.2rem);
  }

  .left-intro-quote {
    font-size: clamp(0.8rem, 3vw, 1rem);
  }
}
</style>
