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
          <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />全选
          <span>商品</span>
        </div>
        <!-- 右侧单价、数量等 -->
        <div class=" headlerRight">
          <span>单价（元）</span>
          <span>数量</span>
          <span>小计</span>
          <span>操作</span>
        </div>
      </div>
      <!-- 中间商品勾选部分 -->
      <div class="cartMiddle">
        <div class="pickUpSite" v-for="(pickup, index) in items" :key="index">
          <!-- 自提点 -->
          <div class="pickUpHeader">
            <input type="checkbox" v-model="pickup.checked" @change="togglePickupSelect(pickup)">
            <a-tag color="blue" style="margin-left:10px">
              {{ pickup.label }}
            </a-tag>
          </div>
          <!-- 可勾选的商品 -->
          <div class="productWrapper" v-for="(product, productIndex) in pickup.products" :key="productIndex">
            <div class="leftName">
              <input type="checkbox" v-model="product.checked" @change="checkPickupSelect(pickup)" />
              <img src="../assets/image/milk_01.png" alt="">
              <span>{{ product.name }}</span>
            </div>
            <!-- 右侧功能 -->
            <div class="rightMsg">
              <span>￥{{ product.price.toFixed(2) }}</span>
              <div>
                <a-input-number :min="1" :max="100000" v-model="product.quantity" @change="updateCart" />
              </div>
              <span class="sum">￥{{ (product.quantity * product.price).toFixed(2) }}</span>
              <span @click="removeProduct(pickup, product)">移除</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部结算 -->
      <div class="cartBottom">
        <ul>
          <li>已选择</li>
          <li>{{ selectedItemsCount }}</li>
          <li>件,总计</li>
          <li>￥{{ totalPrice.toFixed(2) }}</li>
          <li>元</li>
        </ul>
        <!-- <a href="orderInformation" class="shop-car">
          <a-button type="primary" style="text-align:center;font-size:12px;width:100px;margin-right:20px">
            <span>结算</span>
          </a-button>
        </a> -->
        <router-link :to="{ path: '/order-info', query: { totalAmount: totalPrice.toFixed(2) }}">
          <a-button type="primary" style="text-align:center;font-size:12px;width:100px;margin-right:20px">
            <span>结算</span>
          </a-button>
        </router-link>
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
        {
          label: '自提点02',
          checked: false,
          products: [
            {
              name: '蒙牛早餐奶原麦250ml*16',
              checked: false,
              quantity: 3,
              price: 0,
            },
            { name: '上海寻宝记', checked: false, quantity: 1, price: 0 },
            {
              name: '蒙牛早餐奶原麦250ml*16',
              checked: false,
              quantity: 3,
              price: 0,
            },
            { name: '上海寻宝记', checked: false, quantity: 1, price: 0 },
          ],
        },
        {
          label: '自提点02',
          checked: false,
          products: [
            {
              name: '蒙牛早餐奶原麦250ml*16',
              checked: false,
              quantity: 3,
              price: 0,
            },
            { name: '上海寻宝记', checked: false, quantity: 1, price: 0 },
          ],
        },
      ],
    }
  },
  computed: {
    selectedItemsCount() {
      return this.items.reduce((total, pickup) => {
        return (
          total +
          pickup.products.reduce((count, product) => {
            return count + (product.checked ? product.quantity : 0)
          }, 0)
        )
      }, 0)
    },
    totalPrice() {
      return this.items.reduce((total, pickup) => {
        return (
          total +
          pickup.products.reduce((sum, product) => {
            return (
              sum + (product.checked ? product.quantity * product.price : 0)
            )
          }, 0)
        )
      }, 0)
    },
  },
  methods: {
    onChange(value) {
      console.log('changed', value)
    },
    updateCart() {
      this.$forceUpdate() // 强制 Vue 更新视图
    },
    toggleSelectAll() {
      this.items.forEach((pickup) => {
        pickup.checked = this.selectAll
        pickup.products.forEach((product) => {
          product.checked = this.selectAll
        })
      })
    },
    checkSelectAll() {
      this.selectAll = this.items.every(
        (pickup) =>
          pickup.checked && pickup.products.every((product) => product.checked)
      )
    },
    togglePickupSelect(pickup) {
      pickup.products.forEach((product) => {
        product.checked = pickup.checked
      })
      this.checkSelectAll()
    },
    checkPickupSelect(pickup) {
      pickup.checked = pickup.products.every((product) => product.checked)
      this.checkSelectAll()
    },
    removeProduct(pickup, product) {
      pickup.products = pickup.products.filter((p) => p !== product)
      this.checkPickupSelect(pickup)
    },
    async fetchProductPrices() {
      // 假设从API获取商品价格
      const response = await fetch('/api/product-prices')
      const data = await response.json()
      this.items.forEach((pickup) => {
        pickup.products.forEach((product) => {
          const productData = data.find((d) => d.name === product.name)
          if (productData) {
            product.price = productData.price
          }
        })
      })
    },
  },
  created() {
    this.fetchProductPrices()
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
        width: 600px;
        justify-content: space-around;
        margin-left: 450px;
        color: black;
        font-size: 12px;
      }
    }
    .cartMiddle {
      display: flex;
      flex-direction: column;
      width: 1280px;
      margin: 20px auto;
      .pickUpSite {
        margin-top: 20px;
        .productWrapper {
          display: flex;
          align-items: center;
          width: 1280px;
          margin-top: 20px;
          padding: 10px;
          border: 1px solid #f5f5f5;
          .leftName {
            width: 500px;
            img {
              width: 44px;
              margin-left: 20px;
            }
            span {
              color: black;
              font-weight: 500;
            }
          }
          .rightMsg {
            display: flex;
            margin-left: 50px;
            justify-content: space-around;
            align-items: center;
            width: 580px;
            // background-color: pink;
            span:first-child {
              font-weight: 500;
            }
            .sum {
              color: black;
              font-weight: 700;
            }
            span:last-child {
              color: #cf3142;
              font-weight: 500;
            }
          }
        }
      }
    }
    .cartBottom {
      display: flex;
      align-items: center;
      width: 1440px;
      background-color: #f5f5f5;
      padding: 20px;
      justify-content: flex-end;
      ul {
        display: flex;
        align-items: center;
        margin: 0;
        margin-right: 20px;
        font-size: 14px;
        li:nth-child(2),
        li:nth-child(4) {
          color: #cf3142;
          font-weight: 500;
          margin: 0 5px;
        }
      }
    }
  }
}
</style>