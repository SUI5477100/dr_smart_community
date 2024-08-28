<template>
    <div>
        <!-- <OrderSearch></OrderSearch> -->
        <OrderContainer></OrderContainer>
    </div>
</template>

<script>
// import OrderSearch from './ordersComponents/orderSearch.vue'
import OrderContainer from './ordersComponents/orderContainer.vue'
export default {
    name: 'NavOrders', //导出组件名
    components: {
        // OrderSearch,
        OrderContainer
    }
};
</script>

<style scoped></style>