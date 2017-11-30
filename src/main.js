import Vue from 'vue'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'

if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
  document.body.addEventListener("scroll", function () {
    event.preventDefault();
    var wd = event.wheelDelta;
    var csp = window.pageYOffset;
    window.scrollTo(0, csp - wd);
  });
}

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
