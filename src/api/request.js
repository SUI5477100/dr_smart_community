// 引入axios
import axios from 'axios';
import router from '../router';

// 创建网络请求对象,调用axios的create方法
const requests = axios.create({
  // 基础路径，发请求的时候，路径当中会出现/api
  baseURL: '/api',
  // 超时时间
  timeout: 5000,
});

// 请求拦截，发送数据之前
requests.interceptors.request.use((config) => {
  if (config.headers['Content-Type'] !== 'multipart/form-data') {
    config.headers['Content-Type'] = 'application/json';
  }
  config.headers.token = localStorage.getItem('token');
  return config;
});

// 响应拦截,获取数据之前
requests.interceptors.response.use(
  (res) => {
    // console.log('request:res.data:' + JSON.stringify(res.data));
    if (res.data.code === 200) {
      return res.data;
    } else if (res.data.code === 401 && res.data.msg === '请先登陆...') {
      localStorage.setItem('token', '');
      router.push({ path: '/login' });
    } else {
      return res.data;
    }
  },
  (error) => {
    console.log('error.code:', error.code);
    console.log(error);
  }
);

export default requests;
