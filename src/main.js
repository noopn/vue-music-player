import Vue from 'vue'
import 'babel-polyfill'
import VueLazyload from 'vue-lazyload'
import '@/assets/js/amfe-flexible'
import '@/assets/css/reset.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  error: require('./assets/img/error.jpg'),
  loading: require('./assets/img/loading.gif')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
