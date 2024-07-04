<template>
  <div class="productDetails">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <a-breadcrumb class="breadcrumbContent">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">**</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="">蒙牛纯牛奶250ml*16</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="productDetailsWrapper">
      <!-- 商品图片 -->
      <div class="pImgWrapper">
        <a-carousel arrows dots-class="slick-dots slick-thumb">
          <a slot="customPaging" slot-scope="props">
            <img :src="getImgUrl(props.i)" />
          </a>
          <div v-for="(item,index) in 4" :key="index">
            <img :src="baseUrl + 'abstract0' + item + '.jpg'" />
          </div>
        </a-carousel>
        <!-- <div class="pImgBig">
          <img src="../assets/taobao.png" style="width:480px" alt="">
        </div>
        <div class="pImgSmall"></div> -->
      </div>
      <!-- 商品详情信息 -->
      <div class="pDetailWrapper">
        <div class="pDetailHeader">
          <div class="pNameLeft">
            <div class="pName">蒙牛纯牛奶250ml*16</div>
            <div class="pNameSmall">蒙牛纯牛奶250ml*16</div>
          </div>
          <div class="pCollectRight">
            <a-button type="primary" style="text-align:center">
              已收藏 <img src="../assets/image/collect.png" style="width:16px" alt="">
            </a-button>
          </div>
        </div>
        <ul class="pDetailMiddle">
          <div>
            <li>门店价格：</li>
            <li>市场价格：</li>
            <li>累计销量：</li>
            <li>收藏次数：</li>
          </div>
        </ul>

      </div>
    </div>

  </div>
</template>

<script>
const baseUrl =
  'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/'
export default {
  data() {
    return {
      baseUrl,
    }
  },
  methods: {
    getImgUrl(i) {
      return `${baseUrl}abstract0${i + 1}.jpg`
    },
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
      justify-content: space-between;
      width: 860px;
      background-color: antiquewhite;
      //   background-color: antiquewhite;
      .pDetailHeader {
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
        background-color: aquamarine;
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
  width: 100px;
  height: 100px;
}
.ant-carousel ::v-deep .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}
.ant-carousel ::v-deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>