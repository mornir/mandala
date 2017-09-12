import Vue from 'vue'
import Router from 'vue-router'
import SmartView from '@/components/SmartView'
import CreateMandat from '@/components/CreateMandat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SmartView',
      component: SmartView
    },
    {
      path: '/new',
      name: 'CreateMandat',
      component: CreateMandat
    }
  ]
})
