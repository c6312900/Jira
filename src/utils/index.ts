import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value
export const isVoid = (value: unknown) => value === undefined ||  value === null ||  value === ""

// let c: object
// c = {name: 'jack'}
// c= () => {}
// c= new RegExp('')
// const c= {...(()=>{}) } 當let c: object這樣解構任何東西都是空數組,無意義的,因為object的範圍太大
// let b: {[key: string]: unknown}
// b = {name: 'jack'}
// b= () => {}
//在一個函數裡,改變傳入的對象是不好的,在這裡把它copy一份給result
export const clearnObject = (object: {[key: string]: unknown}) => {
   // Object.assign({},object)
    const result = {...object}
    Object.keys(result).forEach(key => {
        // value= 0 時也會delete .但他是有效數字,我們不想刪除
        const value = result[key]
        if (isVoid(value)) {          
          delete result[key]
        }
    })
  return result
}


export const useMount = (callback: () => void ) => {
  useEffect(() =>{
    callback()
    // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) //空數組是表示只在頁面加載時執行一次(或表示組件加載時只執行一次),
        //*****空數組這邊如果改加callback,會造成封包request一直送
}
//hook要加use,且只能在其他hook中或組件中運行

export const useDebounce = <T>(value: T,delay?: number) => {
  //useState 表示響應式的,當值改變時能檢測到值改變,例如:頁面改變或useEffect改變可觸發useState
  const [debouncedValue,setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value),delay)
    return () => clearTimeout(timeout)
  },[value,delay])  //每次在value和delay改變時觸發useEffect
  return debouncedValue
}


// const debounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       func(...param);
//     }, delay);
//   }
// }
// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()
//   ...5s
// 执行！

// debounce 原理讲解：可看視頻3-4 8:00
// 0s ---------> 1s ---------> 2s --------> ...
//     一定要理解：这三个函数都是同步操作，所以它们都是在 0~1s 这个时间段内瞬间完成的；
//     log()#1 // timeout#1
//     log()#2 // 发现 timeout#1！取消之，然后设置timeout#2
//     log()#3 // 发现 timeout#2! 取消之，然后设置timeout#3
//             // 所以，log()#3 结束后，就只剩timeout#3在独自等待了

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (title:string, keepOnUnmount:boolean = true) => {
  const oldTitle = useRef(document.title).current; //讀取的值在hook生命週期內永遠不會變 
  //const oldTitle = document.title
  // 頁面加载时: 舊title 'React App'
  // 加载后：新title


 // console.log('render時oldTitle',oldTitle)
  useEffect(() => {
      document.title = title 
  },[title])
  
   //重要當useEffect 後面是[] 時代表頁面卸載時觸發,例如切換其他頁面或reflesh
   //但若[title]時表示title改變時觸發
  useEffect(() => {
      return () => { 
        if (!keepOnUnmount) {
        //  console.log('unmount時oldTitle',oldTitle)

       // 如果不指定依赖[]，讀到的永遠是舊title,因為一個function包含另一個function,外層function有const(oldTitle)或let,
       //內層functionu有用到時要注意(閉包),永遠只讀到第一次的const(oldTitle)值,可看test範例
      document.title = oldTitle 
    }
  }} ,[keepOnUnmount,oldTitle])
}

//返回組件的掛載狀態,如果還沒掛載或已經卸載返回false,否則為true
export const useMounteRef = () => {
  //useRef 會記錄mountedRef這個變數,預設值給false,mountedRef.current代表這個變數目前的值
  //可參考https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3
   const  mountedRef = useRef(false)  
   //useEffect 在頁面加載後被調用 mountedRef.current = true ,卸載後才會return mountedRef.current = false
   useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
   })

   return mountedRef
}

export const resetRoute = () => window.location.href= window.location.origin


