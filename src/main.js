import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/login2.css'
import './assets/fonts/iconfont.css'
import './assets/css/global.css'

Vue.config.productionTip = false//防止在生产环境中产生过多的log输出

Vue.use(VueAxios, axios)
Vue.use(ElementUI)

axios.defaults.baseURL = "http://119.3.104.39:2302/api/"


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')//通过$mount方法将new Vue()中的内容挂载到了一个id=app的html文件中。等同于el:'#app'的作用。
