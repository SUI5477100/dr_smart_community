<template>
    <div class="status">
        <!-- 支付状态 -->
        <div class="payment-status">
            <div class="payment-status-text">支付状态：</div>
            <a-cascader :options="options" placeholder="全部" @change="onChange" />
        </div>
        <!-- 支付类型 -->
        <div class="payment-type">
            <div  class="payment-type-text">支付类型：</div>
            <a-cascader :options="types" placeholder="全部" @change="onChange" />
        </div>
        <!-- 搜索按钮 -->
        <a-button type="primary">搜索</a-button>
    </div>
</template>
<script>
const options = [
    {
        value: 'All',
        label: '全部',
    },
    {
        value: 'Pending',
        label: '待支付',
    },
    {
        value: 'Processing',
        label: '处理中',
    },
    {
        value: 'Success',
        label: '成功支付',
    },
    {
        value: 'Failed',
        label: '失败支付',
    },
    {
        value: 'Cancelled',
        label: '取消支付',
    },
    {
        value: 'Refunded',
        label: '仅退款',
    },
    {
        value: 'Overdue',
        label: '逾期未支付',
    },
];
const types = [
    {
        value: 'All',
        label: '全部',
    },
    {
        value: 'Recharge',
        label: '充值',
    },
    {
        value: 'TransferIn',
        label: '转入',
    },
    {
        value: 'TransferOut',
        label: '转入',
    },
    {
        value: 'Refund',
        label: '退款',
    },
    {
        value: 'BillPayment',
        label: '缴费支付',
    },
];
export default {
    data() {
        return {
            options,
            types
        };
    },
    methods: {
        onChange(value) {
            console.log(value);
        },
    },
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