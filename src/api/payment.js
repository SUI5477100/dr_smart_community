import requests from "./request";
export const payment = {
    createPayment(data) {
        return requests({
            url: "/goodsOrder/create",
            method: 'post',
            data: JSON.stringify(data),
        })
    }
}
// export default goods;
