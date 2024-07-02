import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../pages/homeView.vue'
import PersonalCenter from '../pages/personalCenter.vue'
import UserLoginRegisterView from '../pages/userLoginRegisterView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: UserLoginRegisterView,
     // meta: { noHeader: true } //跳转时是否为独立页面
    },
    {
      path: '/personalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter,
      // meta: { noHeader: true }
    }
  ]
})
