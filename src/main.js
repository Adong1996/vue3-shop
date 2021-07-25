import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import {store} from './store/index.js'
import VueI18n from 'vue-i18n'
import 'lib-flexible'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueI18n)
app.mount('#app')
