<template>
    <div>
        <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="钱包转账" />
        <div class="wallet">
            <div>钱包余额：</div>
            <div>{{ personInfo.money }}</div>
        </div>
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit"
            :key="componentKey">
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
                    <!-- @click="showModal" -->
                    转账
                </a-button>
                <!-- 转账弹框按钮 -->
                <a-modal v-model="visible" title="确认转账信息" ok-text="确认转账 √" cancel-text="取消转账 X" @ok="handleOk"
                    @cancel="handleCancel">
                    <div>
                        <div style="font-size: 20px;">转账金额: {{ transferAmount }}</div>
                        <div style="margin-top: 10px;color: black;"><strong>对方账户信息</strong></div>
                        <div class="flex-table">
                            <!-- 上行 -->
                            <div class="flex-table-front">
                                <div class="user-name">
                                    <div class="user-name-up">用户名</div>
                                    <div class="user-name-bt">{{ otherInfo.name }}</div>
                                </div>
                                <div class="user-name">
                                    <div class="user-name-up">电话</div>
                                    <div class="user-name-bt">{{ otherInfo.phone }}</div>
                                </div>
                            </div>
                            <!-- 下行 -->
                            <div class="flex-table-bottom">
                                <div class="update-time">
                                    <div class="user-name-up">上次登录时间</div>
                                    <div class="user-name-bt">{{ otherInfo.time }}</div>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top: 20px;">
                            <!-- 手机验证码 -->
                            <a-form :form="phoneInfo">
                                <a-form-item label="手机验证码" class="information">
                                    <a-input style="width:130px;margin-right: 20px;"
                                        v-decorator="['information', { rules: [{ required: true, message: '请输入验证码!' }] }]"
                                        placeholder="请输入验证码" />
                                    <checkCodeButton :handleClick="getCheckCode" ref="checkCodeButton">
                                    </checkCodeButton>
                                </a-form-item>
                            </a-form>
                        </div>

                    </div>
                </a-modal>
                <!-- 重置按钮 -->
                <a-button style="width:170px;" @click="handleReset">
                    重置
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import checkCodeButton from '../../components/buttonComponents/checkCodeButton.vue'
import api from '../../api/index'
export default {
    name: 'MyTransfer', //导出组件名
    components: {
        checkCodeButton
    },
    data() {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this),
            phoneInfo: this.$form.createForm(this),
            personInfo: {
                money: '',
                phone: ''
            },
            visible: false,
            transferAmount: '',
            transferPhone: '',
            otherInfo: {
                name: '',
                phone: '',
                time: ''
            },
            setInfo: {},
            transferCode: -1
        };
    },
    methods: {
        // 重置表单项
        handleReset() {
            this.form.resetFields();
            this.componentKey += 1;
        },

        // 控制弹框
        showModal(e) {
            if (e) e.preventDefault();
            this.form.validateFields((err) => {
                if (err) {
                    this.visible = false;
                } else {
                    this.visible = true;
                }
            });
        },
        confirm() {
            this.$confirm({
                okText: '确认',
                cancelText: '取消',
            });
        },
        handleCancel() {
            this.visible = false; // 关闭模态窗
            // 这里可以添加其他的清理逻辑
        },
        // 获取input框中内容
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form:111 ', values.amount)
                    console.log('Received values of form:111 ', values.phone)
                    this.transferAmount = values.amount;
                    this.transferPhone = values.phone;
                    this.getOtherUserByPhone(values.phone);
                }
            });
        },
        handleOk() {
            this.phoneInfo.validateFields((err, values) => {
                if (!err) {
                    console.log('验证码:', values.information); // 这里将输出输入的验证码
                    this.transferCode = values.information

                    this.setInfo = {
                        otherPhone: this.transferPhone,
                        money: this.transferAmount,
                        code: this.transferCode,
                        operate: 2
                    }
                    console.log('验证码:12345678', this.transferCode); // 这里将输出输入的验证码
                    this.confirmTransferAccount(this.setInfo)
                } else {
                    this.$message.error('请先输入正确的验证码！');
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

        // 调用本人用户信息||余额
        async getPersonInfo() {
            let res = await api.userInfo.getUserInfo();
            console.log('this is personal infomation Function, res:', JSON.stringify(res))
            if (res.code == 200) {
                let user = res.user
                console.log('43567896543', user.money);
                this.personInfo = {
                    money: user.money,
                    phone: user.phone
                }
            }
        },

        // 通过手机号获取对方账号信息
        async getOtherUserByPhone(phoneNumber, e) {
            let res = await api.getOtherUserByPhone.getOtherUserByPhone({ otherPhone: phoneNumber });
            console.log('this is personal infomation Function, res:', res)
            if (res.code === 500) {
                alert(res.msg);
            } else if (res.code === 200) {
                this.showModal(e)
                this.otherInfo = {
                    name: res.otherUser.nickname,
                    phone: res.otherUser.phone,
                    time: res.otherUser.updateTime
                };
            }
        },


        // 确认转账---输入信息
        async confirmTransferAccount(setInfo) {
            console.log('SetInfo before sending:', setInfo); // 打印 setInfo 对象
            let res = await api.confirmTransferAccount.confirmTransferAccount(setInfo)
            if (res.code === 200) {
                alert(res.msg);
                this.handleCancel()

            } else if (res.code === 500) {
                alert(res.msg);
            }
            console.log('this is personal infomation Function, res:', res)
        },

        // 短信验证
        getCheckCode() {
            this.getCode()
            console.log('234567890-987654');
        },
        async getCode() {
            let data = {
                phone: this.personInfo.phone,
                operate: 2
            }
            let res = await api.login_reguster.sendCheckCode(data)
            console.log("this is identifyCode function, res:", JSON.stringify(res));
            if (res.code == 200) {
                this.$refs['checkCodeButton'].startCountdown()
                this.$message.success('验证码发送成功')
            } else {
                this.$message.error('验证码发送失败')
            }
        },
    },
    mounted() {
        this.getPersonInfo()
        // this.getOtherUserByPhone()
        // this.confirmTransferAccount() 
    }
};
</script>

<style scoped lang="less">
.wallet {
    display: flex;
    align-items: center;
    font-size: x-large;
    font-weight: 600;
    color: #3c3939;
    margin-left: calc(100% * 1 / 10);
    margin-bottom: 30px;
    margin-top: 20px;
}

.flex-table-front {
    display: flex;
}

.user-name {
    flex: 1;
}

.flex-table {
    margin-top: 15px;
}

.user-name-up {
    display: flex;
    padding-left: 10px;
    font-weight: 600;
    align-items: center;
    height: 30px;
    border: 1px solid #eceff7;
    background-color: #f5f7fa;
}

.user-name-bt {
    display: flex;
    color: black;
    padding-left: 10px;
    align-items: center;
    height: 30px;
    border: 1px solid #eceff7;
}

.information {
    display: flex;

}
</style>