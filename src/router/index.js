import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import LoginSuccess from '../views/loginSuccess.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    component: Login
  },
  //重定向
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/loginSuccess",
    name: "loginSuccess",
    component: LoginSuccess
  }
]

const router = new VueRouter({
  routes
})

export default router
