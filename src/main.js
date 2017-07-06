import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import vueResource from 'vue-resource'
// import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import store from './store';

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(vueResource);
Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');