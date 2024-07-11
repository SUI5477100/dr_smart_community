// /user/getOtherUserByPhone

import requests from "./request";
export const getOtherUserByPhone = {
    getOtherUserByPhone(data) {
        return requests({
            url: '/user/getOtherUserByPhone',
            method: 'post',
            data: data
        })
    }
}
// /user/confirmTransferAccount
export const confirmTransferAccount = {
    confirmTransferAccount(data) {
        return requests({
            url: '/user/confirmTransferAccount',
            method: 'post',
            data: data
        })
    }
}

// 充值
// /user/recharge
export const recharge = {
    recharge(data) {
        return requests({
            url: '/user/recharge',
            method: 'post',
            data: data
        })
    }
}
// 消费记录
//  /consumptionRecord/list?page=1&limit=10&consumptionType=0
export const consumptionRecord = {
    consumptionRecord(data) {
        return requests({
            url: '/consumptionRecord/list',
            method: 'post',
            params: data
        })
    }
}
