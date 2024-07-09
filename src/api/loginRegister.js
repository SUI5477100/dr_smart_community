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
    register(){

    }
}