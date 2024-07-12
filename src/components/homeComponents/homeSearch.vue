<template>
  <div class="center">
    <div class="center-content">
      <div class="logo" v-for="(logo, index) in logos" :key="index">{{ logo }}</div>
      <div class="center-search">
        <div class="search">
          <a-input-search placeholder="输入搜索内容" enter-button @search="onSearch" />
        </div>
        <a href="/myShoppingCart" class="shop-car">
          我的购物车
          <a-badge count="5">
            <a-icon type="shopping-cart" style="font-size: large;" />
          </a-badge>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSearch',
  data() {
    return {
      logos: ['智慧社区LOGO'],
    }
  },
  methods: {
    onSearch(value) {
      console.log(value)
      this.$router.push({ name: 'ProductList', params: { key: value }});
    },
  },
}
</script>

<style scoped lang="less">
a {
  color: inherit;

  &:hover {
    color: #1e90ff;
  }
}

.center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.center-content {
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.center-search {
  margin-top: 80px;
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
}

.search {
  flex: 2;
  margin-left: 40px;
}

.shop-car {
  flex: 1;
  padding-left: 80px;
}

.logo {
  font-size: x-large;
  color: #000;
  font-weight: 800;
}
</style>