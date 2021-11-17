import { Task } from './../types/task';
import { useQuery } from "react-query";
import { useHttp } from "./http";


export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();
    return useQuery<Task[]>(['tasks', param],() => client("tasks", {data: param}))
    //改成tuple,字串'kanbans'固定不會變,但param會變,只要改變就去執行useQuery去server端取資料
  }