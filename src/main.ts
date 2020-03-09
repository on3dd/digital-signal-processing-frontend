import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// const GithubIcon = require('mdi-vue/GithubBox.vue');
//
// Vue.component('github-icon', GithubIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
