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

// /goodsOrder/all?status=-1&orderNo=1720&startTime=2024-07-11&endTime=2024-07-11 18:00:00
export const goodsOrderList = {
    goodsOrderList(data) {
        return requests({
            url: '/goodsOrder/all',
            method: 'post',
            params: data
        })
    }
}

export const delOrderList = {
    delOrderList(data) {
        return requests({
            url: '/goodsOrder/delete',
            method: 'post',
            data: data
        })
    }
}