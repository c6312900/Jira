import { useCallback, useState } from "react"

export const useUndo1 = <T>(initialPresent: T) => {
    const [past, setPast] = useState<T[]>([])
    const [present, setPresent] = useState(initialPresent)
    const [future,setFuture] = useState<T[]>([])

    const canUndo = past.length !== 0
    const canRedo = future.length !== 0

    const undo = useCallback(() => {
        if (!canUndo) return
        const previos = past[past.length-1]
        const newPast = past.slice(0,past.length-1)

        setPast(newPast)
        setPresent(previos)
        setFuture([present,...future])
    },[canUndo, future, past, present])

    const redo = () => {
        if (!canRedo) return
        const next = future[0]
        const newFuture = future.slice(1)
        
        setPast([...past,present])
        setPresent(next)
        setFuture(newFuture)

    }

    const set = (newPresent: T) => {
       if (newPresent === present) return
       setPast([...past, present])
       setPresent(newPresent)
       setFuture([])
    }

    const reSet = (newPresent:T) => {
        setPast([])
        setPresent(newPresent)
        setFuture([])
    }

    return [
        {past, present, future},
        {set, reSet,undo, redo, canUndo, canRedo}
    ]

}