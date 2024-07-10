<template>
    <div class="center">
        <a-menu style="width: 256px;top: 0;" mode="vertical">
            <a-menu-item @click="handleClick" v-for="dropdown in dropdownList" :key="dropdown.key">
                {{ dropdown.content }}
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script>
import api from '../../api/index'
export default {
    name: 'LeftCategoryList', //导出组件名
    data() {
        return {
            dropdownList: []
        }
    },
    methods: {
        handleClick(dropdown) {
            // console.log('dropdown.key',typeof dropdown.key);
            this.$router.push({ name: 'SecondLevelCategory', query: { parentId: dropdown.key } });
        },
        async getParentGoodsCategoryList() {
            try {
                let res = await api.getParentGoodsCategoryList.getParentGoodsCategoryList({});
                console.log('一级类目res', res.parentGoodsCategoryList);
                if (res.parentGoodsCategoryList.length > 0) {
                    const newDropdownList = res.parentGoodsCategoryList.map(category => {
                        return {
                            key: category.id,
                            content: category.categoryName,
                        };
                    });
                    this.dropdownList = newDropdownList;
                } else {
                    console.log('No categories found');
                }
            } catch (error) {
                console.error('API call failed:', error);
            }
        },
    },
    mounted() {
        this.getParentGoodsCategoryList()
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
