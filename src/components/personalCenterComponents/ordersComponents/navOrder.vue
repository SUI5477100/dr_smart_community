<template>
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
        <!-- <div class="total-price">
            <div>总价：</div>
            <div>272.00</div>
        </div> -->
    </div>
</template>

<script>
import api from '../../../api/index'
export default {
    name: 'navOrder',
    data() {
        return {
            all:[
                {
                    goodsOrderDetailList: []
                },
            ]
        };
    },
    methods: {
        async getGoodList() {
            const params = {
                status: -1,
                // 添加其他需要的参数
            };
            let res = await api.goodsOrderList.goodsOrderList(params);
            // 检查 res.all 和 res.all.goodsOrderDetailList 是否存在并且是数组
            this.all = res.all
            console.log('res', res);
        },
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
</style>