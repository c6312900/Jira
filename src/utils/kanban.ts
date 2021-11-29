import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

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