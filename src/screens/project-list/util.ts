import { useProject } from 'utils/project';
import { useMemo } from 'react';
import { useUrlQueryParam } from 'utils/url';

//因為不會包含模板代碼所以使用ts,否則要用tsx

// 项目列表搜索的参数
export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name','personId'])
   return [ 
       useMemo(() => ({...param, personId: Number(param.personId) || undefined}),[param]), 
       setParam] as const
}

export const useProjectModal = () => {
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
        "projectCreate",
    ]);
    const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam([
        "editingProjectId",
    ]);
    const {data: editingProject, isLoading } = useProject(Number(editingProjectId))
    
    const open = () =>  setProjectCreate({projectCreate: true})
   // const close = () =>  setProjectCreate({projectCreate: undefined})
    const close = () => {
        setProjectCreate({projectCreate: undefined});
        setEditingProjectId({editingProjectId: undefined});
    } 
    const startEdit = (id: number) => setEditingProjectId({editingProjectId: id}) 
    
    return {
        projectModalOpen: projectCreate === 'true' || !!editingProject,
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
       
    
    // return [
    //     projectCreate === 'True',
    //     open,
    //     close
    // ] as const
}