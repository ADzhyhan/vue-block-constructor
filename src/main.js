//utils
import './utils/plugins'
//

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// moment

//vue configs
Vue.config.productionTip = false;


const app = new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
});
app.$mount('#app')

