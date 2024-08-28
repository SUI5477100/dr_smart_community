<template>
    <div>
        <titleBar>
            消费记录
        </titleBar>
        <HistoryStatus @payment-type-selected="handlePaymentTypeChange"></HistoryStatus>
        <HistoryList :selected-type="selectedPaymentType"></HistoryList>
    </div>
</template>

<script>
import HistoryList from './transactionHistoryComponents/historyList.vue';
import HistoryStatus from './transactionHistoryComponents/historyStatus.vue';
import titleBar from '../personalCenterComponents/memberCenterComponents/titleBar.vue';

export default {
    components: { HistoryList, HistoryStatus, titleBar },
    name: 'TransactionHistory', //导出组件名
    data() {
        return {
            selectedPaymentType: null
        };
    },
    methods: {
        handlePaymentTypeChange(type) {
            // console.log('type',type);
            this.selectedPaymentType = type;
        }
    }
};
</script>

<style scoped></style>