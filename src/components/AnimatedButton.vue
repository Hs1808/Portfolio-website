<template>
  <a
    :href="url"
    class="animated-btn"
    target="_blank"
    rel="noopener noreferrer"
    @click="handleClick"
  >
    <slot />
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </a>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  url: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['clicked'])

const handleClick = (event) => {
  emit('clicked')
}
</script>

<style scoped>
.animated-btn {
  position: relative;
  display: inline-block;
  padding: 18px 40px;
  color: #fbfbfb;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 1.2rem;
  font-weight: 600;
  background: transparent;
  border: none;
  box-shadow: 0 8px 24px rgba(99, 140, 173, 0.33);
  overflow: hidden;
  transition: color 0.2s;
  cursor: pointer;
  margin: 0 auto;
  z-index: 1;
  text-decoration: none;
}

.animated-btn::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  width: 50%;
  background: rgba(255, 255, 255, 0.05);
  pointer-events: none;
  z-index: 2;
}

.animated-btn span:nth-child(1) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #0c002b, rgb(213, 253, 255));
  animation: animate1 2s linear infinite;
  animation-delay: 1s;
  z-index: 3;
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

.animated-btn span:nth-child(4) {
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to top, #0c002b, rgb(213, 253, 255));
  animation: animate4 2s linear infinite;
  animation-delay: 2s;
  z-index: 3;
}

@keyframes animate1 {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes animate2 {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
@keyframes animate3 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes animate4 {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}

.animated-btn:hover {
  color: #ffffff;
  text-shadow:
    #7df3ff 0 0 10px,
    #7df2ff80 0 0 20px,
    #7df2ff4e 0 0 30px;
}
</style>
