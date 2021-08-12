import { Link } from "react-router-dom"
import {Route, Routes, Navigate} from "react-router"
import { KanbanScreen } from "screens/kanban"
import { EpicScreen } from "screens/Epic"

export const ProjectScreen = () => {
    return  <div>
        <h1>ProjectScreen</h1>
        {/* <Link to={'/kanban'} >有加/kanban會跑到根路由</Link> */}
        <Link to={'kanban'} >看板</Link>
        <Link to={'epic'} >任務組</Link>
        <Routes>
            <Route path={'/kanban'} element={<KanbanScreen/>}/>
            <Route path={'/epic'} element={<EpicScreen/>}/>
            <Navigate to={window.location.pathname+'/kanban'}/>
        </Routes>
    </div>
    
}