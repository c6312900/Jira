import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { ScreenContainer } from "components/lib";
import { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDocumentTitle } from "utils"
import { useKanbans, useReorderKanban } from "utils/kanban"
import { useReorderTask, useTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column"
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import { useKanbanSearchParams, useKanbansQueryKey, useProjectInUrl, useTasksQueryKey, useTasksSearchParams } from "./util"

export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const {data: currentProject} = useProjectInUrl()
    const {data: kanbans, isLoading: KanbanIsLoading} = useKanbans(useKanbanSearchParams())
    //也可寫成 const {data: kanbans = []} = useKanbans()
    const {isLoading: taskIsLoading} = useTasks(useTasksSearchParams())
    const isLoading= taskIsLoading || KanbanIsLoading 

    const onDragEnd = useDragEnd()
     return <DragDropContext onDragEnd={onDragEnd}>
       {/* <DragDropContext onDragEnd={(...params) => {
        console.log(...params)
        }}> */}
        <ScreenContainer>
          <h1> {currentProject?.name}看板</h1>
          <SearchPanel />
          {isLoading? <Spin size={'large'}/> :  (
          <ColumnsContainer>
            <Drop type={'COLUMN'} direction={'horizontal'} droppableId={'kanbun'}> 
              <DropChild style={{display:'flex'}}>         
                {kanbans?.map((kanban,index) => (
                  <Drag key={kanban.id} draggableId={'kanban'+kanban.id} index={index} > 
                    <KanbanColumn kanban={kanban} key={kanban.id} /> 
                  </Drag>))
                }                
              </DropChild>
            </Drop>
            <CreateKanban/>
          </ColumnsContainer>
          )}
          <TaskModal/>   
        </ScreenContainer>
    </DragDropContext>
};

export const useDragEnd = () => {
  const {data:kanbans} = useKanbans(useKanbanSearchParams())
  const {mutate: reorderKanban} = useReorderKanban(useKanbansQueryKey())
  const {mutate: reorderTask} = useReorderTask(useTasksQueryKey())
  const {data: allTasks = []} = useTasks(useTasksSearchParams())
  return useCallback(({source,destination,type}:DropResult) => {
     if (!destination) {
       return
     }
     //看板排序
     if (type === 'COLUMN') {
      const fromId = kanbans?.[source.index].id
      const toId = kanbans?.[destination.index].id
      if (!fromId || ! toId || fromId === toId) {
        return
      }
      const type = destination.index > source.index? 'after' : 'before'
      reorderKanban({fromId, referenceId: toId, type})
     }

     if (type === 'ROW') {
       const fromKanbanId = +source.droppableId
       const toKanbanId = +destination.droppableId
       if (fromKanbanId === toKanbanId) {
         return
       }
       const fromTask = allTasks.filter(task => task.kanbanId === fromKanbanId )[source.index]
       const toTask = allTasks.filter(task => task.kanbanId === toKanbanId )[destination.index]
       if (fromTask?.id === toTask?.id) {
         return
       }
       reorderTask({
         fromId: fromTask?.id,
         referenceId: toTask?.id, 
         fromKanbanId,
         toKanbanId,
         type: fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before'
          })
     }
  },[kanbans,reorderKanban,allTasks,reorderTask])
}

export const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;