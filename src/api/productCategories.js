import requests from "./request";
export const getParentGoodsCategoryList = {
    getParentGoodsCategoryList(params) {
        return requests({
            url: "/goodsCategory/getParentGoodsCategoryList",
            method: 'get',
            params
        })
    }
}
export const parentId = {
    parentId(params) {
        return requests({
            url: "/goodsCategory/getChildGoodsCategoryList",
            method: 'get',
            params
        })
    }
}
// export default goods;
