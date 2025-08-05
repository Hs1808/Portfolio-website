<template>
  <section id="contact" class="contact-view">
    <div class="contact-container">
      <Toast />

      <h1 class="contact-heading">CONTACT <span class="glow">ME</span></h1>

      <!-- Icon Grid Row -->
      <div class="icon-grid mb-6">
        <div class="button-grid mb-6">
          <Button
            :class="'glow-icon'"
            icon="pi pi-envelope"
            label="Email"
            class="p-button-outlined p-button-secondary arrow-btn"
            @click="openLink('mailto:hsgomzi.personal@email.com')"
            variant="outlined"
            size="large"
            severity="contrast"
          />
          <Button
            :class="'glow-icon'"
            icon="pi pi-github"
            label="GitHub"
            class="p-button-outlined p-button-secondary arrow-btn"
            @click="openLink('https://github.com/Hs1808')"
            variant="outlined"
            size="large"
            severity="contrast"
          />
          <Button
            :class="'glow-icon'"
            icon="pi pi-linkedin"
            label="LinkedIn"
            class="p-button-outlined p-button-secondary arrow-btn"
            @click="openLink('https://www.linkedin.com/in/harshdeep-singh1808/')"
            variant="outlined"
            size="large"
            severity="contrast"
          />
          <Button
            :class="'glow-icon'"
            icon="pi pi-download"
            label="Resume"
            class="p-button-outlined p-button-secondary arrow-btn"
            @click="openLink(resumeUrl)"
            variant="outlined"
            size="large"
            severity="contrast"
          />
        </div>
      </div>

      <!-- Form Section -->
      <div class="form-wrapper">
        <div class="form-column">
          <span class="p-float-label">
            <InputText id="name" v-model="form.name" placeholder="Full Name" style="width: 600px" />
          </span>

          <span class="p-float-label">
            <InputText id="email" v-model="form.email" placeholder="EMAIL" style="width: 600px" />
          </span>

          <span class="p-float-label">
            <Textarea
              id="message"
              v-model="form.message"
              rows="5"
              placeholder="MESSAGE"
              style="width: 600px"
            />
          </span>

          <AnimatedButton
            @click="submitForm"
            :loading="loading"
            style="width: 600px; z-index: 1; text-align: center"
          >
            Transmit
          </AnimatedButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import AnimatedButton from '@/components/AnimatedButton.vue'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import emailjs from '@emailjs/browser'

const toast = useToast()

const form = ref({
  name: '',
  email: '',
  message: '',
})

const resumeUrl = new URL('@/assets/Resume.pdf', import.meta.url).href
const loading = ref(false)

// ✅ Pull credentials from .env
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const submitForm = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    toast.add({
      severity: 'warn',
      summary: 'Please fill out all fields',
      life: 3000,
    })
    return
  }

  loading.value = true

  const templateParams = {
    name: form.value.name,
    email: form.value.email,
    message: form.value.message,
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
    toast.add({
      severity: 'success',
      summary: 'Message sent successfully!',
      detail: 'I will get back to you soon.',
      life: 4000,
    })
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Failed to send message',
      detail: error?.text || 'Please try again later.',
      life: 4000,
    })
  } finally {
    loading.value = false
  }
}

const openLink = (url) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.contact-view {
  background: transparent;
  padding: 6rem 2rem;
  font-family: 'Orbitron', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center top;
  justify-content: center center;
}

.contact-container {
  width: fit-content;
  margin: 0 auto;
  z-index: 1;
}

.contact-heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.3);
}

.contact-heading .glow {
  color: #7df3ff;
  text-shadow:
    0 0 6px rgba(0, 247, 255, 0.6),
    0 0 12px rgba(0, 247, 255, 0.4);
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .form-wrapper {
    flex-direction: row;
    justify-content: space-between;
  }
}

.form-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 1rem;
  justify-items: center;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .button-grid {
    grid-template-columns: repeat(4, minmax(120px, 1fr));
  }
}

.glow-icon {
  color: #7df3ff !important;
  filter: drop-shadow(0 0 6px rgba(100, 181, 246, 0.5));
  transition: filter 0.3s ease;
}

.glow-icon:hover {
  filter: drop-shadow(0 0 8px rgba(100, 181, 246, 0.8));
}

.p-button {
  transition: background-color 0.2s;
}

.p-button:hover {
  background-color: var(--primary-color-100) !important;
}
</style>
