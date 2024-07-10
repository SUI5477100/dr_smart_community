// /**
//  * article模块接口列表
//  */
// import request from './request'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块
// const article = {    
//     // 新闻列表    
//     articleList () {        
//        return request({
//        url: '/artical',
//        method: 'get',
//        params,
//        hideloading: false //设置不隐藏加载loading
//     })  
//     },    
//     // 新闻详情,演示    
//     articleDetail (id, params) {        
//          return request({
// 		      url: '/detail',
// 		      method: 'get',
// 		      params:{
// 		        goodsId
// 		      },
// 		      hideloading: true
// 		    })
//     },
//     // post提交    
//     login (data) {        
//       return request({
//       url:'/adduser',
//       method:'post',
//       data:JSON.stringify(data), //注意post提交用data参数
//       hideloading: true
//      })   
//     }
//     // 其他接口…………
// }
// export default article;
