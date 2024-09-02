import requests from "./request";
export const browsList = {
    browsList() {
        return requests({
            url: '/goods/browseLog',
            method: 'post',
            hideloading: true
        })
    }
}
export const setBrows = {
    setBrows(params){
        return requests({
            url:'/goods/browse',
            method:'get',
            params: {
                goodsId: params.goodsId
            }
        })
    }
}