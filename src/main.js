import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import AnimateOnScroll from 'primevue/animateonscroll'

// Theme and styles
import Nora from '@primeuix/themes/nora'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Nora,
    options: {
      darkModeSelector: true,
    },
  },
})
app.directive('tooltip', Tooltip)
app.directive('animateonscroll', AnimateOnScroll)
app.mount('#app')
