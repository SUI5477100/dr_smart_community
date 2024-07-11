<template>
  <div class="navigation-container">
    <div class="menu-wrapper">
      <a-menu v-model="current" mode="horizontal" class="custom-menu">
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <router-link :to="item.link">{{ item.label }}</router-link>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      // 初始化时基于路由设置当前激活的菜单项
      current: this.$route.path,
      menuItems: [
        // { key: '/productList', link: '/productList', label: '全部商品' },
        { key: '/goodsCategory', link: '/goodsCategory', label: '全部商品' },
        { key: '/productList', link: '/productList', label: '商品列表' },
        { key: '/login', link: '/login', label: '首页' },
        { key: '/orders', link: '/orders', label: '我的订单' },
        { key: '/personalCenter', link: '/personalCenter', label: '个人中心' },
      ],
    }
  },
  watch: {
    '$route': function (newRoute) {
      // 路由变更时更新当前激活的菜单项
      this.current = newRoute.path;
    }
  },
  created() {
    // 确保在组件创建时从当前路由初始化状态
    this.current = this.$route.path;
  }
}

</script>

<style scoped>
.navigation-container {
  width: 100%;
  display: flex;
  justify-content: center;
  /* 使内盒子居中 */
  background-color: #1e90ff;
  /* 设置背景颜色 */
}

.menu-wrapper {
  width: 75%;
  /* 设置内盒子的宽度 */
}

.ant-menu-horizontal {
  background-color: #1e90ff;
  height: 48px;
  border-bottom: none !important;
}

.custom-menu .ant-menu-item {
  background-color: #1e90ff !important;
  border: none !important;
  transition: width 1s ease, background-color 1s ease;
  /* 添加过渡效果 */
}

.custom-menu .ant-menu-item a {
  color: white !important;
}

.custom-menu .ant-menu-item:hover {
  background-color: #4169e1 !important;
}

.custom-menu .ant-menu-item:hover a {
  color: white !important;
}

.custom-menu .ant-menu-item-selected {
  background-color: #4169e1 !important;
  width: 240px !important;
  /* 设置选中时的宽度 */
}

.custom-menu .ant-menu-item-selected a {
  color: white !important;
}
</style>