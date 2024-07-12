<template>
  <div class="paymentSuccess">
    <div class="stepsWrapper">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div class="successWrapper">
      <div class="success">
        <a-icon type="check-circle" theme="filled" style="color:#67c23a;fontSize:60px" />
        <span>订单支付成功</span>
        <div class="btn">
          <a-button @click="toHomePage" type="primary">
            返回首页
          </a-button>
          <a-button>订单管理</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
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
    toHomePage() {
      this.$router.push({
        path: '/productList',
      })
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
.paymentSuccess {
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
  .successWrapper {
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
      .btn {
        display: flex;
        justify-content: space-between;
        width: 200px;
        // background-color: pink;
        margin-top: 40px;
      }
    }
  }
}
</style>