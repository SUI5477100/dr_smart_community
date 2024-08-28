<template>
    <div class="center">
        <a-menu style="width: 256px; top: 0;" mode="vertical" v-model="selectedKey">
            <a-menu-item v-for="dropdown in dropdownList" :key="dropdown.key" @click="handleClick(dropdown)">
                {{ dropdown.content }}
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script>
import api from '../../api/index'
export default {
    name: 'LeftCategoryList',
    data() {
        return {
            dropdownList: [],
            selectedKey: null,  // 用于存储当前选中的菜单项的 key
        }
    },
    methods: {
        handleClick(dropdown) {
            this.selectedKey = dropdown.key;
            this.$router.push({ name: 'SecondLevelCategory', query: { parentId: dropdown.key } });
        },
        async getParentGoodsCategoryList() {
            try {
                let res = await api.getParentGoodsCategoryList.getParentGoodsCategoryList({});
                console.log('一级类目res', res.parentGoodsCategoryList);
                if (res.parentGoodsCategoryList.length > 0) {
                    const newDropdownList = res.parentGoodsCategoryList.map(category => {
                        return {
                            key: category.id.toString(),  // 确保 key 是字符串
                            content: category.categoryName,
                        };
                    });
                    this.dropdownList = newDropdownList;
                    this.selectedKey = newDropdownList[0].key;  // 默认选择第一项
                } else {
                    console.log('No categories found');
                }
            } catch (error) {
                console.error('API call failed:', error);
            }
        },
    },
    mounted() {
        this.getParentGoodsCategoryList();
    }
};
</script>

<style scoped lang="less">
.center {
    display: flex;
    padding-bottom: 30px;
    justify-content: center;
    background-color: #f1f1f1;
}
</style>
