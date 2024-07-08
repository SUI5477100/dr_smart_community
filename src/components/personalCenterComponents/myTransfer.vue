<template>
    <div>
        <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="钱包转账" />
        <div class="wallet">
            <div>钱包余额：</div>
            <div>80,064.42</div>
        </div>
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
            <a-form-item label="对方手机号">
                <a-input
                    v-decorator="['phone', { rules: [{ required: true, message: '请输入对方手机号!' }, { validator: this.checkPhone }] }]"
                    placeholder="请输入对方手机号!" />
            </a-form-item>
            <a-form-item label="转账金额">
                <a-input
                    v-decorator="['amount', { rules: [{ required: true, message: '请输入转账金额!' }, { validator: this.checkAmount }] }]"
                    placeholder="请输入转账金额！ (例如:13.14)" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit" style="width:170px;margin-right: 20px;">
                    转账
                </a-button>
                <!-- 重置按钮 -->
                <a-button style="width:170px;" @click="handleReset">
                    重置
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>

export default {
    name: 'MyTransfer', //导出组件名
    data() {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'coordinated' }),
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values, value) => {
                if (!err) {
                    console.log('Received values of form: ', values.amount);
                    console.log('Received values of form: ', value.amount);

                }
            });
        },
        // 充值金额校验
        checkAmount(rule, value, callback) {
            console.log('value', value)
            if (value === '0') {
                return callback(new Error('转账不能为 0 !'))
            }

            if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                callback(new Error('转账金额最多包含两位小数!'));
            } else {
                callback();
            }
        },
        // 转账电话校验
        checkPhone(rule, value, callback) {
            // 正则表达式，校验中国大陆的手机号码
            const regex = /^1[3-9]\d{9}$/;
            // 测试value是否符合正则表达式
            if (regex.test(value)) {
                callback(); // 如果手机号码格式正确，调用callback无参数表示成功
            } else {
                callback(new Error('请输入有效的中国大陆手机号码')); // 如果格式不正确，调用callback并传递错误信息
            }
        },
    }
    };
</script>

<style scoped lang="less">
.wallet {
    display: flex;
    align-items: center;
    /* 确保内容垂直居中 */
    font-size: x-large;
    font-weight: 600;
    color: #3c3939;
    margin-left: calc(100% * 1 / 10);
    /* 基于24栏系统计算偏移 */
    margin-bottom: 30px;
    margin-top: 20px;
}
</style>