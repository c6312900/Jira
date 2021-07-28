import { useState } from "react"

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

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    
    
    //解釋當你setState時,即是對initialState給值,例如:我只給data和stat,
    //...initialState解構後為{stat: 'success', data: D} 只有2個元素,
    //還少1個error元素,這時透過解構...defaultIintialState,會預帶{error: null}
    //所以最後...defaultIintialState解構後為{stat: 'success', data: D, error: null} 
    const config = {...defaultConfig, ...initialConfig}
    const [state, setState] = useState<State<D>> ({
         ...defaultIintialState,
         ...initialState
    })
        
    const setData = (data: D) => setState({
       stat: 'success',
       data,
       error: null 
    })

    const setError = (error: Error) => setState({
       stat: 'error',
       data: null,
       error
    })

    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('請傳入 Promise 類型數據')
        }
        setState({...state, stat: 'loading'})

        return promise.then((data) => {
            setData(data)
            return data
        }).catch((error) => {
            //catch會攔截異常,導致更外層try catch時攔截不到異常
            //例如:login.tsx 的handleSubmit 內的try catch時攔截不到異常,因此return error 改成
           setError(error);
           if (config.throwOnError) return Promise.reject(error);
           return error;           
        })
    }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isSuccess: state.stat === 'success',
        isError: state.stat === 'error',
        run,
        setData,
        setError,
        ...state
    }
}