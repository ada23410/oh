/* eslint-disable no-undef */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
// fas 是所有的 solid icon
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Import component
import Loading from 'vue3-loading-overlay'
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { currency, date } from './methods/filter'
import $httpMessageState from './methods/pushMessageState'

library.add(fas)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.config.productionTip = false
app.config.globalProperties.$filters = {
  date,
  currency
}
app.config.globalProperties.$httpMessageState = $httpMessageState

app.use(VueAxios, axios)
app.use(router)
app.component('Loading', Loading)
app.mount('#app')
