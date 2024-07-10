/** 
 * api接口的统一出口
 */
// 文章模块接口
import article from './article_example';
import {goods} from './goods';
import { login_reguster } from './loginRegister';
import { password } from './password';
import { userInfo } from './userInfo';
// 其他模块的接口…… 
// 导出接口
export default {    
    article,
    goods,
    login_reguster,
    password,
    userInfo
}


// 在组件中按需引入

// import api from '../api/index';
// getList(){
//     api.goods.goodsList(
//     {
//       page: 1,
//       limit: 10,
//       categoryId: 11,
//       minPrice: -1,
//       maxPrice: -1,
//       key: '',
//       sortByPrice: 1,
//       sortBySaleCnt: 0
//     }
//     ).then(res=>{
//       console.log("已请求：！！！！！！！！！！！res："+JSON.stringify(res))
//   })
// },

