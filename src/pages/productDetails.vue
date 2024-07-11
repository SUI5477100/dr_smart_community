<template>
  <div class="productDetails">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <a-breadcrumb class="breadcrumbContent">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">**</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="">{{goods.goodsName}}</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="productDetailsWrapper">
      <!-- 商品图片 -->
      <div class="pImgWrapper">
        <a-carousel arrows dots-class="slick-dots slick-thumb">

          <a slot="customPaging" slot-scope="props">
            <img :src="getImgUrl(props.i)" />
          </a>
          <div v-for="(item,index) in goods.detailsImg" :key="index">
            <img :src="item" />
          </div>
          <!-- 左右按钮切换图片 -->
          <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1;">
            <a-icon type="caret-left" />
          </div>
          <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px;">
            <a-icon type="caret-right" />
          </div>
        </a-carousel>
      </div>
      <!-- 商品详情信息 -->
      <div class="pDetailWrapper">
        <!-- 右侧商品名称、收藏按钮 -->
        <div class="pDetailHeader">
          <div class="pNameLeft">
            <div class="pName">{{ goods.goodsName }}</div>
            <div class="pNameSmall">{{goods.goodsName}}</div>
          </div>
          <div class="pCollectRight">
            <a-button type="primary" style="text-align:center;font-size:12px" @click="toggleFavorite">
              <span>{{ goods.isCollect ? '已收藏' : '收藏' }}</span>
              <!-- <a-icon type="star" /> -->
              <a-icon :type="goods.isCollect ? 'star' : 'star-o'" :theme="goods.isCollect ? 'filled' : 'outlined'" />
            </a-button>
          </div>
        </div>
        <!-- 右侧商品中间价格、销量等 -->
        <ul class="pDetailMiddle">
          <div>
            <li>
              <span>门店价格：</span>
              <span>￥{{goods.price}}</span>
            </li>
            <li>
              <span>市场价格：</span>
              <span>￥{{goods.price}}</span>
            </li>
            <li>
              <span>累计销量：</span>
              <span>{{goods.saleCnt}}件</span>
            </li>
            <li>
              <span>收藏次数：</span>
              <span>{{goods.collectCnt}}次</span>
            </li>
          </div>
        </ul>
        <!-- 右侧底部商品购买地址及数量 -->
        <div class="pDetailBottom">
          <!-- 选择自提点部分 -->
          <div class="selectAddressPickUpSite">
            <span>选择自提点：</span>

            <div class="address">
              <a-cascader :options="options" placeholder="Please select" @change="handleChange" />
              <!-- <a-select default-value="龙湖舜山府" style="width: 200px" @change="handleChange">
                <a-select-option value="龙湖舜山府">
                  龙湖舜山府
                </a-select-option>
              </a-select> -->
            </div>
            <div class="pickUpSite">
              <a-select default-value="" style="width: 200px" @change="handleChange2">
                <a-select-option v-for="store in storeList" :key="store.id" :value="store.id">
                  {{store.storeName}}
                </a-select-option>
              </a-select>
            </div>
          </div>
          <!-- 购买数量部分 -->
          <div class="purchaseQuantity">
            <span>购买数量:</span>
            <!-- 选择购买的数量 -->
            <div class="number">
              <a-input-number v-model="quantity" :min="1" @change="updateQuantity" />
            </div>
            <!-- 库存 -->
            <div class="inventory">
              <span>库存：</span>
              <span>999件</span>
            </div>
          </div>
        </div>
        <!-- 底部加入购物车按钮 -->
        <div class="addCart">
          <a-button type="primary" style="text-align:center;font-size:12px" @click="addToCart()">
            <a-icon type="shopping-cart" />
            <span>加入购物车</span>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/index'
