import requests from "./request";

export const userInfo = {
    getUserInfo(){
        return requests({
            url: '/user/info',
            method: 'post'
        })
    },
    fileUpload(file){
        return requests({
            url: '/file/cos/upload',
            method: 'post',
            headers:{
                'Content-Type':'multipart/form-data'
            },
            data: file
        })
    },
    updateUserInfo(data){
        return requests({
            url:'/user/updateInfo',
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            data:JSON.stringify(data)
        })
    }

}