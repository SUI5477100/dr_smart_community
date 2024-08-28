<!-- 消费记录列表 -->
<template>
    <div class="">
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
        <!-- @showSizeChange="onShowSizeChange" -->
        <a-pagination style="margin: 15px;" show-size-changer :total="500" v-model="current"
            :page-size.sync="pageSize" />
    </div>

</template>

<script>
import api from '../../../api'
const transactions = [];

export default {
    name: 'HistoryList',
    props: ['selectedType'],
    data() {
        return {
            transactions, // 更清晰的变量名
            // 页数
            current: 1,
            pageSize: 10,
            localSelectedType: this.selectedType,
            historyList: []
        }
    },
    methods: {
        async getHistory(valueType) {
            // 数据格式
            const params = {
                page: this.current,
                limit: this.pageSize,
                consumptionType: valueType,
            };

            console.log('page123456', params.page, this.pageSize);
            try {
                let res = await api.consumptionRecord.consumptionRecord(params);
                console.log('API Response:', res.page);
                this.transactions = res.page.list.map(pageList => {
                    console.log('pageList.orderNo', pageList.orderNo);
                    let type, typeColor, result, resultColor;
                    switch (pageList.consumptionType) {
                        case 0:
                            type = '全部'
                            typeColor = 'blue'
                            break;
                        case 1:
                            type = '商品支付'
                            typeColor = 'purple'
                            break;
                        case 2:
                            type = '充值'
                            typeColor = 'orange'
                            break;
                        case 3:
                            type = '转入'
                            typeColor = 'cyan'
                            break;
                        case 4:
                            type = '转出'
                            typeColor = 'purple'
                            break;
                        case 5:
                            type = '退款'
                            typeColor = 'red'
                            break;
                        case 6:
                            type = '缴费支付'
                            typeColor = 'pink'
                            break;
                        default:
                            type = '未知'
                            typeColor = 'yellow'
                    }
                    switch (pageList.consumptionRes) {
                        case 0:
                            result = '成功'
                            resultColor = 'green'
                            break;
                        case 1:
                            result = '失败'
                            resultColor = 'red'
                            break;
                        default:
                            result = '未知'
                            resultColor = 'orange'
                    }
                    return {
                        orderNumber: pageList.orderNo,
                        type: type,
                        typeColor: typeColor,
                        amount: pageList.money,
                        result: result,
                        resultColor: resultColor,
                        time: pageList.updateTime
                    }
                }
                )

            } catch (error) {
                console.error('Error fetching history:', error);
            }
        },
        // onShowSizeChange(current, pageSize) {
        //     console.log(current, pageSize);
        // },
    },
    watch: {
        current(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.getHistory(this.localSelectedType);
            }
        },
        pageSize(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.getHistory(this.localSelectedType);
            }
        },
        selectedType(newVal) {
            this.localSelectedType = newVal[0];
            // this.getHistory();
            console.log('localSelectedType', newVal[0]);
            this.getHistory(newVal[0])
        }
    },
    mounted() {
        // this.getHistory();  // 在组件挂载后调用
        // console.log('TTTTTTTTTTTType', this.type);
        // console.log('this.selectedType', this.selectedType);
    }
};

</script>

<style scoped>
.table-contain {
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 270px;
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
