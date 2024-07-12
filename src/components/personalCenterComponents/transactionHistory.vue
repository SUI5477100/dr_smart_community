<template>
    <div>
        <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="钱包转账" />
        <HistoryStatus @payment-type-selected="handlePaymentTypeChange"></HistoryStatus>
        <HistoryList :selected-type="selectedPaymentType"></HistoryList>
    </div>
</template>

<script>
import HistoryList from './transactionHistoryComponents/historyList.vue';
import HistoryStatus from './transactionHistoryComponents/historyStatus.vue';
export default {
    components: { HistoryList, HistoryStatus },
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