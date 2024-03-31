import axios from "axios";
// 导入其类型
import type {
    AxiosInstance,
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig, // 和 AxiosRequestConfig 相比，要求 header 属性必须存在
} from 'axios'



const BASE_URL = 'https://mock.apifox.cn/m1/2328533-0-default'

// 用到的 axios 实例
const service: AxiosInstance = axios.create({
    // 设置 url 和请求头
    baseURL: BASE_URL,
    headers: {
        apifoxToken: localStorage.getItem('token')
    }
})

// 拿到的数据格式, T 为拿到的数据的 data 的类型
export type ResultData<T = any> = {
    code: number, // 状态码
    msg: string, // 内容
    data?: T
}
// 常见方法封装, 可以点开 axios 的类型声明，和自己的类型是如何兼容的
// axois 的这些方法返回值都是相同的类型 Promise<R>，真的好用
export function post<T>(url: string, params?: object): Promise<ResultData<T>> {
    const res = service.post<T, ResultData<T>>(url, { params })
    return res;
}

export function del<T>(url: string, params?: object): Promise<ResultData<T>> {
    const res = service.delete<T, ResultData<T>>(url, { params })
    return res;
}

export function get<T>(url: string, params?: object): Promise<ResultData<T>> {
    const res = service.get<T, ResultData<T>>(url, { params })
    return res;
}


export function put<T>(url: string, params?: object): Promise<ResultData<T>> {
    const res = service.put<T, ResultData<T>>(url, { params })
    return res;
}







// 拦截器：第一个参数是：发送请求的前一刻对请求配置进行一些操作
// 第二个参数是请求发送失败后，执行的回调
// 回调的类型为 配置对象或者一个新的 Promise 对象。如果是个 promise，Axios 将等待该 promise 对象解决（resolve）后，再继续发送请求。
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config;
}, (error: AxiosError) => {
    console.log(error);
    return Promise.reject();
})

// 响应拦截器用于在拿到响应信息后对响应做一些处理
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status == 200) {
            console.log('response ==> ', response);
            return response.data
        } else {
            return Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error)
        return Promise.reject();
    }
)