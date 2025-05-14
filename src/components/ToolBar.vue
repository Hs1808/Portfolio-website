<template>
  <div class="navbar">
    <Toolbar class="toolbar" style="border-radius: 3rem; padding: 1rem 1.5rem">
      <template #start>
        <div class="flex items-center">
          <h1 class="glow-text" style="font-size: x-large">Harshdeep Singh</h1>
        </div>
      </template>

      <template #end>
        <div class="flex items-center gap-2 end-buttons">
          <Button
            class="glow-icon"
            v-tooltip.bottom="{ value: 'Home', showDelay: 700, hideDelay: 300 }"
            icon="pi pi-home"
            severity="secondary"
            size="medium"
            text
            @click="scrollTo('home')"
            aria-label="Home"
          />
          <Button
            class="glow-icon"
            v-tooltip.bottom="{ value: 'About', showDelay: 700, hideDelay: 300 }"
            icon="pi pi-user"
            severity="secondary"
            size="medium"
            text
            @click="scrollTo('about')"
            aria-label="About"
          />
          <Button
            class="glow-icon"
            v-tooltip.bottom="{ value: 'Skills', showDelay: 700, hideDelay: 300 }"
            icon="pi pi-briefcase"
            severity="secondary"
            size="medium"
            text
            @click="scrollTo('portfolio')"
            aria-label="Portfolio"
          />
          <Button
            class="glow-icon"
            v-tooltip.bottom="{ value: 'Projects', showDelay: 700, hideDelay: 300 }"
            icon="pi pi-envelope"
            severity="secondary"
            size="medium"
            text
            @click="scrollTo('contact')"
            aria-label="Contact"
          />
        </div>
      </template>
    </Toolbar>
  </div>
</template>

<script setup>
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import 'primeicons/primeicons.css'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.navbar {
  font-family:
    '911porschav3-title',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Arial,
    sans-serif;
  position: fixed;
  top: 2.9%;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 15px var(--primary-300);
  transition:
    background-color 0.3s ease,
    backdrop-filter 0.3s ease;
  pointer-events: all;
}

.toolbar {
  background: transparent !important;
  border: none !important;
  pointer-events: all;
}

/* Button styling */
.p-button {
  margin: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50% !important;
  transition: background-color 0.2s;
}

.p-button:hover {
  background-color: var(--primary-color-100) !important;
}

.glow-text {
  text-shadow: 0 0 5px rgba(100, 181, 246, 0.6);
  transition: text-shadow 0.3s ease;
  display: inline-block; /* Needed for transform to work properly */
  transform: scaleY(1.5);
}

.glow-icon {
  filter: drop-shadow(0 0 6px rgba(100, 181, 246, 0.5));
  transition: filter 0.3s ease;
}

.glow-icon:hover {
  filter: drop-shadow(0 0 8px rgba(100, 181, 246, 0.8));
}

.end-buttons {
  margin-left: auto;
}
</style>
