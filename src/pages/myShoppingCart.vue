<template>
  <div class="myShoppingCart">
    <!-- 顶部标题 -->
    <div class="tittleWrapper">
      <div class="tittle">
        <a-icon type="shopping-cart" />
        <span>我的购物车</span>
      </div>
    </div>
    <!-- 中间可以选择的商品的外部盒子 -->
    <div class="myShoppingCartWrapper">
      <!-- 属性 -->
      <div class="cartHeadler">
        <!-- 左侧全选、商品 -->
        <div class="headlerLeft">
          <input type="checkbox" v-model="selectAll" />全选
          <span>商品</span>
        </div>
        <!-- 右侧单价、数量等 -->
        <div class="headlerRight">
          <span>单价（元）</span>
          <span>数量</span>
          <span>小计</span>
          <span>操作</span>
        </div>
      </div>
      <div class="cartMiddle">
        <div class="pickUpSite02">
          <div v-for="(item, index) in items" :key="index" style="background-color:red">
            <input type="checkbox" v-model="item.checked"><a-tag color="blue" style="margin-left:10px">
              {{ item.label }}
            </a-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectAll: false,
      items: [
        { label: '自提点02', checked: false },
        { label: '自提点01', checked: false },
      ],
    }
  },
  watch: {
    selectAll(val) {
      this.items.forEach((item) => {
        item.checked = val
      })
    },
  },
}
</script>

<style lang="less" scoped>
.myShoppingCart {
  width: 1440px;
  margin: auto;
  .tittleWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    background-color: #f5f7fa;
    .tittle {
      color: black;
      display: flex;
      width: 90px;
      align-items: center;
      justify-content: space-between;
      font-weight: 500;
      span {
      }
    }
  }
  .myShoppingCartWrapper {
    display: flex;
    margin-top: 4px;
    height: 48px;
    background-color: white;
    flex-direction: column;
    .cartHeadler {
      display: flex;
      align-items: center;
      width: 1440px;
      background-color: #f5f5f5;
      padding: 20px;
      .headlerLeft {
        display: flex;
        width: 160px;
        justify-content: space-around;
        color: black;
        font-size: 12px;
        span {
          margin-left: 80px;
        }
      }
      .headlerRight {
        display: flex;
        width: 500px;
        justify-content: space-around;
        margin-left: 450px;
        color: black;
        font-size: 12px;
      }
    }
    .cartMiddle {
      display: flex;
      align-items: center;
      width: 1280px;
      margin: 20px auto;
    }
  }
}
</style>