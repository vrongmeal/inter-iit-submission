/* eslint-disable */
import Vue from 'vue';
import ShardsVue from 'shards-vue';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';

// Core
import App from './App.vue';
import router from './router';
import store from './store';

// Layouts
import Default from '@/layouts/Default.vue';

import VueRandomColor from 'vue-randomcolor'

Vue.use(VueRandomColor)

ShardsVue.install(Vue);

import VueCarousel from 'vue-carousel';
 
Vue.use(VueCarousel);

Vue.component('default-layout', Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
