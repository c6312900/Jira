import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useTasksSearchParams } from "./util";
import taskicon from 'assets/task.svg';
import bugicon from 'assets/bug.svg';
import styled from "@emotion/styled";
import { Card } from "antd";

export const TaskTypeIcon = ({id}:{id:number}) => {
   const {data: taskTypes} = useTaskTypes()
   const name = taskTypes?.find((task) => task.id === id )?.name
   if (!name) {
     return null
   }
   return <img alt="" src={name === 'task' ? taskicon : bugicon} />
  
}

export const KanbanColumn = ({kanban}:{kanban:Kanban}) => {
   const {data: allTasks} = useTasks(useTasksSearchParams())
   const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    return <Container>
        <h3>{kanban.name}</h3>
        <TasksContainer>
        { tasks?.map(task => <Card style={{marginBottom: '0.5rem'}} key={task.id}>
            <div>
              {task.name}
            </div>            
            <TaskTypeIcon id={task.typeId} />
          </Card>)}
        </TasksContainer>
    </Container>

}

const Container = styled.div `
min-width: 27rem;
border-radius: 6px;
background-color: rgb(244,245,247);
display: flex;
flex-direction: column;
pading: 0.7rem 0.7rem 1rem;
margin-right: 1.5rem;
`


const TasksContainer = styled.div `
 overflow: scroll;
 flex: 1;
 ::-Webkit-scrollbar {
     display: none;
 }
`