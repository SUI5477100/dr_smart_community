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