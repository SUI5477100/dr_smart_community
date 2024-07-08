<template>
    <div class="orders-container ">
        <OrderStatus></OrderStatus>
        <OrderList></OrderList>
        <OrderStatus></OrderStatus>
        <OrderList></OrderList>
    </div>
</template>

<script>
import OrderStatus from './orderStatus.vue'
import OrderList from './orderList.vue'
export default {
    name: 'OrderContainer',
    components: {
        OrderStatus,
        OrderList
    }
};
</script>

<style scoped>
.orders-container {
    margin-left: 20px;
    margin-right: 20px;
    /* background-color: red; */
    max-height: 350px;
    /* 设置一个最大高度 */
    overflow-y: auto;
    /* 设置滚动条 */
}
</style>