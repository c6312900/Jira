import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as Softwarelogo}  from 'assets/software-logo.svg';
import { Button, Dropdown, Menu } from "antd";
import { Route, Routes, Navigate} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import { resetRoute } from "utils";
import { useState } from "react";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

export const AuthenticatedApp = () => {
     const [projectModalOpen, setProjectModalOpen] = useState(false)
    // const value: any = undefined  //
    return (
        <Container>
          {/* {value.notExist} */}
          <PageHader/>
          {/* <Button onClick={() => setProjectModalOpen(true)}>打開</Button> */}
          <Main>
            <Router>           
              <Routes>
                {/* 可看utils/project.ts 內的 run(client("projects".... */}
                 <Route path={'/projects'} element={<ProjectListScreen/>}/>
                 <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>}/>
                 <Navigate to={'/projects'}/>
              </Routes>
            </Router> 
          </Main>
          <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
        </Container>
      );
    // return <div>
    //     <button onClick={logout}>登出</button>
    //     <ProjectListScreen />
    // </div>
}

const PageHader = () => {
  
    return <Header between={true}>
    <HeaderLeft gap={true}>
      {/* <img src={Softwarelogo} alt="找不到圖片"/> */}
      <Button style={{padding: 0}} type={'link'} onClick={resetRoute} >
        <Softwarelogo width={"18rem"} color={"rgb(38, 132, 255)"}></Softwarelogo>
      </Button>      
      {/* <h2>项目</h2> */}
      <ProjectPopover/>
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
      {/* <button onClick={logout}>登出</button> */}
      <User/>
      
    </HeaderRight>
  </Header>
}

// const HeaderItem = styled.h3`
//   margin-right: 3rem;
// `;

//var 有變量提昇,let和const 沒有看10-2 2:00 temporal dead zone 暫時性死區
const User = () => {
 const {logout, user} = useAuth()
 return <Dropdown
       overlay={
        <Menu>
          <Menu.Item key={"logout"}>
          <Button onClick={logout} type={"link"}>登出</Button>
            {/* <a onClick={logout} href="/#">登出</a> */}
          </Menu.Item>
        </Menu>
      }>
        <Button type={"link"} onClick={(e) => e.preventDefault()}>Hi, {user?.name}</Button>
       {/* <a onClick={(e) => e.preventDefault()} href="/#" >Hi, {user?.name}</a> */}
       {/* < e.preventDefault() 防止頁面刷新> */}            
      </Dropdown>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``
