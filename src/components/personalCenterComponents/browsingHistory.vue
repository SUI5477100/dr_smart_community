<template>
    <div class="center">
        <titleBar>
            浏览记录
        </titleBar>
        <div class="card-container">
            <a-card :bordered="false" :size="small" hoverable style="width: 186px"
                v-for="(item, index) in browseLogHistory" :key="index">
                <img slot="cover" alt="example" :src="item.imgUrl" />
                <a-card-meta>
                    <template v-slot:title>
                        <div class="title2" >
                            {{ item.title }}
                        </div>
                    </template>
                    <template slot="description">
                        <div :style="{ color: 'red', fontSize: '18px' }">
                         ￥{{ item.price }}
                        </div>
                    </template>
                </a-card-meta>
            </a-card>
        </div>
    </div>
</template>

<script>
import titleBar from './memberCenterComponents/titleBar.vue';
import api from '../../api/index'

export default {
    name: 'BrowsingHistory', //导出组件名
    components: {
        titleBar
    },
    data() {
        return {
            browseLogHistory: []
        }
    },
    methods: {
        async browsHistoryList() {
            let res = await api.browsList.browsList()
            if (res.code === 500) {
                alert(res.msg)
            } else if (res.code === 200) {
                this.browseLogHistory = res.browseLog.map(item => ({
                    title: item.content,
                    price: item.price,
                    imgUrl: item.homeImg
                }))
            }
            console.log('res', this.browseLogHistory.map(item => item.price));
        }
    },
    mounted() {
        this.browsHistoryList()
    }

};
</script>

<style scoped lang="less">
.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-start;
    gap: 16px;
    /* 卡片之间的间距 */
    max-height: 420px;
    /* 设置最大高度 */
    overflow-y: auto;
    /* 超过最大高度时显示滚动条 */
    margin-left: 35px;
    padding-bottom: 40px;
}

.title2 {
    // white-space: nowrap;
    // /* 不换行 */
    font-size: 16px;
    overflow: hidden;
    /* 隐藏超出的内容 */
    text-overflow: ellipsis;
    /* 使用省略号表示被隐藏的内容 */
    /* 设置最大宽度 */
    height: 25px;
    width: 150px;
}
</style>
