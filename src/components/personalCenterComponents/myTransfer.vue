<template>
    <div>
        <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="钱包转账" />
        <div class="wallet">
            <div>钱包余额：</div>
            <div>80,064.42</div>
        </div>
        <a-form :form="form">
            <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="对方手机号">
                <a-input v-decorator="['phone',{ rules: [{ required: true, message: '请输入对方手机号！' }] },]" placeholder="请输入对方手机号" />
            </a-form-item>
            <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="转账金额">
                <a-input v-decorator="['amount',{ rules: [{ required: true, message: '请输入转账金额！' }] },]" placeholder="请输入转账金额" />
            </a-form-item>
            <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
                <a-button type="primary" @click="check">
                    转账
                </a-button>
                <a-button @click="check">
                    重置 
                </a-button>
            </a-form-item>
        </a-form>

    </div>
</template>

<script>
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
};
const formTailLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12, offset: 5 },
};
export default {
    name: 'MyTransfer', //导出组件名
    data() {
        return {
            checkNick: false,
            formItemLayout,
            formTailLayout,
            form: this.$form.createForm(this, { name: 'dynamic_rule' }),
        };
    },
    methods: {
        check() {
            this.form.validateFields(err => {
                if (!err) {
                    console.info('success');
                }
            });
        },
        handleChange(e) {
            this.checkNick = e.target.checked;
            this.$nextTick(() => {
                this.form.validateFields(['nickname'], { force: true });
            });
        },
    },
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