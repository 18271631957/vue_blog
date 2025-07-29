import axios from 'axios'
import {
  baseURL_dev,
  baseURL_pro,
  statusName,
  messageName,
  successCodeArray
} from './config'
import { stringify } from 'qs'

// 服务器报错
const CODE_MESSAGE = {
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

const handleData = ({ config, data, status, statusText }) => {
  // console.log(config, data, status, statusText)
  // 如果后端接口返回的数据中有code存在，覆盖默认http协议的code
  let code = data && data[statusName] ? data[statusName] : status
  // 若code属于操作正常的code，则把code修改为200,为什么要这么做？
  // 因为有些后端接口，登录接口账号密码错误的话肯定不是200，但是请求属于正常情况
  if (successCodeArray.includes(code)) code = 200
  switch (code) {
    case 200:
      return data
    case 400:
      break
  }
  // 到这里说明请求异常了，这个时候应该alert一下后端给的异常message
  // 但是异常时，比如服务器报错，可能连data都没有，这个时候使用前端建立的情况
  // 也有时候后端报错，比如接口参数非法，返回的可能没有message字段，这个时候用http协议的statusText
  let message = ''
  if (data) {
    if (data[messageName]) {
      message = data[messageName]
    } else {
      message = statusText
    }
  } else {
    message = CODE_MESSAGE[code]
  }
  ElNotification({
    title: "提示",
    message: message,
    type: "error",
    duration: 3000,
  });
  return Promise.reject(message)
}




const http = axios.create({
  //baseURL: baseURL_dev,
  baseURL: baseURL_pro,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})


//axios请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = ""
    if (token) {
      // 规范写法 不可随意自定义
      config.headers['Authorization'] = `Bearer ${token}`
    }
    // 如果请求方式是get的话，就将json对象转换成url拼接
    if (config.method === 'get' && config.data) {
      config.url = config.url + '?' + stringify(config.data)
    }
    return config
  },
  (error) => {
    ElNotification({
      title: "提示",
      message: "请求都没发出去就报错了，尴尬，速找开发人员",
      type: "error",
      duration: 3000,
    });
    return Promise.reject(error)
  }
)


//axios响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return handleData(response)
  },
  (error) => {
    // 对响应错误做些什么
    console.log(error)
    const { response } = error
    if (response === undefined) {
      ElNotification({
        title: `连接后台接口失败`,
        dangerouslyUseHTMLString: true,
        message: `${error.config.url}<br/>${error.message}`,
        type: "error",
        duration: 8000,
      });
      return Promise.reject(error)
    } else {
      return handleData(response)
    }
  }
)







export default http