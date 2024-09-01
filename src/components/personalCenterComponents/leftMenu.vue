<template>
    <div>
        <div class="left-menu">
            <div class="left-menu-item">
                <a-menu style="width: 240px; padding-top: 15px; padding-bottom: 15px;" :default-selected-keys="['1']"
                    :open-keys.sync="openKeys" mode="inline" :inline-collapsed="collapsed" @click="handleClick">
                    <a-sub-menu v-for="subMenu in menuItems" :key="subMenu.key" @titleClick="titleClick">
                        <span slot="title" class="size">
                            <a-icon :type="subMenu.icon" /><span>{{ subMenu.title }}</span>
                        </span>
                        <a-menu-item v-for="item in subMenu.items" :key="item.key" class="item-size">
                            {{ item.title }}
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonalCenter',
    data() {
        return {
            openKeys: ['sub1', 'sub2', 'sub3'],
            collapsed: false,
            menuItems: [
                {
                    key: 'sub1',
                    icon: 'mail',
                    title: '会员中心',
                    items: [
                        { key: '1', title: '个人资料', route: 'myInformation' },
                        { key: '2', title: '密码修改', route: 'changePassword' },
                        // { key: '3', title: '我的收藏', route: 'myFavorites' },
                    ],
                },
                {
                    key: 'sub2',
                    icon: 'appstore',
                    title: '订单中心',
                    items: [
                        { key: '4', title: '我的订单', route: 'myOrders' },
                        { key: '8', title: '浏览历史', route: 'browsingHistory' },
                    ],
                },
                {
                    key: 'sub3',
                    icon: 'setting',
                    title: '钱包管理',
                    items: [
                        { key: '5', title: '充值', route: 'myRecharge' },
                        { key: '6', title: '转账', route: 'myTransfer' },
                        { key: '7', title: '消费记录', route: 'consumptionRecord' },
                    ],
                },
            ],
        };
    },

    methods: {
        handleClick(e) {
            console.log('click', e);
            const selectedItem = this.findMenuItemByKey(e.key);
            if (selectedItem) {
                const targetPath = `/personalCenter/${selectedItem.route}`; // 确保路径是完整的
                if (this.$route.path !== targetPath) {
                    this.$router.push(targetPath);
                }
            }
        },
        titleClick(e) {
            console.log('titleClick', e);
        },
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
        },
        findMenuItemByKey(key) {
            for (const subMenu of this.menuItems) {
                const item = subMenu.items.find(item => item.key === key);
                if (item) {
                    return item;
                }
            }
            return null;
        },
    },
};
</script>

<style scoped lang="less">
.size {
    font-size: medium;
    font-weight: 600;
    color: #000;
}

.item-size {
    font-size: small;
}
</style>