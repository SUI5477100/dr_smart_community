<template>
    <div class="table-contain">
        <table>
            <thead>
                <tr style="background-color: #f0f0f0;"> <!-- 加深表头颜色 -->
                    <th>订单号</th>
                    <th>操作类型</th>
                    <th>操作金额</th>
                    <th>操作结果</th>
                    <th>操作时间</th>
                </tr>
            </thead>
            <tbody>
                <!-- <template> section -->
                <tr v-for="(transaction, index) in transactions" :key="index">
                    <td>{{ transaction.orderNumber }}</td>
                    <td>
                        <a-tag :color="transaction.typeColor">
                            {{ transaction.type }}
                        </a-tag>
                    </td>
                    <td>￥{{ transaction.amount }}</td>
                    <td>
                        <a-tag :color="transaction.resultColor">
                            {{ transaction.result }}
                        </a-tag>
                    </td>
                    <td>{{ transaction.time }}</td>
                </tr>

            </tbody>

        </table>
    </div>
</template>

<script>
const transactions = [
    {
        orderNumber: '1289032758943689357',
        type: '转出',
        typeColor: 'blue',
        amount: '100.00',
        result: '成功',
        resultColor: 'green',
        time: '2024-05-15 23:34:45'
    },
    {
        orderNumber: '1289032758943689357',
        type: '转出',
        typeColor: 'blue',
        amount: '100.00',
        result: '成功',
        resultColor: 'green',
        time: '2024-05-15 23:34:45'
    },
    {
        orderNumber: '1289032758943689357',
        type: '转出',
        typeColor: 'blue',
        amount: '100.00',
        result: '成功',
        resultColor: 'green',
        time: '2024-05-15 23:34:45'
    },
    {
        orderNumber: '1289032758943689357',
        type: '转出',
        typeColor: 'blue',
        amount: '100.00',
        result: '成功',
        resultColor: 'green',
        time: '2024-05-15 23:34:45'
    },
    {
        orderNumber: '1289032758943689357',
        type: '转出',
        typeColor: 'blue',
        amount: '100.00',
        result: '成功',
        resultColor: 'green',
        time: '2024-05-15 23:34:45'
    },
    {
        orderNumber: '1289032758943689357',
        type: '转出',
        typeColor: 'blue',
        amount: '100.00',
        result: '成功',
        resultColor: 'green',
        time: '2024-05-15 23:34:45'
    }, {
        orderNumber: '1289032758943689357',
        type: '转出',
        typeColor: 'blue',
        amount: '100.00',
        result: '成功',
        resultColor: 'green',
        time: '2024-05-15 23:34:45'
    },
    {
        orderNumber: '1289032758943689357',
        type: '转出',
        typeColor: 'blue',
        amount: '100.00',
        result: '成功',
        resultColor: 'green',
        time: '2024-05-15 23:34:45'
    },
    {
        orderNumber: '1289032758943689357',
        type: '转出',
        typeColor: 'blue',
        amount: '100.00',
        result: '成功',
        resultColor: 'green',
        time: '2024-05-15 23:34:45'
    },
    {
        orderNumber: '1289032758943689357',
        type: '转出',
        typeColor: 'blue',
        amount: '100.00',
        result: '成功',
        resultColor: 'green',
        time: '2024-05-15 23:34:45'
    },
    {
        orderNumber: '1289032758943689357',
        type: '转出',
        typeColor: 'blue',
        amount: '100.00',
        result: '成功',
        resultColor: 'green',
        time: '2024-05-15 23:34:45'
    }
];

export default {
    name: 'HistoryList',
    data() {
        return {
            transactions // 更清晰的变量名
        }
    }
};

</script>

<style scoped>
.table-contain {
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-content: center;
    max-height: 380px;
    /* 设置一个最大高度 */
    overflow-y: auto;
}

table {
    width: 90%;
    margin-top: 10px;
    border-collapse: collapse;
    /* 使表格边框合并为单一边框 */
}

th,
td {
    border: 1px solid #ddd;
    /* 表格单元格添加边框 */
    padding: 8px;
    /* 单元格内边距 */
    text-align: left;
    /* 文本左对齐 */
}
</style>
