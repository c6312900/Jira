import { useQuery } from "react-query";
import { useHttp } from "./http";
import { TaskType } from 'types/task-type';



export const useTaskTypes = () => {
    const client = useHttp();
    return useQuery<TaskType[]>(['taskTypes'],() => client("taskTypes"))
    //改成tuple,字串'kanbans'固定不會變,但param會變,只要改變就去執行useQuery去server端取資料
  }

