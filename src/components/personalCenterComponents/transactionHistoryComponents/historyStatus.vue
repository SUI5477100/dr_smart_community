<template>
    <div class="status">
        <!-- 支付类型 -->
        <div class="payment-type">
            <div class="payment-type-text">支付类型：</div>
            <a-cascader :options="types" v-model="selectedType" placeholder="全部" @change="onChange" />
        </div>
        <!-- 搜索按钮 -->
        <!-- <a-button type="primary" @click="onChange(selectedType)">搜索</a-button> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            types: [
                { value: 0, label: '全部' },
                { value: 1, label: '商品支付' },
                { value: 2, label: '充值' },
                { value: 3, label: '转入' },
                { value: 4, label: '转出' },
                { value: 5, label: '退款' },
                { value: 6, label: '缴费支付' },
            ],
            selectedType: [0]  // 设置默认值为 "全部"
        };
    },
    methods: {
        onChange(value) {
            // console.log('Selected value:', value);
            this.$emit('payment-type-selected', value);
            // this.$emit('payment-type-label', label);

        },
    },
    mounted() {
        this.onChange(this.selectedType);  // 初始化时也触发一次 onChange 以应用默认值
    }
};
</script>

<style scoped lang="less">
.status {
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
}

.payment-status {
    width: 300px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}


.payment-type {
    width: 300px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
}
</style>