
import Vue from 'vue'

import VeeValidate from 'vee-validate'
import wysiwyg from 'vue-wysiwyg'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

import router from './router'
import store from './store'

// vendor css
require('vue-wysiwyg/dist/vueWysiwyg.css')

// Vue Setup
Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(wysiwyg, { maxHeight: '500px' })
Vue.use(VueAxios, axios) // TODO: Do I need this ???

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
