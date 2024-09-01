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
import PaymentSuccess from '../pages/paymentSuccess.vue'
import SecondLevelCategory from '../components/goodsCategoryList/secondLevelCategory.vue'
import NavOrders from '../components/personalCenterComponents/navOrders.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      redirect: '/login',
      component: UserLoginRegisterView,
      // meta: { noHeader: true } //跳转时是否为独立页面
    },
    {
      path: '/login',
      name: 'Login',
      component: UserLoginRegisterView,
    },
    {
      name: 'Home',
      path: '/goodsCategory',
      component: HomeView
    },

    {
      path: '/forgetPass',
      name: 'ForgetPass',
      component: forgetPassView
    },
    {
      path: '/navOrders',
      name: 'NavOrders',
      component: NavOrders
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
          path: 'consumptionRecord',
          name: 'TransactionHistory',
          component: TransactionHistory,
        },
      ]
    },
    {
      path: '/productList',
      redirect: '/productList/12'
    },
    {
      path: '/productList/:id/:key?',
      name: 'ProductList',
      component: ProductList
    },

    {
      path: '/goodsCategory',
      name: 'HomeView',
      component: HomeView,
      children: [
        {
          path: 'getChildGoodsCategoryList',
          name: 'SecondLevelCategory',
          component: SecondLevelCategory,
        },]
    },
    {
      // 商品详情
      path: '/productDetails/:id',
      name: 'ProductDetails',
      component: ProductDetails,
      // meta: { keepAlive: true },
      // props: route => ({ id: route.params.id }),
      props: true
    },
    {
      // 我的购物车
      path: '/myShoppingCart',
      name: 'MyShoppingCart',
      component: MyShoppingCart,
      // meta: { noHeader: true }
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
    },
    {
      // 支付成功
      path: '/paymentSuccess',
      name: 'PaymentSuccess',
      component: PaymentSuccess,
      // meta: { noHeader: true },
    }
  ]
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
  const pathArr = [
    '/',
    '/login',
    '/goodsCategory',
    '/forgetPass',
    '/productList',
    '/productDetails',
    '/myShoppingCart',
    '/orderPayment',
    '/paymentSuccess'
  ]
  if (pathArr.indexOf(to.path) == -1) {
    // 要访问后台主页,需要判断是否有token
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
      alert('请先登录')
    }
  } else {
    next()
  }
});
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => {
    // 如果错误不是 NavigationDuplicated，抛出错误
    if (err.name !== 'NavigationDuplicated') {
      throw err;
    }
  });
};

export default router