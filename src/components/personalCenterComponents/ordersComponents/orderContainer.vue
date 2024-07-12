<template>
    <div class="orders-container ">
        <NavOrder></NavOrder>
       
    </div>
</template>

<script>
import NavOrder from './navOrder.vue'
export default {
    name: 'OrderContainer',
    components: {
        NavOrder
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