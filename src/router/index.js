import Vue from 'vue'
import Router from 'vue-router'
import SmartView from '@/components/SmartView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SmartView',
      component: SmartView
    }
  ]
})
