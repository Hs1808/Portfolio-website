<template>
  <div class="home-view" :class="{ dark: isDarkMode }">
    <!-- Background elements -->
    <GridBackground v-if="showGrid" :is-dark-mode="isDarkMode" />

    <!-- Content container with intersection observer -->
    <div class="content-container" ref="contentContainer">
      <!-- Hello text with dynamic contrast class -->
      <!-- <div class="hello-text" :class="{ 'high-contrast': needsContrast }" ref="helloText">
        <TypewriterEffect
          :text="['Hello', 'Hola', 'Bonjour', 'Ciao', 'Namaste', 'Sat Sri Akal']"
          :typingSpeed="100"
          :deletingSpeed="75"
          :pauseDuration="1500"
          class="typewriter-hello"
        />
      </div> -->

      <!-- Left-side intro block with transitions -->
      <div class="left-intro">
        <div class="left-intro-title">
          <TransitionGroup name="slide-left" tag="span" appear>
            <span
              v-for="(char, index) in titleChars"
              :key="index"
              class="char"
              :style="{ transitionDelay: `${index * 0.05}s` }"
            >
              {{ char === ' ' ? '\u00A0' : char }}
            </span>
          </TransitionGroup>
          <br />
          <TransitionGroup name="slide-left" tag="span" appear>
            <span
              v-for="(char, index) in subtitleChars"
              :key="`sub-${index}`"
              class="char"
              :style="{ transitionDelay: `${(titleChars.length + index) * 0.03}s` }"
            >
              {{ char === ' ' ? '\u00A0' : char }}
            </span>
          </TransitionGroup>
        </div>
        <div class="left-intro-sub">
          <TransitionGroup name="slide-left" tag="span" appear>
            <span
              v-for="(char, index) in taglineChars"
              :key="`tag-${index}`"
              class="char"
              :style="{
                transitionDelay: `${(titleChars.length + subtitleChars.length + index) * 0.03 + 0.2}s`,
              }"
            >
              {{ char === ' ' ? '\u00A0' : char }}
            </span>
          </TransitionGroup>
          <div class="CTA-button">
            <a href="#contact" class="animated-btn">
              Hire Me!
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </div>
      </div>

      <div class="terminal-container">
        <TerminalCard
          class="terminal-card"
          title="mission-statement — txt"
          :lines="[
            { text: '▍', type: 'output', keyword: 'Mission' },
            {
              text: '“I design intelligent, AI-powered full-stack systems that transform bold business ideas into real-world products — fast.”',
              type: 'output',
            },
          ]"
          width="380px"
          height="200px"
          :glassOpacity="-0.5"
          :blurStrength="0"
          :showButtons="false"
          :initialX="'8%'"
          :initialY="'50%'"
          animation-delay="3s"
        />
      </div>

      <!-- Profile image with intersection detection -->
      <div class="image-wrapper" ref="imageWrapper">
        <transition name="fade-bottom">
          <Image
            v-show="showImage"
            :src="profileImage"
            alt="Harshdeep Singh"
            imageClass="profile-image"
            @load="handleImageLoad"
          />
        </transition>
        <div class="hello-text" :class="{ 'high-contrast': needsContrast }" ref="helloText">
          <TypewriterEffect
            :text="['Hello', 'Hola', 'Bonjour', 'Ciao', 'Namaste', 'Sat Sri Akal']"
            :typingSpeed="100"
            :deletingSpeed="75"
            :pauseDuration="1500"
            class="typewriter-hello"
          />
        </div>
      </div>

      <div class="terminal-container">
        <TerminalCard
          class="terminal-card"
          title="achievements — txt"
          :lines="[
            { text: '▍', type: 'output', keyword: 'Achievements' },
            {
              prompt: '>>>',
              text: '  👨‍💻 Founder & CEO @ DevVizr ',

              links: [
                {
                  text: 'DevVizr ',
                  url: 'https://devvizr.com',
                },
              ],
              type: 'command',
              glow: true,
            },
            {
              prompt: '>>>',
              text: '🛠️ 20+ Projects Delivered',
              type: 'command',
            },
            {
              prompt: '>>>',
              text: '🌍 5 Countries Worked In',
              type: 'command',
            },
            {
              prompt: '>>>',
              text: '⚡Fast MVP Turnaround: < 2 weeks',
              type: 'command',
            },
          ]"
          width="400px"
          height="230px"
          :glassOpacity="-1.5"
          :blurStrength="0"
          :showButtons="true"
          :initialX="'71%'"
          :initialY="'27%'"
          animation-delay="2.3s"
        />
      </div>

      <div class="dot-animation">
        <DotAnimation text="Learn More . Click Here . " radius="60" font-size="12" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import GridBackground from '@/components/GridBackground.vue'
