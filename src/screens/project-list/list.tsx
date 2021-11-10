// import { render } from "@testing-library/react";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
//import { Content } from "antd/lib/layout/layout";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
//import { memoryUsage } from "process";
//react-router和react-router-dom關係類似 react 和react-native/react-dom/react-vr....
//react 核心庫處理虛擬的,邏輯,計算...等例如useEffect,useState...等怎麼去影響dom 見8-3 9:00
import { Link } from "react-router-dom";
import { User } from "screens/project-list/search-panel";
import { useDeleteProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectQueryKey } from "./util";
//import { useProjectModal } from "./util";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

//RecordType 表示table 中1筆資料的型別,例如:Project 或 User型別
//TableProps代表table屬性(Props)的集合
interface ListProps extends TableProps<Project> {
 // list: Project[];
  users: User[];
 // refresh?: () => void;
 // projectButton: JSX.Element
  //setProjectModalOpen: (isOpen: boolean) => void
}

export const List = ({users,...props }: ListProps) => {
 // const {open} = useProjectModal()
  const {mutate} = useEditProject(useProjectQueryKey())
  
  //2個參數獲取時間不一樣,先取得project.id,再取得pin 見9-3 15:00
 // const pinProject = (id:number) => (pin:boolean) => mutate({id, pin}).then(props.refresh)
 const pinProject = (id:number) => (pin:boolean) => mutate({id, pin})
  //const pinProject = (id:number, pin:boolean) => mutate({id, pin})


// export const List = ({ list, users }: ListProps) => {
  return (
  <Table rowKey={"id"}  
    pagination={false}  
    columns={[
    {
      title: <Pin checked={true} disabled={true} />,
      render(value, project) {
        return <Pin checked={project.pin}  onCheckedChange={
          pinProject(project.id)  //為什麼這邊不用給pin,因為onCheckedChange會自帶pin進來,
          //如:onCheckedChange= {pin => {pinProject((project.id), pin)}}
        
          //   pin => {
        //   // useEditProject(project.id,{pin: true}) Hook不可在function內使用,只能在最外層見9-3 11:00
        //   pinProject((project.id), pin) //2個參數獲取時間不一樣,先取得project.id,再取得pin 見9-3 15:00
        // }
      } />
      }
    },
    {
    title: '名稱',
    // dataIndex: 'name',
    sorter:(a,b) => a.name.localeCompare(b.name),
    render(value, project) {
      return <Link to={String(project.id)}>{project.name}</Link>
    }
  },{
    title: '部門',
    dataIndex: 'organization',    
  }
  ,{
    title: '負責人',
    render(value, project) {
      return <span>
         {users.find((user) => user.id === project.personId)?.name || "未知"}
      </span>
    }
    
  },{
    title: '創建時間',
    render(value, project) {
      return <span>
        {project.created? dayjs(project.created).format('YYYY-MM-DD') : '無'}
      </span>
    }
  },
  {
   render(value,project) {
     return <More project={project} />
   }
  }
]}  {...props} />
  //}]}  dataSource={list} />
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           {/*undefined.name*/}
  //           <td>
  //             {users.find((user) => user.id === project.personId)?.name ||
  //               "未知"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
  )};

const More = ( {project}: {project: Project}) => {
  const {startEdit} = useProjectModal() 
  const editProject = (id:number) => () => startEdit(id)
  const {mutate: deleteProject} = useDeleteProject(useProjectQueryKey())
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '確定刪除項目嗎?',
      content: '點擊確定刪除',
      okText: '確定',
      onOk() {
        deleteProject({id})
      }
    })
  }
 return  <Dropdown overlay= { <Menu>
    <Menu.Item onClick={editProject(project.id)} key={"edit"}>編輯</Menu.Item >
    <Menu.Item onClick={() => confirmDeleteProject(project.id)} key={"delete"}>刪除</Menu.Item >
     {/* <ButtonNoPadding type={"link"} onClick={() => props.setProjectModalOpen(true)}>編輯</ButtonNoPadding> */}
     {/* {props.projectButton} */}    
    
  </Menu>
  } >
    <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
  </Dropdown>

}