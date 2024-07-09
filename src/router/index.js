import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../pages/homeView.vue'
import PersonalCenter from '../pages/personalCenter.vue'
import UserLoginRegisterView from '../pages/userLoginRegisterView.vue'
import MyRecharge from '../components/personalCenterComponents/myRecharge.vue'
import MyInformation from '../components/personalCenterComponents/myInformation.vue'
import ChangePassword from '../components/personalCenterComponents/changePassword.vue'
import MyFavorites from '../components/personalCenterComponents/myFavorites.vue'
import MyOrders from '../components/personalCenterComponents/myOrders.vue'
import MyTransfer from '../components/personalCenterComponents/myTransfer.vue'
import TransactionHistory from '../components/personalCenterComponents/transactionHistory.vue'
import ProductList from '../pages/productList.vue'
import forgetPassView from '../pages/forgetPassView.vue'
import ProductDetails from '../pages/productDetails.vue'
import MyShoppingCart from '../pages/myShoppingCart.vue'
import OrderInformation from '../pages/orderInformation.vue'
import OrderPayment from '../pages/orderPayment.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/productList',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: UserLoginRegisterView,
      // meta: { noHeader: true } //跳转时是否为独立页面
    },
    {
      path: '/forgetPass',
      name: 'ForgetPass',
      component: forgetPassView
    },
    {
      path: '/personalCenter',
      name: 'PersonalCenter',
      redirect: '/personalCenter/myInformation',
      component: PersonalCenter,
      children: [
        {
          path: 'myRecharge',
          name: 'MyRecharge',
          component: MyRecharge,
        },
        {
          path: 'myInformation',
          name: 'MyInformation',
          component: MyInformation,
        },
        {
          path: 'changePassword',
          name: 'ChangePassword',
          component: ChangePassword,
        },
        {
          path: 'myFavorites',
          name: 'MyFavorites',
          component: MyFavorites,
        },
        {
          path: 'myOrders',
          name: 'MyOrders',
          component: MyOrders,
        },
        {
          path: 'myTransfer',
          name: 'MyTransfer',
          component: MyTransfer,
        },
        {
          path: 'transactionHistory',
          name: 'TransactionHistory',
          component: TransactionHistory,
        },
      ]
    },
    {
      // 商品列表
      path: '/productList',
      name: 'ProductList',
      component: ProductList
    },
    {
      // 商品详情
      path: '/productDetails',
      name: 'ProductDetails',
      component: ProductDetails,
      props: route => ({ product: route.params.product }),
    },
    {
      // 我的购物车
      path: '/myShoppingCart',
      name: 'MyShoppingCart',
      component: MyShoppingCart,
      meta: { noHeader: true }
    },
    {
      // 订单信息
      path: '/orderInformation',
      name: 'OrderInformation',
      component: OrderInformation,
      meta: { noHeader: true },
      props: route => ({ totalAmount: route.query.totalAmount })
    },
    {
      // 订单支付
      path: '/orderPayment',
      name: 'OrderPayment',
      component: OrderPayment,
      meta: { noHeader: true },
    }
  ]
})