import Image from 'primevue/image'
import TypewriterEffect from '@/components/TypewriterEffect.vue'
import DotAnimation from '@/components/DotAnimation.vue'
import TerminalCard from '@/components/TerminalCard.vue'
import Button from 'primevue/button';


const isDarkMode = true
const showGrid = ref(true)
const profileImage = ref(new URL('@/assets/homeImage.png', import.meta.url).href)
const needsContrast = ref(false)
const contentContainer = ref(null)
const imageWrapper = ref(null)
const helloText = ref(null)
const showImage = ref(false)

// Animation control refs
const showHelloText = ref(false)
const showIntroText = ref(false)
const showMissionTerminal = ref(false)
const showAchievementsTerminal = ref(false)
const showDotAnimation = ref(false)

// Intersection observer for mobile animation trigger
let observer = null
const isMobile = window.matchMedia('(max-width: 600px)').matches

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('hello-text')) showHelloText.value = true
      if (entry.target.classList.contains('left-intro')) showIntroText.value = true
      if (entry.target.classList.contains('mission-terminal')) showMissionTerminal.value = true
      if (entry.target.classList.contains('achievements-terminal'))
        showAchievementsTerminal.value = true
      if (entry.target.classList.contains('dot-animation')) showDotAnimation.value = true
    }
  })
}

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
  setTimeout(checkContrast, 400)
  setTimeout(() => {
    showImage.value = true
  }, 300)

  if (isMobile && typeof window.IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    })
    const targets = [
      helloText.value,
      document.querySelector('.left-intro'),
      document.querySelector('.mission-terminal'),
      document.querySelector('.achievements-terminal'),
      document.querySelector('.dot-animation'),
    ]
    targets.forEach((el) => el && observer.observe(el))
  } else {
    // Desktop: show all as before
    setTimeout(() => (showHelloText.value = true), 300)
    setTimeout(() => (showIntroText.value = true), 800)
    setTimeout(() => (showMissionTerminal.value = true), 1600)
    setTimeout(() => (showAchievementsTerminal.value = true), 2000)
    setTimeout(() => (showDotAnimation.value = true), 2400)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollResize)
  window.removeEventListener('resize', handleScrollResize)
  if (observer) observer.disconnect()
})

// Add these computed properties for the split text
const titleText = 'Full-Stack &'
const subtitleText = 'data Engineer'
const taglineText = 'Code × Cognition × Future Systems'

const titleChars = computed(() => titleText.split(''))
const subtitleChars = computed(() => subtitleText.split(''))
const taglineChars = computed(() => taglineText.split(''))
</script>

<style scoped>
.fade-bottom-enter-active,
.fade-bottom-leave-active {
  transition: all 0.8s ease;
}

.fade-bottom-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-bottom-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* If you want the image to fade out when leaving (optional) */
.fade-bottom-leave-from {
  opacity: 1;
}

.fade-bottom-leave-to {
  opacity: 0;
}

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
  flex: 1;
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

    /* 13-inch screen optimization (2560x1600) */
  @media (min-width: 1440px) and (max-width: 1600px) {
    width: clamp(220px, 30%, 300px);
      transform: translateX(-50%) scale(0.7);

  }

  /* 13-inch (1920x1200) */
  @media (min-width: 1200px) and (max-width: 1440px) {
    width: clamp(200px, 28%, 280px);
    transform: translateX(-50%) scale(0.7);

  }

  
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
  top: -4%;
  left: 50%;
  width: 150%;
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
.terminal-link {
  color: #7df3ff;
  text-decoration: underline;
  cursor: pointer;
  text-shadow: 0 0 8px rgba(125, 243, 255, 0.3);
}

