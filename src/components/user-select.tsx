import { useUsers } from "utils/user";
import { IdSelect } from "components/id-select";
import { ComponentProps } from "react";

export const UserSelect = (props: ComponentProps<typeof IdSelect>) => {
    
    const { data: users} = useUsers();
    
    return <IdSelect options={users || []} {...props}/>
}