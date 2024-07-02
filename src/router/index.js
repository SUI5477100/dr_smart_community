import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../pages/homeView.vue'
import LoginView from '../pages/loginView.vue'
import ForgotPassword from '../pages/forgotPassword.vue'
import RegisteredView from '../pages/registeredView.vue'

Vue.use(Router)

const routes = [
  {
    // 首页
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    // 登录页
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    // 忘记密码
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    // 注册
    path: '/registered',
    name: 'Registered',
    component: RegisteredView
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
