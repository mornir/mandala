import Vue from 'vue'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueFire)
Vue.use(Vuetify)
Vue.use(VueClipboard)
Vue.config.productionTip = false

Vue.filter('formatDate', isoDate =>
  new Date(isoDate).toLocaleDateString('fr-FR')
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
