import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../pages/homeView.vue'
import ForgotPassword from '../pages/forgotPassword.vue'
import UserLoginRegisterView from '../pages/userLoginRegisterView.vue'

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
    component: UserLoginRegisterView
  },
  {
    // 忘记密码
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
