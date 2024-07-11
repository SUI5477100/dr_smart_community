<template>
  <div class="productList">
    <div class="productListWrapper">
      <div class="productListContent">
        <!-- 面包屑
        <div class="breadcrumb">
          <a-breadcrumb class="breadcrumbContent">
            <a-breadcrumb-item>营养膳食</a-breadcrumb-item>
            <a-breadcrumb-item><a href="">营养早餐</a></a-breadcrumb-item>
            <a-breadcrumb-item><a href="">牛奶</a></a-breadcrumb-item>
          </a-breadcrumb>
        </div> -->
        <!-- 价格筛选 -->
        <ul class="screen">
          <li style="margin-left:-20px">价格筛选:</li>
          <li class="low">
            <a-input-number v-model="priceRange.low" placeholder="最低价格" />
          </li>
          <li>-</li>
          <li class="high">
            <a-input-number v-model="priceRange.high" placeholder="最高价格" />
          </li>
          <a-button type="primary" @click="filterByPrice">
            确定
          </a-button>
        </ul>
        <!-- 价格排序 -->
        <ul class="sort">
          <li style="margin-left:-20px">价格排序:</li>
          <li class="price" @click="handleSort('price')">价格<img src="../assets/image/sort.png"
              style="width:20px;height:20px"></li>
          <li class="sales" @click="handleSort('sales')">销量<img src="../assets/image/sort.png"
              style="width:20px;height:20px"></li>
        </ul>
        <!-- 商品列表外部盒子 -->
        <!-- 单个商品 -->
        <div class="listWrapper">
          <div class="plist" v-for="(item, index) in paginatedList" :key="item.id" @click="toProductDetails(item)">
            <div class="productImg" style="width:240px">
              <img :src="item.homeImg" style="width:240px" alt="">
            </div>
            <img :src="item.src" :key="index" style="width:240px;height:240px" alt="">
            <!-- 商品底部详情 -->
            <ul class="plistDetail">
              <div>
                <li>￥{{ item.price }}</li>
                <li>{{ item.goodsName }}</li>
                <li>{{ item.content }}</li>
                <li>销量：{{ item.saleCnt }}</li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <!-- 页码 -->
      <div class="pagination">
        <div id="components-pagination-demo-mini">
          <a-pagination size="small" :total="filteredList.length" :page-size="pageSize" :current="currentPage"
            @change="handlePageChange" @show-size-change="handlePageSizeChange" show-size-changer show-quick-jumper />
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import api from '../api/index'
export default {
  data() {
    return {
      categoryId: 12,
      plistForm: [], //商品列表数据
      filteredList: [],
      currentPage: 1,
      pageSize: 10,
      priceRange: {
        low: null,
        high: null,
      },
      sortBy: null,
      sortOrder: 'asc',
    }
  },
  mounted() {
    // this.filteredList = this.plistForm
    this.getProductList()
  },
  created() {
    console.log('Product ID:', this.$route.params.id);
  },
  computed: {
    paginatedList() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredList.slice(start, end)
    },
  },
  methods: {
    async getProductList() {
      try {
        const res = await api.goods.goodsList({
          page: 1,
          limit: 10,
          categoryId: this.$route.params.id,
          minPrice: -1,
          maxPrice: -1,
          key: '',
          sortByPrice: 1,
          sortBySaleCnt: 0,
        })
        console.log('商品列表数据', res.page.list)
        this.plistForm = res.page.list
        this.filteredList = this.plistForm
      } catch (error) {
        console.error('获取商品列表失败', error)
      }
    },
    filterByPrice() {
      this.filteredList = this.plistForm.filter((item) => {
        const low =
          this.priceRange.low !== null ? this.priceRange.low : -Infinity
        const high =
          this.priceRange.high !== null ? this.priceRange.high : Infinity
        return item.price >= low && item.price <= high
      })
      this.currentPage = 1 // 重置到第一页
    },
    toProductDetails(item) {
      console.log('-------------item:', item)

      // 将商品详情保存到 localStorage
      // localStorage.setItem('productDetails', JSON.stringify(item))
      // 导航到商品详情页
      this.$router.push({ path: `/productDetails/${item.id}` })
    },
    handlePageChange(page) {
      this.currentPage = page
    },
    handleSort(sortKey) {
      if (this.sortBy === sortKey) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortBy = sortKey
        this.sortOrder = 'asc'
      }
      this.sortList()
    },
    sortList() {
      if (this.sortBy) {
        this.filteredList.sort((a, b) => {
          if (this.sortOrder === 'asc') {
            return a[this.sortBy] > b[this.sortBy] ? 1 : -1
          } else {
            return a[this.sortBy] < b[this.sortBy] ? 1 : -1
          }
        })
      }
    },
    // toProductDetails(item) {
    //   this.$router.push({ name: 'ProductDetails', params: { product: item } })
    // },
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

        .breadcrumbContent ant-breadcrumb>span>ant-breadcrumb-link {
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

        >li {
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

        li:first-child {
          font-size: 14px;
          color: black;
          margin-left: 40px;
        }

        li:nth-child(2) {
          cursor: pointer;
          font-size: 14px;
          color: black;
          margin-left: 40px;
        }

        li:last-child {
          cursor: pointer;
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

        .plist:hover {
          cursor: pointer;
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
.ant-breadcrumb>span:last-child a {
  color: black;
  font-size: 14px;
}

// .plist:last-child {
//   margin-right: auto;
//   margin-left: 20px;
// }</style>