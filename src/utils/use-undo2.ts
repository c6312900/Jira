import { useCallback, useState } from "react"

export const useUndo2 = <T>(initialPresent: T) => {
    // const [past, setPast] = useState<T[]>([])
    // const [present, setPresent] = useState(initialPresent)
    // const [future,setFuture] = useState<T[]>([])

    const [state, setState] = useState<{
        past: T[],
        present: T,
        future: T[]
    }>({
        //past:[] as T  //也可寫成此方法
        past:[],
        present: initialPresent,
        future:[]
    })

    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0

    // const undo = useCallback(() => {
    //     if (!canUndo) return
    //     const previos = past[past.length-1]
    //     const newPast = past.slice(0,past.length-1)

    //     setPast(newPast)
    //     setPresent(previos)
    //     setFuture([present,...future])
    // },[canUndo, future, past, present])

    const undo = useCallback(() => {
        //currentState代表現在state的值
        setState((currentState) => {
            const {past, present, future} = currentState
            if (past.length === 0) return currentState

            const previos = past[past.length-1]
            const newPast = past.slice(0,past.length-1)
            return {
                past: newPast,
                present: previos,
                future: [present,...future]
            }
         })
        
    },[])

    const redo = useCallback(() => {        
        setState((currentState) => {
            const {past, present, future} = currentState
            if (future.length === 0) return currentState
            const next = future[0]
            const newFuture = future.slice(1)
            
            return {
               past: [...past,present],
               present: next,
               future: newFuture
            }
        })
       

    },[])

    const set = useCallback((newPresent: T) => {
       setState((currentState) => {
        const {past, present, future} = currentState         
        if (newPresent === present) return currentState

        return {
            past: [...past,present],
            present: newPresent,
            future: []        
        }
       }) 
 
    },[])

    const reSet = useCallback((newPresent:T) => {
        setState(() => {           
           return {
            past: [],
            present: newPresent,
            future: [] 
           }
        })
    },[])

    return [
        state,
        {set, reSet,undo, redo, canUndo, canRedo}
    ]

}