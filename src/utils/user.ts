import { useEffect } from "react";
import { User } from "types/User";
import { clearnObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp();
    const {run, ...result} = useAsync<User[]>();
     
    useEffect(() => {
        run(client("users", {data: clearnObject(param || {})}))
        // eslint-disable-next-line
    },[param]); 

    return result
}