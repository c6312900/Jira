import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { clearnObject } from "utils"

//可參考8-5初步实现 useUrlQueryParam 管理 URL 参数状态 09:00
export const useUrlQueryParam = <k extends string>(keys: k[]) => {
//export const useUrlQueryParam = (keys: string[]) => {
    //返回頁面url中,指定鍵的參數值
    
   // const [searchParams, setSearchParam] = useSearchParams()
   const [searchParams] = useSearchParams()
   const setUrlSearchParams = useSetUrlSearchParam()
    //reduce() 方法將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列化為單一值
    //參考https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    //將key 例如:name=好手&personid=18 ,合成1個數組 {name:好手,personid:18}
    //解釋:例如util.ts內的useTasksModal 使用useUrlQueryParam(['editingTaskId']),透過searchParams.get(key)去url
    //找editingTaskId的值假設為15,再透過reduce 形成{editingTaskId:15} 這就是...prev
    return [ 
        useMemo(() => keys.reduce((prev,key) => {
          return {...prev, [key]: searchParams.get(key) || ''}
        },{}  as {[key in k]:string}), //{}  as {[key in string]:string}),
        // eslint-disable-next-line
        [searchParams]), 
      // [searchParams,keys]), //加入keys會造成無限循環     
      (params: Partial<{ [key in k]: unknown }>) => {
              // iterator
              // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
              //[] 數組 , {} 對象 , map 有部署iterator 可用for...of 遍歷 見8-7 3:00
              // const o = clearnObject({
              //  ...Object.fromEntries(searchParams),
              //   ...params,
              // }) as URLSearchParamsInit;
              // return setSearchParam(o);
              return  setUrlSearchParams(params)
            },
    ] as const
    // console.log(searchParams.get('name'))
    
   //typescrpit認為 ['jack',12, {gender: 'male'}]是1個數組,不是tuple,所以數組的類型要一樣,但大家又不同,
   //所以會變成a:(string|number|{gender: string})[] 的類型,所以要加as const返回最原始的類型
   // const a = ['jack',12, {gender: 'male'}]
   // const a = ['jack',12, {gender: 'male'}] as const  //返回最原始的類型
  //  const a = ['12']
  //  const a = ['12'] as const
} 
  
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  return  (params: {[key in string]:unknown}) => {
    const o = clearnObject({
      ...Object.fromEntries(searchParams),
       ...params,
     }) as URLSearchParamsInit;
     return setSearchParam(o);
  }
}