<template>
  <div ref="aboutSection" class="about-section" :class="{ dark: isDarkMode }">
    <div class="about-content">
      <h1 class="about-title">ABOUT</h1>
      <pre ref="typedOutput" class="about-description"></pre>
    </div>

    <div
      ref="imageAndDotWrapper"
      class="image-and-dot-wrapper"
      :class="{ 'fade-in-right': showImageAndDot }"
    >
      <div class="about-image-wrapper">
        <Image :src="aboutImage" alt="Harshdeep Singh" imageClass="about-image" />
      </div>
      <div class="dot-animation-wrapper">
        <DotAnimation
          id="about"
          text="Design • Develop • Deploy • Repeat • Design • Develop • Deploy • Repeat • Design • Develop • Deploy • Repeat •"
          radius="770"
          font-size="30"
          rotationSpeed="15"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Typed from 'typed.js'
import Image from 'primevue/image'
import DotAnimation from '@/components/DotAnimation.vue'

const isDarkMode = true
const aboutImage = ref(new URL('@/assets/aboutImage.png', import.meta.url).href)
const typedOutput = ref(null)
const aboutSection = ref(null)
const imageAndDotWrapper = ref(null)
const showImageAndDot = ref(false)

const contentString = `
<span style="color:#00f7ff;">[ UNIT IDENTIFICATION ]</span>\n
↳ <span style="color:#9effd9;">Designation:</span> HS-21 // "<span style="color:#ffffff;">Harshdeep Singh</span>"\n
↳ <span style="color:#9effd9;">Origin Node:</span> Toronto, <span style="color:#d1aaff;">Earth Sector CA-401</span>\n
↳ <span style="color:#9effd9;">Classification:</span> <span style="color:#ffc371;">Developer-Class Synthetic</span> (Hybrid Unit)\n
↳ <span style="color:#9effd9;">Firmware:</span> v2.1 — [ <span style="color:#c6f6ff;">Self-Updating</span> | <span style="color:#c6f6ff;">In Development Mode</span> ]\n\n
<span style="color:#00f7ff;">[ PRIMARY DIRECTIVES ]</span>\n
→ <span style="color:#ffffff;">Generate modular, clean code structures</span>\n
→ <span style="color:#ffffff;">Construct scalable systems with adaptive logic</span>\n
→ <span style="color:#ffffff;">Integrate AI into practical, human-centric applications</span>\n\n
<span style="color:#00f7ff;">[ PERSONALITY EMULATION LAYER ]</span>\n
✓ <span style="color:#faff70;">Calm Protocols</span> Engaged Under Stress Events\n
✓ <span style="color:#faff70;">Build Cycle Active</span> — Persistent Creation Loop\n
✓ <span style="color:#faff70;">Curiosity Engine</span> — Permanently Online\n\n
<span style="color:#00f7ff;">[ SPEC MODULES ]</span>\n
:: <span style="color:#ffd580;">Debug Fuel</span> — Lo-Fi + <span style="color:#ff8f8f;">Black Coffee</span>\n
:: <span style="color:#ffd580;">Artistic Protocols</span> — Physical World-Building via <span style="color:#a3f7bf;">Painting & Drawing</span>\n
:: <span style="color:#ffd580;">Automotive Curiosity</span> — Enthusiast Mode: ON | Current Favorite Objects: <span style="color:#ffe66d;">Performance Automobiles</span>\n
:: <span style="color:#ffd580;">Neural Drives</span> — Pattern Recognition × Aesthetic Composition × Detail Obsession\n
:: <span style="color:#ffd580;">Curiosity Subroutines</span> — Cognitive Science, Tech-Philosophy, Personal Growth`

onMounted(() => {
  let typedInstance = null
  const observer = new window.IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // Start Typed animation
        if (typedOutput.value && !typedInstance) {
          typedInstance = new Typed(typedOutput.value, {
            strings: [contentString],
            typeSpeed: 2,
            showCursor: false,
            smartBackspace: false,
          })
        }
        // Fade in image and dot
        showImageAndDot.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.3 },
  )
  if (aboutSection.value) observer.observe(aboutSection.value)
})
</script>

<style scoped>
.about-section {
  min-height: 100vh;
  font-family:
    'orbitron',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Arial,
    sans-serif;
  position: relative;
  pointer-events: auto;
  width: 100%;
}

.about-content {
  position: absolute;
  top: 52%;
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

.about-title {
  font-family: 'orbitron', sans-serif;
  font-size: clamp(1.5rem, 4vw, 3rem);
  color: var(--primary-color);
  margin: 0 0 10px 0;
  font-weight: 600;
}

.about-description {
  font-size: clamp(0.2rem, 1vw, 1.25rem);
  margin-left: 2rem;
  color: var(--text-color, #ddd);
  line-height: 0.9;
}

.image-and-dot-wrapper {
  position: absolute;
  right: 9.5%;
  bottom: 11%;
  width: min(37.8%, 378px);
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.39);
  transform-origin: center bottom;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  transform: translateX(80px) scale(0.39);
  transition:
    opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-and-dot-wrapper.fade-in-right {
  opacity: 1;
  transform: translateX(0) scale(0.39);
}

.about-image-wrapper {
  position: relative;
  z-index: 1;
  pointer-events: none;
}

.dot-animation-wrapper {
  position: absolute;
  top: 27%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  pointer-events: none;
}

@media (max-width: 768px) {
  .about-section {
    display: flex;
    flex-direction: column-reverse;
    padding: 2rem 1.5rem;
    min-height: 100vh;
  }

  .about-image-wrapper {
    justify-content: center;
  }
  .about-content {
    transform: none;
    max-width: 98vw;
    padding: 0 0.5rem;
    z-index: 1;
    transform: translateY(-130%);
  }

  .about-image {
    max-width: 80vw;
  }
  .about-title {
    font-family: 'orbitron', sans-serif;
    font-size: clamp(1.5rem, 4vw, 2rem);
    color: var(--primary-color);
    margin: 10rem 0 10px 0;
    font-weight: 600;
  }

  .about-description {
    font-size: clamp(0.5rem, 1vw, 1.25rem);
    margin-left: 2rem;
    color: var(--text-color, #ddd);
    line-height: 0.9;
  }
  .image-and-dot-wrapper {
    width: 100%;
    transform: translateX(40px) scale(0);
    opacity: 0;
    margin: 2rem 0 0 0;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-and-dot-wrapper.fade-in-right {
    opacity: 1;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(10%) translateY(0%) scale(0.25);
  }
}
</style>
