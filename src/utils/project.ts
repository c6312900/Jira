import { useProjectSearchParams } from './../screens/project-list/util';
import { useMutation, useQueryClient } from 'react-query';
//import { useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { Project } from "screens/project-list/list";
//import { clearnObject } from "utils";
import { useHttp } from "./http";

//import { useAsync } from "./use-async";

// export const useProject = (param?: Partial<Project>) => {
//     const client = useHttp();
//     const {run, ...result} = useAsync<Project[]>();
//     const fetchProjects = useCallback(() => client("projects", {data: clearnObject(param || {})}),[client,param]);
    
//     //****fetchProjects() 傳回Promise(any),fetchProjects傳回 () => Promise(any)  callback函數****/
//     //可參考9-5和9-4
//     useEffect(() => {
//         run(fetchProjects(),{
//           retry: fetchProjects
//         } )
      
//     },[param,run,fetchProjects]);  
//     //run非狀態也非基本類型不可加到依賴,如果要加,要用useMemo和useCallback,見影片10-1 12:00,通常寫自訂義hook,要返回函數時要用useCallback,
//     //方便其他人調用
//     //也可參考:https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3
                                                      
//     return result
// }

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // return useQuery('projects',() => client("projects", {data: param}))
  //return useQuery<Project[],Error>(['projects', param],() => client("projects", {data: param}))
  return useQuery<Project[]>(['projects', param],() => client("projects", {data: param}))
  //改成tuple,字串'projects'是固定不會變,但param會變,只要改變就去執行useQuery去server端取資料
}

// export const useEditProject = () => {
//     const { run, ...asyncResult } = useAsync();
//     const client = useHttp();
//     const mutate = (params: Partial<Project>) => {
//       return run(
//         client(`projects/${params.id}`, {
//           data: params,
//           method: "PATCH",
//         })
//       );
//     };
//     return {
//       mutate,
//       ...asyncResult,
//     };
//   };
  export const useEditProject = () => {
    const client = useHttp();
    const queryClient = useQueryClient();
    const [searchParam] = useProjectSearchParams()
    const queryKey = ['projects',searchParam] 
    return useMutation(
      //可參考11-6整段
      (params: Partial<Project>) => client(`projects/${params.id}` , {
        method: 'PATCH',
        data: params
      }),{
       // onSuccess: () => queryClient.invalidateQueries('projects'),
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        async onMutate(target) {         
         const previousItems = queryClient.getQueryData(queryKey)
         queryClient.setQueryData(queryKey,(old?: Project[]) => {
               return old?.map(project => project.id === target.id ? {...project, ...target} : project) || []
         })
         return {previousItems}
        },        
        onError(error, newItem, context) {
          queryClient.setQueryData(queryKey,(context as {previousItems: Project[] }).previousItems)
        }
      }
    )

  };
  
  export const useAddProject = () => {
    const client = useHttp();
    const queryClient = useQueryClient();
    return useMutation(
      (params: Partial<Project>) => client(`projects` , {
        method: 'POST',
        data: params
      }),{
        onSuccess: () => queryClient.invalidateQueries('projects')
      }
    )
  };

  // export const useAddProject = () => {
  //   const { run, ...asyncResult } = useAsync();
  //   const client = useHttp();
  //   const mutate = (params: Partial<Project>) => {
  //     return run(
  //       client(`projects/${params.id}`, {
  //         data: params,
  //         method: "POST",
  //       })
  //     );
  //   };
  //   return {
  //     mutate,
  //     ...asyncResult,
  //   };
  // };

  export const useProject = ((id?: number) => {
       const client = useHttp();   
       return useQuery<Project>(
         ['project',{id}],
         () => client(`projects/${id}`),
         {enabled:!!id}  //!!id 等於Boolean(id)
       )
  });