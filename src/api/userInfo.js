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
            params: file
        })
    }

}