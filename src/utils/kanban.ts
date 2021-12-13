import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig,  useReorderKanbanConfig } from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp();
    return useQuery<Kanban[]>(['kanbans', param],() => client("kanbans", {data: param}))
    //改成tuple,字串'kanbans'固定不會變,但param會變,只要改變就去執行useQuery去server端取資料
  }

export const useAddKanban = (queryKey: QueryKey) => {
    const client = useHttp();
   // const queryClient = useQueryClient();
    return useMutation(
      (params: Partial<Kanban>) => client(`kanbans` , {
        method: 'POST',
        data: params
       }),
        useAddConfig(queryKey)
      //{
      //   onSuccess: () => queryClient.invalidateQueries('projects')
      // }
    )
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({id}:{id:number}) => client(`kanbans/${id}` , {
      method: 'DELETE'
     }),
      useDeleteConfig(queryKey)
  )
};

export interface SortProps {
  //要重新排序的item
  fromId: number;
  //目標item
  referenceId: number;
  //放在目標item的前或後
  type: 'before' | 'after';
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey:QueryKey) => {
 const client = useHttp()
 return useMutation(
   (params: SortProps) => {
        return client('kanbans/reorder',{
          data: params,
          method: 'POST'
        })
   },
   useReorderKanbanConfig(queryKey)
 )
}