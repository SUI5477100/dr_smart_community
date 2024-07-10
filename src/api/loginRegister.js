import requests from "./request";
export const login_reguster ={
    login(data){
        return requests({
            url:'/user/login',
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data:JSON.stringify(data)
        })
    },
    register(data){
        return requests({
            url:'/user/register',
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data:JSON.stringify(data)
        })
    },
    sendCheckCode(data){
        return requests({
            url: '/user/sendCode',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data:JSON.stringify(data)
        })
    }
}