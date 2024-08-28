<template>
    <div class="parent">
        <div class="search">
            <titleBar>
                我的订单
            </titleBar>
            <div class="order-search">
                <!-- 状态搜索 -->
                <a-cascader :options="options" placeholder="全部订单" @change="onChange" style="width: 120px" />
                <!-- 订单号搜索 -->
                <a-input placeholder="请输入订单号" @input="debounceInput" style="width: 250px" />
                <!-- 日期搜索 -->
                <div class="form-data">
                    <a-date-picker style="width: calc(50% - 12px)" />
                    <span style="width: 24px; text-align: center">-</span>
                    <a-date-picker style="width: calc(50% - 12px)" />
                </div>
                <a-button type="primary">搜索</a-button>
            </div>
        </div>
        <div class="contain">

            <div v-for="order in all" :key="order.id">
                <p>订单号: {{ order.orderNo }}</p>
                <div v-for="orderDetail in order.goodsOrderDetailList" :key="orderDetail.id">
                    <div class="goods">
                        <div class="goods-item">
                            <img class="goods-img" :src="orderDetail.goodsHomeUrl">
                            <div class="goods-name">{{ orderDetail.goodsName }}</div>
                        </div>
                        <div class="price">
                            <div>￥</div>
                            <div class="price-item">{{ orderDetail.singlePrice }}</div>
                        </div>
                        <div class="quantity">
                            <div>x</div>
                            <div class="quantity-item">{{ orderDetail.cnt }}</div>
                        </div>
                        <div class="subtotal">
                            <div>￥</div>
                            <div class="subtotal-item">{{ orderDetail.totalPrice }}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import api from '../../../api/index'
import titleBar from '../memberCenterComponents/titleBar.vue';
export default {
    name: 'navOrder',
    components: {
        titleBar
    },
    data() {
        return {
            all: [
                {
                    goodsOrderDetailList: []
                },
            ],
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
        async getGoodList() {
            const params = {
                status: -1,
                // orderNo: 1720,
                // startTime: '2024-07-11',
                // endTime: '2024-07-13'
            };
            let res = await api.goodsOrderList.goodsOrderList(params);
            // 检查 res.all 和 res.all.goodsOrderDetailList 是否存在并且是数组
            this.all = res.all
            console.log('res', res);
        },
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
        },
        created() {
            this.debounceInput = this.debounce(this.onChangeID, 1000);
        }
    },
    mounted() {
        this.getGoodList();
    },
}

</script>

<style scoped lang="less">
.contain {
    margin-left: 20px;
    margin-right: 20px;
}

.goods {
    display: flex;
    border: 1px solid #f1f1f1;
    padding: 15px 40px 15px 30px;
}

.goods+.goods {
    border-top: none;
    /* 移除除第一个项之外的上边框 */
}

.goods-img {
    width: 50px;
    height: 50px;
    background-color: red;
    margin-right: 15px;
}

.goods-item {
    display: flex;
    flex: 5;
}

.price {
    display: flex;
    flex: 2;
}

.quantity {
    display: flex;
    flex: 2;
}

.total-price {
    display: flex;
    justify-content: end;
    color: red;
    font-size: large;
    margin-top: 15px;
    margin-bottom: 25px;
    font-weight: 500;
    margin-right: 15px;
}

.subtotal {
    display: flex;
    color: red;
    font-size: medium;
    flex: 1;
    justify-content: end;
}

.order-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 20px;
}

.parent {
    min-height: 100vh;
    /* 使得父元素足够高，可以滚动 */
}

.search {
    position: sticky;
    top: 0;
    /* 在距离视口顶部 0px 时开始固定 */
    background-color: white;
    /* 可能需要设置背景色以覆盖下面的内容 */
    z-index: 1000;
    /* 确保这个元素在滚动时保持在顶层 */
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