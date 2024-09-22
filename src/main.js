import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueResizeText from 'vue-resize-text'
import App from './App.vue'

createApp(App).use(createPinia()).use(VueResizeText).mount('#app')
