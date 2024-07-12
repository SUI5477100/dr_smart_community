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
        <li>{{orderNo}}</li>
      </ul>
      <div class="msgTittle">
        <div class="left">商品信息</div>
        <ul class="right">
          <li>单价</li>
          <li>数量</li>
          <li>小计</li>
        </ul>
      </div>
      <OrderList :goodsOrder="goodsOrder"></OrderList>
    </div>
    <div class="bottomPay">
      <span>选择支付方式</span>
      <div class="btn">
        <a-button style="width:200px;height:80px;" theme="filled" @click="showModal">
          <a-icon type="pay-circle" theme="filled" style="color:#ffae27;fontSize:24px" />余额支付
          <a-modal title="输入支付密码" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
            <p>钱包余额：{{userInfo.money}}</p>
            <a-input-password @change="inputPayPwd" v-model="payPassword" placeholder="请输入支付密码" />
          </a-modal>
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
import api from '../api/index'
// 引入组件
import OrderList from '../components/personalCenterComponents/ordersComponents/orderList.vue'
export default {
  // name: 'OrderSteps', // 确保组件名是多字词
  components: { OrderList },
  data() {
    return {
      ModalText: 'Content of the modal',
      userPwd: '',
      visible: false,
      confirmLoading: false,
      orderNo: '',
      payPassword: '',
      current: 0,
      goodsOrder: {},
      userInfo: {},
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
  mounted() {
    console.log(api)
    if (this.$route.query.orderNo) {
      this.orderNo = this.$route.query.orderNo
      console.log('订单号:', this.orderNo)
      this.getPaymentDetail()
    } else {
      console.warn('未找到订单号')
    }
  },
  methods: {
    inputPayPwd(value) {
      this.userPwd = value
      console.log('this.userPwd:------', this.userPwd)
      // this.getUserInfo()
    },
    showModal() {
      this.getUserInfo()
      this.visible = true
    },
    async handleOk(e) {
      console.log(e)
      this.confirmLoading = true
      let paymentOrder = {
        orderNo: this.orderNo,
        payPassword: this.payPassword,
      }
      try {
        const res = await api.payment.payOrder(paymentOrder)
        console.log('this is paymentOrder', paymentOrder)
        console.log('----------', res)
        if (res.code == 200) {
          this.$message.success('支付成功')
          this.current = 1 // 更新步骤条到第二步
          setTimeout(() => {
            this.$router.push({
              path: '/paymentSuccess',
            })
          }, 500)
          // this.getProductList()
          // this.goodsOrder = res.goodsOrder
          // console.log('this.goodsOrder', this.goodsOrder)
        } else {
          this.$message.error('支付失败')
        }
      } catch (error) {
        console.error('支付失败', error)
      }
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button', e)
      this.visible = false
    },
    async getPaymentDetail() {
      let goodsOrderNo = {
        orderNo: this.orderNo,
      }
      try {
        const res = await api.payment.paymentDetail(goodsOrderNo)
        console.log('this is goodsOrderNo', goodsOrderNo)
        console.log('获取商品详情', res.goodsOrder)
        if (res.code == 200) {
          this.$message.success('获取商品详情成功')
          // this.getProductList()
          this.goodsOrder = res.goodsOrder
          console.log('this.goodsOrder', this.goodsOrder)
        } else {
          this.$message.error('获取商品详情失败')
        }
      } catch (error) {
        console.error('获取失败', error)
      }
    },
    // 获取当前用户信息
    async getUserInfo() {
      try {
        const res = await api.payment.userInfo()
        console.log('获取当前用户信息', res.user)
        if (res.code == 200) {
          this.$message.success('获取当前用户信息成功')
          // this.getProductList()
          this.userInfo = res.user
          console.log('this.userInfo', this.userInfo)
        } else {
          this.$message.error('获取当前用户信息失败')
        }
      } catch (error) {
        console.error('获取失败', error)
      }
    },
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