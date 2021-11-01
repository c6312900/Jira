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
    ])

    const open = () =>  setProjectCreate({projectCreate: true})
    const close = () =>  setProjectCreate({projectCreate: undefined})
    
    return {
        projectModalOpen: projectCreate === 'true',
        open,
        close
    }
       
    
    // return [
    //     projectCreate === 'True',
    //     open,
    //     close
    // ] as const
}