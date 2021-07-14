import  qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
// import { useArray } from "utils";
// import { config } from "process";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string,
    data?: object;
}

//...customConfig 後面的值會覆蓋前面的,所以method: 'GET'不會寫死,也有可能是method: 'POST' 或method: 'PUT'....等
// export const http = async (endpoint:string,{data, token, headers, ...customConfig}:RequestInit) => {
export const http = async (endpoint:string, {data, token, headers, ...customConfig}: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    //GET 可參考 D:\720s\React\jira\src\screens\project-list\index.tsx
    //POST 可參考 D:\720s\React\jira\src\auth-provider.ts
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
       config.body = JSON.stringify(data || {});
    }

  //POST = 新增; GET = 讀取; PUT = 更新; DELETE = 刪除
  //fetch見5-7 11:00 ,fetch 用.catch()是抓不到服務端回傳的異常狀態,例如response.status === 401 或 500,只有斷網才抓的到
  //但用 else 即 response不OK時是可以抓到服務端回傳的異常狀態401 或 500...等
  //axios 和 fetch 不一樣,axios可以再返回狀態不為2XX時,拋出異常
  return window.fetch(`${apiUrl}/${endpoint}`, config)
         .then(async (response) => {
             if (response.status === 401) {
                //401 未登入或token失效
                await auth.logout();
                window.location.reload();
                return Promise.reject({message: '請重新登入'});
             }
             const data = await response.json();
             if (response.ok) {
                 return data
             } else {
                 return Promise.reject(data);
             }
         })
}

export const useHttp = () => {
    const { user } = useAuth();
   return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token});
   //return (...[endpoint, config]: [string, Config]) => http(endpoint,{...config, token: user?.token})
}