// import { render } from "@testing-library/react";
import { Table } from "antd";
import dayjs from "dayjs";
import { User } from "screens/project-list/search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return <Table rowKey={"id"}  pagination={false}  columns={[{
    title: '名稱',
    dataIndex: 'name',
    sorter:(a,b) => a.name.localeCompare(b.name)
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
  }]}  dataSource={list} />
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
};