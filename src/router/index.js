import Vue from 'vue'
import Router from 'vue-router'
import SmartView from '@/components/SmartView'
import CreateMandat from '@/components/CreateMandat'
import LoginScreen from '@/components/LoginScreen'
import Mitarbeiter from '@/components/Mitarbeiter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/smartview',
      name: 'SmartView',
      component: SmartView
    },
    {
      path: '/nouveau',
      name: 'CreateMandat',
      component: CreateMandat
    },
    {
      path: '/login',
      name: 'LoginScreen',
      component: LoginScreen
    },
    {
      path: '/mandants',
      name: 'Mitarbeiter',
      component: Mitarbeiter
    }
  ]
})
