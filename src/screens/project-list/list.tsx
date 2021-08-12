// import { render } from "@testing-library/react";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
//react-router和react-router-dom關係類似 react 和react-native/react-dom/react-vr....
//react 核心庫處理虛擬的,邏輯,計算...等例如useEffect,useState...等怎麼去影響dom 見8-3 9:00
import { Link } from "react-router-dom";
import { User } from "screens/project-list/search-panel";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

//RecordType 表示table 中1筆資料的型別,例如:Project 或 User型別
//TableProps代表table屬性(Props)的集合
interface ListProps extends TableProps<Project> {
 // list: Project[];
  users: User[];
}

export const List = ({users,...props }: ListProps) => {
// export const List = ({ list, users }: ListProps) => {
  return (
  <Table rowKey={"id"}  pagination={false}  columns={[{
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
  }]}  {...props} />
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