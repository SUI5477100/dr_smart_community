import requests from "./request";
export const password = {
    idIdentify(data){
        return requests({
            url:'/user/verifyIdentity',
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            data:JSON.stringify(data)
        })
    },
    resetPassword(data){
        return requests({
            url:'/user/findPassword',
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            data:JSON.stringify(data)
        })
    },
    updatePassword(data){
        return requests({
            url:'/user/updatePassword',
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            data:JSON.stringify(data)
        })
    },
    setPayPass(data){
        return requests({
            url: '/user/setPayPassword',
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            data: JSON.stringify(data)
        })
    }
} 