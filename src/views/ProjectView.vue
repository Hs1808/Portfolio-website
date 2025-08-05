<template>
  <div class="project-page" :class="{ dark: isDarkMode }">
    <div class="Project-contatiner">
      <h1 class="project-title">PROJECT LOG</h1>
      <DataView class="dataview" :value="projects">
        <template #list="slotProps">
          <div class="flex flex-col gap-6">
            <div
              v-for="(item, index) in slotProps.items"
              :key="index"
              class="project-row"
              @mouseenter="hoveredIndex = index"
              @mouseleave="hoveredIndex = null"
              @click="openProject(item)"
            >
              <div class="project-media-wrapper">
                <transition name="fade" mode="out-in">
                  <video
                    v-if="hoveredIndex === index && item.video"
                    :src="item.video"
                    autoplay
                    muted
                    loop
                    playsinline
                    class="project-media"
                  ></video>
                  <img v-else :src="item.image" :alt="item.title" class="project-media" />
                </transition>
              </div>
              <div class="project-info">
                <span class="project-category">{{ item.category }}</span>
                <h2 class="project-title-text">{{ item.title }}</h2>
                <p class="project-tags">{{ item.tags.join(' • ') }}</p>
              </div>
              <div class="project-action">
                <animatedButton :url="item.url">View</animatedButton>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataView from 'primevue/dataview'
import animatedButton from '@/components/AnimatedButton.vue'

const isDarkMode = true
const hoveredIndex = ref(null)

const projects = ref([
  {
    title: 'DevVizr',
    image: new URL('@/assets/DevvizrSS.png', import.meta.url).href,
    video: new URL('@/assets/DevvizrSR.mp4', import.meta.url).href,
    tags: ['Full-Stack', 'Vue', 'Flask', 'MongoDB'],
    category: 'Dashboard',
    url: 'https://devvizr.com',
  },
])

const openProject = (project) => {
  console.log('Project clicked:', project.title)
}
</script>

<style scoped>
.project-page {
  min-height: 100vh;
  padding: 4rem 2rem;
  font-family: 'orbitron', sans-serif;
  background: transparent;
}

.project-title {
  position: relative;
  z-index: 1;
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 600;
  text-shadow:
    0 0 8px rgba(0, 247, 255, 0.3),
    0 0 14px rgba(0, 247, 255, 0.15);
  margin-bottom: 2rem;
  pointer-events: none;
  left: 0.5%;
}

.dataview {
  z-index: 1;
  background: transparent !important;
  box-shadow: none !important;
  pointer-events: all;
}

.project-row {
  z-index: 1;

  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
  gap: 1.5rem;
}

.project-image {
  width: 300px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 8px 8px rgba(99, 140, 173, 0.33);
}

.project-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.project-category {
  font-size: 0.9rem;
  color: #9effd9;
}

.project-title-text {
  font-size: 1.25rem;
  color: #ffffff;
  font-weight: 600;
}

.project-tags {
  font-size: 0.85rem;
  color: #80d4ff;
  font-style: italic;
}

.project-action {
  display: flex;
  align-items: center;
}

.project-media-wrapper {
  position: relative;
  width: 300px;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 8px 8px rgba(99, 140, 173, 0.33);
}

.project-row:hover .project-media-wrapper {
  transform: translateX(20%) scale(1.5);
}
.project-row:hover .project-info {
  transform: translateX(15%);
}

.project-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  transition: opacity 0.3s ease;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
