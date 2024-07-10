<template>
    <div>
        <div v-for="item in childGoodsCategory" :key="item.id">
            <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="item.categoryTitle" />
            <a-breadcrumb class="custom-breadcrumb">
                <!-- 循环每个二级类目 -->
                <a-breadcrumb-item v-for="thirdLevelCategory in item.childGoodsCategoryList"
                    :key="thirdLevelCategory.id">
                    <!-- 条件渲染链接 -->
                    <a href="">{{ thirdLevelCategory.categoryName }}</a>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
    </div>
</template>

<script>
import api from '../../api/index'
export default {
    name: 'SecondLevelCategory',
    components: {
    },
    data() {
        return {
            childGoodsCategory: []
        }
    },
    computed: {
        parentId() {
            return this.$route.query.parentId;
        }
    },
    watch: {
        parentId(newVal) {
            if (newVal) {
                this.getSecondLeveparent(newVal);
            }
        }
    },
    methods: {
        async getSecondLeveparent(parentId) {
            // console.log('parentId at method call:', parentId);
            let res = await api.parentId.parentId({ parentId });
            // console.log('API response:', res.childGoodsCategoryList);

            const newChildGoodsCategory = res.childGoodsCategoryList.map(category => {
                // console.log('二级类目:', category.id, category.categoryName);
                if (category.childGoodsCategoryList && category.childGoodsCategoryList.length > 0) {
                    category.childGoodsCategoryList.forEach((thirdLevelCategory) => {
                        console.log('三级类目:', category.id, thirdLevelCategory.parentId, thirdLevelCategory.categoryName, thirdLevelCategory.id);
                    });
                } else {
                    console.log('无三级类目');
                }
                return {
                    id: category.id,
                    categoryTitle: category.categoryName,
                    childGoodsCategoryList: category.childGoodsCategoryList
                };
            });
            this.childGoodsCategory = newChildGoodsCategory;
        }
    },
    mounted() {
        this.getSecondLeveparent(this.parentId);
    }
};
</script>

<style scoped lang="less">
.custom-breadcrumb-item a {
    color: rgba(0, 0, 0, 0.65);
}


.custom-breadcrumb {
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
