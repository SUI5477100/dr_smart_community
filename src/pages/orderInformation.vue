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
          <li>{{orderNumber}}</li>
        </ul>
        <ul>
          <li>订单总金额：</li>
          <li>{{totalAmount}}</li>
        </ul>
        <ul>
          <li>订单状态：</li>
          <li><a-tag color="blue">
              待支付
            </a-tag></li>
        </ul>
        <ul>
          <li>订单创建时间：</li>
          <li>{{creationTime}}</li>
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
  props: {
    totalAmount: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      orderNumber: '',
      creationTime: '',
    }
  },
  methods: {
    generateOrderNumber() {
      const now = new Date()
      const dateStr =
        now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0') +
        now.getHours().toString().padStart(2, '0') +
        now.getMinutes().toString().padStart(2, '0') +
        now.getSeconds().toString().padStart(2, '0')
      const randomStr = Math.random().toString().substr(2, 5)
      return dateStr + randomStr
    },

    generateCreationTime() {
      const now = new Date()
      return (
        now.getFullYear() +
        '-' +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        now.getDate().toString().padStart(2, '0') +
        ' ' +
        now.getHours().toString().padStart(2, '0') +
        ':' +
        now.getMinutes().toString().padStart(2, '0') +
        ':' +
        now.getSeconds().toString().padStart(2, '0')
      )
    },
    goHome() {
      // 跳转到首页的逻辑
      this.$router.push('/')
    },
    payNow() {
      // 立即支付的逻辑
      alert('跳转到支付页面')
    },
  },
  created() {
    this.orderNumber = this.generateOrderNumber()
    this.creationTime = this.generateCreationTime()
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