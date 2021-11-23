import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./util"

export const SearchPanel = () => {
    const serachParams = useTasksSearchParams();
    const setSearchParams = useSetUrlSearchParam();
    const reset = () => {
        setSearchParams({
        typeId: undefined,
        processorId: undefined,
        tagId: undefined,
        name: undefined
        })
    }

    return <Row marginBottom={4} gap={true} >
        <Input style={{width: '20rem'}} placeholder={'任務名'} value={serachParams.name} 
         onChange={(evt) => setSearchParams({name: evt.target.value})  }/>
        <UserSelect defaultOptionName={'經辦人'} value={serachParams.processorId}
         onChange={(value) => setSearchParams({processorId: value})}/> 
        <TaskTypeSelect defaultOptionName={'類型'} value={serachParams.typeId}
         onChange={(value) => setSearchParams({typeId: value})}/>
         <Button onClick={reset}>清除篩選器</Button> 
    </Row>
}