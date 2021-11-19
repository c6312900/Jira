import { useProject } from './../../utils/project';
import { useLocation } from "react-router"

export const useProjectIdInUrl = () => {
    const {pathname} = useLocation()
    //見12-3 3:00
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]