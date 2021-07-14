import { useEffect, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

//在一個函數裡,改變傳入的對象是不好的,在這裡把它copy一份給result
export const clearnObject = (object: object) => {
   // Object.assign({},object)
    const result = {...object}
    Object.keys(result).forEach(key => {
        // value= 0 時也會delete .但他是有效數字,我們不想刪除
        // @ts-ignore
        const value = result[key]
        if (isFalsy(value)) {
          // @ts-ignore  
          delete result[key]
        }
    })
  return result
}

export const useMount = (callback: () => void ) => {
  useEffect(() =>{
    callback()
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