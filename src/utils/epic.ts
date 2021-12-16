import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useEpics = (param?: Partial<Epic>) => {
    const client = useHttp();
    return useQuery<Epic[]>(['epics', param],() => client("epics", {data: param}))
    //改成tuple,字串'epics'固定不會變,但param會變,只要改變就去執行useQuery去server端取資料
  }

export const useAddEpic = (queryKey: QueryKey) => {
    const client = useHttp();
   // const queryClient = useQueryClient();
    return useMutation(
      (params: Partial<Epic>) => client(`epics` , {
        method: 'POST',
        data: params
       }),
        useAddConfig(queryKey)
      //{
      //   onSuccess: () => queryClient.invalidateQueries('projects')
      // }
    )
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({id}:{id:number}) => client(`epics/${id}` , {
      method: 'DELETE'
     }),
      useDeleteConfig(queryKey)
  )
};


