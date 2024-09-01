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
                <a-input placeholder="请输入订单号" @input="inputContent" style="width: 250px" />
                <!-- 日期搜索 -->
                <div class="form-data">
                    <a-date-picker style="width: calc(50% - 12px)" />
                    <span style="width: 24px; text-align: center">-</span>
                    <a-date-picker style="width: calc(50% - 12px)" />
                </div>
                <!-- <a-button type="primary">搜索</a-button> -->
            </div>
        </div>
        <div class="contain">

            <div v-for="order in all" :key="order.id">
                <div class="del-but">
                    <div style="text-align: center;">订单号: {{ order.orderNo }}</div>
                    <a-button type="danger" @click="delClick([order.orderNo])">
                        删除订单
                    </a-button>
                </div>
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
                { value: -1, label: '全部订单' },
                { value: 0, label: '支付失败' },
                { value: 1, label: '待支付订单' },
                { value: 2, label: '支付成功' },//有商品
                { value: 5, label: '待发货订单' },
                { value: 6, label: '已发货订单' },
                { value: 7, label: '已签收订单' },

            ],
            selectedStatus: -1,
            orderID: '',

        };
    },
    methods: {
        onChange(goodStatus) {
            console.log("Selected value:", goodStatus[0]);
            this.selectedStatus = goodStatus[0]
            this.getGoodList()
        },
        inputContent(event) {
            this.orderID = event.target.value
            console.log('orderID', this.orderID);
            this.getGoodList()

        },
        async delClick(orderID) {
            // 获取订单号，删除操作
            console.log('orderID', orderID);
            this.delOrderList(orderID)


        },
        async getGoodList() {
            const params = {
                status: this.selectedStatus,
                orderNo: this.orderID,
                // startTime: '2024-07-11',
                // endTime: '2024-07-13'
            };
            let res = await api.goodsOrderList.goodsOrderList(params);
            // 检查 res.all 和 res.all.goodsOrderDetailList 是否存在并且是数组
            this.all = res.all
            console.log('res', res);
        },

        async delOrderList(orderID) {
            let delRes = await api.delOrderList.delOrderList(orderID)
            console.log('del', delRes);
            if (delRes.code == 200) {
                this.$message.success('删除成功')
                this.getGoodList()
            }
        }
    },
    mounted() {
        this.getGoodList();  // 加载订单列表

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

.del-but {
    display: flex;
    justify-content: space-between;
    /* 水平居中对齐 */
    align-items: center;
    /* 垂直居中对齐 */
    padding-top: 15px;
    color: #000;
    margin-bottom: 15px;
    font-weight: 600;
    padding-left: 30px;
    padding-right: 30px;
}
</style>