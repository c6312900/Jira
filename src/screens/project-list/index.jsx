import {useEffect, useState } from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {clearnObject} from "../../utils";
import * as qs from "qs";


const apiUrl = process.env.REACT_APP_API_URL // 'http://localhost:3001'

export const ProjectListScreen = () => {
    
    const [users, setUsers] = useState([])
    //param 通常只會只有1組值,因為不管選取或輸入文字都是只有1組name和personId,不是陣列,把他想成查詢條件
    const [param, setParam] = useState({
        name:'',
        personId:''
    })
    const [list, setList] = useState([])
    
    useEffect(() => {
      //name=${param.name} & personId=${param.personId}
      fetch(`${apiUrl}/projects?${qs.stringify(clearnObject(param))}`).then(async response => {
        if (response.ok) {
          setList(await response.json())          
        }
      })
    },[param]) 

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response =>{
            if (response.ok) {
                setUsers (await response.json())                
            }
        })

    },[])
    // 當param變化時去取資料

    return <div>
        <SearchPanel users={users}  param={param} setParam={setParam}/>        
        <List users={users} list={list}/>
    </div>
}