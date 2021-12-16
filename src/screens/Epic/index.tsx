import { Button, List, Modal } from "antd"
import { Row, ScreenContainer } from "components/lib"
import dayjs from "dayjs"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useProjectInUrl } from "screens/kanban/util"
import { Epic } from "types/epic"
import { useDeleteEpic, useEpics } from "utils/epic"
import { useTasks } from "utils/task"
import { CreateEpic } from "./create-epic"
import { useEpicSearchParams, useEpicsQueryKey } from "./util"

export const EpicScreen = () => {
  const {data: currentProject} = useProjectInUrl()
  const {data: epics} = useEpics(useEpicSearchParams())
  const {data: tasks} = useTasks({projectId: currentProject?.id})
  const {mutate: deleteEpic} = useDeleteEpic(useEpicsQueryKey())
  const [createEpicOpen,setCreateEpicOpen] = useState(false)
  const confirmDeleteEpic = (epic: Epic) => {
        Modal.confirm({
          title: `确定删除项目组：${epic.name}`,
          content: "点击确定删除",
          okText: "确定",
          onOk() {
            deleteEpic({ id: epic.id });
          },
        });
      };

  return  <ScreenContainer>
          <Row  between={true}>
            <h1> {currentProject?.name}任務組</h1>
            <Button onClick={() => setCreateEpicOpen(true)} type={"link"}>創建任務組</Button>
          </Row>  
            <List style={{overflow:'scroll'}} dataSource={epics} itemLayout={"vertical"} renderItem={epic => <List.Item>
              <List.Item.Meta
                title={<Row between={true}> 
                        <span>{epic.name}</span>
                        <Button onClick={() => confirmDeleteEpic(epic)} type={"link"}>删除</Button>
                </Row>}
              description = {<div>
              <div>開始時間: {dayjs(epic.start).format('YYYY-MM-DD')}</div>
              <div>結束時間: {dayjs(epic.end).format('YYYY-MM-DD')}</div>
            </div>}
            />
            <div>
              {tasks?.filter((task) => task.epicId === epic.id).map((task) => (
               <Link to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`} key={task.id}>{task.name}</Link> ))}
            </div>
            </List.Item>}/> 
            <CreateEpic onClose={() => setCreateEpicOpen(false)} visible={createEpicOpen}/>
          </ScreenContainer>
 
}


