import { useCallback, useReducer } from "react"

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
    past: T[],
    present: T,
    future: T[] 
} 

type Action<T> = {newPresent?: T, type: typeof UNDO |typeof REDO |typeof SET |typeof RESET }

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
    const {past, present, future} = state
    const {newPresent, type} = action
    switch (type) {
        case UNDO: {
            //state 代表現在的 currentState 所以 currentState現在不用了
            // if (past.length === 0) return currentState
            if (past.length === 0) return state
                const previos = past[past.length-1]
                const newPast = past.slice(0,past.length-1)
                return {
                    past: newPast,
                    present: previos,
                    future: [present,...future]
                }
               
        }

        case REDO: {
           if (future.length === 0) return state
            const next = future[0]
            const newFuture = future.slice(1)
            return {
               past: [...past,present],
               present: next,
               future: newFuture
            }            
        }

        case SET: {            
            if (newPresent === present) return state
            return {
               past: [...past,present],
               present: newPresent,
               future: []        
            }
        }

        case RESET: {
            return {
                past: [],
                present: newPresent,
                future: [] 
               }
        }
    }
    return state
}

export const useUndo = <T>(initialPresent: T) => {
    // const [past, setPast] = useState<T[]>([])
    // const [present, setPresent] = useState(initialPresent)
    // const [future,setFuture] = useState<T[]>([])
    const [state, dispatch] = useReducer(undoReducer, {
        past:[],
        present: initialPresent,
        future:[]
    } as State<T>)

    // const [state, setState] = useState<{
    //     past: T[],
    //     present: T,
    //     future: T[]
    // }>({
    //     //past:[] as T  //也可寫成此方法
    //     past:[],
    //     present: initialPresent,
    //     future:[]
    // })

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

    const undo = useCallback(() => dispatch({type:UNDO}),[])

    const redo = useCallback(() => dispatch({type:REDO}),[])

    const set = useCallback((newPresent: T) => dispatch({newPresent, type: SET}),[])

    const reSet = useCallback((newPresent:T) => dispatch({newPresent, type: RESET}),[])

    return [
        state,
        {set, reSet,undo, redo, canUndo, canRedo}
    ]

}