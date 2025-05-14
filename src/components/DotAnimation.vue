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
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Hello World',
  },
  radius: {
    type: Number,
    default: 150, // Smaller default radius
  },
  fontSize: {
    type: Number,
    default: 40, // Smaller font size for tighter radius
  },
  rotationSpeed: {
    type: Number,
    default: 10, // Seconds per full rotation
  },
  show: {
    type: Boolean,
    default: true,
  },
})

// Calculate how many characters to display (minimum 10 for good distribution)
const displayedText = computed(() => {
  const minLength = 10
  if (props.text.length >= minLength) {
    return props.text.split('')
  }
  // Pad with spaces if text is shorter than minLength
  return (props.text + ' '.repeat(minLength - props.text.length)).split('')
})

const containerStyles = computed(() => ({
  height: `${props.radius * 2 + 100}px`, // Container sized to circle
  opacity: props.show ? 1 : 0,
  width: `${props.radius * 2 + 100}px`,
}))

// Generate dynamic styles for each character
const getCharStyle = (index) => {
  const angle = (360 / displayedText.value.length) * index
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
    animation: `spin${index + 1} ${props.rotationSpeed}s linear infinite`,
  }
}

// Generate dynamic keyframes
const generateKeyframes = () => {
  let styleTag = document.getElementById('circular-text-keyframes')
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = 'circular-text-keyframes'
    document.head.appendChild(styleTag)
  }

  let keyframes = ''
  displayedText.value.forEach((_, index) => {
    const angle = (360 / displayedText.value.length) * index
    keyframes += `
      @keyframes spin${index + 1} {
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

// Generate keyframes when component mounts or props change
generateKeyframes()
</script>

<style scoped lang="scss">
:deep(.grid-background) {
  z-index: 1;
}

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