export default {
  props: {
    initialProduct: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: -1,
      goods: {},
      // goods: { ...this.initialProduct },
      // goodsDetailForm: {
      //   quantity,
      // },
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
      ],
      storeId: -1,
      storeList: [],
      selectedStore: null,
      quantity: 0,
    }
  },
  created() {
    this.id = this.$route.params.id
    // console.log('------------id:', id)
    // if (id) {
    //   this.goods = JSON.parse(productData)
    // } else {
    //   // 处理没有商品数据的情况
    //   this.$router.push({ name: 'ProductList' })
    // }
  },
  mounted() {
    this.getDetail()
    this.getAreaList()
  },
  methods: {
    async getAddCart() {
      let addToCartData = {
        goodsId: this.id,
        storeId: this.storeId,
        cnt: this.quantity,
      }
      try {
        const res = await api.goods.addCart(addToCartData)
        console.log('商品列表数据', JSON.stringify(res))
        if (res.code == 200) {
          this.$message.success('商品添加成功')
        } else {
          this.$message.error('商品添加失败')
        }
        // this.plistForm = res.page.list
        // this.filteredList = this.plistForm
      } catch (error) {
        console.error('获取失败', error)
      }
    },
    async getDetail() {
      let res = await api.goods.getGoodsDetail(this.id)
      if (res.code == 200) {
        this.goods = res.goods
      }
      console.log(res)
    },
    addToCart() {
      this.getAddCart()
    },
    // 获取区域列表数据
    async getAreaList() {
      try {
        const res = await api.goods.areaList()
        if (res.code == 200) {
          this.options = this.transformAreaData(res.all)
        }
        console.log('区域列表数据', res.all)
        // this.options = res.all
      } catch (error) {
        console.error('获取失败', error)
      }
    },
    transformAreaData(data) {
      return data.map((area) => {
        return {
          value: area.id,
          label: area.areaName,
          children: area.childAreaList
            ? this.transformAreaData(area.childAreaList)
            : null,
        }
      })
    },
    // onChange(value) {
    //   console.log(value)
    // },
    getImgSrc(item) {
      if (item.startsWith('local:')) {
        return require(`../assets/image/${item.replace('local:', '')}`)
      }
      return item
    },
    getImgUrl(i) {
      //   return `${baseUrl}abstract0${i + 1}.jpg`
      return this.goods.detailsImg[i]
    },
    // 选择自提点 下拉框
    handleChange(value) {
      console.log(`selected ${value[2]}`)
      let areaId = value[2]
      console.log('this is store id---', areaId)
      let data = {
        areaId: areaId,
        goodsId: this.id,
      }
      this.getStoreInfo(data)
    },
    handleChange2(value) {
      this.storeId = value
      // console.log('this is toCartGoods---', toCartGoods)
    },
    // 数量的数字输入框
    updateQuantity(value) {
      this.quantity = value
      console.log('qunatity value:------', this.quantity)
      console.log(value)
    },
    toggleFavorite() {
      this.goods.isCollect = !this.goods.isCollect
      if (this.goods.isCollect) {
        this.goods.collectCnt += 1
      } else {
        this.goods.collectCnt -= 1
      }
      localStorage.setItem('productDetails', JSON.stringify(this.goods))
      console.log(`Favorite status: ${this.goods.isCollect}`)
    },
    async getStoreInfo(data) {
      let res = await api.goods.storeList(data)
      console.log('this is ---------res:', res)
      if (res.code == 200) {
        this.storeList = res.storeList
        console.log('this is storeList--------------', this.storeList)
      } else {
        this.$message.error(res.msg)
      }
    },
    // updateQuantity(value) {
    //   this.quantity = value
    // },
  },
}
</script>

