import  qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";
// import { type } from "os";
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

//// JS 中的typeof，是在runtime时运行的
// return typeof 1 === 'number'
// TS 中的typeof，是在静态环境运行的
// Parameters<typeof http> 讀取http函式參數(Parameters)的類型
export const useHttp = () => {
    const { user } = useAuth();
    //Parameters,Omit,Partial.... 是 Utility Types 充當工具的類型
   return useCallback((...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token}),[user?.token]);
   //return (...[endpoint, config]: [string, Config]) => http(endpoint,{...config, token: user?.token})
}

//聯合類型
// let myFavoriteNumber: string | number ;
// myFavoriteNumber = 'aaaa';
// myFavoriteNumber = 7 ;
// myFavoriteNumber = {} 不可給對象,只能給 string | number

// let jackFavoriteNumber: string | number 這樣寫麻煩將string | number 抽象出來新的類型,
//改成類型別名,以下:
//類型別名
// type FavoriteNumber = string | number

//   let jackFavoriteNumber: FavoriteNumber = 'aaaa' ;

//類型別名類似interface在很多情况下可以互换
// interface Person {
//    name: string
// }
//也可改成
// type Person = {name: string}
// const person1 : Person = {name:'aaaa'}

//差異 ,interface 在類型別名為聯合類型,这种情况下没法替代type
// type FavoriteNumber1 = string | number
// let jackFavoriteNumber1: FavoriteNumber1 = 'aaaa' ;

//差異 interface 也没法实现Utility type
// type Person = {
//     name: string;
//     age: number;
//   };
//  const xiaoMing: Partial<Person> = {}; //允許Person部分屬性
  
//  // const shenMiRen: Omit<Person, "name"  > = {name: ''}; //排除不需要Person的屬性
//   const shenMiRen1: Omit<Person, "name" | "age" > = {}; //排除不需要Person的屬性,但屬性全部排除,剩{},又變成全都可以
//   type PersonKeys = keyof Person;
//   type PersonOnlyName = Pick<Person, "name" | "age">; //在Person中挑選一些類型組成新的類型
//   type Age = Exclude<PersonKeys, "name">;
  
  // Partial 的实现,例如: type PersonKeys = keyof Person; 代表取出Person內的鍵值name和age,
  // 這邊的T就 代表Person ,keyof T就代表所有鍵值的集合,p in表示遍歷所有鍵值,重點是? 可以所有鍵值或少1或2個鍵值或空對象...
  //  T[P]及取得值 例如: Person['age']或Person['age','name']的意思
//   type Partial<T> = {
//     [P in keyof T]?: T[P];
//   };

  //keyof T 就代表所有鍵值的集合,K extends ,K是使用者給的鍵值子集,必須在所有鍵值的集合內
  //(extends)可想成繼承,k的集合可以小於等於所有鍵值的集合(keyof T)
  //P遍歷所有子集, T[P]取得所有子集的值,可看範例PersonOnlyName
//   type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };

//T的集合一定大於U,正常來說T繼承至U一定要小於等於U,但因有比較運算?,
//所以T的集合可以大於U,又U集合的對象在T集合也有,則會給never,否則保留在T集合內
// type Exclude<T, U> = T extends U ? never : T;