<template>
  <div class="container" :style="containerStyles">
    <span
      v-for="(char, index) in displayedText"
      :key="index"
      :class="`ch${index + 1}`"
      :style="getCharStyle(index)"
    >
      {{ char }}
    </span>
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Hello World',
  },
  radius: {
    type: Number,
    default: 150,
  },
  fontSize: {
    type: Number,
    default: 40,
  },
  rotationSpeed: {
    type: Number,
    default: 10,
  },
  show: {
    type: Boolean,
    default: true,
  },
  id: {
    type: String,
    default: 'dot', // Unique identifier for namespacing keyframes
  },
})

const displayedText = computed(() => {
  const minLength = 10
  if (props.text.length >= minLength) {
    return props.text.split('')
  }
  return (props.text + ' '.repeat(minLength - props.text.length)).split('')
})

const containerStyles = computed(() => ({
  height: `${props.radius * 2 + 100}px`,
  width: `${props.radius * 2 + 100}px`,
  opacity: props.show ? 1 : 0,
}))

const getCharStyle = (index) => {
  const angle = (360 / displayedText.value.length) * index
  const animName = `spin-${props.id}-${index + 1}`
  return {
    fontSize: `${props.fontSize}px`,
    fontFamily: 'Dusseldot',
    textShadow: '-5px 6px 13px rgb(199, 238, 255)',
    color: '#ffffff',
    width: '80px',
    height: `${props.radius}px`,
    position: 'absolute',
    transformOrigin: 'bottom center',
    textAlign: 'center',
    fontWeight: 500,
    transform: `rotate(${angle}deg)`,
    animation: `${animName} ${props.rotationSpeed}s linear infinite`,
  }
}

const generateKeyframes = () => {
  const styleId = `circular-text-keyframes-${props.id}`
  let styleTag = document.getElementById(styleId)

  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = styleId
    document.head.appendChild(styleTag)
  }

  let keyframes = ''
  displayedText.value.forEach((_, index) => {
    const angle = (360 / displayedText.value.length) * index
    const animName = `spin-${props.id}-${index + 1}`
    keyframes += `
      @keyframes ${animName} {
        0% {
          transform: rotate(${angle}deg);
          font-variation-settings: 'wdth' 50;
        }
        20% {
          font-variation-settings: 'wdth' 145;
        }
        30% {
          font-variation-settings: 'wdth' 155;
        }
        50% {
          font-variation-settings: 'wdth' 250;
        }
        70% {
          font-variation-settings: 'wdth' 155;
        }
        80% {
          font-variation-settings: 'wdth' 145;
        }
        100% {
          transform: rotate(${angle + 360}deg);
          font-variation-settings: 'wdth' 50;
        }
      }
    `
  })

  styleTag.innerHTML = keyframes
}

watchEffect(() => {
  generateKeyframes()
})
</script>

<style scoped lang="scss">
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: 1;
  overflow: visible;
  transition: opacity 0.3s ease;
}

@import url('https://fonts.googleapis.com/css?family=Lato:400,400i,700');
@font-face {
  font-family: 'Dusseldot';
  src:
    url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/108082/Dusseldot-variable-web.woff2')
      format('woff2 supports variations'),
    url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/108082/Dusseldot-variable-web.woff2')
      format('woff2-variations');
  font-display: swap;
  font-weight: 50 500;
}
</style>
