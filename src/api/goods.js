import requests from "./request";
export const goods = {
    goodsList(params){
        return requests({
            url:"/goods/list",
            method:'get',
            params
        })
    }
}
// export default goods;
