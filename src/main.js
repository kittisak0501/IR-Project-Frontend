import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@/plugins/font-awesome.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GStore from './store'
import 'nprogress/nprogress.css'

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .provide('GStore', GStore)
  .mount('#app')
