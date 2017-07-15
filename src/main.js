import Vue from 'vue';
import VueFire from 'vuefire';
import VueRouter from 'vue-router';
import App from './App.vue';
import Vuetify from 'vuetify';
import VueClipboards from 'vue-clipboards';
import moment from 'moment';

Object.defineProperty(Vue.prototype, '$moment', {
    value: moment
});

import {
    routes
} from './routes';

Vue.config.productionTip = false;

const router = new VueRouter({
    mode: 'history',
    routes
});

Vue.use(VueFire);
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueClipboards);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
