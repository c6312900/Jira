import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

//可參考8-5初步实现 useUrlQueryParam 管理 URL 参数状态 09:00
export const useUrlQueryParam = <k extends string>(keys: k[]) => {
//export const useUrlQueryParam = (keys: string[]) => {
    //返回頁面url中,指定鍵的參數值
    
    const [searchParams, setSearchParam] = useSearchParams()
    
    //reduce() 方法將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列化為單一值
    //參考https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    //將key 例如:name=好手&personid=18 ,合成1個數組 {name:好手,personid:18}
    return [ 
        useMemo(() => keys.reduce((prev,key) => {
          return {...prev, [key]: searchParams.get(key) || ''}
        },{}  as {[key in k]:string}), //{}  as {[key in string]:string}),
        // eslint-disable-next-line
        [searchParams]), 
      // [searchParams,keys]), //加入keys會造成無限循環     
        setSearchParam
    ] as const
    // console.log(searchParams.get('name'))
    
   //typescrpit認為 ['jack',12, {gender: 'male'}]是1個數組,不是tuple,所以數組的類型要一樣,但大家又不同,
   //所以會變成a:(string|number|{gender: string})[] 的類型,所以要加as const返回最原始的類型
   // const a = ['jack',12, {gender: 'male'}]
   // const a = ['jack',12, {gender: 'male'}] as const  //返回最原始的類型
  //  const a = ['12']
  //  const a = ['12'] as const
} 
   