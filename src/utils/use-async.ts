import { useMounteRef } from './index';
import { useCallback, useReducer, useState } from "react"


interface State<D> {
    error: Error | null,
    data: D | null,
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultIintialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
   const mounteRef =  useMounteRef()
   return useCallback((...args: T[]) => (mounteRef.current? dispatch(...args):void 0),[dispatch, mounteRef])
}                   

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    
    
    //解釋當你setState時,即是對initialState給值,例如:我只給data和stat,
    //...initialState解構後為{stat: 'success', data: D} 只有2個元素,
    //還少1個error元素,這時透過解構...defaultIintialState,會預帶{error: null}
    //所以最後...defaultIintialState解構後為{stat: 'success', data: D, error: null} 
    const config = {...defaultConfig, ...initialConfig}
    // const [state, setState] = useState<State<D>> ({
    //      ...defaultIintialState,
    //      ...initialState
    // })
    //當多個會互相影響的狀態用useReducer ,單個狀態用useState 見10-5 14:00 
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>> ) => ({...state, ...action}) , {
        ...defaultIintialState,
        ...initialState
   })

    // const mounteRef = useMounteRef()
      const safeDispatch = useSafeDispatch(dispatch);

    // useState直接传入函数的含意是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
    // https://codesandbox.io/s/blissful-water-230u4?file=/src/App.js
    const [retry, setRetry] = useState(() => () => {});
   // const [retry, setRetry] = useState(() => {});
   // let retry = () => {} 這種寫法是錯誤的,因為每次渲染時retry變數都要重新定義一次,要用useState保留變數狀態
    const setData = useCallback((data: D) => safeDispatch({
       stat: 'success',
       data,
       error: null 
    }),[safeDispatch])

    const setError =useCallback( (error: Error) => safeDispatch({
       stat: 'error',
       data: null,
       error
    }),[safeDispatch])

    const run =useCallback((promise: Promise<D>, runConfig?: {retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error('請傳入 Promise 類型數據')
        }
       
        //setRetry因為使用useState,會將函數保留下來() => run(promise) ,因此promise也會保留下來
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }            
          //  run(promise)
        }); 
        //setState({...state, stat: 'loading'}) 改成以下
       // dispatch(prevState => ({...prevState, stat: 'loading'})) 
       safeDispatch({stat: 'loading'}) 
        return promise.then((data) => {
           // if (mounteRef.current) //組件被掛載,另組件也非卸載狀態
              setData(data);
            return data
        }).catch((error) => {
            //catch會攔截異常,導致更外層try catch時攔截不到異常
            //例如:login.tsx 的handleSubmit 內的try catch時攔截不到異常,因此return error 改成
           setError(error);
           if (config.throwOnError) return Promise.reject(error);
           return error;           
        })
   // },[config.throwOnError, mounteRef, setData, setError]) 
    },[config.throwOnError, setData, setError, safeDispatch]) 

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isSuccess: state.stat === 'success',
        isError: state.stat === 'error',
        run,
        setData,
        setError,
        // retry 被调用时重新跑一遍run，會觸發setState讓state刷新一遍,state刷新讓useAsync組件重跑一遍
        retry,
        ...state
    }
}