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
              {{ pickup.storeName }}
            </a-tag>
          </div>
          <!-- 可勾选的商品 -->
          <div class="productWrapper" v-for="(product, productIndex) in pickup.products" :key="productIndex">
            <div class="leftName">
              <input type="checkbox" v-model="product.checked" @change="checkPickupSelect(pickup)" />
              <img :src="product.goods.homeImg" alt="">
              <span>{{ product.goods.goodsName }}</span>
            </div>
            <!-- 右侧功能 -->
            <div class="rightMsg">
              <span>￥{{ product.price.toFixed(2) }}</span>
              <div>
                <a-input-number :min="1" :max="100000" v-model="product.cnt" @change="updateCart(product)" />
              </div>
              <span class="sum">￥{{ (product.cnt * product.price).toFixed(2) }}</span>
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
        <!-- <router-link :to="{ path: '/orderInformation', query: { totalAmount: totalPrice.toFixed(2) }}">
          <a-button type="primary" style="text-align:center;font-size:12px;width:100px;margin-right:20px">
            <span>结算</span>
          </a-button>
        </router-link> -->
        <a-button @click="toCreatePayment()" type="primary" style="text-align:center;font-size:12px;width:100px;margin-right:20px">
          <span>结算</span>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/index'
// import { EventBus } from '@/eventBus'
export default {
  data() {
    return {
      selectAll: false,
      items: [],
      cartList: [],
      checkedId: [],
    }
  },
  computed: {
    selectedItemsCount() {
      return this.items.reduce((total, pickup) => {
        return (
          total +
          pickup.products.reduce((count, product) => {
            return count + (product.checked ? product.cnt : 0)
          }, 0)
        )
      }, 0)
    },
    totalPrice() {
      return this.items.reduce((total, pickup) => {
        return (
          total +
          pickup.products.reduce((sum, product) => {
            return sum + (product.checked ? product.cnt * product.price : 0)
          }, 0)
        )
      }, 0)
    },
    selectedItems() {
      return this.items.flatMap((pickup) =>
        pickup.products.filter((product) => product.checked)
      )
    },
  },
  mounted() {
    this.getProductList()
    // this.cartList = []
  },
  methods: {
    async getProductList() {
      try {
        const res = await api.goods.cartList()
        console.log('购物车商品列表数据', res)
        // 确保 res.list 存在并且是一个数组
        if (res.code == 200) {
          this.items = res.list.map((store) => ({
            ...store,
            checked: false,
            products: store.cartList.map((product) => ({
              ...product,
              checked: false,
              cnt: product.cnt,
              price: product.storeGoods ? product.storeGoods.price : 0,
            })),
          }))
          // 清空cartList
          this.cartList = []
          res.list.map((item) =>
            item.cartList.map((goods) => {
              // if (goods.checked) {
              //   this.cartList.push(goods)
              // }
              this.cartList.push(goods)
            })
          )
          // console.log('this.cartList!!!!!!!!!!!!', this.cartList)
        }
      } catch (error) {
        console.error('获取购物车商品列表失败', error)
      }
    },

    async changeCartCnt(updateCart) {
      try {
        const res = await api.goods.cartCnt(updateCart)
        console.log('修改购物车商品数量', res)
      } catch (error) {
        console.error('获取购物车商品列表失败', error)
      }
    },
    async toDeleteCartProduct(productId) {
      try {
        const res = await api.goods.deleteCartProduct([productId])
        // console.log('删除购物车商品', res)
        if (res.code == 200) {
          this.$message.success('删除成功')
          this.getProductList()
        }
        // this.items = res.list
        // this.filteredList = this.plistForm
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 删除购物车商品
    removeProduct(pickup, product) {
      // console.log('this is pickup:', pickup)
      // console.log('this is product:', product)
      this.toDeleteCartProduct(product.id)
      // pickup.products = pickup.products.filter((p) => p !== product)
      // this.checkPickupSelect(pickup)
    },
    updateCart(product) {
      // this.$forceUpdate() // 强制 Vue 更新视图
      // console.log('--------------product', product)
      // console.log('--------------value', value)
      let updateCart = {
        id: product.id,
        cnt: product.cnt,
      }
      // console.log('updateCart:', updateCart)
      this.changeCartCnt(updateCart)
    },
    // 创建订单
    async getGoodsPayment(cartItems) {
      // this.getProductList()
      try {
        const res = await api.payment.createPayment({ cartItems })
        console.log('创建订单', JSON.stringify(res))
        if (res.code == 200) {
          this.$message.success('创建订单成功')
          this.getProductList()
          this.$router.push({
            path: '/orderInformation',
            query: { totalAmount: this.totalPrice.toFixed(2) },
          })
        } else {
          this.$message.error('创建订单失败')
        }
      } catch (error) {
        console.error('获取失败', error)
      }
    },
    // 结算按钮
    toCreatePayment() {
      // const selectedItems = this.cartList.filter((item) => item.checked)
      // console.log('selectedItems:', selectedItems)
      // this.getGoodsPayment(selectedItems)
      this.getProductList()
      console.log('selectedItems:', this.selectedItems)
      this.getGoodsPayment(this.selectedItems)
      // const selectedItems = this.selectedItems.map((item) => ({
      //   id: item.id,
      //   cnt: item.cnt,
      //   price: item.price,
      // }))
      // console.log('发送的购物车数据', { cartList: selectedItems })
      // this.getGoodsPayment()
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
      // this.checkSelectAll()
    },

    addProductToCart(product) {
      let pickup = this.items.find((item) => item.label === '自提点01')
      if (!pickup) {
        pickup = { label: '自提点01', checked: false, products: [] }
        this.items.push(pickup)
      }
      pickup.products.push({
        ...product,
        checked: false,
      })
    },
  },
  // created() {
  //   EventBus.$on('add-to-cart', this.addProductToCart)
  // },
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