<style lang="less" scoped>
.productDetails {
  width: 1440px;
  margin: auto;
  .breadcrumb {
    margin-top: 20px;
    .breadcrumbContent ant-breadcrumb > span > ant-breadcrumb-link {
      font-weight: 700;
      color: black;
    }
  }
  .productDetailsWrapper {
    display: flex;
    justify-content: space-between;
    padding: 20px 0 50px 0;
    .pImgWrapper {
      width: 540px;
      height: 640px;
      border: 2px solid #f2f2f2;
    }
    .pDetailWrapper {
      display: flex;
      flex-direction: column;
      //   justify-content: space-between;
      width: 860px;
      //   background-color: antiquewhite;
      //   background-color: antiquewhite;
      .pDetailHeader {
        display: flex;
        justify-content: space-between;
        .pNameLeft {
          .pName {
            color: black;
            //   font-weight: 500;
            font-size: 20px;
          }
          .pNameSmall {
            margin-top: 5px;
          }
        }
        .pCollectRight {
          text-align: center;
        }
      }
      .pDetailMiddle {
        display: flex;
        align-items: center;
        margin-top: 20px;
        height: 160px;
        background-color: #f3f3f3;
        padding: 20px;
        div {
          width: 860px;
          height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          li:first-child {
            span:first-child {
              color: black;
              font-weight: 500;
              font-size: 12px;
            }
            span:last-child {
              color: #cb1b29;
              font-size: 20px;
              font-weight: 700;
            }
          }
          li:nth-child(2) {
            span:first-child {
              color: #bdbdbd;
              font-weight: 500;
              font-size: 12px;
            }
            span:last-child {
              text-decoration: line-through;
              color: black;
              font-weight: 500;
            }
          }
          li:nth-child(3) {
            span:first-child {
              color: black;
              font-weight: 500;
              font-size: 12px;
            }
            span:last-child {
              color: black;
              font-weight: 500;
            }
          }
          li:last-child {
            span:first-child {
              color: black;
              font-weight: 500;
              font-size: 12px;
            }
            span:last-child {
              color: black;
              font-weight: 500;
            }
          }
        }
      }
      .pDetailBottom {
        margin-top: 10px;
        .selectAddressPickUpSite {
          display: flex;
          align-items: center;
          span {
            color: #969195;
            font-weight: 400;
          }
          .address,
          .pickUpSite {
            margin-left: 10px;
          }
        }
        .purchaseQuantity {
          display: flex;
          align-items: center;
          margin-top: 20px;
          span {
            color: #969195;
            font-weight: 400;
          }
          .number {
            margin-left: 35px;
          }
          .inventory {
            margin-left: 10px;
            span {
              color: black;
              font-weight: 400;
              font-size: 12px;
            }
          }
        }
      }
      .addCart {
        display: flex;
        align-items: center;
        margin-top: 20px;
        span {
          margin-left: 8px;
        }
      }
    }
  }
}
.ant-breadcrumb,
.ant-breadcrumb-link,
.ant-breadcrumb a,
.ant-breadcrumb > span:last-child a {
  color: black;
  font-size: 14px;
}

// 商品图片 走马灯
/* For demo */
.ant-carousel ::v-deep .slick-dots {
  height: auto;
}
.ant-carousel ::v-deep .slick-slide img {
  //   border: 5px solid #fff;
  //   display: block;
  width: 520px;
  height: 500px;
  //   margin: auto;
  padding: 20px;
}
.ant-carousel ::v-deep .slick-thumb {
  bottom: -100px;
}
.ant-carousel ::v-deep .slick-thumb li {
  width: 75px;
  height: 75px;
  margin: 0 5px;
}
.ant-carousel ::v-deep .slick-thumb li img {
  width: 100%;
  height: 100%;
  //   filter: grayscale(100%);
}
.ant-carousel ::v-deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}

.ant-carousel ::v-deep .custom-slick-arrow {
  width: 50px;
  height: 50px;
  font-size: 50px;
  color: #f3f3f3;
  margin-top: 290px;
  background-color: white;
  //   opacity: 0.3;
}
.ant-carousel ::v-deep .custom-slick-arrow:before {
  display: none;
}
.ant-carousel ::v-deep .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel ::v-deep .slick-slide h3 {
  color: #fff;
}
</style>