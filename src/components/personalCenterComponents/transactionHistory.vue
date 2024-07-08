<template>
    <div>
        <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="钱包转账" />
        <HistoryStatus></HistoryStatus>
        <HistoryList></HistoryList>
    </div>
</template>

<script>
import HistoryList from './transactionHistoryComponents/historyList.vue';
import HistoryStatus from './transactionHistoryComponents/historyStatus.vue';
export default {
    components: { HistoryList, HistoryStatus },
    name: 'TransactionHistory', //导出组件名
};
</script>

<style scoped></style>