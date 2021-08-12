import { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "screens/project-list/list";
import { useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
//import { Test } from "./test";
//import { Helmet } from "react-helmet";
//import {useEffect, useState } from "react";
//import {List, Project} from "screens/project-list/list";
//import {clearnObject, useDebounce, useMount} from "../../utils";
//import { useHttp } from "utils/http";
//import { useAsync } from "utils/use-async";
// import * as qs from "qs";

// const apiUrl = process.env.REACT_APP_API_URL; // 'http://localhost:3001'

export const ProjectListScreen = () => {
    
    // const [users, setUsers] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState<null | Error>(null)

    //param 通常只會只有1組值,因為不管選取或輸入文字都是只有1組name和personId,不是陣列,把他想成查詢條件
    const [param, setParam] = useState({
        name:"",
        personId:""
    })

    const debouncedParam = useDebounce(param,200);
    // const [list, setList] = useState([]);
    //const client = useHttp();
    const {isLoading, error, data: list} = useProject(debouncedParam);
    const { data: users} = useUsers();
    
    // const {run, isLoading, error, data: list} = useAsync<Project[]>();
    
    // useEffect(() => {
    //   run(client("projects", {data: clearnObject(debouncedParam)}))

    //   // setIsLoading(true)
    //   // setError(null)

    //   // client("projects", {data: clearnObject(debouncedParam)})
    //   // .then(setList)
    //   // .catch((error:Error) => {
    //   //   setList([])
    //   //   setError(error)
    //   // })
    //   // .finally(() => setIsLoading(false))
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[debouncedParam]); 
      //qs.stringify幫我我做的是把自動對應 name=${param.name} & personId=${param.personId},
      //但有些欄位可能沒值,這會影響查詢結果,所以要clearnObject(debounceParam)把沒值的去掉
    //   fetch(`${apiUrl}/projects?${qs.stringify(clearnObject(debounceParam))}`).then(async response => {
    //     if (response.ok) {
    //       setList(await response.json())          
    //     }
    //   })
    // },[debounceParam])  // 當param變化時去取資料

    // useEffect(() => {
    //     fetch(`${apiUrl}/users`).then(async response =>{
    //         if (response.ok) {
    //             setUsers (await response.json())                
    //         }
    //     })
    // },[]) //空數組是表示只在頁面加載時執行一次(組件加載時只執行一次)
   
    // useMount(() => {
    //   client("users").then(setUsers);
    //   // fetch(`${apiUrl}/users`).then(async response => {
    //   //   if (response.ok) {
    //   //     setUsers (await response.json())
    //   //   }
    //   // })
    // })
    useDocumentTitle('項目列表',false);
    return <Container>
      {/* <Test/> */}
      {/* <Helmet>
      <title>項目列表</title>
      </Helmet> */}
      <h1>項目列表</h1>
      <SearchPanel users={users || []}  param={param} setParam={setParam}/> 
      {error? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}       
      <List loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;