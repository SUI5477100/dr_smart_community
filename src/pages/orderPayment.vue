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
      <div class="tittle"></div>
      <div class="orderNumber"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSteps', // 确保组件名是多字词
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
  margin-top: 40px;

  margin: auto;
  .stepsWrapper {
    margin-top: 40px;
    width: 800px;
    margin: auto;
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
}
.ant-steps-item-title {
  margin-top: 10px;
}
</style>