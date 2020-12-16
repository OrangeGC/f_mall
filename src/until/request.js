import axios from "axios";

// 创建axios实例
const instance = axios.create({
  baseURL: "http://localhost:8080/", 
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // 请求超时时间
});

// request请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// response 响应拦截器
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
