<template>
  <div class="orderInfo">
    <div class="tittleWrapper">
      <div class="tittle">
        <a-icon type="shopping-cart" />
        <span>订单信息</span>
      </div>
    </div>
    <div class="orderInforMiddleWrapper">
      <div class="success">
        <a-icon type="check-circle" theme="filled" style="color:#67c23a;fontSize:80px" />
        <span>订单创建成功</span>
      </div>
      <div class="msg">
        <ul>
          <li>订单号：</li>
          <li>{{goodsOrder.orderNo}}</li>
        </ul>
        <ul>
          <li>订单总金额：</li>
          <li>{{goodsOrder.totalPrice}}</li>
        </ul>
        <ul>
          <li>订单状态：</li>
          <li>
            <a-tag v-if="goodsOrder.orderStatus === 0" color="red">支付失败</a-tag>
            <a-tag v-else-if="goodsOrder.orderStatus === 1" color="blue">待支付</a-tag>
            <a-tag v-else-if="goodsOrder.orderStatus === 2" color="green">支付成功</a-tag>
            <!-- <a-tag v-else>未知状态</a-tag> -->
            <!-- {{goodsOrder.orderStatus}} -->
          </li>
        </ul>
        <ul>
          <li>订单创建时间：</li>
          <li>{{goodsOrder.createTime}}</li>
        </ul>
      </div>
      <div class="btn">
        <a-button style="width:150px" @click="goHome">返回首页</a-button>
        <a-button style="width:150px" @click="payNow" type="primary">
          立即支付
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNumber: '',
      creationTime: '',
      goodsOrder: {},
    }
  },
  mounted() {
    // // this.totalAmount = this.$route.query.totalAmount
    // this.goodsOrder = this.$route.query.goodsOrder
    // // console.log(this.totalAmount)
    // // this.selectedItems = JSON.parse(this.$route.query.selectedItems)
    // console.log(this.goodsOrder)
    if (this.$route.query.goodsOrder) {
      try {
        // Check if it's already an object, otherwise parse JSON
        if (typeof this.$route.query.goodsOrder === 'object') {
          this.goodsOrder = this.$route.query.goodsOrder
        } else {
          this.goodsOrder = JSON.parse(this.$route.query.goodsOrder)
        }
        console.log('goodsOrder:', this.goodsOrder)
      } catch (error) {
        console.error('获取失败:', error)
      }
    } else {
      console.warn('获取失败.')
    }
    // if (this.$route.query.goodsOrder) {
    //   try {
    //     this.goodsOrder = JSON.parse(this.$route.query.goodsOrder)
    //     console.log('Parsed goodsOrder:', this.goodsOrder)
    //   } catch (error) {
    //     console.error('Error parsing goodsOrder:', error)
    //   }
    // } else {
    //   console.warn('No goodsOrder found in route query.')
    // }
  },
  methods: {
    goHome() {
      // 跳转到首页的逻辑
      this.$router.push('/')
    },
    // payNow() {
    //   // 立即支付的逻辑
    //   alert('跳转到支付页面')
    //   this.$router.push('/orderPayment')
    // },
    payNow() {
      // 立即支付的逻辑
      // 提取订单号
      const orderNo = this.goodsOrder.orderNo
      alert('跳转到支付页面，订单号：' + orderNo)
      // 跳转并传递订单号
      this.$router.push({
        path: '/orderPayment',
        query: {
          orderNo: orderNo,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.orderInfo {
  display: flex;
  flex-direction: column;
  width: 100%;
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
    }
  }
  .orderInforMiddleWrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    .success {
      width: 200px;
      display: flex;
      align-items: center;
      flex-direction: column;
      span {
        color: black;
        margin-top: 28px;
        font-size: 16px;
        font-weight: 500;
      }
    }
    .msg {
      display: flex;
      margin-top: 80px;
      width: 1080px;
      flex-direction: column;
      ul {
        display: flex;
        li:first-child {
          color: black;
          font-weight: 500;
          font-size: 14px;
        }
        li:last-child {
          color: black;
          font-weight: 400;
          font-size: 14px;
        }
      }
    }
    .btn {
      width: 350px;
      margin-top: 100px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>