import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus';
import { getToken,cleanSession } from '@/utils/auth';
import { LoginParm } from '@/api/user/UserModel';
import qs from 'qs'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//返回值类型
export interface Result<T = any> {
    code: number;
    msg: string;
    data: T;
}
//返回的状态码
export enum StatusCode {
    NoAuth = 600,//无权限
    Success = 200 
}
class request {
    private instance: AxiosInstance;
    //构造函数 给instance进行初始化
    constructor(config: AxiosRequestConfig) {
        //创建axios实例
        this.instance = axios.create(config);
        //拦截器配置
        this.interceptors();
    }
    //拦截器
    private interceptors() {
        //请求发送之前的拦截器：添加token
        this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
            nprogress.start()
            //配置token
            let token = getToken();
            //如果token存在，放到请求的头部
            if (token) {
                config.headers = {
                    ...config.headers,
                    token: token
                }
            }
            return config;
        }, (error: any) => {
            // 错误抛到业务代码
            error.data = {}
            error.data.msg = '服务器异常，请联系管理员！'
            return error
        })

        //请求返回之后的处理
        this.instance.interceptors.response.use((res: AxiosResponse) => {
            if (res && res.data) {
                const data = res.data
                nprogress.done()
                //后端接口会返回一些状态,code是根据后端定义的字段来写的
                if (data.code == StatusCode.NoAuth) { //token过期
                    //跳到登录
                    window.location.href = "/login";
                    //清除缓存数据
                    cleanSession();
                    //跳转到登录
                } else if (data.code == StatusCode.Success || res.config.responseType === 'arraybuffer') { //返回成功
                    return res
                } else {
                    ElMessage.error(data.msg || '服务器出错!')
                    return res || null;
                }
            }
        }, (error) => {
            console.log('进入错误')
            if (error && error.response) {
                error.data = {};
                switch (error.response.status) {
                    case 400:
                        error.data.msg = '错误请求';
                        ElMessage.error(error.data.msg)
                        break
                    case 401:
                        error.data.msg = '未授权，请重新登录';
                        ElMessage.error(error.data.msg)
                        break
                    case 403:
                        error.data.msg = '拒绝访问';
                        ElMessage.error(error.data.msg)
                        break
                    case 404:
                        error.data.msg = '请求错误,未找到该资源';
                        ElMessage.error(error.data.msg)
                        break
                    case 405:
                        error.data.msg = '请求方法未允许';
                        ElMessage.error(error.data.msg)
                        break
                    case 408:
                        error.data.msg = '请求超时';
                        ElMessage.error(error.data.msg)
                        break
                    case 500:
                        error.data.msg = '服务器端出错';
                        ElMessage.error(error.data.msg)
                        break
                    case 501:
                        error.data.msg = '网络未实现';
                        ElMessage.error(error.data.msg)
                        break
                    case 502:
                        error.data.msg = '网络错误';
                        ElMessage.error(error.data.msg)
                        break
                    case 503:
                        error.data.msg = '服务不可用';
                        ElMessage.error(error.data.msg)
                        break
                    case 504:
                        error.data.msg = '网络超时';
                        ElMessage.error(error.data.msg)
                        break
                    case 505:
                        error.data.msg = 'http版本不支持该请求';
                        ElMessage.error(error.data.msg)
                        break
                    default:
                        error.data.msg = `连接错误${error.response.status}`;
                        ElMessage.error(error.data.msg)
                }
            } else {
                error.data.msg = "连接到服务器失败";
                ElMessage.error(error.data.msg)
            }
            return Promise.reject(error)
            // return error
        })
    }

    get<T = any>(url: string, parms?: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.get<T>(url, {
                params: parms,
                paramsSerializer: (parms) => {
                    return qs.stringify(parms)
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    //参数的处理
    getParms(parms: any) {
        let _parms = '';
        if (Object.is(parms, undefined || null)) {
            _parms = '';
        }
        else {
            for (const key in parms) {
                if (parms.hasOwnProperty(key) && parms[key]) {
                    _parms += `${parms[key]}/`
                }
            }
        }
        if (_parms) _parms = _parms.substr(0, _parms.length - 1);
        return _parms;
    }

    getRestApi<T = any>(url: string, parms?: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.get<T>(this.getParms(parms) ? `${url}/${this.getParms(parms)}` : url)
                .then((res) => {
                    resolve(res.data as any)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    post<T = any>(url: string, parms: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.post(url, parms, {
                transformRequest: [(params) => {
                    return JSON.stringify(params)
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    put<T = any>(url: string, parms: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.put(url, parms, {
                transformRequest: [(params) => {
                    return JSON.stringify(params)
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    delete<T = any>(url: string, parms?: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.delete<T>(this.getParms(parms) ? `${url}/${this.getParms(parms)}` : url)
                .then((res) => {
                    resolve(res.data as any)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    //获取验证码
    getImage(url: string) {
        return this.instance.post(url, null, {
            responseType: 'arraybuffer'
        })
    }
    
    login<T = any>(url: string, parms: LoginParm): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.post<T>(url, parms, {
                transformRequest: [(parms) => {
                    return qs.stringify(parms)
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                resolve(res as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }

}
export default request;