import Vue from 'vue'
import axios from 'axios';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

const baseUrl: string = process.env.VUE_APP_API_BASE_URL as string;

axios.defaults.baseURL = baseUrl;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
