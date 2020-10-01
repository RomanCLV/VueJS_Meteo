import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import Vue from 'vue';
import App from './App.vue';
import {store} from './store' ;
import router from './router';
import 'leaflet/dist/leaflet.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
