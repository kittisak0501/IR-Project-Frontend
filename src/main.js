import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@/plugins/font-awesome.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GStore from './store/index'
import store from './store/store'
import 'nprogress/nprogress.css'
import '@/services/AxiosInterceptorSetup.js'
import VueCookies from 'vue-cookies'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

const app = createApp(App)
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  app.component(componentName, componentConfig.default || componentConfig)
})

app
  .use(router)
  .use(store)
  .use(VueCookies)
  .component('font-awesome-icon', FontAwesomeIcon)
  .provide('GStore', GStore)

VueCookies.set('myCookie', 'value', {
  SameSite: 'Strict',
  secure: true
})

app.mount('#app')
