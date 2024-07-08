<template>
  <div class="orderPayment">
    <!-- 顶部步骤条 -->
    <div class="stepsWrapper">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <!-- <div class="steps-content">
        {{ steps[current].content }}
      </div> -->
      <!-- <div class="steps-action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
          下一步
        </a-button>
        <a-button v-if="current === steps.length - 1" type="primary" @click="$message.success('处理完成！')">
          完成
        </a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          上一步
        </a-button>
      </div> -->
    </div>
    <div class="productMsgWrapper">
      <div class="tittle">
        订单商品信息
      </div>
      <ul class="orderNumber">
        <li>订单号：</li>
        <li>123456789</li>
      </ul>
      <div class="msgTittle">
        <div class="left">商品信息</div>
        <ul class="right">
          <li>单价</li>
          <li>数量</li>
          <li>小计</li>
        </ul>
      </div>
      <OrderList></OrderList>

    </div>
    <div class="bottomPay">
      <span>选择支付方式</span>
      <div class="btn">
        <a-button style="width:200px;height:80px;" theme="filled">
          <a-icon type="pay-circle" theme="filled" style="color:#ffae27;fontSize:24px" />余额支付
        </a-button>
        <a-button style="width:200px;height:80px">
          <a-icon type="wechat" style="color:#22ad38;fontSize:24px" />微信支付
        </a-button>
        <a-button style="width:200px;height:80px">
          <a-icon type="alipay-square" theme="filled" style="color:#00aaed;fontSize:24px" />支付宝
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import OrderList from '../components/personalCenterComponents/ordersComponents/orderList.vue'
export default {
  name: 'OrderSteps', // 确保组件名是多字词
  components: { OrderList },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '选择支付方式',
          content: '选择支付方式',
        },
        {
          title: '支付成功',
          content: '支付成功',
        },
      ],
    }
  },
  methods: {
    next() {
      if (this.current < this.steps.length - 1) {
        this.current++
      }
    },
    prev() {
      if (this.current > 0) {
        this.current--
      }
    },
  },
}
</script>

<style lang="less" scoped>
.orderPayment {
  display: flex;
  flex-direction: column;
  width: 1440px;
  margin: auto;
  .stepsWrapper {
    margin-top: 40px;
    width: 800px;
    margin: auto;
    margin-top: 60px;
    // background-color: pink;
    .steps-content {
      margin-top: 16px;
      border: 1px dashed #e9e9e9;
      border-radius: 6px;
      background-color: #fafafa;
      min-height: 200px;
      text-align: center;
      padding-top: 80px;
    }

    .steps-action {
      margin-top: 24px;
    }
  }
  .productMsgWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 40px;
    // background-color: pink;
    height: 520px;
    .tittle {
      color: black;
      font-size: 16px;
      font-weight: 500;
    }
    .orderNumber {
      display: flex;
      padding: 0;
      margin: 0;
      li:first-child {
        color: black;
        font-size: 12px;
        font-weight: 400;
      }
      li:last-child {
        color: black;
        font-size: 12px;
        font-weight: 400;
      }
    }
    .msgTittle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      padding: 10px;
      background-color: #f2f2f2;
      .left {
        color: black;
        font-weight: 400;
      }
      .right {
        width: 800px;
        display: flex;
        padding: 0;
        margin: 0;
        justify-content: space-around;
        color: black;
        font-weight: 400;
      }
    }
  }
  .bottomPay {
    span {
      color: black;
      font-weight: 500;
      font-size: 16px;
    }
    .btn {
      width: 700px;
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      .ant-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        font-weight: 500;
        font-size: 16px;
      }
      .ant-btn:hover {
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        font-weight: 500;
        font-size: 16px;
        box-shadow: 2px 2px 5px 2px rgba(160, 160, 160, 0.2);
      }
    }
  }
}
.ant-steps-item-title {
  margin-top: 10px;
}
</style>