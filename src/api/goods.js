import requests from "./request";
export const goods = {
    goodsList(params) {
        return requests({
            url: "/goods/list",
            method: 'get',
            params
        })
    },
    addCart(data) {
        return requests({
            url: '/cart/save',
            method: 'post',
            data: JSON.stringify(data), //注意post提交用data参数
            hideloading: true
        })
    },
    cartList() {
        return requests({
            url: '/cart/list',
            method: 'post',
            hideloading: true
        })
    },
    cartCnt(data) {
        return requests({
            url: '/cart/update',
            method: 'post',
            data: JSON.stringify(data), //注意post提交用data参数
            hideloading: true
        })
    },
    deleteCartProduct(data) {
        return requests({
            url: '/cart/delete',
            method: 'post',
            data: JSON.stringify(data), //注意post提交用data参数
            hideloading: true
        })
    },
    getGoodsDetail(id) {
        return requests({
            url: `/goods/info/${id}`,
            methods: 'get'
        })
    },
    areaList(params) {
        return requests({
            url: "/area/all",
            method: 'get',
            params
        })
    },
    storeList(params) {
        return requests({
            url: '/goods/getStoreList',
            method: 'get',
            params: {
                areaId: params.areaId,
                goodsId: params.goodsId
            }
        })
    }
}
// export default goods;
