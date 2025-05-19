<template>
  <transition name="fade-out" @after-leave="$emit('animation-complete')">
    <div class="transition-intro" v-show="isVisible" :style="{ backgroundColor: bgColor }">
      <div class="container">
        <svg
          ref="svgElement"
          width="752.0009765625"
          height="194.00100708007812"
          viewBox="0 0 752.001 194.001"
          xmlns="http://www.w3.org/2000/svg"
          :class="{ active: animationStarted }"
        >
          <g
            id="svgGroup"
            stroke-linecap="round"
            fill-rule="evenodd"
            font-size="9pt"
            stroke="#fafafa"
            stroke-width="0.25mm"
            fill="#d5fdff"
            style="stroke: #fafafa; stroke-width: 0.25mm; fill: #d5fdff"
          >
            <path
              d="M 51.6 71.601 L 51.6 0.001 L 0 0.001 L 0 194.001 L 51.6 194.001 L 51.6 122.001 L 304 122.001 L 304 194.001 L 356 194.001 L 356 0.001 L 304 0.001 L 304 71.601 L 51.6 71.601 Z"
              id="0"
              class="svg-elem-1"
            ></path>
            <path
              d="M 690.4 144.001 L 396 144.001 L 396 194.001 L 708 194.001 Q 716.8 194.001 724.8 191.001 Q 732.8 188.001 738.8 182.201 A 41.891 41.891 0 0 0 746.966 171.059 A 49.544 49.544 0 0 0 748.4 168.001 A 43.909 43.909 0 0 0 751.472 156.718 A 57.303 57.303 0 0 0 752 148.801 L 752 117.201 A 51.789 51.789 0 0 0 750.861 106.134 A 42.704 42.704 0 0 0 748.4 98.401 Q 744.8 90.001 738.8 84.001 Q 732.8 78.001 724.8 74.801 Q 716.8 71.601 708 71.601 L 457.2 71.601 A 13.305 13.305 0 0 1 453.848 71.197 A 10.35 10.35 0 0 1 450.4 69.601 A 5.993 5.993 0 0 1 448.322 66.857 Q 447.905 65.807 447.729 64.482 A 15.831 15.831 0 0 1 447.6 62.401 L 447.6 58.801 Q 447.6 54.313 449.387 52.358 A 4.431 4.431 0 0 1 450 51.801 Q 451.873 50.396 454.963 50.088 A 18.508 18.508 0 0 1 456.8 50.001 L 752 50.001 L 752 0.001 L 439.6 0.001 Q 430.8 0.001 423 3.001 Q 415.2 6.001 409.2 11.801 A 41.891 41.891 0 0 0 401.034 22.942 A 49.544 49.544 0 0 0 399.6 26.001 A 43.909 43.909 0 0 0 396.528 37.284 A 57.303 57.303 0 0 0 396 45.201 L 396 76.801 Q 396 87.601 399.6 96.001 A 45.235 45.235 0 0 0 405.359 105.906 A 39.938 39.938 0 0 0 409.2 110.201 Q 415.2 116.001 423 119.001 Q 430.8 122.001 439.6 122.001 L 690.8 122.001 A 20.287 20.287 0 0 1 693.286 122.142 Q 695.89 122.465 697.431 123.524 A 5.532 5.532 0 0 1 697.8 123.801 A 4.882 4.882 0 0 1 699.138 125.623 Q 699.864 127.242 699.978 129.804 A 22.283 22.283 0 0 1 700 130.801 L 700 134.401 A 15.143 15.143 0 0 1 699.779 137.089 Q 699.213 140.22 697.2 141.801 Q 694.4 144.001 690.4 144.001 Z"
              id="1"
              class="svg-elem-2"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TransitionIntro',
  props: {
    bgColor: {
      type: String,
      default: '#0a0e17',
    },
    duration: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      isVisible: true,
      animationStarted: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.animationStarted = true
      setTimeout(() => {
        this.isVisible = false
      }, this.duration)
    }, 50)
  },
}
</script>

<style scoped>
.transition-intro {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: var(--bg-color, #0a0e17);
}

.container {
  width: 80vw;
  max-width: 752px;
}

svg {
  width: 100%;
  height: auto;
  opacity: 1;
}

/* Animation for fading out */
.fade-out-leave-active {
  transition: opacity 0.5s ease;
}
.fade-out-leave-to {
  opacity: 0;
}

/* SVG animation styles remain the same */
svg .svg-elem-1 {
  stroke-dashoffset: 1389.199951171875px;
  stroke-dasharray: 1389.199951171875px;
  fill: transparent;
  transition:
    stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0s,
    fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s;
}

svg.active .svg-elem-1 {
  stroke-dashoffset: 0;
  fill: rgb(213, 253, 255);
}

svg .svg-elem-2 {
  stroke-dashoffset: 2231.11279296875px;
  stroke-dasharray: 2231.11279296875px;
  fill: transparent;
  transition:
    stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.12s,
    fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.9s;
}

svg.active .svg-elem-2 {
  stroke-dashoffset: 0;
  fill: rgb(213, 253, 255);
}
</style>
