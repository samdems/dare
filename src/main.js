import Vue from 'vue'
import './plugins/fontawesome'
import Mint from 'mint-ui';

import App from './App.vue'
import router from './router'


Vue.use(Mint);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
