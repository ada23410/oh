import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
// fas 是所有的 solid icon
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.config.productionTip = false

app.use(router)
app.mount('#app')
