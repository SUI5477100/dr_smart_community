<template>
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="我的订单" />
    <div class="order-search">
      <a-cascader :options="options" placeholder="全部订单" @change="onChange" style="width: 120px" />
      <a-input placeholder="请输入订单号" @input="debounceInput" style="width: 250px" />
      <div class="form-data">
        <a-date-picker style="width: calc(50% - 12px)" />
        <span style="width: 24px; text-align: center">-</span>
        <a-date-picker style="width: calc(50% - 12px)" />
      </div>
      <a-button type="primary">搜索</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSearch',
  data() {
    return {
      options: [
        { value: 'allOrders', label: '全部订单' },
        { value: 'refundOrders', label: '退货订单' },
        { value: 'pendingShipmentOrders', label: '待发货订单' },
        { value: 'unpaidOrder', label: '未支付订单' },
        { value: 'ordersAwaitingReceipt', label: '待收货订单' },
      ],
      debounceInput: null, // 存储防抖函数引用
    };
  },
  methods: {
    onChange(value) {
      console.log("Selected value:", value);
    },
    onChangeID(event) {
      console.log("Input value:", event.target.value);
    },
    debounce(fn, delay) {
      let timer = null;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, delay);
      };
    }
  },
  created() {
    this.debounceInput = this.debounce(this.onChangeID, 1000);
  }
};
</script>

<style scoped>
.order-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 20px;
}

.form-data {
  display: flex;
  align-items: center;
  width: 300px;
}

.form-data a-date-picker {
  flex: 1;
}

.form-data span {
  width: 24px;
  text-align: center;
  line-height: 32px; 
}
</style>
