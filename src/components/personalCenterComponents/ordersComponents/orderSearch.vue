<template>
    <div>
        <a-cascader :options="options" placeholder="全部订单" @change="onChange" />
        
    </div>
</template>

<script>

export default {
    name: 'OrderSearch', //导出组件名
    data() {
    return {
      options: [
        {
          value: 'allOrders',
          label: '全部订单',
    
        },
        {
          value: 'refundOrders',
          label: '退货订单',
       
        },
        {
          value: 'pendingShipmentOrders',
          label: '待发货订单',
       
        },
        {
          value: 'unpaidOrder',
          label: '未支付订单',
       
        },
      ],
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped></style>