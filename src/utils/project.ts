import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/list";
import { clearnObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (param?: Partial<Project>) => {
    const client = useHttp();
    const {run, ...result} = useAsync<Project[]>();
    const fetchProjects = useCallback(() => client("projects", {data: clearnObject(param || {})}),[client,param]);
    
    //****fetchProjects() 傳回Promise(any),fetchProjects傳回 () => Promise(any)  callback函數****/
    //可參考9-5和9-4
    useEffect(() => {
        run(fetchProjects(),{
          retry: fetchProjects
        } )
      
    },[param,run,fetchProjects]);  
    //run非狀態也非基本類型不可加到依賴,如果要加,要用useMemo和useCallback,見影片10-1 12:00,通常寫自訂義hook,要返回函數時要用useCallback,
    //方便其他人調用
    //也可參考:https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3
                                                      
    return result
}

export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
      return run(
        client(`projects/${params.id}`, {
          data: params,
          method: "PATCH",
        })
      );
    };
    return {
      mutate,
      ...asyncResult,
    };
  };
  
  export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
      return run(
        client(`projects/${params.id}`, {
          data: params,
          method: "POST",
        })
      );
    };
    return {
      mutate,
      ...asyncResult,
    };
  };