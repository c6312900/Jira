import { IdSelect } from "components/id-select";
import { ComponentProps } from "react";
import { useTaskTypes } from "utils/task-type";

export const TaskTypeSelect = (props: ComponentProps<typeof IdSelect>) => {
    
    const { data: taskTypes} = useTaskTypes();
    
    return <IdSelect options={taskTypes || []} {...props}/>
};