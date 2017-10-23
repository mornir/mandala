import Vue from 'vue'
import Router from 'vue-router'
import SmartView from '@/components/SmartView'
import CreateMandat from '@/components/CreateMandat'
import LoginScreen from '@/components/LoginScreen'
import Mitarbeiter from '@/components/Mitarbeiter'
import Admin from '@/components/Admin'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/smartview',
      name: 'SmartView',
      component: SmartView,
      beforeEnter: AuthGuard
    },
    {
      path: '/nouveau',
      name: 'CreateMandat',
      component: CreateMandat,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'LoginScreen',
      component: LoginScreen
    },
    {
      path: '/mandants',
      name: 'Mitarbeiter',
      component: Mitarbeiter,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: AuthGuard
    },
    {
      path: '*',
      redirect: 'smartview'
    }
  ]
})
