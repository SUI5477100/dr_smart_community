<template>
    <div>
        <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="钱包充值" />
        <!-- 钱包余额 -->
        <div class="wallet">
            <div>钱包余额：</div>
            <div>80,064.42</div>
        </div>
        <!-- 充值金额 -->
        <div class="recharge-amount">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                <a-form-item label="充值金额">
                    <a-input
                        v-decorator="['rechargeAmount', { rules: [{ required: true, message: '请输入你要充值的金额!' }, { validator: this.checkAmount }] }]"
                        placeholder="请输入充值金额 (例如:13.14)" />
                </a-form-item>
                <a-form-item label="支付方式">
                    <a-select v-decorator="['paymentMethod', { rules: [{ required: true, message: '请选择你要支付的方式!' }] },]"
                        placeholder="请选择支付方式" @change="handleSelectChange">
                        <a-select-option value="vx">
                            微信支付
                        </a-select-option>
                        <a-select-option value="zfb">
                            支付宝支付
                        </a-select-option>
                        <a-select-option value="balance">
                            余额支付
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" html-type="submit" style="width:170px;margin-right: 20px;"
                        @click="showModal">
                        充值
                    </a-button>
                    <!-- 充值弹框按钮 -->
                    <a-modal v-model="visible" title="确认充值信息" ok-text="支付完成 √" cancel-text="取消支付 X" @ok="handleOk"
                        @cancel="handleCancel">
                        <div class="modal" v-for="(recharge, index) in rechargeList" :key="index">
                            <div class="method">{{ recharge.text }}</div>
                            <div class="amount">{{ recharge.amount }}</div>
                        </div>
                        <!-- 扫码支付 -->
                        <div class="pay-item">请扫码支付:
                        </div>
                        <div class="pay-img">
                            <img src="../../assets/image/vx.png" alt="" class="pay-img-item">
                        </div>
                    </a-modal>
                    <!-- 重置按钮 -->
                    <a-button style="width:170px;" @click="handleReset">
                        重置
                    </a-button>
                </a-form-item>
            </a-form>
        </div>

    </div>
</template>

<script>

export default {
    name: 'MyRecharge', //导出组件名
    data() {
        return {
            visible: false,
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'coordinated' }),
            rechargeList: [
                {
                    text: '充值金额：',
                    amount: '200.00'
                },
                {
                    text: '支付方式:',
                    amount: '微信支付'
                },
                {
                    text: '充值后余额：',
                    amount: '80,264.42'
                }
            ]
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    console.log('values.rechargeAmount', values.rechargeAmount)
                }
            });
        },
        handleSelectChange(value) {
            console.log(value);
        },
        handleReset() {
            this.form.resetFields(); // 重置表单项
        },
        showModal(e) {
            e.preventDefault();
            this.form.validateFields((err) => {
                if (err) {
                    this.visible = false;
                } else {
                    this.visible = true;
                }
            });
        },
        // 充值弹框的确认按钮
        handleOk(e) {
            console.log('handleOK', e);
            this.visible = false;
        },
        // 充值弹框的取消按钮
        handleCancel(e) {
            console.log('handleCancel', e);
            this.visible = false;
        },
        // 充值金额校验
        checkAmount(rule, value, callback) {
            if (value === '0') {
                return callback(new Error('充值不能为 0 !'))
            }

            if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                callback(new Error('充值金额最多包含两位小数!'));
            } else {
                callback();
            }

        },
        confirm() {
            this.$confirm({
                okText: '确认',
                cancelText: '取消',
            });
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

.a-form-item {
    display: flex;
    align-items: center;
    /* 如果表单项未垂直居中，可添加此项 */
}

.modal {
    display: flex;
    font-size: larger;
    font-weight: 600;
    margin-bottom: 15px;

    .method {
        margin-right: 15px;
    }
}

.pay-item {
    display: flex;
    font-size: larger;
    font-weight: 600;
    margin-bottom: 15px;
}

.pay-img-item {

    width: 210px;
    height: 210px;

}

.pay-img {
    width: 100%;
    display: flex;
    justify-content: center;

}
</style>