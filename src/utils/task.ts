import { Task } from './../types/task';
import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from './use-optimistic-options';
import { SortProps } from './kanban';


export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();
    return useQuery<Task[]>(['tasks', param],() => client("tasks", {data: param}))
    //改成tuple,字串'kanbans'固定不會變,但param會變,只要改變就去執行useQuery去server端取資料
  }

export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
      (params: Partial<Task>) => client(`tasks` , {
        method: 'POST',
        data: params
       }),
        useAddConfig(queryKey)
    )
};

export const useTask = ((id?: number) => {
  const client = useHttp();   
  return useQuery<Task>(
    ['task',{id}],
    () => client(`tasks/${id}`),
    {enabled:!!id}  //!!id 等於Boolean(id)
  )
});

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    //可參考11-6整段
    (params: Partial<Task>) => client(`tasks/${params.id}` , {
      method: 'PATCH',
      data: params
     }),
     useEditConfig(queryKey)
  )
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({id}:{id:number}) => client(`tasks/${id}` , {
      method: 'DELETE'
     }),
      useDeleteConfig(queryKey)
  )
};




export const useReorderTask = (queryKey:QueryKey) => {
 const client = useHttp()
 return useMutation(
   (params: SortProps) => {
        return client('tasks/reorder',{
          data: params,
          method: 'POST'
        })
   },
   useReorderTaskConfig(queryKey)
 )
}