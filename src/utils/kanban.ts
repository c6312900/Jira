import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";


export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp();
    return useQuery<Kanban[]>(['kanbans', param],() => client("kanbans", {data: param}))
    //改成tuple,字串'kanbans'固定不會變,但param會變,只要改變就去執行useQuery去server端取資料
  }