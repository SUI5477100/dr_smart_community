<template>
  <div class="navigation-container">
    <div class="menu-wrapper">
      <a-menu v-model="current" mode="horizontal" class="custom-menu">
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <template v-if="item.key === '/productList' && current === '/productList'">
            <a-dropdown>
              <template #overlay>
                <a-menu>
                  <a-menu-item v-for="(dropdown, dropdownIndex) in dropdownList" :key="dropdownIndex"
                    @mouseover="toggleCard(dropdownIndex, true)" @mouseleave="toggleCard(dropdownIndex, false)">
                    <a href="" style="color: #000;">{{ dropdown.content }}</a>
                    <a-card v-show="dropdown.showCard" style="position: absolute; left: 100%; top: 0;">
                      <div v-for="(card, cardIndex) in dropdown.cards" :key="'card-' + cardIndex">
                        <div class="navigation-bar">
                          <div class="navigation-bar-title">{{ card.title }}</div>
                          <nav>
                            <ul>
                              <li v-for="good in card.goods" :key="good">
                                <a href="#">{{ good }}</a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </a-card>
                  </a-menu-item>
                </a-menu>
              </template>
              <router-link to="/productList" class="ant-dropdown-link">
                {{ item.label }} <a-icon type="down" />
              </router-link>
            </a-dropdown>
          </template>
          <template v-else>
            <router-link :to="item.link">{{ item.label }}</router-link>
          </template>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>


<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      current: this.$route.path,
      menuItems: [
        { key: '/productList', link: '/productList', label: '全部商品' },
        { key: '/login', link: '/login', label: '首页' },
        { key: '/communityService', link: '/communityService', label: '社区服务' },
        { key: '/orders', link: '/personalCenter/myOrders', label: '我的订单' },
        { key: '/personalCenter', link: '/personalCenter', label: '个人中心' },
      ],
      dropdownList: [
        {
          content: '学习装备',
          showCard: false,
          cards: [
            {
              title: '电脑办公',
              goods: ['笔记本', '台式机', '打印机']  // 商品列表为数组
            },
            {
              title: '电脑配件',
              goods: ['鼠标', '键盘', '显示器']
            }
          ]
        },
        {
          content: '学习装备1',
          showCard: false,
          cards: [
            {
              title: '电脑办公1',
              goods: ['笔记本1', '台式机1', '打印机1']  // 商品列表为数组
            },
            {
              title: '电脑配件1',
              goods: ['鼠标1', '键盘1', '显示器1']
            }
          ]
        },
        {
          content: '学习装备2',
          showCard: false,
          cards: [
            {
              title: '电脑办公2',
              goods: ['笔记本2', '台式机2', '打印机']  // 商品列表为数组
            },
            {
              title: '电脑配件2',
              goods: ['鼠标2', '键盘2', '显示2']
            }
          ]
        },
      ]
    }
  },
  methods: {
    toggleCard(index, state) {
      this.dropdownList[index].showCard = state;
    }
  },
  watch: {
    '$route': function (newRoute) {
      this.current = newRoute.path;
    }
  },
  created() {
    this.current = this.$route.path;
  }
}
</script>


<style scoped>
.navigation-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #1e90ff;
}

.menu-wrapper {
  width: 75%;
}

.ant-menu-horizontal {
  background-color: #1e90ff;
  height: 48px;
  border-bottom: none !important;
}

.custom-menu .ant-menu-item {
  background-color: #1e90ff !important;
  border: none !important;
  transition: width 1s ease, background-color 1s ease;
}

.custom-menu .ant-menu-item a {
  color: white !important;
}

.custom-menu .ant-menu-item:hover {
  background-color: #4169e1 !important;
}

.custom-menu .ant-menu-item:hover a {
  color: white !important;
}

.custom-menu .ant-menu-item-selected {
  background-color: #4169e1 !important;
  width: 240px !important;
}

.custom-menu .ant-menu-item-selected a {
  color: white !important;
}

.navigation-bar {
  width: 100%;
}

.navigation-bar nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

.navigation-bar nav ul li {
  margin: 0 10px;
}

.navigation-bar nav ul li a {
  text-decoration: none;
  color: #000;
}

.navigation-bar nav ul li a:hover {
  color: #1e90ff;
}

.navigation-bar-title {
  margin-bottom: 15px;
  font-weight: 600;
  color: #000;
}
</style>