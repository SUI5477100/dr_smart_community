<template>
  <div class="productList">
    <div class="productListWrapper">
      <div class="productListContent">
        <!-- 面包屑 -->
        <div class="breadcrumb">
          <a-breadcrumb class="breadcrumbContent">
            <a-breadcrumb-item>营养膳食</a-breadcrumb-item>
            <a-breadcrumb-item><a href="">营养早餐</a></a-breadcrumb-item>
            <a-breadcrumb-item><a href="">牛奶</a></a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <!-- 价格筛选 -->
        <ul class="screen">
          <li style="margin-left:-20px">价格筛选:</li>
          <li class="low">最低价格</li>
          <li>-</li>
          <li class="high">最高价格</li>
          <a-button type="primary">
            确定
          </a-button>
        </ul>
        <!-- 价格排序 -->
        <ul class="sort">
          <li style="margin-left:-20px">价格排序:</li>
          <li class="price">价格<img src="../assets/image/sort.png" style="width:20px;height:20px"> </li>
          <li class="sales">销量<img src="../assets/image/sort.png" style="width:20px;height:20px"></li>
        </ul>
        <!-- 商品列表外部盒子 -->
        <!-- 单个商品 -->
        <router-link to='/productDetails' class="listWrapper">
          <div class="plist" v-for="(item,index) in plistForm" :key="item.id">
            <!-- <div class="productImg" style="width:240px">
            <img :src="item.img" style="width:240px" alt="">
          </div> -->
            <img :src="item.src" :key="index" style="width:240px;height:240px" alt="">
            <!-- 商品底部详情 -->
            <ul class="plistDetail">
              <div>
                <li>{{item.price}}</li>
                <li>{{item.name}}</li>
                <li>{{item.name}}</li>
                <li>{{item.sort}}</li>
              </div>
            </ul>
          </div>
        </router-link>
      </div>
      <!-- 页码 -->
      <div class="pagination">
        <div id="components-pagination-demo-mini">
          <a-pagination size="small" :total="50" show-size-changer show-quick-jumper />
        </div>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      plistForm: [
        {
          id: 1,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
        {
          id: 2,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
        {
          id: 3,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
        {
          id: 4,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
        {
          id: 5,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
        {
          id: 6,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
        {
          id: 1,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
        {
          id: 2,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
        {
          id: 3,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
        {
          id: 4,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
        {
          id: 5,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
        {
          id: 6,
          src: require('../assets/taobao.png'),
          price: '￥220.8',
          name: '蒙牛纯牛奶250ml*16',
          nameLittle: '蒙牛纯牛奶250ml*16',
          sort: '10',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.productList {
  // 列表内容和页码的外部大盒子
  .productListWrapper {
    // 商品列表内容
    .productListContent {
      width: 1440px;
      margin: auto;
      .breadcrumb {
        margin-top: 5px;
        .breadcrumbContent ant-breadcrumb > span > ant-breadcrumb-link {
          font-weight: 700;
          color: black;
        }
      }
      .screen {
        margin-top: 20px;
        margin-bottom: 0px;
        display: flex;
        align-items: center;
        width: 1440px;
        height: 60px;
        background-color: white;
        border: 1px solid #f2f2f2;
        > li {
          font-size: 14px;
          color: black;
          padding: 0;
          margin-left: 40px;
        }
        .low,
        .high {
          // text-align: center;
          line-height: 40px;
          width: 120px;
          height: 40px;
          padding-left: 10px;
          border: 1px solid #f2f2f2;
          background-color: white;
          color: #ceccce;
        }
        button {
          width: 72px;
          height: 40px;
          text-align: center;
          margin-left: 20px;
          border: none;
          border-radius: 3px;
          color: white;
          font-size: 14px;
          background-color: #1e90ff;
        }
      }
      .sort {
        margin-top: 0px;
        margin-top: -1px;
        display: flex;
        align-items: center;
        width: 1440px;
        height: 60px;
        background-color: white;
        border: 1px solid #f2f2f2;
        > li {
          font-size: 14px;
          color: black;
          margin-left: 40px;
        }
      }
      .listWrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        row-gap: 15px;
        margin-top: 30px;
        width: 1440px;
        height: 100%;

        .plist {
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding: 15px;
          padding-top: 30px;
          width: 272px;
          height: 450px;
          background-color: white;
          border: 1px solid #f2f2f2;

          .plistDetail {
            width: 240px;
            height: 200px;
            margin-top: 20px;
            padding: 0;
            // background-color: #ceccce;
            div {
              display: flex;
              flex-direction: column;
              row-gap: 5px;
              li:first-child {
                color: red;
                font-size: 24px;
                font-weight: 500;
              }
              li:last-child {
                color: black;
                font-weight: 500;
              }
              li:nth-child(2) {
                color: black;
                font-weight: 500;
                font-size: 16px;
              }
              li:nth-child(3) {
                color: #9b9c9c;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
  // 页码
  .pagination {
    width: 1440px;
    margin: auto;
    padding: 0px;
    padding: 50px 0;
  }
}
.ant-breadcrumb,
.ant-breadcrumb-link,
.ant-breadcrumb a,
.ant-breadcrumb > span:last-child a {
  color: black;
  font-size: 14px;
}
.plist:last-child {
  margin-right: auto;
  margin-left: 20px;
}
</style>