<template>
    <div class="contain">
        <div v-for="goods in goodsList" :key="goods.id">
            <div class="goods">
                <div class="goods-item">
                    <img class="goods-img" :src="goods.url">
                    <div class="goods-name">{{ goods.name }}</div>
                </div>
                <div class="price">
                    <div>￥</div>
                    <div class="price-item">{{ goods.price }}</div>
                </div>
                <div class="quantity">
                    <div>x</div>
                    <div class="quantity-item">{{ goods.quantity }}</div>
                </div>
                <div class="subtotal">
                    <div>￥</div>
                    <div class="subtotal-item">{{ goods.subtotal }}</div>
                </div>
            </div>

        </div>
        <div class="total-price">
            <div>总价：</div>
            <div>272.00</div>
        </div>
    </div>
</template>

<script>
import api from '../../../api/index'
export default {
    name: 'navOrder', //导出组件名
    data() {
        return {
            goodsList: [
                {
                    url: require('../../../assets/taobao.png'),
                    name: '强力胶水',
                    price: '38097',
                    quantity: '2',
                    subtotal: '68',
                },
                {
                    url: require('../../../assets/taobao.png'),
                    name: '强力胶水',
                    price: '34',
                    quantity: '2',
                    subtotal: '68',
                },
                {
                    url: require('../../../assets/taobao.png'),
                    name: '强力胶水',
                    price: '34',
                    quantity: '2',
                    subtotal: '68',
                },
                {
                    url: require('../../../assets/taobao.png'),
                    name: '强力胶水',
                    price: '34',
                    quantity: '2',
                    subtotal: '68',
                },
            ],
            methods: {
                async getGoodList() {
                    const params = {
                        status: -1,
                        // orderNo:'1720',
                        // startTime:'2024-07-11',
                        // endTime:'2024-07-11 18:00:00'
                    };
                    // console.log('param', params.status);
                    let res = await api.goodsOrderList.goodsOrderList(params);

                    // // 检查 res.all 和 res.all.goodsOrderDetailList 是否存在并且是数组
                    // if (res && res.all && Array.isArray(res.all.goodsOrderDetailList)) {
                    //     this.goodsList = res.all.goodsOrderDetailList.map(goods => {
                    //         console.log('fgdhjslagfg', goods.id);
                    //         return {
                    //             id: goods.id
                    //         };
                    //     });
                    // } else {
                    //     console.log('res.all.goodsOrderDetailList is undefined or not an array');
                    //     this.goodsList = [];  // Ensure goodsList is always an array to prevent UI errors.
                    // }

                    console.log('res', res);
                },
            },
            mounted() {
                this.getGoodList()
            },
        }
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