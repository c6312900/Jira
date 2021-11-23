import { useUrlQueryParam } from 'utils/url';
import { useProject } from './../../utils/project';
import { useLocation } from "react-router"
import { useMemo } from 'react';

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
    return   useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name
    }),[projectId, param]);

}


export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]