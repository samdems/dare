import Vue from 'vue'
import './plugins/fontawesome'
import Mint from 'mint-ui';

import App from './App.vue'


Vue.use(Mint);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
