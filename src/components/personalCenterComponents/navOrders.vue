<template>
    <div>
        <!-- <OrderSearch></OrderSearch> -->
        <OrderContainer class="center"></OrderContainer>
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

<style scoped>
.center {
    margin-top: 30px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}
</style>