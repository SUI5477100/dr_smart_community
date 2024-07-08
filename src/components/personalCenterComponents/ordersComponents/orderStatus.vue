<template>
    <div class="orders-container">
        <!-- 订单号 -->
        <div class="shop-top" v-for="order in orders" :key="order.id">
            <!-- 左侧订单号 -->
            <div class="shop-id">
                <div class="shop-id-text">订单号：</div>
                <div class="shop-id-number">{{ order.id }}</div>
            </div>
            <!-- 右侧状态栏 -->
            <div class="status">
                <!-- 订单状态 -->
                <div class="status-item">
                    <div class="status-item-text">状态：</div>
                    <div>
                        <a-tag :color="order.color">
                            {{ order.status }}
                        </a-tag>
                    </div>
                </div>
                <div class="status-data">
                    {{ order.dataTime }}
                </div>
            </div>
        </div>


    </div>
</template>

<script>

export default {
    name: 'OrderStatus', //导出组件名
    data() {
        return {
            orders: [
                {
                    id: '2024042534526716473295824',
                    color: 'red',
                    status: '代发货',
                    dataTime: '2024-04-25 21:53:46'
                },
              
            ]
        }
    }
};
</script>

<style scoped lang="less">
.orders-container {
    margin-left: 20px;
    margin-right: 20px;
}

.shop-top {
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 20px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f6f6f6;
}

.shop-id {
    display: flex;
}

.status {
    display: flex;
    justify-content: end;

}

.status-item {
    display: flex;
    margin-right: 20px;

}

.shop-list {
    border: 2px solid black;
    margin-top: 15px;
}
</style>