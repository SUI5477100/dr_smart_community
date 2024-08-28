<template>
  <!-- 订单支付页面的商品列表 -->
  <div class="contain">
    <div v-for="goods in goodsOrder.goodsOrderDetailList" :key="goods.id">
      <div class="goods">
        <div class="goods-item">
          <img class="goods-img" :src="goods.goodsHomeUrl">
          <div class="goods-name">{{ goods.goodsName }}</div>
        </div>
        <div class="price">
          <div>￥</div>
          <div class="price-item">{{ goods.singlePrice }}</div>
        </div>
        <div class="quantity">
          <div>x</div>
          <div class="quantity-item">{{ goods.cnt }}</div>
        </div>
        <div class="subtotal">
          <div>￥</div>
          <div class="subtotal-item">{{ goods.totalPrice }}</div>
        </div>
      </div>
    </div>
    <div class="total-price">
      <div>总价：</div>
      <div>{{goodsOrder.totalPrice}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList', //导出组件名
  props: {
    goodsOrder: {
      type: Object,
      default: () => ({ goodsOrderDetailList: [] }),
    },
  },
  data() {
    return {
      goodsList: [
        {
          url: require('../../../assets/taobao.png'),
          name: '强力胶水',
          price: '34',
          quantity: '2',
          subtotal: '68',
        },
      ],
    }
  },
  mounted() {
    console.log('this.goodsOrder', this.goodsOrder)
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

.goods + .goods {
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