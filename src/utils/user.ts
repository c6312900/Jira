import { useQuery } from "react-query";
import { User } from "types/User";
import { useHttp } from "./http";


export const useUsers = (param?: Partial<User>) => {
    const client = useHttp();
    return useQuery<User[]>(['users', param],() => client("users", {data: param}))
    // const {run, ...result} = useAsync<User[]>();
     
    // useEffect(() => {
    //     run(client("users", {data: clearnObject(param || {})}))
    //     // eslint-disable-next-line
    // },[param]); 

   // return result
}

