import { QueryKey, useQueryClient } from "react-query";
import { Task } from "types/task";
import { reorder } from "./reorder";

export const useConfig = (
    queryKey: QueryKey, 
    callBack: (target: any , old?: any[]) => any[]
    ) => {
    const queryClient = useQueryClient()
    return {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        async onMutate(target: any) {         
         const previousItems = queryClient.getQueryData(queryKey)
         queryClient.setQueryData(queryKey,(old?: any[]) => {
             return callBack(target, old) 
             //  return old?.map(project => project.id === target.id ? {...project, ...target} : project) || []
         })
         return {previousItems}
        },        
        onError(error: any, newItem: any, context: any) {
          queryClient.setQueryData(queryKey,context.previousItems)
        }
    }

}

export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey,(target, old) => old?.filter(item => item.id !== target.id)||[])
export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey,(target, old) => old?.map(item => item.id === target.id ? {...item,...target}:item)||[])
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey,(target, old) => {
                                                                               return old? [...old, target]:[target]})
//export const useReorderConfig = (queryKey: QueryKey) => useConfig(queryKey,(target, old) => old || [])        
export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
