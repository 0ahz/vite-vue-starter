import 'normalize.css'

import 'virtual:windi.css'
import 'virtual:windi-devtools'

import '@/styles/main.css'

// import { createApp } from 'vue'
// import { createHead } from '@vueuse/head'
// import '@purge-icons/generated'

// import App from './App.vue'
// import plugins from './plugins'
// import router from './router'

// createApp(App).use(createHead()).use(plugins).use(router).mount('#app')

import { ViteSSG } from 'vite-ssg'
import '@purge-icons/generated'

import App from './App.vue'
import plugins from './plugins'
import routes from './router/routes'

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  plugins.install(app)
})
