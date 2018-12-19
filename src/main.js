
import Vue from 'vue'

import VeeValidate from 'vee-validate'
import wysiwyg from 'vue-wysiwyg'

import App from './App.vue'

import router from './router'
import store from './store'

// vendor css
require('vue-wysiwyg/dist/vueWysiwyg.css')

// icons
const requireAll = r => r.keys().forEach(r)
requireAll(require.context('./icons/', true, /\.svg$/))

// Vue Setup
Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(wysiwyg, { maxHeight: '500px' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
