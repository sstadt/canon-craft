
import Vue from 'vue'
import './registerServiceWorker'

// libs
import vClickOutside from 'v-click-outside'
import Vue2TouchEvents from 'vue2-touch-events'
import VueSanitize from 'vue-sanitize'
import VeeValidate from 'vee-validate'
import VueMoment from 'vue-moment'
import ToggleButton from 'vue-js-toggle-button'
import VueLazyload from 'vue-lazyload'
import VueMq from 'vue-mq'
import Croppa from 'vue-croppa'

// filters
import { fileSize } from './filters/files.js'
import { stripHtml } from './filters/sanitize.js'

// app
import App from './App.vue'
import router from './router'
import store from './store'

// config
import sanitizeConfig from './lib/config.sanitize.js'
const cssVars = require('./theme/_settings.scss')

// vendor css
// require('node/module/style.css')

// Vue Setup
Vue.config.productionTip = false

Vue.use(vClickOutside)
Vue.use(Vue2TouchEvents)
Vue.use(VueSanitize, sanitizeConfig)
Vue.use(VeeValidate)
Vue.use(VueMoment)
Vue.use(ToggleButton)
Vue.use(Croppa)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/img/loader.gif',
  attempt: 1
})

Vue.use(VueMq, {
  breakpoints: {
    mobile: parseInt(cssVars.breakTablet, 10),
    tablet: parseInt(cssVars.breakDesktop, 10),
    desktop: parseInt(cssVars.breakHd, 10),
    hd: Infinity
  }
})

Vue.filter('stripHtml', stripHtml)
Vue.filter('fileSize', fileSize)

// Vue.directive('click-outside', clickOutside)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
