
import Vue from 'vue'
import './registerServiceWorker'

import vClickOutside from 'v-click-outside'
import Vue2TouchEvents from 'vue2-touch-events'
import VueSanitize from 'vue-sanitize'
import VeeValidate from 'vee-validate'
import VueMoment from 'vue-moment'
import ToggleButton from 'vue-js-toggle-button'
import VueLazyload from 'vue-lazyload'
import VueMq from 'vue-mq'

import App from './App.vue'

import router from './router'
import store from './store'

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

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/img/loader.gif',
  attempt: 1
})

Vue.use(VueMq, {
  breakpoints: {
    mobile: parseInt(cssVars.breakTablet, 10),
    tablet: parseInt(cssVars.breakDesktop, 10),
    desktop: Infinity
  }
})

// Vue.directive('click-outside', clickOutside)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
