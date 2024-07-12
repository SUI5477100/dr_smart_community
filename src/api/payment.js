import requests from "./request";
export const payment = {
    createPayment(data) {
        return requests({
            url: "/goodsOrder/create",
            method: 'post',
            data: JSON.stringify(data),
        })
    },
    paymentDetail(data) {
        return requests({
            url: "/goodsOrder/detail",
            method: 'post',
            data: JSON.stringify(data),
        })
    },
    userInfo(data) {
        return requests({
            url: "/user/info",
            method: 'post',
            data: JSON.stringify(data),
        })
    },
    payOrder(data) {
        return requests({
            url: "/goodsOrder/payOrder",
            method: 'post',
            data: JSON.stringify(data),
        })
    }
}
// export default goods;
