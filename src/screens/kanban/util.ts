import { useDebounce } from "utils";
import { useCallback } from 'react';
import { useUrlQueryParam } from 'utils/url';
import { useProject } from './../../utils/project';
import { useLocation } from "react-router"
import { useMemo } from 'react';
import { useTask } from 'utils/task';

export const useProjectIdInUrl = () => {
    const {pathname} = useLocation()
    //見12-3 3:00
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

// export const useTasksSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useTasksSearchParams = () => {
     const [param, setParam] = useUrlQueryParam([
         'name',
         'typeId',
         'processorId', //負責人
         'tagId'
     ]) 
    
    const  projectId= useProjectIdInUrl();
    const  debouncedName= useDebounce(param.name,200)
    return   useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name,
    }),[projectId, param]);

}


export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

export const useTasksModal = () => {

    const [{editingTaskId},setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
    const {data: editingTask, isLoading} = useTask(Number(editingTaskId)) //找尋該筆Editing id的值

    const startEdit = useCallback((id: number) => {
        setEditingTaskId({editingTaskId: id})   
    },[setEditingTaskId])

    const close = useCallback(() => {
           setEditingTaskId({editingTaskId: ''})
    },[setEditingTaskId])
    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    }

}