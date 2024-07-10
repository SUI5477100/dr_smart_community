import requests from "./request";
export const password = {
    idIdentify(data){
        return requests({
            url:'/user/verifyIdentity',
            method:'post',
            data:JSON.stringify(data)
        })
    },
    resetPassword(data){
        return requests({
            url:'/user/findPassword',
            method:'post',
            data:JSON.stringify(data)
        })
    }
} 