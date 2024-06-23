# axios的封装

## 封装的代码
```ts
import axios from "axios";

if (process.env.NODE_ENV === 'development') {
  //开发环境 do something
  axios.defaults.baseURL = 'api';
} else {
  //生产环境 do something
  axios.defaults.baseURL = '';
}

const http = axios.create({
  //通用请求的地址前缀(例如，http://www.baidu.com/)
  baseURL: axios.defaults.baseURL,
  // 超时时间==
  timeout: 8000,
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  if (sessionStorage.getItem("token")) {
    config.headers['Authorization'] = sessionStorage.getItem("token");
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 在响应请求之前做些什么
  return response;
}, function (error) {
  // 对响应错误做些什么
  return Promise.reject(error);
});

export default http
```

## 使用方式
示例：
```ts
import http from "../utils/request";

let urls: string

if (process.env.NODE_ENV === 'development') {
    //开发环境 do something
    urls = '';
} else {
    //生产环境 do something
    urls = 'https://xxxx.com/api';
}

// 登录
export const login = (username: string, password: string) => {
    return http.post(urls + '/groups/loginManagement', { groupName: username, password: password })
}

// 组员管理页面获取组员
export const getMember = (groupId: number) => {
    return http.get(urls + '/logins/getAllTeamMember', { params: { groupId: groupId } })
}

// 组员管理页面删除
export const deleteMember = (id: number) => {
    let url = urls + `/users/${id}`
    return http.delete(url)
}

// 组员管理页面修改
export const editMember = (menber: object) => {
    return http.put(urls + '/logins', { ...menber })
}
```

在Vue文件中的使用方式：
```js
import { getMember, editMember } from '../http/index'
import { ElMessage } from 'element-plus'

// 以下为接口传过来的数据
function getMembers() {
    getMember(groupId).then((response: { data: any; }) => {
        tableData.value = response.data.data
    }).catch((error: MessageParamsWithType) => {
        ElMessage.error(error)
    })
}

// 修改抽屉的提交按钮
const onClick = () => {
    editMember(form).then(() => {
        ElMessage.success("修改成功")
        getMembers()
        table.value = false
    }).catch((error) => {
        ElMessage.error(error)
    })
}
```