.terminal-link:hover {
  color: #4ff0b7;
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
/* Right panel */
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

.RightPanel {
  position: absolute;
  right: 5%;
  top: 35%;
  transform: translateY(-50%) scale(0.9);
  transform-origin: center bottom;
  width: min(37.8%, 378px);
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
  pointer-events: inherit;
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
  top: 25%;
  left: 2.5%;
  transform: translateY(-50%);
  max-width: 550px;
  z-index: 1;
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
  margin: 0 0 0 0;
}
.CTA-button{
  margin-top: 1rem;
  width: 100%;
  pointer-events: all;
  
}
.left-intro-quote {
  pointer-events: all;
}
.terminal-container {
  z-index: 1;
  transform: none !important;
  pointer-events: all;
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

@media (max-width: 600px) {
  .content-container {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    height: auto;
    min-height: 100vh;
    padding: 10rem 0 2rem 0;
    gap: 1.2rem;
    display: flex;
  }

  .image-wrapper {
    position: relative;
    width: 80vw;
    max-width: 220px;
    margin: 1.2rem auto 0.5rem auto;
    border-radius: 0.7rem;
    left: unset;
    bottom: unset;
    transform: none;
    z-index: 2;
    order: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hello-text {
    position: absolute;
    top: 42%;
    left: 54%;
    transform: translate(-50%, -50%);
    font-size: clamp(1.2rem, 7vw, 2rem);
    padding: 0 0.5rem;
    text-align: center;
    width: 90%;
    margin: 0;
    z-index: 3;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 0.5rem;
    pointer-events: none;
  }

  .left-intro {
    order: 1;
    position: static;
    max-width: 100%;
    transform: none;
    padding: 0 0.5rem;
    margin-bottom: 1.2rem;
    text-align: left;
  }

  .terminal-container {
    order: 3;
    position: static !important;
    width: 98vw !important;
    max-width: 100vw !important;
    margin: 1rem auto;
    left: unset !important;
    top: unset !important;
    transform: none !important;
    min-width: unset !important;
    min-height: unset !important;
  }

  .dot-animation {
    order: 4;
    width: 95vw;
    max-width: 220px;
    bottom: 1%;
    left: 0;
    right: 0;
    margin: 0 auto;
    transform: none;
    position: static;
  }
}

.left-intro-title,
.left-intro-sub {
  display: inline-block;
  overflow: hidden;
}

.char {
  display: inline-block;
  position: relative;
  white-space: pre;
}

.slide-left-enter-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-30px) skewX(15deg);
}

.slide-left-enter-to {
  opacity: 1;
  transform: translateX(0) skewX(0deg);
}

/* Ensure line breaks are preserved */
.left-intro-title {
  white-space: pre-line;
}

.animated-btn {
  position: relative;
  display: inline-block;
  padding: 18px 40px;
  color: rgb(251, 251, 251);
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 3px;
  font-size: 1.2rem;
  font-weight: 600;
  background: transparent;
  border: none;
  box-shadow: 0 8px 24px rgba(0,0,0,.25);
  overflow: hidden;
  transition: color 0.2s;
  cursor: pointer;
  margin: 0 auto;
  z-index: 1;
}

.animated-btn::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  width: 50%;
  background: rgba(255,255,255,0.05);
  pointer-events: none;
  z-index: 2;
}

.animated-btn span:nth-child(1) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #0c002b,rgb(213, 253, 255));
  animation: animate1 2s linear infinite;
  animation-delay: 1s;
  z-index: 3;
}
@keyframes animate1 {
  0% { transform: translateX(-100%);}
  100% { transform: translateX(100%);}
}

.animated-btn span:nth-child(2) {
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #0c002b, rgb(213, 253, 255));
  animation: animate2 2s linear infinite;
  animation-delay: 2s;
  z-index: 3;
}
@keyframes animate2 {
  0% { transform: translateY(-100%);}
  100% { transform: translateY(100%);}
}

.animated-btn span:nth-child(3) {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to left, #0c002b, rgb(213, 253, 255));
  animation: animate3 2s linear infinite;
  animation-delay: 1s;
  z-index: 3;
}
@keyframes animate3 {
  0% { transform: translateX(100%);}
  100% { transform: translateX(-100%);}
}

.animated-btn span:nth-child(4) {
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to top, #0c002b,rgb(213, 253, 255));
  animation: animate4 2s linear infinite;
  animation-delay: 2s;
  z-index: 3;
}
@keyframes animate4 {
  0% { transform: translateY(100%);}
  100% { transform: translateY(-100%);}
}

.animated-btn:hover,
.animated-btn:focus {
  color: #fff;
  text-shadow: #7df3ff 0 0 10px, #7df2ff80 0 0 20px, #7df2ff4e 0 0 30px;
  transition: background 0.2s, color 0.2s;
}
</style>
