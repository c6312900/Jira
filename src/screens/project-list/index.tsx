//import { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "screens/project-list/list";
import { useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";

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
     
   // const [keys] = useState<('name'|'personId')[]>(['name','personId'])
   // const [param, setParam] = useUrlQueryParam(keys)
    
   //基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
     //https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js 
     //param 通常只會只有1組值,因為不管選取或輸入文字都是只有1組name和personId,不是陣列,把他想成查詢條件
    const [param, setParam] = useUrlQueryParam(['name','personId'])
    //推論param每次都創建一個新的對象才造成useDebounce 內的useEffect 一直觸發,造成頁面一直渲染,可看8-6 8:16
    //去查useUrlQueryParam內的reduce
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
    //useUrlQueryParam(['random']);
    console.log(useUrlQueryParam(['name']));
  //  console.log(useUrlQueryParam(['personid']));
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

//function Component寫法
ProjectListScreen.whyDidYouRender = true;

//class Component寫法
// class test extends Component<any,any> {
//   static whyDidYouRender = true
// }

const Container = styled.div`
  padding: 3.2rem;
`;