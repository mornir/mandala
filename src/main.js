import './firebase';

import Vue from 'vue';
import VueFire from 'vuefire';
import VueRouter from 'vue-router';
import App from './App.vue';
import Vuetify from 'vuetify';

import {
    routes
} from './routes';

Vue.config.productionTip = false;

const router = new VueRouter({
    routes
});

Vue.use(VueFire);
Vue.use(VueRouter);
Vue.use(Vuetify);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
