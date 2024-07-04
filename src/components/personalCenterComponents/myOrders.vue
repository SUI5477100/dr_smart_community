<template>
    <div>
        <OrderSearch></OrderSearch>
        <OrderDetail></OrderDetail>
    </div>
</template>

<script>
import OrderSearch from './ordersComponents/orderSearch.vue'
import OrderDetail from './ordersComponents/orderDetail.vue'
export default {
    name: 'MyOrders', //导出组件名
    components:{
        OrderSearch,
        OrderDetail
    }
};
</script>

<style scoped></style>