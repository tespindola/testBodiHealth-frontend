import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment/min/moment-with-locales';

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)

moment.locale('es')

app.config.globalProperties.$moment = moment;

app.mount('#app')
