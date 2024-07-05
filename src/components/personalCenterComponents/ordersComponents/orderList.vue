<template>
    <div>
        <div class="contain" v-for="goods in goodsList" :key="goods.id">
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
                总价：
            </div>
    </div>
</template>

<script>

export default {
    name: 'OrderList', //导出组件名
    data () {
        return {
            goodsList:[{
                url:'../../../assets/taobao.png',
                name:'强力胶水',
                price:'34',
                quantity:'2',
                subtotal:'68'
            },
            {
                name:'强力胶水',
                price:'34',
                quantity:'2',
                subtotal:'68'
            },
            {
                name:'强力胶水',
                price:'34',
                quantity:'2',
                subtotal:'68'
            },
            {
                name:'强力胶水',
                price:'34',
                quantity:'2',
                subtotal:'68'
            },
            {
                name:'强力胶水',
                price:'34',
                quantity:'2',
                subtotal:'68'
            }]
        }
    }
};
</script>

<style scoped lang="less">


.goods {
    display: flex;
    margin-left: 20px;
    margin-right: 20px;
    border-top: 15px;
    border: 1px solid #f1f1f1;
    padding: 15px 40px 15px 30px
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

.subtotal {
    display: flex;
    color: red;
    font-size: medium;
    flex: 1;
    justify-content: end;
}
</style>