import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
.component('VueDatePicker', VueDatePicker)

.component('font-awesome-icon', FontAwesomeIcon)
library.add(faArrowUp)


app.mount('#app')
